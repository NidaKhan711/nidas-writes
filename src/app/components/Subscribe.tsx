"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSend } from 'react-icons/fi';

const Subscribe = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
    }, 1000);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#fffcf1]">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="max-w-md w-full"
      >
        {!isSubscribed ? (
          <motion.div
            variants={containerVariants}
            className="space-y-8"
          >
            <motion.div
              variants={itemVariants}
              className="space-y-2 text-center"
            >
              <h2 className="text-2xl font-medium text-[#5a3e36]">
                Get updates, knowledge, and inspiration
              </h2>
              <p className="text-[#5a3e36]/90">
                right where you need them.
              </p>
            </motion.div>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <motion.div
                variants={itemVariants}
                className="flex-1"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email"
                  className="w-full px-4 py-3 rounded-lg border border-[#e8c9a7] bg-white/80 
                           text-[#5a3e36] placeholder-[#996568]/60
                           focus:outline-none focus:ring-2 focus:ring-[#996568]/50"
                  required
                />
              </motion.div>

              <motion.button
                variants={itemVariants}
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 bg-[#996568] text-white font-medium rounded-lg
                         flex items-center justify-center gap-2
                         hover:bg-[#b87a7d] transition-colors
                         disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="block w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  <>
                    <span>Subscribe</span>
                    <FiSend className="text-sm" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6"
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-16 h-16 bg-[#996568] rounded-full mx-auto flex items-center justify-center">
                <FiSend className="text-2xl text-white" />
              </div>
            </motion.div>

            <h2 className="text-2xl font-medium text-[#5a3e36]">
              Thank you for subscribing!
            </h2>

            <button
              onClick={() => {
                setIsSubscribed(false);
                setEmail('');
              }}
              className="px-6 py-2 text-[#996568] font-medium rounded-lg border border-[#996568]
                       hover:bg-[#996568]/10 transition-colors"
            >
              Back to form
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Subscribe;