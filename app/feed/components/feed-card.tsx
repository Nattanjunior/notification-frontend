import React from 'react';
import { Mail, MessageSquare, Bell, AlertCircle, Clock, Zap } from 'lucide-react';

interface FeedCardProps {
  id: string;
  recipient: string;
  title: string;
  category: string;
  status: 'Entregue' | 'Falhou' | 'Fila' | 'Retentando' | 'Crítico';
  latency?: string;
  timestamp: string;
}

const FeedCard: React.FC<FeedCardProps> = ({ id, recipient, title, category, status, latency, timestamp }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'Entregue':
        return { color: 'text-purple-400', bg: 'bg-purple-400/10' };
      case 'Falhou':
        return { color: 'text-red-400', bg: 'bg-red-400/10' };
      case 'Fila':
        return { color: 'text-yellow-400', bg: 'bg-yellow-400/10' };
      case 'Retentando':
        return { color: 'text-orange-400', bg: 'bg-orange-400/10' };
      case 'Crítico':
        return { color: 'text-red-500', bg: 'bg-red-500/10' };
      default:
        return { color: 'text-muted-foreground', bg: 'bg-white/5' };
    }
  };

  const styles = getStatusStyles();

  return (
    <div className="bg-card/20 border border-border/40 rounded-xl p-4 flex items-center justify-between hover:bg-white/5 transition-all group cursor-pointer">
      <div className="flex items-center gap-6">
        <div className="p-3 bg-white/5 rounded-xl text-muted-foreground group-hover:text-primary transition-colors">
          {title.includes('Code') || title.includes('Email') ? <Mail className="w-5 h-5" /> : 
           title.includes('SMS') ? <MessageSquare className="w-5 h-5" /> : <Bell className="w-5 h-5" />}
        </div>
        
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <h3 className="text-sm font-bold text-foreground/90">{title}</h3>
            <span className="px-1.5 py-0.5 bg-white/5 rounded text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{category}</span>
          </div>
          <div className="flex items-center gap-4 text-[10px] text-muted-foreground font-medium">
            <span className="flex items-center gap-1.5">
              <span className="opacity-50">@ ID:</span> <span className="font-mono text-foreground/70">{id}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-3 h-3 opacity-50" /> <span className="text-foreground/70">{recipient}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-12">
        <div className="flex flex-col items-end gap-1">
          <span className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">STATUS</span>
          <div className="flex items-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full ${styles.color.replace('text', 'bg')} animate-pulse`} />
            <span className={`text-xs font-bold ${styles.color}`}>{status}</span>
          </div>
        </div>

        {latency && (
          <div className="flex flex-col items-end gap-1">
            <span className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">LATÊNCIA</span>
            <span className="text-xs font-mono font-bold text-foreground/80">{latency}</span>
          </div>
        )}

        <div className="flex flex-col items-end gap-1">
          <span className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">DATA/HORA</span>
          <span className="text-xs font-mono font-bold text-foreground/80">{timestamp}</span>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
