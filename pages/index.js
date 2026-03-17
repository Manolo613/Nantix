import Head from 'next/head'
import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

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
  Nexo:     'https://www.google.com/s2/favicons?domain=nexo.com&sz=64',
  Ledn:     'https://www.google.com/s2/favicons?domain=ledn.io&sz=64',
  Aave:     'https://www.google.com/s2/favicons?domain=aave.com&sz=64',
  Compound: 'https://www.google.com/s2/favicons?domain=compound.finance&sz=64',
  Spark:    'https://www.google.com/s2/favicons?domain=spark.fi&sz=64',
  Kamino:   'https://www.google.com/s2/favicons?domain=kamino.finance&sz=64',
}

const PLATFORMS = {
  bitcoin: [
    { name: 'Nexo',     apr: 13.9, ltv: 50, liq: 83,   type: 'CeFi', color: '#0EA5E9', link: 'https://nexo.com',        best: false, founded: '2018', country: 'UE / Caïmans', users: '7M+',   regulated: true,  about: 'Plateforme CeFi régulée, 7M+ utilisateurs. Taux compétitifs avec système de fidélité NEXO token.' },
    { name: 'Ledn',     apr: 11.9, ltv: 50, liq: 80,   type: 'CeFi', color: '#0D4A45', link: 'https://ledn.io',          best: true,  founded: '2018', country: 'Canada',        users: '100K+', regulated: true,  about: 'Spécialiste Bitcoin. Proof-of-Reserves publique. Premier prêt hypothécaire adossé au BTC.' },
    { name: 'Aave',     apr: 4.2,  ltv: 70, liq: 82.5, type: 'DeFi', color: '#B6509E', link: 'https://aave.com',         best: false, founded: '2020', country: 'Décentralisé',  users: '500K+', regulated: false, about: 'Leader DeFi. Smart contracts audités. Pas de KYC, fonds toujours sous contrôle utilisateur.' },
    { name: 'Compound', apr: 5.1,  ltv: 65, liq: 80,   type: 'DeFi', color: '#00D395', link: 'https://compound.finance', best: false, founded: '2018', country: 'Décentralisé',  users: '200K+', regulated: false, about: 'Protocole DeFi pionnier. Gouvernance décentralisée COMP. Taux variables.' },
  ],
  ethereum: [
    { name: 'Nexo',     apr: 13.9, ltv: 50, liq: 83,   type: 'CeFi', color: '#0EA5E9', link: 'https://nexo.com',        best: false, founded: '2018', country: 'UE / Caïmans', users: '7M+',   regulated: true,  about: 'Plateforme CeFi régulée, 7M+ utilisateurs. Système de fidélité NEXO token.' },
    { name: 'Aave',     apr: 3.8,  ltv: 80, liq: 82.5, type: 'DeFi', color: '#B6509E', link: 'https://aave.com',         best: true,  founded: '2020', country: 'Décentralisé', users: '500K+', regulated: false, about: 'Leader DeFi sur ETH. LTV la plus haute (80%). Smart contracts audités.' },
    { name: 'Compound', apr: 4.5,  ltv: 75, liq: 80,   type: 'DeFi', color: '#00D395', link: 'https://compound.finance', best: false, founded: '2018', country: 'Décentralisé', users: '200K+', regulated: false, about: 'Protocole DeFi pionnier. Taux variables selon offre et demande.' },
    { name: 'Spark',    apr: 4.1,  ltv: 74, liq: 79,   type: 'DeFi', color: '#FF6B35', link: 'https://spark.fi',         best: false, founded: '2023', country: 'Décentralisé', users: '50K+',  regulated: false, about: 'Protocole DeFi basé sur MakerDAO. Taux stables compétitifs.' },
  ],
  solana: [
    { name: 'Nexo',     apr: 14.9, ltv: 40, liq: 75,   type: 'CeFi', color: '#0EA5E9', link: 'https://nexo.com',        best: false, founded: '2018', country: 'UE / Caïmans', users: '7M+',   regulated: true,  about: 'Nexo accepte SOL comme collatéral. LTV plus conservatrice vu la volatilité de Solana.' },
    { name: 'Kamino',   apr: 6.8,  ltv: 65, liq: 80,   type: 'DeFi', color: '#9945FF', link: 'https://kamino.finance',   best: true,  founded: '2022', country: 'Décentralisé', users: '80K+',  regulated: false, about: 'Protocole DeFi natif Solana. Gestion de liquidité automatisée et taux optimisés.' },
    { name: 'Aave',     apr: 5.5,  ltv: 60, liq: 77,   type: 'DeFi', color: '#B6509E', link: 'https://aave.com',         best: false, founded: '2020', country: 'Décentralisé', users: '500K+', regulated: false, about: 'Aave V3 supporte SOL via wSOL sur plusieurs chaînes. Smart contracts audités.' },
  ],
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

const W  = '1100px'
const PX = '24px'

export default function Home() {
  const [crypto, setCrypto]   = useState('bitcoin')
  const [prices, setPrices]   = useState({})
  const [amount, setAmount]   = useState(1)
  const [mounted, setMounted] = useState(false)
  const [sort, setSort]       = useState('apr')
  const [filter, setFilter]   = useState('all')
  const [openRow, setOpenRow] = useState(null)
  const [openFaq, setOpenFaq] = useState(null)
  const [imgErrors, setImgErrors] = useState({})

  useEffect(() => {
    setMounted(true)
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=eur')
      .then(r => r.json()).then(d => setPrices(d)).catch(() => {})
  }, [])

  const c     = CRYPTOS.find(x => x.id === crypto)
  const price = prices[c.coingeckoId]?.eur || 0
  const col   = amount * price
  const fmt   = n => Math.round(n).toLocaleString('fr-FR')
  const today = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })

  const rows = (PLATFORMS[crypto] || [])
    .filter(p => filter === 'all' || p.type === filter)
    .sort((a, b) => sort === 'apr' ? a.apr - b.apr : b.ltv - a.ltv)

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
        <title>Nantix — Comparez les prêts Bitcoin, Ethereum & Solana</title>
        <meta name="description" content="Le seul comparateur francophone de prêts crypto collatéralisés. Comparez Nexo, Ledn, Aave, Compound en temps réel." />
      </Head>
      <Navbar />

      <main style={{ background: '#fff', minHeight: '100vh', paddingTop: '52px' }}>

        {/* ── HERO ── */}
        <section style={{ borderBottom: '1px solid #F0F0F0', padding: '40px 0 28px' }}>
          <div style={wrap}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '32px', marginBottom: '28px', flexWrap: 'wrap' }}>
              <div>
                <h1 style={{ fontSize: '32px', fontWeight: '800', letterSpacing: '-1.1px', color: '#111', lineHeight: '1.15', marginBottom: '12px' }}>
                  Empruntez en euros.<br />
                  <span style={{ color: '#666', fontWeight: '400' }}>Gardez votre crypto.</span>
                </h1>
                <p style={{ fontSize: '15px', color: '#666', lineHeight: '1.6', maxWidth: '420px' }}>
                  Le seul comparateur francophone de prêts crypto — sans vendre, sans impôt sur les plus-values.
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px', flexShrink: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#555' }}>
                  <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#16A34A', animation: 'pulse 2s infinite' }} />
                  Prix en temps réel
                </div>
                <div style={{ display: 'flex', border: '1px solid #EBEBEB', borderRadius: '10px', overflow: 'hidden' }}>
                  {[{ v: '5', l: 'Plateformes' }, { v: '3,8%', l: 'Meilleur taux' }, { v: '80%', l: 'LTV max' }].map((s, i) => (
                    <div key={s.l} style={{ padding: '14px 22px', borderRight: i < 2 ? '1px solid #EBEBEB' : 'none', textAlign: 'center' }}>
                      <div style={{ fontSize: '22px', fontWeight: '800', color: '#111', letterSpacing: '-0.7px' }}>{s.v}</div>
                      <div style={{ fontSize: '11px', color: '#666', marginTop: '2px' }}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', border: '1px solid #EBEBEB', borderRadius: '10px', overflow: 'hidden' }}>
              {[
                { n: '01', t: 'Déposez votre crypto',  d: 'BTC, ETH ou SOL comme garantie.' },
                { n: '02', t: 'Comparez les offres',    d: 'Taux, LTV et liquidation.' },
                { n: '03', t: 'Recevez vos euros',      d: 'Directement sur votre compte.' },
              ].map((s, i) => (
                <div key={s.n} style={{ padding: '14px 20px', borderRight: i < 2 ? '1px solid #EBEBEB' : 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '11px', fontWeight: '800', color: '#BBB', flexShrink: 0 }}>{s.n}</span>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: '#111' }}>{s.t}</div>
                    <div style={{ fontSize: '11px', color: '#666', marginTop: '2px' }}>{s.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RISQUE ── */}
        <div style={{ ...wrap, paddingTop: '16px' }}>
          <div style={{ border: '1px solid #FEF3C7', background: '#FFFBEB', borderRadius: '8px', padding: '12px 16px', display: 'flex', gap: '10px' }}>
            <span style={{ fontSize: '14px', flexShrink: 0 }}>⚠️</span>
            <div>
              <div style={{ fontSize: '12px', fontWeight: '700', color: '#92400E', marginBottom: '3px' }}>Comprendre le risque de liquidation</div>
              <div style={{ fontSize: '12px', color: '#B45309', lineHeight: '1.6' }}>
                Si le prix de votre crypto baisse sous le seuil, la plateforme vend automatiquement votre collatéral. La colonne <strong>Liquidation</strong> indique le prix exact auquel cela se produirait.
              </div>
            </div>
          </div>
        </div>

        {/* ── NIVEAU 1 : onglets crypto ── */}
        <div style={{ borderBottom: '1px solid #EBEBEB', borderTop: '1px solid #EBEBEB', marginTop: '16px', background: '#fff' }}>
          <div style={{ maxWidth: W, margin: '0 auto', padding: `0 ${PX}`, display: 'flex', alignItems: 'stretch' }}>
            {CRYPTOS.map(x => (
              <button key={x.id} onClick={() => { setCrypto(x.id); setAmount(1); setFilter('all') }} style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '14px 20px',
                fontSize: '14px', fontWeight: '600',
                color: crypto === x.id ? '#111' : '#888',
                background: 'transparent', border: 'none',
                borderBottom: `2.5px solid ${crypto === x.id ? '#111' : 'transparent'}`,
                cursor: 'pointer', transition: 'all .15s', whiteSpace: 'nowrap',
              }}>
                <img src={x.logo} alt={x.symbol} width={20} height={20} style={{ borderRadius: '50%' }} />
                {x.name}
                <span style={{ fontSize: '11px', opacity: 0.45 }}>{x.symbol}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── NIVEAU 2 : filtres ── */}
        <div style={{ borderBottom: '1px solid #EBEBEB', background: '#FAFAFA' }}>
          <div style={{ maxWidth: W, margin: '0 auto', padding: `8px ${PX}`, display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', background: '#fff', border: '1px solid #E0E0E0', borderRadius: '8px', overflow: 'hidden' }}>
              <img src={c.logo} alt={c.symbol} width={22} height={22} style={{ margin: '4px', borderRadius: '50%', flexShrink: 0 }} />
              <input type="number" value={amount} onChange={e => setAmount(Math.max(0.001, parseFloat(e.target.value) || 0))} step="0.1"
                style={{ border: 'none', padding: '6px 8px', fontSize: '14px', width: '70px', outline: 'none', color: '#111', background: 'transparent', fontWeight: '700' }} />
              <span style={{ padding: '0 10px', fontSize: '12px', fontWeight: '600', color: '#999' }}>{c.symbol}</span>
            </div>
            <span style={{ fontSize: '13px', color: '#555', whiteSpace: 'nowrap' }}>≈ {mounted && price > 0 ? fmt(col) : '—'} €</span>

            <span style={{ fontSize: '11px', color: '#999', whiteSpace: 'nowrap', marginLeft: 'auto' }}>Mis à jour le {today}</span>

            {sep}

            <div style={{ display: 'flex', background: '#EBEBEB', borderRadius: '7px', padding: '2px' }}>
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
          <div style={{ display: 'grid', gridTemplateColumns: '220px 100px 100px 1fr 1fr 130px', padding: '10px 12px', fontSize: '10px', fontWeight: '700', color: '#888', textTransform: 'uppercase', letterSpacing: '.9px', borderBottom: '1px solid #EBEBEB' }}>
            <span>Plateforme</span><span>Taux / an</span><span>LTV max</span><span>Emprunt max</span><span>Liquidation {c.symbol}</span><span></span>
          </div>

          {rows.map((p, i) => {
            const maxBorrow = (col * p.ltv) / 100
            const liqPrice  = price > 0 ? (col * (p.liq / 100)) / amount : 0
            const isOpen    = openRow === p.name
            return (
              <div key={p.name} style={{ borderBottom: i < rows.length - 1 ? '1px solid #F5F5F5' : 'none' }}>
                <div onClick={() => setOpenRow(isOpen ? null : p.name)} style={{
                  display: 'grid', gridTemplateColumns: '220px 100px 100px 1fr 1fr 130px',
                  padding: '20px 12px', alignItems: 'center',
                  background: p.best ? '#FAFAFA' : '#fff', cursor: 'pointer',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#FAFAFA'}
                onMouseLeave={e => e.currentTarget.style.background = p.best ? '#FAFAFA' : '#fff'}>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <PlatformLogo name={p.name} color={p.color} />
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '700', color: '#111' }}>
                        {p.name} <span style={{ fontSize: '10px', color: '#BBB', display: 'inline-block', transition: 'transform .2s', transform: isOpen ? 'rotate(180deg)' : 'none' }}>▾</span>
                      </div>
                      <div style={{ fontSize: '10px', fontWeight: '700', marginTop: '2px', color: p.type === 'DeFi' ? '#16A34A' : '#2563EB' }}>{p.type}</div>
                    </div>
                  </div>

                  <div style={{ fontSize: '17px', fontWeight: '700', color: '#111', letterSpacing: '-.3px' }}>{p.apr}%</div>

                  <div>
                    <div style={{ fontSize: '17px', fontWeight: '700', color: '#111', letterSpacing: '-.3px' }}>{p.ltv}%</div>
                    <div style={{ height: '2px', background: '#EBEBEB', borderRadius: '2px', marginTop: '6px', width: '52px' }}>
                      <div style={{ height: '100%', width: `${p.ltv}%`, background: p.color, borderRadius: '2px' }} />
                    </div>
                  </div>

                  <div style={{ fontSize: '17px', fontWeight: '700', color: '#16A34A', letterSpacing: '-.3px' }}>{mounted && price > 0 ? fmt(maxBorrow) + ' €' : '—'}</div>

                  <div>
                    <div style={{ fontSize: '17px', fontWeight: '700', color: '#DC2626', letterSpacing: '-.3px' }}>{mounted && price > 0 ? fmt(liqPrice) + ' €' : '—'}</div>
                    <div style={{ fontSize: '10px', color: '#888', marginTop: '2px' }}>par {c.symbol}</div>
                  </div>

                  <a href={p.link} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{
                    display: 'block', textAlign: 'center', padding: '9px 14px', borderRadius: '8px',
                    fontSize: '12px', fontWeight: '700', textDecoration: 'none', whiteSpace: 'nowrap',
                    background: '#fff', color: '#444',
                    border: '1.5px solid #DCDCDC',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#111'; e.currentTarget.style.color = '#111' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#DCDCDC'; e.currentTarget.style.color = '#444' }}
                  >Emprunter →</a>
                </div>

                {isOpen && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '20px', padding: '16px 20px 20px', background: '#FAFAFA', borderTop: '1px solid #EBEBEB' }}>
                    <div>
                      <div style={{ fontSize: '10px', fontWeight: '700', color: '#999', textTransform: 'uppercase', letterSpacing: '.7px', marginBottom: '4px' }}>Fondée en</div>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: '#111' }}>{p.founded}</div>
                      <div style={{ fontSize: '11px', color: '#666', marginTop: '2px' }}>{p.country}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '10px', fontWeight: '700', color: '#999', textTransform: 'uppercase', letterSpacing: '.7px', marginBottom: '4px' }}>Utilisateurs</div>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: '#111' }}>{p.users}</div>
                      <div style={{ fontSize: '11px', color: '#666', marginTop: '2px' }}>estimé</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '10px', fontWeight: '700', color: '#999', textTransform: 'uppercase', letterSpacing: '.7px', marginBottom: '6px' }}>Régulation</div>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: '700', color: p.regulated ? '#16A34A' : '#B45309', background: p.regulated ? '#F0FDF4' : '#FFFBEB', border: `1px solid ${p.regulated ? '#BBF7D0' : '#FDE68A'}`, padding: '3px 8px', borderRadius: '20px' }}>
                        {p.regulated ? '✓ Régulée' : '⚡ Décentralisé'}
                      </div>
                      <div style={{ fontSize: '11px', color: '#666', marginTop: '5px' }}>{p.regulated ? 'Entité légale identifiable' : 'Smart contracts audités'}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '10px', fontWeight: '700', color: '#999', textTransform: 'uppercase', letterSpacing: '.7px', marginBottom: '4px' }}>En bref</div>
                      <div style={{ fontSize: '12px', color: '#555', lineHeight: '1.6' }}>{p.about}</div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}

          <div style={{ display: 'flex', gap: '10px', padding: '14px 0', borderTop: '1px solid #EBEBEB', marginTop: '4px' }}>
            <span>🔍</span>
            <p style={{ fontSize: '11px', color: '#666', lineHeight: '1.6' }}>
              <strong style={{ color: '#444' }}>Indépendance éditoriale.</strong> Nantix compare objectivement les plateformes. Nous percevons une commission d'affiliation si vous utilisez nos liens — cela ne modifie pas les données ni notre classement.
            </p>
          </div>
        </div>

        {/* ── VENDRE VS EMPRUNTER ── */}
        <section style={{ borderTop: '1px solid #EBEBEB', padding: '52px 0' }}>
          <div style={wrap}>
            <div style={{ fontSize: '10px', fontWeight: '700', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Pourquoi emprunter ?</div>
            <h2 style={{ fontSize: '24px', fontWeight: '700', letterSpacing: '-.6px', color: '#111', marginBottom: '8px' }}>Gardez votre crypto. Accédez à vos liquidités.</h2>
            <p style={{ fontSize: '14px', color: '#555', lineHeight: '1.6', maxWidth: '500px', marginBottom: '28px' }}>Vendre votre Bitcoin déclenche un impôt sur les plus-values. Un prêt collatéralisé vous donne accès à des euros sans vente.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1px 1fr', border: '1px solid #EBEBEB', borderRadius: '10px', overflow: 'hidden', marginBottom: '20px' }}>
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

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px' }}>
              {[
                { icon: '🏦', t: 'Pas de vérification de crédit', d: 'Votre crypto est la garantie. Pas de score de crédit, approbation quasi-instantanée.' },
                { icon: '📈', t: 'Continuez à profiter de la hausse', d: 'Vous récupérez votre collatéral au remboursement. La plus-value reste la vôtre.' },
                { icon: '⚡', t: 'Liquidité immédiate', d: 'Fonds disponibles en quelques minutes sur CeFi, instantanément sur DeFi.' },
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
            <h2 style={{ fontSize: '24px', fontWeight: '700', letterSpacing: '-.6px', color: '#111', marginBottom: '28px' }}>Tout ce que vous devez savoir</h2>
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
            <h2 style={{ fontSize: '24px', fontWeight: '700', letterSpacing: '-.6px', color: '#111', marginBottom: '24px' }}>Comprendre les prêts crypto</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }}>
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
                <div style={{ fontSize: '20px', fontWeight: '700', color: '#111', letterSpacing: '-.4px', marginBottom: '6px' }}>Alerte taux gratuite</div>
                <div style={{ fontSize: '14px', color: '#555', lineHeight: '1.6', marginBottom: '8px' }}>Recevez une notification quand les taux changent. Maximum 1 email par semaine.</div>
                <div style={{ fontSize: '12px', color: '#888' }}>🔒 Pas de spam. Désabonnement en un clic.</div>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                <input type="email" placeholder="votre@email.com" style={{ border: '1px solid #E0E0E0', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', outline: 'none', width: '220px', color: '#111' }} />
                <button style={{ background: '#111', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 20px', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>M'alerter</button>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
