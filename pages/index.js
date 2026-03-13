import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
 
const PLATFORMS = [
  {
    name: 'Nexo',
    ltv: 50,
    apr: 13.9,
    liquidation: 83,
    color: '#1B5E8C',
    badge: 'CeFi',
    link: 'https://nexo.com',
  },
  {
    name: 'Ledn',
    ltv: 50,
    apr: 11.9,
    liquidation: 80,
    color: '#0D4A45',
    badge: 'CeFi',
    link: 'https://ledn.io',
    best: true,
  },
  {
    name: 'Aave',
    ltv: 70,
    apr: 4.2,
    liquidation: 82.5,
    color: '#B6509E',
    badge: 'DeFi',
    link: 'https://aave.com',
  },
  {
    name: 'Compound',
    ltv: 65,
    apr: 5.1,
    liquidation: 80,
    color: '#00D395',
    badge: 'DeFi',
    link: 'https://compound.finance',
  },
]
 
export default function Home() {
  const [btcPrice, setBtcPrice] = useState(85000)
  const [btcAmount, setBtcAmount] = useState(1)
  const [mounted, setMounted] = useState(false)
 
  useEffect(() => {
    setMounted(true)
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur')
      .then(r => r.json())
      .then(d => d?.bitcoin?.eur && setBtcPrice(d.bitcoin.eur))
      .catch(() => {})
  }, [])
 
  const collateral = btcAmount * btcPrice
 
  return (
    <>
      <Head>
        <title>Nantix — Comparez les prêts Bitcoin en France</title>
        <meta name="description" content="Empruntez en euros en nantissant votre Bitcoin. Comparez les taux, LTV et prix de liquidation de Nexo, Ledn, Aave et Compound." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
 
      <Navbar />
 
      <main>
        {/* HERO */}
        <section style={{
          background: 'var(--cream)',
          padding: '140px 40px 80px',
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
            <div style={{ maxWidth: '720px' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'var(--cream-dark)',
                border: '1px solid var(--cream-border)',
                borderRadius: '100px',
                padding: '6px 14px',
                marginBottom: '32px',
              }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2ECC71' }} />
                <span style={{ fontSize: '13px', color: 'var(--ink-light)', fontWeight: '500' }}>
                  Données mises à jour en temps réel
                </span>
              </div>
 
              <h1 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(42px, 6vw, 72px)',
                fontWeight: '500',
                lineHeight: '1.1',
                color: 'var(--ink)',
                letterSpacing: '-1.5px',
                marginBottom: '24px',
              }}>
                Empruntez en euros,<br />
                <em style={{ fontStyle: 'italic', color: 'var(--teal)' }}>gardez votre Bitcoin.</em>
              </h1>
 
              <p style={{
                fontSize: '18px',
                color: 'var(--ink-muted)',
                lineHeight: '1.7',
                maxWidth: '520px',
                marginBottom: '40px',
              }}>
                Comparez les meilleurs taux de prêt collatéralisé BTC en France. Nexo, Ledn, Aave, Compound — tout en un coup d'œil.
              </p>
 
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <Link href="/comparateur" style={{
                  background: 'var(--teal)',
                  color: 'white',
                  padding: '16px 32px',
                  borderRadius: '10px',
                  fontSize: '16px',
                  fontWeight: '600',
                  display: 'inline-block',
                  transition: 'background 0.2s, transform 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--teal-hover)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--teal)'; e.currentTarget.style.transform = 'translateY(0)' }}
                >Comparer les plateformes →</Link>
 
                <Link href="/faq" style={{
                  background: 'transparent',
                  color: 'var(--ink)',
                  padding: '16px 32px',
                  borderRadius: '10px',
                  fontSize: '16px',
                  fontWeight: '500',
                  border: '1px solid var(--cream-border)',
                  display: 'inline-block',
                }}>Comment ça marche ?</Link>
              </div>
 
              {/* Trust stats */}
              <div style={{
                display: 'flex',
                gap: '40px',
                marginTop: '60px',
                flexWrap: 'wrap',
              }}>
                {[
                  { value: '4', label: 'plateformes comparées' },
                  { value: '100%', label: 'indépendant' },
                  { value: 'FR', label: 'marché francophone' },
                ].map(stat => (
                  <div key={stat.label}>
                    <div style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '28px',
                      fontWeight: '500',
                      color: 'var(--ink)',
                    }}>{stat.value}</div>
                    <div style={{ fontSize: '13px', color: 'var(--ink-muted)', marginTop: '2px' }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
 
        {/* CALCULATOR STRIP */}
        <section style={{
          background: 'var(--teal)',
          padding: '60px 40px',
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: '13px',
              color: 'rgba(255,255,255,0.6)',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              marginBottom: '24px',
            }}>Calculateur rapide</p>
 
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: '40px',
              alignItems: 'center',
            }}>
              <div>
                <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', display: 'block', marginBottom: '8px' }}>
                  Vous nantissez
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <input
                    type="number"
                    value={btcAmount}
                    onChange={e => setBtcAmount(Math.max(0.001, parseFloat(e.target.value) || 0))}
                    step="0.1"
                    style={{
                      background: 'rgba(255,255,255,0.1)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '8px',
                      padding: '14px 18px',
                      color: 'white',
                      fontSize: '24px',
                      fontFamily: 'var(--font-display)',
                      width: '180px',
                      outline: 'none',
                    }}
                  />
                  <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px', fontWeight: '600' }}>BTC</span>
                  <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '16px' }}>
                    ≈ {mounted ? collateral.toLocaleString('fr-FR') : '—'} €
                  </span>
                </div>
              </div>
 
              <div style={{ textAlign: 'right' }}>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', marginBottom: '6px' }}>Meilleur taux disponible</p>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '48px', color: 'white', fontWeight: '400', lineHeight: 1 }}>4.2%</p>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', marginTop: '4px' }}>APR via Aave</p>
              </div>
            </div>
          </div>
        </section>
 
        {/* COMPARISON TABLE */}
        <section style={{
          background: 'var(--cream-dark)',
          padding: '80px 40px',
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
              <div>
                <h2 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '36px',
                  fontWeight: '500',
                  color: 'var(--ink)',
                  letterSpacing: '-0.5px',
                }}>Comparatif des plateformes</h2>
                <p style={{ color: 'var(--ink-muted)', marginTop: '8px', fontSize: '15px' }}>
                  Pour {btcAmount} BTC nantis ({mounted ? collateral.toLocaleString('fr-FR') : '—'} €)
                </p>
              </div>
              <Link href="/comparateur" style={{
                color: 'var(--teal)',
                fontSize: '14px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}>Voir le comparateur complet →</Link>
            </div>
 
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
              {PLATFORMS.map(platform => {
                const maxBorrow = (collateral * platform.ltv) / 100
                const liquidationPrice = (collateral * (platform.liquidation / 100)) / btcAmount
 
                return (
                  <div key={platform.name} style={{
                    background: 'var(--white)',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    border: platform.best ? '2px solid var(--teal)' : '1px solid var(--cream-border)',
                    position: 'relative',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.1)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
                  >
                    {platform.best && (
                      <div style={{
                        background: 'var(--teal)',
                        color: 'white',
                        fontSize: '11px',
                        fontWeight: '700',
                        textAlign: 'center',
                        padding: '5px',
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                      }}>⭐ Meilleur taux</div>
                    )}
 
                    <div style={{ padding: '24px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '8px',
                            background: platform.color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: '700',
                            fontSize: '14px',
                          }}>{platform.name[0]}</div>
                          <span style={{ fontWeight: '600', fontSize: '16px' }}>{platform.name}</span>
                        </div>
                        <span style={{
                          fontSize: '11px',
                          fontWeight: '600',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          background: platform.badge === 'DeFi' ? '#F0FAF4' : '#EEF4FF',
                          color: platform.badge === 'DeFi' ? '#1A7F4B' : '#2D5BE3',
                        }}>{platform.badge}</span>
                      </div>
 
                      <div style={{ marginBottom: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                          <span style={{ fontSize: '13px', color: 'var(--ink-muted)' }}>Taux annuel (APR)</span>
                          <span style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: '500', color: 'var(--ink)' }}>{platform.apr}%</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                          <span style={{ fontSize: '13px', color: 'var(--ink-muted)' }}>LTV maximum</span>
                          <span style={{ fontSize: '16px', fontWeight: '600' }}>{platform.ltv}%</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                          <span style={{ fontSize: '13px', color: 'var(--ink-muted)' }}>Emprunt max</span>
                          <span style={{ fontSize: '16px', fontWeight: '600', color: 'var(--teal)' }}>
                            {mounted ? maxBorrow.toLocaleString('fr-FR', { maximumFractionDigits: 0 }) : '—'} €
                          </span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '13px', color: 'var(--ink-muted)' }}>Prix liquidation BTC</span>
                          <span style={{ fontSize: '14px', fontWeight: '600', color: '#E53E3E' }}>
                            {mounted ? liquidationPrice.toLocaleString('fr-FR', { maximumFractionDigits: 0 }) : '—'} €
                          </span>
                        </div>
                      </div>
 
                      <a href={platform.link} target="_blank" rel="noopener noreferrer" style={{
                        display: 'block',
                        textAlign: 'center',
                        padding: '12px',
                        background: platform.best ? 'var(--teal)' : 'var(--cream)',
                        color: platform.best ? 'white' : 'var(--ink)',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                        border: platform.best ? 'none' : '1px solid var(--cream-border)',
                        transition: 'opacity 0.2s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                      onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                      >Emprunter chez {platform.name} →</a>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
 
        {/* HOW IT WORKS */}
        <section style={{ background: 'var(--cream)', padding: '80px 40px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '36px',
              fontWeight: '500',
              color: 'var(--ink)',
              letterSpacing: '-0.5px',
              marginBottom: '12px',
            }}>Comment ça marche ?</h2>
            <p style={{ color: 'var(--ink-muted)', fontSize: '16px', marginBottom: '48px' }}>
              Emprunter sur votre Bitcoin en 3 étapes simples.
            </p>
 
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
              {[
                { step: '01', title: 'Déposez votre BTC', desc: 'Vous nantissez votre Bitcoin comme garantie. Vous le gardez — il continue de prendre de la valeur.' },
                { step: '02', title: 'Choisissez votre plateforme', desc: 'Comparez les taux, LTV et conditions. Nantix vous montre tout pour prendre la meilleure décision.' },
                { step: '03', title: 'Recevez vos euros', desc: 'La plateforme vous verse des euros sur votre compte. Pas de vente de BTC, pas d\'impôt sur les plus-values.' },
              ].map(item => (
                <div key={item.step} style={{
                  padding: '32px',
                  background: 'var(--cream-dark)',
                  borderRadius: '16px',
                  border: '1px solid var(--cream-border)',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '48px',
                    fontWeight: '300',
                    color: 'var(--cream-border)',
                    marginBottom: '16px',
                    lineHeight: 1,
                  }}>{item.step}</div>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '20px',
                    fontWeight: '500',
                    marginBottom: '12px',
                    color: 'var(--ink)',
                  }}>{item.title}</h3>
                  <p style={{ color: 'var(--ink-muted)', fontSize: '15px', lineHeight: '1.6' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
 
        {/* CTA FINAL */}
        <section style={{
          background: 'var(--cream-dark)',
          padding: '80px 40px',
          borderTop: '1px solid var(--cream-border)',
        }}>
          <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '40px',
              fontWeight: '500',
              color: 'var(--ink)',
              letterSpacing: '-0.5px',
              marginBottom: '16px',
            }}>Prêt à emprunter sur votre Bitcoin ?</h2>
            <p style={{ color: 'var(--ink-muted)', fontSize: '16px', marginBottom: '32px' }}>
              Comparez gratuitement, sans inscription.
            </p>
            <Link href="/comparateur" style={{
              background: 'var(--teal)',
              color: 'white',
              padding: '18px 40px',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: '600',
              display: 'inline-block',
            }}>Voir le comparateur complet →</Link>
          </div>
        </section>
      </main>
 
      <Footer />
    </>
  )
}
