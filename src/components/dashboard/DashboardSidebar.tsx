import { BarChart3, Target, TrendingUp, AlertCircle, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { mockAlerts } from "@/lib/mockData";

interface DashboardSidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export const DashboardSidebar = ({ activeView, onViewChange }: DashboardSidebarProps) => {
  const navItems = [
    { id: "trends", label: "Usage Trends", icon: TrendingUp },
    { id: "forecast", label: "Forecast Missions", icon: Target },
    { id: "capex", label: "CapEx Impact", icon: Trophy },
  ];

  const activeAlerts = mockAlerts.filter(a => !a.completed && a.severity === "high").length;

  return (
    <aside className="w-64 border-r bg-sidebar flex flex-col">
      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Quick Status */}
      <div className="px-4 py-3 border-t border-sidebar-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-sidebar-foreground">Quick Status</span>
          {activeAlerts > 0 && (
            <Badge variant="destructive" className="h-5">
              {activeAlerts}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2 text-xs text-sidebar-foreground/70">
          <AlertCircle className="h-4 w-4 text-destructive" />
          <span>{activeAlerts} High Priority Alerts</span>
        </div>
      </div>

      {/* Alerts Feed */}
      <div className="flex-1 px-4 py-3 border-t border-sidebar-border">
        <h3 className="text-sm font-medium text-sidebar-foreground mb-3">
          Active Missions
        </h3>
        <ScrollArea className="h-[calc(100vh-400px)]">
          <div className="space-y-3">
            {mockAlerts
              .filter(a => !a.completed)
              .map((alert) => (
                <div
                  key={alert.id}
                  className={cn(
                    "p-3 rounded-lg border transition-colors cursor-pointer",
                    alert.severity === "high"
                      ? "border-destructive/50 bg-destructive/5"
                      : alert.severity === "medium"
                      ? "border-warning/50 bg-warning/5"
                      : "border-success/50 bg-success/5"
                  )}
                >
                  <div className="flex items-start gap-2">
                    <AlertCircle
                      className={cn(
                        "h-4 w-4 mt-0.5",
                        alert.severity === "high"
                          ? "text-destructive"
                          : alert.severity === "medium"
                          ? "text-warning"
                          : "text-success"
                      )}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-sidebar-foreground">
                        {alert.region}
                      </p>
                      <p className="text-xs text-sidebar-foreground/70 mt-1 line-clamp-2">
                        {alert.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </ScrollArea>
      </div>
    </aside>
  );
};
