"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
  Plus, 
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Wallet
} from "lucide-react"

import { toast } from "react-hot-toast"
import { motion, AnimatePresence } from "framer-motion"
import axios from "axios"
import { formatCurrency } from "@/lib/utils"

const PRESET_HABITS = [
  { id: "coffee", name: "Coffee/Tea", icon: <Coffee />, amount: 150, frequency: "daily", category: "lifestyle" },
  { id: "uber", name: "Uber/Ola", icon: <Car />, amount: 300, frequency: "weekly", category: "transport" },
  { id: "netflix", name: "Netflix", icon: <Clapperboard />, amount: 649, frequency: "monthly", category: "subscriptions" },
  { id: "spotify", name: "Spotify", icon: <Music />, amount: 119, frequency: "monthly", category: "subscriptions" },
  { id: "zomato", name: "Zomato/Swiggy", icon: <Utensils />, amount: 500, frequency: "weekly", category: "food" },
  { id: "amazon", name: "Amazon Prime", icon: <ShoppingBag />, amount: 299, frequency: "monthly", category: "subscriptions" },
  { id: "gym", name: "Gym", icon: <Dumbbell />, amount: 1500, frequency: "monthly", category: "lifestyle" },
  { id: "cigarettes", name: "Cigarettes", icon: <Cigarette />, amount: 50, frequency: "daily", category: "lifestyle" },
  { id: "alcohol", name: "Alcohol", icon: <Beer />, amount: 500, frequency: "weekly", category: "lifestyle" },
  { id: "icloud", name: "iCloud/G-One", icon: <Cloud />, amount: 130, frequency: "monthly", category: "subscriptions" },
  { id: "gaming", name: "Gaming", icon: <Gamepad2 />, amount: 500, frequency: "monthly", category: "entertainment" },
]

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [income, setIncome] = useState("")
  const [city, setCity] = useState("")
  const [selectedExpenses, setSelectedExpenses] = useState<any[]>([])

  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { update } = useSession()


  const handleToggleHabit = (habit: any) => {
    const exists = selectedExpenses.find(e => e.id === habit.id)
    if (exists) {
      setSelectedExpenses(selectedExpenses.filter(e => e.id !== habit.id))
    } else {
      setSelectedExpenses([...selectedExpenses, { ...habit }])
    }
  }

  const handleUpdateExpense = (id: string, field: string, value: any) => {
    setSelectedExpenses(selectedExpenses.map(e => 
      e.id === id ? { ...e, [field]: value } : e
    ))
  }

  const handleFinish = async () => {
    setIsSubmitting(true)
    try {
      await axios.post("/api/onboarding", {
        monthlyIncome: parseFloat(income),
        city,
        expenses: selectedExpenses
      })
      toast.success("Welcome to The Real Cost!")
      await update({ onboardingComplete: true })
      router.push("/dashboard")

    } catch (err) {

      toast.error("Failed to save data")
    } finally {
      setIsSubmitting(false)
    }
  }

  const progress = (step / 3) * 100

  return (
    <div className="min-h-screen bg-[#0D0D0F] text-[#F0EFE8] flex flex-col items-center py-12 px-4 font-sans">
      <div className="w-full max-w-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Wallet className="w-6 h-6 text-[#8B5CF6]" />
            <h1 className="text-xl font-bold">The Real Cost</h1>
          </div>
          <div className="w-full bg-[#161618] h-1.5 rounded-full overflow-hidden mb-2">
            <motion.div 
              className="bg-[#8B5CF6] h-full" 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="text-xs text-[#9B9A94] uppercase tracking-widest">Step {step} of 3</p>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-2xl">Tell us about you</CardTitle>
                  <CardDescription>This helps us calculate your &quot;Life Hour&quot; cost.</CardDescription>

                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#9B9A94]">Monthly Take-Home Income (₹)</label>
                    <Input 
                      type="number" 
                      placeholder="e.g. 100000" 
                      value={income} 
                      onChange={(e) => setIncome(e.target.value)}
                      className="bg-[#161618] border-[#2A2A2F] text-lg py-6"
                    />
                    {income && (
                      <p className="text-xs text-[#8B5CF6] font-medium">
                        Your estimated hourly rate: {formatCurrency(parseFloat(income) / 160)}/hr
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#9B9A94]">City (Optional)</label>
                    <Input 
                      placeholder="e.g. Bangalore" 
                      value={city} 
                      onChange={(e) => setCity(e.target.value)}
                      className="bg-[#161618] border-[#2A2A2F]"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] py-6"
                    disabled={!income}
                    onClick={() => setStep(2)}
                  >
                    Next <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-2xl">What do you regularly spend on?</CardTitle>
                  <CardDescription>Tap to add your common daily/monthly habits.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {PRESET_HABITS.map((habit) => {
                      const isSelected = selectedExpenses.find(e => e.id === habit.id)
                      return (
                        <button
                          key={habit.id}
                          onClick={() => handleToggleHabit(habit)}
                          className={cn(
                            "flex flex-col items-center justify-center p-4 rounded-xl border transition-all",
                            isSelected 
                              ? "bg-[#8B5CF6]/20 border-[#8B5CF6] ring-1 ring-[#8B5CF6]" 
                              : "bg-[#161618] border-[#2A2A2F] hover:border-[#8B5CF6]/50"
                          )}
                        >
                          <div className={cn("mb-2", isSelected ? "text-[#8B5CF6]" : "text-[#9B9A94]")}>
                            {habit.icon}
                          </div>
                          <span className="text-xs font-semibold text-center">{habit.name}</span>
                          <span className="text-[10px] text-[#9B9A94]">{formatCurrency(habit.amount)}</span>
                        </button>
                      )
                    })}
                    <button className="flex flex-col items-center justify-center p-4 rounded-xl border border-dashed border-[#2A2A2F] bg-transparent hover:border-[#8B5CF6]/50 text-[#9B9A94]">
                      <Plus className="mb-2" />
                      <span className="text-xs font-semibold">Custom</span>
                    </button>
                  </div>

                  {selectedExpenses.length > 0 && (
                    <div className="mt-8 space-y-4">
                      <h4 className="text-sm font-bold uppercase tracking-wider text-[#9B9A94]">Edit Added Habits</h4>
                      <div className="space-y-3">
                        {selectedExpenses.map((expense) => (
                          <div key={expense.id} className="flex items-center gap-3 bg-[#161618] p-3 rounded-lg border border-[#2A2A2F]">
                            <div className="text-[#8B5CF6]">{expense.icon}</div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">{expense.name}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Input 
                                type="number" 
                                value={expense.amount} 
                                onChange={(e) => handleUpdateExpense(expense.id, "amount", e.target.value)}
                                className="w-20 h-8 bg-[#0D0D0F] border-[#2A2A2F] text-right"
                              />
                              <select 
                                value={expense.frequency}
                                onChange={(e) => handleUpdateExpense(expense.id, "frequency", e.target.value)}
                                className="h-8 bg-[#0D0D0F] border border-[#2A2A2F] rounded px-1 text-[10px] uppercase font-bold"
                              >
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                              </select>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex gap-3">
                  <Button variant="ghost" onClick={() => setStep(1)} className="flex-1">
                    <ChevronLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button 
                    className="flex-[2] bg-[#8B5CF6] hover:bg-[#7C3AED]"
                    onClick={() => setStep(3)}
                  >
                    Continue <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card className="glass-card text-center">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-[#4ADE80]/20 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-10 h-10 text-[#4ADE80]" />
                  </div>
                  <CardTitle className="text-2xl">Ready to go!</CardTitle>
                  <CardDescription>We&apos;ve analyzed {selectedExpenses.length} habits.</CardDescription>

                </CardHeader>
                <CardContent>
                  <div className="bg-[#161618] rounded-xl p-6 text-left border border-[#2A2A2F]">
                    <div className="flex justify-between items-center mb-4 border-b border-[#2A2A2F] pb-4">
                      <span className="text-[#9B9A94]">Monthly Savings Potential</span>
                      <span className="text-xl font-bold text-[#4ADE80]">
                        {formatCurrency(selectedExpenses.reduce((sum, e) => {
                          const amt = parseFloat(e.amount)
                          if (e.frequency === "daily") return sum + (amt * 30.5)
                          if (e.frequency === "weekly") return sum + (amt * 4.33)
                          return sum + amt
                        }, 0))}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {selectedExpenses.map(e => (
                        <div key={e.id} className="flex justify-between text-sm">
                          <span className="text-[#F0EFE8]">{e.name}</span>
                          <span className="text-[#9B9A94]">{formatCurrency(e.amount)}/{e.frequency}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-3">
                  <Button 
                    className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] py-6"
                    onClick={handleFinish}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Saving..." : "Take me to my dashboard"}
                  </Button>
                  <Button variant="ghost" onClick={() => setStep(2)} disabled={isSubmitting}>
                    Edit Habits
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

import { cn } from "@/lib/utils"

