/* ========================================
   BUYBACK — Bán lại sách — Thư Hiên
======================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ===== CHỌN TÌNH TRẠNG SÁCH ===== */
    document.querySelectorAll('.bb-tinh-trang').forEach(o => {
        o.addEventListener('click', function () {
            document.querySelectorAll('.bb-tinh-trang').forEach(x => x.classList.remove('chon'));
            this.classList.add('chon');
        });
    });
    /* ===== HIỆN/ẨN THÔNG TIN CHUYỂN KHOẢN ===== */
    const khuCK = document.getElementById('khu-ck');
    document.querySelectorAll('input[name="hinh-thuc"]').forEach(radio => {
        radio.addEventListener('change', function () {
            khuCK.style.display = this.value === 'chuyen-khoan' ? 'block' : 'none';
        });
    });

    // Hiện ngay khi load vì mặc định là chuyển khoản
    if (khuCK) khuCK.style.display = 'block';

    /* ===== UPLOAD ẢNH ===== */
    const inputAnh    = document.getElementById('input-anh');
    const uploadKhu   = document.getElementById('upload-khu');
    const anhXemTruoc = document.getElementById('anh-xem-truoc');
    let danhSachFile  = [];

    // Click vùng upload → mở chọn file
    uploadKhu.addEventListener('click', () => inputAnh.click());

    // Kéo thả ảnh
    uploadKhu.addEventListener('dragover', e => {
        e.preventDefault();
        uploadKhu.classList.add('keo-vao');
    });
    uploadKhu.addEventListener('dragleave', () => uploadKhu.classList.remove('keo-vao'));
    uploadKhu.addEventListener('drop', e => {
        e.preventDefault();
        uploadKhu.classList.remove('keo-vao');
        themAnh(e.dataTransfer.files);
    });

    inputAnh.addEventListener('change', () => themAnh(inputAnh.files));

    function themAnh(files) {
        const MAX = 5;
        Array.from(files).forEach(file => {
            if (danhSachFile.length >= MAX) return;
            if (!file.type.startsWith('image/')) return;
            danhSachFile.push(file);

            const reader = new FileReader();
            reader.onload = e => {
                const item = document.createElement('div');
                item.className = 'bb-anh-item';
                item.innerHTML = `
                    <img src="${e.target.result}" alt="Ảnh sách">
                    <button class="bb-anh-xoa" title="Xoá"><i class="fas fa-times"></i></button>
                `;
                item.querySelector('.bb-anh-xoa').onclick = ev => {
                    ev.stopPropagation();
                    const idx = Array.from(anhXemTruoc.children).indexOf(item);
                    danhSachFile.splice(idx, 1);
                    item.remove();
                };
                anhXemTruoc.appendChild(item);
            };
            reader.readAsDataURL(file);
        });
    }

    /* ===== GỬI FORM ===== */
    const nutGui      = document.getElementById('nut-gui-form');
    const thanhCong   = document.getElementById('bb-thanh-cong');

    nutGui.addEventListener('click', function () {
        // Kiểm tra trường bắt buộc
        const tenSach = document.getElementById('ten-sach').value.trim();
        const hoTen   = document.getElementById('ho-ten').value.trim();
        const sdt     = document.getElementById('sdt').value.trim();
        const tinhTrangChon = document.querySelector('.bb-tinh-trang.chon');

        if (!tenSach) { baoLoi('ten-sach', 'Vui lòng nhập tên sách'); return; }
        if (!hoTen)   { baoLoi('ho-ten',   'Vui lòng nhập họ tên');    return; }
        if (!sdt)     { baoLoi('sdt',       'Vui lòng nhập số điện thoại'); return; }
        if (!/^0\d{9}$/.test(sdt)) { baoLoi('sdt', 'SĐT phải là 10 số, bắt đầu bằng 0'); return; }
        if (!tinhTrangChon) { alert('Vui lòng chọn tình trạng sách'); return; }

        const emailVal = document.getElementById('email').value.trim();
        if (emailVal && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
            baoLoi('email', 'Email không hợp lệ'); return;
        }

        const hinhThuc = document.querySelector('input[name="hinh-thuc"]:checked').value;
        if (hinhThuc === 'chuyen-khoan') {
            const nganHang = document.getElementById('ngan-hang').value.trim();
            const soTK     = document.getElementById('so-tk').value.trim();
            const tenTK    = document.getElementById('ten-tk').value.trim();
            if (!nganHang) { baoLoi('ngan-hang', 'Vui lòng nhập tên ngân hàng'); return; }
            if (!soTK)     { baoLoi('so-tk',     'Vui lòng nhập số tài khoản');   return; }
            if (!tenTK)    { baoLoi('ten-tk',    'Vui lòng nhập tên chủ tài khoản'); return; }
        }
        // Giả lập gửi → hiện thông báo thành công
        nutGui.disabled = true;
        nutGui.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang gửi...';

        /* ===== LƯU VÀO LOCALSTORAGE ===== */
        const diaChi = document.getElementById('so-tk').value.trim();
        const nganHang = document.getElementById('ngan-hang').value.trim();

        const banGhi = {
            id: Date.now(),
            loai: 'buyback',
            ngay: new Date().toLocaleString('vi-VN'),
            sach: { ten: tenSach, tacGia: document.getElementById('tac-gia').value.trim(), namXB: document.getElementById('nam-xb').value.trim(), soLuong: document.getElementById('so-luong').value.trim(), tinhTrang: tinhTrangChon.dataset.val, moTa: document.getElementById('mo-ta').value.trim() },
            khach: { ten: hoTen, sdt: sdt, email: document.getElementById('email').value.trim() },
            hinhThuc: hinhThuc,
            nganHang: hinhThuc === 'chuyen-khoan' ? nganHang : '',
            soTK: hinhThuc === 'chuyen-khoan' ? diaChi : '',
            trangThai: 'cho-xu-ly',
            ghiChu: ''
        };

        const danhSach = JSON.parse(localStorage.getItem('thuhien_submissions') || '[]');
        danhSach.unshift(banGhi);
        localStorage.setItem('thuhien_submissions', JSON.stringify(danhSach));

        setTimeout(() => {
            nutGui.disabled = false;
            nutGui.innerHTML = '<i class="fas fa-paper-plane"></i> Gửi yêu cầu định giá';
            thanhCong.classList.add('hien');
        }, 1200);
    });

    function baoLoi(id, thongBao) {
        const truong = document.getElementById(id);
        truong.focus();
        truong.style.borderColor = '#b84a2a';
        truong.placeholder = thongBao;
        setTimeout(() => truong.style.borderColor = '', 2500);
    }

    /* ===== ĐÓNG THÔNG BÁO THÀNH CÔNG ===== */
    if (thanhCong) {
        thanhCong.addEventListener('click', function (e) {
            if (e.target === thanhCong) thanhCong.classList.remove('hien');
        });
    }

    /* ===== BADGE GIỎ HÀNG ===== */
    const badge = document.getElementById('so-gio-hang');
    if (badge) {
        let so = 0;
        try {
            const rawCart = localStorage.getItem('cart');
            const cart = rawCart ? JSON.parse(rawCart) : [];
            if (Array.isArray(cart)) {
                so = cart.reduce((tong, item) => tong + Number(item.quantity || item.qty || 1), 0);
            }
        } catch (error) {
            so = 0;
        }
        badge.textContent = so;
        badge.classList.toggle('an', so === 0);
    }

});
