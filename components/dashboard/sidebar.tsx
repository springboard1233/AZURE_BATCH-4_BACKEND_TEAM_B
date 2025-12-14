"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

const navigationItems = [
  { label: "Dashboard", icon: "📊", href: "/" },
  { label: "Forecasting", icon: "📈", href: "/forecasting" },
  { label: "Capacity Planning", icon: "🧮", href: "/capacity-planning" },
  { label: "Regional Insights", icon: "🌍", href: "/regional" },
  { label: "Resource Trends", icon: "⚙️", href: "/resources" },
  { label: "User Activity", icon: "👥", href: "/user-activity" },
  { label: "Multi-Region Compare", icon: "🗺️", href: "/multi-region" },
  { label: "Compare Models", icon: "🌎", href: "/compare" },
  { label: "Alerts", icon: "🚨", href: "/alerts" },
  { label: "Chatbot", icon: "💬", href: "/chatbot" },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
      {/* Logo Section */}
      <Link href="/" className="p-6 border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <div>
            <h1 className="text-white font-bold">Azure</h1>
            <p className="text-xs text-slate-400">Forecasting</p>
          </div>
        </div>
      </Link>

      {/* Navigation Menu */}
      <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
        {navigationItems.map((item) => (
          <Link
            href={item.href}
            key={item.label}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium ${
              pathname === item.href || (pathname === '/' && item.href === '/')
                ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="truncate">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800">
        <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white hover:opacity-90" size="sm">
          Settings
        </Button>
      </div>
    </aside>
  )
}
