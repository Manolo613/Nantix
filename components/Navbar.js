import { useState } from 'react'
import Link from 'next/link'
 
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
 
  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: 'rgba(245, 239, 230, 0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--cream-border)',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 40px',
      }}>
        <div style={{
          maxWidth: '1200px',
          width: '100%',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              background: 'var(--teal)',
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
              color: 'var(--ink)',
              letterSpacing: '-0.3px',
            }}>Nantix</span>
          </Link>
 
          {/* Desktop Nav */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
          }} className="desktop-nav">
            <Link href="/comparateur" style={{
              fontSize: '15px',
              color: 'var(--ink-light)',
              fontWeight: '500',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.target.style.color = 'var(--ink)'}
            onMouseLeave={e => e.target.style.color = 'var(--ink-light)'}
            >Comparateur</Link>
            <Link href="/blog" style={{
              fontSize: '15px',
              color: 'var(--ink-light)',
              fontWeight: '500',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.target.style.color = 'var(--ink)'}
            onMouseLeave={e => e.target.style.color = 'var(--ink-light)'}
            >Blog</Link>
            <Link href="/faq" style={{
              fontSize: '15px',
              color: 'var(--ink-light)',
              fontWeight: '500',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.target.style.color = 'var(--ink)'}
            onMouseLeave={e => e.target.style.color = 'var(--ink-light)'}
            >FAQ</Link>
          </div>
 
          {/* CTA */}
          <Link href="/comparateur" style={{
            background: 'var(--teal)',
            color: 'white',
            padding: '10px 22px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            letterSpacing: '0.2px',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.target.style.background = 'var(--teal-hover)'}
          onMouseLeave={e => e.target.style.background = 'var(--teal)'}
          >Comparer maintenant</Link>
        </div>
      </nav>
 
      <style jsx global>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
        }
      `}</style>
    </>
  )
}
