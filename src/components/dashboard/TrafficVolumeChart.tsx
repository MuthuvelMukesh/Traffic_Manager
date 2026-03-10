"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { trafficVolume as mockTrafficVolume } from "@/data/trafficVolume";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp } from "lucide-react";

const timeRanges = ["1h", "6h", "12h", "24h"] as const;
type TimeRange = (typeof timeRanges)[number];

export default function TrafficVolumeChart() {
  const [activeRange, setActiveRange] = useState<TimeRange>("24h");

  return (
    <div className="glass relative h-full overflow-hidden rounded-xl border border-white/[0.06] p-5">
      {/* Top gradient border */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-brand-500/40 to-transparent" />

      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500/15">
            <TrendingUp className="h-4.5 w-4.5 text-brand-400" />
          </div>
          <h3 className="text-base font-semibold text-white">
            Traffic Volume
          </h3>
        </div>
        <div className="flex gap-1 rounded-full bg-white/[0.04] p-1 border border-white/[0.06]">
          {timeRanges.map((range) => (
            <button
              key={range}
              onClick={() => setActiveRange(range)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200",
                activeRange === range
                  ? "bg-brand-500/15 text-brand-400 shadow-sm"
                  : "text-gray-500 hover:text-gray-300"
              )}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-3 flex items-center gap-4 text-xs text-gray-400">
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm bg-brand-400" />
          Current
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-0.5 w-4 border-t-2 border-dashed border-gray-600" />
          Previous
        </div>
      </div>

      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={mockTrafficVolume}
            margin={{ top: 5, right: 10, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="volumeGradientDark" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.04)"
              vertical={false}
            />
            <XAxis
              dataKey="hour"
              tick={{ fontSize: 11, fill: "#6b7280" }}
              tickLine={false}
              axisLine={{ stroke: "rgba(255,255,255,0.06)" }}
              interval="preserveStartEnd"
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#6b7280" }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v: number) =>
                v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v)
              }
            />
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(15, 20, 40, 0.95)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                fontSize: "12px",
                color: "#e5e7eb",
              }}
              labelStyle={{
                fontWeight: 600,
                marginBottom: "4px",
                color: "#ffffff",
              }}
              formatter={((value: any, name: any) => [
                (typeof value === "number" ? value.toLocaleString() : String(value ?? "")) + " vehicles",
                name === "volume" ? "Current" : "Previous",
              ]) as any}
            />
            <Area
              type="monotone"
              dataKey="previousVolume"
              stroke="#4b5563"
              strokeWidth={1.5}
              strokeDasharray="5 5"
              fill="none"
              dot={false}
            />
            <Area
              type="monotone"
              dataKey="volume"
              stroke="#6366f1"
              strokeWidth={2}
              fill="url(#volumeGradientDark)"
              dot={false}
              activeDot={{
                r: 5,
                strokeWidth: 2,
                stroke: "#6366f1",
                fill: "#0a0e1a",
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
