import { notFound } from 'next/navigation'

function estimateReadingTime(body: any[]): number {
  if (!body?.length) return 1
  const text = body
    .filter((b: any) => b._type === 'block')
    .flatMap((b: any) => b.children?.map((c: any) => c.text || '') || [])
    .join(' ')
  return Math.max(1, Math.ceil(text.split(/\s+/).length / 200))
}
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

  const readingTime = estimateReadingTime(post.body_en)

  return (
    <article style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }} className="page-padding">
      {/* Hero */}
      <div className="hero-padding" style={{
        backgroundColor: 'var(--color-paper)',
        padding: '48px 48px 36px',
        marginBottom: '3px',
      }}>
        <p style={{
          fontSize: '11px',
          fontWeight: 600,
          color: 'var(--color-blue)',
          opacity: 0.45,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          margin: '0 0 16px',
        }}>
          {post.category?.name_en}
          <span style={{ margin: '0 8px', opacity: 0.5 }}>·</span>
          {new Date(post.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          <span style={{ margin: '0 8px', opacity: 0.5 }}>·</span>
          {readingTime} min read
        </p>

        <h1 style={{
          fontSize: 'clamp(28px, 4vw, 52px)',
          fontWeight: 800,
          lineHeight: 1.1,
          color: 'var(--color-blue)',
          letterSpacing: '-0.03em',
          margin: '0 0 14px',
          maxWidth: '860px',
        }}>{post.title_en}</h1>

        {post.title_ko && (
          <p style={{ fontSize: '17px', color: 'var(--color-blue)', opacity: 0.35, margin: 0, fontStyle: 'italic' }}>
            {post.title_ko}
          </p>
        )}
      </div>

      {/* Cover image */}
      {post.cover_image && (
        <div style={{
          position: 'relative',
          aspectRatio: '21/9',
          overflow: 'hidden',
          backgroundColor: '#ddd',
          marginBottom: '3px',
        }}>
          <Image
            src={urlFor(post.cover_image).width(1100).height(471).url()}
            alt={post.title_en}
            fill
            priority
            className="object-cover"
          />
        </div>
      )}

      {/* Body */}
      <div className="post-body-padding" style={{
        backgroundColor: 'var(--color-paper)',
        padding: '48px',
      }}>
        <div className="post-body-grid" style={{
          display: 'grid',
          gridTemplateColumns: post.author_note ? '1fr 1fr' : '1fr',
          gap: '48px',
        }}>
          <PostBody bodyEn={post.body_en} bodyKo={post.body_ko} />
          {post.author_note && (
            <aside style={{
              fontSize: '14px',
              color: 'var(--color-blue)',
              opacity: 0.6,
              paddingLeft: '48px',
              fontStyle: 'italic',
              borderLeft: '2px solid var(--color-bg)',
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
    .filter((p: any) => p.slug?.current && p.category?.slug)
    .map((p: any) => ({ category: p.category.slug, slug: p.slug.current }))
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
