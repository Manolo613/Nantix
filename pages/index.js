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
  { q: "Que se passe-t-il si le prix de ma crypto baisse ?", a: "Si le prix baisse sous le seuil de liquidation, la plateforme vend automatiquement une partie de votre collatéral pour rembourser le prêt. Pour éviter cela : empruntez moins que le maximum (LTV faible = plus de sécurité), ou ajoutez du collatéral dès que le prix approche du seuil. Vous pouvez aussi rembourser partiellement votre prêt pour réduire le risque." },
  { q: "Quelle est la différence entre CeFi et DeFi ?", a: "CeFi (Nexo, Ledn, YouHodler) : plateforme centralisée, interface simple, support client, KYC requis — mais la plateforme détient vos fonds. DeFi (Aave, Morpho) : smart contracts sur Ethereum, vous gardez le contrôle de vos actifs via un wallet. Plus technique, mais aucune entité ne peut geler ou saisir votre collatéral." },
  { q: "Est-ce que je dois payer des impôts sur un prêt crypto ?", a: "En France, un prêt collatéralisé n'est pas un événement imposable : vous ne vendez pas votre crypto, donc pas d'imposition sur les plus-values. En revanche, si votre collatéral est liquidé de force, cette liquidation peut être considérée comme une cession imposable. Consultez un comptable spécialisé crypto pour votre situation." },
  { q: "Quel est le montant minimum pour emprunter ?", a: "Sur CeFi (Nexo, Ledn, YouHodler), les minimums sont généralement autour de 500–1 000 €. Sur DeFi (Aave, Morpho), il n'y a pas de minimum officiel, mais les frais de gas Ethereum rendent les petits montants peu rentables en dessous de ~5 000–10 000 €." },
  { q: "Combien de temps dure un prêt collatéralisé ?", a: "Cela dépend de la plateforme. YouHodler : durée fixe de 30 à 60 jours (renouvelable). Nexo et Ledn : durée flexible, vous remboursez quand vous voulez. Sur DeFi (Aave, Morpho) : pas de durée fixe, le prêt reste ouvert jusqu'à ce que vous le remboursiez ou que votre position soit liquidée." },
  { q: "Puis-je rembourser en avance sans pénalité ?", a: "Généralement oui. Sur Aave et Morpho, vous remboursez à tout moment sans frais. Sur Nexo et YouHodler, il peut y avoir des frais en cas de remboursement anticipé selon les conditions du moment. Vérifiez les CGU avant de signer." },
]

const BLOG = [
  { tag: 'Guide',   title: "Qu'est-ce qu'un prêt Bitcoin collatéralisé ?", date: '10 avr. 2026', read: '5 min', bg: '#FFF8F0', icon: '₿', href: '/blog/quest-ce-que-le-pret-bitcoin' },
  { tag: 'Analyse', title: 'CeFi vs DeFi : quel prêt choisir en 2026 ?',   date: '8 avr. 2026',  read: '8 min', bg: '#F0FDF4', icon: '📊', href: '/blog/cefi-vs-defi-pret-crypto' },
  { tag: 'Risques', title: 'Comment éviter la liquidation de son collatéral', date: '5 avr. 2026', read: '6 min', bg: '#EFF6FF', icon: '⚠️', href: '/blog/eviter-liquidation-crypto' },
]

const CONSEILS = [
  { icon: '🎯', title: 'Choisissez un LTV raisonnable', body: 'Un LTV de 40 à 50% offre une bonne marge de sécurité. Cela laisse de la place en cas de baisse des marchés, sans trop limiter les fonds que vous pouvez emprunter.' },
  { icon: '🛡️', title: 'Ayez un plan en cas de baisse', body: 'Avant d\'emprunter, réfléchissez à ce que vous feriez si votre crypto perdait 30%. Ajouter du collatéral, rembourser partiellement ou simplement surveiller : l\'important est d\'y avoir pensé.' },
  { icon: '⚖️', title: 'CeFi ou DeFi selon votre profil', body: 'CeFi (Nexo, Ledn) est plus simple et adapté aux montants inférieurs à 10 000 €. DeFi (Aave, Morpho) convient mieux aux montants élevés et aux utilisateurs à l\'aise avec un wallet.' },
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
            <div>
                <h1 style={{ fontSize: isMobile ? '34px' : '58px', fontWeight: '800', letterSpacing: isMobile ? '-1.5px' : '-2.5px', color: '#111', lineHeight: '1.1', marginBottom: '16px' }}>
                  Empruntez sans<br />vendre votre crypto.
                </h1>
                <p style={{ fontSize: '15px', color: '#666', lineHeight: '1.75', maxWidth: '440px' }}>
                  Déposez du BTC ou ETH et empruntez de l'USDC ou USDT.
                </p>
            </div>
          </div>
        </section>

        {/* ── ONGLETS STABLECOIN ── */}
        <div style={{ background: '#fff' }}>
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
            <div style={{ marginLeft: 'auto' }} />
          </div>
        </div>

        {/* ── COLLATÉRAL + FILTRES ── */}
        <div style={{ background: '#FAFAFA' }}>
          <div style={{ maxWidth: W, margin: '0 auto', padding: `8px ${PX}`, display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', background: '#fff', borderRadius: '8px', overflow: 'hidden' }}>
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
            <div style={{ display: 'flex', alignItems: 'center', background: '#fff', borderRadius: '8px', overflow: 'hidden' }}>
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
                      <a href={p.link} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', padding: '11px', borderRadius: '8px', fontSize: '13px', fontWeight: '700', textDecoration: 'none', background: '#2563EB', color: '#fff' }}>Emprunter →</a>
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
                      style={{ display: 'block', textAlign: 'center', padding: '9px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: '700', textDecoration: 'none', whiteSpace: 'nowrap', background: '#2563EB', color: '#fff', border: 'none' }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#1D4ED8' }}
                      onMouseLeave={e => { e.currentTarget.style.background = '#2563EB' }}
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
          <div style={{ padding: '12px 0', marginTop: '4px' }}>
            <p style={{ fontSize: '11px', color: '#AAA' }}>Nantix est un comparateur indépendant.</p>
          </div>
        </div>

        {/* ── CONSEILS ── */}
        <section style={{ background: '#F8F9FA', padding: isMobile ? '48px 0' : '64px 0' }}>
          <div style={wrap}>
            <div style={{ fontSize: '11px', fontWeight: '700', color: '#999', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>Conseils</div>
            <h2 style={{ fontSize: isMobile ? '22px' : '26px', fontWeight: '800', letterSpacing: '-.7px', color: '#111', marginBottom: '32px' }}>3 règles à retenir</h2>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: '16px' }}>
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
                { header: 'Vendre votre crypto', sign: '✕', color: '#DC2626', bg: '#FEF2F2', rows: [['Imposition', '30% sur les plus-values'], ['Exposition marché', 'Perdue'], ['Délai', '1 à 3 jours ouvrés'], ['Montant net', '~70% après imposition']] },
                { header: 'Prêt collatéralisé',  sign: '✓', color: '#16A34A', bg: '#F0FDF4', rows: [['Imposition', 'Aucune'], ['Exposition marché', 'Conservée'], ['Délai', 'Quelques minutes'], ['Montant accessible', "jusqu'à 90% du collatéral"]] },
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
        <section style={{ background: '#F8F9FA', padding: isMobile ? '48px 0' : '72px 0' }}>
          <div style={wrap}>
            <div style={{ fontSize: '11px', fontWeight: '700', color: '#999', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>FAQ</div>
            <h2 style={{ fontSize: isMobile ? '22px' : '26px', fontWeight: '800', letterSpacing: '-.7px', color: '#111', marginBottom: '36px' }}>Questions fréquentes</h2>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2,1fr)', gap: '12px' }}>
              {FAQ.map((item, i) => (
                <div key={i} className="hover-card" onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ background: '#fff', borderRadius: '14px', padding: '24px 28px', cursor: 'pointer', boxShadow: openFaq === i ? '0 4px 20px rgba(0,0,0,.08)' : '0 1px 4px rgba(0,0,0,.05)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
                    <span style={{ fontSize: '14px', fontWeight: '700', color: '#111', lineHeight: '1.5' }}>{item.q}</span>
                    <span style={{ fontSize: '18px', color: openFaq === i ? '#2563EB' : '#CCC', flexShrink: 0, fontWeight: '400', display: 'inline-block', transition: 'transform .2s, color .2s', transform: openFaq === i ? 'rotate(45deg)' : 'none', marginTop: '2px' }}>+</span>
                  </div>
                  {openFaq === i && (
                    <div style={{ fontSize: '13px', color: '#666', lineHeight: '1.8', marginTop: '14px', paddingTop: '14px', borderTop: '1px solid #F0F0F0' }}>
                      {item.a}
                    </div>
                  )}
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

        {/* ── CTA FINAL ── */}
        <section style={{ background: '#111', padding: isMobile ? '48px 0' : '64px 0' }}>
          <div style={wrap}>
            <div style={{ textAlign: 'center', maxWidth: '560px', margin: '0 auto' }}>
              <div style={{ fontSize: isMobile ? '26px' : '32px', fontWeight: '800', color: '#fff', letterSpacing: '-.8px', lineHeight: '1.2', marginBottom: '16px' }}>
                Prêt à emprunter sans vendre ?
              </div>
              <div style={{ fontSize: '14px', color: '#666', lineHeight: '1.7', marginBottom: '28px' }}>
                Comparez les 6 plateformes, choisissez celle qui correspond à votre profil et démarrez en quelques minutes.
              </div>
              <a href="#" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                style={{ display: 'inline-block', background: '#2563EB', color: '#fff', fontWeight: '700', fontSize: '14px', padding: '14px 32px', borderRadius: '10px', textDecoration: 'none' }}>
                Voir le comparateur
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
