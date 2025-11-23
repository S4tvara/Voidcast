'use client';

import { useState, useEffect } from 'react';

interface GlitchTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'div';
  className?: string;
  trigger?: 'hover' | 'always' | 'auto';
}

export default function GlitchText({ text, as: Component = 'span', className = '', trigger = 'hover' }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(trigger === 'always');

  useEffect(() => {
    if (trigger === 'auto') {
      const interval = setInterval(() => {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 200 + Math.random() * 300);
      }, 3000 + Math.random() * 5000);
      return () => clearInterval(interval);
    }
  }, [trigger]);

  return (
    <Component
      className={`glitch-wrapper ${isGlitching ? 'glitch-active' : ''} ${className}`}
      data-text={text}
      onMouseEnter={() => trigger === 'hover' && setIsGlitching(true)}
      onMouseLeave={() => trigger === 'hover' && setIsGlitching(false)}
    >
      {text}
    </Component>
  );
}

