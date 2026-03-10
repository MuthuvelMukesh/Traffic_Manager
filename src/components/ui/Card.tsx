"use client";

import React from "react";
import { cn } from "@/lib/utils";

type CardPadding = "none" | "sm" | "md" | "lg";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: CardPadding;
}

const paddingStyles: Record<CardPadding, string> = {
  none: "p-0",
  sm: "p-3",
  md: "p-5",
  lg: "p-7",
};

export default function Card({
  children,
  className,
  hover = false,
  padding = "md",
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] shadow-card",
        paddingStyles[padding],
        hover &&
          "transition-all duration-300 hover:bg-white/[0.05] hover:shadow-card-hover hover:border-white/[0.1]",
        className
      )}
    >
      {children}
    </div>
  );
}
