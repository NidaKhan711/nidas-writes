import mongoose, { Schema, Document } from "mongoose";

export interface IBlog extends Document {
  title: string;
  description: string;
  authorName?: string;
  authorImage?: string;
  image?: string;
  category?: string;
  date?: Date;
}

const BlogSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    authorName: { type: String, default: "Admin" },
    authorImage: { type: String, default: "Admin" },
    image: { type: String , required: true }, 
    category: { type: String, default: "General" },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Blog ||
  mongoose.model<IBlog>("Blog", BlogSchema);
