import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { UserRole } from "./constants/user";
import { authService } from "./services/auth.service";

// Define routes that anyone can see (Home, About, etc.)
export const publicRoutes = ["/", "/about", "/contact", "/leaderboard"];

export const authRoutes = [
  "/login",
  "/sign-up",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
];

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const session = await authService.getSession();

  const isAuthRoute = authRoutes.includes(pathname);
  const isPublicRoute = publicRoutes.includes(pathname);

  // 1. If it's a public route (like Home), let them through regardless of session
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // 2. If logged in and trying to access login/signup, send to dashboard/challenges
  if (session && isAuthRoute) {
    return NextResponse.redirect(new URL("/challenges", request.url));
  }

  // 3. If NOT logged in and NOT on an auth route, send to login
  // This prevents the infinite loop because it won't trigger if already on /login
  if (!session && !isAuthRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 4. Role-Based Protection (Uncommented and cleaned)
  if (session) {
    const role = session.user.role;

    // Example: Prevent Users from hitting Admin routes
    if (role === UserRole.USER && pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/challenges", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * 1. API routes (/api)
     * 2. Next.js internals (_next/static, _next/image)
     * 3. Common static files (extensions like .png, .jpg, .svg, etc.)
     * 4. Metadata files (favicon, sitemap, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
