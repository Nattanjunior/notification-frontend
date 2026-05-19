import React from 'react';
import FeedCard from './feed-card';

const ActivityFeed = () => {
  const feedItems: Array<React.ComponentProps<typeof FeedCard>> = [
    {
      type: 'system',
      title: 'Auto-Scaling Triggered',
      description: 'Cluster node count increased to 12. Threshold exceeded for 5 consecutive minutes in US-EAST-1 (Zone A).',
      time: '12:05:02',
    },
    {
      type: 'social',
      title: 'User Access Escalated',
      description: 'Admin privileges granted to @m_rossi by system override policy SEC-04.',
      time: '12:38:15',
    },
    {
      type: 'promo',
      title: 'Premium Feature Update',
      description: 'v3.0 Edge deployment is now available for all enterprise accounts. Check the roadmap for details.',
      time: '11:59:02',
    },
    {
      type: 'critical',
      title: 'Database Latency Spike',
      description: 'Shard #04 reporting P99 latency above 500ms. Root cause investigation initiated by watchdog-bot.',
      time: '11:12:11',
    },
  ];

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Activity Feed</h1>
          <p className="text-muted text-sm mt-1">Real-time alerts and system events cluster-wide.</p>
        </div>
        <div className="flex items-center gap-1 bg-card p-1 rounded-lg border border-border">
          <button className="px-4 py-1.5 text-xs font-bold bg-primary/20 text-primary rounded-md border border-primary/30">All</button>
          <button className="px-4 py-1.5 text-xs font-bold text-muted hover:text-foreground">Unread</button>
          <button className="px-4 py-1.5 text-xs font-bold text-muted hover:text-foreground">Canceled</button>
        </div>
      </div>

      <div className="space-y-4 max-w-3xl">
        {feedItems.map((item, index) => (
          <FeedCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;
