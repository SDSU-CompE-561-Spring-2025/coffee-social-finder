import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

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
  description: "Find your perfect coffee spot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="bg-amber-800 text-white p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">Caffeine Compass</Link>
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <Link href="/" className="hover:text-amber-200 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/restaurants" className="hover:text-amber-200 transition-colors">
                    Restaurants
                  </Link>
                </li>
                <li>
                  <Link href="/tags" className="hover:text-amber-200 transition-colors">
                    Tags
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        <main className="container mx-auto p-4">
          {children}
        </main>
        <footer className="bg-amber-800 text-white p-4 mt-8">
          <div className="container mx-auto text-center">
            <p>© {new Date().getFullYear()} Caffeine Compass. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
