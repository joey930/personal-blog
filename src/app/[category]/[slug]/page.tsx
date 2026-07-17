import { notFound } from 'next/navigation'
import Image from 'next/image'
import { sanityClient, urlFor } from '@/lib/sanity'
import { postBySlugQuery, allPostsQuery } from '@/lib/queries'
import PostBody from '@/components/PostBody'
import type { Metadata } from 'next'

export const revalidate = 60

export default async function PostPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>
}) {
  const { slug } = await params
  const post = await sanityClient.fetch(postBySlugQuery, { slug })
  if (!post) notFound()

  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <header className="mb-8">
        <span className="text-xs uppercase tracking-widest mb-3 block" style={{ color: '#9ca3af' }}>
          {post.category}
        </span>
        <h1 className="font-headline-en text-4xl md:text-5xl font-bold leading-tight mb-2">
          {post.title_en}
        </h1>
        {post.title_ko && (
          <h2 className="font-headline-ko text-2xl mb-4" style={{ color: '#6b7280' }}>
            {post.title_ko}
          </h2>
        )}
        <p className="text-sm" style={{ color: '#9ca3af' }}>
          {new Date(post.published_at).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric',
          })}
        </p>
      </header>

      {post.cover_image && (
        <div className="relative w-full mb-10 overflow-hidden" style={{ aspectRatio: '16/9' }}>
          <Image
            src={urlFor(post.cover_image).width(900).height(506).url()}
            alt={post.title_en}
            fill
            priority
            className="object-cover"
          />
        </div>
      )}

      <PostBody bodyEn={post.body_en} bodyKo={post.body_ko} />

      {post.author_note && (
        <aside className="mt-12 pl-4 italic text-sm" style={{ borderLeft: '4px solid #e5e7eb', color: '#6b7280' }}>
          {post.author_note}
        </aside>
      )}
    </article>
  )
}

export async function generateStaticParams() {
  const posts = await sanityClient.fetch(allPostsQuery)
  return posts.map((p: any) => ({ category: p.category, slug: p.slug.current }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await sanityClient.fetch(postBySlugQuery, { slug })
  if (!post) return {}
  return {
    title: post.title_en,
    openGraph: {
      title: post.title_en,
      images: post.cover_image
        ? [urlFor(post.cover_image).width(1200).height(630).url()]
        : [],
    },
  }
}
