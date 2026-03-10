"use client";

import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  trend: number;
  trendDirection: "up" | "down";
  /** Whether "up" is good (e.g. efficiency) or bad (e.g. wait time) */
  trendPositive?: boolean;
  icon?: React.ReactNode;
}

export default function MetricCard({
  label,
  value,
  unit,
  trend,
  trendDirection,
  trendPositive = true,
  icon,
}: MetricCardProps) {
  const isGood =
    (trendDirection === "up" && trendPositive) ||
    (trendDirection === "down" && !trendPositive);

  return (
    <div className="glass gradient-border rounded-2xl p-5 shadow-card transition-all duration-300 hover:shadow-card-hover">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-400">{label}</span>
          {icon && (
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-xl",
                isGood
                  ? "bg-signal-green/10 text-signal-green"
                  : "bg-danger/10 text-danger"
              )}
            >
              {icon}
            </div>
          )}
        </div>

        <div className="flex items-baseline gap-2">
          <span className="stat-value text-3xl text-white">
            {value}
          </span>
          {unit && (
            <span className="text-sm font-medium text-gray-500">{unit}</span>
          )}
        </div>

        {/* Trend indicator */}
        <div
          className={cn(
            "inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
            isGood
              ? "bg-signal-green/10 text-signal-green"
              : "bg-danger/10 text-danger"
          )}
        >
          {trendDirection === "up" ? (
            <ArrowUpRight className="h-3.5 w-3.5" />
          ) : (
            <ArrowDownRight className="h-3.5 w-3.5" />
          )}
          <span>{Math.abs(trend)}% vs last period</span>
        </div>

        {/* Mini sparkline */}
        <div className="flex h-8 items-end gap-0.5">
          {[40, 55, 35, 60, 50, 70, 65, 80, 75, 85, 78, 90].map((h, i) => (
            <div
              key={i}
              className={cn(
                "w-full rounded-sm transition-all duration-300",
                isGood ? "bg-signal-green/20" : "bg-danger/20"
              )}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
