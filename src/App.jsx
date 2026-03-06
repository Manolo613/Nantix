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
    chain: "Centralisé",
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
    chain: "Centralisé",
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
    chain: "Ethereum",
  },
];

function fmt(n) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
}

const SORTS = [
  { key: "loan", label: "Empruntable ↓" },
  { key: "rate", label: "Taux ↑" },
  { key: "safety", label: "Sécurité ↓" },
  { key: "ltv", label: "LTV ↓" },
];

const css = `
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #f8fafc;
    --bg2: #ffffff;
    --bg3: #f1f5f9;
    --border: #e2e8f0;
    --border2: #cbd5e1;
    --text: #0f172a;
    --text2: #64748b;
    --text3: #94a3b8;
    --accent: #2563eb;
    --accent-light: #eff6ff;
    --green: #16a34a;
    --green-light: #f0fdf4;
    --yellow: #d97706;
    --yellow-light: #fffbeb;
    --red: #dc2626;
    --red-light: #fef2f2;
    --mono: 'IBM Plex Mono', monospace;
    --sans: 'IBM Plex Sans', sans-serif;
    --shadow: 0 1px 3px rgba(0,0,0,0.08);
    --shadow2: 0 4px 12px rgba(0,0,0,0.06);
  }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--sans);
    font-size: 13px;
    line-height: 1.5;
    min-height: 100vh;
  }

  .layout { display: flex; min-height: 100vh; }

  /* SIDEBAR */
  .sidebar {
    width: 220px;
    flex-shrink: 0;
    background: var(--bg2);
    border-right: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0; left: 0; bottom: 0;
    z-index: 100;
    overflow-y: auto;
  }

  .sidebar-logo {
    padding: 20px 18px 16px;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .logo-mark {
    width: 30px; height: 30px;
    background: var(--accent);
    border-radius: 7px;
    display: flex; align-items: center; justify-content: center;
    font-family: var(--mono);
    font-size: 13px;
    font-weight: 600;
    color: #fff;
    flex-shrink: 0;
  }

  .logo-text { font-weight: 700; font-size: 15px; letter-spacing: -0.3px; color: var(--text); }
  .logo-sub { font-size: 10px; color: var(--text3); letter-spacing: 0.5px; margin-top: 1px; }

  .sidebar-section { padding: 16px 12px 8px; }
  .sidebar-label {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--text3);
    font-weight: 600;
    padding: 0 6px;
    margin-bottom: 4px;
  }

  .sidebar-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 7px 8px;
    border-radius: 6px;
    color: var(--text2);
    cursor: pointer;
    font-size: 13px;
    transition: all 0.15s;
    text-decoration: none;
  }
  .sidebar-item:hover { background: var(--bg3); color: var(--text); }
  .sidebar-item.active { background: var(--accent-light); color: var(--accent); font-weight: 500; }
  .sidebar-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }

  .sidebar-footer {
    margin-top: auto;
    padding: 12px 16px;
    border-top: 1px solid var(--border);
    font-size: 10px;
    color: var(--text3);
    line-height: 1.7;
  }

  /* MAIN */
  .main { margin-left: 220px; flex: 1; display: flex; flex-direction: column; }

  /* TOPBAR */
  .topbar {
    height: 50px;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
    background: var(--bg2);
    position: sticky;
    top: 0;
    z-index: 50;
    box-shadow: var(--shadow);
  }

  .topbar-left { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--text2); }
  .topbar-sep { color: var(--text3); }
  .topbar-current { color: var(--text); font-weight: 600; }

  .btc-pill {
    display: flex;
    align-items: center;
    gap: 8px;
    background: var(--bg3);
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 6px 12px;
    font-family: var(--mono);
    font-size: 12px;
  }
  .btc-label { color: var(--text3); font-size: 10px; letter-spacing: 0.5px; text-transform: uppercase; }
  .btc-price { color: var(--accent); font-weight: 600; }
  .btc-loading { color: var(--text3); animation: pulse 1.5s infinite; }

  /* CONTENT */
  .content { padding: 24px; flex: 1; max-width: 1200px; }

  .page-header { margin-bottom: 20px; }
  .page-title { font-size: 22px; font-weight: 700; color: var(--text); letter-spacing: -0.5px; margin-bottom: 4px; }
  .page-sub { font-size: 12px; color: var(--text2); }

  /* STATS */
  .stats-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
    margin-bottom: 20px;
  }

  .stat-box {
    background: var(--bg2);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 16px 18px;
    box-shadow: var(--shadow);
  }

  .stat-label { font-size: 11px; color: var(--text2); margin-bottom: 6px; font-weight: 500; }
  .stat-value { font-size: 22px; font-weight: 700; color: var(--accent); font-family: var(--mono); letter-spacing: -1px; }
  .stat-sub { font-size: 11px; color: var(--text3); margin-top: 3px; }

  /* SIMULATOR */
  .sim-bar {
    display: flex;
    align-items: center;
    gap: 12px;
    background: var(--bg2);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 14px 18px;
    margin-bottom: 16px;
    flex-wrap: wrap;
    box-shadow: var(--shadow);
  }

  .sim-label { font-size: 12px; color: var(--text2); white-space: nowrap; font-weight: 500; }

  .sim-input-wrap {
    display: flex;
    align-items: center;
    gap: 6px;
    background: var(--bg3);
    border: 1px solid var(--border2);
    border-radius: 6px;
    padding: 7px 12px;
  }

  .sim-input {
    background: transparent;
    border: none;
    color: var(--text);
    font-family: var(--mono);
    font-size: 16px;
    font-weight: 600;
    width: 80px;
    outline: none;
    text-align: right;
  }

  .sim-unit { font-family: var(--mono); font-size: 13px; color: var(--accent); font-weight: 600; }

  .quick-btns { display: flex; gap: 4px; flex-wrap: wrap; }
  .qbtn {
    background: var(--bg3);
    border: 1px solid var(--border);
    border-radius: 5px;
    color: var(--text2);
    font-size: 11px;
    font-family: var(--mono);
    padding: 5px 10px;
    cursor: pointer;
    transition: all 0.12s;
  }
  .qbtn:hover { border-color: var(--accent); color: var(--accent); }
  .qbtn.active { background: var(--accent-light); border-color: var(--accent); color: var(--accent); font-weight: 600; }

  .sim-equiv { font-size: 12px; color: var(--text2); font-family: var(--mono); white-space: nowrap; }
  .sim-equiv strong { color: var(--text); font-weight: 700; }

  /* CONTROLS */
  .controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
    flex-wrap: wrap;
    gap: 8px;
  }

  .sort-btns { display: flex; gap: 3px; }
  .sbtn {
    background: transparent;
    border: 1px solid transparent;
    border-radius: 5px;
    color: var(--text3);
    font-size: 11px;
    font-family: var(--mono);
    padding: 5px 10px;
    cursor: pointer;
    transition: all 0.12s;
  }
  .sbtn:hover { color: var(--text2); background: var(--bg3); }
  .sbtn.active { background: var(--bg2); border-color: var(--border2); color: var(--text); font-weight: 600; box-shadow: var(--shadow); }

  .count-label { font-size: 11px; color: var(--text3); font-family: var(--mono); }

  /* TABLE */
  .table-wrap {
    background: var(--bg2);
    border: 1px solid var(--border);
    border-radius: 10px;
    overflow: hidden;
    box-shadow: var(--shadow2);
  }

  .table-head {
    display: grid;
    grid-template-columns: 2fr 1.3fr 0.8fr 1fr 1.3fr 0.8fr 1fr;
    background: var(--bg3);
    border-bottom: 1px solid var(--border);
    padding: 0 16px;
  }

  .th {
    padding: 10px 10px;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    color: var(--text3);
    font-family: var(--mono);
    font-weight: 600;
  }

  .table-row {
    display: grid;
    grid-template-columns: 2fr 1.3fr 0.8fr 1fr 1.3fr 0.8fr 1fr;
    padding: 0 16px;
    border-bottom: 1px solid var(--border);
    transition: background 0.12s;
    animation: fadeIn 0.3s ease forwards;
    opacity: 0;
  }

  .table-row:last-child { border-bottom: none; }
  .table-row:hover { background: var(--bg3); }

  .td {
    padding: 16px 10px;
    display: flex;
    align-items: center;
    font-family: var(--mono);
    font-size: 13px;
  }

  .platform-cell { display: flex; align-items: center; gap: 10px; }
  .platform-icon {
    width: 32px; height: 32px;
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    font-size: 11px;
    font-weight: 700;
    font-family: var(--mono);
    flex-shrink: 0;
  }
  .platform-name { font-weight: 700; font-size: 14px; color: var(--text); font-family: var(--sans); }
  .platform-chain { font-size: 10px; color: var(--text3); font-family: var(--mono); margin-top: 1px; }

  .tag {
    font-size: 9px;
    font-weight: 700;
    padding: 2px 6px;
    border-radius: 4px;
    letter-spacing: 0.5px;
    font-family: var(--mono);
  }

  .val-primary { font-size: 14px; font-weight: 700; color: var(--text); }
  .val-secondary { font-size: 10px; color: var(--text3); margin-top: 2px; }
  .val-blue { color: var(--accent); }
  .val-green { color: var(--green); }
  .val-yellow { color: var(--yellow); }
  .val-red { color: var(--red); }
  .val-purple { color: #7c3aed; }

  .safety-wrap { display: flex; flex-direction: column; gap: 4px; }
  .safety-bar-bg {
    height: 3px;
    background: var(--bg3);
    border-radius: 2px;
    overflow: hidden;
    width: 70px;
    border: 1px solid var(--border);
  }
  .safety-bar-fill { height: 100%; border-radius: 2px; }

  .cta-btn {
    display: inline-flex;
    align-items: center;
    padding: 6px 14px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
    font-family: var(--sans);
    text-decoration: none;
    transition: all 0.15s;
    white-space: nowrap;
    background: var(--accent);
    color: #fff;
    border: none;
  }
  .cta-btn:hover { opacity: 0.85; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(37,99,235,0.3); }

  .note-row {
    padding: 6px 16px 10px 78px;
    font-size: 11px;
    color: var(--text3);
    border-bottom: 1px solid var(--border);
    font-family: var(--sans);
    line-height: 1.6;
    background: var(--bg3);
  }
  .note-row:last-child { border-bottom: none; }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(4px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }

  @media(max-width: 900px) {
    .sidebar { display: none; }
    .main { margin-left: 0; }
    .stats-row { grid-template-columns: repeat(2, 1fr); }
    .table-head { display: none; }
    .table-row { grid-template-columns: 1fr; padding: 14px 16px; gap: 8px; }
    .td { padding: 0; }
    .content { padding: 16px; }
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
    if (sortKey === "ltv") return b.ltv - a.ltv;
    return 0;
  });

  const maxLoan = results[0]?.loan || 0;

  function safetyColor(drop) {
    if (!drop) return "#e2e8f0";
    if (drop > 50) return "#16a34a";
    if (drop > 30) return "#d97706";
    return "#dc2626";
  }

  function safetyClass(drop) {
    if (!drop) return "";
    if (drop > 50) return "val-green";
    if (drop > 30) return "val-yellow";
    return "val-red";
  }

  return (
    <>
      <style>{css}</style>
      <div className="layout">

        <aside className="sidebar">
          <div className="sidebar-logo">
            <div className="logo-mark">N</div>
            <div>
              <div className="logo-text">Nantix</div>
              <div className="logo-sub">CRYPTO LENDING</div>
            </div>
          </div>

          <div className="sidebar-section">
            <div className="sidebar-label">Navigation</div>
            <div className="sidebar-item active">
              <div className="sidebar-dot" style={{background:"#2563eb"}}/>
              Comparer les prêts
            </div>
            <div className="sidebar-item">
              <div className="sidebar-dot" style={{background:"#e2e8f0"}}/>
              Calculateur
            </div>
            <div className="sidebar-item">
              <div className="sidebar-dot" style={{background:"#e2e8f0"}}/>
              Liquidation
            </div>
          </div>

          <div className="sidebar-section">
            <div className="sidebar-label">Plateformes</div>
            {PLATFORMS.map(p => (
              <div key={p.slug} className="sidebar-item">
                <div className="sidebar-dot" style={{background: p.color}}/>
                {p.name}
              </div>
            ))}
          </div>

          <div className="sidebar-footer">
            <div>Données vérifiées le 05/03/2026</div>
            <div style={{marginTop:4}}>⚠️ Pas un conseil financier</div>
          </div>
        </aside>

        <main className="main">
          <div className="topbar">
            <div className="topbar-left">
              <span>Nantix</span>
              <span className="topbar-sep">/</span>
              <span className="topbar-current">Comparateur BTC</span>
            </div>
            <div className="btc-pill">
              <span className="btc-label">BTC/EUR</span>
              {loading
                ? <span className="btc-loading">···</span>
                : <span className="btc-price">{fmt(btcPrice)}</span>
              }
            </div>
          </div>

          <div className="content">
            <div className="page-header">
              <div className="page-title">Prêts collatéralisés Bitcoin</div>
              <div className="page-sub">Comparez {PLATFORMS.length} plateformes disponibles en France · Mis à jour le 05/03/2026</div>
            </div>

            <div className="stats-row">
              <div className="stat-box">
                <div className="stat-label">Plateformes comparées</div>
                <div className="stat-value">{PLATFORMS.length}</div>
                <div className="stat-sub">disponibles en France</div>
              </div>
              <div className="stat-box">
                <div className="stat-label">Max empruntable</div>
                <div className="stat-value">{amount > 0 ? fmt(maxLoan) : "—"}</div>
                <div className="stat-sub">pour {btcAmount} BTC</div>
              </div>
              <div className="stat-box">
                <div className="stat-label">Meilleur taux</div>
                <div className="stat-value">1.9%</div>
                <div className="stat-sub">APR via Nexo Platinum</div>
              </div>
              <div className="stat-box">
                <div className="stat-label">LTV maximum</div>
                <div className="stat-value">67%</div>
                <div className="stat-sub">via Aave V3 (DeFi)</div>
              </div>
            </div>

            <div className="sim-bar">
              <span className="sim-label">Simuler avec</span>
              <div className="sim-input-wrap">
                <input
                  className="sim-input"
                  type="number"
                  value={btcAmount}
                  onChange={e => setBtcAmount(e.target.value)}
                  step="0.1" min="0.01"
                />
                <span className="sim-unit">BTC</span>
              </div>
              <div className="quick-btns">
                {[0.1, 0.5, 1, 2, 5, 10].map(v => (
                  <button key={v} className={`qbtn${btcAmount === String(v) ? " active" : ""}`} onClick={() => setBtcAmount(String(v))}>{v}</button>
                ))}
              </div>
              {btcPrice && amount > 0 && (
                <span className="sim-equiv">= <strong>{fmt(collateral)}</strong> de collatéral</span>
              )}
            </div>

            <div className="controls">
              <div className="sort-btns">
                {SORTS.map(s => (
                  <button key={s.key} className={`sbtn${sortKey === s.key ? " active" : ""}`} onClick={() => setSortKey(s.key)}>{s.label}</button>
                ))}
              </div>
              <span className="count-label">{results.length} plateformes</span>
            </div>

            <div className="table-wrap" key={animKey}>
              <div className="table-head">
                <div className="th">Plateforme</div>
                <div className="th">Empruntable</div>
                <div className="th">LTV</div>
                <div className="th">Taux APR</div>
                <div className="th">Liquidation</div>
                <div className="th">Délai</div>
                <div className="th"></div>
              </div>

              {results.map((p, i) => (
                <>
                  <div key={p.name} className="table-row" style={{animationDelay:`${i*60}ms`}}>
                    <div className="td">
                      <div className="platform-cell">
                        <div className="platform-icon" style={{background: p.color+"18", color: p.color}}>
                          {p.name.slice(0,2).toUpperCase()}
                        </div>
                        <div>
                          <div style={{display:"flex", alignItems:"center", gap:6}}>
                            <span className="platform-name">{p.name}</span>
                            <span className="tag" style={{background: p.color+"18", color: p.color}}>{p.tag}</span>
                          </div>
                          <div className="platform-chain">{p.chain} · {p.regulated}</div>
                        </div>
                      </div>
                    </div>

                    <div className="td" style={{flexDirection:"column", alignItems:"flex-start"}}>
                      <div className="val-primary val-blue">
                        {amount > 0 ? fmt(p.loan) : "—"}
                      </div>
                      {p.monthly && amount > 0 && (
                        <div className="val-secondary">≈ {fmt(p.monthly)}/mois</div>
                      )}
                    </div>

                    <div className="td">
                      <span className="val-primary">{Math.round(p.ltv * 100)}%</span>
                    </div>

                    <div className="td">
                      {p.rate
                        ? <span className="val-primary">{p.rateDisplay}</span>
                        : <span className="val-purple" style={{fontStyle:"italic"}}>Variable</span>
                      }
                    </div>

                    <div className="td">
                      <div className="safety-wrap">
                        <div className={`val-primary ${safetyClass(p.drop)}`}>
                          {amount > 0 && p.drop !== null ? `-${p.drop}%` : "—"}
                        </div>
                        {amount > 0 && p.liqPrice > 0 && (
                          <div className="val-secondary">si BTC {"<"} {fmt(p.liqPrice)}</div>
                        )}
                        <div className="safety-bar-bg">
                          <div className="safety-bar-fill" style={{
                            width: p.drop ? `${Math.min(p.drop, 100)}%` : "0%",
                            background: safetyColor(p.drop)
                          }}/>
                        </div>
                      </div>
                    </div>

                    <div className="td">
                      <span className="val-primary">{p.delay}</span>
                    </div>

                    <div className="td">
                      <a href={p.url} target="_blank" rel="noopener noreferrer" className="cta-btn">
                        Emprunter →
                      </a>
                    </div>
                  </div>

                  <div key={p.name+"note"} className="note-row">
                    ℹ️ {p.rateNote}
                  </div>
                </>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
