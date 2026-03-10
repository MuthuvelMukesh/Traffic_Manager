"use client";

import React, { useState } from "react";
import type { AIConfig } from "@/types";

const defaultConfig: AIConfig = {
  confidenceThreshold: 75,
  updateFrequency: 5,
  optimizationAggressiveness: 50,
  visualDetection: true,
  audioDetection: true,
  gpsIntegration: true,
  radioTransponder: false,
  preemptionDistance: 500,
  holdTimeAfterPassage: 8,
  predictiveModeling: true,
  useHistoricalData: true,
  accountForEvents: true,
  weatherAdaptive: false,
  predictionHorizon: 30,
  retrainingInterval: 7,
};

interface AIConfigurationProps {
  config?: AIConfig;
  onChange?: (config: AIConfig) => void;
}

export default function AIConfiguration({
  config: controlledConfig,
  onChange,
}: AIConfigurationProps) {
  const [localConfig, setLocalConfig] = useState<AIConfig>(defaultConfig);
  const config = controlledConfig ?? localConfig;

  const update = (partial: Partial<AIConfig>) => {
    const updated = { ...config, ...partial };
    setLocalConfig(updated);
    onChange?.(updated);
  };

  return (
    <div className="space-y-8">
      {/* Detection Confidence Threshold */}
      <div className="glass rounded-2xl p-6 shadow-card">
        <h3 className="mb-4 text-base font-semibold text-gray-100">
          AI Detection Settings
        </h3>

        <div className="space-y-6">
          {/* Confidence Threshold */}
          <div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-300">
                Detection Confidence Threshold
              </label>
              <span className="rounded-lg bg-brand-500/15 px-2.5 py-0.5 text-sm font-bold text-brand-400">
                {config.confidenceThreshold}%
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={config.confidenceThreshold}
              onChange={(e) =>
                update({ confidenceThreshold: Number(e.target.value) })
              }
              className="mt-2 w-full"
            />
            <div className="mt-1 flex justify-between text-xs text-gray-500">
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Update Frequency */}
          <div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-300">
                Update Frequency
              </label>
              <span className="rounded-lg bg-brand-500/15 px-2.5 py-0.5 text-sm font-bold text-brand-400">
                {config.updateFrequency}s
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={30}
              value={config.updateFrequency}
              onChange={(e) =>
                update({ updateFrequency: Number(e.target.value) })
              }
              className="mt-2 w-full"
            />
            <div className="mt-1 flex justify-between text-xs text-gray-500">
              <span>1s</span>
              <span>30s</span>
            </div>
          </div>

          {/* Optimization Aggressiveness */}
          <div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-300">
                Optimization Aggressiveness
              </label>
              <span className="rounded-lg bg-brand-500/15 px-2.5 py-0.5 text-sm font-bold text-brand-400">
                {config.optimizationAggressiveness}%
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={config.optimizationAggressiveness}
              onChange={(e) =>
                update({ optimizationAggressiveness: Number(e.target.value) })
              }
              className="mt-2 w-full"
            />
            <div className="mt-1 flex justify-between text-xs text-gray-500">
              <span>Conservative</span>
              <span>Aggressive</span>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Vehicle Detection */}
      <div className="glass rounded-2xl p-6 shadow-card">
        <h3 className="mb-4 text-base font-semibold text-gray-100">
          Emergency Vehicle Detection
        </h3>

        <div className="space-y-3">
          {[
            {
              key: "visualDetection" as const,
              label: "Visual Detection (Camera-based)",
            },
            {
              key: "audioDetection" as const,
              label: "Audio Detection (Siren recognition)",
            },
            {
              key: "gpsIntegration" as const,
              label: "GPS Integration",
            },
            {
              key: "radioTransponder" as const,
              label: "Radio Transponder",
            },
          ].map((item) => (
            <label
              key={item.key}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-white/[0.03] transition-colors cursor-pointer"
            >
              <input
                type="checkbox"
                checked={config[item.key]}
                onChange={(e) => update({ [item.key]: e.target.checked })}
              />
              <span className="text-sm font-medium text-gray-300">
                {item.label}
              </span>
            </label>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-gray-300">
              Preemption Trigger Distance
            </label>
            <div className="mt-1 flex items-center gap-2">
              <input
                type="number"
                value={config.preemptionDistance}
                onChange={(e) =>
                  update({ preemptionDistance: Number(e.target.value) })
                }
                className="input-glass w-full"
              />
              <span className="flex-shrink-0 text-sm text-gray-500">
                meters
              </span>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-300">
              Hold Time After Passage
            </label>
            <div className="mt-1 flex items-center gap-2">
              <input
                type="number"
                value={config.holdTimeAfterPassage}
                onChange={(e) =>
                  update({ holdTimeAfterPassage: Number(e.target.value) })
                }
                className="input-glass w-full"
              />
              <span className="flex-shrink-0 text-sm text-gray-500">
                seconds
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Traffic Prediction */}
      <div className="glass rounded-2xl p-6 shadow-card">
        <h3 className="mb-4 text-base font-semibold text-gray-100">
          Traffic Prediction
        </h3>

        <div className="space-y-3">
          {[
            {
              key: "predictiveModeling" as const,
              label: "Predictive Modeling",
            },
            {
              key: "useHistoricalData" as const,
              label: "Historical Data Analysis",
            },
            {
              key: "accountForEvents" as const,
              label: "Special Events Consideration",
            },
            {
              key: "weatherAdaptive" as const,
              label: "Weather-Adaptive Signals",
            },
          ].map((item) => (
            <label
              key={item.key}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-white/[0.03] transition-colors cursor-pointer"
            >
              <input
                type="checkbox"
                checked={config[item.key]}
                onChange={(e) => update({ [item.key]: e.target.checked })}
              />
              <span className="text-sm font-medium text-gray-300">
                {item.label}
              </span>
            </label>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-gray-300">
              Prediction Horizon
            </label>
            <div className="mt-1 flex items-center gap-2">
              <input
                type="number"
                value={config.predictionHorizon}
                onChange={(e) =>
                  update({ predictionHorizon: Number(e.target.value) })
                }
                className="input-glass w-full"
              />
              <span className="flex-shrink-0 text-sm text-gray-500">
                minutes
              </span>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-300">
              Model Retraining Interval
            </label>
            <div className="mt-1 flex items-center gap-2">
              <input
                type="number"
                value={config.retrainingInterval}
                onChange={(e) =>
                  update({ retrainingInterval: Number(e.target.value) })
                }
                className="input-glass w-full"
              />
              <span className="flex-shrink-0 text-sm text-gray-500">days</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
