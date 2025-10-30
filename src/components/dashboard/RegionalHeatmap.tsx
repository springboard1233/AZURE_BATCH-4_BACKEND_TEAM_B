import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockRegionData } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const RegionalHeatmap = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const handleRegionClick = (region: string) => {
    setSelectedRegion(region);
    toast.success(`Filtered to ${region}`, {
      description: "All dashboard data has been updated to show this region only.",
    });
  };

  const getRiskColor = (risk: string, isSelected: boolean) => {
    const baseColors = {
      low: "bg-success/20 border-success/50 hover:bg-success/30",
      moderate: "bg-warning/20 border-warning/50 hover:bg-warning/30",
      high: "bg-destructive/20 border-destructive/50 hover:bg-destructive/30",
    };

    const selectedColors = {
      low: "bg-success/40 border-success ring-2 ring-success",
      moderate: "bg-warning/40 border-warning ring-2 ring-warning",
      high: "bg-destructive/40 border-destructive ring-2 ring-destructive",
    };

    return isSelected
      ? selectedColors[risk as keyof typeof selectedColors]
      : baseColors[risk as keyof typeof baseColors];
  };

  // Calculate size based on total capacity
  const getSize = (compute: number, storage: number) => {
    const total = compute + storage;
    if (total > 2000) return "col-span-2 row-span-2";
    if (total > 1500) return "col-span-2";
    return "";
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Regional Capacity Heatmap</CardTitle>
        <CardDescription>
          Click on a region to filter dashboard data. Size indicates total capacity, color shows risk level.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-3 auto-rows-fr">
          {mockRegionData.map((region) => {
            const isSelected = selectedRegion === region.region;
            const total = region.compute + region.storage;

            return (
              <div
                key={region.region}
                className={cn(
                  "border-2 rounded-lg p-4 cursor-pointer transition-all",
                  getRiskColor(region.risk, isSelected),
                  getSize(region.compute, region.storage)
                )}
                onClick={() => handleRegionClick(region.region)}
              >
                <div className="h-full flex flex-col justify-between">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">{region.region}</h4>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Compute:</span>
                        <span className="font-medium">{region.compute}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Storage:</span>
                        <span className="font-medium">{region.storage}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-current/20">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-medium uppercase">{region.risk} Risk</span>
                      <span
                        className={cn(
                          "font-semibold",
                          region.delta >= 0 ? "text-destructive" : "text-success"
                        )}
                      >
                        {region.delta >= 0 ? "+" : ""}
                        {region.delta}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {selectedRegion && (
          <div className="mt-4 p-3 bg-muted rounded-lg">
            <p className="text-sm">
              <span className="font-medium">Active Filter:</span> {selectedRegion}
              <button
                onClick={() => setSelectedRegion(null)}
                className="ml-2 text-primary hover:underline"
              >
                Clear
              </button>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
