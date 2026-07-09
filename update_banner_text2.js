const fs = require('fs');

const oldText = "A standard of clinical excellence trusted by both our patients and our professional peers. Dedicated exclusively to complex implant, cosmetic, and restorative dentistry.";
const newText = "Setting the standard for complex dental care in Scotland. We combine decades of specialist expertise with a philosophy that places your long-term results above all else.";

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && !f.includes('backup'));

let count = 0;
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes(oldText)) {
    content = content.replace(new RegExp(oldText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newText);
    fs.writeFileSync(file, content);
    console.log(`Updated text in ${file}`);
    count++;
  }
}
console.log(`Updated ${count} files.`);
