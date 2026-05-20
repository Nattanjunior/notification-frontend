import React, { useState } from 'react';
import FeedCard from './feed-card';
import { Download, Pause, Play, Filter } from 'lucide-react';

const ActivityFeed = () => {
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [isPaused, setIsPaused] = useState(false);

  const filters = ['Todos', 'Entregues', 'Falhas', 'Fila', 'Retentados', 'Críticos'];

  const feedItems: Array<React.ComponentProps<typeof FeedCard>> = [
    {
      id: 'EVT-9923-S',
      recipient: 'usr_s923@domain.com',
      title: 'Código de Verificação Enviado',
      category: 'AUTH',
      status: 'Entregue',
      latency: '162ms',
      timestamp: '14:22:01.04',
    },
    {
      id: 'EVT-9924-D',
      recipient: '+1 (555) 012-3456',
      title: 'SMS de Lembrete de Pagamento',
      category: 'BILLING',
      status: 'Retentando',
      latency: '240ms',
      timestamp: '14:21:44.33',
    },
    {
      id: 'EVT-9925-F',
      recipient: 'usr_f925@domain.com',
      title: 'Alerta de Segurança',
      category: 'SECURITY',
      status: 'Falhou',
      timestamp: '14:20:15.12',
    },
    {
      id: 'EVT-9929-B',
      recipient: '@internal_segment_all',
      title: 'Transmissão de Atualização do Sistema',
      category: 'CRITICAL',
      status: 'Fila',
      timestamp: '14:20:12.89',
    },
  ];

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-background">
      <div className="p-8 flex flex-col gap-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-foreground tracking-tight">Feed de Atividades</h1>
            <p className="text-muted-foreground text-sm mt-1">Trilha de auditoria em tempo real de todos os eventos e notificações da infraestrutura.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-border/50 rounded-xl text-xs font-bold text-muted-foreground hover:text-foreground transition-all">
              <Download className="w-3.5 h-3.5" /> Exportar Logs
            </button>
            <button 
              onClick={() => setIsPaused(!isPaused)}
              className={`flex items-center gap-2 px-4 py-2 border rounded-xl text-xs font-bold transition-all ${
                isPaused 
                  ? 'bg-green-500/10 border-green-500/30 text-green-500 hover:bg-green-500/20' 
                  : 'bg-white/5 border-border/50 text-muted-foreground hover:text-foreground'
              }`}
            >
              {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
              {isPaused ? 'Retomar Feed' : 'Pausar Feed'}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-white/5 p-1 rounded-xl border border-border/30 gap-1">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeFilter === f 
                    ? 'bg-primary/20 text-primary border border-primary/30 shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <button className="p-2 bg-white/5 border border-border/30 rounded-xl text-muted-foreground hover:text-foreground transition-all">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-8 pb-8 no-scrollbar">
        <div className="flex flex-col gap-4">
          {feedItems.map((item, index) => (
            <FeedCard key={index} {...item} />
          ))}
        </div>
      </div>

      {/* Bottom Live Stream Bar */}
      <div className="h-20 border-t border-border bg-card/10 flex items-center px-8 justify-between shrink-0">
        <div className="flex flex-col gap-1.5 max-w-xl">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">TRANSMISSÃO AO VIVO</span>
          </div>
          <div className="font-mono text-[10px] text-muted-foreground/60 truncate">
            [14:22:15] LOAD_BALANCER: Roteando tráfego para node-us-east-1a ...
            [14:22:12] DB_QUERY: Tempo de execução 12ms para evento ID Index ...
          </div>
        </div>

        <div className="flex items-center gap-12">
          <div className="flex flex-col gap-1">
            <span className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground opacity-50">TAXA DE TRANSFERÊNCIA</span>
            <span className="text-sm font-mono font-bold text-foreground">2.4k <span className="text-[10px] text-muted-foreground">req/s</span></span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground opacity-50">TAXA DE ERRO</span>
            <span className="text-sm font-mono font-bold text-red-400">0.02%</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground opacity-50">NÓS</span>
            <span className="text-sm font-mono font-bold text-primary">12/12</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityFeed;
