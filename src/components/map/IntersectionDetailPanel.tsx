"use client";

import React from "react";
import type { Intersection, TrafficStatus } from "@/types";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ProgressBar from "@/components/ui/ProgressBar";
import { X, Camera, Clock, Car, Users, Activity, History, Settings, Video } from "lucide-react";

interface IntersectionDetailPanelProps {
  intersection: Intersection;
  onClose: () => void;
}

const statusBadgeVariant: Record<TrafficStatus, "success" | "warning" | "danger" | "emergency"> = {
  optimal: "success",
  moderate: "warning",
  heavy: "danger",
  emergency: "emergency",
};

const phaseColors: Record<string, string> = {
  green: "bg-green-400",
  yellow: "bg-yellow-400",
  red: "bg-red-400",
};

const phaseGlowStyles: Record<string, string> = {
  green: "shadow-[0_0_10px_rgba(34,197,94,0.5)]",
  yellow: "shadow-[0_0_10px_rgba(245,158,11,0.5)]",
  red: "shadow-[0_0_10px_rgba(239,68,68,0.5)]",
};

export default function IntersectionDetailPanel({
  intersection,
  onClose,
}: IntersectionDetailPanelProps) {
  return (
    <div className="fixed right-0 top-0 z-40 h-full w-[400px] glass-strong shadow-glass-lg animate-slide-in-right overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 glass-strong border-b border-white/[0.06] px-5 py-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold text-white truncate">
              {intersection.name}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="font-mono text-xs text-brand-400">{intersection.id}</span>
              <Badge variant={statusBadgeVariant[intersection.status]} dot>
                {intersection.status.charAt(0).toUpperCase() + intersection.status.slice(1)}
              </Badge>
            </div>
          </div>
          <button
            onClick={onClose}
            className="ml-3 rounded-lg p-1.5 text-gray-500 bg-white/[0.06] hover:bg-white/[0.1] hover:text-gray-300 transition-all duration-200"
            aria-label="Close panel"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="px-5 py-4 space-y-6">
        {/* Metrics */}
        <section>
          <h3 className="text-sm font-semibold text-gray-200 mb-3">Traffic Metrics</h3>
          <div className="grid grid-cols-2 gap-3">
            <MetricCard
              icon={<Activity className="h-4 w-4 text-brand-400" />}
              label="Congestion"
              value={`${intersection.congestionLevel}%`}
            />
            <MetricCard
              icon={<Clock className="h-4 w-4 text-yellow-400" />}
              label="Avg Wait Time"
              value={`${intersection.avgWaitTime}s`}
            />
            <MetricCard
              icon={<Car className="h-4 w-4 text-green-400" />}
              label="Vehicles/Hour"
              value={intersection.vehiclesPerHour.toLocaleString()}
            />
            <MetricCard
              icon={<Users className="h-4 w-4 text-purple-400" />}
              label="Queue Lengths"
              value={`N:${intersection.queueLength.north} S:${intersection.queueLength.south} E:${intersection.queueLength.east} W:${intersection.queueLength.west}`}
              small
            />
          </div>
        </section>

        {/* Signal Status */}
        <section>
          <h3 className="text-sm font-semibold text-gray-200 mb-3">Signal Status</h3>
          <div className="space-y-3">
            {intersection.signals.map((signal) => (
              <div
                key={signal.direction}
                className="flex items-center justify-between rounded-xl bg-white/[0.03] border border-white/[0.06] px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`h-3.5 w-3.5 rounded-full ${phaseColors[signal.phase]} ${phaseGlowStyles[signal.phase]}`}
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-200">
                      {signal.direction === "NS" ? "North-South" : "East-West"}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">{signal.phase} Phase</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold font-mono text-white">
                    {Math.round(signal.timeRemaining)}s
                  </p>
                  <ProgressBar
                    value={(signal.timeRemaining / signal.totalTime) * 100}
                    color={signal.phase === "green" ? "green" : signal.phase === "yellow" ? "yellow" : "red"}
                    size="sm"
                    className="w-20 mt-1"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Camera Feeds */}
        <section>
          <h3 className="text-sm font-semibold text-gray-200 mb-3">Camera Feeds</h3>
          <div className="grid grid-cols-2 gap-2">
            {(["north", "south", "east", "west"] as const).map((direction) => {
              const camera = intersection.cameras.find((c) => c.direction === direction);
              return (
                <div
                  key={direction}
                  className="relative aspect-video rounded-xl bg-surface-200/50 flex flex-col items-center justify-center border border-white/[0.04]"
                >
                  <Camera className="h-6 w-6 text-gray-600" />
                  <span className="mt-1 text-xs text-gray-400 capitalize font-medium">{direction}</span>
                  {camera && (
                    <Badge
                      variant={camera.status === "online" ? "success" : "danger"}
                      className="absolute top-1.5 right-1.5 !text-[10px] !px-1.5 !py-0"
                    >
                      {camera.status}
                    </Badge>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Actions */}
        <section>
          <div className="flex flex-col gap-2">
            <Button variant="secondary" size="sm" icon={<History className="h-4 w-4" />} className="w-full justify-start">
              View History
            </Button>
            <Button variant="ghost" size="sm" icon={<Settings className="h-4 w-4" />} className="w-full justify-start">
              Manual Override
            </Button>
            <Button variant="ghost" size="sm" icon={<Video className="h-4 w-4" />} className="w-full justify-start">
              Camera Feeds
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}

function MetricCard({
  icon,
  label,
  value,
  small = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  small?: boolean;
}) {
  return (
    <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3">
      <div className="flex items-center gap-1.5 mb-1">
        {icon}
        <span className="text-xs text-gray-500">{label}</span>
      </div>
      <p className={`font-semibold text-gray-100 ${small ? "text-xs" : "text-sm"}`}>{value}</p>
    </div>
  );
}
