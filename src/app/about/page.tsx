import { sanityClient, urlFor } from '@/lib/sanity'
import { aboutQuery } from '@/lib/queries'
import Image from 'next/image'
import AboutBody from '@/components/AboutBody'

export const revalidate = 3600

export default async function AboutPage() {
  const about = await sanityClient.fetch(aboutQuery)

  return (
    <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
      <div className="grid-texture" style={{
        border: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-paper)',
        padding: '48px',
        marginBottom: '2px',
      }}>
        {about?.photo && (
          <div style={{
            position: 'relative',
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            overflow: 'hidden',
            backgroundColor: '#eee',
            marginBottom: '24px',
          }}>
            <Image
              src={urlFor(about.photo).width(240).height(240).url()}
              alt="Joey"
              fill
              className="object-cover"
            />
          </div>
        )}
        <h1 style={{
          fontSize: '48px',
          fontWeight: 700,
          color: 'var(--color-blue)',
          letterSpacing: '-0.03em',
          margin: '0 0 8px',
        }}>Joey</h1>
      </div>
      {about && (
        <div style={{
          border: '1px solid var(--color-border)',
          borderTop: 'none',
          backgroundColor: 'var(--color-paper)',
          padding: '48px',
          maxWidth: '720px',
        }}>
          <AboutBody bioEn={about.bio_en} bioKo={about.bio_ko} />
        </div>
      )}
      {!about && (
        <div style={{ padding: '48px', textAlign: 'center', opacity: 0.4, color: 'var(--color-blue)' }}>
          About page coming soon.
        </div>
      )}
    </main>
  )
}
