import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export default function ArticlePretBitcoin() {
  return (
    <>
      <Head>
        <title>Qu'est-ce qu'un prêt Bitcoin collatéralisé ? — Nantix</title>
        <meta name="description" content="Tout comprendre sur le prêt Bitcoin collatéralisé : fonctionnement, LTV, liquidation, avantages et risques. Guide complet en français." />
      </Head>
      <Navbar />

      <main style={{ background: '#fff', minHeight: '100vh', paddingTop: '52px' }}>
        <article style={{ maxWidth: '720px', margin: '0 auto', padding: '48px 24px 80px' }}>

          {/* Header */}
          <div style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Link href="/blog" style={{ fontSize: '12px', color: '#AAA', textDecoration: 'none' }}>Blog</Link>
              <span style={{ fontSize: '12px', color: '#DDD' }}>›</span>
              <span style={{ fontSize: '12px', color: '#AAA' }}>Guide</span>
            </div>
            <h1 style={{ fontSize: '36px', fontWeight: '800', letterSpacing: '-1.2px', color: '#111', lineHeight: '1.15', marginBottom: '16px' }}>
              Qu'est-ce qu'un prêt Bitcoin collatéralisé ?
            </h1>
            <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.7', marginBottom: '20px' }}>
              Obtenir des liquidités sans vendre son Bitcoin — c'est possible grâce au prêt collatéralisé. Voici comment ce mécanisme fonctionne, quels sont ses avantages, et à quels risques il faut prêter attention.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '12px', color: '#AAA', paddingBottom: '24px', borderBottom: '1px solid #F0F0F0' }}>
              <span>Guide · 7 min de lecture</span>
              <span>Mis à jour mars 2025</span>
            </div>
          </div>

          {/* Contenu */}
          <div style={{ fontSize: '15px', color: '#333', lineHeight: '1.85' }}>

            <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#111', letterSpacing: '-0.5px', margin: '36px 0 14px' }}>Le principe de base</h2>
            <p style={{ marginBottom: '16px' }}>
              Un prêt collatéralisé fonctionne comme un prêt immobilier, mais avec du Bitcoin comme garantie. Vous déposez vos BTC sur une plateforme, qui vous verse en échange une somme en euros ou en stablecoins. Votre Bitcoin reste bloqué pendant la durée du prêt — il vous est restitué intégralement dès que vous remboursez le capital et les intérêts.
            </p>
            <p style={{ marginBottom: '16px' }}>
              Ce mécanisme existe depuis plusieurs années dans la finance traditionnelle sous d'autres formes. Ce qui est nouveau, c'est qu'il s'applique désormais à des actifs numériques, avec des délais de traitement qui se comptent en minutes plutôt qu'en semaines.
            </p>

            <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#111', letterSpacing: '-0.5px', margin: '36px 0 14px' }}>Le LTV : combien peut-on emprunter ?</h2>
            <p style={{ marginBottom: '16px' }}>
              Le ratio LTV — Loan-to-Value — détermine combien vous pouvez emprunter par rapport à la valeur de votre collatéral. Un LTV de 50% signifie que pour 10 000 € de Bitcoin déposés, vous recevez 5 000 €. Un LTV de 70% vous donne accès à 7 000 € pour le même dépôt.
            </p>
            <p style={{ marginBottom: '16px' }}>
              Les plateformes fixent leur propre LTV maximum. Sur les plateformes CeFi comme Nexo ou Ledn, il tourne généralement autour de 50%. Sur les protocoles DeFi comme Aave, il peut monter jusqu'à 70-80% sur certains actifs. Un LTV élevé signifie plus de liquidités disponibles, mais aussi un risque de liquidation plus proche.
            </p>

            <div style={{ background: '#F8F8F8', borderRadius: '10px', padding: '20px 24px', margin: '24px 0', borderLeft: '3px solid #111' }}>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#111', marginBottom: '8px' }}>À retenir</div>
              <p style={{ fontSize: '14px', color: '#555', lineHeight: '1.7', margin: 0 }}>
                Plus le LTV est élevé, plus vous empruntez — mais plus le risque de liquidation est proche en cas de baisse des prix. Un LTV conservateur (30-40%) offre une marge de sécurité significative.
              </p>
            </div>

            <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#111', letterSpacing: '-0.5px', margin: '36px 0 14px' }}>Le risque de liquidation</h2>
            <p style={{ marginBottom: '16px' }}>
              C'est le risque central de ce type de prêt. Si le prix du Bitcoin baisse significativement après votre emprunt, votre LTV effectif augmente mécaniquement. La plateforme surveille en permanence ce ratio. Quand il dépasse un seuil critique — généralement 80 à 85% — elle vend automatiquement une partie ou la totalité de votre collatéral pour rembourser le prêt.
            </p>
            <p style={{ marginBottom: '16px' }}>
              Cette liquidation peut survenir rapidement, notamment lors de corrections brutales du marché. Pour s'en prémunir, deux approches : emprunter un montant bien inférieur au maximum autorisé, ou suivre régulièrement l'évolution du prix par rapport à son seuil de liquidation. Le comparateur Nantix affiche ce seuil en temps réel pour chaque plateforme selon votre montant.
            </p>

            <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#111', letterSpacing: '-0.5px', margin: '36px 0 14px' }}>CeFi ou DeFi : quelle différence ?</h2>
            <p style={{ marginBottom: '16px' }}>
              Sur les plateformes centralisées — Nexo, Ledn — vous confiez votre Bitcoin à une entreprise qui gère le prêt. C'est plus simple, il y a un support client, et le processus ressemble à un service bancaire classique. En contrepartie, vos fonds sont détenus par un tiers. Le risque de contrepartie existe : si la plateforme fait faillite, vous pouvez perdre votre collatéral.
            </p>
            <p style={{ marginBottom: '16px' }}>
              Sur les protocoles décentralisés — Aave, Compound — tout est géré par des smart contracts. Personne ne détient vos fonds : le code exécute les conditions automatiquement. Il n'y a pas de KYC, pas d'intermédiaire. En revanche, cela nécessite de maîtriser les wallets et de comprendre les frais de transaction, et une faille dans le code peut exposer les fonds déposés.
            </p>

            <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#111', letterSpacing: '-0.5px', margin: '36px 0 14px' }}>Et fiscalement ?</h2>
            <p style={{ marginBottom: '16px' }}>
              En France, recevoir des liquidités via un prêt collatéralisé n'est pas un événement imposable. Vous ne vendez pas votre Bitcoin — vous l'utilisez comme garantie. La flat tax de 30% ne s'applique donc pas à cette opération.
            </p>
            <p style={{ marginBottom: '16px' }}>
              Attention cependant : si votre collatéral est liquidé par la plateforme suite à une baisse des prix, cette liquidation peut être assimilée à une cession et déclencher une imposition sur la plus-value réalisée. Ce point mérite l'attention d'un comptable spécialisé en actifs numériques.
            </p>

            <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#111', letterSpacing: '-0.5px', margin: '36px 0 14px' }}>Pour qui ce type de prêt est-il pertinent ?</h2>
            <p style={{ marginBottom: '16px' }}>
              Le prêt collatéralisé s'adresse principalement aux détenteurs de Bitcoin qui ont besoin de liquidités à court terme sans souhaiter vendre. Cela peut couvrir des besoins personnels ponctuels, financer un investissement, ou simplement éviter un événement fiscal mal venu.
            </p>
            <p style={{ marginBottom: '16px' }}>
              Il est moins adapté aux détenteurs qui anticipent une baisse prolongée des prix — dans ce cas, vendre et racheter plus bas peut être plus rationnel. Chaque situation est différente, et ce comparateur ne se substitue pas à un conseil financier personnalisé.
            </p>

            {/* CTA */}
            <div style={{ background: '#FAFAFA', border: '1px solid #F0F0F0', borderRadius: '10px', padding: '24px', margin: '40px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: '15px', fontWeight: '700', color: '#111', marginBottom: '4px' }}>Comparez les offres disponibles</div>
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
