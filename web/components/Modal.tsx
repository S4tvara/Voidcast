'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export default function Modal({ isOpen, onClose, children, title }: ModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!mounted) return null;

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      ></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-2xl bg-black/90 border border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.8)] rounded-xl overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
            <h3 className="font-mono text-sm text-gray-300 tracking-widest uppercase">
              {title || 'CLASSIFIED // TOP SECRET'}
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors font-mono text-xs"
          >
            [CLOSE]
          </button>
        </div>

        {/* Body */}
        <div className="p-8 overflow-y-auto max-h-[80vh]">
          {children}
        </div>

        {/* Footer Decoration */}
        <div className="h-1 w-full bg-linear-to-r from-transparent via-white/20 to-transparent"></div>
      </div>
    </div>,
    document.body
  );
}

