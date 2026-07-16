const fs = require('fs');

// Read the home page banner
const indexHtml = fs.readFileSync('index.html', 'utf8');
const bannerRegex = /<div class="signal w-full border border-\[var\(--gold,#C9A96E\)\] border-t-0 border-solid" style="background: var\(--ink\); max-width: none;">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/section>/;

// Actually it's easier to just pull the exact HTML string we want. Let's find it.
const startMarker = '<div class="signal w-full border border-[var(--gold,#C9A96E)] border-t-0 border-solid"';
const startIndex = indexHtml.indexOf(startMarker);
if (startIndex !== -1) {
  // Extract up to the end of the signal div. 
  // It looks like: <div class="signal..."><div class="signal__inner...">...</div></div>
  // Wait, in index.html, it is nested inside the hero section right side.
  // It has: 
  // <div class="signal w-full border ...">
  //   <div class="signal__inner">...</div>
  // </div>
  // Let's just hardcode the exact HTML we want, since we know exactly what it is.
}

const newBanner = `<div class="signal w-full border border-[var(--gold,#C9A96E)] border-solid scroll-reveal" style="background: var(--ink);">
  <div class="signal__inner" style="padding-top: 32px !important; padding-bottom: 32px !important;">
    <div class="signal__copy"><p>The dentists other dentists refer their most complex patients to. Implants, cosmetic and concierge dentistry. By introduction and enquiry.</p></div>
    <div class="sdiv"></div>
    <div class="signal__stat">
      <div class="signal__num counter">9.4<span style="font-size:28px;vertical-align:middle">/10</span></div>
      <div class="signal__lbl">NPS Rating</div>
    </div>
    <div class="sdiv"></div>
    <div class="signal__stat">
      <div class="signal__num counter">200<span style="font-size:28px;vertical-align:middle">+</span></div>
      <div class="signal__lbl">Referring Dentists</div>
    </div>
    <div class="sdiv"></div>
    <div class="signal__stat">
      <div class="signal__num counter">20<span style="font-size:28px;vertical-align:middle">yr</span></div>
      <div class="signal__lbl">Implant Experience</div>
    </div>
  </div>
</div>`;

const filesToUpdate = ['about.html', 'about_modern.html'];
for (const file of filesToUpdate) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');
  
  // Find the existing signal banner
  // It starts with <div class="signal w-full border border-[var(--gold,#C9A96E)] border-solid scroll-reveal" style="background: var(--ink);">
  // and ends before <section class="founders">
  const existingRegex = /<div class="signal w-full border border-\[var\(--gold,#C9A96E\)\] border-solid scroll-reveal" style="background: var\(--ink\);">[\s\S]*?(?=<section class="founders">)/;
  
  if (existingRegex.test(content)) {
    content = content.replace(existingRegex, newBanner + '\n\n');
    fs.writeFileSync(file, content);
    console.log(`Updated banner in ${file}`);
  }
}
