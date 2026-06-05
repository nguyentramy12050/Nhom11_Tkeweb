const CART_KEY = "cart";
const COUPON_KEY = "appliedCoupon";
const ORDER_KEY = "latestOrder";
const SHIPPING_FEE = 35000;
const USERS_KEY = "users";
const CURRENT_USER_KEY = "currentUser";

// DANH SÁCH VOUCHER — có donToiThieu và hetHan
const DANH_SACH_VOUCHER = {
    "HESANG20":   { loai: "percent",  giaTri: 20,  donToiThieu: 0,      hetHan: new Date("2026-06-30") },
    "HESANG50K":  { loai: "fixed",    giaTri: 50000, donToiThieu: 0,     hetHan: new Date("2026-06-30") },
    "FREESHIP26": { loai: "shipping", giaTri: 0,    donToiThieu: 199000, hetHan: new Date("2026-06-30") },
    "GIFT50K":    { loai: "fixed",    giaTri: 50000, donToiThieu: 299000, hetHan: new Date("2026-06-30") },
    "THUHIEN20":  { loai: "percent",  giaTri: 20,  donToiThieu: 0,      hetHan: null },
    "KHAIQUYEN10":{ loai: "percent",  giaTri: 10,  donToiThieu: 0,      hetHan: null },
    "NGOCQUY20":  { loai: "fixed",    giaTri: 20000, donToiThieu: 0,     hetHan: null },
    "CHUVANAN15": { loai: "percent",  giaTri: 15,  donToiThieu: 0,      hetHan: null },
    "NGUYENKHI25":{ loai: "fixed",    giaTri: 25000, donToiThieu: 0,     hetHan: null },
    "TINHHOA50":  { loai: "fixed",    giaTri: 50000, donToiThieu: 0,     hetHan: null },
    "TRIKY":      { loai: "percent",  giaTri: 10,  donToiThieu: 0,      hetHan: null },
};
/* xử lý giá tiền */

function parsePrice(priceText) {
    if (typeof priceText === "number") return priceText;
    if (!priceText) return 0;

    return Number(
        String(priceText)
            .replaceAll(".", "")
            .replaceAll(",", "")
            .replaceAll("đ", "")
            .replace(/\s/g, "")
    ) || 0;
}

function formatVND(number) {
    return Number(number || 0).toLocaleString("vi-VN") + "đ";
}

/* xử lý giỏ hàng */

function getCartFromStorage() {
    try {
        const raw = localStorage.getItem(CART_KEY);
        const cart = raw ? JSON.parse(raw) : [];

        if (!Array.isArray(cart)) return [];

        return cart
            .map(item => ({
                id: Number(item.id || item.bookId),
                quantity: Number(item.quantity || item.qty || 1)
            }))
            .filter(item => item.id && item.quantity > 0);
    } catch (error) {
        console.error("Lỗi đọc giỏ hàng:", error);
        return [];
    }
}

function saveCartToStorage(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function getBookImagePath(imageName) {
    return `assets/images/books/${imageName}`;
}

function getCartItemsDetail() {
    const cart = getCartFromStorage();

    return cart
        .map(cartItem => {
            const book = booksData.find(book => Number(book.id) === Number(cartItem.id));
            if (!book) return null;

            return {
                ...book,
                quantity: cartItem.quantity
            };
        })
        .filter(Boolean);
}

function updateHeaderCartBadge() {
    const badge = document.getElementById("so-gio-hang");
    if (!badge) return;

    const totalQuantity = getCartFromStorage()
        .reduce((sum, item) => sum + Number(item.quantity || 0), 0);

    badge.textContent = totalQuantity;

    if (totalQuantity <= 0) {
        badge.classList.add("an");
    } else {
        badge.classList.remove("an");
    }
}

/* mã giảm giá */

function getAppliedCoupon() {
    return localStorage.getItem(COUPON_KEY) || "";
}

function removeAppliedCoupon() {
    localStorage.removeItem(COUPON_KEY);
}

/* tính tổng đơn hàng */

function calculateOrderSummary(items) {
    // Tính tổng tiền hàng gốc
    const subtotal = items.reduce((sum, item) => {
        return sum + parsePrice(item.price) * item.quantity;
    }, 0);

    // Lấy mã đã áp dụng từ ô Nhập hoặc từ LocalStorage
    const appliedCoupon = subtotal > 0 ? getAppliedCoupon() : "";
    let discount = 0;
    let shipping = subtotal > 0 ? SHIPPING_FEE : 0;

    // Kiểm tra tính hợp lệ của mã nằm trong Từ Điển
    if (appliedCoupon && DANH_SACH_VOUCHER[appliedCoupon]) {
        const voucher = DANH_SACH_VOUCHER[appliedCoupon];

        if (voucher.loai === "percent") {
            // Giảm theo %
            discount = Math.round(subtotal * voucher.giaTri / 100);
        } else if (voucher.loai === "fixed") {
            // Giảm tiền mặt cố định
            discount = voucher.giaTri;
        } else if (voucher.loai === "shipping") {
            // Miễn phí vận chuyển
            shipping = 0;
        }
    }
    //  Tính toán tổng thanh toán cuối cùng và return kết quả
    const total = subtotal - discount + shipping;

    return {
        subtotal: subtotal,
        discount: discount,
        shipping: shipping,
        total: total > 0 ? total : 0
    };
}

/* hiển thị sản phẩm */

function renderCheckoutItem(item) {
    const itemTotal = parsePrice(item.price) * item.quantity;

    return `
        <article class="checkout-item">
            <img
                src="${getBookImagePath(item.image)}"
                alt="${item.name}"
                onerror="this.src='assets/images/background.jpg'"
            >

            <div>
                <h3 class="checkout-item-name">${item.name}</h3>
                <p class="checkout-item-meta">Số lượng: ${item.quantity}</p>
            </div>

            <strong class="checkout-item-price">${formatVND(itemTotal)}</strong>
        </article>
    `;
}

function renderCheckoutPage() {
    const emptyBox = document.getElementById("checkout-empty");
    const contentBox = document.getElementById("checkout-content");
    const successBox = document.getElementById("order-success");
    const itemsBox = document.getElementById("checkout-items");

    const subtotalEl = document.getElementById("checkout-subtotal");
    const shippingEl = document.getElementById("checkout-shipping");
    const discountEl = document.getElementById("checkout-discount");
    const totalEl = document.getElementById("checkout-total");
    const discountRow = document.getElementById("checkout-discount-row");

    if (!emptyBox || !contentBox || !successBox || !itemsBox) {
        console.error("Không tìm thấy khung checkout trong checkout.html.");
        return;
    }

    const items = getCartItemsDetail();
    updateHeaderCartBadge();

    if (items.length === 0) {
        emptyBox.style.display = "block";
        contentBox.style.display = "none";
        successBox.style.display = "none";
        removeAppliedCoupon();
        return;
    }

    const summary = calculateOrderSummary(items);

    emptyBox.style.display = "none";
    contentBox.style.display = "grid";
    successBox.style.display = "none";

    itemsBox.innerHTML = items.map(renderCheckoutItem).join("");

    subtotalEl.textContent = formatVND(summary.subtotal);
    shippingEl.textContent = formatVND(summary.shipping);
    discountEl.textContent = `-${formatVND(summary.discount)}`;
    totalEl.textContent = formatVND(summary.total);

    if (summary.discount > 0) {
        discountRow.style.display = "flex";
    } else {
        discountRow.style.display = "none";
    }
}

/* kiểm tra form */

function setFieldError(field, message) {
    const group = field.closest(".form-group");
    const errorEl = group ? group.querySelector(".form-error") : null;

    field.classList.add("error");

    if (errorEl) {
        errorEl.textContent = message;
    }
}

function clearFieldError(field) {
    const group = field.closest(".form-group");
    const errorEl = group ? group.querySelector(".form-error") : null;

    field.classList.remove("error");

    if (errorEl) {
        errorEl.textContent = "";
    }
}

function validateCheckoutForm() {
    const nameInput = document.getElementById("customer-name");
    const phoneInput = document.getElementById("customer-phone");
    const emailInput = document.getElementById("customer-email");
    const addressInput = document.getElementById("customer-address");

    let isValid = true;

    [nameInput, phoneInput, emailInput, addressInput].forEach(input => {
        if (input) clearFieldError(input);
    });

    if (!nameInput.value.trim()) {
        setFieldError(nameInput, "Vui lòng nhập họ và tên.");
        isValid = false;
    }

    const phoneValue = phoneInput.value.trim();
    const phoneRegex = /^(0|\+84)[0-9]{9,10}$/;

    if (!phoneValue) {
        setFieldError(phoneInput, "Vui lòng nhập số điện thoại.");
        isValid = false;
    } else if (!phoneRegex.test(phoneValue)) {
        setFieldError(phoneInput, "Số điện thoại chưa đúng định dạng.");
        isValid = false;
    }

    const emailValue = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailValue) {
        setFieldError(emailInput, "Vui lòng nhập email.");
        isValid = false;
    } else if (!emailRegex.test(emailValue)) {
        setFieldError(emailInput, "Email chưa đúng định dạng.");
        isValid = false;
    }

    if (!addressInput.value.trim()) {
        setFieldError(addressInput, "Vui lòng nhập địa chỉ nhận sách.");
        isValid = false;
    }

    return isValid;
}

/* đặt hàng */

function getSelectedPaymentMethod() {
    const selected = document.querySelector('input[name="payment-method"]:checked');
    return selected ? selected.value : "bank";
}

function createOrderCode() {
    const now = new Date();
    const datePart = now.toISOString().slice(0, 10).replaceAll("-", "");
    const randomPart = Math.floor(1000 + Math.random() * 9000);

    return `TH${datePart}${randomPart}`;
}

function saveOrderToHistory(order) {
    try {
        const rawOrders = localStorage.getItem("orders");
        const orders = rawOrders ? JSON.parse(rawOrders) : [];

        if (!Array.isArray(orders)) {
            localStorage.setItem("orders", JSON.stringify([order]));
            return;
        }

        orders.unshift(order);
        localStorage.setItem("orders", JSON.stringify(orders));
    } catch (error) {
        console.error("Lỗi lưu lịch sử đơn hàng:", error);
        localStorage.setItem("orders", JSON.stringify([order]));
    }
}

function placeOrder() {
    const items = getCartItemsDetail();

    if (items.length === 0) {
        alert("Giỏ hàng đang trống.");
        renderCheckoutPage();
        return;
    }

    if (!validateCheckoutForm()) {
        return;
    }

    const summary = calculateOrderSummary(items);

    const order = {
        code: createOrderCode(),
        createdAt: new Date().toISOString(),
        customer: {
            name: document.getElementById("customer-name").value.trim(),
            phone: document.getElementById("customer-phone").value.trim(),
            email: document.getElementById("customer-email").value.trim(),
            address: document.getElementById("customer-address").value.trim(),
            note: document.getElementById("customer-note").value.trim()
        },
        paymentMethod: getSelectedPaymentMethod(),
        items,
        summary
    };

        saveOrderToHistory(order);

        localStorage.setItem(ORDER_KEY, JSON.stringify(order));
        saveCartToStorage([]);
        removeAppliedCoupon();
        updateHeaderCartBadge();

        showSuccessOrder(order);
    }

function showSuccessOrder(order) {
    const emptyBox = document.getElementById("checkout-empty");
    const contentBox = document.getElementById("checkout-content");
    const successBox = document.getElementById("order-success");
    const successMessage = document.getElementById("success-message");

    emptyBox.style.display = "none";
    contentBox.style.display = "none";
    successBox.style.display = "block";

    successMessage.textContent =
        `Mã đơn hàng của bạn là ${order.code}. Thư Hiên sẽ liên hệ xác nhận đơn hàng trong thời gian sớm nhất.`;
}

/* gắn sự kiện */

function initCheckoutEvents() {
    const placeOrderBtn = document.getElementById("place-order-btn");
    const form = document.getElementById("checkout-form");

    if (placeOrderBtn) {
        placeOrderBtn.addEventListener("click", placeOrder);
    }

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            placeOrder();
        });
    }

    document.querySelectorAll(".form-group input, .form-group textarea").forEach(input => {
        input.addEventListener("input", function () {
            clearFieldError(input);
        });
    });
}

function readJsonStorage(key, fallbackValue) {
    try {
        const rawValue = sessionStorage.getItem(key) || localStorage.getItem(key);
        return rawValue ? JSON.parse(rawValue) : fallbackValue;
    } catch (error) {
        console.error(`Lỗi đọc dữ liệu ${key}:`, error);
        return fallbackValue;
    }
}

function normalizeCheckoutEmail(email) {
    return String(email || "").trim().toLowerCase();
}

function getRegisteredCheckoutUser() {
    const currentUser = readJsonStorage(CURRENT_USER_KEY, null);
    if (!currentUser) return null;

    const users = readJsonStorage(USERS_KEY, []);
    if (!Array.isArray(users)) return currentUser;

    const registeredUser = users.find(user => {
        return String(user.id || "") === String(currentUser.id || "")
            || normalizeCheckoutEmail(user.email) === normalizeCheckoutEmail(currentUser.email);
    });

    return registeredUser
        ? { ...currentUser, ...registeredUser }
        : currentUser;
}

function getFirstFilledValue(source, keys) {
    for (const key of keys) {
        const value = source ? source[key] : "";
        if (value) return String(value).trim();
    }

    return "";
}

function fillCheckoutUserInfo() {
    const currentUser = getRegisteredCheckoutUser();

    if (!currentUser) return;

    const nameInput = document.getElementById("customer-name");
    const phoneInput = document.getElementById("customer-phone");
    const emailInput = document.getElementById("customer-email");

    const customerName = getFirstFilledValue(currentUser, ["name", "fullName", "fullname", "hoTen"]);
    const customerPhone = getFirstFilledValue(currentUser, ["phone", "phoneNumber", "sdt", "soDienThoai"]);
    const customerEmail = getFirstFilledValue(currentUser, ["email", "gmail"]);

    if (nameInput && customerName) {
        nameInput.value = customerName;
        clearFieldError(nameInput);
    }

    if (phoneInput && customerPhone) {
        phoneInput.value = customerPhone;
        clearFieldError(phoneInput);
    }

    if (emailInput && customerEmail) {
        emailInput.value = customerEmail;
        clearFieldError(emailInput);
    }
}

/* khởi chạy trang */

document.addEventListener("DOMContentLoaded", function () {
    if (typeof booksData === "undefined") {
        console.error("Không tìm thấy dữ liệu sách. Hãy kiểm tra lại file data.js.");
        return;
    }

    initCheckoutEvents();
    renderCheckoutPage();
    fillCheckoutUserInfo();
    // Tự động kiểm tra và điền mã đã nhận từ trang sự kiện/khuyến mại vào ô nhập liệu
    const maDaLuu = localStorage.getItem("appliedCoupon");
    const oNhapCoupon = document.getElementById("coupon-input") || document.querySelector(".checkout-promo input"); 
    // Cậu kiểm tra xem id hoặc class của ô nhập mã bên checkout.html là gì để map cho đúng nhé

    if (maDaLuu && oNhapCoupon) {
        oNhapCoupon.value = maDaLuu; // Tự động điền chữ HESANG20 vào ô
    }
});
