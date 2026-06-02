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
    // Đọc số lượng từ localStorage (cart.html sẽ cập nhật)
    function capNhatBadge() {
        const badge = document.getElementById('so-gio-hang');
        if (!badge) return;
        const soLuong = parseInt(localStorage.getItem('so-luong-gio-hang') || '0');
        badge.textContent = soLuong;
        badge.classList.toggle('an', soLuong === 0);
    }

    capNhatBadge();