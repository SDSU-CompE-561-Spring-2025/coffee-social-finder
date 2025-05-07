'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { notifyAuthChange } from '@/components/Navbar'
import styles from './page.module.css'

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
    <div className={styles.loginPage}>
      <main className={styles.loginMain}>
        <div className={styles.formWrapper}>
          <h2 className={styles.formTitle}>Login</h2>
          
          <form onSubmit={handleSubmit} className={styles.loginForm}>
            <div className={styles.inputGroup}>
              <input
                id="email"
                type="email"
                name="email"
                placeholder=" "
                value={form.email}
                onChange={handleChange}
                required
                className={styles.inputField}
              />
              <label htmlFor="email" className={styles.floatingLabel}>
                Email
              </label>
            </div>

            <div className={styles.inputGroup}>
              <input
                id="password"
                type="password"
                name="password"
                placeholder=" "
                value={form.password}
                onChange={handleChange}
                required
                className={styles.inputField}
              />
              <label htmlFor="password" className={styles.floatingLabel}>
                Password
              </label>
            </div>

            <button 
              type="submit" 
              className={styles.loginButton}
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign in'}
            </button>
            
            {error && <div className={styles.error}>{error}</div>}

            <p className={styles.signupPrompt}>
              Don't have an account? <Link href="/signup">Create account here</Link>
            </p>
          </form>
        </div>

        <div className={styles.logoContainer}>
          <Image
            src="/assets/coffeecompass.svg"
            alt="Caffeine Compass logo"
            width={300}
            height={300}
            className={styles.logo}
            priority
          />
          <h2 className={styles.logoText}>Caffeine Compass</h2>
        </div>
      </main>
    </div>
  )
}