import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockAlerts } from "@/lib/mockData";
import { AlertTriangle, CheckCircle2, TrendingUp, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const CapacityNudges = () => {
  const { toast } = useToast();
  const activeNudges = mockAlerts.filter(alert => !alert.completed).slice(0, 3);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "destructive";
      case "medium": return "warning";
      case "low": return "success";
      default: return "secondary";
    }
  };

  const handleTakeAction = (nudge: any) => {
    toast({
      title: "Action Initiated",
      description: `Processing recommendation for ${nudge.region}...`,
    });
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Proactive Capacity Nudges
        </CardTitle>
        <CardDescription>
          AI-powered recommendations to optimize capacity
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {activeNudges.map((nudge) => (
          <div 
            key={nudge.id}
            className="p-4 rounded-lg border bg-gradient-to-r from-card to-accent/20 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-start gap-3">
              <div className="mt-1">
                {nudge.severity === "high" ? (
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                ) : (
                  <CheckCircle2 className="h-5 w-5 text-warning" />
                )}
              </div>
              
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {nudge.region}
                  </Badge>
                  <Badge variant={getSeverityColor(nudge.severity) as any} className="text-xs">
                    {nudge.severity.toUpperCase()}
                  </Badge>
                </div>
                
                <p className="text-sm text-foreground">
                  {nudge.message}
                </p>
                
                <div className="flex items-center gap-2">
                  <Button 
                    size="sm" 
                    variant="default"
                    onClick={() => handleTakeAction(nudge)}
                    className="group"
                  >
                    Take Action
                    <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {activeNudges.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <CheckCircle2 className="h-12 w-12 mx-auto mb-3 text-success" />
            <p>All systems optimal! No immediate actions required.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
