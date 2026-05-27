// Hàm thay đổi ảnh chính khi click vào ảnh nhỏ (Thumbnail)
function changeImage(imageSrc, element) {
    // 1. Đổi nguồn (src) của ảnh chính thành ảnh vừa click
    document.getElementById('main-product-img').src = imageSrc;

    // 2. Xóa viền màu xanh ở tất cả các ảnh nhỏ
    const thumbnails = document.querySelectorAll('.thumb');
    thumbnails.forEach(thumb => thumb.classList.remove('active-thumb'));

    // 3. Thêm viền màu xanh vào ảnh vừa được click
    element.classList.add('active-thumb');
}