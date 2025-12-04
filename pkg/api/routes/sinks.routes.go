package routes

import (
	"net/http"

	"github.com/s4tvara/voidcast/pkg/api/controller"
)

func SinksRoutes(mux *http.ServeMux, c *controller.Controller) {
	mux.HandleFunc("GET /api/sinks", c.ListSinks)
	mux.HandleFunc("POST /api/sinks", c.CreateSink)
	mux.HandleFunc("DELETE /api/sinks", c.DeleteSink)
}
