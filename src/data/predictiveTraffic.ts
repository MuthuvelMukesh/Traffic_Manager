import type { PredictiveDataPoint, ZoneTrafficData } from "@/types";

// Current hour index (0-23). Data at index >= CURRENT_HOUR is "predicted".
export const CURRENT_HOUR_INDEX = 14; // 14:00

/**
 * 24-hour dataset mixing confirmed actuals (00:00–14:00) with
 * AI-generated predictions for the remaining hours (15:00–23:00).
 */
export const predictiveTraffic: PredictiveDataPoint[] = [
  { hour: "00:00", actual: 1820, predicted: 1835, upperBound: 1980, lowerBound: 1650, confidence: 94 },
  { hour: "01:00", actual: 1240, predicted: 1260, upperBound: 1390, lowerBound: 1110, confidence: 95 },
  { hour: "02:00", actual: 870,  predicted: 890,  upperBound: 1010, lowerBound: 750,  confidence: 96 },
  { hour: "03:00", actual: 640,  predicted: 650,  upperBound: 750,  lowerBound: 560,  confidence: 97 },
  { hour: "04:00", actual: 910,  predicted: 920,  upperBound: 1040, lowerBound: 790,  confidence: 96 },
  { hour: "05:00", actual: 2100, predicted: 2080, upperBound: 2290, lowerBound: 1880, confidence: 93 },
  { hour: "06:00", actual: 5640, predicted: 5580, upperBound: 5940, lowerBound: 5180, confidence: 91 },
  { hour: "07:00", actual: 9820, predicted: 9760, upperBound: 10340, lowerBound: 9120, confidence: 88 },
  { hour: "08:00", actual: 13400, predicted: 13250, upperBound: 13950, lowerBound: 12500, confidence: 85 },
  { hour: "09:00", actual: 11800, predicted: 11650, upperBound: 12280, lowerBound: 10970, confidence: 87 },
  { hour: "10:00", actual: 9200,  predicted: 9100,  upperBound: 9680, lowerBound: 8540, confidence: 90 },
  { hour: "11:00", actual: 8700,  predicted: 8620,  upperBound: 9150, lowerBound: 8040, confidence: 91 },
  { hour: "12:00", actual: 10300, predicted: 10180, upperBound: 10780, lowerBound: 9560, confidence: 89 },
  { hour: "13:00", actual: 10900, predicted: 10820, upperBound: 11420, lowerBound: 10160, confidence: 89 },
  { hour: "14:00", actual: 11400, predicted: 11350, upperBound: 11990, lowerBound: 10650, confidence: 88 },
  // ── Predicted-only from here ──────────────────────────────────────
  { hour: "15:00", predicted: 12800, upperBound: 13600, lowerBound: 11880, confidence: 83 },
  { hour: "16:00", predicted: 14200, upperBound: 15100, lowerBound: 13150, confidence: 79 },
  { hour: "17:00", predicted: 15800, upperBound: 16850, lowerBound: 14620, confidence: 76 },
  { hour: "18:00", predicted: 14900, upperBound: 15920, lowerBound: 13750, confidence: 78 },
  { hour: "19:00", predicted: 12100, upperBound: 13020, lowerBound: 11100, confidence: 82 },
  { hour: "20:00", predicted: 9800,  upperBound: 10640, lowerBound: 8880, confidence: 85 },
  { hour: "21:00", predicted: 7600,  upperBound: 8320,  lowerBound: 6840, confidence: 88 },
  { hour: "22:00", predicted: 5400,  upperBound: 5980,  lowerBound: 4780, confidence: 90 },
  { hour: "23:00", predicted: 3200,  upperBound: 3620,  lowerBound: 2760, confidence: 92 },
];

export const zoneTrafficData: ZoneTrafficData[] = [
  { zone: "Downtown",   current: 42800, previous: 39200, efficiency: 84, avgWait: 32 },
  { zone: "Midtown",    current: 67400, previous: 61800, efficiency: 79, avgWait: 41 },
  { zone: "Uptown",     current: 31200, previous: 29600, efficiency: 88, avgWait: 24 },
  { zone: "East Side",  current: 28600, previous: 27100, efficiency: 91, avgWait: 19 },
  { zone: "West Side",  current: 34100, previous: 31800, efficiency: 86, avgWait: 28 },
];
