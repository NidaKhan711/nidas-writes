import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // ✅ Admin credentials check (from ENV)
    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // ✅ Create JWT token with role
    const token = jwt.sign(
      { email, role: "admin" }, // 👈 role added here
      process.env.JWT_SECRET || "fallback_secret",
      { expiresIn: "24h" }
    );

    // ✅ Send response + set cookie
    const response = NextResponse.json(
      { message: "Login successful", role: "admin" }, // 👈 response updated
      { status: 200 }
    );

    response.cookies.set("adminToken", token, {
      httpOnly:  false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",            // available everywhere
      maxAge: 24 * 60 * 60, // 1 day
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
