"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export interface AuthUser {
  email: string;
  name: string;
  role: "admin" | "operator" | "engineer" | "viewer";
  initials: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const AUTH_KEY = "tm:auth-user";

// Hardcoded credential store (demo only — no real secrets)
const DEMO_USERS: Array<AuthUser & { password: string }> = [
  { email: "admin@trafficcontrol.nyc.gov", password: "admin123", name: "John Smith", role: "admin", initials: "JS" },
  { email: "operator@trafficcontrol.nyc.gov", password: "operator123", name: "Sarah Lee", role: "operator", initials: "SL" },
  { email: "engineer@trafficcontrol.nyc.gov", password: "engineer123", name: "Marcus Chen", role: "engineer", initials: "MC" },
  { email: "viewer@trafficcontrol.nyc.gov", password: "viewer123", name: "Diana Park", role: "viewer", initials: "DP" },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(AUTH_KEY);
      if (stored) {
        setUser(JSON.parse(stored) as AuthUser);
      }
    } catch {
      // ignore parse errors
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const match = DEMO_USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!match) {
      return { ok: false, error: "Invalid email or password." };
    }
    const { password: _, ...authUser } = match;
    setUser(authUser);
    localStorage.setItem(AUTH_KEY, JSON.stringify(authUser));
    return { ok: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(AUTH_KEY);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
