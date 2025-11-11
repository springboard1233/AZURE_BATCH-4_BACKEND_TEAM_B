import React from "react";

type Props = {
  isDark: boolean;
  onToggleTheme: () => void;
};

export default function Header({ isDark, onToggleTheme }: Props) {
  return (
    <header className="header">
      <div className="left">
        <h1 style={{ margin: 0 }}>Azure Demand Forecasting</h1>
      </div>

      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <button className="theme-toggle" onClick={onToggleTheme}>
          {isDark ? "Light" : "Dark"}
        </button>
      </div>
    </header>
  );
}
