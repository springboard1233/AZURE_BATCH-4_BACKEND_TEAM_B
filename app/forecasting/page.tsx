"use client"

import { useState, useEffect } from "react"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { fetchForecast, fetchFilterOptions, type ForecastParams, type ForecastDataPoint } from "@/lib/api"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from "recharts"
import { Loader2 } from "lucide-react"

export default function ForecastingPage() {
  const [regions, setRegions] = useState<string[]>([])
  const [resources, setResources] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [forecastData, setForecastData] = useState<ForecastDataPoint[] | null>(null)
  
  const [params, setParams] = useState<ForecastParams>({
    metric: 'cpu',
    model: 'best',
    region: '',
    service: '',
    horizon: 30
  })

  useEffect(() => {
    async function loadOptions() {
      try {
        const options = await fetchFilterOptions()
        setRegions(options.regions)
        setResources(options.resource_types)
        
        if (options.regions.length > 0) {
          setParams(prev => ({ ...prev, region: options.regions[0] }))
        }
        if (options.resource_types.length > 0) {
          setParams(prev => ({ ...prev, service: options.resource_types[0] }))
        }
      } catch (error) {
        console.error("Failed to load filter options:", error)
      }
    }
    loadOptions()
  }, [])

  const handleRunForecast = async () => {
    if (!params.region || !params.service) {
      alert("Please select region and service")
      return
    }

    setLoading(true)
    try {
      const data = await fetchForecast(params)
      setForecastData(data)
    } catch (error) {
      console.error("Failed to fetch forecast:", error)
      alert("Failed to fetch forecast data")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <DashboardHeader 
        title="Forecasting" 
        subtitle="Model-driven predictions across services" 
      />

      {/* Controls */}
      <Card className="bg-slate-900/50 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">Forecast Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Metric */}
            <div>
              <label className="text-sm text-slate-400 mb-2 block">Metric</label>
              <Select 
                value={params.metric} 
                onValueChange={(value: any) => setParams({ ...params, metric: value })}
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

            {/* Model */}
            <div>
              <label className="text-sm text-slate-400 mb-2 block">Model</label>
              <Select 
                value={params.model} 
                onValueChange={(value: any) => setParams({ ...params, model: value })}
              >
                <SelectTrigger className="bg-slate-800 border-slate-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="best">Best</SelectItem>
                  <SelectItem value="arima">ARIMA</SelectItem>
                  <SelectItem value="lightgbm">LightGBM</SelectItem>
                  <SelectItem value="lstm">LSTM</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Region */}
            <div>
              <label className="text-sm text-slate-400 mb-2 block">Region</label>
              <Select 
                value={params.region} 
                onValueChange={(value) => setParams({ ...params, region: value })}
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

            {/* Service */}
            <div>
              <label className="text-sm text-slate-400 mb-2 block">Service / Resource Type</label>
              <Select 
                value={params.service} 
                onValueChange={(value) => setParams({ ...params, service: value })}
              >
                <SelectTrigger className="bg-slate-800 border-slate-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {resources.map(r => (
                    <SelectItem key={r} value={r}>{r}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Horizon Slider */}
          <div className="mt-6">
            <label className="text-sm text-slate-400 mb-2 block">
              Forecast Horizon: {params.horizon} days
            </label>
            <Slider
              value={[params.horizon]}
              onValueChange={([value]) => setParams({ ...params, horizon: value })}
              min={7}
              max={60}
              step={1}
              className="w-full"
            />
          </div>

          {/* Run Button */}
          <div className="mt-6">
            <Button 
              onClick={handleRunForecast}
              disabled={loading}
              className="w-full md:w-auto bg-gradient-to-r from-blue-500 to-cyan-400"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Running Forecast...
                </>
              ) : (
                "📡 Run Forecast"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {forecastData && (
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Forecast Results</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis 
                  dataKey="date" 
                  stroke="#64748b"
                  tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #475569",
                    borderRadius: "8px",
                  }}
                  labelFormatter={(date) => new Date(date).toLocaleDateString()}
                />
                <Legend />
                
                {/* Confidence Band */}
                <Area
                  type="monotone"
                  dataKey="upper_ci"
                  stroke="none"
                  fill="rgba(56,189,248,0.1)"
                  name="Upper Confidence"
                />
                <Area
                  type="monotone"
                  dataKey="lower_ci"
                  stroke="none"
                  fill="rgba(56,189,248,0.1)"
                  name="Lower Confidence"
                />
                
                {/* Forecast Line */}
                <Line
                  type="monotone"
                  dataKey="forecast_value"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={false}
                  name="Forecast"
                />
              </AreaChart>
            </ResponsiveContainer>

            {/* Download Button */}
            <div className="mt-4">
              <Button 
                variant="outline"
                onClick={() => {
                  const csv = [
                    ['Date', 'Forecast', 'Lower CI', 'Upper CI'].join(','),
                    ...forecastData.map(d => 
                      [d.date, d.forecast_value, d.lower_ci, d.upper_ci].join(',')
                    )
                  ].join('\n')
                  
                  const blob = new Blob([csv], { type: 'text/csv' })
                  const url = URL.createObjectURL(blob)
                  const a = document.createElement('a')
                  a.href = url
                  a.download = `forecast_${params.region}_${params.service}.csv`
                  a.click()
                }}
              >
                ⬇️ Download Forecast CSV
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}