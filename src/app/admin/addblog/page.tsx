"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import Head from "next/head";
import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";

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

  // ✅ Slug generator
  const slugify = (text: string) =>
    text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/&/g, "-and-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-");

  // ✅ Safe URLs
  const safeImageUrl =
    typeof window !== "undefined" && image
      ? URL.createObjectURL(image)
      : "/assets/images/uplod.png";

  const safeAuthorUrl =
    typeof window !== "undefined" && authorImage
      ? URL.createObjectURL(authorImage)
      : "/assets/images/userup.png";

  const onChangeHandler = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  // ✅ Upload to Cloudinary
  const uploadToCloudinary = async (file: File) => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset || "");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    return data.secure_url;
  };

  const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      let imageUrl = "";
      let authorImageUrl = "";

      if (image) imageUrl = await uploadToCloudinary(image);
      if (authorImage) authorImageUrl = await uploadToCloudinary(authorImage);

      const payload = {
        ...data,
        image: imageUrl,
        authorImage: authorImageUrl,
      };

      // ✅ Deploy-safe base URL
      const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "";
      const response = await axios.post(`${baseURL}/api/blogs`, payload);

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
        document
          .querySelectorAll('input[type="file"]')
          .forEach((input) => ((input as HTMLInputElement).value = ""));
      } else {
        toast.error(response.data.message || "Error uploading blog");
      }
    } catch (error: unknown) {
      console.error("Upload error:", error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ message?: string }>;
        toast.error(
          axiosError.response?.data?.message || "Error uploading blog"
        );
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
        <title>
          {data.title ? `${data.title} | My Blog` : "Create New Blog Post"}
        </title>
      </Head>

      <div
        className="min-h-screen p-4 md:p-8"
        style={{ backgroundColor: "#fffcf1" }}
      >
        <div
          className="p-4 sm:p-8 md:p-12 rounded-lg shadow-lg mx-auto max-w-6xl"
          style={{ backgroundColor: "#fffcf1", border: "1px solid #ddd7c7" }}
        >
          <h1
            className="text-2xl sm:text-3xl font-serif font-bold mb-6 sm:mb-8"
            style={{ color: "#5a3e36" }}
          >
            Add a New Entry 🖋️
          </h1>

          <form onSubmit={onSubmitHandler} className="space-y-6">
            {/* Title & Description */}
            <div>
              <p
                className="text-base sm:text-lg font-medium"
                style={{ color: "#5a3e36" }}
              >
                Blog Title
              </p>
              <input
                name="title"
                onChange={onChangeHandler}
                value={data.title}
                type="text"
                placeholder="Enter a captivating title..."
                className="w-full md:w-2/3 mt-2 px-4 py-3 border-b-2 focus:outline-none"
                style={{
                  borderColor: "#b87a7d",
                  color: "#5a3e36",
                  backgroundColor: "transparent",
                  fontFamily: "serif",
                }}
                required
                disabled={isLoading}
              />
            </div>

            {/* ...baqi form wahi rahega (description, category, author etc) ... */}

            <div className="flex justify-center sm:justify-start">
              <button
                type="submit"
                className="mt-6 sm:mt-8 px-6 py-3 sm:px-8 sm:py-4 rounded-md font-bold transition-all duration-300 cursor-pointer w-full sm:w-auto text-center disabled:opacity-70 disabled:cursor-not-allowed"
                style={{
                  color: "#fffcf1",
                  background: "linear-gradient(to right, #996568, #b87a7d)",
                }}
                disabled={isLoading}
              >
                {isLoading ? "Uploading..." : "Upload Blog"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Page;
