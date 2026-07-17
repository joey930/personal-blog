'use client'
import { useState, useCallback, useRef } from 'react'
import PostCard from '@/components/PostCard'
import { useLanguage } from '@/hooks/useLanguage'

export default function SearchPage() {
  const { lang } = useLanguage()
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState('')
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const search = useCallback(async (q: string) => {
    if (q.length < 2) { setResults([]); return }
    setLoading(true)
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`)
      const data = await res.json()
      setResults(data)
    } finally {
      setLoading(false)
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value
    setQuery(q)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => search(q), 300)
  }

  return (
    <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>
      <div className="grid-texture" style={{
        border: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-paper)',
        padding: '40px 48px',
        marginBottom: '24px',
      }}>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={lang === 'ko' ? '검색...' : 'Search posts...'}
          autoFocus
          style={{
            width: '100%',
            fontSize: '32px',
            fontWeight: 700,
            color: 'var(--color-blue)',
            background: 'transparent',
            border: 'none',
            outline: 'none',
            letterSpacing: '-0.02em',
            caretColor: 'var(--color-blue)',
          }}
        />
      </div>

      {loading && <p style={{ textAlign: 'center', color: 'var(--color-blue)', opacity: 0.4 }}>...</p>}

      {!loading && results.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '16px' }}>
          {results.map((post: any) => <PostCard key={post._id} post={post} />)}
        </div>
      )}

      {!loading && query.length >= 2 && results.length === 0 && (
        <p style={{ textAlign: 'center', padding: '80px', opacity: 0.4, color: 'var(--color-blue)' }}>
          {lang === 'ko' ? '결과 없음' : 'No results found'}
        </p>
      )}
    </main>
  )
}
