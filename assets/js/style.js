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

function capNhatBadgeGioHang() {
    const badge = document.getElementById('so-gio-hang');
    if (!badge) return;

    const soLuong = layTongSoLuongGioHang();
    badge.textContent = soLuong;
    badge.classList.toggle('an', soLuong === 0);
}

window.initThuhienHeader = function () {
    const btnTimKiem = document.getElementById('btn-tim-kiem');
    const popTimKiem = document.getElementById('pop-tim-kiem');
    const popOverlay = document.getElementById('pop-overlay');
    const oTimKiem = document.getElementById('o-tim-kiem');
    const btnTim = document.getElementById('btn-tim');

    function dongPopup() {
        if (popTimKiem) popTimKiem.classList.remove('hien');
        if (popOverlay) popOverlay.classList.remove('hien');
    }

    function moPopupTimKiem() {
        if (!popTimKiem || !popOverlay) return;

        const dangHien = popTimKiem.classList.contains('hien');
        dongPopup();

        if (!dangHien) {
            popTimKiem.classList.add('hien');
            popOverlay.classList.add('hien');
            if (oTimKiem) setTimeout(() => oTimKiem.focus(), 50);
        }
    }

    function diTimKiem() {
        const q = oTimKiem ? oTimKiem.value.trim() : '';
        if (q) window.location.href = `category.html?q=${encodeURIComponent(q)}`;
    }

    if (btnTimKiem && !btnTimKiem.dataset.bound) {
        btnTimKiem.dataset.bound = 'true';
        btnTimKiem.addEventListener('click', e => {
            e.stopPropagation();
            moPopupTimKiem();
        });
    }

    if (popOverlay && !popOverlay.dataset.bound) {
        popOverlay.dataset.bound = 'true';
        popOverlay.addEventListener('click', dongPopup);
    }

    if (btnTim && !btnTim.dataset.bound) {
        btnTim.dataset.bound = 'true';
        btnTim.addEventListener('click', diTimKiem);
    }

    if (oTimKiem && !oTimKiem.dataset.bound) {
        oTimKiem.dataset.bound = 'true';
        oTimKiem.addEventListener('keydown', e => {
            if (e.key === 'Enter') diTimKiem();
        });
    }

    document.querySelectorAll('.pop-tag').forEach(tag => {
        if (tag.dataset.bound) return;
        tag.dataset.bound = 'true';
        tag.addEventListener('click', () => {
            const tenTag = tag.textContent.trim();
            window.location.href = `category.html?q=${encodeURIComponent(tenTag)}`;
        });
    });

    if (!document.documentElement.dataset.escapeBound) {
        document.documentElement.dataset.escapeBound = 'true';
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') dongPopup();
        });
    }

    capNhatBadgeGioHang();

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
    if (nutDangXuat && !nutDangXuat.dataset.bound) {
        nutDangXuat.dataset.bound = 'true';
        nutDangXuat.addEventListener('click', e => {
            e.preventDefault();
            sessionStorage.removeItem('thuhien_dang_nhap');
            sessionStorage.removeItem('thuhien_ten');
            sessionStorage.removeItem('currentUser');
            localStorage.removeItem('thuhien_dang_nhap');
            localStorage.removeItem('thuhien_ten');
            localStorage.removeItem('currentUser');
            localStorage.removeItem('thuhien_remembered_email');
            window.location.href = 'index.html';
        });
    }
};

if (!window.__thuhienStorageBadgeBound) {
    window.__thuhienStorageBadgeBound = true;
    window.addEventListener('storage', event => {
        if (event.key === 'cart') capNhatBadgeGioHang();
    });
}

document.addEventListener('DOMContentLoaded', function () {
    window.initThuhienHeader();
});


