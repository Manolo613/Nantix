import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid #F0F0F0',
      padding: '28px 32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '16px',
      background: '#fff',
    }}>
      <span style={{ fontSize: '15px', fontWeight: '800', color: '#111', letterSpacing: '-0.4px' }}>
        Nantix
      </span>
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        {[
          { label: 'Emprunter', href: '/' },
          { label: 'Prêter',    href: '/preter' },
          { label: 'Staker',    href: '/staker' },
          { label: 'Blog',      href: '/blog' },
          { label: 'FAQ',       href: '/faq' },
          { label: 'Mentions légales', href: '/mentions-legales' },
          { label: 'Affiliations',     href: '/affiliations' },
        ].map(item => (
          <Link key={item.label} href={item.href} style={{ fontSize: '12px', color: '#BBB', textDecoration: 'none' }}>
            {item.label}
          </Link>
        ))}
      </div>
      <span style={{ fontSize: '12px', color: '#CCC' }}>
        © 2025 Nantix · Comparateur indépendant · Pas un conseil financier
      </span>
    </footer>
  )
}
