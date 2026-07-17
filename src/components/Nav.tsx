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
        backgroundColor: 'var(--color-paper)',
        borderBottom: '1px solid var(--color-border)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        width: '100%',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          height: '52px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <Link href="/" onClick={() => setMenuOpen(false)} style={{
            fontWeight: 700,
            fontSize: '15px',
            color: 'var(--color-blue)',
            textDecoration: 'none',
            letterSpacing: '-0.02em',
            flexShrink: 0,
          }}>
            ✦ The Pilgrim's Venture
          </Link>

          {/* Desktop nav */}
          <nav style={{
            display: 'flex',
            alignItems: 'center',
            gap: '28px',
          }} className="desktop-nav">
            {categories.map(cat => (
              <Link key={cat._id} href={`/${cat.slug}`} style={{
                fontSize: '14px',
                color: 'var(--color-blue)',
                textDecoration: 'none',
                opacity: 0.7,
                whiteSpace: 'nowrap',
              }}>
                {lang === 'en' ? cat.name_en : (cat.name_ko || cat.name_en)}
              </Link>
            ))}
            <Link href="/about" style={{ fontSize: '14px', color: 'var(--color-blue)', textDecoration: 'none', opacity: 0.7, whiteSpace: 'nowrap' }}>
              {lang === 'en' ? 'About' : '소개'}
            </Link>
          </nav>

          {/* Right: search + toggle + hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
            <Link href="/search" style={{ color: 'var(--color-blue)', opacity: 0.7, display: 'flex', alignItems: 'center' }} aria-label="Search">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398l3.85 3.85a1 1 0 0 0 1.415-1.415l-3.868-3.833zm-5.242 1.156a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z"/>
              </svg>
            </Link>
            <button
              onClick={() => setLang(lang === 'en' ? 'ko' : 'en')}
              style={{
                fontSize: '11px',
                color: 'var(--color-blue)',
                border: '1px solid var(--color-blue)',
                borderRadius: '999px',
                padding: '3px 10px',
                background: 'transparent',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {lang === 'en' ? '한국어' : 'English'}
            </button>
            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Toggle menu"
              className="hamburger-btn"
              style={{
                display: 'none',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
                color: 'var(--color-blue)',
              }}
            >
              {menuOpen ? (
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M6 18L18 6M6 6l12 12"/>
                </svg>
              ) : (
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="mobile-menu" style={{
          position: 'fixed',
          top: '52px',
          left: 0,
          right: 0,
          backgroundColor: 'var(--color-paper)',
          borderBottom: '1px solid var(--color-border)',
          zIndex: 49,
          padding: '16px 20px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '0',
        }}>
          {categories.map(cat => (
            <Link key={cat._id} href={`/${cat.slug}`} onClick={() => setMenuOpen(false)} style={{
              fontSize: '18px',
              fontWeight: 600,
              color: 'var(--color-blue)',
              textDecoration: 'none',
              padding: '14px 0',
              borderBottom: '1px solid var(--color-border)',
              letterSpacing: '-0.01em',
            }}>
              {lang === 'en' ? cat.name_en : (cat.name_ko || cat.name_en)}
            </Link>
          ))}
          <Link href="/about" onClick={() => setMenuOpen(false)} style={{
            fontSize: '18px',
            fontWeight: 600,
            color: 'var(--color-blue)',
            textDecoration: 'none',
            padding: '14px 0',
          }}>
            {lang === 'en' ? 'About' : '소개'}
          </Link>
        </div>
      )}

      {/* Inline styles for responsive nav */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </>
  )
}
