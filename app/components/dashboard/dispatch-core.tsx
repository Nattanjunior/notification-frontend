import React from 'react';
import { Send, Copy, Zap, Activity, Clock, Terminal } from 'lucide-react';

const DispatchCore = () => {
  return (
    <div className="flex-1 p-8 overflow-y-auto bg-background">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dispatch Core</h1>
          <p className="text-muted text-sm mt-1">Queue new notification payloads for high-priority routing clusters.</p>
        </div>
        <div className="flex items-center gap-3 bg-card px-4 py-2 rounded-lg border border-border">
          <span className="text-[10px] font-mono text-muted">POST</span>
          <span className="text-[10px] font-mono text-foreground">/api/v2/notifications</span>
          <Copy className="w-3 h-3 text-muted hover:text-foreground cursor-pointer" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formulário de Envio */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border border-border rounded-xl p-6 space-y-6">
            <div>
              <label className="text-[10px] font-bold text-muted uppercase tracking-wider block mb-2">Recipient Identifier</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">@</span>
                <input 
                  type="text" 
                  placeholder="user_uuid_0x7829..." 
                  className="w-full bg-background border border-border rounded-lg py-3 pl-8 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold text-muted uppercase tracking-wider block mb-2">Category</label>
                <select className="w-full bg-background border border-border rounded-lg py-3 px-4 text-sm focus:outline-none focus:border-primary/50 transition-colors appearance-none">
                  <option>System Critical</option>
                  <option>Social Alert</option>
                  <option>Marketing</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-bold text-muted uppercase tracking-wider block mb-2">Priority Level</label>
                <div className="flex bg-background border border-border rounded-lg p-1">
                  <button className="flex-1 py-2 text-[10px] font-bold text-muted hover:text-foreground transition-colors">LOW</button>
                  <button className="flex-1 py-2 text-[10px] font-bold text-muted hover:text-foreground transition-colors border-x border-border">NORMAL</button>
                  <button className="flex-1 py-2 text-[10px] font-bold bg-primary/20 text-primary rounded-md">URGENT</button>
                </div>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-muted uppercase tracking-wider block mb-2">Content Payload (JSON/STRING)</label>
              <textarea 
                rows={6}
                placeholder='{ "title": "Service Outage", "body": "Critical failure in Node-04..." }'
                className="w-full bg-background border border-border rounded-lg p-4 text-sm font-mono focus:outline-none focus:border-primary/50 transition-colors resize-none"
              />
            </div>

            <button className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
              <Send className="w-4 h-4" />
              Send Notification
            </button>
          </div>

          <div className="flex items-center gap-6 text-[10px] font-bold">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-muted">Edge Nodes Ready</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-muted">Queueing Active</span>
            </div>
            <div className="ml-auto text-muted uppercase tracking-widest opacity-50">
              Est. Latency: 12ms
            </div>
          </div>
        </div>

        {/* Métricas e Live Stream */}
        <div className="space-y-6">
          {/* Throughput Card */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-bold text-muted uppercase tracking-wider">Throughput</span>
              <Zap className="w-3 h-3 text-primary" />
            </div>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-2xl font-bold">12,482</span>
              <span className="text-muted text-[10px]">req/s</span>
            </div>
            <div className="h-20 flex items-end gap-1">
              {[40, 60, 45, 70, 50, 90, 30, 80, 55, 65].map((h, i) => (
                <div 
                  key={i} 
                  className={`flex-1 rounded-t-sm transition-all ${i === 5 ? 'bg-primary' : 'bg-primary/20'}`} 
                  style={{ height: `${h}%` }} 
                />
              ))}
            </div>
          </div>

          {/* Queue Health & Latency */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card border border-border rounded-xl p-4">
              <span className="text-[10px] font-bold text-muted uppercase tracking-wider block mb-2">Queue Health</span>
              <div className="text-xl font-bold mb-2">98.4%</div>
              <div className="h-1 bg-border rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-[98.4%]" />
              </div>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <span className="text-[10px] font-bold text-muted uppercase tracking-wider block mb-2">Latency P99</span>
              <div className="text-xl font-bold mb-1">42ms</div>
              <div className="text-[10px] text-green-500 flex items-center gap-1">
                <Activity className="w-2 h-2" />
                3ms lower
              </div>
            </div>
          </div>

          {/* Live Stream */}
          <div className="bg-card border border-border rounded-xl overflow-hidden flex flex-col h-[300px]">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <span className="text-[10px] font-bold text-muted uppercase tracking-wider">Live Stream</span>
              <div className="flex items-center gap-1">
                <div className="w-1 h-1 rounded-full bg-red-500" />
                <span className="text-[8px] text-red-500 font-bold uppercase tracking-tighter">Real-Time</span>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3 font-mono text-[10px]">
              {[
                { time: '09:42:01', event: 'DISPATCH_SUCCESS', val: '0.8ms' },
                { time: '09:41:58', event: 'ACK_RECEIVED', val: '1.2ms' },
                { time: '09:41:45', event: 'DISPATCH_SUCCESS', val: '0.7ms' },
                { time: '09:41:30', event: 'RETRY_BACKOFF', val: '45.0ms', color: 'text-orange-400' },
                { time: '09:41:22', event: 'DISPATCH_SUCCESS', val: '0.9ms' },
                { time: '09:41:10', event: 'DISPATCH_SUCCESS', val: '0.8ms' },
              ].map((log, i) => (
                <div key={i} className="flex justify-between items-center group">
                  <span className="text-muted">{log.time}</span>
                  <span className={`font-bold ${log.color || 'text-muted-foreground'} group-hover:text-foreground transition-colors`}>{log.event}</span>
                  <span className="text-muted">{log.val}</span>
                </div>
              ))}
            </div>
            <button className="p-3 text-[10px] font-bold text-muted hover:text-foreground bg-white/5 border-t border-border transition-colors text-center">
              View Full Audit Logs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DispatchCore;
