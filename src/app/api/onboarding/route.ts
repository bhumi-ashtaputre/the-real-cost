import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { monthlyIncome, city, expenses } = body

    const hourlyRate = monthlyIncome / 160

    // Update user
    await prisma.user.update({
      where: { email: session.user.email! },
      data: {
        monthlyIncome,
        hourlyRate,
        city,
        onboardingComplete: true,
      },
    })

    // Delete existing expenses to avoid duplicates if onboarding is re-run
    await prisma.expense.deleteMany({
      where: { userId: (session.user as any).id },
    })

    // Create expenses

    if (expenses && expenses.length > 0) {
      await prisma.expense.createMany({
        data: expenses.map((e: any) => ({
          userId: (session.user as any).id,
          name: e.name,
          amount: parseFloat(e.amount),
          frequency: e.frequency,
          category: e.category || "lifestyle",
          icon: typeof e.icon === "string" ? e.icon : e.id || null,
        })),
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Onboarding error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
