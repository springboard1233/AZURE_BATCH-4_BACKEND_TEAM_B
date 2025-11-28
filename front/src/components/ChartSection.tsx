import { ReactNode } from "react";

interface ChartSectionProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function ChartSection({ title, description, children }: ChartSectionProps) {
  return (
    <div className="bg-card rounded-lg p-5 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
      <h2 className="mb-2">{title}</h2>
      <p className="opacity-80 mb-4">{description}</p>
      <div className="h-[250px]">{children}</div>
    </div>
  );
}
