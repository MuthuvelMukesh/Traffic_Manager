"use client";

import { useState, useCallback } from "react";
import { Alert } from "@/types";
import { mockAlerts } from "@/data/alerts";

export function useAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);

  const acknowledgeAlert = useCallback((id: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === id ? { ...alert, acknowledged: true } : alert
      )
    );
  }, []);

  const dismissAlert = useCallback((id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  }, []);

  const unacknowledgedCount = alerts.filter((a) => !a.acknowledged).length;
  const activeAlerts = alerts.filter((a) => !a.acknowledged);
  const criticalAlerts = alerts.filter((a) => a.severity === "critical" && !a.acknowledged);
  const emergencyAlerts = alerts.filter((a) => a.severity === "emergency" && !a.acknowledged);

  return {
    alerts,
    activeAlerts,
    criticalAlerts,
    emergencyAlerts,
    unacknowledgedCount,
    acknowledgeAlert,
    dismissAlert,
  };
}
