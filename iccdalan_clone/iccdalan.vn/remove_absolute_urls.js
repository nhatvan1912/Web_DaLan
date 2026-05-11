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
  if (filePath.endsWith('.html') || filePath.endsWith('.js') || filePath.endsWith('.css')) {
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Calculate relative path from this file's directory to the root directory
    const fileDir = path.dirname(filePath);
    let relativeToRoot = path.relative(fileDir, rootDir);
    relativeToRoot = relativeToRoot.replace(/\\/g, '/');
    
    if (relativeToRoot === '') {
        relativeToRoot = '.';
    }

    // Replace href="./..." with href="relativeToRoot/..."
    // Replace src="./..." with src="relativeToRoot/..."
    // Replace srcset="./..." with srcset="relativeToRoot/..."
    // Also handle general ./ occurences not bounded by quotes, carefully.
    
    // Using a regex to match ./
    // We only want to replace instances that are part of URLs.
    const regex = /https:\/\/iccdalan\.vn\//g;
    
    let newContent = content.replace(regex, `${relativeToRoot}/`);
    
    // Also replace ./ without trailing slash
    const regex2 = /https:\/\/iccdalan\.vn(?=["']|\s|$)/g;
    newContent = newContent.replace(regex2, `${relativeToRoot}/`);

    if (newContent !== content) {
      fs.writeFileSync(filePath, newContent, 'utf-8');
      modifiedCount++;
    }
  }
});

console.log(`Replaced ./ with relative paths in ${modifiedCount} files.`);
