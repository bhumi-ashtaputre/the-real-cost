"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import { Coffee, Car, Clapperboard, Music, Utensils, ShoppingBag, Dumbbell, Cigarette, Beer, Cloud, Gamepad2, ChevronRight } from "lucide-react"

import Link from "next/link"

const ICON_MAP: Record<string, any> = {
  coffee: Coffee,
  uber: Car,
  netflix: Clapperboard,
  spotify: Music,
  zomato: Utensils,
  amazon: ShoppingBag,
  gym: Dumbbell,
  cigarettes: Cigarette,

  alcohol: Beer,
  icloud: Cloud,
  gaming: Gamepad2,
}

interface LifeHourLeakageProps {
  expenses: any[]
}

export default function LifeHourLeakage({ expenses }: LifeHourLeakageProps) {
  const topExpenses = expenses.slice(0, 5)

  return (
    <Card className="glass-card h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-[#2A2A2F]">
        <CardTitle className="text-lg font-bold">Life Hour Leakage</CardTitle>
        <Link href="/expenses" className="text-[10px] font-bold uppercase text-[#8B5CF6] hover:underline flex items-center gap-1">
          View All <ChevronRight className="w-3 h-3" />
        </Link>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        {topExpenses.length > 0 ? (
          topExpenses.map((expense, idx) => {
            // This is a bit hacky to find the right icon if name matches or id
            const Icon = ICON_MAP[expense.name.toLowerCase().split("/")[0]] || Coffee
            
            return (
              <div key={expense.id} className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-[#161618] border border-[#2A2A2F] flex items-center justify-center text-[#8B5CF6] group-hover:bg-[#8B5CF6]/10 transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold truncate">{expense.name}</p>
                  <p className="text-[10px] text-[#9B9A94] uppercase tracking-wider font-bold">{expense.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">{expense.lifeHours.toFixed(1)} hrs</p>
                  <p className="text-[10px] text-[#9B9A94] font-medium">/ month</p>
                </div>
              </div>
            )
          })
        ) : (
          <div className="text-center py-12 text-[#9B9A94] text-sm italic">
            No data available
          </div>
        )}

        {topExpenses.length > 0 && (
          <div className="bg-[#8B5CF6]/5 border border-[#8B5CF6]/20 rounded-xl p-4 mt-4">
            <p className="text-[10px] text-[#8B5CF6] font-bold uppercase tracking-widest mb-1">💡 Insight</p>
            <p className="text-xs text-[#F0EFE8]">
              Your top 5 habits cost you <span className="font-bold">{topExpenses.reduce((sum, e) => sum + e.lifeHours, 0).toFixed(1)} hours</span> of your life every month.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
