'use client';

import { useState } from 'react';
import Sidebar from "@/app/components/layout/sidebar";
import Header from "@/app/components/layout/header";
import ActivityFeed from "@/app/components/dashboard/activity-feed";
import LiveLog from "@/app/components/dashboard/live-log";
import DispatchCore from "@/app/components/dashboard/dispatch-core";

export default function Home() {
  const [activeTab, setActiveTab] = useState('feed');

  return (
    <div className="flex h-screen bg-background overflow-hidden text-foreground">
      {/* Sidebar Fixa */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Área Principal */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        <main className="flex-1 flex overflow-hidden">
          {activeTab === 'feed' ? (
            <>
              {/* Feed de Atividades (Centro) */}
              <ActivityFeed />

              {/* Log em Tempo Real (Direita) - Apenas no Feed */}
              <LiveLog />
            </>
          ) : activeTab === 'create' ? (
            <DispatchCore />
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted">
              Página em desenvolvimento...
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
