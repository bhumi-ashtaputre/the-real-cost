import type { Metadata } from "next"
import { DM_Sans } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/components/providers/SessionProvider"
import { Toaster } from "react-hot-toast"

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans"
})

export const metadata: Metadata = {
  title: "The Real Cost | Wealth Intelligence",
  description: "Understand the true financial impact of your daily habits and expenses.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${dmSans.variable} font-sans antialiased bg-[#0D0D0F] text-[#F0EFE8]`}>
        <AuthProvider>
          {children}
          <Toaster 
            position="top-right"
            toastOptions={{
              style: {
                background: '#1A1A1F',
                color: '#F0EFE8',
                border: '1px solid #2A2A2F',
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  )
}
