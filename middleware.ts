import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isOnLoginPage = req.nextUrl.pathname.startsWith("/login")
  const isOnProtectedPage = 
    req.nextUrl.pathname.startsWith("/courses") ||
    req.nextUrl.pathname.startsWith("/tools")

  if (isOnProtectedPage && !isLoggedIn) {
    return Response.redirect(new URL("/login", req.nextUrl))
  }

  if (isOnLoginPage && isLoggedIn) {
    return Response.redirect(new URL("/", req.nextUrl))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
