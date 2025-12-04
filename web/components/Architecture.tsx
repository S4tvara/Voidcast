'use client';

import { useState } from 'react';

export default function Architecture() {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  return (
    <section id="architecture" className="w-full py-32 bg-black relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-sm font-mono text-gray-500 mb-2 tracking-widest">/// BLUEPRINT</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white">System Architecture</h3>
        </div>

        {/* Diagram Container */}
        <div className="w-full aspect-[16/9] md:aspect-[2/1] relative bg-white/5 rounded-lg border border-white/10 backdrop-blur-sm p-8 overflow-hidden group/diagram">
          
          {/* HUD Corners (Theme Consistent) */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/30"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/30"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/30"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/30"></div>

          {/* Connection Layer (SVG) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
            <defs>
              <filter id="glow-path" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Base Paths */}
            {/* Internet -> Core */}
            <path d="M 15 50 L 50 50" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" strokeDasharray="2 2" />
            {/* Core -> Sink */}
            <path d="M 50 50 C 70 50, 70 20, 85 20" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" strokeDasharray="2 2" fill="none" />
            {/* Core -> Mirage */}
            <path d="M 50 50 L 85 50" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" strokeDasharray="2 2" />
            {/* Core -> Drift */}
            <path d="M 50 50 C 70 50, 70 80, 85 80" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" strokeDasharray="2 2" fill="none" />

            {/* Active Paths */}
            {/* Internet -> Core */}
            <path 
              d="M 15 50 L 50 50" 
              stroke="white" 
              strokeWidth="1" 
              filter="url(#glow-path)"
              className={`transition-all duration-500 ${activeNode === 'client' || activeNode === 'core' ? 'opacity-100 animate-[dash_1s_linear_infinite]' : 'opacity-0'}`}
              strokeDasharray="4"
            />

            {/* Core -> Sink (Green) */}
            <path 
              d="M 50 50 C 70 50, 70 20, 85 20" 
              stroke="#4ade80" 
              strokeWidth="1" 
              fill="none"
              filter="url(#glow-path)"
              className={`transition-all duration-500 ${activeNode === 'sink' || activeNode === 'core' ? 'opacity-100 animate-[dash_1s_linear_infinite]' : 'opacity-0'}`}
              strokeDasharray="4"
            />

            {/* Core -> Mirage (Purple) */}
            <path 
              d="M 50 50 L 85 50" 
              stroke="#c084fc" 
              strokeWidth="1" 
              filter="url(#glow-path)"
              className={`transition-all duration-500 ${activeNode === 'mirage' || activeNode === 'core' ? 'opacity-100 animate-[dash_1s_linear_infinite]' : 'opacity-0'}`}
              strokeDasharray="4"
            />

            {/* Core -> Drift (Blue) */}
            <path 
              d="M 50 50 C 70 50, 70 80, 85 80" 
              stroke="#60a5fa" 
              strokeWidth="1" 
              fill="none"
              filter="url(#glow-path)"
              className={`transition-all duration-500 ${activeNode === 'drift' || activeNode === 'core' ? 'opacity-100 animate-[dash_1s_linear_infinite]' : 'opacity-0'}`}
              strokeDasharray="4"
            />
          </svg>

          {/* Node Layer (HTML) */}
          
          {/* Client Node */}
          <div 
            className="absolute top-1/2 left-[15%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
            onMouseEnter={() => setActiveNode('client')}
            onMouseLeave={() => setActiveNode(null)}
          >
            <div className={`w-24 h-24 bg-black border flex items-center justify-center rounded-sm transition-all duration-300 ${activeNode === 'client' ? 'border-white shadow-[0_0_20px_rgba(255,255,255,0.2)] scale-105' : 'border-white/20'}`}>
              <div className="text-center">
                <div className="text-2xl mb-2">🌐</div>
                <div className="text-[10px] font-mono text-gray-400 tracking-wider">CLIENT</div>
              </div>
            </div>
            <div className={`absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-mono text-gray-500 transition-opacity duration-300 ${activeNode === 'client' ? 'opacity-100' : 'opacity-0'}`}>
              // SOURCE
            </div>
          </div>

          {/* Core Node */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
            onMouseEnter={() => setActiveNode('core')}
            onMouseLeave={() => setActiveNode(null)}
          >
            <div className={`w-36 h-36 bg-black border-2 flex items-center justify-center rounded-sm transition-all duration-300 relative z-10 ${activeNode === 'core' ? 'border-white shadow-[0_0_30px_rgba(255,255,255,0.15)] scale-105' : 'border-white/20'}`}>
              <div className="text-center">
                <div className="text-4xl mb-3 animate-pulse">▣</div>
                <div className="text-xs font-bold tracking-[0.2em] font-mono">VOIDCAST</div>
                <div className="text-[9px] text-gray-500 font-mono mt-1">CORE PROXY</div>
              </div>
            </div>
            {/* Pulse Rings */}
            <div className={`absolute inset-0 border border-white/10 rounded-sm -z-10 transition-all duration-700 ${activeNode === 'core' ? 'scale-125 opacity-100' : 'scale-100 opacity-0'}`} />
            <div className={`absolute inset-0 border border-white/5 rounded-sm -z-20 transition-all duration-1000 delay-75 ${activeNode === 'core' ? 'scale-150 opacity-100' : 'scale-100 opacity-0'}`} />
          </div>

          {/* Destination Nodes */}
          
          {/* Sink */}
          <div 
            className="absolute top-[20%] left-[85%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
            onMouseEnter={() => setActiveNode('sink')}
            onMouseLeave={() => setActiveNode(null)}
          >
            <div className={`w-32 h-16 bg-black border flex items-center justify-between px-4 rounded-sm transition-all duration-300 ${activeNode === 'sink' ? 'border-green-500/80 shadow-[0_0_15px_rgba(74,222,128,0.2)] bg-green-900/10' : 'border-white/20'}`}>
              <div className="flex flex-col">
                <span className="text-[9px] font-mono text-gray-500">MOD_01</span>
                <span className={`text-xs font-mono font-bold tracking-wider ${activeNode === 'sink' ? 'text-green-400' : 'text-gray-400'}`}>SINK</span>
              </div>
              <div className={`w-1.5 h-1.5 rounded-full ${activeNode === 'sink' ? 'bg-green-400 animate-pulse' : 'bg-white/10'}`} />
            </div>
          </div>

          {/* Mirage */}
          <div 
            className="absolute top-[50%] left-[85%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
            onMouseEnter={() => setActiveNode('mirage')}
            onMouseLeave={() => setActiveNode(null)}
          >
            <div className={`w-32 h-16 bg-black border flex items-center justify-between px-4 rounded-sm transition-all duration-300 ${activeNode === 'mirage' ? 'border-purple-500/80 shadow-[0_0_15px_rgba(192,132,252,0.2)] bg-purple-900/10' : 'border-white/20'}`}>
              <div className="flex flex-col">
                <span className="text-[9px] font-mono text-gray-500">MOD_02</span>
                <span className={`text-xs font-mono font-bold tracking-wider ${activeNode === 'mirage' ? 'text-purple-400' : 'text-gray-400'}`}>MIRAGE</span>
              </div>
              <div className={`w-1.5 h-1.5 rounded-full ${activeNode === 'mirage' ? 'bg-purple-400 animate-pulse' : 'bg-white/10'}`} />
            </div>
          </div>

          {/* Drift */}
          <div 
            className="absolute top-[80%] left-[85%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
            onMouseEnter={() => setActiveNode('drift')}
            onMouseLeave={() => setActiveNode(null)}
          >
            <div className={`w-32 h-16 bg-black border flex items-center justify-between px-4 rounded-sm transition-all duration-300 ${activeNode === 'drift' ? 'border-blue-500/80 shadow-[0_0_15px_rgba(96,165,250,0.2)] bg-blue-900/10' : 'border-white/20'}`}>
              <div className="flex flex-col">
                 <span className="text-[9px] font-mono text-gray-500">MOD_03</span>
                 <span className={`text-xs font-mono font-bold tracking-wider ${activeNode === 'drift' ? 'text-blue-400' : 'text-gray-400'}`}>DRIFT</span>
              </div>
              <div className={`w-1.5 h-1.5 rounded-full ${activeNode === 'drift' ? 'bg-blue-400 animate-pulse' : 'bg-white/10'}`} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
