import { Moon, Sun } from "lucide-react";

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

export function Header({ isDark, onToggleTheme }: HeaderProps) {
  return (
    <div className="flex justify-between items-center bg-card px-6 py-5 sticky top-0 border-b border-border z-10">
      <h1 className="text-3xl font-extrabold text-primary">
        Azure Demand Forecasting Dashboard
      </h1>
      <button
        onClick={onToggleTheme}
        className="flex items-center gap-2 border border-primary text-primary px-3 py-1 rounded-md hover:bg-primary hover:text-primary-foreground transition-all duration-300"
      >
        {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        <span>{isDark ? "Light" : "Dark"}</span>
      </button>
    </div>
  );
}
