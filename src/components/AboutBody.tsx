'use client'
import { PortableText } from '@portabletext/react'
import { useLanguage } from '@/hooks/useLanguage'

export default function AboutBody({ bioEn, bioKo }: { bioEn: any; bioKo: any }) {
  const { lang } = useLanguage()
  const bio = lang === 'ko' && bioKo?.length ? bioKo : bioEn
  if (!bio?.length) return null
  return (
    <div className={`prose prose-lg mx-auto mt-6 ${lang === 'ko' ? 'font-body-ko' : 'font-body-en'}`}>
      <PortableText value={bio} />
    </div>
  )
}
