const ORDERS_KEY = "orders";
const CART_KEY = "cart";

let currentOrderFilter = "all";

function getOrdersFromStorage() {
    try {
        const rawOrders = localStorage.getItem(ORDERS_KEY);
        const orders = rawOrders ? JSON.parse(rawOrders) : [];

        if (!Array.isArray(orders)) return [];

        return orders;
    } catch (error) {
        console.error("Lỗi đọc lịch sử đơn hàng:", error);
        return [];
    }
}

function saveCartToStorage(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function getCartFromStorage() {
    try {
        const rawCart = localStorage.getItem(CART_KEY);
        const cart = rawCart ? JSON.parse(rawCart) : [];

        if (!Array.isArray(cart)) return [];

        return cart;
    } catch (error) {
        return [];
    }
}

function updateHeaderCartBadge() {
    const badge = document.getElementById("so-gio-hang");
    if (!badge) return;

    const cart = getCartFromStorage();
    const totalQuantity = cart.reduce((sum, item) => {
        return sum + Number(item.quantity || 0);
    }, 0);

    badge.textContent = totalQuantity;

    if (totalQuantity <= 0) {
        badge.classList.add("an");
    } else {
        badge.classList.remove("an");
    }
}

function formatVND(number) {
    return Number(number || 0).toLocaleString("vi-VN") + "đ";
}

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

function formatOrderDate(dateString) {
    if (!dateString) return "Chưa cập nhật";

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) return "Chưa cập nhật";

    return date.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });
}

function getBookImagePath(imageName) {
    return `assets/images/books/${imageName}`;
}

function getOrderStatus(order, index) {
    if (order.status) return order.status;

    return index === 0 ? "shipping" : "completed";
}

function getStatusLabel(status) {
    if (status === "completed") return "Hoàn thành";
    return "Đang giao";
}

function getFirstOrderItem(order) {
    if (!order.items || order.items.length === 0) return null;
    return order.items[0];
}

function getOrderTotal(order) {
    if (order.summary && typeof order.summary.total !== "undefined") {
        return order.summary.total;
    }

    if (!order.items) return 0;

    return order.items.reduce((sum, item) => {
        return sum + parsePrice(item.price) * Number(item.quantity || 1);
    }, 0);
}

function filterOrders(orders) {
    const ordersWithIndex = orders.map((order, index) => ({
        order,
        originalIndex: index
    }));

    const filteredOrders = currentOrderFilter === "all"
        ? ordersWithIndex
        : ordersWithIndex.filter(({ order, originalIndex }) => {
            const status = getOrderStatus(order, originalIndex);
            return status === currentOrderFilter;
        });

    return sortOrdersForDisplay(filteredOrders);
}

// Lấy mốc thời gian của đơn hàng để sắp xếp đơn mới hơn lên trên.
function getOrderTime(order) {
    const date = new Date(order.createdAt || 0);

    if (Number.isNaN(date.getTime())) return 0;

    return date.getTime();
}

// Sắp xếp đơn chưa giao lên đầu, đơn hoàn thành xuống cuối và trong từng nhóm thì đơn mới hơn nằm trên.
function sortOrdersForDisplay(ordersWithIndex) {
    return ordersWithIndex.sort((left, right) => {
        const leftStatus = getOrderStatus(left.order, left.originalIndex);
        const rightStatus = getOrderStatus(right.order, right.originalIndex);
        const leftPriority = leftStatus === "shipping" ? 0 : 1;
        const rightPriority = rightStatus === "shipping" ? 0 : 1;

        if (leftPriority !== rightPriority) {
            return leftPriority - rightPriority;
        }

        return getOrderTime(right.order) - getOrderTime(left.order);
    });
}

function renderProgress(status) {
    const steps = [
        { key: "confirmed", label: "Xác nhận" },
        { key: "packed", label: "Đóng gói" },
        { key: "shipping", label: "Vận chuyển" },
        { key: "completed", label: "Hoàn tất" }
    ];

    let activeIndex = status === "completed" ? 3 : 2;

    return `
        <div class="order-progress">
            ${steps.map((step, index) => `
                <div class="progress-step ${index <= activeIndex ? "active" : ""}">
                    <span class="progress-dot"></span>
                    <span>${step.label}</span>
                </div>
            `).join("")}
        </div>
    `;
}

function renderOrderCard(order, index) {
    const firstItem = getFirstOrderItem(order);

    if (!firstItem) return "";

    const status = getOrderStatus(order, index);
    const statusLabel = getStatusLabel(status);
    const orderCode = order.code || `TH${String(index + 1).padStart(4, "0")}`;
    const total = getOrderTotal(order);
    const orderDate = formatOrderDate(order.createdAt);

    const itemCount = order.items.reduce((sum, item) => {
        return sum + Number(item.quantity || 1);
    }, 0);

    return `
        <article class="order-card">
            <div class="order-main">
                <img 
                    src="${getBookImagePath(firstItem.image)}"
                    alt="${firstItem.name}"
                    class="order-image"
                    onerror="this.src='assets/images/background.jpg'"
                >

                <div class="order-info">
                    <div class="order-status-row">
                        <span class="order-status ${status}">${statusLabel}</span>
                        <span class="order-code">Mã: ${orderCode}</span>
                    </div>

                    <h2 class="order-title">${firstItem.name}</h2>
                    <p class="order-author">
                        ${firstItem.author || "Tác giả đang cập nhật"}
                        ${itemCount > 1 ? ` và ${itemCount - 1} sản phẩm khác` : ""}
                    </p>

                    <p class="order-date">
                        <i class="far fa-calendar-alt"></i>
                        Ngày đặt: ${orderDate}
                    </p>
                </div>

                <div class="order-price-box">
                    <div class="order-price">${formatVND(total)}</div>

                    <div class="order-actions">
                        ${
                            status === "shipping"
                                ? `<button class="order-btn primary" onclick="goToTracking(${index})">
                                        <i class="fas fa-map"></i> Theo dõi đơn hàng
                                    </button>
                                  <button class="order-btn" onclick="showOrderDetail(${index})">
                                    Chi tiết
                                  </button>`
                                : `<button class="order-btn primary" onclick="goToReview(${index})">
                                    Đánh giá
                                  </button>`
                        }
                    </div>
                </div>
            </div>

            ${status === "shipping" ? renderProgress(status) : ""}
        </article>
    `;
}

function renderOrdersPage() {
    const ordersList = document.getElementById("orders-list");
    const emptyBox = document.getElementById("orders-empty");

    if (!ordersList || !emptyBox) return;

    const orders = getOrdersFromStorage();
    const filteredOrders = filterOrders(orders);

    if (filteredOrders.length === 0) {
        ordersList.innerHTML = "";
        emptyBox.style.display = "block";
        return;
    }

    emptyBox.style.display = "none";

    ordersList.innerHTML = filteredOrders.map(({ order, originalIndex }) => {
        return renderOrderCard(order, originalIndex);
    }).join("");
}

function showOrderDetail(orderIndex) {
    const orders = getOrdersFromStorage();
    const order = orders[orderIndex];

    if (!order) return;

    const total = getOrderTotal(order);
    const itemsHtml = order.items.map(item => {
        const quantity = Number(item.quantity || 1);
        const itemTotal = parsePrice(item.price) * quantity;

        return `
            <li>
                ${item.name} - SL: ${quantity} - ${formatVND(itemTotal)}
            </li>
        `;
    }).join("");

    const modal = document.createElement("div");
    modal.className = "order-detail-modal show";
    modal.innerHTML = `
        <div class="order-detail-overlay" onclick="closeOrderModal()"></div>

        <div class="order-detail-box">
            <button class="close-order-modal" onclick="closeOrderModal()">
                <i class="fas fa-times"></i>
            </button>

            <h2>Chi tiết đơn hàng</h2>

            <p><strong>Mã đơn:</strong> ${order.code || "Chưa cập nhật"}</p>
            <p><strong>Ngày đặt:</strong> ${formatOrderDate(order.createdAt)}</p>
            <p><strong>Người nhận:</strong> ${order.customer?.name || "Chưa cập nhật"}</p>
            <p><strong>Số điện thoại:</strong> ${order.customer?.phone || "Chưa cập nhật"}</p>
            <p><strong>Địa chỉ:</strong> ${order.customer?.address || "Chưa cập nhật"}</p>

            <br>

            <p><strong>Sản phẩm:</strong></p>
            <ul>${itemsHtml}</ul>

            <br>

            <p><strong>Tổng thanh toán:</strong> ${formatVND(total)}</p>
        </div>
    `;

    document.body.appendChild(modal);
}

function closeOrderModal() {
    const modal = document.querySelector(".order-detail-modal");
    if (modal) {
        modal.remove();
    }
}

function goToTracking(orderIndex) {
    const orders = getOrdersFromStorage();
    const order = orders[orderIndex];

    if (!order) return;

    const orderCode = order.code || `TH${String(orderIndex + 1).padStart(4, "0")}`;
    const params = new URLSearchParams({
        code: orderCode,
        index: String(orderIndex)
    });

    window.location.href = `tracking.html?${params.toString()}`;
}

// Chuyển sang trang viết đánh giá cho đúng đơn hàng đã hoàn thành.
function goToReview(orderIndex) {
    window.location.href = `review.html?order=${orderIndex}`;
}

function initOrderTabs() {
    const tabs = document.querySelectorAll(".order-tab");

    tabs.forEach(tab => {
        tab.addEventListener("click", function () {
            tabs.forEach(item => item.classList.remove("active"));
            tab.classList.add("active");

            currentOrderFilter = tab.dataset.filter;
            renderOrdersPage();
        });
    });
}

document.addEventListener("DOMContentLoaded", function () {
    initOrderTabs();
    renderOrdersPage();

    setTimeout(function () {
        updateHeaderCartBadge();
    }, 300);
});
