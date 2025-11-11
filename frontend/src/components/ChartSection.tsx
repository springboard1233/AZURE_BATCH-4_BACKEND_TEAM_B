import React from "react";

export default function ChartSection({
  title,
  description,
  children
}: {
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="section" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h3 style={{ margin: 0 }}>{title}</h3>
          {description && <p style={{ margin: "6px 0 0", color: "var(--muted-foreground)" }}>{description}</p>}
        </div>
      </div>
      <div style={{ height: 320, width: "100%" }}>{children}</div>
    </section>
  );
}
