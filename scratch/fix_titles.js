const fs = require('fs');
const path = require('path');

const rootDir = 'c:/Users/Admin/Documents/GitHub/Web_DaLan';

const titleMap = {
  'kdr-da-lan-ngua-sau-rang-200gr': 'KEM ĐÁNH RĂNG NGỪA SÂU RĂNG 240G',
  'kem-danh-rang-da-lan-family-200gr-kem-ban-chai': 'KEM ĐÁNH RĂNG FAMILY 200G – DẠ LAN',
  'kdr-da-lan-thao-duoc-180g-kem-ban-chai': 'KEM ĐÁNH RĂNG THẢO DƯỢC QUẾ 180G - DẠ LAN',
  'kem-danh-rang-kf-40gr-tre-em': 'KEM ĐÁNH RĂNG TRẺ EM KF 40G – DẠ LAN',
  'kem-danh-rang-da-lan-tra-xanh-200gr': 'KEM ĐÁNH RĂNG TRÀ XANH 200G – DẠ LAN',
  'kem-danh-rang-110gr-bac-ha': 'KEM ĐÁNH RĂNG BẠC HÀ 180G - DẠ LAN'
};

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    if (f === 'node_modules' || f === '.git') return;
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

console.log('Starting title updates across all HTML files...');

walkDir(rootDir, (filePath) => {
  if (!filePath.endsWith('.html')) return;
  if (filePath.includes('scratch')) return;

  let content = fs.readFileSync(filePath, 'utf-8');
  let originalContent = content;

  Object.entries(titleMap).forEach(([id, title]) => {
    // Match <a ... href="...id=id..." ...>...</a> or <a ... href=".../id/index.html" ...>...</a>
    const regex = new RegExp(`(<a\\s+[^>]*href="[^"]*(?:id=|/)${id}(?:/index\\.html|&[^"]*)?"[^>]*>)([\\s\\S]*?)(</a>)`, 'gi');
    content = content.replace(regex, (match, openingTag, innerText, closingTag) => {
      // If the link wraps an image or other nested block, don't touch it
      if (innerText.includes('<img') || innerText.includes('<span') || innerText.trim() === '') {
        return match;
      }
      return `${openingTag}${title}${closingTag}`;
    });
  });

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated titles in: ${path.relative(rootDir, filePath)}`);
  }
});

console.log('Finished updating titles.');
