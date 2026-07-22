import { cookies } from 'next/headers'
import AdminLogin from './AdminLogin'

export default async function AdminPage() {
  const cookieStore = await cookies()
  const authCookie = cookieStore.get('admin_auth')
  const isAuthenticated = authCookie?.value === process.env.ADMIN_PASSWORD

  if (isAuthenticated) {
    return (
      <div style={{ position: 'fixed', inset: 0, display: 'flex', flexDirection: 'column' }}>
        {/* Thin header bar */}
        <div style={{
          height: '36px',
          backgroundColor: '#101010',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 16px',
          flexShrink: 0,
        }}>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', fontFamily: 'sans-serif' }}>
            ✦ The Pilgrim's Venture — Studio
          </span>
          <form method="POST" action="/api/admin-logout">
            <button type="submit" style={{
              fontSize: '11px',
              color: 'rgba(255,255,255,0.4)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'sans-serif',
            }}>
              Sign out
            </button>
          </form>
        </div>

        {/* Studio iframe */}
        <iframe
          src="https://studio-six-livid-18.vercel.app"
          style={{ flex: 1, border: 'none', width: '100%' }}
          allow="clipboard-write"
          title="Sanity Studio"
        />
      </div>
    )
  }

  return <AdminLogin />
}
