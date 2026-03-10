"use client";

import React from "react";
import { cn } from "@/lib/utils";

type ProgressBarColor = "blue" | "green" | "yellow" | "red" | "orange";
type ProgressBarSize = "sm" | "md";

interface ProgressBarProps {
  value: number;
  color?: ProgressBarColor;
  showLabel?: boolean;
  size?: ProgressBarSize;
  className?: string;
}

const colorStyles: Record<ProgressBarColor, string> = {
  blue: "bg-gradient-to-r from-blue-500 to-blue-400",
  green: "bg-gradient-to-r from-emerald-500 to-emerald-400",
  yellow: "bg-gradient-to-r from-amber-500 to-amber-400",
  red: "bg-gradient-to-r from-red-500 to-red-400",
  orange: "bg-gradient-to-r from-orange-500 to-orange-400",
};

const glowStyles: Record<ProgressBarColor, string> = {
  blue: "shadow-[0_0_8px_rgba(59,130,246,0.5)]",
  green: "shadow-[0_0_8px_rgba(16,185,129,0.5)]",
  yellow: "shadow-[0_0_8px_rgba(245,158,11,0.5)]",
  red: "shadow-[0_0_8px_rgba(239,68,68,0.5)]",
  orange: "shadow-[0_0_8px_rgba(249,115,22,0.5)]",
};

const sizeStyles: Record<ProgressBarSize, string> = {
  sm: "h-1.5",
  md: "h-2.5",
};

export default function ProgressBar({
  value,
  color = "blue",
  showLabel = false,
  size = "md",
  className,
}: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        className={cn(
          "w-full overflow-hidden rounded-full bg-white/[0.06]",
          sizeStyles[size]
        )}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out",
            colorStyles[color],
            glowStyles[color]
          )}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
      {showLabel && (
        <span className="flex-shrink-0 text-sm font-medium text-gray-300">
          {Math.round(clampedValue)}%
        </span>
      )}
    </div>
  );
}
