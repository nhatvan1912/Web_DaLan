const fs = require('fs');
const path = require('path');

const rootDir = 'c:/Users/Admin/Documents/GitHub/Web_DaLan';

const replacements = [
  {
    pattern: /wp-content\/uploads\/2022\/12\/z3976469348467_835535f43316efc77fae36f234bbfe16(-[a-zA-Z0-9x]+)?\.jpg/g,
    replacement: 'wp-content/uploads/2022/Dạ Lan/DẠ LAN BẠC HÀ.png'
  },
  {
    pattern: /wp-content\/uploads\/2022\/12\/12(-[a-zA-Z0-9x]+)?\.jpg/g,
    replacement: 'wp-content/uploads/2022/Dạ Lan/DẠ LAN NGỪA SÂU RĂNG.png'
  },
  {
    pattern: /wp-content\/uploads\/2022\/12\/13(-[a-zA-Z0-9x]+)?\.jpg/g,
    replacement: 'wp-content/uploads/2022/Dạ Lan/DẠ LAN THẢO DƯỢC.jpg'
  },
  {
    pattern: /wp-content\/uploads\/2022\/12\/z3976445633939_1fc3aa4184c604b89c372c02a0afa800(-[a-zA-Z0-9x]+)?\.jpg/g,
    replacement: 'wp-content/uploads/2022/Dạ Lan/DẠ LAN FAMILY(3).png'
  },
  {
    pattern: /wp-content\/uploads\/2022\/12\/z3976448819419_fad9b85b00df60179f7bbeb1e98da639(-[a-zA-Z0-9x]+)?\.jpg/g,
    replacement: 'wp-content/uploads/2022/Dạ Lan/DẠ LAN TRÀ XANH.png'
  },
  {
    pattern: /wp-content\/uploads\/2022\/12\/z3976675768784_c0c9d914e73db89be03665c50e2213f8(-[a-zA-Z0-9x]+)?\.jpg/g,
    replacement: 'wp-content/uploads/2022/Dạ Lan/DẠ LAN TRẺ EM KF.png'
  }
];

function walkDir(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git') {
        results = results.concat(walkDir(fullPath));
      }
    } else {
      results.push(fullPath);
    }
  });
  return results;
}

const files = walkDir(rootDir);
files.forEach(file => {
  const ext = path.extname(file);
  if (['.html', '.js', '.css', '.json'].includes(ext)) {
    try {
      let content = fs.readFileSync(file, 'utf8');
      let modified = false;
      replacements.forEach(({ pattern, replacement }) => {
        if (pattern.test(content)) {
          pattern.lastIndex = 0;
          content = content.replace(pattern, replacement);
          modified = true;
        }
      });
      if (modified) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Modified: ${file}`);
      }
    } catch (e) {
      console.error(`Error processing ${file}:`, e);
    }
  }
});
