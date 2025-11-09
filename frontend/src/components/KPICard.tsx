import { useEffect, useState } from "react";
import { LucideIcon } from "lucide-react";

interface KPICardProps {
  icon: LucideIcon;
  title: string;
  value: number;
  suffix?: string;
  duration?: number;
}

export function KPICard({ icon: Icon, title, value, suffix = "", duration = 1000 }: KPICardProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setDisplayValue(Math.floor(progress * value));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [value, duration]);

  return (
    <div className="bg-card rounded-lg p-5 flex items-center gap-4 shadow-md hover:shadow-xl hover:scale-105 hover:bg-accent/5 transition-all duration-300 cursor-pointer">
      <Icon className="w-7 h-7 text-accent" />
      <div>
        <h3 className="opacity-80">{title}</h3>
        <span>
          {displayValue}
          {suffix}
        </span>
      </div>
    </div>
  );
}
