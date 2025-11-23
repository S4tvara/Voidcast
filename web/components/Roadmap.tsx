'use client';

import { useEffect, useRef, useState } from 'react';
import Reveal from './Reveal';

export default function Roadmap() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollHeight = sectionRef.current.offsetHeight;
        const windowHeight = window.innerHeight;
        
        // Calculate progress (0 to 1) as section passes through viewport
        const progress = (windowHeight - rect.top) / (scrollHeight + windowHeight);
        setScrollProgress(Math.max(0, Math.min(1, progress)));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const phases = [
    {
      id: '01',
      name: 'EVENT HORIZON',
      status: 'CURRENT',
      description: 'Core proxy engine active. Sink, Mirage, and Drift modules operational. Initial CLI release.',
      x: 20,
      y: 20
    },
    {
      id: '02',
      name: 'SINGULARITY',
      status: 'Q3 2025',
      description: 'AI-driven traffic analysis. Automated deception profiles based on attacker behavior.',
      x: 80,
      y: 50
    },
    {
      id: '03',
      name: 'SUPERNOVA',
      status: 'Q4 2025',
      description: 'Distributed sinkhole clusters. Global threat intelligence sharing. Multi-node orchestration.',
      x: 20,
      y: 80
    }
  ];

  return (
    <section ref={sectionRef} id="roadmap" className="w-full py-32 bg-black relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-sm font-mono text-gray-500 mb-2 tracking-widest">/// MISSION LOG</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white">Trajectory</h3>
        </div>

        <div className="relative min-h-[800px]">
          {/* Orbital Path SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
            <path 
              d="M 20% 20% C 50% 20%, 80% 35%, 80% 50% C 80% 65%, 20% 65%, 20% 80%"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="2"
              className="vector-effect-non-scaling-stroke"
            />
            
            {/* Moving Ship Marker */}
            {/* We use inline styles to move the ship along the approximate path based on scroll */}
            <circle 
              cx="0" cy="0" r="6" fill="white" className="drop-shadow-[0_0_10px_white]"
              style={{
                offsetPath: 'path("M 20% 20% C 50% 20%, 80% 35%, 80% 50% C 80% 65%, 20% 65%, 20% 80%")',
                offsetDistance: `${scrollProgress * 100}%`,
                transition: 'offset-distance 0.1s linear'
              }}
            />
          </svg>

          {/* Phases */}
          {phases.map((phase, index) => (
            <div 
              key={phase.id}
              className="absolute w-64 md:w-80 transform -translate-y-1/2"
              style={{ 
                left: `${phase.x}%`, 
                top: `${phase.y}%`,
                transform: `translate(${phase.x > 50 ? '-100%' : '0'}, -50%)`
              }}
            >
              <Reveal delay={index * 200}>
                <div className={`flex flex-col ${phase.x > 50 ? 'items-end text-right' : 'items-start text-left'}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-4xl font-bold text-white/10 font-mono">{phase.id}</span>
                    <div className={`h-px w-12 ${phase.status === 'CURRENT' ? 'bg-green-500' : 'bg-white/20'}`}></div>
                  </div>
                  
                  <h4 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                    {phase.name}
                    {phase.status === 'CURRENT' && (
                      <span className="text-[10px] px-2 py-0.5 bg-green-900/50 text-green-400 border border-green-700 rounded-full">ACTIVE</span>
                    )}
                  </h4>
                  <span className="text-xs font-mono text-gray-500 mb-2 block">{phase.status}</span>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {phase.description}
                  </p>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

