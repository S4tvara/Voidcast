package sink

// Sink handles blackhole sink mode - silently dropping traffic
type Sink struct {
	// TODO: Add sink configuration
}

// NewSink creates a new sink instance
func NewSink() *Sink {
	return &Sink{}
}

// Drop silently drops the traffic
func (s *Sink) Drop() error {
	// TODO: Implement sink logic
	return nil
}
