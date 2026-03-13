import Head from 'next/head'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
 
const FAQS = [
  {
    q: 'Qu\'est-ce qu\'un prêt adossé au Bitcoin ?',
    a: 'Un prêt collatéralisé BTC vous permet d\'emprunter des euros en déposant votre Bitcoin comme garantie. Vous conservez votre BTC (qui continue de prendre de la valeur), et vous recevez des liquidités. Vous remboursez le prêt avec intérêts, et votre BTC vous est restitué.',
  },
  {
    q: 'Qu\'est-ce que le LTV (Loan-to-Value) ?',
    a: 'Le LTV représente le ratio entre la somme empruntée et la valeur de votre collatéral. Avec un LTV de 50% et 1 BTC à 80 000€ de valeur, vous pouvez emprunter jusqu\'à 40 000€. Plus le LTV est élevé, plus vous pouvez emprunter — mais plus le risque de liquidation est proche.',
  },
  {
    q: 'Qu\'est-ce que la liquidation ?',
    a: 'Si le prix du Bitcoin baisse et que votre LTV dépasse le seuil de liquidation, la plateforme peut vendre automatiquement votre BTC pour couvrir le prêt. C\'est le principal risque du prêt collatéralisé. Nantix affiche le prix de liquidation pour chaque plateforme afin que vous sachiez exactement à quel niveau vous êtes exposé.',
  },
  {
    q: 'Quelle est la différence entre CeFi et DeFi ?',
    a: 'CeFi (Finance Centralisée) : plateformes comme Nexo et Ledn, avec un service client, une interface simple et une régulation. Votre BTC est détenu par la société. DeFi (Finance Décentralisée) : protocoles comme Aave et Compound, entièrement automatisés par des smart contracts. Taux généralement plus bas, mais plus technique.',
  },
  {
    q: 'Est-ce que Nantix est payant ?',
    a: 'Non, Nantix est entièrement gratuit. Nous nous rémunérons via des commissions d\'affiliation lorsque vous cliquez sur un lien vers une plateforme partenaire. Cela ne biaise en aucun cas nos comparaisons — nous affichons toujours les données objectives.',
  },
  {
    q: 'Les taux affichés sont-ils en temps réel ?',
    a: 'Le prix du Bitcoin est récupéré en temps réel via l\'API CoinGecko. Les taux d\'emprunt (APR) des plateformes CeFi comme Nexo et Ledn sont fixes et mis à jour manuellement (ils changent rarement). Le taux Aave est variable et mis à jour régulièrement.',
  },
  {
    q: 'Un prêt Bitcoin est-il imposable en France ?',
    a: 'En France, le simple fait d\'emprunter sur votre BTC n\'est pas un événement fiscal — vous ne vendez pas votre BTC, donc pas de plus-value taxable. Cependant, ce sujet peut évoluer avec la réglementation. Consultez un expert comptable pour votre situation personnelle.',
  },
]
 
export default function FAQ() {
  const [open, setOpen] = useState(null)
 
  return (
    <>
      <Head>
        <title>FAQ — Nantix</title>
        <meta name="description" content="Questions fréquentes sur les prêts Bitcoin. LTV, liquidation, fiscalité, DeFi vs CeFi — toutes vos questions, des réponses claires." />
      </Head>
 
      <Navbar />
 
      <main style={{ paddingTop: '64px' }}>
        <section style={{ background: 'var(--cream)', padding: '60px 40px 80px' }}>
          <div style={{ maxWidth: '780px', margin: '0 auto' }}>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '48px',
              fontWeight: '500',
              color: 'var(--ink)',
              letterSpacing: '-1px',
              marginBottom: '12px',
            }}>Questions fréquentes</h1>
            <p style={{ color: 'var(--ink-muted)', fontSize: '16px', marginBottom: '48px' }}>
              Tout ce que vous devez savoir avant d'emprunter sur votre Bitcoin.
            </p>
 
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {FAQS.map((faq, i) => (
                <div key={i} style={{
                  background: 'var(--white)',
                  borderRadius: '12px',
                  border: '1px solid var(--cream-border)',
                  overflow: 'hidden',
                }}>
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    style={{
                      width: '100%',
                      padding: '20px 24px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <span style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '17px',
                      fontWeight: '500',
                      color: 'var(--ink)',
                      letterSpacing: '-0.2px',
                    }}>{faq.q}</span>
                    <span style={{
                      fontSize: '20px',
                      color: 'var(--teal)',
                      transform: open === i ? 'rotate(45deg)' : 'rotate(0)',
                      transition: 'transform 0.2s',
                      flexShrink: 0,
                      marginLeft: '16px',
                    }}>+</span>
                  </button>
 
                  {open === i && (
                    <div style={{
                      padding: '0 24px 20px',
                      color: 'var(--ink-muted)',
                      fontSize: '15px',
                      lineHeight: '1.7',
                      borderTop: '1px solid var(--cream-border)',
                      paddingTop: '16px',
                    }}>{faq.a}</div>
                  )}
                </div>
              ))}
            </div>
 
            <div style={{
              marginTop: '48px',
              padding: '32px',
              background: 'var(--cream-dark)',
              borderRadius: '16px',
              border: '1px solid var(--cream-border)',
              textAlign: 'center',
            }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: '500', color: 'var(--ink)', marginBottom: '8px' }}>
                Une autre question ?
              </p>
              <p style={{ color: 'var(--ink-muted)', fontSize: '15px', marginBottom: '16px' }}>
                Consultez notre blog ou utilisez directement le comparateur.
              </p>
              <a href="/comparateur" style={{
                display: 'inline-block',
                background: 'var(--teal)',
                color: 'white',
                padding: '12px 28px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
              }}>Voir le comparateur →</a>
            </div>
          </div>
        </section>
      </main>
 
      <Footer />
    </>
  )
}
