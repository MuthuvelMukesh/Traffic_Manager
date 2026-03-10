"use client";

import React, { useState } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { AlertTriangle } from "lucide-react";

interface ManualOverrideModalProps {
  isOpen: boolean;
  onClose: () => void;
  intersectionName: string;
  onConfirm: (data: {
    reason: string;
    nsGreen: number;
    ewGreen: number;
    duration: string;
  }) => void;
}

const REASONS = [
  { value: "", label: "Select a reason..." },
  { value: "incident", label: "Incident" },
  { value: "construction", label: "Construction" },
  { value: "test", label: "Test" },
  { value: "emergency", label: "Emergency" },
];

const DURATIONS = [
  { value: "15min", label: "15 minutes" },
  { value: "1hour", label: "1 hour" },
  { value: "manual", label: "Until manually restored" },
];

export default function ManualOverrideModal({
  isOpen,
  onClose,
  intersectionName,
  onConfirm,
}: ManualOverrideModalProps) {
  const [reason, setReason] = useState("");
  const [nsGreen, setNsGreen] = useState(45);
  const [ewGreen, setEwGreen] = useState(40);
  const [duration, setDuration] = useState("15min");

  const handleConfirm = () => {
    if (!reason) return;
    onConfirm({ reason, nsGreen, ewGreen, duration });
    setReason("");
    setNsGreen(45);
    setEwGreen(40);
    setDuration("15min");
  };

  const isValid = reason !== "";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Manual Override"
      size="md"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirm} disabled={!isValid}>
            Confirm Override
          </Button>
        </>
      }
    >
      <div className="space-y-5">
        {/* Warning */}
        <div className="flex items-start gap-3 rounded-xl bg-amber-500/10 border border-amber-500/20 p-4">
          <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-amber-300">
              AI Control is currently active
            </p>
            <p className="text-sm text-amber-400/80 mt-0.5">
              Are you sure you want to override AI control for{" "}
              <span className="font-medium text-amber-300">{intersectionName}</span>? This will
              disable automated optimization.
            </p>
          </div>
        </div>

        {/* Reason */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            Reason <span className="text-red-400">*</span>
          </label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="input-glass block w-full text-sm"
          >
            {REASONS.map((r) => (
              <option key={r.value} value={r.value} disabled={r.value === ""}>
                {r.label}
              </option>
            ))}
          </select>
        </div>

        {/* Signal Timing */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Signal Timing
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1.5">
                N-S Green (seconds)
              </label>
              <input
                type="number"
                min={10}
                max={120}
                value={nsGreen}
                onChange={(e) => setNsGreen(Number(e.target.value))}
                className="input-glass block w-full text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1.5">
                E-W Green (seconds)
              </label>
              <input
                type="number"
                min={10}
                max={120}
                value={ewGreen}
                onChange={(e) => setEwGreen(Number(e.target.value))}
                className="input-glass block w-full text-sm"
              />
            </div>
          </div>
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2.5">
            Duration
          </label>
          <div className="space-y-2.5">
            {DURATIONS.map((d) => (
              <label
                key={d.value}
                className={`flex items-center gap-3 cursor-pointer rounded-xl px-3 py-2.5 transition-all duration-200 ${
                  duration === d.value
                    ? "bg-brand-500/10 border border-brand-500/30"
                    : "border border-transparent hover:bg-white/[0.03]"
                }`}
              >
                <div className="relative flex items-center justify-center">
                  <input
                    type="radio"
                    name="duration"
                    value={d.value}
                    checked={duration === d.value}
                    onChange={(e) => setDuration(e.target.value)}
                    className="sr-only"
                  />
                  <div className={`h-4 w-4 rounded-full border-2 transition-all ${
                    duration === d.value
                      ? "border-brand-400 bg-brand-400"
                      : "border-gray-600 bg-transparent"
                  }`}>
                    {duration === d.value && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-1.5 w-1.5 rounded-full bg-white" />
                      </div>
                    )}
                  </div>
                </div>
                <span className={`text-sm ${
                  duration === d.value ? "text-gray-200" : "text-gray-400"
                }`}>
                  {d.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
