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

function renderReviewPage() {
    const emptyBox = document.getElementById("review-empty");
    const contentBox = document.getElementById("review-content");

    const { order } = getReviewOrder();

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

    const newReview = {
        id: "review_" + Date.now(),
        orderIndex,
        orderCode: order.code || "",
        bookId: firstItem.id,
        bookName: firstItem.name,
        author: firstItem.author || "",
        image: firstItem.image || "",
        rating: selectedRating,
        content: contentInput.value.trim(),
        reviewImage: uploadedImageData,
        createdAt: new Date().toISOString()
    };

    reviews.unshift(newReview);
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
