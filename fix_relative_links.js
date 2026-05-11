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
    
    // Calculate relative path from this file's directory to the root directory
    const fileDir = path.dirname(filePath);
    let relativeToRoot = path.relative(fileDir, rootDir);
    // Convert backslashes to forward slashes for URLs
    relativeToRoot = relativeToRoot.replace(/\\/g, '/');
    
    if (relativeToRoot === '') {
        relativeToRoot = '.';
    }

    // Replace href="/product.html?id=xxx" with href="relativeToRoot/product.html?id=xxx"
    const regex = /href="\/product\.html\?id=([^"]+)"/g;
    
    let newContent = content.replace(regex, (match, p1) => {
      return `href="${relativeToRoot}/product.html?id=${p1}"`;
    });

    if (newContent !== content) {
      fs.writeFileSync(filePath, newContent, 'utf-8');
      modifiedCount++;
    }
  }
});

console.log(`Updated to relative links in ${modifiedCount} files.`);
