'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-space-black/80 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold tracking-tighter text-white">
            VOIDCAST
          </h1>
          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-gray-500 border-l border-white/10 pl-4">
             <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
             <span>ONLINE</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-mono">
          <Link href="#about" className="text-gray-400 hover:text-white transition-colors">ABOUT</Link>
          <Link href="#console" className="text-gray-400 hover:text-white transition-colors">CONSOLE</Link>
          <Link href="#architecture" className="text-gray-400 hover:text-white transition-colors">BLUEPRINT</Link>
          <Link href="#philosophy" className="text-gray-400 hover:text-white transition-colors">ETHOS</Link>
        </nav>

        <div className="flex items-center gap-4">
          <a 
            href="https://github.com/nilay/voidcast" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white text-black px-4 py-1.5 rounded-full text-xs font-bold hover:bg-gray-200 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
               <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
            <span>STAR</span>
          </a>
        </div>
      </div>
    </header>
  );
}

