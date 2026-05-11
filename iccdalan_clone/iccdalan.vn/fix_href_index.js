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
    let originalContent = content;

    // Find href="..." where the URL ends with / or is just ./ or ../
    // but not starting with http://, https://, tel:, mailto:
    content = content.replace(/href="([^"]+)"/g, (match, url) => {
        if (url.startsWith('http') || url.startsWith('tel:') || url.startsWith('mailto:') || url.startsWith('#')) {
            return match;
        }
        
        // If it's a URL with parameters or hash, we need to extract the path part
        try {
            // Using a dummy base to parse relative URLs
            const parsedUrl = new URL(url, 'http://dummy.com');
            let pathname = parsedUrl.pathname;
            
            // If the pathname ends with a slash (meaning it points to a directory)
            if (pathname.endsWith('/')) {
                // We append index.html
                // But we must preserve the original prefix (like ./ or ../) which URL parser might swallow
                // So let's just do a string replacement on the original URL if it matches the pattern.
            }
        } catch(e) {}
        
        // Simpler string-based approach:
        // Does the base path (before ? or #) end with / ?
        let basePath = url.split('?')[0].split('#')[0];
        if (basePath.endsWith('/') || basePath === '.' || basePath === '..') {
            if (basePath === '.' || basePath === './') basePath = './';
            else if (basePath === '..' || basePath === '../') basePath = '../';
            
            // Reconstruct url
            let newUrl = url.replace(basePath, basePath.endsWith('/') ? basePath + 'index.html' : basePath + '/index.html');
            return `href="${newUrl}"`;
        }
        
        return match;
    });

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf-8');
      modifiedCount++;
    }
  }
});

console.log(`Appended index.html to directory links in ${modifiedCount} files.`);
