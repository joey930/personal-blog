import { sanityClient } from '@/lib/sanity'
import { postsByCategorySlugQuery, allCategoriesQuery } from '@/lib/queries'
import PostCard from '@/components/PostCard'
import { notFound } from 'next/navigation'

export const revalidate = 60

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = await params

  // Fetch categories to validate and get display name
  const categories = await sanityClient.fetch(allCategoriesQuery)
  const cat = categories.find((c: any) => c.slug === slug)
  if (!cat) notFound()

  const posts = await sanityClient.fetch(postsByCategorySlugQuery, { slug })

  return (
    <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }} className="page-padding">
      <header className="grid-texture hero-padding" style={{
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
        }}>Category</span>
        <h1 style={{
          fontSize: 'clamp(28px, 4vw, 48px)',
          fontWeight: 700,
          color: 'var(--color-blue)',
          letterSpacing: '-0.03em',
          margin: 0,
          fontFamily: 'var(--font-fraunces)',
        }}>
          {cat.name_en}
          {cat.name_ko && <span style={{ opacity: 0.4, fontWeight: 400, marginLeft: '12px' }}>/ {cat.name_ko}</span>}
        </h1>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))', gap: '16px' }} className="card-grid">
        {posts.map((post: any) => <PostCard key={post._id} post={post} />)}
      </div>
      {posts.length === 0 && (
        <p style={{ textAlign: 'center', padding: '80px', opacity: 0.4, color: 'var(--color-blue)' }}>No posts yet.</p>
      )}
    </main>
  )
}

export async function generateStaticParams() {
  const categories = await sanityClient.fetch(allCategoriesQuery)
  return categories.map((cat: any) => ({ category: cat.slug }))
}
