const fs = require('fs');

const filesToRemoveIcons = ['index.html', 'index_modern.html', 'index_v3.html'];

for (const file of filesToRemoveIcons) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // Remove SVGs from signal__stat blocks
  const svgRegex = /<svg class="mb-3 mx-auto w-8 h-8 text-\[#C9A96E\]"[\s\S]*?<\/svg>\s*/g;
  if (svgRegex.test(content)) {
    content = content.replace(svgRegex, '');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content);
    console.log(`Removed icons from ${file}`);
  }
}

// Clean up the CSS grid for signal__inner so it's perfectly rigid and doesn't bounce during animations
let css = fs.readFileSync('assets/fame-design-system.css', 'utf8');
css = css.replace(/grid-template-columns:2\.5fr 1px minmax\(140px, 1fr\) 1px minmax\(140px, 1fr\) 1px minmax\(140px, 1fr\); gap:24px;/g, 'grid-template-columns:2.5fr 1px 160px 1px 160px 1px 160px;');
css = css.replace(/\.signal__stat\{text-align:center;padding:0 36px;\}/g, '.signal__stat{text-align:center;padding:0;width:160px;}');
fs.writeFileSync('assets/fame-design-system.css', css);
console.log('Fixed CSS for rigid grid columns');
