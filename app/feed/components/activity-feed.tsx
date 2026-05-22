import React, { useState, useEffect } from 'react';
import FeedCard from './feed-card';
import { Download, Pause, Play, Filter, Loader2 } from 'lucide-react';
import { notificationsService, Notification } from '@/app/lib/notifications';
import { socket, connectWebSocket, disconnectWebSocket } from '@/app/lib/socket';

const ActivityFeed = () => {
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [isPaused, setIsPaused] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // ID de destinatário padrão para teste
  const DEFAULT_RECIPIENT_ID = '8f6e5d4c-3b2a-1f0e-9d8c-7b6a5f4e3d2c';

  useEffect(() => {
    async function loadNotifications() {
      try {
        setIsLoading(true);
        const { notifications: data } = await notificationsService.getFromRecipient(DEFAULT_RECIPIENT_ID);
        setNotifications(data);
      } catch (error) {
        console.error('Erro ao carregar notificações:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadNotifications();

    // Configuração do WebSocket
    connectWebSocket();

    socket.on('newNotification', (data: any) => {
      console.log('Nova notificação via WS:', data);

      // Se o feed estiver pausado, não atualizamos a lista (opcional)
      if (isPaused) return;

      const newNotification: Notification = {
        id: data.id || Math.random().toString(),
        content: data.content || data.message?.content,
        category: data.category || data.message?.category,
        recipientId: data.recipientId || data.message?.recipientId,
        createdAt: data.createdAt || new Date().toISOString(),
      };

      setNotifications((prev) => [newNotification, ...prev]);
    });

    return () => {
      socket.off('newNotification');
      disconnectWebSocket();
    };
  }, [isPaused]);

  const filters = ['Todos', 'Entregues', 'Falhas', 'Fila', 'Retentados', 'Críticos'];

  // Mapeamento de status para o FeedCard
  const mapStatus = (notification: Notification): any => {
    if (notification.canceledAt) return 'Falhou';
    if (notification.readAt) return 'Entregue';
    return 'Fila'; // Default para novas notificações
  };

  // Estatísticas reais baseadas nas notificações carregadas
  const stats = {
    total: notifications.length,
    delivered: notifications.filter(n => n.readAt).length,
    failed: notifications.filter(n => n.canceledAt).length,
    errorRate: notifications.length > 0
      ? ((notifications.filter(n => n.canceledAt).length / notifications.length) * 100).toFixed(2) + '%'
      : '0.00%',
    nodes: '12/12'
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-background">
      <div className="p-8 flex flex-col gap-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-foreground tracking-tight">Feed de Atividades</h1>
            <p className="text-muted-foreground text-sm mt-1">Trilha de auditoria em tempo real de todos os eventos e notificações da infraestrutura.</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                const csvContent = "data:text/csv;charset=utf-8,"
                  + "ID,Recipient,Content,Category,CreatedAt\n"
                  + notifications.map(n => `${n.id},${n.recipientId},${n.content},${n.category},${n.createdAt}`).join("\n");
                const encodedUri = encodeURI(csvContent);
                const link = document.createElement("a");
                link.setAttribute("href", encodedUri);
                link.setAttribute("download", "notifications_logs.csv");
                document.body.appendChild(link);
                link.click();
              }}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-border/50 rounded-xl text-xs font-bold text-muted-foreground hover:text-foreground transition-all"
            >
              <Download className="w-3.5 h-3.5" /> Exportar Logs
            </button>
            <button
              onClick={() => setIsPaused(!isPaused)}
              className={`flex items-center gap-2 px-4 py-2 border rounded-xl text-xs font-bold transition-all ${isPaused
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
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${activeFilter === f
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
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-full gap-4 text-muted-foreground">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-sm font-medium animate-pulse">Carregando notificações...</p>
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-4 text-muted-foreground">
            <p className="text-sm font-medium">Nenhuma notificação encontrada.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {notifications
              .filter(n => {
                if (activeFilter === 'Todos') return true;
                if (activeFilter === 'Entregues') return n.readAt;
                if (activeFilter === 'Falhas') return n.canceledAt;
                if (activeFilter === 'Fila') return !n.readAt && !n.canceledAt;
                return true;
              })
              .map((item) => (
                <FeedCard
                  key={item.id}
                  id={item.id.substring(0, 8)}
                  recipient={item.recipientId}
                  title={item.content}
                  category={item.category}
                  status={mapStatus(item)}
                  timestamp={new Date(item.createdAt).toLocaleTimeString()}
                />
              ))}
          </div>
        )}
      </div>

      {/* Bottom Live Stream Bar */}
      <div className="h-20 border-t border-border bg-card/10 flex items-center px-8 justify-between shrink-0">
        <div className="flex flex-col gap-1.5 max-w-xl">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">TRANSMISSÃO AO VIVO</span>
          </div>
          <div className="font-mono text-[10px] text-muted-foreground/60 truncate">
            {notifications.length > 0 ? (
              `[${new Date(notifications[0].createdAt).toLocaleTimeString()}] ${notifications[0].category.toUpperCase()}: ${notifications[0].content}`
            ) : (
              'Aguardando novos eventos de infraestrutura...'
            )}
          </div>
        </div>

        <div className="flex items-center gap-12">
          <div className="flex flex-col gap-1">
            <span className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground opacity-50">NOTIFICAÇÕES</span>
            <span className="text-sm font-mono font-bold text-foreground">{stats.total} <span className="text-[10px] text-muted-foreground">total</span></span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground opacity-50">TAXA DE ERRO</span>
            <span className="text-sm font-mono font-bold text-red-400">{stats.errorRate}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground opacity-50">NÓS</span>
            <span className="text-sm font-mono font-bold text-primary">{stats.nodes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityFeed;
