"use client";

import React, { useState, useMemo } from "react";
import { useIncidents } from "@/hooks/useIncidents";
import IncidentCard from "@/components/incidents/IncidentCard";
import IncidentReportForm from "@/components/incidents/IncidentReportForm";
import type { Incident, IncidentStatus, IncidentType } from "@/types";
import {
  AlertTriangle,
  Plus,
  Filter,
  Search,
  Flame,
  Clock,
  CheckCircle2,
  FolderOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

const statusFilters: { value: "all" | IncidentStatus; label: string }[] = [
  { value: "all",         label: "All" },
  { value: "open",        label: "Open" },
  { value: "in_progress", label: "In Progress" },
  { value: "resolved",    label: "Resolved" },
  { value: "closed",      label: "Closed" },
];

const typeFilters: { value: "all" | IncidentType; label: string }[] = [
  { value: "all",            label: "All Types" },
  { value: "accident",       label: "Accident" },
  { value: "roadwork",       label: "Road Works" },
  { value: "flooding",       label: "Flooding" },
  { value: "signal_failure", label: "Signal Failure" },
  { value: "debris",         label: "Debris" },
  { value: "crowd",          label: "Crowd / Event" },
  { value: "other",          label: "Other" },
];

export default function IncidentsPage() {
  const { incidents, addIncident, updateStatus, stats } = useIncidents();
  const [showForm, setShowForm] = useState(false);
  const [statusFilter, setStatusFilter] = useState<"all" | IncidentStatus>("all");
  const [typeFilter, setTypeFilter] = useState<"all" | IncidentType>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    return incidents.filter((inc) => {
      if (statusFilter !== "all" && inc.status !== statusFilter) return false;
      if (typeFilter !== "all" && inc.type !== typeFilter) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          inc.title.toLowerCase().includes(q) ||
          inc.location.toLowerCase().includes(q) ||
          inc.description.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [incidents, statusFilter, typeFilter, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/15">
            <AlertTriangle className="h-5 w-5 text-orange-400" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-gradient-blue">
              Incident Reports
            </h1>
            <p className="text-sm text-gray-500">
              Log, track, and resolve traffic incidents in real time
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600 transition-colors shadow-neon"
        >
          <Plus className="h-4 w-4" />
          Report Incident
        </button>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          {
            label: "Open",
            value: stats.openCount,
            icon: FolderOpen,
            color: "text-red-400",
            bg: "bg-red-500/10",
          },
          {
            label: "In Progress",
            value: stats.inProgressCount,
            icon: Clock,
            color: "text-yellow-400",
            bg: "bg-yellow-500/10",
          },
          {
            label: "Critical",
            value: stats.criticalCount,
            icon: Flame,
            color: "text-red-500",
            bg: "bg-red-600/10",
          },
          {
            label: "Resolved",
            value: stats.resolvedCount,
            icon: CheckCircle2,
            color: "text-green-400",
            bg: "bg-green-500/10",
          },
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
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search incidents..."
              className="w-full rounded-xl bg-white/[0.04] border border-white/[0.06] pl-9 pr-3 py-2 text-sm text-gray-200 placeholder:text-gray-600 focus:border-brand-400/50 focus:outline-none focus:ring-1 focus:ring-brand-400/30"
            />
          </div>

          {/* Status filter */}
          <div className="flex items-center gap-1 rounded-xl bg-white/[0.04] border border-white/[0.06] p-1">
            {statusFilters.map((f) => (
              <button
                key={f.value}
                onClick={() => setStatusFilter(f.value)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200",
                  statusFilter === f.value
                    ? "bg-brand-500/20 text-brand-400"
                    : "text-gray-500 hover:text-gray-300"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Type filter */}
          <div className="flex items-center gap-1.5 text-gray-500">
            <Filter className="h-4 w-4" />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as "all" | IncidentType)}
              className="rounded-xl bg-white/[0.04] border border-white/[0.06] py-1.5 pl-3 pr-8 text-sm text-gray-300 focus:border-brand-400/50 focus:outline-none"
            >
              {typeFilters.map((t) => (
                <option key={t.value} value={t.value} className="bg-surface-100">
                  {t.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Incident list */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {filtered.map((inc) => (
            <IncidentCard
              key={inc.id}
              incident={inc}
              onStatusChange={updateStatus}
            />
          ))}
        </div>
      ) : (
        <div className="glass rounded-2xl border-2 border-dashed border-white/[0.08] p-12 text-center">
          <AlertTriangle className="mx-auto h-10 w-10 text-gray-700" />
          <p className="mt-3 text-sm font-medium text-gray-500">No incidents match your filter</p>
          <p className="mt-1 text-xs text-gray-600">Try adjusting the status or type filters.</p>
        </div>
      )}

      {/* Report form modal */}
      {showForm && (
        <IncidentReportForm
          onSubmit={(data) => addIncident(data)}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
