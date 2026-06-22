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

module.exports = {
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
};
