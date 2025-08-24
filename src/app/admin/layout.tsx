"use client";

import { ReactNode } from "react";
import Link from "next/link";
 import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"/>
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col p-4 ">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col gap-3">
          <Link href="/admin/addblog" className="hover:text-gray-300">📝 Add Blogs</Link>
          <Link href="/admin/bloglist" className="hover:text-gray-300">👤 Blog List</Link>
          <Link href="/admin/subscribtions" className="hover:text-gray-300">⚙️ Subscribtions</Link>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="h-16 bg-white shadow flex items-center justify-between px-6">
          <h1 className="text-lg font-semibold">Admin Dashboard</h1>
          <button className="bg-red-500 text-white px-3 py-1 rounded">
            Logout
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
      
    </div>
  );
}
