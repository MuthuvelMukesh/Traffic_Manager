"use client";

import React, { useState, useMemo } from "react";
import { useTrafficData } from "@/hooks/useTrafficData";
import TrafficMap from "@/components/map/TrafficMap";
import MapControls from "@/components/map/MapControls";
import IntersectionDetailPanel from "@/components/map/IntersectionDetailPanel";
import type { Intersection } from "@/types";

export default function MapPage() {
  const { intersections } = useTrafficData();
  const [selectedIntersection, setSelectedIntersection] = useState<Intersection | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [layers, setLayers] = useState({
    trafficDensity: true,
    cameraCoverage: false,
    emergencyRoutes: false,
  });

  const filteredIntersections = useMemo(() => {
    if (statusFilter === "all") return intersections;
    return intersections.filter((i) => i.status === statusFilter);
  }, [intersections, statusFilter]);

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
        layers={layers}
        onLayerToggle={handleLayerToggle}
      />
      <div className="relative flex-1">
        <TrafficMap
          intersections={filteredIntersections}
          onIntersectionSelect={handleIntersectionSelect}
          selectedId={currentSelected?.id}
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
