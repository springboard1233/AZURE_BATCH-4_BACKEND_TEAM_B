import React, { useEffect, useState } from "react";
import api from "../services/api";
import ChartSection from "../components/ChartSection";
import { DataTable } from "../components/DataTable";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

export default function FeatureAnalysis() {
  const [data, setData] = useState<Record<string, any>[]>([]);
  const [numericKey, setNumericKey] = useState<string | null>(null);
  const [xKey, setXKey] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const rows = await api.getFeatures();
      setData(rows);

      if (rows && rows.length) {
        const sample = rows[0];
        const keys = Object.keys(sample);
        // choose first date-like and first numeric
        const maybeX = keys.find(k => /date|day|time/i.test(k)) || keys[0];
        const maybeNum = keys.find(k => typeof sample[k] === "number");
        setXKey(maybeX || keys[0]);
        setNumericKey(maybeNum || null);
      }
    })();
  }, []);

  return (
    <div>
      <h2 className="page-title">Feature Analysis</h2>

      <div style={{ display: "grid", gap: 18 }}>
        <ChartSection title="Feature Preview Table" description="Preview of the processed dataset">
          <div style={{ overflow: "auto", maxHeight: 360 }}>
            <DataTable data={data} maxRows={15}/>
          </div>
        </ChartSection>

        <ChartSection title="Sample Feature Trend" description={`Plotting ${numericKey ?? "numeric"} over ${xKey ?? "index"}`}>
          {numericKey && data.length ? (
            <ResponsiveContainer>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={xKey as string} />
                <YAxis />
                <Tooltip />
                <Line dataKey={numericKey} stroke="#00A8FF" />
              </LineChart>
            </ResponsiveContainer>
          ) : <div className="center small-muted">Not enough numeric data to plot.</div>}
        </ChartSection>
      </div>
    </div>
  );
}
