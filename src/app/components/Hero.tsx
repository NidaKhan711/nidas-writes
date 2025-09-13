"use client";
import Link from "next/link";
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center pt-12 bg-gradient-to-br from-[#fffcf1] via-[#fef7e6] to-[#f9f1e4] text-[#5a3e36] overflow-hidden">
      
      {/* Background blobs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#e8c9a7]/30 rounded-full mix-blend-multiply filter blur-2xl animate-blob opacity-70"
        initial={{ y: -50, x: -50, opacity: 0 }}
        animate={{ y: 0, x: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1.5 }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-[#996568]/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000 opacity-70"
        initial={{ y: 50, x: 50, opacity: 0 }}
        animate={{ y: 0, x: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 1.5 }}
      />
      
      {/* Content */}
      <div className="max-w-3xl text-center px-4 z-10 relative">
        <motion.h1 
          className="text-5xl md:text-7xl font-bold text-[#5a3e36] mb-6 leading-snug tracking-wider" 
          style={{ fontFamily: "'Playfair Display', serif" }}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to <span className="text-[#996568]">Mindora</span>
        </motion.h1>

        <motion.div
          className="space-y-4 mb-8 text-[#5a3e36] opacity-90"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <p className="text-2xl italic font-serif">
            A space where thoughts wander freely,
          </p>
          <p className="text-2xl italic font-serif">
            reflections take root, and wisdom grows silently.
          </p>
          <p className="text-xl md:text-2xl mt-2 opacity-80">
            Explore ideas, uncover insights, and connect with the quiet essence of life.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5, type: "spring", stiffness: 200 }}
        >
          <Link
            href="blog"
            className="relative inline-block group bg-gradient-to-br from-[#996568] to-[#b87a7d] text-[#fffcf1] font-medium px-10 py-4 rounded-xl text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            style={{ fontFamily: "'Inter', sans-serif" }}
            aria-label="Explore the blog"
          >
            <span className="relative z-10 flex items-center justify-center tracking-wider group-hover:tracking-widest transition-all duration-300">
              Explore Thoughts
            </span>
            <span className="absolute inset-0 bg-[#5a3e36] opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl"></span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
