            ))}
          </div>
        </section>

        {/* ── BLOG ── */}
        <section style={{ borderTop: '1px solid #EBEBEB', padding: '52px 0' }}>
          <div style={wrap}>
            <div style={{ fontSize: '10px', fontWeight: '700', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Ressources</div>
            <h2 style={{ fontSize: '24px', fontWeight: '700', letterSpacing: '-.6px', color: '#111', marginBottom: '24px' }}>Comprendre les prêts crypto</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }}>
              {BLOG.map(b => (
                <div key={b.title} style={{ border: '1px solid #EBEBEB', borderRadius: '10px', overflow: 'hidden', cursor: 'pointer', transition: 'box-shadow .15s' }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,.06)'}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
                  <div style={{ height: '80px', background: b.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px' }}>{b.icon}</div>
                  <div style={{ padding: '14px 16px' }}>
                    <div style={{ fontSize: '10px', fontWeight: '700', color: '#888', textTransform: 'uppercase', letterSpacing: '.7px', marginBottom: '6px' }}>{b.tag}</div>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: '#111', lineHeight: '1.4', marginBottom: '6px' }}>{b.title}</div>
                    <div style={{ fontSize: '11px', color: '#888' }}>{b.date} · {b.read}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── NEWSLETTER ── */}
        <section style={{ borderTop: '1px solid #EBEBEB', padding: '52px 0' }}>
          <div style={wrap}>
            <div style={{ background: '#FAFAFA', border: '1px solid #EBEBEB', borderRadius: '12px', padding: '36px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '32px', flexWrap: 'wrap' }}>
              <div style={{ maxWidth: '420px' }}>
                <div style={{ fontSize: '20px', fontWeight: '700', color: '#111', letterSpacing: '-.4px', marginBottom: '6px' }}>Alerte taux gratuite</div>
                <div style={{ fontSize: '14px', color: '#555', lineHeight: '1.6', marginBottom: '8px' }}>Recevez une notification quand les taux changent. Maximum 1 email par semaine.</div>
                <div style={{ fontSize: '12px', color: '#888' }}>🔒 Pas de spam. Désabonnement en un clic.</div>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                <input type="email" placeholder="votre@email.com" style={{ border: '1px solid #E0E0E0', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', outline: 'none', width: '220px', color: '#111' }} />
                <button style={{ background: '#111', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 20px', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>M'alerter</button>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
