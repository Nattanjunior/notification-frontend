'use client';

import React, { useState, useEffect } from 'react';
import {
  Settings2,
  Clock,
  Zap,
  Send,
  Calendar,
  Repeat,
  Wifi,
  Bell,
  Mail,
  MessageSquare,
  Code2,
  Box,
  ArrowRight,
  Monitor,
  Smartphone,
  Server,
  Layout,
  Rocket,
  Settings,
  ToggleRight,
  Loader2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { notificationsService, Notification } from '@/app/lib/notifications';
import { socket, connectWebSocket, disconnectWebSocket } from '@/app/lib/socket';

const DispatchCenterView = () => {
  const [priority, setPriority] = useState('Alta');
  const [channels, setChannels] = useState(['WebSocket', 'Push']);
  const [schedule, setSchedule] = useState('Enviar Agora');

  // Estados do formulário
  const [recipientId, setRecipientId] = useState('8f6e5d4c-3b2a-1f0e-9d8c-7b6a5f4e3d2c');
  const [category, setCategory] = useState('Transação do Sistema');
  const [content, setContent] = useState('Pagamento autorizado para @jane_dev');

  // Estados de submissão
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Estado do Live Stream
  const [liveLogs, setLiveLogs] = useState<any[]>([]);

  useEffect(() => {
    // Carregar logs iniciais
    async function loadInitialLogs() {
      try {
        const { notifications } = await notificationsService.getFromRecipient(recipientId);
        setLiveLogs(notifications.slice(0, 5));
      } catch (error) {
        console.error('Erro ao carregar logs:', error);
      }
    }

    loadInitialLogs();
    connectWebSocket();

    socket.on('newNotification', (data: any) => {
      const newLog = {
        id: data.id || Math.random().toString().substring(0, 8),
        time: new Date().toLocaleTimeString(),
        msg: data.content || data.message?.content,
        type: data.category || data.message?.category || 'INFO',
        lat: '12ms',
        color: 'text-green-400'
      };
      setLiveLogs(prev => [newLog, ...prev].slice(0, 8));
    });

    return () => {
      socket.off('newNotification');
      disconnectWebSocket();
    };
  }, [recipientId]);

  const toggleChannel = (channel: string) => {
    if (channels.includes(channel)) {
      setChannels(channels.filter(c => c !== channel));
    } else {
      setChannels([...channels, channel]);
    }
  };

  const handleExecuteDispatch = async () => {
    try {
      setIsSubmitting(true);
      setStatusMessage(null);

      await notificationsService.create({
        recipientId,
        content,
        category
      });

      setStatusMessage({ type: 'success', text: 'Notificação enviada com sucesso!' });

      // Limpar mensagem após 5 segundos
      setTimeout(() => setStatusMessage(null), 5000);
    } catch (error) {
      console.error('Erro ao enviar despacho:', error);
      setStatusMessage({ type: 'error', text: 'Falha ao enviar notificação. Verifique o console.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 flex overflow-hidden bg-background">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-y-auto p-8 gap-8 no-scrollbar">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Criar Novo Despacho</h1>
          <p className="text-muted-foreground text-sm">Configure a entrega de notificações de alta prioridade em vários nós de infraestrutura.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Configuration & Payload */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Configuration Card */}
            <div className="bg-card/30 border border-border/50 rounded-2xl p-8 flex flex-col gap-8 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <Settings2 className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold">Configuração</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Recipient Identifier */}
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Identificador do Destinatário</label>
                  <input
                    type="text"
                    value={recipientId}
                    onChange={(e) => setRecipientId(e.target.value)}
                    className="w-full bg-white/5 border border-border/50 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:border-primary/50 transition-all"
                  />
                </div>

                {/* Category */}
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Categoria</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-black/5 border border-border/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 appearance-none transition-all"
                  >
                    <option>Transação do Sistema</option>
                    <option>Alerta do Usuário</option>
                    <option>Marketing</option>
                  </select>
                </div>

                {/* Priority Level */}
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Nível de Prioridade</label>
                  <div className="flex bg-white/5 p-1 rounded-xl border border-border/30 gap-1.5">
                    {['Baixa', 'Média', 'Alta'].map((p) => (
                      <button
                        key={p}
                        onClick={() => setPriority(p)}
                        className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${priority === p
                          ? 'bg-primary/20 text-primary border border-primary/30 shadow-sm'
                          : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                          }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Template Selector */}
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Seletor de Modelo</label>
                  <select className="w-full bg-white/5 border border-border/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 appearance-none transition-all">
                    <option>Alerta do Sistema</option>
                    <option>Autenticação de Pagamento</option>
                    <option>Verificação de Login</option>
                  </select>
                </div>
              </div>

              {/* Delivery Channels */}
              <div className="flex flex-col gap-4">
                <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Canais de Entrega</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { name: 'WebSocket', icon: Wifi },
                    { name: 'Push', icon: Smartphone },
                    { name: 'Email', icon: Mail },
                    { name: 'SMS', icon: MessageSquare },
                  ].map((ch) => (
                    <button
                      key={ch.name}
                      onClick={() => toggleChannel(ch.name)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all ${channels.includes(ch.name)
                        ? 'bg-primary/10 border-primary/40 text-primary shadow-sm shadow-primary/10'
                        : 'bg-white/2 border-border/30 text-muted-foreground hover:border-border/60'
                        }`}
                    >
                      <div className={`w-5 h-5 flex items-center justify-center rounded-md ${channels.includes(ch.name) ? 'bg-primary text-primary-foreground' : 'bg-white/5'}`}>
                        {channels.includes(ch.name) && <Zap className="w-3 h-3 fill-current" />}
                      </div>
                      <span className="text-xs font-bold">{ch.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Payload Editor Card */}
            <div className="bg-card/30 border border-border/50 rounded-2xl p-8 flex flex-col gap-6 shadow-sm">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-purple-100">Editor de Payload</h3>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-2 py-1 bg-white/5 rounded text-[10px] font-bold text-muted-foreground">Latência 12ms</span>
                  <span className="px-2 py-1 bg-white/5 rounded text-[10px] font-bold text-muted-foreground">24 KB</span>
                </div>
              </div>

              <div className="bg-[#0a0a0c] border border-border/50 rounded-xl p-6 font-mono text-sm overflow-hidden relative group">
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <button className="px-3 py-1 bg-white/10 rounded text-[10px] font-bold text-white hover:bg-white/20">Copiar</button>
                </div>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full bg-transparent text-purple-300/90 leading-relaxed resize-none focus:outline-none h-32 no-scrollbar"
                  spellCheck={false}
                />
              </div>
            </div>

            {/* Delivery Options Card */}
            <div className="bg-card/30 border border-border/50 rounded-2xl p-8 flex flex-col gap-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <Settings className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold">Opções de Entrega</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex items-center justify-between p-4 bg-white/2 border border-border/30 rounded-xl">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold">Máximo de Tentativas</span>
                    <span className="text-[10px] text-muted-foreground font-medium">Auto-tentativa em caso de falha</span>
                  </div>
                  <input type="number" defaultValue="3" className="w-16 bg-white/5 border border-border/50 rounded-lg px-3 py-1.5 text-center text-sm font-mono focus:outline-none focus:border-primary/50" />
                </div>

                <div className="flex items-center justify-between p-4 bg-white/2 border border-border/30 rounded-xl">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold">TTL (Minutos)</span>
                    <span className="text-[10px] text-muted-foreground font-medium">Tempo de vida do despacho</span>
                  </div>
                  <input type="number" defaultValue="60" className="w-16 bg-white/5 border border-border/50 rounded-lg px-3 py-1.5 text-center text-sm font-mono focus:outline-none focus:border-primary/50" />
                </div>

                <div className="flex items-center justify-between p-4 bg-white/2 border border-border/30 rounded-xl">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold">Fallback Ativado</span>
                    <span className="text-[10px] text-muted-foreground font-medium">Rota via canal alternativo</span>
                  </div>
                  <button className="text-primary hover:text-primary/80 transition-colors">
                    <ToggleRight className="w-8 h-8" />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/2 border border-border/30 rounded-xl">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold">Selecionar Canal de Fallback</span>
                    <span className="text-[10px] text-muted-foreground font-medium">Redirecionamento automático</span>
                  </div>
                  <select className="bg-white/5 border border-border/50 rounded-lg px-3 py-1.5 text-xs font-bold focus:outline-none focus:border-primary/50">
                    <option>Email</option>
                    <option>SMS</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Scheduling & Preview */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Scheduling Card */}
            <div className="bg-card/30 border border-border/50 rounded-2xl p-8 flex flex-col gap-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold">Agendamento</h3>
              </div>

              <div className="flex flex-col gap-3">
                {[
                  { id: 'Enviar Agora', icon: Zap, label: 'Enviar Agora', desc: 'Execução imediata da fila' },
                  { id: 'Agendar', icon: Calendar, label: 'Agendar', desc: 'Data e hora específicas' },
                  { id: 'Recorrente', icon: Repeat, label: 'Recorrente', desc: 'Despacho baseado em intervalo' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSchedule(s.id)}
                    className={`flex items-center gap-4 p-4 rounded-xl border text-left transition-all ${schedule === s.id
                      ? 'bg-primary/10 border-primary/40 shadow-sm shadow-primary/10'
                      : 'bg-white/2 border-border/30 hover:border-border/60'
                      }`}
                  >
                    <div className={`p-3 rounded-lg ${schedule === s.id ? 'bg-primary/20 text-primary' : 'bg-white/5 text-muted-foreground'}`}>
                      <s.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className={`text-sm font-bold ${schedule === s.id ? 'text-foreground' : 'text-muted-foreground'}`}>{s.label}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{s.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Dispatch Preview Card */}
            <div className="bg-card/30 border border-border/50 rounded-2xl p-8 flex flex-col gap-6 shadow-sm">
              <h3 className="text-xl font-bold">Visualização do Despacho</h3>

              <div className="relative flex flex-col items-center py-8 gap-8">
                {/* Visual Path */}
                <div className="flex items-center justify-center gap-6 relative z-10 w-full">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-white/5 border border-border/50 flex items-center justify-center text-muted-foreground">
                      <Zap className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">CORE</span>
                  </div>

                  <div className="flex-1 h-px bg-gradient-to-r from-primary/50 to-purple-500/50 relative">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
                      <span className="text-[9px] font-mono text-muted-foreground bg-background px-2 py-0.5 rounded border border-border/30">SIMULADO 12ms</span>
                      <span className="text-[9px] font-mono text-muted-foreground mt-1">latência PATH</span>
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary animate-ping" />
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-white/5 border border-border/50 flex items-center justify-center text-muted-foreground relative">
                      <Smartphone className="w-6 h-6" />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-background">
                        U
                      </div>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">EDGE-W CLIENT</span>
                  </div>
                </div>

                <div className="w-full p-4 bg-white/5 rounded-xl border border-border/30 text-center">
                  <p className="text-[11px] text-muted-foreground leading-relaxed italic">
                    "Rota de entrega estimada via cluster US-EAST-1. Protocolos de redundância ativos."
                  </p>
                </div>
              </div>
            </div>

            {/* Execute Dispatch Button */}
            <div className="flex flex-col gap-4">
              {statusMessage && (
                <div className={`p-4 rounded-xl border flex items-center gap-3 animate-in fade-in slide-in-from-top-2 ${statusMessage.type === 'success'
                  ? 'bg-green-500/10 border-green-500/30 text-green-500'
                  : 'bg-red-500/10 border-red-500/30 text-red-500'
                  }`}>
                  {statusMessage.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                  <span className="text-xs font-bold">{statusMessage.text}</span>
                </div>
              )}

              <button
                onClick={handleExecuteDispatch}
                disabled={isSubmitting}
                className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-bold text-sm flex items-center justify-center gap-3 shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all group uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Rocket className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                )}
                {isSubmitting ? 'Processando...' : 'Executar Despacho'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-80 border-l border-border bg-card/10 flex flex-col shrink-0 overflow-hidden">
        <div className="p-6 border-b border-border flex justify-between items-center bg-white/2">
          <h3 className="font-bold text-lg tracking-tight">Transmissão ao Vivo</h3>
          <div className="px-2 py-0.5 bg-red-500/10 rounded text-[10px] font-bold text-red-500 border border-red-500/20">AO VIVO</div>
        </div>

        <div className="p-6 border-b border-border bg-white/2">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Taxa de Transferência</span>
            <span className="text-[10px] font-mono text-muted-foreground">1.2k ops/s</span>
          </div>
          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary to-purple-500 w-3/4 rounded-full" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 no-scrollbar">
          {liveLogs.map((log) => (
            <div key={log.id} className="bg-white/2 border border-border/30 rounded-xl p-4 flex flex-col gap-3 group hover:border-primary/30 transition-all cursor-pointer">
              <div className="flex justify-between items-start">
                <span className={`text-[10px] font-mono font-bold ${log.color || 'text-primary'}`}>#{log.id.substring(0, 8)}</span>
                <span className="text-[10px] text-muted-foreground">{log.time || new Date(log.createdAt).toLocaleTimeString()}</span>
              </div>
              <p className="text-[11px] font-medium text-foreground/90 leading-relaxed">{log.msg || log.content}</p>
              <div className="flex items-center gap-3">
                <span className="text-[9px] font-bold text-muted-foreground uppercase bg-white/5 px-2 py-0.5 rounded border border-border/30 tracking-widest">{log.type || log.category}</span>
                {log.lat && <span className="text-[9px] text-muted-foreground font-mono">Lat: {log.lat}</span>}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-border bg-white/2">
          <button className="w-full flex items-center justify-center gap-2 py-2 text-[10px] font-bold text-muted-foreground hover:text-foreground transition-all uppercase tracking-widest">
            <Layout className="w-3.5 h-3.5" /> Ver Histórico Completo de Despacho
          </button>
        </div>
      </div>
    </div>
  );
};

export default DispatchCenterView;
