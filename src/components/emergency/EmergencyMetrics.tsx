"use client";

import React from "react";
import { Siren, Clock, CheckCircle, TrendingUp } from "lucide-react";

interface EmergencyStats {
  totalPreemptions: number;
  avgTimeSaved: number;
  successRate: number;
  activeCount: number;
}

interface EmergencyMetricsProps {
  stats: EmergencyStats;
}

export default function EmergencyMetrics({ stats }: EmergencyMetricsProps) {
  const metrics = [
    {
      label: "Total Preemptions",
      value: "342",
      trend: 12,
      trendLabel: "vs last month",
      icon: <Siren className="h-6 w-6" />,
      iconBg: "bg-brand-500/15 text-brand-400",
      glowClass: "glow-blue",
    },
    {
      label: "Avg Time Saved",
      value: "38",
      unit: "seconds",
      trend: 22,
      trendLabel: "vs last month",
      icon: <Clock className="h-6 w-6" />,
      iconBg: "bg-signal-green/15 text-signal-green",
      glowClass: "glow-green",
    },
    {
      label: "Success Rate",
      value: "98.5%",
      trend: 0,
      trendLabel: "",
      icon: <CheckCircle className="h-6 w-6" />,
      iconBg: "bg-signal-green/15 text-signal-green",
      glowClass: "glow-green",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className={`glass rounded-2xl p-5 shadow-card transition-all duration-300 hover:shadow-card-hover flex items-start gap-4`}
        >
          <div
            className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${metric.iconBg} ${metric.glowClass}`}
          >
            {metric.icon}
          </div>
          <div>
            <span className="text-sm font-medium text-gray-400">
              {metric.label}
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="stat-value text-2xl text-white">
                {metric.value}
              </span>
              {metric.unit && (
                <span className="text-sm text-gray-500">{metric.unit}</span>
              )}
            </div>
            {metric.trend > 0 && (
              <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-signal-green/10 px-2 py-0.5 text-xs font-semibold text-signal-green">
                <TrendingUp className="h-3 w-3" />
                <span>{metric.trend}%</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
