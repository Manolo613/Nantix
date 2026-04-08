import Head from 'next/head'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Staking() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = () => {
    if (email.includes('@')) setSent(true)
  }

  return (
    <>
      <Head>
        <title>Nantix — Staking crypto</title>
        <meta name="description" content="Comparez les meilleurs taux de staking sur ETH, SOL et BTC. Bientôt disponible sur Nantix." />
      </Head>
      <Navbar />

      <main style={{ background: '#fff', minHeight: '100vh', paddingTop: '52px', display: 'flex', flexDirection: 'column' }}>

        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 24px' }}>
          <div style={{ maxWidth: '480px', width: '100%', textAlign: 'center' }}>

            {/* Badge */}
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

            {/* Titre */}
            <h1 style={{
              fontSize: '40px', fontWeight: '800',
              letterSpacing: '-1.5px', color: '#111',
              lineHeight: '1.15', marginBottom: '16px',
            }}>
              Staking crypto
            </h1>

            {/* Description */}
            <p style={{
              fontSize: '15px', color: '#666',
              lineHeight: '1.7', marginBottom: '36px',
              maxWidth: '380px', margin: '0 auto 36px',
            }}>
              Comparez les taux de staking sur ETH, SOL et BTC — liquid staking, CeFi et protocoles DeFi. Données en cours de vérification, publication prochaine.
            </p>

            {/* Ce qui arrive */}
            <div style={{
              background: '#FAFAFA', border: '1px solid #EBEBEB',
              borderRadius: '12px', padding: '20px 24px',
              marginBottom: '32px', textAlign: 'left',
            }}>
              <div style={{ fontSize: '11px', fontWeight: '700', color: '#AAA', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '14px' }}>
                Ce qui arrive
              </div>
              {[
                { icon: '⚡', t: 'Liquid staking ETH', d: 'Lido, Rocket Pool, EigenLayer et autres' },
                { icon: '🌊', t: 'Staking SOL', d: 'Validators natifs, Jito, Marinade Finance' },
                { icon: '🔗', t: 'Filtre Liquid / CeFi / DeFi', d: 'Comparez selon votre profil technique' },
              ].map(item => (
                <div key={item.t} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '16px', flexShrink: 0, marginTop: '1px' }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: '#111' }}>{item.t}</div>
                    <div style={{ fontSize: '12px', color: '#888', marginTop: '2px' }}>{item.d}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Email */}
            {!sent ? (
              <div>
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#444', marginBottom: '10px' }}>
                  Être notifié à l'ouverture
                </div>
                <div style={{ display: 'flex', gap: '8px', maxWidth: '360px', margin: '0 auto' }}>
                  <input
                    type="email"
                    placeholder="votre@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                    style={{
                      flex: 1, border: '1px solid #E0E0E0', borderRadius: '8px',
                      padding: '10px 14px', fontSize: '13px', outline: 'none',
                      color: '#111', boxSizing: 'border-box',
                    }}
                  />
                  <button
                    onClick={handleSubmit}
                    style={{
                      background: '#111', color: '#fff', border: 'none',
                      borderRadius: '8px', padding: '10px 18px',
                      fontSize: '13px', fontWeight: '700', cursor: 'pointer',
                      whiteSpace: 'nowrap', flexShrink: 0,
                    }}
                  >
                    M'avertir
                  </button>
                </div>
              </div>
            ) : (
              <div style={{
                background: '#F0FDF4', border: '1px solid #BBF7D0',
                borderRadius: '8px', padding: '12px 20px',
                fontSize: '13px', color: '#16A34A', fontWeight: '600',
              }}>
                ✓ Enregistré — nous vous préviendrons à l'ouverture.
              </div>
            )}

            {/* Retour */}
            <div style={{ marginTop: '32px' }}>
              <a href="/" style={{
                fontSize: '13px', color: '#888', textDecoration: 'none',
                fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '4px',
              }}
                onMouseEnter={e => e.currentTarget.style.color = '#111'}
                onMouseLeave={e => e.currentTarget.style.color = '#888'}
              >
                ← Voir le comparateur Emprunter
              </a>
            </div>

          </div>
        </div>

      </main>
      <Footer />
    </>
  )
}
