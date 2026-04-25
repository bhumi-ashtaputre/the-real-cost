"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import Sidebar from "@/components/layout/Sidebar"
import TopBar from "@/components/layout/TopBar"
import AuditChecklist from "@/components/audit/AuditChecklist"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { formatCurrency } from "@/lib/utils"
import { ShieldCheck, Activity, Target, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function AuditPage() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const fetchAudit = async () => {
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
    fetchAudit()
  }, [])

  const healthScore = data ? Math.max(0, Math.min(100, 100 - (data.totalYearlyDrain / (data.user.monthlyIncome * 12) * 500))) : 0

  return (
    <div className="flex min-h-screen bg-[#0D0D0F] font-sans">
      <Sidebar />
      <main className="flex-1 ml-64">
        <TopBar />
        
        <div className="p-8 space-y-8 max-w-5xl mx-auto">
          <div>
            <h1 className="text-3xl font-bold text-[#F0EFE8]">Wealth Leakage Audit</h1>
            <p className="text-[#9B9A94]">A clinical analysis of your financial health.</p>
          </div>

          {loading ? (
            <div className="space-y-8">
              <Skeleton className="h-48 rounded-2xl" />
              <Skeleton className="h-[400px] rounded-2xl" />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <Card className="glass-card bg-gradient-to-br from-[#161618] to-[#0D0D0F]">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-[#8B5CF6]" />
                      Audit Findings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <AuditChecklist 
                      expenses={data.lifeHourLeakage} 
                      monthlyIncome={data.user.monthlyIncome} 
                    />
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Target className="w-5 h-5 text-[#8B5CF6]" />
                      Optimization Potential
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-[#10B981]/10 border border-[#10B981]/20 rounded-xl p-6 text-center">
                      <p className="text-sm text-[#10B981] font-bold uppercase tracking-widest mb-2">Maximum Potential</p>
                      <h3 className="text-4xl font-black text-[#F0EFE8] mb-4">
                        {formatCurrency(data.totalYearlyDrain / 12)} <span className="text-lg font-normal text-[#9B9A94]">/ month</span>
                      </h3>
                      <p className="text-xs text-[#9B9A94] max-w-sm mx-auto mb-6">
                        By optimizing just 50% of your current detected leaks, you could reclaim 
                        <span className="text-[#F0EFE8] font-bold mx-1">{Math.round(data.totalLifeHoursLost / 24)} hours</span> 
                        of your life every month.
                      </p>
                      <Link href="/add">
                        <button className="bg-[#10B981] hover:bg-[#059669] text-white px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2 mx-auto transition-all active:scale-95">
                          Start Optimization <ArrowRight className="w-4 h-4" />
                        </button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-8">
                <Card className="glass-card">
                  <CardHeader className="text-center pb-2">
                    <CardTitle className="text-xs uppercase tracking-widest text-[#9B9A94]">Wealth Health Score</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center">
                    <div className="relative w-40 h-40 flex items-center justify-center mb-4">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="80"
                          cy="80"
                          r="70"
                          stroke="#161618"
                          strokeWidth="12"
                          fill="transparent"
                        />
                        <circle
                          cx="80"
                          cy="80"
                          r="70"
                          stroke={healthScore > 70 ? "#10B981" : healthScore > 40 ? "#F59E0B" : "#EF4444"}
                          strokeWidth="12"
                          fill="transparent"
                          strokeDasharray={440}
                          strokeDashoffset={440 - (440 * healthScore) / 100}
                          strokeLinecap="round"
                          className="transition-all duration-1000 ease-out"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-black text-[#F0EFE8]">{Math.round(healthScore)}</span>
                        <span className="text-[10px] text-[#9B9A94] font-bold uppercase tracking-widest">Score</span>
                      </div>
                    </div>
                    <p className="text-xs text-center text-[#9B9A94] leading-relaxed">
                      {healthScore > 80 ? "Your financial fortress is strong." : healthScore > 50 ? "Your wealth has several visible leaks." : "Your wealth is in critical condition."}
                    </p>
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-sm font-bold flex items-center gap-2">
                      <Activity className="w-4 h-4 text-[#8B5CF6]" />
                      Audit Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-[10px] uppercase font-bold text-[#9B9A94] mb-1">
                        <span>Leakage Coverage</span>
                        <span>100%</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#161618] rounded-full overflow-hidden">
                        <div className="h-full bg-[#8B5CF6] w-full" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[10px] uppercase font-bold text-[#9B9A94] mb-1">
                        <span>Data Integrity</span>
                        <span>High</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#161618] rounded-full overflow-hidden">
                        <div className="h-full bg-[#10B981] w-[90%]" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
