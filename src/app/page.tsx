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
    <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '64px 24px 80px' }} className="page-padding">

      {/* Header — title left, description right */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '48px',
        alignItems: 'end',
        marginBottom: '64px',
        paddingBottom: '48px',
        borderBottom: '1px solid var(--color-border)',
      }} className="home-header-grid">
        <h1 style={{
          fontFamily: 'var(--font-fraunces)',
          fontSize: 'clamp(40px, 6vw, 80px)',
          fontWeight: 700,
          letterSpacing: '-0.04em',
          color: 'var(--color-text)',
          margin: 0,
          lineHeight: 1,
        }}>
          The Pilgrim&apos;s Venture
        </h1>
        <div>
          <p style={{
            fontSize: '16px',
            lineHeight: 1.7,
            color: 'var(--color-muted)',
            margin: '0 0 20px',
            fontStyle: 'italic',
            fontFamily: 'var(--font-fraunces)',
          }}>
            faith, work and the long walk home
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {['Wellness', 'Christianity', 'Business'].map(cat => (
              <span key={cat} style={{
                fontSize: '13px',
                color: 'var(--color-accent)',
                fontWeight: 500,
              }}>{cat}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Featured post */}
      {featured && featured.slug?.current && <HeroPost post={featured} />}
      {!featured && (
        <p style={{ color: 'var(--color-muted)', textAlign: 'center', padding: '80px 0' }}>
          No posts yet — write one in Sanity Studio.
        </p>
      )}

      {/* Post grid */}
      {remaining.length > 0 && (
        <div style={{
          marginTop: '48px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
          gap: '40px',
        }} className="card-grid">
          {remaining.map((post: any) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </main>
  )
}
