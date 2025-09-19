"use client";
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

  // ✅ Slug generator for SEO
  const slugify = (text: string) =>
    text.toString().toLowerCase().trim()
      .replace(/\s+/g, "-")
      .replace(/&/g, "-and-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-");

  // ✅ Safe image URLs (build-safe)
  const safeImageUrl =
    typeof window !== "undefined" && image
      ? URL.createObjectURL(image)
      : "/assets/images/uplod.png";

  const safeAuthorUrl =
    typeof window !== "undefined" && authorImage
      ? URL.createObjectURL(authorImage)
      : "/assets/images/userup.png";

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
      
      if (image) {
        formData.append("image", image);
      }
      if (authorImage) {
        formData.append("authorImage", authorImage);
      }

      const response = await axios.post('/api/blogs', formData);
      
      if (response.data.success) {
        toast.success(response.data.message || "Blog uploaded successfully");
        setData({ title: "", description: "", category: "", authorName: "" });
        setImage(null);
        setAuthorImage(null);
        document.querySelectorAll('input[type="file"]').forEach(input => (input as HTMLInputElement).value = '');
      } else {
        toast.error(response.data.message || "Error uploading blog");
      }
    } catch (error: unknown) {
      console.error("Upload error:", error);
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
      {/* 🔥 SEO Head Section */}
      <Head>
        <title>{data.title ? `${data.title} | My Blog` : "Create New Blog Post"}</title>
        <meta
          name="description"
          content={data.description ? data.description.slice(0, 160) : "Write and publish your blog easily with our platform."}
        />
        <meta
          name="keywords"
          content={data.title ? `${data.title}, ${data.category}, blog, philosophy, lifestyle` : "blog, articles, philosophy, lifestyle"}
        />
        <meta name="author" content={data.authorName || "Unknown Author"} />

        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={data.title || "New Blog Post"} />
        <meta property="og:description" content={data.description ? data.description.slice(0, 160) : "Check out this blog post."} />
        <meta property="og:image" content={safeImageUrl} />
        <meta property="og:url" content={`https://yourdomain.com/blog/${slugify(data.title || "new-post")}`} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={data.title || "New Blog Post"} />
        <meta name="twitter:description" content={data.description ? data.description.slice(0, 160) : "Check out this blog post."} />
        <meta name="twitter:image" content={safeImageUrl} />
      </Head>

      {/* 📝 Blog Form */}
      <div className="min-h-screen p-4 md:p-8" style={{ backgroundColor: '#fffcf1' }}>
        <div className="p-4 sm:p-8 md:p-12 rounded-lg shadow-lg mx-auto max-w-6xl" style={{ backgroundColor: '#fffcf1', border: '1px solid #ddd7c7' }}>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold mb-6 sm:mb-8" style={{ color: '#5a3e36' }}>
            Add a New Entry 🖋️
          </h1>

          <form onSubmit={onSubmitHandler} className="space-y-6">
            {/* Title */}
            <div>
              <p className='text-base sm:text-lg font-medium' style={{ color: '#5a3e36' }}>Blog Title</p>
              <input 
                name='title'
                onChange={onChangeHandler}
                value={data.title}
                type="text"
                placeholder='Enter a captivating title...'
                className='w-full md:w-2/3 mt-2 px-4 py-3 border-b-2 focus:outline-none'
                style={{ borderColor: '#b87a7d', color: '#5a3e36', backgroundColor: 'transparent', fontFamily: 'serif' }}
                required disabled={isLoading}
              />
            </div>

            {/* Description */}
            <div>
              <p className='text-base sm:text-lg font-medium' style={{ color: '#5a3e36' }}>Blog Description</p>
              <textarea 
                name='description'
                onChange={onChangeHandler}
                value={data.description}
                placeholder='Write your thoughts here...'
                rows={6}
                className='w-full mt-2 px-4 py-3 border rounded-md focus:outline-none'
                style={{ borderColor: '#d3c6b6', color: '#5a3e36', backgroundColor: '#fffcf1', fontFamily: 'serif' }}
                required disabled={isLoading}
              />
            </div>

            {/* Thumbnails */}
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
              <div className="flex-1">
                <p className="text-base sm:text-lg font-medium" style={{ color: '#5a3e36' }}>Blog Thumbnail</p>
                <label htmlFor="thumbnail" className="cursor-pointer">
                  <div className="relative w-full max-w-xs mx-auto sm:mx-0">
                    <Image
                      src={safeImageUrl}
                      alt="Blog Thumbnail"
                      width={200}
                      height={200}
                      className="rounded-lg my-4 border-2 p-1 object-cover w-full aspect-square"
                      style={{ borderColor: '#996568' }}
                    />
                  </div>
                </label>
                <input onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)} type="file" id="thumbnail" hidden required disabled={isLoading} accept="image/*" />
              </div>

              <div className="flex-1">
                <p className="text-base sm:text-lg font-medium" style={{ color: '#5a3e36' }}>Author Image</p>
                <label htmlFor="authorImage" className="cursor-pointer">
                  <div className="relative w-32 h-32 mx-auto sm:mx-0">
                    <Image
                      src={safeAuthorUrl}
                      alt="Author Image"
                      width={128}
                      height={128}
                      className="rounded-full my-4 border-2 p-1 object-cover w-full h-full"
                      style={{ borderColor: '#996568' }}
                    />
                  </div>
                </label>
                <input onChange={(e) => setAuthorImage(e.target.files ? e.target.files[0] : null)} type="file" id="authorImage" hidden required disabled={isLoading} accept="image/*" />
              </div>
            </div>

            {/* Author + Category */}
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
                  style={{ borderColor: '#d3c6b6', color: '#5a3e36', backgroundColor: '#fffcf1', fontFamily: 'serif' }}
                  required disabled={isLoading}
                />
              </div>

              <div className="flex-1">
                <p className='text-base sm:text-lg font-medium' style={{ color: '#5a3e36' }}>Blog Category</p>
                <select
                  className='w-full mt-2 px-4 py-3 border rounded-md focus:outline-none'
                  name="category"
                  onChange={onChangeHandler}
                  value={data.category}
                  style={{ borderColor: '#d3c6b6', color: '#5a3e36', backgroundColor: '#fffcf1', fontFamily: 'serif' }}
                  required disabled={isLoading}
                >
                  <option value="">Select Category</option>
                  <option value="Philosophy">Philosophy</option>
                  <option value="Philosophy">Physiology</option>
                </select>
              </div>
            </div>

            <div className="flex justify-center sm:justify-start">
              <button type='submit' className='mt-6 sm:mt-8 px-6 py-3 sm:px-8 sm:py-4 rounded-md font-bold transition-all duration-300 cursor-pointer w-full sm:w-auto text-center disabled:opacity-70 disabled:cursor-not-allowed'
                style={{ color: '#fffcf1', background: 'linear-gradient(to right, #996568, #b87a7d)' }}
                disabled={isLoading}>
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
