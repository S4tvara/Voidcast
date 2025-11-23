'use client';

import Reveal from './Reveal';

export default function About() {
  return (
    <section id="about" className="w-full py-24 border-y border-white/5 bg-black/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <Reveal delay={0}>
            <h2 className="text-sm font-mono text-gray-500 mb-6 tracking-widest">/// THE PROJECT</h2>
          </Reveal>
          <Reveal delay={200}>
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Deception as a Service. <br/>
              <span className="text-gray-500">Silence as a Weapon.</span>
            </h3>
          </Reveal>
          <Reveal delay={400}>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              Voidcast is not just a proxy; it is a programmable blackhole. It sits on your network, listening to every whisper, scream, and probe—capturing the unknown while remaining invisible.
            </p>
          </Reveal>
          <Reveal delay={600}>
            <p className="text-gray-400 text-lg leading-relaxed">
              Whether you need to sink malicious traffic, replay fake services to deceive scanners, or tunnel requests through complex topologies, Voidcast provides the canvas for network deception.
            </p>
          </Reveal>
        </div>
        
        <div className="relative h-[400px] w-full border border-white/10 rounded-lg bg-black/50 overflow-hidden">
          {/* Abstract grid visualization */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[40px_40px]"></div>
          
          {/* Center "Blackhole" */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-black rounded-full border border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.1)]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-white/5 rounded-full animate-[spin_10s_linear_infinite]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-white/5 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
        </div>
      </div>
    </section>
  );
}
