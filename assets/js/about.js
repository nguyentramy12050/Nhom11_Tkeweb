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
            // Kiểm tra input đơn giản
            const inputs = document.querySelectorAll('.abt-lien-he-form .abt-input');
            let hop = true;

            inputs.forEach(inp => {
                if (inp.tagName !== 'SELECT' && inp.type !== 'tel' && !inp.value.trim()) {
                    inp.style.borderColor = '#b84a2a';
                    hop = false;
                    setTimeout(() => inp.style.borderColor = '', 2500);
                }
            });

            if (!hop) return;

            // Giả lập gửi
            nutGui.disabled = true;
            nutGui.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang gửi...';

            setTimeout(() => {
                // Hiện thông báo thành công
                let thongBao = document.querySelector('.abt-thong-bao');
                if (!thongBao) {
                    thongBao = document.createElement('div');
                    thongBao.className = 'abt-thong-bao';
                    thongBao.innerHTML = '<i class="fas fa-check-circle"></i> Tin nhắn đã được gửi! Chúng tôi sẽ phản hồi trong vòng 24 giờ.';
                    nutGui.parentElement.appendChild(thongBao);
                }
                thongBao.classList.add('hien');

                // Reset form
                inputs.forEach(inp => {
                    if (inp.tagName !== 'SELECT') inp.value = '';
                });

                nutGui.disabled = false;
                nutGui.innerHTML = '<i class="fas fa-paper-plane"></i> Gửi tin nhắn';

                // Ẩn thông báo sau 5 giây
                setTimeout(() => thongBao.classList.remove('hien'), 5000);
            }, 1200);
        });
    }

});