'use client';

import { useState } from 'react';
import Sidebar from "@/app/components/layout/sidebar";
import Header from "@/app/components/layout/header";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-background overflow-hidden text-foreground">
      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      <main className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        <Header />
        <main className="flex-1 flex overflow-hidden">
          {children}
        </main>
      </main>
    </div>
  );
}
