import { NextResponse } from "next/server";
import blogModel from "@/utils/models/blogModel";
import connectDB from "@/utils/db/dbconnect";
import { v2 as cloudinary } from "cloudinary";

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ---------- GET ----------
export async function GET(request: Request) {
  try {
    await connectDB();

    const url = new URL(request.url);
    const blogId = url.searchParams.get("id");

    if (blogId) {
      const blog = await blogModel.findById(blogId);
      if (!blog) {
        return NextResponse.json({ error: "Blog not found" }, { status: 404 });
      }
      return NextResponse.json(blog);
    } else {
      const blogs = await blogModel.find({});
      return NextResponse.json({ blogs });
    }
  } catch (error: unknown) {
    console.error("Error fetching blog:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// ---------- POST ----------
export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const { title, description, authorName, category, image, authorImage } = body;

    // ✅ Slug generator
    const slug = title
      ? title
          .toLowerCase()
          .trim()
          .replace(/\s+/g, "-")
          .replace(/&/g, "-and-")
          .replace(/[^\w\-]+/g, "")
          .replace(/\-\-+/g, "-")
      : "new-post";

    const newBlog = await blogModel.create({
      title,
      slug,
      description,
      authorName,
      category: category || "General",
      image,
      authorImage,
      date: new Date(),
    });

    return NextResponse.json(
      {
        success: true,
        blog: newBlog,
        message: "Blog uploaded successfully",
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Upload error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}


// ---------- DELETE ----------
export async function DELETE(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "Blog ID is required" }, { status: 400 });
    }

    const blog = await blogModel.findById(id);
    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    // Cloudinary se blog image delete
    if (blog.image) {
      const url = new URL(blog.image);
      const publicId = url.pathname.split("/").slice(-1)[0].split(".")[0];
      await cloudinary.uploader.destroy(`blog_images/${publicId}`);
    }

    // Cloudinary se author image delete
    if (blog.authorImage) {
      const url = new URL(blog.authorImage);
      const publicId = url.pathname.split("/").slice(-1)[0].split(".")[0];
      await cloudinary.uploader.destroy(`author_images/${publicId}`);
    }

    await blogModel.findByIdAndDelete(id);

    return NextResponse.json({ message: "Blog deleted successfully" });
  } catch (error: unknown) {
    console.error("Error deleting blog:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
