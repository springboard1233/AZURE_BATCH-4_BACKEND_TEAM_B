import React, { useEffect, useState } from "react";
import api from "../services/api";
import ChartSection from "../components/ChartSection";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

export default function CapacityPlanningPage() {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => { (async ()=> setData(await api.getCapacityPlanning()))(); }, []);
  const colors = ["#4ECDC4","#FF6B6B","#FFD166","#A178DF","#0078FF","#FF9F1C"];
  return (
    <div>
      <h2 className="page-title">Capacity Planning</h2>
      <ChartSection title="Capacity Distribution">
        {data.length ? (
          <ResponsiveContainer>
            <PieChart>
              <Pie dataKey="value" data={data} innerRadius={60} outerRadius={100} paddingAngle={4}>
                {data.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        ) : <div className="center small-muted">No capacity data</div>}
      </ChartSection>
    </div>
  );
}
