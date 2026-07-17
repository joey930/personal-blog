import { NextRequest, NextResponse } from 'next/server'
import { sanityClient } from '@/lib/sanity'
import { searchQuery } from '@/lib/queries'

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q') || ''
  if (q.length < 2) return NextResponse.json([])
  const results = await sanityClient.fetch(searchQuery, { q: `*${q}*` })
  return NextResponse.json(results)
}
