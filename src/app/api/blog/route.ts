import { NextResponse } from "next/server";
import blogModel from "@/utils/models/blogModel";
import connectDB from "@/utils/db/dbconnect";
import { writeFile } from "fs/promises";
import fs from "fs";     

export async function GET(request: Request) {
  try {
    await connectDB();

    // Extract id from the URL
    const url = new URL(request.url);
    const blogId = url.searchParams.get("id");

    if (blogId) {
      const blog = await blogModel.findById(blogId);

      if (!blog) {
        return NextResponse.json({ error: "Blog not found" }, { status: 404 });
      }

      return NextResponse.json({
        id: blog._id,
        title: blog.title,
        description: blog.content || blog.description,
        authorName: blog.authorName,
        category: blog.category,
        categoryColor: blog.categoryColor || "gray",
        image: blog.image,
        authorImage: blog.authorImage,
        date: blog.date, // ← Date field add kiya
      });
    } else {
      const blogs = await blogModel.find({});
      return NextResponse.json({ 
        blogs: blogs.map(blog => ({
          _id: blog._id,
          title: blog.title,
          description: blog.content || blog.description,
          authorName: blog.authorName,
          category: blog.category,
          image: blog.image,
          authorImage: blog.authorImage,
          date: blog.date, // ← Date field add kiya
        }))
      });
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
    const authorName = (formData.get("authorName") as string);
    const category = (formData.get("category") as string) || "General";
    const authorImageFile = formData.get("authorImage") as File | null;

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

    // save author image
    let authorImageUrl = "";
    if (authorImageFile) {
      const bytes = await authorImageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const path = `./public/assets/images/${timestamp}_${authorImageFile.name}`;
      await writeFile(path, buffer);
      authorImageUrl = `/assets/images/${timestamp}_${authorImageFile.name}`;
    }

    const newBlog = await blogModel.create({
      title,
      slug,
      description,
      authorName,
      category,
      image: imageUrl,
      authorImage: authorImageUrl,
      date: new Date(), // ← Automatic date add kiya
    });

    return NextResponse.json({ success: true, blog: newBlog }, { status: 201 });
  } catch (error: unknown) {
    let errorMessage = "An unknown error occurred";
    
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}

//create api to delete blogs for adminpenel bloglist
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    
    if (!id) {
      return NextResponse.json(
        { message: "Blog ID is required" },
        { status: 400 }
      );
    }
    
    const blog = await blogModel.findById(id);
    
    if (!blog) {
      return NextResponse.json(
        { message: "Blog not found" },
        { status: 404 }
      );
    }
    
    if (blog.image) {
      await fs.promises.unlink(`./public/${blog.image}`);
    }
    
    if (blog.authorImage) {
      await fs.promises.unlink(`./public/${blog.authorImage}`);
    }
    
    await blogModel.findByIdAndDelete(id);
    
    return NextResponse.json({ message: "Blog deleted successfully" });
  } catch (error: unknown) {
    console.error("Error deleting blog:", error);
    
    let errorMessage = "Internal server error";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    return NextResponse.json(
      { message: errorMessage },
      { status: 500 }
    );
  }
}