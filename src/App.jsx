import { useState, useEffect } from "react";

const PLATFORMS = [
  {
    name: "Nexo",
    slug: "nexo",
    ltv: 0.50,
    rate: 13.9,
    rateDisplay: "dès 1.9%",
    rateNote: "1.9% réservé aux détenteurs de 10%+ tokens NEXO. Taux standard sans tokens : 13.9% APR.",
    liquidation_ltv: 0.833,
    color: "#0ea5e9",
    tag: "CeFi",
    regulated: "UE",
    delay: "Instantané",
    url: "https://nexo.com/borrow",
  },
  {
    name: "Ledn",
    slug: "ledn",
    ltv: 0.50,
    rate: 11.9,
    rateDisplay: "11.9%",
    rateNote: "Taux fixe officiel affiché sur ledn.io — vérifié le 05/03/2026.",
    liquidation_ltv: 0.80,
    color: "#2563eb",
    tag: "CeFi",
    regulated: "Canada",
    delay: "24h",
    url: "https://ledn.io/bitcoin-loan-calculator",
  },
  {
    name: "Aave V3",
    slug: "aave",
    ltv: 0.67,
    rate: null,
    rateDisplay: "Variable",
    rateNote: "Taux déterminé par le marché en temps réel. Nécessite un wallet Ethereum et WBTC.",
    liquidation_ltv: 0.75,
    color: "#7c3aed",
    tag: "DeFi",
    regulated: "Non régulé",
    delay: "Immédiat",
    url: "https://app.aave.com/",
  },
];

function fmt(n) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #ffffff;
    --bg2: #f8fafd;
    --bg3: #f1f5fb;
    --border: #e8edf5;
    --text: #0d1b2e;
    --text2: #5a6a7e;
    --text3: #9ba8b8;
    --blue: #1a56db;
    --blue-light: #eff4ff;
    --green: #059669;
    --green-light: #ecfdf5;
    --yellow: #d97706;
    --yellow-light: #fffbeb;
    --red: #dc2626;
    --sans: 'Inter', -apple-system, sans-serif;
    --radius: 12px;
    --shadow: 0 1px 4px rgba(13,27,46,0.06), 0 0 0 1px rgba(13,27,46,0.04);
    --shadow-md: 0 4px 16px rgba(13,27,46,0.08), 0 0 0 1px rgba(13,27,46,0.04);
  }

  body {
    background: var(--bg2);
    color: var(--text);
    font-family: var(--sans);
    font-size: 14px;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
  }

  .nav {
    background: var(--bg);
    border-bottom: 1px solid var(--border);
    position: sticky;
    top: 0;
    z-index: 100;
  }
  .nav-inner {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 24px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .nav-logo { display: flex; align-items: center; gap: 10px; }
  .nav-logo-mark {
    width: 32px; height: 32px;
    background: var(--blue);
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    color: #fff;
    font-weight: 800;
    font-size: 14px;
  }
  .nav-logo-name { font-size: 17px; font-weight: 700; color: var(--text); letter-spacing: -0.4px; }
  .nav-logo-tag { font-size: 12px; color: var(--text3); }
  .btc-badge {
    display: flex; align-items: center; gap: 8px;
    background: var(--bg2); border: 1px solid var(--border);
    border-radius: 8px; padding: 7px 14px; font-size: 13px;
  }
  .btc-badge-label { color: var(--text3); font-size: 11px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px; }
  .btc-badge-price { color: var(--blue); font-weight: 700; font-size: 14px; }
  .btc-loading { color: var(--text3); animation: pulse 1.5s infinite; }

  .hero { background: var(--bg); border-bottom: 1px solid var(--border); padding: 52px 24px 48px; }
  .hero-inner { max-width: 1100px; margin: 0 auto; }
  .hero-label {
    display: inline-flex; align-items: center; gap: 6px;
    background: var(--blue-light); color: var(--blue);
    font-size: 11px; font-weight: 600; padding: 4px 12px;
    border-radius: 100px; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 20px;
  }
  .hero-dot { width: 6px; height: 6px; background: var(--blue); border-radius: 50%; animation: blink 2s infinite; }
  .hero-title {
    font-size: clamp(28px, 4vw, 42px); font-weight: 800; color: var(--text);
    letter-spacing: -1.5px; line-height: 1.1; margin-bottom: 14px; max-width: 620px;
  }
  .hero-title span { color: var(--blue); }
  .hero-sub { font-size: 16px; color: var(--text2); max-width: 520px; line-height: 1.65; }

  .main { max-width: 1100px; margin: 0 auto; padding: 32px 24px 64px; }

  .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 28px; }
  .stat-card { background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius); padding: 20px 22px; box-shadow: var(--shadow); }
  .stat-card-label { font-size: 12px; color: var(--text2); font-weight: 500; margin-bottom: 8px; }
  .stat-card-value { font-size: 26px; font-weight: 800; color: var(--blue); letter-spacing: -1px; line-height: 1; margin-bottom: 4px; }
  .stat-card-sub { font-size: 11px; color: var(--text3); }

  .sim-card {
    background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius);
    padding: 22px 24px; margin-bottom: 20px; box-shadow: var(--shadow);
    display: flex; align-items: center; gap: 16px; flex-wrap: wrap;
  }
  .sim-card-label { font-size: 13px; color: var(--text2); font-weight: 500; white-space: nowrap; }
  .sim-input-group {
    display: flex; align-items: center;
    background: var(--bg2); border: 1.5px solid var(--border);
    border-radius: 8px; padding: 8px 14px; gap: 8px; transition: border-color 0.15s;
  }
  .sim-input-group:focus-within { border-color: var(--blue); box-shadow: 0 0 0 3px rgba(26,86,219,0.1); }
  .sim-input {
    background: transparent; border: none; outline: none;
    font-size: 20px; font-weight: 700; color: var(--text);
    width: 90px; text-align: right; font-family: var(--sans); letter-spacing: -0.5px;
  }
  .sim-unit { font-size: 14px; font-weight: 700; color: var(--blue); }
  .sim-presets { display: flex; gap: 6px; flex-wrap: wrap; }
  .preset-btn {
    background: var(--bg2); border: 1px solid var(--border); border-radius: 6px;
    color: var(--text2); font-size: 12px; font-weight: 500; padding: 6px 12px;
    cursor: pointer; transition: all 0.12s; font-family: var(--sans);
  }
  .preset-btn:hover { border-color: var(--blue); color: var(--blue); background: var(--blue-light); }
  .preset-btn.active { background: var(--blue); color: #fff; border-color: var(--blue); }
  .sim-equiv { font-size: 13px; color: var(--text2); margin-left: auto; white-space: nowrap; }
  .sim-equiv strong { color: var(--text); font-weight: 700; }

  .table-controls { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; flex-wrap: wrap; gap: 8px; }
  .sort-group { display: flex; align-items: center; gap: 4px; }
  .sort-label { font-size: 12px; color: var(--text3); font-weight: 500; margin-right: 4px; }
  .sort-btn {
    background: transparent; border: 1px solid transparent; border-radius: 6px;
    color: var(--text3); font-size: 12px; font-weight: 500; padding: 5px 12px;
    cursor: pointer; transition: all 0.12s; font-family: var(--sans);
  }
  .sort-btn:hover { background: var(--bg3); color: var(--text2); }
  .sort-btn.active { background: var(--bg); border-color: var(--border); color: var(--text); font-weight: 600; box-shadow: var(--shadow); }
  .results-label { font-size: 12px; color: var(--text3); }

  .cards { display: flex; flex-direction: column; gap: 10px; }
  .platform-card {
    background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius);
    box-shadow: var(--shadow); overflow: hidden;
    animation: fadeUp 0.35s ease forwards; opacity: 0;
    transition: box-shadow 0.2s, border-color 0.2s;
  }
  .platform-card:hover { box-shadow: var(--shadow-md); border-color: #d0daf0; }
  .card-top-bar { height: 3px; width: 100%; }
  .card-body { padding: 20px 24px; }
  .card-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; flex-wrap: wrap; gap: 12px; }
  .card-platform { display: flex; align-items: center; gap: 12px; }
  .card-icon { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 800; flex-shrink: 0; }
  .card-name { font-size: 17px; font-weight: 700; color: var(--text); letter-spacing: -0.3px; }
  .card-meta { font-size: 12px; color: var(--text3); margin-top: 2px; display: flex; align-items: center; gap: 6px; }
  .pill { display: inline-flex; align-items: center; font-size: 10px; font-weight: 600; padding: 2px 8px; border-radius: 100px; letter-spacing: 0.3px; text-transform: uppercase; }
  .pill-reg { background: var(--green-light); color: var(--green); }
  .pill-unreg { background: var(--yellow-light); color: var(--yellow); }
  .card-cta { display: inline-flex; align-items: center; gap: 6px; padding: 10px 20px; border-radius: 8px; font-size: 13px; font-weight: 600; text-decoration: none; transition: all 0.15s; color: #fff; }
  .card-cta:hover { opacity: 0.88; transform: translateY(-1px); box-shadow: 0 4px 14px rgba(26,86,219,0.25); }

  .card-metrics { display: grid; grid-template-columns: repeat(4, 1fr); border: 1px solid var(--border); border-radius: 10px; overflow: hidden; margin-bottom: 14px; }
  .metric { padding: 14px 18px; border-right: 1px solid var(--border); }
  .metric:last-child { border-right: none; }
  .metric-label { font-size: 11px; color: var(--text3); font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px; }
  .metric-value { font-size: 22px; font-weight: 800; color: var(--text); letter-spacing: -0.8px; line-height: 1.1; }
  .metric-sub { font-size: 11px; color: var(--text3); margin-top: 4px; }
  .metric-value.blue { color: var(--blue); }
  .metric-value.green { color: var(--green); }
  .metric-value.yellow { color: var(--yellow); }
  .metric-value.red { color: var(--red); }
  .metric-value.purple { color: #7c3aed; font-style: italic; font-size: 16px; }

  .safety-bar-track { height: 4px; background: var(--bg3); border-radius: 2px; margin-top: 6px; overflow: hidden; }
  .safety-bar-fill { height: 100%; border-radius: 2px; transition: width 0.5s ease; }

  .card-note { background: var(--bg2); border: 1px solid var(--border); border-radius: 8px; padding: 10px 14px; font-size: 12px; color: var(--text2); line-height: 1.6; display: flex; gap: 8px; align-items: flex-start; }
  .note-icon { flex-shrink: 0; font-size: 13px; margin-top: 1px; }

  .footer { max-width: 1100px; margin: 0 auto; padding: 24px 24px 40px; font-size: 12px; color: var(--text3); line-height: 1.8; border-top: 1px solid var(--border); }
  .footer a { color: var(--text3); text-decoration: underline; }
  .footer strong { color: var(--text2); }

  @keyframes fadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }

  @media(max-width: 700px) {
    .stats-grid { grid-template-columns: repeat(2, 1fr); }
    .card-metrics { grid-template-columns: repeat(2, 1fr); }
    .metric:nth-child(2) { border-right: none; }
    .metric:nth-child(3) { border-top: 1px solid var(--border); }
    .metric:nth-child(4) { border-top: 1px solid var(--border); border-right: none; }
    .hero-title { font-size: 26px; }
    .sim-card { gap: 12px; }
    .sim-equiv { margin-left: 0; }
    .card-header { flex-direction: column; align-items: flex-start; }
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

  const maxLoan = results[0]?.loan || 0;

  function safetyColor(drop) {
    if (!drop) return "#e2e8f0";
    if (drop > 50) return "#059669";
    if (drop > 30) return "#d97706";
    return "#dc2626";
  }

  function safetyClass(drop) {
    if (!drop) return "";
    if (drop > 50) return "green";
    if (drop > 30) return "yellow";
    return "red";
  }

  return (
    <>
      <style>{css}</style>

      <nav className="nav">
        <div className="nav-inner">
          <div className="nav-logo">
            <div className="nav-logo-mark">N</div>
            <div className="nav-logo-name">Nantix</div>
            <span className="nav-logo-tag">— Comparateur de prêts crypto</span>
          </div>
          <div className="btc-badge">
            <span className="btc-badge-label">BTC/EUR</span>
            {loading
              ? <span className="btc-loading">···</span>
              : <span className="btc-badge-price">{fmt(btcPrice)}</span>
            }
          </div>
        </div>
      </nav>

      <div className="hero">
        <div className="hero-inner">
          <div className="hero-label">
            <div className="hero-dot" />
            🇫🇷 Marché français · Mis à jour le 05/03/2026
          </div>
          <h1 className="hero-title">
            Empruntez en euros,<br />
            <span>gardez votre Bitcoin.</span>
          </h1>
          <p className="hero-sub">
            Comparez les meilleures plateformes de prêt collatéralisé BTC disponibles en France. Calculez votre montant empruntable et votre prix de liquidation en temps réel.
          </p>
        </div>
      </div>

      <div className="main">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-card-label">Plateformes comparées</div>
            <div className="stat-card-value">{PLATFORMS.length}</div>
            <div className="stat-card-sub">disponibles en France</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-label">Max empruntable</div>
            <div className="stat-card-value" style={{fontSize: amount > 0 ? 20 : 26}}>{amount > 0 ? fmt(maxLoan) : "—"}</div>
            <div className="stat-card-sub">pour {btcAmount} BTC collatéralisé</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-label">Meilleur taux</div>
            <div className="stat-card-value">1.9%</div>
            <div className="stat-card-sub">APR via Nexo Platinum</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-label">LTV maximum</div>
            <div className="stat-card-value">67%</div>
            <div className="stat-card-sub">via Aave V3 (DeFi)</div>
          </div>
        </div>

        <div className="sim-card">
          <span className="sim-card-label">Simuler avec</span>
          <div className="sim-input-group">
            <input
              className="sim-input"
              type="number"
              value={btcAmount}
              onChange={e => setBtcAmount(e.target.value)}
              step="0.1" min="0.01"
            />
            <span className="sim-unit">BTC</span>
          </div>
          <div className="sim-presets">
            {[0.1, 0.5, 1, 2, 5, 10].map(v => (
              <button
                key={v}
                className={`preset-btn${btcAmount === String(v) ? " active" : ""}`}
                onClick={() => setBtcAmount(String(v))}
              >{v} BTC</button>
            ))}
          </div>
          {btcPrice && amount > 0 && (
            <span className="sim-equiv">= <strong>{fmt(collateral)}</strong> de collatéral</span>
          )}
        </div>

        <div className="table-controls">
          <div className="sort-group">
            <span className="sort-label">Trier par</span>
            {[
              { key: "loan", label: "Montant max" },
              { key: "rate", label: "Meilleur taux" },
              { key: "safety", label: "Plus sûr" },
            ].map(s => (
              <button
                key={s.key}
                className={`sort-btn${sortKey === s.key ? " active" : ""}`}
                onClick={() => setSortKey(s.key)}
              >{s.label}</button>
            ))}
          </div>
          <span className="results-label">{results.length} plateformes</span>
        </div>

        <div className="cards" key={animKey}>
          {results.map((p, i) => (
            <div key={p.name} className="platform-card" style={{animationDelay:`${i*80}ms`}}>
              <div className="card-top-bar" style={{background: p.color}} />
              <div className="card-body">
                <div className="card-header">
                  <div className="card-platform">
                    <div className="card-icon" style={{background: p.color+"18", color: p.color}}>
                      {p.name.slice(0,2).toUpperCase()}
                    </div>
                    <div>
                      <div style={{display:"flex", alignItems:"center", gap:8}}>
                        <span className="card-name">{p.name}</span>
                        <span className="pill" style={{background: p.color+"18", color: p.color}}>{p.tag}</span>
                      </div>
                      <div className="card-meta">
                        <span className={`pill ${p.regulated !== "Non régulé" ? "pill-reg" : "pill-unreg"}`}>{p.regulated}</span>
                        <span>·</span>
                        <span>{p.delay}</span>
                      </div>
                    </div>
                  </div>
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="card-cta" style={{background: p.color}}>
                    Emprunter chez {p.name} →
                  </a>
                </div>

                <div className="card-metrics">
                  <div className="metric">
                    <div className="metric-label">Empruntable</div>
                    <div className="metric-value blue">{amount > 0 ? fmt(p.loan) : "—"}</div>
                    <div className="metric-sub">LTV {Math.round(p.ltv * 100)}%{p.monthly && amount > 0 ? ` · ≈ ${fmt(p.monthly)}/mois` : ""}</div>
                  </div>
                  <div className="metric">
                    <div className="metric-label">Taux annuel</div>
                    <div className={`metric-value ${p.rate ? "" : "purple"}`}>{p.rateDisplay}</div>
                    <div className="metric-sub">APR affiché</div>
                  </div>
                  <div className="metric">
                    <div className="metric-label">Liquidation si BTC ↓</div>
                    <div className={`metric-value ${safetyClass(p.drop)}`}>
                      {amount > 0 && p.drop !== null ? `-${p.drop}%` : "—"}
                    </div>
                    <div className="metric-sub">{amount > 0 && p.liqPrice > 0 ? `Seuil : ${fmt(p.liqPrice)}` : "Entrez un montant"}</div>
                    <div className="safety-bar-track">
                      <div className="safety-bar-fill" style={{width: p.drop ? `${Math.min(p.drop, 100)}%` : "0%", background: safetyColor(p.drop)}}/>
                    </div>
                  </div>
                  <div className="metric">
                    <div className="metric-label">Délai de réception</div>
                    <div className="metric-value" style={{fontSize:18}}>{p.delay}</div>
                    <div className="metric-sub">après validation</div>
                  </div>
                </div>

                <div className="card-note">
                  <span className="note-icon">ℹ️</span>
                  <span>{p.rateNote}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="footer">
        <div><strong>Sources :</strong> Ledn (ledn.io, 05/03/2026) · Nexo (nexo.com, 05/03/2026) · Aave V3 (app.aave.com) · Prix BTC : CoinGecko API temps réel</div>
        <div style={{marginTop:6}}>⚠️ Informations fournies à titre indicatif uniquement. Les taux peuvent varier. Ce site ne constitue pas un conseil financier ou en investissement.</div>
      </div>
    </>
  );
}
