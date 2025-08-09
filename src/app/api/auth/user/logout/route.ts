import { NextResponse } from "next/server";

export async function POST() {
  try {
    const res = NextResponse.json({ message: "Logged out successfully" });

    // Clear cookie by setting empty value + expiry in past
    res.cookies.set({
      name: "token",
      value: "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      expires: new Date(0), // immediately expire
    });

    return res;
  } catch (error) {
    console.error("Logout Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
