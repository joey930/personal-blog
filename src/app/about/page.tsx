import { sanityClient, urlFor } from '@/lib/sanity'
import { aboutQuery } from '@/lib/queries'
import Image from 'next/image'
import AboutBody from '@/components/AboutBody'

export const revalidate = 3600

export default async function AboutPage() {
  const about = await sanityClient.fetch(aboutQuery)

  return (
    <main className="max-w-2xl mx-auto px-4 py-16">
      {about?.photo && (
        <div className="relative w-32 h-32 rounded-full overflow-hidden mb-8 mx-auto">
          <Image
            src={urlFor(about.photo).width(256).height(256).url()}
            alt="Joey"
            fill
            className="object-cover"
          />
        </div>
      )}
      <h1 className="font-headline-en text-3xl font-bold text-center mb-2">Joey</h1>
      {about && <AboutBody bioEn={about.bio_en} bioKo={about.bio_ko} />}
      {!about && (
        <p className="text-center mt-8" style={{ color: '#9ca3af' }}>
          About page coming soon.
        </p>
      )}
    </main>
  )
}
