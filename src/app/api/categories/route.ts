import { NextResponse } from 'next/server'
import { sanityClient } from '@/lib/sanity'
import { allCategoriesQuery } from '@/lib/queries'

export const revalidate = 300

export async function GET() {
  const categories = await sanityClient.fetch(allCategoriesQuery)
  return NextResponse.json(categories)
}
