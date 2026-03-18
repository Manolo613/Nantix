import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export default function ArticleLiquidation() {
  return (
    <>
      <Head>
        <title>Comment éviter la liquidation de son collatéral crypto — Nantix</title>
        <meta name="description" content="Comprendre et éviter la liquidation dans un prêt crypto collatéralisé. LTV, seuils, stratégies de protection. Guide pratique indépendant." />
      </Head>
      <Navbar />

      <main style={{ background: '#fff', minHeight: '100vh', paddingTop: '52px' }}>
        <article style={{ maxWidth: '720px', margin: '0 auto', padding: '48px 24px 80px' }}>

          <div style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Link href="/blog" style={{ fontSize: '12px', color: '#AAA', textDecoration: 'none' }}>Blog</Link>
              <span style={{ fontSize: '12px', color: '#DDD' }}>›</span>
              <span style={{ fontSize: '12px', color: '#AAA' }}>Risques</span>
            </div>
            <h1 style={{ fontSize: '36px', fontWeight: '800', letterSpacing: '-1.2px', color: '#111', lineHeight: '1.15', marginBottom: '16px' }}>
              Comment éviter la liquidation de son collatéral crypto
            </h1>
            <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.7', marginBottom: '20px' }}>
              La liquidation est le principal risque d'un prêt crypto collatéralisé. Comprendre comment elle se déclenche et comment la prévenir est essentiel avant d'emprunter.
            </p>
            <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: '#AAA', paddingBottom: '24px', borderBottom: '1px solid #F0F0F0' }}>
              <span>Risques · 6 min de lecture</span>
              <span>Mis à jour mars 2025</span>
            </div>
          </div>

          <div style={{ fontSize: '15px', color: '#333', lineHeight: '1.85' }}>

            <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#111', letterSpacing: '-0.5px', margin: '36px 0 14px' }}>Qu'est-ce que la liquidation ?</h2>
            <p style={{ marginBottom: '16px' }}>
              Quand vous empruntez contre votre Bitcoin, la plateforme surveille en permanence la valeur de votre collatéral par rapport au montant que vous avez emprunté. Ce ratio — le LTV — évolue avec le prix du marché. Si le Bitcoin baisse, votre LTV augmente mécaniquement, même si vous n'avez rien fait.
            </p>
            <p style={{ marginBottom: '16px' }}>
              Chaque plateforme fixe un seuil de liquidation — généralement entre 80% et 85% de LTV. Quand votre LTV réel atteint ce seuil, la plateforme vend automatiquement votre collatéral pour rembourser le prêt. Cette vente peut être partielle ou totale selon les conditions du protocole.
            </p>

            <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '10px', padding: '20px 24px', margin: '24px 0' }}>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#DC2626', marginBottom: '8px' }}>Exemple concret</div>
              <p style={{ fontSize: '14px', color: '#7F1D1D', lineHeight: '1.7', margin: 0 }}>
                Vous déposez 1 BTC à 80 000 € et empruntez 40 000 € (LTV 50%). Si le Bitcoin baisse à 50 000 €, votre LTV passe à 80% — le seuil de liquidation sur certaines plateformes. La plateforme vend votre BTC pour rembourser le prêt. Vous perdez votre exposition au marché au pire moment.
              </p>
            </div>

            <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#111', letterSpacing: '-0.5px', margin: '36px 0 14px' }}>Stratégie 1 : emprunter bien en dessous du maximum</h2>
            <p style={{ marginBottom: '16px' }}>
              C'est la protection la plus simple et la plus efficace. Si la plateforme vous autorise un LTV de 50%, empruntez à 30% ou 35%. Vous obtenez moins de liquidités, mais votre seuil de liquidation est beaucoup plus loin.
            </p>
            <p style={{ marginBottom: '16px' }}>
              Avec un LTV initial de 30% sur un Bitcoin à 80 000 €, la liquidation ne se déclenche qu'aux alentours de 30 000 € — une baisse de plus de 60%. Avec un LTV initial de 50%, elle peut survenir dès une baisse de 40%. Sur un actif aussi volatile que le Bitcoin, cette différence est considérable.
            </p>

            <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#111', letterSpacing: '-0.5px', margin: '36px 0 14px' }}>Stratégie 2 : surveiller son seuil de liquidation</h2>
            <p style={{ marginBottom: '16px' }}>
              La plupart des plateformes envoient des alertes email ou SMS quand votre LTV approche du seuil critique. Activez ces notifications systématiquement. Certaines plateformes comme Nexo proposent des alertes configurables à 60%, 70%, 80% de LTV — ce qui vous laisse le temps d'agir.
            </p>
            <p style={{ marginBottom: '16px' }}>
              Sur le comparateur Nantix, la colonne "Liquidation" affiche en temps réel le prix exact du Bitcoin en dessous duquel votre collatéral serait liquidé, selon le montant que vous saisissez. C'est un indicateur utile à consulter régulièrement.
            </p>

            <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#111', letterSpacing: '-0.5px', margin: '36px 0 14px' }}>Stratégie 3 : ajouter du collatéral ou rembourser partiellement</h2>
            <p style={{ marginBottom: '16px' }}>
              Si le prix baisse et que votre LTV se rapproche du seuil, vous avez généralement deux options avant la liquidation automatique : déposer du collatéral supplémentaire pour faire baisser votre LTV, ou rembourser une partie du prêt pour réduire le montant dû.
            </p>
            <p style={{ marginBottom: '16px' }}>
              Ces deux actions peuvent être effectuées à tout moment sur les plateformes CeFi et DeFi. Sur DeFi, elles se font directement via le protocole, instantanément, sans validation humaine nécessaire.
            </p>

            <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#111', letterSpacing: '-0.5px', margin: '36px 0 14px' }}>Ce que font les plateformes juste avant la liquidation</h2>
            <p style={{ marginBottom: '16px' }}>
              Sur les plateformes CeFi, le processus comporte généralement une fenêtre d'alerte. Nexo et Ledn envoient des notifications à plusieurs seuils avant la liquidation effective, et certaines plateformes accordent un délai de quelques heures pour régulariser.
            </p>
            <p style={{ marginBottom: '16px' }}>
              Sur DeFi, la liquidation est automatique et immédiate dès que le seuil est atteint. N'importe qui peut déclencher la liquidation d'une position sous-collatéralisée en échange d'une prime — c'est le mécanisme qui garantit la solvabilité du protocole. Il n'y a pas de délai de grâce.
            </p>

            <div style={{ background: '#FAFAFA', border: '1px solid #F0F0F0', borderRadius: '10px', padding: '24px', margin: '40px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: '15px', fontWeight: '700', color: '#111', marginBottom: '4px' }}>Calculez votre seuil de liquidation</div>
                <div style={{ fontSize: '13px', color: '#888' }}>Entrez votre montant et voyez le prix exact en temps réel.</div>
              </div>
              <Link href="/" style={{ padding: '10px 20px', background: '#111', color: '#fff', borderRadius: '8px', fontSize: '13px', fontWeight: '700', textDecoration: 'none', whiteSpace: 'nowrap' }}>
                Voir le comparateur →
              </Link>
            </div>

          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
