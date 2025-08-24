import React from 'react';
import Link from 'next/link';
import { Calendar, User, Clock, ChevronRight} from 'lucide-react';
interface BlogCardProps {
  post: {
    id: number;
    title: string;
    excerpt: string;
    author: string;
    date: string;
    readTime: string;
    category: string;
    categoryColor: 'green' | 'red';
    image: string;
  };
  getCategoryStyles: (color: 'green' | 'red') => string;
}


const BlogCard: React.FC<BlogCardProps> = ({ post, getCategoryStyles}) => (
  <div className="bg-[#fffcf1] rounded-xl overflow-hidden shadow-sm border border-[#e8c9a7] hover:border-[#996568] hover:shadow-md transition-all duration-300 cursor-pointer group">
    {/* Image */}
    <div className="relative overflow-hidden bg-[#fffcf1] h-48">
      <div className="w-full h-full bg-gradient-to-br from-[#996568] to-[#b87a7d] flex items-center justify-center">
        <div className="text-white text-center p-4">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mx-auto mb-2 flex items-center justify-center hover:bg-white/30 transition-colors duration-300">
            <span className="text-white font-bold text-xl">
              {post.title.charAt(0)}
            </span>
          </div>
          <p className="text-sm opacity-90">Featured Image</p>
        </div>
      </div>
      {/* Category Badge */}
      <div className="absolute top-3 left-3">
        <span className={`px-3 py-1 rounded-full text-xs font-medium shadow-sm ${getCategoryStyles(post.categoryColor)}`}>
          {post.category}
        </span>
      </div>
    </div>

    {/* Content */}
    <div className="p-6">
      <h3 className="text-xl font-bold text-[#5a3e36] mb-3 group-hover:text-[#996568] transition-colors duration-300 leading-tight">
        {post.title}
      </h3>
      <p className="text-[#5a3e36]/90 mb-4 line-clamp-3 leading-relaxed">
        {post.excerpt}
      </p>
      <div className="flex items-center justify-between text-sm text-[#996568]">
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-1 hover:text-[#b87a7d] transition-colors duration-300">
            <User className="w-4 h-4" />
            <span>{post.author}</span>
          </span>
          <span className="flex items-center space-x-1 hover:text-[#b87a7d] transition-colors duration-300">
            <Clock className="w-4 h-4" />
            <span>{post.readTime}</span>
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between mt-4">
        <span className="flex items-center space-x-1 text-sm text-[#5a3e36]/90">
          <Calendar className="w-4 h-4" />
          <span>{post.date}</span>
        </span>
        
        {/* Link to blog details page */}
        <Link href={`/blog/${post.id}`} className="flex items-center space-x-1 text-[#996568] hover:text-[#b87a7d] font-medium">
          <span>Read More</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  </div>
);

export default BlogCard;
