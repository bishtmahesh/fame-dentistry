const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && !f.includes('backup'));

let count = 0;
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Remove the desktop phone number link entirely
  content = content.replace(
    /<a href=\"tel:01414877770\" class=\"font-inter font-medium leading-normal relative shrink-0 text-\[16px\] text-\[var\(--color--ink-navy,#1a2233\)\] tracking-\[1\.2px\] whitespace-nowrap no-underline cursor-pointer hover:text-\[var\(--color--gold,#c9a96e\)\] transition-colors duration-300 uppercase mr-4\">0141 487 7770<\/a>\n\s*/g,
    ''
  );

  if (content !== original) {
    fs.writeFileSync(file, content);
    count++;
  }
}
console.log('Removed desktop phone number from ' + count + ' files.');
