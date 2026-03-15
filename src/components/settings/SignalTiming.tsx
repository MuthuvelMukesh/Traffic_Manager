"use client";

import React, { useState } from "react";

interface ZoneTiming {
  id: string;
  zone: string;
  nsGreenMin: number;
  nsGreenMax: number;
  ewGreenMin: number;
  ewGreenMax: number;
  yellowDuration: number;
  allRedClearance: number;
  pedestrianWalkTime: number;
  peakHourExtension: number;
}

const defaultTimings: ZoneTiming[] = [
  {
    id: "downtown",
    zone: "Downtown",
    nsGreenMin: 20,
    nsGreenMax: 60,
    ewGreenMin: 20,
    ewGreenMax: 55,
    yellowDuration: 4,
    allRedClearance: 2,
    pedestrianWalkTime: 25,
    peakHourExtension: 15,
  },
  {
    id: "midtown",
    zone: "Midtown",
    nsGreenMin: 25,
    nsGreenMax: 70,
    ewGreenMin: 25,
    ewGreenMax: 65,
    yellowDuration: 4,
    allRedClearance: 2,
    pedestrianWalkTime: 30,
    peakHourExtension: 20,
  },
  {
    id: "uptown",
    zone: "Uptown",
    nsGreenMin: 20,
    nsGreenMax: 55,
    ewGreenMin: 20,
    ewGreenMax: 50,
    yellowDuration: 3,
    allRedClearance: 2,
    pedestrianWalkTime: 25,
    peakHourExtension: 10,
  },
];

function SliderField({
  label,
  value,
  min,
  max,
  unit,
  onChange,
  hint,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  unit: string;
  onChange: (v: number) => void;
  hint?: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-300">{label}</label>
        <span className="rounded-lg bg-brand-500/15 px-2.5 py-0.5 text-sm font-bold text-brand-400">
          {value}{unit}
        </span>
      </div>
      {hint && <p className="mt-0.5 text-xs text-gray-500">{hint}</p>}
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full"
      />
      <div className="mt-1 flex justify-between text-xs text-gray-600">
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  );
}

export default function SignalTiming() {
  const [timings, setTimings] = useState<ZoneTiming[]>(defaultTimings);
  const [activeZone, setActiveZone] = useState("downtown");
  const [adaptiveMode, setAdaptiveMode] = useState(true);
  const [peakHoursEnabled, setPeakHoursEnabled] = useState(true);
  const [nightModeEnabled, setNightModeEnabled] = useState(true);

  const current = timings.find((t) => t.id === activeZone) ?? timings[0];

  const updateTiming = (partial: Partial<ZoneTiming>) => {
    setTimings((prev) =>
      prev.map((t) => (t.id === activeZone ? { ...t, ...partial } : t))
    );
  };

  return (
    <div className="space-y-6">
      {/* Global mode toggles */}
      <div className="glass rounded-2xl p-6 shadow-card">
        <h3 className="mb-4 text-base font-semibold text-gray-100">
          Global Signal Modes
        </h3>
        <div className="space-y-3">
          {[
            {
              label: "Adaptive Timing",
              description: "AI dynamically adjusts green times based on real-time queue lengths",
              value: adaptiveMode,
              onChange: setAdaptiveMode,
            },
            {
              label: "Peak Hour Extension",
              description: "Add extra green time during morning (7–9 AM) and evening (4–7 PM) peaks",
              value: peakHoursEnabled,
              onChange: setPeakHoursEnabled,
            },
            {
              label: "Night Mode (11 PM – 5 AM)",
              description: "Reduce cycle lengths and switch low-traffic intersections to flashing mode",
              value: nightModeEnabled,
              onChange: setNightModeEnabled,
            },
          ].map((item) => (
            <label
              key={item.label}
              className="flex items-start gap-3 rounded-xl px-3 py-2.5 hover:bg-white/[0.03] transition-colors cursor-pointer"
            >
              <button
                type="button"
                role="switch"
                aria-checked={item.value}
                onClick={() => item.onChange(!item.value)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 mt-0.5 ${
                  item.value ? "bg-brand-500" : "bg-white/[0.1]"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow ring-0 transition-transform duration-200 ${
                    item.value ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
              <span className="flex flex-col">
                <span className="text-sm font-medium text-gray-200">{item.label}</span>
                <span className="text-xs text-gray-500">{item.description}</span>
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Zone-based timing */}
      <div className="glass rounded-2xl p-6 shadow-card">
        <h3 className="mb-4 text-base font-semibold text-gray-100">
          Zone-Based Signal Timing
        </h3>

        {/* Zone tabs */}
        <div className="mb-6 flex gap-2">
          {timings.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveZone(t.id)}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
                activeZone === t.id
                  ? "bg-brand-500/15 text-brand-400 border border-brand-500/30"
                  : "text-gray-400 bg-white/[0.03] hover:bg-white/[0.05] hover:text-gray-300 border border-transparent"
              }`}
            >
              {t.zone}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <SliderField
            label="NS Min Green Time"
            value={current.nsGreenMin}
            min={10}
            max={current.nsGreenMax - 5}
            unit="s"
            onChange={(v) => updateTiming({ nsGreenMin: v })}
            hint="Minimum green phase for North-South direction"
          />
          <SliderField
            label="NS Max Green Time"
            value={current.nsGreenMax}
            min={current.nsGreenMin + 5}
            max={120}
            unit="s"
            onChange={(v) => updateTiming({ nsGreenMax: v })}
            hint="Maximum green phase for North-South direction"
          />
          <SliderField
            label="EW Min Green Time"
            value={current.ewGreenMin}
            min={10}
            max={current.ewGreenMax - 5}
            unit="s"
            onChange={(v) => updateTiming({ ewGreenMin: v })}
            hint="Minimum green phase for East-West direction"
          />
          <SliderField
            label="EW Max Green Time"
            value={current.ewGreenMax}
            min={current.ewGreenMin + 5}
            max={120}
            unit="s"
            onChange={(v) => updateTiming({ ewGreenMax: v })}
            hint="Maximum green phase for East-West direction"
          />
          <SliderField
            label="Yellow Duration"
            value={current.yellowDuration}
            min={2}
            max={8}
            unit="s"
            onChange={(v) => updateTiming({ yellowDuration: v })}
          />
          <SliderField
            label="All-Red Clearance"
            value={current.allRedClearance}
            min={1}
            max={5}
            unit="s"
            onChange={(v) => updateTiming({ allRedClearance: v })}
            hint="Buffer between phases to clear the intersection"
          />
          <SliderField
            label="Pedestrian Walk Time"
            value={current.pedestrianWalkTime}
            min={15}
            max={60}
            unit="s"
            onChange={(v) => updateTiming({ pedestrianWalkTime: v })}
          />
          <SliderField
            label="Peak Hour Extension"
            value={current.peakHourExtension}
            min={0}
            max={30}
            unit="s"
            onChange={(v) => updateTiming({ peakHourExtension: v })}
            hint="Extra time added during peak periods"
          />
        </div>

        {/* Cycle Time Summary */}
        <div className="mt-6 rounded-xl bg-white/[0.03] border border-white/[0.06] p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">Cycle Summary</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              {
                label: "Min Cycle",
                value: `${current.nsGreenMin + current.ewGreenMin + current.yellowDuration * 2 + current.allRedClearance * 2}s`,
              },
              {
                label: "Max Cycle",
                value: `${current.nsGreenMax + current.ewGreenMax + current.yellowDuration * 2 + current.allRedClearance * 2}s`,
              },
              {
                label: "Ped + Walk",
                value: `${current.pedestrianWalkTime}s`,
              },
              {
                label: "Peak Ext.",
                value: peakHoursEnabled ? `+${current.peakHourExtension}s` : "Off",
              },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <p className="text-lg font-bold text-brand-400">{item.value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
