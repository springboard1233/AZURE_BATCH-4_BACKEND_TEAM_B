// app/alerts/page.tsx
"use client"

import { useEffect, useState } from "react"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { fetchFilterOptions, fetchForecast } from "@/lib/api"
import { Loader2, Download } from "lucide-react"

type MetricKey = "cpu" | "storage" | "users"

const METRIC_LABELS: Record<MetricKey, string> = {
  cpu: "CPU Usage (%)",
  storage: "Storage Usage (GB)",
  users: "Active Users",
}

export default function AlertsPage() {
  const [loading, setLoading] = useState<boolean>(true)
  const [checking, setChecking] = useState<boolean>(false)

  const [regions, setRegions] = useState<string[]>([])
  const [services, setServices] = useState<string[]>([])

  const [metric, setMetric] = useState<MetricKey>("cpu")
  const [regionScope, setRegionScope] = useState<string>("All regions")
  const [service, setService] = useState<string>("")
  const [threshold, setThreshold] = useState<number>(80)

  const [alertRows, setAlertRows] = useState<
    {
      region: string
      service: string
      metric: string
      threshold: number
      max_forecast_next_7d: number
      peak_day: string
      status: "Safe" | "Near limit" | "High risk"
    }[]
  >([])

  const [email, setEmail] = useState<string>("")
  const [emailSaved, setEmailSaved] = useState<boolean>(false)

  useEffect(() => {
    async function init() {
      setLoading(true)
      try {
        const opts = await fetchFilterOptions()
        setRegions(opts.regions ?? [])
        setServices(opts.resource_types ?? [])
        if ((opts.resource_types ?? []).length > 0) {
          setService(opts.resource_types[0])
        }
      } catch (err) {
        console.error("Failed to load filter options", err)
      } finally {
        setLoading(false)
      }
    }
    init()
  }, [])

  const checkAlerts = async () => {
    if (!service) return
    setChecking(true)
    setAlertRows([])

    // Build region list to check
    const regionList =
      regionScope === "All regions" ? regions.slice() : regionScope ? [regionScope] : regions.slice()

    // If no regions, abort
    if (!regionList.length) {
      setChecking(false)
      return
    }

    try {
      // Fire parallel requests for each region
      const promises = regionList.map(async (r) => {
        try {
          const params = {
            metric,
            model: "best" as const,
            region: r,
            service,
            horizon: 7,
          }
          const resp = await fetchForecast(params)
          // resp is expected to be an array of forecast points with date + forecast_value
          if (!Array.isArray(resp) || resp.length === 0) {
            return null
          }
          // find the max forecast value and its date
          const maxPoint = resp.reduce((acc, cur: any) => {
            if (!acc) return cur
            return (cur.forecast_value ?? -Infinity) > (acc.forecast_value ?? -Infinity) ? cur : acc
          }, null as any)

          const maxVal = Number(maxPoint.forecast_value ?? 0)
          const peakDay = new Date(maxPoint.date).toISOString().slice(0, 10)

          let status: "Safe" | "Near limit" | "High risk" = "Safe"
          if (maxVal >= threshold * 1.1) status = "High risk"
          else if (maxVal >= threshold) status = "Near limit"

          return {
            region: r,
            service,
            metric: METRIC_LABELS[metric],
            threshold,
            max_forecast_next_7d: Math.round(maxVal * 100) / 100,
            peak_day: peakDay,
            status,
          }
        } catch (err) {
          console.warn("Forecast fetch failed for region", r, err)
          return null
        }
      })

      const results = await Promise.all(promises)
      const rows = results.filter(Boolean) as any[]

      setAlertRows(rows)
    } catch (err) {
      console.error("Error checking alerts:", err)
    } finally {
      setChecking(false)
    }
  }

  const topBanner = () => {
    if (!alertRows.length) return null
    if (alertRows.some((r) => r.status === "High risk")) {
      return { type: "error", text: "🔴 One or more regions are in High risk zone." }
    }
    if (alertRows.some((r) => r.status === "Near limit")) {
      return { type: "warning", text: "🟡 Some regions are close to threshold." }
    }
    return { type: "ok", text: "🟢 All regions are currently in safe range." }
  }

  const downloadCSV = () => {
    if (!alertRows.length) return
    const headers = [
      "region",
      "service",
      "metric",
      "threshold",
      "max_forecast_next_7d",
      "peak_day",
      "status",
    ]
    const rows = alertRows.map((r) =>
      [
        r.region,
        r.service,
        r.metric,
        r.threshold,
        r.max_forecast_next_7d,
        r.peak_day,
        r.status,
      ].join(",")
    )
    const csv = [headers.join(","), ...rows].join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `prediction_alerts.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const saveEmailPreference = () => {
    if (!email || !email.includes("@")) {
      alert("Please enter a valid email")
      return
    }
    // UI-only save. In real deployment save to backend / user profile.
    setEmailSaved(true)
    setTimeout(() => setEmailSaved(false), 2000)
  }

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Prediction Alerts"
        subtitle="Detect upcoming capacity risks and set thresholds for email notifications"
      />

      <Card className="bg-slate-900/50 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              {/* Metric */}
              <div>
                <label className="text-sm text-slate-400 mb-2 block">Metric</label>
                <Select value={metric} onValueChange={(v: MetricKey) => setMetric(v)}>
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

              {/* Region scope */}
              <div>
                <label className="text-sm text-slate-400 mb-2 block">Region scope</label>
                <Select value={regionScope} onValueChange={(v) => setRegionScope(v)}>
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

              {/* Service */}
              <div>
                <label className="text-sm text-slate-400 mb-2 block">Service / Resource Type</label>
                <Select value={service} onValueChange={(v) => setService(v)}>
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

              {/* Threshold slider */}
              <div>
                <label className="text-sm text-slate-400 mb-2 block">Alert threshold</label>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <Slider
                      value={[threshold]}
                      min={10}
                      max={100}
                      step={1}
                      onValueChange={([v]) => setThreshold(v)}
                    />
                  </div>
                  <div className="w-14 text-right text-white">{threshold}</div>
                </div>
              </div>

              {/* Action Buttons (span full width) */}
              <div className="md:col-span-4 flex items-center gap-4">
                <Button
                  onClick={checkAlerts}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500"
                  disabled={checking}
                >
                  {checking ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" /> Checking...
                    </>
                  ) : (
                    "🔍 Check alerts for next 7 days"
                  )}
                </Button>

                <Button variant="outline" onClick={downloadCSV} disabled={!alertRows.length}>
                  <Download className="w-4 h-4 mr-2" /> Download alert table
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Status banner */}
      {alertRows.length > 0 && (
        <div className={`p-3 rounded ${topBanner()?.type === "error" ? "bg-red-900/40 text-white" : topBanner()?.type === "warning" ? "bg-yellow-900/30 text-white" : "bg-green-900/30 text-white"}`}>
          {topBanner()?.text}
        </div>
      )}

      {/* Alerts table */}
      <Card className="bg-slate-900/50 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          {checking ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
          ) : !alertRows.length ? (
            <p className="text-slate-400">No alerts calculated yet. Click "Check alerts for next 7 days".</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse border border-slate-700">
                <thead className="bg-slate-800">
                  <tr>
                    <th className="p-3">region</th>
                    <th className="p-3">service</th>
                    <th className="p-3">metric</th>
                    <th className="p-3">threshold</th>
                    <th className="p-3">max_forecast_next_7d</th>
                    <th className="p-3">peak_day</th>
                    <th className="p-3">status</th>
                  </tr>
                </thead>
                <tbody>
                  {alertRows.map((r, i) => (
                    <tr key={i} className="border-t border-slate-700">
                      <td className="p-3">{r.region}</td>
                      <td className="p-3">{r.service}</td>
                      <td className="p-3">{r.metric}</td>
                      <td className="p-3">{r.threshold}</td>
                      <td className="p-3">{r.max_forecast_next_7d}</td>
                      <td className="p-3">{r.peak_day}</td>
                      <td className="p-3 font-semibold">
                        {r.status === "Safe" ? (
                          <span className="inline-flex items-center gap-2 text-green-300">
                            <span className="w-3 h-3 rounded-full bg-green-400 block" /> Safe
                          </span>
                        ) : r.status === "Near limit" ? (
                          <span className="inline-flex items-center gap-2 text-yellow-300">
                            <span className="w-3 h-3 rounded-full bg-yellow-400 block" /> Near limit
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-2 text-red-300">
                            <span className="w-3 h-3 rounded-full bg-red-400 block" /> High risk
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Email alerts (UI only) */}
      <Card className="bg-slate-900/50 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">Email Alerts (UI only)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="text-sm text-slate-400 mb-1 block">Notification email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full bg-slate-800 border border-slate-700 px-3 py-2 rounded text-slate-100"
              />
            </div>

            <div>
              <label className="text-sm text-slate-400 mb-1 block">Alert trigger</label>
              <select
                className="w-full bg-slate-800 border border-slate-700 px-3 py-2 rounded text-slate-100"
                defaultValue="Only when High risk"
              >
                <option>Only when High risk</option>
                <option>Daily summary</option>
                <option>Weekly summary</option>
              </select>
            </div>

            <div>
              <Button onClick={saveEmailPreference} className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500">
                Save alert preference
              </Button>
              {emailSaved && <p className="text-sm text-emerald-300 mt-2">Saved (UI only)</p>}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
