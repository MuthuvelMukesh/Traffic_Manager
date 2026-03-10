"use client";

import React from "react";
import type { SignalState } from "@/types";
import ProgressBar from "@/components/ui/ProgressBar";

interface SignalStatusProps {
  signal: SignalState;
}

const phaseColorDot: Record<string, string> = {
  green: "bg-green-400",
  yellow: "bg-yellow-400",
  red: "bg-red-400",
};

const phaseGlow: Record<string, string> = {
  green: "shadow-[0_0_10px_rgba(34,197,94,0.5)]",
  yellow: "shadow-[0_0_10px_rgba(245,158,11,0.5)]",
  red: "shadow-[0_0_10px_rgba(239,68,68,0.5)]",
};

const phaseProgressColor: Record<string, "green" | "yellow" | "red"> = {
  green: "green",
  yellow: "yellow",
  red: "red",
};

export default function SignalStatus({ signal }: SignalStatusProps) {
  const directionLabel = signal.direction === "NS" ? "N-S" : "E-W";
  const phaseName = signal.phase.charAt(0).toUpperCase() + signal.phase.slice(1);
  const progress = signal.totalTime > 0 ? (signal.timeRemaining / signal.totalTime) * 100 : 0;

  return (
    <div className="flex items-center gap-4 rounded-xl bg-white/[0.03] border border-white/[0.06] px-4 py-3">
      {/* Direction Label */}
      <div className="flex-shrink-0 w-10">
        <span className="text-sm font-semibold text-gray-200">{directionLabel}</span>
      </div>

      {/* Phase indicator */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <span
          className={`h-4 w-4 rounded-full ${phaseColorDot[signal.phase]} ${phaseGlow[signal.phase]}`}
        />
        <span className="text-sm font-medium text-gray-400 w-14">{phaseName}</span>
      </div>

      {/* Progress bar */}
      <div className="flex-1 min-w-0">
        <ProgressBar
          value={progress}
          color={phaseProgressColor[signal.phase]}
          size="sm"
        />
      </div>

      {/* Countdown */}
      <div className="flex-shrink-0 w-12 text-right">
        <span className="text-sm font-semibold font-mono tabular-nums text-white">
          {Math.round(signal.timeRemaining)}s
        </span>
      </div>
    </div>
  );
}
