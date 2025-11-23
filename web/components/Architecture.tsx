'use client';

import { useState } from 'react';

export default function Architecture() {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  return (
    <section id="architecture" className="w-full py-32 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-sm font-mono text-gray-500 mb-2 tracking-widest">/// BLUEPRINT</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white">System Architecture</h3>
        </div>

        {/* Isometric Container */}
        <div className="w-full max-w-5xl aspect-video relative group perspective-[1000px]">
          
          {/* Circuit Board Background Texture */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
             <svg width="100%" height="100%" patternUnits="userSpaceOnUse">
                <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                   <path d="M10 10 h80 v80 h-80 z" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
                   <path d="M50 10 v80 M10 50 h80" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
                   <circle cx="50" cy="50" r="2" fill="rgba(255,255,255,0.2)"/>
                </pattern>
                <rect width="100%" height="100%" fill="url(#circuit)"/>
             </svg>
          </div>

          <div className="w-full h-full transform-style-3d rotate-x-60 rotate-z-[-45deg] scale-75 transition-transform duration-700 hover:rotate-x-[50deg] hover:rotate-z-[-40deg]">
            <svg viewBox="0 0 800 600" className="w-full h-full drop-shadow-2xl overflow-visible">
              <defs>
                <filter id="glow-iso">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Base Plane Grid */}
              <path d="M0 300 L800 300 M400 0 L400 600" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              
              {/* Connection Lines (Isometric) */}
              {/* Client -> Core */}
              <path d="M150 450 L350 300" stroke="white" strokeWidth="2" strokeOpacity="0.2" />
              {/* Core -> Sink */}
              <path d="M450 300 L650 150" stroke="white" strokeWidth="2" strokeOpacity="0.2" />
              {/* Core -> Mirage */}
              <path d="M450 300 L650 300" stroke="white" strokeWidth="2" strokeOpacity="0.2" />
              {/* Core -> Drift */}
              <path d="M450 300 L650 450" stroke="white" strokeWidth="2" strokeOpacity="0.2" />

              {/* Active Path Animations */}
              {activeNode === 'client' && (
                <path d="M150 450 L350 300" stroke="#0f0" strokeWidth="3" filter="url(#glow-iso)" className="animate-[dash_1s_linear_infinite]" strokeDasharray="10" />
              )}
              {activeNode === 'sink' && (
                <>
                  <path d="M150 450 L350 300" stroke="#0f0" strokeWidth="3" filter="url(#glow-iso)" strokeDasharray="5 5" opacity="0.5" />
                  <path d="M450 300 L650 150" stroke="#0f0" strokeWidth="3" filter="url(#glow-iso)" className="animate-[dash_1s_linear_infinite]" strokeDasharray="10" />
                </>
              )}
              {activeNode === 'mirage' && (
                 <>
                  <path d="M150 450 L350 300" stroke="#b026ff" strokeWidth="3" filter="url(#glow-iso)" strokeDasharray="5 5" opacity="0.5" />
                  <path d="M450 300 L650 300" stroke="#b026ff" strokeWidth="3" filter="url(#glow-iso)" className="animate-[dash_1s_linear_infinite]" strokeDasharray="10" />
                 </>
              )}
              {activeNode === 'drift' && (
                 <>
                  <path d="M150 450 L350 300" stroke="#3b82f6" strokeWidth="3" filter="url(#glow-iso)" strokeDasharray="5 5" opacity="0.5" />
                  <path d="M450 300 L650 450" stroke="#3b82f6" strokeWidth="3" filter="url(#glow-iso)" className="animate-[dash_1s_linear_infinite]" strokeDasharray="10" />
                 </>
              )}

              {/* Nodes (3D Stack Effect) */}
              
              {/* Client Node */}
              <g 
                className="cursor-pointer hover:translate-y-[-10px] transition-transform duration-300"
                onMouseEnter={() => setActiveNode('client')}
                onMouseLeave={() => setActiveNode(null)}
              >
                <polygon points="100,450 150,410 200,450 150,490" fill="rgba(255,255,255,0.1)" stroke="white" strokeWidth="2" />
                <text x="150" y="520" textAnchor="middle" fill="white" fontSize="14" fontFamily="monospace" transform="rotate(45, 150, 520)">INTERNET</text>
              </g>

              {/* Voidcast Core Node (Center) */}
              <g 
                className="cursor-pointer hover:translate-y-[-15px] transition-transform duration-300"
                onMouseEnter={() => setActiveNode('core')}
                onMouseLeave={() => setActiveNode(null)}
              >
                {/* Bottom Plate */}
                <polygon points="350,300 400,260 450,300 400,340" fill="rgba(0,0,0,0.8)" stroke="white" strokeWidth="2" />
                {/* Floating Cube */}
                <g className="animate-float">
                  <polygon points="375,300 400,280 425,300 400,320" fill="white" stroke="white" />
                  <polygon points="375,300 375,260 400,240 400,280" fill="rgba(255,255,255,0.5)" />
                  <polygon points="425,300 425,260 400,240 400,280" fill="rgba(255,255,255,0.3)" />
                </g>
                <text x="400" y="380" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold" fontFamily="monospace" transform="rotate(45, 400, 380)">VOIDCAST</text>
              </g>

              {/* Module Nodes */}
              
              {/* Sink */}
              <g 
                className="cursor-pointer hover:translate-y-[-10px] transition-transform duration-300"
                onMouseEnter={() => setActiveNode('sink')}
                onMouseLeave={() => setActiveNode(null)}
              >
                <polygon points="600,150 650,110 700,150 650,190" fill="rgba(0, 255, 0, 0.05)" stroke={activeNode === 'sink' ? '#0f0' : 'white'} strokeWidth="1" strokeDasharray="4 2" />
                <text x="650" y="220" textAnchor="middle" fill={activeNode === 'sink' ? '#0f0' : 'gray'} fontSize="12" fontFamily="monospace" transform="rotate(45, 650, 220)">SINK</text>
              </g>

              {/* Mirage */}
              <g 
                className="cursor-pointer hover:translate-y-[-10px] transition-transform duration-300"
                onMouseEnter={() => setActiveNode('mirage')}
                onMouseLeave={() => setActiveNode(null)}
              >
                <polygon points="600,300 650,260 700,300 650,340" fill="rgba(176, 38, 255, 0.05)" stroke={activeNode === 'mirage' ? '#b026ff' : 'white'} strokeWidth="1" strokeDasharray="4 2" />
                <text x="650" y="370" textAnchor="middle" fill={activeNode === 'mirage' ? '#b026ff' : 'gray'} fontSize="12" fontFamily="monospace" transform="rotate(45, 650, 370)">MIRAGE</text>
              </g>

              {/* Drift */}
              <g 
                className="cursor-pointer hover:translate-y-[-10px] transition-transform duration-300"
                onMouseEnter={() => setActiveNode('drift')}
                onMouseLeave={() => setActiveNode(null)}
              >
                <polygon points="600,450 650,410 700,450 650,490" fill="rgba(59, 130, 246, 0.05)" stroke={activeNode === 'drift' ? '#3b82f6' : 'white'} strokeWidth="1" strokeDasharray="4 2" />
                <text x="650" y="520" textAnchor="middle" fill={activeNode === 'drift' ? '#3b82f6' : 'gray'} fontSize="12" fontFamily="monospace" transform="rotate(45, 650, 520)">DRIFT</text>
              </g>

            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
