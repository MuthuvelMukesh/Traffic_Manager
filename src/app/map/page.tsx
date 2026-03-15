"use client";

import React, { useState, useMemo } from "react";
import { useTrafficData } from "@/hooks/useTrafficData";
import { useEmergencyVehicles } from "@/hooks/useEmergencyVehicles";
import TrafficMap from "@/components/map/TrafficMap";
import MapControls from "@/components/map/MapControls";
import IntersectionDetailPanel from "@/components/map/IntersectionDetailPanel";
import type { Intersection } from "@/types";

export default function MapPage() {
  const { intersections } = useTrafficData();
  const { vehicles } = useEmergencyVehicles();
  const [selectedIntersection, setSelectedIntersection] = useState<Intersection | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [zoneFilter, setZoneFilter] = useState("all");
  const [layers, setLayers] = useState({
    trafficDensity: true,
    cameraCoverage: false,
    emergencyRoutes: false,
  });

  const filteredIntersections = useMemo(() => {
    return intersections.filter((i) => {
      if (statusFilter !== "all" && i.status !== statusFilter) return false;
      if (zoneFilter !== "all" && i.zone !== zoneFilter) return false;
      return true;
    });
  }, [intersections, statusFilter, zoneFilter]);

  const handleIntersectionSelect = (intersection: Intersection) => {
    setSelectedIntersection(intersection);
  };

  const handlePanelClose = () => {
    setSelectedIntersection(null);
  };

  const handleLayerToggle = (layer: string) => {
    setLayers((prev) => ({
      ...prev,
      [layer]: !prev[layer as keyof typeof prev],
    }));
  };

  // Keep selected intersection data fresh
  const currentSelected = selectedIntersection
    ? intersections.find((i) => i.id === selectedIntersection.id) || null
    : null;

  return (
    <div className="-m-6 flex flex-col h-[calc(100vh-60px)] bg-surface">
      <MapControls
        intersections={intersections}
        onSearchSelect={handleIntersectionSelect}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        zoneFilter={zoneFilter}
        onZoneFilterChange={setZoneFilter}
        layers={layers}
        onLayerToggle={handleLayerToggle}
      />
      <div className="relative flex-1">
        <TrafficMap
          intersections={filteredIntersections}
          onIntersectionSelect={handleIntersectionSelect}
          selectedId={currentSelected?.id}
          layers={layers}
          emergencyVehicles={vehicles}
        />
        {currentSelected && (
          <IntersectionDetailPanel
            intersection={currentSelected}
            onClose={handlePanelClose}
          />
        )}
      </div>
    </div>
  );
}
