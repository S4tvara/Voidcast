package api

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/s4tvara/voidcast/internal/engine"
	"github.com/s4tvara/voidcast/pkg/config"
)

// APIConfig holds configuration for the API server
type APIConfig struct {
	Port int
}

// API defines the REST interface for Voidcast
type API struct {
	engine *engine.Engine
	config APIConfig
}

// NewAPI creates a new API instance
func NewAPI(e *engine.Engine, cfg APIConfig) *API {
	return &API{
		engine: e,
		config: cfg,
	}
}

// Start starts the API server
func (a *API) Start() error {
	mux := http.NewServeMux()

	// Register routes
	mux.HandleFunc("/api/sinks", a.handleSinks)

	addr := fmt.Sprintf(":%d", a.config.Port)
	log.Printf("API server listening on %s", addr)

	return http.ListenAndServe(addr, mux)
}

// Request/Response types
type CreateSinkRequest struct {
	Port    int  `json:"port"`
	Logging bool `json:"logging"`
}

type ErrorResponse struct {
	Error string `json:"error"`
}

func (a *API) handleSinks(w http.ResponseWriter, r *http.Request) {
	// Enable CORS for local development if needed
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == http.MethodOptions {
		return
	}

	switch r.Method {
	case http.MethodGet:
		a.listSinks(w)
	case http.MethodPost:
		a.createSink(w, r)
	case http.MethodDelete:
		a.deleteSink(w, r)
	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

func (a *API) listSinks(w http.ResponseWriter) {
	sinks := a.engine.ListSinks()

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(sinks)
}

func (a *API) createSink(w http.ResponseWriter, r *http.Request) {
	var req CreateSinkRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		a.respondError(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if req.Port <= 0 || req.Port > 65535 {
		a.respondError(w, "Invalid port number", http.StatusBadRequest)
		return
	}

	// Don't allow starting a sink on the API port
	if req.Port == a.config.Port {
		a.respondError(w, "Cannot start sink on API port", http.StatusConflict)
		return
	}

	err := a.engine.Start(req.Port, config.LoggingConfig{Enabled: req.Logging})
	if err != nil {
		a.respondError(w, fmt.Sprintf("Failed to start sink: %v", err), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"status": "created"})
}

func (a *API) deleteSink(w http.ResponseWriter, r *http.Request) {
	portStr := r.URL.Query().Get("port")
	if portStr == "" {
		a.respondError(w, "Port parameter required", http.StatusBadRequest)
		return
	}

	port, err := strconv.Atoi(portStr)
	if err != nil {
		a.respondError(w, "Invalid port parameter", http.StatusBadRequest)
		return
	}

	if err := a.engine.RemoveSink(port); err != nil {
		a.respondError(w, fmt.Sprintf("Failed to remove sink: %v", err), http.StatusNotFound)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"status": "removed"})
}

func (a *API) respondError(w http.ResponseWriter, message string, code int) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	json.NewEncoder(w).Encode(ErrorResponse{Error: message})
}
