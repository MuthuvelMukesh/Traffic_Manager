"use client";

import React from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from "react-leaflet";
import type { Intersection, TrafficStatus } from "@/types";
import { MAP_CENTER, MAP_ZOOM } from "@/lib/constants";
import "leaflet/dist/leaflet.css";

const STATUS_COLORS: Record<TrafficStatus, string> = {
  optimal: "#22C55E",
  moderate: "#F59E0B",
  heavy: "#EF4444",
  emergency: "#F97316",
};

const STATUS_GLOW: Record<TrafficStatus, string> = {
  optimal: "rgba(34, 197, 94, 0.5)",
  moderate: "rgba(245, 158, 11, 0.5)",
  heavy: "rgba(239, 68, 68, 0.5)",
  emergency: "rgba(249, 115, 22, 0.6)",
};

interface TrafficMapContentProps {
  intersections: Intersection[];
  onIntersectionSelect: (intersection: Intersection) => void;
  selectedId?: string;
}

function MapResizer() {
  const map = useMap();
  React.useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  }, [map]);
  return null;
}

export default function TrafficMapContent({
  intersections,
  onIntersectionSelect,
  selectedId,
}: TrafficMapContentProps) {
  return (
    <MapContainer
      center={MAP_CENTER}
      zoom={MAP_ZOOM}
      className="h-full w-full"
      zoomControl={true}
    >
      <MapResizer />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {intersections.map((intersection) => {
        const isSelected = selectedId === intersection.id;
        const statusColor = STATUS_COLORS[intersection.status];

        return (
          <CircleMarker
            key={intersection.id}
            center={[intersection.lat, intersection.lng]}
            radius={isSelected ? 14 : 9}
            fillColor={statusColor}
            color={isSelected ? "#60A5FA" : statusColor}
            weight={isSelected ? 3 : 2}
            opacity={1}
            fillOpacity={0.8}
            className={isSelected ? "selected-marker" : ""}
            eventHandlers={{
              click: () => onIntersectionSelect(intersection),
            }}
          >
            <Popup>
              <div className="min-w-[180px] p-1">
                <p className="font-semibold text-gray-100 text-sm">{intersection.name}</p>
                <p className="text-xs text-gray-500 font-mono mt-0.5">{intersection.id}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span
                    className="inline-block h-2.5 w-2.5 rounded-full"
                    style={{
                      backgroundColor: statusColor,
                      boxShadow: `0 0 8px ${STATUS_GLOW[intersection.status]}`,
                    }}
                  />
                  <span className="text-xs font-medium text-gray-300 capitalize">
                    {intersection.status}
                  </span>
                </div>
                <div className="mt-2 space-y-1 text-xs text-gray-400">
                  <div className="flex justify-between">
                    <span>Congestion</span>
                    <span className="text-gray-200 font-medium">{intersection.congestionLevel}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Wait Time</span>
                    <span className="text-gray-200 font-medium">{intersection.avgWaitTime}s</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Flow</span>
                    <span className="text-gray-200 font-medium">{intersection.vehiclesPerHour} veh/hr</span>
                  </div>
                </div>
              </div>
            </Popup>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}
