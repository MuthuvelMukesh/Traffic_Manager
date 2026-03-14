"use client";

import React, { useState, useMemo } from "react";
import { useTrafficData } from "@/hooks/useTrafficData";
import ManualOverrideModal from "@/components/intersections/ManualOverrideModal";
import SignalStatus from "@/components/intersections/SignalStatus";
import type { Intersection } from "@/types";
import {
  TrafficCone,
  Search,
  Bot,
  BotOff,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Gauge,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

function statusDot(status: string) {
  const map: Record<string, string> = {
    optimal:   "bg-green-400",
    moderate:  "bg-yellow-400",
    heavy:     "bg-orange-400",
    emergency: "bg-red-500 animate-pulse",
  };
  return map[status] ?? "bg-gray-500";
}

function congestionColor(level: number) {
  if (level < 30) return "text-green-400";
  if (level < 60) return "text-yellow-400";
  if (level < 80) return "text-orange-400";
  return "text-red-400";
}

interface SignalCardProps {
  intersection: Intersection;
  onOverride: (i: Intersection) => void;
  aiOverrides: Record<string, boolean>;
  onToggleAI: (id: string) => void;
}

function SignalCard({ intersection, onOverride, aiOverrides, onToggleAI }: SignalCardProps) {
  const [expanded, setExpanded] = useState(false);
  const aiActive = aiOverrides[intersection.id] ?? intersection.aiControlActive;

  return (
    <div className={cn(
      "glass rounded-2xl shadow-card transition-all duration-300",
      intersection.status === "emergency" && "ring-1 ring-red-500/40"
    )}>
      {/* Header */}
      <div className="flex items-start gap-3 p-4">
        <span className={cn("mt-1.5 h-2.5 w-2.5 flex-shrink-0 rounded-full", statusDot(intersection.status))} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-gray-100">{intersection.name}</p>
          <p className="mt-0.5 text-xs text-gray-500">{intersection.zone} · {intersection.id}</p>
        </div>

        {/* AI badge */}
        <button
          onClick={() => onToggleAI(intersection.id)}
          title={aiActive ? "AI control ON – click to take manual control" : "AI control OFF – click to restore AI"}
          className={cn(
            "flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-colors",
            aiActive
              ? "bg-brand-500/15 text-brand-400 hover:bg-brand-500/25"
              : "bg-yellow-500/15 text-yellow-400 hover:bg-yellow-500/25"
          )}
        >
          {aiActive ? <Bot className="h-3.5 w-3.5" /> : <BotOff className="h-3.5 w-3.5" />}
          {aiActive ? "AI" : "Manual"}
        </button>
      </div>

      {/* Stats row */}
      <div className="flex items-center gap-4 border-t border-white/[0.05] px-4 py-2.5 text-xs text-gray-500">
        <span className={cn("font-semibold", congestionColor(intersection.congestionLevel))}>
          {intersection.congestionLevel}% congestion
        </span>
        <span>{intersection.avgWaitTime}s avg wait</span>
        <span className="ml-auto">{intersection.vehiclesPerHour.toLocaleString()} veh/hr</span>
      </div>

      {/* Signal phases – expandable */}
      <div
        className="flex cursor-pointer items-center justify-between border-t border-white/[0.05] px-4 py-2.5"
        onClick={() => setExpanded((v) => !v)}
      >
        <span className="text-xs font-medium text-gray-400">Signal Phases</span>
        {expanded ? (
          <ChevronUp className="h-4 w-4 text-gray-600" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-600" />
        )}
      </div>

      {expanded && (
        <div className="border-t border-white/[0.05] px-4 pb-3 pt-2 space-y-2">
          {intersection.signals.map((sig) => (
            <SignalStatus key={sig.direction} signal={sig} />
          ))}
        </div>
      )}

      {/* Override button */}
      <div className="border-t border-white/[0.05] px-4 pb-4 pt-3">
        <button
          onClick={() => onOverride(intersection)}
          className="w-full rounded-xl bg-white/[0.04] border border-white/[0.06] py-2 text-xs font-medium text-gray-400 hover:bg-yellow-500/10 hover:border-yellow-500/30 hover:text-yellow-400 transition-all duration-200"
        >
          <Sliders className="mr-1.5 inline h-3.5 w-3.5" />
          Manual Override
        </button>
      </div>
    </div>
  );
}

export default function SignalsPage() {
  const { intersections } = useTrafficData();
  const [search, setSearch]           = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [zoneFilter, setZoneFilter]   = useState("all");
  const [overrideTarget, setOverrideTarget] = useState<Intersection | null>(null);
  // Local AI toggle state (overlays live data)
  const [aiOverrides, setAiOverrides] = useState<Record<string, boolean>>({});

  const zones = useMemo(
    () => ["all", ...Array.from(new Set(intersections.map((i) => i.zone)))],
    [intersections]
  );

  const filtered = useMemo(() => {
    return intersections.filter((i) => {
      if (statusFilter !== "all" && i.status !== statusFilter) return false;
      if (zoneFilter !== "all" && i.zone !== zoneFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return i.name.toLowerCase().includes(q) || i.id.toLowerCase().includes(q);
      }
      return true;
    });
  }, [intersections, statusFilter, zoneFilter, search]);

  const aiCount   = intersections.filter((i) => (aiOverrides[i.id] ?? i.aiControlActive)).length;
  const manualCount = intersections.length - aiCount;
  const heavyCount = intersections.filter((i) => i.status === "heavy" || i.status === "emergency").length;

  const handleToggleAI = (id: string) => {
    setAiOverrides((prev) => ({
      ...prev,
      [id]: !(prev[id] ?? intersections.find((i) => i.id === id)?.aiControlActive ?? true),
    }));
  };

  const handleOverrideConfirm = () => {
    // In production: send override command to signal API
    setOverrideTarget(null);
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/15">
            <TrafficCone className="h-5 w-5 text-brand-400" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-gradient-blue">
              Signal Control Panel
            </h1>
            <p className="text-sm text-gray-500">
              Monitor and override individual intersection signal timing
            </p>
          </div>
        </div>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "AI Controlled", value: aiCount,         icon: Bot,          color: "text-brand-400",  bg: "bg-brand-500/10" },
          { label: "Manual Mode",   value: manualCount,     icon: Sliders,      color: "text-yellow-400", bg: "bg-yellow-500/10" },
          { label: "Heavy / Emgcy", value: heavyCount,      icon: AlertTriangle,color: "text-orange-400", bg: "bg-orange-500/10" },
          { label: "Total Active",  value: intersections.length, icon: CheckCircle2, color: "text-green-400",  bg: "bg-green-500/10"  },
        ].map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.label} className="glass rounded-2xl p-4 shadow-card">
              <div className="flex items-center gap-3">
                <div className={cn("flex h-9 w-9 items-center justify-center rounded-xl", kpi.bg)}>
                  <Icon className={cn("h-5 w-5", kpi.color)} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-100">{kpi.value}</p>
                  <p className="text-xs text-gray-500">{kpi.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="glass rounded-2xl p-4 shadow-card">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search intersections..."
              className="w-full rounded-xl bg-white/[0.04] border border-white/[0.06] pl-9 pr-3 py-2 text-sm text-gray-200 placeholder:text-gray-600 focus:border-brand-400/50 focus:outline-none focus:ring-1 focus:ring-brand-400/30"
            />
          </div>

          {/* Status filter */}
          {["all", "optimal", "moderate", "heavy", "emergency"].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={cn(
                "rounded-xl border px-3 py-1.5 text-xs font-medium capitalize transition-all duration-200",
                statusFilter === s
                  ? "border-brand-400/50 bg-brand-500/10 text-brand-400"
                  : "border-white/[0.06] bg-white/[0.03] text-gray-500 hover:text-gray-300"
              )}
            >
              {s === "all" ? "All Status" : s}
            </button>
          ))}

          {/* Zone filter */}
          <select
            value={zoneFilter}
            onChange={(e) => setZoneFilter(e.target.value)}
            className="rounded-xl bg-white/[0.04] border border-white/[0.06] py-1.5 pl-3 pr-8 text-sm text-gray-300 focus:border-brand-400/50 focus:outline-none"
          >
            {zones.map((z) => (
              <option key={z} value={z} className="bg-surface-100">
                {z === "all" ? "All Zones" : z}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Intersection grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((intersection) => (
          <SignalCard
            key={intersection.id}
            intersection={intersection}
            onOverride={setOverrideTarget}
            aiOverrides={aiOverrides}
            onToggleAI={handleToggleAI}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="glass rounded-2xl border-2 border-dashed border-white/[0.08] p-12 text-center">
          <Gauge className="mx-auto h-10 w-10 text-gray-700" />
          <p className="mt-3 text-sm text-gray-500">No intersections match the current filter.</p>
        </div>
      )}

      {/* Override modal */}
      {overrideTarget && (
        <ManualOverrideModal
          isOpen
          onClose={() => setOverrideTarget(null)}
          intersectionName={overrideTarget.name}
          onConfirm={handleOverrideConfirm}
        />
      )}
    </div>
  );
}
