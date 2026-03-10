"use client";

import React from "react";
import { cn } from "@/lib/utils";

type TooltipPosition = "top" | "bottom";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: TooltipPosition;
}

const positionStyles: Record<TooltipPosition, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
};

const arrowStyles: Record<TooltipPosition, string> = {
  top: "top-full left-1/2 -translate-x-1/2 border-t-surface-100",
  bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-surface-100",
};

const arrowBorderStyles: Record<TooltipPosition, string> = {
  top: "border-l-transparent border-r-transparent border-b-transparent border-4",
  bottom: "border-l-transparent border-r-transparent border-t-transparent border-4",
};

export default function Tooltip({
  content,
  children,
  position = "top",
}: TooltipProps) {
  return (
    <div className="group relative inline-flex">
      {children}

      {/* Tooltip bubble */}
      <div
        className={cn(
          "pointer-events-none absolute z-50 whitespace-nowrap rounded-lg bg-surface-100/95 backdrop-blur-xl border border-white/[0.1] px-2.5 py-1.5 text-xs font-medium text-gray-200 opacity-0 shadow-glass-sm transition-opacity duration-150 group-hover:opacity-100",
          positionStyles[position]
        )}
        role="tooltip"
      >
        {content}
        {/* Arrow */}
        <span
          className={cn(
            "absolute h-0 w-0",
            arrowStyles[position],
            arrowBorderStyles[position]
          )}
        />
      </div>
    </div>
  );
}
