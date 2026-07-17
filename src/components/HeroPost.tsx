'use client'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import { useLanguage } from '@/hooks/useLanguage'
import type { Post } from '@/lib/types'

export default function HeroPost({ post }: { post: Post }) {
  const { lang } = useLanguage()
  const title = lang === 'en' ? post.title_en : (post.title_ko || post.title_en)
  const label = lang === 'en'
    ? post.category?.name_en
    : (post.category?.name_ko || post.category?.name_en)
  const slug = post.category?.slug

  if (!slug || !post.slug?.current) return null

  return (
    <Link href={`/${slug}/${post.slug.current}`} style={{ textDecoration: 'none', display: 'block' }}>
      <div style={{ border: '1px solid var(--color-border)', backgroundColor: 'var(--color-paper)', marginBottom: '2px', overflowX: 'hidden' }}>
        {/* Grid-texture intro section */}
        <div className="grid-texture hero-padding" style={{ padding: '40px 40px 36px' }}>
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
          }}>
            {label}
          </span>
          <h1 style={{
            fontSize: 'clamp(24px, 4vw, 44px)',
            fontWeight: 800,
            lineHeight: 1.1,
            color: 'var(--color-blue)',
            letterSpacing: '-0.03em',
            margin: '0 0 16px',
            maxWidth: '780px',
          }}>
            {title}
          </h1>
        </div>

        {/* Full-width blue-tinted image */}
        {post.cover_image && (
          <div style={{ position: 'relative', aspectRatio: '21/9', overflow: 'hidden', backgroundColor: '#eee' }}>
            <Image
              src={urlFor(post.cover_image).width(1400).height(600).url()}
              alt={title}
              fill
              priority
              className="object-cover"
            />
          </div>
        )}
      </div>
    </Link>
  )
}
