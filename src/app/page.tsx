import { sanityClient } from '@/lib/sanity'
import { featuredPostQuery, allPostsQuery } from '@/lib/queries'
import HeroPost from '@/components/HeroPost'
import PostCard from '@/components/PostCard'

export const revalidate = 60

export default async function HomePage() {
  const [featured, posts] = await Promise.all([
    sanityClient.fetch(featuredPostQuery),
    sanityClient.fetch(allPostsQuery),
  ])
  const remaining = posts.filter((p: any) => p._id !== featured?._id && p.slug?.current)

  return (
    <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }} className="page-padding">
      {/* Masthead */}
      <div style={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid var(--color-border)' }}>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--color-blue)', margin: '0 0 6px' }}>
          The Pilgrim's Venture
        </h1>
        <p style={{ fontSize: '15px', fontStyle: 'italic', color: 'var(--color-blue)', opacity: 0.55, margin: 0 }}>
          faith, work and the long walk home
        </p>
      </div>

      {featured && featured.slug?.current && <HeroPost post={featured} />}
      {!featured && (
        <div style={{
          border: '1px solid var(--color-border)',
          backgroundColor: 'var(--color-paper)',
          padding: '80px',
          textAlign: 'center',
          color: 'var(--color-blue)',
          opacity: 0.4,
        }}>
          No posts yet — write one in Sanity Studio.
        </div>
      )}
      {remaining.length > 0 && (
        <div style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))', gap: '16px' }} className="card-grid">
          {remaining.map((post: any) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </main>
  )
}
