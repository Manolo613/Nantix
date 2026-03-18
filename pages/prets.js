import Head from 'next/head'
import { useState } from 'react'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const FAQ = [
  { q: "Qu'est-ce qu'un prêt crypto collatéralisé ?", a: "Un prêt collatéralisé consiste à déposer une cryptomonnaie (Bitcoin, Ethereum) comme garantie auprès d'une plateforme, qui verse en échange des liquidités en euros ou en stablecoins. Le collatéral est restitué au remboursement du prêt et des intérêts." },
  { q: "Quelle est la différence entre LTV et seuil de liquidation ?", a: "Le LTV (Loan-to-Value) est le ratio entre le montant emprunté et la valeur du collatéral. Si le LTV est de 50%, vous pouvez emprunter 50% de la valeur de votre dépôt. Le seuil de liquidation est le prix en dessous duquel la plateforme vend automatiquement votre collatéral pour couvrir le prêt." },
  { q: "Qu'est-ce que la liquidation ?", a: "Si le prix de votre crypto baisse et que votre LTV dépasse le seuil maximal autorisé, la plateforme procède à la liquidation : elle vend une partie ou la totalité de votre collatéral pour rembourser le prêt. Certaines plateformes envoient des alertes avant ce seuil." },
  { q: "CeFi ou DeFi — quelles différences pour un prêt ?", a: "Sur CeFi (Nexo, Ledn), la plateforme détient vos fonds et gère le processus. Sur DeFi (Aave, Compound), les smart contracts gèrent automatiquement le prêt sans intermédiaire. CeFi est plus simple mais expose à un risque de contrepartie. DeFi nécessite de maîtriser les wallets et les frais de gas." },
  { q: "Un prêt crypto est-il fiscalement neutre en France ?", a: "En France, recevoir des liquidités via un prêt collatéralisé n'est pas un événement imposable car il n'y a pas de cession de cryptomonnaies. En revanche, une liquidation forcée du collatéral peut être assimilée à une vente et déclencher une imposition sur la plus-value. Il est recommandé de consulter un comptable spécialisé." },
  { q: "Quel montant minimum pour un prêt crypto ?", a: "Sur CeFi, les minimums varient généralement entre 500 et 1 000 €. Sur DeFi, il n'y a pas de minimum officiel, mais les frais de transaction (gas) rendent les petits montants peu rentables en dessous de 5 000 € environ." },
]

const RISKS = [
  { level: 'Élevé', title: 'Liquidation du collatéral', desc: 'Si le prix de la crypto baisse sous le seuil de liquidation, la plateforme vend automatiquement le collatéral. Ce risque est inhérent à tous les prêts collatéralisés.' },
  { level: 'Moyen', title: 'Risque de contrepartie (CeFi)', desc: 'Sur les plateformes centralisées, les fonds sont détenus par la plateforme. Une faillite (comme FTX en 2022) peut entraîner la perte des actifs.' },
  { level: 'Moyen', title: 'Risque de smart contract (DeFi)', desc: 'Les protocoles DeFi s\'appuient sur du code. Une faille dans un smart contract peut entraîner la perte des fonds, même si les audits réduisent ce risque.' },
  { level: 'Faible', title: 'Volatilité des taux', desc: 'Sur DeFi, les taux varient selon l\'offre et la demande. Un taux affiché au moment de l\'emprunt peut évoluer significativement.' },
]

const riskColor = l => l === 'Élevé' ? { bg: '#FEF2F2', color: '#DC2626', border: '#FECACA' } : l === 'Moyen' ? { bg: '#FFFBEB', color: '#D97706', border: '#FDE68A' } : { bg: '#F0FDF4', color: '#16A34A', border: '#BBF7D0' }

export default function Prets() {
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <>
      <Head>
        <title>Nantix — Guide des prêts crypto collatéralisés</title>
        <meta name="description" content="Fonctionnement, risques et fiscalité des prêts crypto collatéralisés en France. Guide complet et indépendant." />
      </Head>
      <Navbar />

      <main style={{ background: '#fff', minHeight: '100vh', paddingTop: '52px' }}>
        {(() => {
          const wrap = { maxWidth: '800px', margin: '0 auto', padding: '0 24px' }

          return <>

            {/* HERO */}
            <section style={{ borderBottom: '1px solid #F0F0F0', padding: '48px 0 36px' }}>
              <div style={wrap}>
                <div style={{ fontSize: '10px', fontWeight: '700', color: '#AAA', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>Guide</div>
                <h1 style={{ fontSize: '42px', fontWeight: '800', letterSpacing: '-1.5px', color: '#111', lineHeight: '1.1', marginBottom: '16px' }}>
                  Prêts crypto collatéralisés :<br />
                  <span style={{ color: '#AAA', fontWeight: '400' }}>fonctionnement et risques.</span>
                </h1>
                <p style={{ fontSize: '15px', color: '#666', lineHeight: '1.8', marginBottom: '28px' }}>
                  Un prêt crypto collatéralisé permet d'obtenir des liquidités en déposant une cryptomonnaie comme garantie. Ce guide explique le fonctionnement, les risques et les différences entre les plateformes disponibles.
                </p>
                <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: '#111', color: '#fff', borderRadius: '8px', fontSize: '13px', fontWeight: '600', textDecoration: 'none' }}>
                  Voir le comparateur →
                </Link>
              </div>
            </section>

            {/* FONCTIONNEMENT */}
            <section style={{ padding: '48px 0', borderBottom: '1px solid #F0F0F0' }}>
              <div style={wrap}>
                <div style={{ fontSize: '10px', fontWeight: '700', color: '#AAA', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>Fonctionnement</div>
                <h2 style={{ fontSize: '24px', fontWeight: '700', letterSpacing: '-.6px', color: '#111', marginBottom: '20px' }}>Comment fonctionne un prêt collatéralisé ?</h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1px', background: '#F0F0F0', border: '1px solid #F0F0F0', borderRadius: '10px', overflow: 'hidden', marginBottom: '28px' }}>
                  {[
                    { n: '01', t: 'Dépôt du collatéral',  d: 'Vous déposez votre crypto (BTC, ETH…) sur la plateforme. Elle est bloquée pendant la durée du prêt.' },
                    { n: '02', t: 'Réception des fonds',   d: 'La plateforme vous verse des euros ou des stablecoins selon un ratio LTV (généralement 50–80%).' },
                    { n: '03', t: 'Remboursement',         d: 'Au remboursement du capital et des intérêts, votre collatéral vous est restitué intégralement.' },
                  ].map(s => (
                    <div key={s.n} style={{ background: '#fff', padding: '20px' }}>
                      <div style={{ fontSize: '11px', fontWeight: '800', color: '#CCC', marginBottom: '8px' }}>{s.n}</div>
                      <div style={{ fontSize: '13px', fontWeight: '700', color: '#111', marginBottom: '6px' }}>{s.t}</div>
                      <div style={{ fontSize: '12px', color: '#666', lineHeight: '1.7' }}>{s.d}</div>
                    </div>
                  ))}
                </div>

                <div style={{ border: '1px solid #F0F0F0', borderRadius: '10px', overflow: 'hidden' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1px 1fr' }}>
                    {[
                      { header: '✕ Vendre sa crypto', color: '#DC2626', rows: [['Impôt plus-values', '30% flat tax'], ['Exposition marché', 'Perdue'], ['Délai', '1–3 jours'], ['Montant net', '~70% après impôt']] },
                      null,
                      { header: '✓ Prêt collatéralisé', color: '#16A34A', rows: [['Impôt plus-values', 'Aucun'], ['Exposition marché', 'Conservée'], ['Délai', 'Quelques minutes'], ['Montant accessible', '50–80% du collatéral']] },
                    ].map((col, ci) => col === null
                      ? <div key={ci} style={{ background: '#F0F0F0' }} />
                      : (
                        <div key={ci} style={{ padding: '20px 24px' }}>
                          <div style={{ fontSize: '13px', fontWeight: '700', color: col.color, marginBottom: '16px' }}>{col.header}</div>
                          {col.rows.map(r => (
                            <div key={r[0]} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F5F5F5', fontSize: '13px' }}>
                              <span style={{ color: '#666' }}>{r[0]}</span>
                              <span style={{ fontWeight: '600', color: '#111' }}>{r[1]}</span>
                            </div>
                          ))}
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* RISQUES */}
            <section style={{ padding: '48px 0', borderBottom: '1px solid #F0F0F0' }}>
              <div style={wrap}>
                <div style={{ fontSize: '10px', fontWeight: '700', color: '#AAA', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>Risques</div>
                <h2 style={{ fontSize: '24px', fontWeight: '700', letterSpacing: '-.6px', color: '#111', marginBottom: '20px' }}>Principaux risques à connaître</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {RISKS.map(r => {
                    const c = riskColor(r.level)
                    return (
                      <div key={r.title} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', border: '1px solid #F0F0F0', borderRadius: '10px', padding: '16px 20px' }}>
                        <span style={{ fontSize: '11px', fontWeight: '700', padding: '3px 8px', borderRadius: '20px', background: c.bg, color: c.color, border: `1px solid ${c.border}`, flexShrink: 0, marginTop: '1px' }}>{r.level}</span>
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: '700', color: '#111', marginBottom: '4px' }}>{r.title}</div>
                          <div style={{ fontSize: '12px', color: '#666', lineHeight: '1.7' }}>{r.desc}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section style={{ padding: '48px 0' }}>
              <div style={wrap}>
                <div style={{ fontSize: '10px', fontWeight: '700', color: '#AAA', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>Questions fréquentes</div>
                <h2 style={{ fontSize: '24px', fontWeight: '700', letterSpacing: '-.6px', color: '#111', marginBottom: '24px' }}>Fonctionnement des prêts crypto</h2>
                {FAQ.map((item, i) => (
                  <div key={i} style={{ borderBottom: '1px solid #F0F0F0' }}>
                    <div onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ padding: '16px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', gap: '16px' }}>
                      <span style={{ fontSize: '14px', fontWeight: '600', color: '#111' }}>{item.q}</span>
                      <span style={{ fontSize: '12px', color: '#888', flexShrink: 0, transition: 'transform .2s', display: 'inline-block', transform: openFaq === i ? 'rotate(180deg)' : 'none' }}>▾</span>
                    </div>
                    {openFaq === i && <div style={{ paddingBottom: '16px', fontSize: '13px', color: '#555', lineHeight: '1.8' }}>{item.a}</div>}
                  </div>
                ))}
              </div>
            </section>

          </>
        })()}
      </main>
      <Footer />
    </>
  )
}
