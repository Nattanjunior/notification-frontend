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
  ToggleRight
} from 'lucide-react';
import LayoutClient from '@/app/components/layout/layout-client';

const DispatchCenterView = () => {
  const [priority, setPriority] = useState('High');
  const [channels, setChannels] = useState(['WebSocket', 'Push']);
  const [schedule, setSchedule] = useState('Send Now');

  const toggleChannel = (channel: string) => {
    if (channels.includes(channel)) {
      setChannels(channels.filter(c => c !== channel));
    } else {
      setChannels([...channels, channel]);
    }
  };

  return (
    <div className="flex-1 flex overflow-hidden bg-background">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-y-auto p-8 gap-8 no-scrollbar">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Create New Dispatch</h1>
          <p className="text-muted-foreground text-sm">Configure high-priority notification delivery across multiple infrastructure nodes.</p>
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
                <h3 className="text-xl font-bold">Configuration</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Recipient Identifier */}
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Recipient Identifier</label>
                  <input
                    type="text"
                    defaultValue="usr_9482_alpha_prod"
                    className="w-full bg-white/5 border border-border/50 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:border-primary/50 transition-all"
                  />
                </div>

                {/* Category */}
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Category</label>
                  <select className="w-full bg-white/5 border border-border/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 appearance-none transition-all">
                    <option>System Transaction</option>
                    <option>User Alert</option>
                    <option>Marketing</option>
                  </select>
                </div>

                {/* Priority Level */}
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Priority Level</label>
                  <div className="flex bg-white/5 p-1 rounded-xl border border-border/30 gap-1.5">
                    {['Low', 'Med', 'High'].map((p) => (
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
                  <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Template Selector</label>
                  <select className="w-full bg-white/5 border border-border/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 appearance-none transition-all">
                    <option>System Alert</option>
                    <option>Payment Auth</option>
                    <option>Login Verification</option>
                  </select>
                </div>
              </div>

              {/* Delivery Channels */}
              <div className="flex flex-col gap-4">
                <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Delivery Channels</label>
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
                  <h3 className="text-xl font-bold text-purple-100">Payload Editor</h3>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-2 py-1 bg-white/5 rounded text-[10px] font-bold text-muted-foreground">12ms Latency</span>
                  <span className="px-2 py-1 bg-white/5 rounded text-[10px] font-bold text-muted-foreground">24 KB</span>
                </div>
              </div>

              <div className="bg-[#0a0a0c] border border-border/50 rounded-xl p-6 font-mono text-sm overflow-hidden relative group">
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="px-3 py-1 bg-white/10 rounded text-[10px] font-bold text-white hover:bg-white/20">Copy</button>
                </div>
                <pre className="text-purple-300/90 leading-relaxed">
                  {`{
  "event_id": "dispatch_88291",
  "actor": "system_admin",
  "action": "payment_authorized",
  "metadata": {
    "amount": "499.00",
    "currency": "USD",
    "timestamp": "2023-11-20T14:48:01Z"
  }
}`}
                </pre>
              </div>
            </div>

            {/* Delivery Options Card */}
            <div className="bg-card/30 border border-border/50 rounded-2xl p-8 flex flex-col gap-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <Settings className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold">Delivery Options</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex items-center justify-between p-4 bg-white/2 border border-border/30 rounded-xl">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold">Max Retries</span>
                    <span className="text-[10px] text-muted-foreground font-medium">Auto-retry on failure</span>
                  </div>
                  <input type="number" defaultValue="3" className="w-16 bg-white/5 border border-border/50 rounded-lg px-3 py-1.5 text-center text-sm font-mono focus:outline-none focus:border-primary/50" />
                </div>

                <div className="flex items-center justify-between p-4 bg-white/2 border border-border/30 rounded-xl">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold">TTL (Minutes)</span>
                    <span className="text-[10px] text-muted-foreground font-medium">Time-to-live for dispatch</span>
                  </div>
                  <input type="number" defaultValue="60" className="w-16 bg-white/5 border border-border/50 rounded-lg px-3 py-1.5 text-center text-sm font-mono focus:outline-none focus:border-primary/50" />
                </div>

                <div className="flex items-center justify-between p-4 bg-white/2 border border-border/30 rounded-xl">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold">Fallback Enabled</span>
                    <span className="text-[10px] text-muted-foreground font-medium">Route via alternate channel</span>
                  </div>
                  <button className="text-primary hover:text-primary/80 transition-colors">
                    <ToggleRight className="w-8 h-8" />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/2 border border-border/30 rounded-xl">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold">Select Fallback Channel</span>
                    <span className="text-[10px] text-muted-foreground font-medium">Automatic redirection</span>
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
                <h3 className="text-xl font-bold">Scheduling</h3>
              </div>

              <div className="flex flex-col gap-3">
                {[
                  { id: 'Send Now', icon: Zap, label: 'Send Now', desc: 'Immediate queue execution' },
                  { id: 'Schedule', icon: Calendar, label: 'Schedule', desc: 'Specific date and time' },
                  { id: 'Recurring', icon: Repeat, label: 'Recurring', desc: 'Interval-based dispatch' },
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
              <h3 className="text-xl font-bold">Dispatch Preview</h3>

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
                      <span className="text-[9px] font-mono text-muted-foreground bg-background px-2 py-0.5 rounded border border-border/30">SIMULATED 12ms</span>
                      <span className="text-[9px] font-mono text-muted-foreground mt-1">PATH latency</span>
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
                    "Estimated delivery route via US-EAST-1 cluster. Redundancy protocols active."
                  </p>
                </div>
              </div>
            </div>

            {/* Execute Dispatch Button */}
            <button className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-bold text-sm flex items-center justify-center gap-3 shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all group uppercase tracking-widest">
              <Rocket className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              Execute Dispatch
            </button>
          </div>
        </div>
      </div>

      <div className="w-80 border-l border-border bg-card/10 flex flex-col shrink-0 overflow-hidden">
        <div className="p-6 border-b border-border flex justify-between items-center bg-white/2">
          <h3 className="font-bold text-lg tracking-tight">Live Stream</h3>
          <div className="px-2 py-0.5 bg-red-500/10 rounded text-[10px] font-bold text-red-500 border border-red-500/20">LIVE</div>
        </div>

        <div className="p-6 border-b border-border bg-white/2">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Throughput</span>
            <span className="text-[10px] font-mono text-muted-foreground">1.2k ops/s</span>
          </div>
          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary to-purple-500 w-3/4 rounded-full" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 no-scrollbar">
          {[
            { id: '#DP-44021', time: '14:55:02', msg: 'Payment authorized for @jane_dev', type: 'WS_OK', lat: '8ms', color: 'text-green-400' },
            { id: '#DP-44018', time: '14:54:58', msg: 'System alert: High CPU usage on Node-7', type: 'PUSH_RETRY', lat: '240ms', color: 'text-yellow-400' },
            { id: '#DP-44015', time: '14:54:45', msg: 'API key rotated for Project: Mercury', type: 'WS_OK', lat: '11ms', color: 'text-green-400' },
            { id: '#DP-44012', time: '14:54:20', msg: 'Batch dispatch: 154 items queued', type: 'ASYNC_OK', lat: '', color: 'text-blue-400' },
            { id: '#DP-44010', time: '14:53:55', msg: 'Dispatch failed: Recipient unreachable', type: 'ERR_TIMEOUT', lat: '', color: 'text-red-400' },
          ].map((log) => (
            <div key={log.id} className="bg-white/2 border border-border/30 rounded-xl p-4 flex flex-col gap-3 group hover:border-primary/30 transition-all cursor-pointer">
              <div className="flex justify-between items-start">
                <span className={`text-[10px] font-mono font-bold ${log.color}`}>{log.id}</span>
                <span className="text-[10px] text-muted-foreground">{log.time}</span>
              </div>
              <p className="text-[11px] font-medium text-foreground/90 leading-relaxed">{log.msg}</p>
              <div className="flex items-center gap-3">
                <span className="text-[9px] font-bold text-muted-foreground uppercase bg-white/5 px-2 py-0.5 rounded border border-border/30 tracking-widest">{log.type}</span>
                {log.lat && <span className="text-[9px] text-muted-foreground font-mono">Lat: {log.lat}</span>}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-border bg-white/2">
          <button className="w-full flex items-center justify-center gap-2 py-2 text-[10px] font-bold text-muted-foreground hover:text-foreground transition-all uppercase tracking-widest">
            <Layout className="w-3.5 h-3.5" /> View Full Dispatch History
          </button>
        </div>
      </div>
    </div>
  );
};

export default DispatchCenterView;
