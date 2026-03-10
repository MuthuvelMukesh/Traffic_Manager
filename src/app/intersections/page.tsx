"use client";

import React, { useState } from "react";
import { useTrafficData } from "@/hooks/useTrafficData";
import IntersectionList from "@/components/intersections/IntersectionList";
import IntersectionDetail from "@/components/intersections/IntersectionDetail";
import ManualOverrideModal from "@/components/intersections/ManualOverrideModal";
import type { Intersection } from "@/types";
import { GitBranch } from "lucide-react";

export default function IntersectionsPage() {
  const { intersections } = useTrafficData();
  const [selectedIntersection, setSelectedIntersection] = useState<Intersection | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("status");
  const [overrideModalOpen, setOverrideModalOpen] = useState(false);

  const handleSelect = (intersection: Intersection) => {
    setSelectedIntersection(intersection);
  };

  const handleOverrideConfirm = (data: {
    reason: string;
    nsGreen: number;
    ewGreen: number;
    duration: string;
  }) => {
    // In a real app, this would send the override command to the server
    console.log("Override confirmed:", data);
    setOverrideModalOpen(false);
  };

  // Keep selected intersection data fresh from live updates
  const currentSelected = selectedIntersection
    ? intersections.find((i) => i.id === selectedIntersection.id) || null
    : null;

  return (
    <div className="-m-6 flex h-[calc(100vh-60px)] bg-surface">
      {/* Left sidebar - Intersection List */}
      <div className="w-96 flex-shrink-0">
        <IntersectionList
          intersections={intersections}
          selectedId={currentSelected?.id || null}
          onSelect={handleSelect}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
      </div>

      {/* Right panel - Intersection Detail */}
      <div className="flex-1 min-w-0">
        {currentSelected ? (
          <IntersectionDetail
            intersection={currentSelected}
            onManualOverride={() => setOverrideModalOpen(true)}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-16 w-16 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
                <GitBranch className="h-8 w-8 text-gray-600" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-300">
                Select an Intersection
              </h3>
              <p className="mt-1.5 text-sm text-gray-500 max-w-sm">
                Choose an intersection from the list to view its details,
                camera feeds, signal status, and traffic metrics.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Manual Override Modal */}
      {currentSelected && (
        <ManualOverrideModal
          isOpen={overrideModalOpen}
          onClose={() => setOverrideModalOpen(false)}
          intersectionName={currentSelected.name}
          onConfirm={handleOverrideConfirm}
        />
      )}
    </div>
  );
}
