import React, { useEffect, useState } from "react";
import api, { KPIs } from "../services/api";
import KPICard from "../components/KPICard";
import ChartSection from "../components/ChartSection";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from "recharts";

export default function DashboardPage() {
  const [kpis, setKpis] = useState<KPIs | null>(null);
  const [usageData, setUsageData] = useState<any[]>([]);
  const [forecastData, setForecastData] = useState<any[]>([]);
  const [capacityData, setCapacityData] = useState<any[]>([]);
  const [reportData, setReportData] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      setKpis(await api.getKPIs());
      setUsageData(await api.getUsageTrends());
      setForecastData(await api.getForecastInsights());
      setCapacityData(await api.getCapacityPlanning());
      setReportData(await api.getReportsInsights());
    })();
  }, []);

  const COLORS = ["#4ECDC4","#FF6B6B","#FFD166","#A178DF","#0078FF","#FF9F1C","#2EC4B6","#E71D36","#9D4EDD","#F15BB5"];

  return (
    <div>
      <h2 className="page-title">Dashboard</h2>

      <div className="grid-kpis">
        <KPICard title="Active Regions" value={kpis?.active_regions ?? "—"} />
        <KPICard title="Forecast Accuracy" value={kpis?.forecast_accuracy ?? "—"} suffix="%" />
        <KPICard title="Avg. CPU Load" value={kpis?.avg_cpu_load ?? "—"} suffix="%" />
        <KPICard title="Cost Efficiency" value={kpis?.cost_efficiency ?? "—"} suffix="%" />
      </div>

      <div className="cards-grid">
        <ChartSection title="Usage Trends" description="Historical usage trends by month.">
          {usageData.length ? (
            <ResponsiveContainer>
              <LineChart data={usageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="cpu" stroke="#00A8FF" />
              </LineChart>
            </ResponsiveContainer>
          ) : <div className="center small-muted">No usage data</div>}
        </ChartSection>

        <ChartSection title="Forecast Insights" description="Predicted demand by region.">
          {forecastData.length ? (
            <ResponsiveContainer>
              <BarChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="region" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="demand">
                  {forecastData.map((f, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : <div className="center small-muted">No forecast data</div>}
        </ChartSection>

        <ChartSection title="Capacity Planning" description="Capacity distribution across categories.">
          {capacityData.length ? (
            <ResponsiveContainer>
              <PieChart>
                <Pie dataKey="value" data={capacityData} innerRadius={50} outerRadius={90}>
                  {capacityData.map((c, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : <div className="center small-muted">No capacity data</div>}
        </ChartSection>

        <ChartSection title="Reports & Insights" description="Radar summarizing performance metrics.">
          {reportData.length ? (
            <ResponsiveContainer>
              <RadarChart data={reportData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="metric" />
                <PolarRadiusAxis />
                <Radar dataKey="score" stroke="#00A8FF" fill="#00A8FF" fillOpacity={0.3} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          ) : <div className="center small-muted">No reports data</div>}
        </ChartSection>
      </div>
    </div>
  );
}
