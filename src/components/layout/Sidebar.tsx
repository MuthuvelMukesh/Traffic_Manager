"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Map,
  GitBranch,
  BarChart3,
  Siren,
  Settings,
  ChevronLeft,
  ChevronRight,
  Wifi,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Live Map", href: "/map", icon: Map },
  { label: "Intersections", href: "/intersections", icon: GitBranch },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
  { label: "Emergency", href: "/emergency", icon: Siren },
  { label: "Settings", href: "/settings", icon: Settings },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed left-0 top-[64px] h-[calc(100vh-64px)] z-40 transition-all duration-300 flex flex-col
        glass-strong ${collapsed ? "w-[72px]" : "w-[260px]"}`}
      style={{ borderRight: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* Nav items */}
      <nav className="flex-1 py-4 space-y-1 px-3 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-brand-500/10 text-brand-400"
                  : "text-gray-400 hover:bg-white/[0.04] hover:text-gray-200"
              } ${collapsed ? "justify-center px-0" : ""}`}
              title={collapsed ? item.label : undefined}
            >
              {/* Active indicator bar */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-r-full bg-brand-400" />
              )}

              <div className={`flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-brand-500/15 text-brand-400 shadow-neon-blue/20"
                  : "text-gray-400 group-hover:bg-white/[0.06] group-hover:text-gray-300"
              }`}>
                <Icon className="w-[18px] h-[18px]" />
              </div>

              {!collapsed && (
                <span className="tracking-wide">{item.label}</span>
              )}

              {/* Tooltip for collapsed state */}
              {collapsed && (
                <div className="absolute left-full ml-3 px-3 py-1.5 bg-surface-100 border border-white/10 rounded-lg text-xs text-gray-200 whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 shadow-glass-sm z-50">
                  {item.label}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* System status footer */}
      <div className={`border-t border-white/[0.06] p-4 ${collapsed ? "text-center px-2" : ""}`}>
        <div className={`flex items-center gap-2.5 ${collapsed ? "justify-center" : ""}`}>
          <div className="relative">
            <Wifi className="w-4 h-4 text-signal-green" />
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-signal-green animate-pulse" style={{ boxShadow: '0 0 6px rgba(34, 197, 94, 0.6)' }} />
          </div>
          {!collapsed && (
            <div>
              <span className="text-xs font-medium text-gray-300">System Online</span>
              <span className="text-[10px] text-gray-500 block">All systems operational</span>
            </div>
          )}
        </div>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-8 w-6 h-6 bg-surface-200 border border-white/10 rounded-full flex items-center justify-center hover:bg-surface-400 transition-all duration-200 shadow-glass-sm group"
      >
        {collapsed ? (
          <ChevronRight className="w-3 h-3 text-gray-400 group-hover:text-gray-200" />
        ) : (
          <ChevronLeft className="w-3 h-3 text-gray-400 group-hover:text-gray-200" />
        )}
      </button>
    </aside>
  );
}
