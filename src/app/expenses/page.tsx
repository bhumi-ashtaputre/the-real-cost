"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import Sidebar from "@/components/layout/Sidebar"
import TopBar from "@/components/layout/TopBar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import { 
  Coffee, 
  Car, 
  Clapperboard, 
  Music, 
  Utensils, 
  ShoppingBag, 
  Dumbbell, 
  Cigarette, 
  Beer, 
  Cloud, 
  Gamepad2,
  Trash2,
  Plus
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "react-hot-toast"

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

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchExpenses = async () => {
    try {
      const res = await axios.get("/api/expenses")
      setExpenses(res.data)
    } catch (err) {
      console.error(err)
      toast.error("Failed to load expenses")
    } finally {
      setLoading(false)
    }
  }

  const deleteExpense = async (id: string) => {
    try {
      await axios.delete(`/api/expenses?id=${id}`)
      setExpenses(expenses.filter(e => e.id !== id))
      toast.success("Expense removed")
    } catch (err) {
      toast.error("Failed to delete")
    }
  }

  useEffect(() => {
    fetchExpenses()
  }, [])

  return (
    <div className="flex min-h-screen bg-[#0D0D0F] font-sans">
      <Sidebar />
      <main className="flex-1 ml-64">
        <TopBar />
        
        <div className="p-8 max-w-5xl mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-[#F0EFE8]">My Expenses</h1>
              <p className="text-[#9B9A94]">Manage and track your financial leakage points.</p>
            </div>
            <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED]">
              <Plus className="w-4 h-4 mr-2" /> Add New
            </Button>
          </div>

          <Card className="glass-card">
            <CardHeader className="border-b border-[#2A2A2F] pb-4">
              <CardTitle className="text-lg font-bold">All Subscriptions & Habits</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-16 w-full rounded-xl" />)}
                </div>
              ) : expenses.length > 0 ? (
                <div className="space-y-4">
                  {expenses.map((expense) => {
                    const Icon = ICON_MAP[expense.name.toLowerCase().split("/")[0]] || Coffee
                    return (
                      <div key={expense.id} className="flex items-center gap-4 p-4 rounded-xl bg-[#161618] border border-[#2A2A2F] group hover:border-[#8B5CF6]/50 transition-all">
                        <div className="w-12 h-12 rounded-xl bg-[#0D0D0F] flex items-center justify-center text-[#8B5CF6]">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-[#F0EFE8]">{expense.name}</h4>
                          <p className="text-xs text-[#9B9A94] uppercase font-bold tracking-wider">{expense.category}</p>
                        </div>
                        <div className="text-right mr-8">
                          <p className="font-bold text-[#F0EFE8]">{formatCurrency(expense.amount)}</p>
                          <p className="text-[10px] text-[#9B9A94] uppercase font-bold tracking-widest">{expense.frequency}</p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-[#9B9A94] hover:text-[#F87171] hover:bg-[#F87171]/10"
                          onClick={() => deleteExpense(expense.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="w-16 h-16 bg-[#161618] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Receipt className="w-8 h-8 text-[#2A2A2F]" />
                  </div>
                  <h3 className="text-lg font-bold">No expenses found</h3>
                  <p className="text-[#9B9A94] text-sm max-w-xs mx-auto mt-2">Start tracking your wealth leaks by adding your first expense.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

function Receipt({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1Z" />
      <path d="M16 8h-6" />
      <path d="M16 12H8" />
      <path d="M13 16H8" />
    </svg>
  )
}
