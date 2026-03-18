import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Navbar() {
  const router = useRouter()
  const links = [
    { label: 'Prêts',   href: '/'        },
    { label: 'Staking', href: '/staking' },
    { label: 'Blog',    href: '/blog'    },
    { label: 'FAQ',     href: '/faq'     },
  ]

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      height: '52px', background: '#fff',
      borderBottom: '1px solid #F0F0F0',
      display: 'flex', alignItems: 'center',
      padding: '0 28px',
    }}>
      <Link href="/" style={{ textDecoration: 'none', marginRight: '32px' }}>
        <span style={{ fontSize: '17px', fontWeight: '800', color: '#111', letterSpacing: '-0.5px' }}>Nantix</span>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        {links.map(item => {
          const active = router.pathname === item.href
          return (
            <Link key={item.href} href={item.href} style={{
              display: 'flex', alignItems: 'center', height: '100%',
              padding: '0 14px',
              fontSize: '13px', fontWeight: active ? '600' : '500',
              color: active ? '#111' : '#999',
              textDecoration: 'none',
              borderBottom: `2px solid ${active ? '#111' : 'transparent'}`,
              transition: 'all .15s',
            }}>{item.label}</Link>
          )
        })}
      </div>
    </nav>
  )
}
