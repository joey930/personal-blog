import { cookies } from 'next/headers'
import AdminLogin from './AdminLogin'
import AdminDashboard from './AdminDashboard'

export default async function AdminPage() {
  const cookieStore = await cookies()
  const auth = cookieStore.get('admin_auth')
  const isAuthenticated = auth?.value === process.env.ADMIN_PASSWORD

  if (isAuthenticated) {
    return <AdminDashboard />
  }

  return <AdminLogin />
}
