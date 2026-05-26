const fs = require('fs');
const path = require('path');

const rootDir = 'c:/Users/Admin/Documents/GitHub/Web_DaLan';

const regexVi = /<div\s+class="container\s+section-title-container"\s*>\s*<h3\s+class="section-title\s+section-title-normal"\s*>\s*<b[^>]*>\s*<\/b\s*>\s*<span\s+class="section-title-main"\s*>\s*Liên\s+kết\s*<\/span\s*>\s*<b[^>]*>\s*<\/b\s*>\s*<\/h3\s*>\s*<\/div\s*>/i;
const regexEn = /<div\s+class="container\s+section-title-container"\s*>\s*<h3\s+class="section-title\s+section-title-normal"\s*>\s*<b[^>]*>\s*<\/b\s*>\s*<span\s+class="section-title-main"\s*>\s*LINK\s*<\/span\s*>\s*<b[^>]*>\s*<\/b\s*>\s*<\/h3\s*>\s*<\/div\s*>/i;

const fbLinkVi = '\n<p><strong>Fanpage:</strong> <a href="https://www.facebook.com/profile.php?id=61574338636094" target="_blank" rel="noopener nofollow">Kem đánh răng Dạ Lan</a></p>';
const fbLinkEn = '\n<p><strong>Fanpage:</strong> <a href="https://www.facebook.com/profile.php?id=61574338636094" target="_blank" rel="noopener nofollow">Da Lan Toothpaste</a></p>';

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    if (f === 'node_modules' || f === '.git' || f === 'scratch') return;
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

console.log('Searching and updating Facebook fanpage link under "Liên kết" / "LINK" in footer...');

let filesProcessed = 0;
let filesModified = 0;

walkDir(rootDir, (filePath) => {
  if (!filePath.endsWith('.html')) return;

  filesProcessed++;
  let content = fs.readFileSync(filePath, 'utf-8');
  let originalContent = content;

  // Check if this specific link block is already inserted to keep it idempotent
  if (content.includes('href="https://www.facebook.com/profile.php?id=61574338636094"') && content.includes('<strong>Fanpage:</strong>')) {
    return;
  }

  // Replace Vietnamese footer
  if (regexVi.test(content)) {
    content = content.replace(regexVi, (match) => {
      return match + fbLinkVi;
    });
  }

  // Replace English footer
  if (regexEn.test(content)) {
    content = content.replace(regexEn, (match) => {
      return match + fbLinkEn;
    });
  }

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Modified: ${path.relative(rootDir, filePath)}`);
    filesModified++;
  }
});

console.log(`Finished. Processed ${filesProcessed} files, modified ${filesModified} files.`);
