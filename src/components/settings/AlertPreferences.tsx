"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface AlertSettings {
  criticalAlerts: boolean;
  warningAlerts: boolean;
  infoAlerts: boolean;
  emergencyAlerts: boolean;
  soundEnabled: boolean;
  soundVolume: number;
  emailEnabled: boolean;
  emailAddress: string;
  autoEscalation: boolean;
  escalationMinutes: number;
}

const defaultSettings: AlertSettings = {
  criticalAlerts: true,
  warningAlerts: true,
  infoAlerts: false,
  emergencyAlerts: true,
  soundEnabled: true,
  soundVolume: 75,
  emailEnabled: true,
  emailAddress: "ops@trafficcontrol.nyc.gov",
  autoEscalation: true,
  escalationMinutes: 5,
};

interface ToggleSwitchProps {
  enabled: boolean;
  onChange: (v: boolean) => void;
  label: string;
  description?: string;
  disabled?: boolean;
}

function ToggleSwitch({ enabled, onChange, label, description, disabled }: ToggleSwitchProps) {
  return (
    <label className={cn("inline-flex cursor-pointer items-start gap-3", disabled && "opacity-60 pointer-events-none")}>
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={() => onChange(!enabled)}
        className={cn(
          "relative inline-flex h-6 w-11 flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
          enabled ? "bg-brand-500" : "bg-white/[0.1]"
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow ring-0 transition-transform duration-200 ease-in-out",
            enabled ? "translate-x-5" : "translate-x-0"
          )}
        />
      </button>
      <span className="flex flex-col">
        <span className="text-sm font-medium text-gray-200">{label}</span>
        {description && (
          <span className="text-sm text-gray-500">{description}</span>
        )}
      </span>
    </label>
  );
}

export default function AlertPreferences() {
  const [settings, setSettings] = useState<AlertSettings>(defaultSettings);

  const update = (partial: Partial<AlertSettings>) => {
    setSettings((prev) => ({ ...prev, ...partial }));
  };

  return (
    <div className="space-y-6">
      {/* Alert Types */}
      <div className="glass rounded-2xl p-6 shadow-card">
        <h3 className="mb-4 text-base font-semibold text-gray-100">
          Alert Types
        </h3>
        <div className="space-y-4">
          <ToggleSwitch
            enabled={settings.criticalAlerts}
            onChange={(v) => update({ criticalAlerts: v })}
            label="Critical Alerts"
            description="System failures, camera offline, signal errors"
          />
          <ToggleSwitch
            enabled={settings.warningAlerts}
            onChange={(v) => update({ warningAlerts: v })}
            label="Warning Alerts"
            description="Heavy congestion, moderate issues"
          />
          <ToggleSwitch
            enabled={settings.infoAlerts}
            onChange={(v) => update({ infoAlerts: v })}
            label="Info Alerts"
            description="Routine updates, signal adjustments"
          />
          <ToggleSwitch
            enabled={true}
            onChange={() => {}}
            label="Emergency Alerts"
            description="Emergency vehicle events (always enabled)"
            disabled
          />
        </div>
      </div>

      {/* Sound Settings */}
      <div className="glass rounded-2xl p-6 shadow-card">
        <h3 className="mb-4 text-base font-semibold text-gray-100">
          Sound Settings
        </h3>
        <div className="space-y-4">
          <ToggleSwitch
            enabled={settings.soundEnabled}
            onChange={(v) => update({ soundEnabled: v })}
            label="Sound Alerts"
            description="Play audio notifications for incoming alerts"
          />
          {settings.soundEnabled && (
            <div className="ml-14">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-300">
                  Volume
                </label>
                <span className="text-sm font-bold text-brand-400">
                  {settings.soundVolume}%
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={settings.soundVolume}
                onChange={(e) =>
                  update({ soundVolume: Number(e.target.value) })
                }
                className="mt-2 w-full"
              />
            </div>
          )}
        </div>
      </div>

      {/* Email Notifications */}
      <div className="glass rounded-2xl p-6 shadow-card">
        <h3 className="mb-4 text-base font-semibold text-gray-100">
          Email Notifications
        </h3>
        <div className="space-y-4">
          <ToggleSwitch
            enabled={settings.emailEnabled}
            onChange={(v) => update({ emailEnabled: v })}
            label="Email Notifications"
            description="Send alert summaries to your email"
          />
          {settings.emailEnabled && (
            <div className="ml-14">
              <label className="text-sm font-medium text-gray-300">
                Email Address
              </label>
              <input
                type="email"
                value={settings.emailAddress}
                onChange={(e) => update({ emailAddress: e.target.value })}
                className="input-glass mt-1 w-full"
                placeholder="your@email.com"
              />
            </div>
          )}
        </div>
      </div>

      {/* Auto-Escalation */}
      <div className="glass rounded-2xl p-6 shadow-card">
        <h3 className="mb-4 text-base font-semibold text-gray-100">
          Auto-Escalation
        </h3>
        <div className="space-y-4">
          <ToggleSwitch
            enabled={settings.autoEscalation}
            onChange={(v) => update({ autoEscalation: v })}
            label="Auto-Escalation"
            description="Automatically escalate unacknowledged alerts"
          />
          {settings.autoEscalation && (
            <div className="ml-14">
              <label className="text-sm font-medium text-gray-300">
                Escalation Timeout
              </label>
              <div className="mt-1 flex items-center gap-2">
                <input
                  type="number"
                  value={settings.escalationMinutes}
                  onChange={(e) =>
                    update({ escalationMinutes: Number(e.target.value) })
                  }
                  min={1}
                  max={60}
                  className="input-glass w-24"
                />
                <span className="text-sm text-gray-500">minutes</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
