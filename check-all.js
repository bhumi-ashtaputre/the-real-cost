const { PrismaClient } = require('@prisma/client')
const { PrismaPg } = require('@prisma/adapter-pg')
const { Pool } = require('pg')
require('dotenv').config()

async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })
  const adapter = new PrismaPg(pool)
  const prisma = new PrismaClient({ adapter })
  
  const users = await prisma.user.findMany({
    include: { expenses: true }
  })
  
  users.forEach(u => {
    console.log(`User: ${u.email} (${u.name})`)
    console.log(`Expenses:`, u.expenses.map(e => e.name))
    console.log('---')
  })
  
  await prisma.$disconnect()
}

main()
