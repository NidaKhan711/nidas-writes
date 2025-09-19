import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import ClientWrapper from "./ClientWrapper";

export const metadata: Metadata = {
  title: "Mindora – Lifestyle & Thoughts Blog",
  description:
    "Mindora is a modern space for lifestyle reflections, thoughtful writings, and insights that inspire clarity and balance in everyday life.",
  keywords: [
    "Mindora",
    "lifestyle blog",
    "thoughts and reflections",
    "personal growth",
    "mindful living",
    "self discovery",
    "clarity and balance",
  ],
  authors: [{ name: "Nida" }],
  creator: "Mindora",
  publisher: "Mindora",
  openGraph: {
    title: "Mindora – A Space for Lifestyle & Thoughts",
    description:
      "A modern corner for lifestyle reflections, mindful living, and clarity through words.",
    url: "https://yourdomain.com",
    siteName: "Mindora",
    images: [
      {
        url: "https://yourdomain.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mindora – Lifestyle & Thoughts Blog",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mindora – Lifestyle & Thoughts Blog",
    description: "Reflections on lifestyle, balance, and clarity. A blog for thoughtful minds.",
    images: ["https://yourdomain.com/twitter-image.jpg"],
    creator: "@yourhandle",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  category: "Lifestyle",
  generator: "Next.js",
  applicationName: "Mindora",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Fonts preload */}
        <link
          rel="preload"
          href="/fonts/libre-baskerville-italic.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/geist-mono.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      
      </head>
      <body className="antialiased">
        {/* Everything client-side */}
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
