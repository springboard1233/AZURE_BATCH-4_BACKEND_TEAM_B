import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function LayoutWrapper() {
  const [isDark, setIsDark] = useState<boolean>(() => !!document.documentElement.classList.contains("dark"));

  useEffect(() => {
    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isDark]);

  return (
    <div style={{ display: "flex", width: "100%" }}>
      <Sidebar />
      <div className="content-wrap">
        <div className="content-inner">
          <Header isDark={isDark} onToggleTheme={() => setIsDark((v) => !v)} />
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
