const MULTIPLIERS: Record<string, number> = { 
  daily: 365, 
  weekly: 52, 
  monthly: 12, 
  "one-time": 1 
}

export function yearlyAmount(amount: number, frequency: string) {
  return amount * (MULTIPLIERS[frequency] ?? 1)
}

/**
 * Calculates opportunity cost over a period of time.
 * Formula: PMT * (((1 + r)^n - 1) / r)
 * @param amount - The periodic amount
 * @param frequency - daily, weekly, monthly, or one-time
 * @param years - Time horizon (default 10)
 * @param rate - Annual return rate (default 12% or 0.12)
 */
export function opportunityCost(amount: number, frequency: string, years = 10, rate = 0.12) {
  const yearly = yearlyAmount(amount, frequency)
  const monthly = yearly / 12
  const n = years * 12 // total months
  const r = rate / 12   // monthly rate
  
  if (r === 0) return yearly * years
  
  return monthly * ((Math.pow(1 + r, n) - 1) / r)
}

export function lifeHourCost(amount: number, frequency: string, hourlyRate: number) {
  // Yearly cost divided by (hourly rate * months in year)
  // Actually, life hours lost per month = monthly cost / hourly rate
  // Life hours lost per year = yearly cost / hourly rate
  return yearlyAmount(amount, frequency) / hourlyRate
}

interface Expense {
  id: string
  name: string
  amount: number
  frequency: string
  category: string
  icon?: string | null
}

export function groupAndSum(expenses: Expense[]) {
  const categories: Record<string, number> = {}
  expenses.forEach(e => {
    const yearly = yearlyAmount(e.amount, e.frequency)
    categories[e.category] = (categories[e.category] || 0) + yearly
  })
  return Object.entries(categories).map(([name, value]) => ({ name, value }))
}

export function aggregateDashboard(expenses: Expense[], hourlyRate: number) {
  const totalYearlyDrain = expenses.reduce((sum, e) => sum + yearlyAmount(e.amount, e.frequency), 0)
  const totalOpportunityCost = expenses.reduce((sum, e) => sum + opportunityCost(e.amount, e.frequency), 0)
  const totalLifeHoursLost = expenses.reduce((sum, e) => sum + lifeHourCost(e.amount, e.frequency, hourlyRate), 0)

  return {
    totalYearlyDrain,
    totalOpportunityCost,
    totalLifeHoursLost,
    byCategory: groupAndSum(expenses),
    lifeHourLeakage: expenses
      .map(e => ({ 
        ...e, 
        lifeHours: lifeHourCost(e.amount, e.frequency, hourlyRate) / 12 // monthly hours lost
      }))
      .sort((a, b) => b.lifeHours - a.lifeHours)
  }
}
