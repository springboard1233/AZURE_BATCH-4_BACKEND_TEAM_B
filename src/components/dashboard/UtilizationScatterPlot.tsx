import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, ZAxis } from "recharts";
import { mockRegionData } from "@/lib/mockData";

export const UtilizationScatterPlot = () => {
  const scatterData = mockRegionData.map(region => ({
    region: region.region,
    allocated: region.compute + region.storage,
    utilized: (region.compute + region.storage) * (0.7 + Math.random() * 0.3), // Mock utilization
    risk: region.risk,
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const efficiencyNum = (data.utilized / data.allocated) * 100;
      const efficiency = efficiencyNum.toFixed(1);
      return (
        <div className="bg-card border rounded-lg p-3 shadow-lg">
          <p className="font-semibold text-sm mb-2">{data.region}</p>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Allocated:</span>
              <span className="font-medium">{data.allocated.toLocaleString()}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Utilized:</span>
              <span className="font-medium">{data.utilized.toFixed(0)}</span>
            </div>
            <div className="flex justify-between gap-4 pt-1 border-t">
              <span className="text-muted-foreground">Efficiency:</span>
              <span className={`font-medium ${
                efficiencyNum > 90 ? "text-success" : 
                efficiencyNum > 70 ? "text-warning" : "text-destructive"
              }`}>
                {efficiency}%
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const getColor = (risk: string) => {
    switch (risk) {
      case "low": return "hsl(var(--success))";
      case "moderate": return "hsl(var(--warning))";
      case "high": return "hsl(var(--destructive))";
      default: return "hsl(var(--primary))";
    }
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">📊</span>
          Utilization vs. Allocation
        </CardTitle>
        <CardDescription>
          Resource efficiency across regions - closer to diagonal = optimal
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              type="number" 
              dataKey="allocated" 
              name="Allocated Capacity"
              tick={{ fontSize: 12 }}
              label={{ value: 'Allocated Capacity', position: 'bottom', offset: 0 }}
            />
            <YAxis 
              type="number" 
              dataKey="utilized" 
              name="Actual Utilization"
              tick={{ fontSize: 12 }}
              label={{ value: 'Actual Utilization', angle: -90, position: 'left' }}
            />
            <ZAxis range={[100, 400]} />
            <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
            
            {/* Perfect utilization line (45-degree) */}
            <ReferenceLine 
              segment={[
                { x: 0, y: 0 }, 
                { x: Math.max(...scatterData.map(d => d.allocated)), y: Math.max(...scatterData.map(d => d.allocated)) }
              ]}
              stroke="hsl(var(--success))" 
              strokeWidth={2}
              strokeDasharray="5 5"
              label={{ value: 'Perfect Match', position: 'top' }}
            />
            
            {scatterData.map((entry, index) => (
              <Scatter
                key={`scatter-${index}`}
                data={[entry]}
                fill={getColor(entry.risk)}
                opacity={0.7}
              />
            ))}
          </ScatterChart>
        </ResponsiveContainer>
        
        <div className="mt-4 flex items-center justify-center gap-6 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ background: "hsl(var(--success))" }} />
            <span>Low Risk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ background: "hsl(var(--warning))" }} />
            <span>Moderate Risk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ background: "hsl(var(--destructive))" }} />
            <span>High Risk</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
