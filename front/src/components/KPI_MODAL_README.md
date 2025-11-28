# KPI Modal Component - Usage Guide

## Overview

The KPI Modal is a modern, glassmorphism-based popup modal designed for displaying detailed analytics when a KPI card is clicked. It features a futuristic dark theme with neon cyan and purple accents, smooth animations, and comprehensive data visualization.

## Features

### Design Elements
- ✨ **Glassmorphism UI**: Semi-transparent background with blur effects
- 🌟 **Neon Glow Outlines**: Cyan and purple gradient borders with glow effects
- 🎨 **Dark Theme**: Premium dark background with depth shadows
- 🔄 **Smooth Animations**: Framer Motion animations for open/close transitions
- 📱 **Responsive Design**: Works perfectly on desktop and mobile devices

### Data Sections
1. **Header**: KPI title, icon, and close button
2. **Summary Metrics**: Current, average, peak, trend, and volatility values
3. **Mini Charts**: 3 interactive charts (trend line, comparison bar, distribution)
4. **AI Insights Panel**: Positive, neutral, and risk insights with color coding
5. **Supporting Data**: Region ranking, anomaly counts, forecast values, model confidence
6. **Action Buttons**: View Full Dashboard, Download Report, Close

## Installation

The component is already installed in your project at `/components/KPIModal.tsx`.

### Dependencies
- `framer-motion`: For smooth animations
- `recharts`: For data visualization
- `lucide-react`: For icons

## Usage

### Basic Example

```tsx
import { useState } from "react";
import { KPIModal } from "../components/KPIModal";
import { Cpu } from "lucide-react";

function MyComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const kpiData = {
    title: "CPU Utilization",
    icon: Cpu,
    currentValue: 78.5,
    unit: "%",
    average: 65.2,
    peak: 94.8,
    trend: 12.3,
    volatility: 8.5,
    regionRanking: 3,
    totalRegions: 12,
    anomalyCount: 2,
    forecastValue: 82.1,
    trendData: [
      { time: "Mon", value: 62 },
      { time: "Tue", value: 68 },
      // ... more data
    ],
    comparisonData: [
      { label: "US-East", value: 78.5, color: "#2EBFFF" },
      // ... more regions
    ],
    distributionData: [
      { range: "0-20%", count: 5 },
      // ... more ranges
    ],
    insights: {
      positive: ["Performance improved by 20%"],
      neutral: ["Usage follows expected patterns"],
      risk: ["2 anomalies detected during peak hours"]
    }
  };

  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>
        View Details
      </button>
      
      <KPIModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={kpiData}
      />
    </>
  );
}
```

### Integrating with KPICard

```tsx
import { useState } from "react";
import { KPICard } from "../components/KPICard";
import { KPIModal } from "../components/KPIModal";
import { Cpu } from "lucide-react";

function Dashboard() {
  const [selectedKPI, setSelectedKPI] = useState(null);

  return (
    <>
      <KPICard
        icon={Cpu}
        title="CPU Utilization"
        value={78.5}
        suffix="%"
        onClick={() => setSelectedKPI('cpu')}
      />
      
      {selectedKPI === 'cpu' && (
        <KPIModal
          isOpen={true}
          onClose={() => setSelectedKPI(null)}
          data={cpuKpiData}
        />
      )}
    </>
  );
}
```

## Data Structure

### KPIModalData Interface

```typescript
interface KPIModalData {
  // Header
  title: string;                    // KPI name (e.g., "CPU Utilization")
  icon: LucideIcon;                 // Icon component from lucide-react
  
  // Summary Metrics
  currentValue: number;             // Current metric value
  unit: string;                     // Unit of measurement (%, GB, ms, etc.)
  average: number;                  // Average value
  peak: number;                     // Peak/maximum value
  trend: number;                    // Trend percentage (positive or negative)
  volatility: number;               // Volatility percentage
  
  // Supporting Data
  regionRanking: number;            // Current region rank
  totalRegions: number;             // Total number of regions
  anomalyCount: number;             // Number of detected anomalies
  forecastValue: number;            // Next period forecast value
  
  // Chart Data
  trendData: Array<{                // 7-day trend data
    time: string;                   // Time label (e.g., "Mon", "12:00")
    value: number;                  // Metric value
  }>;
  
  comparisonData: Array<{           // Regional comparison data
    label: string;                  // Region name
    value: number;                  // Metric value
    color: string;                  // Bar color (hex)
  }>;
  
  distributionData: Array<{         // Value distribution data
    range: string;                  // Range label (e.g., "0-20%")
    count: number;                  // Frequency count
  }>;
  
  // AI Insights
  insights: {
    positive: string[];             // Positive insights (green)
    neutral: string[];              // Neutral observations (blue)
    risk: string[];                 // Risk assessments (red)
  };
}
```

## Customization

### Color Scheme

The modal uses CSS custom properties and inline styles for theming:

- **Primary Cyan**: `#2EBFFF` (rgb 46, 191, 255)
- **Primary Purple**: `#AE71FF` (rgb 174, 113, 255)
- **Accent Cyan**: `#4ECDC4` (rgb 78, 205, 196)
- **Background Dark**: `rgba(15, 20, 30, 0.95)`

### Animations

Animation settings can be adjusted in the Framer Motion props:

```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.9, y: 20 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  exit={{ opacity: 0, scale: 0.9, y: 20 }}
  transition={{ duration: 0.4, type: "spring", damping: 25 }}
>
```

### Chart Colors

Chart gradients and colors can be customized in the chart definitions:

```tsx
// Trend chart gradient
<linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
  <stop offset="0%" stopColor="#2EBFFF" stopOpacity={0.4} />
  <stop offset="100%" stopColor="#2EBFFF" stopOpacity={0} />
</linearGradient>
```

## Demo Page

A comprehensive demo page is available at `/kpi-modal-demo` showcasing:
- 8 different KPI cards (CPU, Storage, Users, Performance, etc.)
- Complete sample data for each metric
- Interactive modal with all features
- Real-world use cases

To view the demo:
1. Navigate to `/kpi-modal-demo` in your app
2. Click any KPI card to open the modal
3. Explore different metrics and data visualizations

## Best Practices

### 1. Data Preparation
- Ensure all required fields are populated
- Use consistent time formats for trend data
- Provide meaningful insight text (2-3 per category)

### 2. Performance
- Lazy load the modal component if used in large dashboards
- Consider data caching for frequently accessed KPIs
- Limit trend data to 7-14 data points for optimal chart performance

### 3. UX Considerations
- Always provide a close button and overlay click-to-close
- Use appropriate icons that match the KPI context
- Keep insight text concise and actionable
- Test responsiveness on mobile devices

### 4. Accessibility
- Modal traps focus when open
- Supports ESC key to close (if implemented)
- Proper ARIA labels on interactive elements
- Sufficient color contrast for text

## Advanced Features

### Adding Custom Actions

Modify the action buttons section to add custom functionality:

```tsx
<button
  onClick={() => {
    // Custom action logic
    console.log('Custom action triggered');
  }}
  className="px-6 py-3 rounded-lg..."
>
  Custom Action
</button>
```

### Integrating with State Management

If using Redux or Context:

```tsx
const dispatch = useDispatch();
const kpiData = useSelector(state => state.kpis.selectedKPI);

<KPIModal
  isOpen={!!kpiData}
  onClose={() => dispatch(clearSelectedKPI())}
  data={kpiData}
/>
```

### Real-time Data Updates

For live data updates:

```tsx
useEffect(() => {
  if (isModalOpen) {
    const interval = setInterval(() => {
      // Fetch updated KPI data
      fetchKPIData(selectedKPI);
    }, 30000); // Update every 30 seconds
    
    return () => clearInterval(interval);
  }
}, [isModalOpen, selectedKPI]);
```

## Troubleshooting

### Modal Not Appearing
- Ensure `isOpen` prop is set to `true`
- Check z-index conflicts with other components
- Verify Framer Motion is properly installed

### Charts Not Rendering
- Verify data format matches the interface
- Ensure ResponsiveContainer parent has defined height
- Check for console errors related to Recharts

### Performance Issues
- Reduce number of data points in charts
- Implement virtualization for long insight lists
- Use React.memo for expensive child components

## Support

For questions or issues:
1. Check the demo page at `/kpi-modal-demo`
2. Review the component source at `/components/KPIModal.tsx`
3. Inspect the sample data in `/pages/KPIModalDemo.tsx`

## Version History

- **v1.0.0** (Current): Initial release with full feature set
  - Glassmorphism design
  - 3 chart types
  - AI insights panel
  - Responsive layout
  - Smooth animations
