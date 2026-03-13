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
    { name: 'Nexo',     ltv: 50, apr: 13.9, liquidationThreshold: 83,   type: 'CeFi', color: '#0EA5E9', link: 'https://nexo.com',        best: false },
    { name: 'Ledn',     ltv: 50, apr: 11.9, liquidationThreshold: 80,   type: 'CeFi', color: '#0D4A45', link: 'https://ledn.io',          best: true  },
    { name: 'Aave',     ltv: 70, apr: 4.2,  liquidationThreshold: 82.5, type: 'DeFi', color: '#B6509E', link: 'https://aave.com',         best: false },
    { name: 'Compound', ltv: 65, apr: 5.1,  liquidationThreshold: 80,   type: 'DeFi', color: '#00D395', link: 'https://compound.finance', best: false },
  ],
  ethereum: [
    { name: 'Nexo',     ltv: 50, apr: 13.9, liquidationThreshold: 83,   type: 'CeFi', color: '#0EA5E9', link: 'https://nexo.com',        best: false },
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
 
  return (
    <>
      <Head>
        <title>Nantix — Comparez les prêts Bitcoin & Ethereum</title>
        <meta name="description" content="Le seul comparateur francophone de prêts crypto collatéralisés. Comparez Nexo, Ledn, Aave, Compound en temps réel." />
        <style>{`
          @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.2} }
        `}</style>
      </Head>
 
      <Navbar />
 
      <main style={{ background: '#fff', minHeight: '100vh', paddingTop: '56px' }}>
 
        {/* Hero */}
        <section style={{ padding: '40px 32px 32px', borderBottom: '1px solid #F2F2F2' }}>
 
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '28px', gap: '16px', flexWrap: 'wrap' }}>
            <div>
              <h1 style={{ fontSize: '32px', fontWeight: '800', letterSpacing: '-1.2px', color: '#111', lineHeight: '1.1', marginBottom: '10px' }}>
                Empruntez en euros.<br />
                <span style={{ color: '#888', fontWeight: '400' }}>Gardez votre crypto.</span>
              </h1>
              <p style={{ fontSize: '14px', color: '#999', lineHeight: '1.6', maxWidth: '460px' }}>
                Le seul comparateur francophone de prêts crypto — sans vendre, sans impôt sur les plus-values.
              </p>
            </div>
 
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px', flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#999' }}>
                <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#16A34A', animation: 'pulse 2s infinite' }} />
                Prix mis à jour en temps réel
              </div>
              <div style={{ display: 'flex', border: '1px solid #F2F2F2', borderRadius: '10px', overflow: 'hidden' }}>
                {[
                  { value: '5',    label: 'Plateformes' },
                  { value: '3,8%', label: 'Meilleur taux' },
                  { value: '80%',  label: 'LTV max' },
                ].map((s, i) => (
                  <div key={s.label} style={{
                    padding: '14px 24px',
                    borderRight: i < 2 ? '1px solid #F2F2F2' : 'none',
                  }}>
                    <div style={{ fontSize: '22px', fontWeight: '800', color: '#111', letterSpacing: '-0.8px' }}>{s.value}</div>
                    <div style={{ fontSize: '11px', color: '#AAA', marginTop: '2px' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
 
          {/* Étapes */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', border: '1px solid #F2F2F2', borderRadius: '10px', overflow: 'hidden' }}>
            {[
              { n: '01', title: 'Choisissez votre crypto',  desc: 'Entrez le montant de BTC ou ETH à nantir.' },
              { n: '02', title: 'Comparez les offres',       desc: 'Taux, LTV et liquidation côte à côte.' },
              { n: '03', title: 'Recevez vos euros',         desc: 'Directement sur votre compte bancaire.' },
            ].map((step, i) => (
              <div key={step.n} style={{
                padding: '16px 24px',
                borderRight: i < 2 ? '1px solid #F2F2F2' : 'none',
                display: 'flex', alignItems: 'center', gap: '12px',
              }}>
                <span style={{ fontSize: '11px', fontWeight: '800', color: '#DDD', letterSpacing: '0.5px', flexShrink: 0 }}>{step.n}</span>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#111' }}>{step.title}</div>
                  <div style={{ fontSize: '11px', color: '#AAA', marginTop: '2px', lineHeight: '1.5' }}>{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
 
        </section>
 
        {/* Contrôles */}
        <section style={{
          padding: '12px 32px',
          borderBottom: '1px solid #F2F2F2',
          background: '#FAFAFA',
          display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap',
        }}>
 
          {/* Crypto toggle */}
          <div style={{ display: 'flex', gap: '8px' }}>
            {CRYPTOS.map(c => (
              <button
                key={c.id}
                onClick={() => { setSelectedCrypto(c.id); setAmount(1); setFilter('all') }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '6px 14px', borderRadius: '20px',
                  border: `1px solid ${selectedCrypto === c.id ? c.color : '#E8E8E8'}`,
                  background: selectedCrypto === c.id ? `${c.color}14` : '#fff',
                  cursor: 'pointer', fontSize: '13px', fontWeight: '600',
                  color: selectedCrypto === c.id ? c.color : '#999',
                  transition: 'all .15s',
                }}
              >
                <div style={{
                  width: '18px', height: '18px', borderRadius: '50%',
                  background: c.color, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '8px', fontWeight: '800',
                  color: '#fff', flexShrink: 0,
                }}>{c.symbol[0]}</div>
                {c.name}
                <span style={{ fontSize: '11px', opacity: 0.35 }}>{c.symbol}</span>
              </button>
            ))}
          </div>
 
          {/* Séparateur */}
          <div style={{ width: '1px', height: '20px', background: '#E8E8E8' }} />
 
          {/* Input montant */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', background: '#fff', border: '1px solid #E8E8E8', borderRadius: '8px', overflow: 'hidden' }}>
              <div style={{
                width: '26px', height: '26px', margin: '4px', borderRadius: '5px',
                background: crypto.color, display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '8px', fontWeight: '800',
                color: '#fff', flexShrink: 0,
              }}>{crypto.symbol[0]}</div>
              <input
                type="number"
                value={amount}
                onChange={e => setAmount(Math.max(0.001, parseFloat(e.target.value) || 0))}
                step="0.1"
                style={{
                  border: 'none', padding: '6px 8px', fontSize: '15px',
                  width: '78px', outline: 'none', color: '#111',
                  background: 'transparent', fontWeight: '700',
                }}
              />
              <span style={{ padding: '0 10px', fontSize: '12px', fontWeight: '600', color: '#CCC' }}>{crypto.symbol}</span>
            </div>
            <span style={{ fontSize: '13px', color: '#AAA', whiteSpace: 'nowrap' }}>
              ≈ {mounted && price > 0 ? fmt(collateral) : '—'} €
            </span>
          </div>
 
          {/* Séparateur */}
          <div style={{ width: '1px', height: '20px', background: '#E8E8E8' }} />
 
          {/* Filtre pill */}
          <div style={{ display: 'flex', gap: '2px', background: '#EEEEED', borderRadius: '8px', padding: '2px' }}>
            {['all', 'CeFi', 'DeFi'].map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{
                padding: '6px 14px', fontSize: '12px', fontWeight: '600',
                background: filter === f ? '#fff' : 'transparent',
                color: filter === f ? '#111' : '#999',
                border: 'none', cursor: 'pointer', borderRadius: '6px',
                transition: 'all .15s',
                boxShadow: filter === f ? '0 1px 3px rgba(0,0,0,.1)' : 'none',
              }}>{f === 'all' ? 'Tout' : f}</button>
            ))}
          </div>
 
          {/* Tri */}
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            style={{
              border: '1px solid #E8E8E8', borderRadius: '8px',
              padding: '6px 10px', fontSize: '12px',
              background: '#fff', color: '#111',
              cursor: 'pointer', outline: 'none', marginLeft: 'auto',
            }}
          >
            <option value="apr">Trier : meilleur taux</option>
            <option value="ltv">Trier : LTV max</option>
          </select>
 
        </section>
 
        {/* Tableau */}
        <section style={{ padding: '0 32px' }}>
 
          {/* Header colonnes */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '200px 120px 120px 1fr 1fr 120px',
            padding: '10px 12px',
            fontSize: '10px', fontWeight: '700', color: '#CCC',
            textTransform: 'uppercase', letterSpacing: '.9px',
            borderBottom: '1px solid #F2F2F2',
          }}>
            <span>Plateforme</span>
            <span>Taux annuel</span>
            <span>LTV max</span>
            <span>Emprunt max</span>
            <span>Liquidation {crypto.symbol}</span>
            <span></span>
          </div>
 
          {/* Lignes */}
          {filtered.map((platform, i) => {
            const maxBorrow        = (collateral * platform.ltv) / 100
            const liquidationPrice = price > 0 ? (collateral * (platform.liquidationThreshold / 100)) / amount : 0
 
            return (
              <div
                key={platform.name}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '200px 120px 120px 1fr 1fr 120px',
                  padding: '18px 12px',
                  borderBottom: i < filtered.length - 1 ? '1px solid #F7F7F7' : 'none',
                  alignItems: 'center',
                  background: platform.best ? '#FAFAFA' : '#fff',
                  transition: 'background .12s',
                  cursor: 'default',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#FAFAFA'}
                onMouseLeave={e => e.currentTarget.style.background = platform.best ? '#FAFAFA' : '#fff'}
              >
                {/* Plateforme */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '38px', height: '38px', borderRadius: '10px',
                    background: platform.color, display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontWeight: '800', fontSize: '15px', flexShrink: 0,
                  }}>{platform.name[0]}</div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: '#111', lineHeight: '1.2' }}>{platform.name}</div>
                    <div style={{ fontSize: '10px', fontWeight: '700', marginTop: '2px', letterSpacing: '.3px', color: platform.type === 'DeFi' ? '#16A34A' : '#2563EB' }}>{platform.type}</div>
                  </div>
                </div>
 
                {/* APR */}
                <div style={{ fontSize: '17px', fontWeight: '700', color: '#111', letterSpacing: '-.3px' }}>
                  {platform.apr}%
                </div>
 
                {/* LTV */}
                <div>
                  <div style={{ fontSize: '17px', fontWeight: '700', color: '#111', letterSpacing: '-.3px' }}>{platform.ltv}%</div>
                  <div style={{ height: '3px', background: '#F0F0F0', borderRadius: '2px', marginTop: '5px', width: '60px' }}>
                    <div style={{ height: '100%', width: `${platform.ltv}%`, background: platform.color, borderRadius: '2px' }} />
                  </div>
                </div>
 
                {/* Emprunt max */}
                <div style={{ fontSize: '17px', fontWeight: '700', color: '#16A34A', letterSpacing: '-.3px' }}>
                  {mounted && price > 0 ? fmt(maxBorrow) + ' €' : '—'}
                </div>
 
                {/* Liquidation */}
                <div>
                  <div style={{ fontSize: '17px', fontWeight: '700', color: '#DC2626', letterSpacing: '-.3px' }}>
                    {mounted && price > 0 ? fmt(liquidationPrice) + ' €' : '—'}
                  </div>
                  <div style={{ fontSize: '11px', color: '#CCC', marginTop: '2px' }}>par {crypto.symbol}</div>
                </div>
 
                {/* CTA */}
                <a
                  href={platform.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'block', textAlign: 'center',
                    padding: '9px 16px', borderRadius: '8px',
                    fontSize: '12px', fontWeight: '700',
                    background: platform.best ? '#111' : '#fff',
                    color: platform.best ? '#fff' : '#555',
                    border: `1.5px solid ${platform.best ? '#111' : '#E0E0E0'}`,
                    textDecoration: 'none', transition: 'all .15s', whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#111'; e.currentTarget.style.color = platform.best ? '#fff' : '#111' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = platform.best ? '#111' : '#E0E0E0'; e.currentTarget.style.color = platform.best ? '#fff' : '#555' }}
                >
                  Emprunter →
                </a>
              </div>
            )
          })}
 
        </section>
 
        {/* Footer disclaimer */}
        <div style={{ padding: '14px 32px', borderTop: '1px solid #F2F2F2', fontSize: '11px', color: '#CCC', lineHeight: '1.6' }}>
          ⚠️ Taux indicatifs mis à jour régulièrement. Liens affiliés présents. Pas un conseil financier.
        </div>
 
      </main>
 
      <Footer />
    </>
  )
}
 
