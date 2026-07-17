import { notFound } from 'next/navigation'
import Image from 'next/image'
import { sanityClient, urlFor } from '@/lib/sanity'
import { postBySlugQuery, allPostsQuery } from '@/lib/queries'
import PostBody from '@/components/PostBody'
import type { Metadata } from 'next'

export const revalidate = 60

export default async function PostPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>
}) {
  const { slug } = await params
  const post = await sanityClient.fetch(postBySlugQuery, { slug })
  if (!post) notFound()

  return (
    <article style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>
      {/* Grid-texture hero */}
      <div className="grid-texture" style={{
        border: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-paper)',
        padding: '48px 48px 40px',
        marginBottom: '2px',
      }}>
        <span style={{
          display: 'inline-block',
          fontSize: '11px',
          fontWeight: 500,
          color: 'var(--color-blue)',
          border: '1px solid var(--color-blue)',
          borderRadius: '999px',
          padding: '2px 12px',
          marginBottom: '20px',
          textTransform: 'capitalize',
          letterSpacing: '0.03em',
        }}>{post.category}</span>

        <h1 style={{
          fontSize: 'clamp(28px, 4vw, 52px)',
          fontWeight: 700,
          lineHeight: 1.1,
          color: 'var(--color-blue)',
          letterSpacing: '-0.03em',
          margin: '0 0 20px',
          maxWidth: '860px',
        }}>{post.title_en}</h1>

        {post.title_ko && (
          <p style={{ fontSize: '20px', color: 'var(--color-blue)', opacity: 0.5, margin: '0 0 16px' }}>
            {post.title_ko}
          </p>
        )}

        <p style={{ fontSize: '12px', color: 'var(--color-blue)', opacity: 0.5 }}>
          {new Date(post.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Blue-tinted cover image */}
      {post.cover_image && (
        <div style={{
          position: 'relative',
          aspectRatio: '21/9',
          overflow: 'hidden',
          backgroundColor: 'var(--color-blue)',
          border: '1px solid var(--color-border)',
          borderTop: 'none',
          marginBottom: '2px',
        }}>
          <Image
            src={urlFor(post.cover_image).width(1100).height(471).url()}
            alt={post.title_en}
            fill
            priority
            className="object-cover"
            style={{ mixBlendMode: 'multiply', opacity: 0.8 }}
          />
        </div>
      )}

      {/* Two-column body */}
      <div style={{
        border: '1px solid var(--color-border)',
        borderTop: 'none',
        backgroundColor: 'var(--color-paper)',
        padding: '48px',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: post.author_note ? '1fr 1fr' : '1fr',
          gap: '48px',
        }}>
          <PostBody bodyEn={post.body_en} bodyKo={post.body_ko} />
          {post.author_note && (
            <aside style={{
              fontSize: '14px',
              color: 'var(--color-blue)',
              opacity: 0.7,
              borderLeft: '1px solid var(--color-border)',
              paddingLeft: '48px',
              fontStyle: 'italic',
            }}>
              {post.author_note}
            </aside>
          )}
        </div>
      </div>
    </article>
  )
}

export async function generateStaticParams() {
  const posts = await sanityClient.fetch(allPostsQuery)
  return posts
    .filter((p: any) => p.slug?.current)
    .map((p: any) => ({ category: p.category, slug: p.slug.current }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await sanityClient.fetch(postBySlugQuery, { slug })
  if (!post) return {}
  return {
    title: post.title_en,
    openGraph: {
      title: post.title_en,
      images: post.cover_image
        ? [urlFor(post.cover_image).width(1200).height(630).url()]
        : [],
    },
  }
}
