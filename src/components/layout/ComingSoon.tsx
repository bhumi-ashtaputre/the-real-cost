"use client"

import Sidebar from "@/components/layout/Sidebar"
import TopBar from "@/components/layout/TopBar"
import { BarChart3 } from "lucide-react"

export default function ComingSoon({ title, icon: Icon }: { title: string, icon: any }) {
  return (
    <div className="flex min-h-screen bg-[#0D0D0F] font-sans">
      <Sidebar />
      <main className="flex-1 ml-64">
        <TopBar />
        <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)] text-center p-8">
          <div className="w-20 h-20 bg-[#161618] rounded-2xl flex items-center justify-center mb-6 border border-[#2A2A2F]">
            <Icon className="w-10 h-10 text-[#8B5CF6]" />
          </div>
          <h1 className="text-3xl font-bold text-[#F0EFE8] mb-2">{title}</h1>
          <p className="text-[#9B9A94] max-w-md mx-auto">
            We&apos;re currently building advanced wealth intelligence features for this page. 
            Stay tuned for deeper insights!
          </p>
        </div>
      </main>
    </div>
  )
}
