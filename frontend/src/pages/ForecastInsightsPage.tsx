import React, { useEffect, useState } from "react";
import api from "../services/api";
import ChartSection from "../components/ChartSection";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from "recharts";

export default function ForecastInsightsPage() {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => { (async ()=> setData(await api.getForecastInsights()))(); }, []);
  const colors = ["#0078FF","#4ECDC4","#FF6B6B","#FFD166"];
  return (
    <div>
      <h2 className="page-title">Forecast Insights</h2>
      <ChartSection title="Predicted Demand by Region">
        {data.length ? (
          <ResponsiveContainer>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="region" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="demand">
                {data.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : <div className="center small-muted">No forecast data</div>}
      </ChartSection>
    </div>
  );
}
