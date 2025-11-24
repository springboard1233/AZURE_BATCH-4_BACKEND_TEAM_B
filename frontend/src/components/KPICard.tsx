import React from "react";

export default function KPICard({ title, value, suffix }: { title: string; value: string | number; suffix?: string }) {
  return (
    <div className="kpi-card">
      <div style={{ color: "var(--muted-foreground)", fontSize: 13 }}>{title}</div>
      <div className="num">{value}{suffix ?? ""}</div>
    </div>
  );
}
