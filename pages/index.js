import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
 
export default function Home() {
  const [btcPrice, setBtcPrice] = useState(0)
  const [amount, setAmount] = useState(1)
  const [mounted, setMounted] = useState(false)
 
  useEffect(() => {
    setMounted(true)
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur')
      .then(r => r.json()).then(d => setBtcPrice(d.bitcoin?.eur || 0)).catch(() => {})
  }, [])
 
  const collateral = amount * btcPrice
  const fmt = n => Math.round(n).toLocaleString('fr-FR')
 
  const platforms = [
    { name: 'Ledn', ltv: 50, apr: 11.9, type: 'CeFi', color: '#0D4A45', best: true },
    { name: 'Aave', ltv: 70, apr: 4.2, type: 'DeFi', color: '#B6509E', best: false },
    { name: 'Nexo', ltv: 50, apr: 13.9, type: 'CeFi', color: '#0ea5e9', best: false },
    { name: 'Compound', ltv: 65, apr: 5.1, type: 'DeFi', color: '#00D395', best: false },
  ]
 
  return (
    <>
      <Head>
        <title>Nantix — Comparez les prêts Bitcoin & Ethereum</title>
        <meta name="description" content="Obtenez des euros en nantissant votre Bitcoin ou Ethereum. Comparez Nexo, Ledn, Aave, Compound. Calculateur de liquidation en temps réel." />
      </Head>
      <Navbar />
 
      <main style={{ paddingTop: '56px', background: 'var(--bg2)' }}>
 
        {/* Hero */}
        <section style={{
          background: 'var(--bg)',
          borderBottom: '1px solid var(--border)',
          padding: '72px 32px 64px',
        }}>
          <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: 'var(--green2)', color: 'var(--green)',
              padding: '6px 14px', borderRadius: '20px',
              fontSize: '12px', fontWeight: '600',
              border: '1px solid var(--green3)',
              marginBottom: '24px',
            }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22C55E' }} />
              Prix Bitcoin en temps réel
            </div>
 
            <h1 style={{
              fontSize: '48px', fontWeight: '700',
              color: 'var(--ink)', letterSpacing: '-1.5px',
              lineHeight: '1.1', marginBottom: '20px',
            }}>
              Empruntez en euros.<br />
              <span style={{ color: 'var(--green)' }}>Gardez votre Bitcoin.</span>
            </h1>
 
            <p style={{
              fontSize: '17px', color: 'var(--ink3)',
              lineHeight: '1.6', marginBottom: '36px',
              maxWidth: '540px', margin: '0 auto 36px',
            }}>
              Comparez les meilleures offres de prêt crypto en France. Nantissez votre BTC ou ETH, recevez des euros — sans vendre, sans impôt sur les plus-values.
            </p>
 
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/comparateur" style={{
                background: 'var(--green)', color: 'white',
                padding: '14px 32px', borderRadius: '10px',
                fontSize: '15px', fontWeight: '600',
                textDecoration: 'none', display: 'inline-block',
              }}>Comparer maintenant →</Link>
              <Link href="/faq" style={{
                background: 'var(--bg)', color: 'var(--ink2)',
                padding: '14px 32px', borderRadius: '10px',
                fontSize: '15px', fontWeight: '500',
                border: '1px solid var(--border)',
                textDecoration: 'none', display: 'inline-block',
              }}>Comment ça marche ?</Link>
            </div>
          </div>
        </section>
 
        {/* Calculateur */}
        <section style={{ padding: '48px 32px', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '26px', fontWeight: '600', color: 'var(--ink)', letterSpacing: '-0.5px' }}>
              Combien pouvez-vous emprunter ?
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--ink3)', marginTop: '6px' }}>
              Entrez votre montant de Bitcoin et comparez instantanément
            </p>
          </div>
 
          {/* Slider input */}
          <div style={{
            background: 'var(--bg)', border: '1px solid var(--border)',
            borderRadius: '12px', padding: '24px 32px',
            boxShadow: 'var(--shadow)', maxWidth: '600px', margin: '0 auto 28px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <img src="https://assets.coingecko.com/coins/images/1/small/bitcoin.png" alt="BTC" style={{ width: '24px', height: '24px', borderRadius: '50%' }} />
                <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--ink)' }}>Bitcoin (BTC)</span>
              </div>
              <span style={{ fontSize: '22px', fontWeight: '700', color: 'var(--ink)', letterSpacing: '-0.5px' }}>
                {amount} BTC
              </span>
            </div>
            <input
              type="range" min="0.1" max="10" step="0.1" value={amount}
              onChange={e => setAmount(parseFloat(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--green)', height: '4px', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
              <span style={{ fontSize: '12px', color: 'var(--ink3)' }}>0.1 BTC</span>
              <span style={{ fontSize: '13px', color: 'var(--ink3)', fontWeight: '500' }}>
                ≈ {mounted && btcPrice > 0 ? fmt(collateral) + ' €' : '—'}
              </span>
              <span style={{ fontSize: '12px', color: 'var(--ink3)' }}>10 BTC</span>
            </div>
          </div>
 
          {/* Cards plateformes */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px', maxWidth: '1100px', margin: '0 auto' }}>
            {platforms.map(p => (
              <div key={p.name} style={{
                background: 'var(--bg)',
                border: p.best ? '2px solid var(--green)' : '1px solid var(--border)',
                borderRadius: '12px', padding: '20px 24px',
                boxShadow: p.best ? '0 4px 16px rgba(13,122,78,0.12)' : 'var(--shadow)',
                position: 'relative',
              }}>
                {p.best && (
                  <div style={{
                    position: 'absolute', top: '-1px', right: '16px',
                    background: 'var(--green)', color: 'white',
                    fontSize: '10px', fontWeight: '600',
                    padding: '3px 10px', borderRadius: '0 0 6px 6px',
                    letterSpacing: '0.5px',
                  }}>RECOMMANDÉ</div>
                )}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '36px', height: '36px', borderRadius: '8px',
                      background: p.color, display: 'flex',
                      alignItems: 'center', justifyContent: 'center',
                      color: 'white', fontWeight: '700', fontSize: '14px',
                    }}>{p.name[0]}</div>
                    <div>
                      <div style={{ fontWeight: '600', fontSize: '15px', color: 'var(--ink)' }}>{p.name}</div>
                      <div style={{ fontSize: '11px', fontWeight: '500', color: p.type === 'DeFi' ? 'var(--green)' : 'var(--blue)' }}>{p.type}</div>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    { label: 'Taux annuel (APR)', value: `${p.apr}%`, color: 'var(--ink)' },
                    { label: 'LTV maximum', value: `${p.ltv}%`, color: 'var(--ink)' },
                    { label: 'Emprunt max', value: mounted && btcPrice > 0 ? fmt(collateral * p.ltv / 100) + ' €' : '—', color: 'var(--green)' },
                  ].map(row => (
                    <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '13px', color: 'var(--ink3)' }}>{row.label}</span>
                      <span style={{ fontSize: '14px', fontWeight: '600', color: row.color }}>{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
 
          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <Link href="/comparateur" style={{
              color: 'var(--green)', fontWeight: '600', fontSize: '14px',
              textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px',
            }}>Voir toutes les plateformes avec les détails →</Link>
          </div>
        </section>
 
        {/* Comment ça marche */}
        <section style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '64px 32px' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <h2 style={{ fontSize: '26px', fontWeight: '600', color: 'var(--ink)', letterSpacing: '-0.5px' }}>Comment ça marche ?</h2>
              <p style={{ fontSize: '14px', color: 'var(--ink3)', marginTop: '6px' }}>Emprunter sur votre Bitcoin en 3 étapes simples</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
              {[
                { n: '01', title: 'Déposez votre BTC', desc: 'Vous nantissez votre Bitcoin comme garantie. Vous le gardez — il continue de prendre de la valeur.' },
                { n: '02', title: 'Choisissez votre plateforme', desc: 'Comparez les taux, LTV et conditions. Nantix vous montre tout pour prendre la meilleure décision.' },
                { n: '03', title: 'Recevez vos euros', desc: "La plateforme vous verse des euros sur votre compte. Pas de vente de BTC, pas d'impôt sur les plus-values." },
              ].map(step => (
                <div key={step.n} style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '36px', fontWeight: '700',
                    color: 'var(--bg3)', letterSpacing: '-1px',
                    lineHeight: '1', marginBottom: '16px',
                  }}>{step.n}</div>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--ink)', marginBottom: '8px' }}>{step.title}</h3>
                  <p style={{ fontSize: '13px', color: 'var(--ink3)', lineHeight: '1.6' }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
 
        {/* CTA final */}
        <section style={{ padding: '64px 32px', textAlign: 'center' }}>
          <div style={{ maxWidth: '500px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '26px', fontWeight: '600', color: 'var(--ink)', letterSpacing: '-0.5px', marginBottom: '12px' }}>
              Prêt à comparer ?
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--ink3)', marginBottom: '28px', lineHeight: '1.6' }}>
              Gratuit, sans inscription. Comparez en 30 secondes.
            </p>
            <Link href="/comparateur" style={{
              background: 'var(--green)', color: 'white',
              padding: '14px 40px', borderRadius: '10px',
              fontSize: '15px', fontWeight: '600',
              textDecoration: 'none', display: 'inline-block',
            }}>Comparer maintenant →</Link>
          </div>
        </section>
 
      </main>
      <Footer />
    </>
  )
}
 
