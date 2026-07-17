import { notFound } from 'next/navigation'
import { sanityClient } from '@/lib/sanity'
import { postsByCategoryQuery } from '@/lib/queries'
import PostCard from '@/components/PostCard'

const VALID_CATEGORIES = ['wellness', 'christianity', 'business']

const categoryTitles: Record<string, { en: string; ko: string; color: string }> = {
  wellness:     { en: 'Wellness',     ko: '웰니스',   color: 'var(--color-wellness)' },
  christianity: { en: 'Christianity', ko: '신앙',     color: 'var(--color-christianity)' },
  business:     { en: 'Business',     ko: '비즈니스', color: 'var(--color-business)' },
}

export const revalidate = 60

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  if (!VALID_CATEGORIES.includes(category)) notFound()

  const posts = await sanityClient.fetch(postsByCategoryQuery, { category })
  const titles = categoryTitles[category]

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <header className="mb-10 pb-6" style={{ borderBottom: '2px solid', borderColor: titles.color }}>
        <h1 className="font-headline-en text-4xl font-bold" style={{ color: 'var(--color-ink)' }}>
          {titles.en}
          <span className="font-headline-ko ml-3 text-2xl" style={{ color: '#9ca3af' }}>/ {titles.ko}</span>
        </h1>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post: any) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
      {posts.length === 0 && (
        <p className="text-center py-20" style={{ color: '#9ca3af' }}>No posts yet.</p>
      )}
    </main>
  )
}

export async function generateStaticParams() {
  return VALID_CATEGORIES.map(category => ({ category }))
}
