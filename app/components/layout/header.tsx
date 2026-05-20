import React, { useState } from 'react';
import {
  Search,
  Bell,
  Settings,
  FileText,
  Rocket,
  ChevronDown
} from 'lucide-react';

const Header = () => {
  const [env, setEnv] = useState('Prod');

  return (
    <header className="h-16 border-b border-border bg-background flex items-center justify-between px-6 shrink-0 z-10">
      <div className="flex items-center gap-8 flex-1">
        {/* Search Bar */}
        <div className="relative w-full max-w-md group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Buscar logs de eventos..."
            className="w-full bg-white/5 border border-border/50 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-all"
          />
        </div>

        {/* Environment Tabs */}
        <div className="flex items-center bg-white/5 p-1 rounded-lg border border-border/30">
          {['Dev', 'Staging', 'Prod'].map((e) => (
            <button
              key={e}
              onClick={() => setEnv(e)}
              className={`px-4 py-1 rounded-md text-xs font-bold transition-all ${env === e
                  ? 'bg-primary/20 text-primary border border-primary/30'
                  : 'text-muted-foreground hover:text-foreground'
                }`}
            >
              {e}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Action Buttons */}
        <div className="flex items-center gap-2 pr-4 border-r border-border/50">
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold text-muted-foreground hover:bg-white/5 transition-all">
            <FileText className="w-3.5 h-3.5" /> Docs
          </button>
          <button className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
            <Rocket className="w-3.5 h-3.5" /> Implantar
          </button>
        </div>

        {/* System & User Icons */}
        <div className="flex items-center gap-3">
          <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-lg transition-all relative">
            <Bell className="w-5 h-5" />
            <div className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-background" />
          </button>
          <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-lg transition-all">
            <Settings className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 pl-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-purple-500 border border-white/10 flex items-center justify-center text-[10px] font-bold shadow-inner cursor-pointer hover:scale-105 transition-transform">
              NS
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
