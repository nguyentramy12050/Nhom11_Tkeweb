// 1. MẢNG DỮ LIỆU 62 QUYỂN SÁCH 
const booksData = [
    // 1. Văn học kinh điển
    { id: 1, name: "Không Gia Đình", author: "Hector Malot", price: "200.000", image: "Khonggiadinh.jpg", badge: "", badgeClass: "" },
    { id: 2, name: "Những Người Khốn Khổ", author: "Victor Hugo", price: "250.000", image: "Nhungnguoikhonkho.jpg", badge: "RẤT TỐT", badgeClass: "badge-good" },
    { id: 3, name: "Bố Già", author: "Mario Puzo", price: "220.000", image: "Bogia.jpg", badge: "", badgeClass: "" },
    { id: 4, name: "Kiêu Hãnh Và Định Kiến", author: "Jane Austen", price: "180.000", image: "Kieuhanhvadinhkien.jpg", badge: "MỚI", badgeClass: "badge-new" },
    { id: 5, name: "Ông Già Và Biển Cả", author: "Ernest Hemingway", price: "120.000", image: "Onggiavabienca.jpg", badge: "", badgeClass: "" },
    { id: 6, name: "Ruồi Trâu", author: "Ethel Lilian Voynich", price: "140.000", image: "Ruoitrau.jpg", badge: "", badgeClass: "" },
    { id: 7, name: "Sông Đông Êm Đềm", author: "Mikhail Sholokhov", price: "300.000", image: "Songdongemdem.jpg", badge: "SƯU TẦM", badgeClass: "badge-rare" },
    { id: 8, name: "Jane Eyre", author: "Charlotte Brontë", price: "160.000", image: "Janeeyre.jpg", badge: "", badgeClass: "" },

    // 2. Văn học Việt Nam xưa
    { id: 9, name: "Dế Mèn Phiêu Lưu Ký", author: "Tô Hoài", price: "95.000", image: "Demenphieuluuky.jpg", badge: "MỚI", badgeClass: "badge-new" },
    { id: 10, name: "Tắt Đèn", author: "Ngô Tất Tố", price: "80.000", image: "Tatden.jpg", badge: "", badgeClass: "" },
    { id: 11, name: "Số Đỏ", author: "Vũ Trọng Phụng", price: "185.000", image: "SoDo.jpg", badge: "", badgeClass: "" },
    { id: 12, name: "Chí Phèo", author: "Nam Cao", price: "150.000", image: "ChiPheo.jpg", badge: "RẤT TỐT", badgeClass: "badge-good" },
    { id: 13, name: "Vợ Nhặt", author: "Kim Lân", price: "70.000", image: "Vonhat.jpg", badge: "", badgeClass: "" },
    { id: 14, name: "Tuổi Thơ Dữ Dội", author: "Phùng Quán", price: "210.000", image: "Tuoithodudoi.jpg", badge: "", badgeClass: "" },
    { id: 15, name: "Kính Vạn Hoa", author: "Nguyễn Nhật Ánh", price: "500.000", image: "Kinhvanhoa.jpg", badge: "SƯU TẦM", badgeClass: "badge-rare" },
    { id: 16, name: "Cho Tôi Xin Một Vé Đi Tuổi Thơ", author: "Nguyễn Nhật Ánh", price: "110.000", image: "Chotoixinmotvedituoitho.jpg", badge: "", badgeClass: "" },

    // 3. Triết học & Tư tưởng
    { id: 17, name: "Bàn Về Tự Do", author: "John Stuart Mill", price: "130.000", image: "Banvetudo.jpg", badge: "", badgeClass: "" },
    { id: 18, name: "Cộng Hòa — Plato", author: "Plato", price: "250.000", image: "Conghoa.jpg", badge: "", badgeClass: "" },
    { id: 19, name: "Đạo Đức Kinh", author: "Lão Tử", price: "220.000", image: "Daoduckinh.jpg", badge: "RẤT TỐT", badgeClass: "badge-good" },
    { id: 20, name: "Quân Vương", author: "Machiavelli", price: "140.000", image: "Quanvuong.jpg", badge: "", badgeClass: "" },
    { id: 21, name: "Thus Spoke Zarathustra", author: "Friedrich Nietzsche", price: "190.000", image: "Thus.jpg", badge: "", badgeClass: "" },
    { id: 22, name: "Thuyết Hiện Sinh Là Một Thuyết Nhân Bản", author: "Jean-Paul Sartre", price: "120.000", image: "Thuyethiensinhlamotthuyetnhanban.jpg", badge: "", badgeClass: "" }, 
    { id: 23, name: "Nghệ Thuật Yêu", author: "Erich Fromm", price: "110.000", image: "Nghethuatyeu.jpg", badge: "MỚI", badgeClass: "badge-new" },
    { id: 24, name: "Meditations", author: "Marcus Aurelius", price: "150.000", image: "Meditations.jpg", badge: "", badgeClass: "" },

    // 4. Lịch sử & Văn minh
    { id: 25, name: "Việt Nam Sử Lược", author: "Trần Trọng Kim", price: "3.500.000", image: "Vietnamsuluoc.jpg", badge: "SƯU TẦM", badgeClass: "badge-rare" },
    { id: 26, name: "Đại Việt Sử Ký Toàn Thư", author: "Ngô Sĩ Liên", price: "850.000", image: "Daivietsukytoanthu.jpg", badge: "RẤT TỐT", badgeClass: "badge-good" },
    { id: 27, name: "Sapiens", author: "Yuval Noah Harari", price: "350.000", image: "Sapiens.jpg", badge: "", badgeClass: "" },
    { id: 28, name: "Lược Sử Thời Gian", author: "Stephen Hawking", price: "180.000", image: "Luocsuthoigian.jpg", badge: "", badgeClass: "" },
    { id: 29, name: "Silk Roads", author: "Peter Frankopan", price: "320.000", image: "Silkroads.jpg", badge: "", badgeClass: "" },
    { id: 30, name: "SPQR", author: "Mary Beard", price: "280.000", image: "Spqr.jpg", badge: "", badgeClass: "" },
    { id: 31, name: "Guns, Germs and Steel", author: "Jared Diamond", price: "310.000", image: "Guns.jpg", badge: "MỚI", badgeClass: "badge-new" },
    { id: 32, name: "Chiến Tranh Và Hòa Bình", author: "Leo Tolstoy", price: "450.000", image: "Chientranhvahoabinh.jpg", badge: "", badgeClass: "" },

    // 5. Trinh thám kinh điển
    { id: 33, name: "Sherlock Holmes", author: "Arthur Conan Doyle", price: "180.000", image: "Sherlockholmes.jpg", badge: "", badgeClass: "" },
    { id: 34, name: "Siêu trộm Arsène Lupin", author: "Maurice Leblanc", price: "160.000", image: "Sieutromquantuarsenelupin.jpg", badge: "", badgeClass: "" },
    { id: 35, name: "Án Mạng Trên Chuyến Tàu Tốc Hành", author: "Agatha Christie", price: "140.000", image: "Anmangtrenchuyentautochanh.jpg", badge: "RẤT TỐT", badgeClass: "badge-good" },
    { id: 36, name: "Mười Người Da Đen Nhỏ", author: "Agatha Christie", price: "150.000", image: "Muoinguoidadennho.jpg", badge: "", badgeClass: "" },
    { id: 37, name: "Thời khắc định mệnh", author: "Agatha Christie", price: "130.000", image: "Thoikhacdinhmenh.jpg", badge: "", badgeClass: "" },
    { id: 38, name: "Tận cùng là cái chết", author: "Agatha Christie", price: "135.000", image: "Tancunglacaichet.jpg", badge: "", badgeClass: "" },
    { id: 39, name: "Hannibal", author: "Thomas Harris", price: "170.000", image: "Hannibal.jpg", badge: "", badgeClass: "" },
    { id: 40, name: "The Hound of Baskervilles", author: "Arthur Conan Doyle", price: "120.000", image: "TheHoundofBaskervilles.jpg", badge: "", badgeClass: "" },

    // 6. Thiếu nhi & tuổi thơ
    { id: 41, name: "Hoàng Tử Bé", author: "Antoine de Saint-Exupéry", price: "120.000", image: "Hoangtube.jpg", badge: "RẤT TỐT", badgeClass: "badge-good" },
    { id: 42, name: "Totto-chan Bên Cửa Sổ", author: "Tetsuko Kuroyanagi", price: "110.000", image: "Totto-chanbencuaso.jpg", badge: "", badgeClass: "" },
    { id: 43, name: "Charlie & Nhà Máy Chocolate", author: "Roald Dahl", price: "115.000", image: "Charlievanhamaychocolate.jpg", badge: "", badgeClass: "" },
    { id: 44, name: "Anne Tóc Đỏ Dưới Mái Nhà Bạch Dương", author: "L. M. Montgomery", price: "145.000", image: "Annetocdoduoimainhabachduong.jpg", badge: "", badgeClass: "" },
    { id: 45, name: "Heidi", author: "Johanna Spyri", price: "105.000", image: "Heidi.jpg", badge: "MỚI", badgeClass: "badge-new" },
    { id: 46, name: "Khu Vườn Bí Mật", author: "Frances Hodgson Burnett", price: "125.000", image: "Khuvuonbimat.jpg", badge: "", badgeClass: "" },

    // 7. Ngoại văn tuyển chọn
    { id: 47, name: "Norwegian Wood", author: "Haruki Murakami", price: "210.000", image: "Norwegianwood.jpg", badge: "", badgeClass: "" },
    { id: 48, name: "Kafka On The Shore", author: "Haruki Murakami", price: "230.000", image: "Kafkaontheshore.jpg", badge: "", badgeClass: "" },
    { id: 49, name: "Hope On The Horizon", author: "Courtney Peppernell", price: "180.000", image: "Hopeonthehorizon.jpg", badge: "", badgeClass: "" },
    { id: 50, name: "Animal Farm", author: "George Orwell", price: "135.000", image: "Animalfarm.jpg", badge: "RẤT TỐT", badgeClass: "badge-good" },
    { id: 51, name: "The Great Gatsby", author: "F. Scott Fitzgerald", price: "155.000", image: "Thegreatgatsby.jpg", badge: "", badgeClass: "" },
    { id: 52, name: "To Kill a Mockingbird", author: "Harper Lee", price: "175.000", image: "Tokillamockingbird.jpg", badge: "MỚI", badgeClass: "badge-new" },
    { id: 53, name: "Crime and Punishment", author: "Fyodor Dostoevsky", price: "260.000", image: "Crimeandpunishment.jpg", badge: "", badgeClass: "" },
    { id: 54, name: "Pride and Prejudice", author: "Jane Austen", price: "165.000", image: "Prideandprejudice.jpg", badge: "", badgeClass: "" },

    // 8. Ấn bản đặc biệt
    { id: 55, name: "Văn minh Việt Nam", author: "Nguyễn Văn Huyên", price: "190.000", image: "VanminhVietNam.jpg", badge: "", badgeClass: "" },
    { id: 56, name: "Ngụ ngôn La Fontaine", author: "Jean de La Fontaine", price: "210.000", image: "NgungonLaFontaine.jpg", badge: "", badgeClass: "" },
    { id: 57, name: "Trận chiến đổi lịch sử", author: "Nhiều tác giả", price: "350.000", image: "Nhungtranchienthaydoilichsu.jpg", badge: "", badgeClass: "" },
    { id: 58, name: "Tuyển tập kịch Jacinto", author: "Jacinto Benavente", price: "280.000", image: "TuyentapkichJacintoBenavente.jpg", badge: "SƯU TẦM", badgeClass: "badge-rare" },
    { id: 59, name: "Nghìn lẻ một đêm", author: "Antoine Galland", price: "450.000", image: "Nghinlemotdem.jpg", badge: "", badgeClass: "" },
    { id: 60, name: "Một chiến dịch ở Bắc Kỳ", author: "Charles-Édouard Hocquard", price: "320.000", image: "MotchiendichobacKy.jpg", badge: "", badgeClass: "" },
    { id: 61, name: "Truyện Kiều hội bản", author: "Nguyễn Du", price: "1.250.000", image: "Truyenkieuhoiban.jpg", badge: "SƯU TẦM", badgeClass: "badge-rare" },
    { id: 62, name: "Combo: 2 Cuốn Nobel", author: "Nhiều tác giả", price: "550.000", image: "Combo2cuontramnamNobel.jpg", badge: "MỚI", badgeClass: "badge-new" },
];


// 2. CẤU HÌNH PHÂN TRANG VÀ RENDER
const itemsPerPage = 12;
let currentPage = 1;

function renderBooks(page) {
    const bookGrid = document.getElementById("book-grid");
    bookGrid.innerHTML = ""; 

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const booksToShow = booksData.slice(startIndex, endIndex);

    booksToShow.forEach(book => {
        let badgeHTML = "";
        if (book.badge) {
            badgeHTML = `<span class="badge ${book.badgeClass}">${book.badge}</span>`;
        }

        const bookCard = `
            <div class="book-card">
                <div class="book-img-wrapper">
                    <img src="assets/images/books/${book.image}" alt="${book.name}" onerror="this.src='assets/images/logo.jpg'">
                    ${badgeHTML}
                    
                    <div class="hover-overlay">
                        <a href="cart.html" class="action-btn cart-btn" title="Thêm vào giỏ hàng">
                            <i class="fas fa-shopping-cart"></i>
                        </a>
                        <a href="#" class="action-btn" title="Yêu thích">
                            <i class="far fa-heart"></i>
                        </a>
                        <a href="product-detail.html" class="action-btn" title="Xem chi tiết">
                            <i class="far fa-eye"></i>
                        </a>
                    </div>
                </div>
                
                <div class="book-info">
                    <a href="product-detail.html"><h4 class="book-name">${book.name}</h4></a>
                    <p class="book-author">${book.author}</p>
                    <div class="book-price-row">
                        <span class="book-price">${book.price} đ</span>
                    </div>
                </div>
            </div>
        `;
        bookGrid.innerHTML += bookCard;
    });
}

function renderPagination() {
    const paginationDiv = document.getElementById("pagination");
    paginationDiv.innerHTML = ""; 

    const totalPages = Math.ceil(booksData.length / itemsPerPage); 

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

// Khởi chạy
renderBooks(currentPage);
renderPagination();