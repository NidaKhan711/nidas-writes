import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isLoginPage = pathname === "/adminauth";
  const isAuthApi = pathname.startsWith("/api/adminauth");
  const isAdminRoute = pathname.startsWith("/admin") && !isLoginPage;
  const isAdminApiRoute = pathname.startsWith("/api/admin");

  const token = request.cookies.get("adminToken")?.value;

  // Auth API → always allowed
  if (isAuthApi) return NextResponse.next();

  // Admin routes → require valid token
  if (isAdminRoute || isAdminApiRoute) {
    if (!token) {
      if (isAdminApiRoute) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      } else {
        return NextResponse.redirect(new URL("/adminauth", request.url));
      }
    }

    try {
      // Ensure we have a proper JWT secret - FIXED THIS LINE
      const jwtSecret = process.env.JWT_SECRET || "fallback_secret";
      if (!jwtSecret || jwtSecret === "fallback_secret") {
        console.error("❌ JWT_SECRET is not properly configured");
        throw new Error("Invalid JWT configuration");
      }

      const decoded = jwt.verify(token, jwtSecret) as jwt.JwtPayload;

      console.log("✅ Decoded token:", decoded);

      if (decoded.role !== "admin") {
        // Clear invalid token
        const response = NextResponse.redirect(new URL("/adminauth", request.url));
        response.cookies.delete("adminToken");
        return response;
      }
      
      // Token is valid, continue to the requested page
      return NextResponse.next();
    } catch (err) {
      console.error("❌ Token verification failed:", err);
      
      // Clear invalid token
      const response = isAdminApiRoute
        ? NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        : NextResponse.redirect(new URL("/adminauth", request.url));
      
      response.cookies.delete("adminToken");
      return response;
    }
  }

  // If already logged in as admin → prevent going back to login
  if (isLoginPage && token) {
    try {
      const jwtSecret = process.env.JWT_SECRET || "fallback_secret";
      if (!jwtSecret || jwtSecret === "fallback_secret") {
        return NextResponse.next();
      }

      const decoded = jwt.verify(token, jwtSecret) as jwt.JwtPayload;

      if (decoded.role === "admin") {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
    } catch {
      // If token verification fails, allow access to login page
      return NextResponse.next();
    }
  }

  console.log("🟢 Path:", pathname, "Token:", token ? "Present" : "Absent");
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*", "/api/adminauth/:path*", "/adminauth"],
};