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

function thuhienDaDangNhap() {
    const sessionLoggedIn = sessionStorage.getItem('thuhien_dang_nhap');
    const localLoggedIn = localStorage.getItem('thuhien_dang_nhap');
    const currentUser = sessionStorage.getItem('currentUser') || localStorage.getItem('currentUser');

    return Boolean(sessionLoggedIn || localLoggedIn || currentUser);
}

function hienThongBaoDangNhap(message) {
    let toast = document.getElementById('thuhien-login-toast');

    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'thuhien-login-toast';
        toast.className = 'thuhien-login-toast';
        toast.innerHTML = `
            <i class="fas fa-user-lock"></i>
            <span></span>
        `;
        document.body.appendChild(toast);
    }

    const textEl = toast.querySelector('span');
    if (textEl) {
        textEl.textContent = message || 'Vui lòng đăng nhập để tiếp tục.';
    }

    toast.classList.add('show');

    clearTimeout(window.__thuhienLoginToastTimer);
    window.__thuhienLoginToastTimer = setTimeout(() => {
        toast.classList.remove('show');
    }, 2600);
}

function yeuCauDangNhap(message) {
    if (thuhienDaDangNhap()) return true;

    hienThongBaoDangNhap(message);
    return false;
}

window.thuhienDaDangNhap = thuhienDaDangNhap;
window.hienThongBaoDangNhap = hienThongBaoDangNhap;
window.yeuCauDangNhap = yeuCauDangNhap;

// Danh sách thể loại dùng để nhận diện khi người dùng tìm đúng tên thể loại ở header.
const CAC_THE_LOAI_HEADER = [
    'Văn học kinh điển',
    'Văn học Việt Nam xưa',
    'Triết học & Tư tưởng',
    'Lịch sử & Văn minh',
    'Trinh thám kinh điển',
    'Thiếu nhi & tuổi thơ',
    'Ngoại văn tuyển chọn',
    'Ấn bản đặc biệt'
];

// Chuẩn hóa chữ để so sánh thể loại không phân biệt hoa/thường và khoảng trắng thừa.
function chuanHoaTuKhoaHeader(value) {
    return String(value || '')
        .trim()
        .replace(/\s+/g, ' ')
        .toLocaleLowerCase('vi-VN');
}

// Tạo đường dẫn sang trang danh mục, ưu tiên lọc thể loại nếu từ khóa là tên thể loại.
function taoDuongDanDanhMucTheoTuKhoa(tuKhoa) {
    const tuKhoaChuan = chuanHoaTuKhoaHeader(tuKhoa);
    const theLoai = CAC_THE_LOAI_HEADER.find(item => chuanHoaTuKhoaHeader(item) === tuKhoaChuan);

    if (theLoai) {
        return `category.html?category=${encodeURIComponent(theLoai)}`;
    }

    return `category.html?q=${encodeURIComponent(tuKhoa)}`;
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
        if (q) window.location.href = taoDuongDanDanhMucTheoTuKhoa(q);
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
            window.location.href = taoDuongDanDanhMucTheoTuKhoa(tenTag);
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

if (!window.__thuhienProtectedClickBound) {
    window.__thuhienProtectedClickBound = true;
    document.addEventListener('click', event => {
        const protectedLink = event.target.closest('a[href]');
        if (!protectedLink) return;

        const href = protectedLink.getAttribute('href') || '';
        const isMyOrderLink = href.includes('my_order.html');
        const isCheckoutLink = href.includes('checkout.html');

        if (!isMyOrderLink && !isCheckoutLink) return;

        if (!yeuCauDangNhap('Vui lòng đăng nhập để xem Sách của tôi và tiếp tục đặt hàng.')) {
            event.preventDefault();
            event.stopPropagation();
        }
    }, true);
}

function baoVeTrangCanDangNhap() {
    const pageName = window.location.pathname.split('/').pop();
    const protectedPages = ['my_order.html', 'checkout.html', 'tracking.html', 'review.html'];

    if (!protectedPages.includes(pageName) || thuhienDaDangNhap()) return;

    hienThongBaoDangNhap('Vui lòng đăng nhập để xem Sách của tôi và tiếp tục đặt hàng.');

    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1200);
}

if (!window.__thuhienStorageBadgeBound) {
    window.__thuhienStorageBadgeBound = true;
    window.addEventListener('storage', event => {
        if (event.key === 'cart') capNhatBadgeGioHang();
    });
}

document.addEventListener('DOMContentLoaded', function () {
    window.initThuhienHeader();
    baoVeTrangCanDangNhap();
});


