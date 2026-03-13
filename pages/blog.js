import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
 
const ARTICLES = [
  {
    slug: 'quest-ce-que-le-pret-bitcoin',
    title: 'Qu\'est-ce qu\'un prêt adossé au Bitcoin ?',
    excerpt: 'Comprendre le nantissement crypto : comment emprunter en euros sans vendre votre Bitcoin, et quels sont les risques.',
    date: '12 mars 2025',
    readTime: '5 min',
    category: 'Guide',
  },
  {
    slug: 'ltv-liquidation-expliques',
    title: 'LTV et liquidation : le guide complet',
    excerpt: 'Tout savoir sur le Loan-to-Value ratio et comment éviter la liquidation de votre collatéral BTC.',
    date: '8 mars 2025',
    readTime: '7 min',
    category: 'Éducation',
  },
  {
    slug: 'defi-vs-cefi-prets-bitcoin',
    title: 'DeFi vs CeFi : quelle plateforme choisir pour votre prêt BTC ?',
    excerpt: 'Aave et Compound vs Nexo et Ledn — comparaison complète des avantages et risques de chaque approche.',
    date: '3 mars 2025',
    readTime: '8 min',
    category: 'Comparatif',
  },
  {
    slug: 'fiscalite-pret-bitcoin-france',
    title: 'Fiscalité du prêt Bitcoin en France : ce qu\'il faut savoir',
    excerpt: 'Emprunter sur son BTC est-il imposable ? Réponse claire sur le traitement fiscal en 2025.',
    date: '25 fév 2025',
    readTime: '6 min',
    category: 'Fiscalité',
  },
]
 
const CATEGORY_COLORS = {
  'Guide': { bg: '#EEF4FF', text: '#2D5BE3' },
  'Éducation': { bg: '#F0FAF4', text: '#1A7F4B' },
  'Comparatif': { bg: '#FFF7ED', text: '#C05621' },
  'Fiscalité': { bg: '#FFF5F5', text: '#C53030' },
}
 
export default function Blog() {
  return (
    <>
      <Head>
        <title>Blog — Nantix</title>
        <meta name="description" content="Guides et ressources sur les prêts Bitcoin en France. LTV, liquidation, DeFi vs CeFi — tout ce qu'il faut savoir." />
      </Head>
 
      <Navbar />
 
      <main style={{ paddingTop: '64px' }}>
        <section style={{ background: 'var(--cream)', padding: '60px 40px 80px' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '48px',
              fontWeight: '500',
              color: 'var(--ink)',
              letterSpacing: '-1px',
              marginBottom: '12px',
            }}>Blog & Guides</h1>
            <p style={{ color: 'var(--ink-muted)', fontSize: '16px', marginBottom: '48px' }}>
              Tout comprendre sur les prêts Bitcoin avant de vous lancer.
            </p>
 
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {ARTICLES.map(article => {
                const catStyle = CATEGORY_COLORS[article.category] || { bg: '#F5F5F5', text: '#666' }
                return (
                  <Link key={article.slug} href={`/blog/${article.slug}`} style={{
                    display: 'block',
                    background: 'var(--white)',
                    borderRadius: '16px',
                    padding: '28px 32px',
                    border: '1px solid var(--cream-border)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.08)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
                          <span style={{
                            fontSize: '11px',
                            fontWeight: '700',
                            padding: '3px 8px',
                            borderRadius: '4px',
                            background: catStyle.bg,
                            color: catStyle.text,
                          }}>{article.category}</span>
                          <span style={{ fontSize: '13px', color: 'var(--ink-muted)' }}>{article.date}</span>
                          <span style={{ fontSize: '13px', color: 'var(--ink-muted)' }}>· {article.readTime} de lecture</span>
                        </div>
                        <h2 style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '22px',
                          fontWeight: '500',
                          color: 'var(--ink)',
                          marginBottom: '10px',
                          letterSpacing: '-0.3px',
                        }}>{article.title}</h2>
                        <p style={{ color: 'var(--ink-muted)', fontSize: '15px', lineHeight: '1.6' }}>{article.excerpt}</p>
                      </div>
                      <span style={{ color: 'var(--teal)', fontSize: '20px', marginLeft: '24px', marginTop: '4px' }}>→</span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      </main>
 
      <Footer />
    </>
  )
}
