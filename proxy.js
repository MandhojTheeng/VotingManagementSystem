// proxy.js  (new file in project root)
import { NextResponse } from "next/server";

// Named export: function proxy (required for Next.js 16 proxy)
export function proxy(req) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  // Protect these routes: redirect to /login if no token
  const protectedPaths = ["/admin", "/dashboard", "/vote"];
  const isProtectedRoute = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );

  if (isProtectedRoute && !token) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    // Optional: Preserve original path for post-login redirect
    url.searchParams.set("redirect", pathname + (req.nextUrl.search || ""));
    return NextResponse.redirect(url);
  }

  // Allow request to proceed
  return NextResponse.next();
}

// Matcher: Applies only to specified paths (unchanged)
export const config = {
  matcher: [
    "/admin/:path*",
    "/dashboard/:path*",
    "/vote/:path*",
  ],
};