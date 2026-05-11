const fs = require('fs');
const filePath = 'C:/Users/ADMIN/Documents/GitHub/Web_DaLan/iccdalan_clone/iccdalan.vn/js/products_data.js';
let content = fs.readFileSync(filePath, 'utf-8');
content = content.replace(/\.\.\/wp-content/g, './wp-content');
fs.writeFileSync(filePath, content, 'utf-8');
console.log('Fixed image paths in products_data.js');
