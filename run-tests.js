// ========== TEST RUNNER - FASHION SHOP ==========
// Chạy: node run-tests.js

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
} = require("./src/shop");

let passed = 0;
let failed = 0;
const results = [];

function expect(val) {
    return {
        toBe: (expected) => ({ val, expected, type: "toBe" }),
        toMatch: (pattern) => ({ val, expected: pattern, type: "toMatch" }),
        toContain: (substr) => ({ val, expected: substr, type: "toContain" }),
    };
}

function test(name, fn) {
    try {
        fn();
        console.log(`  ✅ PASS | ${name}`);
        passed++;
        results.push({ name, status: "PASS", error: null });
    } catch (e) {
        console.log(`  ❌ FAIL | ${name}`);
        console.log(`         → ${e.message}`);
        failed++;
        results.push({ name, status: "FAIL", error: e.message });
    }
}

function assert(condition, message) {
    if (!condition) throw new Error(message || "Assertion failed");
}

// ============================================================
// NHÓM 1: validateLogin
// ============================================================
console.log("\n📋 NHÓM 1: validateLogin - Đăng nhập");

test("TC01: Admin đăng nhập đúng → thành công, role=admin", () => {
    const r = validateLogin("anhzaiso1", "1234567@", "", "");
    assert(r.success === true, `Expected success=true, got ${r.success}`);
    assert(r.role === "admin", `Expected role=admin, got ${r.role}`);
});

test("TC02: User đăng nhập đúng → thành công, role=user", () => {
    const r = validateLogin("user1", "pass123", "user1", "pass123");
    assert(r.success === true, `Expected success=true, got ${r.success}`);
    assert(r.role === "user", `Expected role=user, got ${r.role}`);
});

test("TC03: Sai mật khẩu → thất bại", () => {
    const r = validateLogin("user1", "wrongpass", "user1", "pass123");
    assert(r.success === false, `Expected success=false, got ${r.success}`);
    assert(/Sai/i.test(r.message), `Message should contain 'Sai': ${r.message}`);
});

test("TC04: Bỏ trống username → thất bại", () => {
    const r = validateLogin("", "pass123", "user1", "pass123");
    assert(r.success === false, `Expected success=false, got ${r.success}`);
});

// ============================================================
// NHÓM 2: validateRegister
// ============================================================
console.log("\n📋 NHÓM 2: validateRegister - Đăng ký");

test("TC05: Đăng ký đầy đủ và hợp lệ → thành công", () => {
    const r = validateRegister("newuser", "abc123", "abc123", "0912345678", "Hà Nội");
    assert(r.success === true, `Expected success=true, got ${r.success}`);
});

test("TC06: Mật khẩu không khớp → thất bại", () => {
    const r = validateRegister("newuser", "abc123", "xyz999", "0912345678", "Hà Nội");
    assert(r.success === false, `Expected success=false`);
    assert(/không khớp/i.test(r.message), `Message: ${r.message}`);
});

test("TC07: Thiếu địa chỉ → thất bại", () => {
    const r = validateRegister("newuser", "abc123", "abc123", "0912345678", "");
    assert(r.success === false, `Expected success=false`);
    assert(/đầy đủ/i.test(r.message), `Message: ${r.message}`);
});

test("TC08: Số điện thoại chứa chữ → thất bại", () => {
    const r = validateRegister("newuser", "abc123", "abc123", "09abc678", "Hà Nội");
    assert(r.success === false, `Expected success=false`);
});

// ============================================================
// NHÓM 3: Giỏ hàng
// ============================================================
console.log("\n📋 NHÓM 3: addToCart & removeFromCart - Giỏ hàng");

test("TC09: Thêm sản phẩm hợp lệ khi đã đăng nhập → giỏ tăng 1", () => {
    const r = addToCart([], "Áo Hoodie", 300000, true);
    assert(r.success === true, `Expected success=true`);
    assert(r.cart.length === 1, `Expected cart.length=1, got ${r.cart.length}`);
    assert(r.cart[0].name === "Áo Hoodie", `Expected name=Áo Hoodie`);
});

test("TC10: Thêm sản phẩm khi chưa đăng nhập → thất bại", () => {
    const r = addToCart([], "Áo Hoodie", 300000, false);
    assert(r.success === false, `Expected success=false`);
    assert(r.cart.length === 0, `Cart should stay empty`);
});

test("TC11: Xóa sản phẩm đúng index → giỏ giảm 1", () => {
    const cart = [{ name: "Áo Hoodie", price: 300000 }, { name: "Quần Jeans", price: 299000 }];
    const r = removeFromCart(cart, 0);
    assert(r.success === true, `Expected success=true`);
    assert(r.cart.length === 1, `Expected cart.length=1`);
    assert(r.cart[0].name === "Quần Jeans", `Expected remaining item = Quần Jeans`);
});

test("TC12: Xóa index âm → thất bại", () => {
    const r = removeFromCart([{ name: "Áo Hoodie", price: 300000 }], -1);
    assert(r.success === false, `Expected success=false`);
});

// ============================================================
// NHÓM 4: calcTotal
// ============================================================
console.log("\n📋 NHÓM 4: calcTotal - Tính tổng tiền");

test("TC13: Giỏ hàng nhiều sản phẩm → tổng đúng", () => {
    const cart = [
        { price: 300000 }, { price: 200000 }, { price: 59000 }
    ];
    const total = calcTotal(cart);
    assert(total === 559000, `Expected 559000, got ${total}`);
});

test("TC14: Giỏ hàng rỗng → tổng = 0", () => {
    const total = calcTotal([]);
    assert(total === 0, `Expected 0, got ${total}`);
});

// ============================================================
// NHÓM 5: Order
// ============================================================
console.log("\n📋 NHÓM 5: generateOrderId & validateOrderInfo");

test("TC15: generateOrderId → bắt đầu bằng TN hoặc CNC", () => {
    const id = generateOrderId();
    assert(/^(TN|CNC)\d+$/.test(id), `Invalid orderId format: ${id}`);
});

test("TC16: Thông tin đặt hàng đầy đủ, SĐT hợp lệ → thành công", () => {
    const r = validateOrderInfo("Nguyễn Văn A", "0912345678", "Hà Nội");
    assert(r.success === true, `Expected success=true, got: ${r.message}`);
});

test("TC17: SĐT chứa chữ cái → thất bại", () => {
    const r = validateOrderInfo("Nguyễn Văn A", "091abc678", "Hà Nội");
    assert(r.success === false, `Expected success=false`);
});

// ============================================================
// NHÓM 6: Product
// ============================================================
console.log("\n📋 NHÓM 6: validateProduct & formatPrice");

test("TC18: Sản phẩm đầy đủ thông tin, giá hợp lệ → thành công", () => {
    const r = validateProduct("Áo Hoodie", 300000, "https://img.com/ao.jpg");
    assert(r.success === true, `Expected success=true`);
});

test("TC19: Giá = 0 → thất bại", () => {
    const r = validateProduct("Áo Hoodie", 0, "https://img.com/ao.jpg");
    assert(r.success === false, `Expected success=false`);
    assert(/Giá/i.test(r.message), `Message should mention 'Giá': ${r.message}`);
});

test("TC20: formatPrice → định dạng tiền Việt Nam đúng", () => {
    const result = formatPrice(300000);
    assert(result.includes("300"), `Should contain '300': ${result}`);
    assert(result.includes("đ"), `Should contain 'đ': ${result}`);
});

// ============================================================
// BÁO CÁO KẾT QUẢ
// ============================================================
const total = passed + failed;
console.log("\n" + "=".repeat(55));
console.log("📊 KẾT QUẢ UNIT TEST - FASHION SHOP");
console.log("=".repeat(55));
console.log(`  Tổng số test:  ${total}`);
console.log(`  ✅ Passed:     ${passed}`);
console.log(`  ❌ Failed:     ${failed}`);
console.log(`  Tỉ lệ:        ${Math.round(passed/total*100)}%`);
console.log("=".repeat(55));

// Chi tiết từng test
console.log("\n📄 BẢNG CHI TIẾT:\n");
console.log(" STT | Tên Test Case                                    | Kết quả");
console.log("-----|--------------------------------------------------|--------");
results.forEach((r, i) => {
    const stt = String(i+1).padStart(3, " ");
    const name = r.name.padEnd(48, " ").substring(0, 48);
    console.log(` ${stt} | ${name} | ${r.status === "PASS" ? "✅ PASS" : "❌ FAIL"}`);
});
console.log("");

process.exit(failed > 0 ? 1 : 0);
