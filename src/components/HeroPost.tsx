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

export default function HeroPost({ post }: { post: any }) {
  const { lang } = useLanguage()
  const title = lang === 'en' ? post.title_en : (post.title_ko || post.title_en)
  const label = categoryLabels[post.category]?.[lang]

  return (
    <Link href={`/${post.category}/${post.slug.current}`} className="group block relative w-full overflow-hidden bg-black" style={{ aspectRatio: '21/9' }}>
      {post.cover_image && (
        <Image
          src={urlFor(post.cover_image).width(1400).height(600).url()}
          alt={title}
          fill
          priority
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ opacity: 0.6 }}
        />
      )}
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12">
        <span className="text-xs uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.7)' }}>{label}</span>
        <h1 className={`text-3xl md:text-5xl font-bold text-white leading-tight max-w-3xl ${lang === 'ko' ? 'font-headline-ko' : 'font-headline-en'}`}>
          {title}
        </h1>
      </div>
    </Link>
  )
}
