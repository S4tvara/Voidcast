package model

// CreateSinkRequest represents the payload for creating a new sink
type CreateSinkRequest struct {
	Port    int  `json:"port"`
	Logging bool `json:"logging"`
}

// ErrorResponse represents a standard error response
type ErrorResponse struct {
	Error string `json:"error"`
}

// SinkStatus represents the status of a running sink
type SinkStatus struct {
	Port    int  `json:"port"`
	Running bool `json:"running"`
}
