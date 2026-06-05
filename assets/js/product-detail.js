// Lấy id sách từ URL để biết cần hiển thị chi tiết cuốn nào.
const urlParams = new URLSearchParams(window.location.search);
const bookId = parseInt(urlParams.get('id'), 10);
const REVIEWS_KEY = 'reviews';

// Tìm sách trong dữ liệu chung data.js.
const book = booksData.find(item => item.id === bookId);

// Đọc các đánh giá người dùng đã gửi và lưu trong localStorage.
function getLocalReviewsFromStorage() {
    try {
        const rawReviews = localStorage.getItem(REVIEWS_KEY);
        const reviews = rawReviews ? JSON.parse(rawReviews) : [];

        return Array.isArray(reviews) ? reviews : [];
    } catch (error) {
        return [];
    }
}

// Gộp đánh giá mẫu trong data.js với đánh giá thật người dùng đã gửi cho cuốn sách hiện tại.
function layDanhGiaCuaSach(currentBook) {
    const dataReviews = Array.isArray(currentBook?.reviews) ? currentBook.reviews : [];
    const userReviews = getLocalReviewsFromStorage()
        .filter(review => Number(review.bookId) === Number(currentBook?.id))
        .map(review => ({
            user: review.user || 'Khách hàng',
            stars: Number(review.rating || review.stars || 0),
            comment: review.content || review.comment || 'Người dùng chưa để lại nhận xét.'
        }));

    return [...userReviews, ...dataReviews];
}

// Chuyển chuỗi thành nội dung an toàn trước khi đưa vào HTML.
function escapeHtml(value) {
    return String(value || '')
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}

// Tạo chuỗi icon sao dựa trên điểm đánh giá truyền vào.
function renderStars(rating) {
    const safeRating = Number(rating || 0);
    let starsHtml = '';

    for (let i = 1; i <= 5; i++) {
        if (safeRating >= i) {
            starsHtml += '<i class="fas fa-star"></i>';
        } else if (safeRating >= i - 0.5) {
            starsHtml += '<i class="fas fa-star-half-alt"></i>';
        } else {
            starsHtml += '<i class="far fa-star"></i>';
        }
    }

    return starsHtml;
}

// Tính điểm sao trung bình từ danh sách đánh giá trong data.js.
function tinhRatingTrungBinh(currentBook) {
    const reviews = layDanhGiaCuaSach(currentBook);

    if (reviews.length === 0) {
        return Number(currentBook?.rating || 0);
    }

    const totalStars = reviews.reduce((sum, review) => {
        return sum + Number(review.stars || 0);
    }, 0);

    return totalStars / reviews.length;
}

// Đổ phần sao đánh giá ở khu vực thông tin chính của sản phẩm.
function renderProductRating(currentBook) {
    const ratingContainer = document.getElementById('detail-rating');
    if (!ratingContainer) return;

    const averageRating = tinhRatingTrungBinh(currentBook);
    ratingContainer.innerHTML = `
        ${renderStars(averageRating)}
        <span>(${averageRating.toFixed(1)} <i class="fas fa-star rating-inline-star"></i>)</span>
    `;
}

// Đổ dữ liệu mô tả, giá, tác giả, ảnh và thông tin xuất bản của sách.
function renderBookDetail(currentBook) {
    if (!currentBook) return;

    document.getElementById('detail-title').innerText = currentBook.name.toUpperCase();
    document.getElementById('detail-author').innerText = currentBook.author;
    document.getElementById('detail-price').innerText = currentBook.price + 'đ';
    document.getElementById('detail-category').innerText = currentBook.category;
    document.getElementById('detail-year').innerText = currentBook.year;
    document.getElementById('detail-publisher').innerText = currentBook.publisher;
    document.getElementById('detail-description').innerText = currentBook.description;
    document.getElementById('detail-img').src = 'assets/images/books/' + currentBook.image;

    renderProductRating(currentBook);
}

// Đổ danh sách lượt đánh giá của người dùng vào tab Đánh giá.
function renderReviews(currentBook) {
    const reviewAverage = document.getElementById('review-average');
    const reviewCount = document.getElementById('review-count');
    const reviewStars = document.getElementById('review-average-stars');
    const reviewBreakdown = document.getElementById('review-breakdown');
    const reviewList = document.getElementById('review-list');
    const reviews = layDanhGiaCuaSach(currentBook);
    const averageRating = tinhRatingTrungBinh(currentBook);

    if (reviewAverage) reviewAverage.textContent = averageRating.toFixed(1);
    if (reviewCount) reviewCount.textContent = reviews.length;
    if (reviewStars) reviewStars.innerHTML = renderStars(averageRating);
    if (reviewBreakdown) {
        reviewBreakdown.innerHTML = taoThongKeSao(reviews);
    }

    if (!reviewList) return;

    if (reviews.length === 0) {
        reviewList.innerHTML = '<p class="review-empty">Sản phẩm này chưa có đánh giá.</p>';
        return;
    }

    reviewList.innerHTML = reviews.map(review => {
        const stars = Number(review.stars || 0);

        return `
            <article class="review-card">
                <div class="review-card-header">
                    <strong class="review-user">${escapeHtml(review.user || 'Khách hàng')}</strong>
                    <span class="review-stars">${renderStars(stars)}</span>
                </div>
                <p class="review-comment">${escapeHtml(review.comment || 'Người dùng chưa để lại nhận xét.')}</p>
            </article>
        `;
    }).join('');
}

// Tạo thanh thống kê số lượng đánh giá theo từng mức sao.
function taoThongKeSao(reviews) {
    const totalReviews = reviews.length || 1;

    return [5, 4, 3, 2, 1].map(starLevel => {
        const count = reviews.filter(review => Math.round(Number(review.stars || 0)) === starLevel).length;
        const percent = (count / totalReviews) * 100;

        return `
            <div class="review-breakdown-row">
                <span>${starLevel} sao</span>
                <div class="review-bar-track">
                    <div class="review-bar-fill" style="width: ${percent}%"></div>
                </div>
            </div>
        `;
    }).join('');
}

// Chuyển đổi giữa tab Mô tả và tab Đánh giá.
function initDetailTabs() {
    const tabButtons = document.querySelectorAll('.detail-tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.dataset.tab;

            tabButtons.forEach(item => {
                const isActive = item === button;
                item.classList.toggle('active', isActive);
                item.setAttribute('aria-selected', String(isActive));
            });

            tabPanels.forEach(panel => {
                panel.classList.toggle('active', panel.id === `${tabName}-panel`);
            });
        });
    });
}

// Mở ảnh sách ở kích thước lớn khi người dùng bấm vào ảnh chính.
function initImageZoom() {
    const zoomImg = document.getElementById('detail-img');
    if (!zoomImg) return;

    zoomImg.addEventListener('click', function () {
        const overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); display:flex; justify-content:center; align-items:center; z-index:9999;';

        const bigImg = document.createElement('img');
        bigImg.src = zoomImg.src;
        bigImg.alt = zoomImg.alt;
        bigImg.style.maxHeight = '90%';
        bigImg.style.maxWidth = '90%';

        overlay.appendChild(bigImg);
        overlay.onclick = () => overlay.remove();
        document.body.appendChild(overlay);
    });
}

// Tăng số lượng sách trước khi thêm vào giỏ hàng.
function increaseQty() {
    const qtyInput = document.getElementById('qty');
    const currentVal = parseInt(qtyInput.value, 10);

    if (!isNaN(currentVal)) {
        qtyInput.value = currentVal + 1;
    }
}

// Giảm số lượng sách nhưng không cho nhỏ hơn 1.
function decreaseQty() {
    const qtyInput = document.getElementById('qty');
    const currentVal = parseInt(qtyInput.value, 10);

    if (!isNaN(currentVal) && currentVal > 1) {
        qtyInput.value = currentVal - 1;
    }
}

// Đọc giỏ hàng từ localStorage.
function getCartFromStorage() {
    try {
        const rawCart = localStorage.getItem('cart');
        const cart = rawCart ? JSON.parse(rawCart) : [];
        return Array.isArray(cart) ? cart : [];
    } catch (error) {
        return [];
    }
}

// Lưu giỏ hàng mới vào localStorage.
function saveCartToStorage(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Cập nhật số lượng trên icon giỏ hàng ở header.
function updateHeaderCartBadge() {
    const badge = document.getElementById('so-gio-hang');
    if (!badge) return;

    const totalQuantity = getCartFromStorage().reduce((sum, item) => {
        return sum + Number(item.quantity || item.qty || 1);
    }, 0);

    badge.textContent = totalQuantity;
    badge.classList.toggle('an', totalQuantity === 0);
}

// Thêm cuốn sách hiện tại vào giỏ hàng, có thể chuyển thẳng sang trang giỏ hàng.
function addCurrentBookToCart(redirectToCart = false) {
    if (!book) return;

    const qtyInput = document.getElementById('qty');
    const quantity = Math.max(1, parseInt(qtyInput?.value || '1', 10) || 1);
    const cart = getCartFromStorage();
    const existingItem = cart.find(item => Number(item.id || item.bookId) === Number(book.id));

    if (existingItem) {
        existingItem.id = Number(book.id);
        existingItem.quantity = Number(existingItem.quantity || existingItem.qty || 0) + quantity;
        delete existingItem.qty;
        delete existingItem.bookId;
    } else {
        cart.push({
            id: Number(book.id),
            quantity
        });
    }

    saveCartToStorage(cart);
    updateHeaderCartBadge();

    if (redirectToCart) {
        window.location.href = 'cart.html';
        return;
    }

    const continueShopping = confirm('Đã thêm sách vào giỏ! Bạn muốn thanh toán ngay không?\n- Chọn OK để đến Giỏ hàng.\n- Chọn Cancel để tiếp tục xem sách.');
    if (continueShopping) {
        window.location.href = 'cart.html';
    }
}

// Gắn sự kiện cho các nút thêm giỏ hàng và mua ngay.
function initCartButtons() {
    const addCartBtn = document.querySelector('.btn-add-cart');
    const buyNowDetailBtn = document.querySelector('.btn-buy-now-detail');

    if (addCartBtn) {
        addCartBtn.addEventListener('click', () => addCurrentBookToCart(false));
    }

    if (buyNowDetailBtn) {
        buyNowDetailBtn.addEventListener('click', event => {
            event.preventDefault();
            addCurrentBookToCart(true);
        });
    }
}

// Đổ sách gợi ý cùng thể loại với sách hiện tại.
function renderRelatedBooks(currentBook) {
    const relatedGrid = document.getElementById('related-books-grid');
    if (!relatedGrid || !currentBook) return;

    const relatedBooks = booksData
        .filter(item => item.category === currentBook.category && item.id !== currentBook.id)
        .slice(0, 4);

    if (relatedBooks.length === 0) {
        relatedGrid.innerHTML = '<p style="grid-column: 1/-1; color: #666;">Chưa có sách cùng thể loại.</p>';
        return;
    }

    relatedGrid.innerHTML = relatedBooks.map(relatedBook => `
        <div class="book-card">
            <div class="book-img-wrapper">
                <a href="product-detail.html?id=${relatedBook.id}">
                    <img src="assets/images/books/${relatedBook.image}" alt="${escapeHtml(relatedBook.name)}" onerror="this.src='assets/images/logo.jpg'">
                </a>
                <div class="hover-overlay">
                    <a href="cart.html" class="action-btn cart-btn" title="Thêm vào giỏ"><i class="fas fa-shopping-cart"></i></a>
                    <a href="product-detail.html?id=${relatedBook.id}" class="action-btn" title="Xem chi tiết"><i class="far fa-eye"></i></a>
                </div>
            </div>

            <div class="book-info">
                <h4 class="book-name" title="${escapeHtml(relatedBook.name)}">${escapeHtml(relatedBook.name)}</h4>
                <p class="book-author">${escapeHtml(relatedBook.author)}</p>
                <div class="book-price-row">
                    <span class="book-price">${relatedBook.price}đ</span>
                    <span class="book-old-price">${relatedBook.oldPrice}đ</span>
                </div>
                <button class="btn-buy-now" onclick="window.location.href='cart.html'">
                    <i class="fas fa-cart-plus"></i> Mua ngay
                </button>
            </div>
        </div>
    `).join('');
}

// Khởi tạo toàn bộ trang chi tiết sản phẩm.
function initProductDetailPage() {
    if (!book) return;

    renderBookDetail(book);
    renderReviews(book);
    renderRelatedBooks(book);
    initDetailTabs();
    initImageZoom();
    initCartButtons();
    updateHeaderCartBadge();
}

initProductDetailPage();
