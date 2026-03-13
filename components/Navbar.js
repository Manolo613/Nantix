import Link from 'next/link'
 
export default function Navbar() {
  return (
    <nav style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 100,
      height: '52px',
      background: '#fff',
      borderBottom: '1px solid #F2F2F2',
      display: 'flex',
      alignItems: 'center',
      padding: '0 32px',
    }}>
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
        <span style={{ fontSize: '17px', fontWeight: '800', color: '#111', letterSpacing: '-0.5px' }}>Nantix</span>
      </Link>
 
      <div style={{ display: 'flex', gap: '24px', marginLeft: 'auto', alignItems: 'center' }}>
        {[
          { label: 'Blog', href: '/blog' },
          { label: 'FAQ',  href: '/faq'  },
        ].map(item => (
          <Link key={item.href} href={item.href} style={{
            fontSize: '13px',
            fontWeight: '500',
            color: '#999',
            textDecoration: 'none',
          }}>{item.label}</Link>
        ))}
      </div>
    </nav>
  )
}
