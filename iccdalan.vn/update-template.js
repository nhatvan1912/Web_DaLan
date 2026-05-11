const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'product.html');
let html = fs.readFileSync(file, 'utf-8');

// Thêm scripts vào cuối thẻ body
if (!html.includes('js/product-render.js')) {
  html = html.replace('</body>', `
  <script src="data/products.js"></script>
  <script src="js/product-render.js"></script>
  <script src="js/cart.js"></script>
  </body>`);
}

// Xóa title cũ và thay bằng thẻ chờ tải
html = html.replace(/<h1 class="product-title.*?>.*?<\/h1>/g, '<h1 class="product-title product_title entry-title">Đang tải...</h1>');

// Thêm giá
html = html.replace(/<div class="price-wrapper">.*?<\/div>/, '<div class="price-wrapper"><p class="price" id="dynamic-price" style="font-size: 24px; color: #ff0000; font-weight: bold;"></p></div>');

// Thêm nút giỏ hàng và mô tả
const addToCartHTML = `
<div class="product-short-description" id="dynamic-desc" style="margin-bottom: 20px;"></div>
<button class="add-to-cart-btn button primary mt-half" style="background-color: #084da1; color: white; padding: 10px 20px; font-size: 16px; font-weight: bold; border-radius: 5px; border: none; cursor: pointer;">THÊM VÀO GIỎ HÀNG</button>
`;
html = html.replace(/<form class="cart".*?>[\s\S]*?<\/form>/, addToCartHTML); // Tìm form cart (nếu có) để thay thế
// Nếu không tìm thấy form cart, thì chèn sau title
if(!html.includes('THÊM VÀO GIỎ HÀNG')) {
   html = html.replace('</h1>', '</h1>' + addToCartHTML);
}

fs.writeFileSync(file, html);
console.log('Đã cập nhật product.html');
