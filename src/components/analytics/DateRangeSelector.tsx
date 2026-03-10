"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Calendar, GitCompareArrows } from "lucide-react";

type Preset = "today" | "7d" | "30d" | "90d" | "custom";

const presets: { id: Preset; label: string }[] = [
  { id: "today", label: "Today" },
  { id: "7d", label: "7 Days" },
  { id: "30d", label: "30 Days" },
  { id: "90d", label: "90 Days" },
  { id: "custom", label: "Custom" },
];

const zoneOptions = [
  { value: "all", label: "All Zones" },
  { value: "downtown", label: "Downtown" },
  { value: "midtown", label: "Midtown" },
  { value: "uptown", label: "Uptown" },
  { value: "east", label: "East" },
  { value: "west", label: "West" },
];

interface DateRangeSelectorProps {
  onPresetChange?: (preset: Preset) => void;
  onZoneChange?: (zone: string) => void;
  onCompareToggle?: (enabled: boolean) => void;
}

export default function DateRangeSelector({
  onPresetChange,
  onZoneChange,
  onCompareToggle,
}: DateRangeSelectorProps) {
  const [activePreset, setActivePreset] = useState<Preset>("30d");
  const [zone, setZone] = useState("all");
  const [compare, setCompare] = useState(false);

  const handlePresetClick = (preset: Preset) => {
    setActivePreset(preset);
    onPresetChange?.(preset);
  };

  const handleZoneChange = (value: string) => {
    setZone(value);
    onZoneChange?.(value);
  };

  const handleCompareToggle = () => {
    setCompare(!compare);
    onCompareToggle?.(!compare);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Preset pills */}
      <div className="flex items-center rounded-xl border border-white/[0.06] bg-white/[0.03] p-1">
        {presets.map((preset) => (
          <button
            key={preset.id}
            onClick={() => handlePresetClick(preset.id)}
            className={cn(
              "rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-200",
              activePreset === preset.id
                ? "bg-brand-500/15 text-brand-400 border border-brand-500/30 shadow-neon-blue"
                : "text-gray-400 hover:bg-white/[0.04] hover:text-gray-300 border border-transparent"
            )}
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Custom date inputs (shown when custom is active) */}
      {activePreset === "custom" && (
        <div className="flex items-center gap-2">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <input
              type="date"
              className="input-glass rounded-xl py-2 pl-9 pr-3 text-sm"
            />
          </div>
          <span className="text-sm text-gray-500">to</span>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <input
              type="date"
              className="input-glass rounded-xl py-2 pl-9 pr-3 text-sm"
            />
          </div>
        </div>
      )}

      {/* Zone dropdown */}
      <div className="relative">
        <select
          value={zone}
          onChange={(e) => handleZoneChange(e.target.value)}
          className="input-glass w-40 appearance-none rounded-xl py-2 pl-3 pr-10 text-sm"
        >
          {zoneOptions.map((option) => (
            <option key={option.value} value={option.value} className="bg-surface-100 text-gray-200">
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <svg
            className="h-4 w-4 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </div>

      {/* Compare toggle */}
      <button
        onClick={handleCompareToggle}
        className={cn(
          "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200",
          compare
            ? "bg-brand-500/15 text-brand-400 border border-brand-500/30"
            : "bg-white/[0.04] text-gray-400 border border-white/[0.06] hover:bg-white/[0.06] hover:text-gray-300"
        )}
      >
        <GitCompareArrows className="h-4 w-4" />
        Compare
      </button>
    </div>
  );
}
