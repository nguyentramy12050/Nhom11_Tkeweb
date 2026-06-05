/* ========================================
   ABOUT — Về chúng tôi — Thư Hiên
======================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ===== ĐẾM SỐ ANIMATION ===== */
    function demSo(el, cuoi, thoiGian) {
        let batDau = 0;
        const buoc = Math.ceil(thoiGian / cuoi);
        const dem = setInterval(() => {
            batDau += Math.ceil(cuoi / 60);
            if (batDau >= cuoi) {
                batDau = cuoi;
                clearInterval(dem);
            }
            el.textContent = batDau.toLocaleString('vi-VN');
        }, buoc);
    }

    // Chạy đếm khi phần hero vào viewport
    const elSoLon = document.querySelectorAll('.abt-so-lon');
    let daDem = false;

    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && !daDem) {
            daDem = true;
            elSoLon.forEach(el => {
                const cuoi = parseInt(el.dataset.dem || '0');
                demSo(el, cuoi, 1500);
            });
        }
    }, { threshold: 0.3 });

    const khuHero = document.querySelector('.abt-hero-so-list');
    if (khuHero) observer.observe(khuHero);

    /* ===== FADE IN KHI CUỘN ===== */
    const cacPhan = document.querySelectorAll(
        '.abt-cau-chuyen-luoi'
    );

    cacPhan.forEach(el => {
        el.style.opacity    = '0';
        el.style.transform  = 'translateY(30px)';
        el.style.transition = 'opacity .6s ease, transform .6s ease';
    });

    const fadeObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity   = '1';
                entry.target.style.transform = 'translateY(0)';
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    cacPhan.forEach((el, i) => {
        // Stagger delay cho lưới
        el.style.transitionDelay = (i % 4) * 0.1 + 's';
        fadeObserver.observe(el);
    });

    /* ===== GỬI FORM LIÊN HỆ ===== */
    const nutGui = document.getElementById('abt-nut-gui');
    if (nutGui) {
        nutGui.addEventListener('click', function () {
            const hoTenVal = document.getElementById('abt-ho-ten').value.trim();
            const sdtVal   = document.getElementById('abt-sdt').value.trim();
            const emailVal = document.getElementById('abt-email').value.trim();
            const loiNhan  = document.getElementById('abt-loi-nhan').value.trim();

            // Kiểm tra bắt buộc
            if (!hoTenVal) { abtBaoLoi('abt-ho-ten', 'Vui lòng nhập họ tên'); return; }
            if (!sdtVal)   { abtBaoLoi('abt-sdt',   'Vui lòng nhập số điện thoại'); return; }
            if (!/^0\d{9}$/.test(sdtVal)) { abtBaoLoi('abt-sdt', 'SĐT phải là 10 số, bắt đầu bằng 0'); return; }
            if (!emailVal) { abtBaoLoi('abt-email', 'Vui lòng nhập email'); return; }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) { abtBaoLoi('abt-email', 'Email không hợp lệ'); return; }
            if (!loiNhan)  { abtBaoLoi('abt-loi-nhan', 'Vui lòng nhập lời nhắn'); return; }

            nutGui.disabled = true;
            nutGui.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang gửi...';

            const banGhi = {
                id: Date.now(),
                loai: 'contact',
                ngay: new Date().toLocaleString('vi-VN'),
                khach: { ten: hoTenVal, sdt: sdtVal, email: emailVal },
                chuDe: document.getElementById('abt-chu-de').value,
                loiNhan: loiNhan,
                trangThai: 'cho-xu-ly',
                ghiChu: ''
            };

            const danhSach = JSON.parse(localStorage.getItem('thuhien_submissions') || '[]');
            danhSach.unshift(banGhi);
            localStorage.setItem('thuhien_submissions', JSON.stringify(danhSach));

            setTimeout(() => {
                const tb = document.getElementById('abt-thanh-cong');
                if (tb) tb.classList.add('hien');
                document.getElementById('abt-ho-ten').value = '';
                document.getElementById('abt-sdt').value = '';
                document.getElementById('abt-email').value = '';
                document.getElementById('abt-loi-nhan').value = '';
                nutGui.disabled = false;
                nutGui.innerHTML = '<i class="fas fa-paper-plane"></i> Gửi tin nhắn';
                setTimeout(() => { if (tb) tb.classList.remove('hien'); }, 4000);
            }, 1200);
        });
    }

    function abtBaoLoi(id, thongBao) {
        const el = document.getElementById(id);
        if (!el) return;
        el.style.borderColor = '#b84a2a';
        el.value = thongBao;
        el.focus();
        setTimeout(() => {
            el.style.borderColor = '';
            if (id !== 'abt-loi-nhan') el.value = '';
        }, 2500);
    }

});