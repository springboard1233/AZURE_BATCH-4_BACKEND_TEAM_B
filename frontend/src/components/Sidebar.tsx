import { NavLink } from "react-router-dom";
import { Home, TrendingUp, PieChart, Network, FileText } from "lucide-react";
import React from "react";

const items = [
  { to: "/", label: "Dashboard", icon: Home },
  { to: "/usage-trends", label: "Usage Trends", icon: TrendingUp },
  { to: "/forecast-insights", label: "Forecast Insights", icon: PieChart },
  { to: "/capacity-planning", label: "Capacity Planning", icon: Network },
  { to: "/reports", label: "Reports", icon: FileText },
  { to: "/feature-analysis", label: "Feature Analysis", icon: PieChart },
  { to: "/insights-dashboard", label: "Insights Dashboard", icon: TrendingUp }
];

export default function Sidebar() {
  return (
    <aside className="sidebar" role="navigation" aria-label="Main Sidebar">
      <div className="logo">
        <div className="cloud">☁</div>
        <div style={{ fontWeight: 700 }}>Azure Demand</div>
      </div>

      <nav className="menu">
        <ul>
          {items.map((it) => {
            const Icon = it.icon;
            return (
              <li key={it.to}>
                <NavLink
                  to={it.to}
                  end={it.to === "/"}
                  className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
                  style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", color: "inherit" }}
                >
                  <Icon />
                  <span className="label">{it.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="toggle">
        {/* small placeholder - could add collapse logic later */}
        <button className="theme-toggle" title="Toggle collapse" onClick={() => { /* left for future */ }}>
          ◀
        </button>
      </div>
    </aside>
  );
}
