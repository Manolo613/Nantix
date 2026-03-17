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
    { name: 'Nexo',     ltv: 50, apr: 13.9, liq: 83,   type: 'CeFi', color: '#0EA5E9', link: 'https://nexo.com',        best: false },
    { name: 'Ledn',     ltv: 50, apr: 11.9, liq: 80,   type: 'CeFi', color: '#0D4A45', link: 'https://ledn.io',          best: true  },
    { name: 'Aave',     ltv: 70, apr: 4.2,  liq: 82.5, type: 'DeFi', color: '#B6509E', link: 'https://aave.com',         best: false },
    { name: 'Compound', ltv: 65, apr: 5.1,  liq: 80,   type: 'DeFi', color: '#00D395', link: 'https://compound.finance', best: false },
  ],
  ethereum: [
    { name: 'Nexo',     ltv: 50, apr: 13.9, liq: 83,   type: 'CeFi', color: '#0EA5E9', link: 'https://nexo.com',        best: false },
    { name: 'Aave',     ltv: 80, apr: 3.8,  liq: 82.5, type: 'DeFi', color: '#B6509E', link: 'https://aave.com',         best: true  },
    { name: 'Compound', ltv: 75, apr: 4.5,  liq: 80,   type: 'DeFi', color: '#00D395', link: 'https://compound.finance', best: false },
    { name: 'Spark',    ltv: 74, apr: 4.1,  liq: 79,   type: 'DeFi', color: '#FF6B35', link: 'https://spark.fi',         best: false },
  ],
}

export default function Home() {
  const [crypto, setCrypto]   = useState('bitcoin')
  const [prices, setPrices]   = useState({})
  const [amount, setAmount]   = useState(1)
  const [mounted, setMounted] = useState(false)
  const [sort, setSort]       = useState('apr')
  const [filter, setFilter]   = useState('all')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setMounted(true)
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=eur')
      .then(r => r.json()).then(d => setPrices(d)).catch(() => {})
    return () => window.removeEventListener('resize', check)
  }, [])

  const c     = CRYPTOS.find(x => x.id === crypto)
  const price = prices[c.coingeckoId]?.eur || 0
  const col   = amount * price
  const fmt   = n => Math.round(n).toLocaleString('fr-FR')

  const rows = (PLATFORMS[crypto] || [])
    .filter(p => filter === 'all' || p.type === filter)
    .sort((a, b) => sort === 'apr' ? a.apr - b.apr : b.ltv - a.ltv)

  const sep = <div style={{ width: '1px', height: '18px', background: '#E8E8E8' }} />

  return (
    <>
      <Head>
        <title>Nantix — Comparez les prêts Bitcoin & Ethereum</title>
        <meta name="description" content="Le seul comparateur francophone de prêts crypto collatéralisés. Comparez Nexo, Ledn, Aave, Compound en temps réel." />
      </Head>

      <Navbar />

      <main style={{ background: '#fff', minHeight: '100vh', paddingTop: '52px' }}>

        {/* HERO */}
        <section style={{ padding: isMobile ? '24px 20px 20px' : '36px 28px 28px', borderBottom: '1px solid #F0F0F0' }}>

          {/* Titre + stats */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px', gap: '16px', flexWrap: isMobile ? 'wrap' : 'nowrap' }}>
            <div style={{ flex: 1 }}>
              {isMobile && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: '#AAA', marginBottom: '10px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#16A34A', animation: 'pulse 2s infinite' }} />
                  Prix en temps réel
                </div>
              )}
              <h1 style={{ fontSize: isMobile ? '22px' : '28px', fontWeight: '800', letterSpacing: '-0.8px', color: '#111', lineHeight: '1.2', marginBottom: '8px' }}>
                Empruntez en euros.<br />
                <span style={{ color: '#AAA', fontWeight: '400' }}>Gardez votre crypto.</span>
              </h1>
              <p style={{ fontSize: '13px', color: '#AAA', lineHeight: '1.6', maxWidth: '420px' }}>
                Le seul comparateur francophone de prêts crypto — sans vendre, sans impôt sur les plus-values.
              </p>
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: isMobile ? 'flex-start' : 'flex-end', gap: '10px', width: isMobile ? '100%' : 'auto' }}>
              {!isMobile && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: '#AAA' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#16A34A', animation: 'pulse 2s infinite' }} />
                  Prix en temps réel
                </div>
              )}
              <div style={{ display: 'flex', border: '1px solid #F0F0F0', borderRadius: '8px', overflow: 'hidden', width: isMobile ? '100%' : 'auto' }}>
                {[
                  { value: '5',    label: 'Plateformes' },
                  { value: '3,8%', label: 'Meilleur taux' },
                  { value: '80%',  label: 'LTV max' },
                ].map((s, i) => (
                  <div key={s.label} style={{ flex: isMobile ? 1 : 'none', padding: isMobile ? '10px 12px' : '12px 20px', borderRight: i < 2 ? '1px solid #F0F0F0' : 'none', textAlign: isMobile ? 'center' : 'left' }}>
                    <div style={{ fontSize: isMobile ? '16px' : '20px', fontWeight: '700', color: '#111', letterSpacing: '-0.5px' }}>{s.value}</div>
                    <div style={{ fontSize: '10px', color: '#AAA', marginTop: '1px' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Étapes */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)',
            border: '1px solid #F0F0F0',
            borderRadius: '8px',
            overflow: 'hidden',
          }}>
            {[
              { n: '01', title: 'Choisissez votre crypto',  desc: 'Entrez le montant de BTC ou ETH à nantir.' },
              { n: '02', title: 'Comparez les offres',       desc: 'Taux, LTV et liquidation côte à côte.' },
              { n: '03', title: 'Recevez vos euros',         desc: 'Directement sur votre compte bancaire.' },
            ].map((step, i) => (
              <div key={step.n} style={{
                padding: '12px 16px',
                borderRight: !isMobile && i < 2 ? '1px solid #F0F0F0' : 'none',
                borderBottom: isMobile && i < 2 ? '1px solid #F0F0F0' : 'none',
                display: 'flex', alignItems: 'center', gap: '10px',
              }}>
                <span style={{ fontSize: '10px', fontWeight: '700', color: '#DDD', flexShrink: 0 }}>{step.n}</span>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: '700', color: '#111' }}>{step.title}</div>
                  <div style={{ fontSize: '11px', color: '#AAA', marginTop: '1px', lineHeight: '1.4' }}>{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TOOLBAR */}
        <section style={{ padding: isMobile ? '10px 20px' : '10px 28px', borderBottom: '1px solid #F0F0F0', background: '#FAFAFA', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'stretch' : 'center', gap: '8px' }}>

          {/* Ligne 1 mobile : crypto toggle */}
          <div style={{ display: 'flex', gap: '6px' }}>
            {CRYPTOS.map(x => (
              <button key={x.id} onClick={() => { setCrypto(x.id); setAmount(1); setFilter('all') }} style={{
                flex: isMobile ? 1 : 'none',
                display: 'flex', alignItems: 'center', justifyContent: isMobile ? 'center' : 'flex-start', gap: '6px',
                padding: '6px 12px', borderRadius: '20px',
                border: `1px solid ${crypto === x.id ? x.color : '#E8E8E8'}`,
                background: crypto === x.id ? `${x.color}14` : '#fff',
                cursor: 'pointer', fontSize: '12px', fontWeight: '600',
                color: crypto === x.id ? x.color : '#888',
              }}>
                <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: x.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '7px', fontWeight: '800', color: '#fff', flexShrink: 0 }}>{x.symbol[0]}</div>
                {x.name} <span style={{ fontSize: '10px', opacity: 0.35 }}>{x.symbol}</span>
              </button>
            ))}
          </div>

          {!isMobile && sep}

          {/* Ligne 2 mobile : montant */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', background: '#fff', border: '1px solid #E8E8E8', borderRadius: '7px', overflow: 'hidden', flex: isMobile ? 1 : 'none' }}>
              <div style={{ width: '24px', height: '24px', margin: '3px', borderRadius: '4px', background: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '7px', fontWeight: '800', color: '#fff', flexShrink: 0 }}>{c.symbol[0]}</div>
              <input type="number" value={amount} onChange={e => setAmount(Math.max(0.001, parseFloat(e.target.value) || 0))} step="0.1"
                style={{ border: 'none', padding: '5px 6px', fontSize: '14px', width: isMobile ? '100%' : '72px', outline: 'none', color: '#111', background: 'transparent', fontWeight: '700' }} />
              <span style={{ padding: '0 8px', fontSize: '11px', fontWeight: '600', color: '#CCC' }}>{c.symbol}</span>
            </div>
            <span style={{ fontSize: '12px', color: '#AAA', whiteSpace: 'nowrap' }}>≈ {mounted && price > 0 ? fmt(col) : '—'} €</span>
          </div>

          {!isMobile && sep}

          {/* Ligne 3 mobile : filtres + tri */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginLeft: isMobile ? 0 : 'auto' }}>
            <div style={{ display: 'flex', flex: isMobile ? 1 : 'none', background: '#EFEFEF', borderRadius: '7px', padding: '2px', gap: '1px' }}>
              {['all', 'CeFi', 'DeFi'].map(f => (
                <button key={f} onClick={() => setFilter(f)} style={{
                  flex: 1, padding: '5px 10px', fontSize: '11px', fontWeight: '600',
                  background: filter === f ? '#fff' : 'transparent',
                  color: filter === f ? '#111' : '#999',
                  border: 'none', cursor: 'pointer', borderRadius: '5px',
                  boxShadow: filter === f ? '0 1px 2px rgba(0,0,0,.08)' : 'none',
                }}>{f === 'all' ? 'Tout' : f}</button>
              ))}
            </div>
            <select value={sort} onChange={e => setSort(e.target.value)} style={{ border: '1px solid #E8E8E8', borderRadius: '7px', padding: '5px 8px', fontSize: '11px', background: '#fff', color: '#111', cursor: 'pointer', outline: 'none' }}>
              <option value="apr">Meilleur taux</option>
              <option value="ltv">LTV max</option>
            </select>
          </div>
        </section>

        {/* TABLEAU DESKTOP */}
        {!isMobile && (
          <section style={{ padding: '0 28px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '180px 100px 100px 1fr 1fr 110px', padding: '8px 10px', fontSize: '10px', fontWeight: '600', color: '#BBB', textTransform: 'uppercase', letterSpacing: '.8px', borderBottom: '1px solid #F0F0F0' }}>
              <span>Plateforme</span><span>Taux / an</span><span>LTV max</span><span>Emprunt max</span><span>Liquidation {c.symbol}</span><span></span>
            </div>
            {rows.map((p, i) => {
              const mb = (col * p.ltv) / 100
              const lp = price > 0 ? (col * (p.liq / 100)) / amount : 0
              return (
                <div key={p.name} style={{ display: 'grid', gridTemplateColumns: '180px 100px 100px 1fr 1fr 110px', padding: '16px 10px', borderBottom: i < rows.length - 1 ? '1px solid #F7F7F7' : 'none', alignItems: 'center', background: p.best ? '#FAFAFA' : '#fff', transition: 'background .1s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#FAFAFA'}
                  onMouseLeave={e => e.currentTarget.style.background = p.best ? '#FAFAFA' : '#fff'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: p.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '800', fontSize: '14px', flexShrink: 0 }}>{p.name[0]}</div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: '#111' }}>{p.name}</div>
                      <div style={{ fontSize: '10px', fontWeight: '600', marginTop: '2px', color: p.type === 'DeFi' ? '#16A34A' : '#2563EB' }}>{p.type}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: '600', color: '#111' }}>{p.apr}%</div>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: '600', color: '#111' }}>{p.ltv}%</div>
                    <div style={{ height: '2px', background: '#F0F0F0', borderRadius: '2px', marginTop: '4px', width: '52px' }}>
                      <div style={{ height: '100%', width: `${p.ltv}%`, background: p.color, borderRadius: '2px' }} />
                    </div>
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: '600', color: '#16A34A' }}>{mounted && price > 0 ? fmt(mb) + ' €' : '—'}</div>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: '600', color: '#DC2626' }}>{mounted && price > 0 ? fmt(lp) + ' €' : '—'}</div>
                    <div style={{ fontSize: '10px', color: '#CCC', marginTop: '2px' }}>par {c.symbol}</div>
                  </div>
                  <a href={p.link} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'block', textAlign: 'center', padding: '7px 12px', borderRadius: '7px', fontSize: '12px', fontWeight: '600', background: p.best ? '#111' : '#fff', color: p.best ? '#fff' : '#555', border: `1px solid ${p.best ? '#111' : '#E0E0E0'}`, textDecoration: 'none', whiteSpace: 'nowrap' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#111'; e.currentTarget.style.color = p.best ? '#fff' : '#111' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = p.best ? '#111' : '#E0E0E0'; e.currentTarget.style.color = p.best ? '#fff' : '#555' }}
                  >Emprunter →</a>
                </div>
              )
            })}
          </section>
        )}

        {/* CARTES MOBILE */}
        {isMobile && (
          <section style={{ padding: '0 20px' }}>
            {rows.map((p, i) => {
              const mb = (col * p.ltv) / 100
              const lp = price > 0 ? (col * (p.liq / 100)) / amount : 0
              return (
                <div key={p.name} style={{ padding: '14px 0', borderBottom: i < rows.length - 1 ? '1px solid #F7F7F7' : 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '34px', height: '34px', borderRadius: '9px', background: p.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '800', fontSize: '14px', flexShrink: 0 }}>{p.name[0]}</div>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: '600', color: '#111' }}>{p.name}</div>
                        <div style={{ fontSize: '10px', fontWeight: '600', marginTop: '1px', color: p.type === 'DeFi' ? '#16A34A' : '#2563EB' }}>{p.type}</div>
                      </div>
                    </div>
                    <a href={p.link} target="_blank" rel="noopener noreferrer"
                      style={{ padding: '7px 14px', borderRadius: '7px', fontSize: '12px', fontWeight: '600', background: p.best ? '#111' : '#fff', color: p.best ? '#fff' : '#555', border: `1px solid ${p.best ? '#111' : '#E0E0E0'}`, textDecoration: 'none' }}
                    >Emprunter →</a>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', background: '#FAFAFA', borderRadius: '8px', padding: '10px 12px', gap: '8px' }}>
                    {[
                      { label: 'Taux / an',    value: `${p.apr}%`,                                           color: '#111' },
                      { label: 'Emprunt max',  value: mounted && price > 0 ? fmt(mb) + ' €' : '—',           color: '#16A34A' },
                      { label: 'Liquidation',  value: mounted && price > 0 ? fmt(lp) + ' €' : '—',           color: '#DC2626' },
                    ].map(d => (
                      <div key={d.label}>
                        <div style={{ fontSize: '10px', color: '#AAA', marginBottom: '2px' }}>{d.label}</div>
                        <div style={{ fontSize: '13px', fontWeight: '700', color: d.color }}>{d.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </section>
        )}

        <div style={{ padding: '12px 28px', borderTop: '1px solid #F0F0F0', fontSize: '11px', color: '#CCC', lineHeight: '1.6' }}>
          ⚠️ Taux indicatifs mis à jour régulièrement. Liens affiliés présents. Pas un conseil financier.
        </div>

      </main>
      <Footer />
    </>
  )
}
