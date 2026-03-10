"use client";

import React from "react";
import type { Intersection, TrafficStatus } from "@/types";
import { Search, Clock, Camera } from "lucide-react";

interface IntersectionListProps {
  intersections: Intersection[];
  selectedId: string | null;
  onSelect: (intersection: Intersection) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

const statusDotColor: Record<TrafficStatus, string> = {
  optimal: "bg-green-400",
  moderate: "bg-yellow-400",
  heavy: "bg-red-400",
  emergency: "bg-orange-400",
};

const statusDotGlow: Record<TrafficStatus, string> = {
  optimal: "shadow-[0_0_8px_rgba(34,197,94,0.5)]",
  moderate: "shadow-[0_0_8px_rgba(245,158,11,0.5)]",
  heavy: "shadow-[0_0_8px_rgba(239,68,68,0.5)]",
  emergency: "shadow-[0_0_8px_rgba(249,115,22,0.6)]",
};

const statusOrder: Record<TrafficStatus, number> = {
  emergency: 0,
  heavy: 1,
  moderate: 2,
  optimal: 3,
};

export default function IntersectionList({
  intersections,
  selectedId,
  onSelect,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
}: IntersectionListProps) {
  const filtered = intersections.filter(
    (i) =>
      i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case "status":
        return statusOrder[a.status] - statusOrder[b.status];
      case "name":
        return a.name.localeCompare(b.name);
      case "waitTime":
        return b.avgWaitTime - a.avgWaitTime;
      default:
        return 0;
    }
  });

  return (
    <div className="flex h-full flex-col border-r border-white/[0.06] bg-white/[0.02]">
      {/* Search & Sort Header */}
      <div className="border-b border-white/[0.06] p-4 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search by name or ID..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="input-glass w-full pl-9 pr-3 text-sm"
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            {sorted.length} intersection{sorted.length !== 1 ? "s" : ""}
          </span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="rounded-lg border border-white/[0.08] bg-white/[0.04] py-1.5 pl-2.5 pr-7 text-xs text-gray-400 focus:border-brand-500/50 focus:outline-none focus:ring-1 focus:ring-brand-500/20 transition-all"
          >
            <option value="status">By Status</option>
            <option value="name">By Name</option>
            <option value="waitTime">By Wait Time</option>
          </select>
        </div>
      </div>

      {/* Scrollable List */}
      <div className="flex-1 overflow-y-auto">
        {sorted.length === 0 ? (
          <div className="flex items-center justify-center h-32 text-sm text-gray-500">
            No intersections found
          </div>
        ) : (
          <div className="p-2 space-y-1">
            {sorted.map((intersection) => (
              <button
                key={intersection.id}
                onClick={() => onSelect(intersection)}
                className={`w-full text-left rounded-xl px-3 py-3 transition-all duration-200 ${
                  selectedId === intersection.id
                    ? "border border-brand-500/30 bg-brand-500/5 shadow-[0_0_20px_rgba(59,130,246,0.08)]"
                    : "border border-transparent hover:bg-white/[0.04]"
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <span
                    className={`mt-1.5 h-2.5 w-2.5 flex-shrink-0 rounded-full ${statusDotColor[intersection.status]} ${statusDotGlow[intersection.status]}`}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-200 truncate">
                      {intersection.name}
                    </p>
                    <p className="text-xs font-mono text-gray-500 mt-0.5">
                      {intersection.id}
                    </p>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        {intersection.avgWaitTime}s
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <Camera className="h-3 w-3" />
                        {intersection.cameras.filter((c) => c.status === "online").length}/{intersection.cameras.length}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
