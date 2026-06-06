const ORDERS_KEY = "orders";
const CART_KEY = "cart";
const REVIEWS_KEY = "reviews";
const LATEST_ORDER_KEY = "latestOrder";
const HIDDEN_ORDER_CODES = ["TH202606064520"];

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

// Lưu lại danh sách đơn hàng.
function saveOrdersToStorage(orders) {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

function removeHiddenOrdersFromStorage() {
    const hiddenCodes = new Set(HIDDEN_ORDER_CODES);

    try {
        const rawOrders = localStorage.getItem(ORDERS_KEY);
        const orders = rawOrders ? JSON.parse(rawOrders) : [];

        if (Array.isArray(orders)) {
            const visibleOrders = orders.filter(order => {
                return !hiddenCodes.has(String(order.code || ""));
            });

            if (visibleOrders.length !== orders.length) {
                saveOrdersToStorage(visibleOrders);
            }
        }

        const rawLatestOrder = localStorage.getItem(LATEST_ORDER_KEY);
        const latestOrder = rawLatestOrder ? JSON.parse(rawLatestOrder) : null;

        if (latestOrder && hiddenCodes.has(String(latestOrder.code || ""))) {
            localStorage.removeItem(LATEST_ORDER_KEY);
        }
    } catch (error) {
        console.error("Lỗi xóa đơn hàng đã ẩn:", error);
    }

    try {
        const rawReviews = localStorage.getItem(REVIEWS_KEY);
        const reviews = rawReviews ? JSON.parse(rawReviews) : [];

        if (Array.isArray(reviews)) {
            const visibleReviews = reviews.filter(review => {
                return !hiddenCodes.has(String(review.orderCode || ""));
            });

            if (visibleReviews.length !== reviews.length) {
                saveReviewsToStorage(visibleReviews);
            }
        }
    } catch (error) {
        console.error("Lỗi xóa đánh giá của đơn hàng đã ẩn:", error);
    }
}

// Đọc các đánh giá người dùng đã gửi từ localStorage.
function getReviewsFromStorage() {
    try {
        const rawReviews = localStorage.getItem(REVIEWS_KEY);
        const reviews = rawReviews ? JSON.parse(rawReviews) : [];

        if (!Array.isArray(reviews)) return [];

        return reviews;
    } catch (error) {
        console.error("Lỗi đọc đánh giá:", error);
        return [];
    }
}

// Lưu lại danh sách đánh giá sau khi xóa hoặc cập nhật.
function saveReviewsToStorage(reviews) {
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
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

function getOrderStatus(order) {
    const createdAt = new Date(order.createdAt || 0).getTime();

    if (!createdAt || Number.isNaN(createdAt)) {
        return order.status || "confirmed";
    }

    const elapsedHours = (Date.now() - createdAt) / (1000 * 60 * 60);

    if (elapsedHours >= 24) return "completed";
    if (elapsedHours >= 2) return "shipping";
    if (elapsedHours >= 1) return "packed";
    return "confirmed";
}

// Lấy mã đơn ổn định để nối đơn hàng với đánh giá đã lưu.
function getOrderCode(order, index) {
    return order.code || `TH${String(index + 1).padStart(4, "0")}`;
}

function getStatusLabel(status) {
    if (status === "confirmed") return "Xác nhận";
    if (status === "packed") return "Đóng gói";
    if (status === "shipping") return "Đang vận chuyển";
    if (status === "completed") return "Hoàn thành";
    return "Đang giao";
}

function getFirstOrderItem(order) {
    if (!order.items || order.items.length === 0) return null;
    return order.items[0];
}

// Kiểm tra đơn hàng đã có đánh giá hay chưa.
function getReviewForOrder(order, index) {
    const orderCode = getOrderCode(order, index);
    const firstItem = getFirstOrderItem(order);

    return getReviewsFromStorage().find(review => {
        const sameCode = review.orderCode && review.orderCode === orderCode;
        const sameIndex = Number(review.orderIndex) === Number(index);
        const sameBook = firstItem ? Number(review.bookId) === Number(firstItem.id) : true;

        return sameBook && (sameCode || sameIndex);
    });
}

function formatOrderDateTime(dateString) {
    if (!dateString) return "Chưa cập nhật";

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) return "Chưa cập nhật";

    return date.toLocaleString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
}

function addHoursToDate(dateString, hours) {
    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) return "";

    date.setHours(date.getHours() + hours);

    return formatOrderDateTime(date.toISOString());
}

function escapeHtml(value) {
    return String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function getPaymentMethodLabel(method) {
    if (method === "cod") return "Thanh toán khi nhận sách";
    if (method === "ewallet") return "Ví điện tử MoMo / ZaloPay";
    return "Chuyển khoản ngân hàng";
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
        const leftPriority = leftStatus === "completed" ? 1 : 0;
        const rightPriority = rightStatus === "completed" ? 1 : 0;

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

    const activeIndex = Math.max(
        steps.findIndex(step => step.key === status),
        0
    );

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
    const orderCode = getOrderCode(order, index);
    const total = getOrderTotal(order);
    const orderDate = formatOrderDate(order.createdAt);
    const existingReview = getReviewForOrder(order, index);

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
                    onclick="window.location.href='product-detail.html?id=${firstItem.id}'"
                    title="Xem chi tiết ${firstItem.name}"
                    style="cursor:pointer"
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
                            status !== "completed"
                                ? `<button class="order-btn primary" onclick="goToTracking(${index})">
                                        <i class="fas fa-map"></i> Theo dõi đơn hàng
                                    </button>
                                  <button class="order-btn" onclick="showOrderDetail(${index})">
                                    Chi tiết
                                  </button>`
                                : `<button class="order-btn primary" onclick="goToReview(${index})">
                                    ${existingReview ? "Xem chi tiết đánh giá" : "Đánh giá"}
                                  </button>
                                  <button class="order-btn" onclick="showOrderDetail(${index})">
                                    Chi tiết
                                  </button>
                                  ${existingReview ? `<button class="order-btn" onclick="deleteReview(${index})">
                                    Xóa đánh giá
                                  </button>` : ""}`
                        }
                    </div>
                </div>
            </div>

            ${status !== "completed" ? renderProgress(status) : ""}
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
    const status = getOrderStatus(order, orderIndex);
    const orderCode = getOrderCode(order, orderIndex);
    const orderDate = formatOrderDate(order.createdAt);
    const paymentLabel = getPaymentMethodLabel(order.paymentMethod);
    const customer = order.customer || {};
    const itemsHtml = order.items.map(item => {
        const quantity = Number(item.quantity || 1);
        const itemTotal = parsePrice(item.price) * quantity;

        return `
            <article class="order-detail-product">
                <img
                    src="${getBookImagePath(item.image)}"
                    alt="${escapeHtml(item.name)}"
                    onerror="this.src='assets/images/background.jpg'"
                >
                <div>
                    <strong>${escapeHtml(item.name)}</strong>
                    <span>Số lượng: ${quantity}</span>
                </div>
                <b>${formatVND(itemTotal)}</b>
            </article>
        `;
    }).join("");

    const statusOrder = ["confirmed", "packed", "shipping", "completed"];
    const currentStatusIndex = Math.max(statusOrder.indexOf(status), 0);
    const progressSteps = [
        {
            key: "confirmed",
            label: "Xác nhận",
            detail: formatOrderDateTime(order.createdAt)
        },
        {
            key: "packed",
            label: "Đóng gói",
            detail: addHoursToDate(order.createdAt, 1)
        },
        {
            key: "shipping",
            label: status === "completed" ? "Đã giao" : "Đang vận chuyển",
            detail: addHoursToDate(order.createdAt, 2)
        },
        {
            key: "completed",
            label: "Hoàn tất",
            detail: addHoursToDate(order.createdAt, 24)
        }
    ].map((step, index) => {
        const isActive = index <= currentStatusIndex;

        return `
        <li class="${index <= currentStatusIndex ? "active" : ""}">
            <span class="order-detail-dot"></span>
            <div>
                <strong>${step.label}</strong>
                ${isActive ? `<em>${step.detail}</em>` : ""}
            </div>
        </li>
    `;
    }).join("");

    const modal = document.createElement("div");
    modal.className = "order-detail-modal show";
    modal.innerHTML = `
        <div class="order-detail-overlay" onclick="closeOrderModal()"></div>

        <div class="order-detail-box">
            <header class="order-detail-header">
                <h2>Chi tiết đơn hàng <span>#${escapeHtml(orderCode)}</span></h2>
                <button class="close-order-modal" onclick="closeOrderModal()" aria-label="Đóng">
                    <i class="fas fa-times"></i>
                </button>
            </header>

            <div class="order-detail-meta">
                <div>
                    <span>Ngày đặt hàng</span>
                    <strong>${orderDate}</strong>
                </div>
                <div>
                    <span>Thanh toán</span>
                    <strong>${paymentLabel}</strong>
                </div>
                <div>
                    <span>Tổng cộng</span>
                    <strong>${formatVND(total)}</strong>
                </div>
            </div>

            <section class="order-detail-section">
                <h3>Sản phẩm</h3>
                <div class="order-detail-products">${itemsHtml}</div>
            </section>

            <div class="order-detail-grid">
                <section class="order-detail-section">
                    <h3>Trạng thái vận chuyển</h3>
                    <ul class="order-detail-timeline">${progressSteps}</ul>
                </section>

                <section class="order-detail-section">
                    <h3>Địa chỉ nhận hàng</h3>
                    <div class="order-detail-address">
                        <strong>${escapeHtml(customer.name || "Chưa cập nhật")}</strong>
                        <span>${escapeHtml(customer.phone || "Chưa cập nhật")}</span>
                        <p>${escapeHtml(customer.address || "Chưa cập nhật")}</p>
                    </div>
                </section>
            </div>

            <footer class="order-detail-footer">
                <button type="button" onclick="closeOrderModal()">Đóng</button>
            </footer>
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

    const orderCode = getOrderCode(order, orderIndex);
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

// Xóa đánh giá đã gửi của một đơn hàng hoàn thành.
function deleteReview(orderIndex) {
    const orders = getOrdersFromStorage();
    const order = orders[orderIndex];

    if (!order) return;

    const confirmed = confirm("Bạn có chắc muốn xóa đánh giá của đơn hàng này không?");
    if (!confirmed) return;

    const firstItem = getFirstOrderItem(order);
    const orderCode = getOrderCode(order, orderIndex);
    const reviews = getReviewsFromStorage().filter(review => {
        const sameCode = review.orderCode && review.orderCode === orderCode;
        const sameIndex = Number(review.orderIndex) === Number(orderIndex);
        const sameBook = firstItem ? Number(review.bookId) === Number(firstItem.id) : true;

        return !(sameBook && (sameCode || sameIndex));
    });

    saveReviewsToStorage(reviews);
    renderOrdersPage();
}

function initOrderStatusFilter() {
    const statusFilter = document.getElementById("order-status-filter");
    if (!statusFilter) return;

    statusFilter.value = currentOrderFilter;
    createOrderStatusDropdown(statusFilter);

    statusFilter.addEventListener("change", function () {
        currentOrderFilter = statusFilter.value;
        renderOrdersPage();
    });
}

function closeOrderStatusDropdowns(exceptDropdown) {
    document.querySelectorAll(".order-status-dropdown.open").forEach(dropdown => {
        if (dropdown !== exceptDropdown) {
            dropdown.classList.remove("open");
        }
    });
}

function updateOrderStatusDropdown(selectElement, dropdown) {
    const label = dropdown.querySelector(".order-status-dropdown-label");
    const selectedOption = selectElement.options[selectElement.selectedIndex];

    if (label && selectedOption) {
        label.textContent = selectedOption.textContent;
    }

    dropdown.querySelectorAll(".order-status-dropdown-option").forEach(optionButton => {
        optionButton.classList.toggle("active", optionButton.dataset.value === selectElement.value);
    });
}

function createOrderStatusDropdown(selectElement) {
    if (selectElement.dataset.dropdownReady) return;

    selectElement.dataset.dropdownReady = "true";
    selectElement.classList.add("order-status-select-hidden");

    const dropdown = document.createElement("div");
    dropdown.className = "order-status-dropdown";

    const button = document.createElement("button");
    button.type = "button";
    button.className = "order-status-dropdown-button";
    button.innerHTML = '<span class="order-status-dropdown-label"></span><i class="fas fa-caret-down"></i>';

    const menu = document.createElement("div");
    menu.className = "order-status-dropdown-menu";

    Array.from(selectElement.options).forEach(option => {
        const optionButton = document.createElement("button");
        optionButton.type = "button";
        optionButton.className = "order-status-dropdown-option";
        optionButton.dataset.value = option.value;
        optionButton.textContent = option.textContent;

        optionButton.addEventListener("click", () => {
            selectElement.value = option.value;
            updateOrderStatusDropdown(selectElement, dropdown);
            dropdown.classList.remove("open");
            selectElement.dispatchEvent(new Event("change", { bubbles: true }));
        });

        menu.appendChild(optionButton);
    });

    button.addEventListener("click", event => {
        event.stopPropagation();
        const isOpen = dropdown.classList.contains("open");
        closeOrderStatusDropdowns(dropdown);
        dropdown.classList.toggle("open", !isOpen);
    });

    dropdown.appendChild(button);
    dropdown.appendChild(menu);
    selectElement.insertAdjacentElement("afterend", dropdown);
    updateOrderStatusDropdown(selectElement, dropdown);
}

document.addEventListener("click", function () {
    closeOrderStatusDropdowns();
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeOrderStatusDropdowns();
    }
});

document.addEventListener("DOMContentLoaded", function () {
    removeHiddenOrdersFromStorage();
    initOrderStatusFilter();
    renderOrdersPage();

    setTimeout(function () {
        updateHeaderCartBadge();
    }, 300);
});
