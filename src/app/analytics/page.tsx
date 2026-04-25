"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import Sidebar from "@/components/layout/Sidebar"
import TopBar from "@/components/layout/TopBar"
import CategoryBreakdown from "@/components/analytics/CategoryBreakdown"
import WealthProjection from "@/components/analytics/WealthProjection"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { formatCurrency } from "@/lib/utils"
import { TrendingUp, Clock, AlertTriangle } from "lucide-react"

export default function AnalyticsPage() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const fetchAnalytics = async () => {
    try {
      const res = await axios.get("/api/dashboard")
      setData(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAnalytics()
  }, [])

  return (
    <div className="flex min-h-screen bg-[#0D0D0F] font-sans">
      <Sidebar />
      <main className="flex-1 ml-64">
        <TopBar />
        
        <div className="p-8 space-y-8 max-w-6xl mx-auto">
          <div>
            <h1 className="text-3xl font-bold text-[#F0EFE8]">Deep Analytics</h1>
            <p className="text-[#9B9A94]">Understanding your long-term wealth trajectory.</p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Skeleton className="h-[400px] rounded-2xl" />
              <Skeleton className="h-[400px] rounded-2xl" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <CategoryBreakdown data={data.byCategory} />
                <WealthProjection monthlyAmount={data.totalYearlyDrain / 12} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="glass-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs uppercase tracking-widest text-[#9B9A94]">30-Year Wealth Loss</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-[#F87171]">
                      {formatCurrency((data.totalYearlyDrain / 12) * ((Math.pow(1 + 0.01, 360) - 1) / 0.01))}
                    </p>
                    <p className="text-[10px] text-[#9B9A94] mt-1">Total opportunity cost if habits continue.</p>
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs uppercase tracking-widest text-[#9B9A94]">Monthly Life Loss</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-[#8B5CF6]">
                      {Math.round(data.totalLifeHoursLost / 12)} Hours
                    </p>
                    <p className="text-[10px] text-[#9B9A94] mt-1">Time spent working just to pay for these habits.</p>
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs uppercase tracking-widest text-[#9B9A94]">Leakage Severity</CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center gap-3">
                    <div className="h-2 flex-1 bg-[#161618] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#F59E0B]" 
                        style={{ width: `${Math.min((data.totalYearlyDrain / (data.user.monthlyIncome * 12)) * 100, 100)}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold text-[#F59E0B]">
                      {((data.totalYearlyDrain / (data.user.monthlyIncome * 12)) * 100).toFixed(1)}%
                    </span>
                  </CardContent>
                </Card>
              </div>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-[#F59E0B]" />
                    Top Financial Leaks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.lifeHourLeakage.slice(0, 5).map((leak: any, i: number) => (
                      <div key={leak.id} className="flex items-center justify-between p-3 rounded-lg bg-[#161618] border border-[#2A2A2F]">
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-[#2A2A2F] flex items-center justify-center text-[10px] font-bold">{i+1}</span>
                          <div>
                            <p className="text-sm font-bold">{leak.name}</p>
                            <p className="text-[10px] text-[#9B9A94] uppercase tracking-wider">{leak.category}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-[#F87171]">{formatCurrency(leak.amount)}/{leak.frequency}</p>
                          <p className="text-[10px] text-[#9B9A94]">{leak.lifeHours.toFixed(1)} Life Hours/mo</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
