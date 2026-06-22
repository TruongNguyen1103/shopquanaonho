// ========== UNIT TESTS - FASHION SHOP ==========
// Framework: Jest | Tác giả: Fashion Shop Team

const {
    validateLogin,
    validateRegister,
    addToCart,
    removeFromCart,
    calcTotal,
    generateOrderId,
    validateOrderInfo,
    createOrder,
    validateProduct,
    formatPrice,
} = require("../src/shop");

// ============================================================
// NHÓM 1: validateLogin (4 test cases)
// ============================================================

describe("TC01-TC04 | validateLogin - Đăng nhập", () => {

    test("TC01: Admin đăng nhập đúng → thành công, role=admin", () => {
        const result = validateLogin("anhzaiso1", "1234567@", "", "");
        expect(result.success).toBe(true);
        expect(result.role).toBe("admin");
    });

    test("TC02: User đăng nhập đúng → thành công, role=user", () => {
        const result = validateLogin("user1", "pass123", "user1", "pass123");
        expect(result.success).toBe(true);
        expect(result.role).toBe("user");
    });

    test("TC03: Sai mật khẩu → thất bại", () => {
        const result = validateLogin("user1", "wrongpass", "user1", "pass123");
        expect(result.success).toBe(false);
        expect(result.message).toMatch(/Sai/i);
    });

    test("TC04: Bỏ trống username → thất bại", () => {
        const result = validateLogin("", "pass123", "user1", "pass123");
        expect(result.success).toBe(false);
    });

});

// ============================================================
// NHÓM 2: validateRegister (4 test cases)
// ============================================================

describe("TC05-TC08 | validateRegister - Đăng ký", () => {

    test("TC05: Đăng ký đầy đủ và hợp lệ → thành công", () => {
        const result = validateRegister("newuser", "abc123", "abc123", "0912345678", "Hà Nội");
        expect(result.success).toBe(true);
    });

    test("TC06: Mật khẩu không khớp → thất bại", () => {
        const result = validateRegister("newuser", "abc123", "xyz999", "0912345678", "Hà Nội");
        expect(result.success).toBe(false);
        expect(result.message).toMatch(/không khớp/i);
    });

    test("TC07: Thiếu địa chỉ → thất bại", () => {
        const result = validateRegister("newuser", "abc123", "abc123", "0912345678", "");
        expect(result.success).toBe(false);
        expect(result.message).toMatch(/đầy đủ/i);
    });

    test("TC08: Số điện thoại không hợp lệ (chứa chữ) → thất bại", () => {
        const result = validateRegister("newuser", "abc123", "abc123", "09abc678", "Hà Nội");
        expect(result.success).toBe(false);
    });

});

// ============================================================
// NHÓM 3: addToCart & removeFromCart (4 test cases)
// ============================================================

describe("TC09-TC12 | Giỏ hàng - Thêm & Xóa sản phẩm", () => {

    test("TC09: Thêm sản phẩm hợp lệ khi đã đăng nhập → giỏ tăng 1", () => {
        const result = addToCart([], "Áo Hoodie", 300000, true);
        expect(result.success).toBe(true);
        expect(result.cart.length).toBe(1);
        expect(result.cart[0].name).toBe("Áo Hoodie");
    });

    test("TC10: Thêm sản phẩm khi chưa đăng nhập → thất bại", () => {
        const result = addToCart([], "Áo Hoodie", 300000, false);
        expect(result.success).toBe(false);
        expect(result.cart.length).toBe(0);
    });

    test("TC11: Xóa sản phẩm đúng index → giỏ giảm 1", () => {
        const cart = [
            { name: "Áo Hoodie", price: 300000 },
            { name: "Quần Jeans", price: 299000 }
        ];
        const result = removeFromCart(cart, 0);
        expect(result.success).toBe(true);
        expect(result.cart.length).toBe(1);
        expect(result.cart[0].name).toBe("Quần Jeans");
    });

    test("TC12: Xóa index âm → thất bại", () => {
        const cart = [{ name: "Áo Hoodie", price: 300000 }];
        const result = removeFromCart(cart, -1);
        expect(result.success).toBe(false);
    });

});

// ============================================================
// NHÓM 4: calcTotal (2 test cases)
// ============================================================

describe("TC13-TC14 | calcTotal - Tính tổng tiền", () => {

    test("TC13: Giỏ hàng nhiều sản phẩm → tổng đúng", () => {
        const cart = [
            { name: "Áo", price: 300000 },
            { name: "Quần", price: 200000 },
            { name: "Mũ", price: 59000 }
        ];
        expect(calcTotal(cart)).toBe(559000);
    });

    test("TC14: Giỏ hàng rỗng → tổng = 0", () => {
        expect(calcTotal([])).toBe(0);
    });

});

// ============================================================
// NHÓM 5: generateOrderId & validateOrderInfo (3 test cases)
// ============================================================

describe("TC15-TC17 | Order - Mã đơn & Thông tin đặt hàng", () => {

    test("TC15: generateOrderId → bắt đầu bằng TN hoặc CNC", () => {
        const id = generateOrderId();
        expect(id).toMatch(/^(TN|CNC)\d+$/);
    });

    test("TC16: Thông tin đặt hàng đầy đủ, SĐT hợp lệ → thành công", () => {
        const result = validateOrderInfo("Nguyễn Văn A", "0912345678", "Hà Nội");
        expect(result.success).toBe(true);
    });

    test("TC17: SĐT chứa chữ cái → thất bại", () => {
        const result = validateOrderInfo("Nguyễn Văn A", "091abc678", "Hà Nội");
        expect(result.success).toBe(false);
    });

});

// ============================================================
// NHÓM 6: validateProduct & formatPrice (3 test cases)
// ============================================================

describe("TC18-TC20 | Sản phẩm - Validate & Format giá", () => {

    test("TC18: Sản phẩm đầy đủ thông tin, giá hợp lệ → thành công", () => {
        const result = validateProduct("Áo Hoodie", 300000, "https://img.com/ao.jpg");
        expect(result.success).toBe(true);
    });

    test("TC19: Giá = 0 → thất bại", () => {
        const result = validateProduct("Áo Hoodie", 0, "https://img.com/ao.jpg");
        expect(result.success).toBe(false);
        expect(result.message).toMatch(/Giá/i);
    });

    test("TC20: formatPrice → định dạng tiền Việt Nam đúng", () => {
        const result = formatPrice(300000);
        expect(result).toContain("300");
        expect(result).toContain("đ");
    });

});
