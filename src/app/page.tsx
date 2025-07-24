import Blog from "./components/Blog";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Learning from "./components/Learning";
import Navbar from "./components/Navbar";
import PhiloSection from "./components/PhiloSection";
import Subscribe from "./components/Subscribe";   
export default function Home() {
  return (
      <>
      <Navbar/>
      <Hero/>
      <Blog/>
      <PhiloSection/>
      <Learning/>
      <Subscribe/>
      <Footer/>
      </>
  );
}
