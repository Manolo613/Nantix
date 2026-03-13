import Link from 'next/link'
import { useRouter } from 'next/router'
 
export default function Navbar() {
  const router = useRouter()
 
  return (
    <nav style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 100,
      height: '56px',
      background: '#FFFFFF',
      borderBottom: '1px solid #E1E8F0',
      boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 32px',
    }}>
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
        <div style={{
          width: '28px', height: '28px',
          background: '#0D7A4E',
          borderRadius: '8px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1L13 4V10L7 13L1 10V4L7 1Z" stroke="white" strokeWidth="1.5" fill="none"/>
            <circle cx="7" cy="7" r="2" fill="white"/>
          </svg>
        </div>
        <span style={{ fontSize: '17px', fontWeight: '700', color: '#0D1117', letterSpacing: '-0.4px' }}>Nantix</span>
      </Link>
 
      <div style={{ display: 'flex', gap: '4px', marginLeft: 'auto', alignItems: 'center' }}>
        {[
          { label: 'Comparateur', href: '/comparateur' },
          { label: 'Blog', href: '/blog' },
          { label: 'FAQ', href: '/faq' },
        ].map(item => {
          const active = router.pathname === item.href
          return (
            <Link key={item.href} href={item.href} style={{
              fontSize: '13px', fontWeight: '500',
              color: active ? '#0D7A4E' : '#8896A7',
              padding: '6px 12px', borderRadius: '6px',
              background: active ? '#E6F5EF' : 'transparent',
              transition: 'all 0.15s', textDecoration: 'none',
            }}>{item.label}</Link>
          )
        })}
        <Link href="/comparateur" style={{
          marginLeft: '8px',
          background: '#0D7A4E', color: 'white',
          padding: '8px 18px', borderRadius: '8px',
          fontSize: '13px', fontWeight: '600',
          textDecoration: 'none',
        }}>Comparer maintenant</Link>
      </div>
    </nav>
  )
}
