import React from 'react';
import { Settings, Users, Star, AlertTriangle } from 'lucide-react';

interface FeedCardProps {
  type: 'system' | 'social' | 'promo' | 'critical';
  title: string;
  description: string;
  time: string;
}

const FeedCard: React.FC<FeedCardProps> = ({ type, title, description, time }) => {
  const getStyles = () => {
    switch (type) {
      case 'system':
        return {
          icon: <Settings className="w-4 h-4 text-primary" />,
          label: 'SYSTEM',
          labelBg: 'bg-primary/20 text-primary border-primary/30',
          border: 'border-l-primary'
        };
      case 'social':
        return {
          icon: <Users className="w-4 h-4 text-purple-400" />,
          label: 'SOCIAL',
          labelBg: 'bg-purple-400/20 text-purple-400 border-purple-400/30',
          border: 'border-l-purple-400'
        };
      case 'promo':
        return {
          icon: <Star className="w-4 h-4 text-yellow-400" />,
          label: 'PROMO',
          labelBg: 'bg-yellow-400/20 text-yellow-400 border-yellow-400/30',
          border: 'border-l-yellow-400'
        };
      case 'critical':
        return {
          icon: <AlertTriangle className="w-4 h-4 text-red-500" />,
          label: 'CRITICAL',
          labelBg: 'bg-red-500/20 text-red-500 border-red-500/30',
          border: 'border-l-red-500'
        };
    }
  };

  const styles = getStyles();

  return (
    <div className={`bg-card border border-border rounded-lg p-5 transition-all hover:bg-white/5 cursor-pointer`}>
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <div className="mt-1 p-2 rounded-lg bg-background border border-border">
            {styles.icon}
          </div>
          <div>
            <h3 className={`font-semibold text-base ${type === 'critical' ? 'text-red-400' : 'text-foreground'}`}>
              {title}
            </h3>
            <p className="text-muted text-sm mt-1 max-w-md leading-relaxed">
              {description}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className={`px-2 py-0.5 rounded text-[10px] font-bold border ${styles.labelBg}`}>
            {styles.label}
          </div>
          <span className="text-[10px] font-mono text-muted">{time}</span>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
