'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { notifyAuthChange } from '@/components/Navbar'

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    try {
      // MOCK MODE: Enable this when backend is not available
      const useMockMode = true; // Set to false when backend is working
      
      if (useMockMode) {
        // Simulate a brief delay like a real API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Get registered users from localStorage (if any)
        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        
        // Find if user exists with matching email and password
        const user = registeredUsers.find((u: any) => 
          u.email === form.email && u.password === form.password
        );
        
        if (!user) {
          throw new Error('Invalid email or password');
        }
        
        // Mock success - store logged in state
        localStorage.setItem('currentUser', JSON.stringify(user));
        console.log('Login successful (MOCK MODE):', user);
        
        // Notify auth state change
        notifyAuthChange();
        
        // Redirect to homepage after successful login
        router.push('/');
      } else {
        // Real backend API call - uncomment this when backend is working
        const response = await fetch('http://localhost:8000/auth/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            username: form.email,
            password: form.password,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || 'Failed to login');
        }

        // Handle successful login
        const data = await response.json();
        localStorage.setItem('token', data.access_token);
        console.log('Login successful:', data);
        
        // Notify auth state change
        notifyAuthChange();
        
        // Redirect to homepage after successful login
        router.push('/');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f8f5f0] relative">
      {/* Custom header to replace the navbar */}
      <div className="absolute top-0 left-0 right-0 bg-[#5D6748] p-4 z-10 flex justify-center items-center">
        <Link href="/" className="flex items-center justify-center">
          <Image 
            src="/assets/coffeecompass.svg" 
            alt="Caffeine Compass" 
            width={100} 
            height={100} 
            className="mr-3" 
            priority
          />
          <span className="text-white font-bold text-2xl md:text-3xl">Caffeine Compass</span>
        </Link>
      </div>

      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-15 z-0" 
        style={{ 
          backgroundImage: "url('/assets/shop1.svg')",
          filter: "blur(5px)"
        }}
      ></div>

      {/* Main content with increased top padding to accommodate header */}
      <div className="container mx-auto px-4 py-32 md:py-40 flex flex-col md:flex-row items-center justify-center relative z-1">
        {/* Login form with increased size */}
        <div className="bg-[#7d5831] rounded-lg shadow-2xl p-8 w-full max-w-md mx-4 mb-10 md:mb-0 md:mr-12">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Welcome Back
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                id="email"
                type="email"
                name="email"
                placeholder=" "
                value={form.email}
                onChange={handleChange}
                required
                className="w-full p-4 pt-6 pb-2 bg-white rounded-md border-2 border-amber-200 focus:border-amber-400 focus:outline-none text-lg text-black"
              />
              <label 
                htmlFor="email" 
                className={`absolute left-3 top-2 transition-all duration-200 pointer-events-none text-sm ${form.email ? 'text-amber-700 font-medium' : 'text-gray-500'}`}
              >
                Email
              </label>
            </div>

            <div className="relative">
              <input
                id="password"
                type="password"
                name="password"
                placeholder=" "
                value={form.password}
                onChange={handleChange}
                required
                className="w-full p-4 pt-6 pb-2 bg-white rounded-md border-2 border-amber-200 focus:border-amber-400 focus:outline-none text-lg text-black"
              />
              <label 
                htmlFor="password" 
                className={`absolute left-3 top-2 transition-all duration-200 pointer-events-none text-sm ${form.password ? 'text-amber-700 font-medium' : 'text-gray-500'}`}
              >
                Password
              </label>
            </div>

            <button 
              type="submit" 
              className="w-full bg-amber-600 hover:bg-amber-700 text-white py-4 rounded-md font-bold text-lg transition-colors duration-200 shadow-md"
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Log in to Account'}
            </button>
            
            {error && (
              <div className="bg-red-50 text-red-700 p-4 rounded-md border border-red-300 text-center">
                {error}
              </div>
            )}

            <div className="text-center text-white">
              <p className="text-lg mt-6">
                Don't have an account? 
                <Link href="/signup" className="ml-2 font-semibold text-amber-300 hover:text-amber-200 transition-colors duration-200">
                  Sign Up Here
                </Link>
              </p>
            </div>
          </form>
        </div>
        
        {/* Logo and description section */}
        <div className="text-center md:text-left md:max-w-md">
          <div className="mb-6 flex flex-col items-center md:items-start">
            <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">Find Your Perfect Cup</h1>
            <p className="text-lg text-amber-800">
              Discover the best coffee shops around you, read reviews, and share your experiences with fellow coffee enthusiasts.
            </p>
          </div>
          
          <div className="flex items-center justify-center md:justify-start space-x-4 mt-8">
            <div className="bg-white p-3 rounded-full shadow-md">
              <svg className="w-8 h-8 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <div className="bg-white p-3 rounded-full shadow-md">
              <svg className="w-8 h-8 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
              </svg>
            </div>
            <div className="bg-white p-3 rounded-full shadow-md">
              <svg className="w-8 h-8 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}