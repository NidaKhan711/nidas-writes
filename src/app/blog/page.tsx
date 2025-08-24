'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import axios from 'axios';



const categories = ['All', 'Tech', 'Lifestyle', 'philosophy'];

// Define a type for the form data
interface BlogData {
  _id: string;
  title: string;
  excerpt: string;
  description: string;
  category: string;
  image: string;
}

 
const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [blogs,setBlogs] = useState<BlogData[]>([])
  const fetchBlogs = async () => {

    const response = await axios.get('/api/blog');
    setBlogs(response.data.blogs);
    console.log(response.data.blogs);
  }
  useEffect(() => {
    fetchBlogs();
  }, []);

  const filteredPosts = blogs.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#fffcf1] via-[#fef7e6] to-[#f9f1e4] text-[#5a3e36] py-12 px-4">
      {/* Heading */}
      <div className="text-center mb-12">
        <motion.h1
          className="text-5xl md:text-6xl font-bold mb-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          My Blog
        </motion.h1>

      </div>


      {/* Search & Categories */}
      <div className="max-w-4xl mx-auto mb-10 space-y-6">
        {/* Search Input */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-4 pl-12 border-2 border-[#5a3e36]/10 rounded-2xl outline-none focus:ring-2 focus:ring-[#5a3e36]/20 transition-all duration-300 bg-[#fffcf1]/80 backdrop-blur-sm"
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#5a3e36]/50">
            🔍
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div
          className="flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full border-2 font-semibold transition-all duration-300 transform hover:scale-105 ${selectedCategory === category
                  ? 'bg-[#5a3e36] text-[#fffcf1] border-transparent'
                  : 'bg-transparent text-[#5a3e36] border-[#5a3e36]/30'
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Blog Posts */}
      <AnimatePresence mode="wait">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          key={selectedCategory + searchQuery}
        >
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post._id}
              className="bg-[#fffcf1]/80 backdrop-blur-sm rounded-2xl overflow-hidden transition-all duration-300 flex flex-col group"
              whileHover={{ y: -4 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="mb-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#5a3e36] text-white">
                    {post.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-3 line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-sm text-[#5a3e36]/70 mb-6 flex-grow leading-relaxed line-clamp-3">
                  {post.description}
                </p>

                {/* Simple Read More Link */}
                <Link
                  href={`/blog/${post._id}`}
                  className="mt-auto inline-flex items-center text-sm font-semibold text-[#5a3e36] hover:underline transition-colors duration-300"
                >
                  Read More
                  <motion.span
                    className="inline-block ml-1"
                    initial={{ x: 0 }}
                    whileHover={{ x: 3 }}
                  >
                    →
                  </motion.span>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* No Results */}
      {filteredPosts.length === 0 && (
        <motion.div
          className="text-center py-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="text-8xl mb-6"
            animate={{
              rotate: [0, -10, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            🔍
          </motion.div>
          <h3 className="text-3xl font-bold mb-3">
            No articles found
          </h3>
          <p className="text-[#5a3e36]/70 text-lg">
            Try adjusting your search or filter criteria
          </p>
        </motion.div>
      )}
    </section>
  );
};

export default Blog;