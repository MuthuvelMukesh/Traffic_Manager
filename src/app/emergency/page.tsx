"use client";

import React from "react";
import ActiveEmergencyCard from "@/components/emergency/ActiveEmergencyCard";
import EmergencyHistory from "@/components/emergency/EmergencyHistory";
import EmergencyMetrics from "@/components/emergency/EmergencyMetrics";
import { useEmergencyVehicles } from "@/hooks/useEmergencyVehicles";
import { Siren, Filter } from "lucide-react";

export default function EmergencyPage() {
  const { activeVehicles, completedVehicles, stats } = useEmergencyVehicles();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emergency/15 glow-orange">
          <Siren className="h-6 w-6 text-emergency" />
        </div>
        <h1 className="font-display text-2xl font-bold text-gradient-blue">
          Emergency Vehicle Tracking
        </h1>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emergency/15 px-3 py-1 text-xs font-semibold text-emergency ring-1 ring-inset ring-emergency/20 animate-pulse">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emergency opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emergency" />
          </span>
          {stats.activeCount} Active Now
        </span>
      </div>

      {/* Active Emergencies section */}
      <section>
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
          Active Emergencies
        </h2>
        {activeVehicles.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {activeVehicles.map((vehicle) => (
              <ActiveEmergencyCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        ) : (
          <div className="glass rounded-2xl border-2 border-dashed border-white/[0.08] p-8 text-center">
            <Siren className="mx-auto h-10 w-10 text-gray-600" />
            <p className="mt-2 text-sm text-gray-500">
              No active emergency vehicles at this time
            </p>
          </div>
        )}
      </section>

      {/* Divider */}
      <hr className="border-white/[0.06]" />

      {/* Recent History section */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Recent History (Last 24 Hours)
          </h2>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-2 rounded-xl bg-white/[0.04] border border-white/[0.06] px-3 py-1.5 text-sm font-medium text-gray-400 hover:bg-white/[0.06] hover:text-gray-300 transition-all duration-200">
              <Filter className="h-4 w-4" />
              Filter
            </button>
            <button className="inline-flex items-center gap-2 rounded-xl bg-white/[0.04] border border-white/[0.06] px-3 py-1.5 text-sm font-medium text-gray-400 hover:bg-white/[0.06] hover:text-gray-300 transition-all duration-200">
              View All
            </button>
          </div>
        </div>
        <EmergencyHistory vehicles={completedVehicles} />
      </section>

      {/* Performance Metrics section */}
      <section>
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
          Performance Metrics (Last 30 Days)
        </h2>
        <EmergencyMetrics stats={stats} />
      </section>
    </div>
  );
}
