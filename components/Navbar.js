import { useState } from 'react'
import Link from 'next/link'
 
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
 
  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        background: 'rgba(245, 239, 230, 0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--cream-border)',
        height: '56px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 40px',
      }}>
        <div style={{
          maxWidth: '1400px',
          width: '100%',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
 
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <div style={{
              width: '32px', height: '32px',
              background: 'var(--teal)',
              borderRadius: '8px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontWeight: '700', fontSize: '16px',
            }}>N</div>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: '20px',
              fontWeight: '500',
              color: 'var(--ink)',
              letterSpacing: '-0.5px',
            }}>Nantix</span>
          </Link>
 
          {/* Liens desktop */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            {[
              { label: 'Blog',  href: '/blog' },
              { label: 'FAQ',   href: '/faq'  },
            ].map(link => (
              <Link key={link.href} href={link.href} style={{
                fontSize: '14px',
                fontWeight: '500',
                color: 'var(--ink-muted)',
                textDecoration: 'none',
                transition: 'color 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--ink)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--ink-muted)'}
              >{link.label}</Link>
            ))}
          </div>
 
        </div>
      </nav>
    </>
  )
}
