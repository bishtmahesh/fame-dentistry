const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && !f.includes('backup'));

let count = 0;
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  content = content.split('class="invisible opacity-0 translate-y-[-10px] transition-all duration-300 ease-out lg:hidden w-full absolute top-full left-0 bg-[var(--color--off-white,#f8f6f2)]').join('class="lg:hidden w-full absolute top-full left-0 bg-[var(--color--off-white,#f8f6f2)]');

  if (content !== original) {
    fs.writeFileSync(file, content);
    count++;
  }
}
console.log('Cleaned up dropdown classes in ' + count + ' files.');
