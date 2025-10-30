import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Medal, Award } from "lucide-react";
import { mockLeaderboard } from "@/lib/mockData";
import { cn } from "@/lib/utils";

export const Leaderboard = () => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-warning" />;
      case 2:
        return <Medal className="h-5 w-5 text-muted-foreground" />;
      case 3:
        return <Award className="h-5 w-5 text-warning/60" />;
      default:
        return <div className="w-5 h-5 flex items-center justify-center text-xs font-bold">{rank}</div>;
    }
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Savings Leaderboard</CardTitle>
        <CardDescription>
          Top performers by CapEx savings attributed to accurate forecasting
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockLeaderboard.map((entry, index) => (
            <div
              key={entry.rank}
              className={cn(
                "flex items-center gap-4 p-3 rounded-lg border transition-all",
                entry.rank === 1
                  ? "bg-warning/10 border-warning/50"
                  : "bg-muted/30 hover:bg-muted/50"
              )}
            >
              <div className="flex items-center justify-center w-8">
                {getRankIcon(entry.rank)}
              </div>

              <div className="flex-1">
                <p className="font-semibold">{entry.name}</p>
                <p className="text-xs text-muted-foreground">
                  Accuracy Score: {entry.score}%
                </p>
              </div>

              <div className="text-right">
                <p className="font-bold text-success">
                  ${(entry.savings / 1000000).toFixed(1)}M
                </p>
                <p className="text-xs text-muted-foreground">saved</p>
              </div>
            </div>
          ))}
        </div>

        {/* Badge showcase */}
        <div className="mt-6 pt-4 border-t">
          <p className="text-sm font-medium mb-3">Available Badges</p>
          <div className="flex gap-2 flex-wrap">
            <div className="px-3 py-1 rounded-full bg-success/10 text-success text-xs font-medium border border-success/20">
              🏆 Forecast Hero
            </div>
            <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20">
              🎯 Mission Complete
            </div>
            <div className="px-3 py-1 rounded-full bg-warning/10 text-warning text-xs font-medium border border-warning/20">
              ⚡ Quick Responder
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
