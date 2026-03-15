"use client";
"use client";

import React, { useState } from "react";
import type { CameraFeed } from "@/types";
import Badge from "@/components/ui/Badge";
import { Camera, X, Wifi, WifiOff } from "lucide-react";

interface CameraFeedGridProps {
  cameras: CameraFeed[];
}

function MockFeed({
  cameraId,
  direction,
  status,
}: {
  cameraId: string;
  direction: string;
  status: "online" | "offline";
}) {
  if (status === "offline") {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center bg-surface-200/50 text-center gap-2">
        <WifiOff className="h-10 w-10 text-danger/50" />
        <p className="text-xs text-danger/70 font-medium">Camera Offline</p>
        <p className="text-[10px] text-gray-600 font-mono">{cameraId}</p>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-surface-200/60">
      {/* Simulated street-scene gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a2a1a] via-[#151f1a] to-[#0d1510]" />
      {/* Perspective road lines */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[30%] h-[40%] border-l-2 border-r-2 border-yellow-400/20"
        style={{ clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)" }}
      />
      {/* Lane markers */}
      <div className="absolute bottom-[5%] left-[47%] w-[6%] h-[12%] bg-white/20 rounded-sm" />
      <div className="absolute bottom-[20%] left-[47.5%] w-[5%] h-[8%] bg-white/15 rounded-sm" />
      <div className="absolute bottom-[35%] left-[48%] w-[4%] h-[5%] bg-white/10 rounded-sm" />
      {/* Vehicle blobs */}
      <div className="absolute bottom-[8%] left-[36%] w-[12%] h-[8%] bg-[#334] rounded opacity-70" />
      <div className="absolute bottom-[8%] left-[52%] w-[10%] h-[7%] bg-[#443] rounded opacity-60" />
      <div className="absolute bottom-[22%] left-[43%] w-[8%] h-[5%] bg-[#3a3] rounded opacity-50" />
      {/* Animated scan line */}
      <div
        className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-green-400/40 to-transparent"
        style={{
          animation: "tm-scanline 4s linear infinite",
          top: "0%",
        }}
      />
      {/* Detection bounding boxes */}
      <div className="absolute top-[22%] left-[34%] w-[14%] h-[22%] border border-green-400/30 rounded" />
      <div className="absolute top-[22%] left-[51%] w-[11%] h-[18%] border border-green-400/25 rounded" />
      {/* Corner brackets overlay */}
      <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-green-400/50" />
      <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-green-400/50" />
      <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-green-400/50" />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-green-400/50" />
      {/* REC indicator */}
      <div className="absolute top-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
        <span className="text-[9px] font-mono text-red-400/80">REC</span>
      </div>
      {/* Metadata bar */}
      <div className="absolute bottom-2 left-2 right-2 flex justify-between items-end">
        <span className="text-[9px] font-mono text-green-400/50">{cameraId}</span>
        <span className="text-[9px] font-mono text-gray-600">
          {new Date().toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
}

export default function CameraFeedGrid({ cameras }: CameraFeedGridProps) {
  const [expandedCamera, setExpandedCamera] = useState<CameraFeed | null>(null);
  const directions = ["north", "south", "east", "west"] as const;

  return (
    <>
      <style>{`@keyframes tm-scanline { 0% { top: 0%; } 100% { top: 100%; } }`}</style>
      <div className="grid grid-cols-2 gap-3">
        {directions.map((direction) => {
          const camera = cameras.find((c) => c.direction === direction);
          return (
            <button
              key={direction}
              onClick={() => camera && setExpandedCamera(camera)}
              className="relative aspect-video rounded-xl overflow-hidden border border-white/[0.06] cursor-pointer hover:border-white/[0.14] transition-all duration-200 group"
            >
              {camera ? (
                <MockFeed
                  cameraId={camera.id}
                  direction={direction}
                  status={camera.status}
                />
              ) : (
                <div className="h-full w-full flex flex-col items-center justify-center bg-surface-200/50">
                  <Camera className="h-8 w-8 text-gray-600 group-hover:text-gray-400 transition-colors" />
                  <span className="mt-1.5 text-xs text-gray-400 capitalize font-medium">
                    {direction}
                  </span>
                </div>
              )}
              {camera && (
                <div className="absolute top-1.5 left-1.5 right-1.5 flex items-center justify-between pointer-events-none">
                  <span className="text-[10px] font-semibold capitalize text-white/80 bg-black/50 rounded px-1.5 py-0.5">
                    {direction}
                  </span>
                  <Badge
                    variant={camera.status === "online" ? "success" : "danger"}
                    className="!text-[9px] !px-1.5 !py-0 flex items-center gap-1"
                  >
                    {camera.status === "online" ? (
                      <Wifi className="h-2.5 w-2.5" />
                    ) : (
                      <WifiOff className="h-2.5 w-2.5" />
                    )}
                    {camera.status}
                  </Badge>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Expanded view modal */}
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
                  <span className="text-xs text-gray-500 font-mono">
                    {expandedCamera.id}
                  </span>
                </div>
                <button
                  onClick={() => setExpandedCamera(null)}
                  className="rounded-lg p-1.5 text-gray-500 bg-white/[0.06] hover:bg-white/[0.1] hover:text-gray-300 transition-all duration-200"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="aspect-video">
                <MockFeed
                  cameraId={expandedCamera.id}
                  direction={expandedCamera.direction}
                  status={expandedCamera.status}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
