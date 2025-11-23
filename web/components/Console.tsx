'use client';

import { useState } from 'react';

const MODULES = {
  sinkd: {
    id: 'sinkd',
    title: 'SINKD',
    subtitle: 'Blackhole Logic',
    description: 'Silently drops traffic while logging deep metadata. Acts as a network blackhole that listens on any port, captures headers, fingerprints, and payloads, then vanishes the connection into the void.',
    command: 'voidcast sink --port 8080 --log-level debug',
    output: [
      '[INFO] Listening on 0.0.0.0:8080 (HTTP/TCP)',
      '[INFO] Sink active. Null-routing incoming traffic.',
      '[CONN] 192.168.1.42:53211 -> 8080 | PROTO: TCP',
      '[RECV] GET /admin.php HTTP/1.1',
      '[META] UA: Mozilla/5.0 (X11; Linux x86_64)',
      '[DROP] Connection terminated. 0 bytes sent.'
    ]
  },
  mirage: {
    id: 'mirage',
    title: 'MIRAGE',
    subtitle: 'Deception Layer',
    description: 'A programmable fake responder. Simulates legitimate services to deceive scanners and bots. Define complex response trees using Lua or JavaScript to mimic APIs, login portals, or IoT devices.',
    command: 'voidcast mirage --profile fake-login.js',
    output: [
      '[INFO] Loaded profile: standard-login-form',
      '[INFO] Emulating Apache/2.4.41 (Ubuntu)',
      '[REQ]  POST /api/login | 10.0.0.5',
      '[RULE] Matched: "admin_user"',
      '[RESP] Sending 200 OK (Fake Success)',
      '[LOG]  Captured credentials: user=admin pass=password123'
    ]
  },
  drift: {
    id: 'drift',
    title: 'DRIFT',
    subtitle: 'Tunnel Engine',
    description: 'Dynamic forwarding and proxying. Conditionally tunnels traffic to real destinations based on headers, IP, or timing. Perfect for chaos engineering, flaky API simulation, and canary testing.',
    command: 'voidcast drift --to http://localhost:3000 --delay 500ms',
    output: [
      '[INFO] Proxy mode engaged -> http://localhost:3000',
      '[INFO] Jitter: 500ms +/- 100ms',
      '[FWD]  GET /v1/users -> backend',
      '[INJ]  Injecting 502 Bad Gateway (Random 5%)',
      '[ERR]  Simulated failure sent to client',
      '[FWD]  Retry attempt 2 -> backend (Success)'
    ]
  },
  obsv: {
    id: 'obsv',
    title: 'OBSV',
    subtitle: 'Deep Sight',
    description: 'Real-time traffic introspection and visualization. Watch the flow of data as it happens. Filter, tail, and analyze request streams in flight with powerful CLI tools.',
    command: 'voidcast obsv --tail --filter "status >= 400"',
    output: [
      '[LIVE] Attached to daemon pid 1192',
      '[TAIL] Watching for errors...',
      '----------------------------------------',
      '403 | 192.168.1.10 | GET /private/key',
      '500 | 10.2.4.12    | POST /upload (Payload too large)',
      '404 | 172.16.0.5   | GET /favicon.ico',
      '----------------------------------------'
    ]
  }
};

type ModuleKey = keyof typeof MODULES;

export default function Console() {
  const [activeModule, setActiveModule] = useState<ModuleKey>('sinkd');

  return (
    <section id="console" className="w-full py-24 max-w-7xl mx-auto px-4 md:px-8">
      <div className="flex flex-col md:flex-row gap-6 min-h-[600px]">
        
        {/* Left Navigation Panel */}
        <nav className="w-full md:w-64 flex flex-col gap-2 shrink-0">
          <div className="text-xs font-mono text-gray-600 mb-2 pl-2">MODULES //</div>
          {(Object.keys(MODULES) as ModuleKey[]).map((key) => (
            <button
              key={key}
              onClick={() => setActiveModule(key)}
              className={`group flex items-center justify-between p-4 w-full text-left border transition-all duration-200 relative overflow-hidden
                ${activeModule === key 
                  ? 'border-white bg-white/5 text-white' 
                  : 'border-white/10 text-gray-500 hover:border-white/30 hover:text-gray-300'
                }`}
            >
              <span className="font-mono font-bold tracking-wider">{MODULES[key].title}</span>
              {activeModule === key && (
                <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_white]"></div>
              )}
              
              {/* Hover Effect */}
              <div className="absolute inset-0 bg-white/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
            </button>
          ))}
          
          <div className="mt-auto pt-8 hidden md:block">
            <div className="text-xs font-mono text-gray-600 mb-2 pl-2">STATUS //</div>
            <div className="border border-white/10 p-4 bg-black/20 backdrop-blur-sm text-xs font-mono text-gray-400">
              <div className="flex justify-between mb-1">
                <span>CPU</span>
                <span>12%</span>
              </div>
              <div className="w-full h-1 bg-white/10 mb-3">
                <div className="w-[12%] h-full bg-white/50"></div>
              </div>
              <div className="flex justify-between mb-1">
                <span>MEM</span>
                <span>34%</span>
              </div>
              <div className="w-full h-1 bg-white/10">
                <div className="w-[34%] h-full bg-white/50"></div>
              </div>
            </div>
          </div>
        </nav>

        {/* Right Viewport Panel */}
        <div className="grow relative group">
          {/* HUD Corners */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/30"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/30"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/30"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/30"></div>

          <div className="h-full border border-white/10 bg-black/40 backdrop-blur-md p-6 md:p-12 flex flex-col justify-between relative overflow-hidden">
            
            {/* Content */}
            <div className="relative z-10 animate-in" key={activeModule}>
              <div className="mb-8">
                <h2 className="text-sm font-mono text-gray-500 uppercase tracking-[0.3em] mb-2">
                  {MODULES[activeModule].subtitle}
                </h2>
                <h3 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6">
                  {MODULES[activeModule].title}
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
                  {MODULES[activeModule].description}
                </p>
              </div>

              {/* Embedded Terminal */}
              <div className="mt-12 rounded-lg border border-white/10 bg-black/80 p-4 font-mono text-sm shadow-2xl">
                <div className="flex items-center gap-2 border-b border-white/10 pb-2 mb-3 opacity-50">
                  <div className="w-2 h-2 rounded-full bg-white/20"></div>
                  <div className="w-2 h-2 rounded-full bg-white/20"></div>
                  <span className="text-xs ml-2">terminal — {activeModule}</span>
                </div>
                <div className="text-gray-300 space-y-1">
                   <div className="flex gap-3 mb-4">
                     <span className="text-white font-bold">➜</span>
                     <span className="text-white/90">{MODULES[activeModule].command}</span>
                   </div>
                   {MODULES[activeModule].output.map((line, i) => (
                     <div key={i} className="pl-6 opacity-80 hover:opacity-100 transition-opacity">
                       {line}
                     </div>
                   ))}
                   <div className="flex gap-3 mt-2 animate-pulse pl-6">
                     <span className="w-2 h-4 bg-white/50"></span>
                   </div>
                </div>
              </div>
            </div>

            {/* Background Decor */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-white/5 blur-[100px] rounded-full pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

