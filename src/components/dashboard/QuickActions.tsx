"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Joystick, Camera, FileBarChart, ShieldAlert } from "lucide-react";

interface QuickAction {
  label: string;
  subtitle: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  glow: string;
  hoverBorder: string;
  isEmergency?: boolean;
}

const actions: QuickAction[] = [
  {
    label: "Manual Override",
    subtitle: "Take direct control",
    icon: <Joystick className="h-5 w-5" />,
    iconBg: "bg-orange-500/15",
    iconColor: "text-orange-400",
    glow: "shadow-[0_0_20px_rgba(249,115,22,0.3)]",
    hoverBorder: "hover:border-orange-500/30",
  },
  {
    label: "View Cameras",
    subtitle: "Live surveillance feeds",
    icon: <Camera className="h-5 w-5" />,
    iconBg: "bg-brand-500/15",
    iconColor: "text-brand-400",
    glow: "shadow-[0_0_20px_rgba(59,130,246,0.3)]",
    hoverBorder: "hover:border-brand-500/30",
  },
  {
    label: "Generate Report",
    subtitle: "Export analytics data",
    icon: <FileBarChart className="h-5 w-5" />,
    iconBg: "bg-emerald-500/15",
    iconColor: "text-emerald-400",
    glow: "shadow-[0_0_20px_rgba(16,185,129,0.3)]",
    hoverBorder: "hover:border-emerald-500/30",
  },
  {
    label: "Emergency Mode",
    subtitle: "Activate emergency protocol",
    icon: <ShieldAlert className="h-5 w-5" />,
    iconBg: "bg-red-500/15",
    iconColor: "text-red-400",
    glow: "shadow-[0_0_20px_rgba(239,68,68,0.3)]",
    hoverBorder: "hover:border-red-500/30",
    isEmergency: true,
  },
];

export default function QuickActions() {
  return (
    <div className="glass relative h-full overflow-hidden rounded-xl border border-white/[0.06] p-5">
      {/* Top gradient border */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <h3 className="mb-4 text-base font-semibold text-white">
        Quick Actions
      </h3>

      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <button
            key={action.label}
            className={cn(
              "group relative flex flex-col items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 text-center transition-all duration-300 hover:scale-[1.02] hover:bg-white/[0.06]",
              action.hoverBorder,
              action.isEmergency && "animate-[pulse_3s_ease-in-out_infinite]"
            )}
            style={
              action.isEmergency
                ? {
                    animation: "none",
                    boxShadow: "0 0 20px rgba(239,68,68,0.1)",
                  }
                : undefined
            }
          >
            {/* Emergency pulsing glow */}
            {action.isEmergency && (
              <div
                className="pointer-events-none absolute inset-0 rounded-xl"
                style={{
                  animation: "pulse-glow 2s ease-in-out infinite",
                  boxShadow: "0 0 20px rgba(239,68,68,0.15)",
                }}
              />
            )}

            <div
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-xl transition-shadow duration-300 group-hover:shadow-lg",
                action.iconBg,
                action.glow
              )}
            >
              <span className={action.iconColor}>{action.icon}</span>
            </div>
            <div>
              <p className="text-sm font-medium text-white/90">{action.label}</p>
              <p className="mt-0.5 text-xs text-gray-500">{action.subtitle}</p>
            </div>
          </button>
        ))}
      </div>

      <style jsx>{`
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 15px rgba(239, 68, 68, 0.1);
          }
          50% {
            box-shadow: 0 0 30px rgba(239, 68, 68, 0.25);
          }
        }
      `}</style>
    </div>
  );
}
