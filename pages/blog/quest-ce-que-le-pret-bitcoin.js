import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export default function ArticlePretBitcoin() {
  return (
    <>
      <Head>
        <title>Qu'est-ce qu'un prêt adossé au Bitcoin ? Guide complet 2026 — Nantix</title>
        <meta name="description" content="Tout comprendre sur le prêt collatéralisé Bitcoin : comment ça marche, quels sont les risques, combien peut-on emprunter. Guide complet en français." />
      </Head>
      <Navbar />

      <main style={{ background: '#fff', minHeight: '100vh', paddingTop: '52px' }}>
        <article style={{ maxWidth: '720px', margin: '0 auto', padding: '48px 24px 80px' }}>

          <div style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Link href="/blog" style={{ fontSize: '12px', color: '#AAA', textDecoration: 'none' }}>Blog</Link>
              <span style={{ fontSize: '12px', color: '#DDD' }}>›</span>
              <span style={{ fontSize: '12px', color: '#AAA' }}>Guide</span>
            </div>
            <h1 style={{ fontSize: '36px', fontWeight: '800', letterSpacing: '-1.2px', color: '#111', lineHeight: '1.15', marginBottom: '16px' }}>
              Qu'est-ce qu'un prêt adossé au Bitcoin ?
            </h1>
            <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.7', marginBottom: '20px' }}>
              Vous détenez du Bitcoin et avez besoin de liquidités — mais vous ne voulez pas vendre. Le prêt collatéralisé est la solution. Voici tout ce que vous devez savoir avant de vous lancer.
            </p>
            <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: '#AAA', paddingBottom: '24px', borderBottom: '1px solid #F0F0F0' }}>
              <span>Guide · 5 min de lecture</span>
              <span>Mis à jour avr. 2026</span>
            </div>
          </div>

          <div style={{ fontSize: '15px', color: '#333', lineHeight: '1.85' }}>

            <h2 style={h2}>Le principe en une phrase</h2>
            <p style={p}>
              Un prêt collatéralisé Bitcoin vous permet d'emprunter des stablecoins (USDC, USDT) en déposant votre BTC comme garantie. Vous gardez votre Bitcoin, recevez des liquidités, et récupérez votre collatéral dès que vous remboursez le prêt avec intérêts.
            </p>

            <div style={callout}>
              <strong>Analogie simple :</strong> c'est comme un prêt immobilier, mais au lieu de mettre votre appartement en garantie, vous mettez votre Bitcoin.
            </div>

            <h2 style={h2}>Pourquoi ne pas simplement vendre son Bitcoin ?</h2>
            <p style={p}>
              <strong>L'imposition.</strong> En France, la vente de Bitcoin déclenche une imposition de 30% sur les plus-values. Si vous avez acheté 1 BTC à 10 000 € et qu'il vaut aujourd'hui 85 000 €, vendre vous coûte 22 500 € d'impôts. Emprunter sur votre BTC n'est pas un événement fiscal — vous ne vendez pas, donc vous ne payez rien.
            </p>
            <p style={p}>
              <strong>La conviction long terme.</strong> Si vous pensez que le Bitcoin vaudra plus dans 2 ou 3 ans, vendre aujourd'hui vous prive de cette plus-value future. L'emprunt vous donne des liquidités maintenant sans sacrifier votre position.
            </p>

            <h2 style={h2}>Comment ça marche concrètement ?</h2>
            <ol style={{ paddingLeft: '24px', marginBottom: '24px' }}>
              {[
                'Vous créez un compte sur une plateforme (Nexo, Ledn, ou un protocole DeFi comme Aave).',
                'Vous déposez votre Bitcoin — il sert de garantie.',
                'Vous choisissez le montant à emprunter, dans la limite du LTV autorisé.',
                'La plateforme vous verse les fonds en USDC ou USDT.',
                'Vous remboursez quand vous voulez, avec les intérêts courus.',
                'Votre Bitcoin vous est restitué dès que le prêt est soldé.',
              ].map((item, i) => (
                <li key={i} style={{ marginBottom: '12px', paddingLeft: '8px' }}>{item}</li>
              ))}
            </ol>

            <h2 style={h2}>Qu'est-ce que le LTV ?</h2>
            <p style={p}>
              Le <strong>Loan-to-Value (LTV)</strong> est le ratio entre ce que vous empruntez et la valeur de votre collatéral. C'est le concept le plus important à comprendre.
            </p>
            <p style={p}>
              Exemple : vous déposez 1 BTC valant 85 000 €. La plateforme autorise un LTV de 50%. Vous pouvez donc emprunter au maximum 42 500 €. Sur Nantix, vous pouvez simuler ce calcul en temps réel pour chaque plateforme.
            </p>

            <div style={{ background: '#F8F8F8', borderRadius: '10px', padding: '20px 24px', margin: '24px 0', borderLeft: '3px solid #111' }}>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#111', marginBottom: '8px' }}>À retenir</div>
              <p style={{ fontSize: '14px', color: '#555', lineHeight: '1.7', margin: 0 }}>
                Plus le LTV est élevé, plus vous empruntez — mais plus le risque de liquidation est proche. Un LTV de 30 à 40% offre une marge confortable même en cas de forte baisse du Bitcoin.
              </p>
            </div>

            <h2 style={h2}>Le risque principal : la liquidation</h2>
            <p style={p}>
              Si le prix du Bitcoin baisse, votre LTV augmente mécaniquement. Si il dépasse le seuil de liquidation (généralement 80–85%), la plateforme vend automatiquement votre BTC pour rembourser le prêt.
            </p>
            <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '10px', padding: '20px 24px', margin: '24px 0' }}>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#DC2626', marginBottom: '8px' }}>Exemple concret</div>
              <p style={{ fontSize: '14px', color: '#7F1D1D', lineHeight: '1.7', margin: 0 }}>
                Vous empruntez 42 500 € avec 1 BTC à 85 000 € (LTV 50%). Si le Bitcoin baisse à 53 000 €, votre LTV atteint 80% — zone de liquidation. La plateforme vend votre BTC au pire moment.
              </p>
            </div>

            <h2 style={h2}>CeFi ou DeFi : quelle différence ?</h2>
            <p style={p}>
              <strong>CeFi (Nexo, Ledn, YouHodler) :</strong> plateforme centralisée, interface simple, support client, KYC requis. Votre BTC est détenu par la société.
            </p>
            <p style={p}>
              <strong>DeFi (Aave, Morpho) :</strong> smart contracts sur Ethereum, vous gardez le contrôle via un wallet. Taux généralement plus bas, mais plus technique à utiliser.
            </p>

            <div style={{ background: '#FAFAFA', border: '1px solid #F0F0F0', borderRadius: '10px', padding: '24px', margin: '40px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: '15px', fontWeight: '700', color: '#111', marginBottom: '4px' }}>Comparez les 6 plateformes</div>
                <div style={{ fontSize: '13px', color: '#888' }}>Taux, LTV et seuils de liquidation en temps réel.</div>
              </div>
              <Link href="/" style={{ padding: '10px 20px', background: '#2563EB', color: '#fff', borderRadius: '8px', fontSize: '13px', fontWeight: '700', textDecoration: 'none', whiteSpace: 'nowrap' }}>
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

const h2 = { fontSize: '22px', fontWeight: '700', color: '#111', letterSpacing: '-0.5px', margin: '36px 0 14px' }
const p  = { marginBottom: '16px' }
const callout = { background: '#F8F9FA', borderLeft: '4px solid #2563EB', borderRadius: '0 8px 8px 0', padding: '16px 20px', marginBottom: '24px', fontSize: '15px' }
