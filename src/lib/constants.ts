export const APP_NAME = "Traffic Control Center";

export const NAV_ITEMS = [
  { label: "Dashboard", href: "/", icon: "LayoutDashboard" },
  { label: "Live Map", href: "/map", icon: "Map" },
  { label: "Intersections", href: "/intersections", icon: "GitBranch" },
  { label: "Analytics", href: "/analytics", icon: "BarChart3" },
  { label: "Emergency", href: "/emergency", icon: "Siren" },
  { label: "Settings", href: "/settings", icon: "Settings" },
] as const;

export const STATUS_COLORS = {
  optimal: { bg: "bg-green-50", border: "border-green-400", text: "text-green-700", dot: "bg-signal-green" },
  moderate: { bg: "bg-yellow-50", border: "border-yellow-400", text: "text-yellow-700", dot: "bg-warning" },
  heavy: { bg: "bg-red-50", border: "border-red-400", text: "text-red-700", dot: "bg-danger" },
  emergency: { bg: "bg-orange-50", border: "border-orange-400", text: "text-orange-700", dot: "bg-emergency" },
} as const;

export const ALERT_SEVERITY_CONFIG = {
  critical: { icon: "AlertTriangle", color: "text-danger", bg: "bg-red-50", border: "border-l-danger" },
  warning: { icon: "AlertTriangle", color: "text-warning", bg: "bg-yellow-50", border: "border-l-warning" },
  info: { icon: "Info", color: "text-info", bg: "bg-cyan-50", border: "border-l-info" },
  emergency: { icon: "Siren", color: "text-emergency", bg: "bg-orange-50", border: "border-l-emergency" },
} as const;

export const MAP_CENTER: [number, number] = [40.758, -73.9855]; // NYC Times Square area
export const MAP_ZOOM = 14;

export const REFRESH_INTERVAL = 5000; // 5 seconds for simulated data
