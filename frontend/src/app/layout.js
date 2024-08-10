// src/app/layout.js
"use client";

import "./globals.css";

import { SessionProvider } from "next-auth/react";
import Navbar from "./components/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Navbar/>
          <main>{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
