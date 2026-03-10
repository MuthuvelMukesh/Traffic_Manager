"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ToggleProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  label?: string;
  description?: string;
}

export default function Toggle({
  enabled,
  onChange,
  label,
  description,
}: ToggleProps) {
  return (
    <label className="inline-flex cursor-pointer items-start gap-3">
      {/* Switch track */}
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={() => onChange(!enabled)}
        className={cn(
          "relative inline-flex h-6 w-11 flex-shrink-0 rounded-full border-2 border-transparent transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
          enabled
            ? "bg-gradient-to-r from-brand-500 to-brand-600 shadow-neon-blue"
            : "bg-white/[0.08]"
        )}
      >
        {/* Switch knob */}
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform duration-200 ease-in-out",
            enabled ? "translate-x-5" : "translate-x-0"
          )}
        />
      </button>

      {/* Label and description */}
      {(label || description) && (
        <span className="flex flex-col">
          {label && (
            <span className="text-sm font-medium text-gray-200">{label}</span>
          )}
          {description && (
            <span className="text-sm text-gray-500">{description}</span>
          )}
        </span>
      )}
    </label>
  );
}
