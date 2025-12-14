"use client"

import { useEffect, useState } from "react"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { fetchFilterOptions, fetchRawData, type RawDataPoint } from "@/lib/api"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts"
import { Loader2 } from "lucide-react"

type TimeSeriesPoint = {
  date: string
  value: number
}

type MetricKey = "cpu" | "storage" | "users"
type TimeWindow = "all" | "7" | "30" | "90"

export default function ResourceTrendsPage() {
  const [regions, setRegions] = useState<string[]>([])
  const [resourceTypes, setResourceTypes] = useState<string[]>([])
  const [rawData, setRawData] = useState<RawDataPoint[]>([])
  const [loading, setLoading] = useState(false)

  const [selectedRegion, setSelectedRegion] = useState<string>("All regions")
  const [selectedResourceType, setSelectedResourceType] = useState<string>("All")
  const [metric, setMetric] = useState<MetricKey>("cpu")
  const [timeWindow, setTimeWindow] = useState<TimeWindow>("all")

  const [series, setSeries] = useState<TimeSeriesPoint[]>([])
  const [summary, setSummary] = useState<{
    points: number
    avg: number
    max: number
    maxDate: string
  } | null>(null)

  // Load options + raw data once
  useEffect(() => {
    async function init() {
      try {
        setLoading(true)
        const [options, data] = await Promise.all([
          fetchFilterOptions(),
          fetchRawData(),
        ])
        setRegions(options.regions || [])
        setResourceTypes(options.resource_types || [])
        setRawData(data || [])
        setSelectedRegion("All regions")
        setSelectedResourceType("All")
      } catch (err) {
        console.error("Failed to load trends initial data:", err)
      } finally {
        setLoading(false)
      }
    }
    init()
  }, [])

  // Recompute time-series whenever filters or rawData change
  useEffect(() => {
    if (!rawData.length) {
      setSeries([])
      setSummary(null)
      return
    }

    // Step 1: filter by region + resource type
    let filtered = rawData

    if (selectedRegion !== "All regions") {
      filtered = filtered.filter((d) => d.region === selectedRegion)
    }

    if (selectedResourceType !== "All") {
      filtered = filtered.filter((d) => d.resource_type === selectedResourceType)
    }

    if (!filtered.length) {
      setSeries([])
      setSummary(null)
      return
    }

    // Step 2: time window filter based on date
    const withDate = filtered.map((row) => ({
      ...row,
      _date: new Date(row.date),
    }))

    const allDates = withDate.map((r) => r._date.getTime())
    const maxTime = Math.max(...allDates)
    const maxDate = new Date(maxTime)

    let windowDays: number | null = null
    if (timeWindow === "7") windowDays = 7
    else if (timeWindow === "30") windowDays = 30
    else if (timeWindow === "90") windowDays = 90

    let windowFiltered = withDate
    if (windowDays !== null) {
      const cutoff = new Date(maxDate)
      cutoff.setDate(cutoff.getDate() - windowDays)
      windowFiltered = withDate.filter((r) => r._date >= cutoff)
    }

    if (!windowFiltered.length) {
      setSeries([])
      setSummary(null)
      return
    }

    // Step 3: aggregate by date -> mean of selected metric
    const buckets = new Map<
      string,
      { sum: number; count: number }
    >()

    for (const row of windowFiltered) {
      const key = row._date.toISOString().slice(0, 10) // YYYY-MM-DD

      let val: number
      if (metric === "cpu") val = row.usage_cpu
      else if (metric === "storage") val = row.usage_storage
      else val = row.users_active

      const existing = buckets.get(key) || { sum: 0, count: 0 }
      existing.sum += val
      existing.count += 1
      buckets.set(key, existing)
    }

    const seriesData: TimeSeriesPoint[] = Array.from(buckets.entries())
      .map(([date, agg]) => ({
        date,
        value: agg.sum / agg.count,
      }))
      .sort((a, b) => a.date.localeCompare(b.date))

    setSeries(seriesData)

    // Step 4: summary stats
    const values = seriesData.map((p) => p.value)
    const avg =
      values.reduce((acc, v) => acc + v, 0) / (values.length || 1)
    let max = -Infinity
    let maxDateStr = ""
    for (const p of seriesData) {
      if (p.value > max) {
        max = p.value
        maxDateStr = p.date
      }
    }

    setSummary({
      points: seriesData.length,
      avg,
      max,
      maxDate: maxDateStr,
    })
  }, [rawData, selectedRegion, selectedResourceType, metric, timeWindow])

  const metricLabel =
    metric === "cpu"
      ? "CPU Usage (%)"
      : metric === "storage"
      ? "Storage Usage (GB)"
      : "Active Users"

  const windowLabel = (tw: TimeWindow): string => {
    if (tw === "all") return "All"
    if (tw === "7") return "Last 7 days"
    if (tw === "30") return "Last 30 days"
    return "Last 90 days"
  }

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Time-Series Trends"
        subtitle="Analyze how demand evolves over time by metric, region and resource type"
      />

      {/* FILTERS */}
      <Card className="bg-slate-900/50 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Metric */}
            <div>
              <label className="text-sm text-slate-400 mb-2 block">Metric</label>
              <Select
                value={metric}
                onValueChange={(v: MetricKey) => setMetric(v)}
              >
                <SelectTrigger className="bg-slate-800 border-slate-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cpu">CPU Usage (%)</SelectItem>
                  <SelectItem value="storage">Storage Usage (GB)</SelectItem>
                  <SelectItem value="users">Active Users</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Region */}
            <div>
              <label className="text-sm text-slate-400 mb-2 block">Region</label>
              <Select
                value={selectedRegion}
                onValueChange={(v) => setSelectedRegion(v)}
              >
                <SelectTrigger className="bg-slate-800 border-slate-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All regions">All regions</SelectItem>
                  {regions.map((r) => (
                    <SelectItem key={r} value={r}>
                      {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Resource Type */}
            <div>
              <label className="text-sm text-slate-400 mb-2 block">
                Resource Type
              </label>
              <Select
                value={selectedResourceType}
                onValueChange={(v) => setSelectedResourceType(v)}
              >
                <SelectTrigger className="bg-slate-800 border-slate-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  {resourceTypes.map((rt) => (
                    <SelectItem key={rt} value={rt}>
                      {rt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Time Window buttons */}
            <div>
              <label className="text-sm text-slate-400 mb-2 block">
                Time Window
              </label>
              <div className="flex flex-wrap gap-2">
                {(["all", "7", "30", "90"] as TimeWindow[]).map((tw) => (
                  <Button
                    key={tw}
                    type="button"
                    size="sm"
                    variant={timeWindow === tw ? "default" : "outline"}
                    onClick={() => setTimeWindow(tw)}
                    className={
                      timeWindow === tw
                        ? "bg-blue-600 text-white"
                        : "bg-slate-900 text-slate-200 border-slate-700"
                    }
                  >
                    {windowLabel(tw)}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CHART + SUMMARY */}
      <Card className="bg-slate-900/50 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">
            {metricLabel} over time
            {selectedRegion !== "All regions" && ` – ${selectedRegion}`}
            {selectedResourceType !== "All" && ` – ${selectedResourceType}`}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
          ) : series.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={380}>
                <LineChart data={series}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis
                    dataKey="date"
                    stroke="#64748b"
                    tickFormatter={(d) =>
                      new Date(d).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    }
                  />
                  <YAxis stroke="#64748b" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      border: "1px solid #1e293b",
                      borderRadius: "8px",
                    }}
                    labelFormatter={(d) =>
                      new Date(d as string).toLocaleDateString()
                    }
                    formatter={(val: any) => {
                      if (metric === "users") {
                        return [val.toFixed(0), metricLabel]
                      }
                      return [val.toFixed(2), metricLabel]
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#38bdf8"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>

              {/* Quick stats row */}
              {summary && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6 text-center">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-400">
                      Points
                    </p>
                    <p className="text-2xl font-semibold text-blue-400 mt-1">
                      {summary.points}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-400">
                      Avg {metricLabel}
                    </p>
                    <p className="text-2xl font-semibold text-cyan-400 mt-1">
                      {metric === "users"
                        ? summary.avg.toFixed(0)
                        : summary.avg.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-400">
                      Peak {metricLabel}
                    </p>
                    <p className="text-2xl font-semibold text-emerald-400 mt-1">
                      {metric === "users"
                        ? summary.max.toFixed(0)
                        : summary.max.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-400">
                      Peak Day
                    </p>
                    <p className="text-lg font-semibold text-purple-400 mt-1">
                      {summary.maxDate}
                    </p>
                  </div>
                </div>
              )}
            </>
          ) : (
            <p className="text-slate-400 text-sm">
              No data available for the selected filters.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
