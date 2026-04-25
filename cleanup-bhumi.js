const { PrismaClient } = require('@prisma/client')
const { PrismaPg } = require('@prisma/adapter-pg')
const { Pool } = require('pg')
require('dotenv').config()

async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })
  const adapter = new PrismaPg(pool)
  const prisma = new PrismaClient({ adapter })
  
  const result = await prisma.expense.deleteMany({
    where: { user: { email: 'bhumi@gmail.com' } }
  })
  
  console.log(`Deleted ${result.count} duplicate expenses for Bhumi.`)
  console.log(`Please go back to /onboarding or use the "Add Expense" page to start fresh.`)
  
  await prisma.$disconnect()
}

main()
