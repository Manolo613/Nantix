import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
 
export default function ArticlePretBitcoin() {
  return (
    <>
      <Head>
        <title>Qu'est-ce qu'un prêt adossé au Bitcoin ? Guide complet 2025 — Nantix</title>
        <meta name="description" content="Tout comprendre sur le prêt collatéralisé Bitcoin : comment ça marche, quels sont les risques, combien peut-on emprunter. Guide complet en français." />
        <meta name="keywords" content="prêt bitcoin, emprunt crypto, nantissement bitcoin, prêt collatéralisé, bitcoin loan france" />
      </Head>
 
      <Navbar />
 
      <main style={{ paddingTop: '64px', background: 'var(--cream)' }}>
 
        {/* Hero article */}
        <section style={{ padding: '60px 40px 0', background: 'var(--cream)' }}>
          <div style={{ maxWidth: '740px', margin: '0 auto' }}>
 
            <Link href="/blog" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--ink-muted)',
              fontSize: '14px',
              marginBottom: '32px',
            }}>← Retour au blog</Link>
 
            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
              <span style={{
                fontSize: '11px',
                fontWeight: '700',
                padding: '4px 10px',
                borderRadius: '4px',
                background: '#EEF4FF',
                color: '#2D5BE3',
              }}>Guide</span>
              <span style={{ fontSize: '14px', color: 'var(--ink-muted)' }}>12 mars 2025</span>
              <span style={{ fontSize: '14px', color: 'var(--ink-muted)' }}>· 6 min de lecture</span>
            </div>
 
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: '500',
              color: 'var(--ink)',
              letterSpacing: '-1px',
              lineHeight: '1.15',
              marginBottom: '20px',
            }}>
              Qu'est-ce qu'un prêt adossé au Bitcoin ?
            </h1>
 
            <p style={{
              fontSize: '18px',
              color: 'var(--ink-muted)',
              lineHeight: '1.7',
              marginBottom: '48px',
              borderBottom: '1px solid var(--cream-border)',
              paddingBottom: '40px',
            }}>
              Vous détenez du Bitcoin et vous avez besoin de liquidités — mais vous ne voulez pas vendre. Le prêt collatéralisé est la solution. Voici tout ce que vous devez savoir avant de vous lancer.
            </p>
          </div>
        </section>
 
        {/* Contenu article */}
        <section style={{ padding: '0 40px 80px' }}>
          <div style={{ maxWidth: '740px', margin: '0 auto' }}>
 
            <div style={{ fontSize: '16px', lineHeight: '1.85', color: 'var(--ink-light)' }}>
 
              <h2 style={h2Style}>Le principe en une phrase</h2>
              <p style={pStyle}>
                Un prêt adossé au Bitcoin (ou prêt collatéralisé crypto) vous permet d'emprunter des euros en déposant votre Bitcoin comme garantie. Vous gardez votre BTC, vous recevez des liquidités, et vous remboursez le prêt avec intérêts quand vous le souhaitez.
              </p>
 
              <div style={calloutStyle}>
                <strong>Analogie simple :</strong> c'est exactement comme un prêt immobilier, mais au lieu de mettre votre appartement en garantie, vous mettez votre Bitcoin.
              </div>
 
              <h2 style={h2Style}>Pourquoi ne pas simplement vendre son Bitcoin ?</h2>
              <p style={pStyle}>
                C'est la question que tout le monde se pose. Il y a deux raisons principales pour lesquelles les détenteurs de Bitcoin préfèrent emprunter plutôt que vendre.
              </p>
              <p style={pStyle}>
                <strong>La fiscalité.</strong> En France, la vente de Bitcoin est soumise à la flat tax de 30% sur les plus-values. Si vous avez acheté 1 BTC à 10 000€ et qu'il vaut aujourd'hui 85 000€, vendre vous coûte 22 500€ d'impôts. Emprunter sur votre BTC n'est pas un événement fiscal — vous ne vendez pas, donc vous ne payez rien.
              </p>
              <p style={pStyle}>
                <strong>La conviction long terme.</strong> Si vous croyez que le Bitcoin vaut 200 000€ dans 3 ans, vendre aujourd'hui à 85 000€ vous fait passer à côté d'une plus-value future considérable. L'emprunt vous donne des liquidités maintenant sans sacrifier votre position.
              </p>
 
              <h2 style={h2Style}>Comment ça marche concrètement ?</h2>
              <p style={pStyle}>
                Le processus est simple et se passe entièrement en ligne. Voici les étapes typiques :
              </p>
 
              <ol style={{ paddingLeft: '24px', marginBottom: '24px' }}>
                {[
                  'Vous créez un compte sur une plateforme (Nexo, Ledn, ou un protocole DeFi comme Aave).',
                  'Vous déposez votre Bitcoin sur la plateforme — il sert de garantie.',
                  'Vous choisissez le montant à emprunter, dans la limite du LTV autorisé.',
                  'La plateforme vous verse les euros sur votre compte bancaire (CeFi) ou en stablecoins (DeFi).',
                  'Vous remboursez quand vous voulez, avec les intérêts courus.',
                  'Votre Bitcoin vous est restitué dès que le prêt est soldé.',
                ].map((item, i) => (
                  <li key={i} style={{ marginBottom: '12px', paddingLeft: '8px' }}>{item}</li>
                ))}
              </ol>
 
              <h2 style={h2Style}>Qu'est-ce que le LTV ?</h2>
              <p style={pStyle}>
                Le <strong>Loan-to-Value (LTV)</strong> est le ratio entre ce que vous empruntez et la valeur de votre collatéral. C'est le concept le plus important à comprendre avant de vous lancer.
              </p>
              <p style={pStyle}>
                Exemple concret : vous déposez 1 BTC valant 85 000€. La plateforme autorise un LTV de 50%. Vous pouvez donc emprunter au maximum 42 500€.
              </p>
 
              <div style={{
                background: 'var(--cream-dark)',
                border: '1px solid var(--cream-border)',
                borderRadius: '12px',
                padding: '24px',
                marginBottom: '28px',
              }}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: '500', marginBottom: '16px', color: 'var(--ink)' }}>
                  Comparaison des LTV par plateforme
                </p>
                {[
                  { name: 'Nexo', ltv: 50, apr: '13.9%' },
                  { name: 'Ledn', ltv: 50, apr: '11.9%' },
                  { name: 'Aave', ltv: 70, apr: '~4%' },
                  { name: 'Compound', ltv: 65, apr: '~5%' },
                ].map(p => (
                  <div key={p.name} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--cream-border)', fontSize: '14px' }}>
                    <span style={{ fontWeight: '600' }}>{p.name}</span>
                    <span>LTV max : <strong>{p.ltv}%</strong></span>
                    <span>APR : <strong>{p.apr}</strong></span>
                  </div>
                ))}
                <div style={{ marginTop: '12px' }}>
                  <Link href="/comparateur" style={{ fontSize: '13px', color: 'var(--teal)', fontWeight: '600' }}>
                    → Comparer en détail sur Nantix
                  </Link>
                </div>
              </div>
 
              <h2 style={h2Style}>Le risque principal : la liquidation</h2>
              <p style={pStyle}>
                C'est le risque que tout emprunteur doit comprendre. Si le prix du Bitcoin baisse fortement, votre LTV augmente mécaniquement — et si il dépasse un certain seuil, la plateforme peut <strong>liquider une partie de votre BTC</strong> pour couvrir le prêt.
              </p>
              <p style={pStyle}>
                Exemple : vous avez emprunté 42 500€ avec 1 BTC à 85 000€ (LTV 50%). Si le BTC tombe à 53 000€, votre LTV atteint 80% — zone de liquidation pour certaines plateformes.
              </p>
 
              <div style={{ ...calloutStyle, borderLeft: '4px solid #E53E3E', background: '#FFF5F5' }}>
                <strong>Comment éviter la liquidation ?</strong> Empruntez bien en dessous du LTV maximum. Si la plateforme autorise 50%, empruntez 30-35%. Vous aurez une marge de sécurité confortable même en cas de forte baisse du Bitcoin.
              </div>
 
              <h2 style={h2Style}>CeFi ou DeFi : quelle différence ?</h2>
              <p style={pStyle}>
                Il existe deux grandes catégories de plateformes pour emprunter sur votre Bitcoin.
              </p>
              <p style={pStyle}>
                <strong>CeFi (Finance Centralisée) :</strong> Nexo, Ledn. Ce sont des sociétés régulées, avec un service client, une interface simple et un versement en euros sur votre compte bancaire. Votre BTC est détenu par la société — vous lui faites confiance.
              </p>
              <p style={pStyle}>
                <strong>DeFi (Finance Décentralisée) :</strong> Aave, Compound. Ce sont des protocoles autonomes régis par des smart contracts. Pas d'intermédiaire humain, taux généralement plus bas, mais plus technique. Vous recevez des stablecoins (USDC, USDT) plutôt que des euros directement.
              </p>
 
              <h2 style={h2Style}>Conclusion : pour qui c'est fait ?</h2>
              <p style={pStyle}>
                Le prêt collatéralisé Bitcoin est idéal si vous êtes un détenteur long terme convaincu qui a besoin de liquidités sans vendre. C'est particulièrement pertinent pour financer un projet (immobilier, business) ou faire face à une dépense importante sans déclencher d'imposition.
              </p>
              <p style={pStyle}>
                Ce n'est pas adapté si votre Bitcoin représente la totalité de vos économies, ou si vous ne pouvez pas absorber une forte baisse de prix sans être liquidé.
              </p>
 
              <div style={{
                background: 'var(--teal)',
                borderRadius: '16px',
                padding: '32px',
                marginTop: '40px',
                textAlign: 'center',
              }}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '22px', color: 'white', marginBottom: '12px', fontWeight: '500' }}>
                  Prêt à comparer les plateformes ?
                </p>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', marginBottom: '20px' }}>
                  Utilisez notre comparateur pour trouver le meilleur taux selon votre montant.
                </p>
                <Link href="/comparateur" style={{
                  background: 'white',
                  color: 'var(--teal)',
                  padding: '12px 28px',
                  borderRadius: '8px',
                  fontWeight: '700',
                  fontSize: '15px',
                  display: 'inline-block',
                }}>Comparer maintenant →</Link>
              </div>
 
            </div>
          </div>
        </section>
      </main>
 
      <Footer />
    </>
  )
}
 
const h2Style = {
  fontFamily: 'var(--font-display)',
  fontSize: '24px',
  fontWeight: '500',
  color: 'var(--ink)',
  letterSpacing: '-0.3px',
  marginTop: '40px',
  marginBottom: '16px',
}
 
const pStyle = {
  marginBottom: '20px',
}
 
const calloutStyle = {
  background: 'var(--cream-dark)',
  borderLeft: '4px solid var(--teal)',
  borderRadius: '0 8px 8px 0',
  padding: '16px 20px',
  marginBottom: '24px',
  fontSize: '15px',
}
