const fs = require('fs');
const path = require('path');

const rootDir = 'C:/Users/ADMIN/Documents/GitHub/Web_DaLan/iccdalan_clone/iccdalan.vn';

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

let modifiedCount = 0;

walkDir(rootDir, function(filePath) {
  if (filePath.endsWith('.html')) {
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Replace href=".../san-pham/xxx/..." with href="/product.html?id=xxx"
    // Handle both absolute and relative paths
    const regex = /href="[^"]*\/san-pham\/([^/"]+)(?:\/(?:index\.html)?)?"/g;
    
    let newContent = content.replace(regex, (match, p1) => {
      // Exclude if it's the root /san-pham/ or category
      if (p1 === 'page' || p1 === '' || p1.startsWith('page')) {
        return match;
      }
      return `href="/product.html?id=${p1}"`;
    });

    if (newContent !== content) {
      fs.writeFileSync(filePath, newContent, 'utf-8');
      modifiedCount++;
    }
  }
});

console.log(`Updated links in ${modifiedCount} files.`);
