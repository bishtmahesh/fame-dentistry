const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && !f.includes('backup'));

let count = 0;
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // Replace variations
  const patterns = [
    { search: /Scotland Street, opening summer 2026/gi, replace: 'Scotland Street, now accepting new patients' },
    { search: /— opening Summer 2026/gi, replace: '— now accepting new patients' },
    { search: /— opening summer 2026/gi, replace: '— now accepting new patients' },
    { search: /Opening Summer 2026/g, replace: 'Accepting New Patients' },
    { search: /OPENING SUMMER 2026/g, replace: 'ACCEPTING NEW PATIENTS' },
    { search: /opening summer 2026/g, replace: 'accepting new patients' }
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
console.log(`Replaced 'Opening Summer 2026' in ${count} files.`);
