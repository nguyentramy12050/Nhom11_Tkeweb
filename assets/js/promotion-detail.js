/* ───────────────────────────────────────────
   PROMOTION DETAIL — Thư Hiên
─────────────────────────────────────────── */
console.log('promotion-detail.js LOADED!');

// VOUCHERS cho trang promotion-detail (3 mã chính)
const VOUCHERS = {
    "HESANG50K":  { loai: "fixed",    giaTri: 50000, donToiThieu: 0,      hetHan: new Date("2026-06-30") },
    "FREESHIP26": { loai: "shipping", giaTri: 0,    donToiThieu: 199000, hetHan: new Date("2026-06-30") },
    "GIFT50K":    { loai: "fixed",    giaTri: 50000, donToiThieu: 299000, hetHan: new Date("2026-06-30") },
};

// Copy mã + lưu vào localStorage (để cart/checkout đọc đúng key)
window.saveVoucherCode = function(maCode, btn) {
    const voucher = VOUCHERS[maCode];
    if (!voucher) {
        alert('Mã ' + maCode + ' không tồn tại.');
        return;
    }

    // Copy vào clipboard
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(maCode).then(function() {
            hienThongBao(btn, '✅ Đã lưu mã!');
        }).catch(function() {
            hienThongBao(btn, '✅ Đã lưu mã!');
        });
    } else {
        // Fallback cho trình duyệt cũ
        var texarea = document.createElement('textarea');
        texarea.value = maCode;
        texarea.style.position = 'fixed';
        texarea.style.opacity = '0';
        document.body.appendChild(texarea);
        texarea.select();
        try { document.execCommand('copy'); } catch(e) {}
        document.body.removeChild(texarea);
        hienThongBao(btn, '✅ Đã lưu mã!');
    }

    // Lưu vào localStorage — dùng key "appliedCoupon" để cart/checkout đọc được
    localStorage.setItem('appliedCoupon', maCode);
};

function hienThongBao(btn, text) {
    if (!btn) return;
    btn.textContent = text;
    btn.style.background = '#2e6b3e';
    btn.style.color = '#fff';
    btn.style.borderColor = '#2e6b3e';
    setTimeout(function() {
        if (!btn) return;
        btn.textContent = btn.dataset.originalText || btn.textContent;
        btn.style.background = '';
        btn.style.color = '';
        btn.style.borderColor = '';
    }, 2000);
}


// Đếm ngược đến 30/06/2026
function startCountdown(targetDate, els) {
    function tick() {
        const now = new Date();
        const diff = targetDate - now;

        if (diff <= 0) {
            els.root.innerHTML = "<p style='color:#f4d3a1;font-family:Playfair Display,serif;'>Chương trình đã kết thúc</p>";
            const ctaNgay = document.getElementById('pd-cta-ngay-con');
            if (ctaNgay) ctaNgay.textContent = '0';
            return;
        }

        const pad = n => String(n).padStart(2, '0');
        els.ngay.textContent  = pad(Math.floor(diff / 86400000));
        els.gio.textContent  = pad(Math.floor((diff % 86400000) / 3600000));
        els.phut.textContent  = pad(Math.floor((diff % 3600000)  / 60000));
        els.giay.textContent = pad(Math.floor((diff % 60000)    / 1000));

        const ctaNgay = document.getElementById('pd-cta-ngay-con');
        if (ctaNgay) ctaNgay.textContent = Math.floor(diff / 86400000);
    }
    tick();
    setInterval(tick, 1000);
}

document.addEventListener('DOMContentLoaded', function () {

    startCountdown(new Date('2026-06-30T23:59:59'), {
        root: document.getElementById('pd-dem-nguoc'),
        ngay: document.getElementById('pd-dem-ngay'),
        gio: document.getElementById('pd-dem-gio'),
        phut: document.getElementById('pd-dem-phut'),
        giay: document.getElementById('pd-dem-giay'),
    });

    // Render sách đang giảm giá
    const luoi = document.getElementById('pd-sach-luoi');
    if (luoi && typeof booksData !== 'undefined') {
        const sachKM = booksData.slice(0, 10);
        const mucGiam = [10, 15, 20, 25, 30, 35, 40, 50];

        luoi.innerHTML = sachKM.map(book => {
            const giam   = mucGiam[Math.floor(Math.random() * mucGiam.length)];
            const priceNum = parseInt(String(book.price || '0').replace(/\D/g, ''));
            const giaMoi = Math.round(priceNum * (1 - giam / 100) / 1000) * 1000;

            return '<div class="pd-sach-the" onclick="location.href=\'product-detail.html?id=' + book.id + '\'">' +
                '<div class="pd-sach-anh">' +
                '<img src="assets/images/books/' + book.image + '" alt="' + book.name + '" onerror="this.src=\'assets/images/logo.jpg\'">' +
                '<span class="pd-sach-nhan-km">−' + giam + '%</span>' +
                '</div>' +
                '<div class="pd-sach-info">' +
                '<p class="pd-sach-the-loai">' + (book.category || 'Sách cũ') + '</p>' +
                '<h3 class="pd-sach-ten">' + book.name + '</h3>' +
                '<p class="pd-sach-tac-gia">' + (book.author || '') + '</p>' +
                '<div class="pd-sach-gia-khu">' +
                '<span class="pd-sach-gia-moi">' + giaMoi.toLocaleString('vi-VN') + 'đ</span>' +
                '<span class="pd-sach-gia-cu">' + priceNum.toLocaleString('vi-VN') + 'đ</span>' +
                '</div>' +
                '<a href="product-detail.html?id=' + book.id + '" class="pd-sach-nut" onclick="event.stopPropagation()">Mua ngay</a>' +
                '</div></div>';
        }).join('');
    }

    // Fade-in khi scroll (chỉ áp dụng cho phần tử chưa có animation)
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(e) {
            if (e.isIntersecting) {
                e.target.style.opacity = '1';
                e.target.style.transform = 'translateY(0)';
                observer.unobserve(e.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.pd-uu-dai-the, .pd-buoc').forEach(function(el, i) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.5s ease ' + (i * 0.1) + 's, transform 0.5s ease ' + (i * 0.1) + 's';
        observer.observe(el);
    });
});
