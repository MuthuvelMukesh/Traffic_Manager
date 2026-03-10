// ============================================================
// Core Domain Types for Traffic Management System
// ============================================================

export type TrafficStatus = "optimal" | "moderate" | "heavy" | "emergency";

export type SignalPhase = "green" | "yellow" | "red";

export type AlertSeverity = "critical" | "warning" | "info" | "emergency";

export type UserRole = "admin" | "operator" | "engineer" | "viewer";

export type EmergencyVehicleType = "ambulance" | "fire" | "police";

export type Direction = "north" | "south" | "east" | "west";

// ============================================================
// Intersection
// ============================================================

export interface SignalState {
  direction: "NS" | "EW";
  phase: SignalPhase;
  timeRemaining: number;
  totalTime: number;
}

export interface CameraFeed {
  id: string;
  direction: Direction;
  status: "online" | "offline";
  url?: string;
}

export interface Intersection {
  id: string;
  name: string;
  lat: number;
  lng: number;
  status: TrafficStatus;
  congestionLevel: number; // 0-100
  avgWaitTime: number; // seconds
  vehiclesPerHour: number;
  queueLength: Record<Direction, number>;
  signals: SignalState[];
  cameras: CameraFeed[];
  aiControlActive: boolean;
  zone: string;
  pedestriansWaiting: number;
}

// ============================================================
// Alerts & Notifications
// ============================================================

export interface Alert {
  id: string;
  severity: AlertSeverity;
  title: string;
  description: string;
  intersectionId?: string;
  timestamp: Date;
  acknowledged: boolean;
  actionLabel?: string;
  actionType?: "view" | "track" | "dismiss" | "acknowledge";
}

export interface Notification extends Alert {
  read: boolean;
}

// ============================================================
// Emergency Vehicles
// ============================================================

export interface EmergencyVehicle {
  id: string;
  type: EmergencyVehicleType;
  callSign: string;
  origin: string;
  destination: string;
  currentLocation: { lat: number; lng: number };
  routeProgress: number; // 0-100
  intersectionsCleared: number;
  intersectionsTotal: number;
  etaSeconds: number;
  timeSavedSeconds: number;
  active: boolean;
  startTime: Date;
  endTime?: Date;
}

// ============================================================
// Traffic Volume
// ============================================================

export interface TrafficVolumePoint {
  hour: string;
  volume: number;
  previousVolume?: number;
}

// ============================================================
// Analytics
// ============================================================

export interface AnalyticsMetric {
  label: string;
  value: number;
  unit: string;
  trend: number; // percentage change, positive = improvement
  trendDirection: "up" | "down";
}

export interface IntersectionRanking {
  id: string;
  name: string;
  avgWaitTime: number;
  trend: number;
}

export interface EnvironmentalMetrics {
  co2Reduced: number; // kg
  fuelSaved: number; // liters
  timeSaved: number; // hours
  co2Trend: number;
  fuelTrend: number;
  timeTrend: number;
}

// ============================================================
// Users
// ============================================================

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  lastActive: Date;
  avatar?: string;
}

// ============================================================
// Settings
// ============================================================

export interface AIConfig {
  confidenceThreshold: number; // 0-100
  updateFrequency: number; // seconds
  optimizationAggressiveness: number; // 0-100
  visualDetection: boolean;
  audioDetection: boolean;
  gpsIntegration: boolean;
  radioTransponder: boolean;
  preemptionDistance: number; // meters
  holdTimeAfterPassage: number; // seconds
  predictiveModeling: boolean;
  useHistoricalData: boolean;
  accountForEvents: boolean;
  weatherAdaptive: boolean;
  predictionHorizon: number; // minutes
  retrainingInterval: number; // days
}

// ============================================================
// Dashboard KPIs
// ============================================================

export interface KPI {
  id: string;
  label: string;
  value: number | string;
  unit?: string;
  trend: number;
  trendLabel: string;
  status: "good" | "warning" | "critical";
  icon: string;
}
