# Deployment Guide: The Real Cost App

This guide will help you push your code to GitHub and deploy it to Vercel with a production-ready database.

## 1. Push to GitHub

1.  Go to [GitHub](https://github.com/new) and create a new repository named `the-real-cost`.
2.  **Do not** initialize it with a README, license, or .gitignore (the project already has these).
3.  In your terminal, run the following commands (replace `yourusername` with your actual GitHub username):

```bash
git remote add origin https://github.com/yourusername/the-real-cost.git
git branch -M main
git push -u origin main
```

## 2. Set Up a Production Database

Since Vercel cannot connect to your local computer's database, you need a cloud-hosted PostgreSQL database.

**Recommendation: Supabase or Neon**
1.  Create a free project on [Supabase](https://supabase.com/) or [Neon](https://neon.tech/).
2.  Get your **Connection String** (Database URL). It will look like: `postgresql://postgres:password@db-host:5432/postgres`

## 3. Deploy to Vercel

1.  Go to [Vercel](https://vercel.com/new) and import your `the-real-cost` repository.
2.  **Environment Variables**: You MUST add the following variables in the Vercel dashboard:
    - `DATABASE_URL`: Your production database URL from Step 2.
    - `NEXTAUTH_SECRET`: A random string (e.g., run `openssl rand -base64 32` or just type a long random phrase).
    - `NEXTAUTH_URL`: `https://your-app-name.vercel.app` (or just leave it blank if using Vercel, it often detects it).

3.  **Build Command**: Vercel will automatically detect Next.js.
4.  **Install Command**: `npm install`
5.  **Build Command**: `npx prisma generate && next build`

## 4. Run Migrations

Once the app is connected to the production database, you need to create the tables:

```bash
npx prisma migrate dev --name init
```
*(Or run this command locally while your `.env` points to the Supabase/Neon URL).*

## 5. Summary of .env variables
Make sure your local `.env` is updated if you want to test against production, but **NEVER** commit your `.env` file to GitHub.

```env
DATABASE_URL="your_supabase_or_neon_url"
NEXTAUTH_SECRET="your_random_secret"
NEXTAUTH_URL="http://localhost:3000"
```
