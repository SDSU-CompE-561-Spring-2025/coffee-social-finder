import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Image from "next/image"
import Link from "next/link"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Coffee Explorer",
  description: "Discover and review your favorite coffee shops",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
        
        {/* Header */}
        <header className="bg-[#5a5f44] p-4 w-full">
          <div className="flex justify-between items-center">
            
            <div className="flex items-center">
              <Image src="/logo.svg" alt="Compass Logo" width={60} height={60} className="mr-2" />
            </div>

            <div className="flex items-center space-x-6">
              <nav className="hidden md:flex items-center space-x-6">
                <Link href="/" className="text-black hover:text-gray-700">Home</Link>
                <Link href="/cafes" className="text-black hover:text-gray-700">Cafes</Link>
                <Link href="/bookmarks" className="text-black hover:text-gray-700">Bookmarks</Link>
                <Link href="/account" className="text-black hover:text-gray-700">Account</Link>
              </nav>

              <div className="flex items-center space-x-2">
                <button className="bg-white text-black px-4 py-1 rounded-md">Sign in</button>
                <button className="bg-[#2c2e3a] text-white px-4 py-1 rounded-md">Register</button>
              </div>  
            </div>

          </div>
        </header>

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
