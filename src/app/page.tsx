"use client";
import Blog from "./components/Blog";
import Hero from "./components/Hero";
import Learning from "./components/Learning";
import PhiloSection from "./components/PhiloSection";
import Subscribe from "./components/Subscribe";   
export default function Home() {
  return (
      <>
      <Hero/>
      <Blog/>
      <PhiloSection/>
      <Learning/>
      <Subscribe/>
      </>
  );
}
