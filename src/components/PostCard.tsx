'use client'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import { useLanguage } from '@/hooks/useLanguage'
import type { Post } from '@/lib/types'

export default function PostCard({ post }: { post: Post }) {
  const { lang } = useLanguage()
  const title = lang === 'en' ? post.title_en : (post.title_ko || post.title_en)
  const label = lang === 'en'
    ? post.category?.name_en
    : (post.category?.name_ko || post.category?.name_en)
  const slug = post.category?.slug
  const date = new Date(post.published_at).toLocaleDateString(
    lang === 'ko' ? 'ko-KR' : 'en-US',
    { year: 'numeric', month: 'short', day: 'numeric' }
  )

  if (!slug || !post.slug?.current) return null

  return (
    <Link href={`/${slug}/${post.slug.current}`} style={{ textDecoration: 'none', display: 'block' }}>
      <article style={{ backgroundColor: 'var(--color-paper)', overflow: 'hidden' }}>
        {/* Image */}
        {post.cover_image && (
          <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden', backgroundColor: '#ddd' }}>
            <Image
              src={urlFor(post.cover_image).width(600).height(338).url()}
              alt={title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Text */}
        <div className="hero-padding" style={{ padding: '20px 24px 22px' }}>
          <p style={{
            fontSize: '11px',
            fontWeight: 600,
            color: 'var(--color-blue)',
            opacity: 0.45,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            margin: '0 0 8px',
          }}>
            {label}
          </p>
          <h2 style={{
            fontSize: '18px',
            fontWeight: 800,
            lineHeight: 1.25,
            color: 'var(--color-blue)',
            letterSpacing: '-0.02em',
            margin: '0 0 10px',
          }}>
            {title}
          </h2>
          <p style={{ fontSize: '12px', color: 'var(--color-blue)', opacity: 0.4, margin: 0 }}>{date}</p>
        </div>
      </article>
    </Link>
  )
}
