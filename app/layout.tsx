import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/app/providers";
import React from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Watt-A-Frame",
  description: "Recharge your M3ter with USDC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={{
          background: `linear-gradient(100deg, #1a1025 0%, #2d1b3a 100%)`,
        }}
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
