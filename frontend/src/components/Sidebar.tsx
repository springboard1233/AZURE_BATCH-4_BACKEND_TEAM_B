import { Cloud, Home, TrendingUp, PieChart, Network, FileText } from "lucide-react";

interface SidebarProps {
  isExpanded: boolean;
  onToggle: () => void;
}

export function Sidebar({ isExpanded, onToggle }: SidebarProps) {
  const menuItems = [
    { icon: Home, label: "Overview" },
    { icon: TrendingUp, label: "Usage Trends" },
    { icon: PieChart, label: "Forecast Insights" },
    { icon: Network, label: "Capacity Planning" },
    { icon: FileText, label: "Reports" },
  ];

  return (
    <div
      onClick={onToggle}
      className={`${
        isExpanded ? "w-60" : "w-[70px]"
      } bg-primary text-primary-foreground flex flex-col items-start pt-5 transition-all duration-400 relative z-10 shadow-lg cursor-pointer`}
      style={{ boxShadow: "3px 0 8px rgba(0,0,0,0.3)" }}
    >
      <div className="flex items-center justify-center w-full mb-8">
        <Cloud className="w-6 h-6" />
      </div>
      <ul className="list-none w-full">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="flex items-center gap-4 px-5 py-3 transition-all duration-300 hover:bg-white/20 hover:pl-6"
          >
            <item.icon className="w-5 h-5 min-w-[25px]" />
            <span
              className={`${
                isExpanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
              } transition-all duration-300 whitespace-nowrap`}
            >
              {item.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
