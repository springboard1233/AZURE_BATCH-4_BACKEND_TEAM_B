"use client"

import { useEffect, useState } from "react"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import KPICard from "@/components/dashboard/kpi-card"
import TrendChart from "@/components/dashboard/trend-chart"
import { 
  fetchKPIs, 
  fetchSparklines, 
  type KPIData, 
  type SparklineData,
  fetchRawData 
} from "@/lib/api"

import { Loader2, Download } from "lucide-react"

// Utility: Convert array → CSV for download
function toCSV(rows: any[]) {
  if (!rows.length) return ""
  const headers = Object.keys(rows[0])
  const csvRows = [
    headers.join(","),
    ...rows.map(r => headers.map(h => JSON.stringify(r[h] ?? "")).join(",")),
  ]
  return csvRows.join("\n")
}

export default function DashboardPage() {
  const [kpiData, setKpiData] = useState<KPIData | null>(null)
  const [sparklines, setSparklines] = useState<SparklineData | null>(null)

  const [rawData, setRawData] = useState<any[]>([])
  const [loadingRaw, setLoadingRaw] = useState(true)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Filters
  const [selectedRegions, setSelectedRegions] = useState<string[]>([])
  const [selectedResources, setSelectedResources] = useState<string[]>([])
  const [sortOption, setSortOption] = useState("Newest first")

  useEffect(() => {
    async function loadDashboardData() {
      try {
        setLoading(true)
        setError(null)

        const [kpis, trends] = await Promise.all([ fetchKPIs(), fetchSparklines() ])
        setKpiData(kpis)
        setSparklines(trends)
      } catch (err) {
        console.error("Failed to load dashboard data:", err)
        setError("Failed to load dashboard data. Make sure Flask backend is running.")
      } finally {
        setLoading(false)
      }
    }

    loadDashboardData()
  }, [])

  // Load Raw Data for Data Explorer
  useEffect(() => {
    async function loadRaw() {
      try {
        const data = await fetchRawData()
        setRawData(data)
      } catch (err) {
        console.error("Could not load raw data", err)
      } finally {
        setLoadingRaw(false)
      }
    }
    loadRaw()
  }, [])

  // ----------------------------------------------
  // LOADING & ERROR UI
  // ----------------------------------------------

  if (loading || loadingRaw) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-slate-400">Loading dashboard data...</p>
        </div>
      </div>
    )
  }

  if (error || !kpiData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-white mb-2">Connection Error</h2>
          <p className="text-slate-400 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  // -------------------------------------------------------------
  // DATA EXPLORER — Filtering + Sorting
  // -------------------------------------------------------------

  const filtered = rawData
    .filter(row => 
      (selectedRegions.length === 0 || selectedRegions.includes(row.region)) &&
      (selectedResources.length === 0 || selectedResources.includes(row.resource_type))
    )

  switch (sortOption) {
  case "Newest first":
    filtered.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    break

  case "Oldest first":
    filtered.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    )
    break

  case "Highest CPU":
    filtered.sort((a, b) => (b.usage_cpu ?? 0) - (a.usage_cpu ?? 0))
    break

  case "Highest Storage":
    filtered.sort((a, b) => (b.usage_storage ?? 0) - (a.usage_storage ?? 0))
    break

  case "Most Users":
    filtered.sort((a, b) => (b.users_active ?? 0) - (a.users_active ?? 0))
    break
}


  // -------------------------------------------------------------
  // PAGE UI — Now includes Data Explorer
  // -------------------------------------------------------------

  return (
    <div className="space-y-10">
      <DashboardHeader />

      {/* KPI SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <KPICard title="Peak CPU" value={`${kpiData.peak_cpu.toFixed(1)}%`} subtitle="Last 30 days" icon={<span className="text-2xl">📊</span>} />
        <KPICard title="Max Storage" value={`${Math.round(kpiData.max_storage)} GB`} subtitle="Peak usage" icon={<span className="text-2xl">💾</span>} />
        <KPICard title="Peak Users" value={kpiData.peak_users.toLocaleString()} subtitle="Concurrent" icon={<span className="text-2xl">👥</span>} />
        <KPICard title="Holiday Impact" value={`${kpiData.holiday_impact.percentage > 0 ? "+" : ""}${kpiData.holiday_impact.percentage.toFixed(1)}%`} subtitle="Expected load" icon={<span className="text-2xl">📅</span>} />
      </div>

      {/* SPARKLINES */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-white mb-6">30-Day Trends</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {sparklines && (
            <>
              <TrendChart 
                title="CPU Usage (%)" 
                type="cpu"
                data={sparklines.cpu_trend.map(d => ({ day: new Date(d.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }), value: d.usage_cpu }))}
              />
              <TrendChart 
                title="Storage Usage (GB)" 
                type="storage"
                data={sparklines.storage_trend.map(d => ({ day: new Date(d.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }), value: d.usage_storage }))}
              />
              <TrendChart 
                title="Active Users" 
                type="users"
                data={sparklines.users_trend.map(d => ({ day: new Date(d.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }), value: d.users_active }))}
              />
            </>
          )}
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 🗃 DATA EXPLORER SECTION (Fully Implemented) */}
      {/* ------------------------------------------------------------------ */}

      <div className="mt-12 bg-slate-900/60 border border-slate-800 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">🗃 Data Explorer</h2>
        <p className="text-slate-400 text-sm mb-6">
          Slice and export the unified Azure demand dataset by region & resource.
        </p>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Regions */}
          <div>
            <label className="text-slate-300 text-sm mb-1 block">Regions</label>
            <select 
              multiple 
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-slate-200"
              onChange={(e) =>
                setSelectedRegions(Array.from(e.target.selectedOptions).map(o => o.value))
              }
            >
              {[...new Set(rawData.map(r => r.region))].map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>

          {/* Resource Types */}
          <div>
            <label className="text-slate-300 text-sm mb-1 block">Resource Types</label>
            <select 
              multiple 
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-slate-200"
              onChange={(e) =>
                setSelectedResources(Array.from(e.target.selectedOptions).map(o => o.value))
              }
            >
              {[...new Set(rawData.map(r => r.resource_type))].map(res => (
                <option key={res} value={res}>{res}</option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div>
            <label className="text-slate-300 text-sm mb-1 block">Sort By</label>
            <select
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-slate-200"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option>Newest first</option>
              <option>Oldest first</option>
              <option>Highest CPU</option>
              <option>Highest Storage</option>
              <option>Most Users</option>
            </select>
          </div>
        </div>

        {/* Filtered Count */}
        <p className="text-slate-400 text-sm mb-2">
          Showing <span className="text-blue-400 font-semibold">{filtered.length}</span> records
        </p>

        {/* DATA TABLE */}
        <div className="overflow-auto max-h-[400px] border border-slate-700 rounded-lg">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-800 text-slate-300">
              <tr>
                <th className="p-2">Date</th>
                <th className="p-2">Region</th>
                <th className="p-2">Resource</th>
                <th className="p-2">CPU</th>
                <th className="p-2">Storage</th>
                <th className="p-2">Users</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, i) => (
                <tr key={i} className="border-t border-slate-700 text-slate-300">
                  <td className="p-2">{row.date}</td>
                  <td className="p-2">{row.region}</td>
                  <td className="p-2">{row.resource_type}</td>
                  <td className="p-2">{row.usage_cpu}</td>
                  <td className="p-2">{row.usage_storage}</td>
                  <td className="p-2">{row.users_active}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
          <div className="bg-slate-800/60 p-4 rounded-lg text-center">
            <p className="text-slate-400 text-sm">Avg CPU</p>
            <p className="text-blue-400 font-bold text-xl">
              {filtered.length ? (filtered.reduce((a,b)=>a+b.usage_cpu,0)/filtered.length).toFixed(1) : "--"}%
            </p>
          </div>

          <div className="bg-slate-800/60 p-4 rounded-lg text-center">
            <p className="text-slate-400 text-sm">Peak Storage</p>
            <p className="text-cyan-400 font-bold text-xl">
              {filtered.length ? Math.max(...filtered.map(f => f.usage_storage)) : "--"} GB
            </p>
          </div>

          <div className="bg-slate-800/60 p-4 rounded-lg text-center">
            <p className="text-slate-400 text-sm">Total Users</p>
            <p className="text-purple-400 font-bold text-xl">
              {filtered.length ? filtered.reduce((a,b)=>a+b.users_active,0).toLocaleString() : "--"}
            </p>
          </div>

          <div className="bg-slate-800/60 p-4 rounded-lg text-center">
            <p className="text-slate-400 text-sm">Regions Shown</p>
            <p className="text-green-400 font-bold text-xl">
              {new Set(filtered.map(f => f.region)).size}
            </p>
          </div>
        </div>

        {/* Download Button */}
        <button
          onClick={() => {
            const csv = toCSV(filtered)
            const blob = new Blob([csv], { type: "text/csv" })
            const link = document.createElement("a")
            link.href = URL.createObjectURL(blob)
            link.download = "data_explorer.csv"
            link.click()
          }}
          className="mt-6 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-lg text-white"
        >
          <Download className="w-4 h-4" /> Download CSV
        </button>
      </div>

      {/* FINAL SUMMARY BLOCK */}
      <div className="mt-8 p-6 bg-slate-900/50 border border-slate-800 rounded-xl">
        <h3 className="text-lg font-semibold text-white mb-4">Data Coverage</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-3xl font-bold text-blue-400">{kpiData.total_regions}</p>
            <p className="text-sm text-slate-400 mt-1">Regions</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-cyan-400">{kpiData.total_resource_types}</p>
            <p className="text-sm text-slate-400 mt-1">Resource Types</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-purple-400">{kpiData.data_points.toLocaleString()}</p>
            <p className="text-sm text-slate-400 mt-1">Data Points</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-green-400">{kpiData.date_range.days}</p>
            <p className="text-sm text-slate-400 mt-1">Days Span</p>
          </div>
        </div>
      </div>

    </div>
  )
}
