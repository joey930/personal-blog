'use client'

export default function AdminDashboard() {
  return (
    <main style={{
      minHeight: '100svh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'var(--color-bg)',
    }}>
      <div style={{ width: '100%', maxWidth: '400px', padding: '0 24px', textAlign: 'center' }}>
        <p style={{
          fontFamily: 'var(--font-fraunces)',
          fontSize: '20px',
          fontWeight: 700,
          color: 'var(--color-text)',
          marginBottom: '8px',
          letterSpacing: '-0.02em',
        }}>
          ✦ The Pilgrim's Venture
        </p>
        <p style={{
          fontSize: '13px',
          color: 'var(--color-muted)',
          marginBottom: '40px',
        }}>
          Studio
        </p>

        <a
          href="https://studio-six-livid-18.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'block',
            width: '100%',
            padding: '14px',
            fontSize: '14px',
            fontWeight: 600,
            fontFamily: 'var(--font-jakarta)',
            color: 'var(--color-paper)',
            backgroundColor: 'var(--color-text)',
            borderRadius: '4px',
            textDecoration: 'none',
            marginBottom: '12px',
            boxSizing: 'border-box',
          }}
        >
          Open Studio →
        </a>

        <form method="POST" action="/api/admin-logout">
          <button type="submit" style={{
            fontSize: '12px',
            color: 'var(--color-muted)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'var(--font-jakarta)',
          }}>
            Sign out
          </button>
        </form>
      </div>
    </main>
  )
}
