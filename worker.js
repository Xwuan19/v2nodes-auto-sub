export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === "/") {
      const COUNTRIES_VPN = `
        <option value="all">🌐 Global — All regions</option>
        <option value="al">🇦🇱 Albania</option><option value="ar">🇦🇷 Argentina</option>
        <option value="am">🇦🇲 Armenia</option><option value="au">🇦🇺 Australia</option>
        <option value="at">🇦🇹 Austria</option><option value="bd">🇧🇩 Bangladesh</option>
        <option value="by">🇧🇾 Belarus</option><option value="be">🇧🇪 Belgium</option>
        <option value="br">🇧🇷 Brazil</option><option value="bg">🇧🇬 Bulgaria</option>
        <option value="ca">🇨🇦 Canada</option><option value="cn">🇨🇳 China</option>
        <option value="co">🇨🇴 Colombia</option><option value="cz">🇨🇿 Czechia</option>
        <option value="dk">🇩🇰 Denmark</option><option value="ee">🇪🇪 Estonia</option>
        <option value="fi">🇫🇮 Finland</option><option value="fr">🇫🇷 France</option>
        <option value="de">🇩🇪 Germany</option><option value="gr">🇬🇷 Greece</option>
        <option value="hk">🇭🇰 Hong Kong</option><option value="in">🇮🇳 India</option>
        <option value="ir">🇮🇷 Iran</option><option value="it">🇮🇹 Italy</option>
        <option value="jp">🇯🇵 Japan</option><option value="kz">🇰🇿 Kazakhstan</option>
        <option value="kg">🇰🇬 Kyrgyzstan</option><option value="lv">🇱🇻 Latvia</option>
        <option value="lt">🇱🇹 Lithuania</option><option value="my">🇲🇾 Malaysia</option>
        <option value="mx">🇲🇽 Mexico</option><option value="md">🇲🇩 Moldova</option>
        <option value="nl">🇳🇱 Netherlands</option><option value="no">🇳🇴 Norway</option>
        <option value="ph">🇵🇭 Philippines</option><option value="pl">🇵🇱 Poland</option>
        <option value="pt">🇵🇹 Portugal</option><option value="ro">🇷🇴 Romania</option>
        <option value="ru">🇷🇺 Russia</option><option value="sa">🇸🇦 Saudi Arabia</option>
        <option value="sg">🇸🇬 Singapore</option><option value="sk">🇸🇰 Slovakia</option>
        <option value="za">🇿🇦 South Africa</option><option value="kr">🇰🇷 South Korea</option>
        <option value="es">🇪🇸 Spain</option><option value="se">🇸🇪 Sweden</option>
        <option value="ch">🇨🇭 Switzerland</option><option value="tw">🇹🇼 Taiwan</option>
        <option value="tr">🇹🇷 Türkiye</option><option value="th">🇹🇭 Thailand</option>
        <option value="ua">🇺🇦 Ukraine</option><option value="ae">🇦🇪 UAE</option>
        <option value="gb">🇬🇧 United Kingdom</option><option value="us">🇺🇸 United States</option>`;

      const COUNTRIES_PROXY = COUNTRIES_VPN
        .replace(/value="all"/g, 'value="all"')
        .replace(/value="([a-z]{2})"/g, (_, c) => `value="${c.toUpperCase()}"`);

      const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<title>Node Matrix</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

:root {
  --blue:   #0a84ff;
  --indigo: #5e5ce6;
  --green:  #30d158;
  --teal:   #40c8e0;
  --pink:   #ff375f;
  --bg:     #0a0a14;
  --glass:  rgba(255,255,255,0.07);
  --glass-border: rgba(255,255,255,0.14);
  --txt:    #f5f5f7;
  --txt2:   rgba(255,255,255,0.55);
  --txt3:   rgba(255,255,255,0.32);
}

html { height: 100%; }

body {
  min-height: 100%;
  background: var(--bg);
  color: var(--txt);
  font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 16px 72px;
  position: relative;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

/* ── Background gradient blobs ── */
.blob {
  position: fixed;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.28;
  pointer-events: none;
  z-index: 0;
}
.blob-1 { width: 500px; height: 500px; background: radial-gradient(circle, #5e5ce6, transparent 70%); top: -100px; left: -100px; }
.blob-2 { width: 400px; height: 400px; background: radial-gradient(circle, #0a84ff, transparent 70%); top: 100px; right: -80px; }
.blob-3 { width: 350px; height: 350px; background: radial-gradient(circle, #30d158, transparent 70%); bottom: 0; left: 30%; }

/* ── Layout ── */
.wrap {
  width: 100%;
  max-width: 440px;
  position: relative;
  z-index: 1;
}

/* ── Header ── */
.hd { text-align: center; margin-bottom: 32px; }

.hd .eyebrow {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--txt3);
  margin-bottom: 10px;
}

.hd h1 {
  font-size: clamp(28px, 7vw, 44px);
  font-weight: 900;
  letter-spacing: -1px;
  line-height: 1.1;
  background: linear-gradient(145deg, #ffffff 0%, rgba(255,255,255,0.7) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hd .tagline {
  margin-top: 10px;
  font-size: 14px;
  font-weight: 600;
  color: var(--txt2);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
}

.dot {
  width: 7px; height: 7px;
  background: var(--green);
  border-radius: 50%;
  box-shadow: 0 0 10px var(--green);
  animation: pulse 2.5s ease-in-out infinite;
  flex-shrink: 0;
}
@keyframes pulse {
  0%,100% { opacity:1; transform:scale(1); }
  50% { opacity:.45; transform:scale(.7); }
}

/* ── Glass card ── */
.card {
  background: var(--glass);
  border: 1px solid var(--glass-border);
  border-radius: 24px;
  backdrop-filter: blur(48px) saturate(180%);
  -webkit-backdrop-filter: blur(48px) saturate(180%);
  box-shadow:
    0 2px 0 rgba(255,255,255,0.1) inset,
    0 32px 80px rgba(0,0,0,0.5),
    0 0 0 0.5px rgba(255,255,255,0.08);
  overflow: hidden;
}

/* ── Tabs ── */
.tabs {
  display: flex;
  padding: 6px;
  gap: 4px;
  background: rgba(0,0,0,0.2);
  border-bottom: 1px solid rgba(255,255,255,0.06);
}

.tab-btn {
  flex: 1;
  height: 44px;
  border: none;
  border-radius: 14px;
  background: transparent;
  color: var(--txt2);
  font-family: inherit;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all .2s;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}
.tab-btn:hover { color: var(--txt); background: rgba(255,255,255,0.06); }
.tab-btn.ac {
  background: rgba(255,255,255,0.12);
  color: var(--txt);
  box-shadow: 0 1px 0 rgba(255,255,255,0.15) inset, 0 2px 8px rgba(0,0,0,0.3);
}
.tab-btn.ap {
  background: rgba(255,255,255,0.12);
  color: var(--txt);
  box-shadow: 0 1px 0 rgba(255,255,255,0.15) inset, 0 2px 8px rgba(0,0,0,0.3);
}

/* ── Content ── */
.tc { display: none; padding: 24px 20px 28px; }
.tc.on { display: block; }

/* ── Label ── */
.lbl {
  display: block;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: .5px;
  text-transform: uppercase;
  color: var(--txt3);
  margin-bottom: 8px;
  margin-top: 20px;
}
.lbl:first-child { margin-top: 0; }

/* ── Select wrapper ── */
.sw { position: relative; }
.sw::after {
  content: '';
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 10px; height: 6px;
  background: var(--txt3);
  pointer-events: none;
  clip-path: polygon(0 0, 100% 0, 50% 100%);
}

/* ── Select / Input ── */
select, input[type=text] {
  width: 100%;
  padding: 15px 44px 15px 16px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 14px;
  color: var(--txt);
  font-family: inherit;
  font-size: 16px;
  font-weight: 600;
  outline: none;
  transition: border-color .18s, box-shadow .18s;
  -webkit-appearance: none;
  appearance: none;
  cursor: pointer;
}
select:focus, input[type=text]:focus {
  border-color: rgba(10,132,255,0.6);
  box-shadow: 0 0 0 3px rgba(10,132,255,0.18);
  background: rgba(255,255,255,0.09);
}
select option { background: #1c1c2e; color: #f5f5f7; }

.pm select, .pm input[type=text] { border-color: rgba(94,92,230,0.25); }
.pm select:focus, .pm input[type=text]:focus {
  border-color: rgba(94,92,230,0.65);
  box-shadow: 0 0 0 3px rgba(94,92,230,0.18);
}

/* ── Buttons ── */
.btn {
  width: 100%;
  min-height: 54px;
  padding: 15px 20px;
  margin-top: 20px;
  border: none;
  border-radius: 16px;
  font-family: inherit;
  font-size: 16px;
  font-weight: 800;
  letter-spacing: .2px;
  cursor: pointer;
  transition: all .2s;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}

.btn-blue {
  background: linear-gradient(160deg, #1a8fff, #0a6ce0);
  color: #fff;
  box-shadow: 0 4px 20px rgba(10,132,255,0.4), 0 1px 0 rgba(255,255,255,0.2) inset;
}
.btn-blue:hover { box-shadow: 0 6px 28px rgba(10,132,255,0.55), 0 1px 0 rgba(255,255,255,0.2) inset; transform: translateY(-1px); }
.btn-blue:active { transform: translateY(0); box-shadow: 0 2px 12px rgba(10,132,255,0.4); }

.btn-indigo {
  background: linear-gradient(160deg, #7b79f0, #5e5ce6);
  color: #fff;
  box-shadow: 0 4px 20px rgba(94,92,230,0.4), 0 1px 0 rgba(255,255,255,0.2) inset;
}
.btn-indigo:hover { box-shadow: 0 6px 28px rgba(94,92,230,0.55), 0 1px 0 rgba(255,255,255,0.2) inset; transform: translateY(-1px); }
.btn-indigo:active { transform: translateY(0); }

.btn-green {
  background: linear-gradient(160deg, #3ee070, #30d158);
  color: #fff;
  box-shadow: 0 4px 18px rgba(48,209,88,0.35), 0 1px 0 rgba(255,255,255,0.25) inset;
  margin-top: 12px;
}
.btn-green:hover { box-shadow: 0 6px 26px rgba(48,209,88,0.5), 0 1px 0 rgba(255,255,255,0.25) inset; transform: translateY(-1px); }
.btn-green:active { transform: translateY(0); }

/* ── Result ── */
.res { display: none; margin-top: 20px; }
.res-lbl { font-size: 12px; font-weight: 800; letter-spacing: .5px; text-transform: uppercase; color: var(--txt3); margin-bottom: 8px; }

input[type=text][readonly] {
  color: var(--green);
  background: rgba(48,209,88,0.08);
  border-color: rgba(48,209,88,0.2);
  font-size: 13px;
  font-weight: 700;
  padding: 14px 16px;
  border-radius: 14px;
  cursor: text;
}

/* ── Info banner ── */
.ib {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  font-weight: 600;
  color: var(--txt2);
  background: rgba(94,92,230,0.1);
  border: 1px solid rgba(94,92,230,0.2);
  border-radius: 14px;
  padding: 12px 14px;
  margin-bottom: 20px;
  line-height: 1.5;
}
.ib-icon { font-size: 18px; flex-shrink: 0; }

/* ── Two-col ── */
.two-col { display: grid; grid-template-columns: 1fr; gap: 0; }

/* ── Footer ── */
.ft {
  margin-top: 28px;
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  color: var(--txt3);
  line-height: 2;
}

/* ── RESPONSIVE ── */
@media(min-width: 600px) {
  body { padding: 56px 32px 80px; }
  .wrap { max-width: 520px; }
  .tc { padding: 28px 28px 36px; }
  .tab-btn { font-size: 15px; }
  select, input[type=text] { font-size: 15px; padding: 14px 44px 14px 16px; }
  input[type=text][readonly] { font-size: 14px; }
  .btn { font-size: 17px; }
  .two-col { grid-template-columns: 1fr 1fr; gap: 14px; }
  .two-col > div > .lbl { margin-top: 0; }
}
@media(min-width: 900px) {
  .wrap { max-width: 580px; }
}
</style>
</head>
<body>
<div class="blob blob-1"></div>
<div class="blob blob-2"></div>
<div class="blob blob-3"></div>

<div class="wrap">
  <!-- Header -->
  <div class="hd">
    <div class="eyebrow">Free · Open · Always Fresh</div>
    <h1>Node Matrix</h1>
    <div class="tagline"><span class="dot"></span>v2nodes &amp; proxifly live feed</div>
  </div>

  <!-- Card -->
  <div class="card">
    <div class="tabs">
      <button class="tab-btn ac" id="btn-vpn" onclick="switchTab('vpn',this)">🛰 VPN Sub</button>
      <button class="tab-btn" id="btn-proxy" onclick="switchTab('proxy',this)">🔌 Proxy List</button>
    </div>

    <!-- VPN Tab -->
    <div id="tab-vpn" class="tc on">
      <span class="lbl">Country</span>
      <div class="sw"><select id="vpn-country">${COUNTRIES_VPN}</select></div>
      <button class="btn btn-blue" onclick="generateVpn()">Generate Subscription Link</button>
      <div id="vpn-result" class="res">
        <div class="res-lbl">Your link — paste into Shadowrocket or v2rayNG</div>
        <input type="text" id="vpn-link" readonly>
        <button class="btn btn-green" onclick="copyLink('vpn-link')">Copy Link</button>
      </div>
    </div>

    <!-- Proxy Tab -->
    <div id="tab-proxy" class="tc pm">
      <div class="ib">
        <span class="ib-icon">⚡</span>
        <span>Sourced from proxifly — validated every 5 minutes, 100+ countries</span>
      </div>
      <div class="two-col">
        <div>
          <span class="lbl">Country</span>
          <div class="sw"><select id="proxy-country">${COUNTRIES_PROXY}</select></div>
        </div>
        <div>
          <span class="lbl">Protocol</span>
          <div class="sw">
            <select id="proxy-protocol">
              <option value="all">All protocols</option>
              <option value="http">HTTP</option>
              <option value="https">HTTPS</option>
              <option value="socks4">SOCKS4</option>
              <option value="socks5">SOCKS5</option>
            </select>
          </div>
        </div>
      </div>
      <button class="btn btn-indigo" onclick="generateProxy()">Generate Proxy Feed</button>
      <div id="proxy-result" class="res">
        <div class="res-lbl">Your link — paste into your tool or browser</div>
        <input type="text" id="proxy-link" readonly>
        <button class="btn btn-green" onclick="copyLink('proxy-link')">Copy Link</button>
      </div>
    </div>
  </div>

  <div class="ft">
    Cloudflare Worker &nbsp;·&nbsp; Auto-deploy from GitHub &nbsp;·&nbsp; No data stored
  </div>
</div>

<script>
function switchTab(tab,btn){
  document.querySelectorAll('.tc').forEach(e=>e.classList.remove('on'));
  document.querySelectorAll('.tab-btn').forEach(e=>{e.classList.remove('ac');e.classList.remove('ap');});
  document.getElementById('tab-'+tab).classList.add('on');
  btn.classList.add(tab==='proxy'?'ap':'ac');
}
function generateVpn(){
  const c=document.getElementById('vpn-country').value;
  document.getElementById('vpn-link').value=location.origin+'/sub?country='+c;
  document.getElementById('vpn-result').style.display='block';
}
function generateProxy(){
  const c=document.getElementById('proxy-country').value;
  const p=document.getElementById('proxy-protocol').value;
  document.getElementById('proxy-link').value=location.origin+'/proxy?country='+c+'&protocol='+p;
  document.getElementById('proxy-result').style.display='block';
}
function copyLink(id){
  const el=document.getElementById(id);
  el.select();
  document.execCommand('copy');
  const orig=el.nextElementSibling.textContent;
  el.nextElementSibling.textContent='Copied!';
  setTimeout(()=>{el.nextElementSibling.textContent=orig;},1500);
}
</script>
</body>
</html>`;
      return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
    }

    // ==========================================
    // 2. VPN SUB — v2nodes scraper
    // ==========================================
    if (url.pathname === "/sub") {
      const countryCode = url.searchParams.get("country") || "all";
      try {
        const targetUrl = countryCode === "all"
          ? "https://www.v2nodes.com/"
          : `https://www.v2nodes.com/country/${countryCode}/`;
        const response = await fetch(targetUrl, {
          headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" }
        });
        const pageHtml = await response.text();
        const match = pageHtml.match(/data-config="([^"]+subscriptions\/country\/[^"]+)"/i);
        if (match && match[1]) {
          const subData = await (await fetch(match[1])).text();
          return new Response(subData, {
            headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store, no-cache" }
          });
        }
        return new Response("Error: No data found for this country on v2nodes", { status: 404 });
      } catch (e) {
        return new Response("System error: " + e.message, { status: 500 });
      }
    }

    // ==========================================
    // 3. PROXY LIST — proxifly via jsDelivr CDN
    // ==========================================
    if (url.pathname === "/proxy") {
      const countryCode = (url.searchParams.get("country") || "all").toUpperCase();
      const protocol   = (url.searchParams.get("protocol") || "all").toLowerCase();
      const format     = (url.searchParams.get("format") || "text").toLowerCase();
      const validProtocols = ["http", "https", "socks4", "socks5"];
      const cdnUrl = (protocol !== "all" && validProtocols.includes(protocol))
        ? `https://cdn.jsdelivr.net/gh/proxifly/free-proxy-list@main/proxies/protocols/${protocol}/data.json`
        : `https://cdn.jsdelivr.net/gh/proxifly/free-proxy-list@main/proxies/all/data.json`;
      try {
        const cdnRes = await fetch(cdnUrl, { headers: { "Accept": "application/json" } });
        if (!cdnRes.ok) return new Response("Error: Cannot load proxy list from proxifly CDN", { status: 502 });
        const list = await cdnRes.json();
        const filtered = countryCode === "ALL"
          ? list
          : list.filter(p => p.geolocation?.country?.toUpperCase() === countryCode);
        if (filtered.length === 0)
          return new Response(`No proxies found for country=${countryCode} protocol=${protocol}`, { status: 404 });
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

    return new Response("Invalid path. Valid paths: / | /sub?country=xx | /proxy?country=xx&protocol=yy", { status: 404 });
  }
};
