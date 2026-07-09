const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && !f.includes('backup'));

let count = 0;
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  const patterns = [
    { search: /Ready to begin\?/g, replace: 'Ready To Begin?' },
    { search: /Start with a consultation\./g, replace: 'Start With A Consultation.' },
    { search: /We'll take it from here\./g, replace: "We'll Take It From Here." }
  ];

  for (const { search, replace } of patterns) {
    if (search.test(content)) {
      content = content.replace(search, replace);
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(file, content);
    count++;
    console.log(`Updated ${file}`);
  }
}
console.log(`Updated CTA blocks in ${count} files.`);
