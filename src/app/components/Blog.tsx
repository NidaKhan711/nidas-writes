'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';

// Blog data ka type
interface BlogData {
  _id: string;
  title: string;
  excerpt: string;
  description: string;
  category: string;
  image: string;
  createdAt: string; // ✅ latest nikalne ke liye zaroori
}

const Blog: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Blogs fetch karo
  const fetchBlogs = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/api/blog');
      setBlogs(response.data.blogs);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Sirf 3 latest posts (date ke hisaab se sorted)
  const latestPosts = [...blogs]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  return (
    <section className="min-h-screen font-serif bg-gradient-to-br from-[#fffcf1] via-[#fef7e6] to-[#f9f1e4] text-[#5a3e36] py-12 px-4 md:px-8 relative overflow-hidden">
      {/* Subtle background pattern (optional, can be an SVG or an image) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {/* You can replace this with a subtle SVG pattern or a transparent PNG texture */}
        <div className="absolute inset-0 bg-[url('/path/to/subtle-pattern.svg')] bg-repeat opacity-[0.03]"></div>
      </div>

      {/* Heading */}
      <div className="text-center mb-8 md:mb-12 relative z-10">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tight leading-tight"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Our Latest Thoughts
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-[#5a3e36]/80 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Fresh insights, stories, and reflections from our team, crafted just for you.
        </motion.p>
        <motion.div
          className="w-24 h-1 bg-[#996568] mx-auto mt-6 rounded-full"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 96, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
        ></motion.div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-20 relative z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#996568]"></div>
        </div>
      )}

      {/* Blog Posts */}
      {!isLoading && (
        <AnimatePresence mode="wait">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key="latest"
          >
            {latestPosts.map((post, index) => (
              <motion.div
                key={post._id}
                className="bg-[#fffcf1] rounded-xl overflow-hidden transition-all duration-300 flex flex-col group border border-[#e8c9a7]/70 shadow-lg hover:shadow-xl relative"
                whileHover={{ y: -8, transition: { duration: 0.3, ease: "easeOut" } }}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
              >
                {/* Image with subtle overlay */}
                <div className="relative overflow-hidden h-52 md:h-60 rounded-t-lg">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                <div className="p-5 md:p-6 flex flex-col flex-grow">
                  <div className="mb-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#996568] text-[#fffcf1] shadow-sm tracking-wide">
                      {post.category}
                    </span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold mb-3 line-clamp-2 min-h-[64px] text-[#5a3e36]">
                    {post.title}
                  </h3>

                  <div
                    className="text-sm text-[#5a3e36]/70 mb-4 flex-grow leading-relaxed line-clamp-3 prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: post.description }}
                  ></div>

                  <Link
                    href={`/blog/${post._id}`}
                    className="mt-auto inline-flex items-center text-sm font-semibold transition-all duration-300 group/readmore text-[#996568] hover:text-[#7b4f52] hover:underline"
                  >
                    Read More
                    <motion.span
                      className="inline-block ml-1 transition-transform duration-300 group-hover/readmore:translate-x-1"
                    >
                      →
                    </motion.span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}

      {/* Agar blogs hi na ho */}
      {!isLoading && latestPosts.length === 0 && (
        <motion.div
          className="text-center py-16 font-serif relative z-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-3 text-[#5a3e36]">
            No captivating stories yet...
          </h3>
          <p className="text-[#5a3e36]/70 text-base md:text-lg max-w-md mx-auto">
            Our creative minds are at work! New blog posts will appear here once they are published.
          </p>
        </motion.div>
      )}
    </section>
  );
};

export default Blog;