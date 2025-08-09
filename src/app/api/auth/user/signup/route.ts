import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import userModel from "@/models/userModel";
import { connectDB } from "@/db/dbconnect";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: "All fields required" }, { status: 400 });
    }

    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({ name, email, password: hashedPassword });
    console.log("User created:", user); 

    return NextResponse.json(
      { message: "User created", user: { name: user.name, email: user.email } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
 