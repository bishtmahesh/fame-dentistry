const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'index.html', 'about.html', 'implants.html', 'cosmetic.html',
  'restorative.html', 'pre-surgical.html', 'concierge.html',
  'for-dentists.html', 'insights.html', 'contact.html',
  'nps-methodology.html', 'press.html', 'privacy-policy.html', 'terms-conditions.html'
];

const replacementStr = `<div class="flex flex-row flex-wrap gap-x-2 gap-y-1 items-center justify-center">
                <p class="relative shrink-0">© 2026 FAME Dentistry</p>
                <span class="relative shrink-0" aria-hidden="true">·</span>
                <a href="privacy-policy.html" class="relative shrink-0 text-[var(--color--ink-navy,#1a2233)] hover:text-[var(--color--gold,#c9a96e)] transition-colors duration-300 no-underline uppercase">Privacy Policy</a>
                <span class="relative shrink-0" aria-hidden="true">·</span>
                <a href="terms-conditions.html" class="relative shrink-0 text-[var(--color--ink-navy,#1a2233)] hover:text-[var(--color--gold,#c9a96e)] transition-colors duration-300 no-underline uppercase">Terms &amp; Conditions</a>
                <span class="relative shrink-0" aria-hidden="true">·</span>
                <a href="https://remedo.io" target="_blank" rel="noopener noreferrer" class="relative shrink-0 text-[var(--color--ink-navy,#1a2233)] hover:text-[var(--color--gold,#c9a96e)] transition-colors duration-300 no-underline uppercase">Digital Marketing by Remedo</a>
              </div>`;

filesToUpdate.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Use regex to match the exact block regardless of 'uppercase' class or exact whitespace
    const regex = /<div class="flex flex-row flex-wrap gap-x-2 gap-y-1 items-center justify-center">\s*<p class="relative shrink-0">© 2026 FAME Dentistry<\/p>\s*<span class="relative shrink-0" aria-hidden="true">·<\/span>\s*<a href="https:\/\/remedo\.io"[^>]*>Digital Marketing by Remedo<\/a>\s*<\/div>/g;
    
    if (regex.test(content)) {
      content = content.replace(regex, replacementStr);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ${file}`);
    } else {
      console.log(`Target block not found in ${file}`);
    }
  } else {
    console.log(`File not found: ${file}`);
  }
});
