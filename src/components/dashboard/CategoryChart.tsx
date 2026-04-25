"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { cn, formatCurrency } from "@/lib/utils"

interface CategoryChartProps {
  data: { name: string, value: number }[]
}

export default function CategoryChart({ data }: CategoryChartProps) {
  const [view, setView] = useState<"yearly" | "monthly" | "daily">("monthly")

  const chartData = data.map(item => ({
    name: item.name.charAt(0).toUpperCase() + item.name.slice(1),
    value: view === "yearly" ? item.value : view === "monthly" ? item.value / 12 : item.value / 365
  })).sort((a, b) => b.value - a.value)

  return (
    <Card className="glass-card h-[400px]">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-bold">Spend by Category</CardTitle>
        <div className="flex bg-[#161618] rounded-lg p-1 border border-[#2A2A2F]">
          {(["daily", "monthly", "yearly"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={cn(
                "px-3 py-1 text-[10px] font-bold uppercase rounded-md transition-all",
                view === v ? "bg-[#8B5CF6] text-white" : "text-[#9B9A94] hover:text-[#F0EFE8]"
              )}
            >
              {v}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="h-[300px] w-full pt-4">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2A2A2F" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#9B9A94', fontSize: 10 }}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#9B9A94', fontSize: 10 }}
                tickFormatter={(val) => `₹${val}`}
              />
              <Tooltip 
                cursor={{ fill: 'rgba(139, 92, 246, 0.1)' }}
                contentStyle={{ 
                  backgroundColor: '#1A1A1F', 
                  border: '1px solid #2A2A2F',
                  borderRadius: '8px',
                  color: '#F0EFE8'
                }}
                formatter={(val: any) => [formatCurrency(val as number), "Spend"]}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={40}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 0 ? "#8B5CF6" : "#8B5CF680"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center border border-dashed border-[#2A2A2F] rounded-xl text-[#9B9A94] text-sm">
            Add data to see chart
          </div>
        )}
      </CardContent>
    </Card>
  )
}
