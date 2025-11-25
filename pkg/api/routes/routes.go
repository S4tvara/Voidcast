package routes

import (
	"net/http"

	"github.com/s4tvara/voidcast/pkg/api/controller"
)

// NewRouter creates and configures the HTTP router
func NewRouter(c *controller.Controller) http.Handler {
	mux := http.NewServeMux()

	// Register routes mapping to controller methods
	mux.HandleFunc("/api/sinks", c.HandleSinks)

	return mux
}
