"use client";

import React from "react";
import { Server, Database, Brain, Camera, Clock, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface SystemStatus {
  label: string;
  status: "online" | "offline" | "active" | "partial";
  detail: string;
  icon: React.ReactNode;
}

const systems: SystemStatus[] = [
  {
    label: "API Server",
    status: "online",
    detail: "Uptime 99.97%",
    icon: <Server className="h-5 w-5" />,
  },
  {
    label: "Database",
    status: "online",
    detail: "Response 12ms",
    icon: <Database className="h-5 w-5" />,
  },
  {
    label: "AI Model",
    status: "active",
    detail: "Last trained 3 days ago",
    icon: <Brain className="h-5 w-5" />,
  },
  {
    label: "Camera Network",
    status: "partial",
    detail: "48/52 Online - 4 offline",
    icon: <Camera className="h-5 w-5" />,
  },
];

const statusConfig: Record<
  string,
  { dot: string; label: string; borderColor: string; iconColor: string; glowClass: string }
> = {
  online: {
    dot: "bg-signal-green",
    label: "Online",
    borderColor: "border-l-signal-green",
    iconColor: "bg-signal-green/15 text-signal-green",
    glowClass: "glow-green",
  },
  active: {
    dot: "bg-signal-green",
    label: "Active",
    borderColor: "border-l-signal-green",
    iconColor: "bg-signal-green/15 text-signal-green",
    glowClass: "glow-green",
  },
  partial: {
    dot: "bg-warning",
    label: "Partial",
    borderColor: "border-l-warning",
    iconColor: "bg-warning/15 text-warning",
    glowClass: "glow-orange",
  },
  offline: {
    dot: "bg-danger",
    label: "Offline",
    borderColor: "border-l-danger",
    iconColor: "bg-danger/15 text-danger",
    glowClass: "glow-red",
  },
};

export default function SystemHealth() {
  return (
    <div className="space-y-6">
      {/* Status cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {systems.map((system) => {
          const cfg = statusConfig[system.status];
          return (
            <div
              key={system.label}
              className={cn(
                "glass rounded-2xl p-5 shadow-card border-l-4 flex items-start gap-4 transition-all duration-300 hover:shadow-card-hover",
                cfg.borderColor
              )}
            >
              <div
                className={cn(
                  "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl",
                  cfg.iconColor,
                  cfg.glowClass
                )}
              >
                {system.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-200">
                    {system.label}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="relative flex h-2.5 w-2.5">
                      <span
                        className={cn(
                          "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
                          cfg.dot
                        )}
                      />
                      <span
                        className={cn(
                          "relative inline-flex h-2.5 w-2.5 rounded-full",
                          cfg.dot
                        )}
                      />
                    </span>
                    <span className="text-xs font-medium text-gray-400">
                      {cfg.label}
                    </span>
                  </div>
                </div>
                <p className="mt-1 text-xs text-gray-500">{system.detail}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Uptime and restart info */}
      <div className="glass rounded-2xl p-6 shadow-card">
        <h3 className="mb-4 text-base font-semibold text-gray-100">
          System Uptime
        </h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-signal-green/15 text-signal-green glow-green">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <span className="text-sm text-gray-500">Uptime (Last 30 Days)</span>
              <div className="stat-value text-2xl text-white">
                99.97%
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-gray-400">
              <RefreshCw className="h-5 w-5" />
            </div>
            <div>
              <span className="text-sm text-gray-500">Last Restart</span>
              <div className="text-base font-semibold text-gray-200">
                March 5, 2026 at 2:00 AM
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
