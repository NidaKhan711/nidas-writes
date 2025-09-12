"use client";

import { ReactNode } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  const handleLogout = async () => {
    await axios.post("/api/adminauth/Logout");
    router.push("/adminauth");
  };

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#fffcf1' }}>
      {/* Sidebar */}
      <aside className="w-64 text-white flex flex-col p-6" style={{ backgroundColor: '#5a3e36' }}>
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
        <nav className="flex flex-col gap-4">
          <Link
            href="/admin"
            className="flex items-center gap-3 py-2 px-4 rounded transition-colors duration-200"
            style={{ color: '#fffcf1', backgroundColor: '#5a3e36' }}
            onMouseOver={e => e.currentTarget.style.backgroundColor = 'rgba(255, 252, 241, 0.2)'}
            onMouseOut={e => e.currentTarget.style.backgroundColor = '#5a3e36'}
          >
            🏠 Dashboard
          </Link>
          <Link
            href="/admin/addblog"
            className="flex items-center gap-3 py-2 px-4 rounded transition-colors duration-200"
            style={{ color: '#fffcf1', backgroundColor: '#5a3e36' }}
            onMouseOver={e => e.currentTarget.style.backgroundColor = 'rgba(255, 252, 241, 0.2)'}
            onMouseOut={e => e.currentTarget.style.backgroundColor = '#5a3e36'}
          >
            📝 Add Blog
          </Link>
          <Link
            href="/admin/bloglist"
            className="flex items-center gap-3 py-2 px-4 rounded transition-colors duration-200"
            style={{ color: '#fffcf1', backgroundColor: '#5a3e36' }}
            onMouseOver={e => e.currentTarget.style.backgroundColor = 'rgba(255, 252, 241, 0.2)'}
            onMouseOut={e => e.currentTarget.style.backgroundColor = '#5a3e36'}
          >
            📑 Blog List
          </Link>
          <Link
            href="/admin/subscribtions"
            className="flex items-center gap-3 py-2 px-4 rounded transition-colors duration-200"
            style={{ color: '#fffcf1', backgroundColor: '#5a3e36' }}
            onMouseOver={e => e.currentTarget.style.backgroundColor = 'rgba(255, 252, 241, 0.2)'}
            onMouseOut={e => e.currentTarget.style.backgroundColor = '#5a3e36'}
          >
            📬 Subscriptions
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 shadow flex items-center justify-between px-8" style={{ backgroundColor: '#fffcf1' }}>
          <h1 className="text-xl font-semibold" style={{ color: '#5a3e36' }}>Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded font-medium transition-all duration-300 cursor-pointer"
            style={{
              backgroundColor: '#996568',
              color: '#fffcf1',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              background: 'linear-gradient(to right, #996568, #b87a7d)'
            }}
            onMouseOver={e => e.currentTarget.style.boxShadow = '0 6px 8px rgba(0, 0, 0, 0.15)'}
            onMouseOut={e => e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'}
          >
            Logout
          </button>
        </header>

        <main className="flex-1 p-8" style={{ color: '#5a3e36' }}>
          {children}
        </main>
      </div>
    </div>
  );
}