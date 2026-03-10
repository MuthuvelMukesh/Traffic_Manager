"use client";

import React from "react";
import { Leaf, Droplets, Clock, ArrowUpRight, ArrowRight } from "lucide-react";
import { formatNumber } from "@/lib/utils";

interface EnvironmentalMetric {
  label: string;
  value: number;
  unit: string;
  trend: number;
  icon: React.ReactNode;
}

const metrics: EnvironmentalMetric[] = [
  {
    label: "CO2 Reduced",
    value: 26700,
    unit: "kg",
    trend: 15,
    icon: <Leaf className="h-8 w-8" />,
  },
  {
    label: "Fuel Saved",
    value: 10200,
    unit: "L",
    trend: 12,
    icon: <Droplets className="h-8 w-8" />,
  },
  {
    label: "Vehicle Hours Saved",
    value: 72000,
    unit: "hrs",
    trend: 18,
    icon: <Clock className="h-8 w-8" />,
  },
];

export default function EnvironmentalSummary() {
  return (
    <div className="glass rounded-2xl p-6 shadow-card border border-signal-green/[0.12] relative overflow-hidden">
      {/* Green gradient accent background */}
      <div className="absolute inset-0 bg-gradient-to-br from-signal-green/[0.06] via-transparent to-transparent pointer-events-none" />

      <div className="relative">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-signal-green/15 text-signal-green glow-green">
              <Leaf className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-gradient-green">
              Environmental Impact
            </h3>
          </div>
          <button className="inline-flex items-center gap-1 text-sm font-medium text-signal-green/70 hover:text-signal-green transition-colors">
            View Detailed Report
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="flex items-start gap-4 rounded-xl bg-white/[0.03] border border-signal-green/[0.08] p-4 backdrop-blur-sm transition-all duration-200 hover:bg-white/[0.05]"
            >
              <div className="flex-shrink-0 rounded-lg bg-signal-green/10 p-3 text-signal-green glow-green">
                {metric.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-400">
                  {metric.label}
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="stat-value text-2xl text-white">
                    {formatNumber(metric.value)}
                  </span>
                  <span className="text-sm font-medium text-signal-green/70">
                    {metric.unit}
                  </span>
                </div>
                <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-signal-green/10 px-2 py-0.5 text-xs font-semibold text-signal-green w-fit">
                  <ArrowUpRight className="h-3 w-3" />
                  <span>{metric.trend}% vs last period</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
