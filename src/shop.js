// ========== FASHION SHOP - CORE LOGIC ==========

const ADMIN_USER = "anhzaiso1";
const ADMIN_PASS = "1234567@";

// ===== AUTH =====

function validateLogin(user, pass, savedUser, savedPass) {
    if (!user || !pass) return { success: false, message: "Thiếu thông tin" };
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
        return { success: true, role: "admin", message: "Đăng nhập Admin thành công!" };
    }
    if (user === savedUser && pass === savedPass) {
        return { success: true, role: "user", message: "Đăng nhập thành công!" };
    }
    return { success: false, message: "Sai tài khoản hoặc mật khẩu!" };
}

function validateRegister(user, pass, pass2, phone, address) {
    if (!user || !pass || !pass2 || !phone || !address) {
        return { success: false, message: "Nhập đầy đủ thông tin!" };
    }
    if (pass !== pass2) {
        return { success: false, message: "Mật khẩu không khớp!" };
    }
    if (phone.length < 9 || !/^\d+$/.test(phone)) {
        return { success: false, message: "Số điện thoại không hợp lệ!" };
    }
    return { success: true, message: "Đăng ký thành công!" };
}

// ===== CART =====

function addToCart(cart, name, price, isLoggedIn) {
    if (!isLoggedIn) return { success: false, cart, message: "Vui lòng đăng nhập trước!" };
    if (!name || price <= 0) return { success: false, cart, message: "Sản phẩm không hợp lệ!" };
    const newCart = [...cart, { name, price }];
    return { success: true, cart: newCart, message: "Đã thêm vào giỏ hàng!" };
}

function removeFromCart(cart, index) {
    if (index < 0 || index >= cart.length) return { success: false, cart, message: "Index không hợp lệ!" };
    const newCart = cart.filter((_, i) => i !== index);
    return { success: true, cart: newCart };
}

function calcTotal(cart) {
    return cart.reduce((sum, item) => sum + Number(item.price), 0);
}

function buyNow(name, price, isLoggedIn) {
    if (!isLoggedIn) return { success: false, message: "Vui lòng đăng nhập trước!" };
    if (!name || price <= 0) return { success: false, message: "Sản phẩm không hợp lệ!" };
    return {
        success: true,
        cart: [{ name, price, quantity: 1 }],
        total: price,
        message: "Mua ngay thành công!"
    };
}

function hideProduct(products, index) {
    if (index < 0 || index >= products.length) return { success: false, products, message: "Index không hợp lệ!" };
    const updated = products.map((p, i) => i === index ? { ...p, hidden: true } : p);
    return { success: true, products: updated };
}

function deleteProduct(products, index) {
    if (index < 0 || index >= products.length) return { success: false, products, message: "Index không hợp lệ!" };
    const updated = products.filter((_, i) => i !== index);
    return { success: true, products: updated };
}

// ===== ORDER =====

function generateOrderId() {
    const prefix = Math.random() < 0.5 ? "TN" : "CNC";
    const ts = Date.now().toString().slice(-8);
    const rand = Math.floor(1000 + Math.random() * 9000);
    return prefix + ts + rand;
}

function validateOrderInfo(name, phone, address) {
    if (!name || !phone || !address) {
        return { success: false, message: "Thiếu thông tin đặt hàng!" };
    }
    if (!/^\d{9,11}$/.test(phone)) {
        return { success: false, message: "Số điện thoại không hợp lệ!" };
    }
    return { success: true, message: "Hợp lệ" };
}

function createOrder(orderId, customerName, customerPhone, customerAddress, products, total, paymentMethod) {
    return {
        orderId,
        customerName,
        customerPhone,
        customerAddress,
        products,
        total,
        paymentMethod,
        createdAt: new Date().toLocaleString()
    };
}

function validatePaymentMethod(method) {
    const valid = ["BANK", "COD"];
    if (!method) return { success: false, message: "Chưa chọn phương thức thanh toán!" };
    if (!valid.includes(method)) return { success: false, message: "Phương thức không hợp lệ!" };
    return { success: true, message: "Hợp lệ" };
}

function checkout(cart, total) {
    if (!cart || cart.length === 0) return { success: false, message: "Giỏ hàng đang trống!" };
    if (total <= 0) return { success: false, message: "Tổng tiền không hợp lệ!" };
    return { success: true, message: "Sẵn sàng thanh toán!" };
}

// ===== PRODUCT =====

function validateProduct(name, price, image) {
    if (!name || !image) return { success: false, message: "Nhập đầy đủ thông tin!" };
    if (price === "" || price === null || price === undefined) return { success: false, message: "Nhập đầy đủ thông tin!" };
    if (isNaN(price) || Number(price) <= 0) return { success: false, message: "Giá không hợp lệ!" };
    return { success: true, message: "Sản phẩm hợp lệ" };
}

function formatPrice(price) {
    return Number(price).toLocaleString("vi-VN") + "đ";
}

function searchProducts(products, keyword) {
    if (!keyword || keyword.trim() === "") return { success: false, results: [], message: "Từ khóa trống!" };
    const kw = keyword.toLowerCase();
    const results = products.filter(p => p.name.toLowerCase().includes(kw));
    return { success: true, results, message: `Tìm thấy ${results.length} sản phẩm` };
}

function filterByPrice(products, min, max) {
    if (min < 0 || max < 0) return { success: false, results: [], message: "Giá không hợp lệ!" };
    if (min > max) return { success: false, results: [], message: "Giá tối thiểu không được lớn hơn tối đa!" };
    const results = products.filter(p => p.price >= min && p.price <= max);
    return { success: true, results };
}

function updateCartQuantity(cart, index, quantity) {
    if (index < 0 || index >= cart.length) return { success: false, cart, message: "Index không hợp lệ!" };
    if (quantity <= 0) return { success: false, cart, message: "Số lượng phải lớn hơn 0!" };
    const newCart = cart.map((item, i) => i === index ? { ...item, quantity } : item);
    return { success: true, cart: newCart };
}

function clearCart() {
    return { success: true, cart: [], total: 0 };
}

module.exports = {
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
};
