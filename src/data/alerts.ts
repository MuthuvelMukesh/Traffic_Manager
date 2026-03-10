import type { Alert } from "@/types";

const now = new Date();

function hoursAgo(hours: number): Date {
  return new Date(now.getTime() - hours * 60 * 60 * 1000);
}

function minutesAgo(minutes: number): Date {
  return new Date(now.getTime() - minutes * 60 * 1000);
}

export const mockAlerts: Alert[] = [
  // === CRITICAL ===
  {
    id: "ALT-001",
    severity: "critical",
    title: "Camera Offline - INT-008",
    description:
      "West-facing camera at Canal St & Broadway has been offline for 45 minutes. Visual monitoring of westbound traffic is unavailable.",
    intersectionId: "INT-008",
    timestamp: minutesAgo(45),
    acknowledged: false,
    actionLabel: "Dispatch Maintenance",
    actionType: "acknowledge",
  },
  {
    id: "ALT-002",
    severity: "critical",
    title: "Signal Controller Error",
    description:
      "Signal controller at 7th Ave & 42nd St is reporting intermittent communication failures. Fallback timing pattern is active.",
    intersectionId: "INT-014",
    timestamp: minutesAgo(22),
    acknowledged: false,
    actionLabel: "View Details",
    actionType: "view",
  },
  {
    id: "ALT-003",
    severity: "critical",
    title: "Camera Offline - INT-049",
    description:
      "South-facing camera at 11th Ave & 42nd St went offline. Possible hardware failure detected. Technician has been notified.",
    intersectionId: "INT-049",
    timestamp: minutesAgo(15),
    acknowledged: true,
    actionLabel: "Track Repair",
    actionType: "track",
  },
  {
    id: "ALT-004",
    severity: "critical",
    title: "Sensor Array Malfunction",
    description:
      "Inductive loop sensors at Church St & Vesey St are returning inconsistent vehicle counts. AI model confidence dropped below threshold.",
    intersectionId: "INT-003",
    timestamp: hoursAgo(1.5),
    acknowledged: false,
    actionLabel: "Acknowledge",
    actionType: "acknowledge",
  },

  // === EMERGENCY ===
  {
    id: "ALT-005",
    severity: "emergency",
    title: "Emergency Vehicle Preemption Active",
    description:
      "Ambulance A-241 en route to Bellevue Hospital. Signal preemption active on 7th Ave corridor from 34th St to 42nd St. 4 intersections cleared.",
    intersectionId: "INT-014",
    timestamp: minutesAgo(3),
    acknowledged: true,
    actionLabel: "Track Vehicle",
    actionType: "track",
  },
  {
    id: "ALT-006",
    severity: "emergency",
    title: "Fire Truck Route Clearance",
    description:
      "Fire truck F-103 responding to incident on West 50th St. Preemption corridor established on 10th Ave from 42nd St to 57th St.",
    intersectionId: "INT-049",
    timestamp: minutesAgo(8),
    acknowledged: true,
    actionLabel: "Track Vehicle",
    actionType: "track",
  },

  // === WARNING ===
  {
    id: "ALT-007",
    severity: "warning",
    title: "Heavy Congestion Detected",
    description:
      "Congestion level at 7th Ave & 42nd St has exceeded 85% for the past 20 minutes. Average wait time is 82 seconds, well above the 45-second target.",
    intersectionId: "INT-014",
    timestamp: minutesAgo(20),
    acknowledged: false,
    actionLabel: "View Intersection",
    actionType: "view",
  },
  {
    id: "ALT-008",
    severity: "warning",
    title: "Heavy Congestion - Canal & Broadway",
    description:
      "Canal St & Broadway experiencing prolonged heavy traffic. Queue lengths exceeding 14 vehicles in all directions. Consider rerouting advisory.",
    intersectionId: "INT-008",
    timestamp: minutesAgo(35),
    acknowledged: true,
    actionLabel: "View Intersection",
    actionType: "view",
  },
  {
    id: "ALT-009",
    severity: "warning",
    title: "AI Confidence Below Threshold",
    description:
      "AI optimization model confidence at 5th Ave & 50th St dropped to 68% due to unusual pedestrian volume. Manual review recommended.",
    intersectionId: "INT-025",
    timestamp: hoursAgo(1),
    acknowledged: false,
    actionLabel: "Review",
    actionType: "view",
  },
  {
    id: "ALT-010",
    severity: "warning",
    title: "Communication Latency Spike",
    description:
      "Network latency to East Side controller cluster has increased to 450ms (threshold: 200ms). Affecting intersections INT-043 through INT-047.",
    intersectionId: "INT-043",
    timestamp: minutesAgo(52),
    acknowledged: false,
    actionLabel: "Acknowledge",
    actionType: "acknowledge",
  },
  {
    id: "ALT-011",
    severity: "warning",
    title: "Pedestrian Queue Overflow",
    description:
      "Broadway & 42nd St reporting 28 pedestrians waiting, exceeding the safe capacity threshold. Signal timing adjustment recommended.",
    intersectionId: "INT-015",
    timestamp: minutesAgo(18),
    acknowledged: true,
    actionLabel: "View Intersection",
    actionType: "view",
  },

  // === INFO ===
  {
    id: "ALT-012",
    severity: "info",
    title: "Signal Timing Optimized",
    description:
      "AI engine has adjusted signal timing at 6th Ave & 53rd St. NS green phase extended by 8 seconds to improve throughput during current traffic pattern.",
    intersectionId: "INT-026",
    timestamp: minutesAgo(10),
    acknowledged: true,
    actionLabel: "View Details",
    actionType: "view",
  },
  {
    id: "ALT-013",
    severity: "info",
    title: "Scheduled Maintenance Complete",
    description:
      "Camera firmware update at Park Ave & 42nd St completed successfully. All 4 cameras operational and streaming at full resolution.",
    intersectionId: "INT-018",
    timestamp: hoursAgo(2),
    acknowledged: true,
    actionLabel: "Dismiss",
    actionType: "dismiss",
  },
  {
    id: "ALT-014",
    severity: "info",
    title: "Zone Performance Report",
    description:
      "Midtown zone average wait time improved by 12% over the past hour. AI optimization contributed to clearing 3 previously congested intersections.",
    timestamp: hoursAgo(1),
    acknowledged: true,
    actionLabel: "View Report",
    actionType: "view",
  },
  {
    id: "ALT-015",
    severity: "info",
    title: "AI Model Retrained",
    description:
      "Predictive traffic model has been retrained with the latest 7-day data window. Prediction accuracy improved from 91.2% to 93.8%.",
    timestamp: hoursAgo(3),
    acknowledged: true,
    actionLabel: "Dismiss",
    actionType: "dismiss",
  },
  {
    id: "ALT-016",
    severity: "info",
    title: "New Traffic Pattern Detected",
    description:
      "Unusual increase in eastbound traffic on 34th St corridor detected starting at 2:15 PM. Likely caused by event at Madison Square Garden.",
    intersectionId: "INT-011",
    timestamp: hoursAgo(1.5),
    acknowledged: false,
    actionLabel: "View Details",
    actionType: "view",
  },
  {
    id: "ALT-017",
    severity: "info",
    title: "Backup Power Test Successful",
    description:
      "Routine backup power system test for Downtown zone completed. All 10 intersections switched to backup and back within 2.3 seconds.",
    timestamp: hoursAgo(4),
    acknowledged: true,
    actionLabel: "Dismiss",
    actionType: "dismiss",
  },
  {
    id: "ALT-018",
    severity: "warning",
    title: "Camera Feed Degraded",
    description:
      "East-facing camera at Church St & Vesey St reporting reduced image quality. Night vision IR module may require calibration.",
    intersectionId: "INT-003",
    timestamp: hoursAgo(2.5),
    acknowledged: false,
    actionLabel: "Schedule Maintenance",
    actionType: "acknowledge",
  },
];
