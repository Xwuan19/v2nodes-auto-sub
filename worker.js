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
          <title>Trạm Sub v2nodes VIP</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; max-width: 500px; margin: auto; background-color: #f9f9f9;}
            .card { background: white; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
            select, button, input { width: 100%; padding: 12px; margin-top: 10px; font-size: 16px; border-radius: 6px; border: 1px solid #ccc; box-sizing: border-box; }
            button { background: #007bff; color: white; border: none; font-weight: bold; cursor: pointer; margin-top: 15px;}
            button:hover { background: #0056b3; }
            .result { margin-top: 20px; display: none; }
            h2 { text-align: center; color: #333; margin-top: 0; }
          </style>
        </head>
        <body>
          <div class="card">
            <h2>🌍 Trạm Lọc Node VIP</h2>
            <label style="font-weight: bold; color: #555;">Tùy chọn quốc gia bạn muốn lấy:</label>
            <select id="country">
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
            <button onclick="generate()">Tạo Link Cho Shadowrocket</button>
            
            <div id="resultBox" class="result">
              <label style="font-weight: bold; color: #d9534f;">Link của bạn đây (Copy dán vào App):</label>
              <input type="text" id="subLink" readonly>
              <button onclick="copyLink()" style="background:#28a745;">📋 Copy Link</button>
            </div>
          </div>

          <script>
            function generate() {
              const country = document.getElementById('country').value;
              const currentUrl = window.location.origin;
              const finalLink = currentUrl + '/sub?country=' + country;
              document.getElementById('subLink').value = finalLink;
              document.getElementById('resultBox').style.display = 'block';
            }
            function copyLink() {
              const copyText = document.getElementById('subLink');
              copyText.select();
              document.execCommand('copy');
              alert('Đã copy! Giờ hãy mở Shadowrocket và dán vào (Tạo mục Subscribe mới).');
            }
          </script>
        </body>
        </html>
      `;
      return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
    }

    // ==========================================
    // 2. KHI APP GỌI ĐỂ TẢI CẤU HÌNH (Làm việc ngầm)
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
        return new Response("Lỗi: Không tìm thấy data của quốc gia này", { status: 404 });
      } catch (error) {
        return new Response("Lỗi hệ thống: " + error.message, { status: 500 });
      }
    }

    return new Response("Đường dẫn không hợp lệ", { status: 404 });
  }
};
