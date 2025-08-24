import mongoose, { Schema, model, models } from "mongoose";

const blogSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    authorName: { type: String, default: "Admin" },
    authorImage: { type: String, default: "Admin" },
    image: { type: String }, // optional
    category: { type: String, default: "General" },
    date: {type: Date, default: Date.now},
  },
  { timestamps: true }
);

const Blog = models.Blog || model("Blog", blogSchema);
export default Blog;
