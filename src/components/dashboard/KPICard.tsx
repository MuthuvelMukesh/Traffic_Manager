"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ArrowUp, ArrowDown } from "lucide-react";

interface KPICardProps {
  label: string;
  value: string | number;
  unit?: string;
  trend: number;
  trendLabel: string;
  status: "good" | "warning" | "critical";
  icon: React.ReactNode;
}

const statusGlowMap: Record<KPICardProps["status"], string> = {
  good: "shadow-neon-blue",
  warning: "shadow-[0_0_20px_rgba(251,191,36,0.15)]",
  critical: "shadow-[0_0_20px_rgba(239,68,68,0.15)]",
};

const iconBgMap: Record<KPICardProps["status"], string> = {
  good: "bg-brand-500/15 shadow-[0_0_20px_rgba(59,130,246,0.3)]",
  warning: "bg-amber-500/15 shadow-[0_0_20px_rgba(251,191,36,0.3)]",
  critical: "bg-red-500/15 shadow-[0_0_20px_rgba(239,68,68,0.3)]",
};

const iconColorMap: Record<KPICardProps["status"], string> = {
  good: "text-brand-400",
  warning: "text-amber-400",
  critical: "text-red-400",
};

const trendPillMap: Record<string, string> = {
  positive: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20",
  negative: "bg-red-500/15 text-red-400 border border-red-500/20",
};

const gradientLineMap: Record<KPICardProps["status"], string> = {
  good: "from-brand-500 via-brand-400 to-neon-blue",
  warning: "from-amber-500 via-amber-400 to-yellow-300",
  critical: "from-red-500 via-red-400 to-orange-400",
};

export default function KPICard({
  label,
  value,
  unit,
  trend,
  trendLabel,
  status,
  icon,
}: KPICardProps) {
  const isPositive = trend >= 0;

  return (
    <div
      className={cn(
        "glass relative overflow-hidden rounded-xl border border-white/[0.06] p-5 transition-all duration-300 hover:border-white/[0.12]",
        statusGlowMap[status]
      )}
    >
      {/* Gradient border glow at top */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <p className="text-sm font-medium uppercase tracking-wider text-gray-400">
            {label}
          </p>
          <div className="flex items-baseline gap-2">
            <span className="stat-value font-display text-4xl font-bold text-white">
              {value}
            </span>
            {unit && (
              <span className="text-lg font-medium text-gray-400">{unit}</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold",
                isPositive ? trendPillMap.positive : trendPillMap.negative
              )}
            >
              {isPositive ? (
                <ArrowUp className="h-3 w-3" />
              ) : (
                <ArrowDown className="h-3 w-3" />
              )}
              {isPositive ? "+" : ""}
              {trend}%
            </span>
            <span className="text-xs text-gray-500">{trendLabel}</span>
          </div>
        </div>
        <div
          className={cn(
            "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl transition-shadow duration-300",
            iconBgMap[status]
          )}
        >
          <span className={cn(iconColorMap[status])}>{icon}</span>
        </div>
      </div>

      {/* Animated gradient line at bottom */}
      <div className="absolute inset-x-0 bottom-0 h-[2px] overflow-hidden">
        <div
          className={cn(
            "h-full w-[200%] animate-[shimmer_3s_ease-in-out_infinite] bg-gradient-to-r",
            gradientLineMap[status]
          )}
          style={{
            animation: "shimmer 3s ease-in-out infinite",
          }}
        />
      </div>
    </div>
  );
}
