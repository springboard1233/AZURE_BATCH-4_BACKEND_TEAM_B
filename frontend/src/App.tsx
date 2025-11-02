import { useState, useEffect } from "react";
import { Globe, Target, Cpu, DollarSign, Loader2 } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { KPICard } from "./components/KPICard";
import { ChartSection } from "./components/ChartSection";
import api, {
  type KPIs,
  type UsageTrend,
  type ForecastInsight,
  type CapacityPlan,
  type ReportInsight,
} from "./services/api";

const COLORS = [
  "#4ECDC4",
  "#FF6B6B",
  "#FFD166",
  "#A178DF",
  "#0078FF",
  "#FF9F1C",
  "#2EC4B6",
  "#E71D36",
  "#9D4EDD",
  "#F15BB5",
];

const BAR_COLORS = [
  "#0078FF",
  "#4ECDC4",
  "#FF6B6B",
  "#FFD166",
  "#A178DF",
  "#FF9F1C",
  "#2EC4B6",
  "#E71D36",
];

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  
  // Data states
  const [kpis, setKpis] = useState<KPIs | null>(null);
  const [usageData, setUsageData] = useState<UsageTrend[]>([]);
  const [forecastData, setForecastData] = useState<ForecastInsight[]>([]);
  const [capacityData, setCapacityData] = useState<CapacityPlan[]>([]);
  const [reportData, setReportData] = useState<ReportInsight[]>([]);
  
  // Loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  // Fetch all data on component mount
  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Fetch all data in parallel
        const [kpisData, usageTrends, forecastInsights, capacityPlanning, reportsInsights] = await Promise.all([
          api.getKPIs(),
          api.getUsageTrends(),
          api.getForecastInsights(),
          api.getCapacityPlanning(),
          api.getReportsInsights(),
        ]);

        setKpis(kpisData);
        setUsageData(usageTrends);
        setForecastData(forecastInsights);
        setCapacityData(capacityPlanning);
        setReportData(reportsInsights);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please ensure the backend server is running.");
        // Set default/fallback data
        setKpis({
          active_regions: 18,
          forecast_accuracy: 92,
          avg_cpu_load: 64,
          cost_efficiency: 87,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const toggleTheme = () => setIsDark(!isDark);
  const toggleSidebar = () => setIsSidebarExpanded(!isSidebarExpanded);

  // Loading component
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        isExpanded={isSidebarExpanded}
        onToggle={toggleSidebar}
      />

      <div className="flex-1 overflow-y-auto">
        <Header isDark={isDark} onToggleTheme={toggleTheme} />

        {/* Error Banner */}
        {error && (
          <div className="mx-6 mt-6 rounded-lg bg-destructive/10 p-4 text-destructive">
            <p className="text-sm">{error}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Make sure the backend server is running at http://localhost:8000
            </p>
          </div>
        )}

        {/* KPI Cards */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5 m-6">
          <KPICard
            icon={Globe}
            title="Active Regions"
            value={kpis?.active_regions ?? 18}
          />
          <KPICard
            icon={Target}
            title="Forecast Accuracy"
            value={kpis?.forecast_accuracy ?? 92}
            suffix="%"
          />
          <KPICard
            icon={Cpu}
            title="Avg. CPU Load"
            value={Math.round(kpis?.avg_cpu_load ?? 64)}
            suffix="%"
          />
          <KPICard
            icon={DollarSign}
            title="Cost Efficiency"
            value={kpis?.cost_efficiency ?? 87}
            suffix="%"
          />
        </div>

        {/* Chart Sections */}
        <div className="px-6 pb-6 grid grid-cols-[repeat(auto-fill,minmax(420px,1fr))] gap-6">
          <ChartSection
            title="Usage Trends"
            description="Shows historical usage of Azure compute and storage resources to track demand fluctuations and identify usage spikes."
          >
            {usageData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={usageData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.1)"
                  />
                  <XAxis dataKey="month" stroke="currentColor" />
                  <YAxis stroke="currentColor" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "6px",
                      color: "var(--foreground)",
                    }}
                    labelStyle={{ color: "var(--foreground)" }}
                    itemStyle={{ color: "var(--foreground)" }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="cpu"
                    name="CPU Usage (%)"
                    stroke="#00A8FF"
                    strokeWidth={2}
                    fill="rgba(0,168,255,0.3)"
                    fillOpacity={1}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground">
                No data available
              </div>
            )}
          </ChartSection>

          <ChartSection
            title="Forecast Insights"
            description="Displays predicted Azure resource demand using ML-based models for proactive infrastructure planning."
          >
            {forecastData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={forecastData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.1)"
                  />
                  <XAxis dataKey="region" stroke="currentColor" />
                  <YAxis stroke="currentColor" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "6px",
                      color: "var(--foreground)",
                    }}
                    labelStyle={{ color: "var(--foreground)" }}
                    itemStyle={{ color: "var(--foreground)" }}
                  />
                  <Legend />
                  <Bar
                    dataKey="demand"
                    name="Predicted Demand (Units)"
                  >
                    {forecastData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          BAR_COLORS[index % BAR_COLORS.length]
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground">
                No data available
              </div>
            )}
          </ChartSection>

          <ChartSection
            title="Capacity Planning"
            description="Helps in visualizing optimal capacity distribution and resource allocation based on utilization ratios."
          >
            {capacityData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={capacityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {capacityData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "6px",
                      color: "var(--foreground)",
                    }}
                    labelStyle={{ color: "var(--foreground)" }}
                    itemStyle={{ color: "var(--foreground)" }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    wrapperStyle={{ fontSize: "12px" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground">
                No data available
              </div>
            )}
          </ChartSection>

          <ChartSection
            title="Reports & Insights"
            description="Summarizes utilization, performance, and cost efficiency metrics for Azure management decisions."
          >
            {reportData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={reportData}>
                  <PolarGrid stroke="rgba(255,255,255,0.2)" />
                  <PolarAngleAxis
                    dataKey="metric"
                    stroke="currentColor"
                    style={{ fontSize: "11px" }}
                  />
                  <PolarRadiusAxis stroke="currentColor" />
                  <Radar
                    name="Efficiency Score"
                    dataKey="score"
                    stroke="#00A8FF"
                    fill="rgba(0,168,255,0.3)"
                    fillOpacity={0.6}
                  />
                  <Legend />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "6px",
                      color: "var(--foreground)",
                    }}
                    labelStyle={{ color: "var(--foreground)" }}
                    itemStyle={{ color: "var(--foreground)" }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground">
                No data available
              </div>
            )}
          </ChartSection>
        </div>
      </div>
    </div>
  );
}
