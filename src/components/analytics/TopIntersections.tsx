"use client";

import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface IntersectionItem {
  name: string;
  avgWaitTime: number;
  trend: number;
}

interface TopIntersectionsProps {
  title: string;
  type: "congested" | "performing";
  data: IntersectionItem[];
}

export default function TopIntersections({
  title,
  type,
  data,
}: TopIntersectionsProps) {
  const isCongested = type === "congested";

  return (
    <div className="glass rounded-2xl p-5 shadow-card">
      <h3
        className={cn(
          "mb-4 text-lg font-semibold",
          isCongested ? "text-danger" : "text-signal-green"
        )}
      >
        {title}
      </h3>

      <ol className="space-y-2">
        {data.map((item, index) => (
          <li
            key={item.name}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200",
              isCongested
                ? "bg-danger/[0.06] hover:bg-danger/[0.10] border border-danger/[0.08]"
                : "bg-signal-green/[0.06] hover:bg-signal-green/[0.10] border border-signal-green/[0.08]"
            )}
          >
            {/* Rank */}
            <span
              className={cn(
                "flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold",
                isCongested
                  ? "bg-danger/20 text-danger"
                  : "bg-signal-green/20 text-signal-green"
              )}
            >
              {index + 1}
            </span>

            {/* Name */}
            <span className="flex-1 text-sm font-medium text-gray-200">
              {item.name}
            </span>

            {/* Wait time */}
            <span
              className={cn(
                "font-mono text-sm font-semibold text-white"
              )}
            >
              {item.avgWaitTime}s
            </span>

            {/* Trend */}
            <span
              className={cn(
                "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-medium",
                item.trend > 0
                  ? isCongested
                    ? "bg-danger/10 text-danger"
                    : "bg-signal-green/10 text-signal-green"
                  : isCongested
                  ? "bg-signal-green/10 text-signal-green"
                  : "bg-danger/10 text-danger"
              )}
            >
              {item.trend > 0 ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {Math.abs(item.trend)}%
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
