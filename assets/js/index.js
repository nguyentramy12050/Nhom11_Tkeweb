document.addEventListener("DOMContentLoaded", function () {

    /* ===================================
       1. CAROUSEL SÁCH — Thư Hiên chọn lọc
    =================================== */

    const bangTruot   = document.getElementById('bang-truot');
    const khuCham     = document.getElementById('cham-trang');

    if (bangTruot && khuCham) {

        // --- ĐỔ DỮ LIỆU ĐỘNG TỪ DATA.JS VÀO ---
        const sachChonLoc = booksData.slice(0, 12); 
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

/* =====================================================
   4. TRÍCH DẪN VĂN HỌC XOAY VÒNG
====================================================== */
const danhSachTrichDan = [
    {
        chu:  "Sách là kho tàng khổng lồ của nhân loại — một di sản được trao tặng cho những người đã qua, và một món quà gửi đến những người sẽ đến.",
        ten:  "Henry David Thoreau",
        sach: "Walden"
    },
    {
        chu:  "Một cuốn sách hay là sự liên minh giữa quá khứ và tương lai, là cuộc trò chuyện giữa những tâm hồn đã khuất và những tâm hồn chưa được sinh ra.",
        ten:  "Henry Ward Beecher",
        sach: ""
    },
    {
        chu:  "Ta tìm thấy trong sách những tư tưởng mà ta đã từng có nhưng không biết diễn đạt, ta gặp ở đó những bạn bè tri âm.",
        ten:  "Leo Tolstoy",
        sach: ""
    },
    {
        chu:  "Không có người bạn nào trung thành hơn một cuốn sách.",
        ten:  "Ernest Hemingway",
        sach: ""
    },
    {
        chu:  "Đọc sách mà không suy nghĩ cũng như ăn mà không tiêu hóa.",
        ten:  "Edmund Burke",
        sach: ""
    },
    {
        chu:  "Những cuốn sách cũ giống như bạn bè cũ — chúng là người đồng hành trung thành nhất qua thời gian.",
        ten:  "Thư Hiên",
        sach: "Nhật ký tiệm sách"
    }
];

const khuTrichDan = document.getElementById('trich-dan-noi');
if (khuTrichDan) {
    const elChu  = document.getElementById('trich-dan-chu');
    const elTen  = document.getElementById('trich-dan-ten');
    const elSach = document.getElementById('trich-dan-sach');
    const elCham = document.getElementById('trich-dan-cham-list');
    let chiSoHienTai = 0;

    // Tạo dots
    danhSachTrichDan.forEach((_, i) => {
        const c = document.createElement('button');
        c.className = 'trich-dan-cham' + (i === 0 ? ' hien-tai' : '');
        c.onclick = () => hienTrichDan(i);
        elCham.appendChild(c);
    });

    function hienTrichDan(i) {
        chiSoHienTai = i;
        // Fade out
        elChu.classList.add('an-di');
        setTimeout(() => {
            const td = danhSachTrichDan[i];
            elChu.textContent  = td.chu;
            elTen.textContent  = '— ' + td.ten;
            elSach.textContent = td.sach ? td.sach : '';
            elChu.classList.remove('an-di');
        }, 400);
        // Cập nhật dots
        elCham.querySelectorAll('.trich-dan-cham').forEach((c, j) => {
            c.classList.toggle('hien-tai', j === i);
        });
    }

    // Hiện bài đầu tiên ngay
    hienTrichDan(0);

    // Tự động đổi mỗi 6 giây
    setInterval(() => {
        const tiepTheo = (chiSoHienTai + 1) % danhSachTrichDan.length;
        hienTrichDan(tiepTheo);
    }, 6000);
}

});