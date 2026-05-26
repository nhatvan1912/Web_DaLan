const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

// Pattern to match <div id="text-1418095214" class="text">...</div>
const pattern1 = /<div id="text-1418095214" class="text">[\s\S]*?<\/div>/;
// Pattern to match <div id="text-3305770592" class="text">...</div>
const pattern2 = /<div id="text-3305770592" class="text">[\s\S]*?<\/div>/;

if (pattern1.test(html)) {
    html = html.replace(pattern1, '');
    console.log('Removed text-1418095214');
} else {
    console.log('pattern1 not found');
}

if (pattern2.test(html)) {
    html = html.replace(pattern2, '');
    console.log('Removed text-3305770592');
} else {
    console.log('pattern2 not found');
}

fs.writeFileSync(filePath, html, 'utf8');
console.log('Saved index.html');
