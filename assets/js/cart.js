const CART_KEY = "cart";
const COUPON_KEY = "appliedCoupon";
const SHIPPING_FEE = 35000;

// DANH SÁCH VOUCHER (giống hệt checkout.js)
const DANH_SACH_VOUCHER = {
    "HESANG20": { loai: "percent", giaTri: 20 },
    "HESANG50K": { loai: "fixed", giaTri: 50000 },
    "THUHIEN20": { loai: "percent", giaTri: 20 },
    "FREESHIP26": { loai: "shipping", giaTri: 0 },
    "GIFT50K": { loai: "fixed", giaTri: 50000 },
    "KHAIQUYEN10": { loai: "percent", giaTri: 10 },
    "NGOCQUY20": { loai: "fixed", giaTri: 20000 },
    "CHUVANAN15": { loai: "percent", giaTri: 15 },
    "NGUYENKHI25": { loai: "fixed", giaTri: 25000 },
    "TINHHOA50": { loai: "fixed", giaTri: 50000 },
    "TRIKY": { loai: "percent", giaTri: 10 }
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

    if (items.length === 0) {
        removeAppliedCoupon();
        message.textContent = "Giỏ hàng đang trống.";
        message.classList.add("error");
        message.style.display = "block";
        return;
    }

    if (!code) {
        message.textContent = "Vui lòng nhập mã giảm giá.";
        message.classList.add("error");
        message.style.display = "block";
        return;
    }

    const voucher = DANH_SACH_VOUCHER[code];
    if (!voucher) {
        removeAppliedCoupon();
        message.textContent = "Mã giảm giá không hợp lệ hoặc đã hết hạn.";
        message.classList.add("error");
        message.style.display = "block";
        renderCartPage(); // cập nhật lại giao diện (xóa mã cũ nếu có)
        return;
    }

    // Nếu mã hợp lệ, lưu vào localStorage
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

    const appliedCoupon = subtotal > 0 ? getAppliedCoupon() : "";
    let discount = 0;
    let shipping = subtotal > 0 ? SHIPPING_FEE : 0;

    if (appliedCoupon && DANH_SACH_VOUCHER[appliedCoupon]) {
        const voucher = DANH_SACH_VOUCHER[appliedCoupon];
        if (voucher.loai === "percent") {
            discount = Math.round(subtotal * voucher.giaTri / 100);
        } else if (voucher.loai === "fixed") {
            discount = voucher.giaTri;
        } else if (voucher.loai === "shipping") {
            shipping = 0;
        }
    }

    const total = Math.max(subtotal + shipping - discount, 0);

    return {
        subtotal,
        shipping,
        discount,
        total,
        appliedCoupon
    };
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
        cartItemsBox.innerHTML = "";
        removeAppliedCoupon();
        return;
    }

    const summary = calculateCartSummary(items);
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

    cartEmpty.style.display = "none";
    cartContent.style.display = "grid";

    cartItemsBox.innerHTML = items.map(renderCartItem).join("");

    summaryCount.textContent = totalQuantity;
    summarySubtotal.textContent = formatVND(summary.subtotal);
    summaryShipping.textContent = formatVND(summary.shipping);
    summaryDiscount.textContent = `-${formatVND(summary.discount)}`;
    summaryTotal.textContent = formatVND(summary.total);

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
        couponMessage.textContent = "";
        couponMessage.style.display = "none";
        discountRow.style.display = "none";
    }
}

/* chuyển sang thanh toán */

function goToCheckout() {
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