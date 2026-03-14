"use client";

import React from "react";
import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Legend,
} from "recharts";
import { predictiveTraffic, CURRENT_HOUR_INDEX } from "@/data/predictiveTraffic";
import { Brain } from "lucide-react";

const currentHourLabel = predictiveTraffic[CURRENT_HOUR_INDEX]?.hour ?? "14:00";

export default function PredictiveChart() {
  return (
    <div className="glass rounded-2xl p-5 shadow-card">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/15">
            <Brain className="h-4 w-4 text-purple-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-100">AI Traffic Prediction</h3>
            <p className="text-xs text-gray-500">24-hour forecast with confidence bands</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2 w-6 rounded-full bg-blue-400" />
            Actual
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2 w-6 rounded-full bg-purple-400 opacity-80" />
            Predicted
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-3 w-6 rounded bg-purple-400/20" />
            Confidence band
          </span>
        </div>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={predictiveTraffic} margin={{ top: 8, right: 16, left: 8, bottom: 4 }}>
            <defs>
              <linearGradient id="actualGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#60A5FA" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="confidenceGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#A78BFA" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#A78BFA" stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />

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
              tickFormatter={(v: number) => (v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v))}
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
              formatter={(value: unknown, name: string) => {
                const v = typeof value === "number" ? value.toLocaleString() : String(value ?? "");
                const labels: Record<string, string> = {
                  actual:     "Actual",
                  predicted:  "Predicted",
                  upperBound: "Upper bound",
                  lowerBound: "Lower bound",
                };
                return [v, labels[name] ?? name];
              }}
              labelStyle={{ fontWeight: 600, marginBottom: 4, color: "#F3F4F6" }}
            />

            {/* Confidence band (area between upper/lower) */}
            <Area
              type="monotone"
              dataKey="upperBound"
              stroke="none"
              fill="url(#confidenceGrad)"
              legendType="none"
              dot={false}
            />
            <Area
              type="monotone"
              dataKey="lowerBound"
              stroke="none"
              fill="rgba(17,24,39,1)"
              legendType="none"
              dot={false}
            />

            {/* Actual traffic */}
            <Area
              type="monotone"
              dataKey="actual"
              stroke="#60A5FA"
              strokeWidth={2}
              fill="url(#actualGrad)"
              dot={false}
              connectNulls={false}
            />

            {/* Predicted traffic */}
            <Line
              type="monotone"
              dataKey="predicted"
              stroke="#A78BFA"
              strokeWidth={2}
              strokeDasharray="6 3"
              dot={false}
            />

            {/* "Now" reference line */}
            <ReferenceLine
              x={currentHourLabel}
              stroke="rgba(255,255,255,0.25)"
              strokeDasharray="4 4"
              label={{
                value: "Now",
                position: "insideTopRight",
                fontSize: 11,
                fill: "rgba(255,255,255,0.4)",
              }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Confidence note */}
      <p className="mt-3 text-center text-xs text-gray-600">
        Prediction confidence averages{" "}
        <span className="text-purple-400 font-medium">
          {Math.round(
            predictiveTraffic
              .filter((p) => !p.actual)
              .reduce((s, p) => s + p.confidence, 0) /
              predictiveTraffic.filter((p) => !p.actual).length
          )}
          %
        </span>{" "}
        for the remaining{" "}
        {predictiveTraffic.filter((p) => !p.actual).length} hours · Model last retrained 6h ago
      </p>
    </div>
  );
}
