import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export default function ArticleCeFiDeFi() {
  return (
    <>
      <Head>
        <title>CeFi vs DeFi : quel prêt crypto choisir en 2025 ? — Nantix</title>
        <meta name="description" content="Différences entre prêts CeFi et DeFi en crypto. Nexo, Ledn vs Aave, Compound : sécurité, taux, conditions. Guide comparatif indépendant." />
      </Head>
      <Navbar />

      <main style={{ background: '#fff', minHeight: '100vh', paddingTop: '52px' }}>
        <article style={{ maxWidth: '720px', margin: '0 auto', padding: '48px 24px 80px' }}>

          <div style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Link href="/blog" style={{ fontSize: '12px', color: '#AAA', textDecoration: 'none' }}>Blog</Link>
              <span style={{ fontSize: '12px', color: '#DDD' }}>›</span>
              <span style={{ fontSize: '12px', color: '#AAA' }}>Analyse</span>
            </div>
            <h1 style={{ fontSize: '36px', fontWeight: '800', letterSpacing: '-1.2px', color: '#111', lineHeight: '1.15', marginBottom: '16px' }}>
              CeFi vs DeFi : quel prêt crypto choisir en 2025 ?
            </h1>
            <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.7', marginBottom: '20px' }}>
              Nexo et Ledn d'un côté, Aave et Compound de l'autre. Les deux permettent d'emprunter sur sa crypto — mais leur fonctionnement, leurs risques et leurs conditions sont fondamentalement différents.
            </p>
            <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: '#AAA', paddingBottom: '24px', borderBottom: '1px solid #F0F0F0' }}>
              <span>Analyse · 8 min de lecture</span>
              <span>Mis à jour mars 2025</span>
            </div>
          </div>

          <div style={{ fontSize: '15px', color: '#333', lineHeight: '1.85' }}>

            <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#111', letterSpacing: '-0.5px', margin: '36px 0 14px' }}>Ce que CeFi et DeFi ont en commun</h2>
            <p style={{ marginBottom: '16px' }}>
              Dans les deux cas, le principe est identique : vous déposez une crypto comme collatéral et recevez des liquidités en échange. Les intérêts s'accumulent, et vous récupérez votre collatéral au remboursement. Ce mécanisme de base ne change pas selon que vous passez par Nexo ou par Aave.
            </p>
            <p style={{ marginBottom: '16px' }}>
              La différence fondamentale tient à une question simple : qui détient vos fonds pendant la durée du prêt, et qui exécute les conditions du contrat ?
            </p>

            <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#111', letterSpacing: '-0.5px', margin: '36px 0 14px' }}>Le modèle CeFi : simplicité contre contrepartie</h2>
            <p style={{ marginBottom: '16px' }}>
              Sur une plateforme centralisée comme Nexo ou Ledn, vous faites confiance à une entreprise. Elle détient votre collatéral, gère le prêt, surveille le LTV, et procède à la liquidation si nécessaire. En contrepartie, elle vous offre une interface claire, un support client joignable, et souvent des taux fixes ou prévisibles.
            </p>
            <p style={{ marginBottom: '16px' }}>
              Le risque majeur de ce modèle est le risque de contrepartie. La faillite de Celsius en 2022 a rappelé brutalement que confier ses fonds à une plateforme centralisée n'est pas sans danger. Même si Nexo et Ledn ont des structures différentes — Ledn publie notamment une Proof-of-Reserves régulière — le risque existe structurellement.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', margin: '24px 0' }}>
              {[
                { title: 'Avantages CeFi', items: ['Interface simple, pas de wallet requis', 'Support client disponible', 'Taux souvent fixes ou garantis', 'Processus proche d\'une banque'], color: '#F0FDF4', border: '#BBF7D0', tc: '#16A34A' },
                { title: 'Inconvénients CeFi', items: ['Fonds détenus par un tiers', 'KYC obligatoire', 'Risque de faillite plateforme', 'Moins de transparence on-chain'], color: '#FEF2F2', border: '#FECACA', tc: '#DC2626' },
              ].map(col => (
                <div key={col.title} style={{ background: col.color, border: `1px solid ${col.border}`, borderRadius: '10px', padding: '16px 18px' }}>
                  <div style={{ fontSize: '12px', fontWeight: '700', color: col.tc, marginBottom: '10px' }}>{col.title}</div>
                  {col.items.map(item => (
                    <div key={item} style={{ fontSize: '13px', color: '#444', marginBottom: '6px', paddingLeft: '12px', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0, color: col.tc }}>·</span>
                      {item}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#111', letterSpacing: '-0.5px', margin: '36px 0 14px' }}>Le modèle DeFi : autonomie contre complexité</h2>
            <p style={{ marginBottom: '16px' }}>
              Sur Aave ou Compound, il n'y a pas d'entreprise qui détient vos fonds. Tout est géré par des smart contracts — du code déployé sur la blockchain qui exécute automatiquement les conditions convenues. Personne ne peut bloquer votre accès, geler vos actifs, ou faire faillite au sens traditionnel du terme.
            </p>
            <p style={{ marginBottom: '16px' }}>
              En échange de cette autonomie, vous assumez la responsabilité technique. Vous avez besoin d'un wallet compatible, de comprendre les frais de gas, et d'interagir directement avec des interfaces qui supposent une certaine familiarité avec l'écosystème. Les taux sont variables — déterminés algorithmiquement selon l'offre et la demande sur le protocole.
            </p>
            <p style={{ marginBottom: '16px' }}>
              Le risque de smart contract est réel, même si les protocoles majeurs comme Aave sont audités en permanence par plusieurs firmes indépendantes. Une faille dans le code, même mineure, peut exposer les fonds déposés.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', margin: '24px 0' }}>
              {[
                { title: 'Avantages DeFi', items: ['Fonds jamais détenus par un tiers', 'Pas de KYC requis', 'Transparence totale on-chain', 'LTV souvent plus élevé'], color: '#F0FDF4', border: '#BBF7D0', tc: '#16A34A' },
                { title: 'Inconvénients DeFi', items: ['Wallet et gas requis', 'Interface plus technique', 'Taux variables', 'Risque de faille smart contract'], color: '#FEF2F2', border: '#FECACA', tc: '#DC2626' },
              ].map(col => (
                <div key={col.title} style={{ background: col.color, border: `1px solid ${col.border}`, borderRadius: '10px', padding: '16px 18px' }}>
                  <div style={{ fontSize: '12px', fontWeight: '700', color: col.tc, marginBottom: '10px' }}>{col.title}</div>
                  {col.items.map(item => (
                    <div key={item} style={{ fontSize: '13px', color: '#444', marginBottom: '6px', paddingLeft: '12px', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0, color: col.tc }}>·</span>
                      {item}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#111', letterSpacing: '-0.5px', margin: '36px 0 14px' }}>Les taux : DeFi moins cher, mais plus imprévisible</h2>
            <p style={{ marginBottom: '16px' }}>
              En 2025, les taux DeFi sur Bitcoin et Ethereum sont significativement inférieurs aux taux CeFi. Aave affiche généralement des taux entre 3% et 6% annuels, contre 11% à 14% sur Nexo ou Ledn. L'écart s'explique par la structure des deux modèles : les plateformes CeFi ont des coûts opérationnels et des marges à maintenir, là où les protocoles DeFi fixent les taux algorithmiquement.
            </p>
            <p style={{ marginBottom: '16px' }}>
              Mais les taux DeFi varient. En période de forte demande, ils peuvent monter rapidement. Sur CeFi, certaines plateformes proposent des taux fixes sur des durées déterminées — une prévisibilité que DeFi ne peut pas garantir.
            </p>

            <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#111', letterSpacing: '-0.5px', margin: '36px 0 14px' }}>Comment choisir ?</h2>
            <p style={{ marginBottom: '16px' }}>
              Si vous débutez, que vous cherchez une expérience simple et que vous acceptez le risque de contrepartie en échange de la commodité, CeFi est probablement le bon point de départ. Nexo et Ledn sont les deux références les plus sérieuses du marché francophone.
            </p>
            <p style={{ marginBottom: '16px' }}>
              Si vous maîtrisez déjà les wallets, que vous privilégiez la transparence et que vous souhaitez minimiser les coûts sur des montants importants, DeFi offre de meilleures conditions. Aave sur Ethereum reste le protocole de référence avec le meilleur rapport liquidité/sécurité.
            </p>
            <p style={{ marginBottom: '16px' }}>
              Dans tous les cas, la gestion du LTV est le facteur le plus important — quelle que soit la plateforme choisie. Un LTV conservateur protège contre la liquidation bien mieux que le choix entre CeFi et DeFi.
            </p>

            <div style={{ background: '#FAFAFA', border: '1px solid #F0F0F0', borderRadius: '10px', padding: '24px', margin: '40px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: '15px', fontWeight: '700', color: '#111', marginBottom: '4px' }}>Comparez CeFi et DeFi côte à côte</div>
                <div style={{ fontSize: '13px', color: '#888' }}>Taux, LTV et seuils de liquidation en temps réel.</div>
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
