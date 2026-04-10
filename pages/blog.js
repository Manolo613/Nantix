import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const ARTICLES = [
  {
    slug: 'quest-ce-que-le-pret-bitcoin',
    title: "Qu'est-ce qu'un prêt Bitcoin collatéralisé ?",
    excerpt: 'Comprendre le nantissement crypto : comment emprunter sans vendre votre Bitcoin, et quels sont les risques.',
    date: '10 avr. 2026',
    readTime: '5 min',
    tag: 'Guide',
    bg: '#FFF8F0',
    icon: '₿',
  },
  {
    slug: 'cefi-vs-defi-pret-crypto',
    title: 'CeFi vs DeFi : quel prêt choisir en 2026 ?',
    excerpt: 'Nexo, Ledn vs Aave, Morpho — comparaison complète des avantages et risques de chaque approche.',
    date: '8 avr. 2026',
    readTime: '8 min',
    tag: 'Analyse',
    bg: '#F0FDF4',
    icon: '📊',
  },
  {
    slug: 'eviter-liquidation-crypto',
    title: 'Comment éviter la liquidation de son collatéral',
    excerpt: 'Les bonnes pratiques pour gérer son LTV, surveiller ses positions et ne pas se faire liquider.',
    date: '5 avr. 2026',
    readTime: '6 min',
    tag: 'Risques',
    bg: '#EFF6FF',
    icon: '⚠️',
  },
  {
    slug: 'pret-bitcoin-collateralise',
    title: 'Prêt Bitcoin collatéralisé : le guide pratique',
    excerpt: 'Étapes concrètes pour déposer du BTC, choisir sa plateforme et emprunter de l\'USDC ou USDT.',
    date: '2 avr. 2026',
    readTime: '7 min',
    tag: 'Guide',
    bg: '#FDF4FF',
    icon: '📋',
  },
]

const TAG_COLORS = {
  'Guide':   { bg: '#EEF4FF', color: '#2D5BE3' },
  'Analyse': { bg: '#F0FAF4', color: '#1A7F4B' },
  'Risques': { bg: '#FFF5F5', color: '#C53030' },
}

export default function Blog() {
  return (
    <>
      <Head>
        <title>Blog — Nantix</title>
        <meta name="description" content="Guides et ressources sur les prêts crypto en France. LTV, liquidation, DeFi vs CeFi — tout ce qu'il faut savoir." />
        <style>{`
          .blog-row{transition:box-shadow .2s,transform .2s}
          .blog-row:hover{box-shadow:0 6px 24px rgba(0,0,0,.08)!important;transform:translateY(-1px)}
        `}</style>
      </Head>
      <Navbar />

      <main style={{ background: '#fff', minHeight: '100vh', paddingTop: '52px' }}>

        {/* HERO */}
        <section style={{ background: 'linear-gradient(160deg,#F8F9FA 0%,#fff 60%)', padding: '52px 0 40px' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 32px' }}>
            <div style={{ fontSize: '11px', fontWeight: '700', color: '#999', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>Ressources</div>
            <h1 style={{ fontSize: '42px', fontWeight: '800', letterSpacing: '-1.5px', color: '#111', lineHeight: '1.1', marginBottom: '14px' }}>
              Guides et analyses
            </h1>
            <p style={{ fontSize: '15px', color: '#888', lineHeight: '1.7' }}>
              Tout comprendre sur les prêts crypto avant de vous lancer.
            </p>
          </div>
        </section>

        {/* ARTICLES */}
        <section style={{ padding: '40px 0 80px' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 32px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {ARTICLES.map(a => {
              const tagStyle = TAG_COLORS[a.tag] || { bg: '#F5F5F5', color: '#666' }
              return (
                <Link key={a.slug} href={`/blog/${a.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="blog-row" style={{ background: '#fff', borderRadius: '16px', padding: '24px 28px', boxShadow: '0 1px 4px rgba(0,0,0,.06)', display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: a.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', flexShrink: 0 }}>
                      {a.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                        <span style={{ fontSize: '10px', fontWeight: '700', padding: '2px 7px', borderRadius: '4px', background: tagStyle.bg, color: tagStyle.color, textTransform: 'uppercase', letterSpacing: '.5px' }}>{a.tag}</span>
                        <span style={{ fontSize: '11px', color: '#AAA' }}>{a.date} · {a.readTime} de lecture</span>
                      </div>
                      <div style={{ fontSize: '16px', fontWeight: '700', color: '#111', lineHeight: '1.35', marginBottom: '6px' }}>{a.title}</div>
                      <div style={{ fontSize: '13px', color: '#888', lineHeight: '1.6' }}>{a.excerpt}</div>
                    </div>
                    <span style={{ fontSize: '18px', color: '#CCC', flexShrink: 0 }}>→</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
