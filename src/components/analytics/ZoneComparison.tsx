"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";
import { zoneTrafficData } from "@/data/predictiveTraffic";
import { MapPin } from "lucide-react";

const zoneColors = ["#60A5FA", "#34D399", "#F59E0B", "#F472B6", "#A78BFA"];

export default function ZoneComparison() {
  return (
    <div className="glass rounded-2xl p-5 shadow-card">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/15">
            <MapPin className="h-4 w-4 text-green-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-100">Zone Comparison</h3>
            <p className="text-xs text-gray-500">Daily volume vs previous period</p>
          </div>
        </div>
      </div>

      {/* Volume bar chart */}
      <div className="h-52 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={zoneTrafficData} margin={{ top: 4, right: 8, left: 0, bottom: 4 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis
              dataKey="zone"
              tick={{ fontSize: 11, fill: "#6B7280" }}
              tickLine={false}
              axisLine={{ stroke: "rgba(255,255,255,0.06)" }}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#6B7280" }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(17,24,39,0.95)",
                backdropFilter: "blur(20px)",
                fontSize: "12px",
                color: "#E5E7EB",
              }}
              formatter={(v: unknown) => [
                typeof v === "number" ? v.toLocaleString() : String(v ?? ""),
                "Vehicles",
              ]}
            />
            <Legend
              formatter={(value: string) =>
                value === "current" ? "This Period" : "Previous Period"
              }
              wrapperStyle={{ fontSize: 11, color: "#9CA3AF" }}
            />
            <Bar dataKey="previous" fill="rgba(255,255,255,0.08)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="current" radius={[4, 4, 0, 0]}>
              {zoneTrafficData.map((_, idx) => (
                <Cell key={idx} fill={zoneColors[idx % zoneColors.length]} fillOpacity={0.8} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Efficiency table */}
      <div className="mt-4 space-y-2">
        {zoneTrafficData.map((zone, idx) => {
          const change = (((zone.current - zone.previous) / zone.previous) * 100).toFixed(1);
          const isUp = zone.current > zone.previous;
          return (
            <div
              key={zone.zone}
              className="flex items-center gap-3 rounded-xl bg-white/[0.03] px-3 py-2"
            >
              <span
                className="h-2.5 w-2.5 flex-shrink-0 rounded-full"
                style={{ backgroundColor: zoneColors[idx % zoneColors.length] }}
              />
              <span className="flex-1 text-xs font-medium text-gray-300">{zone.zone}</span>
              <span className="text-xs text-gray-500">{zone.avgWait}s avg wait</span>
              <span className="w-12 text-right text-xs font-semibold text-gray-200">
                {zone.efficiency}%
              </span>
              <span
                className={`w-14 text-right text-xs font-medium ${
                  isUp ? "text-orange-400" : "text-green-400"
                }`}
              >
                {isUp ? "+" : ""}{change}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
