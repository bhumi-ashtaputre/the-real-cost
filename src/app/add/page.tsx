"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import Sidebar from "@/components/layout/Sidebar"
import TopBar from "@/components/layout/TopBar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
  Save,
  ArrowLeft
} from "lucide-react"
import { toast } from "react-hot-toast"

const CATEGORIES = [
  "food", "transport", "subscriptions", "entertainment", "shopping", "lifestyle"
]

const PRESET_HABITS = [
  { name: "Coffee/Tea", amount: 150, frequency: "daily", category: "lifestyle" },
  { name: "Uber/Ola", amount: 300, frequency: "weekly", category: "transport" },
  { name: "Netflix", amount: 649, frequency: "monthly", category: "subscriptions" },
  { name: "Spotify", amount: 119, frequency: "monthly", category: "subscriptions" },
  { name: "Zomato/Swiggy", amount: 500, frequency: "weekly", category: "food" },
  { name: "Amazon Prime", amount: 299, frequency: "monthly", category: "subscriptions" },
  { name: "Gym", amount: 1500, frequency: "monthly", category: "lifestyle" },
  { name: "Cigarettes", amount: 50, frequency: "daily", category: "lifestyle" },
  { name: "Alcohol", amount: 500, frequency: "weekly", category: "lifestyle" },
  { name: "iCloud/G-One", amount: 130, frequency: "monthly", category: "subscriptions" },
  { name: "Gaming", amount: 500, frequency: "monthly", category: "entertainment" },
]

export default function AddExpensePage() {
  const [name, setName] = useState("")
  const [amount, setAmount] = useState("")
  const [frequency, setFrequency] = useState("monthly")
  const [category, setCategory] = useState("lifestyle")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleQuickSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const habit = PRESET_HABITS.find(h => h.name === e.target.value)
    if (habit) {
      setName(habit.name)
      setAmount(habit.amount.toString())
      setFrequency(habit.frequency)
      setCategory(habit.category)
      toast.success(`Selected ${habit.name}!`)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !amount) return

    setLoading(true)
    try {
      await axios.post("/api/expenses", {
        name,
        amount: parseFloat(amount),
        frequency,
        category,
      })
      toast.success("Expense added successfully")
      router.push("/dashboard")
    } catch (err) {
      toast.error("Failed to add expense")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-[#0D0D0F] font-sans">
      <Sidebar />
      <main className="flex-1 ml-64">
        <TopBar />
        
        <div className="p-8 max-w-2xl mx-auto space-y-8">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-[#9B9A94] hover:text-[#F0EFE8] transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-[#F0EFE8]">Add New Habit</h1>
            <div className="w-48">
              <Label htmlFor="quick-select" className="text-[10px] text-[#9B9A94] uppercase font-bold mb-1 block">Quick Select</Label>
              <select 
                id="quick-select"
                onChange={handleQuickSelect}
                className="w-full h-9 bg-[#161618] border border-[#8B5CF6]/30 rounded-md px-2 text-xs text-[#F0EFE8] focus:border-[#8B5CF6] transition-all cursor-pointer"
              >
                <option value="">Common Habits...</option>
                {PRESET_HABITS.map(h => (
                  <option key={h.name} value={h.name}>{h.name}</option>
                ))}
              </select>
            </div>
          </div>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Expense Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Habit Name</Label>
                  <Input 
                    id="name"
                    placeholder="e.g. Daily Latte, Netflix, Gym"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-[#161618] border-[#2A2A2F] focus:border-[#8B5CF6]/50 transition-all"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount (₹)</Label>
                    <Input 
                      id="amount"
                      type="number"
                      placeholder="500"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="bg-[#161618] border-[#2A2A2F] focus:border-[#8B5CF6]/50 transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="frequency">Frequency</Label>
                    <select 
                      id="frequency"
                      value={frequency}
                      onChange={(e) => setFrequency(e.target.value)}
                      className="w-full h-10 bg-[#161618] border border-[#2A2A2F] rounded-md px-3 text-sm focus:border-[#8B5CF6]/50 transition-all cursor-pointer"
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="one-time">One-time</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select 
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full h-10 bg-[#161618] border border-[#2A2A2F] rounded-md px-3 text-sm focus:border-[#8B5CF6]/50 transition-all cursor-pointer"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat} className="capitalize">{cat}</option>
                    ))}
                  </select>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] h-12 mt-4 shadow-lg shadow-[#8B5CF6]/20 transition-all active:scale-[0.98]"
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add to Leakage Audit"}
                  <Save className="w-4 h-4 ml-2" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
