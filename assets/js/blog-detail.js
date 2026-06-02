/* ========================================
   BLOG DETAIL — Thư Hiên
======================================== */

document.addEventListener("DOMContentLoaded", () => {
    taiBaiViet();
});

function taiBaiViet() {
    const slug = new URLSearchParams(window.location.search).get("slug");
    if (!slug) { hienThiLoi(); return; }

    // Gộp tất cả loại bài để tìm kiếm
    const tatCaBai = [
        ...duLieuBlog.baiNoiBat,
        ...duLieuBlog.baiViet,
        ...duLieuBlog.tinTuc,
        ...duLieuBlog.khuyenMai,
        ...duLieuBlog.suKien
    ];

    const bai = tatCaBai.find(x => x.slug === slug);
    if (!bai) { hienThiLoi(); return; }

    hienThiBai(bai);
    hienThiLienQuan(bai, tatCaBai);
}

function hienThiBai(bai) {
    document.title = bai.tieuDe + " | Thư Hiên";

    setText("chi-tiet-tieu-de-ngan", bai.tieuDe);
    setText("chi-tiet-danh-muc",     bai.danhMuc   || "");
    setText("chi-tiet-tieu-de",      bai.tieuDe);
    setText("chi-tiet-ngay",         bai.ngay       || "");
    setText("chi-tiet-tac-gia",      bai.tacGia     || "Thư Hiên");
    setText("chi-tiet-thoi-gian",    bai.thoiGianDoc || "");

    const anhBia = document.getElementById("chi-tiet-anh-bia");
    if (anhBia && bai.anh) { anhBia.src = bai.anh; anhBia.alt = bai.tieuDe; }

    const khuNoi = document.getElementById("chi-tiet-noi-dung");
    if (khuNoi) khuNoi.innerHTML = bai.noiDung || "<p>Nội dung đang được cập nhật.</p>";
}

function hienThiLienQuan(baiHienTai, tatCaBai) {
    const khu = document.getElementById("luoi-lien-quan");
    if (!khu) return;

    // Lọc bài có slug, khác bài hiện tại, ưu tiên cùng danh mục
    const coSlug = tatCaBai.filter(b => b.slug && b.slug !== baiHienTai.slug);
    const cungDanhMuc = coSlug.filter(b => b.danhMuc === baiHienTai.danhMuc);
    const khac        = coSlug.filter(b => b.danhMuc !== baiHienTai.danhMuc);
    const lienQuan    = [...cungDanhMuc, ...khac].slice(0, 3);

    if (lienQuan.length === 0) {
        const khuCha = document.querySelector('.bai-viet-lien-quan');
        if (khuCha) khuCha.style.display = 'none';
        return;
    }

    khu.innerHTML = lienQuan.map(b => `
        <article class="the-lien-quan" onclick="window.location.href='blog-detail.html?slug=${b.slug}'">
            <img src="${b.anh}" alt="${b.tieuDe}" 
                style="width:100%;height:240px;object-fit:cover;display:block;"
                onerror="this.style.display='none'">
            <div style="padding:20px;">
                <span style="font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#a44f3f;font-family:'Lora',serif;">${b.danhMuc || ''}</span>
                <h3 style="margin-top:8px;font-family:'Playfair Display',serif;line-height:1.4;">${b.tieuDe}</h3>
                <p style="font-size:12px;color:#9c7d5f;margin-top:6px;">${b.ngay || ''} ${b.thoiGianDoc ? '· ' + b.thoiGianDoc : ''}</p>
            </div>
        </article>
    `).join("");
}

function hienThiLoi() {
    const main = document.querySelector('main');
    if (!main) return;
    main.innerHTML = `
        <div style="text-align:center;padding:120px 20px;background:#faf7f2;min-height:60vh;">
            <div style="font-size:4rem;margin-bottom:20px;">📖</div>
            <h2 style="font-family:'Playfair Display',serif;font-size:2rem;color:#2e1a0e;margin-bottom:12px;">Không tìm thấy bài viết</h2>
            <p style="color:#9c7d5f;margin-bottom:32px;">Bài viết bạn tìm không tồn tại hoặc đã bị xoá.</p>
            <a href="blog.html" style="padding:14px 32px;background:#8a5d3b;color:#fff;border-radius:12px;text-decoration:none;font-family:'Playfair Display',serif;font-weight:700;">Quay lại Blog</a>
        </div>
    `;
}

function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
}