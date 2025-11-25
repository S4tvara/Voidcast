package main

import (
	"bufio"
	"fmt"
	"log"
	"net"
	"os"
	"os/signal"
	"strconv"
	"strings"
	"syscall"
	"time"

	"github.com/s4tvara/voidcast/internal/sink"
	"github.com/s4tvara/voidcast/pkg/config"
)

func main() {
	fmt.Println("=== Voidcast Sink Manual Test Utility ===")
	fmt.Println("Commands:")
	fmt.Println("  start <port> [logging] - Start a sink on port (logging: true/false)")
	fmt.Println("  stop <port>           - Stop a sink on port")
	fmt.Println("  list                  - List all running sinks")
	fmt.Println("  test <port>           - Test connection to sink on port")
	fmt.Println("  quit                  - Exit")
	fmt.Println()

	sinks := make(map[int]*sink.Sink)
	scanner := bufio.NewScanner(os.Stdin)

	// Handle graceful shutdown
	sigChan := make(chan os.Signal, 1)
	signal.Notify(sigChan, os.Interrupt, syscall.SIGTERM)

	go func() {
		<-sigChan
		fmt.Println("\nShutting down all sinks...")
		for port, s := range sinks {
			if err := s.Stop(); err != nil {
				log.Printf("Error stopping sink on port %d: %v", port, err)
			}
		}
		os.Exit(0)
	}()

	for {
		fmt.Print("sink-test> ")
		if !scanner.Scan() {
			break
		}

		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue
		}

		parts := strings.Fields(line)
		if len(parts) == 0 {
			continue
		}

		command := parts[0]

		switch command {
		case "start":
			if len(parts) < 2 {
				fmt.Println("Usage: start <port> [logging]")
				continue
			}

			port, err := strconv.Atoi(parts[1])
			if err != nil {
				fmt.Printf("Invalid port: %v\n", err)
				continue
			}

			logging := false
			if len(parts) >= 3 {
				logging, err = strconv.ParseBool(parts[2])
				if err != nil {
					fmt.Printf("Invalid logging value (use true/false): %v\n", err)
					continue
				}
			}

			if _, exists := sinks[port]; exists {
				fmt.Printf("Sink already running on port %d\n", port)
				continue
			}

			s := sink.NewSinkFactory(sink.SinkConfig{
				Port: port,
				Logging: config.LoggingConfig{
					Enabled: logging,
				},
			})

			if err := s.Start(); err != nil {
				fmt.Printf("Failed to start sink: %v\n", err)
				continue
			}

			sinks[port] = s
			fmt.Printf("✓ Sink started on port %d (logging: %v)\n", port, logging)

		case "stop":
			if len(parts) < 2 {
				fmt.Println("Usage: stop <port>")
				continue
			}

			port, err := strconv.Atoi(parts[1])
			if err != nil {
				fmt.Printf("Invalid port: %v\n", err)
				continue
			}

			s, exists := sinks[port]
			if !exists {
				fmt.Printf("No sink running on port %d\n", port)
				continue
			}

			if err := s.Stop(); err != nil {
				fmt.Printf("Error stopping sink: %v\n", err)
				continue
			}

			delete(sinks, port)
			fmt.Printf("✓ Sink stopped on port %d\n", port)

		case "list":
			if len(sinks) == 0 {
				fmt.Println("No sinks running")
				continue
			}

			fmt.Println("Running sinks:")
			for port := range sinks {
				fmt.Printf("  - Port %d\n", port)
			}

		case "test":
			if len(parts) < 2 {
				fmt.Println("Usage: test <port>")
				continue
			}

			port, err := strconv.Atoi(parts[1])
			if err != nil {
				fmt.Printf("Invalid port: %v\n", err)
				continue
			}

			testConnection(port)

		case "quit", "exit":
			fmt.Println("Stopping all sinks...")
			for port, s := range sinks {
				if err := s.Stop(); err != nil {
					log.Printf("Error stopping sink on port %d: %v", port, err)
				}
			}
			fmt.Println("Goodbye!")
			return

		default:
			fmt.Printf("Unknown command: %s\n", command)
		}
	}
}

// testConnection attempts to connect to the sink and verifies it drops the connection
func testConnection(port int) {
	fmt.Printf("Testing connection to port %d...\n", port)

	conn, err := net.DialTimeout("tcp", fmt.Sprintf("localhost:%d", port), 2*time.Second)
	if err != nil {
		fmt.Printf("✗ Connection failed (expected for sink): %v\n", err)
		return
	}
	defer conn.Close()

	// Try to read - should timeout or close immediately
	conn.SetReadDeadline(time.Now().Add(1 * time.Second))
	buf := make([]byte, 1024)
	n, err := conn.Read(buf)

	if err != nil {
		fmt.Printf("✓ Connection dropped (expected): %v\n", err)
	} else {
		fmt.Printf("⚠ Unexpected: received %d bytes\n", n)
	}
}
