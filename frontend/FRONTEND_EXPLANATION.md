# Frontend Architecture & How It Works

## 📋 Overview

The frontend is a **React + TypeScript** dashboard application built with **Vite**. It fetches data from the backend API and displays it in interactive charts and KPI cards.

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────┐
│         Browser                         │
│  (User's Web Browser)                   │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────────────────────────┐  │
│  │  React Application               │  │
│  │  (frontend/src/App.tsx)         │  │
│  ├─────────────────────────────────┤  │
│  │                                 │  │
│  │  ┌──────────────────────────┐  │  │
│  │  │  1. State Management      │  │  │
│  │  │     - useState hooks      │  │  │
│  │  │     - Loading states      │  │  │
│  │  │     - Error handling      │  │  │
│  │  └──────────────────────────┘  │  │
│  │                                 │  │
│  │  ┌──────────────────────────┐  │  │
│  │  │  2. API Service           │  │  │
│  │  │     (services/api.ts)    │  │  │
│  │  │     - fetch() calls       │  │  │
│  │  │     - Error handling     │  │  │
│  │  │     - Type safety         │  │  │
│  │  └──────────────────────────┘  │  │
│  │                                 │  │
│  │  ┌──────────────────────────┐  │  │
│  │  │  3. Components            │  │  │
│  │  │     - Header              │  │  │
│  │  │     - Sidebar             │  │  │
│  │  │     - KPICard             │  │  │
│  │  │     - ChartSection        │  │  │
│  │  └──────────────────────────┘  │  │
│  │                                 │  │
│  │  ┌──────────────────────────┐  │  │
│  │  │  4. Charts (Recharts)     │  │  │
│  │  │     - LineChart           │  │  │
│  │  │     - BarChart            │  │  │
│  │  │     - PieChart            │  │  │
│  │  │     - RadarChart          │  │  │
│  │  └──────────────────────────┘  │  │
│  │                                 │  │
│  └─────────────────────────────────┘  │
│                                         │
│  ┌─────────────────────────────────┐  │
│  │  Vite Dev Server               │  │
│  │  (Development only)            │  │
│  │  - Hot Module Replacement      │  │
│  │  - Fast refresh                │  │
│  └─────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘
            ↕ HTTP Requests
┌─────────────────────────────────────────┐
│      Backend API (Port 8000)            │
│      (FastAPI/Flask Server)             │
└─────────────────────────────────────────┘
```

---

## 🚀 Application Lifecycle

### 1. **Initial Load** (`main.tsx`)
```typescript
createRoot(document.getElementById("root")!).render(<App />);
```

**What happens:**
1. Browser loads `index.html`
2. HTML finds `<div id="root">`
3. React mounts the `App` component
4. `App.tsx` renders for the first time

### 2. **Component Mount** (`App.tsx`)

When `App` component first renders:

```typescript
useEffect(() => {
  const fetchAllData = async () => {
    // Fetch data from backend
  };
  fetchAllData();
}, []); // Empty array = run once on mount
```

**Steps:**
1. Set `loading = true` (show loading spinner)
2. Make 5 parallel API calls to backend
3. Wait for all responses
4. Update state with received data
5. Set `loading = false` (hide spinner, show dashboard)

### 3. **Data Fetching Flow**

```
Component Mount
    ↓
useEffect Triggered
    ↓
Set Loading = true
    ↓
Parallel API Calls
├─ api.getKPIs()
├─ api.getUsageTrends()
├─ api.getForecastInsights()
├─ api.getCapacityPlanning()
└─ api.getReportsInsights()
    ↓
All Promises Resolve
    ↓
Update State Variables
├─ setKpis(data)
├─ setUsageData(data)
├─ setForecastData(data)
├─ setCapacityData(data)
└─ setReportData(data)
    ↓
Set Loading = false
    ↓
React Re-renders with Data
    ↓
Charts Display Data
```

---

## 🔧 Key Components Explained

### 1. **App.tsx** (Main Component)

**Purpose:** Main dashboard container that orchestrates everything.

**State Management:**
```typescript
// UI State
const [isDark, setIsDark] = useState(true);
const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

// Data State
const [kpis, setKpis] = useState<KPIs | null>(null);
const [usageData, setUsageData] = useState<UsageTrend[]>([]);
const [forecastData, setForecastData] = useState<ForecastInsight[]>([]);
const [capacityData, setCapacityData] = useState<CapacityPlan[]>([]);
const [reportData, setReportData] = useState<ReportInsight[]>([]);

// Loading/Error State
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
```

**How it works:**
1. **Initial render:** Shows loading spinner
2. **After data fetch:** Shows dashboard with charts
3. **On error:** Shows error message with fallback data

### 2. **API Service** (`services/api.ts`)

**Purpose:** Centralized API communication layer.

**Key Features:**

#### Configuration
```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
```
- Reads API URL from environment variable
- Falls back to `http://localhost:8000` if not set

#### Generic Fetch Function
```typescript
async function fetchApi<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);
  const data = await response.json();
  return data.data || data.kpis || data;
}
```

**What it does:**
1. Makes HTTP GET request to backend
2. Handles errors (network failures, HTTP errors)
3. Parses JSON response
4. Extracts data from response wrapper
5. Returns typed data

#### API Functions
```typescript
export const api = {
  getKPIs: async () => fetchApi<KPIs>('/api/kpis'),
  getUsageTrends: async () => fetchApi<UsageTrend[]>('/api/usage-trends'),
  // ... more functions
};
```

**Benefits:**
- Type-safe (TypeScript ensures correct data types)
- Centralized error handling
- Easy to maintain
- Reusable across components

### 3. **Components**

#### **Header Component**
- Theme toggle (dark/light mode)
- User interface controls

#### **Sidebar Component**
- Navigation menu
- Collapsible/expandable
- Menu items for different views

#### **KPICard Component**
```typescript
<KPICard
  icon={Globe}
  title="Active Regions"
  value={kpis?.active_regions ?? 18}
/>
```
- Displays metric with icon
- Shows value from API or fallback
- Animated number counting

#### **ChartSection Component**
- Wrapper for charts
- Title and description
- Consistent styling
- Responsive container

---

## 📊 Charts (Recharts Library)

### 1. **Line Chart** (Usage Trends)
```typescript
<LineChart data={usageData}>
  <XAxis dataKey="month" />
  <YAxis />
  <Line dataKey="cpu" stroke="#00A8FF" />
</LineChart>
```
**Displays:** Monthly CPU usage over time

### 2. **Bar Chart** (Forecast Insights)
```typescript
<BarChart data={forecastData}>
  <Bar dataKey="demand">
    {forecastData.map((entry, index) => (
      <Cell fill={BAR_COLORS[index]} />
    ))}
  </Bar>
</BarChart>
```
**Displays:** Predicted demand by region with colored bars

### 3. **Pie Chart** (Capacity Planning)
```typescript
<PieChart>
  <Pie data={capacityData} dataKey="value">
    {capacityData.map((entry, index) => (
      <Cell fill={COLORS[index]} />
    ))}
  </Pie>
</PieChart>
```
**Displays:** Resource distribution (Compute, Storage, etc.)

### 4. **Radar Chart** (Reports & Insights)
```typescript
<RadarChart data={reportData}>
  <Radar dataKey="score" />
</RadarChart>
```
**Displays:** Efficiency scores across multiple metrics

---

## 🎨 Styling (Tailwind CSS)

### How Tailwind Works
```typescript
className="flex h-screen overflow-hidden"
```
- Utility classes applied directly to elements
- `flex` = display: flex
- `h-screen` = height: 100vh
- `overflow-hidden` = overflow: hidden

### Dark Mode Support
```typescript
useEffect(() => {
  if (isDark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}, [isDark]);
```
- Adds/removes `dark` class on HTML element
- Tailwind CSS variables switch based on class
- Automatic theme switching

### CSS Variables
```css
var(--card)      /* Background color */
var(--foreground) /* Text color */
var(--border)     /* Border color */
```
- Defined in `index.css`
- Change automatically with theme
- Consistent theming across components

---

## 🔄 React Hooks Explained

### 1. **useState** - State Management
```typescript
const [kpis, setKpis] = useState<KPIs | null>(null);
```
- Stores component state
- `kpis` = current value
- `setKpis()` = function to update value
- When state changes, React re-renders component

### 2. **useEffect** - Side Effects
```typescript
useEffect(() => {
  // Code to run
}, [dependencies]);
```

**When it runs:**
- **On mount:** Empty dependency array `[]`
- **On change:** When dependency values change
- **On unmount:** Return cleanup function

**Example:**
```typescript
useEffect(() => {
  fetchAllData(); // Run once when component mounts
}, []); // Empty array = run once
```

### 3. **Conditional Rendering**
```typescript
{loading && <LoadingSpinner />}
{error && <ErrorMessage />}
{usageData.length > 0 ? <Chart /> : <NoDataMessage />}
```

**Patterns:**
- `condition && <Component />` - Show if true
- `condition ? <A /> : <B />` - Show A or B
- `value ?? defaultValue` - Fallback value

---

## 📱 User Interaction Flow

### Theme Toggle
```
User clicks theme button
    ↓
toggleTheme() called
    ↓
setIsDark(!isDark)
    ↓
useEffect detects change
    ↓
Add/remove "dark" class
    ↓
CSS variables update
    ↓
All components re-render with new theme
```

### Sidebar Toggle
```
User clicks sidebar button
    ↓
toggleSidebar() called
    ↓
setIsSidebarExpanded(!isSidebarExpanded)
    ↓
Sidebar component re-renders
    ↓
Shows/hides expanded menu
```

---

## 🛠️ Build Process (Vite)

### Development Mode
```bash
npm run dev
```

**What Vite does:**
1. Starts dev server on port 3000
2. Watches for file changes
3. Hot Module Replacement (HMR) - updates without full page reload
4. Fast compilation using ES modules

### Production Build
```bash
npm run build
```

**What happens:**
1. TypeScript → JavaScript compilation
2. React JSX → JavaScript transformation
3. Code minification
4. Asset optimization
5. Creates `build/` folder with production files

---

## 🔍 Data Flow Example

### Example: Loading KPI Data

```
1. User opens dashboard
   ↓
2. App component mounts
   ↓
3. useEffect triggers
   ↓
4. api.getKPIs() called
   ↓
5. fetchApi('/api/kpis') executes
   ↓
6. HTTP GET request to http://localhost:8000/api/kpis
   ↓
7. Backend processes request
   ↓
8. Backend returns JSON:
   {
     "status": "success",
     "kpis": {
       "active_regions": 18,
       "forecast_accuracy": 92,
       ...
     }
   }
   ↓
9. fetchApi extracts kpis object
   ↓
10. api.getKPIs() returns KPIs object
   ↓
11. setKpis(data) updates state
   ↓
12. React re-renders App component
   ↓
13. KPICard components receive new data
   ↓
14. KPICard displays values on screen
```

---

## 🎯 Error Handling

### API Error Flow
```typescript
try {
  const data = await api.getKPIs();
  setKpis(data);
} catch (err) {
  console.error("Error:", err);
  setError("Failed to load data...");
  setKpis(defaultKPIs); // Fallback data
}
```

**What happens on error:**
1. Catch block executes
2. Error logged to console
3. Error message displayed to user
4. Fallback data used so app still works
5. User sees helpful error message

### Network Errors
- **Backend not running:** Shows error banner
- **CORS errors:** Check backend CORS configuration
- **Timeout:** Could add retry logic

---

## 📦 Technologies Used

| Technology | Purpose |
|-----------|---------|
| **React 18** | UI framework - component-based |
| **TypeScript** | Type safety - catch errors early |
| **Vite** | Build tool - fast development |
| **Recharts** | Charts library - data visualization |
| **Tailwind CSS** | Styling - utility-first CSS |
| **Lucide React** | Icons - modern icon library |
| **Radix UI** | UI primitives - accessible components |

---

## 🚀 Performance Optimizations

### 1. **Parallel Data Fetching**
```typescript
Promise.all([
  api.getKPIs(),
  api.getUsageTrends(),
  // ... more
])
```
- Fetches all data simultaneously
- Faster than sequential requests
- All charts load together

### 2. **Conditional Rendering**
```typescript
{usageData.length > 0 ? <Chart /> : <EmptyState />}
```
- Only renders charts when data available
- Prevents errors from empty data
- Better user experience

### 3. **TypeScript Types**
- Catches errors at compile time
- Better IDE autocomplete
- Prevents runtime errors

### 4. **React State Management**
- Only re-renders when state changes
- Efficient updates
- Fast user interactions

---

## 🔧 Development Workflow

### Running Development Server
```bash
cd frontend
npm run dev
```

**What you see:**
1. Vite starts dev server
2. Opens browser at `http://localhost:3000`
3. Shows dashboard
4. Changes auto-reload (Hot Module Replacement)

### Making Changes
1. Edit `App.tsx` or any component
2. Save file
3. Vite detects change
4. Browser automatically updates
5. No page refresh needed!

### Debugging
- **Browser DevTools:** F12 → Console tab
- **Network Tab:** See API requests
- **React DevTools:** Inspect component state
- **TypeScript Errors:** Shown in terminal

---

## 📝 Summary

**How Frontend Works:**

1. **Browser loads** → React app starts
2. **Component mounts** → Triggers data fetch
3. **API calls** → Backend returns JSON
4. **State updates** → React re-renders
5. **Charts display** → User sees dashboard
6. **User interactions** → State changes → UI updates

**Key Concepts:**
- **React:** Component-based UI
- **State:** Data that triggers re-renders
- **Hooks:** useState, useEffect manage behavior
- **API Service:** Communicates with backend
- **Charts:** Visualize data from backend
- **Styling:** Tailwind CSS for responsive design

The frontend is a **single-page application (SPA)** that dynamically updates based on backend data, providing an interactive dashboard experience.

