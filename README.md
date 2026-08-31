# 🌍 v2nodes Auto Sub

Công cụ tự động lấy cấu hình V2Ray / VLESS / VMess / Trojan mới nhất từ [v2nodes.com](https://www.v2nodes.com), chạy trên **Cloudflare Workers** — hoàn toàn miễn phí, không cần server riêng.

## ✨ Tính năng

- 🔄 **Tự động cập nhật** — Mỗi lần app VPN (Shadowrocket, v2rayNG...) kéo Sub, Worker sẽ tự động vào v2nodes lấy `key` mới nhất của đúng giây phút đó, không bao giờ bị outdated.
- 🌐 **Hỗ trợ 54 quốc gia** — Albania, Argentina, Mỹ, Nhật, Singapore, Thổ Nhĩ Kỳ... toàn bộ danh sách quốc gia mà v2nodes hỗ trợ.
- 🖥️ **Giao diện Web UI** — Mở link bằng trình duyệt sẽ hiện ra trang chọn quốc gia trực quan. Chọn xong bấm nút là tự sinh ra link Sub cho bạn.
- ⚡ **Siêu nhanh** — Chỉ thực hiện 2 request tuần tự, hoàn thành dưới 1 giây, không bị timeout.
- 🛡️ **Bypass Key Rotation** — v2nodes thường xuyên đổi tham số `?key=` để chặn copy link trực tiếp. Worker lách luật bằng cách luôn scrape HTML mới nhất để bóc tách key ngay tại thời điểm được gọi.

## 🚀 Cách triển khai

### Yêu cầu
- Tài khoản [Cloudflare](https://cloudflare.com) (miễn phí)

### Các bước

1. Đăng nhập vào **Cloudflare Dashboard** → chọn **Workers & Pages** → **Create Worker**.
2. Xóa code mặc định, dán toàn bộ nội dung file [`worker.js`](./worker.js) vào.
3. Bấm **Deploy**.
4. Truy cập vào link Worker vừa được cấp (dạng `https://ten-worker.ten-account.workers.dev`).

## 🗺️ Cách sử dụng

### Bước 1 — Mở giao diện Web
Dán link Worker của bạn vào trình duyệt (Safari, Chrome...). Bạn sẽ thấy giao diện chọn quốc gia.

### Bước 2 — Chọn quốc gia
Chọn quốc gia mà bạn muốn lấy node (VD: 🇺🇸 Mỹ, 🇸🇬 Singapore, 🇹🇷 Thổ Nhĩ Kỳ...) rồi bấm **"Tạo Link Cho Shadowrocket"**.

### Bước 3 — Copy link vào App VPN
Copy link vừa sinh ra và dán vào mục **Subscribe** trong app VPN của bạn (Shadowrocket, v2rayNG, Clash...).

> Bạn chỉ cần làm bước này **1 lần duy nhất**. Từ đó về sau, mỗi lần app kéo cập nhật, nó sẽ tự động lấy node mới nhất mà không cần bạn làm gì thêm.

## 📡 Cấu trúc API

| Endpoint | Mô tả |
|---|---|
| `GET /` | Trả về giao diện Web UI để chọn quốc gia |
| `GET /sub?country=us` | Trả về file Sub (Base64) chứa toàn bộ node của Mỹ |
| `GET /sub?country=sg` | Trả về file Sub của Singapore |
| `GET /sub?country=all` | Trả về file Sub tổng hợp toàn cầu |

> Mã quốc gia theo chuẩn ISO 3166-1 alpha-2 (VD: `us`, `jp`, `tr`, `hk`...)

## ⚙️ Cơ chế hoạt động

Xem chi tiết tại file [`gemini.md`](./gemini.md).

## 📋 Lịch sử phát triển

Xem chi tiết tại file [`handover.md`](./handover.md).

## ⚠️ Lưu ý

- Dự án này chỉ phục vụ mục đích **học tập và nghiên cứu kỹ thuật**.
- Node miễn phí từ v2nodes thường có tuổi thọ ngắn (vài giờ đến vài ngày). Hãy bấm **Update** thường xuyên trên app để lấy node mới.
- Dự án không lưu trữ bất kỳ dữ liệu người dùng nào.
