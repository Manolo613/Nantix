import Head from 'next/head'
import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
 
const CRYPTOS = [
  { id: 'bitcoin',  symbol: 'BTC', name: 'Bitcoin',  coingeckoId: 'bitcoin',  color: '#F7931A', logo: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png' },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', coingeckoId: 'ethereum', color: '#627EEA', logo: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png' },
]
 
const PLATFORMS = {
  bitcoin: [
    { name: 'Nexo',     ltv: 50, apr: 13.9, liquidationThreshold: 83,   type: 'CeFi', color: '#0ea5e9', link: 'https://nexo.com',           best: false },
    { name: 'Ledn',     ltv: 50, apr: 11.9, liquidationThreshold: 80,   type: 'CeFi', color: '#0D4A45', link: 'https://ledn.io',             best: true  },
    { name: 'Aave',     ltv: 70, apr: 4.2,  liquidationThreshold: 82.5, type: 'DeFi', color: '#B6509E', link: 'https://aave.com',            best: false },
    { name: 'Compound', ltv: 65, apr: 5.1,  liquidationThreshold: 80,   type: 'DeFi', color: '#00D395', link: 'https://compound.finance',    best: false },
  ],
  ethereum: [
    { name: 'Nexo',     ltv: 50, apr: 13.9, liquidationThreshold: 83,   type: 'CeFi', color: '#0ea5e9', link: 'https://nexo.com',            best: false },
    { name: 'Aave',     ltv: 80, apr: 3.8,  liquidationThreshold: 82.5, type: 'DeFi', color: '#B6509E', link: 'https://aave.com',            best: true  },
    { name: 'Compound', ltv: 75, apr: 4.5,  liquidationThreshold: 80,   type: 'DeFi', color: '#00D395', link: 'https://compound.finance',    best: false },
    { name: 'Spark',    ltv: 74, apr: 4.1,  liquidationThreshold: 79,   type: 'DeFi', color: '#FF6B35', link: 'https://spark.fi',            best: false },
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
 
  const filtered = (PLATFORMS[selectedCrypto] || [])
    .filter(p => filter === 'all' || p.type === filter)
    .sort((a, b) => sortBy === 'apr' ? a.apr - b.apr : b.ltv - a.ltv)
 
  const fmt = n => Math.round(n).toLocaleString('fr-FR')
 
  return (
    <>
      <Head>
        <title>Nantix — Comparez les prêts Bitcoin & Ethereum</title>
        <meta name="description" content="Le seul comparateur francophone de prêts crypto collatéralisés. Comparez Nexo, Ledn, Aave, Compound en temps réel." />
      </Head>
 
      <Navbar />
 
      <main style={{ paddingTop: '56px', background: 'var(--cream)' }}>
 
        {/* Tagline */}
        <section style={{
          background: 'var(--white)',
          borderBottom: '1px solid var(--cream-border)',
          padding: '28px 60px',
        }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h1 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '26px',
                fontWeight: '500',
                color: 'var(--ink)',
                letterSpacing: '-0.5px',
                marginBottom: '4px',
              }}>
                Empruntez en euros. Gardez votre crypto.
              </h1>
              <p style={{ fontSize: '14px', color: 'var(--ink-muted)' }}>
                Comparez les meilleures offres de prêt sur Bitcoin et Ethereum — sans vendre, sans impôt sur les plus-values.
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22C55E' }} />
              <span style={{ fontSize: '12px', color: 'var(--ink-muted)', fontWeight: '500' }}>Prix en temps réel</span>
            </div>
          </div>
        </section>
 
        {/* Barre de contrôles */}
        <section style={{
          background: 'var(--cream-dark)',
          borderBottom: '1px solid var(--cream-border)',
          padding: '20px 60px',
        }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
 
            {/* Sélecteur crypto */}
            <div style={{ display: 'flex', gap: '8px' }}>
              {CRYPTOS.map(c => (
                <button
                  key={c.id}
                  onClick={() => { setSelectedCrypto(c.id); setAmount(c.id === 'bitcoin' ? 1 : 1); setFilter('all') }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    padding: '8px 18px',
                    borderRadius: '100px',
                    border: selectedCrypto === c.id ? `2px solid ${c.color}` : '1px solid var(--cream-border)',
                    background: selectedCrypto === c.id ? `${c.color}15` : 'var(--white)',
                    cursor: 'pointer',
                    fontSize: '14px', fontWeight: '600',
                    color: selectedCrypto === c.id ? c.color : 'var(--ink-muted)',
                    transition: 'all 0.15s',
                  }}
                >
                  <img src={c.logo} alt={c.symbol} style={{ width: '20px', height: '20px', borderRadius: '50%' }} />
                  {c.name}
                  <span style={{ fontSize: '12px', opacity: 0.6 }}>{c.symbol}</span>
                </button>
              ))}
            </div>
 
            {/* Input montant */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                display: 'flex', alignItems: 'center',
                background: 'var(--white)',
                border: '1px solid var(--cream-border)',
                borderRadius: '8px', overflow: 'hidden',
              }}>
                <div style={{
                  width: '32px', height: '32px', margin: '4px',
                  borderRadius: '6px', background: crypto.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <img src={crypto.logo} alt={crypto.symbol} style={{ width: '20px', height: '20px', borderRadius: '50%' }} />
                </div>
                <input
                  type="number"
                  value={amount}
                  onChange={e => setAmount(Math.max(0.001, parseFloat(e.target.value) || 0))}
                  step="0.1"
                  style={{
                    border: 'none', padding: '8px 12px',
                    fontSize: '18px', fontFamily: 'var(--font-display)',
                    width: '110px', outline: 'none',
                    color: 'var(--ink)', background: 'transparent',
                  }}
                />
                <span style={{ padding: '0 12px', fontWeight: '600', color: 'var(--ink-muted)', fontSize: '14px' }}>{crypto.symbol}</span>
              </div>
              <span style={{ fontSize: '14px', color: 'var(--ink-muted)', whiteSpace: 'nowrap' }}>
                = {mounted && price > 0 ? fmt(collateral) : '—'} €
              </span>
            </div>
 
            {/* Filtres et tri */}
            <div style={{ display: 'flex', gap: '10px', marginLeft: 'auto' }}>
              <div style={{
                display: 'flex', background: 'var(--white)',
                borderRadius: '8px', border: '1px solid var(--cream-border)', overflow: 'hidden',
              }}>
                {['all', 'CeFi', 'DeFi'].map(f => (
                  <button key={f} onClick={() => setFilter(f)} style={{
                    padding: '8px 16px', fontSize: '13px', fontWeight: '600',
                    background: filter === f ? 'var(--teal)' : 'transparent',
                    color: filter === f ? 'white' : 'var(--ink-muted)',
                    border: 'none', cursor: 'pointer', transition: 'all 0.15s',
                  }}>{f === 'all' ? 'Tout' : f}</button>
                ))}
              </div>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                style={{
                  border: '1px solid var(--cream-border)', borderRadius: '8px',
                  padding: '8px 14px', fontSize: '13px',
                  background: 'var(--white)', color: 'var(--ink)',
                  cursor: 'pointer', outline: 'none',
                }}
              >
                <option value="apr">Meilleur taux</option>
                <option value="ltv">LTV maximum</option>
              </select>
            </div>
 
          </div>
        </section>
 
        {/* Tableau comparateur */}
        <section style={{ padding: '24px 60px 40px' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
 
            {/* En-tête colonnes */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '220px 1fr 1fr 1fr 1fr 160px',
              gap: '24px',
              padding: '10px 28px',
              fontSize: '11px', fontWeight: '600',
              color: 'var(--ink-muted)',
              textTransform: 'uppercase', letterSpacing: '0.8px',
              marginBottom: '6px',
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
              const maxBorrow       = (collateral * platform.ltv) / 100
              const liquidationPrice = price > 0
                ? (collateral * (platform.liquidationThreshold / 100)) / amount
                : 0
 
              return (
                <div
                  key={platform.name}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '220px 1fr 1fr 1fr 1fr 160px',
                    gap: '24px',
                    padding: '22px 28px',
                    background: 'var(--white)',
                    borderRadius: '12px',
                    marginBottom: '10px',
                    border: platform.best ? '2px solid var(--teal)' : '1px solid var(--cream-border)',
                    alignItems: 'center',
                    transition: 'box-shadow 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)'}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                >
                  {/* Nom plateforme */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '40px', height: '40px', borderRadius: '10px',
                      background: platform.color,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'white', fontWeight: '700', fontSize: '16px', flexShrink: 0,
                    }}>{platform.name[0]}</div>
                    <div>
                      <div style={{ fontWeight: '600', fontSize: '15px', color: 'var(--ink)' }}>{platform.name}</div>
                      <div style={{ fontSize: '11px', fontWeight: '600', color: platform.type === 'DeFi' ? '#1A7F4B' : '#2D5BE3' }}>{platform.type}</div>
                    </div>
 
                  </div>
 
                  {/* APR */}
                  <div>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: '500', color: 'var(--ink)' }}>{platform.apr}%</span>
                    <span style={{ fontSize: '12px', color: 'var(--ink-muted)', marginLeft: '4px' }}>/ an</span>
                  </div>
 
                  {/* LTV */}
                  <div>
                    <span style={{ fontSize: '18px', fontWeight: '600', color: 'var(--ink)' }}>{platform.ltv}%</span>
                    <div style={{ height: '4px', background: 'var(--cream-dark)', borderRadius: '2px', marginTop: '6px', width: '80px' }}>
                      <div style={{ height: '100%', width: `${platform.ltv}%`, background: platform.color, borderRadius: '2px' }} />
                    </div>
                  </div>
 
                  {/* Emprunt max */}
                  <div style={{ fontWeight: '700', fontSize: '18px', color: 'var(--teal)' }}>
                    {mounted && price > 0 ? fmt(maxBorrow) + ' €' : '—'}
                  </div>
 
                  {/* Prix liquidation */}
                  <div>
                    <span style={{ fontSize: '16px', fontWeight: '600', color: '#E53E3E' }}>
                      {mounted && price > 0 ? fmt(liquidationPrice) + ' €' : '—'}
                    </span>
                    <div style={{ fontSize: '11px', color: 'var(--ink-muted)', marginTop: '2px' }}>par {crypto.symbol}</div>
                  </div>
 
                  {/* CTA */}
                  <a
                    href={platform.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'block', textAlign: 'center',
                      padding: '10px 16px',
                      background: platform.best ? 'var(--teal)' : 'transparent',
                      color: platform.best ? 'white' : 'var(--teal)',
                      borderRadius: '8px', fontSize: '13px', fontWeight: '600',
                      border: `1px solid ${platform.best ? 'transparent' : 'var(--teal)'}`,
                      textDecoration: 'none', transition: 'opacity 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                  >
                    Emprunter →
                  </a>
                </div>
              )
            })}
 
            {/* Disclaimer */}
            <p style={{ fontSize: '12px', color: 'var(--ink-muted)', marginTop: '16px', lineHeight: '1.6' }}>
              ⚠️ Taux indicatifs, mis à jour régulièrement. Liens affiliés présents. Ce comparateur ne constitue pas un conseil financier.
            </p>
          </div>
        </section>
 
      </main>
 
      <Footer />
    </>
  )
}
 
