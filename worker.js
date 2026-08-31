export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // ==========================================
    // 1. NẾU VÀO BẰNG TRÌNH DUYỆT -> HIỂN THỊ GIAO DIỆN WEB
    // ==========================================
    if (url.pathname === "/") {
      const html = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>// NODE_MATRIX :: v2nodes-auto-sub</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@400;700;900&display=swap');

    :root {
      --cyan:   #00f5ff;
      --purple: #bf00ff;
      --green:  #00ff41;
      --dark:   #050510;
      --panel:  #0a0a1a;
      --border: #1a1a3a;
      --red:    #ff003c;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      background: var(--dark);
      color: var(--cyan);
      font-family: 'Share Tech Mono', monospace;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 24px 14px 60px;
      position: relative;
      overflow-x: hidden;
    }

    /* Scanline overlay */
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      background: repeating-linear-gradient(
        0deg, transparent, transparent 2px,
        rgba(0,245,255,0.015) 2px, rgba(0,245,255,0.015) 4px
      );
      pointer-events: none;
      z-index: 9999;
    }

    /* Grid background */
    body::after {
      content: '';
      position: fixed;
      inset: 0;
      background-image:
        linear-gradient(rgba(0,245,255,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,245,255,0.04) 1px, transparent 1px);
      background-size: 40px 40px;
      pointer-events: none;
      z-index: 0;
    }

    .container {
      width: 100%;
      max-width: 540px;
      position: relative;
      z-index: 1;
    }

    /* ── HEADER ── */
    .header { text-align: center; margin-bottom: 24px; }

    .header .tag {
      font-size: 10px;
      color: var(--green);
      letter-spacing: 4px;
      margin-bottom: 8px;
      opacity: 0.8;
    }

    .header h1 {
      font-family: 'Orbitron', sans-serif;
      font-size: clamp(20px, 7vw, 32px);
      font-weight: 900;
      color: var(--cyan);
      text-shadow: 0 0 10px var(--cyan), 0 0 30px var(--cyan), 0 0 60px rgba(0,245,255,0.4);
      letter-spacing: 2px;
      line-height: 1.2;
      animation: glitch 4s infinite;
    }

    @keyframes glitch {
      0%,90%,100% { text-shadow: 0 0 10px var(--cyan),0 0 30px var(--cyan),0 0 60px rgba(0,245,255,0.4); transform:none; }
      91% { transform:skewX(-2deg); text-shadow:-2px 0 var(--red),2px 0 var(--purple); }
      92% { transform:skewX(2deg);  text-shadow:2px 0 var(--red),-2px 0 var(--purple); }
      93% { transform:none;         text-shadow:0 0 10px var(--cyan),0 0 30px var(--cyan); }
    }

    .header .sub {
      font-size: 11px;
      color: rgba(0,245,255,0.5);
      margin-top: 8px;
      letter-spacing: 2px;
    }

    /* ── CARD ── */
    .card {
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: 4px;
      position: relative;
      overflow: hidden;
    }
    .card::before,.card::after { content:''; position:absolute; width:20px; height:20px; z-index:2; }
    .card::before { top:-1px; left:-1px; border-top:2px solid var(--cyan); border-left:2px solid var(--cyan); box-shadow:-2px -2px 8px rgba(0,245,255,0.4); }
    .card::after  { bottom:-1px; right:-1px; border-bottom:2px solid var(--purple); border-right:2px solid var(--purple); box-shadow:2px 2px 8px rgba(191,0,255,0.4); }

    /* ── TABS ── */
    .tabs { display:flex; border-bottom:1px solid var(--border); }

    .tab-btn {
      flex: 1;
      padding: 0 10px;
      height: 52px;           /* touch-friendly fixed height */
      background: transparent;
      border: none;
      color: rgba(0,245,255,0.35);
      font-family: 'Share Tech Mono', monospace;
      font-size: 13px;
      letter-spacing: 1px;
      cursor: pointer;
      transition: all 0.2s;
      border-bottom: 2px solid transparent;
      margin-bottom: -1px;
      -webkit-tap-highlight-color: transparent;
    }
    .tab-btn:hover { color:var(--cyan); background:rgba(0,245,255,0.04); }
    .tab-btn.active { color:var(--cyan); border-bottom-color:var(--cyan); text-shadow:0 0 8px var(--cyan); background:rgba(0,245,255,0.06); }
    .tab-btn.active-purple { color:var(--purple); border-bottom-color:var(--purple); text-shadow:0 0 8px var(--purple); background:rgba(191,0,255,0.06); }

    /* ── CONTENT ── */
    .tab-content { display:none; padding:20px 16px 24px; }
    .tab-content.active { display:block; }

    .field-label {
      display: block;
      font-size: 10px;
      color: rgba(0,245,255,0.5);
      letter-spacing: 3px;
      text-transform: uppercase;
      margin-bottom: 8px;
      margin-top: 18px;
    }
    .field-label:first-child { margin-top:0; }

    /* ── INPUTS
       font-size >= 16px on mobile = no iOS auto-zoom
    ── */
    select, input[type="text"] {
      width: 100%;
      padding: 15px 14px;
      background: rgba(0,245,255,0.04);
      border: 1px solid rgba(0,245,255,0.2);
      border-radius: 2px;
      color: var(--cyan);
      font-family: 'Share Tech Mono', monospace;
      font-size: 16px;     /* ← key: prevents iOS zoom */
      outline: none;
      transition: all 0.2s;
      -webkit-appearance: none;
      appearance: none;
    }
    select:focus,input:focus { border-color:var(--cyan); box-shadow:0 0 12px rgba(0,245,255,0.2),inset 0 0 8px rgba(0,245,255,0.04); }
    select option { background:#0d0d20; color:var(--cyan); }

    .purple-mode select,
    .purple-mode input[type="text"] { border-color:rgba(191,0,255,0.2); color:var(--purple); }
    .purple-mode select:focus,
    .purple-mode input:focus { border-color:var(--purple); box-shadow:0 0 12px rgba(191,0,255,0.2),inset 0 0 8px rgba(191,0,255,0.04); }
    .purple-mode .field-label { color:rgba(191,0,255,0.5); }

    /* ── BUTTONS — min 50px touch target ── */
    .btn {
      width: 100%;
      padding: 16px;
      margin-top: 20px;
      border: none;
      border-radius: 2px;
      font-family: 'Orbitron', sans-serif;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 2px;
      cursor: pointer;
      transition: all 0.2s;
      text-transform: uppercase;
      min-height: 52px;
      -webkit-tap-highlight-color: transparent;
      touch-action: manipulation;
    }
    .btn-cyan { background:transparent; border:1px solid var(--cyan); color:var(--cyan); text-shadow:0 0 8px var(--cyan); box-shadow:0 0 12px rgba(0,245,255,0.2),inset 0 0 12px rgba(0,245,255,0.04); }
    .btn-cyan:hover,.btn-cyan:active { background:rgba(0,245,255,0.1); box-shadow:0 0 24px rgba(0,245,255,0.4),inset 0 0 12px rgba(0,245,255,0.08); }
    .btn-purple { background:transparent; border:1px solid var(--purple); color:var(--purple); text-shadow:0 0 8px var(--purple); box-shadow:0 0 12px rgba(191,0,255,0.2),inset 0 0 12px rgba(191,0,255,0.04); }
    .btn-purple:hover,.btn-purple:active { background:rgba(191,0,255,0.1); box-shadow:0 0 24px rgba(191,0,255,0.4),inset 0 0 12px rgba(191,0,255,0.08); }
    .btn-green { background:transparent; border:1px solid var(--green); color:var(--green); text-shadow:0 0 8px var(--green); box-shadow:0 0 12px rgba(0,255,65,0.2),inset 0 0 12px rgba(0,255,65,0.04); margin-top:10px; }
    .btn-green:hover,.btn-green:active { background:rgba(0,255,65,0.1); box-shadow:0 0 24px rgba(0,255,65,0.4); }

    /* ── RESULT ── */
    .result { display:none; margin-top:20px; }
    .result-label { font-size:10px; letter-spacing:3px; color:rgba(0,255,65,0.6); text-transform:uppercase; margin-bottom:8px; }
    input[type="text"][readonly] { color:var(--green); border-color:rgba(0,255,65,0.3); background:rgba(0,255,65,0.04); font-size:13px; overflow:hidden; text-overflow:ellipsis; }

    /* ── INFO BAR ── */
    .info-bar { font-size:11px; color:rgba(191,0,255,0.5); letter-spacing:1px; margin-bottom:16px; padding:8px 12px; border:1px solid rgba(191,0,255,0.15); border-radius:2px; background:rgba(191,0,255,0.04); line-height:1.6; }

    /* ── FOOTER ── */
    .footer { margin-top:24px; text-align:center; font-size:10px; color:rgba(0,245,255,0.2); letter-spacing:2px; line-height:1.8; }

    /* ── ANIMATIONS ── */
    .blink { animation:blink 1s step-end infinite; }
    @keyframes blink { 50%{opacity:0;} }

    .pulse { display:inline-block; width:7px; height:7px; background:var(--green); border-radius:50%; margin-right:6px; animation:pulse 1.5s ease-in-out infinite; box-shadow:0 0 6px var(--green); vertical-align:middle; }
    @keyframes pulse { 0%,100%{opacity:1;transform:scale(1);} 50%{opacity:0.4;transform:scale(0.7);} }

    /* ════════════════════════════════════════
       TABLET / DESKTOP  ≥ 600px
    ════════════════════════════════════════ */
    @media (min-width: 600px) {
      body { padding: 40px 32px 80px; }
      .container { max-width: 640px; }
      .header .sub { font-size:12px; letter-spacing:3px; }
      .tab-btn { font-size:14px; letter-spacing:2px; }
      .tab-content { padding: 28px 32px 36px; }
      .field-label { font-size:11px; }

      /* Desktop: inputs can go back to 14px — no zoom issue on desktop */
      select, input[type="text"] { font-size:14px; padding:12px 14px; }

      /* Two-column grid for proxy tab selects */
      .two-col {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
        align-items: end;
      }
      .two-col .field-label { margin-top:0; }

      .btn { font-size:13px; padding:15px; }
    }

    /* ════════════════════════════════════════
       LARGE DESKTOP  ≥ 900px
    ════════════════════════════════════════ */
    @media (min-width: 900px) {
      .container { max-width: 720px; }
      .header h1 { letter-spacing:5px; }
    }
  </style>
</head>
<body>
  <div class="container">

    <!-- HEADER -->
    <div class="header">
      <div class="tag">// SYSTEM ONLINE //</div>
      <h1>NODE_MATRIX</h1>
      <div class="sub"><span class="pulse"></span>v2nodes &amp; proxifly feed active<span class="blink">_</span></div>
    </div>

    <!-- CARD -->
    <div class="card">
      <!-- TABS -->
      <div class="tabs">
        <button class="tab-btn active" id="btn-vpn" onclick="switchTab('vpn', this)">🛰 VPN SUB</button>
        <button class="tab-btn" id="btn-proxy" onclick="switchTab('proxy', this)">🔌 PROXY LIST</button>
      </div>

      <!-- ─── TAB 1: VPN SUB ─── -->
      <div id="tab-vpn" class="tab-content active">
        <span class="field-label">// TARGET COUNTRY</span>
        <select id="vpn-country">
          <option value="all">🌐 GLOBAL — All regions</option>
          <option value="al">🇦🇱 Albania (AL)</option>
          <option value="ar">🇦🇷 Argentina (AR)</option>
          <option value="am">🇦🇲 Armenia (AM)</option>
          <option value="au">🇦🇺 Australia (AU)</option>
          <option value="at">🇦🇹 Austria (AT)</option>
          <option value="bd">🇧🇩 Bangladesh (BD)</option>
          <option value="by">🇧🇾 Belarus (BY)</option>
          <option value="be">🇧🇪 Belgium (BE)</option>
          <option value="br">🇧🇷 Brazil (BR)</option>
          <option value="bg">🇧🇬 Bulgaria (BG)</option>
          <option value="ca">🇨🇦 Canada (CA)</option>
          <option value="cn">🇨🇳 China (CN)</option>
          <option value="co">🇨🇴 Colombia (CO)</option>
          <option value="cz">🇨🇿 Czechia (CZ)</option>
          <option value="dk">🇩🇰 Denmark (DK)</option>
          <option value="ee">🇪🇪 Estonia (EE)</option>
          <option value="fi">🇫🇮 Finland (FI)</option>
          <option value="fr">🇫🇷 France (FR)</option>
          <option value="de">🇩🇪 Germany (DE)</option>
          <option value="gr">🇬🇷 Greece (GR)</option>
          <option value="hk">🇭🇰 Hong Kong (HK)</option>
          <option value="in">🇮🇳 India (IN)</option>
          <option value="ir">🇮🇷 Iran (IR)</option>
          <option value="it">🇮🇹 Italy (IT)</option>
          <option value="jp">🇯🇵 Japan (JP)</option>
          <option value="kz">🇰🇿 Kazakhstan (KZ)</option>
          <option value="kg">🇰🇬 Kyrgyzstan (KG)</option>
          <option value="lv">🇱🇻 Latvia (LV)</option>
          <option value="lt">🇱🇹 Lithuania (LT)</option>
          <option value="my">🇲🇾 Malaysia (MY)</option>
          <option value="mx">🇲🇽 Mexico (MX)</option>
          <option value="md">🇲🇩 Moldova (MD)</option>
          <option value="nl">🇳🇱 Netherlands (NL)</option>
          <option value="no">🇳🇴 Norway (NO)</option>
          <option value="ph">🇵🇭 Philippines (PH)</option>
          <option value="pl">🇵🇱 Poland (PL)</option>
          <option value="pt">🇵🇹 Portugal (PT)</option>
          <option value="ro">🇷🇴 Romania (RO)</option>
          <option value="ru">🇷🇺 Russia (RU)</option>
          <option value="sa">🇸🇦 Saudi Arabia (SA)</option>
          <option value="sg">🇸🇬 Singapore (SG)</option>
          <option value="sk">🇸🇰 Slovakia (SK)</option>
          <option value="za">🇿🇦 South Africa (ZA)</option>
          <option value="kr">🇰🇷 South Korea (KR)</option>
          <option value="es">🇪🇸 Spain (ES)</option>
          <option value="se">🇸🇪 Sweden (SE)</option>
          <option value="ch">🇨🇭 Switzerland (CH)</option>
          <option value="tw">🇹🇼 Taiwan (TW)</option>
          <option value="tr">🇹🇷 Türkiye (TR)</option>
          <option value="th">🇹🇭 Thailand (TH)</option>
          <option value="ua">🇺🇦 Ukraine (UA)</option>
          <option value="ae">🇦🇪 UAE (AE)</option>
          <option value="gb">🇬🇧 United Kingdom (GB)</option>
          <option value="us">🇺🇸 United States (US)</option>
        </select>

        <button class="btn btn-cyan" onclick="generateVpn()">⚡ GENERATE SUBSCRIPTION LINK</button>

        <div id="vpn-result" class="result">
          <div class="result-label">// OUTPUT — Paste into Shadowrocket / v2rayNG</div>
          <input type="text" id="vpn-link" readonly>
          <button class="btn btn-green" onclick="copyLink('vpn-link')">⧉ COPY TO CLIPBOARD</button>
        </div>
      </div>

      <!-- ─── TAB 2: PROXY LIST ─── -->
      <div id="tab-proxy" class="tab-content purple-mode">
        <div class="info-bar">⚡ src: proxifly/free-proxy-list · refresh: every 5min · 100+ countries</div>

        <div class="two-col">
          <div>
            <span class="field-label">// TARGET COUNTRY</span>
            <select id="proxy-country">
              <option value="all">🌐 GLOBAL — No filter</option>
              <option value="AL">🇦🇱 Albania (AL)</option>
              <option value="AR">🇦🇷 Argentina (AR)</option>
              <option value="AM">🇦🇲 Armenia (AM)</option>
              <option value="AU">🇦🇺 Australia (AU)</option>
              <option value="AT">🇦🇹 Austria (AT)</option>
              <option value="BD">🇧🇩 Bangladesh (BD)</option>
              <option value="BY">🇧🇾 Belarus (BY)</option>
              <option value="BE">🇧🇪 Belgium (BE)</option>
              <option value="BR">🇧🇷 Brazil (BR)</option>
              <option value="BG">🇧🇬 Bulgaria (BG)</option>
              <option value="CA">🇨🇦 Canada (CA)</option>
              <option value="CN">🇨🇳 China (CN)</option>
              <option value="CO">🇨🇴 Colombia (CO)</option>
              <option value="CZ">🇨🇿 Czechia (CZ)</option>
              <option value="DK">🇩🇰 Denmark (DK)</option>
              <option value="EE">🇪🇪 Estonia (EE)</option>
              <option value="FI">🇫🇮 Finland (FI)</option>
              <option value="FR">🇫🇷 France (FR)</option>
              <option value="DE">🇩🇪 Germany (DE)</option>
              <option value="GR">🇬🇷 Greece (GR)</option>
              <option value="HK">🇭🇰 Hong Kong (HK)</option>
              <option value="IN">🇮🇳 India (IN)</option>
              <option value="IR">🇮🇷 Iran (IR)</option>
              <option value="IT">🇮🇹 Italy (IT)</option>
              <option value="JP">🇯🇵 Japan (JP)</option>
              <option value="KZ">🇰🇿 Kazakhstan (KZ)</option>
              <option value="KG">🇰🇬 Kyrgyzstan (KG)</option>
              <option value="LV">🇱🇻 Latvia (LV)</option>
              <option value="LT">🇱🇹 Lithuania (LT)</option>
              <option value="MY">🇲🇾 Malaysia (MY)</option>
              <option value="MX">🇲🇽 Mexico (MX)</option>
              <option value="MD">🇲🇩 Moldova (MD)</option>
              <option value="NL">🇳🇱 Netherlands (NL)</option>
              <option value="NO">🇳🇴 Norway (NO)</option>
              <option value="PH">🇵🇭 Philippines (PH)</option>
              <option value="PL">🇵🇱 Poland (PL)</option>
              <option value="PT">🇵🇹 Portugal (PT)</option>
              <option value="RO">🇷🇴 Romania (RO)</option>
              <option value="RU">🇷🇺 Russia (RU)</option>
              <option value="SA">🇸🇦 Saudi Arabia (SA)</option>
              <option value="SG">🇸🇬 Singapore (SG)</option>
              <option value="SK">🇸🇰 Slovakia (SK)</option>
              <option value="ZA">🇿🇦 South Africa (ZA)</option>
              <option value="KR">🇰🇷 South Korea (KR)</option>
              <option value="ES">🇪🇸 Spain (ES)</option>
              <option value="SE">🇸🇪 Sweden (SE)</option>
              <option value="CH">🇨🇭 Switzerland (CH)</option>
              <option value="TW">🇹🇼 Taiwan (TW)</option>
              <option value="TR">🇹🇷 Türkiye (TR)</option>
              <option value="TH">🇹🇭 Thailand (TH)</option>
              <option value="UA">🇺🇦 Ukraine (UA)</option>
              <option value="AE">🇦🇪 UAE (AE)</option>
              <option value="GB">🇬🇧 United Kingdom (GB)</option>
              <option value="US">🇺🇸 United States (US)</option>
            </select>
          </div>
          <div>
            <span class="field-label">// PROTOCOL</span>
            <select id="proxy-protocol">
              <option value="all">🔀 ALL protocols</option>
              <option value="http">🌐 HTTP</option>
              <option value="https">🔒 HTTPS</option>
              <option value="socks4">🧦 SOCKS4</option>
              <option value="socks5">🧦 SOCKS5</option>
            </select>
          </div>
        </div>

        <button class="btn btn-purple" onclick="generateProxy()">⚡ GENERATE PROXY FEED</button>

        <div id="proxy-result" class="result">
          <div class="result-label" style="color:rgba(0,255,65,0.6);">// OUTPUT — Paste into your tool</div>
          <input type="text" id="proxy-link" readonly>
          <button class="btn btn-green" onclick="copyLink('proxy-link')">⧉ COPY TO CLIPBOARD</button>
        </div>
      </div>
    </div><!-- /card -->

    <div class="footer">
      [ CLOUDFLARE WORKER ] — AUTO-DEPLOY FROM GITHUB — NO DATA STORED
    </div>
  </div>

  <script>
    function switchTab(tab, btn) {
      document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
      document.querySelectorAll('.tab-btn').forEach(el => {
        el.classList.remove('active');
        el.classList.remove('active-purple');
      });
      document.getElementById('tab-' + tab).classList.add('active');
      if (tab === 'proxy') {
        btn.classList.add('active-purple');
      } else {
        btn.classList.add('active');
      }
    }
    function generateVpn() {
      const country = document.getElementById('vpn-country').value;
      const link = window.location.origin + '/sub?country=' + country;
      document.getElementById('vpn-link').value = link;
      document.getElementById('vpn-result').style.display = 'block';
    }
    function generateProxy() {
      const country  = document.getElementById('proxy-country').value;
      const protocol = document.getElementById('proxy-protocol').value;
      const link = window.location.origin + '/proxy?country=' + country + '&protocol=' + protocol;
      document.getElementById('proxy-link').value = link;
      document.getElementById('proxy-result').style.display = 'block';
    }
    function copyLink(id) {
      const el = document.getElementById(id);
      el.select();
      document.execCommand('copy');
      const original = el.previousElementSibling
        ? el.previousElementSibling.textContent : '';
      el.style.borderColor = 'var(--green)';
      setTimeout(() => { el.style.borderColor = ''; }, 1000);
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

        // Tìm link sub chứa cấu hình của riêng quốc gia đó
        const regex = /data-config="([^"]+subscriptions\/country\/[^"]+)"/i;
        const match = pageHtml.match(regex);

        if (match && match[1]) {
          const subUrl = match[1];
          const subResponse = await fetch(subUrl);
          const subData = await subResponse.text();

          return new Response(subData, {
            headers: {
              "Content-Type": "text/plain; charset=utf-8",
              "Cache-Control": "no-store, no-cache",
            }
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

      // Hợp lệ protocol
      const validProtocols = ["http", "https", "socks4", "socks5"];

      // Xây dựng CDN URL: lấy theo protocol nếu chỉ định, ngược lại lấy file all
      let cdnUrl;
      if (protocol !== "all" && validProtocols.includes(protocol)) {
        cdnUrl = `https://cdn.jsdelivr.net/gh/proxifly/free-proxy-list@main/proxies/protocols/${protocol}/data.json`;
      } else {
        cdnUrl = `https://cdn.jsdelivr.net/gh/proxifly/free-proxy-list@main/proxies/all/data.json`;
      }

      try {
        const cdnResponse = await fetch(cdnUrl, {
          headers: { "Accept": "application/json" }
        });

        if (!cdnResponse.ok) {
          return new Response("Lỗi: Không thể tải danh sách proxy từ proxifly CDN", { status: 502 });
        }

        const proxyList = await cdnResponse.json();

        // Lọc theo quốc gia nếu không phải "all"
        const filtered = (countryCode === "ALL")
          ? proxyList
          : proxyList.filter(p =>
              p.geolocation &&
              p.geolocation.country &&
              p.geolocation.country.toUpperCase() === countryCode
            );

        if (filtered.length === 0) {
          return new Response(
            `Không tìm thấy proxy nào cho: country=${countryCode}, protocol=${protocol}`,
            { status: 404 }
          );
        }

        // Trả về JSON hoặc text thuần
        if (format === "json") {
          return new Response(JSON.stringify(filtered, null, 2), {
            headers: {
              "Content-Type": "application/json; charset=utf-8",
              "Cache-Control": "no-store, no-cache",
            }
          });
        }

        // Mặc định: text/plain — mỗi dòng 1 proxy dạng  protocol://ip:port
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
