"use client";

import { useState, useEffect, useCallback } from "react";
import { EmergencyVehicle } from "@/types";
import { mockEmergencyVehicles } from "@/data/emergencyVehicles";
import { randomBetween } from "@/lib/utils";

export function useEmergencyVehicles() {
  const [vehicles, setVehicles] = useState<EmergencyVehicle[]>(mockEmergencyVehicles);

  const simulateProgress = useCallback(() => {
    setVehicles((prev) =>
      prev.map((vehicle) => {
        if (!vehicle.active) return vehicle;

        const progressDelta = randomBetween(2, 5);
        const newProgress = Math.min(100, vehicle.routeProgress + progressDelta);
        const newEta = Math.max(0, vehicle.etaSeconds - 5);
        const newTimeSaved = vehicle.timeSavedSeconds + randomBetween(0, 2);
        const newCleared = Math.floor(
          (newProgress / 100) * vehicle.intersectionsTotal
        );

        if (newProgress >= 100) {
          return {
            ...vehicle,
            routeProgress: 100,
            etaSeconds: 0,
            intersectionsCleared: vehicle.intersectionsTotal,
            timeSavedSeconds: newTimeSaved,
            active: false,
            endTime: new Date(),
          };
        }

        return {
          ...vehicle,
          routeProgress: newProgress,
          etaSeconds: newEta,
          intersectionsCleared: newCleared,
          timeSavedSeconds: newTimeSaved,
          currentLocation: {
            lat: vehicle.currentLocation.lat + (Math.random() - 0.5) * 0.001,
            lng: vehicle.currentLocation.lng + (Math.random() - 0.5) * 0.001,
          },
        };
      })
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(simulateProgress, 3000);
    return () => clearInterval(interval);
  }, [simulateProgress]);

  const activeVehicles = vehicles.filter((v) => v.active);
  const completedVehicles = vehicles.filter((v) => !v.active);
  const totalTimeSaved = vehicles.reduce((sum, v) => sum + v.timeSavedSeconds, 0);
  const avgTimeSaved = completedVehicles.length > 0
    ? Math.round(totalTimeSaved / completedVehicles.length)
    : 0;

  return {
    vehicles,
    activeVehicles,
    completedVehicles,
    stats: {
      totalPreemptions: completedVehicles.length,
      avgTimeSaved,
      successRate: 98.5,
      activeCount: activeVehicles.length,
    },
  };
}
