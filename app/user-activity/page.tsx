"use client"

import { useEffect, useState } from "react"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { fetchRawData, fetchFilterOptions, type RawDataPoint } from "@/lib/api"
import { Loader2 } from "lucide-react"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts"

export default function UserActivityPage() {
  const [regions, setRegions] = useState<string[]>([])
  const [resources, setResources] = useState<string[]>([])
  const [rawData, setRawData] = useState<RawDataPoint[]>([])
  const [loading, setLoading] = useState(true)

  const [selectedRegions, setSelectedRegions] = useState<string[]>([])
  const [selectedResources, setSelectedResources] = useState<string[]>([])
  const [windowSize, setWindowSize] = useState("All data")

  // computed slices
  const [trendData, setTrendData] = useState<any[]>([])
  const [regionAvg, setRegionAvg] = useState<any[]>([])
  const [bubbleData, setBubbleData] = useState<any[]>([])
  const [spikeRows, setSpikeRows] = useState<any[]>([])
  const [kpis, setKpis] = useState<any | null>(null)

  // Load filters + raw data
  useEffect(() => {
    async function init() {
      try {
        setLoading(true)
        const [opts, data] = await Promise.all([
          fetchFilterOptions(),
          fetchRawData(),
        ])
        setRegions(opts.regions)
        setResources(opts.resource_types)
        setRawData(data)

        setSelectedRegions(opts.regions)
        setSelectedResources(opts.resource_types)
      } finally {
        setLoading(false)
      }
    }
    init()
  }, [])

  // recompute ALL four panels + KPIs
  useEffect(() => {
    if (!rawData.length) return

    // FILTER by region + resource
    let df = rawData
    if (selectedRegions.length) {
      df = df.filter((d) => selectedRegions.includes(d.region))
    }
    if (selectedResources.length) {
      df = df.filter((d) => selectedResources.includes(d.resource_type))
    }

    if (!df.length) {
      setTrendData([])
      setRegionAvg([])
      setBubbleData([])
      setSpikeRows([])
      setKpis(null)
      return
    }

    // window filter
    if (windowSize !== "All data") {
      const days = Number(windowSize.split(" ")[1])
      const maxDate = new Date(Math.max(...df.map((d) => new Date(d.date).getTime())))
      const cutoff = new Date(maxDate.getTime() - days * 24 * 3600 * 1000)
      df = df.filter((d) => new Date(d.date) >= cutoff)
    }

    // ---- 1) Daily Active Users Trend ----
    const mapDaily = new Map<string, number>()
    df.forEach((d) => {
      const key = d.date
      mapDaily.set(key, (mapDaily.get(key) ?? 0) + d.users_active)
    })

    const trend = [...mapDaily.entries()]
      .map(([date, value]) => ({
        date,
        users_active: value,
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    setTrendData(trend)

    // ---- 2) Region Avg Users ----
    const regMap = new Map<string, { sum: number; count: number }>()
    df.forEach((d) => {
      if (!regMap.has(d.region)) regMap.set(d.region, { sum: 0, count: 0 })
      const r = regMap.get(d.region)!
      r.sum += d.users_active
      r.count += 1
    })
    const regAvg = [...regMap.entries()]
      .map(([region, v]) => ({
        region,
        avg_users: v.sum / v.count,
      }))
      .sort((a, b) => b.avg_users - a.avg_users)
      .slice(0, 7)

    setRegionAvg(regAvg)

    // ---- 3) Users vs CPU vs Storage Bubble ----
    const bubbles = df.map((d) => ({
      region: d.region,
      cpu: d.usage_cpu,
      storage: d.usage_storage,
      users: d.users_active,
      date: d.date,
      resource_type: d.resource_type,
    }))

    setBubbleData(bubbles)

    // ---- 4) Spike list ----
    const spikes = [...df]
      .sort((a, b) => b.users_active - a.users_active)
      .slice(0, 8)
      .map((d) => ({
        date: d.date,
        region: d.region,
        resource_type: d.resource_type,
        users_active: d.users_active,
        usage_cpu: d.usage_cpu,
      }))

    setSpikeRows(spikes)

    // ---- 5) KPIs ----
    const dailyTotals = trend.map((d) => d.users_active)
    const peakVal = Math.max(...dailyTotals)
    const peakDay = trend.find((d) => d.users_active === peakVal)?.date ?? ""

    const avgUsers = dailyTotals.reduce((a, b) => a + b, 0) / dailyTotals.length

    const weekend = new Set([5, 6])
    const dfWithDay = df.map((d) => ({
      ...d,
      weekday: new Date(d.date).getDay(),
    }))

    const weekdayMean =
      dfWithDay
        .filter((d) => !weekend.has(d.weekday))
        .reduce((acc, r) => acc + r.users_active, 0) /
        (dfWithDay.filter((d) => !weekend.has(d.weekday)).length || 1)

    const weekendMean =
      dfWithDay
        .filter((d) => weekend.has(d.weekday))
        .reduce((acc, r) => acc + r.users_active, 0) /
        (dfWithDay.filter((d) => weekend.has(d.weekday)).length || 1)

    const totalUsers = df.reduce((acc, r) => acc + r.users_active, 0)

    setKpis({
      peakVal,
      peakDay,
      avgUsers,
      weekendVsWeekday: weekdayMean
        ? ((weekendMean - weekdayMean) / weekdayMean) * 100
        : 0,
      totalUsers,
    })
  }, [rawData, selectedRegions, selectedResources, windowSize])

  const handleMultiSelect = (current: string[], value: string) => {
    return current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value]
  }

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="User Activity"
        subtitle="Usage patterns, engagement spikes, and region-level trends"
      />

      {/* FILTER BAR */}
      <Card className="bg-slate-900/50 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Regions */}
            <div>
              <label className="text-sm text-slate-400">Regions</label>
              <Select onValueChange={(v) => setSelectedRegions(handleMultiSelect(selectedRegions, v))}>
                <SelectTrigger className="bg-slate-800 border-slate-700">
                  <SelectValue placeholder="Select regions" />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((r) => (
                    <SelectItem key={r} value={r}>
                      {selectedRegions.includes(r) ? "✓ " : ""} {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Resource types */}
            <div>
              <label className="text-sm text-slate-400">Resource Types</label>
              <Select onValueChange={(v) => setSelectedResources(handleMultiSelect(selectedResources, v))}>
                <SelectTrigger className="bg-slate-800 border-slate-700">
                  <SelectValue placeholder="Select types" />
                </SelectTrigger>
                <SelectContent>
                  {resources.map((r) => (
                    <SelectItem key={r} value={r}>
                      {selectedResources.includes(r) ? "✓ " : ""} {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Window */}
            <div>
              <label className="text-sm text-slate-400">Time Window</label>
              <Select value={windowSize} onValueChange={setWindowSize}>
                <SelectTrigger className="bg-slate-800 border-slate-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All data">All data</SelectItem>
                  <SelectItem value="Last 30 days">Last 30 days</SelectItem>
                  <SelectItem value="Last 90 days">Last 90 days</SelectItem>
                  <SelectItem value="Last 180 days">Last 180 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPI ROW */}
      {kpis && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="metric-pill">
            <CardContent>
              <p className="text-slate-400 text-xs uppercase">Total User Events</p>
              <p className="text-3xl text-blue-400 font-bold mt-1">{kpis.totalUsers.toLocaleString()}</p>
            </CardContent>
          </Card>

          <Card className="metric-pill">
            <CardContent>
              <p className="text-slate-400 text-xs uppercase">Peak Day</p>
              <p className="text-xl text-cyan-400 font-bold">{kpis.peakDay}</p>
              <p className="text-sm text-slate-500">{kpis.peakVal.toFixed(0)} users</p>
            </CardContent>
          </Card>

          <Card className="metric-pill">
            <CardContent>
              <p className="text-slate-400 text-xs uppercase">Avg Daily Users</p>
              <p className="text-3xl text-purple-400 font-bold">{kpis.avgUsers.toFixed(0)}</p>
            </CardContent>
          </Card>

          <Card className="metric-pill">
            <CardContent>
              <p className="text-slate-400 text-xs uppercase">Weekend vs Weekday</p>
              <p className="text-3xl text-emerald-400 font-bold">{kpis.weekendVsWeekday.toFixed(1)}%</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* CHART ROW 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Trend */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Daily Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-16">
                <Loader2 className="w-10 h-10 animate-spin text-blue-500 mx-auto" />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={360}>
                <LineChart data={trendData}>
                  <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
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
                  />
                  <Line type="monotone" dataKey="users_active" stroke="#38bdf8" dot={false} strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Top Regions */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Top Regions by Avg Users</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={360}>
              <BarChart data={regionAvg} layout="vertical">
                <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
                <XAxis type="number" stroke="#64748b" />
                <YAxis dataKey="region" type="category" stroke="#64748b" width={90} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "1px solid #1e293b",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="avg_users" fill="#38bdf8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* CHART ROW 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bubble Chart */}
        <Card className="bg-slate-900/50 border-slate-800">
  <CardHeader>
    <CardTitle className="text-white">Users vs CPU vs Storage</CardTitle>
  </CardHeader>
  <CardContent>
    <ResponsiveContainer width="100%" height={360}>
      <ScatterChart>
        <CartesianGrid stroke="#334155" strokeDasharray="3 3" />

        <XAxis
          type="number"
          dataKey="users"
          name="Active Users"
          stroke="#64748b"
        />

        <YAxis
          type="number"
          dataKey="cpu"
          name="CPU (%)"
          stroke="#64748b"
        />

        <ZAxis
          type="number"
          dataKey="storage"
          name="Storage (GB)"
          range={[80, 400]} 
        />

        <Tooltip
          cursor={{ stroke: "#38bdf8", strokeWidth: 1 }}
          contentStyle={{
            backgroundColor: "#0f172a",
            border: "1px solid #1e293b",
            borderRadius: "8px",
          }}
          formatter={(val, name) => [val.toString(), name]}
          labelFormatter={() => ""}
        />

        {/* --- MULTI-COLOR REGION BUBBLES --- */}
        {(() => {
          const grouped: Record<string, any[]> = {}
          bubbleData.forEach((d) => {
            if (!grouped[d.region]) grouped[d.region] = []
            grouped[d.region].push(d)
          })

          const regionNames = Object.keys(grouped)

          // Beautiful neon cloud palette
          const palette = [
            "#38bdf8", "#818cf8", "#34d399", "#f472b6", "#facc15",
            "#fb7185", "#2dd4bf", "#a78bfa", "#f97316", "#4ade80"
          ]

          return regionNames.map((region, index) => (
            <Scatter
              key={region}
              name={region}
              data={grouped[region]}
              fill={palette[index % palette.length]}
              fillOpacity={0.75}
              stroke={palette[index % palette.length]}
              strokeWidth={1.5}
            />
          ))
        })()}
      </ScatterChart>
    </ResponsiveContainer>
  </CardContent>
</Card>


        {/* Spike Table */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Top User Spikes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-h-80 overflow-auto rounded-lg border border-slate-800">
              <table className="min-w-full text-sm text-slate-300">
                <thead className="bg-slate-800 text-slate-400">
                  <tr>
                    <th className="px-4 py-2 text-left">Date</th>
                    <th className="px-4 py-2 text-left">Region</th>
                    <th className="px-4 py-2 text-left">Type</th>
                    <th className="px-4 py-2 text-left">Users</th>
                    <th className="px-4 py-2 text-left">CPU</th>
                  </tr>
                </thead>
                <tbody>
                  {spikeRows.map((row, idx) => (
                    <tr key={idx} className="border-b border-slate-700">
                      <td className="px-4 py-2">{row.date}</td>
                      <td className="px-4 py-2">{row.region}</td>
                      <td className="px-4 py-2">{row.resource_type}</td>
                      <td className="px-4 py-2">{row.users_active}</td>
                      <td className="px-4 py-2">{row.usage_cpu}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
