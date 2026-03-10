"use client";

import React, { useState, useMemo, useCallback } from "react";
import { users } from "@/data/users";
import { UserPlus, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/types";

const roleBadgeClass: Record<UserRole, string> = {
  admin: "bg-brand-500/15 text-brand-400 ring-brand-500/20",
  operator: "bg-signal-green/15 text-signal-green ring-signal-green/20",
  engineer: "bg-neon-purple/15 text-neon-purple ring-neon-purple/20",
  viewer: "bg-white/[0.06] text-gray-400 ring-white/[0.08]",
};

function formatLastActive(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - new Date(date).getTime();
  const diffMinutes = Math.floor(diffMs / 60000);

  if (diffMinutes < 1) return "Just now";
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}

type SortDirection = "asc" | "desc";

export default function UserManagement() {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const tableData = useMemo(
    () =>
      users.map((u) => ({
        id: u.id,
        name: u.name,
        role: u.role,
        email: u.email,
        lastActive: new Date(u.lastActive).getTime(),
        lastActiveDisplay: formatLastActive(u.lastActive),
      })),
    []
  );

  const handleSort = useCallback(
    (key: string) => {
      if (sortKey === key) {
        setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
      } else {
        setSortKey(key);
        setSortDirection("asc");
      }
    },
    [sortKey]
  );

  const sortedData = useMemo(() => {
    if (!sortKey) return tableData;
    return [...tableData].sort((a, b) => {
      const aVal = a[sortKey as keyof typeof a];
      const bVal = b[sortKey as keyof typeof b];
      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;
      let comparison = 0;
      if (typeof aVal === "number" && typeof bVal === "number") {
        comparison = aVal - bVal;
      } else {
        comparison = String(aVal).localeCompare(String(bVal));
      }
      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [tableData, sortKey, sortDirection]);

  const columns = [
    { key: "name", label: "Name", sortable: true },
    { key: "role", label: "Role", sortable: true },
    { key: "email", label: "Email", sortable: false },
    { key: "lastActive", label: "Last Active", sortable: true },
    { key: "actions", label: "Actions", sortable: false },
  ];

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-gray-100">
          User Management
        </h3>
        <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 px-4 py-2 text-sm font-medium text-white shadow-neon-blue hover:from-brand-400 hover:to-brand-500 transition-all duration-200">
          <UserPlus className="h-4 w-4" />
          Add User
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-white/[0.06]">
        <table className="min-w-full divide-y divide-white/[0.06]">
          <thead className="bg-white/[0.03]">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className={cn(
                    "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500",
                    column.sortable && "cursor-pointer select-none hover:text-gray-300 transition-colors"
                  )}
                  onClick={column.sortable ? () => handleSort(column.key) : undefined}
                >
                  <div className="inline-flex items-center gap-1.5">
                    {column.label}
                    {column.sortable && (
                      <span className="flex flex-col">
                        <svg
                          className={cn(
                            "h-3 w-3 -mb-0.5",
                            sortKey === column.key && sortDirection === "asc"
                              ? "text-brand-400"
                              : "text-gray-600"
                          )}
                          viewBox="0 0 12 12"
                          fill="currentColor"
                        >
                          <path d="M6 2l4 4H2z" />
                        </svg>
                        <svg
                          className={cn(
                            "h-3 w-3 -mt-0.5",
                            sortKey === column.key && sortDirection === "desc"
                              ? "text-brand-400"
                              : "text-gray-600"
                          )}
                          viewBox="0 0 12 12"
                          fill="currentColor"
                        >
                          <path d="M6 10l4-4H2z" />
                        </svg>
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {sortedData.map((row, rowIndex) => (
              <tr
                key={row.id}
                className={cn(
                  "transition-colors duration-100 hover:bg-white/[0.03]",
                  rowIndex % 2 === 1 && "bg-white/[0.01]"
                )}
              >
                {/* Name */}
                <td className="whitespace-nowrap px-4 py-3 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-500/15 text-xs font-semibold text-brand-400">
                      {row.name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </div>
                    <span className="font-medium text-gray-200">{row.name}</span>
                  </div>
                </td>
                {/* Role */}
                <td className="whitespace-nowrap px-4 py-3 text-sm">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${roleBadgeClass[row.role as UserRole]}`}
                  >
                    {(row.role as string).charAt(0).toUpperCase() + (row.role as string).slice(1)}
                  </span>
                </td>
                {/* Email */}
                <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-400">
                  {row.email}
                </td>
                {/* Last Active */}
                <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500">
                  {row.lastActiveDisplay}
                </td>
                {/* Actions */}
                <td className="whitespace-nowrap px-4 py-3 text-sm">
                  <button className="rounded-lg p-1.5 text-gray-500 hover:bg-white/[0.06] hover:text-gray-300 transition-colors">
                    <Pencil className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
            {sortedData.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-8 text-center text-sm text-gray-500"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
