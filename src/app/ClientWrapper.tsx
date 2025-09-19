"use client";
import { ReactNode, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AIChatbot from "./components/AIChatbot";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ClientWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  const isAdminRoute = pathname.startsWith("/admin");

  // Hydration-safe: only render client stuff after mount
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <>{children}</>; // server render fallback

  return (
    <>
      {!isAdminRoute && <Navbar />}
      {children}
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <AIChatbot />}
      {!isAdminRoute && <ToastContainer position="top-right" autoClose={3000} theme="light" />}
    </>
  );
}
