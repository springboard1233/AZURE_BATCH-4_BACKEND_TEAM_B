import { useState } from "react";
import { Calendar, HelpCircle, User, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AccuracyScoreRing } from "./AccuracyScoreRing";
import { getAccuracyScore } from "@/lib/mockData";

export const DashboardHeader = () => {
  const [dateRange, setDateRange] = useState("last-30-days");
  const [region, setRegion] = useState("all");
  const [serviceType, setServiceType] = useState("all");
  const { theme, setTheme } = useTheme();

  const accuracyScore = getAccuracyScore();

  const getStatusColor = (value: number, thresholds: [number, number]) => {
    if (value >= thresholds[1]) return "hsl(var(--success))";
    if (value >= thresholds[0]) return "hsl(var(--warning))";
    return "hsl(var(--destructive))";
  };

  return (
    <header className="border-b bg-card px-6 py-4 shadow-sm sticky top-0 z-50 backdrop-blur-sm bg-card/95">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-6">
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary via-secondary to-primary-glow bg-clip-text text-transparent">
              Azure Capacity Command Center
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Intelligent Forecasting & CapEx Optimization
            </p>
          </div>

          {/* Color-coded Status Rings */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center relative"
                style={{ 
                  border: `3px solid ${getStatusColor(98, [90, 95])}`,
                  background: `linear-gradient(135deg, ${getStatusColor(98, [90, 95])}15, transparent)`
                }}
              >
                <span className="text-xs font-bold">98</span>
              </div>
              <span className="text-xs text-muted-foreground">Accuracy</span>
            </div>
            
            <div className="flex items-center gap-1.5">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center relative"
                style={{ 
                  border: `3px solid ${getStatusColor(75, [60, 70])}`,
                  background: `linear-gradient(135deg, ${getStatusColor(75, [60, 70])}15, transparent)`
                }}
              >
                <span className="text-xs font-bold">75</span>
              </div>
              <span className="text-xs text-muted-foreground">CPU</span>
            </div>
            
            <div className="flex items-center gap-1.5">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center relative"
                style={{ 
                  border: `3px solid ${getStatusColor(92, [80, 90])}`,
                  background: `linear-gradient(135deg, ${getStatusColor(92, [80, 90])}15, transparent)`
                }}
              >
                <span className="text-xs font-bold">92</span>
              </div>
              <span className="text-xs text-muted-foreground">Cost Eff</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Filters */}
          <div className="flex items-center gap-2">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-40">
                <Calendar className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                <SelectItem value="last-90-days">Last 90 Days</SelectItem>
                <SelectItem value="last-year">Last Year</SelectItem>
              </SelectContent>
            </Select>

            <Select value={region} onValueChange={setRegion}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Regions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="west-us-2">West US 2</SelectItem>
                <SelectItem value="east-us">East US</SelectItem>
                <SelectItem value="north-europe">North Europe</SelectItem>
                <SelectItem value="southeast-asia">Southeast Asia</SelectItem>
              </SelectContent>
            </Select>

            <Select value={serviceType} onValueChange={setServiceType}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Service Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Services</SelectItem>
                <SelectItem value="compute">Compute</SelectItem>
                <SelectItem value="storage">Storage</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Accuracy Score */}
          <div className="flex items-center gap-3 border-l pl-3">
            <AccuracyScoreRing score={accuracyScore} size={50} />
            <div>
              <p className="text-xs text-muted-foreground">Accuracy</p>
              <p className="text-xl font-bold">{accuracyScore}%</p>
            </div>
          </div>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="border-l pl-3"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          {/* Help & Profile */}
          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <HelpCircle className="h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>How to Use the Dashboard</DialogTitle>
                  <DialogDescription className="space-y-3 pt-4">
                    <p><strong>Forecast Accuracy Score:</strong> Your performance metric based on forecast precision. Higher is better!</p>
                    <p><strong>Filters:</strong> Use the date range, region, and service type filters to focus on specific data.</p>
                    <p><strong>Interactive Charts:</strong> Click and drag to zoom. Hover for detailed tooltips.</p>
                    <p><strong>Heatmap:</strong> Click regions to filter all dashboard data.</p>
                    <p><strong>Missions:</strong> Complete alerts to earn badges and improve your score.</p>
                    <p><strong>The $120M Challenge:</strong> Track your team's progress toward the annual CapEx savings goal.</p>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>

            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
