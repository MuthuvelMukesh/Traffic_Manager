"use client";

import React from "react";
import { useTrafficData } from "@/hooks/useTrafficData";
import { useAlerts } from "@/hooks/useAlerts";
import KPICard from "@/components/dashboard/KPICard";
import TrafficVolumeChart from "@/components/dashboard/TrafficVolumeChart";
import AlertsPanel from "@/components/dashboard/AlertsPanel";
import EnvironmentalImpact from "@/components/dashboard/EnvironmentalImpact";
import QuickActions from "@/components/dashboard/QuickActions";
import MiniMap from "@/components/dashboard/MiniMap";
import {
  RefreshCw,
  Radio,
  Timer,
  Leaf,
  Gauge,
  Activity,
} from "lucide-react";

export default function DashboardPage() {
  const { intersections, lastUpdated, stats } = useTrafficData();
  const { unacknowledgedCount } = useAlerts();

  const formattedTime = lastUpdated.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div
        className="flex items-center justify-between"
        style={{ animation: "fadeInUp 0.5s ease-out both" }}
      >
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-display text-3xl font-bold text-white">
              Dashboard
            </h1>
            <span className="text-gradient-multi font-display text-3xl font-bold">
              Command Center
            </span>
          </div>
          <div className="mt-2 flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-xs font-medium text-gray-400 backdrop-blur-sm">
              <Activity className="h-3 w-3 text-emerald-400" />
              System Online
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-xs font-medium text-gray-400 backdrop-blur-sm">
              Last updated: {formattedTime}
            </span>
          </div>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-gray-300 backdrop-blur-sm transition-all duration-200 hover:bg-white/[0.08] hover:text-white hover:border-white/[0.15]"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </button>
      </div>

      {/* KPI Cards Row */}
      <div>
        <div className="mb-3 flex items-center gap-2">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-white/[0.08] to-transparent" />
          <span className="text-xs font-medium uppercase tracking-widest text-gray-600">Key Metrics</span>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-white/[0.08] to-transparent" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div style={{ animation: "fadeInUp 0.5s ease-out both", animationDelay: "0.1s" }}>
            <KPICard
              label="Active Intersections"
              value={`${stats.activeCount}/${stats.totalCount}`}
              trend={2.5}
              trendLabel="vs last hour"
              status="good"
              icon={<Radio className="h-5 w-5" />}
            />
          </div>
          <div style={{ animation: "fadeInUp 0.5s ease-out both", animationDelay: "0.15s" }}>
            <KPICard
              label="Avg Wait Time"
              value={stats.avgWaitTime}
              unit="sec"
              trend={-4.2}
              trendLabel="vs last hour"
              status={stats.avgWaitTime > 45 ? "critical" : stats.avgWaitTime > 35 ? "warning" : "good"}
              icon={<Timer className="h-5 w-5" />}
            />
          </div>
          <div style={{ animation: "fadeInUp 0.5s ease-out both", animationDelay: "0.2s" }}>
            <KPICard
              label="CO2 Saved Today"
              value="890"
              unit="kg"
              trend={12.4}
              trendLabel="vs yesterday"
              status="good"
              icon={<Leaf className="h-5 w-5" />}
            />
          </div>
          <div style={{ animation: "fadeInUp 0.5s ease-out both", animationDelay: "0.25s" }}>
            <KPICard
              label="System Efficiency"
              value={`${stats.efficiency}%`}
              trend={3.1}
              trendLabel="vs last hour"
              status={stats.efficiency >= 80 ? "good" : stats.efficiency >= 60 ? "warning" : "critical"}
              icon={<Gauge className="h-5 w-5" />}
            />
          </div>
        </div>
      </div>

      {/* MiniMap Full Width */}
      <div
        className="h-[400px]"
        style={{ animation: "fadeInUp 0.5s ease-out both", animationDelay: "0.3s" }}
      >
        <MiniMap />
      </div>

      {/* Traffic Volume + Alerts */}
      <div>
        <div className="mb-3 flex items-center gap-2">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-white/[0.08] to-transparent" />
          <span className="text-xs font-medium uppercase tracking-widest text-gray-600">Analytics & Monitoring</span>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-white/[0.08] to-transparent" />
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
          <div
            className="lg:col-span-3"
            style={{ animation: "fadeInUp 0.5s ease-out both", animationDelay: "0.35s" }}
          >
            <TrafficVolumeChart />
          </div>
          <div
            className="lg:col-span-2"
            style={{ animation: "fadeInUp 0.5s ease-out both", animationDelay: "0.4s" }}
          >
            <AlertsPanel />
          </div>
        </div>
      </div>

      {/* Environmental Impact + Quick Actions */}
      <div>
        <div className="mb-3 flex items-center gap-2">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-white/[0.08] to-transparent" />
          <span className="text-xs font-medium uppercase tracking-widest text-gray-600">Operations</span>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-white/[0.08] to-transparent" />
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
          <div
            className="lg:col-span-3"
            style={{ animation: "fadeInUp 0.5s ease-out both", animationDelay: "0.45s" }}
          >
            <EnvironmentalImpact />
          </div>
          <div
            className="lg:col-span-2"
            style={{ animation: "fadeInUp 0.5s ease-out both", animationDelay: "0.5s" }}
          >
            <QuickActions />
          </div>
        </div>
      </div>

      {/* Fade-in keyframes */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
