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
    { name: 'Nexo',     apr: 13.9, ltv: 50, liq: 83,   type: 'CeFi', color: '#0EA5E9', link: 'https://nexo.com',        best: false, founded: '2018', country: 'UE / Caïmans', users: '7M+',  regulated: true,  about: 'Plateforme CeFi régulée, 7M+ utilisateurs. Taux compétitifs avec système de fidélité NEXO token.' },
    { name: 'Ledn',     apr: 11.9, ltv: 50, liq: 80,   type: 'CeFi', color: '#0D4A45', link: 'https://ledn.io',          best: true,  founded: '2018', country: 'Canada',       users: '100K+',regulated: true,  about: 'Spécialiste Bitcoin. Proof-of-Reserves publique. Premier prêt hypothécaire adossé au BTC au monde.' },
    { name: 'Aave',     apr: 4.2,  ltv: 70, liq: 82.5, type: 'DeFi', color: '#B6509E', link: 'https://aave.com',         best: false, founded: '2020', country: 'Décentralisé', users: '500K+',regulated: false, about: 'Leader DeFi. Smart contracts audités. Pas de KYC, fonds toujours sous contrôle de l\'utilisateur.' },
    { name: 'Compound', apr: 5.1,  ltv: 65, liq: 80,   type: 'DeFi', color: '#00D395', link: 'https://compound.finance', best: false, founded: '2018', country: 'Décentralisé', users: '200K+',regulated: false, about: 'Protocole DeFi pionnier. Gouvernance décentralisée via token COMP. Taux variables selon l\'offre.' },
  ],
  ethereum: [
    { name: 'Nexo',     apr: 13.9, ltv: 50, liq: 83,   type: 'CeFi', color: '#0EA5E9', link: 'https://nexo.com',        best: false, founded: '2018', country: 'UE / Caïmans', users: '7M+',  regulated: true,  about: 'Plateforme CeFi régulée, 7M+ utilisateurs. Taux compétitifs avec système de fidélité NEXO token.' },
    { name: 'Aave',     apr: 3.8,  ltv: 80, liq: 82.5, type: 'DeFi', color: '#B6509E', link: 'https://aave.com',         best: true,  founded: '2020', country: 'Décentralisé', users: '500K+',regulated: false, about: 'Leader DeFi sur ETH. LTV la plus haute (80%). Smart contracts audités. Liquidité profonde.' },
    { name: 'Compound', apr: 4.5,  ltv: 75, liq: 80,   type: 'DeFi', color: '#00D395', link: 'https://compound.finance', best: false, founded: '2018', country: 'Décentralisé', users: '200K+',regulated: false, about: 'Protocole DeFi pionnier. Taux variables selon l\'offre et la demande. Gouvernance COMP.' },
    { name: 'Spark',    apr: 4.1,  ltv: 74, liq: 79,   type: 'DeFi', color: '#FF6B35', link: 'https://spark.fi',         best: false, founded: '2023', country: 'Décentralisé', users: '50K+', regulated: false, about: 'Protocole DeFi basé sur MakerDAO/Sky. Taux stables compétitifs. Spécialisé DAI/USDS.' },
  ],
}

const FAQ = [
  { q: "Que se passe-t-il si le prix de ma crypto baisse ?", a: "Si le prix baisse sous le seuil de liquidation, la plateforme vend automatiquement une partie de votre collatéral pour rembourser le prêt. Pour éviter cela : empruntez moins que le maximum autorisé (LTV faible = plus de sécurité) ou ajoutez du collatéral si le prix baisse." },
  { q: "Quelle est la différence entre CeFi et DeFi ?", a: "CeFi (Nexo, Ledn) : plateforme centralisée, vous déposez votre crypto chez eux. Plus simple, support client, mais ils détiennent vos fonds. DeFi (Aave, Compound) : smart contracts, vous gardez le contrôle de vos fonds. Plus technique, mais aucune entité ne peut geler vos actifs." },
  { q: "Est-ce que je dois payer des impôts sur un prêt crypto ?", a: "En France, un prêt collatéralisé n'est pas un événement imposable car vous ne vendez pas votre crypto. Vous ne payez pas la flat tax de 30%. En revanche, si votre collatéral est liquidé par la plateforme, cette liquidation peut être considérée comme une vente imposable. Consultez un comptable pour votre situation." },
  { q: "Quel est le montant minimum pour emprunter ?", a: "Cela varie par plateforme. Sur CeFi (Nexo, Ledn), les minimums sont généralement autour de 500–1 000 €. Sur DeFi (Aave, Compound), il n'y a pas de minimum officiel, mais les frais de gas Ethereum rendent les petits montants peu rentables en dessous de ~5 000 €." },
  { q: "Nantix est-il indépendant ?", a: "Oui. Nantix ne reçoit aucune rémunération des plateformes pour modifier les données affichées. Nous percevons une commission d'affiliation standard si vous vous inscrivez via nos liens — cela ne biaise pas notre comparaison. Toutes les plateformes sont évaluées selon les mêmes critères." },
]

const BLOG = [
  { tag: 'Guide',   title: "Qu'est-ce qu'un prêt Bitcoin collatéralisé ?",   date: '12 mars 2025',  read: '5 min', bg: '#FFF8F0', icon: '₿' },
  { tag: 'Analyse', title: 'CeFi vs DeFi : quel prêt choisir en 2025 ?',     date: '5 mars 2025',   read: '8 min', bg: '#F0FDF4', icon: '📊' },
  { tag: 'Risques', title: 'Comment éviter la liquidation de son collatéral', date: '28 fév 2025',   read: '6 min', bg: '#EFF6FF', icon: '⚠️' },
]

export default function Home() {
  const [crypto, setCrypto]   = useState('bitcoin')
  const [prices, setPrices]   = useState({})
  const [amount, setAmount]   = useState(1)
  const [mounted, setMounted] = useState(false)
  const [sort, setSort]       = useState('apr')
  const [filter, setFilter]   = useState('all')
  const [openRow, setOpenRow] = useState(null)
  const [openFaq, setOpenFaq] = useState(null)

  useEffect(() => {
    setMounted(true)
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=eur')
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

  const sep = <div style={{ width: '1px', height: '18px', background: '#E0E0E0' }} />

  return (
    <>
      <Head>
        <title>Nantix — Comparez les prêts Bitcoin & Ethereum</title>
        <meta name="description" content="Le seul comparateur francophone de prêts crypto collatéralisés. Comparez Nexo, Ledn, Aave, Compound en temps réel. Sans vendre, sans impôt." />
      </Head>
      <Navbar />

      <main style={{ background: '#fff', minHeight: '100vh', paddingTop: '52px' }}>

        {/* ── HERO ─────────────────────────────────────────── */}
        <section style={{ padding: '36px 32px 28px', borderBottom: '1px solid #F0F0F0' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '24px', marginBottom: '24px', flexWrap: 'wrap' }}>
            <div>
              <h1 style={{ fontSize: '30px', fontWeight: '800', letterSpacing: '-1px', color: '#111', lineHeight: '1.15', marginBottom: '10px' }}>
                Empruntez en euros.<br />
                <span style={{ color: '#AAA', fontWeight: '400' }}>Gardez votre crypto.</span>
              </h1>
              <p style={{ fontSize: '14px', color: '#AAA', lineHeight: '1.6', maxWidth: '440px' }}>
                Le seul comparateur francophone de prêts crypto collatéralisés — sans vendre, sans impôt sur les plus-values.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px', flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#AAA' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#16A34A', animation: 'pulse 2s infinite' }} />
                Prix mis à jour en temps réel
              </div>
              <div style={{ display: 'flex', border: '1px solid #F0F0F0', borderRadius: '10px', overflow: 'hidden' }}>
                {[{ v: '5', l: 'Plateformes' }, { v: '3,8%', l: 'Meilleur taux' }, { v: '80%', l: 'LTV max' }].map((s, i) => (
                  <div key={s.l} style={{ padding: '12px 20px', borderRight: i < 2 ? '1px solid #F0F0F0' : 'none' }}>
                    <div style={{ fontSize: '20px', fontWeight: '800', color: '#111', letterSpacing: '-0.6px' }}>{s.v}</div>
                    <div style={{ fontSize: '10px', color: '#AAA', marginTop: '2px' }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Étapes */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', border: '1px solid #F0F0F0', borderRadius: '10px', overflow: 'hidden' }}>
            {[
              { n: '01', t: 'Déposez votre crypto',  d: 'BTC ou ETH comme garantie.' },
              { n: '02', t: 'Comparez les offres',    d: 'Taux, LTV et liquidation.' },
              { n: '03', t: 'Recevez vos euros',      d: 'Directement sur votre compte.' },
            ].map((s, i) => (
              <div key={s.n} style={{ padding: '14px 20px', borderRight: i < 2 ? '1px solid #F0F0F0' : 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '11px', fontWeight: '800', color: '#DDD', letterSpacing: '0.5px', flexShrink: 0 }}>{s.n}</span>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#111' }}>{s.t}</div>
                  <div style={{ fontSize: '11px', color: '#AAA', marginTop: '2px' }}>{s.d}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── ENCADRÉ RISQUE ──────────────────────────────── */}
        <div style={{ padding: '16px 32px 0' }}>
          <div style={{ border: '1px solid #FEF3C7', background: '#FFFBEB', borderRadius: '8px', padding: '12px 16px', display: 'flex', gap: '10px' }}>
            <span style={{ fontSize: '14px', flexShrink: 0, marginTop: '1px' }}>⚠️</span>
            <div>
              <div style={{ fontSize: '12px', fontWeight: '700', color: '#92400E', marginBottom: '3px' }}>Comprendre le risque de liquidation</div>
              <div style={{ fontSize: '11px', color: '#B45309', lineHeight: '1.6' }}>
                Si le prix de votre crypto baisse sous le seuil de liquidation, la plateforme vend automatiquement votre collatéral pour rembourser le prêt. La colonne <strong>Liquidation</strong> indique le prix exact auquel cela se produirait avec votre montant actuel.
              </div>
            </div>
          </div>
        </div>

        {/* ── TOOLBAR ─────────────────────────────────────── */}
        <section style={{ padding: '12px 32px', borderBottom: '1px solid #F0F0F0', borderTop: '1px solid #F0F0F0', marginTop: '16px', background: '#FAFAFA', display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>

          <div style={{ display: 'flex', gap: '8px' }}>
            {CRYPTOS.map(x => (
              <button key={x.id} onClick={() => { setCrypto(x.id); setAmount(1); setFilter('all') }} style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '6px 13px', borderRadius: '20px',
                border: `1px solid ${crypto === x.id ? x.color : '#E8E8E8'}`,
                background: crypto === x.id ? `${x.color}14` : '#fff',
                cursor: 'pointer', fontSize: '13px', fontWeight: '600',
                color: crypto === x.id ? x.color : '#999', transition: 'all .15s',
              }}>
                <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: x.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '7px', fontWeight: '800', color: '#fff', flexShrink: 0 }}>{x.symbol[0]}</div>
                {x.name} <span style={{ fontSize: '11px', opacity: 0.35 }}>{x.symbol}</span>
              </button>
            ))}
          </div>

          {sep}

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', background: '#fff', border: '1px solid #E8E8E8', borderRadius: '8px', overflow: 'hidden' }}>
              <div style={{ width: '24px', height: '24px', margin: '4px', borderRadius: '5px', background: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '7px', fontWeight: '800', color: '#fff', flexShrink: 0 }}>{c.symbol[0]}</div>
              <input type="number" value={amount} onChange={e => setAmount(Math.max(0.001, parseFloat(e.target.value) || 0))} step="0.1"
                style={{ border: 'none', padding: '6px 8px', fontSize: '14px', width: '72px', outline: 'none', color: '#111', background: 'transparent', fontWeight: '700' }} />
              <span style={{ padding: '0 8px', fontSize: '11px', fontWeight: '600', color: '#CCC' }}>{c.symbol}</span>
            </div>
            <span style={{ fontSize: '12px', color: '#AAA', whiteSpace: 'nowrap' }}>≈ {mounted && price > 0 ? fmt(col) : '—'} €</span>
          </div>

          {sep}

          <div style={{ display: 'flex', background: '#EFEFEF', borderRadius: '8px', padding: '2px' }}>
            {['all', 'CeFi', 'DeFi'].map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{
                padding: '5px 12px', fontSize: '12px', fontWeight: '600',
                background: filter === f ? '#fff' : 'transparent',
                color: filter === f ? '#111' : '#999',
                border: 'none', cursor: 'pointer', borderRadius: '6px',
                boxShadow: filter === f ? '0 1px 3px rgba(0,0,0,.08)' : 'none',
                transition: 'all .15s',
              }}>{f === 'all' ? 'Tout' : f}</button>
            ))}
          </div>

          <select value={sort} onChange={e => setSort(e.target.value)} style={{ border: '1px solid #E8E8E8', borderRadius: '8px', padding: '6px 10px', fontSize: '12px', background: '#fff', color: '#111', cursor: 'pointer', outline: 'none', marginLeft: 'auto' }}>
            <option value="apr">Meilleur taux</option>
            <option value="ltv">LTV maximum</option>
          </select>

          <span style={{ fontSize: '11px', color: '#CCC', whiteSpace: 'nowrap' }}>Mis à jour le {today}</span>
        </section>

        {/* ── TABLEAU ─────────────────────────────────────── */}
        <section style={{ padding: '0 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 100px 100px 1fr 1fr 120px', padding: '8px 12px', fontSize: '10px', fontWeight: '700', color: '#CCC', textTransform: 'uppercase', letterSpacing: '.9px', borderBottom: '1px solid #F0F0F0' }}>
            <span>Plateforme</span><span>Taux / an</span><span>LTV max</span><span>Emprunt max</span><span>Liquidation {c.symbol}</span><span></span>
          </div>

          {rows.map((p, i) => {
            const maxBorrow = (col * p.ltv) / 100
            const liqPrice  = price > 0 ? (col * (p.liq / 100)) / amount : 0
            const isOpen    = openRow === p.name

            return (
              <div key={p.name} style={{ borderBottom: i < rows.length - 1 ? '1px solid #F7F7F7' : 'none' }}>
                {/* Ligne principale */}
                <div
                  onClick={() => setOpenRow(isOpen ? null : p.name)}
                  style={{ display: 'grid', gridTemplateColumns: '200px 100px 100px 1fr 1fr 120px', padding: '18px 12px', alignItems: 'center', background: p.best ? '#FAFAFA' : '#fff', cursor: 'pointer', transition: 'background .1s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#FAFAFA'}
                  onMouseLeave={e => e.currentTarget.style.background = p.best ? '#FAFAFA' : '#fff'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '9px', background: p.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '800', fontSize: '14px', flexShrink: 0 }}>{p.name[0]}</div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '700', color: '#111', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {p.name}
                        <span style={{ fontSize: '10px', color: '#CCC', transition: 'transform .2s', display: 'inline-block', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>▾</span>
                      </div>
                      <div style={{ fontSize: '10px', fontWeight: '700', marginTop: '2px', color: p.type === 'DeFi' ? '#16A34A' : '#2563EB' }}>{p.type}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: '700', color: '#111', letterSpacing: '-.3px' }}>{p.apr}%</div>
                  <div>
                    <div style={{ fontSize: '16px', fontWeight: '700', color: '#111', letterSpacing: '-.3px' }}>{p.ltv}%</div>
                    <div style={{ height: '2px', background: '#F0F0F0', borderRadius: '2px', marginTop: '5px', width: '52px' }}>
                      <div style={{ height: '100%', width: `${p.ltv}%`, background: p.color, borderRadius: '2px' }} />
                    </div>
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: '700', color: '#16A34A', letterSpacing: '-.3px' }}>{mounted && price > 0 ? fmt(maxBorrow) + ' €' : '—'}</div>
                  <div>
                    <div style={{ fontSize: '16px', fontWeight: '700', color: '#DC2626', letterSpacing: '-.3px' }}>{mounted && price > 0 ? fmt(liqPrice) + ' €' : '—'}</div>
                    <div style={{ fontSize: '10px', color: '#CCC', marginTop: '2px' }}>par {c.symbol}</div>
                  </div>
                  <a href={p.link} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{
                    display: 'block', textAlign: 'center', padding: '8px 12px', borderRadius: '8px',
                    fontSize: '12px', fontWeight: '700', textDecoration: 'none', whiteSpace: 'nowrap',
                    background: p.best ? '#111' : '#fff', color: p.best ? '#fff' : '#555',
                    border: `1.5px solid ${p.best ? '#111' : '#E0E0E0'}`, transition: 'all .15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#111'; e.currentTarget.style.color = p.best ? '#fff' : '#111' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = p.best ? '#111' : '#E0E0E0'; e.currentTarget.style.color = p.best ? '#fff' : '#555' }}
                  >Emprunter →</a>
                </div>

                {/* Fiche détaillée */}
                {isOpen && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '20px', padding: '16px 20px 20px', background: '#FAFAFA', borderTop: '1px solid #F0F0F0' }}>
                    <div>
                      <div style={{ fontSize: '10px', fontWeight: '700', color: '#BBB', textTransform: 'uppercase', letterSpacing: '.7px', marginBottom: '4px' }}>Fondée en</div>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: '#111' }}>{p.founded}</div>
                      <div style={{ fontSize: '11px', color: '#AAA', marginTop: '2px' }}>{p.country}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '10px', fontWeight: '700', color: '#BBB', textTransform: 'uppercase', letterSpacing: '.7px', marginBottom: '4px' }}>Utilisateurs</div>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: '#111' }}>{p.users}</div>
                      <div style={{ fontSize: '11px', color: '#AAA', marginTop: '2px' }}>estimé</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '10px', fontWeight: '700', color: '#BBB', textTransform: 'uppercase', letterSpacing: '.7px', marginBottom: '6px' }}>Régulation</div>
                      <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: '4px',
                        fontSize: '11px', fontWeight: '700',
                        color: p.regulated ? '#16A34A' : '#B45309',
                        background: p.regulated ? '#F0FDF4' : '#FFFBEB',
                        border: `1px solid ${p.regulated ? '#BBF7D0' : '#FDE68A'}`,
                        padding: '3px 8px', borderRadius: '20px',
                      }}>
                        {p.regulated ? '✓ Régulée' : '⚡ Décentralisé'}
                      </div>
                      <div style={{ fontSize: '11px', color: '#AAA', marginTop: '6px' }}>{p.regulated ? 'Entité légale identifiable' : 'Smart contracts audités'}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '10px', fontWeight: '700', color: '#BBB', textTransform: 'uppercase', letterSpacing: '.7px', marginBottom: '4px' }}>En bref</div>
                      <div style={{ fontSize: '12px', color: '#888', lineHeight: '1.6' }}>{p.about}</div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </section>

        {/* ── TRANSPARENCE ────────────────────────────────── */}
        <div style={{ margin: '0 32px 0', borderTop: '1px solid #F0F0F0', padding: '14px 0' }}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '14px', flexShrink: 0 }}>🔍</span>
            <p style={{ fontSize: '11px', color: '#AAA', lineHeight: '1.6' }}>
              <strong style={{ color: '#666' }}>Indépendance éditoriale.</strong> Nantix compare objectivement les plateformes. Nous percevons une commission d'affiliation si vous utilisez nos liens — cela ne modifie pas les données affichées ni notre classement.
            </p>
          </div>
        </div>

        {/* ── VENDRE VS EMPRUNTER ─────────────────────────── */}
        <section style={{ padding: '48px 32px', borderTop: '1px solid #F0F0F0' }}>
          <div style={{ fontSize: '10px', fontWeight: '700', color: '#CCC', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Pourquoi emprunter ?</div>
          <h2 style={{ fontSize: '22px', fontWeight: '700', letterSpacing: '-.6px', color: '#111', marginBottom: '8px' }}>Gardez votre crypto. Accédez à vos liquidités.</h2>
          <p style={{ fontSize: '13px', color: '#AAA', lineHeight: '1.6', maxWidth: '520px', marginBottom: '28px' }}>Vendre votre Bitcoin déclenche un impôt sur les plus-values. Un prêt collatéralisé vous donne accès à des euros sans vente.</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1px 1fr', border: '1px solid #F0F0F0', borderRadius: '10px', overflow: 'hidden', marginBottom: '24px' }}>
            {[
              { header: '✕ Vendre votre crypto', bad: true, rows: [['Impôt plus-values', '30% flat tax', true], ['Exposition marché', 'Perdue', true], ['Délai', '1–3 jours', false], ['Montant net', '~70% après impôt', true]] },
              { header: '✓ Prêt collatéralisé', bad: false, rows: [['Impôt plus-values', 'Aucun', false], ['Exposition marché', 'Conservée', false], ['Délai', 'Quelques minutes', false], ['Montant accessible', '50–80% du collatéral', false]] },
            ].map((col, ci) => (
              ci === 0 ? (
                <div key={ci} style={{ padding: '20px 24px' }}>
                  <div style={{ fontSize: '12px', fontWeight: '700', color: '#DC2626', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>{col.header}</div>
                  {col.rows.map(r => (
                    <div key={r[0]} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F7F7F7', fontSize: '13px' }}>
                      <span style={{ color: '#888' }}>{r[0]}</span>
                      <span style={{ fontWeight: '600', color: r[2] ? '#DC2626' : '#111' }}>{r[1]}</span>
                    </div>
                  ))}
                </div>
              ) : ci === 1 ? (
                <div key={ci} style={{ background: '#F0F0F0' }} />
              ) : (
                <div key={ci} style={{ padding: '20px 24px' }}>
                  <div style={{ fontSize: '12px', fontWeight: '700', color: '#16A34A', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>{col.header}</div>
                  {col.rows.map(r => (
                    <div key={r[0]} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F7F7F7', fontSize: '13px' }}>
                      <span style={{ color: '#888' }}>{r[0]}</span>
                      <span style={{ fontWeight: '600', color: '#16A34A' }}>{r[1]}</span>
                    </div>
                  ))}
                </div>
              )
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px' }}>
            {[
              { icon: '🏦', t: 'Pas de vérification de crédit', d: 'Votre crypto est la garantie. Pas de score de crédit, pas de justificatifs de revenus.' },
              { icon: '📈', t: 'Continuez à profiter de la hausse', d: 'Vous récupérez votre collatéral à remboursement. La plus-value reste la vôtre.' },
              { icon: '⚡', t: 'Liquidité immédiate', d: 'Fonds disponibles en quelques minutes sur CeFi, instantanément en stablecoin sur DeFi.' },
            ].map(card => (
              <div key={card.t} style={{ border: '1px solid #F0F0F0', borderRadius: '10px', padding: '18px 20px' }}>
                <div style={{ fontSize: '20px', marginBottom: '10px' }}>{card.icon}</div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#111', marginBottom: '6px' }}>{card.t}</div>
                <div style={{ fontSize: '12px', color: '#AAA', lineHeight: '1.6' }}>{card.d}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ─────────────────────────────────────────── */}
        <section style={{ padding: '48px 32px', borderTop: '1px solid #F0F0F0' }}>
          <div style={{ fontSize: '10px', fontWeight: '700', color: '#CCC', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Questions fréquentes</div>
          <h2 style={{ fontSize: '22px', fontWeight: '700', letterSpacing: '-.6px', color: '#111', marginBottom: '28px' }}>Tout ce que vous devez savoir</h2>
          {FAQ.map((item, i) => (
            <div key={i} style={{ borderBottom: '1px solid #F0F0F0' }}>
              <div onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ padding: '16px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', gap: '16px' }}>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>{item.q}</span>
                <span style={{ fontSize: '12px', color: '#CCC', flexShrink: 0, transition: 'transform .2s', display: 'inline-block', transform: openFaq === i ? 'rotate(180deg)' : 'none' }}>▾</span>
              </div>
              {openFaq === i && (
                <div style={{ paddingBottom: '16px', fontSize: '13px', color: '#888', lineHeight: '1.7' }}>{item.a}</div>
              )}
            </div>
          ))}
        </section>

        {/* ── BLOG ────────────────────────────────────────── */}
        <section style={{ padding: '48px 32px', borderTop: '1px solid #F0F0F0' }}>
          <div style={{ fontSize: '10px', fontWeight: '700', color: '#CCC', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Ressources</div>
          <h2 style={{ fontSize: '22px', fontWeight: '700', letterSpacing: '-.6px', color: '#111', marginBottom: '24px' }}>Comprendre les prêts crypto</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }}>
            {BLOG.map(b => (
              <div key={b.title} style={{ border: '1px solid #F0F0F0', borderRadius: '10px', overflow: 'hidden', cursor: 'pointer', transition: 'box-shadow .15s' }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,.06)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
                <div style={{ height: '80px', background: b.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>{b.icon}</div>
                <div style={{ padding: '14px 16px' }}>
                  <div style={{ fontSize: '10px', fontWeight: '700', color: '#AAA', textTransform: 'uppercase', letterSpacing: '.7px', marginBottom: '6px' }}>{b.tag}</div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#111', lineHeight: '1.4', marginBottom: '6px' }}>{b.title}</div>
                  <div style={{ fontSize: '11px', color: '#CCC' }}>{b.date} · {b.read}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── NEWSLETTER ──────────────────────────────────── */}
        <section style={{ padding: '48px 32px', borderTop: '1px solid #F0F0F0' }}>
          <div style={{ background: '#FAFAFA', border: '1px solid #F0F0F0', borderRadius: '12px', padding: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '32px', flexWrap: 'wrap' }}>
            <div style={{ maxWidth: '420px' }}>
              <div style={{ fontSize: '18px', fontWeight: '700', color: '#111', letterSpacing: '-.4px', marginBottom: '6px' }}>Alerte taux gratuite</div>
              <div style={{ fontSize: '13px', color: '#AAA', lineHeight: '1.6', marginBottom: '8px' }}>Recevez une notification quand les taux changent significativement. Maximum 1 email par semaine.</div>
              <div style={{ fontSize: '11px', color: '#CCC' }}>🔒 Pas de spam. Désabonnement en un clic.</div>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
              <input type="email" placeholder="votre@email.com" style={{ border: '1px solid #E0E0E0', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', outline: 'none', width: '220px', color: '#111' }} />
              <button style={{ background: '#111', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 18px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap' }}>M'alerter</button>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
