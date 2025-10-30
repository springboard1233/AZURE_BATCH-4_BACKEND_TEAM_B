import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { getProvisioningRisk } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { CapExModal } from "./CapExModal";

export const CapacityGauge = () => {
  const [showCapEx, setShowCapEx] = useState(false);
  const risk = getProvisioningRisk();

  const getRiskColor = () => {
    switch (risk) {
      case "low":
        return "bg-success";
      case "moderate":
        return "bg-warning";
      case "high":
        return "bg-destructive";
    }
  };

  const getRiskPercentage = () => {
    switch (risk) {
      case "low":
        return 25;
      case "moderate":
        return 55;
      case "high":
        return 85;
    }
  };

  return (
    <>
      <Card 
        className="animate-fade-in cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => setShowCapEx(true)}
      >
        <CardHeader>
          <CardTitle>Provisioning Risk Gauge</CardTitle>
          <CardDescription>
            Current capacity risk assessment - Click to drill down
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="relative w-64 h-32">
              {/* Gauge background */}
              <svg viewBox="0 0 200 100" className="w-full">
                {/* Background arc */}
                <path
                  d="M 20 80 A 80 80 0 0 1 180 80"
                  fill="none"
                  stroke="hsl(var(--muted))"
                  strokeWidth="20"
                  strokeLinecap="round"
                />
                
                {/* Colored segments */}
                <motion.path
                  d="M 20 80 A 80 80 0 0 1 100 10"
                  fill="none"
                  stroke="hsl(var(--success))"
                  strokeWidth="20"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
                <motion.path
                  d="M 100 10 A 80 80 0 0 1 180 80"
                  fill="none"
                  stroke="hsl(var(--warning))"
                  strokeWidth="20"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                />
                
                {/* Needle */}
                <motion.g
                  initial={{ rotate: -90 }}
                  animate={{ rotate: (getRiskPercentage() / 100) * 180 - 90 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  style={{ transformOrigin: "100px 80px" }}
                >
                  <line
                    x1="100"
                    y1="80"
                    x2="100"
                    y2="25"
                    stroke="hsl(var(--foreground))"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <circle cx="100" cy="80" r="6" fill="hsl(var(--foreground))" />
                </motion.g>
              </svg>

              {/* Risk label */}
              <div className="absolute inset-x-0 bottom-0 text-center">
                <div className={cn("inline-block px-4 py-2 rounded-full text-white font-semibold text-sm", getRiskColor())}>
                  {risk.toUpperCase()} RISK
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6 text-center">
            <div>
              <div className="text-2xl font-bold text-success">Low</div>
              <div className="text-xs text-muted-foreground">0-33%</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-warning">Moderate</div>
              <div className="text-xs text-muted-foreground">34-66%</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-destructive">High</div>
              <div className="text-xs text-muted-foreground">67-100%</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <CapExModal open={showCapEx} onOpenChange={setShowCapEx} />
    </>
  );
};
