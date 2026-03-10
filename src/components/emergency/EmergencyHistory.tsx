"use client";

import React, { useState, useMemo, useCallback } from "react";
import { Heart, Flame, Shield } from "lucide-react";
import type { EmergencyVehicle } from "@/types";
import { cn } from "@/lib/utils";

interface EmergencyHistoryProps {
  vehicles: EmergencyVehicle[];
}

const vehicleIcons: Record<string, React.ReactNode> = {
  ambulance: (
    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emergency/15">
      <Heart className="h-3 w-3 text-emergency" />
    </span>
  ),
  fire: (
    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-danger/15">
      <Flame className="h-3 w-3 text-danger" />
    </span>
  ),
  police: (
    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-500/15">
      <Shield className="h-3 w-3 text-brand-400" />
    </span>
  ),
};

function formatTime(date: Date): string {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

type SortDirection = "asc" | "desc";

export default function EmergencyHistory({ vehicles }: EmergencyHistoryProps) {
  const [sortKey, setSortKey] = useState<string | null>("time");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const tableData = useMemo(
    () =>
      vehicles.map((v) => ({
        id: v.id,
        time: v.startTime ? new Date(v.startTime).getTime() : 0,
        timeDisplay: v.startTime ? formatTime(v.startTime) : "--",
        callSign: v.callSign,
        type: v.type,
        origin: v.origin,
        destination: v.destination,
        timeSavedSeconds: v.timeSavedSeconds,
      })),
    [vehicles]
  );

  const handleSort = useCallback(
    (key: string) => {
      if (sortKey === key) {
        setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
      } else {
        setSortKey(key);
        setSortDirection("asc");
      }
    },
    [sortKey]
  );

  const sortedData = useMemo(() => {
    if (!sortKey) return tableData;
    return [...tableData].sort((a, b) => {
      const aVal = a[sortKey as keyof typeof a];
      const bVal = b[sortKey as keyof typeof b];
      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;
      let comparison = 0;
      if (typeof aVal === "number" && typeof bVal === "number") {
        comparison = aVal - bVal;
      } else {
        comparison = String(aVal).localeCompare(String(bVal));
      }
      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [tableData, sortKey, sortDirection]);

  const columns = [
    { key: "time", label: "Time", sortable: true },
    { key: "callSign", label: "Vehicle", sortable: false },
    { key: "origin", label: "Route", sortable: false },
    { key: "timeSavedSeconds", label: "Time Saved", sortable: true },
  ];

  return (
    <div className="overflow-x-auto rounded-2xl border border-white/[0.06]">
      <table className="min-w-full divide-y divide-white/[0.06]">
        <thead className="bg-white/[0.03]">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={cn(
                  "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500",
                  column.sortable && "cursor-pointer select-none hover:text-gray-300 transition-colors"
                )}
                onClick={column.sortable ? () => handleSort(column.key) : undefined}
              >
                <div className="inline-flex items-center gap-1.5">
                  {column.label}
                  {column.sortable && (
                    <span className="flex flex-col">
                      <svg
                        className={cn(
                          "h-3 w-3 -mb-0.5",
                          sortKey === column.key && sortDirection === "asc"
                            ? "text-brand-400"
                            : "text-gray-600"
                        )}
                        viewBox="0 0 12 12"
                        fill="currentColor"
                      >
                        <path d="M6 2l4 4H2z" />
                      </svg>
                      <svg
                        className={cn(
                          "h-3 w-3 -mt-0.5",
                          sortKey === column.key && sortDirection === "desc"
                            ? "text-brand-400"
                            : "text-gray-600"
                        )}
                        viewBox="0 0 12 12"
                        fill="currentColor"
                      >
                        <path d="M6 10l4-4H2z" />
                      </svg>
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.04]">
          {sortedData.map((row, rowIndex) => (
            <tr
              key={row.id}
              className={cn(
                "transition-colors duration-100 hover:bg-white/[0.03]",
                rowIndex % 2 === 1 && "bg-white/[0.01]"
              )}
            >
              {/* Time */}
              <td className="whitespace-nowrap px-4 py-3 text-sm">
                <span className="font-mono text-gray-400">{row.timeDisplay}</span>
              </td>
              {/* Vehicle */}
              <td className="whitespace-nowrap px-4 py-3 text-sm">
                <div className="flex items-center gap-2">
                  {vehicleIcons[row.type]}
                  <span className="font-medium text-gray-200">{row.callSign}</span>
                </div>
              </td>
              {/* Route */}
              <td className="whitespace-nowrap px-4 py-3 text-sm">
                <span className="text-gray-400">
                  {row.origin}{" "}
                  <span className="text-gray-600">&rarr;</span>{" "}
                  {row.destination}
                </span>
              </td>
              {/* Time Saved */}
              <td className="whitespace-nowrap px-4 py-3 text-sm">
                <span className="inline-flex items-center rounded-full bg-signal-green/10 px-2 py-0.5 font-mono font-semibold text-signal-green text-xs">
                  {(() => {
                    const seconds = row.timeSavedSeconds;
                    const mins = Math.floor(seconds / 60);
                    const secs = seconds % 60;
                    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
                  })()}
                </span>
              </td>
            </tr>
          ))}
          {sortedData.length === 0 && (
            <tr>
              <td
                colSpan={4}
                className="px-4 py-8 text-center text-sm text-gray-500"
              >
                No history available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
