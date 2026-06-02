/* ========================================
   BLOG — Thư Hiên
======================================== */

document.addEventListener("DOMContentLoaded", () => {
    renderBaiNoiBat();
    renderTinTuc();
    renderKhuyenMai();
    renderSuKien();
    renderSachQuy();
    renderBaiViet();
});

/* ===== BÀI NỔI BẬT ===== */
function renderBaiNoiBat() {
    const khu = document.getElementById("khu-noi-bat");
    if (!khu) return;
    const bai = duLieuBlog.baiNoiBat[0];
    khu.innerHTML = `
        <article class="bai-noi-bat-lon" onclick="window.location.href='blog-detail.html?slug=${bai.slug}'">
            <img src="${bai.anh}" alt="${bai.tieuDe}">
            <div class="noi-dung-noi-bat">
                <span class="nhan-danh-muc">${bai.danhMuc}</span>
                <h3>${bai.tieuDe}</h3>
                <p>${bai.moTaNgan}</p>
                <span class="nut-doc-tiep">Đọc tiếp →</span>
            </div>
        </article>
    `;
}

/* ===== TIN TỨC ===== */
function renderTinTuc() {
    const khu = document.getElementById("luoi-tin-tuc");
    if (!khu) return;
    khu.innerHTML = duLieuBlog.tinTuc.map(item => `
        <article class="the-tin-tuc" onclick="window.location.href='blog-detail.html?slug=${item.slug}'">
            <img src="${item.anh}" alt="${item.tieuDe}">
            <div class="noi-dung-the">
                <span class="nhan-danh-muc">${item.danhMuc}</span>
                <h3>${item.tieuDe}</h3>
                <p style="font-size:12px;color:#9c7d5f;margin-top:8px;">${item.ngay} · ${item.thoiGianDoc}</p>
            </div>
        </article>
    `).join("");
}

/* ===== KHUYẾN MÃI ===== */
function renderKhuyenMai() {
    const khu = document.getElementById("luoi-khuyen-mai");
    if (!khu) return;
    khu.innerHTML = duLieuBlog.khuyenMai.map(item => `
        <article class="the-tin-tuc" onclick="window.location.href='blog-detail.html?slug=${item.slug}'">
            <div style="position:relative;">
                <img src="${item.anh}" alt="${item.tieuDe}" style="height:220px;object-fit:cover;" onerror="this.style.background='#e8d9c4';this.removeAttribute('src')">
                <span class="nhan-giam-gia">${item.giamGia}</span>
            </div>
            <div class="noi-dung-the">
                <span class="nhan-danh-muc">Khuyến mãi</span>
                <h3>${item.tieuDe}</h3>
                <p>${item.moTaNgan}</p>
            </div>
        </article>
    `).join("");
}

/* ===== SỰ KIỆN ===== */
function renderSuKien() {
    const khu = document.getElementById("dong-thoi-gian-su-kien");
    if (!khu) return;
    khu.innerHTML = duLieuBlog.suKien.map(item => `
        <div class="muc-su-kien" onclick="window.location.href='blog-detail.html?slug=${item.slug}'" style="cursor:pointer;">
            <div class="ngay-su-kien">${item.ngay}</div>
            <div class="noi-dung-su-kien">
                <span class="nhan-danh-muc" style="margin-bottom:10px;display:inline-block;">${item.danhMuc}</span>
                <h3>${item.tieuDe}</h3>
                <p>${item.moTaNgan}</p>
            </div>
        </div>
    `).join("");
}

/* ===== SÁCH QUÝ ===== */
function renderSachQuy() {
    const khu = document.getElementById("luoi-sach-quy");
    if (!khu) return;
    khu.innerHTML = duLieuBlog.sachQuy.map(item => `
        <div class="the-sach-quy" onclick="window.location.href='product-detail.html?id=${item.id}'">
            <img src="${item.anh}" alt="${item.tieuDe}">
            <div class="noi-dung-sach-quy">
                <h3>${item.tieuDe}</h3>
                <p>${item.moTaNgan}</p>
            </div>
        </div>
    `).join("");
}

/* ===== BÀI VIẾT ===== */
function renderBaiViet() {
    const khu = document.getElementById("luoi-bai-viet");
    if (!khu) return;
    const coChu = ['lon', 'vua', 'nho', 'vua', 'lon', 'nho'];
    khu.innerHTML = duLieuBlog.baiViet.map((item, i) => `
        <article class="the-bai-viet ${coChu[i % coChu.length]}"
                 onclick="window.location.href='blog-detail.html?slug=${item.slug}'">
            <img src="${item.anh}" alt="${item.tieuDe}">
            <span class="nhan-danh-muc" style="margin:14px 20px 0;display:inline-block;">${item.danhMuc}</span>
            <h3>${item.tieuDe}</h3>
            <p>${item.moTaNgan}</p>
        </article>
    `).join("");
}
