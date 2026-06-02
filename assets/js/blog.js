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
                <div class="meta-bai-viet">
                    <span><i class="far fa-calendar-alt"></i> ${bai.ngay}</span>
                    <span><i class="far fa-clock"></i> ${bai.thoiGianDoc}</span>
                </div>
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
                <p>${item.moTaNgan}</p>
                <div class="meta-bai-viet">
                    <span>${item.ngay}</span>
                    <span>${item.thoiGianDoc}</span>
                </div>
            </div>
        </article>
    `).join("");
}

/* ===== KHUYẾN MÃI ===== */
function renderKhuyenMai() {
    const khu = document.getElementById("luoi-khuyen-mai");
    if (!khu) return;
    khu.innerHTML = duLieuBlog.khuyenMai.map(item => `
        <article class="the-tin-tuc the-khuyen-mai-card" onclick="window.location.href='blog-detail.html?slug=${item.slug}'">
            <div class="khu-anh-km">
                <img src="${item.anh}" alt="${item.tieuDe}"
                     onerror="this.parentElement.style.background='#3d2a1d'">
                <div class="overlay-km"></div>
                <div class="nhan-giam-gia">${item.giamGia}</div>
            </div>
            <div class="noi-dung-the">
                <span class="nhan-danh-muc">${item.danhMuc}</span>
                <h3>${item.tieuDe}</h3>
                <p>${item.moTaNgan}</p>
                <div class="meta-bai-viet">
                    <span>Đến ${item.ngay}</span>
                </div>
            </div>
        </article>
    `).join("");
}

/* ===== SỰ KIỆN ===== */
function renderSuKien() {
    const khu = document.getElementById("dong-thoi-gian-su-kien");
    if (!khu) return;
    khu.innerHTML = duLieuBlog.suKien.map(item => `
        <div class="muc-su-kien" onclick="window.location.href='blog-detail.html?slug=${item.slug}'">
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
        <div class="the-sach-quy" onclick="window.location.href='blog-detail.html?slug=${item.slug}'">
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
            <div class="meta-bai-viet" style="padding:0 20px 20px;">
                <span>${item.ngay}</span>
                <span>${item.thoiGianDoc}</span>
            </div>
        </article>
    `).join("");
}