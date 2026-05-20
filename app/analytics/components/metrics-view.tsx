import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  CheckCircle2,
  Clock,
  AlertCircle,
  Activity,
  Zap,
  ArrowUpRight,
  Download,
  Filter,
  Wifi,
  Bell,
  Mail,
  MessageSquare,
  Globe,
  Layout
} from 'lucide-react';

const StatCard = ({ title, value, change, status, icon: Icon }: any) => (
  <div className="bg-card/30 border border-border/50 rounded-xl p-4 flex flex-col gap-1">
    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">{title}</p>
    <div className="flex items-end justify-between">
      <h3 className="text-xl font-bold text-foreground">{value}</h3>
      {change && (
        <span className={`text-[10px] font-bold ${change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
          {change}
        </span>
      )}
      {status && (
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-bold text-muted-foreground">{status}</span>
          <div className={`w-1.5 h-1.5 rounded-full ${status === 'Optimal' || status === 'Stable' ? 'bg-green-500' : 'bg-yellow-500'} animate-pulse`} />
        </div>
      )}
    </div>
  </div>
);

const AnalyticsView = () => {
  const [throughputData, setThroughputData] = useState<number[]>([]);

  useEffect(() => {
    setThroughputData(Array.from({ length: 40 }, () => Math.floor(Math.random() * 80) + 20));
  }, []);

  return (
    <div className="flex-1 flex flex-col overflow-y-auto p-6 gap-6 bg-background no-scrollbar">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard title="Notifications Sent" value="1,248,308" change="+12%" />
        <StatCard title="Delivery Rate" value="99.98%" />
        <StatCard title="Active Connections" value="12,402" status="Stable" />
        <StatCard title="Queue Health" value="Optimal" status="Optimal" />
        <StatCard title="Avg Latency (ms)" value="42ms" change="+3ms" />
        <StatCard title="Failed Deliveries" value="12" status="Retry Active" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="bg-card/30 border border-border/50 rounded-xl p-6 flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-foreground">Notification Throughput</h3>
                <p className="text-xs text-muted-foreground">Real-time notifications per second (24h Window)</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="px-2 py-1 bg-white/5 rounded text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /> LIVE
                </div>
                <div className="px-2 py-1 bg-white/5 rounded text-[10px] font-bold text-muted-foreground">2.4k req/s</div>
              </div>
            </div>

            <div className="h-64 flex items-end gap-1 px-2">
              {throughputData.map((val, i) => (
                <div
                  key={i}
                  className="flex-1 bg-primary/20 hover:bg-primary/50 transition-all rounded-t-sm"
                  style={{ height: `${val}%` }}
                />
              ))}
            </div>
          </div>

          <div className="bg-card/30 border border-border/50 rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-border/50 flex justify-between items-center">
              <h3 className="font-bold">Channel Performance</h3>
              <button className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground flex items-center gap-2">
                Export CSV <Download className="w-3 h-3" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] uppercase tracking-widest text-muted-foreground border-b border-border/30">
                    <th className="px-6 py-4 font-bold">Channel</th>
                    <th className="px-6 py-4 font-bold">Success %</th>
                    <th className="px-6 py-4 font-bold">Avg Latency</th>
                    <th className="px-6 py-4 font-bold">Throughput</th>
                    <th className="px-6 py-4 font-bold">Connections</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {[
                    { name: 'WebSocket', icon: Wifi, success: 99.8, latency: '12ms', throughput: '1.2k/s', connections: '8,421', color: 'bg-green-500' },
                    { name: 'Push (iOS/And)', icon: Bell, success: 98.4, latency: '145ms', throughput: '450/s', connections: '3,120', color: 'bg-green-500' },
                    { name: 'Email (SMTP)', icon: Mail, success: 94.2, latency: '2.4s', throughput: '82/s', connections: '142', color: 'bg-green-500' },
                    { name: 'SMS (Twilio)', icon: MessageSquare, success: 97.1, latency: '4.2s', throughput: '15/s', connections: '8', color: 'bg-green-500' },
                    { name: 'Webhook', icon: Globe, success: 88.5, latency: '312ms', throughput: '620/s', connections: '54', color: 'bg-yellow-500' },
                  ].map((row) => (
                    <tr key={row.name} className="hover:bg-white/5 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <row.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                          <span className="text-sm font-medium">{row.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-1.5 w-24 bg-white/5 rounded-full overflow-hidden">
                            <div className={`h-full ${row.color}`} style={{ width: `${row.success}%` }} />
                          </div>
                          <span className="text-xs font-mono">{row.success}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs font-mono text-muted-foreground">{row.latency}</td>
                      <td className="px-6 py-4 text-xs font-mono text-muted-foreground">{row.throughput}</td>
                      <td className="px-6 py-4 text-xs font-mono text-muted-foreground">{row.connections}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-card/30 border border-border/50 rounded-xl p-6 flex flex-col gap-6">
            <h3 className="font-bold text-foreground">Delivery Composition</h3>
            <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50" cy="50" r="40"
                  fill="transparent" stroke="currentColor" strokeWidth="8"
                  strokeDasharray="251.2" strokeDashoffset="25.12"
                  className="text-primary"
                />
                <circle
                  cx="50" cy="50" r="40"
                  fill="transparent" stroke="currentColor" strokeWidth="8"
                  strokeDasharray="251.2" strokeDashoffset="226.08"
                  className="text-yellow-500/50"
                />
                <circle
                  cx="50" cy="50" r="40"
                  fill="transparent" stroke="currentColor" strokeWidth="8"
                  strokeDasharray="251.2" strokeDashoffset="248.68"
                  className="text-red-500/50"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold">99.8%</span>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Efficiency</span>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { label: 'Delivered', count: '1.1M', color: 'bg-primary' },
                { label: 'Retried', count: '124k', color: 'bg-yellow-500/50' },
                { label: 'Failed', count: '12', color: 'bg-red-500/50' },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${item.color}`} />
                    <span className="text-xs text-muted-foreground font-medium">{item.label}</span>
                  </div>
                  <span className="text-xs font-mono font-bold">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card/30 border border-border/50 rounded-xl flex flex-col flex-1 overflow-hidden min-h-[400px]">
            <div className="px-4 py-3 border-b border-border/50 flex justify-between items-center bg-white/5">
              <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground flex items-center gap-2">
                <Layout className="w-3 h-3" /> System Event Stream
              </span>
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/50" />
                <div className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
              </div>
            </div>
            <div className="p-4 font-mono text-[10px] space-y-2 overflow-y-auto max-h-[500px] no-scrollbar">
              {[
                { time: '23:15:49', type: 'DISPATCH_ERROR', msg: 'Push/FCM Connection Lost' },
                { time: '23:15:47', type: 'WS_MESSAGE', msg: 'Webhook/Slack Retrying...' },
                { time: '23:15:44', type: 'DISPATCH_SUCCESS', msg: 'Push/FCM Delivery' },
                { time: '14:24:01', type: 'DISPATCH_SUCCESS', msg: 'Push/FCM Delivery' },
                { time: '14:24:02', type: 'WS_CONNECT', msg: 'Client node_usa_01' },
                { time: '14:24:05', type: 'RETRY_BACKOFF', msg: 'Webhook/Stripe' },
                { time: '14:24:08', type: 'DISPATCH_SUCCESS', msg: 'SMS/Twilio' },
                { time: '14:24:12', type: 'DISPATCH_SUCCESS', msg: 'Email/SendGrid' },
                { time: '14:24:15', type: 'WS_MESSAGE', msg: 'Channel global_broadcast' },
                { time: '14:24:18', type: 'DISPATCH_SUCCESS', msg: 'Push/APNS Delivery' },
                { time: '14:24:20', type: 'DISPATCH_SUCCESS', msg: 'System Alert' },
              ].map((log, i) => (
                <div key={i} className="flex gap-3 opacity-80 hover:opacity-100 transition-opacity">
                  <span className="text-muted-foreground">[{log.time}]</span>
                  <span className={`font-bold ${log.type.includes('SUCCESS') ? 'text-green-400' :
                    log.type.includes('ERROR') ? 'text-red-400' :
                      log.type.includes('RETRY') ? 'text-yellow-400' : 'text-primary'
                    }`}>{log.type}</span>
                  <span className="text-foreground truncate">{log.msg}</span>
                </div>
              ))}
            </div>
            <div className="mt-auto px-4 py-2 border-t border-border/30 bg-white/2 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">Streaming Production Logs...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;
