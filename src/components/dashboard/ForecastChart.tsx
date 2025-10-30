import { useState } from "react";
import {
  LineChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ExplainabilityModal } from "./ExplainabilityModal";
import { generateForecastData, getConfidenceInterval } from "@/lib/mockData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export const ForecastChart = () => {
  const [showExplainability, setShowExplainability] = useState(false);
  const [serviceType, setServiceType] = useState("compute");
  const [region, setRegion] = useState("all");
  
  const rawData = generateForecastData();
  
  // Add confidence intervals
  const data = rawData.map(point => {
    const ci = getConfidenceInterval(point.forecast);
    return {
      ...point,
      upper: ci.upper,
      lower: ci.lower,
    };
  });

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const actual = payload.find((p: any) => p.dataKey === "actual")?.value || 0;
      const forecast = payload.find((p: any) => p.dataKey === "forecast")?.value || 0;
      const delta = actual - forecast;
      const deltaPercent = ((delta / forecast) * 100).toFixed(1);

      return (
        <div className="bg-card border rounded-lg p-3 shadow-lg">
          <p className="font-semibold text-sm mb-2">{label}</p>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between gap-4">
              <span className="text-chart-1">Actual:</span>
              <span className="font-medium">{actual.toLocaleString()}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-chart-2">Forecast:</span>
              <span className="font-medium">{forecast.toLocaleString()}</span>
            </div>
            <div className="flex justify-between gap-4 pt-1 border-t">
              <span className={delta >= 0 ? "text-success" : "text-destructive"}>
                Delta:
              </span>
              <span className="font-medium">
                {delta >= 0 ? "+" : ""}
                {delta.toLocaleString()} ({deltaPercent}%)
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <Card className="animate-fade-in">
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Historical & Forecast Trends
              </CardTitle>
              <CardDescription>
                Demand patterns with 95% confidence interval
              </CardDescription>
            </div>
            
            <div className="flex items-center gap-2 flex-wrap">
              <Select value={serviceType} onValueChange={setServiceType}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="compute">Compute</SelectItem>
                  <SelectItem value="storage">Storage</SelectItem>
                </SelectContent>
              </Select>

              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="All Regions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="west-us-2">West US 2</SelectItem>
                  <SelectItem value="east-us">East US</SelectItem>
                  <SelectItem value="north-europe">North Europe</SelectItem>
                </SelectContent>
              </Select>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowExplainability(true)}
                className="gap-2"
              >
                <Lightbulb className="h-4 w-4" />
                Explain
              </Button>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="outline" className="bg-chart-1/10 text-chart-1 border-chart-1/30">
              {serviceType === "compute" ? "Compute Demand" : "Storage Demand"}
            </Badge>
            {region !== "all" && (
              <Badge variant="outline">
                {region.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <defs>
                <linearGradient id="confidenceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-confidence))" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="hsl(var(--chart-confidence))" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11 }}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return `${date.getMonth() + 1}/${date.getDate()}`;
                }}
              />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              
              {/* Confidence Interval Band */}
              <Area
                type="monotone"
                dataKey="upper"
                stroke="none"
                fill="url(#confidenceGradient)"
                name="95% Confidence Interval"
                fillOpacity={1}
              />
              <Area
                type="monotone"
                dataKey="lower"
                stroke="none"
                fill="hsl(var(--background))"
                fillOpacity={1}
              />
              
              {/* Forecast Line */}
              <Line
                type="monotone"
                dataKey="forecast"
                stroke="hsl(var(--chart-2))"
                strokeWidth={2.5}
                strokeDasharray="5 5"
                dot={false}
                name="Forecasted Demand"
              />
              
              {/* Actual Usage Line */}
              <Line
                type="monotone"
                dataKey="actual"
                stroke="hsl(var(--chart-1))"
                strokeWidth={2.5}
                dot={false}
                name="Actual Usage"
              />
              
              <Brush
                dataKey="date"
                height={30}
                stroke="hsl(var(--primary))"
                fill="hsl(var(--muted))"
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return `${date.getMonth() + 1}/${date.getDate()}`;
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <ExplainabilityModal
        open={showExplainability}
        onOpenChange={setShowExplainability}
      />
    </>
  );
};
