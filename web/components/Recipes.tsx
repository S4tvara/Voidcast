'use client';

import { useState } from 'react';
import Modal from './Modal';
import Reveal from './Reveal';

interface Recipe {
  id: string;
  title: string;
  description: string;
  mode: 'SINK' | 'MIRAGE' | 'DRIFT';
  code: string;
}

const RECIPES: Recipe[] = [
  {
    id: 'mirage-webhook',
    title: 'Debug Flaky Webhooks',
    description: 'Simulate random 500 errors and timeouts to test how your application handles webhook failures.',
    mode: 'MIRAGE',
    code: `// mirage-webhook.js
module.exports = {
  match: (req) => req.path.startsWith('/webhook'),
  handle: (req, res) => {
    // 20% chance of failure
    if (Math.random() < 0.2) {
      return res.status(500).send({ error: 'Internal Server Error' });
    }
    // 10% chance of timeout
    if (Math.random() < 0.1) {
      return new Promise(resolve => setTimeout(resolve, 10000));
    }
    return res.status(200).send({ received: true });
  }
}`
  },
  {
    id: 'sink-ssh',
    title: 'Trap SSH Scanners',
    description: 'Listen on port 22, log the connection attempt, and keep the socket open indefinitely to waste attacker resources.',
    mode: 'SINK',
    code: `// sink-ssh-trap.yaml
port: 2222 # Map to 22 via Docker
protocol: tcp
behavior:
  action: tarpit
  delay: infinite
logging:
  level: debug
  fields:
    - src_ip
    - user_agent
    - payload_fingerprint
`
  },
  {
    id: 'drift-latency',
    title: 'Simulate High Latency',
    description: 'Proxy traffic to your local backend but inject 200-500ms of jitter to test frontend loading states.',
    mode: 'DRIFT',
    code: `// drift-latency.js
module.exports = {
  target: 'http://localhost:3000',
  jitter: {
    min: 200,
    max: 500
  },
  // Only affect search endpoints
  match: (req) => req.path.includes('/search')
}`
  }
];

export default function Recipes() {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (selectedRecipe) {
      navigator.clipboard.writeText(selectedRecipe.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="recipes" className="w-full py-24 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-sm font-mono text-gray-500 mb-2 tracking-widest">/// SCENARIO DATABASE</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white">Field Operations</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {RECIPES.map((recipe, index) => (
            <Reveal key={recipe.id} delay={index * 200} className="h-full">
              <div 
                onClick={() => setSelectedRecipe(recipe)}
                className="group relative h-full border border-white/10 bg-white/5 p-6 cursor-pointer hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                {/* Folder Tab Look */}
                <div className="absolute top-0 left-0 w-24 h-1 bg-white/20 group-hover:bg-white/50 transition-colors"></div>
                
                <div className="flex justify-between items-start mb-4">
                  <div className="px-2 py-1 bg-white/10 text-[10px] font-mono text-gray-300 rounded border border-white/5">
                    MODE: {recipe.mode}
                  </div>
                  <div className="text-xs font-mono text-gray-600">
                    CASE #{index + 401}
                  </div>
                </div>

                <h4 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">
                  {recipe.title}
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {recipe.description}
                </p>

                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-mono text-green-500 flex items-center gap-1">
                  <span>OPEN DOSSIER</span>
                  <span>&gt;&gt;</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <Modal 
        isOpen={!!selectedRecipe} 
        onClose={() => setSelectedRecipe(null)}
        title={`CLASSIFIED // CASE ${selectedRecipe?.id.toUpperCase()}`}
      >
        {selectedRecipe && (
          <div className="space-y-6">
            <div>
              <h4 className="text-white font-bold text-lg mb-2">{selectedRecipe.title}</h4>
              <p className="text-gray-400 text-sm border-l-2 border-white/20 pl-4 italic">
                {selectedRecipe.description}
              </p>
            </div>

            <div className="relative group">
              <div className="absolute top-0 right-0 p-2">
                <button 
                  onClick={handleCopy}
                  className="px-3 py-1 text-xs font-mono bg-white/10 hover:bg-white/20 text-white rounded border border-white/10 transition-colors"
                >
                  {copied ? 'COPIED' : 'COPY CODE'}
                </button>
              </div>
              <pre className="bg-black/50 p-6 rounded-lg border border-white/10 overflow-x-auto text-xs md:text-sm font-mono text-green-400/90 leading-relaxed">
                <code>{selectedRecipe.code}</code>
              </pre>
            </div>

            <div className="flex justify-end pt-4 border-t border-white/10">
              <button 
                onClick={() => setSelectedRecipe(null)}
                className="px-6 py-2 bg-white text-black font-bold text-sm hover:bg-gray-200 transition-colors"
              >
                ACKNOWLEDGE
              </button>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}

