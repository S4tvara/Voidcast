package controller

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/s4tvara/voidcast/internal/engine"
	"github.com/s4tvara/voidcast/pkg/api/model"
	"github.com/s4tvara/voidcast/pkg/config"
)

// Controller handles incoming HTTP requests and orchestrates business logic
type Controller struct {
	engine *engine.Engine
	// Add Config here if needed for controller logic, e.g. API port for validation
	apiPort int
}

// NewController creates a new API controller
func NewController(e *engine.Engine, apiPort int) *Controller {
	return &Controller{
		engine:  e,
		apiPort: apiPort,
	}
}

// HandleSinks acts as the main entry point for /api/sinks
func (c *Controller) HandleSinks(w http.ResponseWriter, r *http.Request) {
	// Enable CORS
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == http.MethodOptions {
		return
	}

	switch r.Method {
	case http.MethodGet:
		c.listSinks(w)
	case http.MethodPost:
		c.createSink(w, r)
	case http.MethodDelete:
		c.deleteSink(w, r)
	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

func (c *Controller) listSinks(w http.ResponseWriter) {
	sinks := c.engine.ListSinks()

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(sinks)
}

func (c *Controller) createSink(w http.ResponseWriter, r *http.Request) {
	var req model.CreateSinkRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		c.respondError(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if req.Port <= 0 || req.Port > 65535 {
		c.respondError(w, "Invalid port number", http.StatusBadRequest)
		return
	}

	if req.Port == c.apiPort {
		c.respondError(w, "Cannot start sink on API port", http.StatusConflict)
		return
	}

	err := c.engine.Start(req.Port, config.LoggingConfig{Enabled: req.Logging})
	if err != nil {
		c.respondError(w, fmt.Sprintf("Failed to start sink: %v", err), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"status": "created"})
}

func (c *Controller) deleteSink(w http.ResponseWriter, r *http.Request) {
	portStr := r.URL.Query().Get("port")
	if portStr == "" {
		c.respondError(w, "Port parameter required", http.StatusBadRequest)
		return
	}

	port, err := strconv.Atoi(portStr)
	if err != nil {
		c.respondError(w, "Invalid port parameter", http.StatusBadRequest)
		return
	}

	if err := c.engine.RemoveSink(port); err != nil {
		c.respondError(w, fmt.Sprintf("Failed to remove sink: %v", err), http.StatusNotFound)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"status": "removed"})
}

func (c *Controller) respondError(w http.ResponseWriter, message string, code int) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	json.NewEncoder(w).Encode(model.ErrorResponse{Error: message})
}
