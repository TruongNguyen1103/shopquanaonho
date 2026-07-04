// ========== 100 UNIT TESTS - FASHION SHOP ==========
// Chạy: node run-tests-100.js
// Ghi chú: rút gọn từ bộ 104 test case, bỏ 4 test trùng lặp/ít giá trị
// (TC010, TC012 nhóm validateLogin; TC029 nhóm addToCart; TC040 nhóm removeFromCart)
// rồi đánh lại số thứ tự liên tục TC001–TC100.

const {
    validateLogin,
    validateRegister,
    addToCart,
    removeFromCart,
    calcTotal,
    buyNow,
    hideProduct,
    deleteProduct,
    generateOrderId,
    validateOrderInfo,
    createOrder,
    validatePaymentMethod,
    checkout,
    validateProduct,
    formatPrice,
    searchProducts,
    filterByPrice,
    updateCartQuantity,
    clearCart,
} = require("./src/shop");

let passed = 0;
let failed = 0;
const results = [];

function assert(condition, message) {
    if (!condition) throw new Error(message || "Assertion failed");
}

function test(code, name, fn) {
    try {
        fn();
        console.log(`  ✅ PASS | ${code} | ${name}`);
        passed++;
        results.push({ code, name, status: "PASS", error: null });
    } catch (e) {
        console.log(`  ❌ FAIL | ${code} | ${name}`);
        console.log(`         → ${e.message}`);
        failed++;
        results.push({ code, name, status: "FAIL", error: e.message });
    }
}

// ============================================================
// NHÓM 1: validateLogin — Đăng nhập (10 test)
// ============================================================
console.log("\n📋 NHÓM 1: validateLogin — Đăng nhập (TC001–TC010)");

test("TC001", "Admin đúng user+pass → success=true, role=admin", () => {
    const r = validateLogin("anhzaiso1", "1234567@", "", "");
    assert(r.success === true, `success phải true, got ${r.success}`);
    assert(r.role === "admin", `role phải admin, got ${r.role}`);
});

test("TC002", "User thường đúng → success=true, role=user", () => {
    const r = validateLogin("user1", "pass123", "user1", "pass123");
    assert(r.success === true);
    assert(r.role === "user");
});

test("TC003", "Sai mật khẩu → success=false", () => {
    const r = validateLogin("user1", "wrong", "user1", "pass123");
    assert(r.success === false);
});

test("TC004", "Sai username → success=false", () => {
    const r = validateLogin("noone", "pass123", "user1", "pass123");
    assert(r.success === false);
});

test("TC005", "Username rỗng → success=false", () => {
    const r = validateLogin("", "pass123", "user1", "pass123");
    assert(r.success === false);
});

test("TC006", "Password rỗng → success=false", () => {
    const r = validateLogin("user1", "", "user1", "pass123");
    assert(r.success === false);
});

test("TC007", "Cả hai rỗng → success=false", () => {
    const r = validateLogin("", "", "", "");
    assert(r.success === false);
});

test("TC008", "Admin sai password → success=false", () => {
    const r = validateLogin("anhzaiso1", "wrongpass", "", "");
    assert(r.success === false);
});

test("TC009", "Admin đúng → message chứa 'Admin'", () => {
    const r = validateLogin("anhzaiso1", "1234567@", "", "");
    assert(r.message.includes("Admin"), `message: ${r.message}`);
});

test("TC010", "Sai cả user lẫn pass → message chứa 'Sai'", () => {
    const r = validateLogin("abc", "xyz", "user1", "pass123");
    assert(/Sai/i.test(r.message), `message: ${r.message}`);
});

// ============================================================
// NHÓM 2: validateRegister — Đăng ký (10 test)
// ============================================================
console.log("\n📋 NHÓM 2: validateRegister — Đăng ký (TC011–TC020)");

test("TC011", "Đăng ký đầy đủ hợp lệ → success=true", () => {
    const r = validateRegister("newuser", "abc123", "abc123", "0912345678", "Hà Nội");
    assert(r.success === true);
});

test("TC012", "Mật khẩu không khớp → success=false", () => {
    const r = validateRegister("newuser", "abc123", "xyz999", "0912345678", "Hà Nội");
    assert(r.success === false);
    assert(/không khớp/i.test(r.message));
});

test("TC013", "Thiếu địa chỉ → success=false", () => {
    const r = validateRegister("newuser", "abc123", "abc123", "0912345678", "");
    assert(r.success === false);
});

test("TC014", "SĐT chứa chữ cái → success=false", () => {
    const r = validateRegister("newuser", "abc123", "abc123", "09abc678", "Hà Nội");
    assert(r.success === false);
});

test("TC015", "Thiếu username → success=false", () => {
    const r = validateRegister("", "abc123", "abc123", "0912345678", "Hà Nội");
    assert(r.success === false);
});

test("TC016", "Thiếu password → success=false", () => {
    const r = validateRegister("newuser", "", "", "0912345678", "Hà Nội");
    assert(r.success === false);
});

test("TC017", "SĐT quá ngắn (< 9 số) → success=false", () => {
    const r = validateRegister("newuser", "abc123", "abc123", "09123", "Hà Nội");
    assert(r.success === false);
});

test("TC018", "SĐT 10 số hợp lệ → success=true", () => {
    const r = validateRegister("user99", "pass99", "pass99", "0987654321", "TP HCM");
    assert(r.success === true);
});

test("TC019", "SĐT 11 số hợp lệ → success=true", () => {
    const r = validateRegister("user88", "pass88", "pass88", "01234567890", "Đà Nẵng");
    assert(r.success === true);
});

test("TC020", "Thiếu số điện thoại → success=false", () => {
    const r = validateRegister("newuser", "abc123", "abc123", "", "Hà Nội");
    assert(r.success === false);
});

// ============================================================
// NHÓM 3: addToCart — Thêm vào giỏ hàng (9 test)
// ============================================================
console.log("\n📋 NHÓM 3: addToCart — Thêm giỏ hàng (TC021–TC029)");

test("TC021", "Thêm SP khi đã đăng nhập → giỏ tăng 1", () => {
    const r = addToCart([], "Áo Hoodie", 300000, true);
    assert(r.success === true);
    assert(r.cart.length === 1);
});

test("TC022", "Thêm SP chưa đăng nhập → success=false, giỏ không tăng", () => {
    const r = addToCart([], "Áo Hoodie", 300000, false);
    assert(r.success === false);
    assert(r.cart.length === 0);
});

test("TC023", "Thêm SP tên rỗng → success=false", () => {
    const r = addToCart([], "", 300000, true);
    assert(r.success === false);
});

test("TC024", "Thêm SP giá = 0 → success=false", () => {
    const r = addToCart([], "Áo", 0, true);
    assert(r.success === false);
});

test("TC025", "Thêm SP giá âm → success=false", () => {
    const r = addToCart([], "Áo", -100, true);
    assert(r.success === false);
});

test("TC026", "Thêm nhiều SP cùng loại → giỏ tăng theo số lần thêm", () => {
    let cart = [];
    let r = addToCart(cart, "Áo", 100000, true);
    r = addToCart(r.cart, "Áo", 100000, true);
    assert(r.cart.length === 2);
});

test("TC027", "SP thêm vào giỏ đúng tên", () => {
    const r = addToCart([], "Áo Polo Nam", 149000, true);
    assert(r.cart[0].name === "Áo Polo Nam");
});

test("TC028", "SP thêm vào giỏ đúng giá", () => {
    const r = addToCart([], "Váy Mùa Hè", 270000, true);
    assert(r.cart[0].price === 270000);
});

test("TC029", "Thêm 5 SP khác nhau → giỏ có 5 phần tử", () => {
    let cart = [];
    const items = [
        ["Áo", 100000], ["Quần", 200000], ["Váy", 300000],
        ["Mũ", 50000], ["Tất", 20000]
    ];
    items.forEach(([name, price]) => {
        const r = addToCart(cart, name, price, true);
        cart = r.cart;
    });
    assert(cart.length === 5);
});

// ============================================================
// NHÓM 4: removeFromCart — Xóa khỏi giỏ (7 test)
// ============================================================
console.log("\n📋 NHÓM 4: removeFromCart — Xóa giỏ hàng (TC030–TC036)");

test("TC030", "Xóa index=0 → giỏ giảm 1", () => {
    const cart = [{ name: "Áo", price: 100000 }, { name: "Quần", price: 200000 }];
    const r = removeFromCart(cart, 0);
    assert(r.success === true);
    assert(r.cart.length === 1);
});

test("TC031", "Xóa index cuối → đúng phần tử bị xóa", () => {
    const cart = [{ name: "Áo", price: 100000 }, { name: "Quần", price: 200000 }];
    const r = removeFromCart(cart, 1);
    assert(r.cart[0].name === "Áo");
});

test("TC032", "Xóa index âm → success=false", () => {
    const r = removeFromCart([{ name: "Áo", price: 100000 }], -1);
    assert(r.success === false);
});

test("TC033", "Xóa index vượt quá độ dài → success=false", () => {
    const r = removeFromCart([{ name: "Áo", price: 100000 }], 5);
    assert(r.success === false);
});

test("TC034", "Xóa từ giỏ rỗng → success=false", () => {
    const r = removeFromCart([], 0);
    assert(r.success === false);
});

test("TC035", "Xóa hết từng cái → giỏ rỗng", () => {
    let cart = [{ name: "Áo", price: 100000 }, { name: "Quần", price: 200000 }];
    let r = removeFromCart(cart, 0);
    r = removeFromCart(r.cart, 0);
    assert(r.cart.length === 0);
});

test("TC036", "Xóa đúng phần tử giữa", () => {
    const cart = [
        { name: "A", price: 1 },
        { name: "B", price: 2 },
        { name: "C", price: 3 }
    ];
    const r = removeFromCart(cart, 1);
    assert(r.cart[0].name === "A");
    assert(r.cart[1].name === "C");
});

// ============================================================
// NHÓM 5: calcTotal — Tính tổng tiền (8 test)
// ============================================================
console.log("\n📋 NHÓM 5: calcTotal — Tính tổng tiền (TC037–TC044)");

test("TC037", "Giỏ rỗng → tổng = 0", () => {
    assert(calcTotal([]) === 0);
});

test("TC038", "1 sản phẩm → tổng = giá SP đó", () => {
    assert(calcTotal([{ price: 300000 }]) === 300000);
});

test("TC039", "3 sản phẩm → tổng chính xác", () => {
    const cart = [{ price: 300000 }, { price: 200000 }, { price: 59000 }];
    assert(calcTotal(cart) === 559000);
});

test("TC040", "Nhiều SP giá thấp → tổng đúng", () => {
    const cart = [{ price: 20000 }, { price: 20000 }, { price: 20000 }];
    assert(calcTotal(cart) === 60000);
});

test("TC041", "SP giá chuỗi số → vẫn tính đúng", () => {
    const cart = [{ price: "100000" }, { price: "200000" }];
    assert(calcTotal(cart) === 300000);
});

test("TC042", "10 SP → tổng đúng", () => {
    const cart = Array(10).fill({ price: 100000 });
    assert(calcTotal(cart) === 1000000);
});

test("TC043", "SP giá cao → tổng đúng", () => {
    const cart = [{ price: 1250000 }, { price: 520000 }];
    assert(calcTotal(cart) === 1770000);
});

test("TC044", "Giỏ 1 phần tử giá 0 → tổng = 0", () => {
    assert(calcTotal([{ price: 0 }]) === 0);
});

// ============================================================
// NHÓM 6: buyNow — Mua ngay (6 test)
// ============================================================
console.log("\n📋 NHÓM 6: buyNow — Mua ngay (TC045–TC050)");

test("TC045", "Mua ngay khi đã đăng nhập → success=true", () => {
    const r = buyNow("Áo Hoodie", 300000, true);
    assert(r.success === true);
});

test("TC046", "Mua ngay chưa đăng nhập → success=false", () => {
    const r = buyNow("Áo Hoodie", 300000, false);
    assert(r.success === false);
});

test("TC047", "Mua ngay → total đúng bằng giá SP", () => {
    const r = buyNow("Áo Hoodie", 300000, true);
    assert(r.total === 300000);
});

test("TC048", "Mua ngay → cart có đúng 1 phần tử", () => {
    const r = buyNow("Áo Polo", 149000, true);
    assert(r.cart.length === 1);
});

test("TC049", "Mua ngay SP giá âm → success=false", () => {
    const r = buyNow("Áo", -100, true);
    assert(r.success === false);
});

test("TC050", "Mua ngay tên SP rỗng → success=false", () => {
    const r = buyNow("", 100000, true);
    assert(r.success === false);
});

// ============================================================
// NHÓM 7: checkout — Thanh toán (5 test)
// ============================================================
console.log("\n📋 NHÓM 7: checkout — Thanh toán (TC051–TC055)");

test("TC051", "Giỏ có hàng, tổng > 0 → success=true", () => {
    const r = checkout([{ name: "Áo", price: 100000 }], 100000);
    assert(r.success === true);
});

test("TC052", "Giỏ rỗng → success=false", () => {
    const r = checkout([], 0);
    assert(r.success === false);
});

test("TC053", "Tổng = 0 dù có hàng → success=false", () => {
    const r = checkout([{ name: "Áo", price: 0 }], 0);
    assert(r.success === false);
});

test("TC054", "Giỏ null → success=false", () => {
    const r = checkout(null, 100000);
    assert(r.success === false);
});

test("TC055", "Nhiều SP, tổng lớn → success=true", () => {
    const cart = [{ name: "Vest", price: 1250000 }, { name: "Đầm", price: 520000 }];
    const r = checkout(cart, 1770000);
    assert(r.success === true);
});

// ============================================================
// NHÓM 8: validateOrderInfo — Thông tin đặt hàng (8 test)
// ============================================================
console.log("\n📋 NHÓM 8: validateOrderInfo — Thông tin đặt hàng (TC056–TC063)");

test("TC056", "Đầy đủ thông tin, SĐT hợp lệ → success=true", () => {
    const r = validateOrderInfo("Nguyễn Văn A", "0912345678", "Hà Nội");
    assert(r.success === true);
});

test("TC057", "SĐT chứa chữ → success=false", () => {
    const r = validateOrderInfo("Nguyễn Văn A", "091abc678", "Hà Nội");
    assert(r.success === false);
});

test("TC058", "Thiếu tên → success=false", () => {
    const r = validateOrderInfo("", "0912345678", "Hà Nội");
    assert(r.success === false);
});

test("TC059", "Thiếu địa chỉ → success=false", () => {
    const r = validateOrderInfo("Nguyễn Văn A", "0912345678", "");
    assert(r.success === false);
});

test("TC060", "SĐT 9 số → success=true", () => {
    const r = validateOrderInfo("Trần B", "091234567", "Đà Nẵng");
    assert(r.success === true);
});

test("TC061", "SĐT 11 số → success=true", () => {
    const r = validateOrderInfo("Lê C", "01234567890", "TP HCM");
    assert(r.success === true);
});

test("TC062", "SĐT 8 số (quá ngắn) → success=false", () => {
    const r = validateOrderInfo("Lê D", "09123456", "Cần Thơ");
    assert(r.success === false);
});

test("TC063", "Thiếu SĐT → success=false", () => {
    const r = validateOrderInfo("Nguyễn E", "", "Hà Nội");
    assert(r.success === false);
});

// ============================================================
// NHÓM 9: generateOrderId — Mã đơn hàng (5 test)
// ============================================================
console.log("\n📋 NHÓM 9: generateOrderId — Mã đơn hàng (TC064–TC068)");

test("TC064", "Mã bắt đầu bằng TN hoặc CNC", () => {
    const id = generateOrderId();
    assert(/^(TN|CNC)/.test(id), `id: ${id}`);
});

test("TC065", "Mã chỉ gồm chữ và số", () => {
    const id = generateOrderId();
    assert(/^[A-Z0-9]+$/.test(id), `id: ${id}`);
});

test("TC066", "Mã có độ dài hợp lệ (> 10 ký tự)", () => {
    const id = generateOrderId();
    assert(id.length > 10, `length: ${id.length}`);
});

test("TC067", "Hai mã liên tiếp không trùng nhau", () => {
    const id1 = generateOrderId();
    const id2 = generateOrderId();
    assert(id1 !== id2, `id1=${id1}, id2=${id2}`);
});

test("TC068", "Phần số cuối đủ 4 chữ số ngẫu nhiên (1000–9999)", () => {
    const id = generateOrderId();
    const num = parseInt(id.slice(-4));
    assert(num >= 1000 && num <= 9999, `num: ${num}`);
});

// ============================================================
// NHÓM 10: validatePaymentMethod — Phương thức thanh toán (5 test)
// ============================================================
console.log("\n📋 NHÓM 10: validatePaymentMethod — Thanh toán (TC069–TC073)");

test("TC069", "Phương thức BANK → success=true", () => {
    const r = validatePaymentMethod("BANK");
    assert(r.success === true);
});

test("TC070", "Phương thức COD → success=true", () => {
    const r = validatePaymentMethod("COD");
    assert(r.success === true);
});

test("TC071", "Phương thức không hợp lệ → success=false", () => {
    const r = validatePaymentMethod("PAYPAL");
    assert(r.success === false);
});

test("TC072", "Phương thức rỗng → success=false", () => {
    const r = validatePaymentMethod("");
    assert(r.success === false);
});

test("TC073", "Phương thức null → success=false", () => {
    const r = validatePaymentMethod(null);
    assert(r.success === false);
});

// ============================================================
// NHÓM 11: validateProduct — Sản phẩm (8 test)
// ============================================================
console.log("\n📋 NHÓM 11: validateProduct — Sản phẩm (TC074–TC081)");

test("TC074", "SP đầy đủ, giá hợp lệ → success=true", () => {
    const r = validateProduct("Áo Hoodie", 300000, "https://img.com/ao.jpg");
    assert(r.success === true);
});

test("TC075", "Giá = 0 → success=false", () => {
    const r = validateProduct("Áo Hoodie", 0, "https://img.com/ao.jpg");
    assert(r.success === false);
    assert(/Giá/i.test(r.message));
});

test("TC076", "Tên rỗng → success=false", () => {
    const r = validateProduct("", 300000, "https://img.com/ao.jpg");
    assert(r.success === false);
});

test("TC077", "Link ảnh rỗng → success=false", () => {
    const r = validateProduct("Áo", 300000, "");
    assert(r.success === false);
});

test("TC078", "Giá âm → success=false", () => {
    const r = validateProduct("Áo", -1000, "https://img.com/ao.jpg");
    assert(r.success === false);
});

test("TC079", "Giá dạng chuỗi số hợp lệ → success=true", () => {
    const r = validateProduct("Áo", "300000", "https://img.com/ao.jpg");
    assert(r.success === true);
});

test("TC080", "Giá là chữ → success=false", () => {
    const r = validateProduct("Áo", "abc", "https://img.com/ao.jpg");
    assert(r.success === false);
});

test("TC081", "Tất cả rỗng → success=false", () => {
    const r = validateProduct("", "", "");
    assert(r.success === false);
});

// ============================================================
// NHÓM 12: formatPrice — Định dạng giá (4 test)
// ============================================================
console.log("\n📋 NHÓM 12: formatPrice — Định dạng giá (TC082–TC085)");

test("TC082", "300000 → chứa '300' và 'đ'", () => {
    const r = formatPrice(300000);
    assert(r.includes("300") && r.includes("đ"));
});

test("TC083", "0 → chứa '0đ'", () => {
    const r = formatPrice(0);
    assert(r.includes("0") && r.includes("đ"));
});

test("TC084", "1250000 → chứa '1' và '250' và 'đ'", () => {
    const r = formatPrice(1250000);
    assert(r.includes("1") && r.includes("250") && r.includes("đ"));
});

test("TC085", "Kết quả là string", () => {
    assert(typeof formatPrice(100000) === "string");
});

// ============================================================
// NHÓM 13: searchProducts — Tìm kiếm (5 test)
// ============================================================
console.log("\n📋 NHÓM 13: searchProducts — Tìm kiếm sản phẩm (TC086–TC090)");

const sampleProducts = [
    { name: "Áo Hoodie Mùa Đông", price: 300000 },
    { name: "Áo Khoác Len", price: 320000 },
    { name: "Váy Mùa Hè", price: 270000 },
    { name: "Quần Jeans Form Rộng", price: 299000 },
    { name: "Áo Thun Basic", price: 190000 },
];

test("TC086", "Tìm 'áo' → tìm thấy các SP có 'áo'", () => {
    const r = searchProducts(sampleProducts, "áo");
    assert(r.success === true);
    assert(r.results.length >= 3);
});

test("TC087", "Tìm 'váy' → tìm thấy đúng SP", () => {
    const r = searchProducts(sampleProducts, "váy");
    assert(r.results.length === 1);
    assert(r.results[0].name === "Váy Mùa Hè");
});

test("TC088", "Tìm từ không tồn tại → results rỗng", () => {
    const r = searchProducts(sampleProducts, "giày");
    assert(r.results.length === 0);
});

test("TC089", "Từ khóa rỗng → success=false", () => {
    const r = searchProducts(sampleProducts, "");
    assert(r.success === false);
});

test("TC090", "Tìm không phân biệt hoa thường → tìm được", () => {
    const r = searchProducts(sampleProducts, "ÁO");
    assert(r.results.length >= 1);
});

// ============================================================
// NHÓM 14: filterByPrice — Lọc theo giá (4 test)
// ============================================================
console.log("\n📋 NHÓM 14: filterByPrice — Lọc theo giá (TC091–TC094)");

test("TC091", "Lọc 200000–350000 → đúng SP trong khoảng", () => {
    const r = filterByPrice(sampleProducts, 200000, 350000);
    assert(r.success === true);
    r.results.forEach(p => {
        assert(p.price >= 200000 && p.price <= 350000, `${p.name}: ${p.price}`);
    });
});

test("TC092", "Min > Max → success=false", () => {
    const r = filterByPrice(sampleProducts, 500000, 100000);
    assert(r.success === false);
});

test("TC093", "Giá âm → success=false", () => {
    const r = filterByPrice(sampleProducts, -1, 300000);
    assert(r.success === false);
});

test("TC094", "Lọc khoảng không có SP nào → results rỗng", () => {
    const r = filterByPrice(sampleProducts, 1000000, 2000000);
    assert(r.results.length === 0);
});

// ============================================================
// NHÓM 15: hide/delete/clearCart (6 test)
// ============================================================
console.log("\n📋 NHÓM 15: hide/delete/clearCart (TC095–TC100)");

test("TC095", "Ẩn SP đúng index → SP bị đánh dấu hidden", () => {
    const products = [{ name: "Áo", price: 100000 }, { name: "Quần", price: 200000 }];
    const r = hideProduct(products, 0);
    assert(r.success === true);
    assert(r.products[0].hidden === true);
    assert(r.products[1].hidden !== true);
});

test("TC096", "Ẩn SP index âm → success=false", () => {
    const r = hideProduct([{ name: "Áo", price: 100000 }], -1);
    assert(r.success === false);
});

test("TC097", "Xóa SP đúng index → danh sách giảm 1", () => {
    const products = [{ name: "Áo", price: 100000 }, { name: "Quần", price: 200000 }];
    const r = deleteProduct(products, 0);
    assert(r.success === true);
    assert(r.products.length === 1);
    assert(r.products[0].name === "Quần");
});

test("TC098", "Xóa SP index vượt quá → success=false", () => {
    const r = deleteProduct([{ name: "Áo", price: 100000 }], 99);
    assert(r.success === false);
});

test("TC099", "clearCart → giỏ rỗng, tổng = 0", () => {
    const r = clearCart();
    assert(r.success === true);
    assert(r.cart.length === 0);
    assert(r.total === 0);
});

test("TC100", "updateCartQuantity hợp lệ → cập nhật đúng", () => {
    const { updateCartQuantity } = require("./src/shop");
    const cart = [{ name: "Áo", price: 100000, quantity: 1 }];
    const r = updateCartQuantity(cart, 0, 3);
    assert(r.success === true);
    assert(r.cart[0].quantity === 3);
});

// ============================================================
// BÁO CÁO
// ============================================================
const total = passed + failed;
console.log("\n" + "=".repeat(65));
console.log("📊 KẾT QUẢ 100 UNIT TEST - FASHION SHOP");
console.log("=".repeat(65));
console.log(`  Tổng số test : ${total}`);
console.log(`  ✅ Passed    : ${passed}`);
console.log(`  ❌ Failed    : ${failed}`);
console.log(`  Tỉ lệ        : ${Math.round(passed / total * 100)}%`);
console.log("=".repeat(65));

console.log("\n📄 BẢNG CHI TIẾT:\n");
console.log(" Mã TC  | Tên Test Case                                              | Kết quả");
console.log("--------|------------------------------------------------------------|---------");
results.forEach(r => {
    const code = r.code.padEnd(6);
    const name = r.name.substring(0, 58).padEnd(58);
    console.log(` ${code} | ${name} | ${r.status === "PASS" ? "✅ PASS" : "❌ FAIL"}`);
});
console.log("");

process.exit(failed > 0 ? 1 : 0);
