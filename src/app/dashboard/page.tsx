"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import Sidebar from "@/components/layout/Sidebar"
import TopBar from "@/components/layout/TopBar"
import MetricCards from "@/components/dashboard/MetricCards"
import CategoryChart from "@/components/dashboard/CategoryChart"
import LifeHourLeakage from "@/components/dashboard/LifeHourLeakage"
import WhatIfSimulator from "@/components/dashboard/WhatIfSimulator"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"

export default function Dashboard() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const fetchDashboard = async () => {
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
    fetchDashboard()
  }, [])

  return (
    <div className="flex min-h-screen bg-[#0D0D0F] font-sans">
      <Sidebar />
      <main className="flex-1 ml-64">
        <TopBar />
        
        <div className="p-8 space-y-8">
          {loading ? (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => <Skeleton key={i} className="h-32 w-full rounded-2xl" />)}
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Skeleton className="h-[400px] rounded-2xl" />
                <Skeleton className="h-[400px] rounded-2xl" />
              </div>
            </div>
          ) : (
            <>
              <MetricCards 
                totalYearlyDrain={data.totalYearlyDrain}
                totalOpportunityCost={data.totalOpportunityCost}
                totalLifeHoursLost={data.totalLifeHoursLost}
                hourlyRate={data.user.hourlyRate}
                monthlyIncome={data.user.monthlyIncome}
              />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <CategoryChart data={data.byCategory} />
                  <WhatIfSimulator expenses={data.lifeHourLeakage} />
                </div>
                <div className="space-y-8">
                  <LifeHourLeakage expenses={data.lifeHourLeakage} />
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      <Link href="/add">
        <Button 
          className="fixed bottom-8 right-8 h-14 w-14 rounded-full bg-[#8B5CF6] hover:bg-[#7C3AED] shadow-xl shadow-[#8B5CF6]/30 p-0 transition-all active:scale-95 z-50"
        >
          <Plus className="w-6 h-6" />
        </Button>
      </Link>
    </div>
  )
}
