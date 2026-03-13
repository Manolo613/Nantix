import Link from 'next/link'
 
export default function Footer() {
  return (
    <footer style={{
      background: 'var(--ink)',
      color: 'white',
      padding: '60px 40px 40px',
      marginTop: '0',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr',
          gap: '60px',
          marginBottom: '60px',
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                background: 'var(--teal-light)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 2L15 6V12L9 16L3 12V6L9 2Z" fill="white" fillOpacity="0.9"/>
                  <path d="M9 5L12 7.5V10.5L9 13L6 10.5V7.5L9 5Z" fill="white"/>
                </svg>
              </div>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '20px',
                fontWeight: '600',
                color: 'white',
              }}>Nantix</span>
            </div>
            <p style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: '14px',
              lineHeight: '1.7',
              maxWidth: '280px',
            }}>
              Le comparateur de référence pour les prêts adossés à votre Bitcoin. Transparent, indépendant, en français.
            </p>
          </div>
 
          {/* Links */}
          <div>
            <p style={{ fontSize: '12px', fontWeight: '600', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>Navigation</p>
            {['Comparateur', 'Blog', 'FAQ'].map(item => (
              <Link key={item} href={`/${item.toLowerCase()}`} style={{
                display: 'block',
                color: 'rgba(255,255,255,0.6)',
                fontSize: '14px',
                marginBottom: '10px',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.target.style.color = 'white'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.6)'}
              >{item}</Link>
            ))}
          </div>
 
          {/* Legal */}
          <div>
            <p style={{ fontSize: '12px', fontWeight: '600', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>Légal</p>
            {['Mentions légales', 'Confidentialité', 'Affiliations'].map(item => (
              <Link key={item} href="#" style={{
                display: 'block',
                color: 'rgba(255,255,255,0.6)',
                fontSize: '14px',
                marginBottom: '10px',
              }}>{item}</Link>
            ))}
          </div>
        </div>
 
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: '30px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px' }}>
            © 2025 Nantix. Comparateur indépendant. Liens affiliés présents.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px' }}>
            Pas un conseil financier.
          </p>
        </div>
      </div>
    </footer>
  )
}
 
