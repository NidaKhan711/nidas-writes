import { NextResponse } from "next/server";
import emailModel from "@/utils/models/emailModel";
import connectDB from "@/utils/db/dbconnect";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    await connectDB();
    const formData = await request.formData();
    const email = formData.get("email");
    
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingEmail = await emailModel.findOne({ email });
    if (existingEmail) {
      return NextResponse.json(
        { success: true, message: "Email already exists" },
        { status: 200 }
      );
    }

    // Create new email entry
    await emailModel.create({ email });
    
    return NextResponse.json(
      { success: true, message: "Email saved successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error saving email:", error);
    
    // Handle duplicate key error (MongoDB duplicate key error code)
    if (typeof error === 'object' && error !== null && 'code' in error && error.code === 11000) {
      return NextResponse.json(
        { success: true, message: "Email already exists" },
        { status: 200 }
      );
    }
    
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

// for adminpanel to get all emails
export async function GET(): Promise<NextResponse> {
  try {
    await connectDB();
    const emails = await emailModel.find();
    return NextResponse.json({ emails });
  } catch (error: unknown) {
    console.error("Error fetching emails:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

// for adminpanel to delete an email
export async function DELETE(request: Request): Promise<NextResponse> {
  try {
    await connectDB();
    const id = new URL(request.url).searchParams.get("id");
    
    if (!id) {
      return NextResponse.json(
        { success: false, message: "Email ID is required" },
        { status: 400 }
      );
    }
    
    const result = await emailModel.findByIdAndDelete(id);
    
    if (!result) {
      return NextResponse.json(
        { success: false, message: "Email not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, message: "Email deleted successfully" });
  } catch (error: unknown) {
    console.error("Error deleting email:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}