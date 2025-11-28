import { useState } from "react";
import { KPIModal } from "../components/KPIModal";
import { KPICard } from "../components/KPICard";
import { Cpu, HardDrive, Users, Activity, Zap, Database, Cloud, Server } from "lucide-react";

// Sample data for different KPIs
const kpiDataSamples = {
  cpu: {
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
      { time: "Wed", value: 71 },
      { time: "Thu", value: 75 },
      { time: "Fri", value: 78 },
      { time: "Sat", value: 74 },
      { time: "Sun", value: 78.5 }
    ],
    comparisonData: [
      { label: "US-East", value: 78.5, color: "#2EBFFF" },
      { label: "EU-West", value: 82.1, color: "#AE71FF" },
      { label: "Asia-Pacific", value: 71.3, color: "#4ECDC4" },
      { label: "US-West", value: 69.8, color: "#FF6B9D" }
    ],
    distributionData: [
      { range: "0-20%", count: 5 },
      { range: "20-40%", count: 12 },
      { range: "40-60%", count: 28 },
      { range: "60-80%", count: 42 },
      { range: "80-100%", count: 18 }
    ],
    insights: {
      positive: [
        "CPU performance is 20% better than last month",
        "Peak hours optimized with auto-scaling",
        "Resource allocation efficiency improved by 15%"
      ],
      neutral: [
        "Usage pattern follows expected workload cycles",
        "Average utilization within normal parameters",
        "Load distribution balanced across zones"
      ],
      risk: [
        "2 anomalies detected in peak traffic periods",
        "Threshold approaching during business hours",
        "Consider scaling resources for next quarter"
      ]
    }
  },
  storage: {
    title: "Storage Capacity",
    icon: HardDrive,
    currentValue: 2847,
    unit: "GB",
    average: 2520,
    peak: 3120,
    trend: -5.2,
    volatility: 4.8,
    regionRanking: 5,
    totalRegions: 12,
    anomalyCount: 0,
    forecastValue: 2710,
    trendData: [
      { time: "Mon", value: 3010 },
      { time: "Tue", value: 2950 },
      { time: "Wed", value: 2920 },
      { time: "Thu", value: 2880 },
      { time: "Fri", value: 2860 },
      { time: "Sat", value: 2850 },
      { time: "Sun", value: 2847 }
    ],
    comparisonData: [
      { label: "US-East", value: 2847, color: "#2EBFFF" },
      { label: "EU-West", value: 3120, color: "#AE71FF" },
      { label: "Asia-Pacific", value: 2410, color: "#4ECDC4" },
      { label: "US-West", value: 2680, color: "#FF6B9D" }
    ],
    distributionData: [
      { range: "0-1TB", count: 8 },
      { range: "1-2TB", count: 22 },
      { range: "2-3TB", count: 45 },
      { range: "3-4TB", count: 18 },
      { range: "4-5TB", count: 6 }
    ],
    insights: {
      positive: [
        "Storage cleanup campaign reduced usage by 5%",
        "Data archival strategy working effectively",
        "Cost optimization achieved through compression"
      ],
      neutral: [
        "Storage growth rate declining as expected",
        "Data retention policies properly enforced",
        "Backup systems operating normally"
      ],
      risk: [
        "No immediate capacity concerns detected",
        "Monitor seasonal data spikes in Q4",
        "Plan capacity upgrade for next fiscal year"
      ]
    }
  },
  users: {
    title: "Active Users",
    icon: Users,
    currentValue: 12543,
    unit: "",
    average: 11280,
    peak: 15870,
    trend: 18.7,
    volatility: 12.3,
    regionRanking: 2,
    totalRegions: 12,
    anomalyCount: 1,
    forecastValue: 13820,
    trendData: [
      { time: "Mon", value: 10200 },
      { time: "Tue", value: 10800 },
      { time: "Wed", value: 11200 },
      { time: "Thu", value: 11800 },
      { time: "Fri", value: 12100 },
      { time: "Sat", value: 12300 },
      { time: "Sun", value: 12543 }
    ],
    comparisonData: [
      { label: "US-East", value: 12543, color: "#2EBFFF" },
      { label: "EU-West", value: 15870, color: "#AE71FF" },
      { label: "Asia-Pacific", value: 9420, color: "#4ECDC4" },
      { label: "US-West", value: 10150, color: "#FF6B9D" }
    ],
    distributionData: [
      { range: "0-5K", count: 4 },
      { range: "5-10K", count: 15 },
      { range: "10-15K", count: 58 },
      { range: "15-20K", count: 20 },
      { range: "20K+", count: 3 }
    ],
    insights: {
      positive: [
        "User growth accelerating by 19% week-over-week",
        "Retention rate improved to 87.3%",
        "New user onboarding success rate at 92%"
      ],
      neutral: [
        "Daily active user patterns stable",
        "Geographic distribution aligns with targets",
        "Session duration holding steady at 24 mins"
      ],
      risk: [
        "1 spike detected during product launch",
        "Prepare infrastructure for continued growth",
        "Monitor churn rate in competitive markets"
      ]
    }
  },
  performance: {
    title: "API Response Time",
    icon: Activity,
    currentValue: 142,
    unit: "ms",
    average: 158,
    peak: 245,
    trend: -10.1,
    volatility: 6.2,
    regionRanking: 1,
    totalRegions: 12,
    anomalyCount: 0,
    forecastValue: 138,
    trendData: [
      { time: "Mon", value: 165 },
      { time: "Tue", value: 158 },
      { time: "Wed", value: 152 },
      { time: "Thu", value: 148 },
      { time: "Fri", value: 145 },
      { time: "Sat", value: 143 },
      { time: "Sun", value: 142 }
    ],
    comparisonData: [
      { label: "US-East", value: 142, color: "#2EBFFF" },
      { label: "EU-West", value: 168, color: "#AE71FF" },
      { label: "Asia-Pacific", value: 189, color: "#4ECDC4" },
      { label: "US-West", value: 155, color: "#FF6B9D" }
    ],
    distributionData: [
      { range: "0-100ms", count: 42 },
      { range: "100-150ms", count: 68 },
      { range: "150-200ms", count: 35 },
      { range: "200-300ms", count: 12 },
      { range: "300ms+", count: 3 }
    ],
    insights: {
      positive: [
        "Response time improved by 10% this week",
        "CDN optimization delivering faster content",
        "Database query performance enhanced"
      ],
      neutral: [
        "Performance metrics within SLA targets",
        "No degradation during peak traffic hours",
        "Load balancing functioning optimally"
      ],
      risk: [
        "No performance concerns identified",
        "Continue monitoring third-party API latency",
        "Plan edge caching expansion for Q2"
      ]
    }
  },
  throughput: {
    title: "Request Throughput",
    icon: Zap,
    currentValue: 45680,
    unit: "/min",
    average: 38500,
    peak: 52300,
    trend: 15.4,
    volatility: 9.7,
    regionRanking: 4,
    totalRegions: 12,
    anomalyCount: 3,
    forecastValue: 48200,
    trendData: [
      { time: "Mon", value: 38200 },
      { time: "Tue", value: 40100 },
      { time: "Wed", value: 41800 },
      { time: "Thu", value: 43200 },
      { time: "Fri", value: 44500 },
      { time: "Sat", value: 45100 },
      { time: "Sun", value: 45680 }
    ],
    comparisonData: [
      { label: "US-East", value: 45680, color: "#2EBFFF" },
      { label: "EU-West", value: 52300, color: "#AE71FF" },
      { label: "Asia-Pacific", value: 38900, color: "#4ECDC4" },
      { label: "US-West", value: 41200, color: "#FF6B9D" }
    ],
    distributionData: [
      { range: "0-20K", count: 8 },
      { range: "20-40K", count: 28 },
      { range: "40-60K", count: 52 },
      { range: "60-80K", count: 10 },
      { range: "80K+", count: 2 }
    ],
    insights: {
      positive: [
        "Throughput increasing with user growth",
        "System handling load without degradation",
        "Auto-scaling responding effectively to demand"
      ],
      neutral: [
        "Request patterns match business cycles",
        "Geographic distribution balanced",
        "API usage trending within forecasts"
      ],
      risk: [
        "3 traffic spikes during promotional events",
        "Consider additional capacity for campaigns",
        "Monitor rate limiting effectiveness"
      ]
    }
  },
  database: {
    title: "Database Queries",
    icon: Database,
    currentValue: 8420,
    unit: "/s",
    average: 7650,
    peak: 9870,
    trend: 8.9,
    volatility: 7.4,
    regionRanking: 6,
    totalRegions: 12,
    anomalyCount: 1,
    forecastValue: 8890,
    trendData: [
      { time: "Mon", value: 7300 },
      { time: "Tue", value: 7600 },
      { time: "Wed", value: 7900 },
      { time: "Thu", value: 8100 },
      { time: "Fri", value: 8250 },
      { time: "Sat", value: 8350 },
      { time: "Sun", value: 8420 }
    ],
    comparisonData: [
      { label: "US-East", value: 8420, color: "#2EBFFF" },
      { label: "EU-West", value: 9200, color: "#AE71FF" },
      { label: "Asia-Pacific", value: 7100, color: "#4ECDC4" },
      { label: "US-West", value: 7850, color: "#FF6B9D" }
    ],
    distributionData: [
      { range: "0-3K", count: 12 },
      { range: "3-6K", count: 25 },
      { range: "6-9K", count: 48 },
      { range: "9-12K", count: 14 },
      { range: "12K+", count: 1 }
    ],
    insights: {
      positive: [
        "Query optimization reduced avg execution time",
        "Index performance enhanced by 22%",
        "Read replica distribution improved"
      ],
      neutral: [
        "Database load within expected parameters",
        "Connection pool utilization stable",
        "Replication lag minimal across regions"
      ],
      risk: [
        "1 slow query pattern identified",
        "Monitor connection limits during peak hours",
        "Schedule maintenance window for index rebuild"
      ]
    }
  },
  network: {
    title: "Network Bandwidth",
    icon: Cloud,
    currentValue: 1.87,
    unit: " Gbps",
    average: 1.52,
    peak: 2.34,
    trend: 19.2,
    volatility: 11.8,
    regionRanking: 7,
    totalRegions: 12,
    anomalyCount: 2,
    forecastValue: 2.01,
    trendData: [
      { time: "Mon", value: 1.45 },
      { time: "Tue", value: 1.52 },
      { time: "Wed", value: 1.61 },
      { time: "Thu", value: 1.72 },
      { time: "Fri", value: 1.79 },
      { time: "Sat", value: 1.83 },
      { time: "Sun", value: 1.87 }
    ],
    comparisonData: [
      { label: "US-East", value: 1.87, color: "#2EBFFF" },
      { label: "EU-West", value: 2.12, color: "#AE71FF" },
      { label: "Asia-Pacific", value: 1.43, color: "#4ECDC4" },
      { label: "US-West", value: 1.68, color: "#FF6B9D" }
    ],
    distributionData: [
      { range: "0-0.5", count: 6 },
      { range: "0.5-1", count: 18 },
      { range: "1-1.5", count: 32 },
      { range: "1.5-2", count: 28 },
      { range: "2+", count: 16 }
    ],
    insights: {
      positive: [
        "Network capacity utilization optimal",
        "CDN offloading 65% of static content",
        "Peering agreements reducing latency"
      ],
      neutral: [
        "Bandwidth consumption follows traffic patterns",
        "No congestion detected in any region",
        "Network redundancy operating normally"
      ],
      risk: [
        "2 brief spikes during content delivery",
        "Monitor video streaming bandwidth usage",
        "Evaluate additional CDN PoPs for expansion"
      ]
    }
  },
  servers: {
    title: "Server Instances",
    icon: Server,
    currentValue: 247,
    unit: "",
    average: 215,
    peak: 298,
    trend: 14.9,
    volatility: 13.2,
    regionRanking: 8,
    totalRegions: 12,
    anomalyCount: 1,
    forecastValue: 265,
    trendData: [
      { time: "Mon", value: 208 },
      { time: "Tue", value: 218 },
      { time: "Wed", value: 225 },
      { time: "Thu", value: 235 },
      { time: "Fri", value: 241 },
      { time: "Sat", value: 244 },
      { time: "Sun", value: 247 }
    ],
    comparisonData: [
      { label: "US-East", value: 247, color: "#2EBFFF" },
      { label: "EU-West", value: 298, color: "#AE71FF" },
      { label: "Asia-Pacific", value: 185, color: "#4ECDC4" },
      { label: "US-West", value: 221, color: "#FF6B9D" }
    ],
    distributionData: [
      { range: "0-100", count: 5 },
      { range: "100-200", count: 22 },
      { range: "200-300", count: 58 },
      { range: "300-400", count: 12 },
      { range: "400+", count: 3 }
    ],
    insights: {
      positive: [
        "Auto-scaling adding capacity efficiently",
        "Resource utilization averaging 72%",
        "Spot instance strategy saving 38% on costs"
      ],
      neutral: [
        "Instance count scaling with demand",
        "Distribution across availability zones optimal",
        "No infrastructure bottlenecks detected"
      ],
      risk: [
        "1 scaling event triggered prematurely",
        "Review scaling thresholds for optimization",
        "Plan reserved capacity for predictable workloads"
      ]
    }
  }
};

export function KPIModalDemo() {
  const [selectedKPI, setSelectedKPI] = useState<keyof typeof kpiDataSamples | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#0d1117] to-[#0a0e1a] p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="text-center mb-4">
          <h1 
            className="text-5xl mb-4 inline-block"
            style={{
              background: "linear-gradient(135deg, #2EBFFF 0%, #AE71FF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}
          >
            KPI Analytics Dashboard
          </h1>
          <p className="text-gray-400 text-lg">Click any KPI card to view detailed analytics and AI insights</p>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard
            icon={Cpu}
            title="CPU Utilization"
            value={78.5}
            suffix="%"
            onClick={() => setSelectedKPI('cpu')}
          />
          <KPICard
            icon={HardDrive}
            title="Storage Capacity"
            value={2847}
            suffix=" GB"
            onClick={() => setSelectedKPI('storage')}
          />
          <KPICard
            icon={Users}
            title="Active Users"
            value={12543}
            onClick={() => setSelectedKPI('users')}
          />
          <KPICard
            icon={Activity}
            title="API Response Time"
            value={142}
            suffix=" ms"
            onClick={() => setSelectedKPI('performance')}
          />
          <KPICard
            icon={Zap}
            title="Request Throughput"
            value={45680}
            suffix="/min"
            onClick={() => setSelectedKPI('throughput')}
          />
          <KPICard
            icon={Database}
            title="Database Queries"
            value={8420}
            suffix="/s"
            onClick={() => setSelectedKPI('database')}
          />
          <KPICard
            icon={Cloud}
            title="Network Bandwidth"
            value={1.87}
            suffix=" Gbps"
            onClick={() => setSelectedKPI('network')}
          />
          <KPICard
            icon={Server}
            title="Server Instances"
            value={247}
            onClick={() => setSelectedKPI('servers')}
          />
        </div>
      </div>

      {/* Modal */}
      {selectedKPI && (
        <KPIModal
          isOpen={true}
          onClose={() => setSelectedKPI(null)}
          data={kpiDataSamples[selectedKPI]}
        />
      )}

      {/* Features List */}
      <div className="max-w-7xl mx-auto mt-16">
        <div 
          className="p-8 rounded-2xl"
          style={{
            background: "rgba(26, 31, 46, 0.6)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.1)"
          }}
        >
          <h2 className="text-2xl text-white mb-6">Modal Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-300">
            <div>
              <h3 className="text-cyan-400 mb-2">Design Elements</h3>
              <ul className="space-y-1 text-sm">
                <li>• Glassmorphism backdrop</li>
                <li>• Neon glow outlines</li>
                <li>• Smooth depth shadows</li>
                <li>• Cyan & purple gradients</li>
                <li>• Rounded corners & blur</li>
              </ul>
            </div>
            <div>
              <h3 className="text-cyan-400 mb-2">Analytics Data</h3>
              <ul className="space-y-1 text-sm">
                <li>• Current, average, peak values</li>
                <li>• Trend & volatility metrics</li>
                <li>• Region ranking data</li>
                <li>• Anomaly detection count</li>
                <li>• Forecast predictions</li>
              </ul>
            </div>
            <div>
              <h3 className="text-cyan-400 mb-2">Visualizations</h3>
              <ul className="space-y-1 text-sm">
                <li>• 7-day trend line chart</li>
                <li>• Regional comparison bars</li>
                <li>• Value distribution curve</li>
                <li>• Interactive tooltips</li>
                <li>• Gradient chart fills</li>
              </ul>
            </div>
            <div>
              <h3 className="text-cyan-400 mb-2">AI Insights</h3>
              <ul className="space-y-1 text-sm">
                <li>• Positive highlights</li>
                <li>• Neutral observations</li>
                <li>• Risk assessments</li>
                <li>• Color-coded categories</li>
                <li>• Actionable recommendations</li>
              </ul>
            </div>
            <div>
              <h3 className="text-cyan-400 mb-2">Actions</h3>
              <ul className="space-y-1 text-sm">
                <li>• View Full Dashboard</li>
                <li>• Download Report (PDF)</li>
                <li>• Close modal</li>
                <li>• Smooth animations</li>
                <li>• Keyboard support (ESC)</li>
              </ul>
            </div>
            <div>
              <h3 className="text-cyan-400 mb-2">Interactions</h3>
              <ul className="space-y-1 text-sm">
                <li>• Smooth open/close animations</li>
                <li>• Click outside to close</li>
                <li>• Responsive design</li>
                <li>• Scrollable content</li>
                <li>• Hover effects</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
