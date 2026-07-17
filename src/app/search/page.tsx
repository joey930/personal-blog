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

  const placeholder = lang === 'ko' ? '검색...' : 'Search...'

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <div className="relative mb-10">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          className={`w-full text-2xl pb-2 outline-none bg-transparent ${lang === 'ko' ? 'font-body-ko' : 'font-body-en'}`}
          style={{ borderBottom: '2px solid var(--color-ink)' }}
          autoFocus
        />
      </div>

      {loading && <p className="text-center" style={{ color: '#9ca3af' }}>...</p>}

      {!loading && results.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {results.map((post: any) => <PostCard key={post._id} post={post} />)}
        </div>
      )}

      {!loading && query.length >= 2 && results.length === 0 && (
        <p className="text-center py-20" style={{ color: '#9ca3af' }}>
          {lang === 'ko' ? '결과 없음' : 'No results found'}
        </p>
      )}
    </main>
  )
}
