"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Bell,
  Search,
  User,
  LogOut,
  Settings,
  ChevronDown,
  X,
  Activity,
} from "lucide-react";
import { APP_NAME } from "@/lib/constants";

interface TopBarProps {
  notificationCount: number;
  onNotificationClick: () => void;
}

export default function TopBar({ notificationCount, onNotificationClick }: TopBarProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [searchOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 h-[64px] z-50 glass-strong flex items-center justify-between px-5"
      style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      {/* Left: Logo & App Name */}
      <div className="flex items-center gap-3.5">
        <Link href="/" className="flex items-center gap-3 group">
          {/* Animated logo */}
          <div className="relative w-9 h-9">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-400 to-brand-600 rounded-xl opacity-80 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-0 bg-gradient-to-br from-brand-400 to-brand-600 rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity" />
            <div className="relative w-9 h-9 rounded-xl flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="5" r="2" fill="currentColor" />
                <circle cx="12" cy="12" r="2" fill="currentColor" />
                <circle cx="12" cy="19" r="2" fill="currentColor" />
                <rect x="8" y="1" width="8" height="22" rx="2" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
          <div className="hidden sm:block">
            <span className="font-display font-bold text-white text-[15px] tracking-wide">
              {APP_NAME}
            </span>
            <span className="block text-[10px] text-gray-400 font-medium tracking-wider uppercase">
              AI-Powered
            </span>
          </div>
        </Link>
      </div>

      {/* Right: Search, Notifications, User */}
      <div className="flex items-center gap-1.5">
        {/* Search */}
        <div className="relative">
          {searchOpen ? (
            <div className="flex items-center glass rounded-xl px-3.5 py-2 animate-scale-in">
              <Search className="w-4 h-4 text-gray-400 mr-2.5" />
              <input
                ref={searchRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search intersections, alerts..."
                className="bg-transparent text-sm text-gray-200 border-none outline-none w-56 placeholder-gray-500"
              />
              <button
                onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                className="ml-2 text-gray-500 hover:text-gray-300 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-gray-200 hover:bg-white/[0.04] rounded-xl transition-all duration-200"
            >
              <Search className="w-4 h-4" />
              <span className="text-xs hidden lg:inline">Search...</span>
              <kbd className="hidden lg:inline text-[10px] px-1.5 py-0.5 rounded bg-white/[0.06] text-gray-500 font-mono">/</kbd>
            </button>
          )}
        </div>

        {/* Live indicator */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-signal-green/10 border border-signal-green/20">
          <div className="relative flex items-center justify-center w-2 h-2">
            <div className="absolute w-2 h-2 rounded-full bg-signal-green animate-ping opacity-75" />
            <div className="w-2 h-2 rounded-full bg-signal-green" />
          </div>
          <span className="text-[11px] font-semibold text-signal-green tracking-wide">LIVE</span>
        </div>

        {/* Notifications */}
        <button
          onClick={onNotificationClick}
          className="relative p-2.5 text-gray-400 hover:text-gray-200 hover:bg-white/[0.04] rounded-xl transition-all duration-200"
        >
          <Bell className="w-[18px] h-[18px]" />
          {notificationCount > 0 && (
            <span className="absolute top-1.5 right-1.5 flex items-center justify-center min-w-[18px] h-[18px] px-1 bg-danger text-white text-[10px] font-bold rounded-full"
              style={{ boxShadow: '0 0 10px rgba(239, 68, 68, 0.4)' }}>
              {notificationCount > 9 ? "9+" : notificationCount}
            </span>
          )}
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-white/[0.08] mx-1" />

        {/* User Menu */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-2.5 p-1.5 hover:bg-white/[0.04] rounded-xl transition-all duration-200"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
              JS
            </div>
            <div className="hidden lg:block text-left">
              <span className="text-sm font-medium text-gray-200 block leading-tight">John Smith</span>
              <span className="text-[10px] text-gray-500">Administrator</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-gray-500 hidden lg:block" />
          </button>

          {userMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-52 glass-strong rounded-xl shadow-glass py-1 animate-scale-in overflow-hidden">
              <div className="px-4 py-3 border-b border-white/[0.06]">
                <p className="text-sm font-semibold text-gray-200">John Smith</p>
                <p className="text-xs text-gray-400 mt-0.5">john@traffic.nyc.gov</p>
              </div>
              <Link href="/settings" className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/[0.04] transition-colors" onClick={() => setUserMenuOpen(false)}>
                <Settings className="w-4 h-4 text-gray-400" />
                Settings
              </Link>
              <button className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/[0.04] w-full text-left transition-colors">
                <LogOut className="w-4 h-4 text-gray-400" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
