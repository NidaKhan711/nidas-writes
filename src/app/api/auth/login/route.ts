import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import userModel from "@/models/userModel";
import { connectDB } from "@/db/dbconnect";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "All fields required" }, { status: 400 });
    }

    const user = await userModel.findOne({ email });
    if (!user) return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });

    return NextResponse.json({ message: "Login successful", user: { name: user.name, email: user.email } });
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
