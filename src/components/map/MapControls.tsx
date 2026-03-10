"use client";

import React, { useState, useRef, useEffect } from "react";
import type { Intersection, TrafficStatus } from "@/types";
import { Search, Layers, Filter, ChevronDown, X } from "lucide-react";

interface MapControlsProps {
  intersections: Intersection[];
  onSearchSelect: (intersection: Intersection) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  layers: { trafficDensity: boolean; cameraCoverage: boolean; emergencyRoutes: boolean };
  onLayerToggle: (layer: string) => void;
}

export default function MapControls({
  intersections,
  onSearchSelect,
  statusFilter,
  onStatusFilterChange,
  layers,
  onLayerToggle,
}: MapControlsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [showLayerDropdown, setShowLayerDropdown] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  const filteredResults = searchQuery.trim()
    ? intersections.filter(
        (i) =>
          i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          i.id.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchDropdown(false);
      }
      if (layerRef.current && !layerRef.current.contains(event.target as Node)) {
        setShowLayerDropdown(false);
      }
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilterDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const statusOptions: { value: string; label: string }[] = [
    { value: "all", label: "All Status" },
    { value: "optimal", label: "Optimal" },
    { value: "moderate", label: "Moderate" },
    { value: "heavy", label: "Heavy" },
  ];

  const layerOptions = [
    { key: "trafficDensity", label: "Traffic Density" },
    { key: "cameraCoverage", label: "Camera Coverage" },
    { key: "emergencyRoutes", label: "Emergency Routes" },
  ];

  return (
    <div className="flex items-center gap-3 glass border-b border-white/[0.06] px-4 py-3">
      {/* Search with autocomplete */}
      <div ref={searchRef} className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
        <input
          type="text"
          placeholder="Search intersections..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setShowSearchDropdown(true);
          }}
          onFocus={() => {
            if (searchQuery.trim()) setShowSearchDropdown(true);
          }}
          className="input-glass w-full pl-9 pr-8 text-sm"
        />
        {searchQuery && (
          <button
            onClick={() => {
              setSearchQuery("");
              setShowSearchDropdown(false);
            }}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-gray-500 hover:text-gray-300 transition-colors"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
        {showSearchDropdown && filteredResults.length > 0 && (
          <div className="absolute top-full left-0 mt-1 w-full rounded-xl glass-strong shadow-glass z-50 max-h-64 overflow-y-auto border border-white/[0.08]">
            {filteredResults.slice(0, 10).map((intersection) => (
              <button
                key={intersection.id}
                className="flex w-full items-center gap-3 px-3 py-2.5 text-left hover:bg-white/[0.04] transition-colors first:rounded-t-xl last:rounded-b-xl"
                onClick={() => {
                  onSearchSelect(intersection);
                  setSearchQuery(intersection.name);
                  setShowSearchDropdown(false);
                }}
              >
                <StatusDot status={intersection.status} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-200 truncate">{intersection.name}</p>
                  <p className="text-xs text-gray-500 font-mono">{intersection.id}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Layer dropdown */}
      <div ref={layerRef} className="relative">
        <button
          onClick={() => setShowLayerDropdown(!showLayerDropdown)}
          className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-2.5 text-sm font-medium text-gray-400 hover:bg-white/[0.08] hover:text-gray-200 transition-all duration-200"
        >
          <Layers className="h-4 w-4" />
          Layers
          <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${showLayerDropdown ? "rotate-180" : ""}`} />
        </button>
        {showLayerDropdown && (
          <div className="absolute top-full right-0 mt-1 w-52 rounded-xl glass-strong shadow-glass z-50 py-1 border border-white/[0.08]">
            {layerOptions.map((layer) => (
              <label
                key={layer.key}
                className="flex items-center gap-3 px-3 py-2.5 hover:bg-white/[0.04] cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={layers[layer.key as keyof typeof layers]}
                  onChange={() => onLayerToggle(layer.key)}
                  className="h-4 w-4 rounded"
                />
                <span className="text-sm text-gray-300">{layer.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Status filter pills */}
      <div ref={filterRef} className="relative">
        <button
          onClick={() => setShowFilterDropdown(!showFilterDropdown)}
          className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
            statusFilter !== "all"
              ? "bg-brand-500/15 text-brand-400 border border-brand-500/30"
              : "border border-white/[0.08] bg-white/[0.04] text-gray-400 hover:bg-white/[0.08] hover:text-gray-200"
          }`}
        >
          <Filter className="h-4 w-4" />
          {statusOptions.find((o) => o.value === statusFilter)?.label || "Filter"}
          <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${showFilterDropdown ? "rotate-180" : ""}`} />
        </button>
        {showFilterDropdown && (
          <div className="absolute top-full right-0 mt-1 w-44 rounded-xl glass-strong shadow-glass z-50 py-1 border border-white/[0.08]">
            {statusOptions.map((option) => (
              <button
                key={option.value}
                className={`flex w-full items-center gap-2.5 px-3 py-2.5 text-sm transition-colors ${
                  statusFilter === option.value
                    ? "bg-brand-500/10 text-brand-400 font-medium"
                    : "text-gray-400 hover:bg-white/[0.04] hover:text-gray-200"
                }`}
                onClick={() => {
                  onStatusFilterChange(option.value);
                  setShowFilterDropdown(false);
                }}
              >
                {option.value !== "all" && <StatusDot status={option.value as TrafficStatus} />}
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatusDot({ status }: { status: TrafficStatus | string }) {
  const colors: Record<string, string> = {
    optimal: "bg-green-400",
    moderate: "bg-yellow-400",
    heavy: "bg-red-400",
    emergency: "bg-orange-400",
  };
  const glows: Record<string, string> = {
    optimal: "shadow-[0_0_8px_rgba(34,197,94,0.5)]",
    moderate: "shadow-[0_0_8px_rgba(245,158,11,0.5)]",
    heavy: "shadow-[0_0_8px_rgba(239,68,68,0.5)]",
    emergency: "shadow-[0_0_8px_rgba(249,115,22,0.6)]",
  };
  return (
    <span
      className={`h-2.5 w-2.5 rounded-full flex-shrink-0 ${colors[status] || "bg-gray-500"} ${glows[status] || ""}`}
    />
  );
}
