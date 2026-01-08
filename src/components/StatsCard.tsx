import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export const StatsCard = ({ title, value, icon: Icon, trend, className }: StatsCardProps) => {
  return (
    <div className={cn(
      "glass rounded-xl p-3 lg:p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/10 group",
      className
    )}>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="text-xs lg:text-sm text-muted-foreground mb-1 truncate">{title}</p>
          <p className="text-lg lg:text-2xl font-display font-bold text-foreground">{value}</p>
          {trend && (
            <p className={cn(
              "text-[10px] lg:text-xs mt-1 lg:mt-2 flex items-center gap-1",
              trend.isPositive ? "text-success" : "text-destructive"
            )}>
              <span>{trend.isPositive ? "↑" : "↓"}</span>
              <span className="hidden sm:inline">{Math.abs(trend.value)}% so với hôm qua</span>
              <span className="sm:hidden">{Math.abs(trend.value)}%</span>
            </p>
          )}
        </div>
        <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors shrink-0">
          <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
        </div>
      </div>
    </div>
  );
};
