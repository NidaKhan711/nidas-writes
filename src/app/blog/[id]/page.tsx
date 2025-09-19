// app/blog/[id]/page.tsx
import { Metadata } from "next";
import axios from "axios";
import BlogContent from "@/app/components/blogStyle/BlogContent";

interface BlogData {
  _id: string;
  title: string;
  excerpt: string;
  description: string;
  category: string;
  image: string;
  authorName: string;
  authorImage?: string;
  date?: string;
  readTime?: string;
}

interface BlogPageProps {
  params: Promise<{ id: string }>;
}

const baseURL = process.env.NEXT_PUBLIC_API_URL ?? "";

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const response = await axios.get(`${baseURL}/api/blogs`, {
      params: { id },
    });

    return {
      title: response.data.title,
      description: response.data.excerpt,
      openGraph: {
        title: response.data.title,
        description: response.data.excerpt,
        images: [response.data.image],
      },
    };
  } catch {
    return {
      title: "Blog Post",
      description: "A blog post",
    };
  }
}

export default async function SingleBlogPage({ params }: BlogPageProps) {
  const { id } = await params;
  let blogData: BlogData | null = null;

  try {
    const response = await axios.get(`${baseURL}/api/blog`, {
      params: { id },
    });
    blogData = response.data;
  } catch {
    console.error("Error fetching blog data");
  }

  return<>
  <div className="mt-14">
   <BlogContent initialData={blogData} id={id} />;
   </div>
   </>
}
