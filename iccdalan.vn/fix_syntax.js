const fs = require('fs');
const p = 'C:/Users/ADMIN/Documents/GitHub/Web_DaLan/iccdalan_clone/iccdalan.vn/js/cart.js';
let c = fs.readFileSync(p, 'utf-8');
c = c.replace(/\\`/g, '`');
c = c.replace(/\\\$/g, '$');
fs.writeFileSync(p, c);
console.log('Fixed syntax error in cart.js');
