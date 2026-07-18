'use client'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import { useLanguage } from '@/hooks/useLanguage'
import type { Post } from '@/lib/types'

export default function HeroPost({ post }: { post: Post }) {
  const { lang } = useLanguage()
  const title = lang === 'en' ? post.title_en : (post.title_ko || post.title_en)
  const label = lang === 'en' ? post.category?.name_en : (post.category?.name_ko || post.category?.name_en)
  const slug = post.category?.slug

  if (!slug || !post.slug?.current) return null

  return (
    <Link href={`/${slug}/${post.slug.current}`} style={{ textDecoration: 'none', display: 'block', marginBottom: '40px' }}>
      {post.cover_image && (
        <div style={{ position: 'relative', aspectRatio: '16/7', overflow: 'hidden', borderRadius: '8px', backgroundColor: '#ddd', marginBottom: '20px' }}>
          <Image
            src={urlFor(post.cover_image).width(1400).height(600).url()}
            alt={title}
            fill
            priority
            className="object-cover"
          />
        </div>
      )}
      <p style={{
        fontSize: '12px',
        fontWeight: 600,
        color: 'var(--color-accent)',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        margin: '0 0 10px',
      }}>
        {label}
      </p>
      <h2 style={{
        fontFamily: 'var(--font-fraunces)',
        fontSize: 'clamp(24px, 4vw, 42px)',
        fontWeight: 700,
        lineHeight: 1.15,
        color: 'var(--color-text)',
        letterSpacing: '-0.03em',
        margin: 0,
        maxWidth: '780px',
      }}>
        {title}
      </h2>
    </Link>
  )
}
