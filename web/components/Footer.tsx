'use client';

export default function Footer() {
  return (
    <footer className="w-full py-12 border-t border-white/10 bg-black text-xs font-mono text-gray-500">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        
        <div className="flex flex-col gap-2">
          <span className="text-white font-bold tracking-widest">VOIDCAST</span>
          <span>© 2025 OPEN SOURCE INITIATIVE</span>
          <span>MIT LICENSE</span>
        </div>

        <div className="flex gap-8">
          <div className="flex flex-col gap-2">
            <span className="text-white mb-2">PROJECT</span>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
            <a href="#" className="hover:text-white transition-colors">Docs</a>
            <a href="#" className="hover:text-white transition-colors">Releases</a>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-white mb-2">MODULES</span>
            <span>Sinkd</span>
            <span>Mirage</span>
            <span>Drift</span>
            <span>Obsv</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-white mb-2">STATUS</span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
              Online
            </span>
            <span>v0.1.0</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

