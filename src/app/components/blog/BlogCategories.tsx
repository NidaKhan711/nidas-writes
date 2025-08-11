import React from 'react';
import { Tag } from 'lucide-react';

interface BlogCategoriesProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  getCategoryFilterStyles: (category: string, isSelected: boolean) => string;
}

const BlogCategories: React.FC<BlogCategoriesProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  getCategoryFilterStyles,
}) => (
  <div className="flex flex-wrap gap-3">
    <span className="text-[#996568] font-semibold flex items-center gap-2">
      <Tag className="w-4 h-4" />
      Categories:
    </span>
    {categories.map((category) => (
      <button
        key={category}
        onClick={() => setSelectedCategory(category)}
        className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-300 ${getCategoryFilterStyles(category, selectedCategory === category)}`}
      >
        {category}
      </button>
    ))}
  </div>
);

export default BlogCategories;
