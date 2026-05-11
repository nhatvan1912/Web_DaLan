document.addEventListener("DOMContentLoaded", () => {
  // Lấy ID từ URL: product.html?id=kem-danh-rang-bac-ha
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  if (productId && window.PRODUCTS) {
    const product = window.PRODUCTS.find(p => p.id === productId);
    if (product) {
      // Tìm và thay thế nội dung trên trang
      const titleEl = document.querySelector('.product-title');
      if (titleEl) titleEl.innerText = product.name;

      const imgEl = document.querySelector('.wp-post-image');
      if (imgEl) {
        imgEl.src = product.image;
        imgEl.srcset = ""; // Xóa srcset cũ đi để hiển thị đúng ảnh
      }

      const priceEl = document.querySelector('#dynamic-price');
      if (priceEl) priceEl.innerText = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price);

      const descEl = document.querySelector('#dynamic-desc');
      if (descEl) descEl.innerText = product.description;

      // Cập nhật nút Thêm vào giỏ hàng
      const btnAdd = document.querySelector('.add-to-cart-btn');
      if (btnAdd) {
        btnAdd.setAttribute('data-id', product.id);
        btnAdd.setAttribute('data-name', product.name);
        btnAdd.setAttribute('data-price', product.price);
        btnAdd.setAttribute('data-image', product.image);
      }
    } else {
      document.querySelector('.product-main').innerHTML = "<h1>Không tìm thấy sản phẩm!</h1>";
    }
  }
});
