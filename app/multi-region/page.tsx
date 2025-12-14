"use client"

import { useEffect, useMemo, useState } from "react"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { fetchRawData, fetchFilterOptions, type RawDataPoint } from "@/lib/api"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts"
import { Loader2, Download } from "lucide-react"

type MetricKey = "cpu" | "storage" | "users"

const METRIC_LABELS: Record<MetricKey, string> = {
  cpu: "CPU Usage (%)",
  storage: "Storage Usage (GB)",
  users: "Active Users",
}

const METRIC_COLUMN: Record<MetricKey, keyof RawDataPoint> = {
  cpu: "usage_cpu",
  storage: "usage_storage",
  users: "users_active",
}

// Color palette for lines / radar
const REGION_COLORS = [
  "#38bdf8",
  "#a855f7",
  "#22c55e",
  "#f97316",
  "#e11d48",
  "#facc15",
  "#0ea5e9",
  "#6366f1",
  "#14b8a6",
  "#fb7185",
]

type RegionAgg = {
  region: string
  avg_cpu: number
  avg_storage: number
  avg_users: number
}

type TimeSeriesPoint = {
  date: string
  [region: string]: string | number
}

export default function MultiRegionComparePage() {
  const [rawData, setRawData] = useState<RawDataPoint[]>([])
  const [regions, setRegions] = useState<string[]>([])
  const [services, setServices] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  const [selectedRegions, setSelectedRegions] = useState<string[]>([])
  const [selectedService, setSelectedService] = useState<string>("")
  const [metric, setMetric] = useState<MetricKey>("cpu")
  const [timeWindow, setTimeWindow] = useState<"all" | "30" | "90" | "180">("all")

  // Initial load
  useEffect(() => {
    async function init() {
      try {
        setLoading(true)
        const [opts, data] = await Promise.all([
          fetchFilterOptions(),
          fetchRawData(),
        ])

        setRegions(opts.regions)
        setServices(opts.resource_types)
        setRawData(data)

        // Defaults: first 3 regions, first resource type
        const defaultRegions = opts.regions.slice(0, 3)
        setSelectedRegions(defaultRegions.length ? defaultRegions : opts.regions)
        if (opts.resource_types.length > 0) {
          setSelectedService(opts.resource_types[0])
        }
      } catch (err) {
        console.error("Failed to load multi-region data:", err)
      } finally {
        setLoading(false)
      }
    }
    init()
  }, [])

  // Filtered data slice based on filters
  const filteredData = useMemo(() => {
    if (!rawData.length || !selectedService) return []

    let df = rawData.filter((row) => row.resource_type === selectedService)

    if (selectedRegions.length) {
      df = df.filter((row) => selectedRegions.includes(row.region))
    }

    if (!df.length) return []

    // Apply time window
    if (timeWindow !== "all") {
      const maxDate = df
        .map((r) => new Date(r.date))
        .reduce((a, b) => (a > b ? a : b))

      const days = parseInt(timeWindow, 10)
      const cutoff = new Date(maxDate)
      cutoff.setDate(cutoff.getDate() - days)

      df = df.filter((row) => new Date(row.date) >= cutoff)
    }

    return df
  }, [rawData, selectedRegions, selectedService, timeWindow])

  // Aggregate per region for radar + summary
  const regionAgg: RegionAgg[] = useMemo(() => {
    if (!filteredData.length) return []

    const map = new Map<
      string,
      { cpu: number; storage: number; users: number; count: number }
    >()

    for (const row of filteredData) {
      const key = row.region
      if (!map.has(key)) {
        map.set(key, { cpu: 0, storage: 0, users: 0, count: 0 })
      }
      const entry = map.get(key)!
      entry.cpu += row.usage_cpu
      entry.storage += row.usage_storage
      entry.users += row.users_active
      entry.count += 1
    }

    const out: RegionAgg[] = []
    map.forEach((val, region) => {
      out.push({
        region,
        avg_cpu: val.cpu / val.count,
        avg_storage: val.storage / val.count,
        avg_users: val.users / val.count,
      })
    })

    return out
  }, [filteredData])

  // Radar chart data
  const radarData = useMemo(() => {
    if (!regionAgg.length) return []

    const metricField =
      metric === "cpu" ? "avg_cpu" : metric === "storage" ? "avg_storage" : "avg_users"

    return regionAgg.map((r) => ({
      region: r.region,
      value: r[metricField as keyof RegionAgg] as number,
    }))
  }, [regionAgg, metric])

  // Time series comparison data (one row per date, one column per region)
  const timeSeriesData: TimeSeriesPoint[] = useMemo(() => {
    if (!filteredData.length) return []

    const metricCol = METRIC_COLUMN[metric]
    interface RegionData {
      [key: string]: any; // This is needed for dynamic region keys
      _count: { [region: string]: number };
    }
    const grouped = new Map<string, RegionData>()

    for (const row of filteredData) {
      const dateKey = row.date
      const reg = row.region
      if (!grouped.has(dateKey)) {
        grouped.set(dateKey, { _count: {} as { [region: string]: number } })
      }
      const entry = grouped.get(dateKey)!
      const currentValue = (entry[reg] as number | undefined) ?? 0;
      entry[reg] = currentValue + (row[metricCol] as number);
      entry._count[reg] = (entry._count[reg] ?? 0) + 1;
    }

    const result: TimeSeriesPoint[] = []
    grouped.forEach((val, date) => {
      const point: TimeSeriesPoint = { date }
      selectedRegions.forEach((r) => {
        if (val._count[r]) {
          point[r] = val[r] / val._count[r]
        } else {
          point[r] = 0
        }
      })
      result.push(point)
    })

    result.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    )

    return result
  }, [filteredData, metric, selectedRegions])

  // Summary stats (top region, spread)
  const summary = useMemo(() => {
    if (!regionAgg.length) return null

    const metricField =
      metric === "cpu" ? "avg_cpu" : metric === "storage" ? "avg_storage" : "avg_users"

    const sorted = [...regionAgg].sort(
      (a, b) =>
        (b[metricField as keyof RegionAgg] as number) -
        (a[metricField as keyof RegionAgg] as number)
    )

    const top = sorted[0]
    const bottom = sorted[sorted.length - 1]

    const topVal = top[metricField as keyof RegionAgg] as number
    const bottomVal = bottom[metricField as keyof RegionAgg] as number
    const diff = topVal - bottomVal
    const pctDiff =
      bottomVal > 0 ? (diff / bottomVal) * 100 : diff > 0 ? 100 : 0

    return {
      topRegion: top.region,
      topValue: topVal,
      bottomRegion: bottom.region,
      bottomValue: bottomVal,
      pctDiff,
      regionCount: regionAgg.length,
    }
  }, [regionAgg, metric])

  // Toggle region selection
  const toggleRegion = (region: string) => {
    setSelectedRegions((prev) =>
      prev.includes(region) ? prev.filter((r) => r !== region) : [...prev, region]
    )
  }

  const handleSelectAllRegions = () => {
    setSelectedRegions(regions)
  }

  const handleClearRegions = () => {
    setSelectedRegions([])
  }

  const handleDownloadSlice = () => {
    if (!filteredData.length) {
      alert("No data to export for current filters.")
      return
    }

    const headers = [
      "date",
      "region",
      "resource_type",
      "usage_cpu",
      "usage_storage",
      "users_active",
    ]
    const rows = filteredData.map((r) =>
      [
        r.date,
        r.region,
        r.resource_type,
        r.usage_cpu,
        r.usage_storage,
        r.users_active,
      ].join(",")
    )

    const csv = [headers.join(","), ...rows].join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `multi_region_compare_${selectedService}_${metric}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Multi-Region Compare"
        subtitle="Compare CPU, storage and user load across Azure regions for a selected service."
      />

      {/* FILTERS CARD */}
      <Card className="bg-slate-900/50 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Service / Resource Type */}
            <div>
              <label className="text-sm text-slate-400 mb-2 block">
                Service / Resource Type
              </label>
              <Select
                value={selectedService}
                onValueChange={(v) => setSelectedService(v)}
              >
                <SelectTrigger className="bg-slate-800 border-slate-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {services.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

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

            {/* Time window */}
            <div>
              <label className="text-sm text-slate-400 mb-2 block">
                Time Window
              </label>
              <Select
                value={timeWindow}
                onValueChange={(v: "all" | "30" | "90" | "180") => setTimeWindow(v)}
              >
                <SelectTrigger className="bg-slate-800 border-slate-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All data</SelectItem>
                  <SelectItem value="30">Last 30 days</SelectItem>
                  <SelectItem value="90">Last 90 days</SelectItem>
                  <SelectItem value="180">Last 180 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Region chips */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">
                Regions (click to toggle — 2+ recommended)
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSelectAllRegions}
                >
                  Select all
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearRegions}
                >
                  Clear
                </Button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {regions.map((r) => {
                const active = selectedRegions.includes(r)
                return (
                  <button
                    key={r}
                    type="button"
                    onClick={() => toggleRegion(r)}
                    className={`px-3 py-1 rounded-full text-xs border transition ${
                      active
                        ? "bg-cyan-500/20 border-cyan-400 text-cyan-200"
                        : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    {r}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Export button */}
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadSlice}
              disabled={!filteredData.length}
            >
              <Download className="w-4 h-4 mr-2" />
              Download current slice (CSV)
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* LOADING / NO DATA */}
      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
        </div>
      ) : !filteredData.length || !selectedRegions.length ? (
        <Card className="bg-slate-900/50 border-slate-800">
          <CardContent className="py-10 text-center text-slate-400 text-sm">
            No data for the selected filters. Try changing the service, time window
            or selected regions.
          </CardContent>
        </Card>
      ) : (
        <>
          {/* RADAR + SUMMARY */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">
                  {METRIC_LABELS[metric]} – Multi-region radar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={360}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#1f2937" />
                    <PolarAngleAxis
                      dataKey="region"
                      tick={{ fill: "#cbd5f5", fontSize: 11 }}
                    />
                    <PolarRadiusAxis tick={{ fill: "#9ca3af", fontSize: 10 }} />
                    <RechartsTooltip
                      contentStyle={{
                        backgroundColor: "#020617",
                        border: "1px solid #1f2937",
                        borderRadius: 8,
                        color: "#e5e7eb",
                      }}
                      formatter={(val: any) => [
                        metric === "users"
                          ? `${val.toFixed(0)}`
                          : `${val.toFixed(2)}`,
                        METRIC_LABELS[metric],
                      ]}
                    />
                    <Radar
                      name={METRIC_LABELS[metric]}
                      dataKey="value"
                      stroke="#38bdf8"
                      fill="#38bdf8"
                      fillOpacity={0.35}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Summary card */}
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Summary</CardTitle>
              </CardHeader>
              <CardContent>
                {summary ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-slate-400">
                        Top region by {METRIC_LABELS[metric]}
                      </p>
                      <p className="text-2xl font-semibold text-cyan-400 mt-1">
                        {summary.topRegion}
                      </p>
                      <p className="text-sm text-slate-300 mt-1">
                        {metric === "users"
                          ? summary.topValue.toFixed(0)
                          : summary.topValue.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-slate-400">
                        Lowest region
                      </p>
                      <p className="text-2xl font-semibold text-slate-200 mt-1">
                        {summary.bottomRegion}
                      </p>
                      <p className="text-sm text-slate-300 mt-1">
                        {metric === "users"
                          ? summary.bottomValue.toFixed(0)
                          : summary.bottomValue.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-slate-400">
                        Regions compared
                      </p>
                      <p className="text-2xl font-semibold text-emerald-400 mt-1">
                        {summary.regionCount}
                      </p>
                      <p className="text-sm text-slate-400 mt-1">
                        From selected region filters
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-slate-400">
                        Spread between top & bottom
                      </p>
                      <p className="text-2xl font-semibold text-purple-400 mt-1">
                        {summary.pctDiff.toFixed(1)}%
                      </p>
                      <p className="text-sm text-slate-400 mt-1">
                        Difference in {METRIC_LABELS[metric]}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-slate-400 text-sm">
                    Not enough regional data for summary.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* TIME-SERIES COMPARISON */}
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">
                {METRIC_LABELS[metric]} – Time series comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={380}>
                <LineChart data={timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis
                    dataKey="date"
                    stroke="#64748b"
                    tickFormatter={(d: any) =>
                      new Date(d).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    }
                  />
                  <YAxis stroke="#64748b" />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: "#020617",
                      border: "1px solid #1f2937",
                      borderRadius: 8,
                      color: "#e5e7eb",
                    }}
                    labelFormatter={(d) =>
                      new Date(d as string).toLocaleDateString()
                    }
                  />
                  <Legend />
                  {selectedRegions.map((region, idx) => (
                    <Line
                      key={region}
                      type="monotone"
                      dataKey={region}
                      name={region}
                      stroke={
                        REGION_COLORS[idx % REGION_COLORS.length] || "#38bdf8"
                      }
                      strokeWidth={2}
                      dot={false}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
