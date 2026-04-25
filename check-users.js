require('dotenv').config()
const { PrismaClient } = require('@prisma/client')

const { PrismaPg } = require('@prisma/adapter-pg')
const { Pool } = require('pg')

async function main() {
  const connectionString = process.env.DATABASE_URL
  const pool = new Pool({ connectionString })
  const adapter = new PrismaPg(pool)
  const prisma = new PrismaClient({ adapter })

  try {
    const users = await prisma.user.findMany({
      select: { email: true, name: true }
    })
    console.log('Users in database:', users)
  } catch (err) {
    console.error('Error fetching users:', err)
  } finally {
    await prisma.$disconnect()
  }
}

main()
