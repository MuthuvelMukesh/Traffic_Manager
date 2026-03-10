"use client";

import React, { useState } from "react";
import DateRangeSelector from "@/components/analytics/DateRangeSelector";
import MetricCard from "@/components/analytics/MetricCard";
import TrafficVolumeByHour from "@/components/analytics/TrafficVolumeByHour";
import TopIntersections from "@/components/analytics/TopIntersections";
import EnvironmentalSummary from "@/components/analytics/EnvironmentalSummary";
import { Download, BarChart3, Activity, Zap, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

const analyticsTabs = [
  { id: "overview", label: "Overview", icon: <BarChart3 className="h-4 w-4" /> },
  { id: "traffic", label: "Traffic Flow", icon: <Activity className="h-4 w-4" /> },
  { id: "performance", label: "Performance", icon: <Zap className="h-4 w-4" /> },
  { id: "environmental", label: "Environmental", icon: <Leaf className="h-4 w-4" /> },
];

const congestedIntersections = [
  { name: "5th Ave & 42nd St", avgWaitTime: 68, trend: 12 },
  { name: "Broadway & 34th St", avgWaitTime: 55, trend: 8 },
  { name: "7th Ave & Times Sq", avgWaitTime: 52, trend: -3 },
  { name: "Lexington & 59th St", avgWaitTime: 48, trend: 5 },
  { name: "Park Ave & 46th St", avgWaitTime: 45, trend: 2 },
];

const performingIntersections = [
  { name: "2nd Ave & 23rd St", avgWaitTime: 12, trend: -18 },
  { name: "10th Ave & 30th St", avgWaitTime: 14, trend: -15 },
  { name: "West End & 72nd St", avgWaitTime: 16, trend: -12 },
  { name: "3rd Ave & 14th St", avgWaitTime: 18, trend: -8 },
  { name: "Madison & 50th St", avgWaitTime: 20, trend: -6 },
];

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-gradient-blue">
            Analytics &amp; Reports
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            System performance metrics and traffic analysis
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl bg-white/[0.04] border border-white/[0.06] px-4 py-2 text-sm font-medium text-gray-300 hover:bg-white/[0.06] hover:text-gray-200 transition-all duration-200">
          <Download className="h-4 w-4" />
          Export Report
        </button>
      </div>

      {/* Date range selector */}
      <DateRangeSelector />

      {/* Tabs */}
      <div className="border-b border-white/[0.06]">
        <nav className="-mb-px flex gap-x-1" aria-label="Tabs">
          {analyticsTabs.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-t-lg border-b-2 px-4 py-3 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "border-brand-400 text-brand-400 bg-brand-500/[0.06]"
                    : "border-transparent text-gray-500 hover:text-gray-300 hover:border-white/[0.1]"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                <span className="flex-shrink-0">{tab.icon}</span>
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab content */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Top metric cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <MetricCard
              label="Avg Wait Time"
              value="28"
              unit="seconds"
              trend={35}
              trendDirection="down"
              trendPositive={false}
            />
            <MetricCard
              label="System Efficiency"
              value="87"
              unit="%"
              trend={12}
              trendDirection="up"
              trendPositive={true}
            />
          </div>

          {/* Traffic volume chart */}
          <TrafficVolumeByHour />

          {/* Intersections rankings */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <TopIntersections
                title="Most Congested Intersections"
                type="congested"
                data={congestedIntersections}
              />
            </div>
            <div className="lg:col-span-2">
              <TopIntersections
                title="Top Performing Intersections"
                type="performing"
                data={performingIntersections}
              />
            </div>
          </div>

          {/* Environmental summary */}
          <EnvironmentalSummary />
        </div>
      )}

      {activeTab === "traffic" && (
        <div className="space-y-6">
          <TrafficVolumeByHour />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <MetricCard
              label="Peak Hour Volume"
              value="14,200"
              unit="vehicles"
              trend={4}
              trendDirection="up"
              trendPositive={true}
            />
            <MetricCard
              label="Average Daily Traffic"
              value="182,400"
              unit="vehicles"
              trend={3}
              trendDirection="up"
              trendPositive={true}
            />
          </div>
        </div>
      )}

      {activeTab === "performance" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <MetricCard
              label="Avg Wait Time"
              value="28"
              unit="seconds"
              trend={35}
              trendDirection="down"
              trendPositive={false}
            />
            <MetricCard
              label="System Efficiency"
              value="87"
              unit="%"
              trend={12}
              trendDirection="up"
              trendPositive={true}
            />
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <TopIntersections
                title="Most Congested Intersections"
                type="congested"
                data={congestedIntersections}
              />
            </div>
            <div className="lg:col-span-2">
              <TopIntersections
                title="Top Performing Intersections"
                type="performing"
                data={performingIntersections}
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === "environmental" && (
        <div className="space-y-6">
          <EnvironmentalSummary />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <MetricCard
              label="Carbon Offset Rate"
              value="890"
              unit="kg/day"
              trend={15}
              trendDirection="up"
              trendPositive={true}
            />
            <MetricCard
              label="Fuel Efficiency Gain"
              value="340"
              unit="L/day"
              trend={11}
              trendDirection="up"
              trendPositive={true}
            />
          </div>
        </div>
      )}
    </div>
  );
}
