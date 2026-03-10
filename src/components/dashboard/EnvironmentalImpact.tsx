"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Leaf, ArrowUp, ArrowRight, TreePine } from "lucide-react";

interface Metric {
  label: string;
  value: string;
  unit: string;
  trend: number;
}

const metrics: Metric[] = [
  { label: "CO2 Reduced", value: "890", unit: "kg", trend: 12.4 },
  { label: "Fuel Saved", value: "340", unit: "L", trend: 8.2 },
  { label: "Time Saved", value: "2,400", unit: "hrs", trend: 15.1 },
];

export default function EnvironmentalImpact() {
  return (
    <div className="glass relative h-full overflow-hidden rounded-xl border border-white/[0.06] p-5">
      {/* Green gradient accent at top */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-emerald-500/[0.05] to-transparent" />

      <div className="relative mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
          <Leaf className="h-5 w-5 text-emerald-400" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-white">
            Environmental Impact
          </h3>
          <p className="text-xs text-gray-500">Today&apos;s sustainability metrics</p>
        </div>
      </div>

      <div className="relative grid grid-cols-3 gap-3">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-xl border border-emerald-500/10 bg-emerald-500/[0.05] p-4 text-center backdrop-blur-sm transition-all duration-200 hover:border-emerald-500/20 hover:bg-emerald-500/[0.08]"
          >
            <div className="flex items-baseline justify-center gap-1">
              <span className="font-display text-2xl font-bold text-white">
                {metric.value}
              </span>
              <span className="text-sm font-medium text-gray-400">
                {metric.unit}
              </span>
            </div>
            <p className="mt-1 text-xs font-medium text-gray-400">
              {metric.label}
            </p>
            <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
              <ArrowUp className="h-3 w-3" />
              +{metric.trend}%
            </div>
          </div>
        ))}
      </div>

      <div className="relative mt-5 border-t border-white/[0.06] pt-4">
        <button className="flex items-center gap-1.5 text-sm font-medium text-emerald-400 transition-colors hover:text-emerald-300">
          View Full Report
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
