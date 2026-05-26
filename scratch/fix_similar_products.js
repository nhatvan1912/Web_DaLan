const fs = require('fs');
const path = require('path');

const rootDir = 'c:/Users/Admin/Documents/GitHub/Web_DaLan';

// Mappings of old image paths to new lowercase ones
const imageMap = [
  {
    regex: /wp-content\/uploads\/2022\/Dạ\s+Lan\/DẠ\s+LAN\s+BẠC\s+HÀ\.png/gi,
    replacement: 'wp-content/uploads/2022/DA_LAN/dalanbacha.png'
  },
  {
    regex: /wp-content\/uploads\/2022\/Dạ\s+Lan\/DẠ\s+LAN\s+NGỪA\s+SÂU\s+RĂNG\.png/gi,
    replacement: 'wp-content/uploads/2022/DA_LAN/dalannguasaurang.png'
  },
  {
    regex: /wp-content\/uploads\/2022\/Dạ\s+Lan\/DẠ\s+LAN\s+THẢO\s+DƯỢC\.jpg/gi,
    replacement: 'wp-content/uploads/2022/DA_LAN/dalanthaoduoc.jpg'
  },
  {
    regex: /wp-content\/uploads\/2022\/Dạ\s+Lan\/DẠ\s+LAN\s+FAMILY\(3\)\.png/gi,
    replacement: 'wp-content/uploads/2022/DA_LAN/dalanfamily.png'
  },
  {
    regex: /wp-content\/uploads\/2022\/Dạ\s+Lan\/DẠ\s+LAN\s+TRÀ\s+XANH\.png/gi,
    replacement: 'wp-content/uploads/2022/DA_LAN/dalantraxanh.png'
  },
  {
    regex: /wp-content\/uploads\/2022\/Dạ\s+Lan\/DẠ\s+LAN\s+TRẺ\s+EM\s+KF\.png/gi,
    replacement: 'wp-content/uploads/2022/DA_LAN/dalankids.png'
  },
  // URL Encoded versions
  {
    regex: /wp-content\/uploads\/2022\/D%E1%BA%A1%20Lan\/D%E1%BA%A0%20LAN%20B%E1%BA%A0C%20H%C3%80\.png/gi,
    replacement: 'wp-content/uploads/2022/DA_LAN/dalanbacha.png'
  },
  {
    regex: /wp-content\/uploads\/2022\/D%E1%BA%A1%20Lan\/D%E1%BA%A0%20LAN%20NG%E1%BB%ACA%20S%C3%82U%20R%C4%82NG\.png/gi,
    replacement: 'wp-content/uploads/2022/DA_LAN/dalannguasaurang.png'
  },
  {
    regex: /wp-content\/uploads\/2022\/D%E1%BA%A1%20Lan\/D%E1%BA%A0%20LAN%20TH%E1%BA%A2O%20D%C6%AF%E1%BB%A2C\.jpg/gi,
    replacement: 'wp-content/uploads/2022/DA_LAN/dalanthaoduoc.jpg'
  },
  {
    regex: /wp-content\/uploads\/2022\/D%E1%BA%A1%20Lan\/D%E1%BA%A0%20LAN%20FAMILY\(3\)\.png/gi,
    replacement: 'wp-content/uploads/2022/DA_LAN/dalanfamily.png'
  },
  {
    regex: /wp-content\/uploads\/2022\/D%E1%BA%A1%20Lan\/D%E1%BA%A0%20LAN%20TR%C3%80%20XANH\.png/gi,
    replacement: 'wp-content/uploads/2022/DA_LAN/dalantraxanh.png'
  },
  {
    regex: /wp-content\/uploads\/2022\/D%E1%BA%A1%20Lan\/D%E1%BA%A0%20LAN%20TR%E1%BA%BBA%20EM%20KF\.png/gi,
    replacement: 'wp-content/uploads/2022/DA_LAN/dalankids.png'
  }
];

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    if (f === 'node_modules' || f === '.git') return;
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

function findMatchingCloseDiv(html, startIndex) {
  let openTags = 0;
  let pos = startIndex;
  
  while (pos < html.length) {
    let nextOpen = html.indexOf('<div', pos);
    let nextClose = html.indexOf('</div>', pos);
    
    if (nextClose === -1) {
      return -1;
    }
    
    if (nextOpen !== -1 && nextOpen < nextClose) {
      openTags++;
      pos = nextOpen + 4;
    } else {
      openTags--;
      if (openTags === 0) {
        return nextClose + 6;
      }
      pos = nextClose + 6;
    }
  }
  return -1;
}

function commentOutProductByClass(html, className) {
  let pos = 0;
  while (true) {
    let classRegex = new RegExp(`<div\\s+[^>]*class="[^"]*\\b${className}\\b[^"]*"[^>]*>`, 'gi');
    classRegex.lastIndex = pos;
    let match = classRegex.exec(html);
    if (!match) break;
    
    let startIdx = match.index;
    let endIdx = findMatchingCloseDiv(html, startIdx);
    
    if (endIdx === -1) {
      pos = startIdx + match[0].length;
      continue;
    }
    
    // Check if already commented out
    let beforeText = html.substring(0, startIdx);
    let lastOpenComment = beforeText.lastIndexOf('<!--');
    let lastCloseComment = beforeText.lastIndexOf('-->');
    
    let isCommented = false;
    if (lastOpenComment !== -1) {
      if (lastCloseComment === -1 || lastCloseComment < lastOpenComment) {
        isCommented = true;
      }
    }
    
    if (!isCommented) {
      let block = html.substring(startIdx, endIdx);
      let commentedBlock = `<!-- \n${block}\n -->`;
      html = html.substring(0, startIdx) + commentedBlock + html.substring(endIdx);
      pos = startIdx + commentedBlock.length;
    } else {
      pos = endIdx;
    }
  }
  return html;
}

console.log('Starting search and replace with robust div matching...');

let filesProcessed = 0;
let filesModified = 0;

walkDir(rootDir, (filePath) => {
  if (!filePath.endsWith('.html') && !filePath.endsWith('.js') && !filePath.endsWith('.css')) return;
  if (filePath.includes('scratch')) return;

  filesProcessed++;
  let content = fs.readFileSync(filePath, 'utf-8');
  let originalContent = content;

  // 1. Comment out For Men products
  content = commentOutProductByClass(content, 'post-456');
  content = commentOutProductByClass(content, 'post-455');

  // 2. Replace broken image paths
  imageMap.forEach(({ regex, replacement }) => {
    content = content.replace(regex, replacement);
  });

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Modified: ${path.relative(rootDir, filePath)}`);
    filesModified++;
  }
});

console.log(`Finished. Processed ${filesProcessed} files, modified ${filesModified} files.`);
