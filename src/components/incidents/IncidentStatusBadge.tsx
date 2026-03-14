"use client";

import React from "react";
import type { Incident, IncidentStatus } from "@/types";
import { cn } from "@/lib/utils";

const statusConfig: Record<IncidentStatus, { label: string; dot: string; ring: string; text: string }> = {
  open:        { label: "Open",        dot: "bg-red-400",    ring: "ring-red-400/30",    text: "text-red-400"    },
  in_progress: { label: "In Progress", dot: "bg-yellow-400", ring: "ring-yellow-400/30", text: "text-yellow-400" },
  resolved:    { label: "Resolved",    dot: "bg-green-400",  ring: "ring-green-400/30",  text: "text-green-400"  },
  closed:      { label: "Closed",      dot: "bg-gray-500",   ring: "ring-gray-500/30",   text: "text-gray-500"   },
};

interface Props {
  status: IncidentStatus;
  animate?: boolean;
}

export default function IncidentStatusBadge({ status, animate }: Props) {
  const cfg = statusConfig[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset",
        cfg.ring,
        cfg.text,
        "bg-white/[0.04]"
      )}
    >
      <span className="relative flex h-1.5 w-1.5">
        {animate && (status === "open" || status === "in_progress") && (
          <span
            className={cn(
              "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
              cfg.dot
            )}
          />
        )}
        <span className={cn("relative inline-flex h-1.5 w-1.5 rounded-full", cfg.dot)} />
      </span>
      {cfg.label}
    </span>
  );
}
