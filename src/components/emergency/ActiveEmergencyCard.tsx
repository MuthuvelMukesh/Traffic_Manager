"use client";

import React from "react";
import ProgressBar from "@/components/ui/ProgressBar";
import type { EmergencyVehicle } from "@/types";
import {
  Heart,
  Flame,
  Shield,
  MapPin,
  ArrowRight,
  Clock,
} from "lucide-react";
import { cn, formatDuration } from "@/lib/utils";

interface ActiveEmergencyCardProps {
  vehicle: EmergencyVehicle;
}

const vehicleConfig: Record<
  string,
  {
    icon: React.ReactNode;
    label: string;
    borderColor: string;
    iconBg: string;
    glowClass: string;
    neonShadow: string;
    progressColor: "orange" | "red" | "blue";
    accentColor: string;
  }
> = {
  ambulance: {
    icon: <Heart className="h-6 w-6" />,
    label: "Ambulance",
    borderColor: "border-l-emergency",
    iconBg: "bg-emergency/15 text-emergency",
    glowClass: "glow-orange",
    neonShadow: "shadow-neon-orange",
    progressColor: "orange",
    accentColor: "text-emergency",
  },
  fire: {
    icon: <Flame className="h-6 w-6" />,
    label: "Fire Engine",
    borderColor: "border-l-danger",
    iconBg: "bg-danger/15 text-danger",
    glowClass: "glow-red",
    neonShadow: "shadow-neon-red",
    progressColor: "red",
    accentColor: "text-danger",
  },
  police: {
    icon: <Shield className="h-6 w-6" />,
    label: "Police",
    borderColor: "border-l-brand-400",
    iconBg: "bg-brand-500/15 text-brand-400",
    glowClass: "glow-blue",
    neonShadow: "shadow-neon-blue",
    progressColor: "blue",
    accentColor: "text-brand-400",
  },
};

export default function ActiveEmergencyCard({
  vehicle,
}: ActiveEmergencyCardProps) {
  const config = vehicleConfig[vehicle.type];

  return (
    <div
      className={cn(
        "glass rounded-2xl overflow-hidden border-l-4 shadow-card transition-all duration-300 hover:shadow-card-hover",
        config.borderColor,
        config.glowClass
      )}
    >
      <div className="p-5">
        {/* Header row */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-xl",
                config.iconBg,
                config.neonShadow
              )}
            >
              {config.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">
                  {vehicle.callSign}
                </h3>
                <span className="text-sm text-gray-400">{config.label}</span>
              </div>
              <div className="mt-0.5 flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-signal-green/15 px-2.5 py-0.5 text-xs font-semibold text-signal-green ring-1 ring-inset ring-signal-green/20">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal-green opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal-green" />
                  </span>
                  ACTIVE
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Route info */}
        <div className="mt-4 flex items-center gap-2 text-sm">
          <span className="font-medium text-gray-300">{vehicle.origin}</span>
          <ArrowRight className="h-4 w-4 flex-shrink-0 text-gray-500" />
          <span className="font-medium text-gray-300">
            {vehicle.destination}
          </span>
        </div>

        {/* Current location */}
        <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
          <MapPin className="h-4 w-4 flex-shrink-0" />
          <span className="font-mono text-xs">
            {vehicle.currentLocation.lat.toFixed(4)},{" "}
            {vehicle.currentLocation.lng.toFixed(4)}
          </span>
        </div>

        {/* Stats row */}
        <div className="mt-4 grid grid-cols-3 gap-3">
          <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] p-3 text-center">
            <div className="text-xs font-medium text-gray-500">Cleared</div>
            <div className="mt-1 stat-value text-xl text-white">
              {vehicle.intersectionsCleared}/{vehicle.intersectionsTotal}
            </div>
            <div className="text-xs text-gray-500">intersections</div>
          </div>
          <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] p-3 text-center">
            <div className="text-xs font-medium text-gray-500">ETA</div>
            <div className={cn("mt-1 flex items-center justify-center gap-1 stat-value text-xl", config.accentColor)}>
              <Clock className="h-4 w-4" />
              {formatDuration(vehicle.etaSeconds)}
            </div>
          </div>
          <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] p-3 text-center">
            <div className="text-xs font-medium text-gray-500">Time Saved</div>
            <div className="mt-1 stat-value text-xl text-signal-green">
              {formatDuration(vehicle.timeSavedSeconds)}
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="mb-1 flex items-center justify-between text-xs text-gray-500">
            <span>Route Progress</span>
            <span className="font-medium text-gray-400">{Math.round(vehicle.routeProgress)}%</span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-500 ease-out",
                vehicle.type === "ambulance" && "bg-gradient-to-r from-emergency/80 to-emergency shadow-neon-orange",
                vehicle.type === "fire" && "bg-gradient-to-r from-danger/80 to-danger shadow-neon-red",
                vehicle.type === "police" && "bg-gradient-to-r from-brand-500/80 to-brand-400 shadow-neon-blue"
              )}
              style={{ width: `${Math.round(vehicle.routeProgress)}%` }}
            />
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-4 flex gap-2">
          <button className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500/15 border border-brand-500/20 px-4 py-2 text-sm font-medium text-brand-400 hover:bg-brand-500/25 transition-all duration-200">
            Track on Map
          </button>
          <button className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-white/[0.04] border border-white/[0.06] px-4 py-2 text-sm font-medium text-gray-400 hover:bg-white/[0.06] hover:text-gray-300 transition-all duration-200">
            View Route Details
          </button>
        </div>
      </div>
    </div>
  );
}
