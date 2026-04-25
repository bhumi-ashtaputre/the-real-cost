"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, AlertCircle, Zap, ShieldCheck } from "lucide-react"

interface AuditChecklistProps {
  expenses: any[]
  monthlyIncome: number
}

export default function AuditChecklist({ expenses, monthlyIncome }: AuditChecklistProps) {
  const findings = []

  // High frequency finding
  const dailyHabits = expenses.filter(e => e.frequency === "daily")
  if (dailyHabits.length > 2) {
    findings.push({
      title: "High Daily Leakage",
      description: `You have ${dailyHabits.length} daily habits. Small daily costs compound into massive wealth drains over time.`,
      severity: "high",
      fix: "Try moving at least one daily habit to 'weekly' to save immediate life hours."
    })
  }

  // Subscription finding
  const subs = expenses.filter(e => e.category === "subscriptions")
  if (subs.length > 5) {
    findings.push({
      title: "Subscription Overload",
      description: `You are managing ${subs.length} active subscriptions.`,
      severity: "medium",
      fix: "Audit your subscriptions and cancel any you haven't used in the last 30 days."
    })
  }

  // Large single drain
  const largeDrain = expenses.find(e => e.amount > (monthlyIncome * 0.1))
  if (largeDrain) {
    findings.push({
      title: "Major Wealth Leak",
      description: `${largeDrain.name} accounts for a significant portion of your income.`,
      severity: "high",
      fix: "Look for alternatives or reduce frequency for this specific habit."
    })
  }

  // Default positive finding
  if (findings.length === 0) {
    findings.push({
      title: "Wealth Fortress",
      description: "No major leakage points detected in your current habits.",
      severity: "low",
      fix: "Keep maintaining your current financial discipline!"
    })
  }

  return (
    <div className="space-y-4">
      {findings.map((item, i) => (
        <div key={i} className="bg-[#161618] border border-[#2A2A2F] rounded-2xl p-6 relative overflow-hidden group hover:border-[#8B5CF6]/30 transition-all">
          <div className={`absolute top-0 left-0 w-1 h-full ${
            item.severity === "high" ? "bg-[#EF4444]" : item.severity === "medium" ? "bg-[#F59E0B]" : "bg-[#10B981]"
          }`} />
          
          <div className="flex items-start gap-4">
            <div className={`p-2 rounded-lg ${
              item.severity === "high" ? "bg-[#EF4444]/10 text-[#EF4444]" : item.severity === "medium" ? "bg-[#F59E0B]/10 text-[#F59E0B]" : "bg-[#10B981]/10 text-[#10B981]"
            }`}>
              {item.severity === "high" ? <AlertCircle className="w-5 h-5" /> : <Zap className="w-5 h-5" />}
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-[#F0EFE8] mb-1">{item.title}</h4>
              <p className="text-sm text-[#9B9A94] mb-4">{item.description}</p>
              
              <div className="bg-[#0D0D0F] rounded-lg p-3 border border-[#2A2A2F] flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-[#8B5CF6]" />
                <p className="text-xs font-medium text-[#F0EFE8]"><span className="text-[#8B5CF6] uppercase font-bold text-[10px] mr-2">Action:</span> {item.fix}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
