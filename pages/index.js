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
  { q: "Nantix est-il indépendant ?", a: "Oui. Nantix ne reçoit aucune rémunération pour modifier les données affichées. Nous percevons une commission d'affiliation standard si vous vous inscrivez via nos liens — cela ne biaise pas notre comparaison." },
]

const BLOG = [
  { tag: 'Guide',   title: "Qu'est-ce qu'un prêt Bitcoin collatéralisé ?", date: '12 mars 2025', read: '5 min', bg: '#FFF8F0', icon: '₿', href: '/blog/quest-ce-que-le-pret-bitcoin' },
  { tag: 'Analyse', title: 'CeFi vs DeFi : quel prêt choisir en 2025 ?',   date: '5 mars 2025',  read: '8 min', bg: '#F0FDF4', icon: '📊', href: '/blog/cefi-vs-defi-pret-crypto' },
  { tag: 'Risques', title: 'Comment éviter la liquidation de son collatéral', date: '28 fév 2025', read: '6 min', bg: '#EFF6FF', icon: '⚠️', href: '/blog/eviter-liquidation-crypto' },
]

const CONSEILS = [
  { icon: '🎯', title: 'Ne dépassez pas 50% LTV', body: 'Même si certaines plateformes proposent jusqu\'à 97% LTV, emprunter au-delà de 50% est risqué. Une correction de 30% sur le BTC suffit à déclencher une liquidation à 70% LTV.' },
  { icon: '🛡️', title: 'Gardez un coussin de sécurité', body: 'Conservez 20 à 30% de la valeur de votre prêt en crypto liquide, prêt à reconstituer votre collatéral si les prix chutent rapidement.' },
  { icon: '📊', title: 'Surveillez votre position en période volatile', body: 'Vérifiez votre ratio LTV au moins une fois par jour lorsque les marchés sont agités. Activez les alertes de prix sur Nexo et YouHodler.' },
  { icon: '⚖️', title: 'CeFi ou DeFi selon votre montant', body: 'Pour moins de 10 000€, CeFi est souvent plus économique — sans frais de gas. Au-delà, Aave et Morpho deviennent plus compétitifs.' },
]

const W  = '860px'
const PX = '24px'

export default function Home() {
  const [stablecoin, setStablecoin]     = useState('usdc')
  const [collateral, setCollateral]     = useState('bitcoin')
  const [prices, setPrices]             = useState({})
  const [amount, setAmount]             = useState(1)
  const [mounted, setMounted]           = useState(false)
  const [sort, setSort]                 = useState('apr')
  const [filter, setFilter]             = useState('all')
  const [openFaq, setOpenFaq]           = useState(null)
  const [imgErrors, setImgErrors]       = useState({})
  const [defiRates, setDefiRates]       = useState(null)
  const [updatedAt, setUpdatedAt]       = useState(null)
  const [isMobile, setIsMobile]         = useState(false)
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

  const rows = (PLATFORMS[stablecoin]?.[collateral] || [])
    .filter(p => filter === 'all' || p.type === filter)
    .map(p => {
      if (p.name === 'Aave' && defiRates?.aave) {
        const apr = defiRates.aave.rates?.[stablecoin]
        const col = defiRates.aave.collateral?.[collateral]
        if (apr != null && col) return { ...p, apr, ltv: col.ltv, liq: col.liquidationThreshold }
      }
      if (p.name === 'Morpho' && defiRates?.morpho) {
        const apr = defiRates.morpho.rates?.[stablecoin]?.[collateral]
        const col = defiRates.morpho.collateral?.[collateral]
        if (apr != null && col) return { ...p, apr, ltv: col.ltv, liq: col.liquidationThreshold }
      }
      return p
    })
    .sort((a, b) => sort === 'apr' ? a.apr - b.apr : b.ltv - a.ltv)
    .map((p, _, arr) => ({ ...p, best: p.apr === Math.min(...arr.map(x => x.apr)) }))

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

  const wrap = { maxWidth: W, margin: '0 auto', padding: `0 ${PX}` }

  const PlatformLogo = ({ name, color, size = 44 }) => {
    const src = PLATFORM_LOGOS[name]
    if (src && !imgErrors[name]) {
      return (
        <img src={src} alt={name} width={size} height={size}
          style={{ borderRadius: '12px', objectFit: 'cover', flexShrink: 0, boxShadow: '0 1px 4px rgba(0,0,0,.1)' }}
          onError={() => setImgErrors(prev => ({ ...prev, [name]: true }))}
        />
      )
    }
    return (
      <div style={{ width: size, height: size, borderRadius: '12px', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '800', fontSize: '16px', flexShrink: 0 }}>
        {name[0]}
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Nantix — Comparateur de prêts crypto collatéralisés</title>
        <style>{`
          @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.25} }
          @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
          .card-anim { animation: fadeUp .4s ease both; }
          .platform-card { transition: box-shadow .25s ease, transform .25s ease; }
          .platform-card:hover { box-shadow: 0 12px 40px rgba(0,0,0,.1) !important; transform: translateY(-3px); }
          .cta-btn { transition: background .15s, color .15s, transform .15s; }
          .cta-btn:hover { transform: scale(1.02); }
          .blog-card { transition: box-shadow .2s, transform .2s; }
          .blog-card:hover { box-shadow: 0 8px 32px rgba(0,0,0,.09) !important; transform: translateY(-3px); }
          .conseil-card { transition: box-shadow .2s, transform .2s; }
          .conseil-card:hover { box-shadow: 0 8px 28px rgba(0,0,0,.08) !important; transform: translateY(-2px); }
          .yh-tooltip { opacity:0; visibility:hidden; transition:opacity .15s; }
          .yh-tooltip-wrap:hover .yh-tooltip { opacity:1; visibility:visible; }
          .tab-btn:hover { color: #111 !important; }
        `}</style>
        <meta name="description" content="Comparez les taux pour emprunter de l'USDC ou USDT en déposant du BTC ou ETH. Données en temps réel." />
      </Head>
      <Navbar />

      <main style={{ background: '#F6F7F9', minHeight: '100vh', paddingTop: '52px' }}>

        {/* ── HERO ── */}
        <section style={{ background: '#fff', borderBottom: '1px solid #EBEBEB', padding: isMobile ? '32px 0 28px' : '52px 0 44px' }}>
          <div style={wrap}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '20px', padding: '5px 12px', fontSize: '11px', fontWeight: '600', color: '#16A34A', marginBottom: '20px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#16A34A', animation: 'pulse 2s infinite' }} />
              Taux Aave & Morpho en temps réel
            </div>
            <h1 style={{ fontSize: isMobile ? '34px' : '58px', fontWeight: '800', letterSpacing: isMobile ? '-1.5px' : '-2.5px', color: '#111', lineHeight: '1.1', marginBottom: '14px' }}>
              Empruntez sans<br />vendre votre crypto.
            </h1>
            <p style={{ fontSize: '15px', color: '#666', lineHeight: '1.75', maxWidth: '460px', marginBottom: '0' }}>
              Déposez du BTC ou ETH et empruntez de l'USDC ou USDT. Comparez les taux, LTV et seuils de liquidation sur 6 plateformes.
            </p>
          </div>
        </section>

        {/* ── FILTRES ── */}
        <div style={{ background: '#fff', borderBottom: '1px solid #EBEBEB', position: 'sticky', top: '52px', zIndex: 50 }}>
          <div style={{ ...wrap, display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', padding: `10px ${PX}` }}>

            {/* Stablecoin tabs */}
            <div style={{ display: 'flex', background: '#F3F4F6', borderRadius: '10px', padding: '3px', gap: '2px' }}>
              {STABLECOINS.map(x => (
                <button key={x.id} className="tab-btn" onClick={() => { setStablecoin(x.id); setFilter('all') }} style={{
                  display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 14px',
                  fontSize: '13px', fontWeight: '600', border: 'none', borderRadius: '8px', cursor: 'pointer',
                  background: stablecoin === x.id ? '#fff' : 'transparent',
                  color: stablecoin === x.id ? '#111' : '#888',
                  boxShadow: stablecoin === x.id ? '0 1px 4px rgba(0,0,0,.1)' : 'none',
                  transition: 'all .15s',
                }}>
                  <img src={x.logo} alt={x.symbol} width={16} height={16} style={{ borderRadius: '50%' }} />
                  {x.name}
                </button>
              ))}
            </div>

            {/* Collateral */}
            <div style={{ display: 'flex', background: '#F3F4F6', borderRadius: '10px', padding: '3px', gap: '2px' }}>
              {COLLATERALS.map(x => (
                <button key={x.id} className="tab-btn" onClick={() => { setCollateral(x.id); setAmount(1) }} style={{
                  display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 14px',
                  fontSize: '13px', fontWeight: '600', border: 'none', borderRadius: '8px', cursor: 'pointer',
                  background: collateral === x.id ? '#fff' : 'transparent',
                  color: collateral === x.id ? '#111' : '#888',
                  boxShadow: collateral === x.id ? '0 1px 4px rgba(0,0,0,.1)' : 'none',
                  transition: 'all .15s',
                }}>
                  <img src={x.logo} alt={x.symbol} width={16} height={16} style={{ borderRadius: '50%' }} />
                  {x.symbol}
                </button>
              ))}
            </div>

            {/* Amount */}
            <div style={{ display: 'flex', alignItems: 'center', background: '#F3F4F6', borderRadius: '10px', padding: '3px 12px', gap: '6px' }}>
              <input type="number" value={amount} onChange={e => setAmount(Math.max(0.001, parseFloat(e.target.value) || 0))} step="0.1"
                style={{ border: 'none', background: 'transparent', fontSize: '13px', fontWeight: '700', width: '60px', outline: 'none', color: '#111' }} />
              <span style={{ fontSize: '12px', color: '#888', fontWeight: '600' }}>{c.symbol}</span>
              <span style={{ fontSize: '12px', color: '#AAA' }}>·</span>
              <span style={{ fontSize: '12px', color: '#555', whiteSpace: 'nowrap' }}>{mounted && price > 0 ? fmt(col) + ' €' : '—'}</span>
            </div>

            <div style={{ marginLeft: 'auto' }} />

            {/* Type filter */}
            <div style={{ display: 'flex', background: '#F3F4F6', borderRadius: '10px', padding: '3px', gap: '2px' }}>
              {['all', 'CeFi', 'DeFi'].map(f => (
                <button key={f} className="tab-btn" onClick={() => setFilter(f)} style={{
                  padding: '7px 12px', fontSize: '12px', fontWeight: '600', border: 'none', borderRadius: '8px', cursor: 'pointer',
                  background: filter === f ? '#fff' : 'transparent',
                  color: filter === f ? '#111' : '#888',
                  boxShadow: filter === f ? '0 1px 4px rgba(0,0,0,.1)' : 'none',
                  transition: 'all .15s',
                }}>{f === 'all' ? 'Tout' : f}</button>
              ))}
            </div>

            {/* Sort */}
            <div style={{ display: 'flex', background: '#F3F4F6', borderRadius: '10px', padding: '3px', gap: '2px' }}>
              {[{ v: 'apr', l: 'Meilleur taux' }, { v: 'ltv', l: 'LTV max' }].map(s => (
                <button key={s.v} className="tab-btn" onClick={() => setSort(s.v)} style={{
                  padding: '7px 12px', fontSize: '12px', fontWeight: '600', border: 'none', borderRadius: '8px', cursor: 'pointer',
                  background: sort === s.v ? '#fff' : 'transparent',
                  color: sort === s.v ? '#111' : '#888',
                  boxShadow: sort === s.v ? '0 1px 4px rgba(0,0,0,.1)' : 'none',
                  transition: 'all .15s',
                }}>{s.l}</button>
              ))}
            </div>
          </div>
        </div>

        {/* ── CARDS ── */}
        <div style={{ ...wrap, paddingTop: '20px', paddingBottom: '8px' }}>

          {rows.map((p, i) => {
            const isYouHodler = p.name === 'YouHodler'
            const yhCalc     = isYouHodler ? youhodlerCalc(youhodlerCvr) : null
            const displayApr = isYouHodler ? yhCalc.apr : p.apr
            const displayLtv = isYouHodler ? youhodlerCvr : p.ltv
            const displayLiq = isYouHodler ? yhCalc.liq  : p.liq
            const maxBorrow  = (col * displayLtv) / 100
            const liqPrice   = price > 0 ? price * (displayLiq / 100) : 0
            const liqDrop    = Math.round((1 - displayLiq / 100) * 100)
            const isLive     = (p.name === 'Aave'   && defiRates?.aave?.rates?.[stablecoin]  != null) ||
                               (p.name === 'Morpho' && defiRates?.morpho?.rates?.[stablecoin]?.[collateral] != null)

            return (
              <div key={p.name} className="platform-card card-anim" style={{
                animationDelay: `${i * 0.08}s`,
                background: '#fff',
                border: p.best ? '2px solid #111' : '1px solid #E4E4E7',
                borderRadius: '18px',
                marginBottom: '12px',
                overflow: 'hidden',
                boxShadow: p.best ? '0 4px 20px rgba(0,0,0,.08)' : '0 2px 8px rgba(0,0,0,.04)',
              }}>

                {/* Best banner */}
                {p.best && (
                  <div style={{ background: '#111', padding: '7px 20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ADE80', animation: 'pulse 2s infinite' }} />
                    <span style={{ fontSize: '11px', fontWeight: '700', color: '#fff', letterSpacing: '.5px', textTransform: 'uppercase' }}>Meilleur taux actuellement</span>
                  </div>
                )}

                <div style={{ padding: isMobile ? '16px' : '20px 24px' }}>

                  {/* Header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
                    <PlatformLogo name={p.name} color={p.color} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '17px', fontWeight: '800', color: '#111', letterSpacing: '-.3px' }}>{p.name}</span>
                        <span style={{
                          fontSize: '10px', fontWeight: '700', padding: '2px 8px', borderRadius: '6px',
                          background: p.type === 'DeFi' ? '#F4F4F5' : '#EFF6FF',
                          color:      p.type === 'DeFi' ? '#71717A' : '#2563EB',
                        }}>{p.type}</span>
                        {p.regulated && (
                          <span style={{ fontSize: '10px', fontWeight: '700', padding: '2px 8px', borderRadius: '6px', background: '#F0FDF4', color: '#16A34A' }}>Régulé</span>
                        )}
                      </div>
                      <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '3px', fontWeight: '500' }}>
                        {p.country} · {p.users} utilisateurs · depuis {p.founded}
                      </div>
                    </div>
                    {!isMobile && (
                      <a href={p.link} target="_blank" rel="noopener noreferrer" className="cta-btn" style={{
                        padding: '10px 20px', borderRadius: '10px', fontSize: '13px', fontWeight: '700',
                        textDecoration: 'none', flexShrink: 0,
                        background: p.best ? '#111' : '#fff',
                        color:      p.best ? '#fff' : '#111',
                        border: p.best ? '2px solid #111' : '2px solid #E4E4E7',
                      }}>
                        Emprunter →
                      </a>
                    )}
                  </div>

                  {/* Metrics */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4,1fr)',
                    gap: '1px',
                    background: '#F4F4F5',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '1px solid #F4F4F5',
                  }}>
                    {/* Taux */}
                    <div style={{ background: '#fff', padding: '14px 16px' }}>
                      <div style={{ fontSize: '10px', fontWeight: '700', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '.7px', marginBottom: '8px' }}>Taux / an</div>
                      <div style={{ fontSize: isMobile ? '26px' : '28px', fontWeight: '800', color: '#111', letterSpacing: '-1px', lineHeight: '1' }}>
                        {isYouHodler ? `${displayApr}%` : (p.aprLabel ? `${p.aprLabel}%` : `${p.apr}%`)}
                        {isYouHodler && !isMobile && (
                          <div className="yh-tooltip-wrap" style={{ display: 'inline-flex', position: 'relative', verticalAlign: 'middle', marginLeft: '4px' }}>
                            <span style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#E4E4E7', color: '#888', fontSize: '9px', fontWeight: '800', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'default' }}>?</span>
                            <div className="yh-tooltip" style={{ position: 'absolute', bottom: '22px', left: '50%', transform: 'translateX(-50%)', background: '#111', color: '#fff', borderRadius: '10px', padding: '12px 14px', fontSize: '11px', lineHeight: '1.6', width: '230px', zIndex: 100, pointerEvents: 'none', boxShadow: '0 8px 24px rgba(0,0,0,.2)' }}>
                              <div style={{ fontWeight: '700', marginBottom: '8px' }}>YouHodler — taux selon LTV</div>
                              {[97, 90, 70, 50].map(cvr => {
                                const d = YH_CVR[cvr]
                                return (
                                  <div key={cvr} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid #2A2A2A' }}>
                                    <span style={{ color: '#AAA' }}>LTV {cvr}%</span>
                                    <span style={{ fontWeight: '700' }}>{d.apr}% · liq. −{d.liqPct}%</span>
                                  </div>
                                )
                              })}
                              <div style={{ position: 'absolute', bottom: '-5px', left: '50%', transform: 'translateX(-50%) rotate(45deg)', width: '10px', height: '10px', background: '#111' }} />
                            </div>
                          </div>
                        )}
                      </div>
                      {isLive ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '6px' }}>
                          <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#F97316', animation: 'pulse 2s infinite' }} />
                          <span style={{ fontSize: '10px', color: '#F97316', fontWeight: '700' }}>{timeAgo(updatedAt)}</span>
                        </div>
                      ) : (
                        <div style={{ fontSize: '10px', color: '#C4C4C4', marginTop: '6px' }}>Mis à jour {p.manualUpdate || 'manuellement'}</div>
                      )}
                    </div>

                    {/* LTV */}
                    <div style={{ background: '#fff', padding: '14px 16px' }}>
                      <div style={{ fontSize: '10px', fontWeight: '700', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '.7px', marginBottom: '8px' }}>LTV max</div>
                      <div style={{ fontSize: isMobile ? '26px' : '28px', fontWeight: '800', color: '#111', letterSpacing: '-1px', lineHeight: '1' }}>
                        {displayLtv}%
                        {p.ltvDynamic && (
                          <div className="yh-tooltip-wrap" style={{ display: 'inline-flex', position: 'relative', verticalAlign: 'middle', marginLeft: '4px' }}>
                            <span style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#E4E4E7', color: '#888', fontSize: '9px', fontWeight: '800', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'default' }}>?</span>
                            <div className="yh-tooltip" style={{ position: 'absolute', bottom: '22px', left: '50%', transform: 'translateX(-50%)', background: '#111', color: '#fff', borderRadius: '10px', padding: '12px 14px', fontSize: '11px', lineHeight: '1.6', width: '210px', zIndex: 100, pointerEvents: 'none', boxShadow: '0 8px 24px rgba(0,0,0,.2)' }}>
                              <div style={{ fontWeight: '700', marginBottom: '4px' }}>LTV variable</div>
                              <div style={{ fontSize: '10px', color: '#AAA' }}>Déterminé dynamiquement par Nexo selon la volatilité du marché. 50% est la valeur de référence.</div>
                              <div style={{ position: 'absolute', bottom: '-5px', left: '50%', transform: 'translateX(-50%) rotate(45deg)', width: '10px', height: '10px', background: '#111' }} />
                            </div>
                          </div>
                        )}
                      </div>
                      <div style={{ height: '3px', background: '#F4F4F5', borderRadius: '3px', marginTop: '10px' }}>
                        <div style={{ height: '100%', width: `${Math.min(displayLtv, 100)}%`, background: displayLtv > 80 ? '#F97316' : '#111', borderRadius: '3px', transition: 'width .3s' }} />
                      </div>
                    </div>

                    {/* Emprunt max */}
                    <div style={{ background: '#fff', padding: '14px 16px' }}>
                      <div style={{ fontSize: '10px', fontWeight: '700', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '.7px', marginBottom: '8px' }}>Emprunt max</div>
                      <div style={{ fontSize: isMobile ? '22px' : '24px', fontWeight: '800', color: '#16A34A', letterSpacing: '-.8px', lineHeight: '1' }}>
                        {mounted && price > 0 ? fmt(maxBorrow) + ' €' : '—'}
                      </div>
                      <div style={{ fontSize: '10px', color: '#C4C4C4', marginTop: '6px' }}>pour {amount} {c.symbol}</div>
                    </div>

                    {/* Liquidation */}
                    <div style={{ background: '#fff', padding: '14px 16px' }}>
                      <div style={{ fontSize: '10px', fontWeight: '700', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '.7px', marginBottom: '8px' }}>Liquidation</div>
                      <div style={{ fontSize: isMobile ? '22px' : '24px', fontWeight: '800', color: '#DC2626', letterSpacing: '-.8px', lineHeight: '1' }}>
                        {mounted && price > 0 ? fmt(liqPrice) + ' €' : '—'}
                      </div>
                      {mounted && price > 0 && (
                        <div style={{ fontSize: '10px', color: '#DC2626', fontWeight: '600', marginTop: '6px' }}>−{liqDrop}% avant liquidation</div>
                      )}
                    </div>
                  </div>

                  {isMobile && (
                    <a href={p.link} target="_blank" rel="noopener noreferrer" className="cta-btn" style={{
                      display: 'block', textAlign: 'center', marginTop: '14px', padding: '12px',
                      borderRadius: '10px', fontSize: '13px', fontWeight: '700', textDecoration: 'none',
                      background: p.best ? '#111' : '#fff',
                      color:      p.best ? '#fff' : '#111',
                      border: p.best ? '2px solid #111' : '2px solid #E4E4E7',
                    }}>Emprunter →</a>
                  )}

                </div>
              </div>
            )
          })}

          {updatedAt && (
            <div style={{ textAlign: 'right', fontSize: '11px', color: '#9CA3AF', padding: '4px 0 12px' }}>
              Taux DeFi mis à jour le {new Date(updatedAt).toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </div>
          )}

          <div style={{ display: 'flex', gap: '10px', padding: '12px 0 24px', borderTop: '1px solid #E4E4E7' }}>
            <span style={{ fontSize: '13px' }}>🔍</span>
            <p style={{ fontSize: '11px', color: '#9CA3AF', lineHeight: '1.6' }}>
              <strong style={{ color: '#6B7280' }}>Indépendance éditoriale.</strong> Nantix est un comparateur indépendant. Des commissions d'affiliation peuvent être perçues via certains liens — elles ne modifient pas notre classement.
            </p>
          </div>
        </div>

        {/* ── CONSEILS ── */}
        <section style={{ borderTop: '1px solid #E4E4E7', background: '#fff', padding: isMobile ? '40px 0' : '60px 0' }}>
          <div style={wrap}>
            <div style={{ fontSize: '11px', fontWeight: '700', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>Conseils</div>
            <h2 style={{ fontSize: isMobile ? '22px' : '26px', fontWeight: '800', letterSpacing: '-.7px', color: '#111', marginBottom: '28px' }}>Emprunter intelligemment</h2>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2,1fr)', gap: '14px' }}>
              {CONSEILS.map(tip => (
                <div key={tip.title} className="conseil-card" style={{ background: '#F8F9FA', border: '1px solid #E4E4E7', borderRadius: '16px', padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,.04)' }}>
                  <div style={{ fontSize: '26px', marginBottom: '14px' }}>{tip.icon}</div>
                  <div style={{ fontSize: '15px', fontWeight: '700', color: '#111', marginBottom: '8px' }}>{tip.title}</div>
                  <div style={{ fontSize: '13px', color: '#6B7280', lineHeight: '1.75' }}>{tip.body}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── VENDRE VS EMPRUNTER ── */}
        <section style={{ borderTop: '1px solid #E4E4E7', background: '#F6F7F9', padding: isMobile ? '40px 0' : '60px 0' }}>
          <div style={wrap}>
            <div style={{ fontSize: '11px', fontWeight: '700', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>Comprendre</div>
            <h2 style={{ fontSize: isMobile ? '22px' : '26px', fontWeight: '800', letterSpacing: '-.7px', color: '#111', marginBottom: '32px' }}>Vendre vs emprunter</h2>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '16px' }}>
              {[
                { header: 'Vendre votre crypto', sign: '✕', color: '#DC2626', bg: '#fff', border: '#FECACA', rows: [['Flat tax', '30% sur les plus-values'], ['Exposition marché', 'Perdue'], ['Délai', '1 à 3 jours ouvrés'], ['Montant net', '~70% après imposition']] },
                { header: 'Prêt collatéralisé',  sign: '✓', color: '#16A34A', bg: '#fff', border: '#BBF7D0', rows: [['Flat tax', 'Aucune'], ['Exposition marché', 'Conservée'], ['Délai', 'Quelques minutes'], ['Montant accessible', '50 à 80% du collatéral']] },
              ].map(col => (
                <div key={col.header} style={{ background: col.bg, border: `2px solid ${col.border}`, borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,.04)' }}>
                  <div style={{ padding: '16px 20px', borderBottom: `1px solid ${col.border}`, display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '20px', fontWeight: '900', color: col.color }}>{col.sign}</span>
                    <span style={{ fontSize: '14px', fontWeight: '700', color: '#111' }}>{col.header}</span>
                  </div>
                  {col.rows.map((r, ri) => (
                    <div key={r[0]} style={{ display: 'flex', justifyContent: 'space-between', padding: '13px 20px', borderBottom: ri < col.rows.length - 1 ? `1px solid ${col.border}` : 'none' }}>
                      <span style={{ fontSize: '13px', color: '#6B7280' }}>{r[0]}</span>
                      <span style={{ fontSize: '13px', fontWeight: '700', color: '#111' }}>{r[1]}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section style={{ borderTop: '1px solid #E4E4E7', background: '#fff', padding: isMobile ? '40px 0' : '60px 0' }}>
          <div style={wrap}>
            <div style={{ fontSize: '11px', fontWeight: '700', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>FAQ</div>
            <h2 style={{ fontSize: isMobile ? '22px' : '26px', fontWeight: '800', letterSpacing: '-.7px', color: '#111', marginBottom: '28px' }}>Questions fréquentes</h2>
            <div style={{ border: '1px solid #E4E4E7', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,.04)' }}>
              {FAQ.map((item, i) => (
                <div key={i} style={{ borderBottom: i < FAQ.length - 1 ? '1px solid #F4F4F5' : 'none' }}>
                  <div onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', gap: '16px', background: openFaq === i ? '#FAFAFA' : '#fff', transition: 'background .15s' }}>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#111', lineHeight: '1.5' }}>{item.q}</span>
                    <span style={{ fontSize: '22px', color: '#C4C4C4', flexShrink: 0, fontWeight: '300', transition: 'transform .2s', display: 'inline-block', transform: openFaq === i ? 'rotate(45deg)' : 'none' }}>+</span>
                  </div>
                  {openFaq === i && <div style={{ padding: '0 24px 20px', fontSize: '13px', color: '#6B7280', lineHeight: '1.8' }}>{item.a}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BLOG ── */}
        <section style={{ borderTop: '1px solid #E4E4E7', background: '#F6F7F9', padding: isMobile ? '40px 0' : '60px 0' }}>
          <div style={wrap}>
            <div style={{ fontSize: '11px', fontWeight: '700', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>Ressources</div>
            <h2 style={{ fontSize: isMobile ? '22px' : '26px', fontWeight: '800', letterSpacing: '-.7px', color: '#111', marginBottom: '28px' }}>Guides et analyses</h2>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: '16px' }}>
              {BLOG.map(b => (
                <a key={b.title} href={b.href} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="blog-card" style={{ background: '#fff', border: '1px solid #E4E4E7', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,.04)' }}>
                    <div style={{ height: '88px', background: b.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px' }}>{b.icon}</div>
                    <div style={{ padding: '18px 20px' }}>
                      <div style={{ display: 'inline-block', fontSize: '10px', fontWeight: '700', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '.7px', background: '#F4F4F5', borderRadius: '5px', padding: '2px 7px', marginBottom: '10px' }}>{b.tag}</div>
                      <div style={{ fontSize: '14px', fontWeight: '700', color: '#111', lineHeight: '1.45', marginBottom: '10px' }}>{b.title}</div>
                      <div style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: '500' }}>{b.date} · {b.read} de lecture</div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── NEWSLETTER ── */}
        <section style={{ background: '#111', padding: isMobile ? '48px 0' : '64px 0' }}>
          <div style={wrap}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '40px', flexWrap: 'wrap' }}>
              <div style={{ maxWidth: '440px' }}>
                <div style={{ fontSize: '11px', fontWeight: '700', color: '#4B5563', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>Newsletter</div>
                <div style={{ fontSize: isMobile ? '22px' : '24px', fontWeight: '800', color: '#fff', letterSpacing: '-.6px', marginBottom: '10px' }}>Suivez les variations de taux</div>
                <div style={{ fontSize: '14px', color: '#6B7280', lineHeight: '1.7' }}>Récapitulatif hebdomadaire des variations de taux. Maximum 1 email par semaine.</div>
              </div>
              <div style={{ display: 'flex', gap: '8px', width: isMobile ? '100%' : 'auto', flexDirection: isMobile ? 'column' : 'row', flexShrink: 0 }}>
                <input type="email" placeholder="votre@email.com" style={{ background: '#1C1C1C', border: '1px solid #2D2D2D', borderRadius: '10px', padding: '12px 16px', fontSize: '13px', outline: 'none', width: isMobile ? '100%' : '230px', color: '#fff', boxSizing: 'border-box' }} />
                <button className="cta-btn" style={{ background: '#fff', color: '#111', border: 'none', borderRadius: '10px', padding: '12px 22px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', whiteSpace: 'nowrap' }}>S'abonner</button>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
