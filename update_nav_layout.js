const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && !f.includes('backup'));

let count = 0;
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // 1. Reduce padding to push items closer to the edges
  content = content.split('class="flex flex-col items-center px-[16px] md:px-[72px] relative shrink-0 w-full max-w-[1440px] mx-auto"').join('class="flex flex-col items-center px-[16px] lg:px-[40px] relative shrink-0 w-full max-w-[1440px] mx-auto"');

  // 2. Split the nav links and CTAs into separate flex children so they distribute across the header
  const targetSplit = `<a href="for-dentists.html" class="font-inter font-medium leading-normal relative shrink-0 text-[16px] text-[var(--color--ink-navy,#1a2233)] tracking-[1.2px] whitespace-nowrap no-underline cursor-pointer hover:text-[var(--color--gold,#c9a96e)] transition-colors duration-300 uppercase">For Dentists</a>
            <a href="tel:01414877770" class="flex items-center justify-center overflow-clip w-[44px] h-[44px] rounded-full relative shrink-0 text-decoration-none border border-[var(--color--ink-navy,#1a2233)] mr-4 hover:bg-[var(--color--ink-navy,#1a2233)] hover:text-[var(--color--off-white,#f8f6f2)] transition-colors duration-300 group">`;
            
  const replacementSplit = `<a href="for-dentists.html" class="font-inter font-medium leading-normal relative shrink-0 text-[16px] text-[var(--color--ink-navy,#1a2233)] tracking-[1.2px] whitespace-nowrap no-underline cursor-pointer hover:text-[var(--color--gold,#c9a96e)] transition-colors duration-300 uppercase">For Dentists</a>
          </div>
          
          <div class="hidden lg:flex items-center justify-end shrink-0">
            <a href="tel:01414877770" class="flex items-center justify-center overflow-clip w-[44px] h-[44px] rounded-full relative shrink-0 text-decoration-none border border-[var(--color--ink-navy,#1a2233)] mr-4 hover:bg-[var(--color--ink-navy,#1a2233)] hover:text-[var(--color--off-white,#f8f6f2)] transition-colors duration-300 group">`;

  content = content.split(targetSplit).join(replacementSplit);

  if (content !== original) {
    fs.writeFileSync(file, content);
    count++;
  }
}
console.log('Updated desktop navbar layout in ' + count + ' files.');
