"use client";

import React from "react";
import { cn } from "@/lib/utils";

type SkeletonVariant = "text" | "card" | "circle";

interface SkeletonProps {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
  className?: string;
}

export default function Skeleton({
  variant = "text",
  width,
  height,
  className,
}: SkeletonProps) {
  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === "number" ? `${width}px` : width;
  if (height) style.height = typeof height === "number" ? `${height}px` : height;

  const variantStyles: Record<SkeletonVariant, string> = {
    text: cn("h-4 w-full rounded-md", !height && "h-4"),
    card: cn("h-32 w-full rounded-xl", !height && "h-32"),
    circle: cn("h-10 w-10 rounded-full", !width && "w-10", !height && "h-10"),
  };

  return (
    <div
      className={cn(
        "bg-white/[0.04] shimmer",
        variantStyles[variant],
        className
      )}
      style={style}
      aria-hidden="true"
    />
  );
}
