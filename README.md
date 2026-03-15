# Traffic Control Center

An **AI-Driven Intelligent Traffic Management System** built with Next.js 14. Designed to optimize urban traffic flow, monitor intersections in real-time, coordinate emergency vehicle preemption, and deliver actionable analytics for traffic operations centers.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Pages & Routes](#pages--routes)
- [Components](#components)
- [Data Models](#data-models)
- [Custom Hooks](#custom-hooks)
- [Getting Started](#getting-started)
- [Scripts](#scripts)

---

## Overview

Traffic Control Center is a full-featured dashboard application that simulates a smart city traffic management platform. It provides:

- Authentication-protected access with session persistence
- A real-time command center with live KPIs and alerts
- Interactive maps with intersection markers and layer controls
- Emergency vehicle tracking with signal preemption corridors
- AI-powered signal optimization with configurable parameters
- Environmental impact tracking (CO₂ reduced, fuel saved, time saved)
- Role-based user management with admin, operator, engineer, and viewer roles

> **Note:** All traffic data is currently simulated using mock datasets and hooks. It updates every 5 seconds to mimic live system behavior.
>
> **Persistence:** Authentication session, AI configuration, and alert preferences are stored in `localStorage`.

---

## Features

| Feature | Description |
|---|---|
| Authentication | Login-gated app shell with role-based demo users and persisted session |
| Real-Time Traffic Monitoring | Live KPIs — congestion levels, average wait times, system efficiency |
| Interactive Map | Leaflet-based map with status filters and working layers: traffic density, camera coverage, emergency routes |
| Signal Control | View and override signal timing per-intersection with toast feedback |
| Emergency Vehicle Preemption | Track vehicles, auto-clear corridors, calculate ETA and time saved |
| Multi-Severity Alerts | Critical, warning, info, emergency alerts + interactive notification panel (read/dismiss/mark all) |
| Analytics & Reports | Hourly traffic trends, top congested intersections, performance benchmarks, CSV export |
| AI Configuration | Tunable AI parameters — confidence threshold, aggressiveness, detection methods |
| Signal Timing Configuration | Zone-based signal timing panel with mode toggles and cycle summary |
| User Management | RBAC with Admin, Operator, Engineer, and Viewer roles |
| Environmental Dashboard | Real-time CO₂ reduction, fuel savings, and time savings metrics |
| System Health | Monitor signal controller uptime, API status, and camera availability |

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 14.2 (App Router) |
| Language | TypeScript 5 |
| UI Styling | Tailwind CSS 3.4 (dark theme, glass morphism, glow effects) |
| Fonts | `next/font` (Inter, Poppins, JetBrains Mono) |
| Icons | Lucide React 0.577 |
| Charts | Recharts 3.8 |
| Maps | Leaflet 1.9 + React Leaflet 4.2 |
| Runtime | Node.js / React 18 |
| Linting | ESLint |
| CSS Processing | PostCSS + Autoprefixer |

---

## Project Structure

```
Traffic_Manager/
├── src/
│   ├── app/                      # Next.js App Router pages + root layout
│   │   ├── layout.tsx            # Root layout (AppShell wrapper)
│   │   ├── login/page.tsx        # Login page (/login)
│   │   ├── page.tsx              # Dashboard (/)
│   │   ├── map/page.tsx          # Live Map (/map)
│   │   ├── intersections/page.tsx # Intersections (/intersections)
│   │   ├── analytics/page.tsx    # Analytics (/analytics)
│   │   ├── emergency/page.tsx    # Emergency Tracking (/emergency)
│   │   └── settings/page.tsx     # Settings (/settings)
│   │
│   ├── components/
│   │   ├── dashboard/            # Dashboard-specific components
│   │   ├── map/                  # Map components (SSR-disabled Leaflet)
│   │   ├── intersections/        # Intersection management components
│   │   ├── analytics/            # Analytics and reporting components
│   │   ├── emergency/            # Emergency vehicle tracking components
│   │   ├── settings/             # Configuration and admin components
│   │   ├── layout/               # AppShell, Sidebar, TopBar
│   │   └── ui/                   # Reusable UI atoms (Button, Card, Modal, etc.)
│   │
│   ├── hooks/                    # Custom React hooks for data simulation
│   ├── contexts/                 # React context providers (auth)
│   ├── types/                    # TypeScript interface and type definitions
│   ├── data/                     # Mock data (intersections, alerts, vehicles, users)
│   └── lib/                      # Utilities, constants, and helpers
│
├── package.json
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── postcss.config.js
```

---

## Pages & Routes

### `/login` — Authentication
Login entry point for the dashboard shell:
- Email/password demo authentication
- Quick-fill demo credentials
- Session persistence via `localStorage`

### `/` — Dashboard
The central command center. Displays:
- KPI cards (active intersections, avg wait time, efficiency %)
- Traffic volume line/area chart
- Recent alerts panel with severity badges
- Environmental impact metrics (CO₂, fuel, time)
- Quick action buttons
- Mini map overview

### `/map` — Live Map
Interactive Leaflet map showing all intersections across the city:
- Color-coded markers by traffic status (optimal / moderate / heavy / emergency)
- Status filter buttons
- Working layer toggles: Traffic Density, Camera Coverage, Emergency Routes
- Intersection search with auto-center
- Active emergency vehicle markers (when emergency route layer is enabled)
- Side panel with full intersection details on marker click

### `/intersections` — Intersection Management
List-based management view:
- Searchable and sortable intersection list
- Status indicators and metric previews
- Detail panel: signal states, camera feeds, queue lengths
- **Manual Override Modal** for adjusting NS/EW signal timing
- Success toast when override is applied

### `/analytics` — Analytics & Reports
Multi-tab analytics dashboard:
- Date preset selector wired to chart data
- Metric cards (throughput, avg wait time, AI decision accuracy)
- Hourly traffic volume chart
- Top intersections by congestion
- Environmental summary (CO₂, fuel, time saved)
- CSV report export

### `/emergency` — Emergency Vehicle Tracking
Real-time emergency coordination:
- Active vehicle cards with type (ambulance / fire / police), call sign, route progress, and ETA
- Preemption status per intersection along the route
- Metrics panel: total preemptions, avg time saved, success rate
- Historical log of completed emergency assignments
- Working history filter (all/ambulance/fire/police) and view-all toggle

### `/settings` — Settings & Configuration
System configuration split into tabs:
- **AI Configuration**: Confidence threshold, update frequency, optimization aggressiveness, detection methods (visual/audio/GPS/radio), preemption distance, predictive modeling
- **Signal Timing**: Zone-level NS/EW timing bounds, pedestrian timings, peak-hour extension, and mode toggles
- **Alert Preferences**: Per-severity notification toggles and thresholds
- **User Management**: List users, manage roles and permissions
- **System Health**: Controller uptime, API connectivity, camera status
- Save/Reset actions with persisted settings

---

## Components

### Dashboard
| Component | Description |
|---|---|
| `KPICard` | Metric tile with value, trend indicator, and status color |
| `TrafficVolumeChart` | Recharts line/area chart for traffic volume over time |
| `AlertsPanel` | List of recent alerts with severity badges and action buttons |
| `EnvironmentalImpact` | CO₂, fuel, and time savings summary cards |
| `QuickActions` | One-click action buttons (signal override, emergency route, etc.) |
| `MiniMap` | Compact map thumbnail for the dashboard |

### Map
| Component | Description |
|---|---|
| `TrafficMap` | Dynamically loaded (SSR-disabled) Leaflet map container |
| `TrafficMapContent` | Renders intersection markers, layer overlays, and emergency vehicle markers |
| `MapControls` | Search bar, filter buttons, layer toggles |
| `IntersectionDetailPanel` | Slide-in panel with intersection details |

### Intersections
| Component | Description |
|---|---|
| `IntersectionList` | Searchable list with status dots, metrics, and hover effects |
| `IntersectionDetail` | Full detail view — signals, cameras, queue lengths, AI status |
| `SignalStatus` | Real-time NS/EW signal phase indicators with countdowns |
| `CameraFeedGrid` | Multi-directional camera view with animated mock feed and offline state |
| `ManualOverrideModal` | Dialog to manually adjust green/yellow phase durations |

### Analytics
| Component | Description |
|---|---|
| `DateRangeSelector` | Date range picker control |
| `MetricCard` | Analytics metric display with trend and benchmark |
| `TrafficVolumeByHour` | 24-hour chart with externally supplied filtered dataset support |
| `TopIntersections` | Ranked table of highest-congestion intersections |
| `EnvironmentalSummary` | Aggregated environmental impact across the system |

### Emergency
| Component | Description |
|---|---|
| `ActiveEmergencyCard` | Live card with vehicle type, route, progress bar, and ETA |
| `EmergencyHistory` | Table of completed emergency vehicle runs |
| `EmergencyMetrics` | Summary stats — preemptions, time saved, response rates |

### Settings
| Component | Description |
|---|---|
| `AIConfiguration` | Form panel for AI model parameters |
| `SignalTiming` | Zone-based timing controls and cycle summary |
| `AlertPreferences` | Toggle-based notification preference settings |
| `UserManagement` | User list with role badges and management controls |
| `SystemHealth` | Health status grid for signal controllers, APIs, cameras |

### Layout
| Component | Description |
|---|---|
| `AppShell` | Root layout wrapper composing Sidebar + TopBar + main content |
| `Sidebar` | Navigation menu with icon links to all pages |
| `TopBar` | Header with system status, notification trigger, and user menu |
| `NotificationPanel` | Read/dismiss notifications, mark-all-read, severity-aware feed |

### UI Primitives (`/components/ui`)
`Button` · `Card` · `Modal` · `Badge` · `Tabs` · `Toggle` · `Tooltip` · `Select` · `ProgressBar` · `DataTable` · `Skeleton`

---

## Data Models

Defined in [src/types/index.ts](src/types/index.ts):

```ts
type TrafficStatus  = "optimal" | "moderate" | "heavy" | "emergency"
type SignalPhase    = "green" | "yellow" | "red"
type Direction      = "north" | "south" | "east" | "west"
type UserRole       = "admin" | "operator" | "engineer" | "viewer"
type EmergencyVehicleType = "ambulance" | "fire" | "police"
```

**Core interfaces:**

- **`Intersection`** — ID, name, coordinates, status, congestionLevel (0–100), avgWaitTime, vehiclesPerHour, queue lengths by direction, NS/EW signal states, cameras, AI control flag, zone
- **`SignalState`** — Direction group (NS/EW), current phase, timeRemaining, totalTime
- **`Alert`** — ID, severity, title, description, timestamp, acknowledged status, actionType
- **`EmergencyVehicle`** — Type, callSign, origin/destination, coordinates, routeProgress (0–100), intersectionsCleared, ETA, timeSaved, active flag
- **`User`** — ID, name, email, role, lastActive, avatar URL
- **`AIConfig`** — confidenceThreshold, updateFrequency, optimizationAggressiveness, detection toggles, preemptionDistance, predictiveModeling flags, retrainingInterval
- **`EnvironmentalMetrics`** — co2Reduced (kg), fuelSaved (L), timeSaved (hrs), trend values

---

## Custom Hooks

| Hook | Description |
|---|---|
| `useTrafficData` | Simulates live traffic — returns intersections, lastUpdate, and system-wide stats. Updates every 5 seconds with randomized congestion fluctuation. |
| `useAlerts` | Manages alerts state — acknowledge and dismiss operations, tracks unacknowledged/critical/emergency counts. |
| `useEmergencyVehicles` | Simulates vehicle progress along routes, updates ETA, tracks completed preemptions and average time saved. |
| `useNotifications` | Manages notification read/unread state — mark individual or all as read, dismiss, track unread count. |

### Context

| Context | Description |
|---|---|
| `AuthContext` | Demo authentication provider with login/logout and persisted user session |

---

## Getting Started

### Prerequisites

- **Node.js** >= 18.x
- **npm** or **yarn**

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd Traffic_Manager

# Install dependencies
npm install
```

### Demo Login Credentials

Use any configured demo account:

- `admin@trafficcontrol.nyc.gov` / `admin123`
- `operator@trafficcontrol.nyc.gov` / `operator123`
- `engineer@trafficcontrol.nyc.gov` / `engineer123`
- `viewer@trafficcontrol.nyc.gov` / `viewer123`

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

---

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start Next.js development server with hot reload |
| `npm run build` | Build the optimized production bundle |
| `npm start` | Start the production server |
| `npm run lint` | Run ESLint across the project |

---

## Design System

The UI uses a custom dark theme defined in [tailwind.config.ts](tailwind.config.ts):

- **Color palette**: brand blue, success green, warning amber, danger red, emergency orange
- **Signal colors**: signal-green, signal-yellow, signal-red
- **Surface colors**: layered dark blues/purples for depth
- **Effects**: glass morphism (backdrop blur + subtle borders), glow effects per status (blue/green/red/orange)
- **Typography**: Inter (body), Poppins (display headings), JetBrains Mono (code/data)
- **Animations**: `pulse-slow`, `slide-in-right`, `slide-in-up`, `fade-in`

---

## Mock Data

All data in `src/data/` is simulated:

| File | Contents |
|---|---|
| `intersections.ts` | 50+ city intersections across zones (Downtown, Midtown, East/West Side) |
| `alerts.ts` | Mix of critical, warning, info, and emergency system alerts |
| `emergencyVehicles.ts` | Active and historical emergency vehicle assignments |
| `trafficVolume.ts` | 24-hour hourly traffic volume data |
| `users.ts` | System users with varying roles and last-active timestamps |
