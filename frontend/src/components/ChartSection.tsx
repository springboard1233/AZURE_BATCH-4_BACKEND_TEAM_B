import React from "react";

export default function ChartSection({ title, description, children }: { title: string; description?: string; children?: React.ReactNode }) {
  return (
    <section className="section">
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      <div style={{ height: 320 }}>{children}</div>
    </section>
  );
}
