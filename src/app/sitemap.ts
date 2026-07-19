import { MetadataRoute } from 'next'
import { sanityClient } from '@/lib/sanity'
import { allPostsQuery, allCategoriesQuery } from '@/lib/queries'

const BASE_URL = 'https://joeykim.co'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, categories] = await Promise.all([
    sanityClient.fetch(allPostsQuery),
    sanityClient.fetch(allCategoriesQuery),
  ])

  const postUrls: MetadataRoute.Sitemap = posts
    .filter((p: any) => p.slug?.current && p.category?.slug)
    .map((p: any) => ({
      url: `${BASE_URL}/${p.category.slug}/${p.slug.current}`,
      lastModified: new Date(p.published_at),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))

  const categoryUrls: MetadataRoute.Sitemap = categories
    .filter((c: any) => c.slug)
    .map((c: any) => ({
      url: `${BASE_URL}/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))

  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    ...categoryUrls,
    ...postUrls,
  ]
}
