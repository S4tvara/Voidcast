package api

import (
	"fmt"
	"log/slog"
	"net/http"

	"github.com/s4tvara/voidcast/internal/engine"
	"github.com/s4tvara/voidcast/pkg/api/controller"
	"github.com/s4tvara/voidcast/pkg/api/middleware"
	"github.com/s4tvara/voidcast/pkg/api/routes"
)

// APIConfig holds configuration for the API server
type APIConfig struct {
	Port int
}

// Server represents the HTTP server
type Server struct {
	config APIConfig
	router http.Handler
}

// NewServer creates a new API Server instance with dependencies wired up
func NewServer(e *engine.Engine, cfg APIConfig) *Server {
	// Wire up MVC components
	ctrl := controller.NewController(e, cfg.Port)
	router := routes.NewRouter(ctrl)

	// Apply Middleware
	handler := middleware.CORS(router)

	return &Server{
		config: cfg,
		router: handler,
	}
}

// Start starts the API server
func (s *Server) Start() error {
	addr := fmt.Sprintf(":%d", s.config.Port)
	slog.Info("API server listening", "address", addr)

	return http.ListenAndServe(addr, s.router)
}
