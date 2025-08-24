import { NextResponse } from "next/server";
import blogModel from "@/utils/models/blogModel";
import connectDB from "@/utils/db/dbconnect";
import { writeFile } from "fs/promises";


export async function GET(request: Request) {
  try {
    await connectDB();
    
    // Extract id from the URL
    const url = new URL(request.url);
    const blogId = url.searchParams.get("id");
    
    if (blogId) {
      const blog = await blogModel.findById(blogId);
      
      if (!blog) {
        return NextResponse.json(
          { error: "Blog not found" },
          { status: 404 }
        );
      }
      
      return NextResponse.json({
        id: blog._id,
        title: blog.title,
        description: blog.content || blog.description,
        author: blog.author,
        category: blog.category,
        categoryColor: blog.categoryColor || "gray",
        image: blog.image
      });
    } else {
      const blogs = await blogModel.find({});
      return NextResponse.json({ blogs });
    }
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  await connectDB();
  try {
    const formData = await req.formData();
    const timestamp = Date.now();

    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const authorName = (formData.get("authorName") as string) || "Admin";
    const category = (formData.get("category") as string) || "General";

    // image
    const image = formData.get("image") as File | null;
    let imageUrl = "";

    if (image) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const path = `./public/assets/images/${timestamp}_${image.name}`;
      await writeFile(path, buffer);
      imageUrl = `/assets/images/${timestamp}_${image.name}`;
    }

    const newBlog = await blogModel.create({
      title,
      slug,
      description,
      authorName,
      category,
      image: imageUrl,
    });

    return NextResponse.json({ success: true, blog: newBlog }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
