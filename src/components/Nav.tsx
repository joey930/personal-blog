'use client'
import Link from 'next/link'
import { useLanguage } from '@/hooks/useLanguage'
import type { Category } from '@/lib/types'
import NavCategories from './NavCategories'

export default function Nav({ categories }: { categories: Category[] }) {
  const { lang, setLang } = useLanguage()

  return (
    <header style={{
      backgroundColor: 'var(--color-paper)',
      borderBottom: '1px solid var(--color-border)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px',
        height: '56px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <Link href="/" style={{
          fontWeight: 700,
          fontSize: '15px',
          color: 'var(--color-blue)',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          letterSpacing: '-0.02em',
        }}>
          ✦ {lang === 'en' ? 'Joey' : '조이'}
        </Link>

        {/* Nav links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <NavCategories categories={categories} />
          <Link href="/about" style={{ fontSize: '14px', color: 'var(--color-blue)', textDecoration: 'none', opacity: 0.7 }}>
            {lang === 'en' ? 'About' : '소개'}
          </Link>
        </nav>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link href="/search" style={{ color: 'var(--color-blue)', opacity: 0.7 }} aria-label="Search">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398l3.85 3.85a1 1 0 0 0 1.415-1.415l-3.868-3.833zm-5.242 1.156a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z"/>
            </svg>
          </Link>
          <button
            onClick={() => setLang(lang === 'en' ? 'ko' : 'en')}
            style={{
              fontSize: '12px',
              color: 'var(--color-blue)',
              border: '1px solid var(--color-blue)',
              borderRadius: '999px',
              padding: '4px 12px',
              background: 'transparent',
              cursor: 'pointer',
              fontWeight: lang === 'ko' ? 600 : 400,
            }}
          >
            {lang === 'en' ? '한국어' : 'English'}
          </button>
        </div>
      </div>
    </header>
  )
}
