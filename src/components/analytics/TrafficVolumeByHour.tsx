"use client";

import React from "react";
import { trafficVolume } from "@/data/trafficVolume";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function TrafficVolumeByHour() {
  return (
    <div className="glass rounded-2xl p-5 shadow-card">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-100">
          Traffic Volume by Hour
        </h3>
        <span className="text-sm text-gray-500">Vehicles per hour</span>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={trafficVolume}
            margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
          >
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#60A5FA" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.6} />
              </linearGradient>
              <filter id="barGlow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.06)"
              vertical={false}
            />
            <XAxis
              dataKey="hour"
              tick={{ fontSize: 11, fill: "#6B7280" }}
              tickLine={false}
              axisLine={{ stroke: "rgba(255,255,255,0.06)" }}
              interval={2}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#6B7280" }}
              tickLine={false}
              axisLine={{ stroke: "rgba(255,255,255,0.06)" }}
              tickFormatter={(v: number) =>
                v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v)
              }
            />
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(17, 24, 39, 0.95)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                fontSize: "13px",
                color: "#E5E7EB",
              }}
              formatter={((value: any, name: any) => [
                typeof value === "number" ? value.toLocaleString() : String(value ?? ""),
                name === "volume" ? "Current" : "Previous",
              ]) as any}
              labelStyle={{ fontWeight: 600, marginBottom: 4, color: "#F3F4F6" }}
              cursor={{ fill: "rgba(255,255,255,0.03)" }}
            />
            <Legend
              formatter={(value: string) =>
                value === "volume" ? "Current Period" : "Previous Period"
              }
              wrapperStyle={{ fontSize: "13px", color: "#9CA3AF" }}
            />
            <Bar
              dataKey="previousVolume"
              fill="rgba(255,255,255,0.06)"
              radius={[4, 4, 0, 0]}
              name="previousVolume"
            />
            <Bar
              dataKey="volume"
              fill="url(#barGradient)"
              radius={[4, 4, 0, 0]}
              name="volume"
              filter="url(#barGlow)"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
