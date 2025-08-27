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

const page = () => {
  const [blogs, setBlogs] = useState<Blog[]>([])

  const fetchBlogs = async () => {
    const response = await axios.get('/api/blog');
    setBlogs(response.data.blogs);
  }
  const deleteBlog = async (mongoId: string) => {
    const response = await axios.delete(`/api/blog`, {
      params: { id: mongoId }
    });
    toast.success(response.data.message);
    fetchBlogs();
  }
  useEffect(() => {
    fetchBlogs();
  }, [])
  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
      <h1>All blogs</h1>
      <div className='relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide '>
        <table className='w-full text-sm text-gray-500'>
          <thead className='text-sm text-gray-700 uppercase bg-gray-50'>
            <tr>
              <th scope='col' className='hidden sm:block px-6 py-3' >
                Author Name
              </th>
              <th scope='col' className=' px-6 py-3' >
                Blog Title
              </th>
              <th scope='col' className=' px-6 py-3' >
                Date
              </th>
              <th scope='col' className=' px-6 py-3' >
                Action

              </th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((item, index) => {
               return <BlogListTable 
                 key={index}
                 mongoId={item._id} 
                 authorName={item.authorName} 
                 title={item.title} 
                 authorImage={item.authorImage} 
                 deleteBlog={deleteBlog}
               />

            })}

            
          </tbody>

        </table>
      </div>
    </div>
  )
}

export default page