"use client"
import React, { useState, ChangeEvent, FormEvent } from 'react'
import Image from 'next/image'
import { toast } from 'react-toastify';
import axios from 'axios';

const Page = () => {
  const [image, setImage] = useState<File | null>(null);
  const [authorImage, setAuthorImage] = useState<File | null>(null);
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "",
    authorName: "",
  });

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("authorName", data.authorName);
      
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
      } else {
        toast.error(response.data.message || "Error uploading blog");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Error uploading blog");
    }
  };

  return (
    <div className="p-8" style={{ backgroundColor: '#fffcf1' }}>
      <div className="p-8 sm:p-12 rounded-lg shadow-lg" style={{ backgroundColor: '#fffcf1', border: '1px solid #ddd7c7' }}>
        <h1 className="text-3xl font-serif font-bold mb-8" style={{ color: '#5a3e36' }}>
          Add a New Entry 🖋️
        </h1>
        
        <form onSubmit={onSubmitHandler} className="space-y-6">
          {/* Blog Title */}
          <div>
            <p className='text-lg font-medium' style={{ color: '#5a3e36' }}>Blog Title</p>
            <input 
              name='title' 
              onChange={onChangeHandler} 
              value={data.title} 
              type="text" 
              placeholder='Enter a captivating title...' 
              className='w-full sm:w-2/3 mt-2 px-4 py-3 border-b-2 focus:outline-none'
              style={{ 
                borderColor: '#b87a7d', 
                color: '#5a3e36', 
                backgroundColor: 'transparent',
                fontFamily: 'serif'
              }}
              required
            /> 
          </div>

          {/* Blog Description */}
          <div>
            <p className='text-lg font-medium' style={{ color: '#5a3e36' }}>Blog Description</p>
            <textarea 
              name='description' 
              onChange={onChangeHandler} 
              value={data.description} 
              placeholder='Write your thoughts here...' 
              rows={8}
              className='w-full mt-2 px-4 py-3 border rounded-md focus:outline-none'
              style={{ 
                borderColor: '#d3c6b6', 
                color: '#5a3e36', 
                backgroundColor: '#fffcf1',
                fontFamily: 'serif'
              }}
              required
            /> 
          </div>

          {/* Image Uploads */}
          <div className="flex flex-col sm:flex-row gap-8">
            {/* Thumbnail */}
            <div>
              <p className="text-lg font-medium" style={{ color: '#5a3e36' }}>Blog Thumbnail</p>
              <label htmlFor="thumbnail">
                <Image
                  src={!image ? "/assets/images/uplode.png" : URL.createObjectURL(image)}
                  alt="Blog Thumbnail"
                  width={200}
                  height={200}
                  className="rounded-lg cursor-pointer my-4 border-2 p-1 object-cover"
                  style={{ borderColor: '#996568' }}
                />
              </label>
              <input
                onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                type="file"
                id="thumbnail"
                hidden
                required
              />
            </div>

            {/* Author Image */}
            <div>
              <p className="text-lg font-medium" style={{ color: '#5a3e36' }}>Author Image</p>
              <label htmlFor="authorImage">
                <Image
                  src={!authorImage ? "/assets/images/userup.png" : URL.createObjectURL(authorImage)}
                  alt="Author Image"
                  width={100}
                  height={100}
                  className="rounded-full cursor-pointer my-4 border-2 p-1 object-cover"
                  style={{ borderColor: '#996568' }}
                />
              </label>
              <input
                onChange={(e) => setAuthorImage(e.target.files ? e.target.files[0] : null)}
                type="file"
                id="authorImage"
                hidden
                required
              />
            </div>
          </div>

          {/* Author Name and Category */}
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-1">
              <p className='text-lg font-medium' style={{ color: '#5a3e36' }}>Author Name</p>
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
              /> 
            </div>

            <div className="flex-1">
              <p className='text-lg font-medium' style={{ color: '#5a3e36' }}>Blog Category</p>
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
              >
                <option value="">Select Category</option>
                <option value="Philosophy">Philosophy</option>
                <option value="Tech">Tech</option>
                <option value="Lifestyle">Lifestyle</option>
              </select>
            </div>
          </div>

          <button 
            type='submit' 
            className='mt-8 px-8 py-4 rounded-md font-bold transition-all duration-300 cursor-pointer'
            style={{
              color: '#fffcf1',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              background: 'linear-gradient(to right, #996568, #b87a7d)'
            }}
            onMouseOver={e => e.currentTarget.style.boxShadow = '0 6px 8px rgba(0, 0, 0, 0.15)'}
            onMouseOut={e => e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'}
          >
            Upload Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;