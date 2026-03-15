"use client";

import React from "react";
import dynamic from "next/dynamic";
import type { Intersection, EmergencyVehicle } from "@/types";

const TrafficMapContent = dynamic(() => import("./TrafficMapContent"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center rounded-xl bg-surface-50">
      <div className="text-center">
        <div className="relative mx-auto h-10 w-10">
          <div className="absolute inset-0 rounded-full border-2 border-white/[0.06]" />
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-brand-400" />
        </div>
        <p className="mt-4 text-sm text-gray-500">Loading map...</p>
        <div className="mt-3 mx-auto w-48 h-1.5 rounded-full overflow-hidden bg-white/[0.04]">
          <div className="h-full w-1/2 rounded-full shimmer bg-brand-500/20" />
        </div>
      </div>
    </div>
  ),
});

interface TrafficMapProps {
  intersections: Intersection[];
  onIntersectionSelect: (intersection: Intersection) => void;
  selectedId?: string;
  layers?: { trafficDensity: boolean; cameraCoverage: boolean; emergencyRoutes: boolean };
  emergencyVehicles?: EmergencyVehicle[];
}

export default function TrafficMap({
  intersections,
  onIntersectionSelect,
  selectedId,
  layers,
  emergencyVehicles = [],
}: TrafficMapProps) {
  return (
    <TrafficMapContent
      intersections={intersections}
      onIntersectionSelect={onIntersectionSelect}
      selectedId={selectedId}
      layers={layers}
      emergencyVehicles={emergencyVehicles}
    />
  );
}
