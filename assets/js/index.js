document.addEventListener("DOMContentLoaded", function () {

    /* ===================================
       CAROUSEL SÁCH — Thư Hiên chọn lọc
    =================================== */

    const bangTruot   = document.getElementById('bang-truot');
    const khuCham     = document.getElementById('cham-trang');

    if (bangTruot && khuCham) {

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
    /* ================================== CLICK THẺ SÁCH CAROUSEL================================== */
    const danhSachTheClick = document.querySelectorAll('.the-sach');
    danhSachTheClick.forEach(the => {
        the.addEventListener('click', function (e) {
            // Nếu click vào nút "Mua ngay" thì để nó tự chạy, không cần can thiệp
            if (e.target.closest('.nut-mua')) return;

            // Lấy href từ nút mua ngay trong thẻ đó
            const nutMua = this.querySelector('.nut-mua');
            if (nutMua) window.location.href = nutMua.getAttribute('href');
        });
    });
    }

    /* ===================================
       CLICK THẺ SÁCH TOP NỔI BẬT
    =================================== */

    const cards = document.querySelectorAll(".item-sach-lon");
    cards.forEach(card => {
        card.addEventListener("click", function () {
            const link = this.dataset.link;
            if (link) window.location.href = link;
        });
    });

});