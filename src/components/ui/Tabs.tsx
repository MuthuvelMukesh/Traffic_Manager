"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export default function Tabs({ tabs, activeTab, onTabChange }: TabsProps) {
  return (
    <div className="bg-white/[0.03] rounded-xl p-1 border border-white/[0.06]">
      <nav className="flex gap-1" aria-label="Tabs">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-brand-500/15 text-brand-400 shadow-[0_0_12px_rgba(0,212,255,0.1)]"
                  : "text-gray-400 hover:text-gray-300 hover:bg-white/[0.04]"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              {tab.icon && <span className="flex-shrink-0">{tab.icon}</span>}
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
