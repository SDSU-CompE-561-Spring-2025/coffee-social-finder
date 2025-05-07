'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import styles from './page.module.css'

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState<string|undefined>(undefined)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(undefined)

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        }
      )

      if (!res.ok) {
        const { message } = await res.json()
        throw new Error(message || 'Login failed')
      }

      const { token, user } = await res.json()
      // e.g. store token in localStorage, cookie, or context
      localStorage.setItem('token', token)

      // redirect to your app’s protected page
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className={styles.loginPage}>
      {/* … */}
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        {/* inputs… */}
        <button type="submit" className={styles.loginButton}>
          Sign in
        </button>
        {error && <p className={styles.errorText}>{error}</p>}
      </form>
      {/* … */}
    </div>
  )
}


