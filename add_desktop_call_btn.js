const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && !f.includes('backup'));

const callUsButton = `<a href="tel:01414877770" class="flex items-center justify-center overflow-clip px-[20px] py-[10px] relative shrink-0 text-decoration-none border border-[var(--color--ink-navy,#1a2233)] mr-4 hover:bg-[var(--color--ink-navy,#1a2233)] hover:text-[var(--color--off-white,#f8f6f2)] transition-colors duration-300 group">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-[var(--color--ink-navy,#1a2233)] group-hover:text-[var(--color--off-white,#f8f6f2)] mr-2 transition-colors duration-300"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              <span class="font-inter font-semibold not-italic relative shrink-0 text-[13px] text-[var(--color--ink-navy,#1a2233)] group-hover:text-[var(--color--off-white,#f8f6f2)] tracking-[1.5px] uppercase whitespace-nowrap transition-colors duration-300">Call Us</span>
            </a>\n            `;

let count = 0;
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Insert Call Us button before the Enquire Now button
  if (content.includes('id="btn-enquire"') && !content.includes('Call Us</span>')) {
    content = content.replace(
      /(<a href=\"contact.html\"[^>]*id=\"btn-enquire\")/g,
      callUsButton + '$1'
    );
  }

  if (content !== original) {
    fs.writeFileSync(file, content);
    count++;
  }
}
console.log('Added desktop Call Us button to ' + count + ' files.');
