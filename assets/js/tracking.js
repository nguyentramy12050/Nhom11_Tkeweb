const TRACKING_ORDERS_KEY = "orders";
const TRACKING_CART_KEY = "cart";

// Doc danh sach don hang da luu trong localStorage.
function getOrdersFromStorage() {
    try {
        const rawOrders = localStorage.getItem(TRACKING_ORDERS_KEY);
        const orders = rawOrders ? JSON.parse(rawOrders) : [];

        return Array.isArray(orders) ? orders : [];
    } catch (error) {
        console.error("Lỗi đọc lịch sử đơn hàng:", error);
        return [];
    }
}

// Doc gio hang tu localStorage de cap nhat so luong tren header.
function getCartFromStorage() {
    try {
        const rawCart = localStorage.getItem(TRACKING_CART_KEY);
        const cart = rawCart ? JSON.parse(rawCart) : [];

        return Array.isArray(cart) ? cart : [];
    } catch (error) {
        console.error("Lỗi đọc giỏ hàng:", error);
        return [];
    }
}

// Cap nhat badge so luong san pham tren icon gio hang cua header.
function updateHeaderCartBadge() {
    const badge = document.getElementById("so-gio-hang");
    if (!badge) return;

    const cart = getCartFromStorage();
    const totalQuantity = cart.reduce((sum, item) => {
        return sum + Number(item.quantity || item.qty || item.soluong || 0);
    }, 0);

    badge.textContent = totalQuantity;

    if (totalQuantity <= 0) {
        badge.classList.add("an");
    } else {
        badge.classList.remove("an");
    }
}

// Chuyen chuoi gia tien dang "120.000đ" thanh so de tinh tong.
function parseTrackingPrice(priceText) {
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

// Dinh dang so tien theo tien Viet Nam.
function formatTrackingMoney(value) {
    return Number(value || 0).toLocaleString("vi-VN") + "đ";
}

// Cong them so ngay vao ngay goc, dung de tinh ngay giao du kien.
function addTrackingDays(dateValue, days) {
    const date = dateValue ? new Date(dateValue) : new Date();

    if (Number.isNaN(date.getTime())) {
        return new Date();
    }

    date.setDate(date.getDate() + days);
    return date;
}

// Dinh dang ngay hien thi trong khu vuc du kien giao.
function formatTrackingDate(dateValue) {
    const date = dateValue ? new Date(dateValue) : new Date();

    if (Number.isNaN(date.getTime())) {
        return "Đang cập nhật";
    }

    return date.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    });
}

// Dinh dang gio cua tung moc trang thai don hang.
function formatTrackingTime(dateValue, hourOffset = 0) {
    const date = dateValue ? new Date(dateValue) : new Date();

    if (Number.isNaN(date.getTime())) {
        return "08:30";
    }

    date.setHours(date.getHours() + hourOffset);

    return date.toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit"
    });
}

// Gan noi dung text vao phan tu neu phan tu ton tai.
function setTrackingText(id, value) {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
}

// Tim don hang can theo doi dua tren code, index hoac order tren URL.
function findTrackingOrder() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const index = Number(params.get("index"));
    const legacyOrderIndex = Number(params.get("order"));
    const orders = getOrdersFromStorage();

    if (code) {
        const foundOrder = orders.find(order => String(order.code || "") === code);
        if (foundOrder) return foundOrder;
    }

    if (Number.isInteger(index) && index >= 0 && orders[index]) {
        return orders[index];
    }

    if (Number.isInteger(legacyOrderIndex) && legacyOrderIndex >= 0 && orders[legacyOrderIndex]) {
        return orders[legacyOrderIndex];
    }

    return null;
}

// Hien thi trang thai rong khi khong tim thay don hang.
function showTrackingEmpty() {
    const emptyBox = document.getElementById("tracking-empty");
    const contentBox = document.getElementById("tracking-content");

    if (emptyBox) emptyBox.style.display = "block";
    if (contentBox) contentBox.style.display = "none";
}

// Hien thi noi dung tracking khi tim thay don hang hop le.
function showTrackingContent() {
    const emptyBox = document.getElementById("tracking-empty");
    const contentBox = document.getElementById("tracking-content");

    if (emptyBox) emptyBox.style.display = "none";
    if (contentBox) contentBox.style.display = "grid";
}

// Tao HTML cho danh sach sach co trong kien hang.
function renderTrackingItems(items) {
    const safeItems = Array.isArray(items) ? items : [];

    return safeItems.map(item => {
        const quantity = Number(item.quantity || item.qty || item.soluong || 1);
        const itemTotal = parseTrackingPrice(item.price) * quantity;
        const imageName = item.image || "logo.jpg";
        const bookName = item.name || "Sách đã mua";

        return `
            <article class="tracking-item">
                <img
                    src="assets/images/books/${imageName}"
                    alt="${bookName}"
                    onclick="window.location.href='product-detail.html?id=${item.id}'"
                    title="Xem chi tiết ${bookName}"
                    style="cursor:pointer"
                    onerror="this.src='assets/images/logo.jpg'"
                >

                <div>
                    <h3>${bookName}</h3>
                    <p>${item.author || "Tác giả đang cập nhật"} · Số lượng: ${quantity}</p>
                    <strong>${formatTrackingMoney(itemTotal)}</strong>
                </div>
            </article>
        `;
    }).join("");
}

// Tinh tam tinh, phi van chuyen, giam gia va tong tien cua don hang.
function calculateTrackingSummary(order) {
    const items = Array.isArray(order.items) ? order.items : [];
    const savedSummary = order.summary || {};

    const subtotal = typeof savedSummary.subtotal !== "undefined"
        ? Number(savedSummary.subtotal || 0)
        : items.reduce((sum, item) => {
            const quantity = Number(item.quantity || item.qty || item.soluong || 1);
            return sum + parseTrackingPrice(item.price) * quantity;
        }, 0);

    const shipping = typeof savedSummary.shipping !== "undefined"
        ? Number(savedSummary.shipping || 0)
        : 35000;
    const discount = Number(savedSummary.discount || 0);
    const total = typeof savedSummary.total !== "undefined"
        ? Number(savedSummary.total || 0)
        : Math.max(subtotal + shipping - discount, 0);

    return {
        subtotal,
        shipping,
        discount,
        total
    };
}

// Hien thi bang tong ket chi phi cua don hang.
function renderTrackingSummary(order) {
    const summary = calculateTrackingSummary(order);
    const discountRow = document.getElementById("tracking-discount-row");

    setTrackingText("tracking-subtotal", formatTrackingMoney(summary.subtotal));
    setTrackingText("tracking-shipping", formatTrackingMoney(summary.shipping));
    setTrackingText("tracking-discount", `-${formatTrackingMoney(summary.discount)}`);
    setTrackingText("tracking-total", formatTrackingMoney(summary.total));

    if (discountRow) {
        discountRow.style.display = summary.discount > 0 ? "flex" : "none";
    }
}

// Do du lieu don hang vao cac khu vuc thong tin tren trang tracking.
function renderTrackingPage() {
    const order = findTrackingOrder();

    if (!order || !Array.isArray(order.items) || order.items.length === 0) {
        showTrackingEmpty();
        return;
    }

    const createdAt = order.createdAt || new Date().toISOString();
    const expectedDate = addTrackingDays(createdAt, 3);
    const customer = order.customer || {};
    const address = customer.address || "địa chỉ nhận hàng";
    const itemsBox = document.getElementById("tracking-items");

    showTrackingContent();

    setTrackingText("tracking-code", `#${order.code || "TH-0000"}`);
    setTrackingText("tracking-date", formatTrackingDate(expectedDate));
    setTrackingText("time-confirmed", formatTrackingTime(createdAt, 0));
    setTrackingText("time-packed", formatTrackingTime(createdAt, 6));
    setTrackingText("receiver-name", customer.name || "Đang cập nhật");
    setTrackingText("receiver-phone", customer.phone || "Đang cập nhật");
    setTrackingText("receiver-address", address);
    setTrackingText(
        "shipping-message",
        `Kiện hàng đã rời kho trung chuyển và đang được vận chuyển tới ${address}.`
    );
    setTrackingText(
        "tracking-note-text",
        "Cập nhật: Kiện hàng đã qua trạm kiểm soát gần nhất lúc 10:20 sáng nay."
    );

    if (itemsBox) {
        itemsBox.innerHTML = renderTrackingItems(order.items);
    }

    renderTrackingSummary(order);
}

// Khoi chay trang tracking sau khi DOM san sang va cap nhat badge header sau do.
document.addEventListener("DOMContentLoaded", function () {
    renderTrackingPage();
    initReviewButton();

    setTimeout(function () {
        updateHeaderCartBadge();
    }, 300);
});
