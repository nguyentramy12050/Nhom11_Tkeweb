document.addEventListener("DOMContentLoaded", () => {

    /* ================= TÌNH TRẠNG ================= */

    const tinhTrangList = document.querySelectorAll(".bb-tinh-trang");

    tinhTrangList.forEach(item => {

        item.addEventListener("click", () => {

            tinhTrangList.forEach(i => i.classList.remove("active"));

            item.classList.add("active");

        });

    });

    /* ================= UPLOAD ẢNH ================= */

    const inputAnh = document.getElementById("input-anh");
    const preview = document.getElementById("anh-xem-truoc");

    inputAnh.addEventListener("change", () => {

        preview.innerHTML = "";

        [...inputAnh.files].slice(0,5).forEach(file => {

            const reader = new FileReader();

            reader.onload = e => {

                const img = document.createElement("img");

                img.src = e.target.result;

                preview.appendChild(img);

            };

            reader.readAsDataURL(file);

        });

    });

    /* ================= GỬI FORM ================= */

    const nutGui = document.getElementById("nut-gui-form");

    nutGui.addEventListener("click", () => {

        const tenSach = document.getElementById("ten-sach").value.trim();
        const hoTen = document.getElementById("ho-ten").value.trim();
        const sdt = document.getElementById("sdt").value.trim();

        if(!tenSach || !hoTen || !sdt){

            alert("Vui lòng nhập đầy đủ thông tin bắt buộc.");

            return;
        }

        document
        .getElementById("bb-thanh-cong")
        .classList.add("show");

    });

});