/* ===== TÌM KIẾM ===== */
    const btnTimKiem  = document.getElementById('btn-tim-kiem');
    const popTimKiem  = document.getElementById('pop-tim-kiem');
    const popOverlay  = document.getElementById('pop-overlay');
    const oTimKiem    = document.getElementById('o-tim-kiem');
    const btnTim      = document.getElementById('btn-tim');

    function dongPopup() {
        popTimKiem.classList.remove('hien');
        popOverlay.classList.remove('hien');
    }

    function moPopupTimKiem() {
        const dangHien = popTimKiem.classList.contains('hien');
        dongPopup();
        if (!dangHien) {
            popTimKiem.classList.add('hien');
            popOverlay.classList.add('hien');
            setTimeout(() => oTimKiem.focus(), 50);
        }
    }

    if (btnTimKiem) btnTimKiem.addEventListener('click', e => { e.stopPropagation(); moPopupTimKiem(); });
    if (popOverlay) popOverlay.addEventListener('click', dongPopup);

    // Ấn Enter hoặc nút Tìm → chuyển sang trang category với query
    function diTimKiem() {
        const q = oTimKiem.value.trim();
        if (q) window.location.href = `category.html?q=${encodeURIComponent(q)}`;
    }

    if (btnTim)   btnTim.addEventListener('click', diTimKiem);
    if (oTimKiem) oTimKiem.addEventListener('keydown', e => { if (e.key === 'Enter') diTimKiem(); });

   // Click tag gợi ý → Đi thẳng sang trang danh mục luôn!
    document.querySelectorAll('.pop-tag').forEach(tag => {
        tag.addEventListener('click', () => {
            const tenTag = tag.textContent.trim();
            window.location.href = `category.html?q=${encodeURIComponent(tenTag)}`;
        });
    });

    // Đóng popup khi ấn Escape
    document.addEventListener('keydown', e => { if (e.key === 'Escape') dongPopup(); });

    /* ===== BADGE GIỎ HÀNG ===== */
    function layTongSoLuongGioHang() {
        try {
            const rawCart = localStorage.getItem('cart');
            const cart = rawCart ? JSON.parse(rawCart) : [];

            if (!Array.isArray(cart)) return 0;

            return cart.reduce((tong, item) => {
                return tong + Number(item.quantity || item.qty || 1);
            }, 0);
        } catch (error) {
            return 0;
        }
    }

    function capNhatBadge() {
        const badge = document.getElementById('so-gio-hang');
        if (!badge) return;
        const soLuong = layTongSoLuongGioHang();
        badge.textContent = soLuong;
        badge.classList.toggle('an', soLuong === 0);
    }

    capNhatBadge();

    window.addEventListener('storage', event => {
        if (event.key === 'cart') capNhatBadge();
    });

    /* ===== TRẠNG THÁI ĐĂNG NHẬP TRÊN TOP BAR ===== */
    const tenUser = sessionStorage.getItem('thuhien_ten') || localStorage.getItem('thuhien_ten');
    const daDangNhap = sessionStorage.getItem('thuhien_dang_nhap') || localStorage.getItem('thuhien_dang_nhap');

    const khuChuaDangNhap = document.getElementById('hd-top-chua-dang-nhap');
    const khuDaDangNhap = document.getElementById('hd-top-da-dang-nhap');
    const tenUserEl = document.getElementById('hd-ten-user');

    if (daDangNhap && tenUser && khuChuaDangNhap && khuDaDangNhap) {
        khuChuaDangNhap.style.display = 'none';
        khuDaDangNhap.style.display = 'flex';
        if (tenUserEl) tenUserEl.textContent = tenUser;
    }

    const nutDangXuat = document.getElementById('hd-dang-xuat');
    if (nutDangXuat) {
        nutDangXuat.addEventListener('click', e => {
            e.preventDefault();
            sessionStorage.removeItem('thuhien_dang_nhap');
            sessionStorage.removeItem('thuhien_ten');
            localStorage.removeItem('thuhien_dang_nhap');
            localStorage.removeItem('thuhien_ten');
            window.location.href = 'index.html';
        });
    }
