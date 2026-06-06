// ==========================================
// 1. KHỞI TẠO VÀ XỬ LÝ TÌM KIẾM TỪ TRANG CHỦ
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
    populateAuthors();
    populatePublishers();
    updateCartBadge();

    const urlParams = new URLSearchParams(window.location.search);
    const theLoaiTuHeader = urlParams.get('category');
    const tuKhoa = urlParams.get('q');
    const theLoaiTimThay = timTheLoaiTheoTuKhoa(theLoaiTuHeader || tuKhoa || '');

    if (theLoaiTimThay) {
        chonTheLoaiTuUrl(theLoaiTimThay);
        applyAllFilters();
    } else if (tuKhoa) {
        // Lọc sách khớp tên / tác giả / thể loại
        filteredBooks = booksData.filter(book => {
            const q = tuKhoa.toLowerCase();
            return book.name.toLowerCase().includes(q)
                || book.author.toLowerCase().includes(q)
                || book.category.toLowerCase().includes(q);
        });

        // Bỏ trạng thái sáng ở sidebar khi tìm theo tên sách hoặc tác giả.
        document.querySelectorAll('.category-list a').forEach(a => a.classList.remove('active-cat'));

        // Hiển thị kết quả
        currentPage = 1;
        renderBooks(currentPage);
        renderPagination();
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
const CART_KEY = "cart";

// Chuẩn hóa chữ để so sánh tên thể loại không bị lệch do hoa/thường hoặc khoảng trắng.
function chuanHoaChuoi(value) {
    return String(value || '')
        .trim()
        .replace(/\s+/g, ' ')
        .toLocaleLowerCase('vi-VN');
}

// Tạo slug không dấu viết liền để đọc URL như vanhockinhdien, lichsuvavanminh...
function taoSlugTheLoai(value) {
    return chuanHoaChuoi(value)
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/[^a-z0-9]/g, '');
}

// Tìm tên thể loại đúng trong dữ liệu sách dựa trên từ khóa từ URL hoặc ô tìm kiếm.
function timTheLoaiTheoTuKhoa(keyword) {
    const tuKhoaChuan = chuanHoaChuoi(keyword);
    const slugTuKhoa = taoSlugTheLoai(keyword);
    if (!tuKhoaChuan) return null;

    const danhSachTheLoai = [...new Set(booksData.map(book => book.category))];
    return danhSachTheLoai.find(category => {
        return chuanHoaChuoi(category) === tuKhoaChuan
            || taoSlugTheLoai(category) === slugTuKhoa;
    }) || null;
}

// Bật sáng đúng mục thể loại trong sidebar khi người dùng đi từ dropdown header hoặc tìm kiếm.
function chonTheLoaiTuUrl(categoryName) {
    currentCategory = categoryName;

    document.querySelectorAll('.category-list a').forEach(link => {
        const tenHienThi = chuanHoaChuoi(link.textContent);
        const laTatCaSach = chuanHoaChuoi(categoryName) === 'all' && tenHienThi === 'tất cả sách';
        const laTheLoaiDangChon = tenHienThi === chuanHoaChuoi(categoryName);

        link.classList.toggle('active-cat', laTatCaSach || laTheLoaiDangChon);
    });
}

function getCartFromStorage() {
    try {
        const rawCart = localStorage.getItem(CART_KEY);
        const cart = rawCart ? JSON.parse(rawCart) : [];

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

function updateCartBadge() {
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

function addToCart(bookId) {
    const cart = getCartFromStorage();
    const existingItem = cart.find(item => Number(item.id) === Number(bookId));

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: Number(bookId),
            quantity: 1
        });
    }

    saveCartToStorage(cart);
    updateCartBadge();
    showCartMessage("Đã thêm sách vào giỏ hàng.");
}

function buyNow(bookId) {
    addToCart(bookId);
    window.location.href = "cart.html";
}

function showCartMessage(message) {
    let toast = document.getElementById("cart-toast");

    if (!toast) {
        toast = document.createElement("div");
        toast.id = "cart-toast";
        toast.className = "cart-toast";
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 1800);
}
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
    taoDropdownLocTuyBien(authorSelect);
}

function populatePublishers() {
    const publisherSelect = document.getElementById('publisher-filter');
    if (!publisherSelect) return;

    // Lấy danh sách các nhà xuất bản (không trùng lặp) và sắp xếp A-Z
    const publishers = [...new Set(booksData.map(book => book.publisher))].sort();

    publishers.forEach(publisher => {
        const option = document.createElement('option');
        option.value = publisher;
        option.textContent = publisher;
        publisherSelect.appendChild(option);
    });

    // Lắng nghe sự kiện khi người dùng chọn nhà xuất bản khác
    publisherSelect.addEventListener('change', applyAllFilters);
    taoDropdownLocTuyBien(publisherSelect);
}

// Đóng các dropdown lọc đang mở, trừ dropdown được truyền vào nếu có.
function dongCacDropdownLoc(dropdownDangGiu) {
    document.querySelectorAll('.filter-dropdown.open').forEach(dropdown => {
        if (dropdown !== dropdownDangGiu) {
            dropdown.classList.remove('open');
        }
    });
}

// Cập nhật chữ hiển thị và trạng thái active trong dropdown tùy biến.
function capNhatDropdownLoc(selectElement, dropdown) {
    const label = dropdown.querySelector('.filter-dropdown-label');
    const selectedOption = selectElement.options[selectElement.selectedIndex];

    if (label && selectedOption) {
        label.textContent = selectedOption.textContent;
    }

    dropdown.querySelectorAll('.filter-dropdown-option').forEach(optionButton => {
        optionButton.classList.toggle('active', optionButton.dataset.value === selectElement.value);
    });
}

// Tạo dropdown tùy biến từ select gốc để dễ chỉnh giao diện và vẫn giữ logic lọc cũ.
function taoDropdownLocTuyBien(selectElement) {
    if (!selectElement || selectElement.dataset.dropdownReady) return;

    selectElement.dataset.dropdownReady = 'true';
    selectElement.classList.add('filter-select-hidden');

    const dropdown = document.createElement('div');
    dropdown.className = 'filter-dropdown';

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'filter-dropdown-button';
    button.innerHTML = '<span class="filter-dropdown-label"></span><i class="fas fa-caret-down"></i>';

    const menu = document.createElement('div');
    menu.className = 'filter-dropdown-menu';

    Array.from(selectElement.options).forEach(option => {
        const optionButton = document.createElement('button');
        optionButton.type = 'button';
        optionButton.className = 'filter-dropdown-option';
        optionButton.dataset.value = option.value;
        optionButton.textContent = option.textContent;

        optionButton.addEventListener('click', () => {
            selectElement.value = option.value;
            capNhatDropdownLoc(selectElement, dropdown);
            dropdown.classList.remove('open');
            selectElement.dispatchEvent(new Event('change', { bubbles: true }));
        });

        menu.appendChild(optionButton);
    });

    button.addEventListener('click', event => {
        event.stopPropagation();
        const dangMo = dropdown.classList.contains('open');
        dongCacDropdownLoc(dropdown);
        dropdown.classList.toggle('open', !dangMo);
    });

    dropdown.appendChild(button);
    dropdown.appendChild(menu);
    selectElement.insertAdjacentElement('afterend', dropdown);
    capNhatDropdownLoc(selectElement, dropdown);
}

// Đóng dropdown lọc khi người dùng bấm ra ngoài vùng dropdown.
document.addEventListener('click', () => {
    dongCacDropdownLoc();
});

// Đóng dropdown lọc khi người dùng nhấn phím Escape.
document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
        dongCacDropdownLoc();
    }
});

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

// BỘ LỌC TỔNG (Kết hợp Thể loại + Mức giá + Tác giả + Nhà xuất bản)
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

    // 4.4 Lọc theo Nhà xuất bản
    const publisherSelect = document.getElementById('publisher-filter');
    if (publisherSelect && publisherSelect.value !== 'all') {
        tempBooks = tempBooks.filter(book => book.publisher === publisherSelect.value);
    }

    // Gán kết quả vào mảng hiển thị và vẽ lại giao diện
    filteredBooks = tempBooks;
    currentPage = 1;
    renderBooks(currentPage);
    renderPagination();
}

function applyFilters() {
    applyAllFilters();
}

// ==========================================
// 5. HÀM RENDER SÁCH VÀ PHÂN TRANG
// ==========================================
function renderBooks(page) {
    const bookGrid = document.getElementById("book-grid");
    bookGrid.innerHTML = "";

    if (filteredBooks.length === 0) {
        bookGrid.innerHTML = `
            <p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); font-size: 16px; margin-top: 20px;">
                Không tìm thấy sách phù hợp với bộ lọc của bạn.
            </p>
        `;
        return;
    }

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const booksToShow = filteredBooks.slice(startIndex, endIndex);

    booksToShow.forEach(book => {
        const bookCard = `
            <div class="book-card">
                <div class="book-img-wrapper">
                    <a href="product-detail.html?id=${book.id}">
                        <img 
                            src="assets/images/books/${book.image}" 
                            alt="${book.name}" 
                            onerror="this.src='assets/images/logo.jpg'"
                        >
                    </a>

                    <div class="hover-overlay">
                        <button 
                            type="button"
                            class="action-btn cart-btn" 
                            title="Thêm vào giỏ"
                            onclick="addToCart(${book.id})"
                        >
                            <i class="fas fa-shopping-cart"></i>
                        </button>

                        <a href="product-detail.html?id=${book.id}" class="action-btn" title="Xem chi tiết">
                            <i class="far fa-eye"></i>
                        </a>
                    </div>
                </div>
                
                <div class="book-info">
                    <h4 class="book-name" title="${book.name}">${book.name}</h4>
                    <p class="book-author">${book.author}</p>

                    <div class="book-price-row">
                        <span class="book-price">${book.price}đ</span>
                        <span class="book-old-price">${book.oldPrice}đ</span>
                    </div>

                    <button class="btn-buy-now" onclick="buyNow(${book.id})">
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
