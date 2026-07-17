import { sanityClient } from '@/lib/sanity'
import { featuredPostQuery, allPostsQuery } from '@/lib/queries'
import HeroPost from '@/components/HeroPost'
import PostCard from '@/components/PostCard'

export const revalidate = 60

export default async function HomePage() {
  const [featured, posts] = await Promise.all([
    sanityClient.fetch(featuredPostQuery),
    sanityClient.fetch(allPostsQuery),
  ])
  const remaining = posts.filter((p: any) => p._id !== featured?._id)

  return (
    <main>
      {featured && <HeroPost post={featured} />}
      {!featured && (
        <div className="flex items-center justify-center h-64 bg-gray-50">
          <p className="text-gray-400 text-lg">No posts yet — add one in Sanity Studio.</p>
        </div>
      )}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {remaining.map((post: any) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </section>
    </main>
  )
}
