import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  className?: string;
}

export function StatsCard({ title, value, change, changeType, icon: Icon, className }: StatsCardProps) {
  return (
    <Card className={cn("bg-gradient-card border-border shadow-card hover:shadow-glow transition-all duration-200", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-center space-x-2">
              <p className="text-2xl font-bold text-foreground">{value}</p>
              <span className={cn(
                "text-xs font-medium px-2 py-1 rounded-full",
                changeType === 'positive' && "bg-success/10 text-success",
                changeType === 'negative' && "bg-destructive/10 text-destructive",
                changeType === 'neutral' && "bg-muted text-muted-foreground"
              )}>
                {change}
              </span>
            </div>
          </div>
          <div className="p-3 bg-primary/10 rounded-lg">
            <Icon className="w-6 h-6 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}