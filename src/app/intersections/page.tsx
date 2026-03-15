"use client";

import React, { useState } from "react";
import { useTrafficData } from "@/hooks/useTrafficData";
import IntersectionList from "@/components/intersections/IntersectionList";
import IntersectionDetail from "@/components/intersections/IntersectionDetail";
import ManualOverrideModal from "@/components/intersections/ManualOverrideModal";
import type { Intersection } from "@/types";
import { GitBranch, CheckCircle, X } from "lucide-react";

export default function IntersectionsPage() {
  const { intersections } = useTrafficData();
  const [selectedIntersection, setSelectedIntersection] = useState<Intersection | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("status");
  const [overrideModalOpen, setOverrideModalOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; intersectionName: string } | null>(null);

  const showToast = (message: string, intersectionName: string) => {
    setToast({ message, intersectionName });
    setTimeout(() => setToast(null), 4000);
  };

  const handleSelect = (intersection: Intersection) => {
    setSelectedIntersection(intersection);
  };

  const handleOverrideConfirm = (data: {
    reason: string;
    nsGreen: number;
    ewGreen: number;
    duration: string;
  }) => {
    const name = currentSelected?.name ?? "Unknown";
    setOverrideModalOpen(false);
    showToast(
      `Manual override applied: NS ${data.nsGreen}s / EW ${data.ewGreen}s for ${data.duration}`,
      name
    );
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

      {/* Toast notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
          <div className="flex items-start gap-3 rounded-2xl glass-strong border border-success/30 bg-success/10 px-4 py-3 shadow-glass-lg min-w-[320px] max-w-sm">
            <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-100">{toast.intersectionName}</p>
              <p className="text-xs text-gray-400 mt-0.5">{toast.message}</p>
            </div>
            <button
              onClick={() => setToast(null)}
              className="text-gray-500 hover:text-gray-300 transition-colors flex-shrink-0"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
