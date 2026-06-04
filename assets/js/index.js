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

/* =====================================================
   HỘP QUÀ 3D — Thư Hiên
   Dán vào index.js bên trong DOMContentLoaded
====================================================== */

(function () {
    const KHOA = 'thuhien_hop_qua_da_mo';

    const danhSachQua = [
        { icon:"🎟️", tieuDe:"Mã giảm giá 20%",            moTa:"Giảm 20% cho đơn hàng đầu tiên. Áp dụng cho tất cả sách trong kho.",        ma:"THUHIEN20",  han:"Hết hạn: 31/12/2026" },
        { icon:"📦", tieuDe:"Miễn phí giao hàng",          moTa:"Tặng miễn phí giao hàng toàn quốc cho đơn hàng tiếp theo của bạn.",         ma:"FREESHIP26", han:"Hết hạn: 30/09/2026" },
        { icon:"🎁", tieuDe:"Voucher giảm 50.000đ",        moTa:"Áp dụng cho đơn từ 200.000đ trở lên. Không giới hạn sản phẩm.",             ma:"GIFT50K",    han:"Hết hạn: 31/08/2026" },
        { icon:"⭐", tieuDe:"Bookmark thêu tay độc quyền", moTa:"Bookmark handmade của Thư Hiên sẽ được kèm vào đơn hàng tiếp theo.",        ma:"BOOKMARK",   han:"Hết hạn: 31/12/2026" }
    ];

    const nutHop   = document.getElementById('nut-hop-qua');
    const nenMo    = document.getElementById('nen-mo-qua');
    const hopKhu   = document.getElementById('hop-anh-khu');
    const napKhu   = document.getElementById('hop-nap-khu');
    const thanKhu  = document.getElementById('hop-than-khu');
    const theQua   = document.getElementById('the-qua-hop');
    const confetti = document.getElementById('confetti-khu');

    if (!nutHop) return;

    let dangChay = false;

    nutHop.addEventListener('click', () => {
        if (dangChay) return;
        dangChay = true;
        nenMo.classList.add('hien');
        setTimeout(() => nenMo.classList.add('hien-dan'), 10);

        if (localStorage.getItem(KHOA)) {
            hienDaMo();
            dangChay = false;
        } else {
            chayHoatDong();
        }
    });

    nenMo.addEventListener('click', e => { if (e.target === nenMo) dongHop(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') dongHop(); });

    function chayHoatDong() {
        // Bước 1: Rung hộp 3 lần
        hopKhu.classList.add('dang-mo');

        setTimeout(() => {
            hopKhu.classList.remove('dang-mo');

            // Bước 2: Hiện thân hộp mở
            thanKhu.classList.add('hien');

            // Bước 3: Nắp bay lên
            napKhu.classList.add('bay-len');

            // Bước 4: Confetti
            setTimeout(() => batConfetti(), 200);

        }, 1300); // sau 3 lần rung (~0.4s * 3)

        // Bước 5: Hiện thẻ quà
        setTimeout(() => {
            const qua = danhSachQua[Math.floor(Math.random() * danhSachQua.length)];
            localStorage.setItem(KHOA, JSON.stringify({ ma: qua.ma, ngay: new Date().toISOString() }));
            localStorage.setItem('thuhien_voucher_hien_tai', qua.ma);
            hienTheQua(qua);
            dangChay = false;
        }, 2400);
    }

    function hienTheQua(qua) {
        theQua.innerHTML = `
            <div class="qua-bieu-tuong">${qua.icon}</div>
            <p class="qua-nhan">Chúc mừng! Bạn nhận được</p>
            <div class="qua-tieu-de">${qua.tieuDe}</div>
            <p class="qua-mo-ta">${qua.moTa}</p>
            <div class="ma-giam-gia-khung">
                <span class="ma-giam-gia-chu">${qua.ma}</span>
                <button class="nut-copy-ma" id="nut-copy-qua">Sao chép</button>
            </div>
            <p class="qua-han">${qua.han} • Mỗi người chỉ nhận 1 lần</p>
            <button class="nut-dong-hop" onclick="window.dongHopQua()">Dùng sau</button>
        `;
        setTimeout(() => theQua.classList.add('hien'), 50);
        setTimeout(() => {
            const btn = document.getElementById('nut-copy-qua');
            if (btn) {
                btn.addEventListener('click', () => {
                    navigator.clipboard.writeText(qua.ma).catch(() => {});
                    btn.textContent = '✓ Đã copy!';
                    btn.classList.add('copied');
                    setTimeout(() => { btn.textContent = 'Sao chép'; btn.classList.remove('copied'); }, 2000);
                });
            }
        }, 100);
    }

    function hienDaMo() {
        const info  = JSON.parse(localStorage.getItem(KHOA) || '{}');
        const maLuu = info.ma || '';
        // Hiện hộp mở sẵn
        thanKhu.classList.add('hien');
        napKhu.style.cssText = 'opacity:0;clip-path:inset(0 0 52% 0);transform:translateY(-160px) rotate(-35deg);';

        theQua.innerHTML = `
            <div class="da-mo-khu">
                <div class="da-mo-bieu-tuong">🎊</div>
                <div class="da-mo-tieu-de">Bạn đã mở quà rồi!</div>
                <p class="da-mo-mo-ta">Mỗi người chỉ được mở hộp quà một lần.<br>Mã ưu đãi của bạn:</p>
                <div class="ma-giam-gia-khung">
                    <span class="ma-giam-gia-chu">${maLuu}</span>
                    <button class="nut-copy-ma" id="nut-copy-cu">Sao chép</button>
                </div>
                <button class="nut-dong-hop" style="margin-top:16px;" onclick="window.dongHopQua()">Đóng lại</button>
            </div>
        `;
        setTimeout(() => theQua.classList.add('hien'), 50);
        setTimeout(() => {
            const btn = document.getElementById('nut-copy-cu');
            if (btn) {
                btn.addEventListener('click', () => {
                    navigator.clipboard.writeText(maLuu).catch(() => {});
                    btn.textContent = '✓ Đã copy!';
                    btn.classList.add('copied');
                    setTimeout(() => { btn.textContent = 'Sao chép'; btn.classList.remove('copied'); }, 2000);
                });
            }
        }, 100);
    }

    function batConfetti() {
        const mauList = ['#c9a87c','#8a5d3b','#f4d3a1','#a5523c','#fff5ec','#421904','#e8d9c4'];
        for (let i = 0; i < 40; i++) {
            setTimeout(() => {
                const el  = document.createElementNS('http://www.w3.org/2000/svg','rect');
                const ox  = Math.random() * 160 - 80;
                const w   = 6 + Math.random() * 8;
                const h   = 4 + Math.random() * 6;
                el.setAttribute('x', 120 + ox);
                el.setAttribute('y', 120);
                el.setAttribute('width', w);
                el.setAttribute('height', h);
                el.setAttribute('fill', mauList[Math.floor(Math.random() * mauList.length)]);
                el.setAttribute('rx', '2');
                confetti.appendChild(el);

                let px = 120+ox, py = 120;
                let vx = (Math.random()-.5)*10, vy = -11-Math.random()*8;
                let rot = 0, dRot = (Math.random()-.5)*20;
                const gravity = .4;

                const id = setInterval(() => {
                    vy += gravity; px += vx; py += vy; rot += dRot;
                    el.setAttribute('x', px);
                    el.setAttribute('y', py);
                    el.setAttribute('transform', `rotate(${rot},${px+w/2},${py+h/2})`);
                    if (py > 350) { clearInterval(id); el.remove(); }
                }, 16);
            }, i * 30);
        }
    }

    function dongHop() {
        nenMo.classList.remove('hien-dan');
        theQua.classList.remove('hien');
        napKhu.classList.remove('bay-len');
        thanKhu.classList.remove('hien');
        hopKhu.classList.remove('da-mo','dang-mo');
        napKhu.style.cssText = '';
        confetti.innerHTML = '';
        setTimeout(() => { nenMo.classList.remove('hien'); theQua.innerHTML = ''; }, 500);
        dangChay = false;
    }

    window.dongHopQua = dongHop;
})();

});
