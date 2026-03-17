import Link from 'next/link'

export default function Navbar() {
  return (
    <nav style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 100,
      height: '52px',
      background: '#fff',
      borderBottom: '1px solid #F0F0F0',
    }}>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '0 24px',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontSize: '17px', fontWeight: '800', color: '#111', letterSpacing: '-0.5px' }}>Nantix</span>
        </Link>
        <div style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
          <Link href="/preter" style={{ fontSize: '13px', fontWeight: '500', color: '#999', textDecoration: 'none' }}>Prêter</Link>
          <Link href="/staker" style={{ fontSize: '13px', fontWeight: '500', color: '#999', textDecoration: 'none' }}>Staker</Link>
          <Link href="/blog"   style={{ fontSize: '13px', fontWeight: '500', color: '#999', textDecoration: 'none' }}>Blog</Link>
          <Link href="/faq"    style={{ fontSize: '13px', fontWeight: '500', color: '#999', textDecoration: 'none' }}>FAQ</Link>
        </div>
      </div>
    </nav>
  )
}
