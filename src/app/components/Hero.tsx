"use client";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef } from "react";

interface FlowerPosition {
  id: number;
  x: string;
  y: string;
  size: string;
  rotate: number;
  delay: number;
  offsetX: number;
  offsetY: number;
}

export default function Hero() {
  // Floral elements positions with TypeScript interface
  const flowers: FlowerPosition[] = [
    { id: 1, x: '10%', y: '20%', size: 'w-16 h-16', rotate: 15, delay: 0.1, offsetX: -20, offsetY: -30 },
    { id: 2, x: '85%', y: '30%', size: 'w-24 h-24', rotate: -10, delay: 0.3, offsetX: 30, offsetY: 20 },
    { id: 3, x: '25%', y: '70%', size: 'w-20 h-20', rotate: 25, delay: 0.5, offsetX: -40, offsetY: 10 },
    { id: 4, x: '75%', y: '80%', size: 'w-12 h-12', rotate: -15, delay: 0.7, offsetX: 20, offsetY: -20 },
  ];

  // Animation values with proper types
  const mouseX = useMotionValue<number>(0);
  const mouseY = useMotionValue<number>(0);
  const scrollY = useMotionValue<number>(0);
  const backgroundScale = useTransform<number, number>(scrollY, [0, 500], [1, 1.05]);

  // Transform mouseX and mouseY for parallax effect
  const parallaxX = useTransform(mouseX, [0, window.innerWidth], [-50, 50]); // Adjust range for stronger/weaker effect
  const parallaxY = useTransform(mouseY, [0, window.innerHeight], [-50, 50]); // Adjust range for stronger/weaker effect

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleScroll = () => {
      scrollY.set(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [mouseX, mouseY, scrollY]);

  // Define the new color palette for floating flowers
  const floatingFlowerColors = ["#610C9F", "#940B92", "#DA0C81", "#E95793"];

  return (
    <div className="relative min-h-screen flex items-center justify-center z-10 bg-[rgba(255,232,188,0.68)] pt-24 overflow-hidden">
      {/* Floral background elements */}
      <motion.div
        className="absolute inset-0 overflow-hidden z-0"
        style={{ scale: backgroundScale }}
      >
        {/* Subtle floral texture */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/soft-floral.png')]"></div>

        {/* Animated flowers with type safety */}
        {flowers.map((flower: FlowerPosition) => (
          <motion.div
            key={flower.id}
            className={`absolute ${flower.size} z-0`}
            style={{
              left: flower.x,
              top: flower.y,
              rotate: flower.rotate,
              // Apply parallax effect with unique offsets
              x: useTransform(parallaxX, (val) => val + flower.offsetX),
              y: useTransform(parallaxY, (val) => val + flower.offsetY),
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.3, scale: 1 }}
            transition={{
              delay: flower.delay,
              duration: 1.5,
              type: "spring",
              damping: 3,
            }}
            whileHover={{ opacity: 0.5, scale: 1.1 }}
          >
          </motion.div>
        ))}
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl text-center px-4 z-10 relative"
      >
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-[#5a3e36] mb-6 leading-snug"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Welcome to my digital diary<span className="text-[#996568]"> —</span>
        </motion.h1>

        <motion.div
          className="space-y-4 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <motion.p
            className="text-2xl text-[#5a3e36] italic"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Where thoughts blossom like flowers,
          </motion.p>
          <motion.p
            className="text-2xl text-[#5a3e36] italic"
            whileHover={{ x: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            and silence helps them bloom.
          </motion.p>
        </motion.div>

        <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.8, duration: 0.5 }}
>
  <Link
    href="/diary"
    className="relative inline-block group bg-gradient-to-br from-[#ffd49e] to-[#f8b878] text-[#5a3e36] font-medium px-8 py-3 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-[#e8c9a7] hover:border-[#683b3b] hover:translate-y-[-2px]"
    style={{ fontFamily: "'Inter', sans-serif" }}
  >
    <span className="relative z-10 flex items-center justify-center">
      Start Reading
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

      {/* Floating petals animation, now small flowers with specified colors */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i: number) => ( // Increased number of floating elements for a richer look
          <motion.div
            key={i}
            className="absolute" // Removed text-color class as color is now passed to SVG
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${15 + Math.random() * 20}px`, // Adjust size range for small flowers
              height: `${15 + Math.random() * 20}px`,
            }}
            animate={{
              y: [0, window.innerHeight + 50], // Ensure flowers fall off screen
              x: [0, (Math.random() - 0.5) * 150], // Wider x movement for more scattered effect
              rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)], // Random rotation direction
              opacity: [0, 0.8, 0], // Fade in, stay, then fade out
            }}
            transition={{
              duration: 20 + Math.random() * 15, // Longer duration for slower, more graceful fall
              repeat: Infinity,
              repeatDelay: Math.random() * 5, // Shorter repeat delay for more continuous flow
              ease: "linear",
            }}
          >
            <FloatingSmallFlowerSVG color={floatingFlowerColors[Math.floor(Math.random() * floatingFlowerColors.length)]} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}


// Small Flower Icon with TypeScript props (for the button)
interface FlowerIconProps {
  size?: number;
  color?: string;
}

const FlowerIcon: React.FC<FlowerIconProps> = ({ size = 24, color = "#000" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path
      d="M12 5
          C13.5 5, 14.5 7, 14.5 8.5
          C14.5 10, 16 11, 17.5 11
          C16 11, 14.5 12, 14.5 13.5
          C14.5 15, 13.5 17, 12 17
          C10.5 17, 9.5 15, 9.5 13.5
          C9.5 12, 8 11, 6.5 11
          C8 11, 9.5 10, 9.5 8.5
          C9.5 7, 10.5 5, 12 5 Z"
      fill={color}
    />
    <circle cx="12" cy="12" r="2" fill="#fff" />
  </svg>
);

// NEW: Floating Small Flower SVG Component
interface FloatingSmallFlowerSVGProps {
    color?: string;
}

const FloatingSmallFlowerSVG: React.FC<FloatingSmallFlowerSVGProps> = ({ color = "#722323" }) => (
    <svg viewBox="0 0 24 24" className="w-full h-full">
        <path
            d="M12 2c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zM4 12c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zM20 12c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zM12 20c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zM6 6c-.552 0-1 .448-1 1s.448 1 1 1 1-.448 1-1-.448-1-1-1zM18 6c-.552 0-1 .448-1 1s.448 1 1 1 1-.448 1-1-.448-1-1-1zM6 18c-.552 0-1 .448-1 1s.448 1 1 1 1-.448 1-1-.448-1-1-1zM18 18c-.552 0-1 .448-1 1s.448 1 1 1 1-.448 1-1-.448-1-1-1z"
            fill={color}
        />
        <circle cx="12" cy="12" r="3" fill={color} opacity="0.6" />
    </svg>
);