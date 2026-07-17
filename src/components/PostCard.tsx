'use client'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import { useLanguage } from '@/hooks/useLanguage'

const categoryColors: Record<string, string> = {
  wellness:     'var(--color-wellness)',
  christianity: 'var(--color-christianity)',
  business:     'var(--color-business)',
}

const categoryLabels: Record<string, { en: string; ko: string }> = {
  wellness:     { en: 'Wellness',     ko: '웰니스' },
  christianity: { en: 'Christianity', ko: '신앙' },
  business:     { en: 'Business',     ko: '비즈니스' },
}

export default function PostCard({ post }: { post: any }) {
  const { lang } = useLanguage()
  const title = lang === 'en' ? post.title_en : (post.title_ko || post.title_en)
  const color = categoryColors[post.category]
  const label = categoryLabels[post.category]?.[lang]
  const date = new Date(post.published_at).toLocaleDateString(
    lang === 'ko' ? 'ko-KR' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  )

  return (
    <Link href={`/${post.category}/${post.slug.current}`} className="group block">
      <div className="relative overflow-hidden bg-gray-100 mb-3" style={{ aspectRatio: '16/9' }}>
        {post.cover_image && (
          <Image
            src={urlFor(post.cover_image).width(600).height(338).url()}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <span
          className="absolute top-3 left-3 text-white text-xs font-bold uppercase tracking-widest px-2 py-1"
          style={{ backgroundColor: color }}
        >
          {label}
        </span>
      </div>
      <h3 className={`text-lg font-bold leading-snug group-hover:opacity-70 transition-opacity mb-1 ${lang === 'ko' ? 'font-headline-ko' : 'font-headline-en'}`}>
        {title}
      </h3>
      <p className={`text-xs text-gray-500 ${lang === 'ko' ? 'font-body-ko' : 'font-body-en'}`}>{date}</p>
    </Link>
  )
}
