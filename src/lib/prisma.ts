import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const prismaClientSingleton = () => {
  const connectionString = process.env.DATABASE_URL
  
  if (!connectionString && process.env.NODE_ENV === 'production') {
    throw new Error("DATABASE_URL is not defined in production environment")
  }

  const pool = new Pool({ 
    connectionString: connectionString || "postgresql://postgres:bhumi123@localhost:5433/therealcost?schema=public" 
  })
  const adapter = new PrismaPg(pool)
  return new PrismaClient({ adapter })
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

export const prisma = globalThis.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma