"use client"

import { useEffect, useState } from "react"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import {
  fetchCapacityPlanning,
  fetchFilterOptions,
  fetchRawData,
  type CapacityPlanItem,
  type RawDataPoint,
} from "@/lib/api"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"
import { Loader2 } from "lucide-react"

export default function CapacityPlanningPage() {
  const [regions, setRegions] = useState<string[]>([])
  const [services, setServices] = useState<string[]>([])
  const [rawData, setRawData] = useState<RawDataPoint[]>([])

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<CapacityPlanItem[] | null>(null)

  const [params, setParams] = useState({
    region: "All regions",
    service: "",
    horizon: 30,
  })

  useEffect(() => {
    async function loadOptions() {
      try {
        const [options, raw] = await Promise.all([
          fetchFilterOptions(),
          fetchRawData(),
        ])

        setRegions(options.regions)
        setServices(options.resource_types)
        setRawData(raw)

        setParams(prev => ({
          ...prev,
          region: "All regions",
          service: options.resource_types[0] ?? "",
        }))
      } catch (err) {
        console.error("Failed to load capacity planning options:", err)
      }
    }

    loadOptions()
  }, [])

  const buildFallbackPlan = (
    regionScope: string,
    service: string,
    horizon: number,
  ): CapacityPlanItem[] => {
    if (!rawData.length) return []

    // Filter by region & resource_type (service)
    let filtered = rawData.filter(row => row.resource_type === service)
    if (regionScope !== "All regions") {
      filtered = filtered.filter(row => row.region === regionScope)
    }

    if (!filtered.length) return []

    // Use horizon days window (similar to Streamlit)
    const toMs = (d: string) => new Date(d).getTime()
    const maxDateMs = Math.max(...filtered.map(row => toMs(row.date)))
    const cutoffMs = maxDateMs - horizon * 24 * 60 * 60 * 1000

    let windowData = filtered.filter(row => toMs(row.date) >= cutoffMs)
    if (!windowData.length) {
      windowData = filtered
    }

    const regionsSet = Array.from(new Set(windowData.map(row => row.region)))
    const rows: CapacityPlanItem[] = []

    for (const reg of regionsSet) {
      const sub = windowData.filter(r => r.region === reg)
      if (!sub.length) continue

      // Use peak CPU as demand index (simple heuristic, like Streamlit fallback)
      const usageCpuVals = sub.map(r => r.usage_cpu)
      const demand = Math.max(...usageCpuVals)
      const capacity = demand * 0.9
      const gap = demand - capacity
      const ratio = capacity > 0 ? demand / capacity : 0

      let risk: CapacityPlanItem["risk_level"] = "low"
      if (ratio > 1.1) risk = "high"
      else if (ratio > 1.0) risk = "medium"

      const rec = `${gap > 0 ? "+" : ""}${gap.toFixed(1)} units`

      rows.push({
        region: reg,
        service,
        forecast_demand: Number(demand.toFixed(1)),
        available_capacity: Number(capacity.toFixed(1)),
        recommended_adjustment: rec,
        risk_level: risk,
      })
    }

    return rows
  }

  const handleLoad = async () => {
    if (!params.service) return

    setLoading(true)
    try {
      const query: { region?: string; service: string; horizon: number } = {
        service: params.service,
        horizon: params.horizon,
      }

      // Only pass region when a specific region is selected
      if (params.region !== "All regions") {
        query.region = params.region
      }

      let res: CapacityPlanItem[] = []

      try {
        res = await fetchCapacityPlanning(query)
      } catch (err) {
        console.warn("Backend capacity-planning call failed, will use fallback.", err)
      }

      // If backend returns nothing (e.g. VM / Container), use frontend fallback
      if (!res || res.length === 0) {
        res = buildFallbackPlan(params.region, params.service, params.horizon)
      }

      setData(res)
    } catch (err) {
      console.error("Capacity planning error:", err)
      alert("Failed to load capacity planning data")
    } finally {
      setLoading(false)
    }
  }

  const riskEmoji = (risk: CapacityPlanItem["risk_level"]) => {
    if (risk === "high") return "🔴"
    if (risk === "medium") return "🟡"
    return "🟢"
  }

  const hasData = data && data.length > 0

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Capacity Planning"
        subtitle="Analyze future demand and determine required resource scaling."
      />

      {/* CONFIG */}
      <Card className="bg-slate-900/50 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">Configuration</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Region */}
            <div>
              <label className="text-sm text-slate-400 mb-2 block">Region</label>
              <Select
                value={params.region}
                onValueChange={value => setParams({ ...params, region: value })}
              >
                <SelectTrigger className="bg-slate-800 border-slate-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All regions">All regions</SelectItem>
                  {regions.map(r => (
                    <SelectItem key={r} value={r}>
                      {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Service / Resource Type */}
            <div>
              <label className="text-sm text-slate-400 mb-2 block">
                Service / Resource Type
              </label>
              <Select
                value={params.service}
                onValueChange={value => setParams({ ...params, service: value })}
              >
                <SelectTrigger className="bg-slate-800 border-slate-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {services.map(s => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Horizon */}
            <div>
              <label className="text-sm text-slate-400 mb-2 block">
                Forecast Horizon: {params.horizon} days
              </label>
              <Slider
                value={[params.horizon]}
                min={7}
                max={60}
                step={1}
                onValueChange={([v]) => setParams({ ...params, horizon: v })}
              />
            </div>
          </div>

          <Button
            onClick={handleLoad}
            disabled={loading}
            className="mt-6 bg-gradient-to-r from-cyan-500 to-blue-500"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Loading...
              </>
            ) : (
              "📊 Load Capacity Plan"
            )}
          </Button>
        </CardContent>
      </Card>

      {/* RESULTS */}
      {data && (
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Capacity Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            {hasData ? (
              <>
                {/* Chart */}
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="region" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0f172a",
                        borderRadius: "6px",
                        border: "1px solid #1f2937",
                        color: "#e5e7eb",
                      }}
                      formatter={(value: any, name: any) => [
                        typeof value === "number" ? value.toFixed(1) : value,
                        name,
                      ]}
                    />
                    <Bar
                      dataKey="forecast_demand"
                      fill="#38bdf8"
                      name="Forecast Demand"
                    />
                    <Bar
                      dataKey="available_capacity"
                      fill="#3b82f6"
                      name="Available Capacity"
                    />
                  </BarChart>
                </ResponsiveContainer>

                {/* Recommendations */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Recommendations
                  </h3>
                  <p className="text-sm text-slate-400 mb-3">
                    Highlighting where forecast demand is close to or exceeding
                    available capacity.
                  </p>
                  <ul className="space-y-1 text-sm">
                    {data
                      .slice()
                      .sort((a, b) => {
                        const order = { high: 0, medium: 1, low: 2 }
                        return order[a.risk_level] - order[b.risk_level]
                      })
                      .map((row, idx) => (
                        <li key={idx} className="text-slate-200">
                          <span className="mr-1">
                            {riskEmoji(row.risk_level)}
                          </span>
                          <span className="font-semibold">
                            {row.region} – {row.service}
                          </span>{" "}
                          <span className="text-slate-400">
                            → {row.recommended_adjustment}
                          </span>
                        </li>
                      ))}
                  </ul>
                </div>

                {/* Table + Download */}
                <div className="mt-6 flex flex-col gap-4">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm border-collapse border border-slate-700">
                      <thead className="bg-slate-800">
                        <tr>
                          <th className="p-3">Region</th>
                          <th className="p-3">Service</th>
                          <th className="p-3">Forecast Demand</th>
                          <th className="p-3">Available Capacity</th>
                          <th className="p-3">Adjustment</th>
                          <th className="p-3">Risk Level</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((row, idx) => (
                          <tr
                            key={idx}
                            className="border-t border-slate-700"
                          >
                            <td className="p-3">{row.region}</td>
                            <td className="p-3">{row.service}</td>
                            <td className="p-3">
                              {row.forecast_demand.toFixed(1)}
                            </td>
                            <td className="p-3">
                              {row.available_capacity.toFixed(1)}
                            </td>
                            <td className="p-3">
                              {row.recommended_adjustment}
                            </td>
                            <td
                              className={`p-3 font-semibold ${
                                row.risk_level === "high"
                                  ? "text-red-400"
                                  : row.risk_level === "medium"
                                  ? "text-yellow-400"
                                  : "text-green-400"
                              }`}
                            >
                              {row.risk_level === "high"
                                ? "High risk"
                                : row.risk_level === "medium"
                                ? "Near limit"
                                : "Safe"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div>
                    <Button
                      variant="outline"
                      onClick={() => {
                        if (!data || !data.length) return

                        const header = [
                          "region",
                          "service",
                          "forecast_demand",
                          "available_capacity",
                          "recommended_adjustment",
                          "risk_level",
                        ]

                        const rows = data.map(row => [
                          row.region,
                          row.service,
                          row.forecast_demand,
                          row.available_capacity,
                          row.recommended_adjustment,
                          row.risk_level,
                        ])

                        const csv =
                          [header.join(","), ...rows.map(r => r.join(","))].join(
                            "\n",
                          )

                        const blob = new Blob([csv], { type: "text/csv" })
                        const url = URL.createObjectURL(blob)
                        const a = document.createElement("a")
                        a.href = url
                        a.download = "capacity_plan.csv"
                        a.click()
                      }}
                    >
                      ⬇️ Download capacity plan CSV
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-slate-400 text-sm">
                No capacity planning data available for the selected filters.
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
