const fs = require('fs');

const newBanner = `<div class="signal w-full border border-[var(--gold,#C9A96E)] border-t-0 border-solid" style="background: var(--ink); max-width: none;">
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

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && !f.includes('backup') && !f.includes('policy') && !f.includes('terms') && !f.includes('methodology') && !f.includes('live'));

let count = 0;
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Skip if it already has the signal banner attached below hero (we already did index, about, etc.)
  if (content.includes('<div class="signal w-full border border-[var(--gold,#C9A96E)] border-t-0 border-solid"')) {
    continue;
  }
  
  // Also check if it has the old detached banner
  const oldBannerRegex = /<div class="signal w-full border border-\[var\(--gold,#C9A96E\)\] border-solid scroll-reveal"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;
  if (oldBannerRegex.test(content)) {
    content = content.replace(oldBannerRegex, '');
  }

  // Regex to match the hero image and insert the banner immediately after it, inside its parent flex-col
  const targetRegex = /(<div data-name="image-wrapper"[\s\S]*?<\/div>\s*<\/div>\s*)(<\/div>)/;
  
  // But we want to ensure we only target the FIRST one (the hero)
  // Let's split and replace
  const match = content.match(targetRegex);
  if (match) {
    content = content.replace(targetRegex, `$1${newBanner}\n$2`);
    fs.writeFileSync(file, content);
    console.log(`Added banner to ${file}`);
    count++;
  } else {
    // some pages might not have a hero image (like contact or insights maybe?)
    console.log(`No hero image found in ${file}`);
  }
}

console.log(`Total files updated: ${count}`);
