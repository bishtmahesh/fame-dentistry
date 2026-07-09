const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && !f.includes('backup'));

let count = 0;
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  const patterns = [
    { search: /uppercase">Register Your Interest/g, replace: '">Register Your Interest' },
    { search: /uppercase">Register Your Interest/g, replace: '">Register Your Interest' },
    { search: /tracking-\[\.32em\] uppercase">Register Your Interest/g, replace: 'tracking-[.32em]">Register Your Interest' },
    { search: /tracking-\[\.32em\] uppercase/g, replace: 'tracking-[.32em]' },
    { search: /uppercase">Register Your Interest/gi, replace: '">Register Your Interest' },
    { search: /class="([^"]*)uppercase([^"]*)">Register Your Interest/g, replace: 'class="$1$2">Register Your Interest' }
  ];

  for (const { search, replace } of patterns) {
    if (search.test(content)) {
      content = content.replace(search, replace);
      changed = true;
    }
  }

  // Also remove it from 'Begin an enquiry' or similar if they requested that, but they just requested "Register Your Interest."
  // The global regex `class="([^"]*)uppercase([^"]*)">Register Your Interest` covers it well.

  if (changed) {
    fs.writeFileSync(file, content);
    count++;
    console.log(`Updated ${file}`);
  }
}
console.log(`Updated uppercase classes in ${count} files.`);
