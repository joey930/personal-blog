'use client'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import { useLanguage } from '@/hooks/useLanguage'

const categoryLabels: Record<string, { en: string; ko: string }> = {
  wellness:     { en: 'Wellness',     ko: '웰니스' },
  christianity: { en: 'Christianity', ko: '신앙' },
  business:     { en: 'Business',     ko: '비즈니스' },
}

export default function PostCard({ post }: { post: any }) {
  const { lang } = useLanguage()
  const title = lang === 'en' ? post.title_en : (post.title_ko || post.title_en)
  const label = categoryLabels[post.category]?.[lang]
  const date = new Date(post.published_at).toLocaleDateString(
    lang === 'ko' ? 'ko-KR' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  )

  return (
    <Link href={`/${post.category}/${post.slug?.current ?? ''}`} style={{ textDecoration: 'none', display: 'block' }}>
      <article style={{
        border: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-paper)',
        overflow: 'hidden',
      }}>
        {/* Grid texture header with category + title */}
        <div className="grid-texture" style={{
          padding: '32px 28px 28px',
          borderBottom: '1px solid var(--color-border)',
        }}>
          {/* Category pill */}
          <span style={{
            display: 'inline-block',
            fontSize: '11px',
            fontWeight: 500,
            color: 'var(--color-blue)',
            border: '1px solid var(--color-blue)',
            borderRadius: '999px',
            padding: '2px 10px',
            marginBottom: '14px',
            textTransform: 'capitalize',
            letterSpacing: '0.03em',
          }}>
            {label}
          </span>
          <h2 style={{
            fontSize: '22px',
            fontWeight: 700,
            lineHeight: 1.25,
            color: 'var(--color-blue)',
            letterSpacing: '-0.02em',
            margin: 0,
          }}>
            {title}
          </h2>
        </div>

        {/* Cover image with blue tint */}
        {post.cover_image && (
          <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden', backgroundColor: 'var(--color-blue)' }}>
            <Image
              src={urlFor(post.cover_image).width(600).height(338).url()}
              alt={title}
              fill
              className="object-cover"
              style={{ mixBlendMode: 'multiply', opacity: 0.85 }}
            />
          </div>
        )}

        {/* Date footer */}
        <div style={{ padding: '12px 28px', borderTop: '1px solid var(--color-border)' }}>
          <span style={{ fontSize: '12px', color: 'var(--color-blue)', opacity: 0.6 }}>{date}</span>
        </div>
      </article>
    </Link>
  )
}
