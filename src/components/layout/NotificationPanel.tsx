"use client";

import React, { useRef, useEffect } from "react";
import { Bell, CheckCheck, X, AlertTriangle, Info, Siren, AlertCircle } from "lucide-react";
import type { Notification } from "@/types";
import { cn } from "@/lib/utils";

interface NotificationPanelProps {
  notifications: Notification[];
  unreadCount: number;
  onClose: () => void;
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onDismiss: (id: string) => void;
}

const SEVERITY_ICON: Record<string, React.ReactNode> = {
  critical: <AlertCircle className="h-4 w-4 text-danger" />,
  warning: <AlertTriangle className="h-4 w-4 text-warning" />,
  info: <Info className="h-4 w-4 text-info" />,
  emergency: <Siren className="h-4 w-4 text-emergency" />,
};

const SEVERITY_DOT: Record<string, string> = {
  critical: "bg-danger",
  warning: "bg-warning",
  info: "bg-info",
  emergency: "bg-emergency",
};

function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export default function NotificationPanel({
  notifications,
  unreadCount,
  onClose,
  onMarkAsRead,
  onMarkAllAsRead,
  onDismiss,
}: NotificationPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={panelRef}
      className="absolute right-0 top-full mt-2 w-[400px] max-h-[560px] flex flex-col rounded-2xl glass-strong border border-white/[0.08] shadow-glass-lg overflow-hidden z-50 animate-scale-in"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-brand-400" />
          <span className="text-sm font-semibold text-gray-100">Notifications</span>
          {unreadCount > 0 && (
            <span className="inline-flex items-center justify-center rounded-full bg-danger/20 px-2 py-0.5 text-[11px] font-bold text-danger">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {unreadCount > 0 && (
            <button
              onClick={onMarkAllAsRead}
              className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-gray-400 hover:bg-white/[0.06] hover:text-gray-200 transition-all duration-200"
              title="Mark all as read"
            >
              <CheckCheck className="h-3.5 w-3.5" />
              Mark all read
            </button>
          )}
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-gray-500 hover:bg-white/[0.06] hover:text-gray-300 transition-all duration-200"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Notification list */}
      <div className="flex-1 overflow-y-auto divide-y divide-white/[0.04]">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Bell className="h-10 w-10 text-gray-600 mb-3" />
            <p className="text-sm font-medium text-gray-400">All caught up!</p>
            <p className="text-xs text-gray-600 mt-1">No new notifications</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              onClick={() => !notification.read && onMarkAsRead(notification.id)}
              className={cn(
                "relative flex items-start gap-3 px-4 py-3 transition-colors duration-150 cursor-pointer",
                !notification.read
                  ? "bg-brand-500/[0.05] hover:bg-brand-500/[0.08]"
                  : "hover:bg-white/[0.03]"
              )}
            >
              {/* Unread dot */}
              {!notification.read && (
                <span
                  className={cn(
                    "absolute left-1.5 top-4 h-1.5 w-1.5 rounded-full flex-shrink-0",
                    SEVERITY_DOT[notification.severity] ?? "bg-brand-400"
                  )}
                />
              )}

              {/* Icon */}
              <div className="mt-0.5 flex-shrink-0">
                {SEVERITY_ICON[notification.severity] ?? <Info className="h-4 w-4 text-gray-500" />}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className={cn("text-sm font-medium leading-snug", notification.read ? "text-gray-400" : "text-gray-100")}>
                  {notification.title}
                </p>
                <p className="mt-0.5 text-xs text-gray-500 line-clamp-2 leading-relaxed">
                  {notification.description}
                </p>
                <p className="mt-1 text-[11px] text-gray-600">
                  {timeAgo(new Date(notification.timestamp))}
                </p>
              </div>

              {/* Dismiss */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDismiss(notification.id);
                }}
                className="flex-shrink-0 rounded-lg p-1 text-gray-600 hover:bg-white/[0.08] hover:text-gray-300 transition-all duration-200 opacity-0 group-hover:opacity-100"
                title="Dismiss"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      {notifications.length > 0 && (
        <div className="border-t border-white/[0.06] px-4 py-2.5">
          <p className="text-center text-xs text-gray-600">
            {notifications.length} notification{notifications.length !== 1 ? "s" : ""}
            {unreadCount > 0 ? ` · ${unreadCount} unread` : " · all read"}
          </p>
        </div>
      )}
    </div>
  );
}
