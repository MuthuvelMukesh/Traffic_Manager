import type { User } from "@/types";

const now = new Date();

function minutesAgo(minutes: number): Date {
  return new Date(now.getTime() - minutes * 60 * 1000);
}

function hoursAgo(hours: number): Date {
  return new Date(now.getTime() - hours * 60 * 60 * 1000);
}

export const users: User[] = [
  // === ADMINS (2) ===
  {
    id: "USR-001",
    name: "Sarah Chen",
    email: "s.chen@trafficcontrol.nyc.gov",
    role: "admin",
    lastActive: minutesAgo(5),
    avatar: undefined,
  },
  {
    id: "USR-002",
    name: "Marcus Williams",
    email: "m.williams@trafficcontrol.nyc.gov",
    role: "admin",
    lastActive: minutesAgo(32),
    avatar: undefined,
  },

  // === OPERATORS (5) ===
  {
    id: "USR-003",
    name: "James Rodriguez",
    email: "j.rodriguez@trafficcontrol.nyc.gov",
    role: "operator",
    lastActive: minutesAgo(2),
    avatar: undefined,
  },
  {
    id: "USR-004",
    name: "Emily Park",
    email: "e.park@trafficcontrol.nyc.gov",
    role: "operator",
    lastActive: minutesAgo(15),
    avatar: undefined,
  },
  {
    id: "USR-005",
    name: "David Thompson",
    email: "d.thompson@trafficcontrol.nyc.gov",
    role: "operator",
    lastActive: hoursAgo(1),
    avatar: undefined,
  },
  {
    id: "USR-006",
    name: "Lisa Nakamura",
    email: "l.nakamura@trafficcontrol.nyc.gov",
    role: "operator",
    lastActive: minutesAgo(48),
    avatar: undefined,
  },
  {
    id: "USR-007",
    name: "Robert Martinez",
    email: "r.martinez@trafficcontrol.nyc.gov",
    role: "operator",
    lastActive: hoursAgo(3),
    avatar: undefined,
  },

  // === ENGINEERS (3) ===
  {
    id: "USR-008",
    name: "Priya Sharma",
    email: "p.sharma@trafficcontrol.nyc.gov",
    role: "engineer",
    lastActive: minutesAgo(10),
    avatar: undefined,
  },
  {
    id: "USR-009",
    name: "Alex Kowalski",
    email: "a.kowalski@trafficcontrol.nyc.gov",
    role: "engineer",
    lastActive: hoursAgo(2),
    avatar: undefined,
  },
  {
    id: "USR-010",
    name: "Michelle Okafor",
    email: "m.okafor@trafficcontrol.nyc.gov",
    role: "engineer",
    lastActive: hoursAgo(5),
    avatar: undefined,
  },

  // === VIEWERS (2) ===
  {
    id: "USR-011",
    name: "Daniel Kim",
    email: "d.kim@trafficcontrol.nyc.gov",
    role: "viewer",
    lastActive: hoursAgo(1.5),
    avatar: undefined,
  },
  {
    id: "USR-012",
    name: "Rachel Foster",
    email: "r.foster@trafficcontrol.nyc.gov",
    role: "viewer",
    lastActive: hoursAgo(8),
    avatar: undefined,
  },
];
