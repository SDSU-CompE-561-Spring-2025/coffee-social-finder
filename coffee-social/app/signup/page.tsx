'use client'

import { useState } from 'react'
import Link from 'next/link'
import styles from './page.module.css'

export default function SignUpPage() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      }
    )
    
  }

  return (
    <div className={styles.signupPage}>
      <header className={styles.signupHeader}>
        <h1>Caffeine Compass</h1>
      </header>

      <main className={styles.signupMain}>
        <div className={styles.formContainer}>
          {/* move and restyle the title */}
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

            <button type="submit" className={styles.registerButton}>
              Register
            </button>
          </form>

          <p className={styles.loginCta}>
            Already have an account?{' '}
            <Link href="/login">Login</Link>
          </p>
        </div>
      </main>

      <footer className={styles.signupFooter}>
        <Link href="/about">About</Link>
        <span>Copyright 2025</span>
      </footer>
    </div>
  )
}
