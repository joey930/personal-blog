export default function Footer({ categories }: { categories: { _id: string; name_en: string; name_ko?: string; slug: string }[] }) {
  return (
    <footer style={{
      backgroundColor: 'var(--color-bg)',
      marginTop: '60px',
      paddingTop: '40px',
      borderTop: '1px solid var(--color-border)',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px 40px',
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gap: '32px',
        alignItems: 'start',
      }}>
        {/* Left: brand */}
        <div>
          <p style={{ fontWeight: 700, fontSize: '15px', letterSpacing: '-0.02em', color: 'var(--color-text)', margin: '0 0 4px', fontFamily: 'var(--font-fraunces)' }}>
            The Pilgrim&apos;s Venture
          </p>
          <p style={{ fontSize: '13px', fontStyle: 'italic', color: 'var(--color-muted)', margin: '0 0 20px' }}>
            faith, work and the long walk home
          </p>
          {categories.length > 0 && (
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              {categories.map(cat => (
                <a key={cat._id} href={`/${cat.slug}`} style={{ fontSize: '13px', color: 'var(--color-muted)', textDecoration: 'none' }}>
                  {cat.name_en}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Right: copyright */}
        <p style={{ fontSize: '12px', color: 'var(--color-muted)', whiteSpace: 'nowrap', margin: 0 }}>
          © {new Date().getFullYear()} joeykim.co
        </p>
      </div>
    </footer>
  )
}
