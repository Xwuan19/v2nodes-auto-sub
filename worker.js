export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // ==========================================
    // 1. NẾU VÀO BẰNG TRÌNH DUYỆT -> HIỂN THỊ GIAO DIỆN WEB
    // ==========================================
    if (url.pathname === "/") {
      const html = `
        <!DOCTYPE html>
        <html lang="vi">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Trạm Sub v2nodes & Proxy VIP</title>
          <style>
            * { box-sizing: border-box; }
            body { font-family: Arial, sans-serif; padding: 20px; max-width: 520px; margin: auto; background-color: #f0f2f5; }
            .card { background: white; padding: 24px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
            h2 { text-align: center; color: #333; margin-top: 0; margin-bottom: 20px; }

            /* Tab styles */
            .tabs { display: flex; border-bottom: 2px solid #e0e0e0; margin-bottom: 20px; gap: 4px; }
            .tab-btn {
              flex: 1; padding: 10px; border: none; background: #f0f2f5;
              border-radius: 8px 8px 0 0; cursor: pointer; font-size: 15px;
              font-weight: bold; color: #888; transition: all 0.2s;
            }
            .tab-btn.active { background: white; color: #007bff; border-bottom: 2px solid white; margin-bottom: -2px; }
            .tab-content { display: none; }
            .tab-content.active { display: block; }

            select, button, input {
              width: 100%; padding: 12px; margin-top: 10px; font-size: 15px;
              border-radius: 6px; border: 1px solid #ccc;
            }
            button { background: #007bff; color: white; border: none; font-weight: bold; cursor: pointer; margin-top: 15px; }
            button:hover { background: #0056b3; }
            .btn-green { background: #28a745; }
            .btn-green:hover { background: #1e7e34; }
            .result { margin-top: 20px; display: none; }
            label.field-label { display: block; font-weight: bold; color: #555; margin-top: 12px; }
            .badge {
              display: inline-block; font-size: 11px; padding: 2px 8px;
              border-radius: 20px; background: #e8f4fd; color: #007bff;
              font-weight: bold; margin-left: 6px; vertical-align: middle;
            }
            .info { font-size: 13px; color: #888; margin-top: 8px; }
          </style>
        </head>
        <body>
          <div class="card">
            <h2>🌍 Trạm Lọc Node & Proxy VIP</h2>

            <!-- Tab buttons -->
            <div class="tabs">
              <button class="tab-btn active" onclick="switchTab('vpn', this)">🛰️ VPN Sub</button>
              <button class="tab-btn" onclick="switchTab('proxy', this)">🔌 Proxy List</button>
            </div>

            <!-- ===================== TAB 1: VPN Sub (v2nodes) ===================== -->
            <div id="tab-vpn" class="tab-content active">
              <label class="field-label">Tùy chọn quốc gia bạn muốn lấy:</label>
              <select id="vpn-country">
                <option value="all">🌐 Toàn cầu (Gộp tất cả)</option>
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
                <option value="hk">🇭🇰 Hong Kong SAR China (HK)</option>
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
                <option value="ae">🇦🇪 United Arab Emirates (AE)</option>
                <option value="gb">🇬🇧 United Kingdom (GB)</option>
                <option value="us">🇺🇸 United States (US)</option>
              </select>
              <button onclick="generateVpn()">Tạo Link Cho Shadowrocket / v2rayNG</button>
              <div id="vpn-result" class="result">
                <label class="field-label" style="color:#d9534f;">Link Sub của bạn (dán vào App VPN):</label>
                <input type="text" id="vpn-link" readonly>
                <button class="btn-green" onclick="copyLink('vpn-link')">📋 Copy Link</button>
              </div>
            </div>

            <!-- ===================== TAB 2: Proxy List (proxifly) ===================== -->
            <div id="tab-proxy" class="tab-content">
              <p class="info">Nguồn: <strong>proxifly/free-proxy-list</strong> · Cập nhật mỗi 5 phút · HTTP, HTTPS, SOCKS4, SOCKS5</p>

              <label class="field-label">Quốc gia:</label>
              <select id="proxy-country">
                <option value="all">🌐 Toàn cầu (Không lọc)</option>
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
                <option value="HK">🇭🇰 Hong Kong SAR China (HK)</option>
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
                <option value="AE">🇦🇪 United Arab Emirates (AE)</option>
                <option value="GB">🇬🇧 United Kingdom (GB)</option>
                <option value="US">🇺🇸 United States (US)</option>
              </select>

              <label class="field-label">Giao thức:</label>
              <select id="proxy-protocol">
                <option value="all">🔀 Tất cả giao thức</option>
                <option value="http">🌐 HTTP</option>
                <option value="https">🔒 HTTPS</option>
                <option value="socks4">🧦 SOCKS4</option>
                <option value="socks5">🧦 SOCKS5</option>
              </select>

              <button onclick="generateProxy()">Tạo Link Proxy List</button>
              <div id="proxy-result" class="result">
                <label class="field-label" style="color:#d9534f;">Link Proxy List (dán vào tool hoặc trình duyệt):</label>
                <input type="text" id="proxy-link" readonly>
                <button class="btn-green" onclick="copyLink('proxy-link')">📋 Copy Link</button>
              </div>
            </div>
          </div>

          <script>
            function switchTab(tab, btn) {
              document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
              document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
              document.getElementById('tab-' + tab).classList.add('active');
              btn.classList.add('active');
            }
            function generateVpn() {
              const country = document.getElementById('vpn-country').value;
              const link = window.location.origin + '/sub?country=' + country;
              document.getElementById('vpn-link').value = link;
              document.getElementById('vpn-result').style.display = 'block';
            }
            function generateProxy() {
              const country = document.getElementById('proxy-country').value;
              const protocol = document.getElementById('proxy-protocol').value;
              const link = window.location.origin + '/proxy?country=' + country + '&protocol=' + protocol;
              document.getElementById('proxy-link').value = link;
              document.getElementById('proxy-result').style.display = 'block';
            }
            function copyLink(id) {
              const el = document.getElementById(id);
              el.select();
              document.execCommand('copy');
              alert('Đã copy link!');
            }
          </script>
        </body>
        </html>
      `;
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
