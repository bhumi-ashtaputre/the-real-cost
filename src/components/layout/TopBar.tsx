"use client"

import { useSession, signOut } from "next-auth/react"
import { Bell, Search, TrendingUp, LogOut } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { toast } from "react-hot-toast"

export default function TopBar() {
  const { data: session } = useSession()
  const userName = session?.user?.name || "User"

  const handlePlanClick = () => {
    toast.success("Premium plans are being prepared for launch!", {
      icon: "💎",
    })
  }

  return (
    <header className="h-20 border-b border-[#2A2A2F] flex items-center justify-between px-8 bg-[#0D0D0F]/80 backdrop-blur-md sticky top-0 z-40">
      <div>
        <h2 className="text-xl font-bold text-[#F0EFE8]">Hello, {userName}!</h2>
        <p className="text-xs text-[#9B9A94]">Take control of your time and wealth.</p>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden lg:flex items-center gap-2 bg-[#161618] px-3 py-1.5 rounded-full border border-[#2A2A2F]">
          <TrendingUp className="w-4 h-4 text-[#4ADE80]" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#4ADE80]">Live Markets</span>
          <div className="w-1.5 h-1.5 bg-[#4ADE80] rounded-full animate-pulse" />
        </div>

        <div className="flex items-center gap-4">
          <button className="text-[#9B9A94] hover:text-[#F0EFE8] transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#F87171] rounded-full border-2 border-[#0D0D0F]" />
          </button>
          
          <div className="flex items-center gap-4 pl-4 border-l border-[#2A2A2F]">
            <div className="text-right hidden sm:block cursor-pointer" onClick={handlePlanClick}>
              <p className="text-xs font-bold">{userName}</p>
              <Badge variant="outline" className="text-[9px] h-4 py-0 border-[#8B5CF6] text-[#8B5CF6] hover:bg-[#8B5CF6]/10 transition-colors">Basic Plan</Badge>
            </div>
            <Avatar className="h-9 w-9 border border-[#2A2A2F]">
              <AvatarImage src={session?.user?.image || ""} />
              <AvatarFallback className="bg-[#8B5CF6] text-white text-xs">
                {userName.split(" ").map(n => n[0]).join("").toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <button 
              onClick={() => signOut({ callbackUrl: "/" })}
              className="p-2 text-[#9B9A94] hover:text-[#F87171] hover:bg-[#F87171]/10 rounded-lg transition-all"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
