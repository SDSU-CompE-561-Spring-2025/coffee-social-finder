import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import  "@/app/globals.css"
import Navbar from "@/components/Navbar";
import Link from "next/link"
import Image from 'next/image';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Caffeine Compass",
  description: "Coffee Catchphrase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html lang="en">
          <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
            
            {/* Header */}
            <Navbar />
    
            {/* Main Content */}
            <main className="flex-grow bg-[#d8cba7]">{children}</main>
    
            {/* Footer */}
            <footer className = "bg-[#5a5f44] p-4 w-full">
              <div className = "flex justify-between items-center">
    
                <div>
                  <Link href="/about" className="text-black hover:text-gray-700">About</Link>
                </div>
                
                <div>
                  <p className="text-black">Copyright 2025</p>
                </div>
    
              </div>
            </footer>
    
          </body>
        </html>
      )
}
