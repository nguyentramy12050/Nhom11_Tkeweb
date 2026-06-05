/* ════════════════════════════════════════
   PROMOTION DETAIL — Thư Hiên
════════════════════════════════════════ */

// Hàm lưu voucher
    window.applyPromotionVoucher = function(maCode) {
        console.log(">>> Hàm được gọi với mã:", maCode);
        if (!maCode) return;
        localStorage.setItem('appliedCoupon', maCode.trim().toUpperCase());
        alert(`✅ Đã lưu mã ${maCode} thành công! Mã sẽ được áp dụng khi bạn thanh toán.`);
        window.location.href = 'cart.html';
    };

document.addEventListener('DOMContentLoaded', function () {

    /* ── ĐẾM NGƯỢC ĐẾN 30/06/2026 ── */
    const NGAY_KET_THUC = new Date('2026-06-30T23:59:59');

    function capNhatDemNguoc() {
        const now  = new Date();
        const diff = NGAY_KET_THUC - now;

        if (diff <= 0) {
            document.getElementById('pd-dem-nguoc').innerHTML =
                '<p style="color:#f4d3a1;font-family:\'Playfair Display\',serif;font-size:1.1rem;">Chương trình đã kết thúc</p>';
            return;
        }

        const ngay  = Math.floor(diff / 86400000);
        const gio   = Math.floor((diff % 86400000) / 3600000);
        const phut  = Math.floor((diff % 3600000)  / 60000);
        const giay  = Math.floor((diff % 60000)    / 1000);

        const pad = n => String(n).padStart(2, '0');
        document.getElementById('pd-dem-ngay').textContent = pad(ngay);
        document.getElementById('pd-dem-gio').textContent  = pad(gio);
        document.getElementById('pd-dem-phut').textContent = pad(phut);
        document.getElementById('pd-dem-giay').textContent = pad(giay);

        // Cập nhật số ngày còn lại ở CTA
        const ctaNgay = document.getElementById('pd-cta-ngay-con');
        if (ctaNgay) ctaNgay.textContent = ngay;
    }

    capNhatDemNguoc();
    setInterval(capNhatDemNguoc, 1000);

    /* ── RENDER SÁCH ĐANG GIẢM GIÁ ── */
    const luoi = document.getElementById('pd-sach-luoi');
    if (luoi) {
        const nguon = window.booksData || (typeof booksData !== 'undefined' ? booksData : []);

        // Lấy 10 sách đầu, giả lập giảm giá ngẫu nhiên
        const sachKM = nguon.slice(0, 10);

        if (sachKM.length === 0) {
            luoi.innerHTML = '<p style="text-align:center;color:#9c7d5f;grid-column:1/-1;">Đang cập nhật danh sách sách khuyến mãi...</p>';
            return;
        }

        const mucGiam = [10, 15, 20, 25, 30, 35, 40, 50];

        luoi.innerHTML = sachKM.map(book => {
            const giam    = mucGiam[Math.floor(Math.random() * mucGiam.length)];
            const giaMoi  = book.price
                ? Math.round(parseInt(book.price.replace(/\D/g, '')) * (1 - giam / 100) / 1000) * 1000
                : null;
            const giaCu   = book.price
                ? parseInt(book.price.replace(/\D/g, '')).toLocaleString('vi-VN')
                : null;

            return `
                <div class="pd-sach-the" onclick="window.location.href='product-detail.html?id=${book.id}'">
                    <div class="pd-sach-anh">
                        <img src="assets/images/books/${book.image}"
                             alt="${book.name}"
                             onerror="this.src='assets/images/logo.jpg'">
                        <span class="pd-sach-nhan-km">−${giam}%</span>
                    </div>
                    <div class="pd-sach-info">
                        <p class="pd-sach-the-loai">${book.category || 'Sách cũ'}</p>
                        <h3 class="pd-sach-ten">${book.name}</h3>
                        <p class="pd-sach-tac-gia">${book.author || ''}</p>
                        <div class="pd-sach-gia-khu">
                            ${giaMoi ? `<span class="pd-sach-gia-moi">${giaMoi.toLocaleString('vi-VN')}đ</span>` : ''}
                            ${giaCu  ? `<span class="pd-sach-gia-cu">${giaCu}đ</span>` : ''}
                        </div>
                        <a href="product-detail.html?id=${book.id}" class="pd-sach-nut">Mua ngay</a>
                    </div>
                </div>
            `;
        }).join('');
    }

    /* ── HIỆU ỨNG FADE IN KHI SCROLL ── */
    const cacPhan = document.querySelectorAll(
        '.pd-uu-dai-the, .pd-buoc, .pd-sach-the, .pd-dk-luoi'
    );

    cacPhan.forEach((el, i) => {
        el.style.opacity   = '0';
        el.style.transform = 'translateY(28px)';
        el.style.transition = `opacity .55s ease ${(i % 5) * 0.08}s, transform .55s ease ${(i % 5) * 0.08}s`;
    });

    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.style.opacity   = '1';
                e.target.style.transform = 'translateY(0)';
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.12 });

    cacPhan.forEach(el => obs.observe(el));
});