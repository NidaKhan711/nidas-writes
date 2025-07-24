"use client"
import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react'; // Import useRef
import Image from 'next/image';
import Link from 'next/link';
import Philso from "../assets/Images/philo.jpg"

const PhiloSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 }); // Trigger animation once when 50% in view

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Delay between children animations
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <div className="relative h-screen" ref={ref}> {/* Attach ref to the main div */}
      {/* Fixed Background Image */}
      <div className="fixed inset-0 bg-black -z-20">
        <Image
          src={Philso}
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          className='opacity-68'
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full">
        {/* Header Section */}
        <motion.div
          className="h-full flex flex-col justify-center items-center p-8 text-white"
          variants={containerVariants} // Apply container variants
          initial="hidden"
          animate={isInView ? "visible" : "hidden"} // Animate based on isInView
        >
          <motion.h1
            className="text-5xl md:text-8xl font-bold mb-4 text-center"
            variants={itemVariants} // Apply item variants
          >
            Philosophy
          </motion.h1>
          <motion.p
            className="text-xl md:text-xl text-center max-w-2xl w-full mt-7 mb-10"
            variants={itemVariants} // Apply item variants
          >
            Philosophy is a way of understanding life, helping us to think deeply, ask questions,
            and search for truth. It explores who we are, why we exist, and what the purpose of life
            might be. Every idea and belief is born from some form of philosophy. It's not just knowledge—it's
            a journey that connects us to our inner self.
          </motion.p>

          {/* Learn More Button */}
          <motion.div
            variants={itemVariants} // Apply item variants
          >
            <Link
              href="/diary"
              className="relative inline-block group bg-gradient-to-br from-[#ffd49e] to-[#f8b878] text-[#5a3e36] font-medium px-8 py-3 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-[#e8c9a7] hover:border-[#e29d9d] hover:translate-y-[-2px]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <span className="relative z-10 flex items-center justify-center">
                Learn More
                <motion.span
                  className="ml-2"
                  animate={{
                    rotate: [0, 15, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                </motion.span>
              </span>
              <span className="absolute inset-0 bg-[#996568] opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-lg group-hover:blur-[1px]"></span>
              <span className="absolute inset-0 rounded-lg shadow-inset-md group-active:shadow-inset-lg transition-shadow duration-200"></span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default PhiloSection;