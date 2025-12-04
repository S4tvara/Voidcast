'use client';

import { useState, useEffect } from 'react';
import { api, Sink } from '../../lib/api';

export default function SinkControl() {
  const [sinks, setSinks] = useState<Sink[]>([]);
  const [port, setPort] = useState<string>('');
  const [logging, setLogging] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchSinks = async () => {
    const data = await api.getSinks();
    // Sort by port for consistent display
    setSinks(data.sort((a, b) => a.port - b.port));
  };

  useEffect(() => {
    fetchSinks();
    // Poll every 5 seconds to keep status fresh
    const interval = setInterval(fetchSinks, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    const portNum = parseInt(port);
    if (isNaN(portNum)) {
      setError('Invalid port number');
      setLoading(false);
      return;
    }

    try {
      await api.createSink({ port: portNum, logging });
      setSuccess(`Sink started on port ${portNum}`);
      setPort('');
      await fetchSinks();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (port: number) => {
    try {
      await api.deleteSink(port);
      setSuccess(`Sink on port ${port} stopped`);
      await fetchSinks();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Status Messages */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded font-mono text-sm">
          ERROR: {error}
        </div>
      )}
      {success && (
        <div className="bg-green-500/10 border border-green-500/50 text-green-400 px-4 py-3 rounded font-mono text-sm">
          SUCCESS: {success}
        </div>
      )}

      {/* Create Sink Form */}
      <div className="bg-white/5 border border-white/10 rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-6 font-mono flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          INITIATE NEW SINK
        </h3>
        
        <form onSubmit={handleCreate} className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <label className="block text-xs font-mono text-gray-500 mb-2">PORT CONFIGURATION</label>
            <input 
              type="number" 
              value={port}
              onChange={(e) => setPort(e.target.value)}
              placeholder="e.g. 8080"
              className="w-full bg-black border border-white/20 rounded px-4 py-2 text-white font-mono focus:border-green-500 focus:outline-none transition-colors"
              required
            />
          </div>
          
          <div className="flex items-center h-10 gap-3 bg-black border border-white/20 rounded px-4 w-full md:w-auto">
             <input 
                type="checkbox"
                id="logging"
                checked={logging}
                onChange={(e) => setLogging(e.target.checked)}
                className="accent-green-500 w-4 h-4 cursor-pointer"
             />
             <label htmlFor="logging" className="text-sm font-mono text-gray-300 cursor-pointer select-none">ENABLE LOGGING</label>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="bg-white text-black font-bold font-mono px-8 py-2 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors h-10 w-full md:w-auto whitespace-nowrap"
          >
            {loading ? 'STARTING...' : 'DEPLOY SINK'}
          </button>
        </form>
      </div>

      {/* Active Sinks List */}
      <div className="space-y-4">
        <h3 className="text-sm font-mono text-gray-500 tracking-widest">ACTIVE NODES ({sinks.length})</h3>
        
        {sinks.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-white/10 rounded-lg text-gray-500 font-mono">
            NO ACTIVE SINKS DETECTED
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sinks.map((sink) => (
              <div key={sink.port} className="bg-black border border-white/10 rounded-lg p-4 flex justify-between items-center group hover:border-white/30 transition-all">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-white/5 rounded flex items-center justify-center text-green-500">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                         <path d="M12 2v20M2 12h20" />
                         <circle cx="12" cy="12" r="10" />
                      </svg>
                   </div>
                   <div>
                      <div className="text-white font-bold font-mono text-lg">:{sink.port}</div>
                      <div className="text-xs text-green-500 font-mono">STATUS: LISTENING</div>
                   </div>
                </div>
                
                <button 
                  onClick={() => handleDelete(sink.port)}
                  className="text-gray-500 hover:text-red-500 transition-colors p-2"
                  title="Stop Sink"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

