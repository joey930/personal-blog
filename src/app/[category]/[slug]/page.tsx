import { notFound } from 'next/navigation'
import Image from 'next/image'
import { sanityClient, urlFor } from '@/lib/sanity'
import { postBySlugQuery, allPostsQuery } from '@/lib/queries'
import PostBody from '@/components/PostBody'
import type { Metadata } from 'next'

function estimateReadingTime(body: any[]): number {
  if (!body?.length) return 1
  const text = body
    .filter((b: any) => b._type === 'block')
    .flatMap((b: any) => b.children?.map((c: any) => c.text || '') || [])
    .join(' ')
  return Math.max(1, Math.ceil(text.split(/\s+/).length / 200))
}

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
  const date = new Date(post.published_at).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  return (
    <article style={{ maxWidth: '1100px', margin: '0 auto', padding: '56px 24px 96px' }} className="page-padding">

      {/* Header */}
      <header style={{ maxWidth: '780px', marginBottom: '40px' }}>
        <p style={{
          fontSize: '12px', fontWeight: 600, color: 'var(--color-accent)',
          textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 6px',
        }}>
          {post.category?.name_en}
        </p>
        <p style={{ fontSize: '13px', color: 'var(--color-muted)', margin: '0 0 24px' }}>
          {date}
        </p>
        <h1 style={{
          fontFamily: 'var(--font-fraunces)',
          fontSize: 'clamp(34px, 5vw, 64px)',
          fontWeight: 700,
          lineHeight: 1.1,
          color: 'var(--color-text)',
          letterSpacing: '-0.03em',
          margin: '0 0 16px',
        }}>{post.title_en}</h1>

        {post.title_ko && (
          <p style={{
            fontFamily: 'var(--font-noto-serif-kr), serif',
            fontSize: '18px',
            color: 'var(--color-muted)',
            margin: 0,
            fontStyle: 'italic',
          }}>
            {post.title_ko}
          </p>
        )}
      </header>

      {/* Cover image */}
      {post.cover_image && (
        <div style={{
          position: 'relative', aspectRatio: '16/7',
          overflow: 'hidden', borderRadius: '10px',
          backgroundColor: '#ddd', marginBottom: '56px',
        }}>
          <Image
            src={urlFor(post.cover_image).width(1100).height(481).url()}
            alt={post.title_en} fill priority className="object-cover"
          />
        </div>
      )}

      {/* Two-column: sidebar + body */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '200px 1fr',
        gap: '64px',
        alignItems: 'start',
      }} className="post-article-grid">

        {/* Sticky sidebar */}
        <aside style={{
          position: 'sticky', top: '80px',
          fontSize: '13px', color: 'var(--color-muted)', lineHeight: 1.6,
        }} className="post-sidebar">
          <p style={{
            margin: '0 0 4px', fontWeight: 600, fontSize: '11px',
            textTransform: 'uppercase', letterSpacing: '0.08em',
            color: 'var(--color-accent)',
          }}>
            {post.category?.name_en}
          </p>
          <p style={{ margin: '0 0 8px', fontSize: '12px' }}>{date}</p>
          <p style={{ margin: '0 0 0', fontSize: '12px' }}>{readingTime} min read</p>

          {post.author_note && (
            <div style={{
              marginTop: '24px', paddingTop: '24px',
              borderTop: '1px solid var(--color-border)',
              fontSize: '13px', fontStyle: 'italic',
              lineHeight: 1.65, color: 'var(--color-muted)',
            }}>
              {post.author_note}
            </div>
          )}
        </aside>

        {/* Article body */}
        <div>
          <PostBody bodyEn={post.body_en} bodyKo={post.body_ko} />
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
}: { params: Promise<{ slug: string }> }): Promise<Metadata> {
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
