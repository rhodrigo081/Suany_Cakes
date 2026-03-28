import { type ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  iconBgColor: string;
}

export const StatsCard = ({ title, value, icon, iconBgColor }: StatsCardProps) => {
  return (
    <div className="bg-card-background p-6 rounded-2xl border border-border shadow-sm flex justify-between items-start w-full">
      <div>
        <p className="text-base font-medium text-accent-foreground mb-1">{title}</p>
        <h2 className="text-4xl font-bold text-foreground">{value}</h2>
      </div>
      <div className={`p-2 rounded-full ${iconBgColor}`}>
        {icon}
      </div>
    </div>
  );
};