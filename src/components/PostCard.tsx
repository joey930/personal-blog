'use client'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import { useLanguage } from '@/hooks/useLanguage'
import type { Post } from '@/lib/types'

export default function PostCard({ post }: { post: Post }) {
  const { lang } = useLanguage()
  const title = lang === 'en' ? post.title_en : (post.title_ko || post.title_en)
  const label = lang === 'en' ? post.category?.name_en : (post.category?.name_ko || post.category?.name_en)
  const slug = post.category?.slug
  const date = new Date(post.published_at).toLocaleDateString(
    lang === 'ko' ? 'ko-KR' : 'en-US',
    { year: 'numeric', month: 'short', day: 'numeric' }
  )

  if (!slug || !post.slug?.current) return null

  return (
    <Link href={`/${slug}/${post.slug.current}`} style={{ textDecoration: 'none', display: 'block' }}>
      <article>
        {post.cover_image && (
          <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden', borderRadius: '6px', backgroundColor: '#ddd', marginBottom: '16px' }}>
            <Image
              src={urlFor(post.cover_image).width(600).height(338).url()}
              alt={title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <p style={{
          fontSize: '11px',
          fontWeight: 600,
          color: 'var(--color-accent)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          margin: '0 0 8px',
        }}>
          {label}
        </p>
        <h2 style={{
          fontFamily: 'var(--font-fraunces)',
          fontSize: '18px',
          fontWeight: 700,
          lineHeight: 1.3,
          color: 'var(--color-text)',
          letterSpacing: '-0.02em',
          margin: '0 0 8px',
        }}>
          {title}
        </h2>
        <p style={{ fontSize: '12px', color: 'var(--color-muted)', margin: 0 }}>{date}</p>
      </article>
    </Link>
  )
}
