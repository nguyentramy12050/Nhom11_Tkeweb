// ==========================================
// 1. KHỞI TẠO VÀ XỬ LÝ TÌM KIẾM TỪ TRANG CHỦ
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
    // Tự động lấy danh sách Tác giả từ data.js đổ vào dropdown
    populateAuthors();

    const urlParams = new URLSearchParams(window.location.search);
    const tuKhoa = urlParams.get('q');

    if (tuKhoa) {
        // Lọc sách khớp tên / tác giả / thể loại
        filteredBooks = booksData.filter(book => {
            const q = tuKhoa.toLowerCase();
            return book.name.toLowerCase().includes(q)
                || book.author.toLowerCase().includes(q)
                || book.category.toLowerCase().includes(q);
        });

        // Cập nhật tiêu đề trang
        const tieuDe = document.querySelector('.page-title');
        if (tieuDe) tieuDe.textContent = `Kết quả: "${tuKhoa}"`;

        // Bỏ active ở sidebar, không lọc theo category nữa
        document.querySelectorAll('.category-list a').forEach(a => a.classList.remove('active-cat'));

        // Hiển thị kết quả
        currentPage = 1;
        renderBooks(currentPage);
        renderPagination();

        // Hiển thị thông báo số kết quả
        const bookGrid = document.getElementById('book-grid');
        const thongBao = document.createElement('p');
        thongBao.style.cssText = 'grid-column:1/-1; color:#9c7d5f; font-size:13px; margin-bottom:8px; font-style:italic;';
        thongBao.textContent = `Tìm thấy ${filteredBooks.length} sách cho từ khóa "${tuKhoa}"`;
        bookGrid.insertAdjacentElement('beforebegin', thongBao);
    } else {
        // Nếu không có từ khóa tìm kiếm thì chạy bộ lọc mặc định
        applyAllFilters();
    }
});

// ==========================================
// 2. BIẾN TRẠNG THÁI VÀ CẤU HÌNH
// ==========================================
let filteredBooks = [...booksData]; 
const itemsPerPage = 12;
let currentPage = 1;

// Lưu trữ trạng thái bộ lọc đang được chọn
let currentCategory = 'all';
let currentPriceTier = 'all';

// Hàm phụ trợ: Ép kiểu giá từ chuỗi (VD: "185.000") thành số (185000)
const parsePrice = (priceStr) => parseInt(priceStr.replace(/\./g, ''));

// ==========================================
// 3. HÀM TỰ ĐỘNG LẤY TÁC GIẢ TỪ DATA.JS
// ==========================================
function populateAuthors() {
    const authorSelect = document.getElementById('author-filter');
    if (!authorSelect) return;

    // Lấy danh sách các tác giả (không trùng lặp) và sắp xếp A-Z
    const authors = [...new Set(booksData.map(book => book.author))].sort();
    
    authors.forEach(author => {
        const option = document.createElement('option');
        option.value = author;
        option.textContent = author;
        authorSelect.appendChild(option);
    });

    // Lắng nghe sự kiện khi người dùng chọn tác giả khác
    authorSelect.addEventListener('change', applyAllFilters);
}

// ==========================================
// 4. CÁC HÀM XỬ LÝ LỌC
// ==========================================

// Khi click vào menu thể loại
function filterByCategory(categoryName, element, event) {
    if(event) event.preventDefault(); 

    // Đổi màu menu
    const allLinks = document.querySelectorAll('.category-list a');
    allLinks.forEach(link => link.classList.remove('active-cat'));
    if(element) element.classList.add('active-cat');

    // Cập nhật biến thể loại và chạy bộ lọc tổng
    currentCategory = categoryName;
    applyAllFilters();
}

// Khi click vào các nút tròn phân khúc giá
function filterByPrice(tier) {
    currentPriceTier = tier;
    applyAllFilters();
}

// BỘ LỌC TỔNG (Kết hợp Thể loại + Mức giá + Tác giả)
function applyAllFilters() {
    let tempBooks = [...booksData];

    // 4.1 Lọc theo Thể loại
    if (currentCategory !== 'all') {
        tempBooks = tempBooks.filter(book => book.category === currentCategory);
    }

    // 4.2 Lọc theo Mức giá
    if (currentPriceTier !== 'all') {
        tempBooks = tempBooks.filter(book => {
            let priceNum = parsePrice(book.price);
            
            if (currentPriceTier === 'tier1') {
                return priceNum < 150000;
            } else if (currentPriceTier === 'tier2') {
                return priceNum >= 150000 && priceNum <= 300000;
            } else if (currentPriceTier === 'tier3') {
                return priceNum > 300000;
            }
            return true;
        });
    }

    // 4.3 Lọc theo Tác giả
    const authorSelect = document.getElementById('author-filter');
    if (authorSelect && authorSelect.value !== 'all') {
        tempBooks = tempBooks.filter(book => book.author === authorSelect.value);
    }

    // Gán kết quả vào mảng hiển thị và vẽ lại giao diện
    filteredBooks = tempBooks;
    currentPage = 1;
    renderBooks(currentPage);
    renderPagination();
}

// ==========================================
// 5. HÀM RENDER SÁCH VÀ PHÂN TRANG
// ==========================================
function renderBooks(page) {
    const bookGrid = document.getElementById("book-grid");
    bookGrid.innerHTML = ""; 

    if (filteredBooks.length === 0) {
        bookGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); font-size: 16px; margin-top: 20px;">Không tìm thấy sách phù hợp với bộ lọc của bạn.</p>`;
        return;
    }

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const booksToShow = filteredBooks.slice(startIndex, endIndex);

    booksToShow.forEach(book => {
        let badgeHTML = "";
        if (book.badge) {
            badgeHTML = `<span class="badge ${book.badgeClass}">${book.badge}</span>`;
        }

        const bookCard = `
            <div class="book-card">
                <div class="book-img-wrapper">
                    <a href="product-detail.html?id=${book.id}">
                        ${badgeHTML}
                        <img src="assets/images/books/${book.image}" alt="${book.name}" onerror="this.src='assets/images/logo.jpg'">
                    </a>
                    <div class="hover-overlay">
                        <a href="cart.html" class="action-btn cart-btn" title="Thêm vào giỏ"><i class="fas fa-shopping-cart"></i></a>
                        <a href="#" class="action-btn" title="Yêu thích"><i class="far fa-heart"></i></a>
                        <a href="product-detail.html?id=${book.id}" class="action-btn" title="Xem chi tiết"><i class="far fa-eye"></i></a>
                    </div>
                </div>
                
                <div class="book-info">
                    <h4 class="book-name" title="${book.name}">${book.name}</h4>
                    <p class="book-author">${book.author}</p>
                    <div class="book-price-row">
                        <span class="book-price">${book.price}đ</span>
                        <span class="book-old-price">${book.oldPrice}đ</span>
                    </div>
                    <button class="btn-buy-now" onclick="window.location.href='cart.html'">
                        <i class="fas fa-cart-plus"></i> Mua ngay
                    </button>
                </div>
            </div>
        `;
        bookGrid.innerHTML += bookCard;
    });
}

function renderPagination() {
    const paginationDiv = document.getElementById("pagination");
    paginationDiv.innerHTML = ""; 

    const totalPages = Math.ceil(filteredBooks.length / itemsPerPage); 

    if (totalPages <= 1) return;

    if (currentPage > 1) {
        paginationDiv.innerHTML += `<a href="#" class="page-nav" onclick="changePage(${currentPage - 1}, event)">&lsaquo;</a>`;
    }

    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            let activeClass = (i === currentPage) ? "active" : "";
            paginationDiv.innerHTML += `<a href="#" class="page-num ${activeClass}" onclick="changePage(${i}, event)">${i}</a>`;
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            paginationDiv.innerHTML += `<span class="page-dots">...</span>`;
        }
    }

    if (currentPage < totalPages) {
        paginationDiv.innerHTML += `<a href="#" class="page-nav" onclick="changePage(${currentPage + 1}, event)">&rsaquo;</a>`;
    }
}

function changePage(pageNumber, event) {
    if(event) event.preventDefault(); 
    currentPage = pageNumber; 
    renderBooks(currentPage); 
    renderPagination();       
    window.scrollTo({ top: 250, behavior: 'smooth' }); 
}