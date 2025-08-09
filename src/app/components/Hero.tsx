"use client";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0c0c0c31] pt-24">
      {/* Content */}
      <div className="max-w-2xl text-center px-4 z-10 relative">
        <h1 className="text-4xl md:text-5xl font-bold text-[#C49E5C] mb-6 leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
          Welcome to my digital diary<span className="text-[#8C1C13]"> —</span>
        </h1>

        <div className="space-y-4 mb-8">
          <p className="text-2xl text-[#EFEFEF] opacity-90 italic">
            Where thoughts blossom like flowers,
          </p>
          <p className="text-2xl text-[#EFEFEF] opacity-90 italic">
            and silence helps them bloom.
          </p>
        </div>

        <div>
          <Link
            href="/diary"
            className="relative inline-block group bg-gradient-to-br from-[#4C5F2A] to-[#3a4a21] text-[#EFEFEF] font-medium px-8 py-3 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-[#5a6f33] hover:border-[#C49E5C] hover:translate-y-[-2px]"
            style={{ fontFamily: "'Inter', sans-serif" }}
            aria-label="Start reading the diary"
          >
            <span className="relative z-10 flex items-center justify-center">
              Start Reading
            </span>
            <span className="absolute inset-0 bg-[#C49E5C] opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-lg group-hover:blur-[1px]"></span>
          </Link>
        </div>
      </div>
    </div>
  );
}