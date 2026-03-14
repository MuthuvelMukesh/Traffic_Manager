"use client";

import { useState, useCallback } from "react";
import { mockIncidents } from "@/data/incidents";
import type { Incident, IncidentStatus, IncidentSeverity, IncidentType } from "@/types";

let incidentCounter = mockIncidents.length + 1;

function nextId(): string {
  return `INC-${String(incidentCounter++).padStart(3, "0")}`;
}

export function useIncidents() {
  const [incidents, setIncidents] = useState<Incident[]>(mockIncidents);

  const addIncident = useCallback(
    (data: Omit<Incident, "id" | "timestamp">) => {
      const newIncident: Incident = {
        ...data,
        id: nextId(),
        timestamp: new Date(),
      };
      setIncidents((prev) => [newIncident, ...prev]);
      return newIncident;
    },
    []
  );

  const updateStatus = useCallback((id: string, status: IncidentStatus) => {
    setIncidents((prev) =>
      prev.map((inc) =>
        inc.id === id
          ? {
              ...inc,
              status,
              resolvedAt:
                status === "resolved" || status === "closed"
                  ? new Date()
                  : inc.resolvedAt,
            }
          : inc
      )
    );
  }, []);

  const assignIncident = useCallback((id: string, assignedTo: string) => {
    setIncidents((prev) =>
      prev.map((inc) =>
        inc.id === id ? { ...inc, assignedTo, status: "in_progress" } : inc
      )
    );
  }, []);

  // Derived stats
  const openCount = incidents.filter((i) => i.status === "open").length;
  const inProgressCount = incidents.filter((i) => i.status === "in_progress").length;
  const resolvedCount = incidents.filter(
    (i) => i.status === "resolved" || i.status === "closed"
  ).length;
  const criticalCount = incidents.filter(
    (i) => i.severity === "critical" && i.status !== "resolved" && i.status !== "closed"
  ).length;
  const activeIncidents = incidents.filter(
    (i) => i.status === "open" || i.status === "in_progress"
  );

  return {
    incidents,
    activeIncidents,
    addIncident,
    updateStatus,
    assignIncident,
    stats: { openCount, inProgressCount, resolvedCount, criticalCount },
  };
}
