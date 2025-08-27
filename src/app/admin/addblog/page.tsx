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
      toast.error("Error uploading blog");
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="pt-5 px-5 sm:pt-12 sm:pl-16">
      <p>Upload Thumbnail</p>
      <label htmlFor="thumbnail">
        <Image
          src={!image ? "/assets/images/uplode.png" : URL.createObjectURL(image)}
          alt="Blog Thumbnail"
          width={200}
          height={200}
          className="rounded-lg cursor-pointer"
        />
      </label>
      <input
        onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
        type="file"
        id="thumbnail"
        hidden
        required
      />
      
      <p className='text-xl mt-4'>Blog title</p>
      <input 
        name='title' 
        onChange={onChangeHandler} 
        value={data.title} 
        type="text" 
        placeholder='Enter blog title' 
        className='w-full sm:w-[500px] mt-4 px-4 py-4 border'  
        required
      />  

      <p className='text-xl mt-4'>Blog Description</p>
      <textarea 
        name='description' 
        onChange={onChangeHandler} 
        value={data.description} 
        placeholder='write content here' 
        className='w-full sm:w-[500px] mt-4 px-4 py-4 border'  
        required
      /> 
      
      <p>Upload Author Image</p>
      <label htmlFor="authorImage">
        <Image
          src={!authorImage ? "/assets/images/userup.png" : URL.createObjectURL(authorImage)}
          alt="Author Image"
          width={200}
          height={200}
          className="rounded-lg cursor-pointer"
        />
      </label>
      <input
        onChange={(e) => setAuthorImage(e.target.files ? e.target.files[0] : null)}
        type="file"
        id="authorImage"
        hidden
        required
      />
      <p className='text-xl mt-4'>Author Name</p>
        <input 
        name='authorName' 
        onChange={onChangeHandler} 
        value={data.authorName} 
        type="text" 
        placeholder='Enter Author Name' 
        className='w-full sm:w-[500px] mt-4 px-4 py-4 border'  
        required
      /> 
      <p className='text-xl mt-4'>Blog Category</p>
      <select 
        className='w-40 mt-4 px-4 py-4 border text-gray-500' 
        name="category"  
        onChange={onChangeHandler} 
        value={data.category}  
        required
      >
        <option value="">Select Category</option>
        <option value="Philosophy">Philosophy</option>
        <option value="Tech">Tech</option>
        <option value="Lifestyle">Lifestyle</option>
      </select>

      <br />
      <button type='submit' className='mt-8 w-40 h-12 bg-amber-600 text-white'>Upload Blog</button>
    </form>
  );
};

export default Page;