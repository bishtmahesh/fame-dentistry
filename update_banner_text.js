const fs = require('fs');

const oldText = "The dentists other dentists refer their most complex patients to. Implants, cosmetic and concierge dentistry. By introduction and enquiry.";
const newText = "A standard of clinical excellence trusted by both our patients and our professional peers. Dedicated exclusively to complex implant, cosmetic, and restorative dentistry.";

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
