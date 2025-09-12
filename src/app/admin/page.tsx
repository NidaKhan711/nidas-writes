"use client";
import React, { useEffect } from "react";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const router = useRouter();

  useEffect(() => {
    const token = getCookie("adminToken"); // ✅ client-side cookies read
    if (!token) {
      router.push("/adminauth"); // redirect to login if no token
    }
  }, [router]);

  return (
    <main className="flex-1 p-8" style={{ backgroundColor: "#fffcf1" }}>
      <div
        className="shadow rounded-lg p-8"
        style={{
          backgroundColor: "#fffcf1",
          border: "1px solid #ddd7c7",
        }}
      >
        <h2 className="text-3xl font-bold mb-4" style={{ color: "#5a3e36" }}>
          Welcome, Admin 👋
        </h2>
        <p className="text-lg" style={{ color: "#5a3e36" }}>
          Select an option from the sidebar to manage your content.
        </p>
      </div>
    </main>
  );
};

export default DashboardPage;
