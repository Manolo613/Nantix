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

const W    = '1320px'
const PX   = '32px'
const GRID = '230px 160px 120px 1fr 1fr 140px 150px'

export default function Home() {
  const [stablecoin, setStablecoin]     = useState('usdc')
  const [collateral, setCollateral]     = useState('bitcoin')
  const [prices, setPrices]             = useState({})
  const [amount, setAmount]             = useState(1)
  const [mounted, setMounted]           = useState(false)
  const [sort, setSort]                 = useState('apr')
  const [filter, setFilter]             = useState('all')
  const [openRow, setOpenRow]           = useState(null)
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

  const s     = STABLECOINS.find(x => x.id === stablecoin)
  const c     = COLLATERALS.find(x => x.id === collateral)
  const price = prices[c.coingeckoId]?.eur || 0
  const col   = amount * price
  const fmt     = n => Math.round(n).toLocaleString('fr-FR')
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
        if (apr !== null && apr !== undefined && col) {
          return { ...p, apr, ltv: col.ltv, liq: col.liquidationThreshold }
        }
      }
      if (p.name === 'Morpho' && defiRates?.morpho) {
        const apr = defiRates.morpho.rates?.[stablecoin]?.[collateral]
        const col = defiRates.morpho.collateral?.[collateral]
        if (apr !== null && apr !== undefined && col) {
          return { ...p, apr, ltv: col.ltv, liq: col.liquidationThreshold }
        }
      }
      return p
    })
    .sort((a, b) => sort === 'apr' ? a.apr - b.apr : b.ltv - a.ltv)
    .map((p, _, arr) => {
      const minApr = Math.min(...arr.map(x => x.apr))
      return { ...p, best: p.apr === minApr }
    })

  const YH_CVR = {
    97: { apr: 8.0,  liqPct: 1.5  },
    90: { apr: 12.0, liqPct: 5.0  },
    70: { apr: 14.0, liqPct: 25.0 },
    50: { apr: 16.0, liqPct: 45.0 },
  }
  const youhodlerCalc = (cvr) => {
    const d = YH_CVR[cvr] || YH_CVR[90]
    const liq = 100 - d.liqPct
    return { apr: d.apr, liq, liqPct: d.liqPct }
  }

  const wrap = { maxWidth: W, margin: '0 auto', padding: `0 ${PX}` }

  const PlatformLogo = ({ name, color }) => {
    const src = PLATFORM_LOGOS[name]
    if (src && !imgErrors[name]) {
      return (
        <img
          src={src}
          alt={name}
          width={38} height={38}
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
        <title>Nantix — Comparateur de prêts crypto collatéralisés</title>
        <style>{`
          @keyframes pulse{0%,100%{opacity:1}50%{opacity:.2}}
          @keyframes fadeInUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
          .fade-row{animation:fadeInUp .3s ease both}
          .yh-tooltip{opacity:0;visibility:hidden;transition:opacity .15s ease}
          .yh-tooltip-wrap:hover .yh-tooltip{opacity:1;visibility:visible}
          .hover-card:hover{box-shadow:0 6px 24px rgba(0,0,0,.08)!important;transform:translateY(-1px)}
          .hover-card{transition:box-shadow .2s,transform .2s}
          .blog-card:hover{box-shadow:0 6px 24px rgba(0,0,0,.08)!important;transform:translateY(-2px)}
          .blog-card{transition:box-shadow .2s,transform .2s}
        `}</style>
        <meta name="description" content="Comparez les taux pour emprunter de l'USDC ou USDT en déposant du BTC ou ETH. Données en temps réel." />
      </Head>
      <Navbar />

      <main style={{ background: '#fff', minHeight: '100vh', paddingTop: '52px' }}>

        {/* ── HERO ── */}
        <section style={{ background: 'linear-gradient(160deg,#F8F9FA 0%,#fff 55%)', padding: isMobile ? '32px 0 28px' : '52px 0 40px' }}>
          <div style={wrap}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '40px', flexWrap: 'wrap' }}>
              <div style={{ maxWidth: '540px' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '20px', padding: '5px 12px', fontSize: '11px', fontWeight: '600', color: '#16A34A', marginBottom: '20px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#16A34A', animation: 'pulse 2s infinite' }} />
                  Taux Aave & Morpho en temps réel
                </div>
                <h1 style={{ fontSize: isMobile ? '34px' : '58px', fontWeight: '800', letterSpacing: isMobile ? '-1.5px' : '-2.5px', color: '#111', lineHeight: '1.1', marginBottom: '16px' }}>
                  Empruntez sans<br />vendre votre crypto.
                </h1>
                <p style={{ fontSize: '15px', color: '#666', lineHeight: '1.75', maxWidth: '440px' }}>
                  Déposez du BTC ou ETH et empruntez de l'USDC ou USDT. Comparez les taux, LTV et seuils de liquidation sur 6 plateformes.
                </p>
              </div>
              {!isMobile && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1px', background: '#EBEBEB', borderRadius: '14px', overflow: 'hidden', flexShrink: 0, boxShadow: '0 2px 12px rgba(0,0,0,.06)' }}>
                  {[{ v: '6', l: 'Plateformes' }, { v: '2,56%', l: 'Meilleur taux' }, { v: '97%', l: 'LTV max' }].map(stat => (
                    <div key={stat.l} style={{ background: '#fff', padding: '22px 28px', textAlign: 'center' }}>
                      <div style={{ fontSize: '28px', fontWeight: '800', color: '#111', letterSpacing: '-1px' }}>{stat.v}</div>
                      <div style={{ fontSize: '11px', color: '#888', marginTop: '4px', fontWeight: '500' }}>{stat.l}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── ONGLETS STABLECOIN ── */}
        <div style={{ borderBottom: '1px solid #EBEBEB', borderTop: '1px solid #EBEBEB', background: '#fff' }}>
          <div style={{ maxWidth: W, margin: '0 auto', padding: `0 ${PX}`, display: 'flex', alignItems: 'stretch' }}>
            {STABLECOINS.map(x => (
              <button key={x.id} onClick={() => { setStablecoin(x.id); setFilter('all') }} style={{
                display: 'flex', alignItems: 'center', gap: '8px', padding: '14px 20px',
                fontSize: '14px', fontWeight: '600',
                color: stablecoin === x.id ? '#111' : '#888',
                background: 'transparent', border: 'none',
                borderBottom: `2.5px solid ${stablecoin === x.id ? '#111' : 'transparent'}`,
                cursor: 'pointer', transition: 'all .15s', whiteSpace: 'nowrap',
              }}>
                <img src={x.logo} alt={x.symbol} width={20} height={20} style={{ borderRadius: '50%' }} />
                {x.name}
              </button>
            ))}
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', padding: '0 4px' }}>
              <span style={{ fontSize: '11px', color: '#AAA' }}>Emprunter</span>
            </div>
          </div>
        </div>

        {/* ── COLLATÉRAL + FILTRES ── */}
        <div style={{ borderBottom: '1px solid #EBEBEB', background: '#FAFAFA' }}>
          <div style={{ maxWidth: W, margin: '0 auto', padding: `8px ${PX}`, display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', background: '#fff', border: '1px solid #E0E0E0', borderRadius: '8px', overflow: 'hidden' }}>
              {COLLATERALS.map(x => (
                <button key={x.id} onClick={() => { setCollateral(x.id); setAmount(1); setOpenRow(null) }} style={{
                  display: 'flex', alignItems: 'center', gap: '5px', padding: '6px 12px',
                  fontSize: '12px', fontWeight: '600',
                  color: collateral === x.id ? '#fff' : '#666',
                  background: collateral === x.id ? '#111' : 'transparent',
                  border: 'none', cursor: 'pointer', transition: 'all .15s',
                }}>
                  <img src={x.logo} alt={x.symbol} width={14} height={14} style={{ borderRadius: '50%' }} />
                  {x.symbol}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', background: '#fff', border: '1px solid #E0E0E0', borderRadius: '8px', overflow: 'hidden' }}>
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

        {/* ── TABLEAU (original) ── */}
        <div style={wrap}>
          {!isMobile && (
            <div style={{
              display: 'grid', gridTemplateColumns: GRID, padding: '10px 16px',
              fontSize: '10px', fontWeight: '700', color: '#999',
              textTransform: 'uppercase', letterSpacing: '.9px',
              borderBottom: '1px solid #EBEBEB',
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
            const maxBorrow   = (col * displayLtv) / 100
            const liqPrice    = price > 0 ? (price * (displayLiq / 100)) : 0
            const isLive      = (p.name === 'Aave' && defiRates?.aave?.rates?.[stablecoin] !== undefined) ||
                                (p.name === 'Morpho' && defiRates?.morpho?.rates?.[stablecoin]?.[collateral] !== undefined)
            const ltvBarWidth = Math.min(displayLtv, 100)

            const AprBadge = () => (
              <div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '3px' }}>
                  <div style={{ fontSize: isMobile ? '22px' : '16px', fontWeight: '700', color: '#111', letterSpacing: '-.3px', whiteSpace: 'nowrap' }}>
                    {isYouHodler ? `${displayApr}%` : (p.aprLabel ? `${p.aprLabel}%` : `${p.apr}%`)}
                  </div>
                  {isYouHodler && !isMobile && (
                    <div className="yh-tooltip-wrap" style={{ position: 'relative', display: 'inline-flex', marginTop: '1px' }}>
                      <span style={{ width: '13px', height: '13px', borderRadius: '50%', background: '#E8E8E8', color: '#888', fontSize: '9px', fontWeight: '800', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'default', userSelect: 'none', flexShrink: 0 }}>?</span>
                      <div className="yh-tooltip" style={{ position: 'absolute', bottom: '22px', left: '50%', transform: 'translateX(-50%)', background: '#111', color: '#fff', borderRadius: '7px', padding: '10px 12px', fontSize: '11px', lineHeight: '1.6', width: '220px', zIndex: 100, pointerEvents: 'none', boxShadow: '0 4px 16px rgba(0,0,0,.18)' }}>
                        <div style={{ fontWeight: '700', marginBottom: '6px' }}>YouHodler — taux selon LTV</div>
                        <div style={{ fontSize: '10px', color: '#AAA', marginBottom: '8px' }}>Le taux varie selon la LTV choisie. Plus la LTV est élevée, plus le risque de liquidation est fort.</div>
                        {[97, 90, 70, 50].map(cvr => {
                          const d = YH_CVR[cvr]
                          return (
                            <div key={cvr} style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0', borderBottom: '1px solid #2A2A2A' }}>
                              <span style={{ color: '#AAA' }}>LTV {cvr}%</span>
                              <span style={{ fontWeight: '700' }}>{d.apr}% / an · liq. −{d.liqPct}%</span>
                            </div>
                          )
                        })}
                        <div style={{ fontSize: '10px', color: '#666', marginTop: '7px' }}>Taux affiché : LTV 90% (référence)</div>
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
                  <div style={{ fontSize: '9px', color: '#AAA', marginTop: '3px' }}>Mis à jour {p.manualUpdate || 'manuellement'}</div>
                )}
              </div>
            )

            const AccesBadges = () => (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '11px', fontWeight: '600', color: '#444' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', flexShrink: 0, background: p.type === 'DeFi' ? '#999' : '#16A34A' }} />
                  {p.type === 'DeFi' ? 'Wallet requis' : 'Sans wallet'}
                </div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '11px', fontWeight: '600', color: p.type === 'CeFi' ? '#2563EB' : 'transparent', pointerEvents: 'none', userSelect: 'none' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', flexShrink: 0, background: p.type === 'CeFi' ? '#2563EB' : 'transparent' }} />
                  Régulé
                </div>
              </div>
            )

            return (
              <div key={p.name} style={{ borderBottom: '1px solid #F5F5F5', marginBottom: isMobile ? '8px' : '0' }}>
                {isMobile ? (
                  <div className='fade-row' style={{ animationDelay: `${i * 0.06}s`, background: '#fff', borderRadius: '12px', border: p.best ? '2px solid #111' : '1px solid #EBEBEB', overflow: 'hidden' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <PlatformLogo name={p.name} color={p.color} />
                        <div>
                          <div style={{ fontSize: '15px', fontWeight: '700', color: '#111' }}>{p.name}</div>
                          <div style={{ fontSize: '10px', fontWeight: '700', color: p.type === 'DeFi' ? '#888' : '#16A34A' }}>{p.type === 'DeFi' ? '⚙️ Wallet requis' : '✅ Sans wallet'}</div>
                        </div>
                      </div>
                      <AprBadge />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderTop: '1px solid #F0F0F0', borderBottom: '1px solid #F0F0F0' }}>
                      <div style={{ padding: '10px 12px', borderRight: '1px solid #F0F0F0' }}>
                        <div style={{ fontSize: '9px', color: '#999', fontWeight: '700', textTransform: 'uppercase', marginBottom: '3px' }}>LTV</div>
                        <div style={{ fontSize: '15px', fontWeight: '700', color: '#111' }}>{displayLtv}%</div>
                      </div>
                      <div style={{ padding: '10px 12px', borderRight: '1px solid #F0F0F0' }}>
                        <div style={{ fontSize: '9px', color: '#999', fontWeight: '700', textTransform: 'uppercase', marginBottom: '3px' }}>Emprunt max</div>
                        <div style={{ fontSize: '13px', fontWeight: '700', color: '#16A34A' }}>{mounted && price > 0 ? fmt(maxBorrow) + ' €' : '—'}</div>
                      </div>
                      <div style={{ padding: '10px 12px' }}>
                        <div style={{ fontSize: '9px', color: '#999', fontWeight: '700', textTransform: 'uppercase', marginBottom: '3px' }}>Liquidation</div>
                        <div style={{ fontSize: '13px', fontWeight: '700', color: '#DC2626' }}>{mounted && price > 0 ? fmt(liqPrice) + ' €' : '—'}</div>
                        {mounted && price > 0 && <div style={{ fontSize: '9px', color: '#DC2626' }}>−{Math.round((1 - displayLiq / 100) * 100)}%</div>}
                      </div>
                    </div>
                    <div style={{ padding: '12px 16px' }}>
                      <a href={p.link} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', padding: '11px', borderRadius: '8px', fontSize: '13px', fontWeight: '700', textDecoration: 'none', background: p.best ? '#111' : '#F5F5F5', color: p.best ? '#fff' : '#444' }}>Emprunter →</a>
                    </div>
                  </div>
                ) : (
                  <div
                    className='fade-row'
                    style={{ animationDelay: `${i * 0.06}s`, display: 'grid', gridTemplateColumns: GRID, padding: '0 16px', alignItems: 'center', minHeight: isYouHodler ? '84px' : '72px', background: p.best ? '#FAFAFA' : '#fff', cursor: 'default' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#FAFAFA'}
                    onMouseLeave={e => e.currentTarget.style.background = p.best ? '#FAFAFA' : '#fff'}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <PlatformLogo name={p.name} color={p.color} />
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: '700', color: '#111' }}>{p.name}</div>
                        <div style={{ fontSize: '10px', fontWeight: '600', marginTop: '2px', color: p.type === 'DeFi' ? '#999' : '#2563EB' }}>{p.type}</div>
                      </div>
                    </div>
                    <AprBadge />
                    <div>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '3px' }}>
                        <div style={{ fontSize: '16px', fontWeight: '700', color: '#111', letterSpacing: '-.3px' }}>{displayLtv}%</div>
                        {p.ltvDynamic && (
                          <div className="yh-tooltip-wrap" style={{ position: 'relative', display: 'inline-flex', marginTop: '1px' }}>
                            <span style={{ width: '13px', height: '13px', borderRadius: '50%', background: '#E8E8E8', color: '#888', fontSize: '9px', fontWeight: '800', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'default', userSelect: 'none', flexShrink: 0 }}>?</span>
                            <div className="yh-tooltip" style={{ position: 'absolute', bottom: '22px', left: '50%', transform: 'translateX(-50%)', background: '#111', color: '#fff', borderRadius: '7px', padding: '10px 12px', fontSize: '11px', lineHeight: '1.6', width: '210px', zIndex: 100, pointerEvents: 'none', boxShadow: '0 4px 16px rgba(0,0,0,.18)' }}>
                              <div style={{ fontWeight: '700', marginBottom: '4px' }}>LTV variable</div>
                              <div style={{ fontSize: '10px', color: '#AAA' }}>Le LTV est déterminé dynamiquement par Nexo selon la volatilité et la liquidité du marché. 50% est la valeur de référence actuelle.</div>
                              <div style={{ position: 'absolute', bottom: '-5px', left: '50%', transform: 'translateX(-50%) rotate(45deg)', width: '10px', height: '10px', background: '#111' }} />
                            </div>
                          </div>
                        )}
                      </div>
                      <div style={{ height: '2px', background: '#EBEBEB', borderRadius: '2px', marginTop: '6px', width: '64px' }}>
                        <div style={{ height: '100%', width: `${ltvBarWidth}%`, background: '#111', borderRadius: '2px' }} />
                      </div>
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: '700', color: '#16A34A', letterSpacing: '-.3px' }}>
                      {mounted && price > 0 ? fmt(maxBorrow) + ' €' : '—'}
                    </div>
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: '700', color: '#DC2626', letterSpacing: '-.3px' }}>
                        {mounted && price > 0 ? fmt(liqPrice) + ' €' : '—'}
                      </div>
                      <div style={{ fontSize: '10px', color: '#888', marginTop: '2px' }}>
                        {mounted && price > 0 && <><span style={{ color: '#DC2626', fontWeight: '600' }}>−{Math.round((1 - displayLiq / 100) * 100)}%</span>{' '}avant liquidation</>}
                      </div>
                    </div>
                    <AccesBadges />
                    <a href={p.link} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                      style={{ display: 'block', textAlign: 'center', padding: '9px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: '700', textDecoration: 'none', whiteSpace: 'nowrap', background: '#fff', color: '#444', border: '1.5px solid #DCDCDC' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = '#111'; e.currentTarget.style.color = '#111' }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = '#DCDCDC'; e.currentTarget.style.color = '#444' }}
                    >Emprunter →</a>
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
              <strong style={{ color: '#444' }}>Indépendance éditoriale.</strong> Nantix est un comparateur indépendant. Des commissions d'affiliation peuvent être perçues via certains liens — elles ne modifient pas notre classement.
            </p>
          </div>
        </div>

        {/* ── CONSEILS ── */}
        <section style={{ background: '#F8F9FA', padding: isMobile ? '48px 0' : '64px 0' }}>
          <div style={wrap}>
            <div style={{ fontSize: '11px', fontWeight: '700', color: '#999', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>Conseils</div>
            <h2 style={{ fontSize: isMobile ? '22px' : '26px', fontWeight: '800', letterSpacing: '-.7px', color: '#111', marginBottom: '32px' }}>Emprunter intelligemment</h2>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2,1fr)', gap: '16px' }}>
              {CONSEILS.map(tip => (
                <div key={tip.title} className="hover-card" style={{ background: '#fff', borderRadius: '16px', padding: '28px', boxShadow: '0 2px 12px rgba(0,0,0,.06)' }}>
                  <div style={{ fontSize: '26px', marginBottom: '14px' }}>{tip.icon}</div>
                  <div style={{ fontSize: '15px', fontWeight: '700', color: '#111', marginBottom: '8px' }}>{tip.title}</div>
                  <div style={{ fontSize: '13px', color: '#666', lineHeight: '1.75' }}>{tip.body}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── VENDRE VS EMPRUNTER ── */}
        <section style={{ background: '#fff', padding: isMobile ? '48px 0' : '64px 0' }}>
          <div style={wrap}>
            <div style={{ fontSize: '11px', fontWeight: '700', color: '#999', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>Comprendre</div>
            <h2 style={{ fontSize: isMobile ? '22px' : '26px', fontWeight: '800', letterSpacing: '-.7px', color: '#111', marginBottom: '32px' }}>Vendre vs emprunter</h2>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '16px' }}>
              {[
                { header: 'Vendre votre crypto', sign: '✕', color: '#DC2626', bg: '#FEF2F2', rows: [['Flat tax', '30% sur les plus-values'], ['Exposition marché', 'Perdue'], ['Délai', '1 à 3 jours ouvrés'], ['Montant net', '~70% après imposition']] },
                { header: 'Prêt collatéralisé',  sign: '✓', color: '#16A34A', bg: '#F0FDF4', rows: [['Flat tax', 'Aucune'], ['Exposition marché', 'Conservée'], ['Délai', 'Quelques minutes'], ['Montant accessible', '50 à 80% du collatéral']] },
              ].map(col => (
                <div key={col.header} style={{ background: col.bg, borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,.04)' }}>
                  <div style={{ padding: '18px 24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '18px', fontWeight: '900', color: col.color }}>{col.sign}</span>
                    <span style={{ fontSize: '14px', fontWeight: '700', color: '#111' }}>{col.header}</span>
                  </div>
                  {col.rows.map(r => (
                    <div key={r[0]} style={{ display: 'flex', justifyContent: 'space-between', padding: '13px 24px', background: 'rgba(255,255,255,.6)' }}>
                      <span style={{ fontSize: '13px', color: '#555' }}>{r[0]}</span>
                      <span style={{ fontSize: '13px', fontWeight: '700', color: '#111' }}>{r[1]}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section style={{ background: '#F8F9FA', padding: isMobile ? '48px 0' : '64px 0' }}>
          <div style={wrap}>
            <div style={{ fontSize: '11px', fontWeight: '700', color: '#999', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>FAQ</div>
            <h2 style={{ fontSize: isMobile ? '22px' : '26px', fontWeight: '800', letterSpacing: '-.7px', color: '#111', marginBottom: '28px' }}>Questions fréquentes</h2>
            <div style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,.06)' }}>
              {FAQ.map((item, i) => (
                <div key={i} style={{ background: i % 2 === 0 ? '#fff' : '#FAFAFA' }}>
                  <div onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ padding: '20px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', gap: '16px' }}>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#111', lineHeight: '1.5' }}>{item.q}</span>
                    <span style={{ fontSize: '22px', color: '#CCC', flexShrink: 0, fontWeight: '300', display: 'inline-block', transition: 'transform .2s', transform: openFaq === i ? 'rotate(45deg)' : 'none' }}>+</span>
                  </div>
                  {openFaq === i && <div style={{ padding: '0 28px 20px', fontSize: '13px', color: '#666', lineHeight: '1.8' }}>{item.a}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BLOG ── */}
        <section style={{ background: '#fff', padding: isMobile ? '48px 0' : '64px 0' }}>
          <div style={wrap}>
            <div style={{ fontSize: '11px', fontWeight: '700', color: '#999', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>Ressources</div>
            <h2 style={{ fontSize: isMobile ? '22px' : '26px', fontWeight: '800', letterSpacing: '-.7px', color: '#111', marginBottom: '28px' }}>Guides et analyses</h2>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: '16px' }}>
              {BLOG.map(b => (
                <a key={b.title} href={b.href} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="blog-card" style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,.06)' }}>
                    <div style={{ height: '90px', background: b.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px' }}>{b.icon}</div>
                    <div style={{ padding: '20px' }}>
                      <div style={{ display: 'inline-block', fontSize: '10px', fontWeight: '700', color: '#888', textTransform: 'uppercase', letterSpacing: '.7px', background: '#F5F5F5', borderRadius: '4px', padding: '2px 7px', marginBottom: '10px' }}>{b.tag}</div>
                      <div style={{ fontSize: '14px', fontWeight: '700', color: '#111', lineHeight: '1.45', marginBottom: '10px' }}>{b.title}</div>
                      <div style={{ fontSize: '11px', color: '#999' }}>{b.date} · {b.read} de lecture</div>
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
                <div style={{ fontSize: '11px', fontWeight: '700', color: '#444', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>Newsletter</div>
                <div style={{ fontSize: isMobile ? '22px' : '24px', fontWeight: '800', color: '#fff', letterSpacing: '-.6px', marginBottom: '10px' }}>Suivez les variations de taux</div>
                <div style={{ fontSize: '14px', color: '#666', lineHeight: '1.7' }}>Récapitulatif hebdomadaire des variations de taux. Maximum 1 email par semaine.</div>
              </div>
              <div style={{ display: 'flex', gap: '8px', width: isMobile ? '100%' : 'auto', flexDirection: isMobile ? 'column' : 'row', flexShrink: 0 }}>
                <input type="email" placeholder="votre@email.com" style={{ background: '#1C1C1C', border: '1px solid #2D2D2D', borderRadius: '10px', padding: '12px 16px', fontSize: '13px', outline: 'none', width: isMobile ? '100%' : '230px', color: '#fff', boxSizing: 'border-box' }} />
                <button style={{ background: '#fff', color: '#111', border: 'none', borderRadius: '10px', padding: '12px 22px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', whiteSpace: 'nowrap' }}>S'abonner</button>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
