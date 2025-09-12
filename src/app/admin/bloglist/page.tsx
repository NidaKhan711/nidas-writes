'use client'
import BlogListTable from '@/app/components/Admincompo/blogListTable'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

interface Blog {
  _id: string;
  authorImage?: string;
  authorName?: string;
  title: string;
  date?: string;
}

const Page = () => {
  const [blogs, setBlogs] = useState<Blog[]>([])

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('/api/blog');
      setBlogs(response.data.blogs);
    } catch {
      toast.error("Failed to fetch blogs.");
    }
  }

  const deleteBlog = async (mongoId: string) => {
    try {
      const response = await axios.delete(`/api/blog`, {
        params: { id: mongoId }
      });
      toast.success(response.data.message);
      fetchBlogs();
    } catch {
      toast.error("Error deleting blog.");
    }
  }

  useEffect(() => {
    fetchBlogs();
  }, [])

  return (
    <div className='flex-1 p-8' style={{ backgroundColor: '#fffcf1' }}>
      <div className="mb-8 pb-2 border-b" style={{ borderColor: '#d3c6b6' }}>
        <h1 className='text-3xl font-serif font-bold' style={{ color: '#5a3e36' }}>
          Your Blog Journal 📜
        </h1>
        <p className="mt-2 text-sm" style={{ color: '#996568' }}>
          All your written entries.
        </p>
      </div>

      {blogs.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[70vh] text-center">
          <p className="text-xl" style={{ color: '#996568', fontFamily: 'serif' }}>
            Your journal is empty.
          </p>
          <p className="mt-2 text-lg" style={{ color: '#5a3e36' }}>
            Start writing new entries to fill the pages!
          </p>
        </div>
      ) : (
        <div
          className='relative h-[80vh] max-w-full overflow-x-auto mt-4 rounded-lg shadow-inner'
          style={{ border: '1px solid #d3c6b6' }}
        >
          <table className='w-full text-sm' style={{ color: '#5a3e36' }}>
            <thead className='text-sm uppercase' style={{ backgroundColor: '#f5f0e9' }}>
              <tr>
                <th scope='col' className='hidden sm:block px-6 py-4' style={{ fontFamily: 'serif' }}>
                  Author Name
                </th>
                <th scope='col' className='px-6 py-4' style={{ fontFamily: 'serif' }}>
                  Blog Title
                </th>
                <th scope='col' className='px-6 py-4' style={{ fontFamily: 'serif' }}>
                  Date
                </th>
                <th scope='col' className='px-6 py-4' style={{ fontFamily: 'serif' }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: '#d3c6b6' }}>
              {blogs.map((item, index) => (
                <BlogListTable
                  key={index}
                  mongoId={item._id}
                  authorName={item.authorName}
                  title={item.title}
                  authorImage={item.authorImage}
                  deleteBlog={deleteBlog}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Page;