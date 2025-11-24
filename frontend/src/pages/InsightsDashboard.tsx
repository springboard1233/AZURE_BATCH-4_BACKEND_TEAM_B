// src/pages/InsightsDashboard.tsx
import { useEffect, useState } from "react";
import { Globe, Target, Cpu, DollarSign } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts";
import { ChartSection } from "../components/ChartSection";
import { KPICard } from "../components/KPICard";
import api from "../services/api";

export default function InsightsDashboard() {
  const [insights, setInsights] = useState<Record<string, any> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.getInsights();
        setInsights(res || null);
      } catch (err) {
        console.error("Error fetching insights:", err);
        setError("Failed to load insights.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const kpis = insights?.kpis || insights?.KPIs || insights?.metrics || null;
  const topRegions = insights?.top_regions || insights?.regions || insights?.top || [];
  const peakTimes = insights?.peak_times || insights?.peak || [];

  return (
    <div className="p-6">
      <h2 className="text-xl font-extrabold mb-4">Insights Dashboard</h2>

      {error && (
        <div className="mb-4 p-3 rounded bg-destructive/10 text-destructive">
          {error}
        </div>
      )}

      {/* KPI Row */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5 mb-6">
        <KPICard icon={Globe} title="Active Regions" value={kpis?.active_regions ?? kpis?.activeRegions ?? 0} />
        <KPICard icon={Target} title="Forecast Accuracy" value={Math.round(kpis?.forecast_accuracy ?? kpis?.accuracy ?? 0)} suffix="%" />
        <KPICard icon={Cpu} title="Avg. CPU Load" value={Math.round(kpis?.avg_cpu_load ?? kpis?.avgCpu ?? 0)} suffix="%" />
        <KPICard icon={DollarSign} title="Cost Efficiency" value={Math.round(kpis?.cost_efficiency ?? kpis?.costEfficiency ?? 0)} suffix="%" />
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(420px,1fr))] gap-6">
        <ChartSection
          title="Top Regions"
          description="Top regions contributing to demand growth (if available from insights)."
        >
          {loading ? (
            <div className="flex h-full items-center justify-center text-muted-foreground">Loading...</div>
          ) : topRegions && topRegions.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topRegions}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="region" stroke="currentColor" />
                <YAxis stroke="currentColor" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: 6,
                    color: "var(--foreground)",
                  }}
                />
                <Legend />
                <Bar dataKey="value" name="Growth" fill="#4ECDC4" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">No region data available.</div>
          )}
        </ChartSection>

        <ChartSection
          title="Peak Times Trend"
          description="Shows trends for peak demand times (if provided)."
        >
          {loading ? (
            <div className="flex h-full items-center justify-center text-muted-foreground">Loading...</div>
          ) : peakTimes && peakTimes.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={peakTimes}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="time" stroke="currentColor" />
                <YAxis stroke="currentColor" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: 6,
                    color: "var(--foreground)",
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#00A8FF" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">No peak time data available.</div>
          )}
        </ChartSection>
      </div>
    </div>
  );
}
