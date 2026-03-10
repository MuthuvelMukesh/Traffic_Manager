import type { TrafficVolumePoint } from "@/types";

export const trafficVolume: TrafficVolumePoint[] = [
  { hour: "12 AM", volume: 2100, previousVolume: 2200 },
  { hour: "1 AM", volume: 1800, previousVolume: 1900 },
  { hour: "2 AM", volume: 1400, previousVolume: 1500 },
  { hour: "3 AM", volume: 1100, previousVolume: 1200 },
  { hour: "4 AM", volume: 1300, previousVolume: 1100 },
  { hour: "5 AM", volume: 2400, previousVolume: 2200 },
  { hour: "6 AM", volume: 5200, previousVolume: 4800 },
  { hour: "7 AM", volume: 9800, previousVolume: 9400 },
  { hour: "8 AM", volume: 14200, previousVolume: 13600 },
  { hour: "9 AM", volume: 12800, previousVolume: 12400 },
  { hour: "10 AM", volume: 10400, previousVolume: 10200 },
  { hour: "11 AM", volume: 9600, previousVolume: 9800 },
  { hour: "12 PM", volume: 10800, previousVolume: 10600 },
  { hour: "1 PM", volume: 10200, previousVolume: 10400 },
  { hour: "2 PM", volume: 9800, previousVolume: 9600 },
  { hour: "3 PM", volume: 10600, previousVolume: 10200 },
  { hour: "4 PM", volume: 11400, previousVolume: 11000 },
  { hour: "5 PM", volume: 11800, previousVolume: 11600 },
  { hour: "6 PM", volume: 12200, previousVolume: 11800 },
  { hour: "7 PM", volume: 9400, previousVolume: 9200 },
  { hour: "8 PM", volume: 7200, previousVolume: 7400 },
  { hour: "9 PM", volume: 5600, previousVolume: 5800 },
  { hour: "10 PM", volume: 4200, previousVolume: 4400 },
  { hour: "11 PM", volume: 3000, previousVolume: 3100 },
];

export { trafficVolume as mockTrafficVolume };
