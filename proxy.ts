import { NextRequest, NextResponse } from "next/server";
import { ACCESS_COOKIE, REFRESH_COOKIE } from "@/lib/auth-session";

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasToken =
    request.cookies.has(ACCESS_COOKIE) || request.cookies.has(REFRESH_COOKIE);

  // 1. Root /admin routing
  if (pathname === "/admin") {
    const url = request.nextUrl.clone();
    url.pathname = hasToken ? "/admin/dashboard" : "/admin/login";
    return NextResponse.redirect(url);
  }

  // 2. Protected /admin/dashboard - redirect unauthenticated to /admin/login
  if (pathname.startsWith("/admin/dashboard") && !hasToken) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  // 3. /admin/login - if already authenticated, redirect to /admin/dashboard
  if (pathname === "/admin/login" && hasToken) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/dashboard";
    return NextResponse.redirect(url);
  }

  const response = NextResponse.next();

  // Industry Standard Enterprise Security Headers
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), browsing-topics=()"
  );

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - static assets
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
