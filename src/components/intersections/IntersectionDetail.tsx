"use client";

import React from "react";
import type { Intersection, TrafficStatus } from "@/types";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import SignalStatus from "./SignalStatus";
import CameraFeedGrid from "./CameraFeedGrid";
import {
  BarChart3,
  Settings,
  Sliders,
  Clock,
  Car,
  Users,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

interface IntersectionDetailProps {
  intersection: Intersection;
  onManualOverride: () => void;
}

const statusBadgeVariant: Record<TrafficStatus, "success" | "warning" | "danger" | "emergency"> = {
  optimal: "success",
  moderate: "warning",
  heavy: "danger",
  emergency: "emergency",
};

export default function IntersectionDetail({
  intersection,
  onManualOverride,
}: IntersectionDetailProps) {
  // Simulated trend values for display
  const waitTimeTrend = intersection.avgWaitTime > 30 ? 8 : -5;
  const vehiclesTrend = 3.2;

  return (
    <div className="h-full overflow-y-auto bg-transparent p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">
              {intersection.name}
            </h2>
            <div className="flex items-center gap-3 mt-1.5">
              <span className="font-mono text-xs text-gray-500">{intersection.id}</span>
              <Badge variant={statusBadgeVariant[intersection.status]} dot>
                {intersection.status.charAt(0).toUpperCase() + intersection.status.slice(1)}
              </Badge>
              {intersection.aiControlActive && (
                <Badge variant="info">AI Active</Badge>
              )}
            </div>
          </div>
          <span className="text-xs text-gray-500">
            Last updated: just now
          </span>
        </div>
      </div>

      {/* Camera Feeds Grid */}
      <section className="mb-6">
        <h3 className="text-sm font-semibold text-gray-200 mb-3">Camera Feeds</h3>
        <CameraFeedGrid cameras={intersection.cameras} />
      </section>

      {/* Signal Status */}
      <section className="mb-6">
        <h3 className="text-sm font-semibold text-gray-200 mb-3">Signal Status</h3>
        <div className="space-y-2">
          {intersection.signals.map((signal) => (
            <SignalStatus key={signal.direction} signal={signal} />
          ))}
        </div>
      </section>

      {/* Traffic Metrics */}
      <section className="mb-6">
        <h3 className="text-sm font-semibold text-gray-200 mb-3">Traffic Metrics</h3>
        <div className="grid grid-cols-2 gap-4">
          {/* Avg Wait Time */}
          <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4">
            <div className="flex items-center gap-2 text-gray-500 mb-1">
              <Clock className="h-4 w-4 text-yellow-400" />
              <span className="text-xs">Avg Wait Time</span>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-bold text-white">
                {intersection.avgWaitTime}s
              </span>
              <TrendIndicator value={waitTimeTrend} inverse />
            </div>
          </div>

          {/* Vehicles/Hour */}
          <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4">
            <div className="flex items-center gap-2 text-gray-500 mb-1">
              <Car className="h-4 w-4 text-green-400" />
              <span className="text-xs">Vehicles/Hour</span>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-bold text-white">
                {intersection.vehiclesPerHour.toLocaleString()}
              </span>
              <TrendIndicator value={vehiclesTrend} />
            </div>
            <div className="flex gap-4 mt-2 text-xs text-gray-500">
              <span>N-S: {Math.round(intersection.vehiclesPerHour * 0.55)}</span>
              <span>E-W: {Math.round(intersection.vehiclesPerHour * 0.45)}</span>
            </div>
          </div>

          {/* Queue Lengths */}
          <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4">
            <div className="flex items-center gap-2 text-gray-500 mb-2">
              <TrendingUp className="h-4 w-4 text-brand-400" />
              <span className="text-xs">Queue Lengths</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">North</span>
                <span className="font-medium text-gray-200">{intersection.queueLength.north}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">South</span>
                <span className="font-medium text-gray-200">{intersection.queueLength.south}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">East</span>
                <span className="font-medium text-gray-200">{intersection.queueLength.east}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">West</span>
                <span className="font-medium text-gray-200">{intersection.queueLength.west}</span>
              </div>
            </div>
          </div>

          {/* Pedestrians Waiting */}
          <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4">
            <div className="flex items-center gap-2 text-gray-500 mb-1">
              <Users className="h-4 w-4 text-purple-400" />
              <span className="text-xs">Pedestrians Waiting</span>
            </div>
            <span className="text-2xl font-bold text-white">
              {intersection.pedestriansWaiting}
            </span>
          </div>
        </div>
      </section>

      {/* Action Buttons */}
      <section>
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            icon={<BarChart3 className="h-4 w-4" />}
          >
            View Analytics
          </Button>
          <Button
            variant="ghost"
            size="sm"
            icon={<Settings className="h-4 w-4" />}
          >
            Configure
          </Button>
          <Button
            variant="secondary"
            size="sm"
            icon={<Sliders className="h-4 w-4" />}
            onClick={onManualOverride}
          >
            Manual Override
          </Button>
        </div>
      </section>
    </div>
  );
}

function TrendIndicator({ value, inverse = false }: { value: number; inverse?: boolean }) {
  // For wait time, lower is better (inverse=true means negative trend is good)
  const isPositive = inverse ? value < 0 : value > 0;
  const absValue = Math.abs(value);

  return (
    <span
      className={`inline-flex items-center gap-0.5 text-xs font-medium ${
        isPositive ? "text-green-400" : "text-red-400"
      }`}
    >
      {isPositive ? (
        <ArrowDownRight className="h-3 w-3" />
      ) : (
        <ArrowUpRight className="h-3 w-3" />
      )}
      {absValue.toFixed(1)}%
    </span>
  );
}
