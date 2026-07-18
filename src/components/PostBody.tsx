'use client'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { useLanguage } from '@/hooks/useLanguage'
import { urlFor } from '@/lib/sanity'

function getYouTubeId(url: string) {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/)
  return match ? match[1] : null
}

function getVimeoId(url: string) {
  const match = url.match(/vimeo\.com\/(\d+)/)
  return match ? match[1] : null
}

const components = {
  block: {
    normal: ({ children }: any) => (
      <p style={{
        marginBottom: '1.6em',
        lineHeight: 1.85,
        color: 'var(--color-text)',
        fontSize: '18px',
        maxWidth: '680px',
        fontFamily: 'var(--font-jakarta)',
      }}>
        {children}
      </p>
    ),
    h2: ({ children }: any) => (
      <h2 style={{
        fontSize: '22px',
        fontWeight: 700,
        color: 'var(--color-text)',
        letterSpacing: '-0.02em',
        margin: '2.5em 0 0.75em',
        fontFamily: 'var(--font-fraunces)',
      }}>{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 style={{
        fontSize: '18px',
        fontWeight: 600,
        color: 'var(--color-text)',
        margin: '2em 0 0.5em',
        fontFamily: 'var(--font-fraunces)',
      }}>{children}</h3>
    ),
    blockquote: ({ children }: any) => (
      <blockquote style={{
        borderLeft: '3px solid var(--color-accent)',
        padding: '24px 0 24px 24px',
        margin: '2em 0',
        fontStyle: 'italic',
        fontSize: '22px',
        lineHeight: 1.55,
        color: 'var(--color-text)',
        fontWeight: 500,
        fontFamily: 'var(--font-fraunces)',
      }}>
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul style={{ paddingLeft: '24px', marginBottom: '1.5em', color: 'var(--color-text)' }}>{children}</ul>,
    number: ({ children }: any) => <ol style={{ paddingLeft: '24px', marginBottom: '1.5em', color: 'var(--color-text)' }}>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => <li style={{ marginBottom: '0.4em', lineHeight: 1.7, fontSize: '17px' }}>{children}</li>,
    number: ({ children }: any) => <li style={{ marginBottom: '0.4em', lineHeight: 1.7, fontSize: '17px' }}>{children}</li>,
  },
  types: {
    image: ({ value }: any) => (
      <figure style={{ margin: '2em 0' }}>
        <div style={{ position: 'relative', width: '100%', backgroundColor: '#eee' }}>
          <Image
            src={urlFor(value).width(900).url()}
            alt={value.alt || ''}
            width={900}
            height={0}
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>
        {value.caption && (
          <figcaption style={{ fontSize: '13px', color: 'var(--color-text)', opacity: 0.5, marginTop: '8px', fontStyle: 'italic' }}>
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
    videoEmbed: ({ value }: any) => {
      if (!value?.url) return null
      const ytId = getYouTubeId(value.url)
      const vimeoId = getVimeoId(value.url)
      const src = ytId
        ? `https://www.youtube.com/embed/${ytId}`
        : vimeoId
        ? `https://player.vimeo.com/video/${vimeoId}`
        : null
      if (!src) return null
      return (
        <figure style={{ margin: '2em 0' }}>
          <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', border: '1px solid var(--color-border)' }}>
            <iframe
              src={src}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          {value.caption && (
            <figcaption style={{ fontSize: '13px', color: 'var(--color-text)', opacity: 0.5, marginTop: '8px', fontStyle: 'italic' }}>
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
}

export default function PostBody({ bodyEn, bodyKo }: { bodyEn: any; bodyKo: any }) {
  const { lang } = useLanguage()
  const body = lang === 'ko' && bodyKo?.length ? bodyKo : bodyEn
  if (!body?.length) return null

  return (
    <div style={{ color: 'var(--color-text)', maxWidth: '680px' }}>
      <style>{`
        .drop-cap-body > div:first-child p:first-child::first-letter {
          font-size: 4.5em;
          font-weight: 700;
          float: left;
          line-height: 0.8;
          margin: 0.05em 0.08em 0 0;
          color: var(--color-text);
        }
      `}</style>
      <div className="drop-cap-body">
        <PortableText value={body} components={components} />
      </div>
    </div>
  )
}
