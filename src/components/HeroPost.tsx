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
      <div style={{ backgroundColor: 'var(--color-paper)', overflow: 'hidden' }}>
        {/* Text section */}
        <div className="hero-padding" style={{ padding: '36px 40px 28px' }}>
          <p style={{
            fontSize: '11px',
            fontWeight: 600,
            color: 'var(--color-blue)',
            opacity: 0.45,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            margin: '0 0 14px',
          }}>
            {label}
          </p>
          <h2 style={{
            fontSize: 'clamp(24px, 4vw, 44px)',
            fontWeight: 800,
            lineHeight: 1.1,
            color: 'var(--color-blue)',
            letterSpacing: '-0.03em',
            margin: 0,
            maxWidth: '780px',
          }}>
            {title}
          </h2>
        </div>

        {/* Image */}
        {post.cover_image && (
          <div style={{ position: 'relative', aspectRatio: '16/7', overflow: 'hidden', backgroundColor: '#ddd' }}>
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
