import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import AdminLogin from './AdminLogin'

export default async function AdminPage() {
  const cookieStore = await cookies()
  const auth = cookieStore.get('admin_auth')
  const isAuthenticated = auth?.value === process.env.ADMIN_PASSWORD

  if (isAuthenticated) {
    redirect('/admin/studio')
  }

  return <AdminLogin />
}
