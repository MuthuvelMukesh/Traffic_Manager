"use client";

import React from "react";
import type { Incident, IncidentStatus } from "@/types";
import IncidentStatusBadge from "./IncidentStatusBadge";
import { cn, formatDuration } from "@/lib/utils";
import {
  AlertTriangle,
  Construction,
  Droplets,
  Zap,
  Package,
  Users,
  HelpCircle,
  MapPin,
  Clock,
  User,
} from "lucide-react";

const typeIcon: Record<string, React.ElementType> = {
  accident:       AlertTriangle,
  roadwork:       Construction,
  flooding:       Droplets,
  signal_failure: Zap,
  debris:         Package,
  crowd:          Users,
  other:          HelpCircle,
};

const severityBorder: Record<string, string> = {
  critical: "border-l-4 border-l-red-500",
  high:     "border-l-4 border-l-orange-500",
  medium:   "border-l-4 border-l-yellow-500",
  low:      "border-l-4 border-l-blue-500",
};

interface Props {
  incident: Incident;
  onStatusChange?: (id: string, status: IncidentStatus) => void;
}

export default function IncidentCard({ incident, onStatusChange }: Props) {
  const Icon = typeIcon[incident.type] ?? HelpCircle;
  const elapsed = Math.round((Date.now() - incident.timestamp.getTime()) / 60_000);

  return (
    <div
      className={cn(
        "glass rounded-2xl p-4 shadow-card transition-all duration-200 hover:bg-white/[0.04]",
        severityBorder[incident.severity]
      )}
    >
      {/* Header row */}
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-white/[0.06]">
          <Icon className="h-4.5 w-4.5 text-gray-300" style={{ width: 18, height: 18 }} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-gray-100 truncate">{incident.title}</span>
            <span className="text-xs text-gray-600">{incident.id}</span>
          </div>
          <p className="mt-1 text-xs text-gray-400 line-clamp-2">{incident.description}</p>
        </div>
        <IncidentStatusBadge status={incident.status} animate />
      </div>

      {/* Meta row */}
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          {incident.location}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {elapsed < 60 ? `${elapsed}m ago` : formatDuration(elapsed * 60)}
        </span>
        {incident.reportedBy && (
          <span className="flex items-center gap-1">
            <User className="h-3 w-3" />
            {incident.reportedBy}
          </span>
        )}
        {incident.estimatedClearTime && incident.status !== "resolved" && incident.status !== "closed" && (
          <span className="flex items-center gap-1 text-yellow-500">
            <Clock className="h-3 w-3" />
            Est. {incident.estimatedClearTime}m to clear
          </span>
        )}
      </div>

      {/* Tags */}
      {incident.tags && incident.tags.length > 0 && (
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {incident.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-white/[0.06] px-2 py-0.5 text-[10px] font-medium text-gray-400"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Actions */}
      {onStatusChange && incident.status !== "closed" && (
        <div className="mt-3 flex gap-2 border-t border-white/[0.06] pt-3">
          {incident.status === "open" && (
            <button
              onClick={() => onStatusChange(incident.id, "in_progress")}
              className="rounded-lg bg-yellow-500/10 px-3 py-1.5 text-xs font-medium text-yellow-400 hover:bg-yellow-500/20 transition-colors"
            >
              Start Response
            </button>
          )}
          {incident.status === "in_progress" && (
            <button
              onClick={() => onStatusChange(incident.id, "resolved")}
              className="rounded-lg bg-green-500/10 px-3 py-1.5 text-xs font-medium text-green-400 hover:bg-green-500/20 transition-colors"
            >
              Mark Resolved
            </button>
          )}
          {incident.status === "resolved" && (
            <button
              onClick={() => onStatusChange(incident.id, "closed")}
              className="rounded-lg bg-gray-500/10 px-3 py-1.5 text-xs font-medium text-gray-400 hover:bg-gray-500/20 transition-colors"
            >
              Close
            </button>
          )}
        </div>
      )}
    </div>
  );
}
