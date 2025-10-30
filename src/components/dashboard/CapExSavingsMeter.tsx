import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { DollarSign, TrendingUp } from "lucide-react";
import { getCapExSavings, getCapExTarget } from "@/lib/mockData";

export const CapExSavingsMeter = () => {
  const [animatedSavings, setAnimatedSavings] = useState(0);
  const actualSavings = getCapExSavings();
  const target = getCapExTarget();
  const progress = (actualSavings / target) * 100;

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = actualSavings / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= actualSavings) {
        setAnimatedSavings(actualSavings);
        clearInterval(timer);
      } else {
        setAnimatedSavings(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [actualSavings]);

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-card via-card to-success/10 border-success/20">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-success/5 to-transparent animate-pulse" />
      
      <CardContent className="p-6 relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-success/20">
              <DollarSign className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">CapEx Saved YTD</p>
              <p className="text-xs text-success font-medium flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                The $120M Challenge
              </p>
            </div>
          </div>
        </div>

        <motion.div 
          className="mb-4"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold bg-gradient-to-r from-success to-success-glow bg-clip-text text-transparent">
              ${animatedSavings.toFixed(1)}M
            </span>
            <span className="text-xl text-muted-foreground">/ ${target}M</span>
          </div>
        </motion.div>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Progress</span>
            <span className="font-medium text-success">{progress.toFixed(1)}%</span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-success to-success-glow rounded-full relative"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 2, ease: "easeOut" }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
            </motion.div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground mt-3">
          {progress >= 100 
            ? "🎉 Target achieved! Outstanding performance!" 
            : `$${(target - actualSavings).toFixed(1)}M remaining to reach target`}
        </p>
      </CardContent>
    </Card>
  );
};
