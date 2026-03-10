"use client";

import { useState } from "react";
import TopBar from "./TopBar";
import Sidebar from "./Sidebar";

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface">
      <TopBar
        notificationCount={3}
        onNotificationClick={() => setNotificationOpen(!notificationOpen)}
      />
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <main
        className={`pt-[64px] transition-all duration-300 ${
          sidebarCollapsed ? "pl-[72px]" : "pl-[260px]"
        }`}
      >
        <div className="p-6 max-w-[1800px]">{children}</div>
      </main>
    </div>
  );
}
