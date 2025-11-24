import React, { useEffect, useState } from "react";
import api from "../services/api";
import ChartSection from "../components/ChartSection";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

export default function UsageTrendsPage() {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => { (async ()=> setData(await api.getUsageTrends()))(); }, []);
  return (
    <div>
      <h2 className="page-title">Usage Trends</h2>
      <ChartSection title="Monthly CPU Usage" description="CPU usage per month.">
        {data.length ? (
          <ResponsiveContainer>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="cpu" stroke="#00A8FF" />
            </LineChart>
          </ResponsiveContainer>
        ) : <div className="center small-muted">No usage data</div>}
      </ChartSection>
    </div>
  );
}
