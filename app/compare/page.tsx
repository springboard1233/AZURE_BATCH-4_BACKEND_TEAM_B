"use client"

import { useEffect, useState } from "react"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { fetchModelComparison } from "@/lib/api"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from "recharts"
import { Loader2 } from "lucide-react"

interface ModelInfo {
  name: string
  mae: number
  rmse: number
  mape: number
  train_time: number
  infer_time: number
  is_best: boolean
}

export default function CompareModelsPage() {
  const [metric, setMetric] = useState<"cpu" | "storage" | "users">("cpu")
  const [models, setModels] = useState<ModelInfo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const data = await fetchModelComparison(metric)
        setModels(data)
      } catch (err) {
        console.error("Failed to fetch model comparison:", err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [metric])

  const chartData = models.map(m => ({
    name: m.name,
    MAE: m.mae,
    RMSE: m.rmse,
    MAPE: m.mape
  }))

  return (
    <div className="space-y-6">
      <DashboardHeader 
        title="Model Comparison"
        subtitle="Compare forecasting models across accuracy and performance"
      />

      {/* Filter */}
      <Card className="bg-slate-900/50 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">Select Metric</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full md:w-60">
            <Select
              value={metric}
              onValueChange={(v: any) => setMetric(v)}
            >
              <SelectTrigger className="bg-slate-800 border-slate-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cpu">CPU Usage</SelectItem>
                <SelectItem value="storage">Storage Usage</SelectItem>
                <SelectItem value="users">Active Users</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Chart */}
      <Card className="bg-slate-900/50 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">Error Metrics Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #475569",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="MAE" fill="#3b82f6" />
                <Bar dataKey="RMSE" fill="#22d3ee" />
                <Bar dataKey="MAPE" fill="#a78bfa" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      {/* Model Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {models.map(model => (
          <Card 
            key={model.name}
            className={`border-slate-800 ${
              model.is_best ? "bg-blue-900/40 border-blue-500" : "bg-slate-900/40"
            }`}
          >
            <CardHeader>
              <CardTitle className="text-white flex justify-between">
                {model.name}
                {model.is_best && (
                  <span className="text-xs bg-blue-600 px-2 py-1 rounded-md">
                    ⭐ Best Model
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-slate-300 space-y-2">
              <p><strong>MAE:</strong> {model.mae}</p>
              <p><strong>RMSE:</strong> {model.rmse}</p>
              <p><strong>MAPE:</strong> {model.mape}%</p>
              <p><strong>Training Time:</strong> {model.train_time}s</p>
              <p><strong>Inference Time:</strong> {model.infer_time}s</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
