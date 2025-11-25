package engine

import (
	"fmt"
	"log"
	"sync"

	"github.com/s4tvara/voidcast/internal/sink"
	"github.com/s4tvara/voidcast/pkg/config"
)

// Engine represents the core traffic engine for Voidcast
type Engine struct {
	sinks map[int]*sink.Sink
	mu    sync.RWMutex // Protects the sinks map
}

// NewEngine creates a new traffic engine instance
func NewEngine() *Engine {
	return &Engine{
		sinks: make(map[int]*sink.Sink),
	}
}

// Start begins processing traffic
func (e *Engine) Start(port int, logging config.LoggingConfig) error {

	e.mu.Lock()
	defer e.mu.Unlock()

	if _, exists := e.sinks[port]; exists {
		return fmt.Errorf("sink already running on port %d", port)
	}

	cfg := sink.SinkConfig{
		Port:    port,
		Logging: logging,
	}

	s := sink.NewSinkFactory(cfg)

	if err := s.Start(); err != nil {
		return fmt.Errorf("failed to start sink on port %d: %w", port, err)
	}

	e.sinks[port] = s
	log.Printf("Sink started on port %d with logging: %v", port, logging)
	return nil
}

// RemoveSink stops and removes a sink
func (e *Engine) RemoveSink(port int) error {
	e.mu.Lock()
	defer e.mu.Unlock()

	s, exists := e.sinks[port]
	if !exists {
		return fmt.Errorf("no sink found on port %d", port)
	}

	if err := s.Stop(); err != nil {
		return err
	}

	delete(e.sinks, port)
	return nil
}

// Stop gracefully stops the engine and all sinks
func (e *Engine) Stop() error {
	e.mu.Lock()
	defer e.mu.Unlock()

	var errs []error
	for port, s := range e.sinks {
		if err := s.Stop(); err != nil {
			errs = append(errs, fmt.Errorf("port %d: %w", port, err))
		}
	}
	// Clear the map
	e.sinks = make(map[int]*sink.Sink)

	if len(errs) > 0 {
		return fmt.Errorf("errors stopping sinks: %v", errs)
	}
	return nil
}

func (e *Engine) ListSinks() map[int]*sink.Sink {
	e.mu.RLock()
	defer e.mu.RUnlock()

	return e.sinks
}
