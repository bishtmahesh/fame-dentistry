const fs = require('fs');
let css = fs.readFileSync('assets/fame-design-system.css', 'utf8');

css = css.replace(/\[class\*="cta"\],\s*\[class\*="CTA"\],/g, '');
css = css.replace(/\[class\*="cta"\], \[class\*="CTA"\],/g, '');
css = css.replace(/, \[class\*="cta"\], \[class\*="CTA"\]/g, '');

fs.writeFileSync('assets/fame-design-system.css', css);
console.log('Removed cta uppercase rules.');
