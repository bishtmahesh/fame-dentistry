const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && !f.includes('backup'));

const mobileSearch = `<a href="tel:01414877770" class="flex items-center justify-center overflow-clip w-[40px] h-[40px] rounded-full relative shrink-0 text-decoration-none border border-[var(--color--ink-navy,#1a2233)] mr-2 hover:bg-[var(--color--ink-navy,#1a2233)] hover:text-[var(--color--off-white,#f8f6f2)] transition-colors duration-300 group" id="btn-enquire-mobile-nav">`;
const mobileReplace = `<a href="tel:01414877770" style="width: 40px !important; height: 40px !important; min-width: 40px !important; border-radius: 50% !important;" class="flex items-center justify-center overflow-clip rounded-full relative shrink-0 text-decoration-none border border-[var(--color--ink-navy,#1a2233)] mr-2 hover:bg-[var(--color--ink-navy,#1a2233)] hover:text-[var(--color--off-white,#f8f6f2)] transition-colors duration-300 group" id="btn-enquire-mobile-nav">`;

const desktopSearch = `<a href="tel:01414877770" class="flex items-center justify-center overflow-clip w-[44px] h-[44px] rounded-full relative shrink-0 text-decoration-none border border-[var(--color--ink-navy,#1a2233)] mr-4 hover:bg-[var(--color--ink-navy,#1a2233)] hover:text-[var(--color--off-white,#f8f6f2)] transition-colors duration-300 group">`;
const desktopReplace = `<a href="tel:01414877770" style="width: 44px !important; height: 44px !important; min-width: 44px !important; border-radius: 50% !important;" class="flex items-center justify-center overflow-clip rounded-full relative shrink-0 text-decoration-none border border-[var(--color--ink-navy,#1a2233)] mr-4 hover:bg-[var(--color--ink-navy,#1a2233)] hover:text-[var(--color--off-white,#f8f6f2)] transition-colors duration-300 group">`;

let count = 0;
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;
  if (content.includes(mobileSearch)) {
    content = content.replace(mobileSearch, mobileReplace);
    changed = true;
  }
  if (content.includes(desktopSearch)) {
    content = content.replace(desktopSearch, desktopReplace);
    changed = true;
  }
  if (changed) {
    fs.writeFileSync(file, content);
    count++;
  }
}
console.log('Fixed inline sizes on ' + count + ' files.');
