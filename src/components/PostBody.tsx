'use client'
import { PortableText } from '@portabletext/react'
import { useLanguage } from '@/hooks/useLanguage'

const components = {
  block: {
    normal: ({ children, index }: any) => (
      <p style={{
        marginBottom: '1.5em',
        lineHeight: 1.75,
        color: 'var(--color-blue)',
        fontSize: '17px',
      }}>
        {children}
      </p>
    ),
    h2: ({ children }: any) => (
      <h2 style={{
        fontSize: '22px',
        fontWeight: 700,
        color: 'var(--color-blue)',
        letterSpacing: '-0.02em',
        margin: '2.5em 0 0.75em',
      }}>{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 style={{
        fontSize: '18px',
        fontWeight: 600,
        color: 'var(--color-blue)',
        margin: '2em 0 0.5em',
      }}>{children}</h3>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="grid-texture" style={{
        border: '1px solid var(--color-border)',
        padding: '32px 36px',
        margin: '2em 0',
        fontStyle: 'italic',
        fontSize: '20px',
        lineHeight: 1.55,
        color: 'var(--color-blue)',
        fontWeight: 500,
      }}>
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul style={{ paddingLeft: '24px', marginBottom: '1.5em', color: 'var(--color-blue)' }}>{children}</ul>,
    number: ({ children }: any) => <ol style={{ paddingLeft: '24px', marginBottom: '1.5em', color: 'var(--color-blue)' }}>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => <li style={{ marginBottom: '0.4em', lineHeight: 1.7, fontSize: '17px' }}>{children}</li>,
    number: ({ children }: any) => <li style={{ marginBottom: '0.4em', lineHeight: 1.7, fontSize: '17px' }}>{children}</li>,
  },
}

export default function PostBody({ bodyEn, bodyKo }: { bodyEn: any; bodyKo: any }) {
  const { lang } = useLanguage()
  const body = lang === 'ko' && bodyKo?.length ? bodyKo : bodyEn
  if (!body?.length) return null

  return (
    <div style={{ color: 'var(--color-blue)' }}>
      <style>{`
        .drop-cap-body > div:first-child p:first-child::first-letter {
          font-size: 4.5em;
          font-weight: 700;
          float: left;
          line-height: 0.8;
          margin: 0.05em 0.08em 0 0;
          color: var(--color-blue);
        }
      `}</style>
      <div className="drop-cap-body">
        <PortableText value={body} components={components} />
      </div>
    </div>
  )
}
