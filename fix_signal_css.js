const fs = require('fs');
let css = fs.readFileSync('assets/fame-design-system.css', 'utf8');

css = css.replace(
  /\.signal__num\{font-family:var\(--serif\);font-weight:300;font-size:52px;line-height:1;letter-spacing:-\.044em;color:var\(--paper\);\}/g,
  '.signal__num{font-family:var(--serif);font-weight:300;font-size:42px;line-height:1;letter-spacing:-.044em;color:var(--paper);font-variant-numeric:tabular-nums;backface-visibility:hidden;transform:translateZ(0);}'
);

fs.writeFileSync('assets/fame-design-system.css', css);
console.log('Fixed CSS for signal numbers.');
