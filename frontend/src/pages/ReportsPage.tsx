import React, { useEffect, useState } from "react";
import api from "../services/api";
import ChartSection from "../components/ChartSection";

export default function ReportsPage() {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => { (async ()=> setData(await api.getReportsInsights()))(); }, []);
  return (
    <div>
      <h2 className="page-title">Reports</h2>
      <ChartSection title="Reports Overview">
        {data.length ? (
          <div style={{ padding: 12 }}>
            <ul>
              {data.map((d,i)=>(<li key={i}><strong>{d.metric}</strong>: {d.score}</li>))}
            </ul>
          </div>
        ) : <div className="center small-muted">No reports data</div>}
      </ChartSection>
    </div>
  );
}
