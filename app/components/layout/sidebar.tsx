import React from 'react';
import {
  BarChart3,
  MessageSquare,
  Users,
  Settings,
  FileText,
  LifeBuoy,
  PlusCircle,
  Key,
  Link2,
  Webhook,
  Layout,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Send
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isCollapsed, setIsCollapsed }) => {
  const menuItems = [
    { id: 'metrics', icon: <BarChart3 className="w-5 h-5" />, label: 'Analytics' },
    { id: 'feed', icon: <MessageSquare className="w-5 h-5" />, label: 'Feed' },
    { id: 'create', icon: <Send className="w-5 h-5" />, label: 'Dispatch Center' },
    { id: 'api-keys', icon: <Key className="w-5 h-5" />, label: 'API Keys' },
    { id: 'connections', icon: <Link2 className="w-5 h-5" />, label: 'Connections' },
    { id: 'webhooks', icon: <Webhook className="w-5 h-5" />, label: 'Webhooks' },
    { id: 'templates', icon: <Layout className="w-5 h-5" />, label: 'Templates' },
  ];

  const bottomItems = [
    { icon: <FileText className="w-5 h-5" />, label: 'Docs' },
    { icon: <LifeBuoy className="w-5 h-5" />, label: 'Support' },
  ];

  return (
    <aside
      className={`bg-sidebar border-r border-border flex flex-col h-full text-muted transition-all duration-300 ease-in-out relative ${isCollapsed ? 'w-20' : 'w-64'
        }`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-10 bg-sidebar border border-border rounded-full p-1 text-muted-foreground hover:text-primary transition-colors z-50"
      >
        {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>

      <div className={`p-6 ${isCollapsed ? 'items-center px-2' : ''} flex flex-col transition-all`}>
        {!isCollapsed ? (
          <>
            <span className="text-foreground font-bold text-xl tracking-tight">Obsidian</span>
            <span className="text-foreground font-bold text-xl tracking-tight mt-[-4px]">Infrastructure</span>
            <span className="text-[10px] text-muted-foreground mt-1 opacity-60 uppercase tracking-widest">v2.4.0-stable</span>
          </>
        ) : (
          <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center text-primary">
            <ShieldCheck className="w-6 h-6" />
          </div>
        )}
      </div>

      <nav className="flex-1 mt-4 overflow-y-auto no-scrollbar">
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${activeTab === item.id
                    ? 'bg-primary/10 text-primary border-l-2 border-primary rounded-none ml-[-12px] pl-[14px]'
                    : 'hover:bg-white/5 hover:text-foreground'
                  } ${isCollapsed ? 'justify-center px-0 ml-0 border-l-0 rounded-lg' : ''}`}
                title={isCollapsed ? item.label : ''}
              >
                <div className="min-w-[20px]">{item.icon}</div>
                {!isCollapsed && <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className={`p-4 mt-auto space-y-4 ${isCollapsed ? 'items-center px-2' : ''} flex flex-col`}>
        {!isCollapsed ? (
          <div className="w-full p-3 bg-white/5 border border-border/50 rounded-lg flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">System Status: Healthy</span>
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          </div>
        )}

        <ul className="space-y-1 w-full">
          {bottomItems.map((item) => (
            <li key={item.label}>
              <a
                href="#"
                className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 hover:text-foreground transition-colors ${isCollapsed ? 'justify-center' : ''
                  }`}
                title={isCollapsed ? item.label : ''}
              >
                {item.icon}
                {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
