"use client";

import React, { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface Column<T> {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: unknown, row: T) => React.ReactNode;
}

interface DataTableProps<T extends Record<string, unknown>> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
}

type SortDirection = "asc" | "desc";

export default function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  onRowClick,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

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

  const sortedData = React.useMemo(() => {
    if (!sortKey) return data;

    return [...data].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;

      let comparison = 0;
      if (typeof aVal === "string" && typeof bVal === "string") {
        comparison = aVal.localeCompare(bVal);
      } else if (typeof aVal === "number" && typeof bVal === "number") {
        comparison = aVal - bVal;
      } else {
        comparison = String(aVal).localeCompare(String(bVal));
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [data, sortKey, sortDirection]);

  return (
    <div className="overflow-x-auto rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl">
      <table className="min-w-full divide-y divide-white/[0.06]">
        <thead>
          <tr className="bg-white/[0.02]">
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={cn(
                  "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400 border-b border-white/[0.06]",
                  column.sortable && "cursor-pointer select-none hover:text-gray-300"
                )}
                onClick={
                  column.sortable ? () => handleSort(column.key) : undefined
                }
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
              key={rowIndex}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              className={cn(
                rowIndex % 2 === 1 && "bg-white/[0.01]",
                "transition-colors duration-150 hover:bg-white/[0.03]",
                onRowClick && "cursor-pointer"
              )}
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className="whitespace-nowrap px-4 py-3 text-sm text-gray-300"
                >
                  {column.render
                    ? column.render(row[column.key], row)
                    : (row[column.key] as React.ReactNode)}
                </td>
              ))}
            </tr>
          ))}
          {sortedData.length === 0 && (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-8 text-center text-sm text-gray-500"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
