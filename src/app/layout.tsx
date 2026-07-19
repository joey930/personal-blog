import type { Metadata } from 'next'
import { Cormorant_Garamond, Plus_Jakarta_Sans, Noto_Serif_KR, Noto_Sans_KR } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/context/LanguageContext'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { sanityClient } from '@/lib/sanity'
import { allCategoriesQuery } from '@/lib/queries'

// Cormorant Garamond — ultra-elegant high-contrast serif, luxury editorial
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

// Plus Jakarta Sans — modern, clean, widely used in contemporary design
const jakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
})

const notoSerifKR = Noto_Serif_KR({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-noto-serif-kr',
  display: 'swap',
})

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans-kr',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://joeykim.co'),
  title: {
    default: "The Pilgrim's Venture",
    template: "%s | The Pilgrim's Venture",
  },
  description: 'faith, work and the long walk home — reflections on building, believing, and living well by Joey Kim.',
  keywords: ['faith', 'wellness', 'entrepreneurship', 'Korean-American', 'Christianity', 'business', 'personal blog'],
  authors: [{ name: 'Joey Kim', url: 'https://joeykim.co' }],
  creator: 'Joey Kim',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://joeykim.co',
    siteName: "The Pilgrim's Venture",
    title: "The Pilgrim's Venture",
    description: 'faith, work and the long walk home',
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: "The Pilgrim's Venture" }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "The Pilgrim's Venture",
    description: 'faith, work and the long walk home',
    creator: '@joeykim',
  },
  alternates: { canonical: 'https://joeykim.co' },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const categories = await sanityClient.fetch(allCategoriesQuery).catch(() => [])

  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${jakartaSans.variable} ${notoSerifKR.variable} ${notoSansKR.variable}`}>
        <LanguageProvider>
          <Nav categories={categories} />
          {children}
          <Footer categories={categories} />
        </LanguageProvider>
      </body>
    </html>
  )
}
