import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, Target } from "lucide-react";
import { getCapExSavings, getCapExTarget } from "@/lib/mockData";
import { motion } from "framer-motion";

interface CapExModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CapExModal = ({ open, onOpenChange }: CapExModalProps) => {
  const savings = getCapExSavings();
  const target = getCapExTarget();
  const progress = (savings / target) * 100;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>CapEx Impact Report</DialogTitle>
          <DialogDescription>
            Capital expenditure savings and forecasting impact
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          {/* The $120M Challenge */}
          <Card className="border-primary/50 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                The $120M Challenge
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-primary">
                    ${savings.toFixed(1)}M
                  </span>
                  <span className="text-muted-foreground">/ ${target}M</span>
                </div>

                {/* Progress bar */}
                <div className="relative h-4 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-primary-glow"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                </div>

                <p className="text-sm text-muted-foreground">
                  You're {progress.toFixed(1)}% toward the annual CapEx savings goal!
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-success" />
                    Total Savings
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">
                  ${savings.toFixed(2)}M
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Year-to-date savings from accurate forecasting
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    Efficiency Gain
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  +{((savings / target) * 100 * 1.2).toFixed(1)}%
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Improvement vs. previous quarter
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Impact Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Savings Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Avoided over-provisioning</span>
                  <span className="font-semibold">$42.3M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Optimized under-provision response</span>
                  <span className="font-semibold">$28.7M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Resource reallocation</span>
                  <span className="font-semibold">$16.4M</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
