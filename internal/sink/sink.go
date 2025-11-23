package sink

import (
	"context"
	"fmt"
	"log"
	"net"
	"sync"
	"time"
)

// TODO: add more logging configs and export it to another package
type LoggingConfig struct {
	Enabled bool
}

// blackhole sink mode
type Sink struct {
	port     int
	listener net.Listener
	ctx      context.Context
	cancel   context.CancelFunc
	wg       sync.WaitGroup
	logging  LoggingConfig
}

type SinkConfig struct {
	Port    int
	Logging LoggingConfig
}

// Creates a new sink instance
func NewSinkFactory(config SinkConfig) *Sink {
	ctx, cancel := context.WithCancel(context.Background())
	return &Sink{
		port:    config.Port,
		ctx:     ctx,
		cancel:  cancel,
		logging: config.Logging,
	}
}

// Start begins accepting connections
func (s *Sink) Start() error {
	addr := fmt.Sprintf(":%d", s.port)
	listener, err := net.Listen("tcp", addr)
	if err != nil {
		return fmt.Errorf("error listening on port %d: %w", s.port, err)
	}
	s.listener = listener
	log.Printf("Sink on port %d listening on %s", s.port, addr)

	s.wg.Add(1)

	go s.acceptConnections()

	return nil
}

func (s *Sink) acceptConnections() {
	defer s.wg.Done()

	for {
		select {
		case <-s.ctx.Done():
			return
		default:
			// deadline for periodic context checks
			s.listener.(*net.TCPListener).SetDeadline(time.Now().Add(1 * time.Second))

			conn, err := s.listener.Accept()
			if err != nil {
				if netErr, ok := err.(net.Error); ok && netErr.Timeout() {
					continue // Timeout is expected, check context again
				}
				if s.ctx.Err() != nil {
					return // Context cancelled
				}
				log.Printf("Error accepting connection: %v", err)
				continue
			}

			// Handle connection in a separate goroutine
			s.wg.Add(1)
			go s.handleConnection(conn)
		}
	}
}

// handleConnection handles a single connection and drops it
func (s *Sink) handleConnection(conn net.Conn) {
	defer s.wg.Done()
	defer conn.Close()
	if s.logging.Enabled {
		remoteAddr := conn.RemoteAddr().String()
		log.Printf("[SINK] Dropping connection from %s at %s", remoteAddr, time.Now().Format(time.RFC3339))
	}

	// Silently drop: just close the connection without reading or responding
	// The connection is already closed by defer, so this is a blackhole
}

// Stop gracefully stops the sink
func (s *Sink) Stop() error {
	log.Printf("Stopping sink on port %d", s.port)

	// Cancel context to stop accepting new connections
	s.cancel()

	// Close the listener
	if s.listener != nil {
		if err := s.listener.Close(); err != nil {
			return fmt.Errorf("error closing listener: %w", err)
		}
	}

	// Wait for all connections to finish
	s.wg.Wait()

	log.Printf("Sink on port %d stopped", s.port)
	return nil
}

// Drop silently drops the traffic (legacy method, kept for compatibility)
func (s *Sink) Drop() error {
	// This method is now handled by handleConnection
	return nil
}
