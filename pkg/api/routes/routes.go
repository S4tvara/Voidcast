package routes

import (
	"net/http"

	"github.com/s4tvara/voidcast/pkg/api/controller"
)

// NewRouter creates and configures the HTTP router
func NewRouter(c *controller.Controller) http.Handler {
	mux := http.NewServeMux()

	SinksRoutes(mux, c) // routes for sinks

	return mux
}
