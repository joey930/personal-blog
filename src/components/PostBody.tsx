'use client'
import { PortableText } from '@portabletext/react'
import { useLanguage } from '@/hooks/useLanguage'

export default function PostBody({ bodyEn, bodyKo }: { bodyEn: any; bodyKo: any }) {
  const { lang } = useLanguage()
  const body = lang === 'ko' && bodyKo?.length ? bodyKo : bodyEn

  if (!body?.length) return null

  return (
    <div className={`prose prose-lg max-w-none ${lang === 'ko' ? 'font-body-ko' : 'font-body-en'}`}>
      <PortableText value={body} />
    </div>
  )
}
