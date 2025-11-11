import React, { useEffect, useState } from "react";
import api from "../services/api";
import KPICard from "../components/KPICard";
import ChartSection from "../components/ChartSection";

export default function InsightsDashboardPage() {
  const [insights, setInsights] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      setLoading(true);
      setInsights(await api.getInsights());
      setLoading(false);
    })();
  }, []);

  const topRegions = insights?.top_regions_by_cpu_usage || insights?.top_regions || {};

  return (
    <div>
      <h2 className="page-title">Insights Dashboard</h2>

      {loading ? <div className="center small-muted">Loading insights...</div> : null}

      <div className="grid-kpis" style={{ marginBottom: 18 }}>
        <KPICard title="Avg Utilization" value={insights?.average_utilization_ratio ?? "—"} />
        <KPICard title="Avg Storage Eff." value={insights?.average_storage_efficiency ?? "—"} />
        <KPICard title="Peak Usage Date" value={insights?.peak_usage_date ?? "—"} />
        <KPICard title="Total Records" value={insights?.total_records ?? "—"} />
      </div>

      <div className="cards-grid">
        <ChartSection title="Top Regions (by avg CPU)">
          {topRegions && Object.keys(topRegions).length ? (
            <div style={{ padding: 12 }}>
              <ul>
                {Object.entries(topRegions).map(([r, v]) => (
                  <li key={r} style={{ marginBottom: 8 }}>
                    <strong>{r}:</strong> {Number(v).toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
          ) : <div className="center small-muted">No region data available.</div>}
        </ChartSection>

        <ChartSection title="Other Insights">
          <div style={{ padding: 12 }}>
            <p><strong>Highest temp day:</strong> {insights?.highest_temp_day ?? "—"}</p>
            <p className="small-muted">More advanced visualizations will be added in Milestone 3.</p>
          </div>
        </ChartSection>
      </div>
    </div>
  );
}
