"use client"

import { useEffect, useState } from "react"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { fetchFilterOptions, fetchTimeSeries } from "@/lib/api"
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts"
import { Loader2 } from "lucide-react"

export default function RegionalInsightsPage() {
  const [regions, setRegions] = useState<string[]>([])
  const [metrics] = useState([
    { key: "usage_cpu", label: "CPU Usage (%)" },
    { key: "usage_storage", label: "Storage (GB)" },
    { key: "users_active", label: "Active Users" },
  ])
  const [aggregation, setAggregation] = useState("daily")

  const [params, setParams] = useState({
    region: "",
    metric: "usage_cpu",
  })

  const [loading, setLoading] = useState(false)
  const [chartData, setChartData] = useState<any[] | null>(null)
  const [summary, setSummary] = useState<any | null>(null)

  // Load filters
  useEffect(() => {
    async function loadOptions() {
      try {
        const options = await fetchFilterOptions()
        setRegions(options.regions)

        setParams(prev => ({
          ...prev,
          region: options.regions[0] ?? ""
        }))
      } catch (err) {
        console.error("Failed to load filters:", err)
      }
    }
    loadOptions()
  }, [])

  const loadTimeSeries = async () => {
    if (!params.region) return alert("Select a region")

    setLoading(true)
    try {
      const data = await fetchTimeSeries({
        metric: params.metric as any,
        region: params.region,
        aggregation: aggregation as any,
      })

      setChartData(data)

      // Summary stats
      if (data.length > 0) {
        const values = data.map(d => d.value)
        const min = Math.min(...values)
        const max = Math.max(...values)
        const avg = values.reduce((a, b) => a + b, 0) / values.length

        setSummary({ min, max, avg })
      }

    } catch (err) {
      console.error("Regional insights fetch error:", err)
      alert("Failed to load regional insights.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <DashboardHeader 
        title="Regional Insights"
        subtitle="Analyze performance trends across Azure regions"
      />

      {/* CONFIGURATION */}
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
                onValueChange={(v) => setParams({ ...params, region: v })}
              >
                <SelectTrigger className="bg-slate-800 border-slate-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {regions.map(r => (
                    <SelectItem key={r} value={r}>{r}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Metric */}
            <div>
              <label className="text-sm text-slate-400 mb-2 block">Metric</label>
              <Select 
                value={params.metric}
                onValueChange={(v) => setParams({ ...params, metric: v })}
              >
                <SelectTrigger className="bg-slate-800 border-slate-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {metrics.map(m => (
                    <SelectItem key={m.key} value={m.key}>{m.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Aggregation */}
            <div>
              <label className="text-sm text-slate-400 mb-2 block">Aggregation</label>
              <Select 
                value={aggregation}
                onValueChange={setAggregation}
              >
                <SelectTrigger className="bg-slate-800 border-slate-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Load button */}
          <Button 
            onClick={loadTimeSeries}
            disabled={loading}
            className="mt-6 bg-gradient-to-r from-purple-500 to-blue-500"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Loading...
              </>
            ) : "📈 Load Insights"}
          </Button>
        </CardContent>
      </Card>

      {/* CHART */}
      {chartData && (
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Regional Trend</CardTitle>
          </CardHeader>
          <CardContent>

            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis 
                  dataKey="date" 
                  stroke="#64748b"
                  tickFormatter={(date) => 
                    new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                  }
                />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #475569",
                    borderRadius: "8px",
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

            {/* SUMMARY */}
            {summary && (
              <div className="grid grid-cols-3 gap-6 text-center mt-6">
                <div>
                  <p className="text-lg font-bold text-blue-400">{summary.avg.toFixed(2)}</p>
                  <p className="text-slate-400 text-sm">Average</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-green-400">{summary.min.toFixed(2)}</p>
                  <p className="text-slate-400 text-sm">Minimum</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-red-400">{summary.max.toFixed(2)}</p>
                  <p className="text-slate-400 text-sm">Maximum</p>
                </div>
              </div>
            )}

          </CardContent>
        </Card>
      )}
    </div>
  )
}
