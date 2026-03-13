import Head from 'next/head'
import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
 
const CRYPTOS = [
  { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', color: '#F7931A', coingeckoId: 'bitcoin' },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', color: '#627EEA', coingeckoId: 'ethereum' },
  { id: 'solana', symbol: 'SOL', name: 'Solana', color: '#9945FF', coingeckoId: 'solana' },
  { id: 'ripple', symbol: 'XRP', name: 'XRP', color: '#00AAE4', coingeckoId: 'ripple' },
  { id: 'binancecoin', symbol: 'BNB', name: 'BNB', color: '#F3BA2F', coingeckoId: 'binancecoin' },
  { id: 'cardano', symbol: 'ADA', name: 'Cardano', color: '#0033AD', coingeckoId: 'cardano' },
]
 
const PLATFORMS = {
  bitcoin: [
    { name: 'Nexo', ltv: 50, apr: 13.9, liquidationThreshold: 83, type: 'CeFi', color: '#0ea5e9', link: 'https://nexo.com', best: false },
    { name: 'Ledn', ltv: 50, apr: 11.9, liquidationThreshold: 80, type: 'CeFi', color: '#0D4A45', link: 'https://ledn.io', best: true },
    { name: 'Aave', ltv: 70, apr: 4.2, liquidationThreshold: 82.5, type: 'DeFi', color: '#B6509E', link: 'https://aave.com', best: false },
    { name: 'Compound', ltv: 65, apr: 5.1, liquidationThreshold: 80, type: 'DeFi', color: '#00D395', link: 'https://compound.finance', best: false },
  ],
  ethereum: [
    { name: 'Nexo', ltv: 50, apr: 13.9, liquidationThreshold: 83, type: 'CeFi', color: '#0ea5e9', link: 'https://nexo.com', best: false },
    { name: 'Aave', ltv: 80, apr: 3.8, liquidationThreshold: 82.5, type: 'DeFi', color: '#B6509E', link: 'https://aave.com', best: true },
    { name: 'Compound', ltv: 75, apr: 4.5, liquidationThreshold: 80, type: 'DeFi', color: '#00D395', link: 'https://compound.finance', best: false },
    { name: 'Spark', ltv: 74, apr: 4.1, liquidationThreshold: 79, type: 'DeFi', color: '#FF6B35', link: 'https://spark.fi', best: false },
  ],
  solana: [
    { name: 'Nexo', ltv: 40, apr: 15.9, liquidationThreshold: 70, type: 'CeFi', color: '#0ea5e9', link: 'https://nexo.com', best: true },
    { name: 'MarginFi', ltv: 60, apr: 6.2, liquidationThreshold: 75, type: 'DeFi', color: '#9945FF', link: 'https://marginfi.com', best: false },
  ],
  ripple: [
    { name: 'Nexo', ltv: 40, apr: 15.9, liquidationThreshold: 70, type: 'CeFi', color: '#0ea5e9', link: 'https://nexo.com', best: true },
    { name: 'YouHodler', ltv: 50, apr: 14.9, liquidationThreshold: 72, type: 'CeFi', color: '#00AAE4', link: 'https://youhodler.com', best: false },
  ],
  binancecoin: [
    { name: 'Nexo', ltv: 50, apr: 13.9, liquidationThreshold: 80, type: 'CeFi', color: '#0ea5e9', link: 'https://nexo.com', best: false },
    { name: 'Aave', ltv: 60, apr: 4.8, liquidationThreshold: 75, type: 'DeFi', color: '#B6509E', link: 'https://aave.com', best: true },
  ],
  cardano: [
    { name: 'Nexo', ltv: 40, apr: 15.9, liquidationThreshold: 70, type: 'CeFi', color: '#0ea5e9', link: 'https://nexo.com', best: true },
    { name: 'YouHodler', ltv: 45, apr: 14.5, liquidationThreshold: 68, type: 'CeFi', color: '#0033AD', link: 'https://youhodler.com', best: false },
  ],
}
 
export default function Comparateur() {
  const [selectedCrypto, setSelectedCrypto] = useState('bitcoin')
  const [prices, setPrices] = useState({})
  const [amount, setAmount] = useState(1)
  const [mounted, setMounted] = useState(false)
  const [sortBy, setSortBy] = useState('apr')
  const [filter, setFilter] = useState('all')
 
  useEffect(() => {
    setMounted(true)
    const ids = CRYPTOS.map(c => c.coingeckoId).join(',')
    fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=eur`)
      .then(r => r.json())
      .then(d => setPrices(d))
      .catch(() => {})
  }, [])
 
  const crypto = CRYPTOS.find(c => c.id === selectedCrypto)
  const price = prices[crypto.coingeckoId]?.eur || 0
  const collateral = amount * price
  const platforms = PLATFORMS[selectedCrypto] || []
 
  const filtered = platforms
    .filter(p => filter === 'all' || p.type === filter)
    .sort((a, b) => sortBy === 'apr' ? a.apr - b.apr : b.ltv - a.ltv)
 
  return (
    <>
      <Head>
        <title>Comparateur prêts crypto — Nantix</title>
        <meta name="description" content="Comparez les meilleurs taux de prêt collatéralisé pour Bitcoin, Ethereum, Solana et plus. Nexo, Ledn, Aave, Compound — tout en temps réel." />
      </Head>
 
      <Navbar />
 
      <main style={{ paddingTop: '64px' }}>
 
        {/* Header */}
        <section style={{ background: 'var(--cream)', padding: '60px 40px 32px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '48px',
              fontWeight: '500',
              color: 'var(--ink)',
              letterSpacing: '-1px',
              marginBottom: '12px',
            }}>Comparateur de prêts crypto</h1>
            <p style={{ color: 'var(--ink-muted)', fontSize: '16px' }}>
              Choisissez votre crypto et comparez instantanément les meilleures offres.
            </p>
          </div>
        </section>
 
        {/* Crypto selector */}
        <section style={{ background: 'var(--cream)', padding: '0 40px 32px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {CRYPTOS.map(c => (
                <button
                  key={c.id}
                  onClick={() => { setSelectedCrypto(c.id); setAmount(1); setFilter('all') }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 18px',
                    borderRadius: '100px',
                    border: selectedCrypto === c.id ? `2px solid ${c.color}` : '2px solid var(--cream-border)',
                    background: selectedCrypto === c.id ? `${c.color}15` : 'var(--white)',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: selectedCrypto === c.id ? c.color : 'var(--ink-muted)',
                    transition: 'all 0.2s',
                  }}
                >
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: c.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '9px',
                    fontWeight: '800',
                    flexShrink: 0,
                  }}>{c.symbol[0]}</div>
                  {c.name}
                  <span style={{ fontSize: '12px', opacity: 0.7 }}>{c.symbol}</span>
                </button>
              ))}
            </div>
          </div>
        </section>
 
        {/* Calculator bar */}
        <section style={{
          background: 'var(--cream-dark)',
          borderTop: '1px solid var(--cream-border)',
          borderBottom: '1px solid var(--cream-border)',
          padding: '28px 40px',
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', gap: '40px', alignItems: 'center', flexWrap: 'wrap' }}>
              <div>
                <label style={{ fontSize: '13px', color: 'var(--ink-muted)', display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                  Montant de {crypto.symbol} à nantir
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: 'var(--white)',
                    border: '1px solid var(--cream-border)',
                    borderRadius: '8px',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      background: crypto.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '11px',
                      fontWeight: '800',
                      flexShrink: 0,
                      margin: '4px',
                      borderRadius: '6px',
                    }}>{crypto.symbol[0]}</div>
                    <input
                      type="number"
                      value={amount}
                      onChange={e => setAmount(Math.max(0.001, parseFloat(e.target.value) || 0))}
                      step="0.1"
                      style={{
                        border: 'none',
                        padding: '12px 16px',
                        fontSize: '20px',
                        fontFamily: 'var(--font-display)',
                        width: '140px',
                        outline: 'none',
                        color: 'var(--ink)',
                        background: 'transparent',
                      }}
                    />
                    <span style={{ padding: '0 16px', fontWeight: '600', color: 'var(--ink-muted)' }}>{crypto.symbol}</span>
                  </div>
                  <span style={{ color: 'var(--ink-muted)', fontSize: '15px' }}>
                    = {mounted && price > 0 ? collateral.toLocaleString('fr-FR', { maximumFractionDigits: 0 }) : '—'} €
                  </span>
                </div>
              </div>
 
              <div style={{ display: 'flex', gap: '12px', marginLeft: 'auto', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', background: 'var(--white)', borderRadius: '8px', border: '1px solid var(--cream-border)', overflow: 'hidden' }}>
                  {['all', 'CeFi', 'DeFi'].map(f => (
                    <button key={f} onClick={() => setFilter(f)} style={{
                      padding: '10px 18px',
                      fontSize: '13px',
                      fontWeight: '600',
                      background: filter === f ? 'var(--teal)' : 'transparent',
                      color: filter === f ? 'white' : 'var(--ink-muted)',
                      cursor: 'pointer',
                      border: 'none',
                      transition: 'all 0.2s',
                    }}>{f === 'all' ? 'Tout' : f}</button>
                  ))}
                </div>
 
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  style={{
                    border: '1px solid var(--cream-border)',
                    borderRadius: '8px',
                    padding: '10px 16px',
                    fontSize: '13px',
                    background: 'var(--white)',
                    color: 'var(--ink)',
                    cursor: 'pointer',
                    outline: 'none',
                  }}
                >
                  <option value="apr">Trier : meilleur taux</option>
                  <option value="ltv">Trier : LTV maximum</option>
                </select>
              </div>
            </div>
          </div>
        </section>
 
        {/* Table */}
        <section style={{ background: 'var(--cream)', padding: '32px 40px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
 
            {filtered.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '60px',
                background: 'var(--white)',
                borderRadius: '16px',
                border: '1px solid var(--cream-border)',
              }}>
                <p style={{ fontSize: '18px', color: 'var(--ink-muted)' }}>
                  Aucune plateforme {filter} ne propose de prêt sur {crypto.name} pour le moment.
                </p>
                <button onClick={() => setFilter('all')} style={{
                  marginTop: '16px',
                  padding: '10px 24px',
                  background: 'var(--teal)',
                  color: 'white',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '600',
                }}>Voir toutes les plateformes</button>
              </div>
            ) : (
              <>
                {/* Table header */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '200px 1fr 1fr 1fr 1fr 160px',
                  gap: '16px',
                  padding: '12px 24px',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: 'var(--ink-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.8px',
                  marginBottom: '8px',
                }}>
                  <span>Plateforme</span>
                  <span>APR annuel</span>
                  <span>LTV max</span>
                  <span>Emprunt max</span>
                  <span>Liquidation {crypto.symbol}</span>
                  <span></span>
                </div>
 
                {filtered.map(platform => {
                  const maxBorrow = (collateral * platform.ltv) / 100
                  const liquidationPrice = price > 0
                    ? (collateral * (platform.liquidationThreshold / 100)) / amount
                    : 0
 
                  return (
                    <div key={platform.name} style={{
                      display: 'grid',
                      gridTemplateColumns: '200px 1fr 1fr 1fr 1fr 160px',
                      gap: '16px',
                      padding: '20px 24px',
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
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '10px',
                          background: platform.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontWeight: '700',
                          fontSize: '16px',
                          flexShrink: 0,
                        }}>{platform.name[0]}</div>
                        <div>
                          <div style={{ fontWeight: '600', fontSize: '15px' }}>{platform.name}</div>
                          <div style={{ fontSize: '11px', color: platform.type === 'DeFi' ? '#1A7F4B' : '#2D5BE3', fontWeight: '600' }}>{platform.type}</div>
                        </div>
                        {platform.best && (
                          <span style={{ fontSize: '10px', background: 'var(--teal)', color: 'white', padding: '2px 6px', borderRadius: '4px', fontWeight: '700' }}>TOP</span>
                        )}
                      </div>
 
                      <div>
                        <span style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: '500', color: 'var(--ink)' }}>{platform.apr}%</span>
                        <span style={{ fontSize: '12px', color: 'var(--ink-muted)', marginLeft: '4px' }}>APR</span>
                      </div>
 
                      <div>
                        <span style={{ fontSize: '18px', fontWeight: '600' }}>{platform.ltv}%</span>
                        <div style={{ height: '4px', background: 'var(--cream-dark)', borderRadius: '2px', marginTop: '6px', width: '80px' }}>
                          <div style={{ height: '100%', width: `${platform.ltv}%`, background: platform.color, borderRadius: '2px' }} />
                        </div>
                      </div>
 
                      <div style={{ fontWeight: '700', fontSize: '18px', color: 'var(--teal)' }}>
                        {mounted && price > 0 ? maxBorrow.toLocaleString('fr-FR', { maximumFractionDigits: 0 }) : '—'} €
                      </div>
 
                      <div>
                        <span style={{ fontSize: '16px', fontWeight: '600', color: '#E53E3E' }}>
                          {mounted && price > 0 ? liquidationPrice.toLocaleString('fr-FR', { maximumFractionDigits: 0 }) : '—'} €
                        </span>
                        <div style={{ fontSize: '11px', color: 'var(--ink-muted)', marginTop: '2px' }}>prix/{crypto.symbol}</div>
                      </div>
 
                      <a href={platform.link} target="_blank" rel="noopener noreferrer" style={{
                        display: 'block',
                        textAlign: 'center',
                        padding: '10px 16px',
                        background: platform.best ? 'var(--teal)' : 'transparent',
                        color: platform.best ? 'white' : 'var(--teal)',
                        borderRadius: '8px',
                        fontSize: '13px',
                        fontWeight: '600',
                        border: `1px solid ${platform.best ? 'transparent' : 'var(--teal)'}`,
                        transition: 'opacity 0.2s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
                      onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                      >Emprunter →</a>
                    </div>
                  )
                })}
              </>
            )}
          </div>
        </section>
 
        {/* Info bloc */}
        <section style={{ background: 'var(--cream-dark)', padding: '32px 40px', borderTop: '1px solid var(--cream-border)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '40px', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '13px', color: 'var(--ink-muted)', lineHeight: '1.6', maxWidth: '700px' }}>
                ⚠️ Les taux affichés sont indicatifs et peuvent varier. Nantix contient des liens affiliés — cela ne biaise pas nos comparaisons. Ce comparateur ne constitue pas un conseil financier.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '24px' }}>
              {[
                { label: 'Cryptos supportées', value: '6' },
                { label: 'Plateformes comparées', value: '6+' },
                { label: 'Mise à jour', value: 'Temps réel' },
              ].map(stat => (
                <div key={stat.label} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: '500', color: 'var(--ink)' }}>{stat.value}</div>
                  <div style={{ fontSize: '11px', color: 'var(--ink-muted)', marginTop: '2px' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
 
      </main>
 
      <Footer />
    </>
  )
}
 
