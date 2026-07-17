import { sanityClient } from '@/lib/sanity'
import { allPostsQuery } from '@/lib/queries'

export async function GET() {
  const posts = await sanityClient.fetch(allPostsQuery)
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://joeyblog.com'

  const items = posts
    .filter((post: any) => post.category?.slug && post.slug?.current)
    .map((post: any) => `
    <item>
      <title><![CDATA[${post.title_en}${post.title_ko ? ' / ' + post.title_ko : ''}]]></title>
      <link>${baseUrl}/${post.category.slug}/${post.slug.current}</link>
      <pubDate>${new Date(post.published_at).toUTCString()}</pubDate>
      <guid>${baseUrl}/${post.category.slug}/${post.slug.current}</guid>
    </item>`).join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Joey's Blog</title>
    <link>${baseUrl}</link>
    <description>Wellness, Christianity, Business</description>
    ${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  })
}
