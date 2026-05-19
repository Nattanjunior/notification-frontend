import React from 'react';
import {
  Cloud,
  Box,
  Database,
  ArrowUpRight,
  ArrowDownRight,
  Mail,
  MessageSquare,
  Bell,
  Filter,
  Download,
  CheckCircle2,
  Clock,
  Zap
} from 'lucide-react';

const MetricCard = ({ title, subtitle, value, subvalue, status, icon: Icon, progress }: any) => (
  <div className="bg-card/30 border border-border/50 rounded-xl p-5 flex flex-col justify-between">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">{title}</p>
        <h3 className="text-lg font-bold text-foreground">{subtitle}</h3>
      </div>
      <div className="p-2 bg-white/5 rounded-lg">
        <Icon className="w-5 h-5 text-muted-foreground" />
      </div>
    </div>

    <div className="mt-4">
      {progress !== undefined && (
        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-2">
          <div className="h-full bg-primary" style={{ width: `${progress}%` }}></div>
        </div>
      )}
      <div className="flex justify-between items-end">
        <div>
          <span className="text-2xl font-bold">{value}</span>
          <span className="text-xs text-muted-foreground ml-2">{subvalue}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className={`w-2 h-2 rounded-full ${status === 'healthy' ? 'bg-green-500' : 'bg-yellow-500'} animate-pulse`} />
          <span className="text-[10px] uppercase tracking-wider font-bold opacity-70">
            {status === 'healthy' ? 'HEALTHY' : 'SYNC ACTIVE'}
          </span>
        </div>
      </div>
    </div>
  </div>
);

const MetricsView = () => {
  return (
    <div className="flex-1 flex flex-col overflow-y-auto p-6 gap-6 bg-background">
      {/* Top Row - Infrastructure Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title="Infrastructure"
          subtitle="AWS EC2"
          value="85%"
          subvalue="Load"
          status="healthy"
          icon={Cloud}
          progress={85}
        />
        <MetricCard
          title="Containers"
          subtitle="Docker Nodes"
          value="12/12"
          subvalue="Active"
          status="healthy"
          icon={Box}
          extra={<span className="text-xs text-muted-foreground">2.3s Spin-up</span>}
        />
        <MetricCard
          title="Storage"
          subtitle="PostgreSQL"
          value="1.2ms"
          subvalue="Replica Lag"
          status="healthy"
          icon={Database}
        />
      </div>

      {/* Middle Row - Charts and Event Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Stats */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Global Read Rate */}
          <div className="bg-card/30 border border-border/50 rounded-xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-6">Global Read Rate</p>
            <div className="relative w-40 h-40 flex items-center justify-center">
              {/* Simple SVG Circle Gauge */}
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="80" cy="80" r="70"
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-white/5"
                />
                <circle
                  cx="80" cy="80" r="70"
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeDasharray={440}
                  strokeDashoffset={440 - (440 * 0.9)}
                  strokeLinecap="round"
                  className="text-primary"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold">90%</span>
                <span className="text-xs text-green-400 flex items-center gap-0.5">
                  <ArrowUpRight className="w-3 h-3" /> +2.4%
                </span>
              </div>
            </div>
          </div>

          {/* Total Sent */}
          <div className="bg-card/30 border border-border/50 rounded-xl p-6">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-2">Total Sent (24h)</p>
            <h3 className="text-4xl font-bold mb-6">1.28M</h3>

            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Success</span>
                <span className="font-mono">1,274,402</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Failed</span>
                <span className="font-mono text-red-400">5,598</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Event Stream */}
        <div className="lg:col-span-8 bg-card/30 border border-border/50 rounded-xl flex flex-col overflow-hidden">
          <div className="px-4 py-3 border-b border-border/50 flex justify-between items-center bg-white/5">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50" />
              </div>
              <span className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground ml-2 flex items-center gap-1.5">
                <Zap className="w-3 h-3" /> Real-time Event Stream
              </span>
            </div>
          </div>
          <div className="p-4 font-mono text-[11px] space-y-2 overflow-y-auto max-h-[400px]">
            <div className="flex gap-4">
              <span className="text-muted-foreground whitespace-nowrap">[14:22:01.042]</span>
              <span className="text-green-400 font-bold w-12">INFO</span>
              <span className="text-foreground">Webhook response 200 OK from endpoint: stripe.com/events</span>
            </div>
            <div className="flex gap-4">
              <span className="text-muted-foreground whitespace-nowrap">[14:22:01.118]</span>
              <span className="text-primary font-bold w-12">PUSH</span>
              <span className="text-foreground">Delivered "New Login" notification to device_id: f2-99a-01</span>
            </div>
            <div className="flex gap-4">
              <span className="text-muted-foreground whitespace-nowrap">[14:22:01.290]</span>
              <span className="text-green-400 font-bold w-12">INFO</span>
              <span className="text-foreground">Buffer flush successful. 1024 messages persisted to PostgreSQL.</span>
            </div>
            <div className="flex gap-4">
              <span className="text-muted-foreground whitespace-nowrap">[14:22:01.405]</span>
              <span className="text-red-400 font-bold w-12">ERR_</span>
              <span className="text-foreground">Retrying SMS delivery for +1-XXX-XXX-4921 (Attempt 2/3)</span>
            </div>
            <div className="flex gap-4">
              <span className="text-muted-foreground whitespace-nowrap">[14:22:01.552]</span>
              <span className="text-purple-400 font-bold w-12">EMAIL</span>
              <span className="text-foreground">Rendered MJML template "weekly_digest" in 12ms</span>
            </div>
            <div className="flex gap-4">
              <span className="text-muted-foreground whitespace-nowrap">[14:22:01.688]</span>
              <span className="text-green-400 font-bold w-12">INFO</span>
              <span className="text-foreground">User token refreshed for session_hash: 9e72...b01c</span>
            </div>
            <div className="flex gap-4">
              <span className="text-muted-foreground whitespace-nowrap">[14:22:01.810]</span>
              <span className="text-blue-400 font-bold w-12">WS_UP</span>
              <span className="text-foreground">Client connected to US-EAST-1 cluster node A</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Delivery Metrics Table */}
      <div className="bg-card/30 border border-border/50 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-border/50 flex justify-between items-center">
          <h3 className="font-bold">Channel Delivery Metrics</h3>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
              <Filter className="w-3 h-3" /> Filter
            </button>
            <button className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
              <Download className="w-3 h-3" /> Export CSV
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider text-muted-foreground border-b border-border/30">
                <th className="px-6 py-4 font-semibold">Channel</th>
                <th className="px-6 py-4 font-semibold">Availability</th>
                <th className="px-6 py-4 font-semibold">Latency (P95)</th>
                <th className="px-6 py-4 font-semibold">Success Rate</th>
                <th className="px-6 py-4 font-semibold">24h Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {[
                { name: 'Email Service', icon: Mail, availability: '99.98%', latency: '1.2s', success: '98.5%', trend: [40, 70, 45, 90, 65, 80, 50] },
                { name: 'Push Gateway', icon: Bell, availability: '100.0%', latency: '145ms', success: '99.9%', trend: [30, 40, 35, 50, 45, 60, 55] },
                { name: 'SMS Carrier', icon: MessageSquare, availability: '97.4%', latency: '0.8s', success: '92.1%', trend: [80, 60, 70, 50, 65, 40, 30] },
              ].map((row) => (
                <tr key={row.name} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/5 rounded-lg text-muted-foreground group-hover:text-primary transition-colors">
                        <row.icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium">{row.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${parseFloat(row.availability) > 99 ? 'bg-green-500' : 'bg-yellow-500'}`} />
                      <span className="text-sm font-mono">{row.availability}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-mono">{row.latency}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono">{row.success}</span>
                      <ArrowUpRight className="w-3 h-3 text-green-400" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {/* Fake Sparkline using CSS bars */}
                    <div className="flex items-end gap-1 h-8">
                      {row.trend.map((val, i) => (
                        <div
                          key={i}
                          className="w-1 bg-primary/40 rounded-t-sm group-hover:bg-primary/70 transition-all"
                          style={{ height: `${val}%` }}
                        />
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MetricsView;
