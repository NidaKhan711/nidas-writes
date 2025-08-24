"use client";
import { useEffect, useState } from "react";
import axios from "axios";

interface BlogPageProps {
  params: { id: string };
}

export default function SingleBlog({ params }: BlogPageProps) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/blog', {
        params: {
          id: params.id
        }
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching blog data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-6 mt-12">
        <div className="animate-pulse">
          <div className="bg-gray-300 h-64 rounded-lg mb-6"></div>
          <div className="h-8 bg-gray-300 rounded mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/4 mb-6"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="max-w-3xl mx-auto p-6 mt-12">
        <p className="text-center text-red-500">Failed to load blog post.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 mt-12">
      {/* Post Image */}
      <div className="mb-6 rounded-lg overflow-hidden">
        <img
          src={data.image}
          alt={data.title}
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Post Title */}
      <h1 className="text-4xl font-bold mb-2">{data.title}</h1>

      {/* Post Metadata */}
      <div className="flex flex-wrap items-center gap-4 mb-6 text-gray-600">
        <span className="flex items-center">
          <span className="mr-2">By</span>
          <span className="font-medium">{data.author}</span>
        </span>
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            data.categoryColor === "green"
              ? "bg-green-100 text-green-800"
              : data.categoryColor === "red"
              ? "bg-red-100 text-red-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {data.category}
        </span>
      </div>

      {/* Post Content */}
      <div className="prose max-w-none">
        <p className="text-lg leading-relaxed">{data.description}</p>
      </div>
    </div>
  );
}