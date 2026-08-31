# Logic Hoạt Động (Gemini)

Tài liệu này giải thích cơ chế và logic lập trình đằng sau Cloudflare Worker dùng để tự động bóc tách (scrape) cấu hình từ v2nodes và lấy proxy từ proxifly.

## Kiến trúc Hệ Thống
Hệ thống là một Serverless API chạy trên Cloudflare Workers. Nó đóng vai trò là một "Cầu nối" (Proxy / Scraper) giữa Client (ứng dụng VPN như Shadowrocket) và các Target Server (`v2nodes.com` và `proxifly/free-proxy-list`).

### 1. Phân tuyến (Routing)
Worker lắng nghe mọi request HTTP và xử lý dựa trên `url.pathname`:
*   **Path `/` (Giao diện Web):** Trả về HTML với **2 tab** riêng biệt:
    *   Tab 🛰️ **VPN Sub** — Dropdown 54 quốc gia, sinh link `/sub?country=xx` cho Shadowrocket/v2rayNG.
    *   Tab 🔌 **Proxy List** — Dropdown quốc gia + dropdown giao thức (HTTP/HTTPS/SOCKS4/SOCKS5), sinh link `/proxy?country=XX&protocol=yy`.
*   **Path `/sub` (VPN Sub API):** Scrape cấu hình vmess/vless/trojan từ v2nodes theo quốc gia.
*   **Path `/proxy` (Proxy List API):** Lấy danh sách proxy HTTP/SOCKS từ proxifly qua CDN jsDelivr.

### 2. Logic Bóc Tách (`/sub`)
Khi nhận được request (VD: `/sub?country=jp`):
1.  **Phân tích tham số:** Trích xuất biến `countryCode`. Nếu không có, mặc định là `all`.
2.  **Xác định mục tiêu:** Xây dựng Target URL.
    *   Nếu `all` -> `https://www.v2nodes.com/`
    *   Nếu `jp` -> `https://www.v2nodes.com/country/jp/`
3.  **Fetch HTML:** Sử dụng hàm `fetch()` với `User-Agent` giả lập trình duyệt để vượt qua các bộ lọc bot cơ bản.
4.  **Trích xuất Key Sub:**
    *   Cấu trúc HTML của trang chứa input box bị ẩn.
    *   Worker sử dụng Regular Expression: `/data-config="([^"]+subscriptions\/country\/[^"]+)"/i` để tìm chuỗi chứa link sub (bên trong có tham số `?key=...` mới nhất).
5.  **Fetch Data Cuối Cùng:** Truy cập vào URL vừa trích xuất để lấy dữ liệu thô (Raw Data) thường được lưu ở dạng Base64 chứa danh sách `vmess://`, `vless://`.
6.  **Trả về Client:** Header được set `Content-Type: text/plain` và `Cache-Control: no-store` để ép Shadowrocket luôn phải đọc mới khi Update, không lưu cache cũ.

### 3. Logic Lấy Proxy (`/proxy`)
Khi nhận được request (VD: `/proxy?country=US&protocol=socks5`):
1.  **Phân tích tham số:** Trích xuất `country` (mặc định `all`) và `protocol` (mặc định `all`). Worker tự normalize về đúng case (country → UPPER, protocol → lower).
2.  **Xây dựng CDN URL:**
    *   Nếu `protocol` cụ thể → `https://cdn.jsdelivr.net/gh/proxifly/free-proxy-list@main/proxies/protocols/{protocol}/data.json`
    *   Nếu `all` → `https://cdn.jsdelivr.net/gh/proxifly/free-proxy-list@main/proxies/all/data.json`
3.  **Fetch JSON:** 1 request duy nhất tới jsDelivr CDN — không bị WAF chặn, không timeout.
4.  **Lọc theo quốc gia:** Filter mảng JSON theo `geolocation.country` ngay trong Worker JS (không cần subrequest thêm).
5.  **Trả về Client:**
    *   Mặc định: `text/plain` — mỗi dòng 1 proxy dạng `protocol://ip:port`
    *   Nếu `?format=json`: JSON đầy đủ gồm IP, port, protocol, anonymity, score, geolocation.
    *   Header `X-Proxy-Count` trả về số lượng proxy tìm được.

## Ưu điểm của Logic này
*   **Bypass Rotation Key (`/sub`):** v2nodes thay đổi tham số `key` liên tục để ngăn chặn việc copy link trực tiếp. Worker lách luật bằng cách luôn fetch HTML mới nhất để tìm key ngay tại thời điểm được yêu cầu.
*   **Zero-Timeout:** `/sub` thực hiện tối đa 2 request tuần tự, `/proxy` chỉ 1 request. Cả hai đều hoàn thành dưới 1000ms, tránh kích hoạt Anti-Bot/DDoS WAF.
*   **Self-healing:** Client app (Shadowrocket) được hưởng lợi nhờ cơ chế "Update on Open". Mỗi lần cập nhật, các node chết/cũ tự động bị xóa, nhường chỗ cho các node tươi nhất được cào về.
*   **Proxy luôn tươi (`/proxy`):** proxifly cập nhật danh sách mỗi 5 phút qua GitHub Actions. jsDelivr CDN cache ngắn nên data luôn gần với thực tế nhất.
*   **Auto-deploy:** Repo được kết nối với Cloudflare Workers & Pages — mỗi lần push lên GitHub branch `main`, Cloudflare tự động deploy phiên bản mới qua `wrangler.toml`.

---

## Quy Trình Push Code (BẮT BUỘC tuân theo)

> Mỗi khi sửa code hoặc thay đổi logic, PHẢI làm đủ các bước sau theo thứ tự, TRƯỚC KHI push.

### Bước 1 — Cập nhật `handover.md`
Ghi lại thay đổi vừa làm vào `handover.md` (phiên bản mới, mục tiêu, giải pháp, kết quả).

### Bước 2 — Set Git Identity (làm mỗi lần, trước commit)
```
git config user.email "ohshjt125@gmail.com"
git config user.name "Xwuan19"
```

### Bước 3 — Stage và Commit
```
git add .
git commit -m "mô tả thay đổi"
```

### Bước 4 — Push lên GitHub (dùng đúng URL này)
```
git push https://Xwuan19@github.com/Xwuan19/v2nodes-auto-sub.git main
```

> **Lưu ý:** URL đã nhúng sẵn `Xwuan19@`, Windows Credential Manager trên máy này tự điền PAT — không cần nhập token thủ công. Tuyệt đối không dùng `cd` khi chạy lệnh, chỉ chỉ định `Cwd` trong tham số tool.
