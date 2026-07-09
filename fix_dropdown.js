const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && !f.includes('backup'));

const goldChevronSVG = `<svg class="custom-select-arrow block w-[16px] h-[16px] transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>`;
const oldImg = `<img alt="" class="custom-select-arrow block w-[12px] h-[6px]" src="assets/select-arrow.svg">`;

let count = 0;
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // Fix the broken container class
  const badContainer = /class="custom-option px-5 py-\[14px\] font-inter text-\[14px\] md:text-\[16px\] text-\[#1A2233\] hover:text-\[#C9A96E\] hover:bg-transparent cursor-pointer transition-colors"\s+style="display: none;"\s+id="custom-select-options"/g;
  if (badContainer.test(content)) {
    content = content.replace(badContainer, 'class="custom-options absolute top-[100%] left-0 right-0 bg-[#F8F6F2] border border-[#C9A96E] z-50 py-2 mt-0 hidden" id="custom-select-options"');
    changed = true;
  }
  
  // Replace img with SVG chevron
  if (content.includes(oldImg)) {
    content = content.replace(oldImg, goldChevronSVG);
    changed = true;
  }
  
  // Ensure the bottom border of the trigger has the correct color and padding
  const oldTrigger = /class="border-b border-\[#c7c7c7\] border-solid flex items-center justify-between pb-\[12px\] pt-\[10px\] w-full cursor-pointer" id="custom-select-trigger"/g;
  if (oldTrigger.test(content)) {
    content = content.replace(oldTrigger, 'class="border-b border-[#C9A96E] border-solid flex items-center justify-between pb-[12px] pt-[10px] w-full cursor-pointer" id="custom-select-trigger"');
    changed = true;
  }

  // Update label and default placeholder style to match image
  // Image label: "WHAT BRINGS YOU TO FAME? (SELECT ONE) *" -> uppercase, dark text
  // The placeholder "Select Treatment" has text-[var(--ink)] not gray opacity
  content = content.replace(/class="custom-select-trigger-text font-inter text-\[16px\] md:text-\[18px\] text-\[var\(--stone-2,#9C968A\)\] opacity-45 whitespace-nowrap"/g, 'class="custom-select-trigger-text font-inter text-[16px] md:text-[18px] text-[#1A2233] whitespace-nowrap"');
  
  // Also we want to ensure the label is uppercase
  content = content.replace(/What brings you to FAME\?\s*\(select one\)\s*\*/g, 'WHAT BRINGS YOU TO FAME? (SELECT ONE) *');
  content = content.replace(/Your name\s*\*/g, 'YOUR NAME *');
  content = content.replace(/Email address\s*\*/g, 'EMAIL ADDRESS *');
  content = content.replace(/Phone number\s*\*/g, 'PHONE NUMBER *');
  content = content.replace(/Anything else\?\s*\(optional\)/g, 'ANYTHING ELSE? (OPTIONAL)');
  
  if (changed) {
    fs.writeFileSync(file, content);
    count++;
  }
}
console.log(`Fixed dropdown container and styles in ${count} files.`);
