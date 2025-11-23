'use client';

import Reveal from './Reveal';

export default function Philosophy() {
  return (
    <section id="philosophy" className="w-full py-32 bg-black border-t border-white/10">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <Reveal delay={0}>
          <h2 className="text-sm font-mono text-gray-500 mb-8 tracking-[0.5em]">/// ETHOS</h2>
        </Reveal>
        
        <div className="prose prose-invert prose-lg mx-auto">
          <Reveal delay={200}>
            <p className="text-3xl md:text-4xl font-light leading-normal text-white mb-12">
              "The network is a dark forest.<br/>
              <span className="text-gray-500">We build the traps.</span>"
            </p>
          </Reveal>
          
          <div className="text-left space-y-8 font-light text-gray-300">
            <Reveal delay={400}>
              <p>
                Traditional security builds walls. We build mirrors. <strong>Voidcast</strong> is born from the idea that the best way to understand an adversary—or a bug—is to let it happen, but on your terms.
              </p>
            </Reveal>
            <Reveal delay={600}>
              <p>
                Instead of closing a port, we leave it open. Instead of blocking a request, we record it. We believe that silence is information, and deception is the ultimate form of observation.
              </p>
            </Reveal>
            <Reveal delay={800}>
              <p>
                Whether you are a security researcher analyzing botnet behavior, or a developer debugging a flaky microservice, you need a tool that can listen to the void and report back what screams.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
