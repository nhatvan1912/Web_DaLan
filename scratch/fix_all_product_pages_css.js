const fs = require('fs');
const path = require('path');

const rootDir = __dirname; // Since the script will run in scratch folder or root
const targetStyle = `
<style id="custom-product-image-fix">
.products.row .product-small .box-image {
    height: 220px;
    overflow: hidden;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
}
.products.row .product-small .box-image img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
}
.products.row .product-small.col {
    display: flex;
    flex-direction: column;
}
.products.row .product-small.col .col-inner {
    display: flex;
    flex-direction: column;
    flex: 1;
}
.products.row .product-small .product-small.box {
    display: flex;
    flex-direction: column;
    flex: 1;
}
.products.row .product-small .box-text.box-text-products {
    display: flex;
    flex-direction: column;
    flex: 1;
}
.products.row .product-small .title-wrapper {
    flex: 1;
}
</style>
`;

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    if (f === 'node_modules' || f === '.git') return;
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

let modifiedCount = 0;

walkDir(path.join(rootDir, '..'), function(filePath) {
  if (filePath.endsWith('.html')) {
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Check if the file is a product listing page (contains class "products row")
    if (content.includes('class="products row') || content.includes('class="products.row') || content.includes('products row row-small')) {
      // Check if it already has the fix
      if (!content.includes('id="custom-product-image-fix"')) {
        // Insert style tag before </head>
        let updatedContent = content.replace('</head>', `${targetStyle}</head>`);
        if (updatedContent !== content) {
          fs.writeFileSync(filePath, updatedContent, 'utf-8');
          console.log(`Injected style to: ${path.relative(path.join(rootDir, '..'), filePath)}`);
          modifiedCount++;
        }
      }
    }
  }
});

console.log(`Successfully updated ${modifiedCount} files.`);
