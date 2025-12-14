"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface TrendChartProps {
  title: string
  type: "cpu" | "storage" | "users"
  data: { day: string; value: number }[]
}

export default function TrendChart({ title, type, data }: TrendChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value))

  const getChartColor = () => {
    switch (type) {
      case "cpu":
        return "#3b82f6" // blue
      case "storage":
        return "#06b6d4" // cyan
      case "users":
        return "#8b5cf6" // purple
      default:
        return "#3b82f6"
    }
  }

  return (
    <Card className="bg-slate-900/50 border-slate-800 hover:border-blue-500/50 transition-all duration-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold text-slate-300">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis 
              dataKey="day" 
              stroke="#64748b" 
              style={{ fontSize: "12px" }} 
              interval={Math.floor(data.length / 5)} 
            />
            <YAxis 
              stroke="#64748b" 
              style={{ fontSize: "12px" }} 
              domain={[0, Math.ceil(maxValue * 1.1)]} 
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #475569",
                borderRadius: "8px",
                padding: "8px 12px",
              }}
              labelStyle={{ color: "#cbd5e1" }}
              wrapperStyle={{ outline: "none" }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={getChartColor()}
              strokeWidth={2}
              dot={false}
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}