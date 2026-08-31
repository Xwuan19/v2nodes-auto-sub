export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // ==========================================
    // 1. NẾU VÀO BẰNG TRÌNH DUYỆT -> HIỂN THỊ GIAO DIỆN WEB
    // ==========================================
    if (url.pathname === "/") {
      const COUNTRIES_VPN = `
          <option value="all">🌐 GLOBAL — All regions</option>
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

      const COUNTRIES_PROXY = `
          <option value="all">🌐 GLOBAL — No filter</option>
          <option value="AL">🇦🇱 Albania</option><option value="AR">🇦🇷 Argentina</option>
          <option value="AM">🇦🇲 Armenia</option><option value="AU">🇦🇺 Australia</option>
          <option value="AT">🇦🇹 Austria</option><option value="BD">🇧🇩 Bangladesh</option>
          <option value="BY">🇧🇾 Belarus</option><option value="BE">🇧🇪 Belgium</option>
          <option value="BR">🇧🇷 Brazil</option><option value="BG">🇧🇬 Bulgaria</option>
          <option value="CA">🇨🇦 Canada</option><option value="CN">🇨🇳 China</option>
          <option value="CO">🇨🇴 Colombia</option><option value="CZ">🇨🇿 Czechia</option>
          <option value="DK">🇩🇰 Denmark</option><option value="EE">🇪🇪 Estonia</option>
          <option value="FI">🇫🇮 Finland</option><option value="FR">🇫🇷 France</option>
          <option value="DE">🇩🇪 Germany</option><option value="GR">🇬🇷 Greece</option>
          <option value="HK">🇭🇰 Hong Kong</option><option value="IN">🇮🇳 India</option>
          <option value="IR">🇮🇷 Iran</option><option value="IT">🇮🇹 Italy</option>
          <option value="JP">🇯🇵 Japan</option><option value="KZ">🇰🇿 Kazakhstan</option>
          <option value="KG">🇰🇬 Kyrgyzstan</option><option value="LV">🇱🇻 Latvia</option>
          <option value="LT">🇱🇹 Lithuania</option><option value="MY">🇲🇾 Malaysia</option>
          <option value="MX">🇲🇽 Mexico</option><option value="MD">🇲🇩 Moldova</option>
          <option value="NL">🇳🇱 Netherlands</option><option value="NO">🇳🇴 Norway</option>
          <option value="PH">🇵🇭 Philippines</option><option value="PL">🇵🇱 Poland</option>
          <option value="PT">🇵🇹 Portugal</option><option value="RO">🇷🇴 Romania</option>
          <option value="RU">🇷🇺 Russia</option><option value="SA">🇸🇦 Saudi Arabia</option>
          <option value="SG">🇸🇬 Singapore</option><option value="SK">🇸🇰 Slovakia</option>
          <option value="ZA">🇿🇦 South Africa</option><option value="KR">🇰🇷 South Korea</option>
          <option value="ES">🇪🇸 Spain</option><option value="SE">🇸🇪 Sweden</option>
          <option value="CH">🇨🇭 Switzerland</option><option value="TW">🇹🇼 Taiwan</option>
          <option value="TR">🇹🇷 Türkiye</option><option value="TH">🇹🇭 Thailand</option>
          <option value="UA">🇺🇦 Ukraine</option><option value="AE">🇦🇪 UAE</option>
          <option value="GB">🇬🇧 United Kingdom</option><option value="US">🇺🇸 United States</option>`;

      const html = `<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>NODE_MATRIX :: v2nodes-auto-sub</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@700;900&display=swap');

:root {
  --c:   #00e5ff;
  --p:   #c060ff;
  --g:   #00e676;
  --dark: #060612;
  --panel: rgba(8,8,22,0.96);
  --bd:  rgba(255,255,255,0.09);
  --txt: rgba(255,255,255,0.82);
  --dim: rgba(255,255,255,0.38);
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}

body {
  background: var(--dark);
  color: var(--txt);
  font-family: 'Share Tech Mono','Courier New',monospace;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 36px 16px 64px;
  position: relative;
  overflow-x: hidden;
}

/* ambient glow top-center */
body::before {
  content:'';
  position:fixed;
  top:-20%;left:50%;
  transform:translateX(-50%);
  width:700px;height:500px;
  background:radial-gradient(ellipse,rgba(0,229,255,0.09) 0%,transparent 65%);
  pointer-events:none;z-index:0;
}
/* grid */
body::after {
  content:'';
  position:fixed;inset:0;
  background-image:
    linear-gradient(rgba(0,229,255,0.025) 1px,transparent 1px),
    linear-gradient(90deg,rgba(0,229,255,0.025) 1px,transparent 1px);
  background-size:48px 48px;
  pointer-events:none;z-index:0;
}

/* scanline overlay */
.sl{
  position:fixed;inset:0;pointer-events:none;z-index:9999;
  background:repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.07) 3px,rgba(0,0,0,0.07) 4px);
}

.wrap{width:100%;max-width:480px;position:relative;z-index:1}

/* ── HEADER ── */
.hd{text-align:center;margin-bottom:28px}
.hd .tag{font-size:9px;letter-spacing:5px;color:var(--g);opacity:.65;margin-bottom:10px;text-transform:uppercase}
.hd h1{
  font-family:'Orbitron',sans-serif;
  font-size:clamp(22px,6.5vw,36px);
  font-weight:900;
  letter-spacing:4px;
  background:linear-gradient(140deg,#7ffffe 0%,var(--c) 40%,#80d8ff 100%);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  filter:drop-shadow(0 0 18px rgba(0,229,255,0.55));
  animation:glitch 7s infinite;
}
@keyframes glitch{
  0%,87%,100%{filter:drop-shadow(0 0 18px rgba(0,229,255,0.55));transform:none}
  88%{transform:skewX(-3deg) translateX(-2px);filter:drop-shadow(0 0 18px rgba(255,30,80,.9)) hue-rotate(160deg)}
  89%{transform:skewX(2deg) translateX(2px);filter:drop-shadow(0 0 18px rgba(192,96,255,.9)) hue-rotate(-80deg)}
  90%{transform:none;filter:drop-shadow(0 0 18px rgba(0,229,255,0.55))}
}
.hd .sub{
  font-size:10px;color:var(--dim);margin-top:9px;letter-spacing:2px;
  display:flex;align-items:center;justify-content:center;gap:7px;
}

/* ── CARD ── */
.card{
  background:var(--panel);
  border:1px solid var(--bd);
  border-radius:14px;
  backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);
  box-shadow:
    0 0 0 1px rgba(0,229,255,0.07),
    0 20px 60px rgba(0,0,0,0.65),
    inset 0 1px 0 rgba(255,255,255,0.05);
  overflow:hidden;
}
.top-line{
  height:1px;
  background:linear-gradient(90deg,transparent 0%,rgba(0,229,255,0.7) 30%,rgba(192,96,255,0.7) 70%,transparent 100%);
}

/* ── TABS ── */
.tabs{display:flex;border-bottom:1px solid var(--bd);background:rgba(0,0,0,0.25)}
.tab-btn{
  flex:1;height:50px;
  background:transparent;border:none;
  border-bottom:2px solid transparent;margin-bottom:-1px;
  color:var(--dim);
  font-family:'Share Tech Mono',monospace;
  font-size:11px;letter-spacing:2.5px;text-transform:uppercase;
  cursor:pointer;transition:all .22s;
  -webkit-tap-highlight-color:transparent;touch-action:manipulation;
}
.tab-btn:hover{color:rgba(255,255,255,.65);background:rgba(255,255,255,.03)}
.tab-btn.ac{color:var(--c);border-bottom-color:var(--c);background:rgba(0,229,255,.08);text-shadow:0 0 14px rgba(0,229,255,.9)}
.tab-btn.ap{color:var(--p);border-bottom-color:var(--p);background:rgba(192,96,255,.08);text-shadow:0 0 14px rgba(192,96,255,.9)}

/* ── TAB CONTENT ── */
.tc{display:none;padding:22px 18px 26px}
.tc.on{display:block}

/* ── LABEL ── */
.lbl{
  display:block;font-size:9px;letter-spacing:3px;
  text-transform:uppercase;color:var(--dim);
  margin-bottom:7px;margin-top:18px;
}
.lbl:first-child{margin-top:0}

/* ── SELECT WRAPPER ── */
.sw{position:relative}
.sw::after{
  content:'▾';position:absolute;right:13px;top:50%;
  transform:translateY(-50%);color:var(--dim);pointer-events:none;font-size:13px;
}

/* ── INPUT / SELECT ── */
select,input[type=text]{
  width:100%;
  padding:12px 38px 12px 13px;
  background:rgba(255,255,255,0.04);
  border:1px solid rgba(255,255,255,0.1);
  border-radius:8px;
  color:var(--txt);
  font-family:'Share Tech Mono',monospace;
  font-size:16px; /* prevents iOS zoom */
  outline:none;
  transition:border-color .2s,box-shadow .2s;
  -webkit-appearance:none;appearance:none;cursor:pointer;
}
select:focus,input[type=text]:focus{
  border-color:rgba(0,229,255,.5);
  box-shadow:0 0 0 3px rgba(0,229,255,.1);
}
select option{background:#0e0e22;color:#dde0ff}

.pm select,.pm input[type=text]{border-color:rgba(192,96,255,.18)}
.pm select:focus,.pm input[type=text]:focus{
  border-color:rgba(192,96,255,.5);
  box-shadow:0 0 0 3px rgba(192,96,255,.1);
}
.pm .lbl{color:rgba(192,96,255,.55)}
.pm .sw::after{color:rgba(192,96,255,.55)}

/* ── BUTTONS ── */
.btn{
  width:100%;min-height:50px;padding:13px 18px;margin-top:18px;
  border:none;border-radius:9px;
  font-family:'Orbitron',sans-serif;font-size:10px;font-weight:700;
  letter-spacing:2.5px;text-transform:uppercase;
  cursor:pointer;transition:all .22s;
  -webkit-tap-highlight-color:transparent;touch-action:manipulation;
  position:relative;overflow:hidden;
}
.btn::after{
  content:'';position:absolute;inset:0;opacity:0;transition:opacity .22s;
  background:rgba(255,255,255,.06);
}
.btn:hover::after,.btn:active::after{opacity:1}

.bc{
  background:linear-gradient(135deg,rgba(0,229,255,.16),rgba(0,229,255,.07));
  border:1px solid rgba(0,229,255,.38);
  color:var(--c);
  box-shadow:0 0 18px rgba(0,229,255,.14),inset 0 1px 0 rgba(0,229,255,.18);
}
.bc:hover{box-shadow:0 0 30px rgba(0,229,255,.3),inset 0 1px 0 rgba(0,229,255,.28);border-color:rgba(0,229,255,.65)}

.bp{
  background:linear-gradient(135deg,rgba(192,96,255,.16),rgba(192,96,255,.07));
  border:1px solid rgba(192,96,255,.38);
  color:var(--p);
  box-shadow:0 0 18px rgba(192,96,255,.14),inset 0 1px 0 rgba(192,96,255,.18);
}
.bp:hover{box-shadow:0 0 30px rgba(192,96,255,.3),inset 0 1px 0 rgba(192,96,255,.28);border-color:rgba(192,96,255,.65)}

.bg{
  background:linear-gradient(135deg,rgba(0,230,118,.14),rgba(0,230,118,.06));
  border:1px solid rgba(0,230,118,.32);
  color:var(--g);
  box-shadow:0 0 14px rgba(0,230,118,.1);
  margin-top:11px;
}
.bg:hover{box-shadow:0 0 26px rgba(0,230,118,.25);border-color:rgba(0,230,118,.58)}

/* ── RESULT ── */
.res{display:none;margin-top:18px}
.rl{font-size:9px;letter-spacing:3px;color:rgba(0,230,118,.55);text-transform:uppercase;margin-bottom:7px}
input[type=text][readonly]{
  color:var(--g);border-color:rgba(0,230,118,.22);
  background:rgba(0,230,118,.045);
  font-size:12px;padding:11px 13px;cursor:text;border-radius:8px;
}

/* ── INFO BAR ── */
.ib{
  font-size:10px;color:rgba(192,96,255,.58);letter-spacing:1px;
  margin-bottom:18px;padding:9px 13px;
  border:1px solid rgba(192,96,255,.13);border-radius:8px;
  background:rgba(192,96,255,.045);line-height:1.6;
}

/* ── FOOTER ── */
.ft{margin-top:26px;text-align:center;font-size:9px;color:rgba(255,255,255,.15);letter-spacing:2px;line-height:2}

/* ── PULSE ── */
.pulse{
  display:inline-block;width:6px;height:6px;
  background:var(--g);border-radius:50%;
  box-shadow:0 0 7px var(--g);
  animation:pu 2s ease-in-out infinite;
}
@keyframes pu{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.45;transform:scale(.7)}}

/* ── BLINK ── */
.blink{animation:bl 1.2s step-end infinite}
@keyframes bl{50%{opacity:0}}

/* ── TWO-COL desktop ── */
@media(min-width:600px){
  body{padding:48px 24px 80px}
  .wrap{max-width:560px}
  .tc{padding:26px 26px 32px}
  .tab-btn{font-size:12px}
  select,input[type=text]{font-size:14px;padding:11px 38px 11px 13px}
  input[type=text][readonly]{font-size:13px;padding:11px 13px}
  .two-col{display:grid;grid-template-columns:1fr 1fr;gap:13px}
  .two-col>div>.lbl{margin-top:0}
}
@media(min-width:900px){.wrap{max-width:620px}}
</style>
</head>
<body>
<div class="sl"></div>
<div class="wrap">

  <div class="hd">
    <div class="tag">// system online //</div>
    <h1>NODE_MATRIX</h1>
    <div class="sub"><span class="pulse"></span>v2nodes &amp; proxifly feed active<span class="blink">_</span></div>
  </div>

  <div class="card">
    <div class="top-line"></div>
    <div class="tabs">
      <button class="tab-btn ac" id="btn-vpn" onclick="switchTab('vpn',this)">🛰 VPN SUB</button>
      <button class="tab-btn" id="btn-proxy" onclick="switchTab('proxy',this)">🔌 PROXY LIST</button>
    </div>

    <!-- VPN SUB -->
    <div id="tab-vpn" class="tc on">
      <span class="lbl">// target country</span>
      <div class="sw">
        <select id="vpn-country">${COUNTRIES_VPN}</select>
      </div>
      <button class="btn bc" onclick="generateVpn()">⚡ Generate Subscription Link</button>
      <div id="vpn-result" class="res">
        <div class="rl">// output · paste into shadowrocket / v2rayng</div>
        <input type="text" id="vpn-link" readonly>
        <button class="btn bg" onclick="copyLink('vpn-link')">⧉ Copy to Clipboard</button>
      </div>
    </div>

    <!-- PROXY LIST -->
    <div id="tab-proxy" class="tc pm">
      <div class="ib">⚡ src: proxifly/free-proxy-list · refresh every 5 min · 100+ countries</div>
      <div class="two-col">
        <div>
          <span class="lbl">// target country</span>
          <div class="sw"><select id="proxy-country">${COUNTRIES_PROXY}</select></div>
        </div>
        <div>
          <span class="lbl">// protocol</span>
          <div class="sw">
            <select id="proxy-protocol">
              <option value="all">🔀 ALL</option>
              <option value="http">🌐 HTTP</option>
              <option value="https">🔒 HTTPS</option>
              <option value="socks4">🧦 SOCKS4</option>
              <option value="socks5">🧦 SOCKS5</option>
            </select>
          </div>
        </div>
      </div>
      <button class="btn bp" onclick="generateProxy()">⚡ Generate Proxy Feed</button>
      <div id="proxy-result" class="res">
        <div class="rl">// output · paste into your tool</div>
        <input type="text" id="proxy-link" readonly>
        <button class="btn bg" onclick="copyLink('proxy-link')">⧉ Copy to Clipboard</button>
      </div>
    </div>
  </div>

  <div class="ft">[ CLOUDFLARE WORKER ] &nbsp;·&nbsp; AUTO-DEPLOY FROM GITHUB &nbsp;·&nbsp; NO DATA STORED</div>
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
  el.select();document.execCommand('copy');
  el.style.borderColor='var(--g)';
  setTimeout(()=>{el.style.borderColor=''},900);
}
</script>
</body>
</html>`;
      return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
    }

    // ==========================================
    // 2. KHI APP GỌI ĐỂ TẢI CẤU HÌNH VPN (v2nodes scraper)
    // ==========================================
    if (url.pathname === "/sub") {
      const countryCode = url.searchParams.get("country") || "all";
      try {
        const targetUrl = (countryCode === "all")
          ? "https://www.v2nodes.com/"
          : `https://www.v2nodes.com/country/${countryCode}/`;
        const response = await fetch(targetUrl, {
          headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" }
        });
        const pageHtml = await response.text();
        const regex = /data-config="([^"]+subscriptions\/country\/[^"]+)"/i;
        const match = pageHtml.match(regex);
        if (match && match[1]) {
          const subResponse = await fetch(match[1]);
          const subData = await subResponse.text();
          return new Response(subData, {
            headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store, no-cache" }
          });
        }
        return new Response("Lỗi: Không tìm thấy data của quốc gia này trên v2nodes", { status: 404 });
      } catch (error) {
        return new Response("Lỗi hệ thống: " + error.message, { status: 500 });
      }
    }

    // ==========================================
    // 3. PROXY LIST (proxifly/free-proxy-list qua jsDelivr CDN)
    // ==========================================
    if (url.pathname === "/proxy") {
      const countryCode = (url.searchParams.get("country") || "all").toUpperCase();
      const protocol   = (url.searchParams.get("protocol") || "all").toLowerCase();
      const format     = (url.searchParams.get("format") || "text").toLowerCase();
      const validProtocols = ["http", "https", "socks4", "socks5"];
      let cdnUrl;
      if (protocol !== "all" && validProtocols.includes(protocol)) {
        cdnUrl = `https://cdn.jsdelivr.net/gh/proxifly/free-proxy-list@main/proxies/protocols/${protocol}/data.json`;
      } else {
        cdnUrl = `https://cdn.jsdelivr.net/gh/proxifly/free-proxy-list@main/proxies/all/data.json`;
      }
      try {
        const cdnResponse = await fetch(cdnUrl, { headers: { "Accept": "application/json" } });
        if (!cdnResponse.ok) {
          return new Response("Lỗi: Không thể tải danh sách proxy từ proxifly CDN", { status: 502 });
        }
        const proxyList = await cdnResponse.json();
        const filtered = (countryCode === "ALL")
          ? proxyList
          : proxyList.filter(p => p.geolocation && p.geolocation.country && p.geolocation.country.toUpperCase() === countryCode);
        if (filtered.length === 0) {
          return new Response(`Không tìm thấy proxy nào cho: country=${countryCode}, protocol=${protocol}`, { status: 404 });
        }
        if (format === "json") {
          return new Response(JSON.stringify(filtered, null, 2), {
            headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store, no-cache" }
          });
        }
        const textList = filtered.map(p => p.proxy).join("\n");
        return new Response(textList, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "no-store, no-cache",
            "X-Proxy-Count": String(filtered.length),
          }
        });
      } catch (error) {
        return new Response("Lỗi hệ thống: " + error.message, { status: 500 });
      }
    }

    return new Response("Đường dẫn không hợp lệ. Các path hợp lệ: / | /sub?country=xx | /proxy?country=xx&protocol=yy", { status: 404 });
  }
};
