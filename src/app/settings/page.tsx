"use client";

import React, { useState } from "react";
import AIConfiguration from "@/components/settings/AIConfiguration";
import AlertPreferences from "@/components/settings/AlertPreferences";
import UserManagement from "@/components/settings/UserManagement";
import SystemHealth from "@/components/settings/SystemHealth";
import {
  Save,
  Brain,
  Timer,
  Bell,
  Users,
  Activity,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";

type SettingsTab =
  | "ai-configuration"
  | "signal-timing"
  | "alert-preferences"
  | "user-management"
  | "system-health";

const tabs: { id: SettingsTab; label: string; icon: React.ReactNode }[] = [
  {
    id: "ai-configuration",
    label: "AI Configuration",
    icon: <Brain className="h-4 w-4" />,
  },
  {
    id: "signal-timing",
    label: "Signal Timing",
    icon: <Timer className="h-4 w-4" />,
  },
  {
    id: "alert-preferences",
    label: "Alert Preferences",
    icon: <Bell className="h-4 w-4" />,
  },
  {
    id: "user-management",
    label: "User Management",
    icon: <Users className="h-4 w-4" />,
  },
  {
    id: "system-health",
    label: "System Health",
    icon: <Activity className="h-4 w-4" />,
  },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("ai-configuration");

  const renderContent = () => {
    switch (activeTab) {
      case "ai-configuration":
        return <AIConfiguration />;
      case "signal-timing":
        return (
          <div className="glass rounded-2xl shadow-card">
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <Timer className="mx-auto h-12 w-12 text-gray-600" />
                <h3 className="mt-4 text-lg font-semibold text-gray-200">
                  Signal Timing
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Signal timing configuration coming soon
                </p>
              </div>
            </div>
          </div>
        );
      case "alert-preferences":
        return <AlertPreferences />;
      case "user-management":
        return <UserManagement />;
      case "system-health":
        return <SystemHealth />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-gradient-blue">
            System Settings
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Configure system parameters, alerts, and user access
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 px-4 py-2 text-sm font-medium text-white shadow-neon-blue hover:from-brand-400 hover:to-brand-500 transition-all duration-200">
          <Save className="h-4 w-4" />
          Save All
        </button>
      </div>

      {/* Main layout: sidebar + content */}
      <div className="flex gap-6">
        {/* Left sidebar */}
        <nav className="w-56 flex-shrink-0">
          <div className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-all duration-200",
                  activeTab === tab.id
                    ? "bg-brand-500/10 text-brand-400 border-l-2 border-brand-400"
                    : "text-gray-400 bg-white/[0.03] hover:bg-white/[0.05] hover:text-gray-300 border-l-2 border-transparent"
                )}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Right content area */}
        <div className="flex-1 min-w-0">{renderContent()}</div>
      </div>

      {/* Bottom action row */}
      <div className="flex items-center justify-between border-t border-white/[0.06] pt-6">
        <button className="inline-flex items-center gap-2 rounded-xl bg-transparent px-4 py-2 text-sm font-medium text-gray-400 hover:bg-white/[0.04] hover:text-gray-300 transition-all duration-200">
          <RotateCcw className="h-4 w-4" />
          Reset to Defaults
        </button>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-xl bg-white/[0.04] border border-white/[0.06] px-4 py-2 text-sm font-medium text-gray-400 hover:bg-white/[0.06] hover:text-gray-300 transition-all duration-200">
            Cancel
          </button>
          <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 px-4 py-2 text-sm font-medium text-white shadow-neon-blue hover:from-brand-400 hover:to-brand-500 transition-all duration-200">
            <Save className="h-4 w-4" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
