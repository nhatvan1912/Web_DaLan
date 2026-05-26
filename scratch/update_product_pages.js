const fs = require('fs');
const path = require('path');

const rootDir = 'c:/Users/Admin/Documents/GitHub/Web_DaLan';

const titleMapping = {
  'kem-danh-rang-110gr-bac-ha': {
    old: 'Kem Đánh Răng Bạc Hà',
    new: 'KEM ĐÁNH RĂNG BẠC HÀ 180G - DẠ LAN'
  },
  'kem-danh-rang-da-lan-family-200gr-kem-ban-chai': {
    old: 'Kem Đánh Răng Dạ Lan Family (Tặng kèm bàn chải)',
    new: 'KEM ĐÁNH RĂNG FAMILY 200G – DẠ LAN'
  },
  'kdr-da-lan-ngua-sau-rang-200gr': {
    old: 'Kem Đánh Răng Dạ Lan Ngừa sâu răng',
    new: 'KEM ĐÁNH RĂNG NGỪA SÂU RĂNG 240G'
  },
  'kdr-da-lan-thao-duoc-180g-kem-ban-chai': {
    old: 'Kem Đánh Răng Dạ Lan Thảo Dược Quế',
    new: 'KEM ĐÁNH RĂNG THẢO DƯỢC QUẾ 180G - DẠ LAN'
  },
  'kem-danh-rang-da-lan-tra-xanh-200gr': {
    old: 'Kem Đánh Răng Dạ Lan Trà Xanh',
    new: 'KEM ĐÁNH RĂNG TRÀ XANH 200G – DẠ LAN'
  },
  'kem-danh-rang-kf-40gr-tre-em': {
    old: 'Kem Đánh Răng KF Trẻ Em',
    new: 'KEM ĐÁNH RĂNG TRẺ EM KF 40G – DẠ LAN'
  }
};

// 1. Update data/products.js
const productsJsPath = path.join(rootDir, 'data/products.js');
if (fs.existsSync(productsJsPath)) {
  let content = fs.readFileSync(productsJsPath, 'utf-8');
  let originalContent = content;
  
  // Replace: name: "Kem Đánh Răng Bạc Hà" -> name: "KEM ĐÁNH RĂNG BẠC HÀ 180G - DẠ LAN"
  content = content.replace('name: "Kem Đánh Răng Bạc Hà"', 'name: "KEM ĐÁNH RĂNG BẠC HÀ 180G - DẠ LAN"');
  
  if (content !== originalContent) {
    fs.writeFileSync(productsJsPath, content, 'utf-8');
    console.log('Updated data/products.js');
  }
}

// 2. Update static HTML detail pages
Object.entries(titleMapping).forEach(([folder, mapping]) => {
  const filePath = path.join(rootDir, 'san-pham', folder, 'index.html');
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf-8');
    let originalContent = content;
    
    // Replace <title>Old Title – ...</title>
    const titleRegex = new RegExp(`<title>${escapeRegex(mapping.old)}\\s*–`, 'i');
    content = content.replace(titleRegex, `<title>${mapping.new} –`);
    
    // Replace <h1>Old Title</h1>
    const h1Regex = new RegExp(`(<h1[^>]*>)\\s*${escapeRegex(mapping.old)}\\s*(</h1>)`, 'i');
    content = content.replace(h1Regex, `$1${mapping.new}$2`);
    
    // Replace nhận xét “Old Title”
    const commentRegex = new RegExp(`nhận xét “${escapeRegex(mapping.old)}”`, 'gi');
    content = content.replace(commentRegex, `nhận xét “${mapping.new}”`);
    
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log(`Updated detail page: san-pham/${folder}/index.html`);
    } else {
      console.log(`No changes needed for: san-pham/${folder}/index.html`);
    }
  } else {
    console.log(`File not found: san-pham/${folder}/index.html`);
  }
});

function escapeRegex(string) {
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

console.log('Product pages title update finished.');
