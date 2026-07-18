'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useLanguage } from '@/hooks/useLanguage'
import type { Category } from '@/lib/types'

export default function Nav({ categories }: { categories: Category[] }) {
  const { lang, setLang } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header style={{
        backgroundColor: 'var(--color-bg)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        width: '100%',
        borderBottom: '1px solid var(--color-border)',
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
          <Link href="/" onClick={() => setMenuOpen(false)} style={{
            fontFamily: 'var(--font-fraunces)',
            fontWeight: 700,
            fontSize: '15px',
            color: 'var(--color-text)',
            textDecoration: 'none',
            letterSpacing: '-0.02em',
            flexShrink: 0,
          }}>
            The Pilgrim&apos;s Venture
          </Link>

          <nav style={{ display: 'flex', alignItems: 'center', gap: '32px' }} className="desktop-nav">
            {categories.map(cat => (
              <Link key={cat._id} href={`/${cat.slug}`} style={{
                fontSize: '14px',
                color: 'var(--color-text)',
                textDecoration: 'none',
                opacity: 0.6,
                whiteSpace: 'nowrap',
              }}>
                {lang === 'en' ? cat.name_en : (cat.name_ko || cat.name_en)}
              </Link>
            ))}
            <Link href="/about" style={{ fontSize: '14px', color: 'var(--color-text)', textDecoration: 'none', opacity: 0.6, whiteSpace: 'nowrap' }}>
              {lang === 'en' ? 'About' : '소개'}
            </Link>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
            <Link href="/search" style={{ color: 'var(--color-text)', opacity: 0.5, display: 'flex', alignItems: 'center' }} aria-label="Search">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398l3.85 3.85a1 1 0 0 0 1.415-1.415l-3.868-3.833zm-5.242 1.156a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z"/>
              </svg>
            </Link>
            <button
              onClick={() => setLang(lang === 'en' ? 'ko' : 'en')}
              style={{
                fontSize: '12px',
                color: 'var(--color-text)',
                opacity: 0.5,
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                fontFamily: 'var(--font-jakarta)',
              }}
              aria-label="Toggle language"
            >
              {lang === 'en' ? 'KO' : 'EN'}
            </button>
            <button
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Toggle menu"
              className="hamburger-btn"
              style={{ display: 'none', background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px', color: 'var(--color-text)' }}
            >
              {menuOpen ? (
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"/></svg>
              ) : (
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div style={{
          position: 'fixed', top: '56px', left: 0, right: 0,
          backgroundColor: 'var(--color-bg)',
          borderBottom: '1px solid var(--color-border)',
          zIndex: 49, padding: '16px 24px 24px',
          display: 'flex', flexDirection: 'column',
        }}>
          {categories.map(cat => (
            <Link key={cat._id} href={`/${cat.slug}`} onClick={() => setMenuOpen(false)} style={{
              fontSize: '18px', fontWeight: 600, color: 'var(--color-text)',
              textDecoration: 'none', padding: '14px 0',
              borderBottom: '1px solid var(--color-border)',
            }}>
              {lang === 'en' ? cat.name_en : (cat.name_ko || cat.name_en)}
            </Link>
          ))}
          <Link href="/about" onClick={() => setMenuOpen(false)} style={{
            fontSize: '18px', fontWeight: 600, color: 'var(--color-text)',
            textDecoration: 'none', padding: '14px 0',
          }}>
            {lang === 'en' ? 'About' : '소개'}
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </>
  )
}
