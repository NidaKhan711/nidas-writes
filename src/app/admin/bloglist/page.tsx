'use client'
import BlogListTable from '@/app/components/Admincompo/blogListTable'
import axios, { AxiosError } from 'axios'
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
  const [isLoading, setIsLoading] = useState(true)

  const fetchBlogs = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get('/api/blogs');
      setBlogs(response.data.blogs || []);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ message?: string }>;
        toast.error(axiosError.response?.data?.message || "Failed to fetch blogs.");
      } else if (error instanceof Error) {
        toast.error(error.message || "Failed to fetch blogs.");
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false)
    }
  }

  const deleteBlog = async (mongoId: string) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) {
      return;
    }
    
    try {
      const response = await axios.delete(`/api/blogs`, {
        params: { id: mongoId }
      });
      toast.success(response.data.message);
      fetchBlogs();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ message?: string }>;
        toast.error(axiosError.response?.data?.message || "Error deleting blog.");
      } else if (error instanceof Error) {
        toast.error(error.message || "Error deleting blog.");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  }

  useEffect(() => {
    fetchBlogs();
  }, [])

  return (
    <div className='flex-1 p-4 sm:p-8' style={{ backgroundColor: '#fffcf1', minHeight: '100vh' }}>
      <div className="mb-6 sm:mb-8 pb-2 border-b" style={{ borderColor: '#d3c6b6' }}>
        <h1 className='text-2xl sm:text-3xl font-serif font-bold' style={{ color: '#5a3e36' }}>
          Your Blog Journal 📜
        </h1>
        <p className="mt-2 text-sm" style={{ color: '#996568' }}>
          All your written entries {blogs.length > 0 ? `(${blogs.length} total)` : ''}
        </p>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: '#b87a7d' }}></div>
          <p className="mt-4" style={{ color: '#5a3e36' }}>Loading blogs...</p>
        </div>
      ) : blogs.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <div className="text-6xl mb-4" style={{ color: '#d3c6b6' }}>📝</div>
          <p className="text-xl" style={{ color: '#996568', fontFamily: 'serif' }}>
            Your journal is empty.
          </p>
          <p className="mt-2 text-lg" style={{ color: '#5a3e36' }}>
            Start writing new entries to fill the pages!
          </p>
        </div>
      ) : (
        <>
          <div
            className='relative max-w-full overflow-x-auto mt-4 rounded-lg shadow-inner'
            style={{ border: '1px solid #d3c6b6', backgroundColor: '#fffcf1' }}
          >
            <table className='w-full text-sm' style={{ color: '#5a3e36' }}>
              <thead className='text-sm uppercase' style={{ backgroundColor: '#f5f0e9' }}>
                <tr>
                  <th scope='col' className='hidden sm:table-cell px-4 sm:px-6 py-3' style={{ fontFamily: 'serif' }}>
                    Author
                  </th>
                  <th scope='col' className='px-4 sm:px-6 py-3' style={{ fontFamily: 'serif' }}>
                    Blog Title
                  </th>
                  <th scope='col' className='px-4 sm:px-6 py-3' style={{ fontFamily: 'serif' }}>
                    Published Date
                  </th>
                  <th scope='col' className='px-4 sm:px-6 py-3' style={{ fontFamily: 'serif' }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: '#d3c6b6' }}>
                {blogs
                  .sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime())
                  .map((item) => (
                    <BlogListTable
                      key={item._id}
                      mongoId={item._id}
                      authorName={item.authorName}
                      title={item.title}
                      authorImage={item.authorImage}
                      date={item.date}
                      deleteBlog={deleteBlog}
                    />
                  ))}
              </tbody>
            </table>
          </div>

          {/* Statistics */}
          <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: '#f9f5e9', border: '1px solid #e5dcc9' }}>
            <p className="text-sm font-medium" style={{ color: '#5a3e36' }}>
              📊 Total Blogs: {blogs.length}
            </p>
          </div>
        </>
      )}
    </div>
  )
}

export default Page