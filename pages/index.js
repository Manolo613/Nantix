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
  Compound:  'https://www.google.com/s2/favicons?domain=compound.finance&sz=64',
  YouHodler: 'https://www.google.com/s2/favicons?domain=youhodler.com&sz=64',
  Nebeus:    'https://www.google.com/s2/favicons?domain=nebeus.com&sz=64',
}

const PLATFORMS = {
  usdc: {
    bitcoin: [
      { name: 'Aave',      apr: 3.6,   ltv: 73, liq: 78,   type: 'DeFi', color: '#B6509E', link: 'https://aave.com',         best: true,  founded: '2020', country: 'Décentralisé',    users: '500K+', regulated: false, about: 'Leader DeFi. Déposez du WBTC, empruntez de l\'USDC. Smart contracts audités, pas de KYC.' },
      { name: 'Morpho',    apr: 2.56,  ltv: 86, liq: 86,   type: 'DeFi', color: '#4C6FFF', link: 'https://app.morpho.org',   best: false, founded: '2022', country: 'Décentralisé',    users: '80K+',  regulated: false, about: 'Protocole DeFi permissionless sur Ethereum. Marchés isolés, LTV élevée (86%). Taux déterminés par chaque marché indépendamment.' },
      { name: 'Compound',  apr: 5.1,   ltv: 65, liq: 80,   type: 'DeFi', color: '#00D395', link: 'https://compound.finance', best: false, founded: '2018', country: 'Décentralisé',    users: '200K+', regulated: false, manualUpdate: 'avr. 2026', about: 'Protocole DeFi pionnier. Gouvernance décentralisée COMP. Taux variables selon l\'offre et la demande.' },
      { name: 'Ledn',      apr: 12.4,  ltv: 50, liq: 80,   type: 'CeFi', color: '#0D4A45', link: 'https://ledn.io',          best: false, founded: '2018', country: 'Canada',           users: '100K+', regulated: true,  manualUpdate: 'avr. 2026', aprLabel: '12.4 – 13.9', about: 'Spécialiste Bitcoin uniquement. Proof-of-Reserves publique. Taux à partir de 12.4% APR.' },
      { name: 'YouHodler', apr: 8.0,   ltv: 97, liq: 98.5, type: 'CeFi', color: '#1EBDD2', link: 'https://youhodler.com',    best: false, founded: '2018', country: 'Suisse / Chypre', users: '1M+',   regulated: true,  manualUpdate: 'avr. 2026', aprLabel: '8 – 16', about: 'Plateforme CeFi suisse. Taux variable selon le CVR choisi : 8% APR à 97% CVR (risque élevé, liquidation dès -1,5%) jusqu\'à 16% APR à 50% CVR (liquidation à -45%). Prêts en USDC/USDT, durée max 60 jours.' },
      { name: 'Nexo',      apr: 13.9,  ltv: 50, liq: 83,   type: 'CeFi', color: '#0EA5E9', link: 'https://nexo.com',         best: false, founded: '2018', country: 'UE / Caïmans',   users: '7M+',   regulated: true,  manualUpdate: 'avr. 2026', aprLabel: '6.9 – 13.9', about: 'Plateforme CeFi régulée, 7M+ utilisateurs. Taux selon niveau fidélité NEXO token (6.9% Platinum → 13.9% Base).' },
      { name: 'Nebeus',    apr: 6.0,   ltv: 65, liq: 80,   type: 'CeFi', color: '#6C3CE1', link: 'https://nebeus.com',       best: false, founded: '2014', country: 'Royaume-Uni',    users: '200K+', regulated: true,  manualUpdate: 'avr. 2026', about: 'Plateforme FCA-régulée au Royaume-Uni. Interest Only Loan (6% / an, LTV 65%) ou Flexible Loan (16.5%, LTV 70%). KYC requis.' },
    ],
    ethereum: [
      { name: 'Aave',      apr: 3.6,   ltv: 80,  liq: 83,   type: 'DeFi', color: '#B6509E', link: 'https://aave.com',         best: true,  founded: '2020', country: 'Décentralisé',    users: '500K+', regulated: false, about: 'Leader DeFi sur ETH. LTV la plus haute (80%). Déposez de l\'ETH, empruntez de l\'USDC.' },
      { name: 'Morpho',    apr: 2.59,  ltv: 86,  liq: 86,   type: 'DeFi', color: '#4C6FFF', link: 'https://app.morpho.org',   best: false, founded: '2022', country: 'Décentralisé',    users: '80K+',  regulated: false, about: 'Protocole DeFi permissionless sur Ethereum. Marchés isolés, LTV élevée (86%). Taux déterminés par chaque marché indépendamment.' },
      { name: 'Compound',  apr: 4.5,   ltv: 75,  liq: 80,   type: 'DeFi', color: '#00D395', link: 'https://compound.finance', best: false, founded: '2018', country: 'Décentralisé',    users: '200K+', regulated: false, manualUpdate: 'avr. 2026', about: 'Protocole DeFi pionnier. Gouvernance décentralisée COMP. Taux variables.' },
      { name: 'YouHodler', apr: 8.0,   ltv: 97,  liq: 98.5, type: 'CeFi', color: '#1EBDD2', link: 'https://youhodler.com',    best: false, founded: '2018', country: 'Suisse / Chypre', users: '1M+',   regulated: true,  manualUpdate: 'avr. 2026', aprLabel: '8 – 16', about: 'Prêts en USDC/USDT adossés à ETH. Taux de 8% APR (CVR 97%, liquidation dès -1,5%) à 16% APR (CVR 50%, liquidation à -45%). Durée max 60 jours.' },
      { name: 'Nexo',      apr: 13.9,  ltv: 50,  liq: 83,   type: 'CeFi', color: '#0EA5E9', link: 'https://nexo.com',         best: false, founded: '2018', country: 'UE / Caïmans',   users: '7M+',   regulated: true,  manualUpdate: 'avr. 2026', aprLabel: '6.9 – 13.9', about: 'Plateforme CeFi régulée, 7M+ utilisateurs. Taux selon niveau fidélité NEXO token.' },
      { name: 'Nebeus',    apr: 6.0,   ltv: 70,  liq: 80,   type: 'CeFi', color: '#6C3CE1', link: 'https://nebeus.com',       best: false, founded: '2014', country: 'Royaume-Uni',    users: '200K+', regulated: true,  manualUpdate: 'avr. 2026', about: 'Prêt ETH sur Nebeus. Interest Only Loan (6% APR, LTV 70%) ou Flexible Loan (16.5%, LTV 70%). FCA-régulée.' },
    ],
  },
  usdt: {
    bitcoin: [
      { name: 'Aave',      apr: 3.8,   ltv: 73, liq: 78,   type: 'DeFi', color: '#B6509E', link: 'https://aave.com',         best: true,  founded: '2020', country: 'Décentralisé',    users: '500K+', regulated: false, about: 'Leader DeFi. Déposez du WBTC, empruntez de l\'USDT. Smart contracts audités, pas de KYC.' },
      { name: 'Morpho',    apr: 3.88,  ltv: 86, liq: 86,   type: 'DeFi', color: '#4C6FFF', link: 'https://app.morpho.org',   best: false, founded: '2022', country: 'Décentralisé',    users: '80K+',  regulated: false, about: 'Protocole DeFi permissionless sur Ethereum. Marchés isolés, LTV élevée (86%). Taux variables par marché.' },
      { name: 'Compound',  apr: 5.1,   ltv: 65, liq: 80,   type: 'DeFi', color: '#00D395', link: 'https://compound.finance', best: false, founded: '2018', country: 'Décentralisé',    users: '200K+', regulated: false, manualUpdate: 'avr. 2026', about: 'Protocole DeFi pionnier. Gouvernance décentralisée COMP. Taux variables.' },
      { name: 'YouHodler', apr: 8.0,   ltv: 97, liq: 98.5, type: 'CeFi', color: '#1EBDD2', link: 'https://youhodler.com',    best: false, founded: '2018', country: 'Suisse / Chypre', users: '1M+',   regulated: true,  manualUpdate: 'avr. 2026', aprLabel: '8 – 16', about: 'Prêts en USDT adossés à BTC. Taux de 8% APR (CVR 97%, liquidation dès -1,5%) à 16% APR (CVR 50%, liquidation à -45%). Durée max 60 jours.' },
      { name: 'Nexo',      apr: 13.9,  ltv: 50, liq: 83,   type: 'CeFi', color: '#0EA5E9', link: 'https://nexo.com',         best: false, founded: '2018', country: 'UE / Caïmans',   users: '7M+',   regulated: true,  manualUpdate: 'avr. 2026', aprLabel: '6.9 – 13.9', about: 'Plateforme CeFi régulée, 7M+ utilisateurs. Taux selon niveau fidélité NEXO token.' },
      { name: 'Nebeus',    apr: 6.0,   ltv: 65, liq: 80,   type: 'CeFi', color: '#6C3CE1', link: 'https://nebeus.com',       best: false, founded: '2014', country: 'Royaume-Uni',    users: '200K+', regulated: true,  manualUpdate: 'avr. 2026', about: 'Prêt BTC sur Nebeus. Interest Only Loan (6% / an, LTV 65%) ou Flexible Loan (16.5%, LTV 70%). FCA-régulée.' },
    ],
    ethereum: [
      { name: 'Aave',      apr: 3.8,   ltv: 80,  liq: 83,   type: 'DeFi', color: '#B6509E', link: 'https://aave.com',         best: true,  founded: '2020', country: 'Décentralisé',    users: '500K+', regulated: false, about: 'Leader DeFi sur ETH. LTV la plus haute (80%). Déposez de l\'ETH, empruntez de l\'USDT.' },
      { name: 'Morpho',    apr: 9.61,  ltv: 91.5, liq: 91.5, type: 'DeFi', color: '#4C6FFF', link: 'https://app.morpho.org',   best: false, founded: '2022', country: 'Décentralisé',   users: '80K+',  regulated: false, about: 'Protocole DeFi permissionless sur Ethereum. LTV très haute (91.5%). Taux variables par marché.' },
      { name: 'Compound',  apr: 4.5,   ltv: 75,  liq: 80,   type: 'DeFi', color: '#00D395', link: 'https://compound.finance', best: false, founded: '2018', country: 'Décentralisé',    users: '200K+', regulated: false, manualUpdate: 'avr. 2026', about: 'Protocole DeFi pionnier. Gouvernance décentralisée COMP. Taux variables.' },
      { name: 'YouHodler', apr: 8.0,   ltv: 97,  liq: 98.5, type: 'CeFi', color: '#1EBDD2', link: 'https://youhodler.com',    best: false, founded: '2018', country: 'Suisse / Chypre', users: '1M+',   regulated: true,  manualUpdate: 'avr. 2026', aprLabel: '8 – 16', about: 'Prêts en USDT adossés à ETH. Taux de 8% / an (CVR 97%, liquidation dès -1,5%) à 16% / an (CVR 50%, liquidation à -45%). Durée max 60 jours.' },
      { name: 'Nexo',      apr: 13.9,  ltv: 50,  liq: 83,   type: 'CeFi', color: '#0EA5E9', link: 'https://nexo.com',         best: false, founded: '2018', country: 'UE / Caïmans',   users: '7M+',   regulated: true,  manualUpdate: 'avr. 2026', aprLabel: '6.9 – 13.9', about: 'Plateforme CeFi régulée, 7M+ utilisateurs. Système de fidélité NEXO token.' },
      { name: 'Nebeus',    apr: 6.0,   ltv: 65,  liq: 80,   type: 'CeFi', color: '#6C3CE1', link: 'https://nebeus.com',       best: false, founded: '2014', country: 'Royaume-Uni',    users: '200K+', regulated: true,  manualUpdate: 'avr. 2026', about: 'Prêt ETH sur Nebeus. Interest Only Loan (6% / an, LTV 65%) ou Flexible Loan (16.5%, LTV 70%). FCA-régulée.' },
    ],
  },
}

const FAQ = [
  { q: "Que se passe-t-il si le prix de ma crypto baisse ?", a: "Si le prix baisse sous le seuil de liquidation, la plateforme vend automatiquement une partie de votre collatéral pour rembourser le prêt. Pour éviter cela : empruntez moins que le maximum (LTV faible = plus de sécurité) ou ajoutez du collatéral si le prix baisse." },
  { q: "Quelle est la différence entre CeFi et DeFi ?", a: "CeFi (Nexo, Ledn) : plateforme centralisée, plus simple, support client, mais ils détiennent vos fonds. DeFi (Aave, Compound) : smart contracts, vous gardez le contrôle de vos fonds. Plus technique, mais aucune entité ne peut geler vos actifs." },
  { q: "Est-ce que je dois payer des impôts sur un prêt crypto ?", a: "En France, un prêt collatéralisé n'est pas un événement imposable car vous ne vendez pas votre crypto. Vous ne payez pas la flat tax de 30%. En revanche, si votre collatéral est liquidé, cette liquidation peut être considérée comme une vente imposable. Consultez un comptable." },
  { q: "Quel est le montant minimum pour emprunter ?", a: "Sur CeFi (Nexo, Ledn), les minimums sont généralement autour de 500–1 000 €. Sur DeFi (Aave, Compound), pas de minimum officiel, mais les frais de gas rendent les petits montants peu rentables en dessous de ~5 000 €." },
  { q: "Nantix est-il indépendant ?", a: "Oui. Nantix ne reçoit aucune rémunération pour modifier les données affichées. Nous percevons une commission d'affiliation standard si vous vous inscrivez via nos liens — cela ne biaise pas notre comparaison." },
]

const BLOG = [
  { tag: 'Guide',   title: "Qu'est-ce qu'un prêt Bitcoin collatéralisé ?", date: '12 mars 2025', read: '5 min', bg: '#FFF8F0', icon: '₿' },
  { tag: 'Analyse', title: 'CeFi vs DeFi : quel prêt choisir en 2025 ?',   date: '5 mars 2025',  read: '8 min', bg: '#F0FDF4', icon: '📊' },
  { tag: 'Risques', title: 'Comment éviter la liquidation de son collatéral', date: '28 fév 2025', read: '6 min', bg: '#EFF6FF', icon: '⚠️' },
]

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
  const [openRow, setOpenRow]       = useState(null)
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
  const fmt     = n => Math.round(n).toLocaleString('fr-FR')
  const today   = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
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
  const sep  = <div style={{ width: '1px', height: '18px', background: '#E0E0E0' }} />

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
        <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.2}} @keyframes fadeInUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}} .fade-row{animation:fadeInUp .3s ease both} .yh-tooltip{opacity:0;visibility:hidden;transition:opacity .15s ease} .yh-tooltip-wrap:hover .yh-tooltip{opacity:1;visibility:visible}`}</style>
        <meta name="description" content="Comparez les taux pour emprunter de l'USDC ou USDT en déposant du BTC ou ETH. Données en temps réel." />
      </Head>
      <Navbar />

      <main style={{ background: '#fff', minHeight: '100vh', paddingTop: '52px' }}>

        {/* ── HERO ── */}
        <section style={{ borderBottom: '1px solid #F0F0F0', padding: isMobile ? '24px 0 20px' : '40px 0 28px' }}>
          <div style={wrap}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '24px', marginBottom: '20px', flexWrap: 'wrap' }}>
              <div>
                <h1 style={{ fontSize: isMobile ? '30px' : '56px', fontWeight: '800', letterSpacing: isMobile ? '-1px' : '-2px', color: '#111', lineHeight: '1.2', marginBottom: '10px' }}>
                  Empruntez sans<br />vendre votre crypto.
                </h1>
                <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', maxWidth: '420px' }}>
                  Déposez du BTC ou ETH et empruntez de l'USDC ou USDT. Comparez les meilleurs taux.
                </p>
              </div>
              {!isMobile && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px', flexShrink: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#555' }}>
                    <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#16A34A', animation: 'pulse 2s infinite' }} />
                    Taux Aave & Morpho en temps réel
                  </div>
                  <div style={{ display: 'flex', border: '1px solid #EBEBEB', borderRadius: '10px', overflow: 'hidden' }}>
                    {[{ v: '5', l: 'Plateformes' }, { v: '2,56%', l: 'Meilleur taux' }, { v: '97%', l: 'LTV max' }].map((s, i) => (
                      <div key={s.l} style={{ padding: '14px 22px', borderRight: i < 2 ? '1px solid #EBEBEB' : 'none', textAlign: 'center' }}>
                        <div style={{ fontSize: '22px', fontWeight: '800', color: '#111', letterSpacing: '-0.7px' }}>{s.v}</div>
                        <div style={{ fontSize: '11px', color: '#666', marginTop: '2px' }}>{s.l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {!isMobile && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', border: '1px solid #EBEBEB', borderRadius: '10px', overflow: 'hidden' }}>
                {[
                  { n: '01', t: 'Choisissez le stablecoin',      d: 'USDC ou USDT — le montant que vous souhaitez emprunter.' },
                  { n: '02', t: 'Sélectionnez votre collatéral', d: 'BTC ou ETH à déposer en garantie.' },
                  { n: '03', t: 'Comparez et empruntez',         d: 'Taux, LTV et seuil de liquidation côte à côte.' },
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

        {/* ── RISQUE ── */}
        <div style={{ ...wrap, paddingTop: '16px' }}>
          <div style={{ border: '1px solid #FEF3C7', background: '#FFFBEB', borderRadius: '8px', padding: '12px 16px', display: 'flex', gap: '10px' }}>
            <span style={{ fontSize: '14px', flexShrink: 0 }}>⚠️</span>
            <div>
              <div style={{ fontSize: '12px', fontWeight: '700', color: '#92400E', marginBottom: '3px' }}>Qu'est-ce que le risque de liquidation ?</div>
              <div style={{ fontSize: '12px', color: '#B45309', lineHeight: '1.6' }}>
                Dans un prêt collatéralisé, si le prix de la crypto baisse sous le seuil de liquidation, la plateforme vend automatiquement une partie du collatéral pour couvrir le prêt. La colonne <strong>Liquidation</strong> indique ce seuil pour chaque plateforme selon le montant saisi.
              </div>
            </div>
          </div>
        </div>

        {/* ── NIVEAU 1 : onglets stablecoin ── */}
        <div style={{ borderBottom: '1px solid #EBEBEB', borderTop: '1px solid #EBEBEB', marginTop: '16px', background: '#fff' }}>
          <div style={{ maxWidth: W, margin: '0 auto', padding: `0 ${PX}`, display: 'flex', alignItems: 'stretch' }}>
            {STABLECOINS.map(x => (
              <button key={x.id} onClick={() => { setStablecoin(x.id); setFilter('all') }} style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '14px 20px',
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
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', padding: '0 4px', gap: '6px' }}>
              <span style={{ fontSize: '11px', color: '#AAA' }}>Emprunter</span>
            </div>
          </div>
        </div>

        {/* ── NIVEAU 2 : collatéral + filtres ── */}
        <div style={{ borderBottom: '1px solid #EBEBEB', background: '#FAFAFA' }}>
          <div style={{ maxWidth: W, margin: '0 auto', padding: `8px ${PX}`, display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>

            <div style={{ display: 'flex', background: '#fff', border: '1px solid #E0E0E0', borderRadius: '8px', overflow: 'hidden' }}>
              {COLLATERALS.map(x => (
                <button key={x.id} onClick={() => { setCollateral(x.id); setAmount(1); setOpenRow(null) }} style={{
                  display: 'flex', alignItems: 'center', gap: '5px',
                  padding: '6px 12px',
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

        {/* ── TABLEAU ── */}
        <div style={wrap}>
          {!isMobile && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: GRID,
              padding: '10px 16px',
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

            const maxBorrow = (col * displayLtv) / 100
            const liqPrice  = price > 0 ? (price * (displayLiq / 100)) : 0
            const isOpen    = openRow === p.name
            const isLive    = (p.name === 'Aave' && defiRates?.aave?.rates?.[stablecoin] !== undefined) ||
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
                      <span style={{
                        width: '13px', height: '13px', borderRadius: '50%',
                        background: '#E8E8E8', color: '#888',
                        fontSize: '9px', fontWeight: '800',
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'default', userSelect: 'none', flexShrink: 0,
                      }}>?</span>
                      <div className="yh-tooltip" style={{
                        position: 'absolute', bottom: '22px', left: '50%', transform: 'translateX(-50%)',
                        background: '#111', color: '#fff', borderRadius: '7px',
                        padding: '10px 12px', fontSize: '11px', lineHeight: '1.6',
                        width: '220px', zIndex: 100, pointerEvents: 'none',
                        boxShadow: '0 4px 16px rgba(0,0,0,.18)',
                      }}>
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
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '5px',
                  fontSize: '11px', fontWeight: '600', color: '#444',
                }}>
                  <div style={{
                    width: '6px', height: '6px', borderRadius: '50%', flexShrink: 0,
                    background: p.type === 'DeFi' ? '#999' : '#16A34A',
                  }} />
                  {p.type === 'DeFi' ? 'Wallet requis' : 'Sans wallet'}
                </div>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '5px',
                  fontSize: '11px', fontWeight: '600',
                  color: p.type === 'CeFi' ? '#2563EB' : 'transparent',
                  pointerEvents: 'none', userSelect: 'none',
                }}>
                  <div style={{
                    width: '6px', height: '6px', borderRadius: '50%', flexShrink: 0,
                    background: p.type === 'CeFi' ? '#2563EB' : 'transparent',
                  }} />
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
                      <a href={p.link} target="_blank" rel="noopener noreferrer" style={{
                        display: 'block', textAlign: 'center', padding: '11px',
                        borderRadius: '8px', fontSize: '13px', fontWeight: '700',
                        textDecoration: 'none', background: p.best ? '#111' : '#F5F5F5',
                        color: p.best ? '#fff' : '#444',
                      }}>Emprunter →</a>
                    </div>
                  </div>
                ) : (

                  <div
                    onClick={() => {}}
                    className='fade-row'
                    style={{
                      animationDelay: `${i * 0.06}s`,
                      display: 'grid',
                      gridTemplateColumns: GRID,
                      padding: '0 16px',
                      alignItems: 'center',
                      minHeight: isYouHodler ? '84px' : '72px',
                      background: p.best ? '#FAFAFA' : '#fff',
                      cursor: 'default',
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

                    {/* Col 2 — Taux / an */}
                    <AprBadge />

                    {/* Col 3 — LTV max */}
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: '700', color: '#111', letterSpacing: '-.3px' }}>{displayLtv}%</div>
                      <div style={{ height: '2px', background: '#EBEBEB', borderRadius: '2px', marginTop: '6px', width: '64px' }}>
                        <div style={{ height: '100%', width: `${ltvBarWidth}%`, background: '#111', borderRadius: '2px' }} />
                      </div>
                    </div>

                    {/* Col 4 — Emprunt max */}
                    <div style={{ fontSize: '16px', fontWeight: '700', color: '#16A34A', letterSpacing: '-.3px' }}>
                      {mounted && price > 0 ? fmt(maxBorrow) + ' €' : '—'}
                    </div>

                    {/* Col 5 — Liquidation */}
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: '700', color: '#DC2626', letterSpacing: '-.3px' }}>
                        {mounted && price > 0 ? fmt(liqPrice) + ' €' : '—'}
                      </div>
                      <div style={{ fontSize: '10px', color: '#888', marginTop: '2px' }}>
                        {mounted && price > 0 && (
                          <>
                            <span style={{ color: '#DC2626', fontWeight: '600' }}>
                              −{Math.round((1 - displayLiq / 100) * 100)}%
                            </span>
                            {' '}avant liquidation
                          </>
                        )}
                      </div>
                    </div>

                    {/* Col 6 — Accès */}
                    <AccesBadges />

                    {/* Col 7 — CTA */}
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      style={{
                        display: 'block', textAlign: 'center', padding: '9px 14px', borderRadius: '8px',
                        fontSize: '12px', fontWeight: '700', textDecoration: 'none', whiteSpace: 'nowrap',
                        background: '#fff', color: '#444', border: '1.5px solid #DCDCDC',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = '#111'; e.currentTarget.style.color = '#111' }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = '#DCDCDC'; e.currentTarget.style.color = '#444' }}
                    >
                      Emprunter →
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
              <strong style={{ color: '#444' }}>Indépendance éditoriale.</strong> Nantix est un comparateur indépendant. Les données affichées ne sont pas influencées par les plateformes. Des commissions d'affiliation peuvent être perçues via certains liens — elles ne modifient pas notre classement.
            </p>
          </div>
        </div>

        {/* ── VENDRE VS EMPRUNTER ── */}
        <section style={{ borderTop: '1px solid #EBEBEB', padding: '52px 0' }}>
          <div style={wrap}>
            <div style={{ fontSize: '10px', fontWeight: '700', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Comment ça fonctionne ?</div>
            <h2 style={{ fontSize: '24px', fontWeight: '700', letterSpacing: '-.6px', color: '#111', marginBottom: '8px' }}>Vente vs prêt collatéralisé : quelles différences ?</h2>
            <p style={{ fontSize: '14px', color: '#555', lineHeight: '1.6', maxWidth: '500px', marginBottom: '28px' }}>Un prêt collatéralisé permet d'obtenir des liquidités sans vendre sa crypto. Voici les principales différences entre les deux options.</p>

            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1px 1fr', border: '1px solid #EBEBEB', borderRadius: '10px', overflow: 'hidden', marginBottom: '20px' }}>
              {[
                { header: '✕ Vendre votre crypto', color: '#DC2626', rows: [['Impôt plus-values', '30% flat tax', true], ['Exposition marché', 'Perdue', true], ['Délai', '1–3 jours', false], ['Montant net', '~70% après impôt', true]] },
                null,
                { header: '✓ Prêt collatéralisé', color: '#16A34A', rows: [['Impôt plus-values', 'Aucun', false], ['Exposition marché', 'Conservée', false], ['Délai', 'Quelques minutes', false], ['Montant accessible', '50–80% collatéral', false]] },
              ].map((col, ci) => col === null
                ? <div key={ci} style={{ background: '#EBEBEB' }} />
                : (
                  <div key={ci} style={{ padding: '20px 24px' }}>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: col.color, marginBottom: '16px' }}>{col.header}</div>
                    {col.rows.map(r => (
                      <div key={r[0]} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: '1px solid #F5F5F5', fontSize: '13px' }}>
                        <span style={{ color: '#666' }}>{r[0]}</span>
                        <span style={{ fontWeight: '600', color: r[2] ? col.color : '#111' }}>{r[1]}</span>
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
                { icon: '⏱', t: 'Délais de traitement variables', d: 'Sur CeFi, les fonds sont généralement disponibles en quelques minutes à quelques heures. Sur DeFi, le traitement est quasi-instantané.' },
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

        {/* ── FAQ ── */}
        <section style={{ borderTop: '1px solid #EBEBEB', padding: '52px 0' }}>
          <div style={wrap}>
            <div style={{ fontSize: '10px', fontWeight: '700', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Questions fréquentes</div>
            <h2 style={{ fontSize: '24px', fontWeight: '700', letterSpacing: '-.6px', color: '#111', marginBottom: '28px' }}>Fonctionnement des prêts crypto collatéralisés</h2>
            {FAQ.map((item, i) => (
              <div key={i} style={{ borderBottom: '1px solid #EBEBEB' }}>
                <div onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ padding: '16px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', gap: '16px' }}>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#222' }}>{item.q}</span>
                  <span style={{ fontSize: '12px', color: '#888', flexShrink: 0, display: 'inline-block', transition: 'transform .2s', transform: openFaq === i ? 'rotate(180deg)' : 'none' }}>▾</span>
                </div>
                {openFaq === i && <div style={{ paddingBottom: '16px', fontSize: '13px', color: '#555', lineHeight: '1.7' }}>{item.a}</div>}
              </div>
            ))}
          </div>
        </section>

        {/* ── BLOG ── */}
        <section style={{ borderTop: '1px solid #EBEBEB', padding: '52px 0' }}>
          <div style={wrap}>
            <div style={{ fontSize: '10px', fontWeight: '700', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Ressources</div>
            <h2 style={{ fontSize: '24px', fontWeight: '700', letterSpacing: '-.6px', color: '#111', marginBottom: '24px' }}>Ressources et guides</h2>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: '16px' }}>
              {BLOG.map(b => (
                <div key={b.title} style={{ border: '1px solid #EBEBEB', borderRadius: '10px', overflow: 'hidden', cursor: 'pointer', transition: 'box-shadow .15s' }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,.06)'}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
                  <div style={{ height: '80px', background: b.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px' }}>{b.icon}</div>
                  <div style={{ padding: '14px 16px' }}>
                    <div style={{ fontSize: '10px', fontWeight: '700', color: '#888', textTransform: 'uppercase', letterSpacing: '.7px', marginBottom: '6px' }}>{b.tag}</div>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: '#111', lineHeight: '1.4', marginBottom: '6px' }}>{b.title}</div>
                    <div style={{ fontSize: '11px', color: '#888' }}>{b.date} · {b.read}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── NEWSLETTER ── */}
        <section style={{ borderTop: '1px solid #EBEBEB', padding: '52px 0' }}>
          <div style={wrap}>
            <div style={{ background: '#FAFAFA', border: '1px solid #EBEBEB', borderRadius: '12px', padding: '36px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '32px', flexWrap: 'wrap' }}>
              <div style={{ maxWidth: '420px' }}>
                <div style={{ fontSize: '20px', fontWeight: '700', color: '#111', letterSpacing: '-.4px', marginBottom: '6px' }}>Suivi des taux</div>
                <div style={{ fontSize: '14px', color: '#555', lineHeight: '1.6', marginBottom: '8px' }}>Recevez un récapitulatif hebdomadaire des variations de taux sur les principales plateformes.</div>
                <div style={{ fontSize: '12px', color: '#888' }}>Fréquence maximale : 1 email par semaine.</div>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexShrink: 0, width: isMobile ? '100%' : 'auto', flexDirection: isMobile ? 'column' : 'row' }}>
                <input type="email" placeholder="votre@email.com" style={{ border: '1px solid #E0E0E0', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', outline: 'none', width: isMobile ? '100%' : '220px', color: '#111', boxSizing: 'border-box' }} />
                <button style={{ background: '#111', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 20px', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>S'abonner</button>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
