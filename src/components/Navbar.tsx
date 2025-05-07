'use client'

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Custom event for auth state changes
const AUTH_STATE_CHANGE = 'auth_state_change'

// Dispatch event helper for auth changes
export const notifyAuthChange = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(AUTH_STATE_CHANGE))
  }
}

export default function Navbar() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  // Function to check auth state
  const checkAuth = () => {
    if (typeof window !== 'undefined') {
      try {
        const user = localStorage.getItem('currentUser')
        if (user) {
          setCurrentUser(JSON.parse(user))
        } else {
          setCurrentUser(null) // Clear state if no user found
        }
      } catch (error) {
        console.error('Error checking authentication:', error)
        setCurrentUser(null)
      }
    }
  }
  
  useEffect(() => {
    // Check on mount and after navigation
    checkAuth()
    
    // Add auth state change event listener
    window.addEventListener(AUTH_STATE_CHANGE, checkAuth)
    
    // Listen for storage changes (in case user logs in/out in another tab)
    window.addEventListener('storage', checkAuth)
    
    return () => {
      window.removeEventListener(AUTH_STATE_CHANGE, checkAuth)
      window.removeEventListener('storage', checkAuth)
    }
  }, [])
  
  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    setCurrentUser(null)
    notifyAuthChange() // Notify auth change
    router.push('/')
  }
  
  return (
    <nav className="bg-[#5D6748] p-3 flex items-center justify-between shadow-md">
      <div className="flex justify-start items-center">
        <Link href="/" className="flex items-center hover:opacity-90 transition-opacity">
            <Image 
              src="/assets/coffeecompass.svg" 
              alt="Caffeine Compass" 
              width={80} 
              height={80} 
              className="mr-2" 
            />
            <span className="text-white font-semibold text-lg hidden md:inline">Caffeine Compass</span>
        </Link>
      </div>
      
      {/* Mobile menu button */}
      <button 
        className="md:hidden text-white p-2"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"} />
        </svg>
      </button>
      
      {/* Desktop Navigation */}
      <div className={`md:flex items-center space-x-5 text-white ${isMenuOpen ? 'absolute top-16 left-0 right-0 flex flex-col items-center space-y-4 py-4 bg-[#5D6748] shadow-md z-50' : 'hidden'} md:static md:flex-row md:space-y-0 md:py-0 md:shadow-none`}>
        <Link href="/map" className="hover:underline">
          Map
        </Link>
        <Link href="/restaurant" className="hover:underline">
          Cafes
        </Link>
        <Link href="/tags" className="hover:underline">
          Tags
        </Link>
        
        {currentUser ? (
          <>
            <Link href="/profile" className="hover:underline flex items-center">
              <span className="mr-1">Profile</span>
              {currentUser.name && (
                <span className="bg-[#d8cba7] text-[#5D6748] px-2 py-1 rounded-full text-xs font-semibold">
                  {currentUser.name.split(' ')[0]}
                </span>
              )}
            </Link>
            <button 
              onClick={handleLogout}
              className="bg-[#3a3a3a] text-white px-4 py-2 rounded text-sm hover:bg-[#2a2a2a] transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          <div className={`flex ${isMenuOpen ? 'flex-col space-y-2' : 'flex-row space-x-2'} md:flex-row md:space-x-2 md:space-y-0`}>
            <Link href="/login">
              <button type="button" className="bg-white text-[#5D6748] px-4 py-2 rounded text-sm hover:bg-gray-100 transition-colors">Login</button>
            </Link>
            <Link href="/signup">
              <button type="button" className="bg-[#3a3a3a] text-white px-4 py-2 rounded text-sm hover:bg-[#2a2a2a] transition-colors">Sign Up</button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}