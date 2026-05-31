const fs = require('fs');
const path = require('path');

// Remove next-prev-thumbs UL elements (and their container divs) from all product pages
// These are the pill/oval navigation buttons showing adjacent product names

function removeNextPrevThumbs(html, fileName) {
  let modified = html;
  let removed = 0;

  // Pattern 1: <ul class="next-prev-thumbs is-small show-for-medium">...</ul>
  // This appears directly in the product-info section
  // Pattern 2: <ul class="next-prev-thumbs is-small nav-right text-right">...</ul>
  // This appears inside the product-sidebar section wrapped in a div

  // We'll find each <ul class="next-prev-thumbs ... and remove to matching </ul>
  const patterns = [
    'next-prev-thumbs is-small show-for-medium',
    'next-prev-thumbs is-small nav-right text-right'
  ];

  for (const pattern of patterns) {
    let searchFrom = 0;
    while (true) {
      // Find the <ul with this class
      const ulStartIdx = modified.indexOf(`<ul class="${pattern}`, searchFrom);
      if (ulStartIdx === -1) break;

      // Find the matching </ul>
      let depth = 0;
      let pos = ulStartIdx;
      let ulEnd = -1;

      while (pos < modified.length) {
        const openUl = modified.indexOf('<ul', pos);
        const closeUl = modified.indexOf('</ul>', pos);

        if (openUl === -1 && closeUl === -1) break;

        let nextEvent;
        if (openUl === -1) nextEvent = 'close';
        else if (closeUl === -1) nextEvent = 'open';
        else nextEvent = openUl < closeUl ? 'open' : 'close';

        if (nextEvent === 'open') {
          depth++;
          pos = openUl + 3;
        } else {
          depth--;
          if (depth === 0) {
            ulEnd = closeUl + 5; // include </ul>
            break;
          }
          pos = closeUl + 5;
        }
      }

      if (ulEnd === -1) {
        console.log(`  Could not find end of ul in ${fileName}`);
        searchFrom = ulStartIdx + 1;
        continue;
      }

      const block = modified.substring(ulStartIdx, ulEnd);
      console.log(`  Removing nav pill block (${block.length} chars) at pos ${ulStartIdx} in ${fileName}`);
      modified = modified.substring(0, ulStartIdx) + modified.substring(ulEnd);
      removed++;
      searchFrom = ulStartIdx; // don't advance since text shifted
    }
  }

  return { html: modified, removed };
}

// Process all san-pham directories (Da Lan products only)
const sanPhamDir = path.join(__dirname, '..', 'san-pham');
const daLanDirs = [
  'kdr-da-lan-ngua-sau-rang-200gr',
  'kdr-da-lan-thao-duoc-180g-kem-ban-chai',
  'kem-danh-rang-110gr-bac-ha',
  'kem-danh-rang-da-lan-family-200gr-kem-ban-chai',
  'kem-danh-rang-da-lan-tra-xanh-200gr',
  'kem-danh-rang-kf-40gr-tre-em',
  'kem-danh-rang-men-xanh-bien-110gr',
  'kem-danh-rang-men-xanh-la-cay-110gr',
];

let totalFixed = 0;

// Process san-pham Da Lan pages
for (const dir of daLanDirs) {
  const indexPath = path.join(sanPhamDir, dir, 'index.html');
  if (!fs.existsSync(indexPath)) {
    console.log(`File not found: ${indexPath}`);
    continue;
  }
  let html = fs.readFileSync(indexPath, 'utf8');
  const { html: newHtml, removed } = removeNextPrevThumbs(html, dir);
  if (removed > 0) {
    fs.writeFileSync(indexPath, newHtml, 'utf8');
    console.log(`✓ Fixed ${dir} (removed ${removed} nav pill sections)`);
    totalFixed++;
  } else {
    console.log(`- No nav pills found in ${dir}`);
  }
}

// Also process product.html (dynamic template)
const productHtmlPath = path.join(__dirname, '..', 'product.html');
if (fs.existsSync(productHtmlPath)) {
  let html = fs.readFileSync(productHtmlPath, 'utf8');
  const { html: newHtml, removed } = removeNextPrevThumbs(html, 'product.html');
  if (removed > 0) {
    fs.writeFileSync(productHtmlPath, newHtml, 'utf8');
    console.log(`✓ Fixed product.html (removed ${removed} nav pill sections)`);
    totalFixed++;
  } else {
    console.log(`- No nav pills found in product.html`);
  }
}

console.log(`\nDone. Fixed ${totalFixed} files.`);
