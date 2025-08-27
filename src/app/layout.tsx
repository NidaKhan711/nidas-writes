import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import ClientWrapper from "./ClientWrapper"; 
 import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: "Nida's Writes",
  description: "A personal diary and writing portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
        <style>
          {`
            @font-face {
              font-family: 'Libre Baskerville';
              font-style: italic;
              font-weight: 400;
              font-display: swap;
              src: url('/fonts/libre-baskerville-italic.woff2') format('woff2');
            }
            @font-face {
              font-family: 'Geist Mono';
              font-style: normal;
              font-weight: 400;
              font-display: swap;
              src: url('/fonts/geist-mono.woff2') format('woff2');
            }
          `}
        </style>
      </head>
      <body className="antialiased">
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"/>
        {/* 👇 ab sab kuch ClientWrapper handle karega */}
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
