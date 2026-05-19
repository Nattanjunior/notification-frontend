import React from 'react';
import { BarChart3, MessageSquare, Users, Settings, FileText, LifeBuoy, PlusCircle } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'metrics', icon: <BarChart3 className="w-5 h-5" />, label: 'Metrics' },
    { id: 'feed', icon: <MessageSquare className="w-5 h-5" />, label: 'Feed' },
    { id: 'create', icon: <PlusCircle className="w-5 h-5" />, label: 'Create Notification' },
    { id: 'users', icon: <Users className="w-5 h-5" />, label: 'Users' },
    { id: 'settings', icon: <Settings className="w-5 h-5" />, label: 'Settings' },
  ];

  const bottomItems = [
    { icon: <FileText className="w-5 h-5" />, label: 'Docs' },
    { icon: <LifeBuoy className="w-5 h-5" />, label: 'Support' },
  ];

  return (
    <aside className="w-64 bg-sidebar border-r border-border flex flex-col h-full text-muted overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col">
          <span className="text-foreground font-bold text-xl tracking-tight">NOTIF_ENGINE</span>
          <span className="text-[10px] text-muted-foreground mt-1 opacity-60">v2.4.1-stable</span>
        </div>
      </div>

      <nav className="flex-1 mt-4">
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${activeTab === item.id
                    ? 'bg-primary/10 text-primary border-l-2 border-primary rounded-none ml-[-12px] pl-[14px]'
                    : 'hover:bg-white/5 hover:text-foreground'
                  }`}
              >
                {item.icon}
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 mt-auto space-y-4">
        <button className="w-full py-2 px-4 bg-primary/20 text-primary border border-primary/30 rounded-md text-xs font-semibold hover:bg-primary/30 transition-all">
          System Status
        </button>

        <ul className="space-y-1">
          {bottomItems.map((item) => (
            <li key={item.label}>
              <a
                href="#"
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 hover:text-foreground transition-colors"
              >
                {item.icon}
                <span className="text-sm font-medium">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
