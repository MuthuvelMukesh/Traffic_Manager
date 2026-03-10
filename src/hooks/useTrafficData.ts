"use client";

import { useState, useEffect, useCallback } from "react";
import { Intersection } from "@/types";
import { mockIntersections } from "@/data/intersections";
import { REFRESH_INTERVAL } from "@/lib/constants";
import { randomBetween } from "@/lib/utils";

export function useTrafficData() {
  const [intersections, setIntersections] = useState<Intersection[]>(mockIntersections);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const simulateUpdate = useCallback(() => {
    setIntersections((prev) =>
      prev.map((intersection) => {
        // Randomly fluctuate some values
        const congestionDelta = randomBetween(-5, 5);
        const newCongestion = Math.max(0, Math.min(100, intersection.congestionLevel + congestionDelta));

        let newStatus = intersection.status;
        if (newCongestion <= 40) newStatus = "optimal";
        else if (newCongestion <= 70) newStatus = "moderate";
        else newStatus = "heavy";

        // Update signal timers
        const newSignals = intersection.signals.map((signal) => {
          let newTimeRemaining = signal.timeRemaining - (REFRESH_INTERVAL / 1000);
          if (newTimeRemaining <= 0) {
            // Cycle to next phase
            const phases: ("green" | "yellow" | "red")[] = ["green", "yellow", "red"];
            const currentIndex = phases.indexOf(signal.phase);
            const nextPhase = phases[(currentIndex + 1) % 3];
            const totalTimes = { green: randomBetween(30, 60), yellow: 5, red: randomBetween(30, 60) };
            return {
              ...signal,
              phase: nextPhase,
              timeRemaining: totalTimes[nextPhase],
              totalTime: totalTimes[nextPhase],
            };
          }
          return { ...signal, timeRemaining: Math.max(0, newTimeRemaining) };
        });

        const waitDelta = randomBetween(-3, 3);
        const newWait = Math.max(5, intersection.avgWaitTime + waitDelta);

        return {
          ...intersection,
          congestionLevel: newCongestion,
          status: newStatus,
          signals: newSignals,
          avgWaitTime: newWait,
          vehiclesPerHour: Math.max(100, intersection.vehiclesPerHour + randomBetween(-50, 50)),
          pedestriansWaiting: Math.max(0, intersection.pedestriansWaiting + randomBetween(-2, 2)),
        };
      })
    );
    setLastUpdated(new Date());
  }, []);

  useEffect(() => {
    const interval = setInterval(simulateUpdate, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [simulateUpdate]);

  const activeCount = intersections.filter((i) => i.aiControlActive).length;
  const totalCount = intersections.length;
  const avgWaitTime = Math.round(
    intersections.reduce((sum, i) => sum + i.avgWaitTime, 0) / intersections.length
  );
  const optimalCount = intersections.filter((i) => i.status === "optimal").length;
  const efficiency = Math.round((optimalCount / totalCount) * 100);

  return {
    intersections,
    lastUpdated,
    stats: {
      activeCount,
      totalCount,
      avgWaitTime,
      efficiency,
      optimalCount,
      moderateCount: intersections.filter((i) => i.status === "moderate").length,
      heavyCount: intersections.filter((i) => i.status === "heavy").length,
    },
  };
}
