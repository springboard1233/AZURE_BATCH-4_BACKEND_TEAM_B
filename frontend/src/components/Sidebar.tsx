import React from "react";
import { NavLink } from "react-router-dom";
import { Home, TrendingUp, PieChart, Network, FileText } from "lucide-react";

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
        <div className="title">Azure Demand</div>
      </div>

      <nav className="menu" aria-label="Main menu">
        <ul>
          {items.map((it) => {
            const Icon = it.icon;
            return (
              <li key={it.to}>
                <NavLink to={it.to} end={it.to === "/"} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                  <Icon />
                  <span className="label">{it.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="toggle">
        <button
          onClick={() => {
            // small helper: collapse logic could be added later
            alert("Collapse feature not implemented — navigation links are clickable.");
          }}
          className="theme-toggle"
        >
          ◀
        </button>
      </div>
    </aside>
  );
}
