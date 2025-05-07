'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './page.module.css'

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Logging in:', form)
  }

  return (
    <div className={styles.loginPage}>
      <header className={styles.loginHeader}>
        <h1>Caffeine Compass</h1>
      </header>

      <main className={styles.loginMain}>
        <div className={styles.formWrapper}>
          {/* LOGIN TITLE */}
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

            <button type="submit" className={styles.loginButton}>
              Sign in
            </button>

            <p className={styles.signupPrompt}>
              Don’t have an account? <Link href="/signup">Create account here</Link>
            </p>
          </form>

        </div>

        <div className={styles.logoContainer}>
          <Image
            src="/compass-logo.png"
            alt="Caffeine Compass logo"
            width={300}
            height={300}
          />
        </div>
      </main>

      <footer className={styles.loginFooter}>
        <Link href="/about">About</Link>
        <span>Copyright 2025</span>
      </footer>
    </div>
  )
}

