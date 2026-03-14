"use client";

import React, { useState } from "react";
import type { Incident, IncidentType, IncidentSeverity } from "@/types";
import { X } from "lucide-react";

interface FormData {
  type: IncidentType;
  title: string;
  description: string;
  location: string;
  severity: IncidentSeverity;
  reportedBy: string;
  affectedLanes: string;
  estimatedClearTime: string;
  tags: string;
}

const DEFAULT_FORM: FormData = {
  type: "accident",
  title: "",
  description: "",
  location: "",
  severity: "medium",
  reportedBy: "",
  affectedLanes: "0",
  estimatedClearTime: "",
  tags: "",
};

const incidentTypes: { value: IncidentType; label: string }[] = [
  { value: "accident",       label: "Accident / Collision" },
  { value: "roadwork",       label: "Road Works" },
  { value: "flooding",       label: "Flooding" },
  { value: "signal_failure", label: "Signal Failure" },
  { value: "debris",         label: "Debris in Roadway" },
  { value: "crowd",          label: "Crowd / Event" },
  { value: "other",          label: "Other" },
];

const severityOptions: { value: IncidentSeverity; label: string; color: string }[] = [
  { value: "low",      label: "Low",      color: "text-blue-400" },
  { value: "medium",   label: "Medium",   color: "text-yellow-400" },
  { value: "high",     label: "High",     color: "text-orange-400" },
  { value: "critical", label: "Critical", color: "text-red-400" },
];

interface Props {
  onSubmit: (data: Omit<Incident, "id" | "timestamp">) => void;
  onClose: () => void;
}

export default function IncidentReportForm({ onSubmit, onClose }: Props) {
  const [form, setForm] = useState<FormData>(DEFAULT_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const set = <K extends keyof FormData>(k: K, v: FormData[K]) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  const validate = (): boolean => {
    const errs: Partial<Record<keyof FormData, string>> = {};
    if (!form.title.trim())       errs.title       = "Title is required.";
    if (!form.location.trim())    errs.location    = "Location is required.";
    if (!form.description.trim()) errs.description = "Description is required.";
    if (!form.reportedBy.trim())  errs.reportedBy  = "Reporter name is required.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const tags = form.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    onSubmit({
      type: form.type,
      title: form.title.trim(),
      description: form.description.trim(),
      location: form.location.trim(),
      severity: form.severity,
      reportedBy: form.reportedBy.trim(),
      status: "open",
      affectedLanes: parseInt(form.affectedLanes, 10) || 0,
      estimatedClearTime: form.estimatedClearTime
        ? parseInt(form.estimatedClearTime, 10)
        : undefined,
      tags: tags.length > 0 ? tags : undefined,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="glass-strong w-full max-w-xl rounded-2xl shadow-glass overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-4">
          <h2 className="font-display text-lg font-semibold text-gray-100">
            Report New Incident
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-gray-500 hover:bg-white/[0.06] hover:text-gray-300 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Type & Severity */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">
                Incident Type <span className="text-red-400">*</span>
              </label>
              <select
                value={form.type}
                onChange={(e) => set("type", e.target.value as IncidentType)}
                className="w-full rounded-xl bg-white/[0.06] border border-white/[0.08] px-3 py-2 text-sm text-gray-200 focus:border-brand-400/50 focus:outline-none focus:ring-1 focus:ring-brand-400/30"
              >
                {incidentTypes.map((t) => (
                  <option key={t.value} value={t.value} className="bg-surface-100">
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">
                Severity <span className="text-red-400">*</span>
              </label>
              <select
                value={form.severity}
                onChange={(e) => set("severity", e.target.value as IncidentSeverity)}
                className="w-full rounded-xl bg-white/[0.06] border border-white/[0.08] px-3 py-2 text-sm text-gray-200 focus:border-brand-400/50 focus:outline-none focus:ring-1 focus:ring-brand-400/30"
              >
                {severityOptions.map((s) => (
                  <option key={s.value} value={s.value} className="bg-surface-100">
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">
              Title <span className="text-red-400">*</span>
            </label>
            <input
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="Brief incident title"
              className="w-full rounded-xl bg-white/[0.06] border border-white/[0.08] px-3 py-2 text-sm text-gray-200 placeholder:text-gray-600 focus:border-brand-400/50 focus:outline-none focus:ring-1 focus:ring-brand-400/30"
            />
            {errors.title && <p className="mt-1 text-xs text-red-400">{errors.title}</p>}
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">
              Location <span className="text-red-400">*</span>
            </label>
            <input
              value={form.location}
              onChange={(e) => set("location", e.target.value)}
              placeholder="e.g. 5th Ave & 34th St"
              className="w-full rounded-xl bg-white/[0.06] border border-white/[0.08] px-3 py-2 text-sm text-gray-200 placeholder:text-gray-600 focus:border-brand-400/50 focus:outline-none focus:ring-1 focus:ring-brand-400/30"
            />
            {errors.location && <p className="mt-1 text-xs text-red-400">{errors.location}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">
              Description <span className="text-red-400">*</span>
            </label>
            <textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              rows={3}
              placeholder="Describe the incident in detail..."
              className="w-full rounded-xl bg-white/[0.06] border border-white/[0.08] px-3 py-2 text-sm text-gray-200 placeholder:text-gray-600 focus:border-brand-400/50 focus:outline-none focus:ring-1 focus:ring-brand-400/30 resize-none"
            />
            {errors.description && (
              <p className="mt-1 text-xs text-red-400">{errors.description}</p>
            )}
          </div>

          {/* Reporter & Affected Lanes */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">
                Reported By <span className="text-red-400">*</span>
              </label>
              <input
                value={form.reportedBy}
                onChange={(e) => set("reportedBy", e.target.value)}
                placeholder="Your name / unit"
                className="w-full rounded-xl bg-white/[0.06] border border-white/[0.08] px-3 py-2 text-sm text-gray-200 placeholder:text-gray-600 focus:border-brand-400/50 focus:outline-none focus:ring-1 focus:ring-brand-400/30"
              />
              {errors.reportedBy && (
                <p className="mt-1 text-xs text-red-400">{errors.reportedBy}</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">
                Affected Lanes
              </label>
              <input
                type="number"
                min={0}
                max={6}
                value={form.affectedLanes}
                onChange={(e) => set("affectedLanes", e.target.value)}
                className="w-full rounded-xl bg-white/[0.06] border border-white/[0.08] px-3 py-2 text-sm text-gray-200 focus:border-brand-400/50 focus:outline-none focus:ring-1 focus:ring-brand-400/30"
              />
            </div>
          </div>

          {/* Estimated Clear Time & Tags */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">
                Est. Clear Time (mins)
              </label>
              <input
                type="number"
                min={0}
                value={form.estimatedClearTime}
                onChange={(e) => set("estimatedClearTime", e.target.value)}
                placeholder="e.g. 30"
                className="w-full rounded-xl bg-white/[0.06] border border-white/[0.08] px-3 py-2 text-sm text-gray-200 placeholder:text-gray-600 focus:border-brand-400/50 focus:outline-none focus:ring-1 focus:ring-brand-400/30"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">
                Tags (comma-separated)
              </label>
              <input
                value={form.tags}
                onChange={(e) => set("tags", e.target.value)}
                placeholder="e.g. blocking, ems"
                className="w-full rounded-xl bg-white/[0.06] border border-white/[0.08] px-3 py-2 text-sm text-gray-200 placeholder:text-gray-600 focus:border-brand-400/50 focus:outline-none focus:ring-1 focus:ring-brand-400/30"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-white/[0.08] px-4 py-2 text-sm font-medium text-gray-400 hover:bg-white/[0.04] hover:text-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600 transition-colors"
            >
              Submit Incident
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
