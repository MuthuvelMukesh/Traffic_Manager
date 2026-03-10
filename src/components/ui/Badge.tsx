"use client";

import React from "react";
import { cn } from "@/lib/utils";

type BadgeVariant =
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "default"
  | "emergency";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  success: "bg-emerald-500/15 text-emerald-400 ring-emerald-500/20",
  warning: "bg-amber-500/15 text-amber-400 ring-amber-500/20",
  danger: "bg-red-500/15 text-red-400 ring-red-500/20",
  info: "bg-cyan-500/15 text-cyan-400 ring-cyan-500/20",
  default: "bg-white/[0.06] text-gray-400 ring-white/[0.08]",
  emergency: "bg-orange-500/15 text-orange-400 ring-orange-500/20 animate-pulse",
};

const dotColorStyles: Record<BadgeVariant, string> = {
  success: "bg-emerald-400",
  warning: "bg-amber-400",
  danger: "bg-red-400",
  info: "bg-cyan-400",
  default: "bg-gray-500",
  emergency: "bg-orange-400",
};

const dotGlowStyles: Record<BadgeVariant, string> = {
  success: "shadow-[0_0_6px_rgba(52,211,153,0.6)]",
  warning: "shadow-[0_0_6px_rgba(251,191,36,0.6)]",
  danger: "shadow-[0_0_6px_rgba(248,113,113,0.6)]",
  info: "shadow-[0_0_6px_rgba(34,211,238,0.6)]",
  default: "shadow-none",
  emergency: "shadow-[0_0_6px_rgba(251,146,60,0.6)]",
};

export default function Badge({
  variant = "default",
  children,
  className,
  dot = false,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
        variantStyles[variant],
        className
      )}
    >
      {dot && (
        <span className="relative flex h-1.5 w-1.5">
          <span
            className={cn(
              "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
              dotColorStyles[variant]
            )}
          />
          <span
            className={cn(
              "relative inline-flex h-1.5 w-1.5 rounded-full",
              dotColorStyles[variant],
              dotGlowStyles[variant]
            )}
          />
        </span>
      )}
      {children}
    </span>
  );
}
