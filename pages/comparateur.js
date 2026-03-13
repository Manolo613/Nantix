import Head from 'next/head'
import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
 
const PLATFORMS = [
  { name: 'Nexo', ltv: 50, apr: 13.9, liquidationThreshold: 83, type: 'CeFi', color: '#1B5E8C', link: 'https://nexo.com', pros: ['Instantané', 'Flexible'], cons: ['Taux élevé'] },
  { name: 'Ledn', ltv: 50, apr: 11.9, liquidationThreshold: 80, type: 'CeFi', color: '#0D4A45', link: 'https://ledn.io', pros: ['Taux compétitif', 'Fiable'], cons: ['LTV limité'], best: true },
  { name: 'Aave', ltv: 70, apr: 4.2, liquidationThreshold: 82.5, type: 'DeFi', color: '#B6509E', link: 'https://aave.com', pros: ['Taux le plus bas', 'LTV élevé'], cons: ['Technique'] },
  { name: 'Compound', ltv: 65, apr: 5.1, liquidationThreshold: 80, type: 'DeFi', color: '#00D395', link: 'https://compound.finance', pros: ['Décentralisé', 'Transparent'], cons: ['Interface complexe'] },
]
 
export default function Comparateur() {
  const [btcPrice, setBtcPrice] = useState(85000)
  const [btcAmount, setBtcAmount] = useState(1)
  const [mounted, setMounted] = useState(false)
  const [sortBy, setSortBy] = useState('apr')
  const [filter, setFilter] = useState('all')
 
  useEffect(() => {
    setMounted(true)
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur')
      .then(r => r.json())
      .then(d => d?.bitcoin?.eur && setBtcPrice(d.bitcoin.eur))
      .catch(() => {})
  }, [])
 
  const collateral = btcAmount * btcPrice
 
  const filtered = PLATFORMS
    .filter(p => filter === 'all' || p.type === filter)
    .sort((a, b) => sortBy === 'apr' ? a.apr - b.apr : b.ltv - a.ltv)
 
  return (
    <>
      <Head>
        <title>Comparateur prêts Bitcoin — Nantix</title>
        <meta name="description" content="Comparez Nexo, Ledn, Aave et Compound pour votre prêt Bitcoin. Taux, LTV, liquidation — tout en temps réel." />
      </Head>
 
      <Navbar />
 
      <main style={{ paddingTop: '64px' }}>
        {/* Header */}
        <section style={{ background: 'var(--cream)', padding: '60px 40px 40px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '48px',
              fontWeight: '500',
              color: 'var(--ink)',
              letterSpacing: '-1px',
              marginBottom: '12px',
            }}>Comparateur de prêts Bitcoin</h1>
            <p style={{ color: 'var(--ink-muted)', fontSize: '16px' }}>
              Entrez votre montant et comparez instantanément les meilleures offres.
            </p>
          </div>
        </section>
 
        {/* Calculator */}
        <section style={{ background: 'var(--cream-dark)', borderTop: '1px solid var(--cream-border)', borderBottom: '1px solid var(--cream-border)', padding: '32px 40px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', gap: '40px', alignItems: 'center', flexWrap: 'wrap' }}>
              <div>
                <label style={{ fontSize: '13px', color: 'var(--ink-muted)', display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                  Montant de BTC à nantir
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <input
                    type="number"
                    value={btcAmount}
                    onChange={e => setBtcAmount(Math.max(0.001, parseFloat(e.target.value) || 0))}
                    step="0.1"
                    style={{
                      border: '1px solid var(--cream-border)',
                      borderRadius: '8px',
                      padding: '12px 16px',
                      fontSize: '20px',
                      fontFamily: 'var(--font-display)',
                      background: 'var(--white)',
                      width: '160px',
                      outline: 'none',
                      color: 'var(--ink)',
                    }}
                  />
                  <span style={{ fontWeight: '600', color: 'var(--ink-muted)' }}>BTC</span>
                  <span style={{ color: 'var(--ink-muted)', fontSize: '15px' }}>
                    = {mounted ? collateral.toLocaleString('fr-FR') : '—'} €
                  </span>
                </div>
              </div>
 
              <div style={{ display: 'flex', gap: '12px', marginLeft: 'auto', flexWrap: 'wrap' }}>
                {/* Filter */}
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
 
                {/* Sort */}
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
                  <option value="apr">Trier par : meilleur taux</option>
                  <option value="ltv">Trier par : LTV maximum</option>
                </select>
              </div>
            </div>
          </div>
        </section>
 
        {/* Table */}
        <section style={{ background: 'var(--cream)', padding: '40px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
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
              <span>Liquidation BTC</span>
              <span></span>
            </div>
 
            {filtered.map(platform => {
              const maxBorrow = (collateral * platform.ltv) / 100
              const liquidationPrice = (collateral * (platform.liquidationThreshold / 100)) / btcAmount
 
              return (
                <div key={platform.name} style={{
                  display: 'grid',
                  gridTemplateColumns: '200px 1fr 1fr 1fr 1fr 160px',
                  gap: '16px',
                  padding: '20px 24px',
                  background: 'var(--white)',
                  borderRadius: '12px',
                  marginBottom: '12px',
                  border: platform.best ? '2px solid var(--teal)' : '1px solid var(--cream-border)',
                  alignItems: 'center',
                  transition: 'box-shadow 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                >
                  {/* Name */}
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
                    {platform.best && <span style={{ fontSize: '10px', background: 'var(--teal)', color: 'white', padding: '2px 6px', borderRadius: '4px', fontWeight: '700' }}>TOP</span>}
                  </div>
 
                  {/* APR */}
                  <div>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: '500', color: 'var(--ink)' }}>{platform.apr}%</span>
                    <span style={{ fontSize: '12px', color: 'var(--ink-muted)', marginLeft: '4px' }}>APR</span>
                  </div>
 
                  {/* LTV */}
                  <div>
                    <span style={{ fontSize: '18px', fontWeight: '600' }}>{platform.ltv}%</span>
                    <div style={{
                      height: '4px',
                      background: 'var(--cream-dark)',
                      borderRadius: '2px',
                      marginTop: '6px',
                      width: '80px',
                    }}>
                      <div style={{ height: '100%', width: `${platform.ltv}%`, background: platform.color, borderRadius: '2px' }} />
                    </div>
                  </div>
 
                  {/* Max borrow */}
                  <div style={{ fontWeight: '700', fontSize: '18px', color: 'var(--teal)' }}>
                    {mounted ? maxBorrow.toLocaleString('fr-FR', { maximumFractionDigits: 0 }) : '—'} €
                  </div>
 
                  {/* Liquidation */}
                  <div>
                    <span style={{ fontSize: '16px', fontWeight: '600', color: '#E53E3E' }}>
                      {mounted ? liquidationPrice.toLocaleString('fr-FR', { maximumFractionDigits: 0 }) : '—'} €
                    </span>
                    <div style={{ fontSize: '11px', color: 'var(--ink-muted)', marginTop: '2px' }}>prix/BTC</div>
                  </div>
 
                  {/* CTA */}
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
                  }}>Emprunter →</a>
                </div>
              )
            })}
          </div>
        </section>
 
        {/* Disclaimer */}
        <section style={{ background: 'var(--cream-dark)', padding: '24px 40px', borderTop: '1px solid var(--cream-border)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <p style={{ fontSize: '13px', color: 'var(--ink-muted)', lineHeight: '1.6' }}>
              ⚠️ Les taux affichés sont indicatifs et peuvent varier. Nantix contient des liens affiliés — cela ne biaise pas nos comparaisons. Ce comparateur ne constitue pas un conseil financier. Vérifiez toujours les conditions sur le site de la plateforme.
            </p>
          </div>
        </section>
      </main>
 
      <Footer />
    </>
  )
}
