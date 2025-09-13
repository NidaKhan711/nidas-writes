"use client";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen  bg-gradient-to-br from-[#fffcf1] via-[#fef7e6] to-[#f9f1e4] overflow-hidden flex items-center justify-center px-6 py-20 mt-12">
      
      {/* Simple animated background */}
      <motion.div
        className="absolute top-0 left-1/4 w-80 h-80 bg-[#996568]/30 rounded-full mix-blend-multiply filter blur-3xl opacity-60"
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -20, 0]
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity, 
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-0 right-1/3 w-96 h-96 bg-[#ffba71]/30 rounded-full mix-blend-multiply filter blur-3xl opacity-50"
        animate={{ 
          scale: [1, 1.1, 1],
          x: [0, -25, 0],
          y: [0, 15, 0]
        }}
        transition={{ 
          duration: 18, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 2 
        }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-64 h-64 bg-[#7a9e9f]/30 rounded-full mix-blend-multiply filter blur-3xl opacity-40"
        animate={{ 
          scale: [1, 0.9, 1],
          x: [0, 20, 0],
          y: [0, 25, 0]
        }}
        transition={{ 
          duration: 12, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 4 
        }}
      />

      {/* Content container */}
      <motion.div
        className="relative z-10 max-w-5xl text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Heading */}
        <motion.h1 
          className="text-5xl md:text-6xl font-bold text-[#5a3e36] mb-4 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          Spaces for Thought
        </motion.h1>
        
        {/* Subheading */}
        <motion.h2 
          className="text-xl md:text-2xl font-medium text-[#996568] mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          Where Reflection Meets Insight
        </motion.h2>

        {/* Intro paragraphs */}
        <motion.p
          className="text-base md:text-lg text-[#5a3e36]/90 leading-relaxed mb-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          At Spaces for Thought, we believe that the most profound ideas emerge from quiet contemplation. 
          In a world of constant noise, we create digital sanctuaries for deep thinking, mindful reflection, 
          and meaningful connection with oneself and others.
        </motion.p>

        <motion.p
          className="text-base md:text-lg text-[#5a3e36]/90 leading-relaxed mb-12 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          Founded in 2020, our platform has grown into a community of thinkers, writers, and seekers 
          who value depth over distraction. We curate content that challenges assumptions, sparks curiosity, 
          and nurtures the inner life through articles, guided reflections, and thought-provoking discussions.
        </motion.p>

        {/* Values section */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          {[
            {
              icon: "🧠",
              title: "Deep Thinking",
              description: "We encourage moving beyond surface-level analysis to profound understanding"
            },
            {
              icon: "💭", 
              title: "Mindful Reflection",
              description: "Creating space for intentional pause and conscious awareness"
            },
            {
              icon: "🌱",
              title: "Continuous Growth", 
              description: "Believing in the lifelong expansion of perspective and understanding"
            }
          ].map((value, index) => (
            <motion.div
              key={index}
              className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl shadow-md border border-[#996568]/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1, duration: 0.6 }}
              whileHover={{ 
                y: -3,
                boxShadow: "0 10px 25px -5px rgba(153, 101, 104, 0.15)"
              }}
            >
              <motion.div 
                className="text-3xl mb-3"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                {value.icon}
              </motion.div>
              <h3 className="text-lg font-semibold text-[#5a3e36] mb-2">{value.title}</h3>
              <p className="text-sm text-[#5a3e36]/80">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Quote section */}
        <motion.div
          className="bg-[#996568]/10 border border-[#996568]/30 rounded-3xl shadow-lg p-8 mb-10 inline-block max-w-3xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          whileHover={{ scale: 1.02 }}
        >
          <p className="text-lg md:text-xl italic text-[#5a3e36] mb-4">
            &quot;Silent spaces are not empty—they are where clarity and innovation quietly grow.&quot;
          </p>
          <p className="text-[#5a3e36]/70 text-sm">- The Spaces for Thought Team</p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          <motion.a
            href="/blog"
            className="inline-block bg-gradient-to-r from-[#996568] to-[#b87a7d] text-white font-semibold px-8 py-3 rounded-full shadow-lg"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 20px -5px rgba(153, 101, 104, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            Explore Our Blog
          </motion.a>
        </motion.div>
      </motion.div>
    </div>
  );
}