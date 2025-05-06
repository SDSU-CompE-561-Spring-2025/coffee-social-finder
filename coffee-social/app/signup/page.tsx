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
    // TODO: hook up your sign-up API
    console.log('Signing up:', form)
  }

  return (
    <div className={styles.signupPage}>
      <header className={styles.signupHeader}>
        <h1>Caffeine Compass</h1>
      </header>

      <main className={styles.signupMain}>
        <h2>Sign up</h2>
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit} className={styles.signupForm}>
            <label>
              First Name
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="Value"
                required
              />
            </label>

            <label>
              Last name
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Value"
                required
              />
            </label>

            <label>
              Email
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Value"
                required
              />
            </label>

            <label>
              Password
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Value"
                required
              />
            </label>

            <button type="submit">Register</button>
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
