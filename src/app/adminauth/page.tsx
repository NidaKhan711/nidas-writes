"use client";

import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        "/api/adminauth/login",
        { email, password },
        { withCredentials: true }
      );

      if (res.status === 200) {
        setMessage("✅ Login successful!");
        setTimeout(() => {
          router.push("/admin"); // redirect to dashboard
        }, 1000);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ message: string }>;
        if (axiosError.response?.data?.message) {
          setMessage("❌ " + axiosError.response.data.message);
        } else {
          setMessage("⚠️ Something went wrong, try again!");
        }
      } else {
        setMessage("⚠️ An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: '#fffcf1' }}>
      <form
        onSubmit={handleLogin}
        className="shadow-xl rounded-lg p-8 w-full max-w-md"
        style={{ 
          backgroundColor: '#fffcf1', 
          border: '1px solid #d3c6b6',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
        }}
      >
        <h1 className="text-3xl font-serif font-bold text-center mb-8" style={{ color: '#5a3e36' }}>
          Admin Login
        </h1>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium" style={{ color: '#5a3e36' }}>
            Email
          </label>
          <input
            type="email"
            placeholder="Enter admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border-b-2 focus:outline-none"
            style={{ 
              borderColor: '#b87a7d', 
              color: '#5a3e36', 
              backgroundColor: 'transparent',
              fontFamily: 'serif'
            }}
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium" style={{ color: '#5a3e36' }}>
            Password
          </label>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border-b-2 focus:outline-none"
            style={{ 
              borderColor: '#b87a7d', 
              color: '#5a3e36', 
              backgroundColor: 'transparent',
              fontFamily: 'serif'
            }}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full px-8 py-4 rounded-md font-bold transition-all duration-300 disabled:opacity-50 cursor-pointer"
          style={{
            color: '#fffcf1',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            background: 'linear-gradient(to right, #996568, #b87a7d)'
          }}
          onMouseOver={e => e.currentTarget.style.boxShadow = '0 6px 8px rgba(0, 0, 0, 0.15)'}
          onMouseOut={e => e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Message */}
        {message && (
          <p
            className={`text-center text-sm mt-4 font-medium ${
              message.includes("✅") ? "text-green-600" : "text-red-500"
            }`}
            style={{ fontFamily: 'serif' }}
          >
            {message}
          </p>
        )}

        <p className="text-center text-sm mt-6" style={{ color: '#996568', fontFamily: 'serif' }}>
          Only authorized admins can login
        </p>
      </form>
    </div>
  );
}