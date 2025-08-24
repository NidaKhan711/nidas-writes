import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) throw new Error("Please add MONGO_URI to .env");

const connectDB = async (): Promise<void> => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(MONGO_URI);
  console.log("✅ MongoDB Connected");
};

export default connectDB;
