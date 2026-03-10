"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Map, Maximize2, Minimize2 } from "lucide-react";

const MapContentDynamic = dynamic(
  () => import("@/components/dashboard/MapContent"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center rounded-lg bg-white/[0.02]">
        <div className="text-center">
          <Map className="mx-auto h-8 w-8 animate-pulse text-gray-600" />
          <p className="mt-2 text-sm text-gray-500">Loading map...</p>
        </div>
      </div>
    ),
  }
);

export default function MiniMap() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <div
      className={
        isFullscreen
          ? "fixed inset-0 z-50 rounded-none"
          : "glass relative h-full overflow-hidden rounded-xl border border-white/[0.06]"
      }
    >
      {/* Top gradient border */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[1px] bg-gradient-to-r from-transparent via-brand-500/40 to-transparent" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500/15">
            <Map className="h-4.5 w-4.5 text-brand-400" />
          </div>
          <h3 className="text-base font-semibold text-white">
            Intersection Overview
          </h3>
        </div>
        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="rounded-lg border border-white/[0.06] bg-white/[0.04] p-2 text-gray-400 transition-all hover:bg-white/[0.08] hover:text-white"
          title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
        >
          {isFullscreen ? (
            <Minimize2 className="h-4 w-4" />
          ) : (
            <Maximize2 className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Map area */}
      <div className={isFullscreen ? "h-[calc(100%-57px)]" : "h-[calc(100%-57px)]"}>
        <MapContentDynamic />
      </div>
    </div>
  );
}
