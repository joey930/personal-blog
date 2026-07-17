'use client'
import Link from 'next/link'
import { useLanguage } from '@/hooks/useLanguage'
import type { Category } from '@/lib/types'

export default function NavCategories({ categories }: { categories: Category[] }) {
  const { lang } = useLanguage()
  return (
    <>
      {categories.map(cat => (
        <Link key={cat._id} href={`/${cat.slug}`} style={{
          fontSize: '14px',
          color: 'var(--color-blue)',
          textDecoration: 'none',
          opacity: 0.7,
        }}>
          {lang === 'en' ? cat.name_en : (cat.name_ko || cat.name_en)}
        </Link>
      ))}
    </>
  )
}
