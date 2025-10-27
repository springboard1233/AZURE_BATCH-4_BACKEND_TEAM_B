import { useState, useEffect } from "react";
import { Globe, Target, Cpu, DollarSign } from "lucide-react";
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

// Data for charts
const usageData = [
  { month: "Jan", cpu: 30 },
  { month: "Feb", cpu: 45 },
  { month: "Mar", cpu: 50 },
  { month: "Apr", cpu: 60 },
  { month: "May", cpu: 75 },
  { month: "Jun", cpu: 70 },
  { month: "Jul", cpu: 80 },
  { month: "Aug", cpu: 95 },
  { month: "Sep", cpu: 85 },
  { month: "Oct", cpu: 90 },
  { month: "Nov", cpu: 100 },
  { month: "Dec", cpu: 110 },
];

const forecastData = [
  { region: "East US", demand: 75 },
  { region: "West US", demand: 85 },
  { region: "Europe", demand: 65 },
  { region: "Asia", demand: 95 },
  { region: "Australia", demand: 70 },
  { region: "America", demand: 35 },
  { region: "Japan", demand: 105 },
  { region: "Canada", demand: 60 },
];

const capacityData = [
  { name: "Compute", value: 35 },
  { name: "Storage", value: 25 },
  { name: "Networking", value: 20 },
  { name: "Database", value: 20 },
  { name: "AI/ML", value: 15 },
  { name: "Analytics", value: 10 },
  { name: "DevOps", value: 10 },
  { name: "Security", value: 5 },
  { name: "IoT", value: 5 },
  { name: "Other", value: 5 },
];

const reportData = [
  { metric: "Scalability", score: 80 },
  { metric: "Reliability", score: 70 },
  { metric: "Cost", score: 65 },
  { metric: "Performance", score: 85 },
  { metric: "Utilization", score: 75 },
  { metric: "Latency", score: 60 },
  { metric: "Security", score: 90 },
  { metric: "Flexibility", score: 70 },
  { metric: "Support", score: 80 },
  { metric: "Innovation", score: 75 },
  { metric: "Efficiency", score: 85 },
];

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
  const [isSidebarExpanded, setIsSidebarExpanded] =
    useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);
  const toggleSidebar = () =>
    setIsSidebarExpanded(!isSidebarExpanded);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        isExpanded={isSidebarExpanded}
        onToggle={toggleSidebar}
      />

      <div className="flex-1 overflow-y-auto">
        <Header isDark={isDark} onToggleTheme={toggleTheme} />

        {/* KPI Cards */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5 m-6">
          <KPICard
            icon={Globe}
            title="Active Regions"
            value={18}
          />
          <KPICard
            icon={Target}
            title="Forecast Accuracy"
            value={92}
            suffix="%"
          />
          <KPICard
            icon={Cpu}
            title="Avg. CPU Load"
            value={64}
            suffix="%"
          />
          <KPICard
            icon={DollarSign}
            title="Cost Efficiency"
            value={87}
            suffix="%"
          />
        </div>

        {/* Chart Sections */}
        <div className="px-6 pb-6 grid grid-cols-[repeat(auto-fill,minmax(420px,1fr))] gap-6">
          <ChartSection
            title="Usage Trends"
            description="Shows historical usage of Azure compute and storage resources to track demand fluctuations and identify usage spikes."
          >
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
          </ChartSection>

          <ChartSection
            title="Forecast Insights"
            description="Displays predicted Azure resource demand using ML-based models for proactive infrastructure planning."
          >
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
          </ChartSection>

          <ChartSection
            title="Capacity Planning"
            description="Helps in visualizing optimal capacity distribution and resource allocation based on utilization ratios."
          >
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
          </ChartSection>

          <ChartSection
            title="Reports & Insights"
            description="Summarizes utilization, performance, and cost efficiency metrics for Azure management decisions."
          >
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
          </ChartSection>
        </div>
      </div>
    </div>
  );
}