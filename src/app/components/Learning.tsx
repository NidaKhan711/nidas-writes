"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import buk from '../assets/Images/buk.jpg'
import say from '../assets/Images/say.jpg'

const  Learning = () => {
  return (
    <div className="min-h-screen bg-[#fffcf1]  py-20 px-4 flex flex-col items-center justify-center">
      <div className="max-w-6xl mx-auto">
        {/* Image Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ staggerChildren: 0.2 }}
        >
          <motion.div
            className="relative h-64 md:h-96 rounded-2xl overflow-hidden shadow-xl"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 100 }}
            whileHover={{ y: -10 }}
          >
            <Image
              src={buk}
              alt="First showcase"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-[#996568]/20 hover:bg-transparent transition-all duration-300" />
          </motion.div>

          <motion.div
            className="relative h-64 md:h-96 rounded-2xl overflow-hidden shadow-xl"
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 100 }}
            whileHover={{ y: -10 }}
          >
            <Image
              src={say}            
              alt="Second showcase"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-[#996568]/20 hover:bg-transparent transition-all duration-300" />
          </motion.div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#5a3e36] mb-6">
            Discover Timeless Elegance
          </h2>
          <p className="text-lg text-[#5a3e36]/90">
            Our collection blends traditional craftsmanship with contemporary design, creating pieces that tell a story. Each element is carefully curated to bring warmth and character to your space.
          </p>
        </motion.div>

        {/* Special Button */}
        <motion.div
          className="flex justify-center"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Link
            href="#"
            className="relative group overflow-hidden px-10 py-4 rounded-full"
          >
            {/* Button background layers */}
            <span className="absolute inset-0 bg-[#ffba71] rounded-full transform group-hover:scale-105 transition-transform duration-500" />
            <span className="absolute inset-0 bg-gradient-to-r from-[#996568] to-[#b87a7d] opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-300" />
            
            {/* Button content */}
            <span className="relative z-10 flex items-center text-lg font-medium text-[#5a3e36]/90 hover:text-[#5a3e36] transition-colors duration-300">
              Explore Collection
              <motion.span
                className="ml-3 inline-block"
                animate={{
                  x: [0, 4, 0],
                  rotate: [0, 10, -5, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "mirror"
                }}
              >
                →
              </motion.span>
            </span>
            
            {/* Shine effect */}
            <span className="absolute inset-0 overflow-hidden rounded-full">
              <span className="absolute top-0 left-0 w-1/3 h-full bg-white/20 transform -skew-x-12 animate-shine" />
            </span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Learning;