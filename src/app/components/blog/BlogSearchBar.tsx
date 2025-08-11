import React from 'react';
import { Search } from 'lucide-react';

interface BlogSearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BlogSearchBar: React.FC<BlogSearchBarProps> = ({ value, onChange }) => (
  <div className="relative max-w-md">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#996568] w-5 h-5" />
    <input
      type="text"
      placeholder="Search articles..."
      value={value}
      onChange={onChange}
      className="w-full pl-10 pr-4 py-3 bg-transparent backdrop-blur-sm border border-[#e8c9a7] rounded-lg text-[#5a3e36] placeholder-[#996568]/60 focus:outline-none focus:border-[#996568] focus:ring-2 focus:ring-[#996568]/50 hover:border-[#996568] transition-all duration-300 shadow-sm"
    />
  </div>
);

export default BlogSearchBar;
