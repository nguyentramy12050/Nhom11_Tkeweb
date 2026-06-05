document.addEventListener("DOMContentLoaded", function () {

    /* ===================================
       1. CAROUSEL SÁCH — Thư Hiên chọn lọc
    =================================== */

    const bangTruot   = document.getElementById('bang-truot');
    const khuCham     = document.getElementById('cham-trang');

    if (bangTruot && khuCham) {

        // --- ĐỔ DỮ LIỆU ĐỘNG TỪ DATA.JS VÀO ---
        const nguonSach = window.booksData || (typeof booksData !== 'undefined' ? booksData : []);
        const sachChonLoc = nguonSach.slice(0, 12); 
        let htmlSach = '';
        
        sachChonLoc.forEach(book => {
            // Xử lý nhãn Mới/Hot
            let htmlNhan = "";
            if (book.label === "Mới") {
                htmlNhan = `<span class="nhan-the moi">Mới</span>`; 
            } else if (book.label === "Hot") {
                htmlNhan = `<span class="nhan-the hot">Hot</span>`;
            }

            htmlSach += `
                <div class="the-sach">
                    <div class="anh-sach">
                        <img src="assets/images/books/${book.image}" alt="${book.name}" onerror="this.src='assets/images/logo.jpg'">
                        ${htmlNhan}
                    </div>
                    <div class="thong-tin">
                        <p class="the-loai" title="${book.category}">${book.category}</p>
                        <h4 class="ten-sach" title="${book.name}">${book.name}</h4>
                        <p class="tac-gia">${book.author}</p>
                        <div class="the-gia">
                            <span class="gia-sach">${book.price}đ</span>
                            <span class="gia-ss">${book.oldPrice}đ</span>
                        </div>
                        <a href="product-detail.html?id=${book.id}" class="nut-mua">Mua ngay</a>
                    </div>
                </div>
            `;
        });

        bangTruot.innerHTML = htmlSach;


        // --- LOGIC TRƯỢT SLIDE GỐC CỦA CẬU ---
        const danhSachThe = bangTruot.querySelectorAll('.the-sach');
        const RONG_THE    = 220;   // 200px card + 20px gap
        const SO_HIEN     = 4;     // số card hiển thị cùng lúc
        const TONG_THE    = danhSachThe.length;
        let viTri         = 0;
        let thoiGianTuDong;

        function diChuyen(n) {
            if (n > TONG_THE - SO_HIEN) n = 0;
            if (n < 0) n = TONG_THE - SO_HIEN;
            viTri = n;
            bangTruot.style.transform = `translateX(-${viTri * RONG_THE}px)`;
            capNhatCham();
        }

        function capNhatCham() {
            khuCham.querySelectorAll('.cham').forEach((c, i) => {
                c.classList.toggle('hien-tai', i === viTri);
            });
        }

        function taoCham() {
            khuCham.innerHTML = ''; // Clear trước khi tạo
            for (let i = 0; i < TONG_THE - SO_HIEN + 1; i++) {
                const c = document.createElement('button');
                c.className = 'cham' + (i === 0 ? ' hien-tai' : '');
                c.onclick = () => { diChuyen(i); datLaiTuDong(); };
                khuCham.appendChild(c);
            }
        }

        function batDauTuDong() {
            thoiGianTuDong = setInterval(() => diChuyen(viTri + 1), 3000);
        }

        function datLaiTuDong() {
            clearInterval(thoiGianTuDong);
            batDauTuDong();
        }

        document.getElementById('nut-lui').onclick = () => { diChuyen(viTri - 1); datLaiTuDong(); };
        document.getElementById('nut-toi').onclick = () => { diChuyen(viTri + 1); datLaiTuDong(); };

        bangTruot.addEventListener('mouseenter', () => clearInterval(thoiGianTuDong));
        bangTruot.addEventListener('mouseleave', batDauTuDong);

        let batDauX = 0;
        bangTruot.addEventListener('touchstart', e => {
            batDauX = e.touches[0].clientX;
            clearInterval(thoiGianTuDong);
        }, { passive: true });
        bangTruot.addEventListener('touchend', e => {
            const delta = batDauX - e.changedTouches[0].clientX;
            if (Math.abs(delta) > 40) diChuyen(delta > 0 ? viTri + 1 : viTri - 1);
            batDauTuDong();
        });

        taoCham();
        batDauTuDong();

        /* ================================== CLICK THẺ SÁCH CAROUSEL ================================== */
        const danhSachTheClick = document.querySelectorAll('.the-sach');
        danhSachTheClick.forEach(the => {
            the.style.cursor = 'pointer';
            the.addEventListener('click', function (e) {
                if (e.target.closest('.nut-mua')) return;
                const nutMua = this.querySelector('.nut-mua');
                if (nutMua) window.location.href = nutMua.getAttribute('href');
            });
        });
    }

    /* ===================================
       2. CLICK THẺ SÁCH TOP NỔI BẬT
    =================================== */
    const cards = document.querySelectorAll(".item-sach-lon");
    cards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener("click", function () {
            const link = this.dataset.link;
            if (link) window.location.href = link;
        });
    });


    /* ===================================
       3. CLICK Ô THỂ LOẠI (DỊCH TỪ ĐIỂN)
    =================================== */
    const boTuDienTheLoai = {
        "van-hoc-kinh-dien": "Văn học kinh điển",
        "van-hoc-viet-nam": "Văn học Việt Nam xưa",
        "triet-hoc": "Triết học & Tư tưởng",
        "lich-su": "Lịch sử & Văn minh",
        "trinh-tham": "Trinh thám kinh điển",
        "thieu-nhi": "Thiếu nhi & tuổi thơ",
        "ngoai-van": "Ngoại văn tuyển chọn",
        "an-ban-db": "Ấn bản đặc biệt"
    };

    const categoryBoxes = document.querySelectorAll('.o-category');
    categoryBoxes.forEach(box => {
        box.style.cursor = 'pointer';
        box.addEventListener('click', function() {
            const maKhongDau = this.getAttribute('data-cat');
            const tenTheLoai = boTuDienTheLoai[maKhongDau];
            
            if (tenTheLoai) {
                window.location.href = `category.html?q=${encodeURIComponent(tenTheLoai)}`;
            }
        });
    });

        document.addEventListener('DOMContentLoaded', function () {
            new Swiper('.myHeroSlider', {
                loop: true,
                speed: 800,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                },
                effect: 'slide',
                pagination: {
                    el: '.hero-pagination',
                    clickable: true
                },
                navigation: {
                    prevEl: '.hero-prev',
                    nextEl: '.hero-next'
                },
                on: {
                    // Khi slide KM được click → chuyển trang
                    click: function (swiper, event) {
                        const slide = swiper.slides[swiper.activeIndex];
                        if (slide.classList.contains('hero-slide-km')) {
                            window.location.href = 'promotion-detail.html';
                        }
                    }
                }
            });
        });
});
