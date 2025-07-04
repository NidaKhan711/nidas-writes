"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import hero from "../assets/Images/hero.png";

export default function Hero() {
    return (
        <div
            className="relative min-h-screen flex items-center justify-center"
            style={{
                backgroundImage: "url('/images/hero.png')", // Replace with your image path
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "fixed"
            }}
        >
            {/* Overlay for better text readability */}
            <div className="absolute">
                <Image src={hero} alt="image" className="max-w-full h-auto block" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-2xl text-center px-4 z-10 relative"
            >
                <motion.h1
                    className="text-4xl md:text-5xl font-bold text-black mb-6 leading-snug drop-shadow-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700 }}
                >
                    Welcome to my digital diary<span className="text-black"> —</span>
                </motion.h1>

                <motion.div
                    className="space-y-1 mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                >
                    <p className="text-xl text-black drop-shadow-md">
                        Where thoughts find silence,
                    </p>
                    <p className="text-xl text-black drop-shadow-md">
                        and silence gives them meaning.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                >
                    <Link
                        href="/diary"
                        className="inline-block bg-[#ffd49e] text-[#996568] font-medium px-8 py-3 rounded-xl text-lg shadow-md hover:shadow-lg hover:bg-[#996568] hover:text-white transition-all duration-200 border-2 border-transparent hover:border-[#ffd49e]"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                        Start Reading
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
}