import Head from 'next/head'
import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
 
const CRYPTOS = [
  { id: 'bitcoin',  symbol: 'BTC', name: 'Bitcoin',  coingeckoId: 'bitcoin',  color: '#F7931A' },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', coingeckoId: 'ethereum', color: '#627EEA' },
]
 
const PLATFORMS = {
  bitcoin: [
    { name: 'Nexo',     ltv: 50, apr: 13.9, liquidationThreshold: 83,   type: 'CeFi', color: '#0ea5e9', link: 'https://nexo.com',        best: false },
    { name: 'Ledn',     ltv: 50, apr: 11.9, liquidationThreshold: 80,   type: 'CeFi', color: '#0D4A45', link: 'https://ledn.io',          best: true  },
    { name: 'Aave',     ltv: 70, apr: 4.2,  liquidationThreshold: 82.5, type: 'DeFi', color: '#B6509E', link: 'https://aave.com',         best: false },
    { name: 'Compound', ltv: 65, apr: 5.1,  liquidationThreshold: 80,   type: 'DeFi', color: '#00D395', link: 'https://compound.finance', best: false },
  ],
  ethereum: [
    { name: 'Nexo',     ltv: 50, apr: 13.9, liquidationThreshold: 83,   type: 'CeFi', color: '#0ea5e9', link: 'https://nexo.com',        best: false },
    { name: 'Aave',     ltv: 80, apr: 3.8,  liquidationThreshold: 82.5, type: 'DeFi', color: '#B6509E', link: 'https://aave.com',         best: true  },
    { name: 'Compound', ltv: 75, apr: 4.5,  liquidationThreshold: 80,   type: 'DeFi', color: '#00D395', link: 'https://compound.finance', best: false },
    { name: 'Spark',    ltv: 74, apr: 4.1,  liquidationThreshold: 79,   type: 'DeFi', color: '#FF6B35', link: 'https://spark.fi',         best: false },
  ],
}
 
export default function Home() {
  const [selectedCrypto, setSelectedCrypto] = useState('bitcoin')
  const [prices, setPrices]   = useState({})
  const [amount, setAmount]   = useState(1)
  const [mounted, setMounted] = useState(false)
  const [sortBy, setSortBy]   = useState('apr')
  const [filter, setFilter]   = useState('all')
 
  useEffect(() => {
    setMounted(true)
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=eur')
      .then(r => r.json())
      .then(d => setPrices(d))
      .catch(() => {})
  }, [])
 
  const crypto     = CRYPTOS.find(c => c.id === selectedCrypto)
  const price      = prices[crypto.coingeckoId]?.eur || 0
  const collateral = amount * price
  const fmt        = n => Math.round(n).toLocaleString('fr-FR')
 
  const filtered = (PLATFORMS[selectedCrypto] || [])
    .filter(p => filter === 'all' || p.type === filter)
    .sort((a, b) => sortBy === 'apr' ? a.apr - b.apr : b.ltv - a.ltv)
 
  const s = {
    page:        { background: '#F7F7F5', minHeight: '100vh' },
    taglineBar:  { background: '#fff', borderBottom: '1px solid #EBEBEB', padding: '20px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' },
    h1:          { fontSize: '20px', fontWeight: '600', letterSpacing: '-0.5px', color: '#111', marginBottom: '3px' },
    sub:         { fontSize: '13px', color: '#888' },
    liveBadge:   { display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#888', whiteSpace: 'nowrap' },
    liveDot:     { width: '7px', height: '7px', borderRadius: '50%', background: '#22C55E', flexShrink: 0 },
    controlsBar: { background: '#FAFAFA', borderBottom: '1px solid #EBEBEB', padding: '12px 40px', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' },
    content:     { padding: '24px 40px 40px', background: '#F7F7F5' },
  }
 
  return (
    <>
      <Head>
        <title>Nantix — Comparez les prêts Bitcoin & Ethereum</title>
        <meta name="description" content="Le seul comparateur francophone de prêts crypto collatéralisés. Comparez Nexo, Ledn, Aave, Compound en temps réel." />
      </Head>
 
      <Navbar />
 
      <main style={{ ...s.page, paddingTop: '56px' }}>
 
        {/* Tagline */}
        <section style={s.taglineBar}>
          <div>
            <h1 style={s.h1}>Empruntez en euros. Gardez votre crypto.</h1>
            <p style={s.sub}>Comparez les meilleures offres de prêt sur Bitcoin et Ethereum — sans vendre, sans impôt sur les plus-values.</p>
          </div>
          <div style={s.liveBadge}>
            <div style={s.liveDot} />
            Prix en temps réel
          </div>
        </section>
 
        {/* Contrôles */}
        <section style={s.controlsBar}>
 
          {/* Toggle crypto */}
          <div style={{ display: 'flex', gap: '8px' }}>
            {CRYPTOS.map(c => (
              <button
                key={c.id}
                onClick={() => { setSelectedCrypto(c.id); setAmount(1); setFilter('all') }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '7px 14px', borderRadius: '100px',
                  border: selectedCrypto === c.id ? `1.5px solid ${c.color}` : '1px solid #E0E0E0',
                  background: selectedCrypto === c.id ? `${c.color}12` : '#fff',
                  cursor: 'pointer', fontSize: '13px', fontWeight: '600',
                  color: selectedCrypto === c.id ? c.color : '#888',
                  transition: 'all 0.15s',
                }}
              >
                <div style={{
                  width: '16px', height: '16px', borderRadius: '50%',
                  background: c.color, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '7px', fontWeight: '800',
                  color: '#fff', flexShrink: 0,
                }}>{c.symbol[0]}</div>
                {c.name}
                <span style={{ fontSize: '11px', opacity: 0.5 }}>{c.symbol}</span>
              </button>
            ))}
          </div>
 
          {/* Input montant */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              display: 'flex', alignItems: 'center',
              background: '#fff', border: '1px solid #E0E0E0',
              borderRadius: '8px', overflow: 'hidden',
            }}>
              <div style={{
                width: '26px', height: '26px', margin: '4px', borderRadius: '5px',
                background: crypto.color, display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '7px', fontWeight: '800',
                color: '#fff', flexShrink: 0,
              }}>{crypto.symbol[0]}</div>
              <input
                type="number"
                value={amount}
                onChange={e => setAmount(Math.max(0.001, parseFloat(e.target.value) || 0))}
                step="0.1"
                style={{
                  border: 'none', padding: '7px 8px', fontSize: '17px',
                  width: '90px', outline: 'none', color: '#111',
                  background: 'transparent', fontWeight: '500',
                }}
              />
              <span style={{ padding: '0 10px', fontWeight: '600', color: '#AAA', fontSize: '13px' }}>{crypto.symbol}</span>
            </div>
            <span style={{ fontSize: '13px', color: '#888', whiteSpace: 'nowrap' }}>
              = {mounted && price > 0 ? fmt(collateral) : '—'} €
            </span>
          </div>
 
          {/* Filtres + tri */}
          <div style={{ display: 'flex', gap: '10px', marginLeft: 'auto' }}>
            <div style={{ display: 'flex', background: '#fff', borderRadius: '8px', border: '1px solid #E0E0E0', overflow: 'hidden' }}>
              {['all', 'CeFi', 'DeFi'].map(f => (
                <button key={f} onClick={() => setFilter(f)} style={{
                  padding: '7px 14px', fontSize: '12px', fontWeight: '600',
                  background: filter === f ? '#111' : 'transparent',
                  color: filter === f ? '#fff' : '#888',
                  border: 'none', cursor: 'pointer', transition: 'all 0.15s',
                }}>{f === 'all' ? 'Tout' : f}</button>
              ))}
            </div>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              style={{
                border: '1px solid #E0E0E0', borderRadius: '8px',
                padding: '7px 12px', fontSize: '12px',
                background: '#fff', color: '#111',
                cursor: 'pointer', outline: 'none',
              }}
            >
              <option value="apr">Meilleur taux</option>
              <option value="ltv">LTV maximum</option>
            </select>
          </div>
 
        </section>
 
        {/* Contenu */}
        <section style={s.content}>
 
          {/* 3 étapes */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '20px' }}>
            {[
              { n: '01', title: 'Choisissez votre crypto',  desc: 'Entrez le montant de Bitcoin ou Ethereum que vous souhaitez nantir comme garantie.' },
              { n: '02', title: 'Comparez les offres',       desc: 'Taux, LTV et prix de liquidation affichés côte à côte. CeFi ou DeFi — vous choisissez.' },
              { n: '03', title: 'Recevez vos euros',         desc: "La plateforme vous verse des euros directement. Pas de vente, pas d'impôt sur les plus-values." },
            ].map(step => (
              <div key={step.n} style={{
                background: '#fff', border: '1px solid #EBEBEB',
                borderRadius: '10px', padding: '16px 18px',
                display: 'flex', gap: '14px', alignItems: 'flex-start',
              }}>
                <span style={{ fontSize: '22px', fontWeight: '700', color: '#E8E8E8', lineHeight: '1', flexShrink: 0, letterSpacing: '-1px' }}>{step.n}</span>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: '#111', marginBottom: '4px' }}>{step.title}</div>
                  <div style={{ fontSize: '12px', color: '#888', lineHeight: '1.6' }}>{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
 
          {/* En-tête tableau */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '180px 1fr 1fr 1fr 1fr 130px',
            gap: '16px', padding: '8px 20px',
            fontSize: '10px', fontWeight: '600', color: '#BBB',
            textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '6px',
          }}>
            <span>Plateforme</span>
            <span>APR annuel</span>
            <span>LTV max</span>
            <span>Emprunt max</span>
            <span>Prix liquidation</span>
            <span></span>
          </div>
 
          {/* Lignes */}
          {filtered.map(platform => {
            const maxBorrow        = (collateral * platform.ltv) / 100
            const liquidationPrice = price > 0 ? (collateral * (platform.liquidationThreshold / 100)) / amount : 0
 
            return (
              <div
                key={platform.name}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '180px 1fr 1fr 1fr 1fr 130px',
                  gap: '16px', padding: '18px 20px',
                  background: '#fff', borderRadius: '10px', marginBottom: '8px',
                  border: platform.best ? '1.5px solid #111' : '1px solid #EBEBEB',
                  alignItems: 'center', transition: 'box-shadow 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
              >
                {/* Plateforme */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '8px',
                    background: platform.color, display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontWeight: '700', fontSize: '15px', flexShrink: 0,
                  }}>{platform.name[0]}</div>
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '14px', color: '#111' }}>{platform.name}</div>
                    <div style={{ fontSize: '11px', fontWeight: '600', color: platform.type === 'DeFi' ? '#1A7F4B' : '#2D5BE3' }}>{platform.type}</div>
                  </div>
                </div>
 
                {/* APR */}
                <div>
                  <span style={{ fontSize: '22px', fontWeight: '600', color: '#111' }}>{platform.apr}%</span>
                  <span style={{ fontSize: '11px', color: '#BBB', marginLeft: '3px' }}>/ an</span>
                </div>
 
                {/* LTV */}
                <div>
                  <span style={{ fontSize: '16px', fontWeight: '600', color: '#111' }}>{platform.ltv}%</span>
                  <div style={{ height: '3px', background: '#F0F0F0', borderRadius: '2px', marginTop: '5px', width: '64px' }}>
                    <div style={{ height: '100%', width: `${platform.ltv}%`, background: platform.color, borderRadius: '2px' }} />
                  </div>
                </div>
 
                {/* Emprunt max */}
                <div style={{ fontSize: '16px', fontWeight: '700', color: '#1A7F4B' }}>
                  {mounted && price > 0 ? fmt(maxBorrow) + ' €' : '—'}
                </div>
 
                {/* Liquidation */}
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#E53E3E' }}>
                    {mounted && price > 0 ? fmt(liquidationPrice) + ' €' : '—'}
                  </div>
                  <div style={{ fontSize: '11px', color: '#BBB', marginTop: '1px' }}>par {crypto.symbol}</div>
                </div>
 
                {/* CTA */}
                <a
                  href={platform.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'block', textAlign: 'center',
                    padding: '9px 14px', borderRadius: '7px',
                    fontSize: '12px', fontWeight: '600',
                    background: platform.best ? '#111' : 'transparent',
                    color: platform.best ? '#fff' : '#111',
                    border: '1px solid #111',
                    textDecoration: 'none', transition: 'opacity 0.15s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  Emprunter →
                </a>
              </div>
            )
          })}
 
          <p style={{ fontSize: '11px', color: '#CCC', marginTop: '14px', lineHeight: '1.6' }}>
            ⚠️ Taux indicatifs, mis à jour régulièrement. Liens affiliés présents. Ce comparateur ne constitue pas un conseil financier.
          </p>
 
        </section>
      </main>
 
      <Footer />
    </>
  )
}
 
