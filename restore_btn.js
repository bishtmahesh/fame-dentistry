const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && !f.includes('backup'));

let count = 0;
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Restore the missing classes on btn-enquire
  // We're looking for: <a href="contact.html" id="btn-enquire" data-name="button-primary">
  content = content.replace(
    /<a href=\"contact.html\" id=\"btn-enquire\"/g,
    '<a href="contact.html" class="bg-[var(--color--ink-navy,#1a2233)] flex items-center justify-center overflow-clip px-[24px] py-[12px] relative shrink-0 text-decoration-none" id="btn-enquire"'
  );

  if (content !== original) {
    fs.writeFileSync(file, content);
    count++;
  }
}
console.log('Restored classes on ' + count + ' files.');
