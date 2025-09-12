"use client";
import Link from "next/link";
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#fffcf1] via-[#fef7e6] to-[#f9f1e4] text-[#5a3e36] overflow-hidden">
      {/* Background elements for visual flair */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#e8c9a7]/30 rounded-full mix-blend-multiply filter blur-2xl animate-blob opacity-70"
        initial={{ y: -50, x: -50, opacity: 0 }}
        animate={{ y: 0, x: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1.5 }}
      ></motion.div>
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-[#996568]/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000 opacity-70"
        initial={{ y: 50, x: 50, opacity: 0 }}
        animate={{ y: 0, x: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 1.5 }}
      ></motion.div>
      
      {/* Modern, subtle SVG element for theme */}
      <motion.svg
        className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 w-[300px] h-[300px] opacity-10 text-[#d3c6b6] z-0"
        viewBox="0 0 500 500"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ opacity: 0, rotate: 10 }}
        animate={{ opacity: 0.2, rotate: 0 }}
        transition={{ delay: 1.2, duration: 2, type: "spring", stiffness: 50 }}
      >
       
      </motion.svg>

      {/* Content */}
      <div className="max-w-3xl text-center px-4 z-10 relative">
        <motion.h1 
          className="text-5xl md:text-7xl font-bold text-[#5a3e36] mb-6 leading-snug tracking-wider" 
          style={{ fontFamily: "'Playfair Display', serif" }}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to my digital diary<span className="text-[#996568]">.</span>
        </motion.h1>

        <motion.div
          className="space-y-4 mb-8 text-[#5a3e36] opacity-90"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <p className="text-2xl italic font-serif">
            Where thoughts blossom like flowers,
          </p>
          <p className="text-2xl italic font-serif">
            and silence helps them bloom.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5, type: "spring", stiffness: 200 }}
        >
          <Link
            href="/blog"
            className="relative inline-block group bg-gradient-to-br from-[#996568] to-[#b87a7d] text-[#fffcf1] font-medium px-10 py-4 rounded-xl text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            style={{ fontFamily: "'Inter', sans-serif" }}
            aria-label="Start reading the diary"
          >
            <span className="relative z-10 flex items-center justify-center tracking-wider group-hover:tracking-widest transition-all duration-300">
              Start Reading
            </span>
            <span className="absolute inset-0 bg-[#5a3e36] opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl"></span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}