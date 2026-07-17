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

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }} className="page-padding">

      {/* Masthead — newspaper style */}
      <div style={{ marginBottom: '32px' }}>
        {/* Top rule */}
        <div style={{ borderTop: '3px solid var(--color-blue)', borderBottom: '1px solid var(--color-blue)', padding: '6px 0', marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '11px', color: 'var(--color-blue)', opacity: 0.5, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Faith · Work · Life</span>
          <span style={{ fontSize: '11px', color: 'var(--color-blue)', opacity: 0.5, letterSpacing: '0.04em' }}>{today}</span>
        </div>

        {/* Title — centered */}
        <div style={{ textAlign: 'center', padding: '16px 0 20px' }}>
          <h1 style={{
            fontSize: 'clamp(36px, 6vw, 80px)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            color: 'var(--color-blue)',
            margin: '0 0 10px',
            lineHeight: 1,
          }}>
            The Pilgrim&apos;s Venture
          </h1>
          <p style={{
            fontSize: 'clamp(12px, 1.4vw, 15px)',
            fontStyle: 'italic',
            color: 'var(--color-blue)',
            opacity: 0.45,
            margin: 0,
            letterSpacing: '0.06em',
          }}>
            faith, work and the long walk home
          </p>
        </div>

        {/* Bottom rule */}
        <div style={{ borderTop: '1px solid var(--color-blue)', borderBottom: '3px solid var(--color-blue)', height: '6px' }} />
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
