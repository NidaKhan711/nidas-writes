'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BlogCard from '../components/blog/BlogCard';
import BlogSearchBar from '../components/blog/BlogSearchBar';
import BlogCategories from '../components/blog/BlogCategories';
import { Calendar, User, Clock, ChevronRight, Tag } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  categoryColor: 'green' | 'red';
  image: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Exploring the World of Web Development",
    excerpt: "Join me in diving through the ever-evolving landscape of web development, from frontend frameworks to backend architecture.",
    author: "Alex Johnson",
    date: "Apr 20, 2024",
    readTime: "5 min read",
    category: "Tech",
    categoryColor: "green",
    image: "/api/placeholder/300/200"
  },
  {
    id: 2,
    title: "The Art of Mindful Productivity",
    excerpt: "Discover strategies for enhancing productivity while maintaining a sense of balance and mindfulness in your daily routine.",
    author: "Sarah Chen",
    date: "Apr 18, 2024",
    readTime: "7 min read",
    category: "Self-growth",
    categoryColor: "red",
    image: "/api/placeholder/300/200"
  },
  {
    id: 3,
    title: "Reflections on Existential Philosophy",
    excerpt: "Delve into the depths of existential philosophy, and explore the fundamental questions of human existence and meaning.",
    author: "Dr. Marcus Webb",
    date: "Apr 15, 2024",
    readTime: "12 min read",
    category: "Philosophy",
    categoryColor: "green",
    image: "/api/placeholder/300/200"
  },
  {
    id: 4,
    title: "Building Scalable React Applications",
    excerpt: "Learn advanced patterns and techniques for creating maintainable and scalable React applications that stand the test of time.",
    author: "Emily Rodriguez",
    date: "Apr 12, 2024",
    readTime: "8 min read",
    category: "Tech",
    categoryColor: "green",
    image: "/api/placeholder/300/200"
  },
  {
    id: 5,
    title: "The Psychology of Creative Thinking",
    excerpt: "Understanding the mental processes behind creativity and how to cultivate innovative thinking in both personal and professional contexts.",
    author: "James Miller",
    date: "Apr 10, 2024",
    readTime: "6 min read",
    category: "Self-growth",
    categoryColor: "red",
    image: "/api/placeholder/300/200"
  },
  {
    id: 6,
    title: "Modern Stoicism in Daily Life",
    excerpt: "Practical applications of stoic philosophy in contemporary living, exploring resilience, wisdom, and emotional regulation.",
    author: "Maria Santos",
    date: "Apr 08, 2024",
    readTime: "9 min read",
    category: "Philosophy",
    categoryColor: "green",
    image: "/api/placeholder/300/200"
  }
];

const categories = ['All', 'Tech', 'Self-growth', 'Philosophy'];

const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -5,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const getCategoryStyles = (categoryColor: 'green' | 'red') => {
    return categoryColor === 'green' 
      ? 'bg-[#996568] text-white hover:bg-[#b87a7d] border-[#996568] hover:text-white hover:border-[#b87a7d] transition-all duration-300'
      : 'bg-[#996568] text-white hover:bg-[#b87a7d] border-[#996568] hover:text-white hover:border-[#b87a7d] transition-all duration-300';
  };

  const getCategoryFilterStyles = (category: string, isSelected: boolean) => {
    if (isSelected) {
      return 'bg-[#996568] text-white border-[#996568] hover:bg-[#b87a7d] hover:border-[#b87a7d]';
    }
    return 'bg-white text-[#996568] border-[#996568] hover:bg-[#996568]/10 hover:border-[#b87a7d] hover:text-[#996568]';
  };

  return (
    <div className="min-h-screen bg-[#fffcf1] text-[#5a3e36] mt-13">
      {/* Header */}
      <motion.header 
        className="bg-white shadow-sm border-b border-[#e8c9a7]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto px-4 py-8">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-[#5a3e36] mb-2"
            whileHover={{ color: '#996568' }}
            transition={{ duration: 0.3 }}
          >
            My Blog
          </motion.h1>
          <p className="text-[#5a3e36]/90 text-lg">Thoughts, insights, and explorations</p>
        </div>
      </motion.header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Search and Filter Section */}
        <motion.div 
          className="mb-8 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Search Bar */}
          <BlogSearchBar value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />

          {/* Categories */}
          <BlogCategories
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            getCategoryFilterStyles={getCategoryFilterStyles}
          />
        </motion.div>

        {/* Blog Posts Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={selectedCategory + searchQuery}
          >
            {filteredPosts.map((post) => (
              <BlogCard
                key={post.id}
                post={post}
                getCategoryStyles={getCategoryStyles}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-[#996568] mb-2">No articles found</h3>
            <p className="text-[#5a3e36]/90">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}

        {/* Load More Button */}
        {filteredPosts.length > 0 && (
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.button 
              className="bg-[#996568] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#b87a7d] transition-all duration-300 border border-[#996568] hover:border-[#b87a7d] shadow-sm hover:shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Load More Articles
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Blog;