import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from "recharts";
import { getTopFeatures } from "@/lib/mockData";
import { TrendingUp, TrendingDown } from "lucide-react";

export const FeatureImportanceChart = () => {
  const features = getTopFeatures();

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card border rounded-lg p-3 shadow-lg">
          <p className="font-semibold text-sm mb-1">{data.name}</p>
          <p className="text-xs text-muted-foreground">
            Impact: <span className={data.value > 0 ? "text-success" : "text-destructive"}>
              {data.value > 0 ? "+" : ""}{data.value}%
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">🧠</span>
          Feature Importance (XAI)
        </CardTitle>
        <CardDescription>
          Top factors influencing the current forecast
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={features} layout="vertical" margin={{ left: 100, right: 30 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              type="number" 
              tick={{ fontSize: 12 }}
              label={{ value: 'Impact (%)', position: 'bottom', offset: 0 }}
            />
            <YAxis 
              type="category" 
              dataKey="name" 
              tick={{ fontSize: 12 }}
              width={90}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine x={0} stroke="hsl(var(--muted-foreground))" strokeWidth={2} />
            <Bar dataKey="value" radius={[0, 8, 8, 0]}>
              {features.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`}
                  fill={entry.value > 0 ? "hsl(var(--success))" : "hsl(var(--destructive))"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        
        <div className="mt-4 space-y-2">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                {feature.value > 0 ? (
                  <TrendingUp className="h-4 w-4 text-success" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-destructive" />
                )}
                <span>{feature.name}</span>
              </div>
              <span className={feature.value > 0 ? "text-success font-medium" : "text-destructive font-medium"}>
                {feature.value > 0 ? "+" : ""}{feature.value}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
