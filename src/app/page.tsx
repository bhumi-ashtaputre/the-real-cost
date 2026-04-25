"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Globe, Mail, Lock, User, Wallet } from "lucide-react"
import { toast, Toaster } from "react-hot-toast"
import axios from "axios"

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError("Invalid email or password")
        toast.error("Invalid credentials")
      } else {
        router.push("/dashboard")
      }
    } catch (err) {
      setError("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    try {
      // In a real app, you'd have an api/auth/signup route
      // For this demo, I'll implement a simple one
      const response = await axios.post("/api/auth/signup", { name, email, password })

      if (response.data.success) {
        toast.success("Account created!")
        await signIn("credentials", { email, password, callbackUrl: "/onboarding" })
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Signup failed")
      toast.error(err.response?.data?.error || "Signup failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D0D0F] p-4 font-sans">
      <Toaster position="top-center" />
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-primary/20">
            <Wallet className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-[#F0EFE8]">The Real Cost</h1>
          <p className="text-[#9B9A94] uppercase tracking-widest text-xs font-semibold mt-1">Wealth Intelligence</p>
        </div>

        <Card className="glass-card border-[#2A2A2F]">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-[#161618] p-1 rounded-t-xl rounded-b-none">
              <TabsTrigger value="login" className="data-[state=active]:bg-[#1A1A1F]">Login</TabsTrigger>
              <TabsTrigger value="signup" className="data-[state=active]:bg-[#1A1A1F]">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="p-6">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-[#9B9A94]" />
                    <Input id="email" name="email" type="email" placeholder="name@example.com" className="pl-10 bg-[#161618] border-[#2A2A2F]" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-[#9B9A94]" />
                    <Input id="password" name="password" type="password" placeholder="••••••••" className="pl-10 bg-[#161618] border-[#2A2A2F]" required />
                  </div>
                </div>
                {error && <p className="text-destructive text-sm font-medium">{error}</p>}
                <Button type="submit" className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white py-6" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Continue"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="p-6">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-[#9B9A94]" />
                    <Input id="signup-name" name="name" type="text" placeholder="John Doe" className="pl-10 bg-[#161618] border-[#2A2A2F]" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-[#9B9A94]" />
                    <Input id="signup-email" name="email" type="email" placeholder="name@example.com" className="pl-10 bg-[#161618] border-[#2A2A2F]" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-[#9B9A94]" />
                    <Input id="signup-password" name="password" type="password" placeholder="••••••••" className="pl-10 bg-[#161618] border-[#2A2A2F]" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-[#9B9A94]" />
                    <Input id="confirm-password" name="confirmPassword" type="password" placeholder="••••••••" className="pl-10 bg-[#161618] border-[#2A2A2F]" required />
                  </div>
                </div>
                {error && <p className="text-destructive text-sm font-medium">{error}</p>}
                <Button type="submit" className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white py-6" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Sign Up"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="px-6 pb-6 pt-0">
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-[#2A2A2F]"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#1A1A1F] px-2 text-[#9B9A94]">Or continue with</span>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full bg-[#161618] border-[#2A2A2F] text-[#F0EFE8] hover:bg-[#1A1A1F] py-6"
              onClick={() => signIn("google")}
            >
              <Globe className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
