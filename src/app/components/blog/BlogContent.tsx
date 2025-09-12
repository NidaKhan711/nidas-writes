// app/blog/[id]/SingleBlogClient.tsx
'use client';
import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from 'framer-motion';
import { Terminal, Calendar, Clock, ArrowLeft, Share2, Bookmark } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Define a type for the blog data
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

interface SingleBlogClientProps {
  initialData: BlogData | null;
  id: string;
}

export default function BlogContent({ initialData, id }: SingleBlogClientProps) {
  const [data, setData] = useState<BlogData | null>(initialData);
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Only fetch if initialData wasn't provided (client-side navigation)
    if (!initialData) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await axios.get("/api/blog", {
            params: { id },
          });
          setData(response.data);
        } catch (error) {
          setError("Failed to load blog post. Please try again later.");
          console.error("Error fetching blog data:", error);
        } finally {
          setLoading(false);
        }
      };
      
      fetchData();
    }
  }, [id, initialData]);

  if (loading) {
    return (
      <div className="min-h-screen font-serif bg-gradient-to-br from-[#fffcf1] via-[#fef7e6] to-[#f9f1e4] text-[#5a3e36] py-12 px-4 ">
        <div className="max-w-4xl mx-auto ">
          <div className="animate-pulse">
            {/* Back button skeleton */}
            <div className="h-6 w-24 bg-[#e8c9a7] rounded-md mb-8"></div>
            
            {/* Image skeleton */}
            <div className="bg-[#e8c9a7] h-64 md:h-80 rounded-xl mb-8"></div>
            
            {/* Title skeleton */}
            <div className="h-10 bg-[#e8c9a7] rounded-md mb-4"></div>
            <div className="h-10 bg-[#e8c9a7] rounded-md w-3/4 mb-8"></div>
            
            {/* Metadata skeleton */}
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="h-8 w-8 bg-[#e8c9a7] rounded-full"></div>
              <div className="h-4 bg-[#e8c9a7] rounded-md w-32"></div>
              <div className="h-4 bg-[#e8c9a7] rounded-md w-24"></div>
              <div className="h-4 bg-[#e8c9a7] rounded-md w-20"></div>
            </div>
            
            {/* Content skeleton */}
            <div className="space-y-3">
              <div className="h-4 bg-[#e8c9a7] rounded-md"></div>
              <div className="h-4 bg-[#e8c6a7] rounded-md"></div>
              <div className="h-4 bg-[#e8c9a7] rounded-md w-5/6"></div>
              <div className="h-4 bg-[#e8c9a7] rounded-md w-4/6 mt-6"></div>
              <div className="h-4 bg-[#e8c9a7] rounded-md"></div>
              <div className="h-4 bg-[#e8c9a7] rounded-md w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen font-serif bg-gradient-to-br from-[#fffcf1] via-[#fef7e6] to-[#f9f1e4] text-[#5a3e36] py-12 px-4 ">
        <div className="max-w-3xl mx-auto ">
          <div className="bg-[#f3e9d7] border-l-4 border-[#996568] p-6 rounded-lg shadow-md">
            <div className="flex items-center ">
              <Terminal className="h-5 w-5 text-[#996568] mr-3" />
              <h3 className="font-bold text-[#5a3e36]">Error</h3>
            </div>
            <p className="mt-2 text-[#5a3e36]/80">{error || "Failed to load blog post."}</p>
            <Link
              href="/blog"
              className="mt-4 inline-flex items-center px-4 py-2 bg-[#996568] text-[#fffcf1] rounded-md hover:bg-[#7a4e51] transition-colors duration-300"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Format date if it exists
  const formatDate = data.date ? new Date(data.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : '';

  return (
    <div className="min-h-screen font-serif bg-gradient-to-br from-[#fffcf1] via-[#fef7e6] to-[#f9f1e4] text-[#5a3e36] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link
            href="/blog"
            className="inline-flex items-center text-[#996568] hover:text-[#7a4e51] font-medium transition-colors duration-300 group"
          >
            <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Blog
          </Link>
        </motion.div>

        <motion.article
          className="bg-[#fffcf1]/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-[#e8c9a7]/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Post Image */}
          <div className="relative overflow-hidden">
            <motion.div
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.7 }}
              className="w-full h-64 md:h-80 relative"
            >
              <Image
                src={data.image}
                alt={data.title}
                fill
                className="object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
            
            {/* Category Badge */}
            <div className="absolute top-4 right-4">
              <span className="px-4 py-2 rounded-full text-sm font-semibold text-[#fffcf1] bg-[#996568]/90 backdrop-blur-sm">
                {data.category}
              </span>
            </div>
          </div>

          <div className="p-6 md:p-8">
            {/* Post Title */}
            <motion.h1 
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {data.title}
            </motion.h1>

            {/* Post Excerpt */}
            {data.excerpt && (
              <motion.p 
                className="text-xl text-[#5a3e36]/80 mb-8 italic border-l-4 border-[#996568] pl-4 py-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {data.excerpt}
              </motion.p>
            )}

            {/* Post Metadata */}
            <motion.div 
              className="flex flex-wrap items-center gap-4 md:gap-6 mb-8 py-4 border-y border-[#e8c9a7]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 relative">
                  <Image
                    src={data.authorImage || "/default-author.png"}
                    alt={data.authorName}
                    fill
                    className="rounded-full object-cover border-2 border-[#d3c6b6] shadow-sm"
                  />
                </div>
                <span className="font-semibold">{data.authorName}</span>
              </div>
              
              {formatDate && (
                <div className="flex items-center text-sm text-[#5a3e36]/70">
                  <Calendar className="h-4 w-4 mr-1" />
                  {formatDate}
                </div>
              )}
              
              {data.readTime && (
                <div className="flex items-center text-sm text-[#5a3e36]/70">
                  <Clock className="h-4 w-4 mr-1" />
                  {data.readTime} read
                </div>
              )}
              
              <div className="flex items-center ml-auto gap-2">
                <button className="p-2 text-[#5a3e36]/70 hover:text-[#996568] transition-colors duration-300 rounded-full hover:bg-[#f3e9d7]">
                  <Bookmark className="h-5 w-5" />
                </button>
                <button className="p-2 text-[#5a3e36]/70 hover:text-[#996568] transition-colors duration-300 rounded-full hover:bg-[#f3e9d7]">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </motion.div>

            {/* Post Content */}
            <motion.div
              className="blog-content prose prose-lg max-w-none text-[#5a3e36] prose-headings:text-[#5a3e36] prose-a:text-[#996568] prose-strong:text-[#5a3e36] prose-blockquote:border-[#996568] prose-blockquote:bg-[#f3e9d7] prose-blockquote:italic prose-blockquote:text-[#5a3e36]/80 prose-blockquote:rounded-r-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              dangerouslySetInnerHTML={{ __html: data.description }}
            />
          </div>
        </motion.article>
      </div>
    </div>
  );
}