'use client'
import Link from 'next/link'
import { useLanguage } from '@/hooks/useLanguage'

export default function Nav() {
  const { lang, setLang } = useLanguage()

  return (
    <header className="sticky top-0 z-50" style={{ backgroundColor: 'var(--color-ink)', color: 'white' }}>
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-headline-en text-xl font-bold tracking-tight text-white">
          {lang === 'en' ? 'Joey' : '조이'}
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/wellness"     className="hover:opacity-70 transition-opacity">{lang === 'en' ? 'Wellness'     : '웰니스'}</Link>
          <Link href="/christianity" className="hover:opacity-70 transition-opacity">{lang === 'en' ? 'Christianity' : '신앙'}</Link>
          <Link href="/business"     className="hover:opacity-70 transition-opacity">{lang === 'en' ? 'Business'     : '비즈니스'}</Link>
          <Link href="/about"        className="hover:opacity-70 transition-opacity">{lang === 'en' ? 'About'        : '소개'}</Link>
          <Link href="/search"       className="hover:opacity-70 transition-opacity" aria-label="Search">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398l3.85 3.85a1 1 0 0 0 1.415-1.415l-3.868-3.833zm-5.242 1.156a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z"/>
            </svg>
          </Link>
        </nav>

        <button
          onClick={() => setLang(lang === 'en' ? 'ko' : 'en')}
          className="flex items-center gap-1 text-xs rounded-full px-3 py-1 transition-colors"
          style={{ border: '1px solid rgba(255,255,255,0.3)' }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
          aria-label="Toggle language"
        >
          <span style={{ fontWeight: lang === 'en' ? 'bold' : 'normal', opacity: lang === 'en' ? 1 : 0.5 }}>EN</span>
          <span style={{ opacity: 0.3 }}>|</span>
          <span className="font-body-ko" style={{ fontWeight: lang === 'ko' ? 'bold' : 'normal', opacity: lang === 'ko' ? 1 : 0.5 }}>한</span>
        </button>
      </div>
    </header>
  )
}
