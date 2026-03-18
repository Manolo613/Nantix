import Head from 'next/head'
import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const CRYPTOS = [
  { id: 'bitcoin',  symbol: 'BTC', name: 'Bitcoin',  coingeckoId: 'bitcoin',  color: '#F7931A' },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', coingeckoId: 'ethereum', color: '#627EEA' },
  { id: 'solana',   symbol: 'SOL', name: 'Solana',   coingeckoId: 'solana',   color: '#9945FF' },
]

const PLATFORMS = {
  bitcoin: [
    { name: 'Ledn',     apy: 6.5,  type: 'CeFi', color: '#0D4A45', link: 'https://ledn.io',          lock: 'Flexible', min: 0.001, best: true,  about: 'Taux fixe garanti. Proof-of-Reserves publique.' },
    { name: 'Nexo',     apy: 8.0,  type: 'CeFi', color: '#0EA5E9', link: 'https://nexo.com',          lock: 'Flexible', min: 0.001, best: false, about: 'Taux variable selon le token NEXO détenu.' },
    { name: 'Binance',  apy: 5.0,  type: 'CeFi', color: '#F3BA2F', link: 'https://binance.com',       lock: 'Flexible', min: 0.001, best: false, about: 'Épargne flexible avec retrait à tout moment.' },
    { name: 'Aave',     apy: 0.5,  type: 'DeFi', color: '#B6509E', link: 'https://aave.com',          lock: 'Aucun',    min: 0.001, best: false, about: 'Protocole DeFi. Taux variable selon la demande.' },
    { name: 'Compound', apy: 0.8,  type: 'DeFi', color: '#00D395', link: 'https://compound.finance',  lock: 'Aucun',    min: 0.001, best: false, about: 'Protocole DeFi pionnier. Taux algorithmique.' },
  ],
  ethereum: [
    { name: 'Nexo',     apy: 8.0,  type: 'CeFi', color: '#0EA5E9', link: 'https://nexo.com',          lock: 'Flexible', min: 0.01,  best: true,  about: 'Taux variable selon le token NEXO détenu.' },
    { name: 'Binance',  apy: 4.5,  type: 'CeFi', color: '#F3BA2F', link: 'https://binance.com',       lock: 'Flexible', min: 0.01,  best: false, about: 'Épargne flexible avec retrait à tout moment.' },
    { name: 'Ledn',     apy: 5.5,  type: 'CeFi', color: '#0D4A45', link: 'https://ledn.io',           lock: 'Flexible', min: 0.01,  best: false, about: 'Taux fixe garanti. Transparence sur les réserves.' },
    { name: 'Aave',     apy: 2.1,  type: 'DeFi', color: '#B6509E', link: 'https://aave.com',          lock: 'Aucun',    min: 0.001, best: false, about: 'Leader DeFi. Liquidité instantanée.' },
    { name: 'Compound', apy: 1.8,  type: 'DeFi', color: '#00D395', link: 'https://compound.finance',  lock: 'Aucun',    min: 0.001, best: false, about: 'Protocole DeFi. Taux algorithmique.' },
    { name: 'Spark',    apy: 3.2,  type: 'DeFi', color: '#FF6B35', link: 'https://spark.fi',          lock: 'Aucun',    min: 0.001, best: false, about: 'Protocole basé sur MakerDAO. Taux stables.' },
  ],
  solana: [
    { name: 'Binance',  apy: 5.0,  type: 'CeFi', color: '#F3BA2F', link: 'https://binance.com',       lock: 'Flexible', min: 0.1,   best: false, about: 'Épargne flexible SOL.' },
    { name: 'Nexo',     apy: 6.0,  type: 'CeFi', color: '#0EA5E9', link: 'https://nexo.com',          lock: 'Flexible', min: 0.1,   best: true,  about: 'Taux variable selon le token NEXO.' },
    { name: 'Kamino',   apy: 4.8,  type: 'DeFi', color: '#19FB9B', link: 'https://kamino.finance',    lock: 'Aucun',    min: 0.01,  best: false, about: 'Protocole DeFi natif Solana.' },
  ],
}

export default function Preter() {
  const [crypto, setCrypto]   = useState('bitcoin')
  const [prices, setPrices]   = useState({})
  const [amount, setAmount]   = useState(1)
  const [mounted, setMounted] = useState(false)
  const [filter, setFilter]   = useState('all')
  const [sort, setSort]       = useState('apy')

  useEffect(() => {
    setMounted(true)
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=eur')
      .then(r => r.json()).then(d => setPrices(d)).catch(() => {})
  }, [])

  const c     = CRYPTOS.find(x => x.id === crypto)
  const price = prices[c.coingeckoId]?.eur || 0
  const col   = amount * price
  const fmt   = n => Math.round(n).toLocaleString('fr-FR')
  const fmtD  = n => n.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  const rows = (PLATFORMS[crypto] || [])
    .filter(p => filter === 'all' || p.type === filter)
    .sort((a, b) => sort === 'apy' ? b.apy - a.apy : a.lock.localeCompare(b.lock))

  const wrap = { maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }

  return (
    <>
      <Head>
        <title>Nantix — Comparateur de taux de prêt crypto</title>
        <meta name="description" content="Comparez les taux offerts pour prêter votre Bitcoin, Ethereum ou Solana. APY, durée et conditions des principales plateformes CeFi et DeFi." />
      </Head>
      <Navbar />

      <main style={{ background: '#fff', minHeight: '100vh', paddingTop: '52px' }}>

        {/* HERO */}
        <section style={{ borderBottom: '1px solid #F0F0F0', padding: '36px 0 28px' }}>
          <div style={wrap}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '32px', flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: '10px', fontWeight: '700', color: '#AAA', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Comparateur</div>
                <h1 style={{ fontSize: '42px', fontWeight: '800', letterSpacing: '-1.5px', color: '#111', lineHeight: '1.1', marginBottom: '12px' }}>
                  Prêter sa crypto :<br />
                  <span style={{ color: '#AAA', fontWeight: '400' }}>comparez les taux.</span>
                </h1>
                <p style={{ fontSize: '14px', color: '#888', lineHeight: '1.6', maxWidth: '460px' }}>
                  Taux annuels (APY) proposés par les plateformes pour le prêt de Bitcoin, Ethereum et Solana — données indicatives, mises à jour régulièrement.
                </p>
              </div>
              <div style={{ display: 'flex', border: '1px solid #F0F0F0', borderRadius: '10px', overflow: 'hidden', flexShrink: 0 }}>
                {[
                  { v: '10+',  l: 'Plateformes'   },
                  { v: '8,0%', l: 'APY max BTC'   },
                  { v: '8,0%', l: 'APY max ETH'   },
                ].map((s, i) => (
                  <div key={s.l} style={{ padding: '14px 22px', borderRight: i < 2 ? '1px solid #F0F0F0' : 'none', textAlign: 'center' }}>
                    <div style={{ fontSize: '20px', fontWeight: '800', color: '#111', letterSpacing: '-0.5px' }}>{s.v}</div>
                    <div style={{ fontSize: '11px', color: '#AAA', marginTop: '2px' }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* AVERTISSEMENT */}
        <div style={{ ...wrap, paddingTop: '16px' }}>
          <div style={{ border: '1px solid #FEF3C7', background: '#FFFBEB', borderRadius: '8px', padding: '12px 16px', display: 'flex', gap: '10px' }}>
            <span style={{ fontSize: '14px', flexShrink: 0 }}>⚠️</span>
            <div style={{ fontSize: '12px', color: '#92400E', lineHeight: '1.6' }}>
              <strong>Risque de contrepartie.</strong> Prêter sa crypto implique de confier ses fonds à une plateforme (CeFi) ou à un smart contract (DeFi). En cas de faillite ou de faille, les fonds peuvent être perdus. Les taux élevés reflètent généralement un risque plus élevé.
            </div>
          </div>
        </div>

        {/* ONGLETS CRYPTO */}
        <div style={{ borderBottom: '1px solid #F0F0F0', marginTop: '16px' }}>
          <div style={{ ...wrap, display: 'flex', alignItems: 'stretch' }}>
            {CRYPTOS.map(x => (
              <button key={x.id} onClick={() => { setCrypto(x.id); setAmount(1); setFilter('all') }} style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '14px 18px', fontSize: '13px', fontWeight: '600',
                color: crypto === x.id ? '#111' : '#888',
                background: 'transparent', border: 'none',
                borderBottom: `2.5px solid ${crypto === x.id ? '#111' : 'transparent'}`,
                cursor: 'pointer', transition: 'all .15s',
              }}>
                <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: x.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '7px', fontWeight: '800', color: '#fff' }}>{x.symbol[0]}</div>
                {x.name}
                <span style={{ fontSize: '11px', opacity: 0.4 }}>{x.symbol}</span>
              </button>
            ))}
          </div>
        </div>

        {/* TOOLBAR */}
        <div style={{ borderBottom: '1px solid #F0F0F0', background: '#FAFAFA' }}>
          <div style={{ ...wrap, padding: '8px 24px', display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', background: '#fff', border: '1px solid #E0E0E0', borderRadius: '8px', overflow: 'hidden' }}>
              <div style={{ width: '24px', height: '24px', margin: '3px', borderRadius: '4px', background: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '7px', fontWeight: '800', color: '#fff', flexShrink: 0 }}>{c.symbol[0]}</div>
              <input type="number" value={amount} onChange={e => setAmount(Math.max(0.001, parseFloat(e.target.value) || 0))} step="0.1"
                style={{ border: 'none', padding: '6px 8px', fontSize: '14px', width: '70px', outline: 'none', color: '#111', background: 'transparent', fontWeight: '700' }} />
              <span style={{ padding: '0 10px', fontSize: '12px', fontWeight: '600', color: '#CCC' }}>{c.symbol}</span>
            </div>
            <span style={{ fontSize: '13px', color: '#888' }}>≈ {mounted && price > 0 ? fmt(col) : '—'} €</span>

            <div style={{ display: 'flex', background: '#EBEBEB', borderRadius: '7px', padding: '2px', marginLeft: 'auto' }}>
              {['all', 'CeFi', 'DeFi'].map(f => (
                <button key={f} onClick={() => setFilter(f)} style={{
                  padding: '5px 12px', fontSize: '12px', fontWeight: '600',
                  background: filter === f ? '#fff' : 'transparent',
                  color: filter === f ? '#111' : '#666',
                  border: 'none', cursor: 'pointer', borderRadius: '5px',
                  boxShadow: filter === f ? '0 1px 2px rgba(0,0,0,.08)' : 'none',
                }}>{f === 'all' ? 'Tout' : f}</button>
              ))}
            </div>

            <select value={sort} onChange={e => setSort(e.target.value)} style={{ border: '1px solid #E0E0E0', borderRadius: '7px', padding: '5px 8px', fontSize: '12px', background: '#fff', color: '#111', outline: 'none', cursor: 'pointer' }}>
              <option value="apy">Meilleur taux</option>
              <option value="lock">Durée de blocage</option>
            </select>
          </div>
        </div>

        {/* TABLEAU */}
        <div style={wrap}>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 80px 90px 110px 1fr 1fr 110px', padding: '10px 12px', fontSize: '10px', fontWeight: '700', color: '#BBB', textTransform: 'uppercase', letterSpacing: '.8px', borderBottom: '1px solid #F0F0F0' }}>
            <span>Plateforme</span>
            <span>APY</span>
            <span>Type</span>
            <span>Disponibilité</span>
            <span>Intérêts / mois</span>
            <span>Intérêts / an</span>
            <span></span>
          </div>

          {rows.map((p, i) => {
            const gainsAn   = price > 0 ? col * p.apy / 100 : 0
            const gainsMois = gainsAn / 12
            return (
              <div key={p.name} style={{
                display: 'grid', gridTemplateColumns: '200px 80px 90px 110px 1fr 1fr 110px',
                padding: '18px 12px',
                borderBottom: i < rows.length - 1 ? '1px solid #F7F7F7' : 'none',
                alignItems: 'center',
                background: p.best ? '#FAFAFA' : '#fff',
                transition: 'background .1s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#FAFAFA'}
              onMouseLeave={e => e.currentTarget.style.background = p.best ? '#FAFAFA' : '#fff'}
              >
                {/* Plateforme */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: p.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '800', fontSize: '14px', flexShrink: 0 }}>{p.name[0]}</div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#111' }}>{p.name}</div>
                    <div style={{ fontSize: '10px', fontWeight: '600', marginTop: '2px', color: p.type === 'DeFi' ? '#16A34A' : '#2563EB' }}>{p.type}</div>
                  </div>
                </div>

                {/* APY */}
                <div style={{ fontSize: '17px', fontWeight: '700', color: '#111', letterSpacing: '-.3px' }}>{p.apy}%</div>

                {/* Type */}
                <div>
                  <span style={{ fontSize: '11px', fontWeight: '600', padding: '3px 8px', borderRadius: '20px', background: p.type === 'DeFi' ? '#F0FDF4' : '#EFF6FF', color: p.type === 'DeFi' ? '#16A34A' : '#2563EB' }}>{p.type}</span>
                </div>

                {/* Lock */}
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#111' }}>{p.lock}</div>

                {/* Intérêts mois */}
                <div>
                  <div style={{ fontSize: '17px', fontWeight: '700', color: '#16A34A', letterSpacing: '-.3px' }}>
                    {mounted && price > 0 ? '+' + fmtD(gainsMois) + ' €' : '—'}
                  </div>
                  <div style={{ fontSize: '10px', color: '#AAA', marginTop: '2px' }}>par mois</div>
                </div>

                {/* Intérêts an */}
                <div>
                  <div style={{ fontSize: '17px', fontWeight: '700', color: '#16A34A', letterSpacing: '-.3px' }}>
                    {mounted && price > 0 ? '+' + fmt(gainsAn) + ' €' : '—'}
                  </div>
                  <div style={{ fontSize: '10px', color: '#AAA', marginTop: '2px' }}>par an</div>
                </div>

                {/* CTA */}
                <a href={p.link} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'block', textAlign: 'center', padding: '9px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: '700', textDecoration: 'none', background: p.best ? '#111' : '#fff', color: p.best ? '#fff' : '#555', border: `1.5px solid ${p.best ? '#111' : '#DCDCDC'}`, whiteSpace: 'nowrap' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#111'; e.currentTarget.style.color = p.best ? '#fff' : '#111' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = p.best ? '#111' : '#DCDCDC'; e.currentTarget.style.color = p.best ? '#fff' : '#555' }}
                >Prêter →</a>
              </div>
            )
          })}

          <div style={{ display: 'flex', gap: '10px', padding: '14px 0', borderTop: '1px solid #F0F0F0', marginTop: '4px' }}>
            <span>🔍</span>
            <p style={{ fontSize: '11px', color: '#666', lineHeight: '1.6' }}>
              <strong style={{ color: '#444' }}>Indépendance éditoriale.</strong> Nantix est un comparateur indépendant. Les APY affichés sont indicatifs et varient selon les conditions de marché. Des commissions d'affiliation peuvent être perçues via certains liens — elles ne modifient pas notre classement.
            </p>
          </div>
        </div>

      </main>
      <Footer />
    </>
  )
}
