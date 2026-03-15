"use client";

import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Eye, EyeOff, Lock, Mail, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setError("");
    setIsLoading(true);
    const result = await login(email, password);
    setIsLoading(false);
    if (!result.ok) {
      setError(result.error ?? "Login failed. Please try again.");
    }
  };

  const DEMO_CREDS = [
    { label: "Admin", email: "admin@trafficcontrol.nyc.gov", password: "admin123" },
    { label: "Operator", email: "operator@trafficcontrol.nyc.gov", password: "operator123" },
  ];

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4">
      {/* Background mesh */}
      <div className="fixed inset-0 bg-mesh-gradient pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Logo + title */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="relative mb-4">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-400 to-brand-600 rounded-2xl blur-xl opacity-30" />
            <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center shadow-neon-blue">
              <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-white" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="5" r="2" fill="currentColor" />
                <circle cx="12" cy="12" r="2" fill="currentColor" />
                <circle cx="12" cy="19" r="2" fill="currentColor" />
                <rect x="8" y="1" width="8" height="22" rx="2" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
          <h1 className="font-display text-2xl font-bold text-white">Traffic Control Center</h1>
          <p className="mt-1 text-sm text-gray-500">AI-Powered Intelligent Traffic Management</p>
        </div>

        {/* Login card */}
        <div className="glass-strong rounded-2xl p-8 shadow-glass-lg">
          <h2 className="mb-6 text-lg font-semibold text-gray-100">Sign in to your account</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@trafficcontrol.nyc.gov"
                  className="input-glass w-full pl-9"
                  autoComplete="username"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-glass w-full pl-9 pr-10"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 rounded-xl bg-danger/10 border border-danger/20 px-3 py-2.5">
                <AlertCircle className="h-4 w-4 text-danger flex-shrink-0" />
                <p className="text-sm text-danger">{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading || !email || !password}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-neon-blue hover:from-brand-400 hover:to-brand-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Demo credentials */}
          <div className="mt-6 pt-5 border-t border-white/[0.06]">
            <p className="text-xs text-gray-500 mb-3 text-center font-medium uppercase tracking-wider">
              Demo Credentials
            </p>
            <div className="grid grid-cols-2 gap-2">
              {DEMO_CREDS.map((cred) => (
                <button
                  key={cred.label}
                  type="button"
                  onClick={() => { setEmail(cred.email); setPassword(cred.password); setError(""); }}
                  className="flex flex-col items-start rounded-xl bg-white/[0.03] border border-white/[0.06] px-3 py-2.5 hover:bg-white/[0.06] transition-all duration-200 text-left"
                >
                  <span className="text-xs font-semibold text-gray-200">{cred.label}</span>
                  <span className="text-[10px] text-gray-500 font-mono truncate w-full">{cred.email.split("@")[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-gray-600">
          NYC Department of Transportation © 2026
        </p>
      </div>
    </div>
  );
}
