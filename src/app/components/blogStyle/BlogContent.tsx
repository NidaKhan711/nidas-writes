'use client';
import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Calendar, Clock, ArrowLeft, Share2, Check } from 'lucide-react';
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
  const [showShareTooltip, setShowShareTooltip] = useState(false);
  const [copied, setCopied] = useState(false);
  const [readProgress, setReadProgress] = useState(0);

  // Date formatting function
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'No date';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  useEffect(() => {
    if (!initialData) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await axios.get("/api/blogs", {
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

  useEffect(() => {
    const handleScroll = () => {
      const contentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;
      const progress = (scrollPosition / contentHeight) * 100;
      setReadProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyLink = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setShowShareTooltip(false);
    setTimeout(() => setCopied(false), 2000);
  };

  // Function to create markup for dangerouslySetInnerHTML
  const createMarkup = () => {
    if (!data || !data.description) return { __html: '' };
    
    // Process the HTML to ensure it works well with your styling
    let processedHtml = data.description;
    
    // Add classes to HTML elements to match your styling
    processedHtml = processedHtml
      .replace(/<p>/g, '<p class="mb-6 leading-relaxed">')
      .replace(/<h1>/g, '<h1 class="text-3xl font-bold mt-10 mb-4 text-[#5a3e36]">')
      .replace(/<h2>/g, '<h2 class="text-2xl font-bold mt-8 mb-3 text-[#5a3e36]">')
      .replace(/<h3>/g, '<h3 class="text-xl font-bold mt-6 mb-2 text-[#5a3e36]">')
      .replace(/<ul>/g, '<ul class="list-disc pl-6 mb-6">')
      .replace(/<ol>/g, '<ol class="list-decimal pl-6 mb-6">')
      .replace(/<li>/g, '<li class="mb-2">')
      .replace(/<blockquote>/g, '<blockquote class="border-l-4 border-[#996568] bg-[#f3e9d7] italic pl-6 py-4 pr-4 my-6 rounded-r-lg">')
      .replace(/<a /g, '<a class="text-[#996568] hover:underline" ')
      .replace(/<img /g, '<img class="rounded-xl my-6 shadow-md" ');
    
    return { __html: processedHtml };
  };

  if (loading) {
    return (
      <div className="min-h-screen font-serif bg-gradient-to-br from-[#fffcf1] via-[#fef7e6] to-[#f9f1e4] text-[#5a3e36] py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-6 w-24 bg-[#e8c9a7] rounded-md mb-8"></div>
            <div className="bg-[#e8c9a7] h-64 md:h-80 rounded-xl mb-8"></div>
            <div className="h-10 bg-[#e8c9a7] rounded-md mb-4"></div>
            <div className="h-10 bg-[#e8c9a7] rounded-md w-3/4 mb-8"></div>
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="h-8 w-8 bg-[#e8c9a7] rounded-full"></div>
              <div className="h-4 bg-[#e8c9a7] rounded-md w-32"></div>
              <div className="h-4 bg-[#e8c9a7] rounded-md w-24"></div>
              <div className="h-4 bg-[#e8c9a7] rounded-md w-20"></div>
            </div>
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
      <div className="min-h-screen font-serif bg-gradient-to-br from-[#fffcf1] via-[#fef7e6] to-[#f9f1e4] text-[#5a3e36] py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div 
            className="bg-[#f3e9d7] border-l-4 border-[#996568] p-8 rounded-2xl shadow-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center">
              <Terminal className="h-6 w-6 text-[#996568] mr-3" />
              <h3 className="font-bold text-[#5a3e36] text-lg">Error</h3>
            </div>
            <p className="mt-3 text-[#5a3e36]/80">{error || "Failed to load blog post."}</p>
            <Link
              href="/blog"
              className="mt-6 inline-flex items-center px-6 py-3 bg-[#996568] text-[#fffcf1] rounded-xl hover:bg-[#7a4e51] transition-colors duration-300"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Blog
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-serif bg-gradient-to-br from-[#fffcf1] via-[#fef7e6] to-[#f9f1e4] text-[#5a3e36]">
      <div className="fixed top-0 left-0 w-full h-1 z-50 bg-[#e8c9a7]/30">
        <motion.div 
          className="h-full bg-gradient-to-r from-[#996568] to-[#7a4e51]"
          initial={{ width: 0 }}
          animate={{ width: `${readProgress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="max-w-4xl mx-auto pt-12 px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link
            href="/blog"
            className="inline-flex items-center text-[#996568] hover:text-[#7a4e51] font-medium transition-colors duration-300 group bg-[#fffcf1] px-4 py-2 rounded-xl shadow-sm border border-[#e8c9a7]"
          >
            <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Blog
          </Link>
        </motion.div>

        {/* Post Hero Image */}
        <motion.div
          className="relative w-full overflow-hidden rounded-2xl shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="w-full h-72 sm:h-96 md:h-[500px] relative">
            <Image
              src={data.image}
              alt={data.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
          {/* Category Badge - remains on the image */}
          <motion.div 
            className="absolute top-4 right-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <span className="px-4 py-2 rounded-full text-sm font-semibold text-white bg-[#996568] backdrop-blur-sm shadow-md">
              {data.category}
            </span>
          </motion.div>
        </motion.div>

        {/* Post Title and Excerpt Section */}
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="my-12"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight text-[#5a3e36]">
              {data.title}
            </h1>
            {data.excerpt && (
              <p className="text-xl text-[#5a3e36]/80 italic border-l-4 border-[#996568] pl-6 py-2 bg-[#f3e9d7] rounded-r-lg">
                {data.excerpt}
              </p>
            )}
          </motion.div>
        </div>

        {/* Main Content Body - Centered on a clean background */}
        <div className="max-w-2xl mx-auto">
          {/* Post Metadata */}
          <motion.div 
            className="flex flex-wrap items-center gap-4 md:gap-6 mb-12 py-4 border-y border-[#e8c9a7]/50"
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
              <span className="font-semibold text-[#5a3e36]">{data.authorName}</span>
            </div>
            
            {data.date && (
              <div className="flex items-center text-sm text-[#5a3e36]/70 bg-[#f3e9d7] px-3 py-1 rounded-full">
                <Calendar className="h-4 w-4 mr-1 text-[#996568]" />
                {formatDate(data.date)}
              </div>
            )}
            
            {data.readTime && (
              <div className="flex items-center text-sm text-[#5a3e36]/70 bg-[#f3e9d7] px-3 py-1 rounded-full">
                <Clock className="h-4 w-4 mr-1 text-[#996568]" />
                {data.readTime} read
              </div>
            )}
            
            <div className="flex items-center ml-auto gap-2">
              <div className="relative">
                <button 
                  className="p-2 text-[#5a3e36]/70 hover:text-[#996568] transition-colors duration-300 rounded-full hover:bg-[#f3e9d7] flex items-center gap-1 bg-[#fffcf1] border border-[#e8c9a7] shadow-sm"
                  onClick={handleCopyLink}
                  onMouseEnter={() => setShowShareTooltip(true)}
                  onMouseLeave={() => setShowShareTooltip(false)}
                >
                  {copied ? (
                    <Check className="h-5 w-5 text-green-600" />
                  ) : (
                    <Share2 className="h-5 w-5" />
                  )}
                  <span className="text-sm hidden sm:inline">{copied ? 'Copied!' : 'Share'}</span>
                </button>
                
                <AnimatePresence>
                  {showShareTooltip && !copied && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full mt-1 bg-[#5a3e36] text-white text-xs py-1 px-2 rounded-md whitespace-nowrap z-10"
                    >
                      Copy link to share
                      <div className="absolute -top-1 right-2 w-2 h-2 bg-[#5a3e36] rotate-45"></div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Post Content */}
          <motion.div
            className="blog-content text-[#5a3e36]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div dangerouslySetInnerHTML={createMarkup()} />
          </motion.div>

          {/* Article End Actions */}
          <motion.div 
            className="mt-12 pt-8 pb-8 border-t border-[#e8c9a7]/50 flex flex-col sm:flex-row justify-between items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center text-[#996568] hover:text-[#7a4e51] font-medium transition-colors duration-300 group bg-[#fffcf1] px-4 py-2 rounded-xl shadow-sm border border-[#e8c9a7]"
            >
              <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
              Back to Blog
            </Link>
            
            <button 
              className="p-2 text-[#5a3e36]/70 hover:text-[#996568] transition-colors duration-300 rounded-full hover:bg-[#f3e9d7] flex items-center gap-1 bg-[#fffcf1] border border-[#e8c9a7] shadow-sm"
              onClick={handleCopyLink}
            >
              {copied ? (
                <Check className="h-5 w-5 text-green-600" />
              ) : (
                <Share2 className="h-5 w-5" />
              )}
              <span className="text-sm">{copied ? 'Link Copied!' : 'Share Article'}</span>
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}