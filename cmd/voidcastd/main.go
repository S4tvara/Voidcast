package main

import (
	"flag"
	"log"
	"os"
	"os/signal"
	"syscall"

	"github.com/s4tvara/voidcast/internal/engine"
	"github.com/s4tvara/voidcast/pkg/api"
)

func main() {
	// Parse flags
	apiPort := flag.Int("api-port", 8080, "Port for the API server")
	flag.Parse()

	log.Println("Starting Voidcast daemon...")

	// 1. Initialize Engine
	eng := engine.NewEngine()

	// 2. Initialize and Start API
	apiServer := api.NewAPI(eng, api.APIConfig{
		Port: *apiPort,
	})

	// Start API in a goroutine
	go func() {
		if err := apiServer.Start(); err != nil {
			log.Fatalf("API server failed: %v", err)
		}
	}()

	log.Printf("Voidcast daemon running (API on port %d)", *apiPort)

	// 3. Wait for interrupt signal to gracefully shutdown
	stop := make(chan os.Signal, 1)
	signal.Notify(stop, os.Interrupt, syscall.SIGTERM)

	<-stop

	log.Println("Shutting down...")

	// 4. Cleanup
	if err := eng.Stop(); err != nil {
		log.Printf("Error stopping engine: %v", err)
	}

	log.Println("Goodbye!")
}
