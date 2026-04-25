# The Real Cost — Wealth Intelligence

The Real Cost is a premium wealth intelligence platform that helps you visualize the true financial impact of your daily habits. By modeling opportunity cost and "Life Hours", it empowers you to make smarter financial decisions.

## Features
- **Dynamic Dashboard**: Real-time calculation of yearly drain, 10-year opportunity cost, and life hours lost.
- **Onboarding Flow**: Quick setup for income and common habits.
- **What If? Simulator**: Interactive tool to see how much wealth you could build by cutting specific expenses.
- **Expense Tracking**: Categorized view of all your leakage points.
- **Premium Design**: Dark-themed glassmorphic UI built with Tailwind CSS and Framer Motion.

## Tech Stack
- **Framework**: Next.js 14+ (App Router)
- **Database**: PostgreSQL with Prisma ORM
- **Auth**: NextAuth.js
- **Styling**: Tailwind CSS + shadcn/ui
- **Charts**: Recharts
- **Animations**: Framer Motion

## Local Setup

1. **Clone the repository**
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Set up environment variables**
   Copy `.env.example` to `.env` and fill in your details:
   ```bash
   cp .env.example .env
   ```
4. **Database Migration**
   Ensure your PostgreSQL instance is running, then:
   ```bash
   npx prisma migrate dev --name init
   ```
5. **Seed the database**
   ```bash
   npx prisma db seed
   ```
6. **Run the development server**
   ```bash
   npm run dev
   ```

## Demo Credentials
- **Email**: `demo@therealcost.app`
- **Password**: `demo1234`

## Calculation Engine
- **Yearly Drain**: Sum of all expenses multiplied by their frequency.
- **Opportunity Cost**: Projected wealth if the same amount was invested at a 12% annual return over 10 years.
- **Life Hours**: The amount of working hours required to pay for the yearly cost of a habit, based on your hourly rate.
