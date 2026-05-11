const fs = require('fs');
const path = require('path');

const sanPhamDir = 'C:/Users/ADMIN/Documents/GitHub/Web_DaLan/iccdalan_clone/iccdalan.vn/san-pham';
const folders = fs.readdirSync(sanPhamDir).filter(f => fs.statSync(path.join(sanPhamDir, f)).isDirectory());

const products = [];

folders.forEach(folder => {
  const indexPath = path.join(sanPhamDir, folder, 'index.html');
  if (fs.existsSync(indexPath)) {
    const content = fs.readFileSync(indexPath, 'utf-8');
    
    // Extract title
    const titleMatch = content.match(/<h1[^>]*product_title[^>]*>\s*([\s\S]*?)\s*<\/h1>/i);
    const title = titleMatch ? titleMatch[1].trim() : folder;
    
    // Extract main image
    let image = '';
    const imgMatch = content.match(/<div class="[^"]*product-images[^"]*".*?<img[^>]*src="([^"]+)"/is);
    if (imgMatch) {
      image = imgMatch[1];
    } else {
        // Fallback: any img with wp-post-image
        const imgFallback = content.match(/<img[^>]*wp-post-image[^>]*src="([^"]+)"/is);
        if (imgFallback) image = imgFallback[1];
    }
    
    if (image.startsWith('../../')) {
        image = image.replace('../../', '/');
    }

    products.push({
      id: folder,
      title: title,
      image: image,
      price: '35.000 ₫', // default placeholder
      description: 'Mô tả sản phẩm ' + title,
      category: 'Sản phẩm Dạ Lan'
    });
  }
});

fs.writeFileSync('C:/Users/ADMIN/Documents/GitHub/Web_DaLan/iccdalan_clone/iccdalan.vn/js/products_data.js', 'const productsData = ' + JSON.stringify(products, null, 2) + ';\n');
console.log('Created products_data.js with ' + products.length + ' products.');
