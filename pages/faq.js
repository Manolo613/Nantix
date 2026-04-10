import Head from 'next/head'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const FAQS = [
  {
    q: "Qu'est-ce qu'un prêt collatéralisé ?",
    a: "Un prêt collatéralisé consiste à déposer une cryptomonnaie (BTC, ETH) comme garantie auprès d'une plateforme, qui vous verse en échange des liquidités en stablecoins (USDC, USDT). Vous conservez votre crypto, remboursez le prêt avec intérêts, et votre collatéral vous est restitué.",
  },
  {
    q: "Qu'est-ce que le LTV (Loan-to-Value) ?",
    a: "Le LTV est le ratio entre la somme empruntée et la valeur de votre collatéral. Avec un LTV de 50% et 1 BTC à 80 000 € de valeur, vous pouvez emprunter jusqu'à 40 000 €. Plus le LTV est élevé, plus vous empruntez — mais plus le risque de liquidation est proche.",
  },
  {
    q: "Qu'est-ce que la liquidation ?",
    a: "Si le prix de votre crypto baisse et que votre LTV dépasse le seuil maximal autorisé, la plateforme vend automatiquement une partie de votre collatéral pour rembourser le prêt. Nantix affiche le prix exact de liquidation pour chaque plateforme afin que vous sachiez à quel niveau vous êtes exposé.",
  },
  {
    q: "Quelle est la différence entre CeFi et DeFi ?",
    a: "CeFi (Nexo, Ledn, YouHodler) : plateforme centralisée, interface simple, support client, KYC requis — mais la plateforme détient vos fonds. DeFi (Aave, Morpho) : smart contracts sur Ethereum, vous gardez le contrôle via un wallet. Plus technique, mais aucune entité ne peut geler ou saisir votre collatéral.",
  },
  {
    q: "Un prêt crypto est-il imposable en France ?",
    a: "Non, emprunter sur votre crypto n'est pas un événement imposable — vous ne vendez pas, donc pas d'imposition sur les plus-values. En revanche, une liquidation forcée du collatéral peut être assimilée à une cession taxable. Consultez un comptable spécialisé pour votre situation.",
  },
  {
    q: "Les taux affichés sont-ils à jour ?",
    a: "Les taux Aave et Morpho sont récupérés en temps réel via leurs APIs GraphQL et mis en cache toutes les heures. Les taux des plateformes CeFi (Nexo, Ledn, YouHodler, Nebeus) sont mis à jour manuellement — ils changent rarement.",
  },
  {
    q: "Quel est le montant minimum pour emprunter ?",
    a: "Sur CeFi (Nexo, Ledn, YouHodler), les minimums sont généralement autour de 500–1 000 €. Sur DeFi (Aave, Morpho), pas de minimum officiel, mais les frais de gas Ethereum rendent les petits montants peu rentables en dessous de ~5 000–10 000 €.",
  },
]

export default function FAQPage() {
  const [open, setOpen] = useState(null)

  return (
    <>
      <Head>
        <title>FAQ — Nantix</title>
        <meta name="description" content="Questions fréquentes sur les prêts crypto collatéralisés. LTV, liquidation, fiscalité, CeFi vs DeFi — des réponses claires." />
        <style>{`
          @keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
          .faq-item{transition:box-shadow .2s}
          .faq-item:hover{box-shadow:0 4px 20px rgba(0,0,0,.07)!important}
        `}</style>
      </Head>
      <Navbar />

      <main style={{ background: '#fff', minHeight: '100vh', paddingTop: '52px' }}>

        {/* HERO */}
        <section style={{ background: 'linear-gradient(160deg,#F8F9FA 0%,#fff 60%)', padding: '52px 0 40px' }}>
          <div style={{ maxWidth: '780px', margin: '0 auto', padding: '0 32px' }}>
            <div style={{ fontSize: '11px', fontWeight: '700', color: '#999', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>FAQ</div>
            <h1 style={{ fontSize: '42px', fontWeight: '800', letterSpacing: '-1.5px', color: '#111', lineHeight: '1.1', marginBottom: '14px' }}>
              Questions fréquentes
            </h1>
            <p style={{ fontSize: '15px', color: '#888', lineHeight: '1.7', maxWidth: '480px' }}>
              Tout ce qu'il faut savoir avant d'emprunter sur votre Bitcoin ou Ethereum.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: '48px 0 80px' }}>
          <div style={{ maxWidth: '780px', margin: '0 auto', padding: '0 32px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {FAQS.map((faq, i) => (
                <div
                  key={i}
                  className="faq-item"
                  onClick={() => setOpen(open === i ? null : i)}
                  style={{
                    background: '#fff',
                    borderRadius: '14px',
                    boxShadow: open === i ? '0 4px 20px rgba(0,0,0,.08)' : '0 1px 4px rgba(0,0,0,.05)',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    animation: 'fadeIn .3s ease both',
                    animationDelay: `${i * 0.04}s`,
                  }}
                >
                  <div style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
                    <span style={{ fontSize: '15px', fontWeight: '700', color: '#111', lineHeight: '1.45' }}>{faq.q}</span>
                    <span style={{
                      fontSize: '20px', fontWeight: '300', flexShrink: 0, marginTop: '1px',
                      color: open === i ? '#2563EB' : '#CCC',
                      display: 'inline-block',
                      transition: 'transform .2s, color .2s',
                      transform: open === i ? 'rotate(45deg)' : 'none',
                    }}>+</span>
                  </div>
                  {open === i && (
                    <div style={{ padding: '0 24px 20px', fontSize: '14px', color: '#555', lineHeight: '1.8', borderTop: '1px solid #F5F5F5', paddingTop: '16px' }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA bas */}
            <div style={{ marginTop: '48px', background: '#F8F9FA', borderRadius: '16px', padding: '36px 32px', textAlign: 'center' }}>
              <div style={{ fontSize: '18px', fontWeight: '800', color: '#111', letterSpacing: '-.4px', marginBottom: '8px' }}>
                Une autre question ?
              </div>
              <p style={{ fontSize: '13px', color: '#888', marginBottom: '20px' }}>
                Consultez notre blog ou utilisez directement le comparateur.
              </p>
              <a href="/" style={{ display: 'inline-block', background: '#2563EB', color: '#fff', fontWeight: '700', fontSize: '13px', padding: '11px 24px', borderRadius: '8px', textDecoration: 'none' }}>
                Voir le comparateur →
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
