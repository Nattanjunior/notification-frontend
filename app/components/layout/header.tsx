import React from 'react';
import { Bell, Monitor, User } from 'lucide-react';

const Header = () => {
  return (
    <header className="h-16 border-b border-border flex items-center justify-between px-6 bg-background">
      <div className="flex items-center gap-6">
        <h2 className="text-foreground font-bold text-lg tracking-wider">NOTIF_SVC</h2>
        <div className="flex items-center gap-4 text-[10px] text-muted uppercase tracking-widest font-semibold">
          <span className="flex items-center gap-1 border-r border-border pr-4">Cluster-01</span>
          <span className="flex items-center gap-1 border-r border-border pr-4">US-EAST-1</span>
          <span className="text-foreground border-b-2 border-primary pb-1">Production</span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 rounded-full border border-green-500/20">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] font-bold text-green-500 tracking-wider uppercase">Live_WS</span>
        </div>
        
        <div className="text-[10px] text-muted font-bold tracking-wider">
          99.9% Uptime
        </div>

        <div className="flex items-center gap-4 border-l border-border pl-6">
          <button className="text-muted hover:text-foreground transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <button className="text-muted hover:text-foreground transition-colors">
            <Monitor className="w-5 h-5" />
          </button>
          <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center overflow-hidden">
             <User className="w-5 h-5 text-primary" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
