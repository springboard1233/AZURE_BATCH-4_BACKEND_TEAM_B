import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TrendingUp, TrendingDown } from "lucide-react";
import { getTopFeatures } from "@/lib/mockData";

interface ExplainabilityModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ExplainabilityModal = ({ open, onOpenChange }: ExplainabilityModalProps) => {
  const features = getTopFeatures();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Model Explainability</DialogTitle>
          <DialogDescription>
            Top 3 features driving the current forecast
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border"
            >
              <div className="flex items-center gap-3">
                {feature.impact === "↑" ? (
                  <TrendingUp className="h-5 w-5 text-success" />
                ) : (
                  <TrendingDown className="h-5 w-5 text-destructive" />
                )}
                <span className="font-medium">{feature.name}</span>
              </div>
              <div className="text-right">
                <span
                  className={
                    feature.impact === "↑"
                      ? "text-success font-semibold"
                      : "text-destructive font-semibold"
                  }
                >
                  {feature.value}
                </span>
              </div>
            </div>
          ))}

          <div className="pt-2 text-sm text-muted-foreground">
            <p>
              The model analyzes historical patterns, economic indicators, seasonal trends,
              and external market factors to generate accurate capacity forecasts.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
