"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { formatCompactNumber } from "@/lib/utils"

interface WealthProjectionProps {
  monthlyAmount: number
}

export default function WealthProjection({ monthlyAmount }: WealthProjectionProps) {
  const data = [5, 10, 15, 20, 25, 30].map(years => {
    const rate = 0.12 / 12
    const n = years * 12
    const wealth = monthlyAmount * ((Math.pow(1 + rate, n) - 1) / rate)
    return {
      years: `${years}Y`,
      wealth: Math.round(wealth)
    }
  })

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-lg">Wealth Growth Projection (12% APY)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorWealth" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2F" vertical={false} />
              <XAxis 
                dataKey="years" 
                stroke="#9B9A94" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
              />
              <YAxis 
                stroke="#9B9A94" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
                tickFormatter={(value) => `₹${formatCompactNumber(value)}`}
              />
              <Tooltip 
                contentStyle={{ background: "#161618", border: "1px solid #2A2A2F", borderRadius: "8px" }}
                itemStyle={{ color: "#8B5CF6" }}
                formatter={(value: any) => [`₹${value.toLocaleString()}`, "Projected Wealth"]}
              />
              <Area 
                type="monotone" 
                dataKey="wealth" 
                stroke="#8B5CF6" 
                fillOpacity={1} 
                fill="url(#colorWealth)" 
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
