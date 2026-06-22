# Fashion Shop — Unit Test (HĐ3)

## Mô tả
Unit test cho dự án Fashion Shop (website bán quần áo).  
Viết bằng JavaScript thuần, không cần cài thư viện.

## Cấu trúc
```
fashion-shop/
├── index.html
├── checkout.html
├── orders.html
├── bank.html
├── src/
│   └── shop.js          ← logic tách ra để test
├── tests/
│   └── shop.test.js     ← 20 test case
├── run-tests.js         ← test runner
├── package.json
└── README.md
```

## Cách chạy test

```bash
node run-tests.js
```

hoặc:

```bash
npm test
```

## Kết quả

```
Tổng:    20 test case
Passed:  20 ✅
Failed:  0
Tỉ lệ:  100%
```

## Bảng 20 test case

| STT | Mã TC | Tên test case | Hàm | Loại | Kết quả |
|-----|-------|---------------|-----|------|---------|
| 1 | TC01 | Admin đăng nhập đúng → role=admin | validateLogin | Positive | ✅ PASS |
| 2 | TC02 | User đăng nhập đúng → role=user | validateLogin | Positive | ✅ PASS |
| 3 | TC03 | Sai mật khẩu → thất bại | validateLogin | Negative | ✅ PASS |
| 4 | TC04 | Username rỗng → thất bại | validateLogin | Boundary | ✅ PASS |
| 5 | TC05 | Đăng ký đầy đủ hợp lệ → thành công | validateRegister | Positive | ✅ PASS |
| 6 | TC06 | Mật khẩu không khớp → thất bại | validateRegister | Negative | ✅ PASS |
| 7 | TC07 | Thiếu địa chỉ → thất bại | validateRegister | Negative | ✅ PASS |
| 8 | TC08 | SĐT chứa chữ cái → thất bại | validateRegister | Negative | ✅ PASS |
| 9 | TC09 | Thêm SP khi đã đăng nhập → giỏ tăng 1 | addToCart | Positive | ✅ PASS |
| 10 | TC10 | Thêm SP chưa đăng nhập → thất bại | addToCart | Negative | ✅ PASS |
| 11 | TC11 | Xóa đúng index → giỏ giảm 1 | removeFromCart | Positive | ✅ PASS |
| 12 | TC12 | Xóa index âm → thất bại | removeFromCart | Boundary | ✅ PASS |
| 13 | TC13 | Nhiều SP → tổng chính xác 559.000đ | calcTotal | Positive | ✅ PASS |
| 14 | TC14 | Giỏ rỗng → tổng = 0 | calcTotal | Boundary | ✅ PASS |
| 15 | TC15 | generateOrderId → format TN/CNC + số | generateOrderId | Positive | ✅ PASS |
| 16 | TC16 | Thông tin đầy đủ, SĐT hợp lệ → OK | validateOrderInfo | Positive | ✅ PASS |
| 17 | TC17 | SĐT chứa chữ cái → thất bại | validateOrderInfo | Negative | ✅ PASS |
| 18 | TC18 | SP đầy đủ, giá hợp lệ → thành công | validateProduct | Positive | ✅ PASS |
| 19 | TC19 | Giá = 0 → thất bại (bug fixed) | validateProduct | Boundary | ✅ PASS |
| 20 | TC20 | formatPrice → định dạng VND đúng | formatPrice | Positive | ✅ PASS |
