'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { notifyAuthChange } from '@/components/Navbar'

export default function SignUpPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    try {
      const userData = {
        username: `${form.firstName}${form.lastName}`.replace(/\s/g, ''),
        email: form.email,
        password: form.password,
      }

      const response = await fetch('http://127.0.0.1:8000/auth/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        let errorMsg = 'Failed to create account'
        if (typeof errorData.detail === 'string') {
          errorMsg = errorData.detail
        } else if (typeof errorData.detail === 'object') {
          errorMsg = JSON.stringify(errorData.detail)
        }
        throw new Error(errorMsg)
      }

      setSuccess(true)
      notifyAuthChange()
      setTimeout(() => {
        router.push('/')
      }, 1500)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
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
          backgroundImage: "url('/assets/shop2.svg')",
          filter: "blur(5px)"
        }}
      ></div>

      {/* Main content with increased top padding to accommodate header */}
      <div className="container mx-auto px-4 py-32 md:py-40 flex flex-col md:flex-row items-center justify-center relative z-1">
        {success ? (
          <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-md w-full">
            <div className="text-green-600 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Account Created Successfully!</h2>
            <p className="text-gray-600 mb-6">
              Welcome to Caffeine Compass. You are now signed in and ready to explore coffee shops.
            </p>
            <p className="text-gray-600">Redirecting to homepage...</p>
          </div>
        ) : (
          <>
            {/* Registration form with increased size */}
            <div className="bg-[#7d5831] rounded-lg shadow-2xl p-8 w-full max-w-md mx-4 mb-10 md:mb-0 md:mr-12">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                Create Your Account
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <input
                      id="firstName"
                      name="firstName"
                      placeholder=" "
                      value={form.firstName}
                      onChange={handleChange}
                      required
                      className="w-full p-4 pt-6 pb-2 bg-white rounded-md border-2 border-amber-200 focus:border-amber-400 focus:outline-none text-lg text-black"
                    />
                    <label 
                      htmlFor="firstName" 
                      className={`absolute left-3 top-2 transition-all duration-200 pointer-events-none text-sm ${form.firstName ? 'text-amber-700 font-medium' : 'text-gray-500'}`}
                    >
                      First Name
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      id="lastName"
                      name="lastName"
                      placeholder=" "
                      value={form.lastName}
                      onChange={handleChange}
                      required
                      className="w-full p-4 pt-6 pb-2 bg-white rounded-md border-2 border-amber-200 focus:border-amber-400 focus:outline-none text-lg text-black"
                    />
                    <label 
                      htmlFor="lastName" 
                      className={`absolute left-3 top-2 transition-all duration-200 pointer-events-none text-sm ${form.lastName ? 'text-amber-700 font-medium' : 'text-gray-500'}`}
                    >
                      Last Name
                    </label>
                  </div>
                </div>

                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder=" "
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full p-4 pt-6 pb-2 bg-white rounded-md border-2 border-amber-200 focus:border-amber-400 focus:outline-none text-black"
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
                  {isLoading ? 'Creating Account...' : 'Sign Up'}
                </button>
                
                {error && (
                  <div className="bg-red-50 text-red-700 p-4 rounded-md border border-red-300 text-center">
                    {error}
                  </div>
                )}

                <div className="text-center text-white">
                  <p className="text-lg mt-4">
                    Already have an account? 
                    <Link href="/login" className="ml-2 font-semibold text-amber-300 hover:text-amber-200 transition-colors duration-200">
                      Log In Here
                    </Link>
                  </p>
                </div>
              </form>
            </div>
            
            {/* Benefits section */}
            <div className="text-center md:text-left md:max-w-md">
              <div className="mb-6 flex flex-col items-center md:items-start">
                <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">Join Our Community</h1>
                <p className="text-lg text-amber-800">
                  Create an account to discover and rate coffee shops, save your favorites, and connect with other coffee enthusiasts.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-amber-900 mb-4">Member Benefits</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-amber-600 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700">Write and read authentic reviews</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-amber-600 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700">Save your favorite coffee spots</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-amber-600 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700">Track your coffee consumption</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-amber-600 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700">Get personalized recommendations</span>
                  </li>
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}