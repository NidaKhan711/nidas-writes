"use client";

import { ReactNode, useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
      // Close sidebar when switching from mobile to desktop
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  const handleLogout = async () => {
    await axios.post("/api/adminauth/Logout");
    router.push("/adminauth");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Close sidebar when clicking on overlay or navigating
  const closeSidebar = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="flex min-h-screen font-sans" style={{ backgroundColor: '#fffcf1' }}>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 p-3 rounded-lg shadow-md transition-transform duration-200 hover:scale-105"
        style={{ backgroundColor: '#5a3e36', color: '#fffcf1' }}
        aria-label="Toggle menu"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {sidebarOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed md:relative w-64 flex flex-col p-6 z-40 transition-transform duration-300 ease-in-out ${sidebarOpen || !isMobile ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
        style={{ backgroundColor: '#5a3e36', color: '#fffcf1', minHeight: '100vh' }}
      >
        <h2 className="text-3xl font-bold mb-8 mt-8 md:mt-0">Admin Panel</h2>
        <nav className="flex flex-col gap-3">
          <Link
            href="/admin"
            className="flex items-center gap-3 py-3 px-4 rounded-lg transition-colors duration-200 hover:bg-white hover:text-[#5a3e36] hover:bg-opacity-80 font-medium"
            onClick={closeSidebar}
          >
            <span className="text-xl">🏠</span> Dashboard
          </Link>
          <Link
            href="/admin/addblog"
            className="flex items-center gap-3 py-3 px-4 rounded-lg transition-colors duration-200 hover:bg-white hover:text-[#5a3e36] hover:bg-opacity-80 font-medium"
            onClick={closeSidebar}
          >
            <span className="text-xl">📝</span> Add Blog
          </Link>
          <Link
            href="/admin/bloglist"
            className="flex items-center gap-3 py-3 px-4 rounded-lg transition-colors duration-200 hover:bg-white hover:text-[#5a3e36] hover:bg-opacity-80 font-medium"
            onClick={closeSidebar}
          >
            <span className="text-xl">📑</span> Blog List
          </Link>
          <Link
            href="/admin/subscribtions"
            className="flex items-center gap-3 py-3 px-4 rounded-lg transition-colors duration-200 hover:bg-white hover:text-[#5a3e36] hover:bg-opacity-80 font-medium"
            onClick={closeSidebar}
          >
            <span className="text-xl">📬</span> Subscriptions
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full md:ml-0 min-h-screen">
        <header className="h-16 shadow-md flex items-center justify-between px-4 md:px-8" style={{ backgroundColor: '#fffcf1' }}>
          <h1 className="text-2xl font-semibold" style={{ color: '#5a3e36' }}>Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-6 py-2 cursor-pointer rounded-lg font-semibold shadow-md transition-all duration-300 hover:bg-[#996568] hover:shadow-lg"
            style={{
              color: '#fffcf1',
              background: '#b87a7d',
            }}
          >
            Logout
          </button>
        </header>

        <main className="flex-1 p-6 md:p-10 overflow-auto" style={{ color: '#5a3e36', minHeight: 'calc(100vh - 4rem)' }}>
          {children}
        </main>
      </div>
    </div>
  );
}