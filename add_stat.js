const fs = require('fs');

const files = ['index.html', 'index_modern.html', 'index_v3.html'];

const statHtml = `
              <div class="sdiv"></div>
              <div class="signal__stat">
                <div class="signal__num counter">20<span style="font-size:28px;vertical-align:middle">yr</span></div>
                <div class="signal__lbl">Implant Experience</div>
              </div>`;

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');

  // Insert the new stat right before the closing div of signal__inner
  // First, find the "200+" stat block which is the last one
  const target = `<div class="signal__num counter">200<span style="font-size:28px;vertical-align:middle">+</span></div>
                <div class="signal__lbl">Referring Dentists</div>
              </div>`;
  
  if (content.includes(target) && !content.includes('>20<span style="font-size:28px;vertical-align:middle">yr</span></div>')) {
    content = content.replace(target, target + statHtml);
    fs.writeFileSync(file, content);
    console.log(`Added 20yr stat to ${file}`);
  }
}

// Now update CSS to support 7 grid columns instead of 5
let css = fs.readFileSync('assets/fame-design-system.css', 'utf8');
css = css.replace(/grid-template-columns:2fr 1px 1fr 1px 1fr;/g, 'grid-template-columns:2.5fr 1px 1.2fr 1px 1fr 1px 1fr; gap:24px;');
fs.writeFileSync('assets/fame-design-system.css', css);
console.log('Updated grid CSS');
