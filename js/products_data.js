const productsData = [
  {
    "id": "bot-giat-300gr-2-5kg-3kg-5kg-bot-giat-cong-nghe-sp2-450gr-900gr-1500gr",
    "title": "Bột Giặt / Bột giặt Công nghệ",
    "image": "./wp-content/uploads/2022/12/z3976167400787_767444e4d0c7cda1135d75441aa1c874.jpg",
    "price": "35.000 ₫",
    "description": "Mô tả sản phẩm Bột Giặt / Bột giặt Công nghệ",
    "category": "Sản phẩm Dạ Lan"
  },
  {
    "id": "bot-giat-6kg",
    "title": "Bột Giặt Boc",
    "image": "./wp-content/uploads/2022/12/z3976415054202_8267fdc21305633b09d2dbea26064061.jpg",
    "price": "35.000 ₫",
    "description": "Mô tả sản phẩm Bột Giặt Boc",
    "category": "Sản phẩm Dạ Lan"
  },
  {
    "id": "bot-giat-ino-3kg",
    "title": "Bột Giặt INO",
    "image": "./wp-content/uploads/2022/12/z3976554355681_87ba73c90e4de74f583f6992de1ad118.jpg",
    "price": "35.000 ₫",
    "description": "Mô tả sản phẩm Bột Giặt INO",
    "category": "Sản phẩm Dạ Lan"
  },
  {
    "id": "combo-sua-tam-goi-1-2l",
    "title": "Combo Sữa Tắm Gội",
    "image": "./wp-content/uploads/2022/12/z3976502189404_125783bf60d89de057efcd8b6cc4b29a.jpg",
    "price": "35.000 ₫",
    "description": "Mô tả sản phẩm Combo Sữa Tắm Gội",
    "category": "Sản phẩm Dạ Lan"
  },
  {
    "id": "dau-goi-chai-250-va-day",
    "title": "Xà Phòng Thơm",
    "image": "./wp-content/uploads/2022/12/z3666676098507_5ff1cc194e03fec6b5440350373e25c4.jpg",
    "price": "35.000 ₫",
    "description": "Mô tả sản phẩm Xà Phòng Thơm",
    "category": "Sản phẩm Dạ Lan"
  },
  {
    "id": "dau-goi-ha-thu-o-bo-ket-deko-500ml",
    "title": "Dầu Gội Hà Thủ Ô – Bồ Kết Deko",
    "image": "./wp-content/uploads/2022/12/z3976182442722_43922650198985328505969c3b245c1b.jpg",
    "price": "35.000 ₫",
    "description": "Mô tả sản phẩm Dầu Gội Hà Thủ Ô – Bồ Kết Deko",
    "category": "Sản phẩm Dạ Lan"
  },
  {
    "id": "dau-goi-tri-gau-deko-500ml",
    "title": "Dầu Gội Trị Gàu Deko",
    "image": "./wp-content/uploads/2022/12/z3976182473179_1685648e3fece6c56cd93bf9b477bacf.jpg",
    "price": "35.000 ₫",
    "description": "Mô tả sản phẩm Dầu Gội Trị Gàu Deko",
    "category": "Sản phẩm Dạ Lan"
  },
  {
    "id": "ino-600ml-chanh",
    "title": "Nước Rửa Chén INO",
    "image": "./wp-content/uploads/2022/12/zc.png",
    "price": "35.000 ₫",
    "description": "Mô tả sản phẩm Nước Rửa Chén INO",
    "category": "Sản phẩm Dạ Lan"
  },
  {
    "id": "ino-950ml-huong-hoa-mua-he",
    "title": "Nước Lau Sàn INO – Hương Hoa Mùa Hè",
    "image": "./wp-content/uploads/2022/12/2-1.png",
    "price": "35.000 ₫",
    "description": "Mô tả sản phẩm Nước Lau Sàn INO – Hương Hoa Mùa Hè",
    "category": "Sản phẩm Dạ Lan"
  },
  {
    "id": "ino-dam-me-35l-tim",
    "title": "Nước Giặt INO",
    "image": "./wp-content/uploads/2022/12/damme-e1671598934725.png",
    "price": "35.000 ₫",
    "description": "Mô tả sản phẩm Nước Giặt INO",
    "category": "Sản phẩm Dạ Lan"
  },
  {
    "id": "ino-diet-khuan-1-5l",
    "title": "Nước Giặt Diệt Khuẩn INO",
    "image": "./wp-content/uploads/2022/12/heh-1.png",
    "price": "35.000 ₫",
    "description": "Mô tả sản phẩm Nước Giặt Diệt Khuẩn INO",
    "category": "Sản phẩm Dạ Lan"
  },
  {
    "id": "ino-mem-vai-3l",
    "title": "Nước Xả Vải INO",
    "image": "./wp-content/uploads/2022/12/z3976192290414_ba2e1c07559395b5ade23b93046a4642.jpg",
    "price": "35.000 ₫",
    "description": "Mô tả sản phẩm Nước Xả Vải INO",
    "category": "Sản phẩm Dạ Lan"
  },
  {
    "id": "kdr-da-lan-ngua-sau-rang-200gr",
    "title": "KEM ĐÁNH RĂNG NGỪA SÂU RĂNG 240G",
    "image": "./wp-content/uploads/2022/12/12.jpg",
    "price": "32.000 ₫",
    "description": "Kem đánh răng Dạ Lan được sản xuất theo công nghệ flour và 2 lần canxi giúp lấp đầy các lỗ sâu răng li ti trên bề mặt răng chống mảng bám, ngừa sâu răng và bảo vệ men răng. Đem lại cho bạn nụ cười tươi sáng và hàm răng chắc khỏe mỗi ngày.<br><br>Kem đánh răng Dạ Lan ngừa sâu răng hằng ngày 240g cho hơi thở thơm mát và sảng khoái dài lâu.",
    "category": "Sản phẩm Dạ Lan"
  },
  {
    "id": "kdr-da-lan-thao-duoc-180g-kem-ban-chai",
    "title": "Kem Đánh Răng Dạ Lan Thảo Dược Quế",
    "image": "./wp-content/uploads/2022/12/13.jpg",
    "price": "35.000 ₫",
    "description": "Mô tả sản phẩm Kem Đánh Răng Dạ Lan Thảo Dược Quế",
    "category": "Sản phẩm Dạ Lan"
  },
  {
    "id": "kem-danh-rang-110gr-bac-ha",
    "title": "Kem Đánh Răng Bạc Hà",
    "image": "./wp-content/uploads/2022/12/z3976469348467_835535f43316efc77fae36f234bbfe16.jpg",
    "price": "36.000 ₫",
    "description": "<strong>Thông tin sản phẩm:</strong><br>Tên sản phẩm: Kem Đánh Răng Bạc Hà The Mát 180g – Dạ Lan<br>Thương hiệu: Dạ Lan<br>Thành phần: Hydrated Silica, Water, Sorbitol, Sodium Lauryl sulfate, flavour,…<br>Khối lượng tịnh: 180g<br>Bảo quản: Bảo quản nơi thoáng mát, tránh ánh nắng trực tiếp<br>Hạn sử dụng: 36 tháng kể từ ngày sản xuất<br>Xuất xứ: Việt Nam",
    "category": "Sản phẩm Dạ Lan"
  },
  {
    "id": "kem-danh-rang-da-lan-family-200gr-kem-ban-chai",
    "title": "KEM ĐÁNH RĂNG FAMILY 200G – DẠ LAN",
    "image": "./wp-content/uploads/2022/12/z3976445633939_1fc3aa4184c604b89c372c02a0afa800.jpg",
    "price": "30.000 ₫",
    "description": "Kem đánh răng Dạ Lan Family 200g được sản xuất theo công thức Fluor, 2 lần canxi (nano canxi + canxi) hỗ trợ 6 tác động giúp sạch khuẩn, chắc răng, tăng cường bảo vệ men răng, chống viêm nướu, ngừa sâu răng, bảo vệ răng cho cả gia đình.",
    "category": "Sản phẩm Dạ Lan"
  },
  {
    "id": "kem-danh-rang-da-lan-tra-xanh-200gr",
    "title": "Kem Đánh Răng Dạ Lan Trà Xanh",
    "image": "./wp-content/uploads/2022/12/z3976448819419_fad9b85b00df60179f7bbeb1e98da639.jpg",
    "price": "35.000 ₫",
    "description": "Mô tả sản phẩm Kem Đánh Răng Dạ Lan Trà Xanh",
    "category": "Sản phẩm Dạ Lan"
  },
  {
    "id": "kem-danh-rang-kf-40gr-tre-em",
    "title": "Kem Đánh Răng KF Trẻ Em",
    "image": "./wp-content/uploads/2022/12/z3976675768784_c0c9d914e73db89be03665c50e2213f8.jpg",
    "price": "35.000 ₫",
    "description": "Mô tả sản phẩm Kem Đánh Răng KF Trẻ Em",
    "category": "Sản phẩm Dạ Lan"
  },
  {
    "id": "kem-danh-rang-men-xanh-bien-110gr",
    "title": "Kem Đánh Răng Men Xanh Biển",
    "image": "./wp-content/uploads/2022/12/z3976483847499_fc01f44aed7e93a5c89c790eacb6bfe1.jpg",
    "price": "35.000 ₫",
    "description": "Mô tả sản phẩm Kem Đánh Răng Men Xanh Biển",
    "category": "Sản phẩm Dạ Lan"
  },
  {
    "id": "kem-danh-rang-men-xanh-la-cay-110gr",
    "title": "Kem Đánh Răng Men Xanh Lá",
    "image": "./wp-content/uploads/2022/12/z3976483419556_afb61087d57aa745cab44fe116125692.jpg",
    "price": "35.000 ₫",
    "description": "Mô tả sản phẩm Kem Đánh Răng Men Xanh Lá",
    "category": "Sản phẩm Dạ Lan"
  },
  {
    "id": "kolax-baby",
    "title": "KoLax Perfome Baby",
    "image": "./wp-content/uploads/2022/12/1.jpg",
    "price": "35.000 ₫",
    "description": "Mô tả sản phẩm KoLax Perfome Baby",
    "category": "Sản phẩm Dạ Lan"
  },
  {
    "id": "kolax-duo-matic",
    "title": "KoLax Perfome Matic",
    "image": "./wp-content/uploads/2022/12/2-1.jpg",
    "price": "35.000 ₫",
    "description": "Mô tả sản phẩm KoLax Perfome Matic",
    "category": "Sản phẩm Dạ Lan"
  },
  {
    "id": "kolax-paris-perfume",
    "title": "KoLax Perfume",
    "image": "./wp-content/uploads/2022/12/3.jpg",
    "price": "35.000 ₫",
    "description": "Mô tả sản phẩm KoLax Perfume",
    "category": "Sản phẩm Dạ Lan"
  },
  {
    "id": "nuoc-giat-baby",
    "title": "Nước Giặt Baby",
    "image": "./wp-content/uploads/2022/12/z3976160270337_edb27551e85fc87305fddca01dd912cd-e1671594945848.jpg",
    "price": "35.000 ₫",
    "description": "Mô tả sản phẩm Nước Giặt Baby",
    "category": "Sản phẩm Dạ Lan"
  },
  {
    "id": "nuoc-lau-nha-ino-huong-lily",
    "title": "Nước Lau Sàn INO – Hương LILY",
    "image": "./wp-content/uploads/2022/12/1.png",
    "price": "35.000 ₫",
    "description": "Mô tả sản phẩm Nước Lau Sàn INO – Hương LILY",
    "category": "Sản phẩm Dạ Lan"
  },
  {
    "id": "nuoc-lau-san-huong-lavender",
    "title": "Nước Lau Sàn – Hương Lavender",
    "image": "./wp-content/uploads/2022/12/3.png",
    "price": "35.000 ₫",
    "description": "Mô tả sản phẩm Nước Lau Sàn – Hương Lavender",
    "category": "Sản phẩm Dạ Lan"
  },
  {
    "id": "nuoc-rua-chen-3-6kg",
    "title": "Nước Rửa Chén",
    "image": "./wp-content/uploads/2022/12/z3976162815271_f89fd4381e28093d95d10817bc0b3afc.jpg",
    "price": "35.000 ₫",
    "description": "Mô tả sản phẩm Nước Rửa Chén",
    "category": "Sản phẩm Dạ Lan"
  },
  {
    "id": "nuoc-xa-vai",
    "title": "Nước Xã Vải Bup",
    "image": "./wp-content/uploads/2022/12/z3976172589725_f0dc261522f841d3a035ff2fb409f747.jpg",
    "price": "35.000 ₫",
    "description": "Mô tả sản phẩm Nước Xã Vải Bup",
    "category": "Sản phẩm Dạ Lan"
  },
  {
    "id": "sua-tam-goi-deko-1-2l",
    "title": "Sữa Tắm Gội Deko",
    "image": "./wp-content/uploads/2022/12/z3976182461513_5cc0a24138265c4bc3910e53ca88f68a.jpg",
    "price": "35.000 ₫",
    "description": "Mô tả sản phẩm Sữa Tắm Gội Deko",
    "category": "Sản phẩm Dạ Lan"
  }
];
