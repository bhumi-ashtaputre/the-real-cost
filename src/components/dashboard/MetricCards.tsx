"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress, ProgressIndicator } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingDown, TrendingUp, Clock, Landmark, AlertCircle } from "lucide-react"
import { formatCurrency, formatCompactNumber } from "@/lib/utils"

interface MetricCardsProps {
  totalYearlyDrain: number
  totalOpportunityCost: number
  totalLifeHoursLost: number
  hourlyRate: number
  monthlyIncome: number
}

export default function MetricCards({ 
  totalYearlyDrain, 
  totalOpportunityCost, 
  totalLifeHoursLost, 
  hourlyRate,
  monthlyIncome
}: MetricCardsProps) {
  
  if (totalYearlyDrain === 0) {
    return (
      <Card className="glass-card border-dashed border-[#2A2A2F] py-12">
        <CardContent className="flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 bg-[#1A1A1F] rounded-full flex items-center justify-center mb-4">
            <AlertCircle className="text-[#9B9A94]" />
          </div>
          <h3 className="text-lg font-bold">No expenses tracked yet</h3>
          <p className="text-sm text-[#9B9A94] max-w-xs">
            Add your first expense to see the real impact on your wealth and time.
          </p>
        </CardContent>
      </Card>
    )
  }

  const yearlyIncome = monthlyIncome * 12
  const drainPercentage = (totalYearlyDrain / yearlyIncome) * 100

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Yearly Drain */}
      <Card className="glass-card overflow-hidden relative group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <TrendingDown className="w-16 h-16 text-[#F87171]" />
        </div>
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <p className="text-xs font-bold uppercase tracking-widest text-[#9B9A94]">Total Yearly Drain</p>
            {/* Logic for % change would go here if historical data existed */}
          </div>
          <h3 className="text-3xl font-bold mb-4">{formatCurrency(totalYearlyDrain)}</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-bold uppercase">
              <span className="text-[#9B9A94]">Income Leakage</span>
              <span className="text-[#F87171]">{drainPercentage.toFixed(1)}%</span>
            </div>
            <Progress className="h-1.5 bg-[#161618]">
              <ProgressIndicator 
                className="bg-[#F87171]" 
                style={{ width: `${Math.min(drainPercentage, 100)}%` }} 
              />
            </Progress>
          </div>
        </CardContent>
      </Card>

      {/* 10-Year Opportunity Cost */}
      <Card className="glass-card overflow-hidden relative group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <Landmark className="w-16 h-16 text-[#4ADE80]" />
        </div>
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <p className="text-xs font-bold uppercase tracking-widest text-[#9B9A94]">10-Year Opportunity Cost</p>
            <Badge variant="success" className="text-[9px] uppercase font-bold bg-[#4ADE80]/10 text-[#4ADE80] border-none">Projected</Badge>
          </div>
          <h3 className="text-3xl font-bold mb-4">{formatCurrency(totalOpportunityCost)}</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-bold uppercase">
              <span className="text-[#9B9A94]">Wealth at 12% ROI</span>
              <span className="text-[#4ADE80]">Compounded</span>
            </div>
            <Progress className="h-1.5 bg-[#161618]">
              <ProgressIndicator 
                className="bg-[#4ADE80]" 
                style={{ width: `70%` }} 
              />
            </Progress>
          </div>
        </CardContent>
      </Card>

      {/* Life Hours Lost */}
      <Card className="glass-card overflow-hidden relative group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <Clock className="w-16 h-16 text-[#8B5CF6]" />
        </div>
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <p className="text-xs font-bold uppercase tracking-widest text-[#9B9A94]">Monthly Life Hours Lost</p>
          </div>
          <h3 className="text-3xl font-bold mb-1">{(totalLifeHoursLost / 12).toFixed(1)} hrs</h3>
          <p className="text-[10px] text-[#9B9A94] mb-4 font-medium italic">Based on {formatCurrency(hourlyRate)}/hr post-tax</p>
          <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-bold uppercase">
              <span className="text-[#9B9A94]">Time Leakage</span>
              <span className="text-[#8B5CF6]">{( (totalLifeHoursLost / 12) / 160 * 100).toFixed(1)}% of work</span>
            </div>
            <Progress className="h-1.5 bg-[#161618]">
              <ProgressIndicator 
                className="bg-[#8B5CF6]" 
                style={{ width: `${Math.min((totalLifeHoursLost / 12) / 160 * 100, 100)}%` }} 
              />
            </Progress>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
