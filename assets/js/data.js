// 1. MẢNG DỮ LIỆU 62 QUYỂN SÁCH
const booksData = [

    // 1. Văn học kinh điển
    {
        id: 1, category: "Văn học kinh điển", name: "Không Gia Đình", author: "Hector Malot",
        price: "200.000", oldPrice: "240.000", rating: 4.9, publisher: "NXB Văn Học", year: 2007, image: "Khonggiadinh.jpg",
        description: "Không Gia Đình là tiểu thuyết nổi tiếng nhất của văn hào Pháp Hector Malot. Tác phẩm kể về cuộc đời éo le của cậu bé mồ côi Rêmi. Trải qua bao nhiêu gian khổ, rong ruổi khắp mọi nẻo đường nước Pháp cùng gánh xiếc rong của cụ Vitali, Rêmi vẫn giữ được phẩm chất làm người cao quý. Cuốn sách ca ngợi lao động, tinh thần tự lập và tình yêu thương con người sâu sắc, là hành trang tinh thần vô giá cho nhiều thế hệ độc giả. Ấn bản này phù hợp với độc giả muốn đọc chậm, nghiền ngẫm và lưu giữ trong tủ sách cá nhân. Ngoài giá trị cốt truyện, cuốn sách còn gợi mở nhiều suy nghĩ về nhân cách, tình yêu thương, sự lựa chọn và sức chịu đựng của con người trước nghịch cảnh. Với người yêu sách cũ, dấu vết thời gian trên từng trang giấy càng làm tăng cảm giác hoài niệm và giá trị sưu tầm.",
        reviews: [
            { user: "Gia Huy", stars: 5, comment: "Nội dung Không Gia Đình rất cuốn, đọc chậm mới thấy rõ chiều sâu tâm lý nhân vật." },
            { user: "Ngọc Mai", stars: 5, comment: "Bản sách cũ nhưng giấy còn chắc, shop bọc chống ẩm kỹ nên nhận hàng rất yên tâm. Nhân viên phản hồi nhanh khi mình hỏi thêm ảnh thật của sách." },
            { user: "Tuấn Kiệt", stars: 5, comment: "Mình chọn Thư Hiên vì có nhiều bản văn học kinh điển khó tìm, cuốn này đúng như mô tả." },
            { user: "Linh Chi", stars: 5, comment: "Sách phù hợp để đọc lại nhiều lần, phần dịch và trình bày dễ theo dõi." },
            { user: "Phương Thảo", stars: 4, comment: "Đóng gói cẩn thận, giao hàng nhanh hơn dự kiến. Đặt trên kệ nhìn rất có cảm giác hoài cổ." },
            { user: "Anh Duy", stars: 5, comment: "Tình trạng sách tốt so với sách cũ, gáy và bìa vẫn giữ được khá đẹp." },
            { user: "Khánh Vy", stars: 5, comment: "Một lựa chọn đáng có nếu thích văn học kinh điển và muốn sưu tầm bản in cũ." }
        ]
    },
    {
        id: 2, category: "Văn học kinh điển", name: "Những Người Khốn Khổ", author: "Victor Hugo",
        price: "250.000", oldPrice: "300.000", rating: 5.0, publisher: "NXB Văn Học", year: 2012, image: "Nhungnguoikhonkho.jpg",
        description: "Một kiệt tác bất hủ của Victor Hugo, tái hiện bức tranh xã hội Pháp thế kỷ 19 đầy bi tráng. Tác phẩm xoay quanh Jean Valjean - người đàn ông phải ngồi tù 19 năm chỉ vì ăn cắp một mẩu bánh mì. Qua những thăng trầm của các nhân vật như Fantine, Cosette, Marius, Victor Hugo đã gửi gắm thông điệp vĩ đại về tình thương, lòng vị tha và khát vọng vươn tới ánh sáng của những con người dưới đáy xã hội. Ấn bản này phù hợp với độc giả muốn đọc chậm, nghiền ngẫm và lưu giữ trong tủ sách cá nhân. Ngoài giá trị cốt truyện, cuốn sách còn gợi mở nhiều suy nghĩ về nhân cách, tình yêu thương, sự lựa chọn và sức chịu đựng của con người trước nghịch cảnh. Với người yêu sách cũ, dấu vết thời gian trên từng trang giấy càng làm tăng cảm giác hoài niệm và giá trị sưu tầm.",
        reviews: [
            { user: "Linh Chi", stars: 5, comment: "Nội dung Những Người Khốn Khổ rất cuốn, đọc chậm mới thấy rõ chiều sâu tâm lý nhân vật." },
            { user: "Phương Thảo", stars: 5, comment: "Bản sách cũ nhưng giấy còn chắc, shop bọc chống ẩm kỹ nên nhận hàng rất yên tâm. Nhân viên phản hồi nhanh khi mình hỏi thêm ảnh thật của sách." },
            { user: "Anh Duy", stars: 5, comment: "Mình chọn Thư Hiên vì có nhiều bản văn học kinh điển khó tìm, cuốn này đúng như mô tả." },
            { user: "Khánh Vy", stars: 5, comment: "Sách phù hợp để đọc lại nhiều lần, phần dịch và trình bày dễ theo dõi." },
            { user: "Quang Hưng", stars: 5, comment: "Đóng gói cẩn thận, giao hàng nhanh hơn dự kiến. Đặt trên kệ nhìn rất có cảm giác hoài cổ." },
            { user: "Bảo Ngọc", stars: 5, comment: "Tình trạng sách tốt so với sách cũ, gáy và bìa vẫn giữ được khá đẹp." },
            { user: "Thanh Tùng", stars: 5, comment: "Một lựa chọn đáng có nếu thích văn học kinh điển và muốn sưu tầm bản in cũ." },
            { user: "Mỹ Linh", stars: 5, comment: "Nội dung Những Người Khốn Khổ rất cuốn, đọc chậm mới thấy rõ chiều sâu tâm lý nhân vật." }
        ]
    },
    {
        id: 3, category: "Văn học kinh điển", name: "Bố Già", author: "Mario Puzo",
        price: "220.000", oldPrice: "260.000", rating: 4.8, publisher: "NXB Trẻ", year: 2010, image: "Bogia.jpg",
        description: "Bố Già là một bức tranh toàn cảnh vô cùng chân thực về thế giới ngầm Mafia Mỹ do Mario Puzo chắp bút. Cuốn sách khắc họa hình tượng Don Vito Corleone - một ông trùm đầy quyền uy nhưng cũng vô cùng trọng tình nghĩa gia đình. Đằng sau những cuộc thanh trừng đẫm máu là những bài học sâu sắc về quyền lực, lòng trung thành và cái giá của sự sinh tồn trong một thế giới tàn khốc. Ấn bản này phù hợp với độc giả muốn đọc chậm, nghiền ngẫm và lưu giữ trong tủ sách cá nhân. Ngoài giá trị cốt truyện, cuốn sách còn gợi mở nhiều suy nghĩ về nhân cách, tình yêu thương, sự lựa chọn và sức chịu đựng của con người trước nghịch cảnh. Với người yêu sách cũ, dấu vết thời gian trên từng trang giấy càng làm tăng cảm giác hoài niệm và giá trị sưu tầm.",
        reviews: [
            { user: "Khánh Vy", stars: 4, comment: "Nội dung Bố Già rất cuốn, đọc chậm mới thấy rõ chiều sâu tâm lý nhân vật." },
            { user: "Quang Hưng", stars: 5, comment: "Bản sách cũ nhưng giấy còn chắc, shop bọc chống ẩm kỹ nên nhận hàng rất yên tâm. Nhân viên phản hồi nhanh khi mình hỏi thêm ảnh thật của sách." },
            { user: "Bảo Ngọc", stars: 5, comment: "Mình chọn Thư Hiên vì có nhiều bản văn học kinh điển khó tìm, cuốn này đúng như mô tả." },
            { user: "Thanh Tùng", stars: 5, comment: "Sách phù hợp để đọc lại nhiều lần, phần dịch và trình bày dễ theo dõi." },
            { user: "Mỹ Linh", stars: 5, comment: "Đóng gói cẩn thận, giao hàng nhanh hơn dự kiến. Đặt trên kệ nhìn rất có cảm giác hoài cổ." },
            { user: "Đức Anh", stars: 5, comment: "Tình trạng sách tốt so với sách cũ, gáy và bìa vẫn giữ được khá đẹp." }
        ]
    },
    {
        id: 4, category: "Văn học kinh điển", name: "Kiêu Hãnh Và Định Kiến", author: "Jane Austen",
        price: "180.000", oldPrice: "220.000", rating: 4.7, publisher: "Nhã Nam", year: 2013, image: "Kieuhanhvadinhkien.jpg",
        description: "Tác phẩm lãng mạn kinh điển của Jane Austen kể về câu chuyện tình yêu đầy trắc trở nhưng cũng rất đỗi ngọt ngào giữa nàng Elizabeth Bennet thông minh, sắc sảo và chàng Fitzwilliam Darcy giàu có nhưng kiêu ngạo. Bằng ngòi bút châm biếm nhẹ nhàng, tác giả đã phơi bày những định kiến xã hội, những lề thói khắt khe của tầng lớp quý tộc Anh thế kỷ 19, đồng thời ngợi ca tình yêu đích thực vượt qua mọi rào cản. Ấn bản này phù hợp với độc giả muốn đọc chậm, nghiền ngẫm và lưu giữ trong tủ sách cá nhân. Ngoài giá trị cốt truyện, cuốn sách còn gợi mở nhiều suy nghĩ về nhân cách, tình yêu thương, sự lựa chọn và sức chịu đựng của con người trước nghịch cảnh. Với người yêu sách cũ, dấu vết thời gian trên từng trang giấy càng làm tăng cảm giác hoài niệm và giá trị sưu tầm.",
        reviews: [
            { user: "Thanh Tùng", stars: 5, comment: "Nội dung Kiêu Hãnh Và Định Kiến rất cuốn, đọc chậm mới thấy rõ chiều sâu tâm lý nhân vật." },
            { user: "Mỹ Linh", stars: 5, comment: "Bản sách cũ nhưng giấy còn chắc, shop bọc chống ẩm kỹ nên nhận hàng rất yên tâm. Nhân viên phản hồi nhanh khi mình hỏi thêm ảnh thật của sách." },
            { user: "Đức Anh", stars: 5, comment: "Mình chọn Thư Hiên vì có nhiều bản văn học kinh điển khó tìm, cuốn này đúng như mô tả." },
            { user: "Hà My", stars: 5, comment: "Sách phù hợp để đọc lại nhiều lần, phần dịch và trình bày dễ theo dõi." },
            { user: "Minh Anh", stars: 4, comment: "Đóng gói cẩn thận, giao hàng nhanh hơn dự kiến. Đặt trên kệ nhìn rất có cảm giác hoài cổ." },
            { user: "Hoàng Nam", stars: 5, comment: "Tình trạng sách tốt so với sách cũ, gáy và bìa vẫn giữ được khá đẹp." },
            { user: "Thu Hà", stars: 4 }
        ]
    },
    {
        id: 5, category: "Văn học kinh điển", name: "Ông Già Và Biển Cả", author: "Ernest Hemingway",
        price: "120.000", oldPrice: "150.000", rating: 4.9, publisher: "NXB Văn Học", year: 2008, image: "Onggiavabienca.jpg",
        description: "Đỉnh cao trong sự nghiệp của Hemingway, kể về cuộc chiến kiên cường giữa ông lão đánh cá Santiago và con cá kiếm khổng lồ trên dòng hải lưu Gulf Stream. Thông qua nguyên lý 'tảng băng trôi', tác phẩm tôn vinh vẻ đẹp của sức lao động, ý chí bất khuất và bản lĩnh con người trước thiên nhiên kỳ vĩ: 'Con người có thể bị hủy diệt nhưng không thể bị đánh bại'. Ấn bản này phù hợp với độc giả muốn đọc chậm, nghiền ngẫm và lưu giữ trong tủ sách cá nhân. Ngoài giá trị cốt truyện, cuốn sách còn gợi mở nhiều suy nghĩ về nhân cách, tình yêu thương, sự lựa chọn và sức chịu đựng của con người trước nghịch cảnh. Với người yêu sách cũ, dấu vết thời gian trên từng trang giấy càng làm tăng cảm giác hoài niệm và giá trị sưu tầm.",
        reviews: [
            { user: "Hà My", stars: 5, comment: "Nội dung Ông Già Và Biển Cả rất cuốn, đọc chậm mới thấy rõ chiều sâu tâm lý nhân vật." },
            { user: "Minh Anh", stars: 5, comment: "Bản sách cũ nhưng giấy còn chắc, shop bọc chống ẩm kỹ nên nhận hàng rất yên tâm. Nhân viên phản hồi nhanh khi mình hỏi thêm ảnh thật của sách." },
            { user: "Hoàng Nam", stars: 5, comment: "Mình chọn Thư Hiên vì có nhiều bản văn học kinh điển khó tìm, cuốn này đúng như mô tả." },
            { user: "Thu Hà", stars: 4, comment: "Sách phù hợp để đọc lại nhiều lần, phần dịch và trình bày dễ theo dõi." },
            { user: "Gia Huy", stars: 5, comment: "Đóng gói cẩn thận, giao hàng nhanh hơn dự kiến. Đặt trên kệ nhìn rất có cảm giác hoài cổ." },
            { user: "Ngọc Mai", stars: 5, comment: "Tình trạng sách tốt so với sách cũ, gáy và bìa vẫn giữ được khá đẹp." },
            { user: "Tuấn Kiệt", stars: 5, comment: "Một lựa chọn đáng có nếu thích văn học kinh điển và muốn sưu tầm bản in cũ." },
            { user: "Linh Chi", stars: 5, comment: "Nội dung Ông Già Và Biển Cả rất cuốn, đọc chậm mới thấy rõ chiều sâu tâm lý nhân vật." }
        ]
    },
    {
        id: 6, category: "Văn học kinh điển", name: "Ruồi Trâu", author: "Ethel Lilian Voynich",
        price: "140.000", oldPrice: "170.000", rating: 4.8, publisher: "NXB Văn Học", year: 2005, image: "Ruoitrau.jpg",
        description: "Câu chuyện cảm động và bi tráng về Arthur - một thanh niên ngây thơ, sùng đạo đã trải qua những biến cố nghiệt ngã để trở thành 'Ruồi Trâu', một chiến sĩ cách mạng kiên cường, sắc sảo và dâng hiến trọn đời cho sự nghiệp giải phóng nước Ý. Cuốn sách là bài ca về lý tưởng sống, tình yêu Tổ quốc và nỗi đau giằng xé nội tâm sâu sắc. Ấn bản này phù hợp với độc giả muốn đọc chậm, nghiền ngẫm và lưu giữ trong tủ sách cá nhân. Ngoài giá trị cốt truyện, cuốn sách còn gợi mở nhiều suy nghĩ về nhân cách, tình yêu thương, sự lựa chọn và sức chịu đựng của con người trước nghịch cảnh. Với người yêu sách cũ, dấu vết thời gian trên từng trang giấy càng làm tăng cảm giác hoài niệm và giá trị sưu tầm.",
        reviews: [
            { user: "Thu Hà", stars: 5, comment: "Nội dung Ruồi Trâu rất cuốn, đọc chậm mới thấy rõ chiều sâu tâm lý nhân vật." },
            { user: "Gia Huy", stars: 5, comment: "Bản sách cũ nhưng giấy còn chắc, shop bọc chống ẩm kỹ nên nhận hàng rất yên tâm. Nhân viên phản hồi nhanh khi mình hỏi thêm ảnh thật của sách." },
            { user: "Ngọc Mai", stars: 5, comment: "Mình chọn Thư Hiên vì có nhiều bản văn học kinh điển khó tìm, cuốn này đúng như mô tả." },
            { user: "Tuấn Kiệt", stars: 5, comment: "Sách phù hợp để đọc lại nhiều lần, phần dịch và trình bày dễ theo dõi." },
            { user: "Linh Chi", stars: 4, comment: "Đóng gói cẩn thận, giao hàng nhanh hơn dự kiến. Đặt trên kệ nhìn rất có cảm giác hoài cổ." },
            { user: "Phương Thảo", stars: 5, comment: "Tình trạng sách tốt so với sách cũ, gáy và bìa vẫn giữ được khá đẹp." }
        ]
    },
    {
        id: 7, category: "Văn học kinh điển", name: "Sông Đông Êm Đềm", author: "Mikhail Sholokhov",
        price: "300.000", oldPrice: "360.000", rating: 4.9, publisher: "NXB Văn Học", year: 2010, image: "Songdongemdem.jpg",
        description: "Kiệt tác đoạt giải Nobel Văn học, tái hiện sinh động cuộc sống, tình yêu và những bi kịch của người dân Cossack vùng sông Đông trong giai đoạn Chiến tranh thế giới thứ nhất và Nội chiến Nga. Sholokhov đã vẽ nên một bức tranh sử thi hoành tráng, phản ánh những xáo trộn dữ dội của lịch sử và sự lựa chọn đầy đau đớn của con người trong cơn lốc thời đại. Ấn bản này phù hợp với độc giả muốn đọc chậm, nghiền ngẫm và lưu giữ trong tủ sách cá nhân. Ngoài giá trị cốt truyện, cuốn sách còn gợi mở nhiều suy nghĩ về nhân cách, tình yêu thương, sự lựa chọn và sức chịu đựng của con người trước nghịch cảnh. Với người yêu sách cũ, dấu vết thời gian trên từng trang giấy càng làm tăng cảm giác hoài niệm và giá trị sưu tầm.",
        reviews: [
            { user: "Tuấn Kiệt", stars: 5, comment: "Nội dung Sông Đông Êm Đềm rất cuốn, đọc chậm mới thấy rõ chiều sâu tâm lý nhân vật." },
            { user: "Linh Chi", stars: 5, comment: "Bản sách cũ nhưng giấy còn chắc, shop bọc chống ẩm kỹ nên nhận hàng rất yên tâm. Nhân viên phản hồi nhanh khi mình hỏi thêm ảnh thật của sách." },
            { user: "Phương Thảo", stars: 5, comment: "Mình chọn Thư Hiên vì có nhiều bản văn học kinh điển khó tìm, cuốn này đúng như mô tả." },
            { user: "Anh Duy", stars: 4, comment: "Sách phù hợp để đọc lại nhiều lần, phần dịch và trình bày dễ theo dõi." },
            { user: "Khánh Vy", stars: 5, comment: "Đóng gói cẩn thận, giao hàng nhanh hơn dự kiến. Đặt trên kệ nhìn rất có cảm giác hoài cổ." },
            { user: "Quang Hưng", stars: 5, comment: "Tình trạng sách tốt so với sách cũ, gáy và bìa vẫn giữ được khá đẹp." },
            { user: "Bảo Ngọc", stars: 5, comment: "Một lựa chọn đáng có nếu thích văn học kinh điển và muốn sưu tầm bản in cũ." }
        ]
    },
    {
        id: 8, category: "Văn học kinh điển", name: "Jane Eyre", author: "Charlotte Brontë",
        price: "160.000", oldPrice: "200.000", rating: 4.8, publisher: "NXB Phụ Nữ", year: 2014, image: "Janeeyre.jpg",
        description: "Jane Eyre là một tiểu thuyết mang tính cách mạng của thế kỷ 19, kể về cuộc đời của một cô gái mồ côi nghèo khó, dung mạo bình thường nhưng lại có một nghị lực sống phi thường và tâm hồn cao đẹp. Hành trình Jane đi tìm kiếm tình yêu đích thực bên ngài Rochester và khẳng định giá trị bản thân đã truyền cảm hứng mạnh mẽ cho biết bao thế hệ phụ nữ trên toàn thế giới. Ấn bản này phù hợp với độc giả muốn đọc chậm, nghiền ngẫm và lưu giữ trong tủ sách cá nhân. Ngoài giá trị cốt truyện, cuốn sách còn gợi mở nhiều suy nghĩ về nhân cách, tình yêu thương, sự lựa chọn và sức chịu đựng của con người trước nghịch cảnh. Với người yêu sách cũ, dấu vết thời gian trên từng trang giấy càng làm tăng cảm giác hoài niệm và giá trị sưu tầm.",
        reviews: [
            { user: "Anh Duy", stars: 5, comment: "Nội dung Jane Eyre rất cuốn, đọc chậm mới thấy rõ chiều sâu tâm lý nhân vật." },
            { user: "Khánh Vy", stars: 4, comment: "Bản sách cũ nhưng giấy còn chắc, shop bọc chống ẩm kỹ nên nhận hàng rất yên tâm. Nhân viên phản hồi nhanh khi mình hỏi thêm ảnh thật của sách." },
            { user: "Quang Hưng", stars: 5, comment: "Mình chọn Thư Hiên vì có nhiều bản văn học kinh điển khó tìm, cuốn này đúng như mô tả." },
            { user: "Bảo Ngọc", stars: 5, comment: "Sách phù hợp để đọc lại nhiều lần, phần dịch và trình bày dễ theo dõi." },
            { user: "Thanh Tùng", stars: 4, comment: "Đóng gói cẩn thận, giao hàng nhanh hơn dự kiến. Đặt trên kệ nhìn rất có cảm giác hoài cổ." },
            { user: "Mỹ Linh", stars: 5, comment: "Tình trạng sách tốt so với sách cũ, gáy và bìa vẫn giữ được khá đẹp." },
            { user: "Đức Anh", stars: 5, comment: "Một lựa chọn đáng có nếu thích văn học kinh điển và muốn sưu tầm bản in cũ." },
            { user: "Hà My", stars: 5 }
        ]
    },

    // 2. Văn học Việt Nam xưa
    {
        id: 9, category: "Văn học Việt Nam xưa", name: "Dế Mèn Phiêu Lưu Ký", author: "Tô Hoài",
        price: "95.000", oldPrice: "120.000", rating: 5.0, publisher: "NXB Kim Đồng", year: 2011, image: "Demenphieuluuky.jpg",
        description: "Tác phẩm thiếu nhi kinh điển nhất của văn học Việt Nam. Cuốn sách kể về những cuộc phiêu lưu kỳ thú của Dế Mèn cùng những người bạn như Dế Trũi, Xiến Tóc... Qua con mắt của loài vật, Tô Hoài đã lồng ghép những bài học sâu sắc về tình bạn, lòng dũng cảm, sự trưởng thành và khát vọng về một thế giới đại đồng hòa bình, nhân ái. Đây là lựa chọn phù hợp cho những ai muốn tìm lại không khí văn học Việt Nam qua các giai đoạn đã xa. Tác phẩm không chỉ có giá trị đọc giải trí mà còn giúp người đọc hiểu thêm về xã hội, con người, ngôn ngữ và đời sống tinh thần của từng thời kỳ. Bản sách cũ mang lại cảm giác gần gũi, thích hợp cho việc học tập, tham khảo và sưu tầm.",
        reviews: [
            { user: "Bảo Ngọc", stars: 5, comment: "Dế Mèn Phiêu Lưu Ký gợi lại nhiều ký ức về văn học Việt Nam, nội dung vẫn rất gần gũi." },
            { user: "Thanh Tùng", stars: 5, comment: "Sách được đóng gói kỹ, góc sách không bị móp khi nhận. Nhân viên phản hồi nhanh khi mình hỏi thêm ảnh thật của sách." },
            { user: "Mỹ Linh", stars: 5, comment: "Mình mua vì muốn sưu tầm các tác phẩm Việt Nam xưa, bản này khá sạch và dễ đọc." },
            { user: "Đức Anh", stars: 5, comment: "Nội dung giàu giá trị hiện thực, đọc lại vẫn thấy nhiều chi tiết đáng suy ngẫm." },
            { user: "Hà My", stars: 5, comment: "Shop tư vấn tình trạng sách đúng, giao hàng cẩn thận." },
            { user: "Minh Anh", stars: 5, comment: "Giấy có dấu thời gian nhưng không bị rách nhiều, rất hợp phong cách sách cũ." }
        ]
    },
    {
        id: 10, category: "Văn học Việt Nam xưa", name: "Tắt Đèn", author: "Ngô Tất Tố",
        price: "80.000", oldPrice: "100.000", rating: 4.7, publisher: "NXB Văn Học", year: 2007, image: "Tatden.jpg",
        description: "Một bản án đanh thép tố cáo chế độ thực dân nửa phong kiến tàn bạo đã bóc lột, chà đạp lên những người nông dân hiền lành. Nhân vật chị Dậu hiện lên như một biểu tượng của người phụ nữ Việt Nam: tảo tần, yêu chồng thương con nhưng cũng vô cùng mạnh mẽ, kiên cường khi bị dồn vào bước đường cùng. Cảnh chị Dậu chạy ra màn đêm đen đặc đã ám ảnh bao thế hệ độc giả. Đây là lựa chọn phù hợp cho những ai muốn tìm lại không khí văn học Việt Nam qua các giai đoạn đã xa. Tác phẩm không chỉ có giá trị đọc giải trí mà còn giúp người đọc hiểu thêm về xã hội, con người, ngôn ngữ và đời sống tinh thần của từng thời kỳ. Bản sách cũ mang lại cảm giác gần gũi, thích hợp cho việc học tập, tham khảo và sưu tầm.",
        reviews: [
            { user: "Đức Anh", stars: 4, comment: "Tắt Đèn gợi lại nhiều ký ức về văn học Việt Nam, nội dung vẫn rất gần gũi." },
            { user: "Hà My", stars: 5, comment: "Sách được đóng gói kỹ, góc sách không bị móp khi nhận. Nhân viên phản hồi nhanh khi mình hỏi thêm ảnh thật của sách." },
            { user: "Minh Anh", stars: 5, comment: "Mình mua vì muốn sưu tầm các tác phẩm Việt Nam xưa, bản này khá sạch và dễ đọc." },
            { user: "Hoàng Nam", stars: 5, comment: "Nội dung giàu giá trị hiện thực, đọc lại vẫn thấy nhiều chi tiết đáng suy ngẫm." },
            { user: "Thu Hà", stars: 5, comment: "Shop tư vấn tình trạng sách đúng, giao hàng cẩn thận." },
            { user: "Gia Huy", stars: 4, comment: "Giấy có dấu thời gian nhưng không bị rách nhiều, rất hợp phong cách sách cũ." },
            { user: "Ngọc Mai", stars: 5, comment: "Đáng mua cho người thích văn học Việt Nam và muốn giữ lại các tác phẩm quen thuộc." }
        ]
    },
    {
        id: 11, category: "Văn học Việt Nam xưa", name: "Số Đỏ", author: "Vũ Trọng Phụng",
        price: "185.000", oldPrice: "220.000", rating: 4.9, publisher: "NXB Trẻ", year: 2011, image: "SoDo.jpg",
        description: "Kiệt tác trào phúng xuất sắc nhất của 'ông vua phóng sự' Vũ Trọng Phụng. Tác phẩm kể về sự thăng tiến nực cười của Xuân Tóc Đỏ - từ một kẻ nhặt banh quần vợt hạ lưu bỗng chốc trở thành 'đốc tờ', 'giáo sư', 'vĩ nhân' nhờ sự lố lăng, rởm đời của xã hội thượng lưu Âu hóa rởm thời bấy giờ. Một tiếng cười chua chát nhưng vô cùng thâm thúy về thói hư tật xấu của con người. Đây là lựa chọn phù hợp cho những ai muốn tìm lại không khí văn học Việt Nam qua các giai đoạn đã xa. Tác phẩm không chỉ có giá trị đọc giải trí mà còn giúp người đọc hiểu thêm về xã hội, con người, ngôn ngữ và đời sống tinh thần của từng thời kỳ. Bản sách cũ mang lại cảm giác gần gũi, thích hợp cho việc học tập, tham khảo và sưu tầm.",
        reviews: [
            { user: "Hoàng Nam", stars: 5, comment: "Số Đỏ gợi lại nhiều ký ức về văn học Việt Nam, nội dung vẫn rất gần gũi." },
            { user: "Thu Hà", stars: 4, comment: "Sách được đóng gói kỹ, góc sách không bị móp khi nhận. Nhân viên phản hồi nhanh khi mình hỏi thêm ảnh thật của sách." },
            { user: "Gia Huy", stars: 5, comment: "Mình mua vì muốn sưu tầm các tác phẩm Việt Nam xưa, bản này khá sạch và dễ đọc." },
            { user: "Ngọc Mai", stars: 5, comment: "Nội dung giàu giá trị hiện thực, đọc lại vẫn thấy nhiều chi tiết đáng suy ngẫm." },
            { user: "Tuấn Kiệt", stars: 5, comment: "Shop tư vấn tình trạng sách đúng, giao hàng cẩn thận." },
            { user: "Linh Chi", stars: 5, comment: "Giấy có dấu thời gian nhưng không bị rách nhiều, rất hợp phong cách sách cũ." },
            { user: "Phương Thảo", stars: 5, comment: "Đáng mua cho người thích văn học Việt Nam và muốn giữ lại các tác phẩm quen thuộc." },
            { user: "Anh Duy", stars: 5, comment: "Số Đỏ gợi lại nhiều ký ức về văn học Việt Nam, nội dung vẫn rất gần gũi." }
        ]
    },
    {
        id: 12, category: "Văn học Việt Nam xưa", name: "Chí Phèo", author: "Nam Cao",
        price: "150.000", oldPrice: "180.000", rating: 5.0, publisher: "NXB Văn Học", year: 2012, image: "ChiPheo.jpg",
        description: "Truyện ngắn đỉnh cao của chủ nghĩa hiện thực phê phán Việt Nam. Nam Cao đã khắc họa bi kịch tha hóa và bi kịch bị cự tuyệt quyền làm người của Chí Phèo - một người nông dân lương thiện bị xã hội phong kiến nhào nặn thành con quỷ dữ của làng Vũ Đại. Cuộc gặp gỡ với thị Nở đã đánh thức nhân tính trong Chí, nhưng định kiến xã hội nghiệt ngã lại một lần nữa dập tắt tia hy vọng mỏng manh ấy. Đây là lựa chọn phù hợp cho những ai muốn tìm lại không khí văn học Việt Nam qua các giai đoạn đã xa. Tác phẩm không chỉ có giá trị đọc giải trí mà còn giúp người đọc hiểu thêm về xã hội, con người, ngôn ngữ và đời sống tinh thần của từng thời kỳ. Bản sách cũ mang lại cảm giác gần gũi, thích hợp cho việc học tập, tham khảo và sưu tầm.",
        reviews: [
            { user: "Ngọc Mai", stars: 5, comment: "Chí Phèo gợi lại nhiều ký ức về văn học Việt Nam, nội dung vẫn rất gần gũi." },
            { user: "Tuấn Kiệt", stars: 5, comment: "Sách được đóng gói kỹ, góc sách không bị móp khi nhận. Nhân viên phản hồi nhanh khi mình hỏi thêm ảnh thật của sách." },
            { user: "Linh Chi", stars: 5, comment: "Mình mua vì muốn sưu tầm các tác phẩm Việt Nam xưa, bản này khá sạch và dễ đọc." },
            { user: "Phương Thảo", stars: 5, comment: "Nội dung giàu giá trị hiện thực, đọc lại vẫn thấy nhiều chi tiết đáng suy ngẫm." },
            { user: "Anh Duy", stars: 5, comment: "Shop tư vấn tình trạng sách đúng, giao hàng cẩn thận." },
            { user: "Khánh Vy", stars: 5 }
        ]
    },
    {
        id: 13, category: "Văn học Việt Nam xưa", name: "Vợ Nhặt", author: "Kim Lân",
        price: "70.000", oldPrice: "90.000", rating: 4.7, publisher: "NXB Giáo Dục", year: 2009, image: "Vonhat.jpg",
        description: "Lấy bối cảnh nạn đói khủng khiếp năm 1945, Kim Lân đã viết nên một câu chuyện đầy cảm động về tình người và khát vọng sống. Việc Tràng 'nhặt' được vợ giữa lúc cái đói đang rình rập cướp đi sinh mạng từng người đã thắp lên ngọn lửa ấm áp của tình cảm gia đình. Tác phẩm là bài ca ca ngợi vẻ đẹp tâm hồn của người nông dân Việt Nam ngay bên bờ vực thẳm của cái chết. Đây là lựa chọn phù hợp cho những ai muốn tìm lại không khí văn học Việt Nam qua các giai đoạn đã xa. Tác phẩm không chỉ có giá trị đọc giải trí mà còn giúp người đọc hiểu thêm về xã hội, con người, ngôn ngữ và đời sống tinh thần của từng thời kỳ. Bản sách cũ mang lại cảm giác gần gũi, thích hợp cho việc học tập, tham khảo và sưu tầm.",
        reviews: [
            { user: "Phương Thảo", stars: 5, comment: "Vợ Nhặt gợi lại nhiều ký ức về văn học Việt Nam, nội dung vẫn rất gần gũi." },
            { user: "Anh Duy", stars: 4, comment: "Sách được đóng gói kỹ, góc sách không bị móp khi nhận. Nhân viên phản hồi nhanh khi mình hỏi thêm ảnh thật của sách." },
            { user: "Khánh Vy", stars: 5, comment: "Mình mua vì muốn sưu tầm các tác phẩm Việt Nam xưa, bản này khá sạch và dễ đọc." },
            { user: "Quang Hưng", stars: 5, comment: "Nội dung giàu giá trị hiện thực, đọc lại vẫn thấy nhiều chi tiết đáng suy ngẫm." },
            { user: "Bảo Ngọc", stars: 4, comment: "Shop tư vấn tình trạng sách đúng, giao hàng cẩn thận." },
            { user: "Thanh Tùng", stars: 5, comment: "Giấy có dấu thời gian nhưng không bị rách nhiều, rất hợp phong cách sách cũ." },
            { user: "Mỹ Linh", stars: 5, comment: "Đáng mua cho người thích văn học Việt Nam và muốn giữ lại các tác phẩm quen thuộc." }
        ]
    },
    {
        id: 14, category: "Văn học Việt Nam xưa", name: "Tuổi Thơ Dữ Dội", author: "Phùng Quán",
        price: "210.000", oldPrice: "250.000", rating: 4.9, publisher: "NXB Trẻ", year: 2010, image: "Tuoithodudoi.jpg",
        description: "Một cuốn tiểu thuyết cảm động và hào hùng về Đội thiếu niên trinh sát của trung đoàn Trần Cao Vân trong cuộc kháng chiến chống Pháp tại Huế. Những chú bé như Mừng, Quỳnh sơn ca, Vịnh sưa, Bồng da rắn... tuổi đời còn rất nhỏ nhưng đã mang trong mình tình yêu nước mãnh liệt, sẵn sàng hy sinh thân mình cho độc lập dân tộc. Một khúc tráng ca rơi nước mắt về những anh hùng tuổi nhỏ. Đây là lựa chọn phù hợp cho những ai muốn tìm lại không khí văn học Việt Nam qua các giai đoạn đã xa. Tác phẩm không chỉ có giá trị đọc giải trí mà còn giúp người đọc hiểu thêm về xã hội, con người, ngôn ngữ và đời sống tinh thần của từng thời kỳ. Bản sách cũ mang lại cảm giác gần gũi, thích hợp cho việc học tập, tham khảo và sưu tầm.",
        reviews: [
            { user: "Quang Hưng", stars: 4, comment: "Tuổi Thơ Dữ Dội gợi lại nhiều ký ức về văn học Việt Nam, nội dung vẫn rất gần gũi." },
            { user: "Bảo Ngọc", stars: 5, comment: "Sách được đóng gói kỹ, góc sách không bị móp khi nhận. Nhân viên phản hồi nhanh khi mình hỏi thêm ảnh thật của sách." },
            { user: "Thanh Tùng", stars: 5, comment: "Mình mua vì muốn sưu tầm các tác phẩm Việt Nam xưa, bản này khá sạch và dễ đọc." },
            { user: "Mỹ Linh", stars: 5, comment: "Nội dung giàu giá trị hiện thực, đọc lại vẫn thấy nhiều chi tiết đáng suy ngẫm." },
            { user: "Đức Anh", stars: 5, comment: "Shop tư vấn tình trạng sách đúng, giao hàng cẩn thận." },
            { user: "Hà My", stars: 5, comment: "Giấy có dấu thời gian nhưng không bị rách nhiều, rất hợp phong cách sách cũ." },
            { user: "Minh Anh", stars: 5, comment: "Đáng mua cho người thích văn học Việt Nam và muốn giữ lại các tác phẩm quen thuộc." },
            { user: "Hoàng Nam", stars: 5, comment: "Tuổi Thơ Dữ Dội gợi lại nhiều ký ức về văn học Việt Nam, nội dung vẫn rất gần gũi." }
        ]
    },
    {
        id: 15, category: "Văn học Việt Nam xưa", name: "Kính Vạn Hoa", author: "Nguyễn Nhật Ánh",
        price: "500.000", oldPrice: "600.000", rating: 5.0, publisher: "NXB Kim Đồng", year: 2004, image: "Kinhvanhoa.jpg",
        description: "Bộ truyện tuổi thơ gắn liền với biết bao thế hệ học trò Việt Nam. Kính Vạn Hoa xoay quanh bộ ba Quý ròm, Tiểu Long và nhỏ Hạnh với những trò nghịch ngợm, những bài học học đường, những vụ án thám tử tuổi teen đầy thú vị. Mỗi tập truyện là một lăng kính đầy màu sắc, lấp lánh niềm vui, tình bạn và những rung động trong sáng của tuổi mới lớn. Đây là lựa chọn phù hợp cho những ai muốn tìm lại không khí văn học Việt Nam qua các giai đoạn đã xa. Tác phẩm không chỉ có giá trị đọc giải trí mà còn giúp người đọc hiểu thêm về xã hội, con người, ngôn ngữ và đời sống tinh thần của từng thời kỳ. Bản sách cũ mang lại cảm giác gần gũi, thích hợp cho việc học tập, tham khảo và sưu tầm.",
        reviews: [
            { user: "Mỹ Linh", stars: 5, comment: "Kính Vạn Hoa gợi lại nhiều ký ức về văn học Việt Nam, nội dung vẫn rất gần gũi." },
            { user: "Đức Anh", stars: 5, comment: "Sách được đóng gói kỹ, góc sách không bị móp khi nhận. Nhân viên phản hồi nhanh khi mình hỏi thêm ảnh thật của sách." },
            { user: "Hà My", stars: 5, comment: "Mình mua vì muốn sưu tầm các tác phẩm Việt Nam xưa, bản này khá sạch và dễ đọc." },
            { user: "Minh Anh", stars: 5, comment: "Nội dung giàu giá trị hiện thực, đọc lại vẫn thấy nhiều chi tiết đáng suy ngẫm." },
            { user: "Hoàng Nam", stars: 5, comment: "Shop tư vấn tình trạng sách đúng, giao hàng cẩn thận." },
            { user: "Thu Hà", stars: 5, comment: "Giấy có dấu thời gian nhưng không bị rách nhiều, rất hợp phong cách sách cũ." }
        ]
    },
    {
        id: 16, category: "Văn học Việt Nam xưa", name: "Cho Tôi Xin Một Vé Đi Tuổi Thơ", author: "Nguyễn Nhật Ánh",
        price: "110.000", oldPrice: "140.000", rating: 4.7, publisher: "NXB Trẻ", year: 2008, image: "Chotoixinmotvedituoitho.jpg",
        description: "Một chuyến tàu kỳ diệu đưa người đọc trở về những năm tháng tuổi thơ hồn nhiên, trong trẻo. Qua góc nhìn của cậu bé Mùi, thế giới của người lớn hiện lên đầy rập khuôn và nhàm chán, trong khi thế giới của lũ trẻ lại tràn ngập trí tưởng tượng và sự nổi loạn đáng yêu. Cuốn sách không chỉ dành cho trẻ em mà còn là lời nhắc nhở sâu sắc dành cho những người đã từng là trẻ con. Đây là lựa chọn phù hợp cho những ai muốn tìm lại không khí văn học Việt Nam qua các giai đoạn đã xa. Tác phẩm không chỉ có giá trị đọc giải trí mà còn giúp người đọc hiểu thêm về xã hội, con người, ngôn ngữ và đời sống tinh thần của từng thời kỳ. Bản sách cũ mang lại cảm giác gần gũi, thích hợp cho việc học tập, tham khảo và sưu tầm.",
        reviews: [
            { user: "Minh Anh", stars: 5, comment: "Cho Tôi Xin Một Vé Đi Tuổi Thơ gợi lại nhiều ký ức về văn học Việt Nam, nội dung vẫn rất gần gũi." },
            { user: "Hoàng Nam", stars: 4, comment: "Sách được đóng gói kỹ, góc sách không bị móp khi nhận. Nhân viên phản hồi nhanh khi mình hỏi thêm ảnh thật của sách." },
            { user: "Thu Hà", stars: 4, comment: "Mình mua vì muốn sưu tầm các tác phẩm Việt Nam xưa, bản này khá sạch và dễ đọc." },
            { user: "Gia Huy", stars: 5, comment: "Nội dung giàu giá trị hiện thực, đọc lại vẫn thấy nhiều chi tiết đáng suy ngẫm." },
            { user: "Ngọc Mai", stars: 5, comment: "Shop tư vấn tình trạng sách đúng, giao hàng cẩn thận." },
            { user: "Tuấn Kiệt", stars: 5, comment: "Giấy có dấu thời gian nhưng không bị rách nhiều, rất hợp phong cách sách cũ." },
            { user: "Linh Chi", stars: 5 }
        ]
    },

    // 3. Triết học & Tư tưởng
    {
        id: 17, category: "Triết học & Tư tưởng", name: "Bàn Về Tự Do", author: "John Stuart Mill",
        price: "130.000", oldPrice: "160.000", rating: 4.8, publisher: "NXB Tri Thức", year: 2007, image: "Banvetudo.jpg",
        description: "Một trong những tác phẩm triết học chính trị nền tảng của phương Tây hiện đại. J.S. Mill biện luận sắc bén về quyền tự do cá nhân, giới hạn quyền lực của nhà nước và xã hội đối với một công dân. Ông khẳng định rằng tự do ngôn luận và tự do tư tưởng là điều kiện tiên quyết cho sự phát triển của tri thức và tiến bộ xã hội. Cuốn sách thích hợp để đọc theo từng phần nhỏ, kết hợp ghi chú và đối chiếu với trải nghiệm cá nhân. Giá trị của tác phẩm không nằm ở việc đọc nhanh mà ở khả năng khơi gợi câu hỏi, buộc người đọc suy nghĩ về tự do, đạo đức, ý nghĩa sống và trách nhiệm của bản thân. Đây là một đầu sách nên có trong tủ sách nền tảng về tư tưởng.",
        reviews: [
            { user: "Gia Huy", stars: 5, comment: "Bàn Về Tự Do không phải sách dễ đọc, nhưng càng đọc càng thấy nhiều ý đáng suy ngẫm." },
            { user: "Ngọc Mai", stars: 4, comment: "Mình thích cách shop mô tả tình trạng sách rõ ràng, nhận hàng đúng kỳ vọng. Nhân viên phản hồi nhanh khi mình hỏi thêm ảnh thật của sách." },
            { user: "Tuấn Kiệt", stars: 4, comment: "Sách phù hợp để đọc chậm, ghi chú và quay lại nhiều lần." },
            { user: "Linh Chi", stars: 5, comment: "Bìa và ruột sách còn ổn, đóng gói chắc nên không bị cong mép. Mình sẽ đọc lại từng chương để ghi chú kỹ hơn." },
            { user: "Phương Thảo", stars: 5, comment: "Nội dung giúp mình có thêm góc nhìn về tư tưởng và cách sống." },
            { user: "Anh Duy", stars: 5, comment: "Giao hàng ổn, sách cũ nhưng sạch và không có mùi ẩm nặng." },
            { user: "Khánh Vy", stars: 5, comment: "Một cuốn nên có nếu đang tìm sách nền tảng về triết học, tư tưởng." },
            { user: "Quang Hưng", stars: 5, comment: "Bàn Về Tự Do không phải sách dễ đọc, nhưng càng đọc càng thấy nhiều ý đáng suy ngẫm." }
        ]
    },
    {
        id: 18, category: "Triết học & Tư tưởng", name: "Cộng Hòa — Plato", author: "Plato",
        price: "250.000", oldPrice: "300.000", rating: 5.0, publisher: "NXB Thế Giới", year: 2013, image: "Conghoa.jpg",
        description: "Tác phẩm kinh điển vĩ đại nhất của triết học Hy Lạp cổ đại, được viết dưới dạng các cuộc đối thoại của Socrates. Plato khám phá các khái niệm về công lý, trật tự xã hội và bản chất của một quốc gia lý tưởng (Utopia). Đặc biệt, 'Ẩn dụ cái hang' nổi tiếng trong sách đã trở thành nền tảng cho nhận thức luận của con người về thực tại và ảo ảnh. Cuốn sách thích hợp để đọc theo từng phần nhỏ, kết hợp ghi chú và đối chiếu với trải nghiệm cá nhân. Giá trị của tác phẩm không nằm ở việc đọc nhanh mà ở khả năng khơi gợi câu hỏi, buộc người đọc suy nghĩ về tự do, đạo đức, ý nghĩa sống và trách nhiệm của bản thân. Đây là một đầu sách nên có trong tủ sách nền tảng về tư tưởng.",
        reviews: [
            { user: "Linh Chi", stars: 5, comment: "Cộng Hòa — Plato không phải sách dễ đọc, nhưng càng đọc càng thấy nhiều ý đáng suy ngẫm." },
            { user: "Phương Thảo", stars: 5, comment: "Mình thích cách shop mô tả tình trạng sách rõ ràng, nhận hàng đúng kỳ vọng. Nhân viên phản hồi nhanh khi mình hỏi thêm ảnh thật của sách." },
            { user: "Anh Duy", stars: 5, comment: "Sách phù hợp để đọc chậm, ghi chú và quay lại nhiều lần." },
            { user: "Khánh Vy", stars: 5, comment: "Bìa và ruột sách còn ổn, đóng gói chắc nên không bị cong mép. Mình sẽ đọc lại từng chương để ghi chú kỹ hơn." },
            { user: "Quang Hưng", stars: 5, comment: "Nội dung giúp mình có thêm góc nhìn về tư tưởng và cách sống." },
            { user: "Bảo Ngọc", stars: 5, comment: "Giao hàng ổn, sách cũ nhưng sạch và không có mùi ẩm nặng." }
        ]
    },
    {
        id: 19, category: "Triết học & Tư tưởng", name: "Đạo Đức Kinh", author: "Lão Tử",
        price: "220.000", oldPrice: "260.000", rating: 4.7, publisher: "NXB Văn Học", year: 2006, image: "Daoduckinh.jpg",
        description: "Bộ kỳ thư vô giá của triết học phương Đông, đặt nền móng cho Đạo giáo. Qua 81 chương ngắn gọn, súc tích, Lão Tử truyền đạt những tư tưởng uyên áo về 'Đạo' - cội nguồn của vũ trụ vạn vật, và 'Đức' - cách sống thuận theo tự nhiên. Khái niệm 'Vô vi' (không làm gì trái tự nhiên) đã mang đến sự tĩnh tại, thông thái cho vô số thế hệ người đọc. Cuốn sách thích hợp để đọc theo từng phần nhỏ, kết hợp ghi chú và đối chiếu với trải nghiệm cá nhân. Giá trị của tác phẩm không nằm ở việc đọc nhanh mà ở khả năng khơi gợi câu hỏi, buộc người đọc suy nghĩ về tự do, đạo đức, ý nghĩa sống và trách nhiệm của bản thân. Đây là một đầu sách nên có trong tủ sách nền tảng về tư tưởng.",
        reviews: [
            { user: "Khánh Vy", stars: 4, comment: "Đạo Đức Kinh không phải sách dễ đọc, nhưng càng đọc càng thấy nhiều ý đáng suy ngẫm." },
            { user: "Quang Hưng", stars: 5, comment: "Mình thích cách shop mô tả tình trạng sách rõ ràng, nhận hàng đúng kỳ vọng. Nhân viên phản hồi nhanh khi mình hỏi thêm ảnh thật của sách." },
            { user: "Bảo Ngọc", stars: 5, comment: "Sách phù hợp để đọc chậm, ghi chú và quay lại nhiều lần." },
            { user: "Thanh Tùng", stars: 5, comment: "Bìa và ruột sách còn ổn, đóng gói chắc nên không bị cong mép. Mình sẽ đọc lại từng chương để ghi chú kỹ hơn." },
            { user: "Mỹ Linh", stars: 5, comment: "Nội dung giúp mình có thêm góc nhìn về tư tưởng và cách sống." },
            { user: "Đức Anh", stars: 4, comment: "Giao hàng ổn, sách cũ nhưng sạch và không có mùi ẩm nặng." },
            { user: "Hà My", stars: 5, comment: "Một cuốn nên có nếu đang tìm sách nền tảng về triết học, tư tưởng." }
        ]
    },
    {
        id: 20, category: "Triết học & Tư tưởng", name: "Quân Vương", author: "Machiavelli",
        price: "140.000", oldPrice: "170.000", rating: 4.6, publisher: "Alpha Books", year: 2011, image: "Quanvuong.jpg",
        description: "Một cuốn cẩm nang chính trị gây tranh cãi nhất mọi thời đại. Machiavelli đã phá vỡ những quan niệm đạo đức truyền thống để đưa ra các phương pháp thực dụng, thậm chí tàn nhẫn, giúp một nhà cai trị nắm giữ và duy trì quyền lực. Dù bị chỉ trích là 'sách dạy làm ác', Quân Vương vẫn là tài liệu kinh điển không thể bỏ qua để hiểu về bản chất của chính trị thực dụng. Cuốn sách thích hợp để đọc theo từng phần nhỏ, kết hợp ghi chú và đối chiếu với trải nghiệm cá nhân. Giá trị của tác phẩm không nằm ở việc đọc nhanh mà ở khả năng khơi gợi câu hỏi, buộc người đọc suy nghĩ về tự do, đạo đức, ý nghĩa sống và trách nhiệm của bản thân. Đây là một đầu sách nên có trong tủ sách nền tảng về tư tưởng.",
        reviews: [
            { user: "Thanh Tùng", stars: 4, comment: "Quân Vương không phải sách dễ đọc, nhưng càng đọc càng thấy nhiều ý đáng suy ngẫm." },
            { user: "Mỹ Linh", stars: 5, comment: "Mình thích cách shop mô tả tình trạng sách rõ ràng, nhận hàng đúng kỳ vọng. Nhân viên phản hồi nhanh khi mình hỏi thêm ảnh thật của sách." },
            { user: "Đức Anh", stars: 5, comment: "Sách phù hợp để đọc chậm, ghi chú và quay lại nhiều lần." },
            { user: "Hà My", stars: 5, comment: "Bìa và ruột sách còn ổn, đóng gói chắc nên không bị cong mép. Mình sẽ đọc lại từng chương để ghi chú kỹ hơn." },
            { user: "Minh Anh", stars: 4, comment: "Nội dung giúp mình có thêm góc nhìn về tư tưởng và cách sống." },
            { user: "Hoàng Nam", stars: 5, comment: "Giao hàng ổn, sách cũ nhưng sạch và không có mùi ẩm nặng." },
            { user: "Thu Hà", stars: 5, comment: "Một cuốn nên có nếu đang tìm sách nền tảng về triết học, tư tưởng." },
            { user: "Gia Huy", stars: 4 }
        ]
    },
    {
        id: 21, category: "Triết học & Tư tưởng", name: "Thus Spoke Zarathustra", author: "Friedrich Nietzsche",
        price: "190.000", oldPrice: "230.000", rating: 4.8, publisher: "NXB Tri Thức", year: 2008, image: "Thus.jpg",
        description: "Tác phẩm triết học mang đậm chất thi ca của Nietzsche, nơi ông giới thiệu những tư tưởng chấn động như 'Chúa đã chết' và khái niệm 'Siêu nhân' (Übermensch). Zarathustra, một nhà ẩn tu bước xuống núi để giảng đạo, đã kêu gọi con người vượt qua những giới hạn đạo đức cũ kỹ, tự sáng tạo ra ý nghĩa và giá trị cho cuộc đời mình giữa một thế giới đầy hoang mang. Cuốn sách thích hợp để đọc theo từng phần nhỏ, kết hợp ghi chú và đối chiếu với trải nghiệm cá nhân. Giá trị của tác phẩm không nằm ở việc đọc nhanh mà ở khả năng khơi gợi câu hỏi, buộc người đọc suy nghĩ về tự do, đạo đức, ý nghĩa sống và trách nhiệm của bản thân. Đây là một đầu sách nên có trong tủ sách nền tảng về tư tưởng.",
        reviews: [
            { user: "Hà My", stars: 4, comment: "Thus Spoke Zarathustra không phải sách dễ đọc, nhưng càng đọc càng thấy nhiều ý đáng suy ngẫm." },
            { user: "Minh Anh", stars: 5, comment: "Mình thích cách shop mô tả tình trạng sách rõ ràng, nhận hàng đúng kỳ vọng. Nhân viên phản hồi nhanh khi mình hỏi thêm ảnh thật của sách." },
            { user: "Hoàng Nam", stars: 5, comment: "Sách phù hợp để đọc chậm, ghi chú và quay lại nhiều lần." },
            { user: "Thu Hà", stars: 5, comment: "Bìa và ruột sách còn ổn, đóng gói chắc nên không bị cong mép. Mình sẽ đọc lại từng chương để ghi chú kỹ hơn." },
            { user: "Gia Huy", stars: 5, comment: "Nội dung giúp mình có thêm góc nhìn về tư tưởng và cách sống." },
            { user: "Ngọc Mai", stars: 5, comment: "Giao hàng ổn, sách cũ nhưng sạch và không có mùi ẩm nặng." }
        ]
    },
    {
        id: 22, category: "Triết học & Tư tưởng", name: "Thuyết Hiện Sinh Là Một Thuyết Nhân Bản", author: "Jean-Paul Sartre",
        price: "120.000", oldPrice: "150.000", rating: 4.7, publisher: "NXB Tri Thức", year: 2015, image: "Thuyethiensinhlamotthuyetnhanban.jpg",
        description: "Bài diễn thuyết nổi tiếng của Sartre, có tính chất như một bản tuyên ngôn ngắn gọn, dễ hiểu nhất về Chủ nghĩa Hiện sinh. Ông khẳng định 'Hiện hữu có trước bản chất', nghĩa là con người sinh ra trước, sau đó mới thông qua những hành động và sự lựa chọn tự do của mình để định nghĩa bản thân là ai. Cuốn sách là lời cổ vũ mạnh mẽ cho tinh thần trách nhiệm cá nhân. Cuốn sách thích hợp để đọc theo từng phần nhỏ, kết hợp ghi chú và đối chiếu với trải nghiệm cá nhân. Giá trị của tác phẩm không nằm ở việc đọc nhanh mà ở khả năng khơi gợi câu hỏi, buộc người đọc suy nghĩ về tự do, đạo đức, ý nghĩa sống và trách nhiệm của bản thân. Đây là một đầu sách nên có trong tủ sách nền tảng về tư tưởng.",
        reviews: [
            { user: "Thu Hà", stars: 5, comment: "Thuyết Hiện Sinh Là Một Thuyết Nhân Bản không phải sách dễ đọc, nhưng càng đọc càng thấy nhiều ý đáng suy ngẫm." },
            { user: "Gia Huy", stars: 5, comment: "Mình thích cách shop mô tả tình trạng sách rõ ràng, nhận hàng đúng kỳ vọng. Nhân viên phản hồi nhanh khi mình hỏi thêm ảnh thật của sách." },
            { user: "Ngọc Mai", stars: 5, comment: "Sách phù hợp để đọc chậm, ghi chú và quay lại nhiều lần." },
            { user: "Tuấn Kiệt", stars: 5, comment: "Bìa và ruột sách còn ổn, đóng gói chắc nên không bị cong mép. Mình sẽ đọc lại từng chương để ghi chú kỹ hơn." },
            { user: "Linh Chi", stars: 4, comment: "Nội dung giúp mình có thêm góc nhìn về tư tưởng và cách sống." },
            { user: "Phương Thảo", stars: 5, comment: "Giao hàng ổn, sách cũ nhưng sạch và không có mùi ẩm nặng." },
            { user: "Anh Duy", stars: 4, comment: "Một cuốn nên có nếu đang tìm sách nền tảng về triết học, tư tưởng." }
        ]
    },
    {
        id: 23, category: "Triết học & Tư tưởng", name: "Nghệ Thuật Yêu", author: "Erich Fromm",
        price: "110.000", oldPrice: "140.000", rating: 4.8, publisher: "Nhã Nam", year: 2018, image: "Nghethuatyeu.jpg",
        description: "Trái với suy nghĩ thông thường rằng tình yêu chỉ là một cảm xúc tự phát, nhà phân tâm học Erich Fromm khẳng định tình yêu là một 'nghệ thuật' đòi hỏi tri thức và sự nỗ lực thực hành. Cuốn sách mổ xẻ các khía cạnh của tình yêu: tình yêu thương cha mẹ, tình yêu anh em, tình yêu đôi lứa, tình yêu bản thân và tình yêu Thượng đế, giúp người đọc nhận thức sâu sắc hơn về cách yêu thương đích thực. Cuốn sách thích hợp để đọc theo từng phần nhỏ, kết hợp ghi chú và đối chiếu với trải nghiệm cá nhân. Giá trị của tác phẩm không nằm ở việc đọc nhanh mà ở khả năng khơi gợi câu hỏi, buộc người đọc suy nghĩ về tự do, đạo đức, ý nghĩa sống và trách nhiệm của bản thân. Đây là một đầu sách nên có trong tủ sách nền tảng về tư tưởng.",
        reviews: [
            { user: "Tuấn Kiệt", stars: 5, comment: "Nghệ Thuật Yêu không phải sách dễ đọc, nhưng càng đọc càng thấy nhiều ý đáng suy ngẫm." },
            { user: "Linh Chi", stars: 5, comment: "Mình thích cách shop mô tả tình trạng sách rõ ràng, nhận hàng đúng kỳ vọng. Nhân viên phản hồi nhanh khi mình hỏi thêm ảnh thật của sách." },
            { user: "Phương Thảo", stars: 4, comment: "Sách phù hợp để đọc chậm, ghi chú và quay lại nhiều lần." },
            { user: "Anh Duy", stars: 5, comment: "Bìa và ruột sách còn ổn, đóng gói chắc nên không bị cong mép. Mình sẽ đọc lại từng chương để ghi chú kỹ hơn." },
            { user: "Khánh Vy", stars: 5, comment: "Nội dung giúp mình có thêm góc nhìn về tư tưởng và cách sống." },
            { user: "Quang Hưng", stars: 4, comment: "Giao hàng ổn, sách cũ nhưng sạch và không có mùi ẩm nặng." },
            { user: "Bảo Ngọc", stars: 5, comment: "Một cuốn nên có nếu đang tìm sách nền tảng về triết học, tư tưởng." },
            { user: "Thanh Tùng", stars: 5, comment: "Nghệ Thuật Yêu không phải sách dễ đọc, nhưng càng đọc càng thấy nhiều ý đáng suy ngẫm." }
        ]
    },
    {
        id: 24, category: "Triết học & Tư tưởng", name: "Meditations", author: "Marcus Aurelius",
        price: "150.000", oldPrice: "180.000", rating: 5.0, publisher: "Spiderum", year: 2020, image: "Meditations.jpg",
        description: "Được viết dưới dạng nhật ký cá nhân của một vị Hoàng đế La Mã vĩ đại, 'Suy Tưởng' là tập hợp những suy ngẫm sâu sắc về triết lý Khắc kỷ (Stoicism). Marcus Aurelius nhắc nhở bản thân về tính tạm bợ của cuộc đời, tầm quan trọng của việc kiểm soát cảm xúc, làm chủ tâm trí và sống đúng với bản tính lương thiện giữa một thế giới đầy rẫy biến động và phiền não. Cuốn sách thích hợp để đọc theo từng phần nhỏ, kết hợp ghi chú và đối chiếu với trải nghiệm cá nhân. Giá trị của tác phẩm không nằm ở việc đọc nhanh mà ở khả năng khơi gợi câu hỏi, buộc người đọc suy nghĩ về tự do, đạo đức, ý nghĩa sống và trách nhiệm của bản thân. Đây là một đầu sách nên có trong tủ sách nền tảng về tư tưởng.",
        reviews: [
            { user: "Anh Duy", stars: 5, comment: "Meditations không phải sách dễ đọc, nhưng càng đọc càng thấy nhiều ý đáng suy ngẫm." },
            { user: "Khánh Vy", stars: 5, comment: "Mình thích cách shop mô tả tình trạng sách rõ ràng, nhận hàng đúng kỳ vọng. Nhân viên phản hồi nhanh khi mình hỏi thêm ảnh thật của sách." },
            { user: "Quang Hưng", stars: 5, comment: "Sách phù hợp để đọc chậm, ghi chú và quay lại nhiều lần." },
            { user: "Bảo Ngọc", stars: 5, comment: "Bìa và ruột sách còn ổn, đóng gói chắc nên không bị cong mép. Mình sẽ đọc lại từng chương để ghi chú kỹ hơn." },
            { user: "Thanh Tùng", stars: 5, comment: "Nội dung giúp mình có thêm góc nhìn về tư tưởng và cách sống." },
            { user: "Mỹ Linh", stars: 5 }
        ]
    },

    // 4. Lịch sử & Văn minh
    {
        id: 25, category: "Lịch sử & Văn minh", name: "Việt Nam Sử Lược", author: "Trần Trọng Kim",
        price: "3.500.000", oldPrice: "4.000.000", rating: 4.9, publisher: "Nhã Nam", year: 2015, image: "Vietnamsuluoc.jpg",
        description: "Đây là cuốn sử Việt Nam đầu tiên được viết bằng chữ Quốc ngữ một cách hệ thống, khoa học và dễ hiểu. Học giả Trần Trọng Kim đã tóm lược toàn bộ dòng chảy lịch sử hào hùng của dân tộc từ thời Hồng Bàng dựng nước cho đến thời kỳ Pháp thuộc. Một tài liệu vô giá, có sức ảnh hưởng sâu rộng đến nhiều thế hệ người Việt trong việc tìm hiểu cội nguồn dân tộc. Tác phẩm phù hợp với độc giả yêu thích lịch sử, văn hóa và các lát cắt phát triển của nhân loại. Cách trình bày giúp người đọc có thêm bối cảnh để hiểu các biến động xã hội, chính trị và văn minh qua từng thời kỳ. Với bản sách cũ, giá trị không chỉ nằm ở tri thức mà còn ở cảm giác lưu giữ một tư liệu đã đi qua thời gian.",
        reviews: [
            { user: "Bảo Ngọc", stars: 5, comment: "Việt Nam Sử Lược có nhiều thông tin đáng đọc, phù hợp để tra cứu và đọc lâu dài." },
            { user: "Thanh Tùng", stars: 5, comment: "Sách dày nhưng được bọc rất chắc, khi nhận không bị va đập. Nhân viên phản hồi nhanh khi mình hỏi thêm ảnh thật của sách." },
            { user: "Mỹ Linh", stars: 5, comment: "Mình chọn cửa hàng vì có nhiều đầu sách lịch sử khó tìm và mô tả khá kỹ." },
            { user: "Đức Anh", stars: 5, comment: "Nội dung mở rộng hiểu biết về lịch sử, văn minh và bối cảnh xã hội. Mình sẽ đọc lại từng chương để ghi chú kỹ hơn." },
            { user: "Hà My", stars: 5, comment: "Tình trạng sách đúng hình, giấy còn đọc tốt." },
            { user: "Minh Anh", stars: 4, comment: "Giao hàng hơi chậm một chút nhưng đóng gói cẩn thận." },
            { user: "Hoàng Nam", stars: 5, comment: "Rất hợp với người thích sưu tầm sách lịch sử có giá trị tham khảo." }
        ]
    },
    {
        id: 26, category: "Lịch sử & Văn minh", name: "Đại Việt Sử Ký Toàn Thư", author: "Ngô Sĩ Liên",
        price: "850.000", oldPrice: "1.000.000", rating: 5.0, publisher: "NXB Khoa Học Xã Hội", year: 2010, image: "Daivietsukytoanthu.jpg",
        description: "Bộ quốc sử đồ sộ và lâu đời nhất của Việt Nam còn tồn tại toàn vẹn đến ngày nay. Tác phẩm ghi chép lại các sự kiện lịch sử trọng đại, các vương triều, những cuộc chiến tranh vệ quốc và những thay đổi văn hóa của Đại Việt từ thời Hồng Bàng đến thời Hậu Lê. Đây là di sản văn hóa, lịch sử vĩ đại, niềm tự hào của học thuật nước nhà. Tác phẩm phù hợp với độc giả yêu thích lịch sử, văn hóa và các lát cắt phát triển của nhân loại. Cách trình bày giúp người đọc có thêm bối cảnh để hiểu các biến động xã hội, chính trị và văn minh qua từng thời kỳ. Với bản sách cũ, giá trị không chỉ nằm ở tri thức mà còn ở cảm giác lưu giữ một tư liệu đã đi qua thời gian.",
        reviews: [
            { user: "Đức Anh", stars: 5, comment: "Đại Việt Sử Ký Toàn Thư có nhiều thông tin đáng đọc, phù hợp để tra cứu và đọc lâu dài." },
            { user: "Hà My", stars: 5, comment: "Sách dày nhưng được bọc rất chắc, khi nhận không bị va đập. Nhân viên phản hồi nhanh khi mình hỏi thêm ảnh thật của sách." },
            { user: "Minh Anh", stars: 5, comment: "Mình chọn cửa hàng vì có nhiều đầu sách lịch sử khó tìm và mô tả khá kỹ." },
            { user: "Hoàng Nam", stars: 5, comment: "Nội dung mở rộng hiểu biết về lịch sử, văn minh và bối cảnh xã hội. Mình sẽ đọc lại từng chương để ghi chú kỹ hơn." },
            { user: "Thu Hà", stars: 5, comment: "Tình trạng sách đúng hình, giấy còn đọc tốt." },
            { user: "Gia Huy", stars: 5, comment: "Giao hàng hơi chậm một chút nhưng đóng gói cẩn thận." },
            { user: "Ngọc Mai", stars: 5, comment: "Rất hợp với người thích sưu tầm sách lịch sử có giá trị tham khảo." },
            { user: "Tuấn Kiệt", stars: 5, comment: "Đại Việt Sử Ký Toàn Thư có nhiều thông tin đáng đọc, phù hợp để tra cứu và đọc lâu dài." }
        ]
    },
    {
        id: 27, category: "Lịch sử & Văn minh", name: "Sapiens", author: "Yuval Noah Harari",
        price: "350.000", oldPrice: "420.000", rating: 5.0, publisher: "Omega+", year: 2017, image: "Sapiens.jpg",
        description: "Một cuốn sách mang góc nhìn tiến hóa đột phá, tóm tắt lịch sử của loài người từ những vượn nhân sơ khai cho đến con người hiện đại làm chủ thế giới. Tác giả đưa ra những góc nhìn sắc sảo về Cách mạng Nhận thức, Cách mạng Nông nghiệp và Cách mạng Khoa học, giải thích cách mà những huyền thoại, tôn giáo, tiền bạc và luật pháp đã gắn kết loài Sapiens lại với nhau. Tác phẩm phù hợp với độc giả yêu thích lịch sử, văn hóa và các lát cắt phát triển của nhân loại. Cách trình bày giúp người đọc có thêm bối cảnh để hiểu các biến động xã hội, chính trị và văn minh qua từng thời kỳ. Với bản sách cũ, giá trị không chỉ nằm ở tri thức mà còn ở cảm giác lưu giữ một tư liệu đã đi qua thời gian.",
        reviews: [
            { user: "Hoàng Nam", stars: 5, comment: "Sapiens có nhiều thông tin đáng đọc, phù hợp để tra cứu và đọc lâu dài." },
            { user: "Thu Hà", stars: 5, comment: "Sách dày nhưng được bọc rất chắc, khi nhận không bị va đập. Nhân viên phản hồi nhanh khi mình hỏi thêm ảnh thật của sách." },
            { user: "Gia Huy", stars: 5, comment: "Mình chọn cửa hàng vì có nhiều đầu sách lịch sử khó tìm và mô tả khá kỹ." },
            { user: "Ngọc Mai", stars: 5, comment: "Nội dung mở rộng hiểu biết về lịch sử, văn minh và bối cảnh xã hội. Mình sẽ đọc lại từng chương để ghi chú kỹ hơn." },
            { user: "Tuấn Kiệt", stars: 5, comment: "Tình trạng sách đúng hình, giấy còn đọc tốt." },
            { user: "Linh Chi", stars: 5, comment: "Giao hàng hơi chậm một chút nhưng đóng gói cẩn thận." }
        ]
    },
    {
        id: 28, category: "Lịch sử & Văn minh", name: "Lược Sử Thời Gian", author: "Stephen Hawking",
        price: "180.000", oldPrice: "220.000", rating: 4.7, publisher: "NXB Trẻ", year: 2015, image: "Luocsuthoigian.jpg",
        description: "Tác phẩm phổ biến khoa học nổi tiếng nhất của thiên tài vật lý Stephen Hawking. Cuốn sách đưa người đọc vào một chuyến du hành vũ trụ đầy kỳ thú, giải thích những khái niệm phức tạp như lỗ đen, vụ nổ Big Bang, mũi tên thời gian và thuyết tương đối bằng một ngôn ngữ giản dị, giúp chúng ta hiểu hơn về nguồn gốc và số phận của vũ trụ. Tác phẩm phù hợp với độc giả yêu thích lịch sử, văn hóa và các lát cắt phát triển của nhân loại. Cách trình bày giúp người đọc có thêm bối cảnh để hiểu các biến động xã hội, chính trị và văn minh qua từng thời kỳ. Với bản sách cũ, giá trị không chỉ nằm ở tri thức mà còn ở cảm giác lưu giữ một tư liệu đã đi qua thời gian.",
        reviews: [
            { user: "Ngọc Mai", stars: 5, comment: "Lược Sử Thời Gian có nhiều thông tin đáng đọc, phù hợp để tra cứu và đọc lâu dài." },
            { user: "Tuấn Kiệt", stars: 5, comment: "Sách dày nhưng được bọc rất chắc, khi nhận không bị va đập. Nhân viên phản hồi nhanh khi mình hỏi thêm ảnh thật của sách." },
            { user: "Linh Chi", stars: 5, comment: "Mình chọn cửa hàng vì có nhiều đầu sách lịch sử khó tìm và mô tả khá kỹ." },
            { user: "Phương Thảo", stars: 5, comment: "Nội dung mở rộng hiểu biết về lịch sử, văn minh và bối cảnh xã hội. Mình sẽ đọc lại từng chương để ghi chú kỹ hơn." },
            { user: "Anh Duy", stars: 4, comment: "Tình trạng sách đúng hình, giấy còn đọc tốt." },
            { user: "Khánh Vy", stars: 5, comment: "Giao hàng hơi chậm một chút nhưng đóng gói cẩn thận." },
            { user: "Quang Hưng", stars: 4 }
        ]
    },
    {
        id: 29, category: "Lịch sử & Văn minh", name: "Silk Roads", author: "Peter Frankopan",
        price: "320.000", oldPrice: "380.000", rating: 4.8, publisher: "Omega+", year: 2018, image: "Silkroads.jpg",
        description: "Một cách nhìn mới mẻ và đột phá về lịch sử thế giới, không lấy phương Tây làm trung tâm mà tập trung vào 'Con đường tơ lụa' - mạng lưới giao thương cổ đại kết nối phương Đông và phương Tây. Tác giả chứng minh rằng chính khu vực Trung Đông, Trung Á mới là trung tâm thực sự của sự trao đổi văn hóa, tôn giáo, tài nguyên và sự trỗi dậy của các đế chế trong suốt hàng thiên niên kỷ. Tác phẩm phù hợp với độc giả yêu thích lịch sử, văn hóa và các lát cắt phát triển của nhân loại. Cách trình bày giúp người đọc có thêm bối cảnh để hiểu các biến động xã hội, chính trị và văn minh qua từng thời kỳ. Với bản sách cũ, giá trị không chỉ nằm ở tri thức mà còn ở cảm giác lưu giữ một tư liệu đã đi qua thời gian.",
        reviews: [
            { user: "Phương Thảo", stars: 5, comment: "Silk Roads có nhiều thông tin đáng đọc, phù hợp để tra cứu và đọc lâu dài." },
            { user: "Anh Duy", stars: 5, comment: "Sách dày nhưng được bọc rất chắc, khi nhận không bị va đập. Nhân viên phản hồi nhanh khi mình hỏi thêm ảnh thật của sách." },
            { user: "Khánh Vy", stars: 4, comment: "Mình chọn cửa hàng vì có nhiều đầu sách lịch sử khó tìm và mô tả khá kỹ." },
            { user: "Quang Hưng", stars: 5, comment: "Nội dung mở rộng hiểu biết về lịch sử, văn minh và bối cảnh xã hội. Mình sẽ đọc lại từng chương để ghi chú kỹ hơn." },
            { user: "Bảo Ngọc", stars: 5, comment: "Tình trạng sách đúng hình, giấy còn đọc tốt." },
            { user: "Thanh Tùng", stars: 5, comment: "Giao hàng hơi chậm một chút nhưng đóng gói cẩn thận." },
            { user: "Mỹ Linh", stars: 5, comment: "Rất hợp với người thích sưu tầm sách lịch sử có giá trị tham khảo." },
            { user: "Đức Anh", stars: 4, comment: "Silk Roads có nhiều thông tin đáng đọc, phù hợp để tra cứu và đọc lâu dài." }
        ]
    },
    {
        id: 30, category: "Lịch sử & Văn minh", name: "SPQR", author: "Mary Beard",
        price: "280.000", oldPrice: "340.000", rating: 4.8, publisher: "NXB Tổng hợp TP.HCM", year: 2020, image: "Spqr.jpg",
        description: "SPQR (Senatus Populusque Romanus - Thượng viện và Nhân dân La Mã) là một bức tranh toàn cảnh sống động về lịch sử La Mã cổ đại. Sử gia Mary Beard đã phá bỏ những lầm tưởng phổ biến, khám phá cách một ngôi làng nhỏ bé ở miền trung nước Ý vươn lên thành một đế chế thống trị ba lục địa, đồng thời soi rọi vào đời sống thực sự của những người dân La Mã bình thường. Tác phẩm phù hợp với độc giả yêu thích lịch sử, văn hóa và các lát cắt phát triển của nhân loại. Cách trình bày giúp người đọc có thêm bối cảnh để hiểu các biến động xã hội, chính trị và văn minh qua từng thời kỳ. Với bản sách cũ, giá trị không chỉ nằm ở tri thức mà còn ở cảm giác lưu giữ một tư liệu đã đi qua thời gian.",
        reviews: [
            { user: "Quang Hưng", stars: 5, comment: "SPQR có nhiều thông tin đáng đọc, phù hợp để tra cứu và đọc lâu dài." },
            { user: "Bảo Ngọc", stars: 5, comment: "Sách dày nhưng được bọc rất chắc, khi nhận không bị va đập. Nhân viên phản hồi nhanh khi mình hỏi thêm ảnh thật của sách." },
            { user: "Thanh Tùng", stars: 5, comment: "Mình chọn cửa hàng vì có nhiều đầu sách lịch sử khó tìm và mô tả khá kỹ." },
            { user: "Mỹ Linh", stars: 4, comment: "Nội dung mở rộng hiểu biết về lịch sử, văn minh và bối cảnh xã hội. Mình sẽ đọc lại từng chương để ghi chú kỹ hơn." },
            { user: "Đức Anh", stars: 5, comment: "Tình trạng sách đúng hình, giấy còn đọc tốt." },
            { user: "Hà My", stars: 5, comment: "Giao hàng hơi chậm một chút nhưng đóng gói cẩn thận." }
        ]
    },
    {
        id: 31, category: "Lịch sử & Văn minh", name: "Guns, Germs and Steel", author: "Jared Diamond",
        price: "310.000", oldPrice: "370.000", rating: 4.9, publisher: "Omega+", year: 2019, image: "Guns.jpg",
        description: "Tác phẩm đoạt giải Pulitzer, giải đáp một câu hỏi lịch sử lớn: Tại sao người Á-Âu lại chinh phục được người da đỏ bản địa, người Úc và người châu Phi, mà không phải ngược lại? Jared Diamond lập luận thuyết phục rằng chính các yếu tố môi trường, địa lý (Súng, Vi trùng và Thép) chứ không phải sự khác biệt về sinh học hay trí tuệ đã quyết định sự phát triển bất bình đẳng của các nền văn minh. Tác phẩm phù hợp với độc giả yêu thích lịch sử, văn hóa và các lát cắt phát triển của nhân loại. Cách trình bày giúp người đọc có thêm bối cảnh để hiểu các biến động xã hội, chính trị và văn minh qua từng thời kỳ. Với bản sách cũ, giá trị không chỉ nằm ở tri thức mà còn ở cảm giác lưu giữ một tư liệu đã đi qua thời gian.",
        reviews: [
            { user: "Mỹ Linh", stars: 5, comment: "Guns, Germs and Steel có nhiều thông tin đáng đọc, phù hợp để tra cứu và đọc lâu dài." },
            { user: "Đức Anh", stars: 5, comment: "Sách dày nhưng được bọc rất chắc, khi nhận không bị va đập. Nhân viên phản hồi nhanh khi mình hỏi thêm ảnh thật của sách." },
            { user: "Hà My", stars: 5, comment: "Mình chọn cửa hàng vì có nhiều đầu sách lịch sử khó tìm và mô tả khá kỹ." },
            { user: "Minh Anh", stars: 5, comment: "Nội dung mở rộng hiểu biết về lịch sử, văn minh và bối cảnh xã hội. Mình sẽ đọc lại từng chương để ghi chú kỹ hơn." },
            { user: "Hoàng Nam", stars: 5, comment: "Tình trạng sách đúng hình, giấy còn đọc tốt." },
            { user: "Thu Hà", stars: 5, comment: "Giao hàng hơi chậm một chút nhưng đóng gói cẩn thận." },
            { user: "Gia Huy", stars: 4, comment: "Rất hợp với người thích sưu tầm sách lịch sử có giá trị tham khảo." }
        ]
    },
    {
        id: 32, category: "Lịch sử & Văn minh", name: "Chiến Tranh Và Hòa Bình", author: "Leo Tolstoy",
        price: "450.000", oldPrice: "520.000", rating: 5.0, publisher: "NXB Văn Học", year: 2009, image: "Chientranhvahoabinh.jpg",
        description: "Một kiệt tác vĩ đại vô tiền khoáng hậu của văn học Nga, tái hiện lại bối cảnh nước Nga thời kỳ bị Napoleon xâm lược. Thông qua số phận của các gia đình quý tộc như Bolkonsky, Rostov và Bezukhov, Tolstoy đã đan xen hoàn hảo giữa bức tranh chiến tranh khốc liệt và những trang đời sống hòa bình tinh tế, đưa ra những triết lý sâu sắc về lịch sử và định mệnh con người. Tác phẩm phù hợp với độc giả yêu thích lịch sử, văn hóa và các lát cắt phát triển của nhân loại. Cách trình bày giúp người đọc có thêm bối cảnh để hiểu các biến động xã hội, chính trị và văn minh qua từng thời kỳ. Với bản sách cũ, giá trị không chỉ nằm ở tri thức mà còn ở cảm giác lưu giữ một tư liệu đã đi qua thời gian.",
        reviews: [
            { user: "Minh Anh", stars: 5, comment: "Chiến Tranh Và Hòa Bình có nhiều thông tin đáng đọc, phù hợp để tra cứu và đọc lâu dài." },
            { user: "Hoàng Nam", stars: 5, comment: "Sách dày nhưng được bọc rất chắc, khi nhận không bị va đập. Nhân viên phản hồi nhanh khi mình hỏi thêm ảnh thật của sách." },
            { user: "Thu Hà", stars: 5, comment: "Mình chọn cửa hàng vì có nhiều đầu sách lịch sử khó tìm và mô tả khá kỹ." },
            { user: "Gia Huy", stars: 5, comment: "Nội dung mở rộng hiểu biết về lịch sử, văn minh và bối cảnh xã hội. Mình sẽ đọc lại từng chương để ghi chú kỹ hơn." },
            { user: "Ngọc Mai", stars: 5, comment: "Tình trạng sách đúng hình, giấy còn đọc tốt." },
            { user: "Tuấn Kiệt", stars: 5, comment: "Giao hàng hơi chậm một chút nhưng đóng gói cẩn thận." },
            { user: "Linh Chi", stars: 5, comment: "Rất hợp với người thích sưu tầm sách lịch sử có giá trị tham khảo." },
            { user: "Phương Thảo", stars: 5 }
        ]
    },

    // 5. Trinh thám kinh điển
    {
        id: 33, category: "Trinh thám kinh điển", name: "Sherlock Holmes", author: "Arthur Conan Doyle",
        price: "180.000", oldPrice: "210.000", rating: 5.0, publisher: "NXB Văn Học", year: 2012, image: "Sherlockholmes.jpg",
        description: "Tập truyện về vị thám tử tư lừng danh nhất thế giới - Sherlock Holmes, cùng người bạn đồng hành trung thành, bác sĩ Watson. Bằng khả năng quan sát nhạy bén và phương pháp suy luận diễn dịch thiên tài, Holmes đã phá giải hàng loạt vụ án hóc búa, ly kỳ tại phố Baker sương mù ở London, định hình chuẩn mực cho toàn bộ thể loại tiểu thuyết trinh thám sau này. Cuốn sách phù hợp với những độc giả yêu thích suy luận, bí ẩn và các cú xoay chuyển bất ngờ. Không chỉ tạo cảm giác hồi hộp, tác phẩm còn hấp dẫn nhờ cách xây dựng nhân vật, không khí truyện và những manh mối được cài cắm khéo léo. Đây là lựa chọn tốt để đọc thư giãn, đồng thời bổ sung vào bộ sưu tập trinh thám kinh điển.",
        reviews: [
            { user: "Gia Huy", stars: 5, comment: "Sherlock Holmes có nhịp truyện hấp dẫn, đọc liền mạch và giữ được sự tò mò đến cuối." },
            { user: "Ngọc Mai", stars: 5, comment: "Bản sách cũ nhưng chữ in rõ, không bị rơi trang. Nhân viên phản hồi nhanh khi mình hỏi thêm ảnh thật của sách." },
            { user: "Tuấn Kiệt", stars: 5, comment: "Mình mua để bổ sung tủ sách trinh thám, shop giao đúng sách và đúng tình trạng." },
            { user: "Linh Chi", stars: 5, comment: "Cốt truyện lôi cuốn, các chi tiết suy luận rất đáng đọc." },
            { user: "Phương Thảo", stars: 5, comment: "Đóng gói kỹ, bìa không bị trầy thêm trong quá trình vận chuyển." },
            { user: "Anh Duy", stars: 5, comment: "Sách phù hợp để đọc giải trí nhưng vẫn có giá trị sưu tầm." }
        ]
    },
    {
        id: 34, category: "Trinh thám kinh điển", name: "Siêu trộm Arsène Lupin", author: "Maurice Leblanc",
        price: "160.000", oldPrice: "190.000", rating: 4.7, publisher: "Đinh Tị", year: 2014, image: "Sieutromquantuarsenelupin.jpg",
        description: "Trái ngược với sự nghiêm túc của Sherlock Holmes, Arsène Lupin là một tên trộm hào hoa, lịch lãm và đầy mưu mẹo của nước Pháp. Hắn là bậc thầy cải trang, luôn báo trước cho nạn nhân về vụ trộm nhưng cảnh sát vẫn không thể ngăn cản. Lupin chỉ đánh cắp của những kẻ giàu có, hợm hĩnh, mang đến một hình tượng phản anh hùng cực kỳ quyến rũ và thông minh. Cuốn sách phù hợp với những độc giả yêu thích suy luận, bí ẩn và các cú xoay chuyển bất ngờ. Không chỉ tạo cảm giác hồi hộp, tác phẩm còn hấp dẫn nhờ cách xây dựng nhân vật, không khí truyện và những manh mối được cài cắm khéo léo. Đây là lựa chọn tốt để đọc thư giãn, đồng thời bổ sung vào bộ sưu tập trinh thám kinh điển.",
        reviews: [
            { user: "Linh Chi", stars: 4, comment: "Siêu trộm Arsène Lupin có nhịp truyện hấp dẫn, đọc liền mạch và giữ được sự tò mò đến cuối." },
            { user: "Phương Thảo", stars: 5, comment: "Bản sách cũ nhưng chữ in rõ, không bị rơi trang. Nhân viên phản hồi nhanh khi mình hỏi thêm ảnh thật của sách." },
            { user: "Anh Duy", stars: 5, comment: "Mình mua để bổ sung tủ sách trinh thám, shop giao đúng sách và đúng tình trạng." },
            { user: "Khánh Vy", stars: 4, comment: "Cốt truyện lôi cuốn, các chi tiết suy luận rất đáng đọc." },
            { user: "Quang Hưng", stars: 5, comment: "Đóng gói kỹ, bìa không bị trầy thêm trong quá trình vận chuyển." },
            { user: "Bảo Ngọc", stars: 5, comment: "Sách phù hợp để đọc giải trí nhưng vẫn có giá trị sưu tầm." },
            { user: "Thanh Tùng", stars: 5, comment: "Giá hợp lý cho một đầu sách trinh thám kinh điển." }
        ]
    },
    {
        id: 35, category: "Trinh thám kinh điển", name: "Án Mạng Trên Chuyến Tàu Tốc Hành", author: "Agatha Christie",
        price: "140.000", oldPrice: "170.000", rating: 4.9, publisher: "NXB Trẻ", year: 2016, image: "Anmangtrenchuyentautochanh.jpg",
        description: "Một trong những tiểu thuyết trinh thám xuất sắc nhất của 'Nữ hoàng trinh thám' Agatha Christie. Khi chuyến tàu tốc hành Phương Đông bị mắc kẹt giữa bão tuyết, một hành khách bị sát hại dã man trong khoang đóng kín. Thám tử Hercule Poirot phải động não để tìm ra thủ phạm giữa một nhóm hành khách mà ai cũng có động cơ và bằng chứng ngoại phạm hoàn hảo. Cú twist cuối truyện sẽ khiến mọi độc giả phải ngỡ ngàng. Cuốn sách phù hợp với những độc giả yêu thích suy luận, bí ẩn và các cú xoay chuyển bất ngờ. Không chỉ tạo cảm giác hồi hộp, tác phẩm còn hấp dẫn nhờ cách xây dựng nhân vật, không khí truyện và những manh mối được cài cắm khéo léo. Đây là lựa chọn tốt để đọc thư giãn, đồng thời bổ sung vào bộ sưu tập trinh thám kinh điển.",
        reviews: [
            { user: "Khánh Vy", stars: 4, comment: "Án Mạng Trên Chuyến Tàu Tốc Hành có nhịp truyện hấp dẫn, đọc liền mạch và giữ được sự tò mò đến cuối." },
            { user: "Quang Hưng", stars: 5, comment: "Bản sách cũ nhưng chữ in rõ, không bị rơi trang. Nhân viên phản hồi nhanh khi mình hỏi thêm ảnh thật của sách." },
            { user: "Bảo Ngọc", stars: 5, comment: "Mình mua để bổ sung tủ sách trinh thám, shop giao đúng sách và đúng tình trạng." },
            { user: "Thanh Tùng", stars: 5, comment: "Cốt truyện lôi cuốn, các chi tiết suy luận rất đáng đọc." },
            { user: "Mỹ Linh", stars: 5, comment: "Đóng gói kỹ, bìa không bị trầy thêm trong quá trình vận chuyển." },
            { user: "Đức Anh", stars: 5, comment: "Sách phù hợp để đọc giải trí nhưng vẫn có giá trị sưu tầm." },
            { user: "Hà My", stars: 5, comment: "Giá hợp lý cho một đầu sách trinh thám kinh điển." },
            { user: "Minh Anh", stars: 5, comment: "Án Mạng Trên Chuyến Tàu Tốc Hành có nhịp truyện hấp dẫn, đọc liền mạch và giữ được sự tò mò đến cuối." }
        ]
    },
    {
        id: 36, category: "Trinh thám kinh điển", name: "Mười Người Da Đen Nhỏ", author: "Agatha Christie",
        price: "150.000", oldPrice: "180.000", rating: 5.0, publisher: "NXB Trẻ", year: 2015, image: "Muoinguoidadennho.jpg",
        description: "Kiệt tác trinh thám với cấu trúc phòng kín kinh điển. Mười người hoàn toàn xa lạ được mời đến một hòn đảo biệt lập. Từng người một lần lượt bị sát hại theo đúng nội dung một bài đồng dao ám ảnh về mười cậu bé da đen. Sự căng thẳng leo thang tột độ khi họ nhận ra kẻ sát nhân đang ở chính giữa bọn họ. Không có thám tử, không có manh mối, một bản án tử hình hoàn hảo. Cuốn sách phù hợp với những độc giả yêu thích suy luận, bí ẩn và các cú xoay chuyển bất ngờ. Không chỉ tạo cảm giác hồi hộp, tác phẩm còn hấp dẫn nhờ cách xây dựng nhân vật, không khí truyện và những manh mối được cài cắm khéo léo. Đây là lựa chọn tốt để đọc thư giãn, đồng thời bổ sung vào bộ sưu tập trinh thám kinh điển.",
        reviews: [
            { user: "Thanh Tùng", stars: 5, comment: "Mười Người Da Đen Nhỏ có nhịp truyện hấp dẫn, đọc liền mạch và giữ được sự tò mò đến cuối." },
            { user: "Mỹ Linh", stars: 5, comment: "Bản sách cũ nhưng chữ in rõ, không bị rơi trang. Nhân viên phản hồi nhanh khi mình hỏi thêm ảnh thật của sách." },
            { user: "Đức Anh", stars: 5, comment: "Mình mua để bổ sung tủ sách trinh thám, shop giao đúng sách và đúng tình trạng." },
            { user: "Hà My", stars: 5, comment: "Cốt truyện lôi cuốn, các chi tiết suy luận rất đáng đọc." },
            { user: "Minh Anh", stars: 5, comment: "Đóng gói kỹ, bìa không bị trầy thêm trong quá trình vận chuyển." },
            { user: "Hoàng Nam", stars: 5 }
        ]
    },
    {
        id: 37, category: "Trinh thám kinh điển", name: "Thời khắc định mệnh", author: "Agatha Christie",
        price: "130.000", oldPrice: "160.000", rating: 4.6, publisher: "NXB Trẻ", year: 2017, image: "Thoikhacdinhmenh.jpg",
        description: "Thám tử Hercule Poirot nhận được lời cầu cứu từ một ông lão giàu có, nhưng khi đến nơi thì ông ta đã bị sát hại. Gia đình nạn nhân chia năm xẻ bảy với những âm mưu tranh giành tài sản đê hèn. Bằng sự tinh tế và khả năng thấu hiểu tâm lý con người sâu sắc, Poirot đã dần dần bóc trần những bí mật nhơ nhuốc ẩn giấu đằng sau vẻ hào nhoáng của giới thượng lưu. Cuốn sách phù hợp với những độc giả yêu thích suy luận, bí ẩn và các cú xoay chuyển bất ngờ. Không chỉ tạo cảm giác hồi hộp, tác phẩm còn hấp dẫn nhờ cách xây dựng nhân vật, không khí truyện và những manh mối được cài cắm khéo léo. Đây là lựa chọn tốt để đọc thư giãn, đồng thời bổ sung vào bộ sưu tập trinh thám kinh điển.",
        reviews: [
            { user: "Hà My", stars: 5, comment: "Thời khắc định mệnh có nhịp truyện hấp dẫn, đọc liền mạch và giữ được sự tò mò đến cuối." },
            { user: "Minh Anh", stars: 4, comment: "Bản sách cũ nhưng chữ in rõ, không bị rơi trang. Nhân viên phản hồi nhanh khi mình hỏi thêm ảnh thật của sách." },
            { user: "Hoàng Nam", stars: 4, comment: "Mình mua để bổ sung tủ sách trinh thám, shop giao đúng sách và đúng tình trạng." },
            { user: "Thu Hà", stars: 5, comment: "Cốt truyện lôi cuốn, các chi tiết suy luận rất đáng đọc." },
            { user: "Gia Huy", stars: 4, comment: "Đóng gói kỹ, bìa không bị trầy thêm trong quá trình vận chuyển." },
            { user: "Ngọc Mai", stars: 5, comment: "Sách phù hợp để đọc giải trí nhưng vẫn có giá trị sưu tầm." },
            { user: "Tuấn Kiệt", stars: 5, comment: "Giá hợp lý cho một đầu sách trinh thám kinh điển." }
        ]
    },
    {
        id: 38, category: "Trinh thám kinh điển", name: "Tận cùng là cái chết", author: "Agatha Christie",
        price: "135.000", oldPrice: "165.000", rating: 4.8, publisher: "NXB Trẻ", year: 2018, image: "Tancunglacaichet.jpg",
        description: "Lấy bối cảnh tại Ai Cập cổ đại - một bối cảnh cực kỳ độc đáo và mới lạ so với các tiểu thuyết trinh thám thông thường. Cái chết bí ẩn của một người thiếp trẻ đẹp trong gia đình một tư tế giàu có đã kéo theo chuỗi những sự kiện tàn khốc. Lòng tham, sự ghen tuông và thù hận đã che mờ lý trí, tạo nên một câu chuyện trinh thám kết hợp với lịch sử đầy cuốn hút. Cuốn sách phù hợp với những độc giả yêu thích suy luận, bí ẩn và các cú xoay chuyển bất ngờ. Không chỉ tạo cảm giác hồi hộp, tác phẩm còn hấp dẫn nhờ cách xây dựng nhân vật, không khí truyện và những manh mối được cài cắm khéo léo. Đây là lựa chọn tốt để đọc thư giãn, đồng thời bổ sung vào bộ sưu tập trinh thám kinh điển.",
        reviews: [
            { user: "Thu Hà", stars: 5, comment: "Tận cùng là cái chết có nhịp truyện hấp dẫn, đọc liền mạch và giữ được sự tò mò đến cuối." },
            { user: "Gia Huy", stars: 5, comment: "Bản sách cũ nhưng chữ in rõ, không bị rơi trang. Nhân viên phản hồi nhanh khi mình hỏi thêm ảnh thật của sách." },
            { user: "Ngọc Mai", stars: 4, comment: "Mình mua để bổ sung tủ sách trinh thám, shop giao đúng sách và đúng tình trạng." },
            { user: "Tuấn Kiệt", stars: 5, comment: "Cốt truyện lôi cuốn, các chi tiết suy luận rất đáng đọc." },
            { user: "Linh Chi", stars: 4, comment: "Đóng gói kỹ, bìa không bị trầy thêm trong quá trình vận chuyển." },
            { user: "Phương Thảo", stars: 5, comment: "Sách phù hợp để đọc giải trí nhưng vẫn có giá trị sưu tầm." },
            { user: "Anh Duy", stars: 5, comment: "Giá hợp lý cho một đầu sách trinh thám kinh điển." },
            { user: "Khánh Vy", stars: 5, comment: "Tận cùng là cái chết có nhịp truyện hấp dẫn, đọc liền mạch và giữ được sự tò mò đến cuối." }
        ]
    },
    {
        id: 39, category: "Trinh thám kinh điển", name: "Hannibal", author: "Thomas Harris",
        price: "170.000", oldPrice: "200.000", rating: 4.8, publisher: "Nhã Nam", year: 2010, image: "Hannibal.jpg",
        description: "Tiếp nối sự thành công của 'Sự im lặng của bầy cừu', cuốn tiểu thuyết đưa người đọc đi sâu vào tâm trí phức tạp, uyên bác nhưng cũng tàn bạo đến lạnh người của bác sĩ ăn thịt người Hannibal Lecter. Cuộc đối đầu và cả sự thấu hiểu kỳ lạ giữa Hannibal và nữ đặc vụ FBI Clarice Starling đã tạo nên một tác phẩm kinh dị tâm lý đỉnh cao, ám ảnh người đọc từ trang đầu đến trang cuối. Cuốn sách phù hợp với những độc giả yêu thích suy luận, bí ẩn và các cú xoay chuyển bất ngờ. Không chỉ tạo cảm giác hồi hộp, tác phẩm còn hấp dẫn nhờ cách xây dựng nhân vật, không khí truyện và những manh mối được cài cắm khéo léo. Đây là lựa chọn tốt để đọc thư giãn, đồng thời bổ sung vào bộ sưu tập trinh thám kinh điển.",
        reviews: [
            { user: "Tuấn Kiệt", stars: 5, comment: "Hannibal có nhịp truyện hấp dẫn, đọc liền mạch và giữ được sự tò mò đến cuối." },
            { user: "Linh Chi", stars: 5, comment: "Bản sách cũ nhưng chữ in rõ, không bị rơi trang. Nhân viên phản hồi nhanh khi mình hỏi thêm ảnh thật của sách." },
            { user: "Phương Thảo", stars: 4, comment: "Mình mua để bổ sung tủ sách trinh thám, shop giao đúng sách và đúng tình trạng." },
            { user: "Anh Duy", stars: 5, comment: "Cốt truyện lôi cuốn, các chi tiết suy luận rất đáng đọc." },
            { user: "Khánh Vy", stars: 5, comment: "Đóng gói kỹ, bìa không bị trầy thêm trong quá trình vận chuyển." },
            { user: "Quang Hưng", stars: 5, comment: "Sách phù hợp để đọc giải trí nhưng vẫn có giá trị sưu tầm." }
        ]
    },
    {
        id: 40, category: "Trinh thám kinh điển", name: "The Hound of Baskervilles", author: "Arthur Conan Doyle",
        price: "120.000", oldPrice: "150.000", rating: 4.7, publisher: "NXB Văn Học", year: 2011, image: "TheHoundofBaskervilles.jpg",
        description: "Vụ án rùng rợn và ly kỳ nhất trong sự nghiệp của Sherlock Holmes. Truyền thuyết về một con chó săn địa ngục khổng lồ mang lời nguyền ám ảnh dòng họ Baskerville vùng đầm lầy sương mù nước Anh. Bầu không khí ma mị, u ám kết hợp với tư duy logic sắt bén của Holmes đã làm nên một kiệt tác trinh thám pha lẫn yếu tố kinh dị không thể nào quên. Cuốn sách phù hợp với những độc giả yêu thích suy luận, bí ẩn và các cú xoay chuyển bất ngờ. Không chỉ tạo cảm giác hồi hộp, tác phẩm còn hấp dẫn nhờ cách xây dựng nhân vật, không khí truyện và những manh mối được cài cắm khéo léo. Đây là lựa chọn tốt để đọc thư giãn, đồng thời bổ sung vào bộ sưu tập trinh thám kinh điển.",
        reviews: [
            { user: "Anh Duy", stars: 5, comment: "The Hound of Baskervilles có nhịp truyện hấp dẫn, đọc liền mạch và giữ được sự tò mò đến cuối." },
            { user: "Khánh Vy", stars: 4, comment: "Bản sách cũ nhưng chữ in rõ, không bị rơi trang. Nhân viên phản hồi nhanh khi mình hỏi thêm ảnh thật của sách." },
            { user: "Quang Hưng", stars: 5, comment: "Mình mua để bổ sung tủ sách trinh thám, shop giao đúng sách và đúng tình trạng." },
            { user: "Bảo Ngọc", stars: 4, comment: "Cốt truyện lôi cuốn, các chi tiết suy luận rất đáng đọc." },
            { user: "Thanh Tùng", stars: 5, comment: "Đóng gói kỹ, bìa không bị trầy thêm trong quá trình vận chuyển." },
            { user: "Mỹ Linh", stars: 5, comment: "Sách phù hợp để đọc giải trí nhưng vẫn có giá trị sưu tầm." },
            { user: "Đức Anh", stars: 5 }
        ]
    },

    // 6. Thiếu nhi & tuổi thơ
    {
        id: 41, category: "Thiếu nhi & tuổi thơ", name: "Hoàng Tử Bé", author: "Antoine de Saint-Exupéry",
        price: "120.000", oldPrice: "150.000", rating: 5.0, publisher: "Nhã Nam", year: 2013, image: "Hoangtube.jpg",
        description: "Một tuyệt tác văn học dành cho mọi lứa tuổi. Qua cuộc hành trình của Hoàng Tử Bé rời khỏi tiểu hành tinh B612 để đến thăm Trái Đất, tác giả đã gửi gắm những triết lý nhân sinh vô cùng sâu sắc về tình yêu, sự kết nối và những giá trị đích thực của cuộc sống. Câu nói 'Người ta chỉ có thể nhìn thấy rõ ràng bằng trái tim, cái cốt yếu thì con mắt không thể nhìn thấy' đã chạm đến hàng triệu tâm hồn. Tác phẩm phù hợp với cả độc giả nhỏ tuổi lẫn người lớn muốn tìm lại cảm giác trong trẻo của tuổi thơ. Những câu chuyện giản dị nhưng giàu cảm xúc giúp người đọc nhận ra vẻ đẹp của lòng tốt, trí tưởng tượng, tình bạn và sự trưởng thành. Bản sách cũ đặc biệt thích hợp để làm quà tặng nhẹ nhàng hoặc lưu giữ trong tủ sách gia đình.",
        reviews: [
            { user: "Bảo Ngọc", stars: 5, comment: "Hoàng Tử Bé nhẹ nhàng, trong trẻo và rất phù hợp để đọc lại cùng gia đình." },
            { user: "Thanh Tùng", stars: 5, comment: "Sách cũ nhưng sạch, không bị ố quá nhiều, đóng gói dễ thương. Nhân viên phản hồi nhanh khi mình hỏi thêm ảnh thật của sách." },
            { user: "Mỹ Linh", stars: 5, comment: "Mình chọn mua vì muốn tìm lại cảm giác tuổi thơ, nhận sách rất hài lòng." },
            { user: "Đức Anh", stars: 5, comment: "Nội dung có nhiều thông điệp nhân văn, đọc cho trẻ em cũng phù hợp." },
            { user: "Hà My", stars: 5, comment: "Giao hàng nhanh, sách được bọc chống ẩm cẩn thận." },
            { user: "Minh Anh", stars: 5, comment: "Bìa còn đẹp hơn mình nghĩ so với tình trạng sách cũ." },
            { user: "Hoàng Nam", stars: 5, comment: "Một cuốn đáng giữ trong tủ sách gia đình." },
            { user: "Thu Hà", stars: 5, comment: "Hoàng Tử Bé nhẹ nhàng, trong trẻo và rất phù hợp để đọc lại cùng gia đình." }
        ]
    },
    {
        id: 42, category: "Thiếu nhi & tuổi thơ", name: "Totto-chan Bên Cửa Sổ", author: "Tetsuko Kuroyanagi",
        price: "110.000", oldPrice: "140.000", rating: 5.0, publisher: "Nhã Nam", year: 2011, image: "Totto-chanbencuaso.jpg",
        description: "Cuốn sách ghi lại ký ức tuổi thơ tuyệt đẹp của chính tác giả tại ngôi trường Tomoe - một ngôi trường đặc biệt với những lớp học bằng toa tàu cũ và phương pháp giáo dục tôn trọng sự tự do, cá tính của trẻ em. Thầy hiệu trưởng Kobayashi đã dùng tình yêu thương để biến Totto-chan, một cô bé bị trường cũ đuổi học vì 'hiếu động', thành một con người tự tin và thành công. Tác phẩm phù hợp với cả độc giả nhỏ tuổi lẫn người lớn muốn tìm lại cảm giác trong trẻo của tuổi thơ. Những câu chuyện giản dị nhưng giàu cảm xúc giúp người đọc nhận ra vẻ đẹp của lòng tốt, trí tưởng tượng, tình bạn và sự trưởng thành. Bản sách cũ đặc biệt thích hợp để làm quà tặng nhẹ nhàng hoặc lưu giữ trong tủ sách gia đình.",
        reviews: [
            { user: "Đức Anh", stars: 5, comment: "Totto-chan Bên Cửa Sổ nhẹ nhàng, trong trẻo và rất phù hợp để đọc lại cùng gia đình." },
            { user: "Hà My", stars: 5, comment: "Sách cũ nhưng sạch, không bị ố quá nhiều, đóng gói dễ thương. Nhân viên phản hồi nhanh khi mình hỏi thêm ảnh thật của sách." },
            { user: "Minh Anh", stars: 5, comment: "Mình chọn mua vì muốn tìm lại cảm giác tuổi thơ, nhận sách rất hài lòng." },
            { user: "Hoàng Nam", stars: 5, comment: "Nội dung có nhiều thông điệp nhân văn, đọc cho trẻ em cũng phù hợp." },
            { user: "Thu Hà", stars: 5, comment: "Giao hàng nhanh, sách được bọc chống ẩm cẩn thận." },
            { user: "Gia Huy", stars: 5, comment: "Bìa còn đẹp hơn mình nghĩ so với tình trạng sách cũ." }
        ]
    },
    {
        id: 43, category: "Thiếu nhi & tuổi thơ", name: "Charlie & Nhà Máy Chocolate", author: "Roald Dahl",
        price: "115.000", oldPrice: "145.000", rating: 4.7, publisher: "NXB Kim Đồng", year: 2015, image: "Charlievanhamaychocolate.jpg",
        description: "Một chuyến phiêu lưu kỳ diệu, đầy kẹo ngọt và phép màu vào nhà máy chocolate bí ẩn nhất thế giới của ngài Willy Wonka. Cậu bé nghèo Charlie Bucket may mắn tìm được chiếc vé vàng và cùng 4 đứa trẻ khác tham gia chuyến đi. Những hình phạt hài hước dành cho những đứa trẻ hư hỏng và phần thưởng xứng đáng cho sự lương thiện của Charlie là bài học giáo dục nhẹ nhàng mà sâu sắc. Tác phẩm phù hợp với cả độc giả nhỏ tuổi lẫn người lớn muốn tìm lại cảm giác trong trẻo của tuổi thơ. Những câu chuyện giản dị nhưng giàu cảm xúc giúp người đọc nhận ra vẻ đẹp của lòng tốt, trí tưởng tượng, tình bạn và sự trưởng thành. Bản sách cũ đặc biệt thích hợp để làm quà tặng nhẹ nhàng hoặc lưu giữ trong tủ sách gia đình.",
        reviews: [
            { user: "Hoàng Nam", stars: 5, comment: "Charlie & Nhà Máy Chocolate nhẹ nhàng, trong trẻo và rất phù hợp để đọc lại cùng gia đình." },
            { user: "Thu Hà", stars: 5, comment: "Sách cũ nhưng sạch, không bị ố quá nhiều, đóng gói dễ thương. Nhân viên phản hồi nhanh khi mình hỏi thêm ảnh thật của sách." },
            { user: "Gia Huy", stars: 5, comment: "Mình chọn mua vì muốn tìm lại cảm giác tuổi thơ, nhận sách rất hài lòng." },
            { user: "Ngọc Mai", stars: 5, comment: "Nội dung có nhiều thông điệp nhân văn, đọc cho trẻ em cũng phù hợp." },
            { user: "Tuấn Kiệt", stars: 4, comment: "Giao hàng nhanh, sách được bọc chống ẩm cẩn thận." },
            { user: "Linh Chi", stars: 5, comment: "Bìa còn đẹp hơn mình nghĩ so với tình trạng sách cũ." },
            { user: "Phương Thảo", stars: 4, comment: "Một cuốn đáng giữ trong tủ sách gia đình." }
        ]
    },
    {
        id: 44, category: "Thiếu nhi & tuổi thơ", name: "Anne Tóc Đỏ Dưới Mái Nhà Bạch Dương", author: "L. M. Montgomery",
        price: "145.000", oldPrice: "180.000", rating: 4.9, publisher: "Nhã Nam", year: 2016, image: "Annetocdoduoimainhabachduong.jpg",
        description: "Tập thứ tư trong series kinh điển về cô bé mồ côi Anne Shirley. Ở phần này, Anne đã trưởng thành, trở thành một cô giáo trẻ tại trường trung học Summerside. Với tính cách lãng mạn, trí tưởng tượng bay bổng và sự nhiệt thành ấm áp, Anne đã dần dần chinh phục được những người dân lạnh lùng nhất thị trấn và dệt nên một thanh xuân rực rỡ dưới mái nhà Bạch Dương. Tác phẩm phù hợp với cả độc giả nhỏ tuổi lẫn người lớn muốn tìm lại cảm giác trong trẻo của tuổi thơ. Những câu chuyện giản dị nhưng giàu cảm xúc giúp người đọc nhận ra vẻ đẹp của lòng tốt, trí tưởng tượng, tình bạn và sự trưởng thành. Bản sách cũ đặc biệt thích hợp để làm quà tặng nhẹ nhàng hoặc lưu giữ trong tủ sách gia đình.",
        reviews: [
            { user: "Ngọc Mai", stars: 5, comment: "Anne Tóc Đỏ Dưới Mái Nhà Bạch Dương nhẹ nhàng, trong trẻo và rất phù hợp để đọc lại cùng gia đình." },
            { user: "Tuấn Kiệt", stars: 5, comment: "Sách cũ nhưng sạch, không bị ố quá nhiều, đóng gói dễ thương. Nhân viên phản hồi nhanh khi mình hỏi thêm ảnh thật của sách." },
            { user: "Linh Chi", stars: 5, comment: "Mình chọn mua vì muốn tìm lại cảm giác tuổi thơ, nhận sách rất hài lòng." },
            { user: "Phương Thảo", stars: 5, comment: "Nội dung có nhiều thông điệp nhân văn, đọc cho trẻ em cũng phù hợp." },
            { user: "Anh Duy", stars: 4, comment: "Giao hàng nhanh, sách được bọc chống ẩm cẩn thận." },
            { user: "Khánh Vy", stars: 5, comment: "Bìa còn đẹp hơn mình nghĩ so với tình trạng sách cũ." },
            { user: "Quang Hưng", stars: 5, comment: "Một cuốn đáng giữ trong tủ sách gia đình." },
            { user: "Bảo Ngọc", stars: 5 }
        ]
    },
    {
        id: 45, category: "Thiếu nhi & tuổi thơ", name: "Heidi", author: "Johanna Spyri",
        price: "105.000", oldPrice: "135.000", rating: 4.8, publisher: "NXB Văn Học", year: 2014, image: "Heidi.jpg",
        description: "Cuốn sách mang đến hơi thở trong lành của vùng núi Alps Thụy Sĩ. Cô bé Heidi mồ côi ngây thơ, thánh thiện đã thắp sáng cuộc sống cô độc, cộc cằn của ông nội trên dãy núi cao, và mang đến phép màu chữa lành cho cô bé liệt Klara ở thành phố Frankfurt. Một tác phẩm ngợi ca vẻ đẹp của thiên nhiên và sức mạnh kỳ diệu của lòng nhân ái. Tác phẩm phù hợp với cả độc giả nhỏ tuổi lẫn người lớn muốn tìm lại cảm giác trong trẻo của tuổi thơ. Những câu chuyện giản dị nhưng giàu cảm xúc giúp người đọc nhận ra vẻ đẹp của lòng tốt, trí tưởng tượng, tình bạn và sự trưởng thành. Bản sách cũ đặc biệt thích hợp để làm quà tặng nhẹ nhàng hoặc lưu giữ trong tủ sách gia đình.",
        reviews: [
            { user: "Phương Thảo", stars: 5, comment: "Heidi nhẹ nhàng, trong trẻo và rất phù hợp để đọc lại cùng gia đình." },
            { user: "Anh Duy", stars: 4, comment: "Sách cũ nhưng sạch, không bị ố quá nhiều, đóng gói dễ thương. Nhân viên phản hồi nhanh khi mình hỏi thêm ảnh thật của sách." },
            { user: "Khánh Vy", stars: 5, comment: "Mình chọn mua vì muốn tìm lại cảm giác tuổi thơ, nhận sách rất hài lòng." },
            { user: "Quang Hưng", stars: 5, comment: "Nội dung có nhiều thông điệp nhân văn, đọc cho trẻ em cũng phù hợp." },
            { user: "Bảo Ngọc", stars: 5, comment: "Giao hàng nhanh, sách được bọc chống ẩm cẩn thận." },
            { user: "Thanh Tùng", stars: 5, comment: "Bìa còn đẹp hơn mình nghĩ so với tình trạng sách cũ." }
        ]
    },
    {
        id: 46, category: "Thiếu nhi & tuổi thơ", name: "Khu Vườn Bí Mật", author: "Frances Hodgson Burnett",
        price: "125.000", oldPrice: "160.000", rating: 4.7, publisher: "Nhã Nam", year: 2012, image: "Khuvuonbimat.jpg",
        description: "Mary Lennox, một cô bé mồ côi ốm yếu, cáu bẳn từ Ấn Độ chuyển về sống tại một điền trang ảm đạm ở Anh. Tình cờ phát hiện ra một khu vườn bị bỏ hoang khóa kín, Mary đã cùng người bạn Dickon và người anh họ Colin hồi sinh khu vườn. Sự nảy mầm của cỏ cây, hoa lá đã kỳ diệu thay chữa lành những tâm hồn tổn thương và mang lại sự sống tươi đẹp cho những đứa trẻ. Tác phẩm phù hợp với cả độc giả nhỏ tuổi lẫn người lớn muốn tìm lại cảm giác trong trẻo của tuổi thơ. Những câu chuyện giản dị nhưng giàu cảm xúc giúp người đọc nhận ra vẻ đẹp của lòng tốt, trí tưởng tượng, tình bạn và sự trưởng thành. Bản sách cũ đặc biệt thích hợp để làm quà tặng nhẹ nhàng hoặc lưu giữ trong tủ sách gia đình.",
        reviews: [
            { user: "Quang Hưng", stars: 5, comment: "Khu Vườn Bí Mật nhẹ nhàng, trong trẻo và rất phù hợp để đọc lại cùng gia đình." },
            { user: "Bảo Ngọc", stars: 5, comment: "Sách cũ nhưng sạch, không bị ố quá nhiều, đóng gói dễ thương. Nhân viên phản hồi nhanh khi mình hỏi thêm ảnh thật của sách." },
            { user: "Thanh Tùng", stars: 5, comment: "Mình chọn mua vì muốn tìm lại cảm giác tuổi thơ, nhận sách rất hài lòng." },
            { user: "Mỹ Linh", stars: 4, comment: "Nội dung có nhiều thông điệp nhân văn, đọc cho trẻ em cũng phù hợp." },
            { user: "Đức Anh", stars: 5, comment: "Giao hàng nhanh, sách được bọc chống ẩm cẩn thận." },
            { user: "Hà My", stars: 5, comment: "Bìa còn đẹp hơn mình nghĩ so với tình trạng sách cũ." },
            { user: "Minh Anh", stars: 4, comment: "Một cuốn đáng giữ trong tủ sách gia đình." }
        ]
    },

    // 7. Ngoại văn tuyển chọn
    {
        id: 47, category: "Ngoại văn tuyển chọn", name: "Norwegian Wood", author: "Haruki Murakami",
        price: "210.000", oldPrice: "250.000", rating: 4.8, publisher: "Nhã Nam", year: 2006, image: "Norwegianwood.jpg",
        description: "Rừng Na Uy là một bản tình ca buồn bã, u uất về tuổi trẻ, tình yêu và sự mất mát của giới sinh viên Nhật Bản thập niên 60. Watanabe Toru mắc kẹt giữa tình cảm dành cho Naoko - một cô gái mang tâm lý bất ổn, mong manh và Midori - một cô gái tràn đầy sức sống. Bằng giọng văn thấm đẫm nỗi cô đơn, Murakami đã chạm vào những góc khuất u tối nhất trong tâm hồn con người. Ấn bản này phù hợp với người đọc muốn thưởng thức tác phẩm ở nguyên bản hoặc rèn luyện khả năng đọc ngoại văn. Bên cạnh nội dung văn học, cuốn sách còn giúp người đọc cảm nhận rõ hơn nhịp điệu ngôn ngữ, phong cách viết và sắc thái văn hóa của tác giả. Đây là lựa chọn tốt cho tủ sách cá nhân của người yêu văn chương thế giới.",
        reviews: [
            { user: "Mỹ Linh", stars: 5, comment: "Norwegian Wood có văn phong cuốn hút, bản ngoại văn giúp cảm nhận tác phẩm rõ hơn." },
            { user: "Đức Anh", stars: 4, comment: "Sách được bọc kỹ, ruột sách sạch và ít ghi chú. Nhân viên phản hồi nhanh khi mình hỏi thêm ảnh thật của sách." },
            { user: "Hà My", stars: 5, comment: "Mình mua vì muốn luyện đọc ngoại văn, bản này phù hợp để đọc chậm." },
            { user: "Minh Anh", stars: 5, comment: "Nội dung có chiều sâu, càng đọc càng thấy nhiều lớp nghĩa." },
            { user: "Hoàng Nam", stars: 5, comment: "Shop giao đúng phiên bản, tình trạng sách giống mô tả." },
            { user: "Thu Hà", stars: 5, comment: "Giấy hơi ngả màu nhưng chữ rõ, đọc không bị mỏi." },
            { user: "Gia Huy", stars: 4, comment: "Rất đáng mua nếu thích sưu tầm ngoại văn chọn lọc." },
            { user: "Ngọc Mai", stars: 5, comment: "Norwegian Wood có văn phong cuốn hút, bản ngoại văn giúp cảm nhận tác phẩm rõ hơn." }
        ]
    },
    {
        id: 48, category: "Ngoại văn tuyển chọn", name: "Kafka On The Shore", author: "Haruki Murakami",
        price: "230.000", oldPrice: "280.000", rating: 5.0, publisher: "Nhã Nam", year: 2007, image: "Kafkaontheshore.jpg",
        description: "Một tác phẩm theo trường phái hiện thực huyền ảo xuất sắc của Murakami. Hai tuyến truyện song song kể về cậu bé 15 tuổi Kafka Tamura bỏ nhà ra đi để trốn chạy một lời nguyền nghiệt ngã, và ông lão Nakata ngờ nghệch có khả năng nói chuyện với mèo. Các yếu tố mộng mị, ký ức, những cơn mưa cá và đỉa từ trên trời rơi xuống hòa quyện vào nhau tạo nên một thế giới siêu thực đầy ám ảnh. Ấn bản này phù hợp với người đọc muốn thưởng thức tác phẩm ở nguyên bản hoặc rèn luyện khả năng đọc ngoại văn. Bên cạnh nội dung văn học, cuốn sách còn giúp người đọc cảm nhận rõ hơn nhịp điệu ngôn ngữ, phong cách viết và sắc thái văn hóa của tác giả. Đây là lựa chọn tốt cho tủ sách cá nhân của người yêu văn chương thế giới.",
        reviews: [
            { user: "Minh Anh", stars: 5, comment: "Kafka On The Shore có văn phong cuốn hút, bản ngoại văn giúp cảm nhận tác phẩm rõ hơn." },
            { user: "Hoàng Nam", stars: 5, comment: "Sách được bọc kỹ, ruột sách sạch và ít ghi chú. Nhân viên phản hồi nhanh khi mình hỏi thêm ảnh thật của sách." },
            { user: "Thu Hà", stars: 5, comment: "Mình mua vì muốn luyện đọc ngoại văn, bản này phù hợp để đọc chậm." },
            { user: "Gia Huy", stars: 5, comment: "Nội dung có chiều sâu, càng đọc càng thấy nhiều lớp nghĩa." },
            { user: "Ngọc Mai", stars: 5, comment: "Shop giao đúng phiên bản, tình trạng sách giống mô tả." },
            { user: "Tuấn Kiệt", stars: 5 }
        ]
    },
    {
        id: 49, category: "Ngoại văn tuyển chọn", name: "Hope On The Horizon", author: "Courtney Peppernell",
        price: "180.000", oldPrice: "220.000", rating: 4.6, publisher: "NXB Thế Giới", year: 2021, image: "Hopeonthehorizon.jpg",
        description: "Tập thơ đầy cảm xúc xoay quanh chủ đề về hy vọng, sự chữa lành và quá trình tìm lại ánh sáng sau những giông bão của cuộc đời. Những vần thơ tự do, ngắn gọn nhưng chạm đến trái tim, như một cái ôm ấm áp dành cho những tâm hồn đang chịu nhiều tổn thương, giúp họ có thêm dũng khí bước tiếp về phía chân trời rực sáng. Ấn bản này phù hợp với người đọc muốn thưởng thức tác phẩm ở nguyên bản hoặc rèn luyện khả năng đọc ngoại văn. Bên cạnh nội dung văn học, cuốn sách còn giúp người đọc cảm nhận rõ hơn nhịp điệu ngôn ngữ, phong cách viết và sắc thái văn hóa của tác giả. Đây là lựa chọn tốt cho tủ sách cá nhân của người yêu văn chương thế giới.",
        reviews: [
            { user: "Gia Huy", stars: 5, comment: "Hope On The Horizon có văn phong cuốn hút, bản ngoại văn giúp cảm nhận tác phẩm rõ hơn." },
            { user: "Ngọc Mai", stars: 5, comment: "Sách được bọc kỹ, ruột sách sạch và ít ghi chú. Nhân viên phản hồi nhanh khi mình hỏi thêm ảnh thật của sách." },
            { user: "Tuấn Kiệt", stars: 4, comment: "Mình mua vì muốn luyện đọc ngoại văn, bản này phù hợp để đọc chậm." },
            { user: "Linh Chi", stars: 5, comment: "Nội dung có chiều sâu, càng đọc càng thấy nhiều lớp nghĩa." },
            { user: "Phương Thảo", stars: 5, comment: "Shop giao đúng phiên bản, tình trạng sách giống mô tả." },
            { user: "Anh Duy", stars: 4, comment: "Giấy hơi ngả màu nhưng chữ rõ, đọc không bị mỏi." },
            { user: "Khánh Vy", stars: 4, comment: "Rất đáng mua nếu thích sưu tầm ngoại văn chọn lọc." }
        ]
    },
    {
        id: 50, category: "Ngoại văn tuyển chọn", name: "Animal Farm", author: "George Orwell",
        price: "135.000", oldPrice: "160.000", rating: 4.9, publisher: "Nhã Nam", year: 2013, image: "Animalfarm.jpg",
        description: "Một cuốn tiểu thuyết ngụ ngôn trào phúng sắc sảo, ám chỉ sâu cay về các hệ tư tưởng chính trị. Tại Trại Điền Trang, những con vật đã nổi dậy lật đổ ách thống trị của con người để xây dựng một xã hội bình đẳng. Nhưng rồi chính những con lợn lãnh đạo lại dần tha hóa, trở thành những kẻ độc tài tàn bạo với khẩu hiệu mỉa mai: 'Mọi con vật đều bình đẳng, nhưng một số con vật bình đẳng hơn những con vật khác'. Ấn bản này phù hợp với người đọc muốn thưởng thức tác phẩm ở nguyên bản hoặc rèn luyện khả năng đọc ngoại văn. Bên cạnh nội dung văn học, cuốn sách còn giúp người đọc cảm nhận rõ hơn nhịp điệu ngôn ngữ, phong cách viết và sắc thái văn hóa của tác giả. Đây là lựa chọn tốt cho tủ sách cá nhân của người yêu văn chương thế giới.",
        reviews: [
            { user: "Linh Chi", stars: 4, comment: "Animal Farm có văn phong cuốn hút, bản ngoại văn giúp cảm nhận tác phẩm rõ hơn." },
            { user: "Phương Thảo", stars: 5, comment: "Sách được bọc kỹ, ruột sách sạch và ít ghi chú. Nhân viên phản hồi nhanh khi mình hỏi thêm ảnh thật của sách." },
            { user: "Anh Duy", stars: 5, comment: "Mình mua vì muốn luyện đọc ngoại văn, bản này phù hợp để đọc chậm." },
            { user: "Khánh Vy", stars: 5, comment: "Nội dung có chiều sâu, càng đọc càng thấy nhiều lớp nghĩa." },
            { user: "Quang Hưng", stars: 5, comment: "Shop giao đúng phiên bản, tình trạng sách giống mô tả." },
            { user: "Bảo Ngọc", stars: 5, comment: "Giấy hơi ngả màu nhưng chữ rõ, đọc không bị mỏi." },
            { user: "Thanh Tùng", stars: 5, comment: "Rất đáng mua nếu thích sưu tầm ngoại văn chọn lọc." },
            { user: "Mỹ Linh", stars: 5, comment: "Animal Farm có văn phong cuốn hút, bản ngoại văn giúp cảm nhận tác phẩm rõ hơn." }
        ]
    },
    {
        id: 51, category: "Ngoại văn tuyển chọn", name: "The Great Gatsby", author: "F. Scott Fitzgerald",
        price: "155.000", oldPrice: "190.000", rating: 4.8, publisher: "Nhã Nam", year: 2012, image: "Thegreatgatsby.jpg",
        description: "Được mệnh danh là tiểu thuyết vĩ đại nhất về 'Thời đại Jazz' của nước Mỹ thập niên 1920. Cuốn sách kể về cuộc đời rực rỡ nhưng bi kịch của Jay Gatsby - một triệu phú bí ẩn nỗ lực vươn lên giàu có chỉ để theo đuổi lại một tình yêu phù phiếm với Daisy Buchanan. Một bức tranh lột tả sự rỗng tuếch, giả dối và sự vỡ mộng cay đắng của 'Giấc mơ Mỹ'. Ấn bản này phù hợp với người đọc muốn thưởng thức tác phẩm ở nguyên bản hoặc rèn luyện khả năng đọc ngoại văn. Bên cạnh nội dung văn học, cuốn sách còn giúp người đọc cảm nhận rõ hơn nhịp điệu ngôn ngữ, phong cách viết và sắc thái văn hóa của tác giả. Đây là lựa chọn tốt cho tủ sách cá nhân của người yêu văn chương thế giới.",
        reviews: [
            { user: "Khánh Vy", stars: 5, comment: "The Great Gatsby có văn phong cuốn hút, bản ngoại văn giúp cảm nhận tác phẩm rõ hơn." },
            { user: "Quang Hưng", stars: 5, comment: "Sách được bọc kỹ, ruột sách sạch và ít ghi chú. Nhân viên phản hồi nhanh khi mình hỏi thêm ảnh thật của sách." },
            { user: "Bảo Ngọc", stars: 4, comment: "Mình mua vì muốn luyện đọc ngoại văn, bản này phù hợp để đọc chậm." },
            { user: "Thanh Tùng", stars: 5, comment: "Nội dung có chiều sâu, càng đọc càng thấy nhiều lớp nghĩa." },
            { user: "Mỹ Linh", stars: 5, comment: "Shop giao đúng phiên bản, tình trạng sách giống mô tả." },
            { user: "Đức Anh", stars: 5, comment: "Giấy hơi ngả màu nhưng chữ rõ, đọc không bị mỏi." }
        ]
    },
    {
        id: 52, category: "Ngoại văn tuyển chọn", name: "To Kill a Mockingbird", author: "Harper Lee",
        price: "175.000", oldPrice: "210.000", rating: 5.0, publisher: "Nhã Nam", year: 2010, image: "Tokillamockingbird.jpg",
        description: "Giết Con Chim Nhại là tiếng nói đanh thép chống lại nạn phân biệt chủng tộc tại miền Nam nước Mỹ. Qua góc nhìn ngây thơ của cô bé Scout, người đọc chứng kiến hình ảnh luật sư Atticus Finch dũng cảm đứng lên bảo vệ một người đàn ông da đen vô tội bị vu oan tội cưỡng hiếp. Cuốn sách là bài học vĩ đại về lòng dũng cảm, sự đồng cảm và lương tri của con người. Ấn bản này phù hợp với người đọc muốn thưởng thức tác phẩm ở nguyên bản hoặc rèn luyện khả năng đọc ngoại văn. Bên cạnh nội dung văn học, cuốn sách còn giúp người đọc cảm nhận rõ hơn nhịp điệu ngôn ngữ, phong cách viết và sắc thái văn hóa của tác giả. Đây là lựa chọn tốt cho tủ sách cá nhân của người yêu văn chương thế giới.",
        reviews: [
            { user: "Thanh Tùng", stars: 5, comment: "To Kill a Mockingbird có văn phong cuốn hút, bản ngoại văn giúp cảm nhận tác phẩm rõ hơn." },
            { user: "Mỹ Linh", stars: 5, comment: "Sách được bọc kỹ, ruột sách sạch và ít ghi chú. Nhân viên phản hồi nhanh khi mình hỏi thêm ảnh thật của sách." },
            { user: "Đức Anh", stars: 5, comment: "Mình mua vì muốn luyện đọc ngoại văn, bản này phù hợp để đọc chậm." },
            { user: "Hà My", stars: 5, comment: "Nội dung có chiều sâu, càng đọc càng thấy nhiều lớp nghĩa." },
            { user: "Minh Anh", stars: 5, comment: "Shop giao đúng phiên bản, tình trạng sách giống mô tả." },
            { user: "Hoàng Nam", stars: 5, comment: "Giấy hơi ngả màu nhưng chữ rõ, đọc không bị mỏi." },
            { user: "Thu Hà", stars: 5 }
        ]
    },
    {
        id: 53, category: "Ngoại văn tuyển chọn", name: "Crime and Punishment", author: "Fyodor Dostoevsky",
        price: "260.000", oldPrice: "320.000", rating: 4.9, publisher: "NXB Văn Học", year: 2011, image: "Crimeandpunishment.jpg",
        description: "Tội ác và Hình phạt là kiệt tác phân tâm học vĩ đại của văn học Nga. Cậu sinh viên nghèo Raskolnikov vì tin vào lý thuyết 'con người phi thường' đã giết chết một mụ cầm đồ tàn nhẫn. Thay vì tận hưởng chiến lợi phẩm, hắn lại rơi vào một cuộc khủng hoảng tinh thần tột độ, bị giày vò bởi lương tâm và nỗi sợ hãi. Sự cứu rỗi chỉ đến khi hắn nhận ra ý nghĩa của sự hối cải và tình yêu thương. Ấn bản này phù hợp với người đọc muốn thưởng thức tác phẩm ở nguyên bản hoặc rèn luyện khả năng đọc ngoại văn. Bên cạnh nội dung văn học, cuốn sách còn giúp người đọc cảm nhận rõ hơn nhịp điệu ngôn ngữ, phong cách viết và sắc thái văn hóa của tác giả. Đây là lựa chọn tốt cho tủ sách cá nhân của người yêu văn chương thế giới.",
        reviews: [
            { user: "Hà My", stars: 4, comment: "Crime and Punishment có văn phong cuốn hút, bản ngoại văn giúp cảm nhận tác phẩm rõ hơn." },
            { user: "Minh Anh", stars: 5, comment: "Sách được bọc kỹ, ruột sách sạch và ít ghi chú. Nhân viên phản hồi nhanh khi mình hỏi thêm ảnh thật của sách." },
            { user: "Hoàng Nam", stars: 5, comment: "Mình mua vì muốn luyện đọc ngoại văn, bản này phù hợp để đọc chậm." },
            { user: "Thu Hà", stars: 5, comment: "Nội dung có chiều sâu, càng đọc càng thấy nhiều lớp nghĩa." },
            { user: "Gia Huy", stars: 5, comment: "Shop giao đúng phiên bản, tình trạng sách giống mô tả." },
            { user: "Ngọc Mai", stars: 5, comment: "Giấy hơi ngả màu nhưng chữ rõ, đọc không bị mỏi." },
            { user: "Tuấn Kiệt", stars: 5, comment: "Rất đáng mua nếu thích sưu tầm ngoại văn chọn lọc." },
            { user: "Linh Chi", stars: 5, comment: "Crime and Punishment có văn phong cuốn hút, bản ngoại văn giúp cảm nhận tác phẩm rõ hơn." }
        ]
    },
    {
        id: 54, category: "Ngoại văn tuyển chọn", name: "Pride and Prejudice", author: "Jane Austen",
        price: "165.000", oldPrice: "200.000", rating: 4.8, publisher: "NXB Hội Nhà Văn", year: 2014, image: "Prideandprejudice.jpg",
        description: "Phiên bản ngoại văn gốc của tác phẩm lãng mạn lừng danh nhất nước Anh. Cốt truyện kinh điển xoay quanh hành trình xóa bỏ định kiến (prejudice) của nàng Elizabeth và gạt bỏ sự kiêu hãnh (pride) của ngài Darcy để tìm đến bến bờ hạnh phúc. Ngôn từ tiếng Anh nguyên bản giúp người đọc cảm nhận trọn vẹn sự tinh tế, hóm hỉnh và thanh lịch trong văn phong của Jane Austen. Ấn bản này phù hợp với người đọc muốn thưởng thức tác phẩm ở nguyên bản hoặc rèn luyện khả năng đọc ngoại văn. Bên cạnh nội dung văn học, cuốn sách còn giúp người đọc cảm nhận rõ hơn nhịp điệu ngôn ngữ, phong cách viết và sắc thái văn hóa của tác giả. Đây là lựa chọn tốt cho tủ sách cá nhân của người yêu văn chương thế giới.",
        reviews: [
            { user: "Thu Hà", stars: 4, comment: "Pride and Prejudice có văn phong cuốn hút, bản ngoại văn giúp cảm nhận tác phẩm rõ hơn." },
            { user: "Gia Huy", stars: 5, comment: "Sách được bọc kỹ, ruột sách sạch và ít ghi chú. Nhân viên phản hồi nhanh khi mình hỏi thêm ảnh thật của sách." },
            { user: "Ngọc Mai", stars: 5, comment: "Mình mua vì muốn luyện đọc ngoại văn, bản này phù hợp để đọc chậm." },
            { user: "Tuấn Kiệt", stars: 5, comment: "Nội dung có chiều sâu, càng đọc càng thấy nhiều lớp nghĩa." },
            { user: "Linh Chi", stars: 5, comment: "Shop giao đúng phiên bản, tình trạng sách giống mô tả." },
            { user: "Phương Thảo", stars: 5, comment: "Giấy hơi ngả màu nhưng chữ rõ, đọc không bị mỏi." }
        ]
    },

    // 8. Ấn bản đặc biệt
    {
        id: 55, category: "Ấn bản đặc biệt", name: "Văn minh Việt Nam", author: "Nguyễn Văn Huyên",
        price: "490.000", oldPrice: "580.000", rating: 4.9, publisher: "Nhã Nam", year: 2016, image: "VanminhVietNam.jpg",
        description: "Cuốn sách là một công trình nghiên cứu nhân học, dân tộc học vô giá do học giả Nguyễn Văn Huyên viết bằng tiếng Pháp năm 1944. Ấn bản đặc biệt này được thiết kế bìa cứng, in màu sắc nét, phục dựng lại chi tiết bức tranh toàn cảnh về gia đình, làng xã, tín ngưỡng, nông nghiệp và văn hóa truyền thống của người Việt Nam đầu thế kỷ 20. Điểm nổi bật của ấn bản này nằm ở giá trị sưu tầm, thiết kế và cảm giác trang trọng khi sở hữu. Sách phù hợp để trưng bày, làm quà tặng hoặc lưu giữ lâu dài trong tủ sách gia đình. Với người yêu sách cũ, từng chi tiết về bìa, giấy, minh họa và cách trình bày đều góp phần tạo nên sức hấp dẫn riêng của một ấn phẩm có giá trị.",
        reviews: [
            { user: "Tuấn Kiệt", stars: 5, comment: "Văn minh Việt Nam có hình thức rất đẹp, phù hợp để sưu tầm hoặc làm quà tặng." },
            { user: "Linh Chi", stars: 5, comment: "Đóng gói cực kỳ chắc, sách không bị móp góc dù là ấn bản khổ lớn. Nhân viên phản hồi nhanh khi mình hỏi thêm ảnh thật của sách." },
            { user: "Phương Thảo", stars: 5, comment: "Mình chọn Thư Hiên vì có nhiều ấn bản đặc biệt hiếm, cuốn này nhận rất ưng." },
            { user: "Anh Duy", stars: 5, comment: "Chất lượng in ấn và thiết kế tạo cảm giác trang trọng khi cầm đọc." },
            { user: "Khánh Vy", stars: 5, comment: "Sách cũ nhưng bảo quản tốt, xứng đáng với giá sưu tầm. Đặt trên kệ nhìn rất có cảm giác hoài cổ." },
            { user: "Quang Hưng", stars: 5, comment: "Giao hàng cẩn thận, có lớp bọc bảo vệ sách kỹ." },
            { user: "Bảo Ngọc", stars: 4, comment: "Một ấn bản đẹp, hợp với người thích sách quý và sách trưng bày." }
        ]
    },
    {
        id: 56, category: "Ấn bản đặc biệt", name: "Ngụ ngôn La Fontaine", author: "Jean de La Fontaine",
        price: "910.000", oldPrice: "1.100.000", rating: 4.8, publisher: "Đông A", year: 2015, image: "NgungonLaFontaine.jpg",
        description: "Ấn bản giới hạn tuyệt đẹp của tuyển tập ngụ ngôn vĩ đại nước Pháp. Cuốn sách giữ nguyên các bản dịch thơ kinh điển của Nguyễn Văn Vĩnh, kết hợp cùng hàng trăm bức tranh minh họa cổ điển được mạ vàng sang trọng. Thông qua hình ảnh các con vật, tác giả gửi gắm những bài học nhân sinh, đạo đức sâu sắc, mỉa mai những thói hư tật xấu của con người trong xã hội. Điểm nổi bật của ấn bản này nằm ở giá trị sưu tầm, thiết kế và cảm giác trang trọng khi sở hữu. Sách phù hợp để trưng bày, làm quà tặng hoặc lưu giữ lâu dài trong tủ sách gia đình. Với người yêu sách cũ, từng chi tiết về bìa, giấy, minh họa và cách trình bày đều góp phần tạo nên sức hấp dẫn riêng của một ấn phẩm có giá trị.",
        reviews: [
            { user: "Anh Duy", stars: 5, comment: "Ngụ ngôn La Fontaine có hình thức rất đẹp, phù hợp để sưu tầm hoặc làm quà tặng." },
            { user: "Khánh Vy", stars: 4, comment: "Đóng gói cực kỳ chắc, sách không bị móp góc dù là ấn bản khổ lớn. Nhân viên phản hồi nhanh khi mình hỏi thêm ảnh thật của sách." },
            { user: "Quang Hưng", stars: 5, comment: "Mình chọn Thư Hiên vì có nhiều ấn bản đặc biệt hiếm, cuốn này nhận rất ưng." },
            { user: "Bảo Ngọc", stars: 5, comment: "Chất lượng in ấn và thiết kế tạo cảm giác trang trọng khi cầm đọc." },
            { user: "Thanh Tùng", stars: 5, comment: "Sách cũ nhưng bảo quản tốt, xứng đáng với giá sưu tầm. Đặt trên kệ nhìn rất có cảm giác hoài cổ." },
            { user: "Mỹ Linh", stars: 5, comment: "Giao hàng cẩn thận, có lớp bọc bảo vệ sách kỹ." },
            { user: "Đức Anh", stars: 5, comment: "Một ấn bản đẹp, hợp với người thích sách quý và sách trưng bày." },
            { user: "Hà My", stars: 4 }
        ]
    },
    {
        id: 57, category: "Ấn bản đặc biệt", name: "Trận chiến đổi lịch sử", author: "Nhiều tác giả",
        price: "850.000", oldPrice: "1.000.000", rating: 4.7, publisher: "NXB Quân Đội Nhân Dân", year: 2018, image: "Nhungtranchienthaydoilichsu.jpg",
        description: "Một bản hùng ca về những trận đánh chấn động thế giới, làm xoay chuyển bánh xe lịch sử nhân loại. Từ Waterloo, Stalingrad, Trân Châu Cảng đến Điện Biên Phủ, sách phân tích chi tiết về bối cảnh, chiến thuật quân sự, những sai lầm cá nhân và hệ quả để lại. Ấn bản khổ lớn có kèm bản đồ chiến dịch màu sắc nét và sa bàn phân tích cực kỳ công phu. Điểm nổi bật của ấn bản này nằm ở giá trị sưu tầm, thiết kế và cảm giác trang trọng khi sở hữu. Sách phù hợp để trưng bày, làm quà tặng hoặc lưu giữ lâu dài trong tủ sách gia đình. Với người yêu sách cũ, từng chi tiết về bìa, giấy, minh họa và cách trình bày đều góp phần tạo nên sức hấp dẫn riêng của một ấn phẩm có giá trị.",
        reviews: [
            { user: "Bảo Ngọc", stars: 5, comment: "Trận chiến đổi lịch sử có hình thức rất đẹp, phù hợp để sưu tầm hoặc làm quà tặng." },
            { user: "Thanh Tùng", stars: 4, comment: "Đóng gói cực kỳ chắc, sách không bị móp góc dù là ấn bản khổ lớn. Nhân viên phản hồi nhanh khi mình hỏi thêm ảnh thật của sách." },
            { user: "Mỹ Linh", stars: 5, comment: "Mình chọn Thư Hiên vì có nhiều ấn bản đặc biệt hiếm, cuốn này nhận rất ưng." },
            { user: "Đức Anh", stars: 5, comment: "Chất lượng in ấn và thiết kế tạo cảm giác trang trọng khi cầm đọc." },
            { user: "Hà My", stars: 5, comment: "Sách cũ nhưng bảo quản tốt, xứng đáng với giá sưu tầm. Đặt trên kệ nhìn rất có cảm giác hoài cổ." },
            { user: "Minh Anh", stars: 4, comment: "Giao hàng cẩn thận, có lớp bọc bảo vệ sách kỹ." }
        ]
    },
    {
        id: 58, category: "Ấn bản đặc biệt", name: "Tuyển tập kịch Jacinto", author: "Jacinto Benavente",
        price: "780.000", oldPrice: "900.000", rating: 4.6, publisher: "NXB Sân Khấu", year: 2010, image: "TuyentapkichJacintoBenavente.jpg",
        description: "Ấn bản sưu tầm quý hiếm tôn vinh tác giả đạt giải Nobel Văn học người Tây Ban Nha. Cuốn sách tuyển chọn những vở kịch châm biếm xuất sắc nhất của ông, phơi bày sự giả dối, phù phiếm của tầng lớp tư sản thời bấy giờ. Với bìa da ép kim và giấy mỹ thuật cao cấp, đây là cuốn sách không thể thiếu cho những người đam mê văn học nghệ thuật châu Âu. Điểm nổi bật của ấn bản này nằm ở giá trị sưu tầm, thiết kế và cảm giác trang trọng khi sở hữu. Sách phù hợp để trưng bày, làm quà tặng hoặc lưu giữ lâu dài trong tủ sách gia đình. Với người yêu sách cũ, từng chi tiết về bìa, giấy, minh họa và cách trình bày đều góp phần tạo nên sức hấp dẫn riêng của một ấn phẩm có giá trị.",
        reviews: [
            { user: "Đức Anh", stars: 5, comment: "Tuyển tập kịch Jacinto có hình thức rất đẹp, phù hợp để sưu tầm hoặc làm quà tặng." },
            { user: "Hà My", stars: 4, comment: "Đóng gói cực kỳ chắc, sách không bị móp góc dù là ấn bản khổ lớn. Nhân viên phản hồi nhanh khi mình hỏi thêm ảnh thật của sách." },
            { user: "Minh Anh", stars: 4, comment: "Mình chọn Thư Hiên vì có nhiều ấn bản đặc biệt hiếm, cuốn này nhận rất ưng." },
            { user: "Hoàng Nam", stars: 5, comment: "Chất lượng in ấn và thiết kế tạo cảm giác trang trọng khi cầm đọc." },
            { user: "Thu Hà", stars: 5, comment: "Sách cũ nhưng bảo quản tốt, xứng đáng với giá sưu tầm. Đặt trên kệ nhìn rất có cảm giác hoài cổ." },
            { user: "Gia Huy", stars: 4, comment: "Giao hàng cẩn thận, có lớp bọc bảo vệ sách kỹ." },
            { user: "Ngọc Mai", stars: 5, comment: "Một ấn bản đẹp, hợp với người thích sách quý và sách trưng bày." }
        ]
    },
    {
        id: 59, category: "Ấn bản đặc biệt", name: "Nghìn lẻ một đêm", author: "Antoine Galland",
        price: "850.000", oldPrice: "1.050.000", rating: 5.0, publisher: "Đông A", year: 2015, image: "Nghinlemotdem.jpg",
        description: "Bản dịch trọn vẹn và kinh điển nhất của bộ truyện cổ dân gian Ả Rập. Nàng Scheherazade thông minh đã dùng tài kể chuyện khéo léo của mình mỗi đêm để trì hoãn án tử hình của vị vua độc ác. Những câu chuyện kỳ ảo về Aladdin, Ali Baba, Sinbad không chỉ mở ra một thế giới Trung Đông đầy phép màu mà còn là minh chứng cho sức mạnh cứu rỗi của nghệ thuật ngôn từ. Điểm nổi bật của ấn bản này nằm ở giá trị sưu tầm, thiết kế và cảm giác trang trọng khi sở hữu. Sách phù hợp để trưng bày, làm quà tặng hoặc lưu giữ lâu dài trong tủ sách gia đình. Với người yêu sách cũ, từng chi tiết về bìa, giấy, minh họa và cách trình bày đều góp phần tạo nên sức hấp dẫn riêng của một ấn phẩm có giá trị.",
        reviews: [
            { user: "Hoàng Nam", stars: 5, comment: "Nghìn lẻ một đêm có hình thức rất đẹp, phù hợp để sưu tầm hoặc làm quà tặng." },
            { user: "Thu Hà", stars: 5, comment: "Đóng gói cực kỳ chắc, sách không bị móp góc dù là ấn bản khổ lớn. Nhân viên phản hồi nhanh khi mình hỏi thêm ảnh thật của sách." },
            { user: "Gia Huy", stars: 5, comment: "Mình chọn Thư Hiên vì có nhiều ấn bản đặc biệt hiếm, cuốn này nhận rất ưng." },
            { user: "Ngọc Mai", stars: 5, comment: "Chất lượng in ấn và thiết kế tạo cảm giác trang trọng khi cầm đọc." },
            { user: "Tuấn Kiệt", stars: 5, comment: "Sách cũ nhưng bảo quản tốt, xứng đáng với giá sưu tầm. Đặt trên kệ nhìn rất có cảm giác hoài cổ." },
            { user: "Linh Chi", stars: 5, comment: "Giao hàng cẩn thận, có lớp bọc bảo vệ sách kỹ." },
            { user: "Phương Thảo", stars: 5, comment: "Một ấn bản đẹp, hợp với người thích sách quý và sách trưng bày." },
            { user: "Anh Duy", stars: 5, comment: "Nghìn lẻ một đêm có hình thức rất đẹp, phù hợp để sưu tầm hoặc làm quà tặng." }
        ]
    },
    {
        id: 60, category: "Ấn bản đặc biệt", name: "Một chiến dịch ở Bắc Kỳ", author: "Charles-Édouard Hocquard",
        price: "320.000", oldPrice: "380.000", rating: 4.8, publisher: "Omega+", year: 2019, image: "MotchiendichobacKy.jpg",
        description: "Cuốn sách là hồi ký lịch sử chân thực của một bác sĩ quân y người Pháp tham gia cuộc viễn chinh Bắc Kỳ cuối thế kỷ 19. Qua góc nhìn của ông, hình ảnh đền chùa, phố xá Hà Nội xưa, đời sống người dân An Nam, những phong tục tập quán lạ lẫm hiện lên cực kỳ chi tiết. Ấn bản đính kèm hàng chục bức ảnh mộc bản quý giá chưa từng được công bố rộng rãi. Điểm nổi bật của ấn bản này nằm ở giá trị sưu tầm, thiết kế và cảm giác trang trọng khi sở hữu. Sách phù hợp để trưng bày, làm quà tặng hoặc lưu giữ lâu dài trong tủ sách gia đình. Với người yêu sách cũ, từng chi tiết về bìa, giấy, minh họa và cách trình bày đều góp phần tạo nên sức hấp dẫn riêng của một ấn phẩm có giá trị.",
        reviews: [
            { user: "Ngọc Mai", stars: 5, comment: "Một chiến dịch ở Bắc Kỳ có hình thức rất đẹp, phù hợp để sưu tầm hoặc làm quà tặng." },
            { user: "Tuấn Kiệt", stars: 4, comment: "Đóng gói cực kỳ chắc, sách không bị móp góc dù là ấn bản khổ lớn. Nhân viên phản hồi nhanh khi mình hỏi thêm ảnh thật của sách." },
            { user: "Linh Chi", stars: 5, comment: "Mình chọn Thư Hiên vì có nhiều ấn bản đặc biệt hiếm, cuốn này nhận rất ưng." },
            { user: "Phương Thảo", stars: 5, comment: "Chất lượng in ấn và thiết kế tạo cảm giác trang trọng khi cầm đọc." },
            { user: "Anh Duy", stars: 5, comment: "Sách cũ nhưng bảo quản tốt, xứng đáng với giá sưu tầm. Đặt trên kệ nhìn rất có cảm giác hoài cổ." },
            { user: "Khánh Vy", stars: 5 }
        ]
    },
    {
        id: 61, category: "Ấn bản đặc biệt", name: "Truyện Kiều hội bản", author: "Nguyễn Du",
        price: "1.250.000", oldPrice: "1.500.000", rating: 5.0, publisher: "NXB Trẻ", year: 2020, image: "Truyenkieuhoiban.jpg",
        description: "Phiên bản tuyệt đỉnh vinh danh kiệt tác bất hủ của đại thi hào Nguyễn Du. Bản in được tập hợp các chú giải uyên bác nhất của nhiều học giả lớn, giữ nguyên bản chữ Nôm bên cạnh bản chữ Quốc ngữ. Sách in trên giấy dó truyền thống, bìa gấm bọc lụa thêu hoa văn, đi kèm bộ tranh tứ bình họa nàng Kiều cực kỳ tinh xảo. Đây thực sự là một bảo vật truyền gia. Điểm nổi bật của ấn bản này nằm ở giá trị sưu tầm, thiết kế và cảm giác trang trọng khi sở hữu. Sách phù hợp để trưng bày, làm quà tặng hoặc lưu giữ lâu dài trong tủ sách gia đình. Với người yêu sách cũ, từng chi tiết về bìa, giấy, minh họa và cách trình bày đều góp phần tạo nên sức hấp dẫn riêng của một ấn phẩm có giá trị.",
        reviews: [
            { user: "Phương Thảo", stars: 5, comment: "Truyện Kiều hội bản có hình thức rất đẹp, phù hợp để sưu tầm hoặc làm quà tặng." },
            { user: "Anh Duy", stars: 5, comment: "Đóng gói cực kỳ chắc, sách không bị móp góc dù là ấn bản khổ lớn. Nhân viên phản hồi nhanh khi mình hỏi thêm ảnh thật của sách." },
            { user: "Khánh Vy", stars: 5, comment: "Mình chọn Thư Hiên vì có nhiều ấn bản đặc biệt hiếm, cuốn này nhận rất ưng." },
            { user: "Quang Hưng", stars: 5, comment: "Chất lượng in ấn và thiết kế tạo cảm giác trang trọng khi cầm đọc." },
            { user: "Bảo Ngọc", stars: 5, comment: "Sách cũ nhưng bảo quản tốt, xứng đáng với giá sưu tầm. Đặt trên kệ nhìn rất có cảm giác hoài cổ." },
            { user: "Thanh Tùng", stars: 5, comment: "Giao hàng cẩn thận, có lớp bọc bảo vệ sách kỹ." },
            { user: "Mỹ Linh", stars: 5, comment: "Một ấn bản đẹp, hợp với người thích sách quý và sách trưng bày." }
        ]
    },
    {
        id: 62, category: "Ấn bản đặc biệt", name: "Combo: 2 Cuốn Nobel", author: "Nhiều tác giả",
        price: "550.000", oldPrice: "680.000", rating: 4.8, publisher: "NXB Văn Học", year: 2021, image: "Combo2cuontramnamNobel.jpg",
        description: "Bộ đôi tác phẩm đặc biệt tuyển chọn từ các tác gia từng vinh dự đạt giải Nobel Văn học toàn cầu. Với thiết kế hộp đựng đồng bộ, ép nhũ sang trọng, hai cuốn sách mang đến những triết lý nhân sinh sâu sắc, những áng văn chương diễm lệ vượt qua mọi ranh giới quốc gia và thời đại. Lựa chọn tuyệt vời làm quà tặng cho những người có tình yêu lớn với văn chương. Điểm nổi bật của ấn bản này nằm ở giá trị sưu tầm, thiết kế và cảm giác trang trọng khi sở hữu. Sách phù hợp để trưng bày, làm quà tặng hoặc lưu giữ lâu dài trong tủ sách gia đình. Với người yêu sách cũ, từng chi tiết về bìa, giấy, minh họa và cách trình bày đều góp phần tạo nên sức hấp dẫn riêng của một ấn phẩm có giá trị.",
        reviews: [
            { user: "Quang Hưng", stars: 5, comment: "Combo: 2 Cuốn Nobel có hình thức rất đẹp, phù hợp để sưu tầm hoặc làm quà tặng." },
            { user: "Bảo Ngọc", stars: 5, comment: "Đóng gói cực kỳ chắc, sách không bị móp góc dù là ấn bản khổ lớn. Nhân viên phản hồi nhanh khi mình hỏi thêm ảnh thật của sách." },
            { user: "Thanh Tùng", stars: 5, comment: "Mình chọn Thư Hiên vì có nhiều ấn bản đặc biệt hiếm, cuốn này nhận rất ưng." },
            { user: "Mỹ Linh", stars: 5, comment: "Chất lượng in ấn và thiết kế tạo cảm giác trang trọng khi cầm đọc." },
            { user: "Đức Anh", stars: 5, comment: "Sách cũ nhưng bảo quản tốt, xứng đáng với giá sưu tầm. Đặt trên kệ nhìn rất có cảm giác hoài cổ." },
            { user: "Hà My", stars: 4, comment: "Giao hàng cẩn thận, có lớp bọc bảo vệ sách kỹ." },
            { user: "Minh Anh", stars: 4, comment: "Một ấn bản đẹp, hợp với người thích sách quý và sách trưng bày." },
            { user: "Hoàng Nam", stars: 5, comment: "Combo: 2 Cuốn Nobel có hình thức rất đẹp, phù hợp để sưu tầm hoặc làm quà tặng." }
        ]
    }
];

window.booksData = booksData;