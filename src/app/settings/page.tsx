"use client";

import React, { useState, useEffect } from "react";
import AIConfiguration from "@/components/settings/AIConfiguration";
import AlertPreferences from "@/components/settings/AlertPreferences";
import UserManagement from "@/components/settings/UserManagement";
import SystemHealth from "@/components/settings/SystemHealth";
import SignalTiming from "@/components/settings/SignalTiming";
import type { AIConfig } from "@/types";
import {
  Save,
  Brain,
  Timer,
  Bell,
  Users,
  Activity,
  RotateCcw,
  CheckCircle,
  X,
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

const AI_CONFIG_KEY = "tm:ai-config";
const ALERT_PREFS_KEY = "tm:alert-preferences";

function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("ai-configuration");
  const [aiConfig, setAiConfig] = useState<AIConfig | undefined>(undefined);
  const [alertSettings, setAlertSettings] = useState<Record<string, unknown> | undefined>(undefined);
  const [isDirty, setIsDirty] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  // Load persisted settings on mount
  useEffect(() => {
    const savedAi = loadFromStorage<AIConfig | null>(AI_CONFIG_KEY, null);
    if (savedAi) setAiConfig(savedAi);
    const savedAlerts = loadFromStorage<Record<string, unknown> | null>(ALERT_PREFS_KEY, null);
    if (savedAlerts) setAlertSettings(savedAlerts as Record<string, unknown>);
  }, []);

  const handleSave = () => {
    if (aiConfig) localStorage.setItem(AI_CONFIG_KEY, JSON.stringify(aiConfig));
    if (alertSettings) localStorage.setItem(ALERT_PREFS_KEY, JSON.stringify(alertSettings));
    setIsDirty(false);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3500);
  };

  const handleReset = () => {
    localStorage.removeItem(AI_CONFIG_KEY);
    localStorage.removeItem(ALERT_PREFS_KEY);
    setAiConfig(undefined);
    setAlertSettings(undefined);
    setIsDirty(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "ai-configuration":
        return (
          <AIConfiguration
            config={aiConfig}
            onChange={(c) => { setAiConfig(c); setIsDirty(true); }}
          />
        );
      case "signal-timing":
        return <SignalTiming />;
      case "alert-preferences":
        return (
          <AlertPreferences
            settings={alertSettings as any}
            onChange={(s) => { setAlertSettings(s as any); setIsDirty(true); }}
          />
        );
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
        <button
          onClick={handleSave}
          className={cn(
            "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-white shadow-neon-blue transition-all duration-200",
            isDirty
              ? "bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-400 hover:to-brand-500"
              : "bg-gradient-to-r from-brand-500/60 to-brand-600/60 hover:from-brand-500 hover:to-brand-600"
          )}
        >
          <Save className="h-4 w-4" />
          Save All{isDirty && " *"}
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
        <button
          onClick={handleReset}
          className="inline-flex items-center gap-2 rounded-xl bg-transparent px-4 py-2 text-sm font-medium text-gray-400 hover:bg-white/[0.04] hover:text-gray-300 transition-all duration-200"
        >
          <RotateCcw className="h-4 w-4" />
          Reset to Defaults
        </button>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsDirty(false)}
            className="inline-flex items-center gap-2 rounded-xl bg-white/[0.04] border border-white/[0.06] px-4 py-2 text-sm font-medium text-gray-400 hover:bg-white/[0.06] hover:text-gray-300 transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 px-4 py-2 text-sm font-medium text-white shadow-neon-blue hover:from-brand-400 hover:to-brand-500 transition-all duration-200"
          >
            <Save className="h-4 w-4" />
            Save Changes
          </button>
        </div>
      </div>

      {/* Save toast */}
      {saveToast && (
        <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
          <div className="flex items-center gap-3 rounded-2xl glass-strong border border-success/30 bg-success/10 px-4 py-3 shadow-glass-lg">
            <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-gray-100">Settings saved</p>
              <p className="text-xs text-gray-400">Your configuration has been persisted to local storage</p>
            </div>
            <button onClick={() => setSaveToast(false)} className="text-gray-500 hover:text-gray-300 transition-colors ml-2">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
