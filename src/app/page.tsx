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
    <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 24px 32px' }} className="page-padding">

      {/* Masthead */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <p style={{
          fontSize: '11px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--color-blue)',
          opacity: 0.4,
          margin: '0 0 16px',
        }}>
          Faith · Work · Life
        </p>
        <h1 style={{
          fontSize: 'clamp(36px, 6vw, 76px)',
          fontWeight: 800,
          letterSpacing: '-0.04em',
          color: 'var(--color-blue)',
          margin: '0 0 12px',
          lineHeight: 1,
          fontFamily: 'var(--font-fraunces)',
        }}>
          The Pilgrim&apos;s Venture
        </h1>
        <p style={{
          fontSize: 'clamp(13px, 1.4vw, 15px)',
          fontStyle: 'italic',
          color: 'var(--color-blue)',
          opacity: 0.4,
          margin: 0,
          letterSpacing: '0.02em',
        }}>
          faith, work and the long walk home
        </p>
      </div>

      {featured && featured.slug?.current && <HeroPost post={featured} />}
      {!featured && (
        <div style={{
          backgroundColor: 'var(--color-paper)',
          padding: '80px',
          textAlign: 'center',
          color: 'var(--color-blue)',
          opacity: 0.4,
          borderRadius: '2px',
        }}>
          No posts yet — write one in Sanity Studio.
        </div>
      )}
      {remaining.length > 0 && (
        <div style={{ marginTop: '16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))', gap: '12px' }} className="card-grid">
          {remaining.map((post: any) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </main>
  )
}
