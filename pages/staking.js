import Head from 'next/head'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Staking() {
  return (
    <>
      <Head>
        <title>Nantix — Staking crypto</title>
      </Head>
      <Navbar />
      <main style={{ background: '#fff', minHeight: '100vh', paddingTop: '52px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '40px', fontWeight: '800', letterSpacing: '-1.5px', color: '#111', marginBottom: '16px' }}>
            Staking crypto
          </h1>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: '#F5F5F5', border: '1px solid #E8E8E8',
            borderRadius: '20px', padding: '6px 14px',
            fontSize: '12px', fontWeight: '700', color: '#888',
            textTransform: 'uppercase', letterSpacing: '0.8px',
            marginBottom: '32px',
          }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#D1D5DB' }} />
            Bientôt disponible
          </div>
          <div>
            <a href="/" style={{ fontSize: '13px', color: '#888', textDecoration: 'none', fontWeight: '600', display: 'block' }}
              onMouseEnter={e => e.currentTarget.style.color = '#111'}
              onMouseLeave={e => e.currentTarget.style.color = '#888'}>
              ← Retour au comparateur
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
