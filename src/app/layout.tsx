import type { Metadata } from 'next'
import { Playfair_Display, Inter, Noto_Serif_KR, Noto_Sans_KR } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/context/LanguageContext'

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', display: 'swap' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const notoSerifKR = Noto_Serif_KR({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-noto-serif-kr', display: 'swap' })
const notoSansKR = Noto_Sans_KR({ subsets: ['latin'], weight: ['400', '500', '700'], variable: '--font-noto-sans-kr', display: 'swap' })

export const metadata: Metadata = {
  title: "Joey's Blog",
  description: 'Wellness, Christianity, Business',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.variable} ${notoSerifKR.variable} ${notoSansKR.variable}`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
