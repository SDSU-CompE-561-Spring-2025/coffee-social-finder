'use client'

import { useState } from 'react'
import Link from 'next/link'
import { notifyAuthChange } from '@/components/Navbar'
import styles from './page.module.css'

export default function SignUpPage() {
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
      // Prepare the data for the backend API
      const userData = {
        name: `${form.firstName} ${form.lastName}`, // Combine first and last name
        email: form.email,
        password: form.password,
        created_at: new Date().toISOString(), // Current timestamp
        bookmark_id: 0, // Default values for required fields
        filtered_tags_id: 0,
        cosmetics_id: 0,
        comment_id: 0
      }

      // MOCK MODE: Enable this when backend is not available
      const useMockMode = true; // Set to false when backend is working
      
      if (useMockMode) {
        // Simulate a brief delay like a real API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Validate email format
        if (!form.email.includes('@')) {
          setError('Please enter a valid email address');
          return;
        }
        
        // Get existing registered users or initialize empty array
        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        
        // Check if email already exists
        const emailExists = registeredUsers.some((user: any) => user.email === form.email);
        if (emailExists) {
          setError('Email already registered');
          return;
        }
        
        // Add new user to the array
        registeredUsers.push(userData);
        
        // Save updated array back to localStorage
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
        
        // Also log in the user automatically
        localStorage.setItem('currentUser', JSON.stringify(userData));
        
        // Notify auth state change
        notifyAuthChange();
        
        // Log success
        console.log('Account created (MOCK MODE):', userData);
        setSuccess(true);
      } else {
        // Real backend API call - uncomment this when backend is working
        const response = await fetch('http://localhost:8000/users/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.detail || 'Failed to create account')
        }

        // Handle success
        const data = await response.json()
        console.log('Account created:', data)
        setSuccess(true)
      }
    } catch (err) {
      console.error('Error creating account:', err)
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.signupPage}>
      <main className={styles.signupMain}>
        {success ? (
          <div className={styles.success}>
            <p>Account created successfully!</p>
            <Link href="/login">Login to your account</Link>
          </div>
        ) : (
          <div className={styles.formContainer}>
            <h2 className={styles.formTitle}>Sign Up</h2>

            <form onSubmit={handleSubmit} className={styles.signupForm}>
              <div className={styles.inputGroup}>
                <input
                  id="firstName"
                  name="firstName"
                  placeholder=" "
                  value={form.firstName}
                  onChange={handleChange}
                  required
                  className={styles.inputField}
                />
                <label htmlFor="firstName" className={styles.floatingLabel}>
                  First Name
                </label>
              </div>

              <div className={styles.inputGroup}>
                <input
                  id="lastName"
                  name="lastName"
                  placeholder=" "
                  value={form.lastName}
                  onChange={handleChange}
                  required
                  className={styles.inputField}
                />
                <label htmlFor="lastName" className={styles.floatingLabel}>
                  Last Name
                </label>
              </div>

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
                className={styles.registerButton}
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Register'}
              </button>
              
              {error && <div className={styles.error}>{error}</div>}
            </form>

            <p className={styles.loginCta}>
              Already have an account?{' '}
              <Link href="/login">Login</Link>
            </p>
          </div>
        )}
      </main>
    </div>
  )
}