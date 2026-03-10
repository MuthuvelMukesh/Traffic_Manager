"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import { useAlerts } from "@/hooks/useAlerts";
import { AlertTriangle, Siren, Info, ArrowRight, Bell } from "lucide-react";
import type { AlertSeverity } from "@/types";

const severityConfig: Record<
  AlertSeverity,
  {
    icon: React.ElementType;
    border: string;
    text: string;
    bg: string;
    glow: string;
  }
> = {
  critical: {
    icon: AlertTriangle,
    border: "border-l-red-500",
    text: "text-red-400",
    bg: "bg-red-500/15",
    glow: "shadow-[0_0_12px_rgba(239,68,68,0.3)]",
  },
  warning: {
    icon: AlertTriangle,
    border: "border-l-amber-500",
    text: "text-amber-400",
    bg: "bg-amber-500/15",
    glow: "shadow-[0_0_12px_rgba(251,191,36,0.3)]",
  },
  emergency: {
    icon: Siren,
    border: "border-l-orange-500",
    text: "text-orange-400",
    bg: "bg-orange-500/15",
    glow: "shadow-[0_0_12px_rgba(249,115,22,0.3)]",
  },
  info: {
    icon: Info,
    border: "border-l-brand-400",
    text: "text-brand-400",
    bg: "bg-brand-500/15",
    glow: "shadow-[0_0_12px_rgba(59,130,246,0.3)]",
  },
};

function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "Just now";
  if (diffMin < 60) return `${diffMin} min ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  return `${Math.floor(diffHr / 24)}d ago`;
}

export default function AlertsPanel() {
  const { activeAlerts, acknowledgeAlert, dismissAlert } = useAlerts();
  const visibleAlerts = activeAlerts.slice(0, 5);

  return (
    <div className="glass relative flex h-full flex-col overflow-hidden rounded-xl border border-white/[0.06]">
      {/* Top gradient border */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/15">
            <Bell className="h-4.5 w-4.5 text-red-400" />
          </div>
          <h3 className="text-base font-semibold text-white">
            Active Alerts
          </h3>
          {activeAlerts.length > 0 && (
            <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500/20 px-1.5 text-xs font-semibold text-red-400 border border-red-500/30">
              {activeAlerts.length}
            </span>
          )}
        </div>
      </div>

      {/* Scrollable alerts area */}
      <div className="relative flex-1 overflow-y-auto">
        {visibleAlerts.length === 0 ? (
          <div className="flex h-full items-center justify-center p-8 text-sm text-gray-500">
            No active alerts
          </div>
        ) : (
          <div className="divide-y divide-white/[0.04]">
            {visibleAlerts.map((alert) => {
              const config = severityConfig[alert.severity];
              const IconComponent = config.icon;

              return (
                <div
                  key={alert.id}
                  className={cn(
                    "flex gap-3 border-l-[3px] bg-white/[0.02] px-4 py-3 transition-all duration-200 hover:bg-white/[0.05]",
                    config.border
                  )}
                >
                  <div
                    className={cn(
                      "mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full transition-shadow",
                      config.bg,
                      config.glow
                    )}
                  >
                    <IconComponent className={cn("h-3.5 w-3.5", config.text)} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="truncate text-sm font-medium text-white/90">
                        {alert.title}
                      </p>
                      <span className="flex-shrink-0 text-xs text-gray-500">
                        {formatRelativeTime(alert.timestamp)}
                      </span>
                    </div>
                    <p className="mt-0.5 line-clamp-2 text-xs text-gray-500">
                      {alert.description}
                    </p>
                    {alert.actionLabel && (
                      <div className="mt-2">
                        <button
                          className="inline-flex items-center gap-1 rounded-md bg-white/[0.05] px-2.5 py-1 text-xs font-medium text-gray-300 transition-all hover:bg-white/[0.1] hover:text-white border border-white/[0.06]"
                          onClick={() => {
                            if (alert.actionType === "acknowledge") {
                              acknowledgeAlert(alert.id);
                            } else if (alert.actionType === "dismiss") {
                              dismissAlert(alert.id);
                            }
                          }}
                        >
                          {alert.actionLabel}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Fade at bottom of scroll area */}
        <div className="pointer-events-none sticky bottom-0 h-8 bg-gradient-to-t from-[rgba(10,14,26,0.8)] to-transparent" />
      </div>

      {/* Footer */}
      <div className="border-t border-white/[0.06] px-5 py-3">
        <button className="flex w-full items-center justify-center gap-1.5 text-sm font-medium text-brand-400 transition-colors hover:text-brand-300">
          View All Alerts
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
