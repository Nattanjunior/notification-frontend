import React from 'react';

const LiveLog = () => {
  const logs = [
    { time: '12:09:01', type: 'AUTH', message: 'REQ ID: e3b2-9x11-2041 SUCCESS', typeColor: 'text-green-500' },
    { time: '12:08:58', type: 'TCP', message: 'CONN ESTABLISHED 192.168.1.45:443', typeColor: 'text-blue-400' },
    { time: '12:08:00', type: 'WARN', message: 'RETRY ATTEMPT 3/5 FOR SVC_DISPATCH', typeColor: 'text-yellow-500' },
    { time: '12:07:32', type: 'WS', message: 'HANDSHAKE COMPLETE. PROTOCOL v2', typeColor: 'text-green-500' },
    { time: '12:07:19', type: 'LOG', message: 'FLUSHING CACHE FOR WORKER_09', typeColor: 'text-muted' },
    { time: '12:06:55', type: 'AUTH', message: 'REQ ID: a9f4-1z02-8871 SUCCESS', typeColor: 'text-green-500' },
    { time: '12:06:22', type: 'TCP', message: 'CONN CLOSED FIN_WAIT_2 (TIMEOUT)', typeColor: 'text-muted' },
  ];

  return (
    <div className="w-80 border-l border-border bg-background flex flex-col h-full overflow-hidden">
      <div className="p-6">
        <h2 className="text-[10px] font-bold text-foreground uppercase tracking-widest">Live Connection Log</h2>
        <span className="text-[8px] text-muted uppercase font-bold tracking-tighter">Streaming Terminal</span>
      </div>

      <div className="flex-1 overflow-y-auto px-6 font-mono text-[11px]">
        <div className="space-y-4">
          {logs.map((log, index) => (
            <div key={index} className="group">
              <div className="flex gap-2">
                <span className="text-muted shrink-0">{log.time}</span>
                <span className={`${log.typeColor} font-bold shrink-0`}>[{log.type}]</span>
              </div>
              <div className="text-muted-foreground mt-0.5 group-hover:text-foreground transition-colors leading-relaxed">
                {log.message}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-border flex items-center justify-between text-[10px] font-mono text-muted">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span>Packets In: 12.4kb/s</span>
        </div>
        <div className="flex items-center gap-2">
           <div className="w-1.5 h-1.5 rounded-full bg-muted" />
          <span>Out: 4.8kb/s</span>
        </div>
      </div>
    </div>
  );
};

export default LiveLog;
