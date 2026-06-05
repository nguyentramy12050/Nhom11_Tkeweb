const ORDERS_KEY = "orders";
const REVIEWS_KEY = "reviews";
const CART_KEY = "cart";

let selectedRating = 4;
let uploadedImageData = "";

function getOrdersFromStorage() {
    try {
        const rawOrders = localStorage.getItem(ORDERS_KEY);
        const orders = rawOrders ? JSON.parse(rawOrders) : [];

        if (!Array.isArray(orders)) return [];

        return orders;
    } catch (error) {
        console.error("Lỗi đọc đơn hàng:", error);
        return [];
    }
}

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

function saveReviewsToStorage(reviews) {
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
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

function getOrderIndexFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const orderIndex = Number(params.get("order"));

    if (Number.isNaN(orderIndex)) return 0;

    return orderIndex;
}

function getBookImagePath(imageName) {
    return `assets/images/books/${imageName}`;
}

function getReviewOrder() {
    const orders = getOrdersFromStorage();
    const orderIndex = getOrderIndexFromUrl();

    return {
        order: orders[orderIndex],
        orderIndex
    };
}

// Lấy mã đơn ổn định để nối đơn hàng với đánh giá đã lưu.
function getOrderCode(order, orderIndex) {
    return order.code || `TH${String(orderIndex + 1).padStart(4, "0")}`;
}

// Lấy tên người dùng hiện tại để hiển thị trong phần đánh giá ở trang chi tiết sách.
function getCurrentReviewerName(order) {
    return sessionStorage.getItem("thuhien_ten")
        || localStorage.getItem("thuhien_ten")
        || order.customer?.name
        || "Khách hàng";
}

// Tìm đánh giá đã gửi của đơn hàng hiện tại nếu có.
function getExistingReviewForOrder(order, orderIndex) {
    if (!order || !order.items || order.items.length === 0) return null;

    const firstItem = order.items[0];
    const orderCode = getOrderCode(order, orderIndex);

    return getReviewsFromStorage().find(review => {
        const sameCode = review.orderCode && review.orderCode === orderCode;
        const sameIndex = Number(review.orderIndex) === Number(orderIndex);
        const sameBook = Number(review.bookId) === Number(firstItem.id);

        return sameBook && (sameCode || sameIndex);
    });
}

function renderReviewPage() {
    const emptyBox = document.getElementById("review-empty");
    const contentBox = document.getElementById("review-content");

    const { order, orderIndex } = getReviewOrder();

    if (!order || !order.items || order.items.length === 0) {
        emptyBox.style.display = "block";
        contentBox.style.display = "none";
        return;
    }

    emptyBox.style.display = "none";
    contentBox.style.display = "block";

    const firstItem = order.items[0];

    document.getElementById("review-book-image").src = getBookImagePath(firstItem.image);
    document.getElementById("review-book-name").textContent = firstItem.name || "Tên sách";
    document.getElementById("review-book-author").textContent = firstItem.author || "Tác giả đang cập nhật";
    document.getElementById("review-book-category").textContent = firstItem.category || "Sách cũ";

    const existingReview = getExistingReviewForOrder(order, orderIndex);
    if (existingReview) {
        selectedRating = Number(existingReview.rating || existingReview.stars || 4);
        uploadedImageData = existingReview.reviewImage || "";

        const contentInput = document.getElementById("review-content-input");
        const submitButton = document.querySelector(".submit-review-btn");

        if (contentInput) contentInput.value = existingReview.content || existingReview.comment || "";
        if (submitButton) submitButton.textContent = "Cập nhật đánh giá";
    }
}

function updateStarDisplay(rating) {
    const starButtons = document.querySelectorAll(".star-btn");

    starButtons.forEach(button => {
        const buttonRating = Number(button.dataset.rating);
        const icon = button.querySelector("i");

        if (buttonRating <= rating) {
            button.classList.add("active");
            icon.classList.remove("far");
            icon.classList.add("fas");
        } else {
            button.classList.remove("active");
            icon.classList.remove("fas");
            icon.classList.add("far");
        }
    });
}

function initStarSelect() {
    const starButtons = document.querySelectorAll(".star-btn");

    starButtons.forEach(button => {
        button.addEventListener("click", function () {
            selectedRating = Number(button.dataset.rating);
            updateStarDisplay(selectedRating);

            const ratingError = document.getElementById("rating-error");
            if (ratingError) ratingError.textContent = "";
        });
    });

    updateStarDisplay(selectedRating);
}

function initImageUpload() {
    const input = document.getElementById("review-image-input");
    const previewBox = document.getElementById("preview-image-box");
    const previewImage = document.getElementById("preview-image");

    if (!input || !previewBox || !previewImage) return;

    input.addEventListener("change", function () {
        const file = input.files[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Vui lòng chọn file hình ảnh.");
            input.value = "";
            return;
        }

        const reader = new FileReader();

        reader.onload = function (event) {
            uploadedImageData = event.target.result;
            previewImage.src = uploadedImageData;
            previewBox.classList.add("show");
        };

        reader.readAsDataURL(file);
    });
}

function setReviewMessage(message, type) {
    const messageBox = document.getElementById("review-message");

    if (!messageBox) return;

    messageBox.textContent = message;
    messageBox.classList.remove("success", "error");

    if (type) {
        messageBox.classList.add(type);
    }
}

function validateReviewForm() {
    const contentInput = document.getElementById("review-content-input");
    const contentError = document.getElementById("content-error");
    const ratingError = document.getElementById("rating-error");

    let isValid = true;

    if (contentError) contentError.textContent = "";
    if (ratingError) ratingError.textContent = "";

    if (!selectedRating || selectedRating < 1) {
        if (ratingError) {
            ratingError.textContent = "Vui lòng chọn số sao đánh giá.";
        }

        isValid = false;
    }

    const contentValue = contentInput.value.trim();

    if (!contentValue) {
        if (contentError) {
            contentError.textContent = "Vui lòng nhập cảm nhận của bạn.";
        }

        isValid = false;
    } else if (contentValue.length < 10) {
        if (contentError) {
            contentError.textContent = "Cảm nhận nên có ít nhất 10 ký tự.";
        }

        isValid = false;
    }

    return isValid;
}

function saveReview() {
    const { order, orderIndex } = getReviewOrder();

    if (!order || !order.items || order.items.length === 0) {
        setReviewMessage("Không tìm thấy đơn hàng cần đánh giá.", "error");
        return;
    }

    if (!validateReviewForm()) return;

    const firstItem = order.items[0];
    const contentInput = document.getElementById("review-content-input");

    const reviews = getReviewsFromStorage();
    const existingReviewIndex = reviews.findIndex(review => {
        const sameCode = review.orderCode && review.orderCode === getOrderCode(order, orderIndex);
        const sameIndex = Number(review.orderIndex) === Number(orderIndex);
        const sameBook = Number(review.bookId) === Number(firstItem.id);

        return sameBook && (sameCode || sameIndex);
    });

    const newReview = {
        id: existingReviewIndex >= 0 ? reviews[existingReviewIndex].id : "review_" + Date.now(),
        orderIndex,
        orderCode: getOrderCode(order, orderIndex),
        bookId: firstItem.id,
        bookName: firstItem.name,
        author: firstItem.author || "",
        image: firstItem.image || "",
        user: getCurrentReviewerName(order),
        stars: selectedRating,
        comment: contentInput.value.trim(),
        rating: selectedRating,
        content: contentInput.value.trim(),
        reviewImage: uploadedImageData,
        createdAt: existingReviewIndex >= 0 ? reviews[existingReviewIndex].createdAt : new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    if (existingReviewIndex >= 0) {
        reviews[existingReviewIndex] = newReview;
    } else {
        reviews.unshift(newReview);
    }

    saveReviewsToStorage(reviews);

    setReviewMessage("Cảm ơn bạn đã gửi đánh giá. Đang quay lại đơn hàng của tôi...", "success");

    setTimeout(function () {
        window.location.href = "my_order.html";
    }, 1000);
}

function initReviewForm() {
    const form = document.getElementById("review-form");

    if (!form) return;

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        saveReview();
    });

    const contentInput = document.getElementById("review-content-input");

    if (contentInput) {
        contentInput.addEventListener("input", function () {
            const contentError = document.getElementById("content-error");
            if (contentError) contentError.textContent = "";
        });
    }
}

document.addEventListener("DOMContentLoaded", function () {
    renderReviewPage();
    initStarSelect();
    initImageUpload();
    initReviewForm();

    setTimeout(function () {
        updateHeaderCartBadge();
    }, 300);
});
