import Head from 'next/head'
import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const STABLECOINS = [
  {
    id: 'usdc', symbol: 'USDC', name: 'USDC',
    logo: 'https://assets.coingecko.com/coins/images/6319/small/usdc.png',
    color: '#2775CA',
  },
  {
    id: 'usdt', symbol: 'USDT', name: 'USDT',
    logo: 'https://assets.coingecko.com/coins/images/325/small/Tether.png',
    color: '#26A17B',
  },
]

const COLLATERALS = [
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
]

const PLATFORM_LOGOS = {
  Nexo:      'https://www.google.com/s2/favicons?domain=nexo.com&sz=64',
  Ledn:      'https://www.google.com/s2/favicons?domain=ledn.io&sz=64',
  Aave:      'https://www.google.com/s2/favicons?domain=aave.com&sz=64',
  Morpho:    'https://www.google.com/s2/favicons?domain=morpho.org&sz=64',
  YouHodler: 'https://www.google.com/s2/favicons?domain=youhodler.com&sz=64',
  Nebeus:    'https://www.google.com/s2/favicons?domain=nebeus.com&sz=64',
}

const PLATFORMS = {
  usdc: {
    bitcoin: [
      { name: 'Aave',      apr: 3.6,   ltv: 73, liq: 78,   type: 'DeFi', color: '#B6509E', link: 'https://aave.com',         best: true,  founded: '2020', country: 'Décentralisé',    users: '500K+', regulated: false, about: 'Leader DeFi. Déposez du WBTC, empruntez de l\'USDC. Smart contracts audités, pas de KYC.' },
      { name: 'Morpho',    apr: 2.56,  ltv: 86, liq: 86,   type: 'DeFi', color: '#4C6FFF', link: 'https://app.morpho.org',   best: false, founded: '2022', country: 'Décentralisé',    users: '80K+',  regulated: false, about: 'Protocole DeFi permissionless sur Ethereum. Marchés isolés, LTV élevée (86%). Taux déterminés par chaque marché indépendamment.' },
      { name: 'Ledn',      apr: 11.49, ltv: 50, liq: 80,   type: 'CeFi', color: '#0D4A45', link: 'https://ledn.io',          best: false, founded: '2018', country: 'Canada',           users: '100K+', regulated: true,  manualUpdate: 'avr. 2026', about: 'Spécialiste Bitcoin uniquement. Funded in USDC. Proof-of-Reserves publique. Taux à partir de 11.49% APR (9.99% dès 1M USD).' },
      { name: 'YouHodler', apr: 8.0,   ltv: 97, liq: 98.5, type: 'CeFi', color: '#1EBDD2', link: 'https://youhodler.com',    best: false, founded: '2018', country: 'Suisse / Chypre', users: '1M+',   regulated: true,  manualUpdate: 'avr. 2026', aprLabel: '8 – 16', about: 'Plateforme CeFi suisse. Taux variable selon le CVR choisi : 8% APR à 97% CVR (risque élevé, liquidation dès -1,5%) jusqu\'à 16% APR à 50% CVR (liquidation à -45%). Prêts en USDC/USDT, durée max 60 jours.' },
      { name: 'Nexo',      apr: 17.9,  ltv: 50, liq: 83,   ltvDynamic: true, type: 'CeFi', color: '#0EA5E9', link: 'https://nexo.com', best: false, founded: '2018', country: 'UE / Caïmans', users: '7M+', regulated: true, manualUpdate: 'avr. 2026', aprLabel: '9.9 – 17.9', about: 'Plateforme CeFi régulée, 7M+ utilisateurs. Taux selon niveau fidélité NEXO token (9.9% Platinum → 17.9% Base). LTV déterminé dynamiquement par Nexo.' },
      { name: 'Nebeus',    apr: 6.0,   ltv: 65, liq: 80,   type: 'CeFi', color: '#6C3CE1', link: 'https://nebeus.com',       best: false, founded: '2014', country: 'Royaume-Uni',    users: '200K+', regulated: true,  manualUpdate: 'avr. 2026', about: 'Plateforme FCA-régulée au Royaume-Uni. Interest Only Loan (6% / an, LTV 65%) ou Flexible Loan (16.5%, LTV 70%). KYC requis.' },
    ],
    ethereum: [
      { name: 'Aave',      apr: 3.6,   ltv: 80,  liq: 83,   type: 'DeFi', color: '#B6509E', link: 'https://aave.com',         best: true,  founded: '2020', country: 'Décentralisé',    users: '500K+', regulated: false, about: 'Leader DeFi sur ETH. LTV la plus haute (80%). Déposez de l\'ETH, empruntez de l\'USDC.' },
      { name: 'Morpho',    apr: 2.59,  ltv: 86,  liq: 86,   type: 'DeFi', color: '#4C6FFF', link: 'https://app.morpho.org',   best: false, founded: '2022', country: 'Décentralisé',    users: '80K+',  regulated: false, about: 'Protocole DeFi permissionless sur Ethereum. Marchés isolés, LTV élevée (86%). Taux déterminés par chaque marché indépendamment.' },
      { name: 'YouHodler', apr: 8.0,   ltv: 97,  liq: 98.5, type: 'CeFi', color: '#1EBDD2', link: 'https://youhodler.com',    best: false, founded: '2018', country: 'Suisse / Chypre', users: '1M+',   regulated: true,  manualUpdate: 'avr. 2026', aprLabel: '8 – 16', about: 'Prêts en USDC/USDT adossés à ETH. Taux de 8% APR (CVR 97%, liquidation dès -1,5%) à 16% APR (CVR 50%, liquidation à -45%). Durée max 60 jours.' },
      { name: 'Nexo',      apr: 17.9,  ltv: 50,  liq: 83,   ltvDynamic: true, type: 'CeFi', color: '#0EA5E9', link: 'https://nexo.com', best: false, founded: '2018', country: 'UE / Caïmans', users: '7M+', regulated: true, manualUpdate: 'avr. 2026', aprLabel: '9.9 – 17.9', about: 'Plateforme CeFi régulée, 7M+ utilisateurs. Taux selon niveau fidélité NEXO token. LTV déterminé dynamiquement par Nexo.' },
      { name: 'Nebeus',    apr: 7.0,   ltv: 65,  liq: 80,   type: 'CeFi', color: '#6C3CE1', link: 'https://nebeus.com',       best: false, founded: '2014', country: 'Royaume-Uni',    users: '200K+', regulated: true,  manualUpdate: 'avr. 2026', about: 'Prêt ETH sur Nebeus. Interest Only Loan (7% APR, LTV 65%). FCA-régulée.' },
    ],
  },
  usdt: {
    bitcoin: [
      { name: 'Aave',      apr: 3.8,   ltv: 73, liq: 78,   type: 'DeFi', color: '#B6509E', link: 'https://aave.com',         best: true,  founded: '2020', country: 'Décentralisé',    users: '500K+', regulated: false, about: 'Leader DeFi. Déposez du WBTC, empruntez de l\'USDT. Smart contracts audités, pas de KYC.' },
      { name: 'Morpho',    apr: 3.88,  ltv: 86, liq: 86,   type: 'DeFi', color: '#4C6FFF', link: 'https://app.morpho.org',   best: false, founded: '2022', country: 'Décentralisé',    users: '80K+',  regulated: false, about: 'Protocole DeFi permissionless sur Ethereum. Marchés isolés, LTV élevée (86%). Taux variables par marché.' },
      { name: 'YouHodler', apr: 8.0,   ltv: 97, liq: 98.5, type: 'CeFi', color: '#1EBDD2', link: 'https://youhodler.com',    best: false, founded: '2018', country: 'Suisse / Chypre', users: '1M+',   regulated: true,  manualUpdate: 'avr. 2026', aprLabel: '8 – 16', about: 'Prêts en USDT adossés à BTC. Taux de 8% APR (CVR 97%, liquidation dès -1,5%) à 16% APR (CVR 50%, liquidation à -45%). Durée max 60 jours.' },
    ],
    ethereum: [
      { name: 'Aave',      apr: 3.8,   ltv: 80,  liq: 83,   type: 'DeFi', color: '#B6509E', link: 'https://aave.com',         best: true,  founded: '2020', country: 'Décentralisé',    users: '500K+', regulated: false, about: 'Leader DeFi sur ETH. LTV la plus haute (80%). Déposez de l\'ETH, empruntez de l\'USDT.' },
      { name: 'Morpho',    apr: 9.61,  ltv: 91.5, liq: 91.5, type: 'DeFi', color: '#4C6FFF', link: 'https://app.morpho.org',  best: false, founded: '2022', country: 'Décentralisé',    users: '80K+',  regulated: false, about: 'Protocole DeFi permissionless sur Ethereum. LTV très haute (91.5%). Taux variables par marché.' },
      { name: 'YouHodler', apr: 8.0,   ltv: 97,  liq: 98.5, type: 'CeFi', color: '#1EBDD2', link: 'https://youhodler.com',    best: false, founded: '2018', country: 'Suisse / Chypre', users: '1M+',   regulated: true,  manualUpdate: 'avr. 2026', aprLabel: '8 – 16', about: 'Prêts en USDT adossés à ETH. Taux de 8% / an (CVR 97%, liquidation dès -1,5%) à 16% / an (CVR 50%, liquidation à -45%). Durée max 60 jours.' },
    ],
  },
}

const FAQ = [
  { q: "Que se passe-t-il si le prix de ma crypto baisse ?", a: "Si le prix baisse sous le seuil de liquidation, la plateforme vend automatiquement une partie de votre collatéral pour rembourser le prêt. Pour éviter cela : empruntez moins que le maximum (LTV faible = plus de sécurité) ou ajoutez du collatéral si le prix baisse." },
  { q: "Quelle est la différence entre CeFi et DeFi ?", a: "CeFi (Nexo, Ledn) : plateforme centralisée, plus simple, support client, mais ils détiennent vos fonds. DeFi (Aave, Morpho) : smart contracts, vous gardez le contrôle de vos fonds. Plus technique, mais aucune entité ne peut geler vos actifs." },
  { q: "Est-ce que je dois payer des impôts sur un prêt crypto ?", a: "En France, un prêt collatéralisé n'est pas un événement imposable car vous ne vendez pas votre crypto. Vous ne payez pas la flat tax de 30%. En revanche, si votre collatéral est liquidé, cette liquidation peut être considérée comme une vente imposable. Consultez un comptable." },
  { q: "Quel est le montant minimum pour emprunter ?", a: "Sur CeFi (Nexo, Ledn), les minimums sont généralement autour de 500–1 000 €. Sur DeFi (Aave, Morpho), pas de minimum officiel, mais les frais de gas rendent les petits montants peu rentables en dessous de ~5 000 €." },
]

const BLOG = [
  { tag: 'Guide',   title: "Qu'est-ce qu'un prêt Bitcoin collatéralisé ?", date: '12 mars 2025', read: '5 min', bg: '#FFF8F0', icon: '₿' },
  { tag: 'Analyse', title: 'CeFi vs DeFi : quel prêt choisir en 2025 ?',   date: '5 mars 2025',  read: '8 min', bg: '#F0FDF4', icon: '📊' },
  { tag: 'Risques', title: 'Comment éviter la liquidation de son collatéral', date: '28 fév 2025', read: '6 min', bg: '#EFF6FF', icon: '⚠️' },
]

// ── Design tokens StakingRewards ──────────────────────────────────────────────
const SR = {
  bgPage:    '#EEEEF5',   // fond lavande
  bgCard:    '#FFFFFF',   // cards blanches
  bgCardAlt: '#F4F4FB',   // alternance légère / header tableau
  bgNav:     '#FFFFFF',
  border:    '#E0E0EC',   // bordure lavande-grise
  borderLight: '#EAEAF4',
  text:      '#0F172A',   // quasi noir
  textSec:   '#6B7280',   // gris moyen
  textMuted: '#9CA3AF',   // gris clair
  blue:      '#2563EB',   // bleu SR CTA
  green:     '#16A34A',
  red:       '#EF4444',
  greenBg:   '#DCFCE7',
}

const W  = '1320px'
const PX = '32px'
const GRID = '230px 160px 120px 1fr 1fr 140px 150px'

export default function Home() {
  const [stablecoin, setStablecoin] = useState('usdc')
  const [collateral, setCollateral] = useState('bitcoin')
  const [prices, setPrices]         = useState({})
  const [amount, setAmount]         = useState(1)
  const [mounted, setMounted]       = useState(false)
  const [sort, setSort]             = useState('apr')
  const [filter, setFilter]         = useState('all')
  const [openFaq, setOpenFaq]       = useState(null)
  const [imgErrors, setImgErrors]   = useState({})
  const [defiRates, setDefiRates]   = useState(null)
  const [updatedAt, setUpdatedAt]   = useState(null)
  const [isMobile, setIsMobile]     = useState(false)
  const [youhodlerCvr, setYouhodlerCvr] = useState(90)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    setMounted(true)
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=eur')
      .then(r => r.json()).then(d => setPrices(d)).catch(() => {})
  }, [])

  useEffect(() => {
    fetch('/api/rates')
      .then(r => r.json())
      .then(d => { setDefiRates(d); setUpdatedAt(d.updatedAt) })
      .catch(() => {})
  }, [])

  const s     = STABLECOINS.find(x => x.id === stablecoin)
  const c     = COLLATERALS.find(x => x.id === collateral)
  const price = prices[c.coingeckoId]?.eur || 0
  const col   = amount * price
  const fmt   = n => Math.round(n).toLocaleString('fr-FR')
  const timeAgo = (iso) => {
    if (!iso) return ''
    const mins = Math.floor((Date.now() - new Date(iso)) / 60000)
    if (mins < 1) return "à l'instant"
    if (mins < 60) return `il y a ${mins} min`
    return `il y a ${Math.floor(mins / 60)}h`
  }

  const YH_CVR = {
    97: { apr: 8.0,  liqPct: 1.5  },
    90: { apr: 12.0, liqPct: 5.0  },
    70: { apr: 14.0, liqPct: 25.0 },
    50: { apr: 16.0, liqPct: 45.0 },
  }
  const youhodlerCalc = (cvr) => {
    const d = YH_CVR[cvr] || YH_CVR[90]
    return { apr: d.apr, liq: 100 - d.liqPct, liqPct: d.liqPct }
  }

  const rows = (PLATFORMS[stablecoin]?.[collateral] || [])
    .filter(p => filter === 'all' || p.type === filter)
    .map(p => {
      if (p.name === 'Aave' && defiRates?.aave) {
        const apr = defiRates.aave.rates?.[stablecoin]
        const col = defiRates.aave.collateral?.[collateral]
        if (apr !== null && apr !== undefined && col)
          return { ...p, apr, ltv: col.ltv, liq: col.liquidationThreshold }
      }
      if (p.name === 'Morpho' && defiRates?.morpho) {
        const apr = defiRates.morpho.rates?.[stablecoin]?.[collateral]
        const col = defiRates.morpho.collateral?.[collateral]
        if (apr !== null && apr !== undefined && col)
          return { ...p, apr, ltv: col.ltv, liq: col.liquidationThreshold }
      }
      return p
    })
    .sort((a, b) => sort === 'apr' ? a.apr - b.apr : b.ltv - a.ltv)
    .map((p, _, arr) => {
      const minApr = Math.min(...arr.map(x => x.apr))
      return { ...p, best: p.apr === minApr }
    })

  const wrap = { maxWidth: W, margin: '0 auto', padding: `0 ${PX}` }

  const PlatformLogo = ({ name, color }) => {
    const src = PLATFORM_LOGOS[name]
    if (src && !imgErrors[name]) {
      return (
        <div style={{
          width: '40px', height: '40px', borderRadius: '10px',
          background: '#F4F4FB', border: `1px solid ${SR.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <img src={src} alt={name} width={24} height={24} style={{ borderRadius: '4px', objectFit: 'cover' }}
            onError={() => setImgErrors(prev => ({ ...prev, [name]: true }))} />
        </div>
      )
    }
    return (
      <div style={{
        width: '40px', height: '40px', borderRadius: '10px',
        background: color + '18', border: `1px solid ${color}30`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color, fontWeight: '800', fontSize: '15px', flexShrink: 0,
      }}>
        {name[0]}
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Nantix — Comparateur de prêts crypto collatéralisés</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <style>{`
          *, *::before, *::after {
            font-family: 'Inter', sans-serif;
            box-sizing: border-box;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          body { background: ${SR.bgPage}; }
          @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.3} }
          @keyframes fadeInUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
          .fade-row { animation: fadeInUp .3s cubic-bezier(.16,1,.3,1) both }
          .platform-row { transition: background .12s ease; }
          .platform-row:hover { background: #F4F4FB !important; }
          .cta-btn { transition: all .15s ease; }
          .cta-btn:hover { background: ${SR.blue} !important; color: #fff !important; border-color: ${SR.blue} !important; }
          .yh-tooltip { opacity:0; visibility:hidden; transition:opacity .15s ease }
          .yh-tooltip-wrap:hover .yh-tooltip { opacity:1; visibility:visible }
          input[type=number]::-webkit-inner-spin-button,
          input[type=number]::-webkit-outer-spin-button { -webkit-appearance:none; margin:0; }
          .tab-btn { transition: all .15s; border-bottom: 2px solid transparent; }
          .tab-btn:hover { color: ${SR.text} !important; }
        `}</style>
        <meta name="description" content="Comparez les taux pour emprunter de l'USDC ou USDT en déposant du BTC ou ETH. Données en temps réel." />
      </Head>
      <Navbar />

      <main style={{ background: SR.bgPage, minHeight: '100vh', paddingTop: '52px' }}>

        {/* ── HERO ── */}
        <section style={{ padding: isMobile ? '48px 0 40px' : '88px 0 72px' }}>
          <div style={wrap}>
            <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                background: SR.bgCard, border: `1px solid ${SR.border}`,
                borderRadius: '20px', padding: '5px 12px', marginBottom: '28px',
              }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22C55E', animation: 'pulse 2s infinite' }} />
                <span style={{ fontSize: '11px', fontWeight: '600', color: SR.textSec, letterSpacing: '0.2px' }}>
                  Taux Aave & Morpho en temps réel
                </span>
              </div>
              <h1 style={{
                fontSize: isMobile ? '32px' : '52px',
                fontWeight: '800',
                letterSpacing: isMobile ? '-1px' : '-2px',
                color: SR.text,
                lineHeight: '1.12',
                marginBottom: '18px',
              }}>
                Empruntez sans<br />vendre votre crypto.
              </h1>
              <p style={{ fontSize: '17px', color: SR.textSec, lineHeight: '1.7', fontWeight: '400' }}>
                Déposez du BTC ou ETH, empruntez de l'USDC ou USDT.<br />
                Comparez les meilleurs taux en une vue.
              </p>

              {/* Stats pills — style SR */}
              <div style={{
                display: 'flex', justifyContent: 'center', gap: '12px',
                marginTop: '36px', flexWrap: 'wrap',
              }}>
                {[
                  { v: '6', l: 'Plateformes' },
                  { v: '2,56%', l: 'Meilleur taux' },
                  { v: '97%', l: 'LTV max' },
                ].map(s => (
                  <div key={s.l} style={{
                    background: SR.bgCard, border: `1px solid ${SR.border}`,
                    borderRadius: '12px', padding: '14px 24px', textAlign: 'center',
                    minWidth: '120px',
                  }}>
                    <div style={{ fontSize: '22px', fontWeight: '700', color: SR.text, letterSpacing: '-0.5px' }}>{s.v}</div>
                    <div style={{ fontSize: '11px', color: SR.textMuted, marginTop: '3px', fontWeight: '500' }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── RISQUE banner ── */}
        <div style={{ ...wrap, paddingBottom: '12px' }}>
          <div style={{
            background: '#FFFBEB', border: '1px solid #FDE68A',
            borderRadius: '10px', padding: '12px 16px',
            display: 'flex', gap: '10px',
          }}>
            <span style={{ fontSize: '14px', flexShrink: 0 }}>⚠️</span>
            <div>
              <div style={{ fontSize: '12px', fontWeight: '600', color: '#92400E', marginBottom: '3px' }}>
                Qu'est-ce que le risque de liquidation ?
              </div>
              <div style={{ fontSize: '12px', color: '#B45309', lineHeight: '1.6' }}>
                Dans un prêt collatéralisé, si le prix de la crypto baisse sous le seuil de liquidation, la plateforme vend automatiquement une partie du collatéral. La colonne <strong>Liquidation</strong> indique ce seuil.
              </div>
            </div>
          </div>
        </div>

        {/* ── ONGLETS stablecoin — style SR ── */}
        <div style={{ background: SR.bgCard, borderTop: `1px solid ${SR.border}`, borderBottom: `1px solid ${SR.border}`, marginTop: '16px' }}>
          <div style={{ maxWidth: W, margin: '0 auto', padding: `0 ${PX}`, display: 'flex', alignItems: 'stretch' }}>
            {STABLECOINS.map(x => (
              <button
                key={x.id}
                onClick={() => { setStablecoin(x.id); setFilter('all') }}
                className="tab-btn"
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '14px 20px',
                  fontSize: '13px', fontWeight: '600',
                  color: stablecoin === x.id ? SR.text : SR.textMuted,
                  background: 'transparent', border: 'none',
                  borderBottom: `2px solid ${stablecoin === x.id ? SR.blue : 'transparent'}`,
                  cursor: 'pointer', whiteSpace: 'nowrap',
                }}
              >
                <img src={x.logo} alt={x.symbol} width={16} height={16} style={{ borderRadius: '50%' }} />
                {x.name}
              </button>
            ))}
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', color: SR.textMuted }}>Emprunter</span>
            </div>
          </div>
        </div>

        {/* ── FILTRES collatéral ── */}
        <div style={{ background: SR.bgCardAlt, borderBottom: `1px solid ${SR.border}` }}>
          <div style={{ maxWidth: W, margin: '0 auto', padding: `10px ${PX}`, display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>

            {/* Collateral toggle */}
            <div style={{ display: 'flex', background: SR.bgCard, border: `1px solid ${SR.border}`, borderRadius: '8px', overflow: 'hidden' }}>
              {COLLATERALS.map(x => (
                <button key={x.id} onClick={() => { setCollateral(x.id); setAmount(1) }} style={{
                  display: 'flex', alignItems: 'center', gap: '5px',
                  padding: '7px 14px', fontSize: '13px', fontWeight: '600',
                  color: collateral === x.id ? '#fff' : SR.textSec,
                  background: collateral === x.id ? SR.text : 'transparent',
                  border: 'none', cursor: 'pointer', transition: 'all .15s',
                }}>
                  <img src={x.logo} alt={x.symbol} width={14} height={14} style={{ borderRadius: '50%' }} />
                  {x.symbol}
                </button>
              ))}
            </div>

            {/* Amount input */}
            <div style={{ display: 'flex', alignItems: 'center', background: SR.bgCard, border: `1px solid ${SR.border}`, borderRadius: '8px', overflow: 'hidden' }}>
              <input type="number" value={amount}
                onChange={e => setAmount(Math.max(0.001, parseFloat(e.target.value) || 0))}
                step="0.1"
                style={{ border: 'none', padding: '7px 10px', fontSize: '14px', width: '70px', outline: 'none', color: SR.text, background: 'transparent', fontWeight: '600' }}
              />
              <span style={{ padding: '0 12px', fontSize: '12px', fontWeight: '600', color: SR.textMuted }}>{c.symbol}</span>
            </div>
            <span style={{ fontSize: '13px', color: SR.textSec, whiteSpace: 'nowrap' }}>
              ≈ {mounted && price > 0 ? fmt(col) : '—'} €
            </span>

            <div style={{ marginLeft: 'auto' }} />

            {/* CeFi/DeFi filter */}
            <div style={{ display: 'flex', background: SR.bgCard, border: `1px solid ${SR.border}`, borderRadius: '8px', padding: '3px', gap: '2px' }}>
              {['all', 'CeFi', 'DeFi'].map(f => (
                <button key={f} onClick={() => setFilter(f)} style={{
                  padding: '5px 14px', fontSize: '12px', fontWeight: '600',
                  background: filter === f ? SR.text : 'transparent',
                  color: filter === f ? '#fff' : SR.textSec,
                  border: 'none', cursor: 'pointer', borderRadius: '6px',
                  transition: 'all .15s',
                }}>{f === 'all' ? 'Tout' : f}</button>
              ))}
            </div>
          </div>
        </div>

        {/* ── TABLEAU ── */}
        <div style={{ ...wrap, marginTop: '16px', marginBottom: '8px' }}>
          <div style={{
            background: SR.bgCard,
            borderRadius: '14px',
            border: `1px solid ${SR.border}`,
            overflow: 'hidden',
            boxShadow: '0 1px 4px rgba(0,0,0,.04)',
          }}>
            {/* Header */}
            {!isMobile && (
              <div style={{
                display: 'grid', gridTemplateColumns: GRID,
                padding: '10px 20px',
                fontSize: '11px', fontWeight: '600', color: SR.textMuted,
                textTransform: 'uppercase', letterSpacing: '0.6px',
                borderBottom: `1px solid ${SR.border}`,
                background: SR.bgCardAlt,
              }}>
                <span>Plateforme</span>
                <span>Taux / an</span>
                <span>LTV max</span>
                <span>Emprunt max</span>
                <span>Liquidation / {c.symbol}</span>
                <span>Accès</span>
                <span></span>
              </div>
            )}

            {rows.map((p, i) => {
              const isYouHodler = p.name === 'YouHodler'
              const yhCalc      = isYouHodler ? youhodlerCalc(youhodlerCvr) : null
              const displayApr  = isYouHodler ? yhCalc.apr : p.apr
              const displayLtv  = isYouHodler ? youhodlerCvr : p.ltv
              const displayLiq  = isYouHodler ? yhCalc.liq  : p.liq

              const maxBorrow = (col * displayLtv) / 100
              const liqPrice  = price > 0 ? (price * (displayLiq / 100)) : 0
              const isLive    = (p.name === 'Aave' && defiRates?.aave?.rates?.[stablecoin] !== undefined) ||
                                (p.name === 'Morpho' && defiRates?.morpho?.rates?.[stablecoin]?.[collateral] !== undefined)

              const AprBadge = () => (
                <div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '3px' }}>
                    <div style={{ fontSize: isMobile ? '22px' : '20px', fontWeight: '700', color: SR.text, letterSpacing: '-.5px', whiteSpace: 'nowrap' }}>
                      {isYouHodler ? `${displayApr}%` : (p.aprLabel ? `${p.aprLabel}%` : `${p.apr}%`)}
                    </div>
                    {isYouHodler && !isMobile && (
                      <div className="yh-tooltip-wrap" style={{ position: 'relative', display: 'inline-flex', marginTop: '2px' }}>
                        <span style={{ width: '13px', height: '13px', borderRadius: '50%', background: SR.bgCardAlt, color: SR.textMuted, fontSize: '9px', fontWeight: '800', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'default', userSelect: 'none', border: `1px solid ${SR.border}` }}>?</span>
                        <div className="yh-tooltip" style={{ position: 'absolute', bottom: '22px', left: '50%', transform: 'translateX(-50%)', background: '#1E293B', color: '#fff', borderRadius: '8px', padding: '10px 12px', fontSize: '11px', lineHeight: '1.6', width: '220px', zIndex: 100, pointerEvents: 'none', boxShadow: '0 4px 20px rgba(0,0,0,.2)' }}>
                          <div style={{ fontWeight: '700', marginBottom: '6px' }}>YouHodler — taux selon LTV</div>
                          {[97, 90, 70, 50].map(cvr => {
                            const d = YH_CVR[cvr]
                            return (
                              <div key={cvr} style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0', borderBottom: '1px solid #334155' }}>
                                <span style={{ color: '#94A3B8' }}>LTV {cvr}%</span>
                                <span style={{ fontWeight: '700' }}>{d.apr}% · liq. −{d.liqPct}%</span>
                              </div>
                            )
                          })}
                          <div style={{ position: 'absolute', bottom: '-5px', left: '50%', transform: 'translateX(-50%) rotate(45deg)', width: '10px', height: '10px', background: '#1E293B' }} />
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
                    <div style={{ fontSize: '9px', color: SR.textMuted, marginTop: '3px' }}>
                      Mis à jour {p.manualUpdate || 'manuellement'}
                    </div>
                  )}
                </div>
              )

              const AccesBadges = () => (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '11px', fontWeight: '600', color: SR.textSec }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', flexShrink: 0, background: p.type === 'DeFi' ? SR.textMuted : SR.green }} />
                    {p.type === 'DeFi' ? 'Wallet requis' : 'Sans wallet'}
                  </div>
                  {p.type === 'CeFi' && (
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '11px', fontWeight: '600', color: SR.blue }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: SR.blue }} />
                      Régulé
                    </div>
                  )}
                </div>
              )

              return (
                <div key={p.name} style={{ borderBottom: `1px solid ${SR.borderLight}` }}>
                  {isMobile ? (
                    /* ── MOBILE CARD ── */
                    <div className="fade-row" style={{
                      animationDelay: `${i * 0.06}s`,
                      background: SR.bgCard,
                      borderRadius: '12px',
                      border: p.best ? `2px solid ${SR.blue}` : `1px solid ${SR.border}`,
                      overflow: 'hidden',
                      margin: '8px',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <PlatformLogo name={p.name} color={p.color} />
                          <div>
                            <div style={{ fontSize: '15px', fontWeight: '700', color: SR.text }}>{p.name}</div>
                            <div style={{ fontSize: '10px', fontWeight: '600', color: p.type === 'DeFi' ? SR.textMuted : SR.green }}>
                              {p.type === 'DeFi' ? '⚙️ Wallet requis' : '✅ Sans wallet'}
                            </div>
                          </div>
                        </div>
                        <AprBadge />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderTop: `1px solid ${SR.border}`, borderBottom: `1px solid ${SR.border}`, background: SR.bgCardAlt }}>
                        {[
                          { label: 'LTV', val: `${displayLtv}%`, color: SR.text, sz: '15px' },
                          { label: 'Emprunt max', val: mounted && price > 0 ? fmt(maxBorrow) + ' €' : '—', color: SR.green, sz: '13px' },
                          { label: 'Liquidation', val: mounted && price > 0 ? fmt(liqPrice) + ' €' : '—', color: SR.red, sz: '13px' },
                        ].map((cell, ci) => (
                          <div key={ci} style={{ padding: '10px 12px', borderRight: ci < 2 ? `1px solid ${SR.border}` : 'none' }}>
                            <div style={{ fontSize: '9px', color: SR.textMuted, fontWeight: '700', textTransform: 'uppercase', marginBottom: '3px' }}>{cell.label}</div>
                            <div style={{ fontSize: cell.sz, fontWeight: '700', color: cell.color }}>{cell.val}</div>
                          </div>
                        ))}
                      </div>
                      <div style={{ padding: '12px 16px' }}>
                        <a href={p.link} target="_blank" rel="noopener noreferrer" style={{
                          display: 'block', textAlign: 'center', padding: '11px',
                          borderRadius: '8px', fontSize: '13px', fontWeight: '700',
                          textDecoration: 'none',
                          background: p.best ? SR.blue : SR.bgCardAlt,
                          color: p.best ? '#fff' : SR.text,
                          border: `1px solid ${p.best ? SR.blue : SR.border}`,
                        }}>Emprunter →</a>
                      </div>
                    </div>
                  ) : (
                    /* ── DESKTOP ROW ── */
                    <div
                      className="fade-row platform-row"
                      style={{
                        animationDelay: `${i * 0.05}s`,
                        display: 'grid',
                        gridTemplateColumns: GRID,
                        padding: '0 20px',
                        alignItems: 'center',
                        minHeight: isYouHodler ? '88px' : '72px',
                        background: SR.bgCard,
                        cursor: 'default',
                      }}
                    >
                      {/* Col 1 — Plateforme */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <PlatformLogo name={p.name} color={p.color} />
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: '600', color: SR.text }}>{p.name}</div>
                          <div style={{
                            display: 'inline-block', fontSize: '10px', fontWeight: '700',
                            padding: '2px 7px', borderRadius: '4px', marginTop: '3px',
                            background: p.type === 'DeFi' ? '#EEF2FF' : '#F0FDF4',
                            color: p.type === 'DeFi' ? '#4338CA' : SR.green,
                          }}>
                            {p.type}
                          </div>
                        </div>
                      </div>

                      {/* Col 2 — Taux */}
                      <AprBadge />

                      {/* Col 3 — LTV */}
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <div style={{ fontSize: '18px', fontWeight: '700', color: SR.text, letterSpacing: '-.5px' }}>{displayLtv}%</div>
                          {p.ltvDynamic && (
                            <div className="yh-tooltip-wrap" style={{ position: 'relative', display: 'inline-flex' }}>
                              <span style={{ width: '13px', height: '13px', borderRadius: '50%', background: SR.bgCardAlt, color: SR.textMuted, fontSize: '9px', fontWeight: '800', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'default', border: `1px solid ${SR.border}` }}>?</span>
                              <div className="yh-tooltip" style={{ position: 'absolute', bottom: '22px', left: '50%', transform: 'translateX(-50%)', background: '#1E293B', color: '#fff', borderRadius: '8px', padding: '10px 12px', fontSize: '11px', lineHeight: '1.6', width: '210px', zIndex: 100, pointerEvents: 'none', boxShadow: '0 4px 20px rgba(0,0,0,.2)' }}>
                                <div style={{ fontWeight: '700', marginBottom: '4px' }}>LTV variable</div>
                                <div style={{ fontSize: '10px', color: '#94A3B8' }}>Le LTV est déterminé dynamiquement par Nexo. 50% est la valeur de référence actuelle.</div>
                                <div style={{ position: 'absolute', bottom: '-5px', left: '50%', transform: 'translateX(-50%) rotate(45deg)', width: '10px', height: '10px', background: '#1E293B' }} />
                              </div>
                            </div>
                          )}
                        </div>
                        {/* LTV bar */}
                        <div style={{ height: '3px', background: SR.border, borderRadius: '3px', marginTop: '8px', width: '56px' }}>
                          <div style={{ height: '100%', width: `${Math.min(displayLtv, 100)}%`, background: SR.green, borderRadius: '3px' }} />
                        </div>
                      </div>

                      {/* Col 4 — Emprunt max */}
                      <div style={{ fontSize: '18px', fontWeight: '700', color: SR.green, letterSpacing: '-.3px' }}>
                        {mounted && price > 0 ? fmt(maxBorrow) + ' €' : '—'}
                      </div>

                      {/* Col 5 — Liquidation */}
                      <div>
                        <div style={{ fontSize: '18px', fontWeight: '700', color: SR.red, letterSpacing: '-.3px' }}>
                          {mounted && price > 0 ? fmt(liqPrice) + ' €' : '—'}
                        </div>
                        {mounted && price > 0 && (
                          <div style={{ fontSize: '11px', color: SR.textMuted, marginTop: '3px' }}>
                            <span style={{ color: SR.red, fontWeight: '600' }}>
                              −{Math.round((1 - displayLiq / 100) * 100)}%
                            </span>{' '}avant liquidation
                          </div>
                        )}
                      </div>

                      {/* Col 6 — Accès */}
                      <AccesBadges />

                      {/* Col 7 — CTA */}
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cta-btn"
                        style={{
                          display: 'block', textAlign: 'center',
                          padding: '9px 16px', borderRadius: '8px',
                          fontSize: '13px', fontWeight: '600',
                          textDecoration: 'none', whiteSpace: 'nowrap',
                          background: '#fff', color: SR.text,
                          border: `1px solid ${SR.border}`,
                          letterSpacing: '0.1px',
                        }}
                      >
                        Emprunter →
                      </a>
                    </div>
                  )}
                </div>
              )
            })}

            {updatedAt && (
              <div style={{ textAlign: 'right', fontSize: '11px', color: SR.textMuted, padding: '8px 20px 4px' }}>
                Taux DeFi mis à jour le {new Date(updatedAt).toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </div>
            )}

            <div style={{ display: 'flex', gap: '10px', padding: '14px 20px', borderTop: `1px solid ${SR.border}`, marginTop: '4px' }}>
              <span>🔍</span>
              <p style={{ fontSize: '11px', color: SR.textSec, lineHeight: '1.6', margin: 0 }}>
                <strong style={{ color: SR.text }}>Indépendance éditoriale.</strong> Nantix est un comparateur indépendant. Les données affichées ne sont pas influencées par les plateformes. Des commissions d'affiliation peuvent être perçues via certains liens — elles ne modifient pas notre classement.
              </p>
            </div>
          </div>
        </div>

        {/* ── VENDRE VS EMPRUNTER ── */}
        <section style={{ padding: '80px 0' }}>
          <div style={wrap}>
            <div style={{ fontSize: '10px', fontWeight: '700', color: SR.textMuted, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Comment ça fonctionne ?</div>
            <h2 style={{ fontSize: '28px', fontWeight: '700', letterSpacing: '-.8px', color: SR.text, marginBottom: '8px' }}>
              Vente vs prêt collatéralisé : quelles différences ?
            </h2>
            <p style={{ fontSize: '14px', color: SR.textSec, lineHeight: '1.6', maxWidth: '500px', marginBottom: '28px' }}>
              Un prêt collatéralisé permet d'obtenir des liquidités sans vendre sa crypto.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1px 1fr',
              background: SR.bgCard,
              border: `1px solid ${SR.border}`,
              borderRadius: '12px',
              overflow: 'hidden',
              marginBottom: '20px',
              boxShadow: '0 1px 4px rgba(0,0,0,.04)',
            }}>
              {[
                { header: '✕ Vendre votre crypto', color: SR.red, rows: [['Impôt plus-values', '30% flat tax', true], ['Exposition marché', 'Perdue', true], ['Délai', '1–3 jours', false], ['Montant net', '~70% après impôt', true]] },
                null,
                { header: '✓ Prêt collatéralisé', color: SR.green, rows: [['Impôt plus-values', 'Aucun', false], ['Exposition marché', 'Conservée', false], ['Délai', 'Quelques minutes', false], ['Montant accessible', '50–80% collatéral', false]] },
              ].map((col, ci) => col === null
                ? <div key={ci} style={{ background: SR.border }} />
                : (
                  <div key={ci} style={{ padding: '20px 24px' }}>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: col.color, marginBottom: '16px' }}>{col.header}</div>
                    {col.rows.map(r => (
                      <div key={r[0]} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: `1px solid ${SR.borderLight}`, fontSize: '13px' }}>
                        <span style={{ color: SR.textSec }}>{r[0]}</span>
                        <span style={{ fontWeight: '600', color: r[2] ? col.color : SR.text }}>{r[1]}</span>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: '12px' }}>
              {[
                { icon: '🏦', t: 'Pas de score de crédit requis', d: 'Les prêts crypto utilisent votre collatéral comme garantie. Aucun historique de crédit n\'est nécessaire.' },
                { icon: '📊', t: 'Collatéral récupéré au remboursement', d: 'Au remboursement du prêt, le collatéral est restitué. L\'exposition au marché est maintenue pendant la durée du prêt.' },
                { icon: '⏱', t: 'Délais de traitement variables', d: 'Sur CeFi, les fonds sont généralement disponibles en quelques minutes. Sur DeFi, le traitement est quasi-instantané.' },
              ].map(card => (
                <div key={card.t} style={{
                  background: SR.bgCard,
                  border: `1px solid ${SR.border}`,
                  borderRadius: '12px',
                  padding: '18px 20px',
                  boxShadow: '0 1px 4px rgba(0,0,0,.04)',
                }}>
                  <div style={{ fontSize: '20px', marginBottom: '10px' }}>{card.icon}</div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: SR.text, marginBottom: '6px' }}>{card.t}</div>
                  <div style={{ fontSize: '12px', color: SR.textSec, lineHeight: '1.6' }}>{card.d}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section style={{ padding: '80px 0', background: SR.bgCard, borderTop: `1px solid ${SR.border}`, borderBottom: `1px solid ${SR.border}` }}>
          <div style={wrap}>
            <div style={{ fontSize: '10px', fontWeight: '700', color: SR.textMuted, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Questions fréquentes</div>
            <h2 style={{ fontSize: '28px', fontWeight: '700', letterSpacing: '-.8px', color: SR.text, marginBottom: '32px' }}>
              Fonctionnement des prêts crypto collatéralisés
            </h2>
            {FAQ.map((item, i) => (
              <div key={i} style={{ borderBottom: `1px solid ${SR.border}` }}>
                <div onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ padding: '16px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', gap: '16px' }}>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: SR.text }}>{item.q}</span>
                  <span style={{ fontSize: '12px', color: SR.textMuted, flexShrink: 0, display: 'inline-block', transition: 'transform .2s', transform: openFaq === i ? 'rotate(180deg)' : 'none' }}>▾</span>
                </div>
                {openFaq === i && <div style={{ paddingBottom: '16px', fontSize: '13px', color: SR.textSec, lineHeight: '1.7' }}>{item.a}</div>}
              </div>
            ))}
          </div>
        </section>

        {/* ── BLOG ── */}
        <section style={{ padding: '80px 0' }}>
          <div style={wrap}>
            <div style={{ fontSize: '10px', fontWeight: '700', color: SR.textMuted, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Ressources</div>
            <h2 style={{ fontSize: '28px', fontWeight: '700', letterSpacing: '-.8px', color: SR.text, marginBottom: '28px' }}>Ressources et guides</h2>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: '16px' }}>
              {BLOG.map(b => (
                <div key={b.title} style={{
                  background: SR.bgCard,
                  border: `1px solid ${SR.border}`,
                  borderRadius: '12px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'box-shadow .15s, transform .15s',
                  boxShadow: '0 1px 4px rgba(0,0,0,.04)',
                }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,.08)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,.04)'; e.currentTarget.style.transform = 'none' }}
                >
                  <div style={{ height: '80px', background: b.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px' }}>{b.icon}</div>
                  <div style={{ padding: '14px 16px' }}>
                    <div style={{ fontSize: '10px', fontWeight: '700', color: SR.textMuted, textTransform: 'uppercase', letterSpacing: '.7px', marginBottom: '6px' }}>{b.tag}</div>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: SR.text, lineHeight: '1.4', marginBottom: '6px' }}>{b.title}</div>
                    <div style={{ fontSize: '11px', color: SR.textMuted }}>{b.date} · {b.read}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── NEWSLETTER ── */}
        <section style={{ padding: '52px 0', background: SR.bgCard, borderTop: `1px solid ${SR.border}` }}>
          <div style={wrap}>
            <div style={{
              background: SR.bgCardAlt,
              border: `1px solid ${SR.border}`,
              borderRadius: '14px',
              padding: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '32px',
              flexWrap: 'wrap',
            }}>
              <div style={{ maxWidth: '420px' }}>
                <div style={{ fontSize: '20px', fontWeight: '700', color: SR.text, letterSpacing: '-.4px', marginBottom: '6px' }}>Suivi des taux</div>
                <div style={{ fontSize: '14px', color: SR.textSec, lineHeight: '1.6', marginBottom: '8px' }}>Recevez un récapitulatif hebdomadaire des variations de taux sur les principales plateformes.</div>
                <div style={{ fontSize: '12px', color: SR.textMuted }}>Fréquence maximale : 1 email par semaine.</div>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexShrink: 0, width: isMobile ? '100%' : 'auto', flexDirection: isMobile ? 'column' : 'row' }}>
                <input type="email" placeholder="votre@email.com" style={{
                  border: `1px solid ${SR.border}`, borderRadius: '8px',
                  padding: '10px 14px', fontSize: '13px', outline: 'none',
                  width: isMobile ? '100%' : '220px', color: SR.text,
                  background: SR.bgCard, boxSizing: 'border-box',
                }} />
                <button style={{
                  background: SR.blue, color: '#fff', border: 'none',
                  borderRadius: '8px', padding: '10px 20px',
                  fontSize: '13px', fontWeight: '700', cursor: 'pointer',
                }}>S'abonner</button>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
