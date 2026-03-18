import Head from 'next/head'
import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const CRYPTOS = [
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', coingeckoId: 'ethereum', color: '#627EEA' },
  { id: 'solana',   symbol: 'SOL', name: 'Solana',   coingeckoId: 'solana',   color: '#9945FF' },
  { id: 'bitcoin',  symbol: 'BTC', name: 'Bitcoin',  coingeckoId: 'bitcoin',  color: '#F7931A' },
]

const PLATFORMS = {
  ethereum: [
    { name: 'Lido',        apy: 4.2, type: 'Liquid', lock: 'Aucun',    min: 0.001, color: '#00A3FF', link: 'https://lido.fi',           best: true  },
    { name: 'Rocket Pool', apy: 3.9, type: 'DeFi',   lock: 'Aucun',    min: 0.01,  color: '#FF6B35', link: 'https://rocketpool.net',    best: false },
    { name: 'Binance',     apy: 4.0, type: 'CeFi',   lock: 'Flexible', min: 0.001, color: '#F3BA2F', link: 'https://binance.com',       best: false },
    { name: 'Kraken',      apy: 3.8, type: 'CeFi',   lock: 'Flexible', min: 0.001, color: '#5741D9', link: 'https://kraken.com',        best: false },
    { name: 'Coinbase',    apy: 3.5, type: 'CeFi',   lock: 'Flexible', min: 0.001, color: '#0052FF', link: 'https://coinbase.com',      best: false },
    { name: 'Aave',        apy: 2.1, type: 'DeFi',   lock: 'Aucun',    min: 0.001, color: '#B6509E', link: 'https://aave.com',          best: false },
  ],
  solana: [
    { name: 'Marinade',    apy: 7.2, type: 'Liquid', lock: 'Aucun',    min: 0.001, color: '#19FB9B', link: 'https://marinade.finance',  best: true  },
    { name: 'Jito',        apy: 8.1, type: 'Liquid', lock: 'Aucun',    min: 0.001, color: '#39D353', link: 'https://jito.network',      best: false },
    { name: 'Binance',     apy: 6.5, type: 'CeFi',   lock: 'Flexible', min: 0.1,   color: '#F3BA2F', link: 'https://binance.com',       best: false },
    { name: 'Kraken',      apy: 6.0, type: 'CeFi',   lock: 'Flexible', min: 0.1,   color: '#5741D9', link: 'https://kraken.com',        best: false },
    { name: 'Coinbase',    apy: 5.8, type: 'CeFi',   lock: 'Flexible', min: 0.1,   color: '#0052FF', link: 'https://coinbase.com',      best: false },
  ],
  bitcoin: [
    { name: 'Nexo',        apy: 5.0, type: 'CeFi',   lock: 'Flexible', min: 0.001, color: '#0EA5E9', link: 'https://nexo.com',          best: true  },
    { name: 'Binance',     apy: 4.5, type: 'CeFi',   lock: '30 jours', min: 0.001, color: '#F3BA2F', link: 'https://binance.com',       best: false },
    { name: 'Ledn',        apy: 2.5, type: 'CeFi',   lock: 'Flexible', min: 0.001, color: '#0D4A45', link: 'https://ledn.io',           best: false },
    { name: 'Kraken',      apy: 0.1, type: 'CeFi',   lock: 'Flexible', min: 0.001, color: '#5741D9', link: 'https://kraken.com',        best: false },
  ],
}

const typeColor = t => t === 'DeFi' ? '#16A34A' : t === 'Liquid' ? '#7C3AED' : '#2563EB'
const typeBg    = t => t === 'DeFi' ? '#F0FDF4' : t === 'Liquid' ? '#F5F3FF' : '#EFF6FF'

export default function Staking() {
  const [crypto, setCrypto]   = useState('ethereum')
  const [prices, setPrices]   = useState({})
  const [amount, setAmount]   = useState(1)
  const [mounted, setMounted] = useState(false)
  const [filter, setFilter]   = useState('all')

  useEffect(() => {
    setMounted(true)
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum,solana,bitcoin&vs_currencies=eur')
      .then(r => r.json()).then(d => setPrices(d)).catch(() => {})
  }, [])

  const c     = CRYPTOS.find(x => x.id === crypto)
  const price = prices[c.coingeckoId]?.eur || 0
  const col   = amount * price
  const fmt   = n => Math.round(n).toLocaleString('fr-FR')

  const rows = (PLATFORMS[crypto] || [])
    .filter(p => filter === 'all' || p.type === filter)
    .sort((a, b) => b.apy - a.apy)

  const wrap = { maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }

  return (
    <>
      <Head>
        <title>Nantix — Comparateur de staking crypto</title>
        <meta name="description" content="Comparez les taux de staking ETH, SOL et BTC. APY, durée de blocage et montants minimaux des principales plateformes." />
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
                  Staking crypto :<br />
                  <span style={{ color: '#AAA', fontWeight: '400' }}>comparez les rendements.</span>
                </h1>
                <p style={{ fontSize: '14px', color: '#888', lineHeight: '1.6', maxWidth: '480px' }}>
                  Taux de rendement annuel (APY), durée de blocage et montants minimaux des principales plateformes — données indicatives.
                </p>
              </div>
              <div style={{ display: 'flex', border: '1px solid #F0F0F0', borderRadius: '10px', overflow: 'hidden', flexShrink: 0 }}>
                {[
                  { v: '12+',   l: 'Plateformes' },
                  { v: '8,1%',  l: 'APY max SOL'  },
                  { v: '4,2%',  l: 'APY max ETH'  },
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

        {/* ONGLETS CRYPTO */}
        <div style={{ borderBottom: '1px solid #F0F0F0' }}>
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
              {['all', 'CeFi', 'DeFi', 'Liquid'].map(f => (
                <button key={f} onClick={() => setFilter(f)} style={{
                  padding: '5px 10px', fontSize: '11px', fontWeight: '600',
                  background: filter === f ? '#fff' : 'transparent',
                  color: filter === f ? '#111' : '#666',
                  border: 'none', cursor: 'pointer', borderRadius: '5px',
                  boxShadow: filter === f ? '0 1px 2px rgba(0,0,0,.08)' : 'none',
                }}>{f === 'all' ? 'Tout' : f}</button>
              ))}
            </div>
          </div>
        </div>

        {/* TABLEAU */}
        <div style={wrap}>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 80px 100px 120px 1fr 110px', padding: '10px 12px', fontSize: '10px', fontWeight: '700', color: '#BBB', textTransform: 'uppercase', letterSpacing: '.8px', borderBottom: '1px solid #F0F0F0' }}>
            <span>Plateforme</span><span>APY</span><span>Type</span><span>Lock-up</span><span>Gains estimés / an</span><span></span>
          </div>

          {rows.map((p, i) => {
            const gains = price > 0 ? col * p.apy / 100 : 0
            return (
              <div key={p.name} style={{
                display: 'grid', gridTemplateColumns: '200px 80px 100px 120px 1fr 110px',
                padding: '18px 12px', borderBottom: i < rows.length - 1 ? '1px solid #F7F7F7' : 'none',
                alignItems: 'center', background: p.best ? '#FAFAFA' : '#fff', transition: 'background .1s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#FAFAFA'}
              onMouseLeave={e => e.currentTarget.style.background = p.best ? '#FAFAFA' : '#fff'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: p.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '800', fontSize: '14px', flexShrink: 0 }}>{p.name[0]}</div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#111' }}>{p.name}</div>
                    <div style={{ fontSize: '11px', color: '#AAA', marginTop: '1px' }}>min. {p.min} {c.symbol}</div>
                  </div>
                </div>

                <div style={{ fontSize: '17px', fontWeight: '700', color: '#111', letterSpacing: '-.3px' }}>{p.apy}%</div>

                <div>
                  <span style={{ fontSize: '11px', fontWeight: '600', padding: '3px 8px', borderRadius: '20px', background: typeBg(p.type), color: typeColor(p.type) }}>{p.type}</span>
                </div>

                <div style={{ fontSize: '14px', fontWeight: '600', color: '#111' }}>{p.lock}</div>

                <div>
                  <div style={{ fontSize: '17px', fontWeight: '700', color: '#16A34A', letterSpacing: '-.3px' }}>
                    {mounted && price > 0 ? '+' + fmt(gains) + ' €' : '—'}
                  </div>
                  <div style={{ fontSize: '10px', color: '#AAA', marginTop: '2px' }}>estimation annuelle</div>
                </div>

                <a href={p.link} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'block', textAlign: 'center', padding: '8px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: '600', textDecoration: 'none', background: p.best ? '#111' : '#fff', color: p.best ? '#fff' : '#555', border: `1px solid ${p.best ? '#111' : '#E0E0E0'}`, whiteSpace: 'nowrap' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#111'; e.currentTarget.style.color = p.best ? '#fff' : '#111' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = p.best ? '#111' : '#E0E0E0'; e.currentTarget.style.color = p.best ? '#fff' : '#555' }}
                >Voir →</a>
              </div>
            )
          })}

          <div style={{ display: 'flex', gap: '10px', padding: '14px 0', borderTop: '1px solid #F0F0F0', marginTop: '4px' }}>
            <span>🔍</span>
            <p style={{ fontSize: '11px', color: '#888', lineHeight: '1.6' }}>
              <strong style={{ color: '#555' }}>Indépendance éditoriale.</strong> Nantix est un comparateur indépendant. Les APY affichés sont indicatifs et varient selon les conditions de marché. Des commissions d'affiliation peuvent être perçues — elles ne modifient pas notre classement.
            </p>
          </div>
        </div>

        {/* EXPLICATION */}
        <section style={{ borderTop: '1px solid #F0F0F0', padding: '52px 0' }}>
          <div style={wrap}>
            <div style={{ fontSize: '10px', fontWeight: '700', color: '#AAA', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Comprendre le staking</div>
            <h2 style={{ fontSize: '24px', fontWeight: '700', letterSpacing: '-.6px', color: '#111', marginBottom: '16px' }}>Qu'est-ce que le staking crypto ?</h2>
            <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.8', maxWidth: '640px', marginBottom: '28px' }}>
              Le staking consiste à immobiliser des cryptomonnaies dans un protocole blockchain pour contribuer à sa sécurité ou à sa gouvernance. En échange, le détenteur perçoit des récompenses exprimées en APY (Annual Percentage Yield). Les conditions varient significativement selon les plateformes : durée de blocage, montant minimum, risque de slashing.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px' }}>
              {[
                { t: 'Staking natif',       d: 'Validation directe sur la blockchain. Nécessite un montant minimum élevé (ex : 32 ETH). Risque de slashing en cas de mauvais comportement du validateur.' },
                { t: 'Liquid staking',      d: 'Protocoles comme Lido ou Marinade permettent de staker sans montant minimum. Le déposant reçoit un token représentatif (stETH, mSOL) utilisable en DeFi.' },
                { t: 'Staking via CeFi',    d: 'Plateformes centralisées (Binance, Kraken, Coinbase) gèrent le staking pour l\'utilisateur. Plus simple, mais les fonds sont détenus par la plateforme.' },
              ].map(card => (
                <div key={card.t} style={{ border: '1px solid #F0F0F0', borderRadius: '10px', padding: '18px 20px' }}>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#111', marginBottom: '8px' }}>{card.t}</div>
                  <div style={{ fontSize: '12px', color: '#666', lineHeight: '1.7' }}>{card.d}</div>
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
