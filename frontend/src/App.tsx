import React from "react";
import { Routes, Route } from "react-router-dom";
import LayoutWrapper from "./components/Layout";
import DashboardPage from "./pages/DashboardPage";
import UsageTrendsPage from "./pages/UsageTrendsPage";
import ForecastInsightsPage from "./pages/ForecastInsightsPage";
import CapacityPlanningPage from "./pages/CapacityPlanningPage";
import FeatureAnalysis from "./pages/FeatureAnalysis";
import InsightsDashboard from "./pages/InsightsDashboardPage";
import ReportsPage from "./pages/ReportsPage";

export default function App() {
  return (
    <div className="app-root">
      <Routes>
        <Route element={<LayoutWrapper />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/usage-trends" element={<UsageTrendsPage />} />
          <Route path="/forecast-insights" element={<ForecastInsightsPage />} />
          <Route path="/capacity-planning" element={<CapacityPlanningPage />} />
          <Route path="/feature-analysis" element={<FeatureAnalysis />} />
          <Route path="/insights-dashboard" element={<InsightsDashboard />} />
          <Route path="/reports" element={<ReportsPage />} />
        </Route>
      </Routes>
    </div>
  );
}
