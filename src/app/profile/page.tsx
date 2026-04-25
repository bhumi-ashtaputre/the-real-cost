"use client"

import Sidebar from "@/components/layout/Sidebar"
import TopBar from "@/components/layout/TopBar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useSession, signOut } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Mail, MapPin, User as UserIcon, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ProfilePage() {
  const { data: session } = useSession()
  const user = session?.user

  return (
    <div className="flex min-h-screen bg-[#0D0D0F] font-sans">
      <Sidebar />
      <main className="flex-1 ml-64">
        <TopBar />
        
        <div className="p-8 max-w-2xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-[#F0EFE8]">My Profile</h1>

          <Card className="glass-card">
            <CardContent className="pt-8 flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 border-2 border-[#8B5CF6] mb-4">
                <AvatarImage src={user?.image || ""} />
                <AvatarFallback className="bg-[#8B5CF6] text-3xl text-white">
                  {user?.name?.split(" ").map(n => n[0]).join("").toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold text-[#F0EFE8]">{user?.name || "User"}</h2>
              <Badge variant="outline" className="mt-2 border-[#8B5CF6] text-[#8B5CF6]">Pro Member</Badge>
              
              <div className="w-full mt-8 space-y-4 text-left">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-[#161618] border border-[#2A2A2F]">
                  <Mail className="w-5 h-5 text-[#9B9A94]" />
                  <div>
                    <p className="text-[10px] text-[#9B9A94] uppercase font-bold tracking-widest">Email Address</p>
                    <p className="text-sm font-medium">{user?.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-[#161618] border border-[#2A2A2F]">
                  <UserIcon className="w-5 h-5 text-[#9B9A94]" />
                  <div>
                    <p className="text-[10px] text-[#9B9A94] uppercase font-bold tracking-widest">Account ID</p>
                    <p className="text-sm font-medium text-xs font-mono">{(user as any)?.id || "N/A"}</p>
                  </div>
                </div>
              </div>

              <div className="w-full mt-8 pt-6 border-t border-[#2A2A2F]">
                <Button 
                  onClick={() => signOut({ callbackUrl: "/" })}
                  variant="destructive" 
                  className="w-full bg-[#F87171]/10 text-[#F87171] hover:bg-[#F87171] hover:text-white border border-[#F87171]/20 transition-all"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout from Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
