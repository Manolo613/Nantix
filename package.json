import { useState, useEffect } from "react";

const PLATFORMS = [
  {
    name: "Nexo",
    ltv: 0.50,
    rate: 13.9,
    rateDisplay: "dès 1.9%*",
    rateNote: "*1.9% réservé aux détenteurs de 10%+ de tokens NEXO. Taux standard sans tokens : 13.9% APR.",
    liquidation_ltv: 0.833,
    color: "#00C9A7",
    regulated: "UE",
    delay: "Instantané",
    url: "https://nexo.com/borrow",
    proDesc: "Pas de date d'échéance, remboursement libre",
    disponible: true,
  },
  {
    name: "Ledn",
    ltv: 0.50,
    rate: 11.9,
    rateDisplay: "11.9%",
    rateNote: "Taux fixe officiel affiché sur ledn.io — vérifié le 05/03/2026.",
    liquidation_ltv: 0.80,
    color: "#2F80ED",
    regulated: "Canada",
    delay: "24h",
    url: "https://ledn.io/bitcoin-loan-calculator",
    proDesc: "Taux fixe affiché sans conditions",
    disponible: true,
  },
  {
    name: "Aave (DeFi)",
    ltv: 0.67,
    rate: null,
    rateDisplay: "Variable",
    rateNote: "Taux déterminé par le marché en temps réel. Nécessite un wallet Ethereum et WBTC (Bitcoin converti pour Ethereum).",
    liquidation_ltv: 0.75,
    color: "#B6509E",
    regulated: "Non régulé",
    delay: "Immédiat",
    url: "https://app.aave.com/",
    proDesc: "Décentralisé — nécessite WBTC + wallet Ethereum",
    disponible: true,
    defi: true,
  },
];

function formatEur(n) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #09090E; color: #E0E0EC; font-family: 'Syne', sans-serif; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
  @keyframes tickIn { from{opacity:0;transform:translateY(-3px)} to{opacity:1;transform:translateY(0)} }

  .root { min-height:100vh; background:#09090E; position:relative; overflow-x:hidden; }

  .glow {
    position:fixed; top:-300px; left:50%; transform:translateX(-50%);
    width:900px; height:500px;
    background: radial-gradient(ellipse, rgba(247,147,26,0.07) 0%, transparent 65%);
    pointer-events:none; z-index:0;
  }

  .header {
    position:relative; z-index:10;
    display:flex; justify-content:space-between; align-items:center;
    padding:18px 40px;
    border-bottom:1px solid rgba(255,255,255,0.05);
    background:rgba(9,9,14,0.92); backdrop-filter:blur(16px);
  }
  .logo { display:flex; align-items:center; gap:12px; }
  .logo-icon {
    width:38px; height:38px; background:#F7931A; border-radius:9px;
    display:flex; align-items:center; justify-content:center;
    font-size:18px; font-weight:800; color:#09090E;
    font-family:'DM Mono',monospace;
  }
  .logo-title { font-size:17px; font-weight:800; color:#fff; letter-spacing:-0.3px; }
  .logo-sub { font-size:10px; color:#444; text-transform:uppercase; letter-spacing:1px; margin-top:1px; }

  .btc-box {
    display:flex; align-items:center; gap:10px;
    background:rgba(247,147,26,0.07); border:1px solid rgba(247,147,26,0.14);
    border-radius:10px; padding:8px 14px;
  }
  .btc-lbl { font-size:10px; color:#555; text-transform:uppercase; letter-spacing:1px; font-family:'DM Mono',monospace; }
  .btc-val { font-family:'DM Mono',monospace; font-size:17px; font-weight:500; color:#F7931A; animation:tickIn 0.3s ease; }
  .btc-loading { font-size:13px; color:#444; animation:pulse 1.5s infinite; font-family:'DM Mono',monospace; }

  .hero { position:relative; z-index:1; text-align:center; padding:56px 24px 36px; max-width:680px; margin:0 auto; }
  .hero-tag {
    display:inline-flex; align-items:center; gap:6px;
    background:rgba(247,147,26,0.09); border:1px solid rgba(247,147,26,0.18);
    border-radius:100px; padding:5px 14px;
    font-size:10px; color:#F7931A; text-transform:uppercase; letter-spacing:1.5px; font-weight:700;
    margin-bottom:22px;
  }
  .hero-h1 {
    font-size:clamp(30px,5vw,50px); font-weight:800; line-height:1.1;
    color:#fff; letter-spacing:-1.5px; margin-bottom:14px;
  }
  .hero-h1 span {
    background:linear-gradient(120deg,#F7931A,#FFD166);
    -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
  }
  .hero-p { font-size:15px; color:#555; line-height:1.65; max-width:480px; margin:0 auto; }

  .sim-wrap { position:relative; z-index:1; max-width:580px; margin:36px auto 0; padding:0 24px; }
  .sim-card {
    background:rgba(255,255,255,0.025); border:1px solid rgba(255,255,255,0.07);
    border-radius:18px; padding:32px 36px; text-align:center;
  }
  .sim-lbl { font-size:10px; color:#444; text-transform:uppercase; letter-spacing:1.5px; font-weight:700; margin-bottom:18px; }
  .sim-row { display:flex; align-items:center; justify-content:center; gap:8px; }
  .sim-input {
    background:transparent; border:none; border-bottom:2px solid #F7931A;
    color:#fff; font-size:48px; font-weight:800; font-family:'Syne',sans-serif;
    width:190px; text-align:center; outline:none; padding:4px 0; letter-spacing:-2px;
  }
  .sim-btc { font-size:24px; font-weight:800; color:#F7931A; }
  .sim-equiv { margin-top:12px; font-size:13px; color:#444; font-family:'DM Mono',monospace; }
  .sim-equiv strong { color:#666; }

  .quick-row { display:flex; justify-content:center; gap:7px; margin-top:18px; flex-wrap:wrap; }
  .qbtn {
    background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.07);
    border-radius:7px; color:#444; font-size:11px; font-weight:700;
    padding:5px 13px; cursor:pointer; font-family:'Syne',sans-serif;
    transition:all 0.15s; letter-spacing:0.3px;
  }
  .qbtn:hover { color:#777; border-color:rgba(255,255,255,0.12); }
  .qbtn.active { background:rgba(247,147,26,0.1); border-color:rgba(247,147,26,0.3); color:#F7931A; }

  .sort-row {
    position:relative; z-index:1;
    display:flex; align-items:center; gap:7px;
    max-width:840px; margin:32px auto 14px; padding:0 24px; flex-wrap:wrap;
  }
  .sort-lbl { font-size:10px; color:#383838; text-transform:uppercase; letter-spacing:1px; font-weight:700; margin-right:4px; }
  .sbtn {
    background:rgba(255,255,255,0.025); border:1px solid rgba(255,255,255,0.06);
    border-radius:7px; color:#444; font-size:11px; font-weight:700;
    padding:5px 13px; cursor:pointer; font-family:'Syne',sans-serif; transition:all 0.15s;
  }
  .sbtn.active { background:rgba(255,255,255,0.06); border-color:rgba(255,255,255,0.13); color:#bbb; }

  .results { position:relative; z-index:1; max-width:840px; margin:0 auto; padding:0 24px; display:flex; flex-direction:column; gap:10px; }

  .card {
    background:rgba(255,255,255,0.022); border:1px solid rgba(255,255,255,0.07);
    border-radius:15px; padding:20px 24px;
    animation:fadeUp 0.4s ease forwards; opacity:0;
    transition:background 0.2s;
    position:relative; overflow:hidden;
  }
  .card:hover { background:rgba(255,255,255,0.032); }
  .card-bar { position:absolute; top:0; left:0; right:0; height:2px; }

  .card-top { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:18px; flex-wrap:wrap; gap:8px; }
  .cname-row { display:flex; align-items:center; gap:9px; }
  .cdot { width:9px; height:9px; border-radius:50%; flex-shrink:0; }
  .cname { font-size:17px; font-weight:800; color:#fff; letter-spacing:-0.2px; }
  .badge-defi {
    font-size:9px; font-weight:700; padding:2px 7px; border-radius:4px;
    letter-spacing:0.5px; text-transform:uppercase;
    background:rgba(182,80,158,0.12); color:#B6509E; border:1px solid rgba(182,80,158,0.22);
  }
  .card-right { display:flex; flex-direction:column; align-items:flex-end; gap:3px; }
  .c-reg { font-size:10px; color:#3a3; display:flex; align-items:center; gap:4px; }
  .c-reg-dot { width:5px; height:5px; border-radius:50%; background:#3a3; }
  .c-pro { font-size:11px; color:#3a3a3a; }

  .metrics {
    display:grid; grid-template-columns:repeat(4,1fr);
    border:1px solid rgba(255,255,255,0.05); border-radius:11px; overflow:hidden;
    margin-bottom:14px;
  }
  .metric { padding:13px 15px; border-right:1px solid rgba(255,255,255,0.05); }
  .metric:last-child { border-right:none; }
  .m-lbl { font-size:9px; color:#383838; text-transform:uppercase; letter-spacing:1px; font-weight:700; margin-bottom:5px; }
  .m-val { font-family:'DM Mono',monospace; font-size:19px; font-weight:500; color:#d8d8e8; line-height:1.2; }
  .m-sub { font-size:10px; color:#383838; margin-top:3px; font-family:'DM Mono',monospace; }
  .var-tag { font-size:13px; color:#B6509E; font-family:'Syne',sans-serif; font-weight:700; }
  .s-hi { color:#4ade80; } .s-md { color:#facc15; } .s-lo { color:#f87171; }

  .rate-note {
    font-size:11px; color:#3a3a3a; margin-bottom:13px;
    padding:8px 11px; background:rgba(255,255,255,0.02);
    border-radius:7px; border-left:2px solid rgba(255,255,255,0.06); line-height:1.55;
  }

  .cta {
    display:flex; align-items:center; justify-content:center; gap:5px;
    color:#fff; text-decoration:none; border-radius:9px; padding:10px 16px;
    font-size:12px; font-weight:800; letter-spacing:0.3px;
    transition:opacity 0.15s, transform 0.15s; font-family:'Syne',sans-serif;
  }
  .cta:hover { opacity:0.82; transform:translateY(-1px); }

  .footer {
    position:relative; z-index:1; max-width:840px;
    margin:24px auto 0; padding:0 24px 56px;
    font-size:11px; color:#2e2e2e; line-height:1.7;
  }
  .footer a { color:#3a3a3a; text-decoration:underline; }
  .footer strong { color:#484848; }

  @media(max-width:640px){
    .header{padding:14px 18px;}
    .metrics{grid-template-columns:repeat(2,1fr);}
    .metric:nth-child(2){border-right:none;}
    .metric:nth-child(3){border-top:1px solid rgba(255,255,255,0.05);}
    .metric:nth-child(4){border-top:1px solid rgba(255,255,255,0.05);border-right:none;}
    .sim-input{font-size:38px;width:160px;}
    .hero-h1{letter-spacing:-1px;}
  }
`;

export default function App() {
  const [btcAmount, setBtcAmount] = useState("1");
  const [btcPrice, setBtcPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sortKey, setSortKey] = useState("loan");
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    async function fetchPrice() {
      try {
        const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur");
        const data = await res.json();
        setBtcPrice(data.bitcoin.eur);
      } catch {
        setBtcPrice(85000);
      } finally {
        setLoading(false);
      }
    }
    fetchPrice();
    const iv = setInterval(fetchPrice, 60000);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => { setAnimKey(k => k + 1); }, [btcAmount, btcPrice]);

  const amount = parseFloat(btcAmount) || 0;
  const collateral = amount * (btcPrice || 0);

  const results = PLATFORMS.map(p => {
    const loan = collateral * p.ltv;
    const liqPrice = amount > 0 ? loan / p.liquidation_ltv / amount : 0;
    const monthly = p.rate ? (loan * p.rate) / 100 / 12 : null;
    const drop = btcPrice && liqPrice > 0 ? Math.round(((btcPrice - liqPrice) / btcPrice) * 100) : null;
    return { ...p, loan, liqPrice, monthly, drop };
  }).sort((a, b) => {
    if (sortKey === "loan") return b.loan - a.loan;
    if (sortKey === "rate") return (a.rate || 99) - (b.rate || 99);
    if (sortKey === "safety") return (b.drop || 0) - (a.drop || 0);
    return 0;
  });

  const sc = d => !d ? "" : d > 50 ? "s-hi" : d > 30 ? "s-md" : "s-lo";

  return (
    <>
      <style>{css}</style>
      <div className="root">
        <div className="glow" />

        <header className="header">
          <div className="logo">
            <div className="logo-icon">₿</div>
            <div>
              <div className="logo-title">Nantix</div>
              <div className="logo-sub">Comparateur de nantissement</div>
            </div>
          </div>
          <div className="btc-box">
            <span className="btc-lbl">BTC/EUR</span>
            {loading
              ? <span className="btc-loading">Chargement…</span>
              : <span className="btc-val" key={btcPrice}>{formatEur(btcPrice)}</span>
            }
          </div>
        </header>

        <section className="hero">
          <div className="hero-tag">🇫🇷 Marché français · Mis à jour 05/03/2026</div>
          <h1 className="hero-h1">Empruntez en euros,<br /><span>gardez votre Bitcoin.</span></h1>
          <p className="hero-p">Comparez les meilleures plateformes de prêt collatéralisé BTC disponibles en France. Calculez votre montant empruntable et votre prix de liquidation en temps réel.</p>
        </section>

        <div className="sim-wrap">
          <div className="sim-card">
            <div className="sim-lbl">Combien de Bitcoin souhaitez-vous nantir ?</div>
            <div className="sim-row">
              <input
                className="sim-input"
                type="number"
                value={btcAmount}
                onChange={e => setBtcAmount(e.target.value)}
                step="0.1" min="0.01"
              />
              <span className="sim-btc">BTC</span>
            </div>
            {btcPrice && amount > 0 && (
              <div className="sim-equiv">= <strong>{formatEur(collateral)}</strong> de collatéral au prix actuel</div>
            )}
            <div className="quick-row">
              {[0.1, 0.5, 1, 2, 5].map(v => (
                <button key={v} className={`qbtn${btcAmount === String(v) ? " active" : ""}`} onClick={() => setBtcAmount(String(v))}>{v} BTC</button>
              ))}
            </div>
          </div>
        </div>

        <div className="sort-row">
          <span className="sort-lbl">Trier par :</span>
          {[{key:"loan",label:"Montant max"},{key:"rate",label:"Meilleur taux"},{key:"safety",label:"Plus sûr"}].map(s => (
            <button key={s.key} className={`sbtn${sortKey===s.key?" active":""}`} onClick={()=>setSortKey(s.key)}>{s.label}</button>
          ))}
        </div>

        <div className="results" key={animKey}>
          {results.map((p, i) => (
            <div key={p.name} className="card" style={{animationDelay:`${i*80}ms`,borderColor:p.color+"1a"}}>
              <div className="card-bar" style={{background:`linear-gradient(90deg,${p.color},transparent)`}} />
              <div className="card-top">
                <div className="cname-row">
                  <div className="cdot" style={{backgroundColor:p.color}} />
                  <span className="cname">{p.name}</span>
                  {p.defi && <span className="badge-defi">DeFi</span>}
                </div>
                <div className="card-right">
                  <div className="c-reg"><div className="c-reg-dot"/>{p.regulated}</div>
                  <div className="c-pro">{p.proDesc}</div>
                </div>
              </div>

              <div className="metrics">
                <div className="metric">
                  <div className="m-lbl">Empruntable</div>
                  <div className="m-val" style={{color:p.color}}>{amount > 0 ? formatEur(p.loan) : "—"}</div>
                  <div className="m-sub">LTV {Math.round(p.ltv*100)}%</div>
                </div>
                <div className="metric">
                  <div className="m-lbl">Taux annuel</div>
                  <div className="m-val">{!p.rate ? <span className="var-tag">Variable</span> : p.rateDisplay}</div>
                  <div className="m-sub">{p.monthly && amount > 0 ? `≈ ${formatEur(p.monthly)}/mois` : p.defi ? "Selon marché" : "—"}</div>
                </div>
                <div className="metric">
                  <div className="m-lbl">Liquidation si BTC ↓</div>
                  <div className={`m-val ${sc(p.drop)}`}>{amount > 0 && p.drop !== null ? `-${p.drop}%` : "—"}</div>
                  <div className="m-sub">{amount > 0 && p.liqPrice > 0 ? `< ${formatEur(p.liqPrice)}` : "Entrez un montant"}</div>
                </div>
                <div className="metric">
                  <div className="m-lbl">Délai</div>
                  <div className="m-val" style={{fontSize:15,paddingTop:4}}>{p.delay}</div>
                  <div className="m-sub">réception des fonds</div>
                </div>
              </div>

              <div className="rate-note">ℹ️ {p.rateNote}</div>

              <a href={p.url} target="_blank" rel="noopener noreferrer" className="cta" style={{backgroundColor:p.color+"BB"}}>
                Emprunter chez {p.name} →
              </a>
            </div>
          ))}
        </div>

        <div className="footer">
          <div><strong>Sources des données :</strong></div>
          <div>• Ledn : taux 11.9% APR — <a href="https://ledn.io/bitcoin-loan-calculator" target="_blank">ledn.io/bitcoin-loan-calculator</a> (vérifié le 05/03/2026)</div>
          <div>• Nexo : LTV 50% — <a href="https://nexo.com/borrow" target="_blank">nexo.com/borrow</a> (vérifié le 05/03/2026). Taux sans tokens NEXO : ~13.9%</div>
          <div>• Aave V3 : LTV 67%, liquidation 75% — <a href="https://app.aave.com" target="_blank">app.aave.com</a></div>
          <div>• Prix BTC : CoinGecko API (temps réel, actualisation toutes les 60s)</div>
          <div style={{marginTop:8}}>⚠️ Informations fournies à titre indicatif. Les taux peuvent varier. Ce site ne constitue pas un conseil financier.</div>
        </div>
      </div>
    </>
  );
}
