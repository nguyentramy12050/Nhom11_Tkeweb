// 1. MẢNG DỮ LIỆU 62 QUYỂN SÁCH 
const booksData = [
    // 1. Văn học kinh điển
    { id: 1, category: "Văn học kinh điển", name: "Không Gia Đình", author: "Hector Malot", price: "200.000", image: "Khonggiadinh.jpg", badge: "", badgeClass: "" },
    { id: 2, category: "Văn học kinh điển", name: "Những Người Khốn Khổ", author: "Victor Hugo", price: "250.000", image: "Nhungnguoikhonkho.jpg", badge: "RẤT TỐT", badgeClass: "badge-good" },
    { id: 3, category: "Văn học kinh điển", name: "Bố Già", author: "Mario Puzo", price: "220.000", image: "Bogia.jpg", badge: "", badgeClass: "" },
    { id: 4, category: "Văn học kinh điển", name: "Kiêu Hãnh Và Định Kiến", author: "Jane Austen", price: "180.000", image: "Kieuhanhvadinhkien.jpg", badge: "MỚI", badgeClass: "badge-new" },
    { id: 5, category: "Văn học kinh điển", name: "Ông Già Và Biển Cả", author: "Ernest Hemingway", price: "120.000", image: "Onggiavabienca.jpg", badge: "", badgeClass: "" },
    { id: 6, category: "Văn học kinh điển", name: "Ruồi Trâu", author: "Ethel Lilian Voynich", price: "140.000", image: "Ruoitrau.jpg", badge: "", badgeClass: "" },
    { id: 7, category: "Văn học kinh điển", name: "Sông Đông Êm Đềm", author: "Mikhail Sholokhov", price: "300.000", image: "Songdongemdem.jpg", badge: "SƯU TẦM", badgeClass: "badge-rare" },
    { id: 8, category: "Văn học kinh điển", name: "Jane Eyre", author: "Charlotte Brontë", price: "160.000", image: "Janeeyre.jpg", badge: "", badgeClass: "" },

    // 2. Văn học Việt Nam xưa
    { id: 9, category: "Văn học Việt Nam xưa", name: "Dế Mèn Phiêu Lưu Ký", author: "Tô Hoài", price: "95.000", image: "Demenphieuluuky.jpg", badge: "MỚI", badgeClass: "badge-new" },
    { id: 10, category: "Văn học Việt Nam xưa", name: "Tắt Đèn", author: "Ngô Tất Tố", price: "80.000", image: "Tatden.jpg", badge: "", badgeClass: "" },
    { id: 11, category: "Văn học Việt Nam xưa", name: "Số Đỏ", author: "Vũ Trọng Phụng", price: "185.000", image: "SoDo.jpg", badge: "", badgeClass: "" },
    { id: 12, category: "Văn học Việt Nam xưa", name: "Chí Phèo", author: "Nam Cao", price: "150.000", image: "ChiPheo.jpg", badge: "RẤT TỐT", badgeClass: "badge-good" },
    { id: 13, category: "Văn học Việt Nam xưa", name: "Vợ Nhặt", author: "Kim Lân", price: "70.000", image: "Vonhat.jpg", badge: "", badgeClass: "" },
    { id: 14, category: "Văn học Việt Nam xưa", name: "Tuổi Thơ Dữ Dội", author: "Phùng Quán", price: "210.000", image: "Tuoithodudoi.jpg", badge: "", badgeClass: "" },
    { id: 15, category: "Văn học Việt Nam xưa", name: "Kính Vạn Hoa", author: "Nguyễn Nhật Ánh", price: "500.000", image: "Kinhvanhoa.jpg", badge: "SƯU TẦM", badgeClass: "badge-rare" },
    { id: 16, category: "Văn học Việt Nam xưa", name: "Cho Tôi Xin Một Vé Đi Tuổi Thơ", author: "Nguyễn Nhật Ánh", price: "110.000", image: "Chotoixinmotvedituoitho.jpg", badge: "", badgeClass: "" },

    // 3. Triết học & Tư tưởng
    { id: 17, category: "Triết học & Tư tưởng", name: "Bàn Về Tự Do", author: "John Stuart Mill", price: "130.000", image: "Banvetudo.jpg", badge: "", badgeClass: "" },
    { id: 18, category: "Triết học & Tư tưởng", name: "Cộng Hòa — Plato", author: "Plato", price: "250.000", image: "Conghoa.jpg", badge: "", badgeClass: "" },
    { id: 19, category: "Triết học & Tư tưởng", name: "Đạo Đức Kinh", author: "Lão Tử", price: "220.000", image: "Daoduckinh.jpg", badge: "RẤT TỐT", badgeClass: "badge-good" },
    { id: 20, category: "Triết học & Tư tưởng", name: "Quân Vương", author: "Machiavelli", price: "140.000", image: "Quanvuong.jpg", badge: "", badgeClass: "" },
    { id: 21, category: "Triết học & Tư tưởng", name: "Thus Spoke Zarathustra", author: "Friedrich Nietzsche", price: "190.000", image: "Thus.jpg", badge: "", badgeClass: "" },
    { id: 22, category: "Triết học & Tư tưởng", name: "Thuyết Hiện Sinh Là Một Thuyết Nhân Bản", author: "Jean-Paul Sartre", price: "120.000", image: "Thuyethiensinhlamotthuyetnhanban.jpg", badge: "", badgeClass: "" }, 
    { id: 23, category: "Triết học & Tư tưởng", name: "Nghệ Thuật Yêu", author: "Erich Fromm", price: "110.000", image: "Nghethuatyeu.jpg", badge: "MỚI", badgeClass: "badge-new" },
    { id: 24, category: "Triết học & Tư tưởng", name: "Meditations", author: "Marcus Aurelius", price: "150.000", image: "Meditations.jpg", badge: "", badgeClass: "" },

    // 4. Lịch sử & Văn minh
    { id: 25, category: "Lịch sử & Văn minh", name: "Việt Nam Sử Lược", author: "Trần Trọng Kim", price: "3.500.000", image: "Vietnamsuluoc.jpg", badge: "SƯU TẦM", badgeClass: "badge-rare" },
    { id: 26, category: "Lịch sử & Văn minh", name: "Đại Việt Sử Ký Toàn Thư", author: "Ngô Sĩ Liên", price: "850.000", image: "Daivietsukytoanthu.jpg", badge: "RẤT TỐT", badgeClass: "badge-good" },
    { id: 27, category: "Lịch sử & Văn minh", name: "Sapiens", author: "Yuval Noah Harari", price: "350.000", image: "Sapiens.jpg", badge: "", badgeClass: "" },
    { id: 28, category: "Lịch sử & Văn minh", name: "Lược Sử Thời Gian", author: "Stephen Hawking", price: "180.000", image: "Luocsuthoigian.jpg", badge: "", badgeClass: "" },
    { id: 29, category: "Lịch sử & Văn minh", name: "Silk Roads", author: "Peter Frankopan", price: "320.000", image: "Silkroads.jpg", badge: "", badgeClass: "" },
    { id: 30, category: "Lịch sử & Văn minh", name: "SPQR", author: "Mary Beard", price: "280.000", image: "Spqr.jpg", badge: "", badgeClass: "" },
    { id: 31, category: "Lịch sử & Văn minh", name: "Guns, Germs and Steel", author: "Jared Diamond", price: "310.000", image: "Guns.jpg", badge: "MỚI", badgeClass: "badge-new" },
    { id: 32, category: "Lịch sử & Văn minh", name: "Chiến Tranh Và Hòa Bình", author: "Leo Tolstoy", price: "450.000", image: "Chientranhvahoabinh.jpg", badge: "", badgeClass: "" },

    // 5. Trinh thám kinh điển
    { id: 33, category: "Trinh thám kinh điển", name: "Sherlock Holmes", author: "Arthur Conan Doyle", price: "180.000", image: "Sherlockholmes.jpg", badge: "", badgeClass: "" },
    { id: 34, category: "Trinh thám kinh điển", name: "Siêu trộm Arsène Lupin", author: "Maurice Leblanc", price: "160.000", image: "Sieutromquantuarsenelupin.jpg", badge: "", badgeClass: "" },
    { id: 35, category: "Trinh thám kinh điển", name: "Án Mạng Trên Chuyến Tàu Tốc Hành", author: "Agatha Christie", price: "140.000", image: "Anmangtrenchuyentautochanh.jpg", badge: "RẤT TỐT", badgeClass: "badge-good" },
    { id: 36, category: "Trinh thám kinh điển", name: "Mười Người Da Đen Nhỏ", author: "Agatha Christie", price: "150.000", image: "Muoinguoidadennho.jpg", badge: "", badgeClass: "" },
    { id: 37, category: "Trinh thám kinh điển", name: "Thời khắc định mệnh", author: "Agatha Christie", price: "130.000", image: "Thoikhacdinhmenh.jpg", badge: "", badgeClass: "" },
    { id: 38, category: "Trinh thám kinh điển", name: "Tận cùng là cái chết", author: "Agatha Christie", price: "135.000", image: "Tancunglacaichet.jpg", badge: "", badgeClass: "" },
    { id: 39, category: "Trinh thám kinh điển", name: "Hannibal", author: "Thomas Harris", price: "170.000", image: "Hannibal.jpg", badge: "", badgeClass: "" },
    { id: 40, category: "Trinh thám kinh điển", name: "The Hound of Baskervilles", author: "Arthur Conan Doyle", price: "120.000", image: "TheHoundofBaskervilles.jpg", badge: "", badgeClass: "" },

    // 6. Thiếu nhi & tuổi thơ
    { id: 41, category: "Thiếu nhi & tuổi thơ", name: "Hoàng Tử Bé", author: "Antoine de Saint-Exupéry", price: "120.000", image: "Hoangtube.jpg", badge: "RẤT TỐT", badgeClass: "badge-good" },
    { id: 42, category: "Thiếu nhi & tuổi thơ", name: "Totto-chan Bên Cửa Sổ", author: "Tetsuko Kuroyanagi", price: "110.000", image: "Totto-chanbencuaso.jpg", badge: "", badgeClass: "" },
    { id: 43, category: "Thiếu nhi & tuổi thơ", name: "Charlie & Nhà Máy Chocolate", author: "Roald Dahl", price: "115.000", image: "Charlievanhamaychocolate.jpg", badge: "", badgeClass: "" },
    { id: 44, category: "Thiếu nhi & tuổi thơ", name: "Anne Tóc Đỏ Dưới Mái Nhà Bạch Dương", author: "L. M. Montgomery", price: "145.000", image: "Annetocdoduoimainhabachduong.jpg", badge: "", badgeClass: "" },
    { id: 45, category: "Thiếu nhi & tuổi thơ", name: "Heidi", author: "Johanna Spyri", price: "105.000", image: "Heidi.jpg", badge: "MỚI", badgeClass: "badge-new" },
    { id: 46, category: "Thiếu nhi & tuổi thơ", name: "Khu Vườn Bí Mật", author: "Frances Hodgson Burnett", price: "125.000", image: "Khuvuonbimat.jpg", badge: "", badgeClass: "" },

    // 7. Ngoại văn tuyển chọn
    { id: 47, category: "Ngoại văn tuyển chọn", name: "Norwegian Wood", author: "Haruki Murakami", price: "210.000", image: "Norwegianwood.jpg", badge: "", badgeClass: "" },
    { id: 48, category: "Ngoại văn tuyển chọn", name: "Kafka On The Shore", author: "Haruki Murakami", price: "230.000", image: "Kafkaontheshore.jpg", badge: "", badgeClass: "" },
    { id: 49, category: "Ngoại văn tuyển chọn", name: "Hope On The Horizon", author: "Courtney Peppernell", price: "180.000", image: "Hopeonthehorizon.jpg", badge: "", badgeClass: "" },
    { id: 50, category: "Ngoại văn tuyển chọn", name: "Animal Farm", author: "George Orwell", price: "135.000", image: "Animalfarm.jpg", badge: "RẤT TỐT", badgeClass: "badge-good" },
    { id: 51, category: "Ngoại văn tuyển chọn", name: "The Great Gatsby", author: "F. Scott Fitzgerald", price: "155.000", image: "Thegreatgatsby.jpg", badge: "", badgeClass: "" },
    { id: 52, category: "Ngoại văn tuyển chọn", name: "To Kill a Mockingbird", author: "Harper Lee", price: "175.000", image: "Tokillamockingbird.jpg", badge: "MỚI", badgeClass: "badge-new" },
    { id: 53, category: "Ngoại văn tuyển chọn", name: "Crime and Punishment", author: "Fyodor Dostoevsky", price: "260.000", image: "Crimeandpunishment.jpg", badge: "", badgeClass: "" },
    { id: 54, category: "Ngoại văn tuyển chọn", name: "Pride and Prejudice", author: "Jane Austen", price: "165.000", image: "Prideandprejudice.jpg", badge: "", badgeClass: "" },

    // 8. Ấn bản đặc biệt
    { id: 55, category: "Ấn bản đặc biệt", name: "Văn minh Việt Nam", author: "Nguyễn Văn Huyên", price: "190.000", image: "VanminhVietNam.jpg", badge: "", badgeClass: "" },
    { id: 56, category: "Ấn bản đặc biệt", name: "Ngụ ngôn La Fontaine", author: "Jean de La Fontaine", price: "210.000", image: "NgungonLaFontaine.jpg", badge: "", badgeClass: "" },
    { id: 57, category: "Ấn bản đặc biệt", name: "Trận chiến đổi lịch sử", author: "Nhiều tác giả", price: "350.000", image: "Nhungtranchienthaydoilichsu.jpg", badge: "", badgeClass: "" },
    { id: 58, category: "Ấn bản đặc biệt", name: "Tuyển tập kịch Jacinto", author: "Jacinto Benavente", price: "280.000", image: "TuyentapkichJacintoBenavente.jpg", badge: "SƯU TẦM", badgeClass: "badge-rare" },
    { id: 59, category: "Ấn bản đặc biệt", name: "Nghìn lẻ một đêm", author: "Antoine Galland", price: "450.000", image: "Nghinlemotdem.jpg", badge: "", badgeClass: "" },
    { id: 60, category: "Ấn bản đặc biệt", name: "Một chiến dịch ở Bắc Kỳ", author: "Charles-Édouard Hocquard", price: "320.000", image: "MotchiendichobacKy.jpg", badge: "", badgeClass: "" },
    { id: 61, category: "Ấn bản đặc biệt", name: "Truyện Kiều hội bản", author: "Nguyễn Du", price: "1.250.000", image: "Truyenkieuhoiban.jpg", badge: "SƯU TẦM", badgeClass: "badge-rare" },
    { id: 62, category: "Ấn bản đặc biệt", name: "Combo: 2 Cuốn Nobel", author: "Nhiều tác giả", price: "550.000", image: "Combo2cuontramnamNobel.jpg", badge: "MỚI", badgeClass: "badge-new" },
];
