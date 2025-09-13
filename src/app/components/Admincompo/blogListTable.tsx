import React from 'react'
import Image from 'next/image'

interface BlogListTableProps {
  authorImage?: string
  title?: string
  authorName?: string
  mongoId: string;
  date?: string
  deleteBlog?: (id: string) => void;
}

const BlogListTable: React.FC<BlogListTableProps> = ({
  authorImage,
  title,
  authorName,
  date,
  mongoId,
  deleteBlog 
}) => {
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
  }

  return (
    <tr className="bg-white border-b hover:bg-gray-50 transition-colors">
      <td className="items-center gap-3 hidden sm:table-cell px-4 sm:px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <Image
            src={authorImage || '/assets/images/userup.png'} 
            alt="Author"
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
          <span>{authorName || "No author"}</span>
        </div>
      </td>
      <td className="px-4 sm:px-6 py-4 max-w-xs truncate" title={title}>
        {title || 'No title'}
      </td>
      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
        {formatDate(date)}
      </td>
      <td className="px-4 sm:px-6 py-4">
        <button
          onClick={() => {
            if (window.confirm("Are you sure you want to delete this blog?")) {
              deleteBlog?.(mongoId);
            }
          }}
          className="w-8 h-8 flex items-center justify-center rounded-full text-white font-bold transition-colors text-sm"
          style={{ 
            backgroundColor: '#b87a7d',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#996568'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#b87a7d'}
          title="Delete blog"
        >
          ×
        </button>
      </td>
    </tr>
  )
}

export default BlogListTable