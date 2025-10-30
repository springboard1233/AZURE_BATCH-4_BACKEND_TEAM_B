import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { ForecastChart } from "@/components/dashboard/ForecastChart";
import { CapacityGauge } from "@/components/dashboard/CapacityGauge";
import { RegionalHeatmap } from "@/components/dashboard/RegionalHeatmap";
import { Leaderboard } from "@/components/dashboard/Leaderboard";
import { FeatureImportanceChart } from "@/components/dashboard/FeatureImportanceChart";
import { UtilizationScatterPlot } from "@/components/dashboard/UtilizationScatterPlot";
import { CapacityNudges } from "@/components/dashboard/CapacityNudges";
import { CapExSavingsMeter } from "@/components/dashboard/CapExSavingsMeter";

const Index = () => {
  const [activeView, setActiveView] = useState("forecast");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <DashboardHeader />
      
      <div className="flex flex-1 overflow-hidden">
        <DashboardSidebar activeView={activeView} onViewChange={setActiveView} />
        
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          {activeView === "forecast" && (
            <div className="space-y-4 max-w-[1800px] mx-auto">
              {/* Top Row - CapEx Savings + Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="lg:col-span-2">
                  <CapExSavingsMeter />
                </div>
                <div className="lg:col-span-2">
                  <CapacityGauge />
                </div>
              </div>

              {/* Main Chart - Full Width */}
              <ForecastChart />

              {/* Two Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <RegionalHeatmap />
                <CapacityNudges />
              </div>

              {/* Detailed Analytics */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <FeatureImportanceChart />
                <UtilizationScatterPlot />
              </div>

              {/* Leaderboard */}
              <Leaderboard />
            </div>
          )}

          {activeView === "trends" && (
            <div className="max-w-[1600px] mx-auto">
              <div className="text-center py-20">
                <h2 className="text-3xl font-bold mb-4">Usage Trends</h2>
                <p className="text-muted-foreground">
                  Historical usage trends view - Coming soon in Milestone 2
                </p>
              </div>
            </div>
          )}

          {activeView === "capex" && (
            <div className="max-w-[1600px] mx-auto">
              <div className="text-center py-20">
                <h2 className="text-3xl font-bold mb-4">CapEx Impact</h2>
                <p className="text-muted-foreground">
                  Detailed CapEx reports and analytics - Coming soon in Milestone 2
                </p>
              </div>
            </div>
          )}
        </main>
      </div>

      <footer className="border-t px-6 py-3 bg-card">
        <div className="flex items-center justify-between max-w-[1600px] mx-auto">
          <p className="text-sm text-muted-foreground">
            Last Updated: {new Date().toLocaleString()}
          </p>
          <a
            href="#"
            className="text-sm text-primary hover:underline"
          >
            Contact Support
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Index;
