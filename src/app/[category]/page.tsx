import { notFound } from 'next/navigation'
import { sanityClient } from '@/lib/sanity'
import { postsByCategoryQuery } from '@/lib/queries'
import PostCard from '@/components/PostCard'

const VALID_CATEGORIES = ['wellness', 'christianity', 'business']

const categoryTitles: Record<string, { en: string; ko: string }> = {
  wellness:     { en: 'Wellness',     ko: '웰니스' },
  christianity: { en: 'Christianity', ko: '신앙' },
  business:     { en: 'Business',     ko: '비즈니스' },
}

export const revalidate = 60

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  if (!VALID_CATEGORIES.includes(category)) notFound()

  const posts = await sanityClient.fetch(postsByCategoryQuery, { category })
  const titles = categoryTitles[category]

  return (
    <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>
      <header className="grid-texture" style={{
        border: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-paper)',
        padding: '40px 48px',
        marginBottom: '24px',
      }}>
        <span style={{
          display: 'inline-block',
          fontSize: '11px',
          border: '1px solid var(--color-blue)',
          borderRadius: '999px',
          padding: '2px 12px',
          marginBottom: '12px',
          color: 'var(--color-blue)',
          textTransform: 'capitalize',
        }}>Category</span>
        <h1 style={{
          fontSize: 'clamp(28px, 4vw, 48px)',
          fontWeight: 700,
          color: 'var(--color-blue)',
          letterSpacing: '-0.03em',
          margin: 0,
        }}>
          {titles.en} <span style={{ opacity: 0.4, fontWeight: 400 }}>/ {titles.ko}</span>
        </h1>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '16px' }}>
        {posts.filter((post: any) => post.slug?.current).map((post: any) => <PostCard key={post._id} post={post} />)}
      </div>
      {posts.length === 0 && (
        <p style={{ textAlign: 'center', padding: '80px', opacity: 0.4, color: 'var(--color-blue)' }}>
          No posts yet.
        </p>
      )}
    </main>
  )
}

export async function generateStaticParams() {
  return ['wellness', 'christianity', 'business'].map(category => ({ category }))
}
