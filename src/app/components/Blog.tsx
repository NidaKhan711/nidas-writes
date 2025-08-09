"use client"
import { motion } from "framer-motion";
import Link from "next/link";
import Book from "../assets/Images/book.jpg"
import Mind from "../assets/Images/Mind.png"
import Image from "next/image";
import Laptop from "../assets/Images/laptop.jpg"

const Blog = () => {
    return (
        <div className="min-h-screen p-15 z-60 bg-[#0C0C0C] ">
            {/* Categories Header */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, margin: "-100px" }}
                className="mb-10 bg-[#0C0C0C]"
            >
                <h1 className="text-3xl font-extrabold mb-4 text-[#C49E5C] flex justify-center items-center">
                    Explore Our Categories
                </h1>
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="flex flex-wrap gap-3 mt-9 justify-center"
                >
                    <motion.span 
                        whileHover={{ scale: 1.05 }}
                        className="bg-[#4C5F2A] px-5 py-2 rounded-full text-sm font-semibold text-[#EFEFEF] border border-[#5a6f33] hover:bg-[#5a6f33] transition duration-300 cursor-pointer"
                    >
                        #Tech
                    </motion.span>
                    <motion.span 
                        whileHover={{ scale: 1.05 }}
                        className="bg-[#8C1C13] px-5 py-2 rounded-full text-sm font-semibold text-[#EFEFEF] border border-[#a02217] hover:bg-[#a02217] transition duration-300 cursor-pointer"
                    >
                        #Self-growth
                    </motion.span>
                    <motion.span 
                        whileHover={{ scale: 1.05 }}
                        className="bg-[#4C5F2A] px-5 py-2 rounded-full text-sm font-semibold text-[#EFEFEF] border border-[#5a6f33] hover:bg-[#5a6f33] transition duration-300 cursor-pointer"
                    >
                        #Philosophy
                    </motion.span>
                    <motion.span 
                        whileHover={{ scale: 1.05 }}
                        className="bg-[#8C1C13] px-5 py-2 rounded-full text-sm font-semibold text-[#EFEFEF] border border-[#a02217] hover:bg-[#a02217] transition duration-300 cursor-pointer"
                    >
                        #Creativity
                    </motion.span>
                </motion.div>
            </motion.div>

            {/* Blog Posts Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Blog Post 1 */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="rounded-xl hover:shadow-xl transition-shadow duration-300 group bg-[#1A1A1A]"
                >
                    <motion.div 
                        whileHover={{ scale: 1.03 }}
                        className="h-52 rounded-lg relative flex items-center justify-center overflow-hidden bg-gray-800"
                    >
                        <Image
                            src={Laptop}
                            alt="laptop"
                            className="rounded-lg w-full h-full object-cover"
                            width={300}
                            height={100}
                        />
                    </motion.div>
                    <div className="p-6">
                        <motion.h2 
                            whileHover={{ color: "#D9B56E" }}
                            className="text-xl font-bold mb-3 text-[#C49E5C] transition-colors duration-300"
                        >
                            Exploring the Dynamic World of Web Development
                        </motion.h2>
                        <motion.p 
                            whileInView={{ opacity: 1 }}
                            initial={{ opacity: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="text-[#EFEFEF] text-sm mb-5 leading-relaxed opacity-80"
                        >
                            Join me on a journey through the ever-evolving landscape of web
                            development, from front-end frameworks to back-end architectures...
                        </motion.p>
                        <div className="flex justify-between items-center text-[#EFEFEF] text-xs opacity-70">
                            <motion.span
                                whileInView={{ opacity: 1 }}
                                initial={{ opacity: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                viewport={{ once: true }}
                            >
                                April 20, 2024
                            </motion.span>
                            <Link href="/blog/web-development" passHref>
                                <motion.a
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    whileInView={{ opacity: 1 }}
                                    initial={{ opacity: 0 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                    viewport={{ once: true }}
                                    className="text-[#4C5F2A] hover:text-[#5a6f33] font-semibold flex items-center"
                                >
                                    Read More
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 ml-1"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </motion.a>
                            </Link>
                        </div>
                    </div>
                </motion.div>

                {/* Blog Post 2 */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="rounded-xl hover:shadow-xl transition-shadow duration-300 group bg-[#1A1A1A]"
                >
                    <motion.div 
                        whileHover={{ scale: 1.03 }}
                        className="h-52 rounded-lg relative flex items-center justify-center overflow-hidden bg-gray-800"
                    >
                        <Image
                            src={Mind}
                            alt="mind"
                            className="rounded-lg w-full h-full object-cover"
                            width={300}
                            height={100}
                        />
                    </motion.div>
                    <div className="p-6">
                        <motion.h2 
                            whileHover={{ color: "#D9B56E" }}
                            className="text-xl font-bold mb-3 text-[#C49E5C] transition-colors duration-300"
                        >
                            The Art of Mindful Productivity: Finding Your Flow
                        </motion.h2>
                        <motion.p 
                            whileInView={{ opacity: 1 }}
                            initial={{ opacity: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="text-[#EFEFEF] text-sm mb-5 leading-relaxed opacity-80"
                        >
                            Discover powerful strategies for enhancing productivity while
                            maintaining a deep sense of balance and mindfulness in your daily life...
                        </motion.p>
                        <div className="flex justify-between items-center text-[#EFEFEF] text-xs opacity-70">
                            <motion.span
                                whileInView={{ opacity: 1 }}
                                initial={{ opacity: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                viewport={{ once: true }}
                            >
                                April 20, 2024
                            </motion.span>
                            <Link href="/blog/web-development" passHref>
                                <motion.a
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    whileInView={{ opacity: 1 }}
                                    initial={{ opacity: 0 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                    viewport={{ once: true }}
                                    className="text-[#8C1C13] hover:text-[#a02217] font-semibold flex items-center"
                                >
                                    Read More
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 ml-1"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </motion.a>
                            </Link>
                        </div>
                    </div>
                </motion.div>

                {/* Blog Post 3 */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="rounded-xl hover:shadow-xl transition-shadow duration-300 group bg-[#1A1A1A]"
                >
                    <motion.div 
                        whileHover={{ scale: 1.03 }}
                        className="h-52 rounded-lg relative flex items-center justify-center overflow-hidden bg-gray-800"
                    >
                        <Image
                            src={Book}
                            alt="Book"
                            className="rounded-lg w-full h-full object-cover"
                            width={300}
                            height={100}
                        />
                    </motion.div>
                    <div className="p-6">
                        <motion.h2 
                            whileHover={{ color: "#D9B56E" }}
                            className="text-xl font-bold mb-3 text-[#C49E5C] transition-colors duration-300"
                        >
                            Reflections on Existential Philosophy: Deeper Meanings
                        </motion.h2>
                        <motion.p 
                            whileInView={{ opacity: 1 }}
                            initial={{ opacity: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="text-[#EFEFEF] text-sm mb-5 leading-relaxed opacity-80"
                        >
                            Delve into the depths of existential philosophy, confronting the
                            fundamental questions of existence, freedom, and responsibility...
                        </motion.p>
                        <div className="flex justify-between items-center text-[#EFEFEF] text-xs opacity-70">
                            <motion.span
                                whileInView={{ opacity: 1 }}
                                initial={{ opacity: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                viewport={{ once: true }}
                            >
                                April 20, 2024
                            </motion.span>
                            <Link href="/blog/web-development" passHref>
                                <motion.a
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    whileInView={{ opacity: 1 }}
                                    initial={{ opacity: 0 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                    viewport={{ once: true }}
                                    className="text-[#4C5F2A] hover:text-[#5a6f33] font-semibold flex items-center"
                                >
                                    Read More
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 ml-1"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </motion.a>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Blog;