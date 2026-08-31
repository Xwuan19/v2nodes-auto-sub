# 🌍 v2nodes Auto Sub

Công cụ tự động lấy cấu hình V2Ray / VLESS / VMess / Trojan mới nhất từ [v2nodes.com](https://www.v2nodes.com), chạy trên **Cloudflare Workers** — hoàn toàn miễn phí, không cần server riêng.

## ✨ Tính năng

- 🔄 **Tự động cập nhật** — Mỗi lần app VPN (Shadowrocket, v2rayNG...) kéo Sub, Worker sẽ tự động vào v2nodes lấy `key` mới nhất của đúng giây phút đó, không bao giờ bị outdated.
- 🌐 **Hỗ trợ 54 quốc gia** — Albania, Argentina, Mỹ, Nhật, Singapore, Thổ Nhĩ Kỳ... toàn bộ danh sách quốc gia mà v2nodes hỗ trợ.
- 🖥️ **Giao diện Web UI 2 tab** — Mở link bằng trình duyệt sẽ hiện ra trang chọn quốc gia trực quan với 2 tab riêng biệt.
- ⚡ **Siêu nhanh** — Chỉ thực hiện tối đa 2 request tuần tự, hoàn thành dưới 1 giây, không bị timeout.
- 🛡️ **Bypass Key Rotation** — v2nodes thường xuyên đổi tham số `?key=` để chặn copy link trực tiếp. Worker lách luật bằng cách luôn scrape HTML mới nhất để bóc tách key ngay tại thời điểm được gọi.
- 🔌 **Proxy List (proxifly)** — Lấy danh sách proxy HTTP/HTTPS/SOCKS4/SOCKS5 miễn phí từ [proxifly/free-proxy-list](https://github.com/proxifly/free-proxy-list), cập nhật mỗi 5 phút, lọc theo quốc gia và giao thức.

## 🚀 Cách triển khai

### Yêu cầu
- Tài khoản [Cloudflare](https://cloudflare.com) (miễn phí)

### Các bước

1. Đăng nhập vào **Cloudflare Dashboard** → chọn **Workers & Pages** → **Create Worker**.
2. Xóa code mặc định, dán toàn bộ nội dung file [`worker.js`](./worker.js) vào.
3. Bấm **Deploy**.
4. Truy cập vào link Worker vừa được cấp (dạng `https://ten-worker.ten-account.workers.dev`).

## 🗺️ Cách sử dụng

### Tab 🛰️ VPN Sub (v2nodes)
1. Mở link Worker trong trình duyệt → chọn tab **🛰️ VPN Sub**
2. Chọn quốc gia → bấm **"Tạo Link Cho Shadowrocket / v2rayNG"**
3. Copy link và dán vào mục **Subscribe** trong app VPN của bạn

> Bạn chỉ cần làm bước này **1 lần duy nhất**. Từ đó về sau, mỗi lần app kéo cập nhật, nó sẽ tự động lấy node mới nhất.

### Tab 🔌 Proxy List (proxifly)
1. Chọn tab **🔌 Proxy List**
2. Chọn quốc gia và giao thức (HTTP / HTTPS / SOCKS4 / SOCKS5)
3. Bấm **"Tạo Link Proxy List"** → Copy link và dán vào tool hoặc trình duyệt

## 📡 Cấu trúc API

| Endpoint | Mô tả |
|---|---|
| `GET /` | Trả về giao diện Web UI 2 tab |
| `GET /sub?country=us` | Trả về file Sub (Base64) chứa toàn bộ node VPN của Mỹ |
| `GET /sub?country=sg` | Trả về file Sub của Singapore |
| `GET /sub?country=all` | Trả về file Sub tổng hợp toàn cầu |
| `GET /proxy?country=US&protocol=socks5` | Trả về danh sách SOCKS5 proxy của Mỹ (text/plain, 1 dòng = 1 proxy) |
| `GET /proxy?country=all&protocol=http` | Trả về toàn bộ HTTP proxy không lọc quốc gia |
| `GET /proxy?country=SG&protocol=all&format=json` | Trả về JSON đầy đủ (có IP, port, anonymity, score...) |

> **Lưu ý mã quốc gia**: `/sub` dùng chữ thường (`us`, `jp`), `/proxy` dùng chữ HOA (`US`, `JP`) — Worker tự xử lý, không cần lo.

## ⚙️ Cơ chế hoạt động

Xem chi tiết tại file [`gemini.md`](./gemini.md).

## 📋 Lịch sử phát triển

Xem chi tiết tại file [`handover.md`](./handover.md).

## ⚠️ Lưu ý

- Dự án này chỉ phục vụ mục đích **học tập và nghiên cứu kỹ thuật**.
- Node miễn phí từ v2nodes thường có tuổi thọ ngắn (vài giờ đến vài ngày). Hãy bấm **Update** thường xuyên trên app để lấy node mới.
- Proxy từ proxifly cũng là proxy công cộng, tốc độ và độ ổn định không được đảm bảo.
- Dự án không lưu trữ bất kỳ dữ liệu người dùng nào.
