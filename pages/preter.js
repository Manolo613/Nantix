import Head from 'next/head'
import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

// ─── DONNÉES VÉRIFIÉES — avr. 2026 ───────────────────────────────────────────
// Nexo : taux selon loyalty tier (Base → Platinum) + choix paiement en NEXO
// YouHodler : taux selon niveau (Newbie → VIP), paiement hebdo
// Aave / Morpho : taux variables temps réel (supply APY côté prêteur)
// Ledn : SUPPRIMÉ — a abandonné les produits d'épargne fin 2025
// Binance / Compound / Spark : supprimés (taux non vérifiés / trop instables)
// ─────────────────────────────────────────────────────────────────────────────

const CRYPTOS = [
  {
    id: 'bitcoin',  symbol: 'BTC', name: 'Bitcoin',
    coingeckoId: 'bitcoin',
    logo: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png',
    color: '#F7931A',
  },
  {
    id: 'ethereum', symbol: 'ETH', name: 'Ethereum',
    coingeckoId: 'ethereum',
    logo: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png',
    color: '#627EEA',
  },
  {
    id: 'solana',   symbol: 'SOL', name: 'Solana',
    coingeckoId: 'solana',
    logo: 'https://assets.coingecko.com/coins/images/4128/small/solana.png',
    color: '#9945FF',
  },
]

const PLATFORM_LOGOS = {
  Nexo:      'https://www.google.com/s2/favicons?domain=nexo.com&sz=64',
  YouHodler: 'https://www.google.com/s2/favicons?domain=youhodler.com&sz=64',
  Aave:      'https://www.google.com/s2/favicons?domain=aave.com&sz=64',
  Morpho:    'https://www.google.com/s2/favicons?domain=morpho.org&sz=64',
}

// apyLabel = fourchette affichée, apy = valeur de référence pour le calcul
const PLATFORMS = {
  bitcoin: [
    {
      name: 'Nexo', apy: 4.0, apyLabel: '4 – 8', type: 'CeFi', color: '#0EA5E9',
      link: 'https://nexo.com', lock: 'Flexible', manualUpdate: 'avr. 2026',
      about: 'Taux selon loyalty tier (Base 4% → Platinum 8%). +2% si intérêts reçus en token NEXO. +1% avec blocage 1 mois. Paiement quotidien.',
    },
    {
      name: 'YouHodler', apy: 4.0, apyLabel: '4 – 8', type: 'CeFi', color: '#1EBDD2',
      link: 'https://youhodler.com', lock: 'Flexible', manualUpdate: 'avr. 2026',
      about: 'Taux selon niveau loyalty (Newbie → VIP). BTC jusqu\'à 8% APY niveau VIP. Paiement hebdomadaire. Actif sécurisé via Ledger Vault.',
    },
    {
      name: 'Aave', apy: null, apyLabel: null, type: 'DeFi', color: '#B6509E',
      link: 'https://aave.com', lock: 'Aucun', live: true,
      about: 'Taux de dépôt variable. Déposez du WBTC, gagnez des intérêts selon la demande de prêt. Pas de KYC, fonds non-custodial.',
    },
  ],
  ethereum: [
    {
      name: 'Nexo', apy: 5.0, apyLabel: '5 – 8', type: 'CeFi', color: '#0EA5E9',
      link: 'https://nexo.com', lock: 'Flexible', manualUpdate: 'avr. 2026',
      about: 'Taux selon loyalty tier (Base ~5% → Platinum ~8%). +2% si intérêts en NEXO tokens. Paiement quotidien.',
    },
    {
      name: 'YouHodler', apy: 4.0, apyLabel: '4 – 8', type: 'CeFi', color: '#1EBDD2',
      link: 'https://youhodler.com', lock: 'Flexible', manualUpdate: 'avr. 2026',
      about: 'Jusqu\'à 8% APY sur ETH selon niveau loyalty. Paiement hebdomadaire. Réglementé en Italie (OAM/MiCAR) et Suisse.',
    },
    {
      name: 'Aave', apy: null, apyLabel: null, type: 'DeFi', color: '#B6509E',
      link: 'https://aave.com', lock: 'Aucun', live: true,
      about: 'Leader DeFi. Déposez de l\'ETH, recevez des intérêts variables selon l\'utilisation du pool. Non-custodial, smart contracts audités.',
    },
    {
      name: 'Morpho', apy: null, apyLabel: null, type: 'DeFi', color: '#4C6FFF',
      link: 'https://app.morpho.org', lock: 'Aucun', live: true,
      about: 'Protocole DeFi optimisé. Taux de dépôt généralement supérieurs à Aave grâce au matching pair-to-pair. Non-custodial.',
    },
  ],
  solana: [
    {
      name: 'Nexo', apy: 4.0, apyLabel: '4 – 6', type: 'CeFi', color: '#0EA5E9',
      link: 'https://nexo.com', lock: 'Flexible', manualUpdate: 'avr. 2026',
      about: 'Taux sur SOL selon loyalty tier. Paiement quotidien. Disponible dans les pays où Nexo est actif.',
    },
    {
      name: 'YouHodler', apy: 7.0, apyLabel: '5 – 7', type: 'CeFi', color: '#1EBDD2',
      link: 'https://youhodler.com', lock: 'Flexible', manualUpdate: 'avr. 2026',
      about: 'Jusqu\'à 7% APY sur SOL. Paiement hebdomadaire. Réglementé EU (MiCAR). Fonds sécurisés Ledger Vault.',
    },
  ],
}

const W  = '1320px'
const PX = '32px'
const GRID = '230px 180px 120px 1fr 1fr 140px 150px'

export default function Preter() {
  const [crypto, setCrypto]     = useState('bitcoin')
  const [prices, setPrices]     = useState({})
  const [amount, setAmount]     = useState(1)
  const [mounted, setMounted]   = useState(false)
  const [filter, setFilter]     = useState('all')
  const [isMobile, setIsMobile] = useState(false)
  const [imgErrors, setImgErrors] = useState({})
  const [defiRates, setDefiRates] = useState(null)
  const [updatedAt, setUpdatedAt] = useState(null)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    setMounted(true)
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=eur')
      .then(r => r.json()).then(d => setPrices(d)).catch(() => {})
  }, [])

  useEffect(() => {
    fetch('/api/rates')
      .then(r => r.json())
      .then(d => { setDefiRates(d); setUpdatedAt(d.updatedAt) })
      .catch(() => {})
  }, [])

  const c     = CRYPTOS.find(x => x.id === crypto)
  const price = prices[c.coingeckoId]?.eur || 0
  const col   = amount * price
  const fmt   = n => Math.round(n).toLocaleString('fr-FR')
  const fmtD  = n => n.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  const timeAgo = (iso) => {
    if (!iso) return ''
    const mins = Math.floor((Date.now() - new Date(iso)) / 60000)
    if (mins < 1) return "à l'instant"
    if (mins < 60) return `il y a ${mins} min`
    return `il y a ${Math.floor(mins / 60)}h`
  }

  const getDefiApy = (name) => {
    if (!defiRates) return null
    if (name === 'Aave') {
      // Supply APY côté prêteur (ETH pool sur Aave)
      return defiRates.aave?.supplyApy?.[crypto] ?? null
    }
    if (name === 'Morpho') {
      return defiRates.morpho?.supplyApy?.[crypto] ?? null
    }
    return null
  }

  const rows = (PLATFORMS[crypto] || [])
    .filter(p => filter === 'all' || p.type === filter)
    .map(p => {
      if (p.live) {
        const liveApy = getDefiApy(p.name)
        if (liveApy !== null) return { ...p, apy: liveApy }
      }
      return p
    })
    .sort((a, b) => {
      const aA = a.apy ?? 0
      const bA = b.apy ?? 0
      return bA - aA
    })
    .map((p, _, arr) => {
      const maxApy = Math.max(...arr.map(x => x.apy ?? 0))
      return { ...p, best: (p.apy ?? 0) === maxApy }
    })

  const wrap = { maxWidth: W, margin: '0 auto', padding: `0 ${PX}` }

  const PlatformLogo = ({ name, color }) => {
    const src = PLATFORM_LOGOS[name]
    if (src && !imgErrors[name]) {
      return (
        <img src={src} alt={name} width={38} height={38}
          style={{ borderRadius: '10px', objectFit: 'cover', flexShrink: 0 }}
          onError={() => setImgErrors(prev => ({ ...prev, [name]: true }))}
        />
      )
    }
    return (
      <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '800', fontSize: '15px', flexShrink: 0 }}>
        {name[0]}
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Nantix — Comparer les taux pour prêter sa crypto</title>
        <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.2}} @keyframes fadeInUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}} .fade-row{animation:fadeInUp .3s ease both} .pr-tooltip{opacity:0;visibility:hidden;transition:opacity .15s ease} .pr-tooltip-wrap:hover .pr-tooltip{opacity:1;visibility:visible}`}</style>
        <meta name="description" content="Comparez les taux pour prêter votre Bitcoin, Ethereum ou Solana. APY vérifiés sur Nexo, YouHodler, Aave et Morpho." />
      </Head>
      <Navbar />

      <main style={{ background: '#fff', minHeight: '100vh', paddingTop: '52px' }}>

        {/* ── HERO ── */}
        <section style={{ borderBottom: '1px solid #F0F0F0', padding: isMobile ? '24px 0 20px' : '40px 0 28px' }}>
          <div style={wrap}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '24px', marginBottom: '20px', flexWrap: 'wrap' }}>
              <div>
                <h1 style={{ fontSize: isMobile ? '30px' : '56px', fontWeight: '800', letterSpacing: isMobile ? '-1px' : '-2px', color: '#111', lineHeight: '1.2', marginBottom: '10px' }}>
                  Faites travailler<br />votre crypto.
                </h1>
                <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', maxWidth: '420px' }}>
                  Prêtez votre BTC, ETH ou SOL et comparez les meilleurs taux annuels (APY) sur les principales plateformes CeFi et DeFi.
                </p>
              </div>
              {!isMobile && (
                <div style={{ display: 'flex', border: '1px solid #EBEBEB', borderRadius: '10px', overflow: 'hidden', flexShrink: 0 }}>
                  {[
                    { v: '4',    l: 'Plateformes' },
                    { v: '8%',   l: 'APY max BTC' },
                    { v: '8%',   l: 'APY max ETH' },
                  ].map((s, i) => (
                    <div key={s.l} style={{ padding: '14px 22px', borderRight: i < 2 ? '1px solid #EBEBEB' : 'none', textAlign: 'center' }}>
                      <div style={{ fontSize: '22px', fontWeight: '800', color: '#111', letterSpacing: '-0.7px' }}>{s.v}</div>
                      <div style={{ fontSize: '11px', color: '#666', marginTop: '2px' }}>{s.l}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {!isMobile && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', border: '1px solid #EBEBEB', borderRadius: '10px', overflow: 'hidden' }}>
                {[
                  { n: '01', t: 'Choisissez votre crypto',    d: 'BTC, ETH ou SOL — la crypto que vous souhaitez prêter.' },
                  { n: '02', t: 'Saisissez votre montant',    d: 'Visualisez vos gains mensuels et annuels estimés.' },
                  { n: '03', t: 'Comparez et déposez',        d: 'Taux, disponibilité et type de plateforme côte à côte.' },
                ].map((step, i) => (
                  <div key={step.n} style={{ padding: '14px 20px', borderRight: i < 2 ? '1px solid #EBEBEB' : 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '11px', fontWeight: '800', color: '#BBB', flexShrink: 0 }}>{step.n}</span>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: '700', color: '#111' }}>{step.t}</div>
                      <div style={{ fontSize: '11px', color: '#666', marginTop: '2px' }}>{step.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── AVERTISSEMENT ── */}
        <div style={{ ...wrap, paddingTop: '16px' }}>
          <div style={{ border: '1px solid #FEF3C7', background: '#FFFBEB', borderRadius: '8px', padding: '12px 16px', display: 'flex', gap: '10px' }}>
            <span style={{ fontSize: '14px', flexShrink: 0 }}>⚠️</span>
            <div>
              <div style={{ fontSize: '12px', fontWeight: '700', color: '#92400E', marginBottom: '3px' }}>Risque de contrepartie</div>
              <div style={{ fontSize: '12px', color: '#B45309', lineHeight: '1.6' }}>
                Prêter sa crypto implique de confier ses fonds à une plateforme (CeFi) ou à un smart contract (DeFi). En cas de faillite ou de faille, les fonds peuvent être perdus. Les taux élevés reflètent généralement un risque plus élevé.
              </div>
            </div>
          </div>
        </div>

        {/* ── ONGLETS CRYPTO ── */}
        <div style={{ borderBottom: '1px solid #EBEBEB', borderTop: '1px solid #EBEBEB', marginTop: '16px', background: '#fff' }}>
          <div style={{ maxWidth: W, margin: '0 auto', padding: `0 ${PX}`, display: 'flex', alignItems: 'stretch' }}>
            {CRYPTOS.map(x => (
              <button key={x.id} onClick={() => { setCrypto(x.id); setAmount(1); setFilter('all') }} style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '14px 20px', fontSize: '14px', fontWeight: '600',
                color: crypto === x.id ? '#111' : '#888',
                background: 'transparent', border: 'none',
                borderBottom: `2.5px solid ${crypto === x.id ? '#111' : 'transparent'}`,
                cursor: 'pointer', transition: 'all .15s', whiteSpace: 'nowrap',
              }}>
                <img src={x.logo} alt={x.symbol} width={20} height={20} style={{ borderRadius: '50%' }} />
                {x.name}
              </button>
            ))}
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', padding: '0 4px' }}>
              <span style={{ fontSize: '11px', color: '#AAA' }}>Prêter</span>
            </div>
          </div>
        </div>

        {/* ── TOOLBAR ── */}
        <div style={{ borderBottom: '1px solid #EBEBEB', background: '#FAFAFA' }}>
          <div style={{ maxWidth: W, margin: '0 auto', padding: `8px ${PX}`, display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>

            <div style={{ display: 'flex', alignItems: 'center', background: '#fff', border: '1px solid #E0E0E0', borderRadius: '8px', overflow: 'hidden' }}>
              <img src={c.logo} alt={c.symbol} width={22} height={22} style={{ margin: '5px', borderRadius: '50%' }} />
              <input type="number" value={amount} onChange={e => setAmount(Math.max(0.001, parseFloat(e.target.value) || 0))} step="0.1"
                style={{ border: 'none', padding: '6px 8px', fontSize: '14px', width: '70px', outline: 'none', color: '#111', background: 'transparent', fontWeight: '700' }} />
              <span style={{ padding: '0 10px', fontSize: '12px', fontWeight: '600', color: '#999' }}>{c.symbol}</span>
            </div>
            <span style={{ fontSize: '13px', color: '#555', whiteSpace: 'nowrap' }}>≈ {mounted && price > 0 ? fmt(col) : '—'} €</span>

            {!isMobile && <div style={{ marginLeft: 'auto' }} />}

            <div style={{ display: 'flex', background: '#EBEBEB', borderRadius: '7px', padding: '2px', marginLeft: isMobile ? 'auto' : '0' }}>
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
          </div>
        </div>

        {/* ── TABLEAU ── */}
        <div style={wrap}>
          {!isMobile && (
            <div style={{
              display: 'grid', gridTemplateColumns: GRID,
              padding: '10px 16px', fontSize: '10px', fontWeight: '700', color: '#999',
              textTransform: 'uppercase', letterSpacing: '.9px', borderBottom: '1px solid #EBEBEB',
            }}>
              <span>Plateforme</span>
              <span>APY / an</span>
              <span>Disponibilité</span>
              <span>Gains / mois</span>
              <span>Gains / an</span>
              <span>Accès</span>
              <span></span>
            </div>
          )}

          {rows.map((p, i) => {
            const displayApy = p.apy
            const gainsAn    = (mounted && price > 0 && displayApy !== null) ? col * displayApy / 100 : null
            const gainsMois  = gainsAn !== null ? gainsAn / 12 : null
            const isLive     = p.live && displayApy !== null

            const ApyBadge = () => (
              <div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '3px' }}>
                  <div style={{ fontSize: isMobile ? '22px' : '16px', fontWeight: '700', color: '#111', letterSpacing: '-.3px', whiteSpace: 'nowrap' }}>
                    {displayApy === null
                      ? '—'
                      : p.apyLabel
                        ? `${p.apyLabel}%`
                        : `${displayApy}%`
                    }
                  </div>
                  {p.apyLabel && !isMobile && (
                    <div className="pr-tooltip-wrap" style={{ position: 'relative', display: 'inline-flex', marginTop: '1px' }}>
                      <span style={{ width: '13px', height: '13px', borderRadius: '50%', background: '#E8E8E8', color: '#888', fontSize: '9px', fontWeight: '800', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'default', userSelect: 'none', flexShrink: 0 }}>?</span>
                      <div className="pr-tooltip" style={{ position: 'absolute', bottom: '22px', left: '50%', transform: 'translateX(-50%)', background: '#111', color: '#fff', borderRadius: '7px', padding: '10px 12px', fontSize: '11px', lineHeight: '1.6', width: '230px', zIndex: 100, pointerEvents: 'none', boxShadow: '0 4px 16px rgba(0,0,0,.18)' }}>
                        <div style={{ fontWeight: '700', marginBottom: '4px' }}>Taux variable selon conditions</div>
                        <div style={{ fontSize: '10px', color: '#AAA' }}>{p.about}</div>
                        <div style={{ position: 'absolute', bottom: '-5px', left: '50%', transform: 'translateX(-50%) rotate(45deg)', width: '10px', height: '10px', background: '#111' }} />
                      </div>
                    </div>
                  )}
                </div>
                {isLive ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '3px', marginTop: '3px' }}>
                    <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#F97316', animation: 'pulse 2s infinite' }} />
                    <span style={{ fontSize: '9px', color: '#F97316', fontWeight: '700' }}>{timeAgo(updatedAt)}</span>
                  </div>
                ) : (
                  <div style={{ fontSize: '9px', color: '#AAA', marginTop: '3px' }}>
                    {p.live ? 'En attente données live' : `Mis à jour ${p.manualUpdate || 'manuellement'}`}
                  </div>
                )}
              </div>
            )

            const AccesBadges = () => (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '11px', fontWeight: '600', color: '#444' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: p.type === 'DeFi' ? '#999' : '#16A34A', flexShrink: 0 }} />
                  {p.type === 'DeFi' ? 'Wallet requis' : 'Sans wallet'}
                </div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '11px', fontWeight: '600', color: p.type === 'CeFi' ? '#2563EB' : 'transparent', pointerEvents: 'none' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: p.type === 'CeFi' ? '#2563EB' : 'transparent', flexShrink: 0 }} />
                  Régulé
                </div>
              </div>
            )

            return (
              <div key={p.name} style={{ borderBottom: '1px solid #F5F5F5', marginBottom: isMobile ? '8px' : '0' }}>

                {isMobile ? (
                  <div className="fade-row" style={{ animationDelay: `${i * 0.06}s`, background: '#fff', borderRadius: '12px', border: p.best ? '2px solid #111' : '1px solid #EBEBEB', overflow: 'hidden' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <PlatformLogo name={p.name} color={p.color} />
                        <div>
                          <div style={{ fontSize: '15px', fontWeight: '700', color: '#111' }}>{p.name}</div>
                          <div style={{ fontSize: '10px', fontWeight: '700', color: p.type === 'DeFi' ? '#888' : '#16A34A' }}>{p.type === 'DeFi' ? '⚙️ Wallet requis' : '✅ Sans wallet'}</div>
                        </div>
                      </div>
                      <ApyBadge />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderTop: '1px solid #F0F0F0', borderBottom: '1px solid #F0F0F0' }}>
                      <div style={{ padding: '10px 12px', borderRight: '1px solid #F0F0F0' }}>
                        <div style={{ fontSize: '9px', color: '#999', fontWeight: '700', textTransform: 'uppercase', marginBottom: '3px' }}>Gains / mois</div>
                        <div style={{ fontSize: '14px', fontWeight: '700', color: '#16A34A' }}>
                          {gainsMois !== null ? '+' + fmtD(gainsMois) + ' €' : '—'}
                        </div>
                      </div>
                      <div style={{ padding: '10px 12px' }}>
                        <div style={{ fontSize: '9px', color: '#999', fontWeight: '700', textTransform: 'uppercase', marginBottom: '3px' }}>Gains / an</div>
                        <div style={{ fontSize: '14px', fontWeight: '700', color: '#16A34A' }}>
                          {gainsAn !== null ? '+' + fmt(gainsAn) + ' €' : '—'}
                        </div>
                      </div>
                    </div>
                    <div style={{ padding: '12px 16px' }}>
                      <a href={p.link} target="_blank" rel="noopener noreferrer" style={{
                        display: 'block', textAlign: 'center', padding: '11px',
                        borderRadius: '8px', fontSize: '13px', fontWeight: '700',
                        textDecoration: 'none', background: p.best ? '#111' : '#F5F5F5',
                        color: p.best ? '#fff' : '#444',
                      }}>Prêter →</a>
                    </div>
                  </div>
                ) : (
                  <div
                    className="fade-row"
                    style={{
                      animationDelay: `${i * 0.06}s`,
                      display: 'grid', gridTemplateColumns: GRID,
                      padding: '0 16px', alignItems: 'center', minHeight: '72px',
                      background: p.best ? '#FAFAFA' : '#fff', cursor: 'default',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = '#FAFAFA'}
                    onMouseLeave={e => e.currentTarget.style.background = p.best ? '#FAFAFA' : '#fff'}
                  >
                    {/* Col 1 — Plateforme */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <PlatformLogo name={p.name} color={p.color} />
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: '700', color: '#111' }}>{p.name}</div>
                        <div style={{ fontSize: '10px', fontWeight: '600', marginTop: '2px', color: p.type === 'DeFi' ? '#999' : '#2563EB' }}>{p.type}</div>
                      </div>
                    </div>

                    {/* Col 2 — APY */}
                    <ApyBadge />

                    {/* Col 3 — Disponibilité */}
                    <div style={{ fontSize: '13px', fontWeight: '600', color: '#555' }}>{p.lock}</div>

                    {/* Col 4 — Gains / mois */}
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: '700', color: '#16A34A', letterSpacing: '-.3px' }}>
                        {gainsMois !== null ? '+' + fmtD(gainsMois) + ' €' : '—'}
                      </div>
                      <div style={{ fontSize: '10px', color: '#AAA', marginTop: '2px' }}>par mois</div>
                    </div>

                    {/* Col 5 — Gains / an */}
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: '700', color: '#16A34A', letterSpacing: '-.3px' }}>
                        {gainsAn !== null ? '+' + fmt(gainsAn) + ' €' : '—'}
                      </div>
                      <div style={{ fontSize: '10px', color: '#AAA', marginTop: '2px' }}>par an</div>
                    </div>

                    {/* Col 6 — Accès */}
                    <AccesBadges />

                    {/* Col 7 — CTA */}
                    <a
                      href={p.link} target="_blank" rel="noopener noreferrer"
                      style={{
                        display: 'block', textAlign: 'center', padding: '9px 14px', borderRadius: '8px',
                        fontSize: '12px', fontWeight: '700', textDecoration: 'none', whiteSpace: 'nowrap',
                        background: '#fff', color: '#444', border: '1.5px solid #DCDCDC',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = '#111'; e.currentTarget.style.color = '#111' }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = '#DCDCDC'; e.currentTarget.style.color = '#444' }}
                    >
                      Prêter →
                    </a>
                  </div>
                )}
              </div>
            )
          })}

          {updatedAt && (
            <div style={{ textAlign: 'right', fontSize: '11px', color: '#999', padding: '8px 0 4px' }}>
              Taux DeFi mis à jour le {new Date(updatedAt).toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </div>
          )}

          <div style={{ display: 'flex', gap: '10px', padding: '14px 0', borderTop: '1px solid #EBEBEB', marginTop: '4px' }}>
            <span>🔍</span>
            <p style={{ fontSize: '11px', color: '#666', lineHeight: '1.6' }}>
              <strong style={{ color: '#444' }}>Indépendance éditoriale.</strong> Nantix est un comparateur indépendant. Les APY affichés sont indicatifs — les taux CeFi varient selon votre profil (loyalty tier, montant déposé). Les taux DeFi sont en temps réel. Des commissions d'affiliation peuvent être perçues via certains liens — elles ne modifient pas notre classement.
            </p>
          </div>
        </div>

        {/* ── EXPLICATION ── */}
        <section style={{ borderTop: '1px solid #EBEBEB', padding: '52px 0' }}>
          <div style={wrap}>
            <div style={{ fontSize: '10px', fontWeight: '700', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Comment ça fonctionne ?</div>
            <h2 style={{ fontSize: '24px', fontWeight: '700', letterSpacing: '-.6px', color: '#111', marginBottom: '8px' }}>CeFi vs DeFi : quelle différence pour prêter ?</h2>
            <p style={{ fontSize: '14px', color: '#555', lineHeight: '1.6', maxWidth: '500px', marginBottom: '28px' }}>Prêter sa crypto génère des intérêts, mais le mécanisme diffère selon le type de plateforme.</p>

            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: '12px' }}>
              {[
                { icon: '🏦', t: 'CeFi — Simple et accessible', d: 'Vous déposez vos fonds sur une plateforme centralisée (Nexo, YouHodler). Ils gèrent tout. Pas de wallet requis, KYC obligatoire. Taux généralement plus élevés, mais risque de contrepartie.' },
                { icon: '⚙️', t: 'DeFi — Non-custodial', d: 'Vous interagissez directement avec des smart contracts (Aave, Morpho). Vous gardez le contrôle de vos clés. Plus technique, mais aucune entité ne peut bloquer vos fonds.' },
                { icon: '📅', t: 'Flexibilité et liquidité', d: 'La plupart des plateformes ici offrent des dépôts flexibles — vous pouvez retirer à tout moment. Certains produits bloqués offrent des taux plus élevés mais avec une période de lock-up.' },
              ].map(card => (
                <div key={card.t} style={{ border: '1px solid #EBEBEB', borderRadius: '10px', padding: '18px 20px' }}>
                  <div style={{ fontSize: '20px', marginBottom: '10px' }}>{card.icon}</div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#111', marginBottom: '6px' }}>{card.t}</div>
                  <div style={{ fontSize: '12px', color: '#555', lineHeight: '1.6' }}>{card.d}</div>
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
