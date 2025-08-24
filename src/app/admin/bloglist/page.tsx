'use client';
import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';

interface Blog {
  id: number;
  title: string;
  category: string;
  thumbnail: string;
}

const BlogListTable: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([
    {
      id: 1,
      title: 'How to Start a Startup',
      category: 'Startup',
      thumbnail: 'https://via.placeholder.com/80',
    },
    {
      id: 2,
      title: 'ReactJS Basics',
      category: 'Technology',
      thumbnail: 'https://via.placeholder.com/80',
    },
    {
      id: 3,
      title: 'Design Principles',
      category: 'Design',
      thumbnail: 'https://via.placeholder.com/80',
    },
  ]);

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this blog?')) {
      setBlogs(blogs.filter((blog) => blog.id !== id));
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Blog List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-4 text-left text-gray-600">#</th>
              <th className="py-3 px-4 text-left text-gray-600">Title</th>
              <th className="py-3 px-4 text-left text-gray-600">Category</th>
              <th className="py-3 px-4 text-left text-gray-600">Thumbnail</th>
              <th className="py-3 px-4 text-left text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog, index) => (
              <tr
                key={blog.id}
                className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              >
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{blog.title}</td>
                <td className="py-2 px-4">{blog.category}</td>
                <td className="py-2 px-4">
                  <img
                    src={blog.thumbnail}
                    alt={blog.title}
                    className="w-20 h-12 object-cover rounded"
                  />
                </td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleDelete(blog.id)}
                    className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 flex items-center gap-1"
                  >
                    <Trash2 className="h-4 w-4" /> Delete
                  </button>
                </td>
              </tr>
            ))}
            {blogs.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  No blogs uploaded yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogListTable;
