import { NextResponse } from "next/server";
import blogModel from "@/utils/models/blogModel";
import connectDB from "@/utils/db/dbconnect";

// type for params
interface Params {
  params: {
    slug: string;
  };
}

// ✅ GET Single Blog
export async function GET(req: Request, { params }: Params) {
  await connectDB();
  try {
    const blog = await blogModel.findOne({ slug: params.slug });
    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, blog });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Unknown error" },
      { status: 500 }
    );
  }
}

// ✅ Update Blog (Admin Only)
export async function PUT(req: Request, { params }: Params) {
  await connectDB();
  try {
    const body = await req.json();
    const updatedBlog = await blogModel.findOneAndUpdate(
      { slug: params.slug },
      body,
      { new: true }
    );

    if (!updatedBlog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, blog: updatedBlog });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Unknown error" },
      { status: 500 }
    );
  }
}

// ✅ Delete Blog (Admin Only)
export async function DELETE(req: Request, { params }: Params) {
  await connectDB();
  try {
    const deletedBlog = await blogModel.findOneAndDelete({ slug: params.slug });

    if (!deletedBlog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Unknown error" },
      { status: 500 }
    );
  }
}
