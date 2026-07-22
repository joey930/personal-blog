'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/admin-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      window.location.href = 'https://studio-six-livid-18.vercel.app'
    } else {
      setError('Wrong password.')
      setLoading(false)
    }
  }

  return (
    <main style={{
      minHeight: '100svh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'var(--color-bg)',
    }}>
      <div style={{ width: '100%', maxWidth: '360px', padding: '0 24px' }}>
        {/* Logo */}
        <p style={{
          fontFamily: 'var(--font-fraunces)',
          fontSize: '18px',
          fontWeight: 700,
          color: 'var(--color-text)',
          textAlign: 'center',
          marginBottom: '40px',
          letterSpacing: '-0.02em',
        }}>
          ✦ The Pilgrim's Venture
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              autoFocus
              required
              style={{
                width: '100%',
                padding: '14px 16px',
                fontSize: '15px',
                fontFamily: 'var(--font-jakarta)',
                color: 'var(--color-text)',
                backgroundColor: 'var(--color-paper)',
                border: '1px solid var(--color-border)',
                borderRadius: '4px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {error && (
            <p style={{
              fontSize: '13px',
              color: 'var(--color-accent)',
              marginBottom: '12px',
              textAlign: 'center',
            }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            style={{
              width: '100%',
              padding: '14px',
              fontSize: '14px',
              fontWeight: 600,
              fontFamily: 'var(--font-jakarta)',
              color: 'var(--color-paper)',
              backgroundColor: loading ? 'var(--color-muted)' : 'var(--color-text)',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'opacity 0.15s',
            }}
          >
            {loading ? 'Entering...' : 'Enter Studio'}
          </button>
        </form>
      </div>
    </main>
  )
}
