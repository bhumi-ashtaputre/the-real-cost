"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  Receipt, 
  PlusCircle, 
  User, 
  BarChart3, 
  ShieldCheck,
  HelpCircle,
  LogOut,
  Wallet,
  Zap
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"
import { toast } from "react-hot-toast"

const NAV_ITEMS = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { name: "Expenses", icon: Receipt, href: "/expenses" },
  { name: "Add Expense", icon: PlusCircle, href: "/add" },
  { name: "Analytics", icon: BarChart3, href: "/analytics" },
  { name: "Audit", icon: ShieldCheck, href: "/audit" },
  { name: "Profile", icon: User, href: "/profile" },
]

export default function Sidebar() {
  const pathname = usePathname()

  const handleUpgrade = () => {
    toast.success("Premium features coming soon!", {
      icon: "🚀",
      duration: 4000,
    })
  }

  const handleHelp = () => {
    toast.error("Help Center is currently undergoing maintenance.", {
      icon: "🛠️",
    })
  }

  return (
    <aside className="w-64 bg-[#161618] border-r border-[#2A2A2F] flex flex-col h-screen fixed left-0 top-0 z-50">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-[#8B5CF6] rounded-lg flex items-center justify-center shadow-lg shadow-[#8B5CF6]/20">
            <Wallet className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-[#F0EFE8] leading-tight">The Real Cost</h1>
            <p className="text-[10px] text-[#9B9A94] uppercase tracking-tighter font-bold">Wealth Intelligence</p>
          </div>
        </div>

        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group",
                  isActive 
                    ? "bg-[#8B5CF6] text-white" 
                    : "text-[#9B9A94] hover:text-[#F0EFE8] hover:bg-[#1A1A1F]"
                )}
              >
                <item.icon className={cn(
                  "w-4 h-4 transition-colors",
                  isActive ? "text-white" : "text-[#9B9A94] group-hover:text-[#F0EFE8]"
                )} />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="mt-auto p-4 space-y-4">
        <div className="bg-gradient-to-br from-[#8B5CF6]/20 to-[#1A1A1F] border border-[#8B5CF6]/30 rounded-xl p-4 transition-all hover:border-[#8B5CF6]/60">
          <div className="w-8 h-8 bg-[#8B5CF6] rounded-full flex items-center justify-center mb-3">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <h4 className="text-sm font-bold mb-1">Go Pro</h4>
          <p className="text-[10px] text-[#9B9A94] mb-3">Unlock advanced analytics and real-time bank syncing.</p>
          <Button 
            onClick={handleUpgrade}
            size="sm" 
            className="w-full h-8 text-[10px] uppercase font-bold bg-[#8B5CF6] hover:bg-[#7C3AED] transition-all active:scale-95"
          >
            Upgrade Now
          </Button>
        </div>

        <div className="space-y-1">
          <button 
            onClick={handleHelp}
            className="flex items-center gap-3 px-3 py-2 w-full text-sm font-medium text-[#9B9A94] hover:text-[#F0EFE8] transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
            Help Center
          </button>
          <button 
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-3 px-3 py-2 w-full text-sm font-medium text-[#F87171] hover:bg-[#F87171]/10 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  )
}
