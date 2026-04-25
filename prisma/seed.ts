import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const passwordHash = await bcrypt.hash('demo1234', 10)
  
  const user = await prisma.user.upsert({
    where: { email: 'demo@therealcost.app' },
    update: {},
    create: {
      name: 'Demo User',
      email: 'demo@therealcost.app',
      passwordHash: passwordHash,
      monthlyIncome: 150000,
      hourlyRate: 150000 / 160,
      onboardingComplete: true,
      city: 'Bangalore',
      expenses: {
        create: [
          { name: 'Starbucks Coffee', amount: 450, frequency: 'weekly', category: 'food', icon: 'coffee' },
          { name: 'Uber Premium', amount: 800, frequency: 'weekly', category: 'transport', icon: 'uber' },
          { name: 'Netflix Premium', amount: 649, frequency: 'monthly', category: 'subscriptions', icon: 'netflix' },
          { name: 'Zomato Daily', amount: 350, frequency: 'daily', category: 'food', icon: 'zomato' },
          { name: 'Gold Gym', amount: 2500, frequency: 'monthly', category: 'lifestyle', icon: 'gym' },
          { name: 'Gaming Rig EMI', amount: 5000, frequency: 'monthly', category: 'entertainment', icon: 'gaming' },
        ]
      }
    },
  })

  console.log({ user })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
