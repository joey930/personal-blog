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

export default function PostBody({ bodyEn, bodyKo }: { bodyEn: any; bodyKo: any }) {
  const { lang } = useLanguage()
  const body = lang === 'ko' && bodyKo?.length ? bodyKo : bodyEn
  if (!body?.length) return null

  const isKo = lang === 'ko'

  // Typography tokens per language
  const t = isKo ? {
    bodyFont:    'var(--font-noto-sans-kr), sans-serif',
    bodyWeight:  400,
    headFont:    'var(--font-noto-serif-kr), serif',
    bodySize:    '17px',
    bodyLine:    2.05,
    h2Size:      '21px',
    h2Spacing:   '0em',
    h2Line:      1.5,
    h3Size:      '18px',
    h3Spacing:   '0em',
    h3Line:      1.5,
    quoteSize:   '20px',
    quoteLine:   1.8,
    listSize:    '16px',
    listLine:    2.0,
  } : {
    bodyFont:    'var(--font-jakarta), system-ui, sans-serif',
    bodyWeight:  300,
    headFont:    'var(--font-fraunces), Georgia, serif',
    bodySize:    '18px',
    bodyLine:    1.85,
    h2Size:      '24px',
    h2Spacing:   '-0.02em',
    h2Line:      1.2,
    h3Size:      '19px',
    h3Spacing:   '-0.01em',
    h3Line:      1.25,
    quoteSize:   '22px',
    quoteLine:   1.55,
    listSize:    '17px',
    listLine:    1.8,
  }

  const components = {
    block: {
      normal: ({ children }: any) => (
        <p style={{
          marginBottom: '1.6em',
          lineHeight: t.bodyLine,
          color: 'var(--color-text)',
          fontSize: t.bodySize,
          fontFamily: t.bodyFont,
          fontWeight: t.bodyWeight,
          wordBreak: isKo ? 'keep-all' : 'normal',
        }}>
          {children}
        </p>
      ),
      h2: ({ children }: any) => (
        <h2 style={{
          fontSize: t.h2Size,
          fontWeight: 700,
          color: 'var(--color-text)',
          letterSpacing: t.h2Spacing,
          lineHeight: t.h2Line,
          margin: '2.5em 0 0.75em',
          fontFamily: t.headFont,
        }}>{children}</h2>
      ),
      h3: ({ children }: any) => (
        <h3 style={{
          fontSize: t.h3Size,
          fontWeight: 600,
          color: 'var(--color-text)',
          letterSpacing: t.h3Spacing,
          lineHeight: t.h3Line,
          margin: '2em 0 0.5em',
          fontFamily: t.headFont,
        }}>{children}</h3>
      ),
      blockquote: ({ children }: any) => (
        <blockquote style={{
          borderLeft: '3px solid var(--color-accent)',
          padding: '20px 0 20px 28px',
          margin: '2.5em 0',
          fontStyle: isKo ? 'normal' : 'italic',
          fontSize: t.quoteSize,
          lineHeight: t.quoteLine,
          color: 'var(--color-text)',
          fontWeight: 500,
          fontFamily: t.headFont,
          wordBreak: isKo ? 'keep-all' : 'normal',
        }}>
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }: any) => (
        <ul style={{ paddingLeft: '24px', marginBottom: '1.5em', color: 'var(--color-text)', fontFamily: t.bodyFont }}>
          {children}
        </ul>
      ),
      number: ({ children }: any) => (
        <ol style={{ paddingLeft: '24px', marginBottom: '1.5em', color: 'var(--color-text)', fontFamily: t.bodyFont }}>
          {children}
        </ol>
      ),
    },
    listItem: {
      bullet: ({ children }: any) => (
        <li style={{ marginBottom: '0.5em', lineHeight: t.listLine, fontSize: t.listSize, fontFamily: t.bodyFont }}>{children}</li>
      ),
      number: ({ children }: any) => (
        <li style={{ marginBottom: '0.5em', lineHeight: t.listLine, fontSize: t.listSize, fontFamily: t.bodyFont }}>{children}</li>
      ),
    },
    types: {
      image: ({ value }: any) => (
        <figure style={{ margin: '2.5em 0' }}>
          <div style={{ position: 'relative', width: '100%', backgroundColor: '#eee', borderRadius: '6px', overflow: 'hidden' }}>
            <Image
              src={urlFor(value).width(900).url()}
              alt={value.alt || ''}
              width={900}
              height={0}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
          {value.caption && (
            <figcaption style={{ fontSize: '13px', color: 'var(--color-muted)', marginTop: '10px', fontStyle: isKo ? 'normal' : 'italic', fontFamily: t.bodyFont }}>
              {value.caption}
            </figcaption>
          )}
        </figure>
      ),
      videoEmbed: ({ value }: any) => {
        if (!value?.url) return null
        const ytId = getYouTubeId(value.url)
        const vimeoId = getVimeoId(value.url)
        const src = ytId ? `https://www.youtube.com/embed/${ytId}` : vimeoId ? `https://player.vimeo.com/video/${vimeoId}` : null
        if (!src) return null
        return (
          <figure style={{ margin: '2.5em 0' }}>
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '6px' }}>
              <iframe src={src} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            </div>
            {value.caption && (
              <figcaption style={{ fontSize: '13px', color: 'var(--color-muted)', marginTop: '10px', fontFamily: t.bodyFont }}>
                {value.caption}
              </figcaption>
            )}
          </figure>
        )
      },
    },
  }

  return (
    <div style={{ color: 'var(--color-text)' }}>
      {!isKo && (
        <style>{`
          .drop-cap-body > div:first-child p:first-child::first-letter {
            font-family: var(--font-fraunces);
            font-size: 4.2em;
            font-weight: 700;
            float: left;
            line-height: 0.82;
            margin: 0.04em 0.1em 0 0;
            color: var(--color-text);
          }
        `}</style>
      )}
      <div className={isKo ? 'post-body-ko' : 'drop-cap-body post-body-en'}>
        <PortableText value={body} components={components} />
      </div>
    </div>
  )
}
