"use client"
import React, { useState, ChangeEvent, FormEvent } from 'react'
import Image from 'next/image'
import Head from 'next/head'
import { toast } from 'react-toastify';
import axios, { AxiosError } from 'axios';

const Page = () => {
  const [image, setImage] = useState<File | null>(null);
  const [authorImage, setAuthorImage] = useState<File | null>(null);
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "",
    authorName: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("authorName", data.authorName);
      // Date automatically server pe set ho jayegi
      
      if (image) {
        formData.append("image", image);
      }
      
      if (authorImage) {
        formData.append("authorImage", authorImage);
      }

      const response = await axios.post('/api/blog', formData);
      
      if (response.data.success) {
        toast.success(response.data.message || "Blog uploaded successfully");
        setData({
          title: "",
          description: "",
          category: "",
          authorName: "",
        });
        setImage(null);
        setAuthorImage(null);
        
        // Reset file inputs
        const fileInputs = document.querySelectorAll('input[type="file"]');
        fileInputs.forEach(input => (input as HTMLInputElement).value = '');
      } else {
        toast.error(response.data.message || "Error uploading blog");
      }
    } catch (error: unknown) {
      console.error("Upload error:", error);
      
      // Type-safe error handling
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ message?: string }>;
        toast.error(axiosError.response?.data?.message || "Error uploading blog");
      } else if (error instanceof Error) {
        toast.error(error.message || "Error uploading blog");
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Create New Blog Post</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      
      <div className="min-h-screen p-4 md:p-8" style={{ backgroundColor: '#fffcf1' }}>
        <div className="p-4 sm:p-8 md:p-12 rounded-lg shadow-lg mx-auto max-w-6xl" style={{ backgroundColor: '#fffcf1', border: '1px solid #ddd7c7' }}>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold mb-6 sm:mb-8" style={{ color: '#5a3e36' }}>
            Add a New Entry 🖋️
          </h1>
          
          <form onSubmit={onSubmitHandler} className="space-y-6">
            {/* Blog Title */}
            <div>
              <p className='text-base sm:text-lg font-medium' style={{ color: '#5a3e36' }}>Blog Title</p>
              <input 
                name='title' 
                onChange={onChangeHandler} 
                value={data.title} 
                type="text" 
                placeholder='Enter a captivating title...' 
                className='w-full md:w-2/3 mt-2 px-4 py-3 border-b-2 focus:outline-none'
                style={{ 
                  borderColor: '#b87a7d', 
                  color: '#5a3e36', 
                  backgroundColor: 'transparent',
                  fontFamily: 'serif'
                }}
                required
                disabled={isLoading}
              /> 
            </div>

            {/* Blog Description */}
            <div>
              <p className='text-base sm:text-lg font-medium' style={{ color: '#5a3e36' }}>Blog Description</p>
              <textarea 
                name='description' 
                onChange={onChangeHandler} 
                value={data.description} 
                placeholder='Write your thoughts here...' 
                rows={6}
                className='w-full mt-2 px-4 py-3 border rounded-md focus:outline-none'
                style={{ 
                  borderColor: '#d3c6b6', 
                  color: '#5a3e36', 
                  backgroundColor: '#fffcf1',
                  fontFamily: 'serif'
                }}
                required
                disabled={isLoading}
              /> 
            </div>

            {/* Image Uploads */}
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
              {/* Thumbnail */}
              <div className="flex-1">
                <p className="text-base sm:text-lg font-medium" style={{ color: '#5a3e36' }}>Blog Thumbnail</p>
                <label htmlFor="thumbnail" className="cursor-pointer">
                  <div className="relative w-full max-w-xs mx-auto sm:mx-0">
                    <Image
                      src={!image ? "/assets/images/uplode.png" : URL.createObjectURL(image)}
                      alt="Blog Thumbnail"
                      width={200}
                      height={200}
                      className="rounded-lg my-4 border-2 p-1 object-cover w-full aspect-square"
                      style={{ borderColor: '#996568' }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black bg-opacity-20 rounded-lg">
                      <span className="text-white font-medium">Click to change</span>
                    </div>
                  </div>
                </label>
                <input
                  onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                  type="file"
                  id="thumbnail"
                  hidden
                  required
                  disabled={isLoading}
                  accept="image/*"
                />
                <p className="text-sm text-gray-600 mt-1 text-center sm:text-left">Recommended: Square image, 500×500px</p>
              </div>

              {/* Author Image */}
              <div className="flex-1">
                <p className="text-base sm:text-lg font-medium" style={{ color: '#5a3e36' }}>Author Image</p>
                <label htmlFor="authorImage" className="cursor-pointer">
                  <div className="relative w-32 h-32 mx-auto sm:mx-0">
                    <Image
                      src={!authorImage ? "/assets/images/userup.png" : URL.createObjectURL(authorImage)}
                      alt="Author Image"
                      width={128}
                      height={128}
                      className="rounded-full my-4 border-2 p-1 object-cover w-full h-full"
                      style={{ borderColor: '#996568' }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black bg-opacity-20 rounded-full">
                      <span className="text-white text-xs font-medium text-center px-2">Click to change</span>
                    </div>
                  </div>
                </label>
                <input
                  onChange={(e) => setAuthorImage(e.target.files ? e.target.files[0] : null)}
                  type="file"
                  id="authorImage"
                  hidden
                  required
                  disabled={isLoading}
                  accept="image/*"
                />
                <p className="text-sm text-gray-600 mt-1 text-center sm:text-left">Recommended: Square image, 200×200px</p>
              </div>
            </div>

            {/* Author Name and Category */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <div className="flex-1">
                <p className='text-base sm:text-lg font-medium' style={{ color: '#5a3e36' }}>Author Name</p>
                <input 
                  name='authorName' 
                  onChange={onChangeHandler} 
                  value={data.authorName} 
                  type="text" 
                  placeholder='Enter Author Name' 
                  className='w-full mt-2 px-4 py-3 border rounded-md focus:outline-none' 
                  style={{ 
                    borderColor: '#d3c6b6', 
                    color: '#5a3e36', 
                    backgroundColor: '#fffcf1',
                    fontFamily: 'serif'
                  }}
                  required
                  disabled={isLoading}
                /> 
              </div>

              <div className="flex-1">
                <p className='text-base sm:text-lg font-medium' style={{ color: '#5a3e36' }}>Blog Category</p>
                <select 
                  className='w-full mt-2 px-4 py-3 border rounded-md focus:outline-none' 
                  name="category"  
                  onChange={onChangeHandler} 
                  value={data.category}  
                  style={{ 
                    borderColor: '#d3c6b6', 
                    color: '#5a3e36', 
                    backgroundColor: '#fffcf1',
                    fontFamily: 'serif'
                  }}
                  required
                  disabled={isLoading}
                >
                  <option value="">Select Category</option>
                  <option value="Philosophy">Philosophy</option>
                  <option value="Lifestyle">Lifestyle</option>
                </select>
              </div>
            </div>

            {/* Date Information Note */}
            <div className="p-4 rounded-md" style={{ backgroundColor: '#f9f5e9', border: '1px solid #e5dcc9' }}>
              <p className="text-sm font-medium" style={{ color: '#5a3e36' }}>
                📅 Note: The blog will be automatically dated with the current date and time when published.
              </p>
            </div>

            <div className="flex justify-center sm:justify-start">
              <button 
                type='submit' 
                className='mt-6 sm:mt-8 px-6 py-3 sm:px-8 sm:py-4 rounded-md font-bold transition-all duration-300 cursor-pointer w-full sm:w-auto text-center disabled:opacity-70 disabled:cursor-not-allowed'
                style={{
                  color: '#fffcf1',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  background: 'linear-gradient(to right, #996568, #b87a7d)'
                }}
                onMouseOver={e => !isLoading && (e.currentTarget.style.boxShadow = '0 6px 8px rgba(0, 0, 0, 0.15)')}
                onMouseOut={e => !isLoading && (e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)')}
                disabled={isLoading}
              >
                {isLoading ? 'Uploading...' : 'Upload Blog'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Page;