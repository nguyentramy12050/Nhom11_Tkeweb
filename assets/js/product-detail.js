// 1. LẤY ID TỪ URL
const urlParams = new URLSearchParams(window.location.search);
const bookId = parseInt(urlParams.get('id'));

// 2. TÌM SÁCH TRONG data.js
const book = booksData.find(b => b.id === bookId);

// 3. ĐỔ DỮ LIỆU ĐỘNG VÀO HTML
if (book) {
    document.getElementById('detail-title').innerText = book.name.toUpperCase();
    document.getElementById('detail-author').innerText = book.author;
    document.getElementById('detail-price').innerText = book.price + "đ";
    
    // Đổ Thể loại, Năm XB, Nhà XB
    if (document.getElementById('detail-category')) document.getElementById('detail-category').innerText = book.category;
    if (document.getElementById('detail-year')) document.getElementById('detail-year').innerText = book.year;
    if (document.getElementById('detail-publisher')) document.getElementById('detail-publisher').innerText = book.publisher;
    
    // Đổ Mô tả từ data.js
    if (document.getElementById('detail-description')) {
        document.getElementById('detail-description').innerText = book.description;
    }
    
    // Đổ hình ảnh
    document.getElementById('detail-img').src = "assets/images/books/" + book.image;
    const thumbnails = document.querySelectorAll('.thumb');
    thumbnails.forEach(thumb => {
        thumb.src = "assets/images/books/" + book.image;
    });
}
if (book) {
    // 1. Đổ dữ liệu chữ
    document.getElementById('detail-title').innerText = book.name.toUpperCase();
    document.getElementById('detail-author').innerText = book.author;
    document.getElementById('detail-price').innerText = book.price + "đ";
    document.getElementById('detail-category').innerText = book.category;
    document.getElementById('detail-year').innerText = book.year;
    document.getElementById('detail-publisher').innerText = book.publisher;
    document.getElementById('detail-description').innerText = book.description;

   // 2. Đổ dữ liệu sao đánh giá
    const ratingContainer = document.getElementById('detail-rating');
    if (ratingContainer) {
        ratingContainer.innerHTML = ''; // Xóa sạch nội dung cũ (bao gồm cả chữ "Đang tải...")
        
        // Sử dụng giá trị mặc định là 5 nếu chẳng may quên điền rating
        const rating = book.rating || 5; 
        
        for (let i = 1; i <= 5; i++) {
            const star = document.createElement('i');
            // Dùng font-awesome: fas fa-star là sao đặc, far fa-star là sao rỗng
            star.className = i <= rating ? 'fas fa-star' : 'far fa-star';
            star.style.color = "#f1c40f"; // Màu vàng cam cố định
            star.style.marginRight = "2px"; // Khoảng cách giữa các sao
            ratingContainer.appendChild(star);
        }
        
        // Thêm chữ số đánh giá bên cạnh
        const countSpan = document.createElement('span');
        countSpan.style.marginLeft = "8px";
        countSpan.style.color = "var(--text-muted)";
        countSpan.innerText = `(${rating} sao)`;
        ratingContainer.appendChild(countSpan);
    }

    // 3. Đổ ảnh
    document.getElementById('detail-img').src = "assets/images/books/" + book.image;
}

// 4. CHỨC NĂNG ZOOM ẢNH
const zoomImg = document.getElementById('detail-img');
zoomImg.addEventListener('click', function() {
    // Tạo một lớp phủ full màn hình để hiển thị ảnh to
    const overlay = document.createElement('div');
    overlay.style.cssText = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); display:flex; justify-content:center; align-items:center; z-index:9999;";
    
    const bigImg = document.createElement('img');
    bigImg.src = zoomImg.src;
    bigImg.style.maxHeight = "90%";
    
    overlay.appendChild(bigImg);
    overlay.onclick = () => overlay.remove(); // Bấm vào là đóng
    document.body.appendChild(overlay);
});

// Các hàm tăng giảm số lượng giữ nguyên...

// 5. HÀM TĂNG/GIẢM SỐ LƯỢNG
function increaseQty() {
    let qtyInput = document.getElementById('qty');
    let currentVal = parseInt(qtyInput.value);
    if (!isNaN(currentVal)) {
        qtyInput.value = currentVal + 1;
    }
}

function decreaseQty() {
    let qtyInput = document.getElementById('qty');
    let currentVal = parseInt(qtyInput.value);
    if (!isNaN(currentVal) && currentVal > 1) {
        qtyInput.value = currentVal - 1;
    }
}

// 6. TỰ ĐỘNG ĐỔ SÁCH GỢI Ý CÙNG THỂ LOẠI (GIỐNG HỆT TRANG DANH MỤC)
if (book) {
    const relatedGrid = document.getElementById('related-books-grid');
    
    if (relatedGrid) {
        let relatedBooks = booksData.filter(b => b.category === book.category && b.id !== book.id);
        relatedBooks = relatedBooks.slice(0, 4);
        
        relatedGrid.innerHTML = '';
        
        if (relatedBooks.length === 0) {
            relatedGrid.innerHTML = '<p style="grid-column: 1/-1; color: #666;">Chưa có sách cùng thể loại.</p>';
        } else {
            relatedBooks.forEach(rBook => {
                let cardHTML = `
                    <div class="book-card">
                        <div class="book-img-wrapper">
                            <a href="product-detail.html?id=${rBook.id}">
                                <img src="assets/images/books/${rBook.image}" alt="${rBook.name}" onerror="this.src='assets/images/logo.jpg'">
                            </a>
                            <div class="hover-overlay">
                                <a href="cart.html" class="action-btn cart-btn" title="Thêm vào giỏ"><i class="fas fa-shopping-cart"></i></a>
                                <a href="#" class="action-btn" title="Yêu thích"><i class="far fa-heart"></i></a>
                                <a href="product-detail.html?id=${rBook.id}" class="action-btn" title="Xem chi tiết"><i class="far fa-eye"></i></a>
                            </div>
                        </div>
                        
                        <div class="book-info">
                            <h4 class="book-name" title="${rBook.name}">${rBook.name}</h4>
                            <p class="book-author">${rBook.author}</p>
                            <div class="book-price-row">
                                <span class="book-price">${rBook.price}đ</span>
                                <span class="book-old-price">${rBook.oldPrice}đ</span>
                            </div>
                            <button class="btn-buy-now" onclick="window.location.href='cart.html'">
                                <i class="fas fa-cart-plus"></i> Mua ngay
                            </button>
                        </div>
                    </div>
                `;
                relatedGrid.innerHTML += cardHTML;
            });
        }
    }
}