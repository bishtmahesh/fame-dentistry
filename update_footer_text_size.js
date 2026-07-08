const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'index.html', 'about.html', 'implants.html', 'cosmetic.html',
  'restorative.html', 'pre-surgical.html', 'concierge.html',
  'for-dentists.html', 'insights.html', 'contact.html',
  'nps-methodology.html', 'press.html', 'privacy-policy.html', 'terms-conditions.html'
];

filesToUpdate.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace text-[9px] and opacity-50 with text-[8px] and opacity-40 in the specific line
    const regex = /<p class="font-inter font-normal text-\[9px\] text-\[var\(--color--ink-navy,#1a2233\)\] opacity-50 tracking-\[0\.3px\] normal-case mt-1">Regulated by the General Dental Council \(GDC\) &middot; Care Quality Commission \(CQC\) &middot; British Dental Association \(BDA\) member<\/p>/g;
    const replacement = `<p class="font-inter font-normal text-[8px] text-[var(--color--ink-navy,#1a2233)] opacity-40 tracking-[0.3px] normal-case mt-1">Regulated by the General Dental Council (GDC) &middot; Care Quality Commission (CQC) &middot; British Dental Association (BDA) member</p>`;
    
    if (regex.test(content)) {
      content = content.replace(regex, replacement);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated font size in ${file}`);
    } else {
      console.log(`Target block not found in ${file}`);
    }
  }
});
