const TRACKING_ORDERS_KEY = "orders";

function readTrackingOrders() {
    try {
        const rawOrders = localStorage.getItem(TRACKING_ORDERS_KEY);
        const orders = rawOrders ? JSON.parse(rawOrders) : [];

        return Array.isArray(orders) ? orders : [];
    } catch (error) {
        console.error("Loi doc don hang:", error);
        return [];
    }
}

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

function formatTrackingMoney(value) {
    return Number(value || 0).toLocaleString("vi-VN") + "đ";
}

function formatTrackingDate(value, plusDays = 0) {
    const date = value ? new Date(value) : new Date();

    if (Number.isNaN(date.getTime())) {
        return "Dang cap nhat";
    }

    date.setDate(date.getDate() + plusDays);

    return date.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });
}

function findTrackingOrder() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const index = Number(params.get("index"));
    const orders = readTrackingOrders();

    if (code) {
        const foundOrder = orders.find(order => String(order.code || "") === code);
        if (foundOrder) return foundOrder;
    }

    if (Number.isInteger(index) && index >= 0 && orders[index]) {
        return orders[index];
    }

    return null;
}

function showTrackingEmpty() {
    const emptyBox = document.getElementById("tracking-empty");
    const contentBox = document.getElementById("tracking-content");

    if (emptyBox) emptyBox.style.display = "block";
    if (contentBox) contentBox.style.display = "none";
}

function showTrackingContent() {
    const emptyBox = document.getElementById("tracking-empty");
    const contentBox = document.getElementById("tracking-content");

    if (emptyBox) emptyBox.style.display = "none";
    if (contentBox) contentBox.style.display = "grid";
}

function setTrackingText(id, value) {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
}

function renderTrackingItems(order) {
    const itemsBox = document.getElementById("tracking-items");
    const items = Array.isArray(order.items) ? order.items : [];

    if (!itemsBox) return;

    itemsBox.innerHTML = items.map(item => `
        <article class="tracking-item">
            <img
                src="assets/images/books/${item.image || "logo.jpg"}"
                alt="${item.name || "Sach"}"
                onerror="this.src='assets/images/logo.jpg'"
            />
            <div>
                <h3>${item.name || "Sach da mua"}</h3>
                <p>So luong: ${Number(item.quantity || 1)}</p>
            </div>
            <strong>
                ${formatTrackingMoney(parseTrackingPrice(item.price) * Number(item.quantity || 1))}
            </strong>
        </article>
    `).join("");
}

function renderTrackingSummary(order) {
    const summary = order.summary || {};
    const items = Array.isArray(order.items) ? order.items : [];
    const subtotal = typeof summary.subtotal !== "undefined"
        ? Number(summary.subtotal || 0)
        : items.reduce((sum, item) => {
            return sum + parseTrackingPrice(item.price) * Number(item.quantity || 1);
        }, 0);
    const shipping = Number(summary.shipping || 0);
    const discount = Number(summary.discount || 0);
    const total = typeof summary.total !== "undefined"
        ? Number(summary.total || 0)
        : Math.max(subtotal + shipping - discount, 0);
    const discountRow = document.getElementById("tracking-discount-row");

    setTrackingText("tracking-subtotal", formatTrackingMoney(subtotal));
    setTrackingText("tracking-shipping", formatTrackingMoney(shipping));
    setTrackingText("tracking-discount", `-${formatTrackingMoney(discount)}`);
    setTrackingText("tracking-total", formatTrackingMoney(total));

    if (discountRow) {
        discountRow.style.display = discount > 0 ? "flex" : "none";
    }
}

function renderTrackingPage() {
    const order = findTrackingOrder();

    if (!order) {
        showTrackingEmpty();
        return;
    }

    showTrackingContent();

    setTrackingText("tracking-code", `#${order.code || "TH-0000"}`);
    setTrackingText("tracking-date", formatTrackingDate(order.createdAt, 3));
    setTrackingText("receiver-name", order.customer?.name || "Dang cap nhat");
    setTrackingText("receiver-phone", order.customer?.phone || "Dang cap nhat");
    setTrackingText("receiver-address", order.customer?.address || "Dang cap nhat");
    setTrackingText("time-confirmed", "Da ghi nhan");
    setTrackingText("time-packed", "Dang xu ly");
    setTrackingText("tracking-note-text", `Cap nhat: Don ${order.code || ""} dang duoc van chuyen den dia chi nhan hang.`);

    renderTrackingItems(order);
    renderTrackingSummary(order);
}

document.addEventListener("DOMContentLoaded", renderTrackingPage);
