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
    // TODO: hook up your login API
    console.log('Logging in:', form)
  }

  return (
    <div className={styles.loginPage}>
      <header className={styles.loginHeader}>
        <h1>Caffeine Compass</h1>
      </header>

      <main className={styles.loginMain}>
        <div className={styles.formWrapper}>
          <div className={styles.tab}>
            <Link href="/signup">Create Account</Link>
          </div>
          <form onSubmit={handleSubmit} className={styles.loginForm}>
            <label>
              Email
              <input
                type="email"
                name="email"
                placeholder="Value"
                value={form.email}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Password
              <input
                type="password"
                name="password"
                placeholder="Value"
                value={form.password}
                onChange={handleChange}
                required
              />
            </label>

            <Link
             href="/login"
             className={styles.signInLink}  
            >
               Sign In
           </Link>

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
