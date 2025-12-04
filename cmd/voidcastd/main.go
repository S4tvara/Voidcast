package main

import (
	"flag"
	"io"
	"log/slog"
	"os"
	"os/signal"
	"syscall"

	"github.com/s4tvara/voidcast/internal/engine"
	"github.com/s4tvara/voidcast/pkg/api"
)

func main() {
	// Parse flags
	apiPort := flag.Int("api-port", 8080, "Port for the API server")
	logFilePath := flag.String("log-file", "voidcast.log", "Path to the log file")
	flag.Parse()

	// Initialize structured logging
	logFile, err := os.OpenFile(*logFilePath, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		panic(err)
	}
	defer logFile.Close()

	w := io.MultiWriter(os.Stdout, logFile)
	logger := slog.New(slog.NewJSONHandler(w, nil))
	slog.SetDefault(logger)

	slog.Info("Starting Voidcast daemon...")

	// 1. Initialize Engine
	eng := engine.NewEngine()

	// 2. Initialize and Start API
	apiServer := api.NewServer(eng, api.APIConfig{
		Port: *apiPort,
	})

	// Start API in a goroutine
	go func() {
		if err := apiServer.Start(); err != nil {
			slog.Error("API server failed", "error", err)
			os.Exit(1)
		}
	}()

	slog.Info("Voidcast daemon running", "api_port", *apiPort)

	// 3. Wait for interrupt signal to gracefully shutdown
	stop := make(chan os.Signal, 1)
	signal.Notify(stop, os.Interrupt, syscall.SIGTERM)

	<-stop

	slog.Info("Shutting down...")

	// 4. Cleanup
	if err := eng.Stop(); err != nil {
		slog.Error("Error stopping engine", "error", err)
	}

	slog.Info("Goodbye!")
}
