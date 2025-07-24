"use client"
import { motion } from "framer-motion";
import Link from "next/link";
import Book from "../assets/Images/book.jpg"
import Mind from "../assets/Images/Mind.png"
import Image from "next/image";
import Laptop from "../assets/Images/laptop.jpg"

const Blog = () => {
    return (
        <div className="min-h-screen p-15 z-60 bg-[#fffcf1] " id="blog">
            {/* Categories Header */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, margin: "-100px" }}
                className="mb-10 bg-[#fffcf1]"
            >
                <h1 className="text-3xl font-extrabold mb-4 text-[#341601] flex justify-center items-center">
                    Explore Our Categories
                </h1>
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="flex flex-wrap gap-3 mt-9"
                >
                    <motion.span 
                        whileHover={{ scale: 1.05 }}
                        className="bg-[#FCECD8] px-5 py-2 rounded-full text-sm font-semibold text-[#341601] border border-[#ffd8bc] hover:bg-[#F2E0C4] transition duration-300 cursor-pointer"
                    >
                        #Tech
                    </motion.span>
                    <motion.span 
                        whileHover={{ scale: 1.05 }}
                        className="bg-[#FCECD8] px-5 py-2 rounded-full text-sm font-semibold text-[#341601] border border-[#ffd8bc] hover:bg-[#F2E0C4] transition duration-300 cursor-pointer"
                    >
                        #Self-growth
                    </motion.span>
                    <motion.span 
                        whileHover={{ scale: 1.05 }}
                        className="bg-[#FCECD8] px-5 py-2 rounded-full text-sm font-semibold text-[#341601] border border-[#ffd8bc] hover:bg-[#F2E0C4] transition duration-300 cursor-pointer"
                    >
                        #Philosophy
                    </motion.span>
                    <motion.span 
                        whileHover={{ scale: 1.05 }}
                        className="bg-[#FCECD8] px-5 py-2 rounded-full text-sm font-semibold text-[#341601] border border-[#ffd8bc] hover:bg-[#F2E0C4] transition duration-300 cursor-pointer"
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
                    className="rounded-xl hover:shadow-xl transition-shadow duration-300 group"
                >
                    <motion.div 
                        whileHover={{ scale: 1.03 }}
                        className="h-52 rounded-lg relative flex items-center justify-center overflow-hidden bg-gray-100"
                    >
                        <Image
                            src={Laptop}
                            alt="laptop"
                            className="rounded-lg w-full h-full"
                            width={300}
                            height={100}
                        />
                    </motion.div>
                    <div className="p-6">
                        <motion.h2 
                            whileHover={{ color: "#5C2B0A" }}
                            className="text-xl font-bold mb-3 text-[#341601] transition-colors duration-300"
                        >
                            Exploring the Dynamic World of Web Development
                        </motion.h2>
                        <motion.p 
                            whileInView={{ opacity: 1 }}
                            initial={{ opacity: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="text-[#341601] text-sm mb-5 leading-relaxed opacity-80"
                        >
                            Join me on a journey through the ever-evolving landscape of web
                            development, from front-end frameworks to back-end architectures...
                        </motion.p>
                        <div className="flex justify-between items-center text-[#341601] text-xs opacity-70">
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
                                    className="text-[#341601] hover:text-[#5C2B0A] font-semibold flex items-center"
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
                    className="rounded-xl hover:shadow-xl transition-shadow duration-300 group"
                >
                    <motion.div 
                        whileHover={{ scale: 1.03 }}
                        className="h-52 rounded-lg relative flex items-center justify-center overflow-hidden bg-gray-100"
                    >
                        <Image
                            src={Mind}
                            alt="mind"
                            className="rounded-lg w-full h-full"
                            width={300}
                            height={100}
                        />
                    </motion.div>
                    <div className="p-6">
                        <motion.h2 
                            whileHover={{ color: "#5C2B0A" }}
                            className="text-xl font-bold mb-3 text-[#341601] transition-colors duration-300"
                        >
                            The Art of Mindful Productivity: Finding Your Flow
                        </motion.h2>
                        <motion.p 
                            whileInView={{ opacity: 1 }}
                            initial={{ opacity: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="text-[#341601] text-sm mb-5 leading-relaxed opacity-80"
                        >
                            Discover powerful strategies for enhancing productivity while
                            maintaining a deep sense of balance and mindfulness in your daily life...
                        </motion.p>
                        <div className="flex justify-between items-center text-[#341601] text-xs opacity-70">
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
                                    className="text-[#341601] hover:text-[#5C2B0A] font-semibold flex items-center"
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
                    className="rounded-xl hover:shadow-xl transition-shadow duration-300 group"
                >
                    <motion.div 
                        whileHover={{ scale: 1.03 }}
                        className="h-52 rounded-lg relative flex items-center justify-center overflow-hidden bg-gray-100"
                    >
                        <Image
                            src={Book}
                            alt="Book"
                            className="rounded-lg w-full h-full"
                            width={300}
                            height={100}
                        />
                    </motion.div>
                    <div className="p-6">
                        <motion.h2 
                            whileHover={{ color: "#5C2B0A" }}
                            className="text-xl font-bold mb-3 text-[#341601] transition-colors duration-300"
                        >
                            Reflections on Existential Philosophy: Deeper Meanings
                        </motion.h2>
                        <motion.p 
                            whileInView={{ opacity: 1 }}
                            initial={{ opacity: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="text-[#341601] text-sm mb-5 leading-relaxed opacity-80"
                        >
                            Delve into the depths of existential philosophy, confronting the
                            fundamental questions of existence, freedom, and responsibility...
                        </motion.p>
                        <div className="flex justify-between items-center text-[#341601] text-xs opacity-70">
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
                                    className="text-[#341601] hover:text-[#5C2B0A] font-semibold flex items-center"
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