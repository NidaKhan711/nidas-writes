'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';

<<<<<<< HEAD
const categories = ['All', 'physiology', 'Philosophy'];
=======
const categories = ['All', 'Physiology', 'Philosophy'];
>>>>>>> cc4f4e8 (add update)

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
  const [blogs, setBlogs] = useState<BlogData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
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

  const filteredPosts = blogs.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="min-h-screen font-serif bg-gradient-to-br from-[#fffcf1] via-[#fef7e6] to-[#f9f1e4] text-[#5a3e36] py-12 px-4 md:px-8 mt-13">
      {/* Heading */}
      <div className="text-center mb-8 md:mb-12">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          My Blog
        </motion.h1>
        <motion.p 
          className="text-lg md:text-xl text-[#5a3e36]/80 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Thoughts, ideas, and stories worth sharing
        </motion.p>
      </div>

      {/* Search & Categories */}
      <div className="max-w-4xl mx-auto mb-10 space-y-6">
        {/* Search Input */}
        <motion.div
          className="relative max-w-xl mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-4 pl-12 border-b-2 border-[#d3c6b6] rounded-none outline-none focus:border-[#996568] transition-all duration-300 bg-transparent text-[#5a3e36] placeholder-[#5a3e36]/60"
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#5a3e36]/50">
            🔍
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 md:gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 md:px-6 md:py-3 rounded-full border-2 font-medium md:font-semibold transition-all duration-300 transform hover:scale-105 text-sm md:text-base ${selectedCategory === category
                ? 'bg-[#996568] text-[#fffcf1] border-transparent'
                : 'bg-transparent text-[#5a3e36] border-[#d3c6b6] hover:border-[#996568]'
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

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#996568]"></div>
        </div>
      )}

      {/* Blog Posts */}
      {!isLoading && (
        <AnimatePresence mode="wait">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key={selectedCategory + searchQuery}
          >
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post._id}
                className="bg-[#fffcf1]/90 backdrop-blur-sm rounded-lg overflow-hidden transition-all duration-300 flex flex-col group border border-[#e8c9a7] shadow-sm hover:shadow-md"
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative overflow-hidden h-48 md:h-52">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="p-5 md:p-6 flex flex-col flex-grow">
                  <div className="mb-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#996568] text-[#fffcf1]">
                      {post.category}
                    </span>
                  </div>

                  <h3 className="text-lg md:text-xl font-bold mb-3 line-clamp-2 min-h-[56px]">
                    {post.title}
                  </h3>

                  <div className="text-sm text-[#5a3e36]/70 mb-4 flex-grow leading-relaxed line-clamp-3 prose prose-sm max-w-none" 
                       dangerouslySetInnerHTML={{ __html: post.description }}>
                  </div>

                  <Link
                    href={`/blog/${post._id}`}
                    className="mt-auto inline-flex items-center text-sm font-semibold hover:underline transition-colors duration-300 group/readmore"
                    style={{ color: '#996568' }}
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

      {/* No Results */}
      {!isLoading && filteredPosts.length === 0 && (
        <motion.div
          className="text-center py-16 font-serif"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="text-6xl md:text-8xl mb-6"
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
          <h3 className="text-2xl md:text-3xl font-bold mb-3">
            No articles found
          </h3>
          <p className="text-[#5a3e36]/70 text-base md:text-lg max-w-md mx-auto">
            Try adjusting your search or filter criteria to find what you&apos;re looking for.
          </p>
          <button 
            onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
            className="mt-6 px-6 py-2 bg-[#996568] text-[#fffcf1] rounded-full hover:bg-[#7a4e51] transition-colors duration-300"
          >
            Clear Filters
          </button>
        </motion.div>
      )}
    </section>
  );
};

export default Blog;
