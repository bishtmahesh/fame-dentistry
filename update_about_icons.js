const fs = require('fs');

const files = ['about.html', 'about_modern.html'];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');

  // Replace NPS Stat
  content = content.replace(
    /<div class="signal__stat">\s*<svg class="mb-3 mx-auto w-8 h-8 text-\[#C9A96E\]"[\s\S]*?<\/svg>\s*<div class="signal__num counter">9\.4<span style="font-size:28px;vertical-align:middle">\/10<\/span><\/div>\s*<div class="signal__lbl">NPS Rating<\/div>\s*<\/div>/g,
    `<div class="signal__stat flex items-center justify-center gap-[16px] text-left w-full" style="width: 100% !important;">
      <div class="w-[48px] h-[48px] rounded-full border border-[#C9A96E] flex items-center justify-center shrink-0">
        <svg class="w-[20px] h-[20px] text-[#C9A96E]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" style="color: #C9A96E;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
      </div>
      <div class="flex flex-col items-start text-left">
        <div class="signal__num counter" style="text-align: left;">9.4<span style="font-size:28px;vertical-align:middle">/10</span></div>
        <div class="signal__lbl" style="text-align: left; margin-top: 2px;">NPS Rating</div>
      </div>
    </div>`
  );

  // Replace Referring Stat
  content = content.replace(
    /<div class="signal__stat">\s*<svg class="mb-3 mx-auto w-8 h-8 text-\[#C9A96E\]"[\s\S]*?<\/svg>\s*<div class="signal__num counter">200<span style="font-size:28px;vertical-align:middle">\+<\/span><\/div>\s*<div class="signal__lbl">Referring Dentists<\/div>\s*<\/div>/g,
    `<div class="signal__stat flex items-center justify-center gap-[16px] text-left w-full" style="width: 100% !important;">
      <div class="w-[48px] h-[48px] rounded-full border border-[#C9A96E] flex items-center justify-center shrink-0">
        <svg class="w-[20px] h-[20px] text-[#C9A96E]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" style="color: #C9A96E;"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
      </div>
      <div class="flex flex-col items-start text-left">
        <div class="signal__num counter" style="text-align: left;">200<span style="font-size:28px;vertical-align:middle">+</span></div>
        <div class="signal__lbl" style="text-align: left; margin-top: 2px;">Referring Dentists</div>
      </div>
    </div>`
  );

  // Replace Experience Stat
  content = content.replace(
    /<div class="signal__stat">\s*<svg class="mb-3 mx-auto w-8 h-8 text-\[#C9A96E\]"[\s\S]*?<\/svg>\s*<div class="signal__num counter">20<span style="font-size:28px;vertical-align:middle">yr<\/span><\/div>\s*<div class="signal__lbl">Implant Experience<\/div>\s*<\/div>/g,
    `<div class="signal__stat flex items-center justify-center gap-[16px] text-left w-full" style="width: 100% !important;">
      <div class="w-[48px] h-[48px] rounded-full border border-[#C9A96E] flex items-center justify-center shrink-0">
        <svg class="w-[20px] h-[20px] text-[#C9A96E]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" style="color: #C9A96E;"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
      </div>
      <div class="flex flex-col items-start text-left">
        <div class="signal__num counter" style="text-align: left;">20<span style="font-size:28px;vertical-align:middle">yr</span></div>
        <div class="signal__lbl" style="text-align: left; margin-top: 2px;">Implant Experience</div>
      </div>
    </div>`
  );

  // Reduce padding explicitly for the about page banner
  content = content.replace(
    /<div class="signal__inner signal__inner--stats3">/,
    '<div class="signal__inner signal__inner--stats3" style="padding-top: 20px !important; padding-bottom: 20px !important;">'
  );

  fs.writeFileSync(file, content);
  console.log(`Updated layout on ${file}`);
}
