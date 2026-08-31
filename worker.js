export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === "/") {

      // Country list: [value_lowercase, label, flag_code_for_flagcdn]
      const COUNTRIES = [
        ["all",  "Global — All Regions",  null],
        ["al",   "Albania",               "al"],
        ["ar",   "Argentina",             "ar"],
        ["am",   "Armenia",               "am"],
        ["au",   "Australia",             "au"],
        ["at",   "Austria",               "at"],
        ["bd",   "Bangladesh",            "bd"],
        ["by",   "Belarus",               "by"],
        ["be",   "Belgium",               "be"],
        ["br",   "Brazil",                "br"],
        ["bg",   "Bulgaria",              "bg"],
        ["ca",   "Canada",                "ca"],
        ["cn",   "China",                 "cn"],
        ["co",   "Colombia",              "co"],
        ["cz",   "Czechia",               "cz"],
        ["dk",   "Denmark",               "dk"],
        ["ee",   "Estonia",               "ee"],
        ["fi",   "Finland",               "fi"],
        ["fr",   "France",                "fr"],
        ["de",   "Germany",               "de"],
        ["gr",   "Greece",                "gr"],
        ["hk",   "Hong Kong",             "hk"],
        ["in",   "India",                 "in"],
        ["ir",   "Iran",                  "ir"],
        ["it",   "Italy",                 "it"],
        ["jp",   "Japan",                 "jp"],
        ["kz",   "Kazakhstan",            "kz"],
        ["kg",   "Kyrgyzstan",            "kg"],
        ["lv",   "Latvia",                "lv"],
        ["lt",   "Lithuania",             "lt"],
        ["my",   "Malaysia",              "my"],
        ["mx",   "Mexico",                "mx"],
        ["md",   "Moldova",               "md"],
        ["nl",   "Netherlands",           "nl"],
        ["no",   "Norway",                "no"],
        ["ph",   "Philippines",           "ph"],
        ["pl",   "Poland",                "pl"],
        ["pt",   "Portugal",              "pt"],
        ["ro",   "Romania",               "ro"],
        ["ru",   "Russia",                "ru"],
        ["sa",   "Saudi Arabia",          "sa"],
        ["sg",   "Singapore",             "sg"],
        ["sk",   "Slovakia",              "sk"],
        ["za",   "South Africa",          "za"],
        ["kr",   "South Korea",           "kr"],
        ["es",   "Spain",                 "es"],
        ["se",   "Sweden",                "se"],
        ["ch",   "Switzerland",           "ch"],
        ["tw",   "Taiwan",                "tw"],
        ["tr",   "Türkiye",               "tr"],
        ["th",   "Thailand",              "th"],
        ["ua",   "Ukraine",               "ua"],
        ["ae",   "UAE",                   "ae"],
        ["gb",   "United Kingdom",        "gb"],
        ["us",   "United States",         "us"],
      ];

      const FLAG_URL = (code) => code
        ? `https://flagcdn.com/20x15/${code}.png`
        : `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 15'><text y='12' font-size='14'>🌐</text></svg>`;

      const buildOptions = (forProxy = false) => COUNTRIES.map(([v, label, flag]) => {
        const val = forProxy && v !== "all" ? v.toUpperCase() : v;
        return `<div class="opt" data-value="${val}" data-label="${label}" data-flag="${flag||''}">
          <img class="flag-img" src="${FLAG_URL(flag)}" alt="" onerror="this.style.visibility='hidden'">
          <span>${label}</span>
        </div>`;
      }).join("");

      const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<title>Node Matrix</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

:root{
  --blue:#0a84ff;--indigo:#5e5ce6;--green:#30d158;
  --bg:#080814;--glass:rgba(255,255,255,0.07);--gb:rgba(255,255,255,0.13);
  --txt:#f5f5f7;--txt2:rgba(255,255,255,0.55);--txt3:rgba(255,255,255,0.3);
  --bd:rgba(255,255,255,0.12);
}

html{height:100%}
body{
  min-height:100%;background:var(--bg);color:var(--txt);
  font-family:'Nunito',-apple-system,BlinkMacSystemFont,'SF Pro Display',sans-serif;
  display:flex;flex-direction:column;align-items:center;
  padding:40px 16px 72px;position:relative;overflow-x:hidden;
  -webkit-font-smoothing:antialiased;
}

/* Blobs */
.blob{position:fixed;border-radius:50%;filter:blur(90px);opacity:.22;pointer-events:none;z-index:0}
.b1{width:520px;height:520px;background:radial-gradient(#5e5ce6,transparent 70%);top:-120px;left:-80px}
.b2{width:420px;height:420px;background:radial-gradient(#0a84ff,transparent 70%);top:60px;right:-60px}
.b3{width:360px;height:360px;background:radial-gradient(#30d158,transparent 70%);bottom:-40px;left:35%}

.wrap{width:100%;max-width:440px;position:relative;z-index:1}

/* Header */
.hd{text-align:center;margin-bottom:32px}
.hd .ey{font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:var(--txt3);margin-bottom:10px}
.hd h1{
  font-size:clamp(28px,7vw,46px);font-weight:900;letter-spacing:-1px;line-height:1.1;
  background:linear-gradient(145deg,#fff 0%,rgba(255,255,255,.65) 100%);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
}
.hd .tl{margin-top:10px;font-size:14px;font-weight:600;color:var(--txt2);display:flex;align-items:center;justify-content:center;gap:7px}
.dot{width:7px;height:7px;background:var(--green);border-radius:50%;box-shadow:0 0 10px var(--green);animation:pu 2.5s ease-in-out infinite;flex-shrink:0}
@keyframes pu{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.7)}}

/* Card — NO overflow:hidden so dropdown can escape */
.card{
  background:var(--glass);border:1px solid var(--bd);border-radius:24px;
  backdrop-filter:blur(48px) saturate(180%);-webkit-backdrop-filter:blur(48px) saturate(180%);
  box-shadow:0 2px 0 rgba(255,255,255,.1) inset,0 32px 80px rgba(0,0,0,.5),0 0 0 .5px rgba(255,255,255,.07);
  /* overflow:hidden removed — tabs header handles its own clipping */
}

/* Tabs header clips itself to top corners */
.tabs{
  display:flex;padding:6px;gap:4px;
  background:rgba(0,0,0,.25);
  border-bottom:1px solid rgba(255,255,255,.06);
  border-radius:24px 24px 0 0;
  overflow:hidden;
}

.tab-btn{
  flex:1;height:44px;border:none;border-radius:14px;background:transparent;
  color:var(--txt2);font-family:inherit;font-size:14px;font-weight:700;
  cursor:pointer;transition:all .2s;-webkit-tap-highlight-color:transparent;
}
.tab-btn:hover{color:var(--txt);background:rgba(255,255,255,.06)}
.tab-btn.ac,.tab-btn.ap{
  background:rgba(255,255,255,.12);color:var(--txt);
  box-shadow:0 1px 0 rgba(255,255,255,.15) inset,0 2px 8px rgba(0,0,0,.3);
}

/* Content */
.tc{display:none;padding:22px 18px 26px}
.tc.on{display:block}

/* Label */
.lbl{display:block;font-size:11px;font-weight:800;letter-spacing:.5px;text-transform:uppercase;color:var(--txt3);margin-bottom:8px;margin-top:20px}
.lbl:first-child{margin-top:0}

/* ── CUSTOM SELECT ── */
.cs{position:relative;user-select:none}

.cs-trigger{
  display:flex;align-items:center;gap:10px;
  padding:13px 16px;
  background:rgba(255,255,255,.06);
  border:1px solid rgba(255,255,255,.11);
  border-radius:14px;
  cursor:pointer;
  transition:border-color .18s,box-shadow .18s;
  min-height:50px;
}
.cs-trigger:hover{border-color:rgba(255,255,255,.22);background:rgba(255,255,255,.09)}
.cs-trigger.open{border-color:rgba(10,132,255,.55);box-shadow:0 0 0 3px rgba(10,132,255,.15)}
.pm .cs-trigger.open{border-color:rgba(94,92,230,.55);box-shadow:0 0 0 3px rgba(94,92,230,.15)}

.cs-flag{width:20px;height:15px;border-radius:2px;object-fit:cover;flex:0 0 20px;display:block}
.fluent-3d{width:20px;height:20px;border-radius:0;object-fit:contain;flex:0 0 20px;display:block}
.cs-glob{font-size:16px;line-height:1;width:20px;flex:0 0 20px;text-align:center;display:flex;justify-content:center;align-items:center;overflow:hidden}
.cs-label{flex:1;font-size:15px;font-weight:700;color:var(--txt)}
.cs-chevron{color:var(--txt3);font-size:12px;transition:transform .2s;flex-shrink:0}
.cs-trigger.open .cs-chevron{transform:rotate(180deg)}

/* Dropdown panel */
.cs-panel{
  display:none;position:absolute;left:0;right:0;top:calc(100% + 6px);
  background:#1c1c2e; /* 100% opaque, no bleed */
  border:1px solid var(--bd);border-radius:16px;
  box-shadow:0 20px 60px rgba(0,0,0,.6),0 0 0 .5px rgba(255,255,255,.08);
  z-index:100;overflow:hidden;
}
.cs-panel.show{display:block}

/* Search */
.cs-search-wrap{padding:8px 8px 0}
.cs-search{
  width:100%;padding:10px 13px;
  background:#0f0f1c; /* Solid dark background */
  border:1px solid rgba(255,255,255,.12);border-radius:10px;
  color:var(--txt);font-family:inherit;font-size:14px;font-weight:600;outline:none;
  -webkit-appearance:none;
}
.cs-search::placeholder{color:var(--txt3)}
.cs-search:focus{border-color:rgba(10,132,255,.5)}

/* Options list */
.cs-list{
  max-height:240px;overflow-y:auto;
  padding:8px;
  display:flex;flex-direction:column;gap:2px;
}
.cs-list::-webkit-scrollbar{width:4px}
.cs-list::-webkit-scrollbar-track{background:transparent}
.cs-list::-webkit-scrollbar-thumb{background:rgba(255,255,255,.15);border-radius:4px}

.opt{
  display:flex;align-items:center;gap:10px;
  padding:10px 8px; /* 8+8 = 16px perfect inset */
  border-radius:10px;cursor:pointer;
  font-size:14px;font-weight:700;color:var(--txt2);
  transition:background .12s,color .12s;
}
.opt:hover{background:rgba(255,255,255,.08);color:var(--txt)}
.opt.selected{background:rgba(255,255,255,.12);color:var(--txt)} /* Clean contrast */
.pm .opt.selected{background:rgba(255,255,255,.12);color:var(--txt)}
.opt.hidden{display:none}

.flag-img{width:20px;height:15px;border-radius:2px;object-fit:cover;flex-shrink:0}
.opt-glob{font-size:16px;line-height:1;width:20px;text-align:center;flex-shrink:0}

/* Buttons */
.btn{
  width:100%;min-height:52px;padding:14px 20px;margin-top:18px;
  border:none;border-radius:16px;font-family:inherit;font-size:16px;font-weight:800;
  cursor:pointer;transition:all .2s;-webkit-tap-highlight-color:transparent;touch-action:manipulation;
}
.btn-blue{background:linear-gradient(160deg,#1a8fff,#0a6ce0);color:#fff;box-shadow:0 4px 20px rgba(10,132,255,.38),0 1px 0 rgba(255,255,255,.2) inset}
.btn-blue:hover{box-shadow:0 6px 28px rgba(10,132,255,.55),0 1px 0 rgba(255,255,255,.2) inset;transform:translateY(-1px)}
.btn-blue:active{transform:translateY(0)}
.btn-indigo{background:linear-gradient(160deg,#7b79f0,#5e5ce6);color:#fff;box-shadow:0 4px 20px rgba(94,92,230,.38),0 1px 0 rgba(255,255,255,.2) inset}
.btn-indigo:hover{box-shadow:0 6px 28px rgba(94,92,230,.55),0 1px 0 rgba(255,255,255,.2) inset;transform:translateY(-1px)}
.btn-indigo:active{transform:translateY(0)}
.btn-green{background:linear-gradient(160deg,#3ee070,#30d158);color:#fff;box-shadow:0 4px 18px rgba(48,209,88,.32),0 1px 0 rgba(255,255,255,.22) inset;margin-top:12px}
.btn-green:hover{box-shadow:0 6px 26px rgba(48,209,88,.48),0 1px 0 rgba(255,255,255,.22) inset;transform:translateY(-1px)}
.btn-green:active{transform:translateY(0)}

/* Result */
.res{display:none;margin-top:20px}
.res-lbl{font-size:11px;font-weight:800;letter-spacing:.5px;text-transform:uppercase;color:var(--txt3);margin-bottom:8px}
.res-url{
  width:100%;padding:13px 15px;
  background:rgba(48,209,88,.07);border:1px solid rgba(48,209,88,.2);border-radius:14px;
  color:var(--green);font-family:inherit;font-size:13px;font-weight:700;
  outline:none;cursor:text;-webkit-appearance:none;
}

/* Info bar */
.ib{display:flex;align-items:center;gap:10px;font-size:13px;font-weight:600;color:var(--txt2);background:rgba(94,92,230,.1);border:1px solid rgba(94,92,230,.18);border-radius:14px;padding:12px 14px;margin-bottom:20px;line-height:1.5}

/* Two-col */
.two-col{display:grid;grid-template-columns:1fr;gap:0}

/* Footer */
.ft{margin-top:28px;text-align:center;font-size:12px;font-weight:600;color:var(--txt3);line-height:2}

/* Responsive */
@media(min-width:600px){
  body{padding:56px 32px 80px}
  .wrap{max-width:520px}
  .tc{padding:26px 26px 34px}
  .tab-btn{font-size:15px}
  .btn{font-size:17px}
  .two-col{grid-template-columns:1fr 1fr;gap:14px}
  .two-col>div>.lbl{margin-top:0}
  .cs-label,.opt{font-size:15px}
}
@media(min-width:900px){.wrap{max-width:580px}}
</style>
</head>
<body>
<div class="blob b1"></div>
<div class="blob b2"></div>
<div class="blob b3"></div>

<div class="wrap">
  <div class="hd">
    <div class="ey">Free · Open · Always Fresh</div>
    <h1>Node Matrix</h1>
    <div class="tl"><span class="dot"></span>v2nodes &amp; proxifly live feed</div>
  </div>

  <div class="card">
    <div class="tabs">
      <button class="tab-btn ac" id="btn-vpn" onclick="switchTab('vpn',this)">🛰 VPN Sub</button>
      <button class="tab-btn" id="btn-proxy" onclick="switchTab('proxy',this)">🔌 Proxy List</button>
    </div>

    <!-- VPN Tab -->
    <div id="tab-vpn" class="tc on">
      <span class="lbl">Country</span>
      <div class="cs" id="cs-vpn"></div>
      <button class="btn btn-blue" onclick="generateVpn()">Generate Subscription Link</button>
      <div id="vpn-result" class="res">
        <div class="res-lbl">Paste into Shadowrocket or v2rayNG</div>
        <input type="text" class="res-url" id="vpn-link" readonly>
        <button class="btn btn-green" onclick="copyLink('vpn-link', this)">Copy Link</button>
      </div>
    </div>

    <!-- Proxy Tab -->
    <div id="tab-proxy" class="tc pm">
      <div class="two-col">
        <div>
          <span class="lbl">Country</span>
          <div class="cs" id="cs-proxy"></div>
        </div>
        <div>
          <span class="lbl">Protocol</span>
          <div class="cs" id="cs-protocol"></div>
        </div>
      </div>
      <button class="btn btn-indigo" onclick="generateProxy()">Generate Proxy Feed</button>
      <div id="proxy-result" class="res">
        <div class="res-lbl">Paste into your tool or browser</div>
        <input type="text" class="res-url" id="proxy-link" readonly>
        <button class="btn btn-green" onclick="copyLink('proxy-link', this)">Copy Link</button>
      </div>
    </div>
  </div>

  <div class="ft">Cloudflare Worker &nbsp;·&nbsp; Auto-deploy from GitHub &nbsp;·&nbsp; No data stored</div>
</div>

<script>
// ── Country data ──
const COUNTRIES = ${JSON.stringify(COUNTRIES)};

const FLUENT = (folder, file) => \`https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@latest/assets/\${folder}/3D/\${file}_3d.png\`;

const PROTOCOLS = [
  ["all", "All protocols", FLUENT("Globe%20with%20meridians", "globe_with_meridians")],
  ["http", "HTTP", FLUENT("Page%20facing%20up", "page_facing_up")],
  ["https", "HTTPS", FLUENT("Locked", "locked")],
  ["socks4", "SOCKS4", FLUENT("Socks", "socks")],
  ["socks5", "SOCKS5", FLUENT("Rocket", "rocket")]
];

const FLAG = code => code ? \`https://flagcdn.com/20x15/\${code}.png\` : null;

// ── Build custom select ──
function buildSelect(containerId, optionsList, isProxy, hideSearch = false) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const opts = optionsList.map(([v, label, icon]) => {
    const val = isProxy && v !== 'all' ? v.toUpperCase() : v;
    return { val, label, icon };
  });

  let current = opts[0];
  let open = false;

  function flagHtml(icon, label) {
    if (!icon) return \`<img class="cs-flag fluent-3d" src="\${FLUENT('Globe%20with%20meridians', 'globe_with_meridians')}" alt="Global">\`;
    if (icon.startsWith('http')) {
      return \`<img class="cs-flag fluent-3d" src="\${icon}" alt="\${label}">\`;
    }
    if (icon.length === 2 && /^[a-z]{2}$/.test(icon)) {
      return \`<img class="cs-flag" src="\${FLAG(icon)}" alt="\${label}" onerror="this.style.visibility='hidden'">\`;
    }
    return \`<span class="cs-glob">\${icon}</span>\`;
  }

  function render() {
    el.innerHTML = \`
      <div class="cs-trigger \${open ? 'open' : ''}" onclick="toggleCS(event, '\${containerId}')">
        \${flagHtml(current.icon, current.label)}
        <span class="cs-label">\${current.label}</span>
        <span class="cs-chevron">\${open ? '▴' : '▾'}</span>
      </div>
      <div class="cs-panel \${open ? 'show' : ''}" id="panel-\${containerId}">
        \${hideSearch ? '' : \`<div class="cs-search-wrap">
          <input class="cs-search" placeholder="Search..." oninput="filterCS(event, '\${containerId}')" onclick="event.stopPropagation()">
        </div>\`}
        <div class="cs-list">
          \${opts.map(o => \`
            <div class="opt \${o.val === current.val ? 'selected' : ''}" data-val="\${o.val}" onclick="selectCS(event, '\${containerId}', '\${o.val}')">
              \${flagHtml(o.icon, o.label)}
              <span>\${o.label}</span>
            </div>
          \`).join('')}
        </div>
      </div>
    \`;
    if (typeof twemoji !== 'undefined') twemoji.parse(el);
  }

  el._getVal = () => current.val;
  el._opts   = () => opts;
  el._select = (val) => {
    current = opts.find(o => o.val === val) || opts[0];
    open = false;
    el.style.zIndex = 'auto';
    render();
  };
  el._toggle = () => {
    open = !open;
    el.style.zIndex = open ? '200' : 'auto';
    render();
    if (open && !hideSearch) {
      setTimeout(() => el.querySelector('.cs-search')?.focus(), 50);
    }
  };
  el._filter = (q) => {
    el.querySelectorAll('.opt').forEach(o => {
      o.classList.toggle('hidden', !o.textContent.toLowerCase().includes(q.toLowerCase()));
    });
  };

  render();
}

window.toggleCS = (e, id) => {
  e.stopPropagation();
  // Close all others
  ['cs-vpn','cs-proxy','cs-protocol'].forEach(cid => {
    if (cid !== id) document.getElementById(cid)?._toggle && closeCS(cid);
  });
  document.getElementById(id)?._toggle();
};

function closeCS(id) {
  const el = document.getElementById(id);
  if (el && el.querySelector('.cs-panel.show')) {
    el._select(el._getVal()); // re-render closed
  }
}

window.selectCS = (e, id, val) => {
  e.stopPropagation();
  document.getElementById(id)._select(val);
};

window.filterCS = (e, id) => {
  document.getElementById(id)._filter(e.target.value);
};

// Close dropdowns on outside click
document.addEventListener('click', () => {
  ['cs-vpn','cs-proxy','cs-protocol'].forEach(id => closeCS(id));
});

// Init
buildSelect('cs-vpn',   COUNTRIES, false);
buildSelect('cs-proxy', COUNTRIES, true);
buildSelect('cs-protocol', PROTOCOLS, false, true);

// ── Tab switch ──
function switchTab(tab, btn) {
  document.querySelectorAll('.tc').forEach(e => e.classList.remove('on'));
  document.querySelectorAll('.tab-btn').forEach(e => { e.classList.remove('ac'); e.classList.remove('ap'); });
  document.getElementById('tab-' + tab).classList.add('on');
  btn.classList.add(tab === 'proxy' ? 'ap' : 'ac');
  // close dropdowns on tab switch
  ['cs-vpn','cs-proxy','cs-protocol'].forEach(id => closeCS(id));
}

// ── Generate links ──
function generateVpn() {
  const c = document.getElementById('cs-vpn')._getVal();
  document.getElementById('vpn-link').value = location.origin + '/sub?country=' + c;
  document.getElementById('vpn-result').style.display = 'block';
}

function generateProxy() {
  const c = document.getElementById('cs-proxy')._getVal();
  const p = document.getElementById('cs-protocol')._getVal();
  document.getElementById('proxy-link').value = location.origin + '/proxy?country=' + c + '&protocol=' + p;
  document.getElementById('proxy-result').style.display = 'block';
}

// ── Copy ──
function copyLink(id, btn) {
  const el = document.getElementById(id);
  el.select();
  document.execCommand('copy');
  const orig = btn.textContent;
  btn.textContent = 'Copied!';
  setTimeout(() => btn.textContent = orig, 1500);
}

// ── Twemoji: replace all emoji on page with Twemoji SVGs ──
const TW_BASE = 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/';
function applyTwemoji(node) {
  if (typeof twemoji !== 'undefined') {
    twemoji.parse(node, { folder: 'svg', ext: '.svg', base: TW_BASE });
  }
}

// Parse static content immediately
applyTwemoji(document.body);

// Auto-parse any dynamically added nodes (e.g. dropdown render)
const _observer = new MutationObserver(mutations => {
  mutations.forEach(m => m.addedNodes.forEach(n => {
    if (n.nodeType === 1) applyTwemoji(n);
  }));
});
_observer.observe(document.body, { childList: true, subtree: true });

</script>
</body>
</html>`;

      return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
    }

    // ── VPN SUB ──
    if (url.pathname === "/sub") {
      const countryCode = url.searchParams.get("country") || "all";
      try {
        const targetUrl = countryCode === "all"
          ? "https://www.v2nodes.com/"
          : `https://www.v2nodes.com/country/${countryCode}/`;
        const res = await fetch(targetUrl, {
          headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" }
        });
        const html = await res.text();
        const match = html.match(/data-config="([^"]+subscriptions\/country\/[^"]+)"/i);
        if (match?.[1]) {
          const data = await (await fetch(match[1])).text();
          return new Response(data, {
            headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store, no-cache" }
          });
        }
        return new Response("Error: No data found for this country on v2nodes", { status: 404 });
      } catch (e) {
        return new Response("System error: " + e.message, { status: 500 });
      }
    }

    // ── PROXY LIST ──
    if (url.pathname === "/proxy") {
      const country  = (url.searchParams.get("country") || "all").toUpperCase();
      const protocol = (url.searchParams.get("protocol") || "all").toLowerCase();
      const format   = (url.searchParams.get("format") || "text").toLowerCase();
      const validProtocols = ["http", "https", "socks4", "socks5"];
      const cdnUrl = (protocol !== "all" && validProtocols.includes(protocol))
        ? `https://cdn.jsdelivr.net/gh/proxifly/free-proxy-list@main/proxies/protocols/${protocol}/data.json`
        : `https://cdn.jsdelivr.net/gh/proxifly/free-proxy-list@main/proxies/all/data.json`;
      try {
        const cdnRes = await fetch(cdnUrl, { headers: { "Accept": "application/json" } });
        if (!cdnRes.ok) return new Response("Error: Cannot load proxy list from proxifly CDN", { status: 502 });
        const list = await cdnRes.json();
        const filtered = country === "ALL"
          ? list
          : list.filter(p => p.geolocation?.country?.toUpperCase() === country);
        if (filtered.length === 0)
          return new Response(`No proxies found for country=${country} protocol=${protocol}`, { status: 404 });
        if (format === "json")
          return new Response(JSON.stringify(filtered, null, 2), {
            headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store, no-cache" }
          });
        return new Response(filtered.map(p => p.proxy).join("\n"), {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "no-store, no-cache",
            "X-Proxy-Count": String(filtered.length),
          }
        });
      } catch (e) {
        return new Response("System error: " + e.message, { status: 500 });
      }
    }

    return new Response("Invalid path. Valid: / | /sub?country=xx | /proxy?country=xx&protocol=yy", { status: 404 });
  }
};
