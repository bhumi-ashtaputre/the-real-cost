import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const isAuth = !!token
    const { pathname } = req.nextUrl

    // If user is authenticated and tries to access login/signup, redirect to dashboard
    if (isAuth && pathname === "/") {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }

    // Check onboarding status if user is authenticated
    if (isAuth && token.onboardingComplete === false && pathname === "/dashboard") {
      return NextResponse.redirect(new URL("/onboarding", req.url))
    }

    return NextResponse.next()
  },
  {
    pages: {
      signIn: "/",
    },
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl
        // Public paths
        if (pathname === "/" || pathname.startsWith("/api/auth")) {
          return true
        }
        return !!token
      },
    },
  }
)


export const config = {
  matcher: [
    "/dashboard/:path*",
    "/onboarding/:path*",
    "/expenses/:path*",
    "/",
  ],
}
