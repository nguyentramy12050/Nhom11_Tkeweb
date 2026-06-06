const CART_KEY = "cart";
const COUPON_KEY = "appliedCoupon";
const VOUCHER_KEY = "savedVoucher";
const SHIPPING_FEE = 35000;

// DANH SÁCH VOUCHER — có donToiThieu (đơn tối thiểu) và hetHan (hết hạn)
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

const THONG_TIN_VOUCHER = {
    HESANG20: {
        title: "Hè sang 20%",
        description: "Giảm 20% cho đơn hàng của bạn.",
        tag: "Giảm 20%"
    },
    HESANG50K: {
        title: "Giảm 50.000đ",
        description: "Ưu đãi hè sang cho đơn hàng đủ điều kiện.",
        tag: "Giảm 50K"
    },
    FREESHIP26: {
        title: "Miễn phí vận chuyển",
        description: "Tự áp dụng cho đơn hàng từ 199.000đ.",
        tag: "Freeship"
    },
    GIFT50K: {
        title: "Quà tặng 50.000đ",
        description: "Áp dụng cho đơn hàng từ 299.000đ.",
        tag: "Quà tặng"
    },
    THUHIEN20: {
        title: "Thư Hiên 20%",
        description: "Giảm 20% cho đơn hàng.",
        tag: "Giảm 20%"
    },
    KHAIQUYEN10: {
        title: "Khai quyển 10%",
        description: "Giảm 10% cho đơn hàng.",
        tag: "Giảm 10%"
    },
    NGOCQUY20: {
        title: "Ngọc quý 20.000đ",
        description: "Giảm trực tiếp 20.000đ.",
        tag: "Giảm 20K"
    },
    CHUVANAN15: {
        title: "Chu Văn An 15%",
        description: "Giảm 15% cho đơn hàng.",
        tag: "Giảm 15%"
    },
    NGUYENKHI25: {
        title: "Nguyên khí 25.000đ",
        description: "Giảm trực tiếp 25.000đ.",
        tag: "Giảm 25K"
    },
    TINHHOA50: {
        title: "Tinh hoa 50.000đ",
        description: "Giảm trực tiếp 50.000đ.",
        tag: "Giảm 50K"
    },
    TRIKY: {
        title: "Tri kỷ 10%",
        description: "Giảm 10% cho đơn hàng.",
        tag: "Giảm 10%"
    }
};

const AUTO_SHIPPING_CODE = "FREESHIP26";
const HIDDEN_CART_VOUCHERS = [
    "KHAIQUYEN10",
    "NGOCQUY20",
    "CHUVANAN15",
    "NGUYENKHI25",
    "TINHHOA50"
];

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

function isVoucherExpired(voucher) {
    return Boolean(voucher?.hetHan && new Date() > voucher.hetHan);
}

function isVoucherUsable(code, subtotal) {
    const voucher = DANH_SACH_VOUCHER[code];
    if (!voucher || isVoucherExpired(voucher)) return false;

    return !voucher.donToiThieu || subtotal >= voucher.donToiThieu;
}

function getVoucherUnavailableReason(code, subtotal) {
    const voucher = DANH_SACH_VOUCHER[code];
    if (!voucher) return "Mã không tồn tại.";
    if (isVoucherExpired(voucher)) return "Mã đã hết hạn.";
    if (voucher.donToiThieu && subtotal < voucher.donToiThieu) {
        return `Cần đơn từ ${formatVND(voucher.donToiThieu)}.`;
    }

    return "";
}

function getVoucherDiscount(code, subtotal) {
    const voucher = DANH_SACH_VOUCHER[code];
    if (!voucher || voucher.loai === "shipping" || !isVoucherUsable(code, subtotal)) return 0;

    if (voucher.loai === "percent") {
        return Math.round(subtotal * voucher.giaTri / 100);
    }

    if (voucher.loai === "fixed") {
        return voucher.giaTri;
    }

    return 0;
}

/* xử lý dữ liệu giỏ hàng */

function getBookImagePath(imageName) {
    return `assets/images/books/${imageName}`;
}

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

/* tăng giảm số lượng */

function increaseQuantity(bookId) {
    const cart = getCartFromStorage();
    const item = cart.find(cartItem => Number(cartItem.id) === Number(bookId));

    if (item) {
        item.quantity += 1;
    }

    saveCartToStorage(cart);
    renderCartPage();
}

function decreaseQuantity(bookId) {
    let cart = getCartFromStorage();
    const item = cart.find(cartItem => Number(cartItem.id) === Number(bookId));

    if (item) {
        item.quantity -= 1;
    }

    cart = cart.filter(cartItem => cartItem.quantity > 0);

    saveCartToStorage(cart);
    renderCartPage();
}

function removeCartItem(bookId) {
    const cart = getCartFromStorage()
        .filter(item => Number(item.id) !== Number(bookId));

    saveCartToStorage(cart);
    renderCartPage();
}

function clearCart() {
    const confirmClear = confirm("Bạn có chắc muốn xóa toàn bộ giỏ hàng không?");
    if (!confirmClear) return;

    saveCartToStorage([]);
    removeAppliedCoupon();
    renderCartPage();
}

/* mã giảm giá */

function getAppliedCoupon() {
    return localStorage.getItem(COUPON_KEY) || "";
}

function setAppliedCoupon(code) {
    localStorage.setItem(COUPON_KEY, code);
}

function removeAppliedCoupon() {
    localStorage.removeItem(COUPON_KEY);
}

function applyCoupon() {
    const input = document.getElementById("coupon-input");
    const message = document.getElementById("coupon-message");
    if (!input || !message) return;

    const code = input.value.trim().toUpperCase();
    const items = getCartItemsDetail();
    const voucher = DANH_SACH_VOUCHER[code];

    // Tính tạm tính để kiểm tra điều kiện
    const subtotal = items.reduce((sum, item) => sum + parsePrice(item.price) * item.quantity, 0);

    if (!code) {
        removeAppliedCoupon();
        message.textContent = "Vui lòng nhập mã giảm giá.";
        message.classList.add("error");
        message.style.display = "block";
        renderCartPage();
        return;
    }

    if (!voucher) {
        removeAppliedCoupon();
        message.textContent = "Mã giảm giá không hợp lệ hoặc đã hết hạn.";
        message.classList.add("error");
        message.style.display = "block";
        renderCartPage();
        return;
    }

    if (voucher.loai === "shipping") {
        removeAppliedCoupon();
        message.textContent = isVoucherUsable(code, subtotal)
            ? "Mã miễn phí vận chuyển đã được tự động áp dụng."
            : getVoucherUnavailableReason(code, subtotal);
        message.classList.toggle("error", !isVoucherUsable(code, subtotal));
        message.style.display = "block";
        renderCartPage();
        return;
    }

    // Kiểm tra đơn tối thiểu
    if (!isVoucherUsable(code, subtotal)) {
        removeAppliedCoupon();
        message.textContent = getVoucherUnavailableReason(code, subtotal);
        message.classList.add("error");
        message.style.display = "block";
        renderCartPage();
        return;
    }

    setAppliedCoupon(code);
    message.textContent = `Áp dụng thành công! Mã ${code} đã được kích hoạt.`;
    message.classList.remove("error");
    message.style.display = "block";
    renderCartPage();
}

/* tính tổng đơn hàng */

function calculateCartSummary(items) {
    const subtotal = items.reduce((sum, item) => {
        return sum + parsePrice(item.price) * item.quantity;
    }, 0);

    let appliedCoupon = subtotal > 0 ? getAppliedCoupon() : "";
    let discount = 0;
    let shipping = subtotal > 0 ? SHIPPING_FEE : 0;
    const hasFreeShipping = subtotal > 0 && isVoucherUsable(AUTO_SHIPPING_CODE, subtotal);

    if (hasFreeShipping) {
        shipping = 0;
    }

    if (appliedCoupon && DANH_SACH_VOUCHER[appliedCoupon]?.loai === "shipping") {
        appliedCoupon = "";
        removeAppliedCoupon();
    }

    if (appliedCoupon && !isVoucherUsable(appliedCoupon, subtotal)) {
        appliedCoupon = "";
        removeAppliedCoupon();
    }

    if (appliedCoupon) {
        discount = getVoucherDiscount(appliedCoupon, subtotal);
    }

    const total = Math.max(subtotal + shipping - discount, 0);

    return {
        subtotal,
        shipping,
        discount,
        total,
        appliedCoupon,
        hasFreeShipping
    };
}

function renderCouponOptions(subtotal, appliedCoupon) {
    const couponOptions = document.getElementById("coupon-options");
    if (!couponOptions) return;

    couponOptions.innerHTML = Object.keys(DANH_SACH_VOUCHER)
        .filter(code => !HIDDEN_CART_VOUCHERS.includes(code))
        .map(code => {
        const voucher = DANH_SACH_VOUCHER[code];
        const info = THONG_TIN_VOUCHER[code] || {
            title: code,
            description: "Ưu đãi dành cho đơn hàng của bạn.",
            tag: code
        };
        const usable = isVoucherUsable(code, subtotal);
        const isShipping = voucher.loai === "shipping";
        const selected = appliedCoupon === code || (isShipping && code === AUTO_SHIPPING_CODE && usable);
        const reason = usable
            ? (isShipping ? "Tự động áp dụng" : "Có thể áp dụng")
            : getVoucherUnavailableReason(code, subtotal);

        return `
            <button
                type="button"
                class="coupon-option ${usable ? "is-available" : "is-disabled"} ${selected ? "is-selected" : ""}"
                data-coupon-code="${code}"
                ${usable && !isShipping ? "" : "disabled"}
                title="${reason}"
            >
                <span class="coupon-option-tag">${info.tag}</span>
                <span class="coupon-option-main">
                    <strong>${code}</strong>
                    <small>${info.title}</small>
                </span>
                <span class="coupon-option-note">${reason}</span>
            </button>
        `;
    }).join("");
}

/* hiển thị từng sản phẩm */

function getBookCondition(item) {
    if (item.condition) return item.condition;
    if (Number(item.rating) >= 4.9) return "Rất tốt";
    if (Number(item.rating) >= 4.7) return "Tốt";
    return "Khá";
}

function renderCartItem(item) {
    const price = parsePrice(item.price);
    const itemTotal = price * item.quantity;

    return `
        <article class="cart-item">
            <button class="remove-item" onclick="removeCartItem(${item.id})" title="Xóa sách">
                <i class="fas fa-trash-alt"></i>
            </button>

            <img
                src="${getBookImagePath(item.image)}"
                alt="${item.name}"
                class="cart-item-img"
                onclick="window.location.href='product-detail.html?id=${item.id}'"
                title="Xem chi tiết ${item.name}"
                style="cursor:pointer"
                onerror="this.src='assets/images/background.jpg'"
            >

            <div class="cart-item-info">
                <h2 class="cart-item-title">${item.name}</h2>
                <p class="cart-item-author">${item.author || ""}</p>

                <div class="cart-quantity">
                    <button class="qty-btn" onclick="decreaseQuantity(${item.id})">−</button>
                    <span class="qty-number">${item.quantity}</span>
                    <button class="qty-btn" onclick="increaseQuantity(${item.id})">+</button>
                </div>
            </div>

            <div class="cart-item-price-box">
                <div class="cart-item-price">${formatVND(itemTotal)}</div>
            </div>
        </article>
    `;
}

/* cập nhật giao diện */

function renderCartPage() {
    const cartEmpty = document.getElementById("cart-empty");
    const cartContent = document.getElementById("cart-content");
    const cartItemsBox = document.getElementById("cart-items");
    const clearCartBtn = document.getElementById("clear-cart");

    const summaryCount = document.getElementById("summary-count");
    const summarySubtotal = document.getElementById("summary-subtotal");
    const summaryShipping = document.getElementById("summary-shipping");
    const summaryDiscount = document.getElementById("summary-discount");
    const summaryTotal = document.getElementById("summary-total");
    const couponInput = document.getElementById("coupon-input");
    const couponMessage = document.getElementById("coupon-message");
    const discountRow = document.getElementById("discount-row");

    if (!cartEmpty || !cartContent || !cartItemsBox) {
        console.error("Không tìm thấy khung giỏ hàng trong cart.html.");
        return;
    }

    const items = getCartItemsDetail();
    updateHeaderCartBadge();

    if (items.length === 0) {
        cartEmpty.style.display = "block";
        cartContent.style.display = "none";
        if (clearCartBtn) clearCartBtn.style.display = "none";
        cartItemsBox.innerHTML = "";
        removeAppliedCoupon();
        return;
    }

    const summary = calculateCartSummary(items);
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

    cartEmpty.style.display = "none";
    cartContent.style.display = "grid";
    if (clearCartBtn) clearCartBtn.style.display = "inline-flex";

    cartItemsBox.innerHTML = items.map(renderCartItem).join("");

    summaryCount.textContent = totalQuantity;
    summarySubtotal.textContent = formatVND(summary.subtotal);
    summaryShipping.textContent = formatVND(summary.shipping);
    summaryDiscount.textContent = `-${formatVND(summary.discount)}`;
    summaryTotal.textContent = formatVND(summary.total);

    renderCouponOptions(summary.subtotal, summary.appliedCoupon);

    if (summary.appliedCoupon) {
        couponInput.value = summary.appliedCoupon;
        couponMessage.textContent = `Đã áp dụng mã ${summary.appliedCoupon}.`;
        couponMessage.classList.remove("error");
        couponMessage.style.display = "block";
        discountRow.style.display = "flex";
        // Hiển thị tên mã trong cột giảm giá
        const couponNameSpan = document.getElementById("summary-coupon-name");
        if (couponNameSpan) couponNameSpan.textContent = summary.appliedCoupon;
    } else {
        couponInput.value = "";
        couponMessage.textContent = summary.hasFreeShipping
            ? "Miễn phí vận chuyển đã được tự động áp dụng."
            : "";
        couponMessage.classList.remove("error");
        couponMessage.style.display = summary.hasFreeShipping ? "block" : "none";
        discountRow.style.display = "none";
    }
}

/* chuyển sang thanh toán */

function goToCheckout() {
    if (typeof window.yeuCauDangNhap === "function"
        && !window.yeuCauDangNhap("Vui lòng đăng nhập để thanh toán và đặt hàng.")) {
        return;
    }

    const items = getCartFromStorage();

    if (items.length === 0) {
        alert("Giỏ hàng đang trống.");
        return;
    }

    window.location.href = "checkout.html";
}

/* gắn sự kiện */

function initCartEvents() {
    const clearCartBtn = document.getElementById("clear-cart");
    const applyCouponBtn = document.getElementById("apply-coupon");
    const checkoutBtn = document.getElementById("checkout-btn");
    const couponInput = document.getElementById("coupon-input");

    if (clearCartBtn) {
        clearCartBtn.addEventListener("click", clearCart);
    }

    if (applyCouponBtn) {
        applyCouponBtn.addEventListener("click", applyCoupon);
    }

    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", goToCheckout);
    }

    if (couponInput) {
        couponInput.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                applyCoupon();
            }
        });
    }

    document.addEventListener("click", function (event) {
        const option = event.target.closest(".coupon-option.is-available:not([disabled])");
        if (!option) return;

        const code = option.dataset.couponCode;
        const couponInputEl = document.getElementById("coupon-input");
        if (couponInputEl) couponInputEl.value = code;
        applyCoupon();
    });
}

/* khởi chạy trang */

document.addEventListener("DOMContentLoaded", function () {
    if (typeof booksData === "undefined") {
        console.error("Không tìm thấy dữ liệu sách. Hãy kiểm tra lại file data.js.");
        return;
    }

    initCartEvents();
    renderCartPage();
});
