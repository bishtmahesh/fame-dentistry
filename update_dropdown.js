const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && !f.includes('backup'));

let count = 0;
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // We want to replace the custom-options div classes to match the design exactly:
  // Current: class="custom-options absolute top-[100%] left-0 right-0 bg-[#f8f6f2] border border-[#c9a96e] rounded shadow-lg z-50 py-1 mt-1"
  // New: class="custom-options absolute top-[100%] left-0 right-0 bg-[var(--paper,#F8F6F2)] border border-[var(--gold,#C9A96E)] z-50 py-2 mt-0 hidden"
  
  // Note: we remove rounded, shadow-lg, and we add hidden by default if it wasn't there (JS toggles it anyway).
  
  // Let's use regex to replace the container
  const containerRegex = /class="custom-options[^"]*"/;
  if (containerRegex.test(content)) {
    content = content.replace(containerRegex, 'class="custom-options absolute top-[100%] left-0 right-0 bg-[#F8F6F2] border border-[#C9A96E] z-50 py-2 mt-0 hidden" style="display: none;"');
    changed = true;
  }

  // Now replace the custom-option classes
  // Current: class="custom-option px-5 py-3.5 font-inter text-[14px] md:text-[16px] text-gray-600 hover:bg-[#e7e0d4] hover:text-black cursor-pointer selected"
  // New: class="custom-option px-5 py-[14px] font-inter text-[14px] md:text-[16px] text-[var(--ink,#1A2233)] hover:text-[var(--gold,#C9A96E)] cursor-pointer"
  
  // We'll globally replace all custom-option classes
  const optionRegex = /class="custom-option([^"]*)"/g;
  content = content.replace(optionRegex, (match, p1) => {
    // Keep 'selected' if it exists, otherwise replace classes
    const isSelected = p1.includes('selected') ? ' selected' : '';
    const isPlaceholder = p1.includes('placeholder') ? ' placeholder' : '';
    // Let's just hardcode the new classes
    return `class="custom-option px-5 py-[14px] font-inter text-[14px] md:text-[16px] text-[#1A2233] hover:text-[#C9A96E] hover:bg-transparent cursor-pointer transition-colors${isSelected}${isPlaceholder}"`;
  });

  if (changed) {
    fs.writeFileSync(file, content);
    count++;
    console.log(`Updated dropdown in ${file}`);
  }
}
console.log(`Updated dropdowns in ${count} files.`);
