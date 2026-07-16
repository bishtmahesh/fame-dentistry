const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && !f.includes('backup'));

let count = 0;
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  const patterns = [
    { search: /Register your interest\./g, replace: 'Register Your Interest.' },
    { search: /Register your interest/g, replace: 'Register Your Interest' },
    { search: /We'll be in touch\./g, replace: "We'll Be In Touch." }
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
console.log(`Updated Title Case in ${count} files.`);
