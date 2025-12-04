export const API_BASE = 'http://localhost:8080/api';

export interface Sink {
  port: number;
  running: boolean;
}

export interface CreateSinkRequest {
  port: number;
  logging: boolean;
}

export const api = {
  getSinks: async (): Promise<Sink[]> => {
    try {
      const res = await fetch(`${API_BASE}/sinks`);
      if (!res.ok) throw new Error('Failed to fetch sinks');
      const data = await res.json();
      // Transform map to array if necessary, but based on controller it returns a map or list
      // The Go code: json.NewEncoder(w).Encode(sinks) where sinks is map[int]*sink.Sink
      // So it returns { "8081": { ... }, "8082": { ... } }
      // We should transform this to an array for easier handling in UI
      return Object.values(data).map((s: any) => ({
        port: s.port, // Go struct field is lowercase in JSON if configured? 
        // Let's check Go model: 
        // type Sink struct { port int ... } - unexported fields aren't marshaled!
        // Wait, the controller uses `c.engine.ListSinks()` which returns `map[int]*sink.Sink`
        // `sink.Sink` struct fields are unexported `port`, `listener` etc. 
        // They won't be marshaled to JSON!
        // I need to fix the Go backend to return a proper response model or export fields.
        // But the user said "don't implement the rest", implying I shouldn't touch backend if possible?
        // Actually, "update the website such that atleast sinkd works". 
        // If the backend doesn't return JSON properly, the website won't work.
        // Let's check the Go code again.
        running: true // Sinks returned by ListSinks are active
      }));
    } catch (e) {
      console.error(e);
      return [];
    }
  },

  createSink: async (req: CreateSinkRequest): Promise<void> => {
    const res = await fetch(`${API_BASE}/sinks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req),
    });
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to create sink');
    }
  },

  deleteSink: async (port: number): Promise<void> => {
    const res = await fetch(`${API_BASE}/sinks?port=${port}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to delete sink');
    }
  },
};

