"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { formatCurrency, formatCompactNumber } from "@/lib/utils"
import { TrendingUp, Clock, Target } from "lucide-react"

interface WhatIfSimulatorProps {
  expenses: any[]
}

export default function WhatIfSimulator({ expenses }: WhatIfSimulatorProps) {
  const [years, setYears] = useState([10])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  
  const selectedExpense = useMemo(() => {
    if (!expenses || expenses.length === 0) return null
    if (selectedId) {
      return expenses.find(e => e.id === selectedId) || expenses[0]
    }
    return expenses[0]
  }, [expenses, selectedId])

  const calculations = useMemo(() => {
    if (!selectedExpense) return null
    
    const yearsVal = years[0]
    const monthlyAmount = (selectedExpense.amount * (selectedExpense.frequency === "daily" ? 30.5 : selectedExpense.frequency === "weekly" ? 4.33 : 1))
    
    // Wealth calculation (12% annual return)
    const rate = 0.12 / 12
    const n = yearsVal * 12
    const wealth = monthlyAmount * ((Math.pow(1 + rate, n) - 1) / rate)
    
    // Hours reclaimed
    const hoursReclaimed = selectedExpense.lifeHours * 12 * yearsVal
    
    return { wealth, hoursReclaimed, monthlyAmount }
  }, [selectedExpense, years])

  if (!selectedExpense) return null

  return (
    <Card className="glass-card bg-gradient-to-br from-[#1A1A1F] to-[#0D0D0F]">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Target className="w-5 h-5 text-[#8B5CF6]" />
          What If? Simulator
        </CardTitle>
        {expenses.length > 1 && (
          <select 
            value={selectedId || ""} 
            onChange={(e) => setSelectedId(e.target.value)}
            className="bg-[#161618] border border-[#2A2A2F] text-xs rounded-md px-2 py-1 outline-none focus:border-[#8B5CF6]/50 transition-all cursor-pointer"
          >
            {expenses.map(e => (
              <option key={e.id} value={e.id}>{e.name}</option>
            ))}
          </select>
        )}
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="bg-[#161618] rounded-2xl p-6 border border-[#2A2A2F]">
          <p className="text-lg md:text-xl font-medium leading-relaxed">
            &quot;If I cut <span className="text-[#8B5CF6] font-bold">[{selectedExpense.name}]</span> {selectedExpense.frequency} for 
            <span className="mx-2 bg-[#8B5CF6] text-white px-3 py-1 rounded-lg font-bold">{years[0]} years</span> 
            and invest at 12%...&quot;
          </p>
        </div>

        <div className="px-2">
          <div className="flex justify-between mb-4">
            <span className="text-xs font-bold text-[#9B9A94] uppercase tracking-widest">Time Horizon</span>
            <span className="text-sm font-bold text-[#F0EFE8]">{years[0]} Years</span>
          </div>
          <Slider 
            value={years} 
            onValueChange={setYears} 
            max={30} 
            min={1} 
            step={1} 
            className="[&_[role=slider]]:bg-[#8B5CF6] [&_[role=slider]]:border-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#161618] p-5 rounded-xl border border-[#2A2A2F] flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#4ADE80]/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#4ADE80]" />
            </div>
            <div>
              <p className="text-[10px] text-[#9B9A94] uppercase font-bold">Projected Wealth</p>
              <h4 className="text-xl font-bold text-[#4ADE80]">{formatCurrency(calculations?.wealth || 0)}</h4>
            </div>
          </div>
          <div className="bg-[#161618] p-5 rounded-xl border border-[#2A2A2F] flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#8B5CF6]/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-[#8B5CF6]" />
            </div>
            <div>
              <p className="text-[10px] text-[#9B9A94] uppercase font-bold">Hours Reclaimed</p>
              <h4 className="text-xl font-bold text-[#8B5CF6]">{Math.round(calculations?.hoursReclaimed || 0)} hrs</h4>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
