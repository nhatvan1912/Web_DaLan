const fs = require('fs');
const path = require('path');

const rootDir = 'c:/Users/Admin/Documents/GitHub/Web_DaLan';

// 1. List of shop grid pages to update
const shopPages = [
  'shop/index.html',
  'shop/page/2/index.html',
  'shop/page/3/index.html',
  'danh-muc-san-pham/san-pham-da-lan/index.html',
  'danh-muc-san-pham/san-pham-bay/index.html',
  'danh-muc-san-pham/san-pham-boc/index.html',
  'danh-muc-san-pham/san-pham-bup/index.html',
  'danh-muc-san-pham/san-pham-deko/index.html',
  'danh-muc-san-pham/san-pham-ino/index.html',
  'danh-muc-san-pham/san-pham-kolax/index.html',
  'danh-muc-san-pham/san-pham-veo/index.html'
];

// 2. List of static product detail pages to update
const detailPages = [
  'san-pham/kem-danh-rang-110gr-bac-ha/index.html',
  'san-pham/kem-danh-rang-da-lan-family-200gr-kem-ban-chai/index.html',
  'san-pham/kdr-da-lan-ngua-sau-rang-200gr/index.html',
  'san-pham/kdr-da-lan-thao-duoc-180g-kem-ban-chai/index.html',
  'san-pham/kem-danh-rang-da-lan-tra-xanh-200gr/index.html',
  'san-pham/kem-danh-rang-kf-40gr-tre-em/index.html'
];

console.log('--- STARTING SHOP GRIDS UPDATE ---');

shopPages.forEach(relPath => {
  const filePath = path.join(rootDir, relPath);
  if (!fs.existsSync(filePath)) {
    console.log(`[WARNING] File not found: ${relPath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf-8');
  let originalLength = content.length;

  // Clean up any old format Mua Ngay buttons (with class mua-ngay-btn)
  content = content.replace(/<a href="javascript:void\(0\)"[^>]*class="[^"]*mua-ngay-btn[^"]*"[^>]*>[\s\S]*?<\/a>/g, '');

  // Regex to match a single product card
  // This matches from <div class="product-small col has-hover ..."> up to the 4 closing divs of the card block
  const cardRegex = /(<div\s+class="product-small col has-hover[^>]*>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>)/g;

  let matchCount = 0;
  let updatedContent = content.replace(cardRegex, (cardBlock) => {
    matchCount++;
    
    // Check if "Mua ngay" button is already present in this card block
    if (cardBlock.includes('buy-now-wrapper') || cardBlock.includes('checkout=true')) {
      return cardBlock; // Already updated
    }

    // Extract the product href URL
    // Search for <a href="...product.html?id=xxx"
    const hrefMatch = cardBlock.match(/href="([^"]*product\.html\?id=[^"]+)"/);
    if (!hrefMatch) {
      // In some pages (e.g. English version or some links), it might be different, let's log if not found
      return cardBlock;
    }

    const productUrl = hrefMatch[1];
    
    // Inject "Mua ngay" wrapper right after <div class="price-wrapper">...</div>
    const buyButtonHtml = `
<div class="buy-now-wrapper" style="margin-top: 8px; margin-bottom: 2px; width: 100%;">
	<a href="${productUrl}&checkout=true" class="button" style="background-color: #d0021b !important; border-color: #d0021b !important; color: white !important; font-weight: bold; border-radius: 5px; display: block; text-align: center; padding: 4px 10px; font-size: 13px; text-transform: uppercase;">Mua ngay</a>
</div>`;

    // Replace the price-wrapper closing tag to append the button
    const priceWrapperRegex = /(<div class="price-wrapper">[\s\S]*?<\/div>)/;
    if (priceWrapperRegex.test(cardBlock)) {
      return cardBlock.replace(priceWrapperRegex, `$1${buyButtonHtml}`);
    }

    return cardBlock;
  });

  if (content !== updatedContent) {
    fs.writeFileSync(filePath, updatedContent, 'utf-8');
    console.log(`[SUCCESS] Updated ${relPath} (Found ${matchCount} cards)`);
  } else {
    console.log(`[NO CHANGE] ${relPath}`);
  }
});


console.log('\n--- STARTING STATIC PRODUCT DETAIL PAGES UPDATE ---');

detailPages.forEach(relPath => {
  const filePath = path.join(rootDir, relPath);
  if (!fs.existsSync(filePath)) {
    console.log(`[WARNING] File not found: ${relPath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf-8');
  let original = content;

  // 1. Add id="product-title" to product title h1
  if (!content.includes('id="product-title"')) {
    content = content.replace(/<h1 class="product-title product_title entry-title">/g, '<h1 id="product-title" class="product-title product_title entry-title">');
  }

  // 2. Add id="product-price" to product-page-price p
  if (!content.includes('id="product-price"')) {
    content = content.replace(/<p class="price product-page-price\s*">/g, '<p class="price product-page-price " id="product-price">');
  }

  // 3. Add id="product-image" to the main wp-post-image
  if (!content.includes('id="product-image"')) {
    content = content.replace(/class="wp-post-image ux-skip-lazy"/g, 'id="product-image" class="wp-post-image ux-skip-lazy"');
  }

  // 4. Inject "Mua ngay" button in the form
  if (!content.includes('id="btn-mua-ngay"')) {
    const searchTarget = /<button type="submit" name="add-to-cart" value="(\d+)" class="single_add_to_cart_button button alt">Thêm vào giỏ hàng<\/button>/;
    const buttonHtml = `<button type="button" id="btn-mua-ngay" class="single_add_to_cart_button button" style="background-color: #d0021b !important; border-color: #d0021b !important; color: white !important;">Mua ngay</button>
	<button type="submit" name="add-to-cart" value="$1" class="single_add_to_cart_button button alt">Thêm vào giỏ hàng</button>`;
    content = content.replace(searchTarget, buttonHtml);
  }

  // 5. Append cart.js script at the end of the body
  if (!content.includes('js/cart.js')) {
    content = content.replace('</body>', '<script src="../../js/cart.js"></script>\n</body>');
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`[SUCCESS] Updated static page: ${relPath}`);
  } else {
    console.log(`[NO CHANGE] Static page: ${relPath}`);
  }
});

console.log('\nAll updates completed successfully.');
