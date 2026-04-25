import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { aggregateDashboard } from "@/lib/costEngine"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
      include: { expenses: true },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const dashboardData = aggregateDashboard(user.expenses, user.hourlyRate)

    return NextResponse.json({
      user: {
        name: user.name,
        email: user.email,
        monthlyIncome: user.monthlyIncome,
        hourlyRate: user.hourlyRate,
      },
      ...dashboardData,
    })
  } catch (error) {
    console.error("Dashboard API error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
