"use client";

import React, { useState } from "react";
import type { CameraFeed } from "@/types";
import Badge from "@/components/ui/Badge";
import { Camera, X } from "lucide-react";

interface CameraFeedGridProps {
  cameras: CameraFeed[];
}

export default function CameraFeedGrid({ cameras }: CameraFeedGridProps) {
  const [expandedCamera, setExpandedCamera] = useState<CameraFeed | null>(null);

  const directions = ["north", "south", "east", "west"] as const;

  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        {directions.map((direction) => {
          const camera = cameras.find((c) => c.direction === direction);
          return (
            <button
              key={direction}
              onClick={() => camera && setExpandedCamera(camera)}
              className="relative aspect-video rounded-xl bg-surface-200/50 border border-white/[0.04] flex flex-col items-center justify-center cursor-pointer hover:bg-surface-300/50 hover:border-white/[0.08] transition-all duration-200 group"
            >
              <Camera className="h-8 w-8 text-gray-600 group-hover:text-gray-400 transition-colors" />
              <span className="mt-1.5 text-xs text-gray-400 capitalize font-medium">{direction}</span>
              {camera && (
                <Badge
                  variant={camera.status === "online" ? "success" : "danger"}
                  className="absolute top-2 right-2 !text-[10px] !px-1.5 !py-0"
                >
                  {camera.status}
                </Badge>
              )}
            </button>
          );
        })}
      </div>

      {/* Expanded view */}
      {expandedCamera && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md">
          <div className="relative w-full max-w-2xl mx-4">
            <div className="rounded-2xl glass-strong overflow-hidden shadow-glass-lg">
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <Camera className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium text-white capitalize">
                    {expandedCamera.direction} Camera
                  </span>
                  <Badge
                    variant={expandedCamera.status === "online" ? "success" : "danger"}
                  >
                    {expandedCamera.status}
                  </Badge>
                </div>
                <button
                  onClick={() => setExpandedCamera(null)}
                  className="rounded-lg p-1.5 text-gray-500 bg-white/[0.06] hover:bg-white/[0.1] hover:text-gray-300 transition-all duration-200"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="aspect-video flex items-center justify-center bg-surface-200/50">
                <div className="text-center">
                  <Camera className="h-16 w-16 text-gray-600 mx-auto" />
                  <p className="mt-3 text-sm text-gray-500">
                    Camera feed placeholder
                  </p>
                  <p className="text-xs text-gray-600 font-mono mt-1">
                    {expandedCamera.id}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
