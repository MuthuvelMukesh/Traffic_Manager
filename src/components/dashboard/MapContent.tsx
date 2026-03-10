"use client";

import React from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import { mockIntersections } from "@/data/intersections";
import type { TrafficStatus } from "@/types";
import "leaflet/dist/leaflet.css";

const statusColorMap: Record<TrafficStatus, string> = {
  optimal: "#22C55E",
  moderate: "#FBBF24",
  heavy: "#DC2626",
  emergency: "#F97316",
};

const statusGlowMap: Record<TrafficStatus, string> = {
  optimal: "0 0 12px rgba(34,197,94,0.6)",
  moderate: "0 0 12px rgba(251,191,36,0.6)",
  heavy: "0 0 12px rgba(220,38,38,0.6)",
  emergency: "0 0 12px rgba(249,115,22,0.6)",
};

export default function MapContent() {
  return (
    <div className="relative h-full w-full">
      <MapContainer
        center={[40.758, -73.9855]}
        zoom={13}
        className="h-full w-full"
        zoomControl={true}
        scrollWheelZoom={true}
        style={{ background: "#0a0e1a" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        {mockIntersections.map((intersection) => (
          <CircleMarker
            key={intersection.id}
            center={[intersection.lat, intersection.lng]}
            radius={7}
            pathOptions={{
              color: statusColorMap[intersection.status],
              fillColor: statusColorMap[intersection.status],
              fillOpacity: 0.9,
              weight: 2,
            }}
          >
            <Popup>
              <div className="text-sm" style={{ color: "#e5e7eb" }}>
                <p className="font-semibold" style={{ color: "#ffffff" }}>
                  {intersection.name}
                </p>
                <p className="capitalize" style={{ color: "#9ca3af" }}>
                  {intersection.status}
                </p>
                <p style={{ color: "#9ca3af" }}>
                  Wait: {intersection.avgWaitTime}s
                </p>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>

      {/* Legend - glass pills */}
      <div className="absolute bottom-4 right-4 z-[1000] flex flex-wrap gap-2">
        {(
          [
            { status: "optimal", label: "Optimal" },
            { status: "moderate", label: "Moderate" },
            { status: "heavy", label: "Heavy" },
            { status: "emergency", label: "Emergency" },
          ] as const
        ).map(({ status, label }) => (
          <div
            key={status}
            className="flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-[rgba(10,14,26,0.85)] px-3 py-1.5 backdrop-blur-md"
          >
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{
                backgroundColor: statusColorMap[status],
                boxShadow: statusGlowMap[status],
              }}
            />
            <span className="text-xs font-medium text-gray-300">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
