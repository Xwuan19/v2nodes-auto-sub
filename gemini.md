# Logic Hoạt Động (Gemini)

Tài liệu này giải thích cơ chế và logic lập trình đằng sau Cloudflare Worker dùng để tự động bóc tách (scrape) cấu hình từ v2nodes.

## Kiến trúc Hệ Thống
Hệ thống là một Serverless API chạy trên Cloudflare Workers. Nó đóng vai trò là một "Cầu nối" (Proxy / Scraper) giữa Client (ứng dụng VPN như Shadowrocket) và Target Server (\`v2nodes.com\`).

### 1. Phân tuyến (Routing)
Worker lắng nghe mọi request HTTP và xử lý dựa trên \`url.pathname\`:
*   **Path \`/\` (Giao diện Web):** Trả về một khối mã HTML tĩnh. Giao diện này cung cấp một thẻ \`<select>\` chứa 54 quốc gia đã được map mã ISO tương ứng với cấu trúc URL của v2nodes. Dùng JavaScript thuần để thao tác DOM, gắn tham số \`?country=\` vào đuôi URL khi người dùng bấm tạo link.
*   **Path \`/sub\` (API Xử lý):** Điểm cuối (Endpoint) thực sự thực hiện việc scraping.

### 2. Logic Bóc Tách (\`/sub\`)
Khi nhận được request (VD: \`/sub?country=jp\`):
1.  **Phân tích tham số:** Trích xuất biến \`countryCode\`. Nếu không có, mặc định là \`all\`.
2.  **Xác định mục tiêu:** Xây dựng Target URL.
    *   Nếu \`all\` -> \`https://www.v2nodes.com/\`
    *   Nếu \`jp\` -> \`https://www.v2nodes.com/country/jp/\`
3.  **Fetch HTML:** Sử dụng hàm \`fetch()\` với \`User-Agent\` giả lập trình duyệt để vượt qua các bộ lọc bot cơ bản.
4.  **Trích xuất Key Sub:** 
    *   Cấu trúc HTML của trang chứa input box bị ẩn.
    *   Worker sử dụng Regular Expression: \`/data-config="([^"]+subscriptions\/country\/[^"]+)"/i\` để tìm chuỗi chứa link sub (bên trong có tham số \`?key=... \` mới nhất).
5.  **Fetch Data Cuối Cùng:** Truy cập vào URL vừa trích xuất để lấy dữ liệu thô (Raw Data) thường được lưu ở dạng Base64 chứa danh sách \`vmess://\`, \`vless://\`.
6.  **Trả về Client:** Header được set \`Content-Type: text/plain\` và \`Cache-Control: no-store\` để ép Shadowrocket luôn phải đọc mới khi Update, không lưu cache cũ.

## Ưu điểm của Logic này
*   **Bypass Rotation Key:** v2nodes thay đổi tham số \`key\` liên tục để ngăn chặn việc copy link trực tiếp. Worker lách luật bằng cách luôn luôn fetch HTML mới nhất để tìm key ngay tại thời điểm được yêu cầu.
*   **Zero-Timeout:** Do chỉ thực hiện tối đa 2 request (1 fetch HTML, 1 fetch data) theo dạng nối tiếp, Worker hoàn thành xử lý trong thời gian dưới 1000ms. Điều này tránh kích hoạt tường lửa Anti-Bot/DDoS của Cloudflare đang bảo vệ v2nodes.
*   **Self-healing:** Client app (Shadowrocket) được hưởng lợi nhờ cơ chế "Update on Open". Mỗi lần cập nhật, các node chết/cũ tự động bị xóa, nhường chỗ cho các node tươi nhất được cào về.
