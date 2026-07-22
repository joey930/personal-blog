import { NextResponse } from 'next/server'

export async function POST() {
  const res = NextResponse.redirect('https://joeykim.co/admin', { status: 303 })
  res.cookies.set('admin_auth', '', { maxAge: 0, path: '/' })
  return res
}
