# Quá Trình Cập Nhật Dự Án (Handover)

Dự án này được phát triển để tạo ra một công cụ lấy cấu hình (nodes/proxies) tự động từ trang web \`v2nodes.com\`, vượt qua các giới hạn cập nhật thủ công và bảo mật của trang gốc. Dưới đây là tiến trình phát triển và các quyết định kỹ thuật đã được đưa ra:

## Phiên bản 1: Lấy Node Cụ Thể (Mỹ - US)
*   **Mục tiêu:** Tự động lấy cấu hình node miễn phí mới nhất của Mỹ.
*   **Vấn đề gặp phải:** Link subscription của v2nodes thường xuyên thay đổi tham số \`key=\` để ép người dùng truy cập web.
*   **Giải pháp:** Sử dụng Cloudflare Worker truy cập vào trang \`/country/us/\`, quét mã nguồn (Regex) để tìm link \`data-config\` chứa \`key\` mới nhất, fetch data và trả về.

## Phiên bản 2: Tự Động Lấy Sub Tổng Hợp
*   **Mục tiêu:** Mở rộng ra toàn bộ các quốc gia.
*   **Giải pháp:** Sửa điểm neo từ \`/country/us/\` sang trang chủ \`/\`, bóc tách link sub tổng (\`/subscriptions/country/all/\`). Giao việc lọc quốc gia lại cho Shadowrocket/Client.

## Phiên bản 3: Thử Nghiệm "Siêu Cào" (Thất bại / Hủy bỏ)
*   **Mục tiêu:** Sub tổng của v2nodes cố tình giới hạn chỉ khoảng 25-26 configs và ẩn đi các node mới nhất (vừa ra mắt 30s trước). Khách hàng muốn cào toàn bộ 64 trang hoặc ít nhất là 20 trang đầu để lấy hàng trăm node siêu tươi.
*   **Giải pháp thử nghiệm:** Viết code sử dụng \`Promise.all\` truy cập đồng loạt vào trang danh sách và từng trang server chi tiết để bóc tách \`vless://\`, \`vmess://\`...
*   **Vấn đề gặp phải:** Cloudflare Workers có giới hạn 50 subrequests. Khi giảm xuống cào 5-10 trang, request vẫn bị **Timeout** trên Shadowrocket. Nguyên nhân do v2nodes sử dụng Cloudflare WAF (chống DDoS), chặn các luồng request đồng loạt từ máy chủ bot.

## Phiên bản 4 (Current): Giao Diện Tùy Chọn Đa Quốc Gia (Web UI + API)
*   **Mục tiêu:** Giải quyết triệt để lỗi timeout, đáp ứng nhu cầu chọn node mới nhất theo **từng quốc gia cụ thể** mà không bị giới hạn ở một file sub tổng thập cẩm.
*   **Giải pháp:**
    1.  Biến Cloudflare Worker thành một Web App nhỏ.
    2.  Khi truy cập \`/\`, trả về giao diện HTML có chứa Dropdown list gồm 54 quốc gia (bóc tách sẵn danh sách mã code từ v2nodes).
    3.  Người dùng chọn quốc gia, web tự render link dạng \`/sub?country=sg\`.
    4.  Khi Shadowrocket gọi vào \`/sub?country=sg\`, Worker sẽ fetch đúng 1 request tới \`/country/sg/\` để chộp lấy \`key\` sub mới nhất của nước đó, tải về và trả file RAW ngay lập tức.
*   **Kết quả:** Hệ thống chạy mượt mà dưới 1 giây, hoàn toàn "tàng hình" trước WAF chống DDoS, và người dùng có toàn quyền kiểm soát quốc gia muốn lấy thông qua UI chuyên nghiệp.

## Phiên bản 5 (Current): Tích hợp Proxy List từ proxifly
*   **Mục tiêu:** Mở rộng ngoài hệ sinh thái V2Ray — bổ sung nguồn proxy HTTP/SOCKS miễn phí cho những trường hợp cần proxy thông thường (tool scraping, trình duyệt...).
*   **Nguồn data:** [proxifly/free-proxy-list](https://github.com/proxifly/free-proxy-list) — cập nhật mỗi 5 phút qua CDN jsDelivr, không cần API key, không rate limit.
*   **Giải pháp:**
    1.  Thêm endpoint `/proxy?country=XX&protocol=socks5` vào Worker.
    2.  Worker fetch **1 request duy nhất** từ `cdn.jsdelivr.net/gh/proxifly/free-proxy-list@main/proxies/protocols/{protocol}/data.json`.
    3.  Filter JSON theo `geolocation.country` ngay trên Worker JS — không có subrequest bổ sung.
    4.  Trả về `text/plain` (1 dòng = 1 proxy `protocol://ip:port`) hoặc JSON đầy đủ nếu `?format=json`.
    5.  Nâng cấp Web UI thành **2 tab**: 🛰️ VPN Sub (v2nodes) và 🔌 Proxy List (proxifly).
*   **Kết quả:** Worker vẫn chỉ dùng tối đa 1 subrequest cho proxy endpoint, hoàn toàn nằm trong giới hạn free plan Cloudflare Workers.

## Phiên bản 6: Cập nhật Tài liệu + Thiết lập Quy trình Push
*   **Mục tiêu:** Đồng bộ toàn bộ tài liệu (`gemini.md`, `handover.md`, `README.md`) với trạng thái thực tế của dự án, đồng thời thiết lập quy trình làm việc chuẩn để AI tuân theo trong các phiên làm việc sau.
*   **Thay đổi:**
    1.  Cập nhật `gemini.md` — bổ sung kiến trúc 2 tab, logic `/proxy`, ưu điểm auto-deploy, và **quy trình push code bắt buộc**.
    2.  Cập nhật `README.md` — phản ánh Web UI 2 tab, bảng API mới có `/proxy`, hướng dẫn sử dụng theo tab.
    3.  Thêm `wrangler.toml` — cho phép Cloudflare Workers & Pages tự động deploy khi push lên GitHub.
*   **Quy trình chuẩn từ đây về sau:** Mỗi khi thay đổi code/logic → cập nhật `handover.md` trước → rồi mới commit và push.

## Phiên bản 7: Viết lại gemini.md thành tài liệu AI Onboarding
*   **Mục tiêu:** Bất kỳ AI nào được giao làm việc với dự án này, chỉ cần đọc `gemini.md` + `handover.md` là nắm đủ toàn bộ context — không cần hỏi lại từ đầu.
*   **Thay đổi:** Viết lại `gemini.md` với cấu trúc đầy đủ gồm: tổng quan dự án, mục đích, cấu trúc file, kiến trúc hệ thống, logic từng endpoint, bảng API, ưu điểm kỹ thuật, và quy trình push code bắt buộc.
*   **Kết quả:** `gemini.md` giờ là tài liệu "single source of truth" cho AI — đọc một lần là đủ để làm việc độc lập.

## Phiên bản 8: Cyberpunk UI Redesign
*   **Mục tiêu:** Nâng cấp giao diện Web UI từ style mặc định sang theme Cyberpunk tech.
*   **Thay đổi:**
    1.  Font chữ: `Orbitron` (tiêu đề) + `Share Tech Mono` (body) từ Google Fonts.
    2.  Color palette: neon cyan `#00f5ff`, purple `#bf00ff`, green `#00ff41` trên nền đen `#050510`.
    3.  Hiệu ứng: scanline overlay, grid background, glitch animation trên tiêu đề, neon glow trên border/button/text.
    4.  Tab VPN Sub màu cyan, Tab Proxy List màu purple — phân biệt rõ 2 tính năng.
    5.  Nút bấm kiểu hollow neon border thay vì solid background.
    6.  Pulse indicator màu xanh lá báo hiệu hệ thống online.
*   **Kết quả:** Giao diện hiện đại, đặc trưng, giữ nguyên toàn bộ logic backend.

## Phiên bản 9: Responsive Design — Mobile + Desktop
*   **Mục tiêu:** Đảm bảo UI hoạt động tốt trên mọi thiết bị — mobile, tablet, desktop.
*   **Thay đổi:**
    1.  `font-size: 16px` trên input/select khi mobile — ngăn iOS tự zoom khi focus.
    2.  `min-height: 52px` trên tab button và nút bấm — đủ vùng chạm cho ngón tay.
    3.  `-webkit-tap-highlight-color: transparent` — loại bỏ flash xanh khi tap trên Android.
    4.  Media query `≥ 600px` (tablet/desktop): padding rộng hơn, font input về 14px, proxy tab dùng **2 cột grid** (country + protocol song song).
    5.  Media query `≥ 900px` (large desktop): container rộng 720px, header letter-spacing lớn hơn.
*   **Kết quả:** Trải nghiệm mượt mà trên cả điện thoại lẫn máy tính.

## Phiên bản 10: Apple Liquid Glass UI Redesign
*   **Mục tiêu:** Bỏ hoàn toàn cyberpunk, chuyển sang phong cách Apple — sạch, bold, tròn trịa, liquid glass.
*   **Thay đổi:**
    1.  Font: `Nunito` 900 weight — bold tròn, dễ đọc, thay thế Share Tech Mono.
    2.  Background: 3 gradient blobs mờ (indigo, blue, green) với `filter:blur(80px)` tạo chiều sâu.
    3.  Card: `backdrop-filter: blur(48px) saturate(180%)` — frosted glass đúng nghĩa, không còn bug ô vuông.
    4.  Tabs: pill-style rounded, active tab dùng glass fill thay vì underline.
    5.  Buttons: solid gradient (blue, indigo, green) với shadow nổi — không outline rỗng.
    6.  Select: chevron custom SVG, border radius 14px, focus ring iOS style.
    7.  Font size lớn hơn (16px mobile, 15-17px desktop) — dễ đọc trên mọi màn hình.
    8.  Tất cả element responsive, không còn bug CSS cũ.
*   **Kết quả:** Giao diện sạch, hiện đại, dễ dùng trên cả mobile lẫn desktop.





## Phiên bản 11: Custom Dropdown & Apple Perfection UI
*   **Mục tiêu:** Cải thiện select box mặc định thô kệch, hiển thị được cờ quốc gia trên mọi HĐH (đặc biệt là Windows không hỗ trợ cờ emoji), và tinh chỉnh giao diện hoàn hảo từng pixel theo chuẩn Apple.
*   **Thay đổi:**
    1.  Loại bỏ native <select>, tự code custom dropdown (.cs, .cs-panel) để chứa cả hình/icon và text, có tích hợp chức năng Live Search.
    2.  Sử dụng lagcdn.com để hiển thị cờ quốc gia thay vì phụ thuộc vào font emoji của hệ điều hành.
    3.  Tích hợp **Twemoji** để render đồng bộ các icon (🌐, 📄, 🔒, 🧦, 🚀) của giao thức Proxy trên mọi thiết bị (đổi icon lỗi 🔌 thành 🌐).
    4.  Sửa lỗi overflow: hidden của thẻ Card cắt đứt bảng dropdown.
    5.  Thiết lập strict Flexbox (lex: 0 0 20px) cho container của icon để chữ ở tất cả các dòng luôn gióng thẳng hàng dọc tuyệt đối.
    6.  Tái thiết kế Padding và Gap của menu dropdown (khoảng cách 6px/8px) để tuân thủ nguyên tắc "Concentric Radii" (bo góc đồng tâm) và tạo khoảng trống (breathing room) sang trọng.
*   **Kết quả:** Giao diện đẹp hoàn hảo không tì vết, hoạt động trơn tru như app Native.

## Phiên bản 12: Hỗ trợ PWA cho iPhone & iPad (Apple Web App)
*   **Mục tiêu:** Biến web thành Progressive Web App (PWA) chuẩn mực cho thiết bị iOS / iPadOS, cho phép cài đặt ra Màn hình chính (Home Screen) với icon độ phân giải cao và hoạt động toàn màn hình (fullscreen standalone) như ứng dụng iOS native.
*   **Thay đổi:**
    1.  **Cấu hình Meta Tags iOS:** Bổ sung `apple-mobile-web-app-capable`, `apple-mobile-web-app-status-bar-style: black-translucent`, `apple-mobile-web-app-title` và viewport `viewport-fit=cover`.
    2.  **Web App Manifest:** Cung cấp endpoint `/manifest.json` theo chuẩn PWA với theme màu tối, tên app, icon và chế độ standalone.
    3.  **Apple Touch Icon & Favicon Endpoint:** Bổ sung endpoint `/apple-touch-icon.png` và `/favicon.ico` truyền tải icon 3D quả cầu Fluent 256x256 sắc nét từ CDN có caching tối ưu.
    4.  **Service Worker (`/sw.js`):** Thêm service worker quản lý cache static shell, offline fallback và đảm bảo không cache các API subscription/proxy trực tiếp.
    5.  **Tối ưu Giao diện iOS Safe Area & Native Touch:** Sử dụng `env(safe-area-inset-top)` và `env(safe-area-inset-bottom)` để giao diện tràn viền hoàn hảo dưới Dynamic Island / Notch và thanh Home Bar của iPhone/iPad; tắt hiệu ứng kéo nảy (rubber-band bounce) khó chịu.
    6.  **Hướng dẫn cài đặt iOS trực quan:** Thêm nút và modal hướng dẫn 3 bước chạm (Share -> Add to Home Screen) phong cách kính mờ Liquid Glass, tự động ẩn đi khi người dùng đã mở app ở chế độ PWA.
*   **Kết quả:** Trải nghiệm trên iPhone / iPad mượt mà, chuyên nghiệp và liền mạch như một ứng dụng App Store thực thụ.

## Phiên bản 13: Cập nhật Logo 3D Cyber Security Shield & Đồng bộ Brand Identity
*   **Mục tiêu:** Thay thế logo mặc định bằng logo thiết kế 3D chuyên nghiệp do người dùng cung cấp (Quả cầu không gian với khiên bảo mật neon, tín hiệu wifi và vị trí bản đồ), hiển thị nổi bật trên cả Web Header, PWA, Apple Touch Icon và Favicon.
*   **Thay đổi:**
    1.  Tạo file `icon.png` 512x512 chất lượng cao và commit trực tiếp vào repo.
    2.  Cập nhật endpoint `/apple-touch-icon.png` và `/favicon.ico` để fetch và stream trực tiếp logo mới từ GitHub raw với cache 7 ngày.
    3.  Thêm logo vào Header trang web (`.app-logo`) với hiệu ứng bo góc 20px, bóng đổ xanh neon liquid glass và hover zoom nhẹ.
    4.  Đồng bộ logo mới vào Web App Manifest (`/manifest.json`) và bảng hướng dẫn cài đặt iOS (`#pwa-modal`).
*   **Kết quả:** Bộ nhận diện thương hiệu đỉnh cao, icon màn hình chính của iPhone/iPad rực rỡ và bắt mắt đúng chất một ứng dụng VPN / Proxy đẳng cấp.

## Phiên bản 14: Khử viền đen logo (Transparent Alpha Masking & Drop Shadow)
*   **Mục tiêu:** Loại bỏ hoàn toàn viền đen và 4 góc màu đen bao quanh huy hiệu logo 3D, giúp logo hiển thị trong suốt (floating transparent), hòa vào nền web và màn hình chính mượt mà không tì vết.
*   **Thay đổi:**
    1.  **Xử lý Alpha Masking bằng C# LockBits:** Quét flood-fill từ 4 góc và chuyển đổi toàn bộ vùng nền đen bên ngoài khung viền bo tròn trắng thành trong suốt tuyệt đối (`Alpha = 0`), xử lý viền chuyển tiếp (feathering) mượt mà, lưu đè vào `icon.png`.
    2.  **Cập nhật CSS `.app-logo`:** Bỏ thuộc tính `background: #080814` và `box-shadow` khung chữ nhật cũ; chuyển sang dùng `filter: drop-shadow(...)` theo đường nét thực tế của huy hiệu 3D để tạo độ nổi khối chân thực.
    3.  **Cập nhật Cache Buster:** Nâng cấp Service Worker lên `node-matrix-v3` và thêm tham số `?v=3` vào các thẻ `<link rel="apple-touch-icon">`, `<link rel="icon">` để iPhone/iPad xóa cache cũ và tải ngay icon trong suốt mới.
*   **Kết quả:** Logo hiển thị tinh tế, không còn bất kỳ vệt đen hay viền vuông thô kệch nào xung quanh.

## Phiên bản 15: Cắt phóng tràn viền (Edge-to-Edge Zoom) — Ôm sát Logo 100%
*   **Mục tiêu:** Khắc phục triệt để lỗi viền đen vuông bao quanh logo trên cả màn hình chính iPhone/iPad và Web. Vì iOS Home Screen không hỗ trợ độ trong suốt (tự động biến pixel trong suốt thành màu đen) và ảnh gốc có viền đen dày 55px bao quanh, việc zoom tràn viền là giải pháp chuẩn mực của Apple để icon ôm sát viền bo góc iOS.
*   **Thay đổi:**
    1.  **Cắt phóng chuẩn xác (Edge-to-Edge Crop & Scale):** Crop vùng huy hiệu từ tọa độ `(132, 132)` đến `(892, 892)` (kích thước 760x760) và phóng to lên 512x512 tràn toàn bộ canvas. Toàn bộ 4 góc giờ là viền sáng phản quang pastel/tím neon của chính logo, triệt tiêu 100% viền đen bên ngoài.
    2.  **Đồng bộ CSS Web & PWA Sheet:** Cập nhật `.app-logo` và `.pwa-app-icon` với `border-radius: 22px; overflow: hidden; object-fit: cover; box-shadow: ...` khớp hoàn hảo với tỉ lệ Squircle của Apple.
    3.  **Vô hiệu hóa CDN Cache Stale (`cacheTtl: 0`):** Thiết lập `cf: { cacheTtl: 0 }` và thêm cache buster `?v=4` cho endpoint fetch raw icon trên Cloudflare Worker, nâng cấp Service Worker lên `node-matrix-v4`.
*   **Kết quả:** Logo hiển thị đầy đặn, ôm sát viền bo tròn của iOS và web, tuyệt đối không còn bất kỳ khoảng hở hay viền đen vuông nào bên ngoài.
