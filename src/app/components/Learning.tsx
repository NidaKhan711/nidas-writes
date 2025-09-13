"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import buk from '@/../public/assets/Images/buk.jpg';
import say from '@/../public/assets/Images/say.jpg';

const Learning = () => {
  return (
    <div className="min-h-screen bg-[#fffcf1] py-12 md:py-20 px-4 flex flex-col items-center justify-center">
      <div className="max-w-6xl mx-auto w-full">
        {/* Image Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
        >
          <motion.div
            className="relative h-64 md:h-96 rounded-2xl overflow-hidden shadow-xl"
            variants={{
              hidden: { x: -30, opacity: 0 },
              visible: { 
                x: 0, 
                opacity: 1,
                transition: { type: 'spring', stiffness: 100, damping: 15 }
              }
            }}
            whileHover={{ y: -8 }}
          >
            <Image
              src={buk}
              alt="First showcase"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={false}
            />
            <div className="absolute inset-0 bg-[#996568]/20 hover:bg-transparent transition-all duration-300" />
          </motion.div>

          <motion.div
            className="relative h-64 md:h-96 rounded-2xl overflow-hidden shadow-xl"
            variants={{
              hidden: { x: 30, opacity: 0 },
              visible: { 
                x: 0, 
                opacity: 1,
                transition: { type: 'spring', stiffness: 100, damping: 15, delay: 0.1 }
              }
            }}
            whileHover={{ y: -8 }}
          >
            <Image
              src={say}            
              alt="Second showcase"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={false}
            />
            <div className="absolute inset-0 bg-[#996568]/20 hover:bg-transparent transition-all duration-300" />
          </motion.div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-10 md:mb-12 px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#5a3e36] mb-4 md:mb-6">
             The Meaning of Life
          </h2>
          <p className="text-base md:text-lg text-[#5a3e36]/90 leading-relaxed">
           Life is not just about existing, but about seeking purpose. 
    Every question, every struggle, and every joy is part of a greater 
    journey towards understanding ourselves and the universe. 
    Philosophy teaches us to pause, reflect, and discover 
    meaning in the simplest of moments.
          </p>
        </motion.div>

        {/* Special Button */}
        <motion.div
          className="flex justify-center px-4"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Link
            href="blog"
            className="relative group overflow-hidden px-8 py-3 md:px-10 md:py-4 rounded-full block w-full max-w-xs"
          >
            {/* Button background layers */}
            <span className="absolute inset-0 bg-[#ffba71] rounded-full transform group-hover:scale-105 transition-transform duration-500" />
            <span className="absolute inset-0 bg-gradient-to-r from-[#996568] to-[#b87a7d] opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-300" />
            
            {/* Button content */}
            <span className="relative z-10 flex items-center justify-center text-base md:text-lg font-medium text-[#5a3e36]/90 group-hover:text-[#fffcf1] transition-colors duration-300">
              Explore 
              <motion.span
                className="ml-2 md:ml-3 inline-block"
                animate={{
                  x: [0, 4, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                →
              </motion.span>
            </span>
            
            {/* Shine effect */}
            <span className="absolute inset-0 overflow-hidden rounded-full">
              <span className="absolute top-0 left-0 w-1/3 h-full bg-white/20 transform -skew-x-12 group-hover:animate-shine group-hover:duration-1000" />
            </span>
          </Link>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes shine {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        .animate-shine {
          animation: shine 1.5s ease-in-out;
        }
        
        /* Responsive adjustments for mobile */
        @media (max-width: 768px) {
          .grid {
            gap: 1.5rem;
          }
        }
        
        /* Prevent layout shifts */
        .relative {
          position: relative;
        }
      `}</style>
    </div>
  );
};

export default Learning;