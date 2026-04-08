import Head from 'next/head'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Preter() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = () => {
    if (email.includes('@')) setSent(true)
  }

  return (
    <>
      <Head>
        <title>Nantix — Prêter sa crypto</title>
        <meta name="description" content="Comparez les meilleurs APY pour prêter votre crypto. Bientôt sur Nantix." />
      </Head>
      <Navbar />

      <main style={{ background: '#fff', minHeight: '100vh', paddingTop: '52px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 24px' }}>
          <div style={{ maxWidth: '420px', width: '100%', textAlign: 'center' }}>

            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: '#F5F5F5', border: '1px solid #E8E8E8',
              borderRadius: '20px', padding: '5px 12px',
              fontSize: '11px', fontWeight: '700', color: '#888',
              textTransform: 'uppercase', letterSpacing: '0.8px',
              marginBottom: '28px',
            }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#D1D5DB' }} />
              Bientôt disponible
            </div>

            <h1 style={{ fontSize: '40px', fontWeight: '800', letterSpacing: '-1.5px', color: '#111', lineHeight: '1.15', marginBottom: '14px' }}>
              Prêter sa crypto
            </h1>

            <p style={{ fontSize: '14px', color: '#888', lineHeight: '1.6', marginBottom: '36px' }}>
              BTC, ETH, SOL — les meilleurs APY sur une seule page.
            </p>

            <div style={{ background: '#FAFAFA', border: '1px solid #EBEBEB', borderRadius: '12px', padding: '20px 24px', marginBottom: '32px', textAlign: 'left' }}>
              {[
                { icon: '📈', t: 'APY en temps réel', d: 'Nexo, YouHodler, Aave, Morpho' },
                { icon: '🧮', t: 'Simulateur de gains', d: 'Vos intérêts estimés / mois et / an' },
                { icon: '🔒', t: 'CeFi vs DeFi', d: 'Risques et conditions de chaque plateforme' },
              ].map(item => (
                <div key={item.t} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '10px' }}>
                  <span style={{ fontSize: '15px', flexShrink: 0 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: '#111' }}>{item.t}</div>
                    <div style={{ fontSize: '12px', color: '#888', marginTop: '1px' }}>{item.d}</div>
                  </div>
                </div>
              ))}
            </div>

            {!sent ? (
              <div>
                <div style={{ fontSize: '13px', color: '#666', marginBottom: '10px' }}>Être notifié à l'ouverture</div>
                <div style={{ display: 'flex', gap: '8px', maxWidth: '360px', margin: '0 auto' }}>
                  <input type="email" placeholder="votre@email.com" value={email}
                    onChange={e => setEmail(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                    style={{ flex: 1, border: '1px solid #E0E0E0', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', outline: 'none', color: '#111' }}
                  />
                  <button onClick={handleSubmit}
                    style={{ background: '#111', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 18px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                    M'avertir
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '8px', padding: '12px 20px', fontSize: '13px', color: '#16A34A', fontWeight: '600' }}>
                ✓ Noté — on vous prévient dès l'ouverture.
              </div>
            )}

            <div style={{ marginTop: '32px' }}>
              <a href="/" style={{ fontSize: '13px', color: '#888', textDecoration: 'none', fontWeight: '600' }}
                onMouseEnter={e => e.currentTarget.style.color = '#111'}
                onMouseLeave={e => e.currentTarget.style.color = '#888'}>
                ← Retour au comparateur
              </a>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
