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

const filesToUpdate = ['dr-ahmed.html', 'dr-bashir.html'];

for (const file of filesToUpdate) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');

  // Find and remove the existing signal banner
  // It could be anywhere. Let's use a regex that matches the whole div.
  const existingRegex = /<div class="signal w-full border border-\[var\(--gold,#C9A96E\)\] border-solid scroll-reveal" style="background: var\(--ink\);">[\s\S]*?(?=<section class="founders-intro"|<section class="practice-story"|<section class="article|<div class="container)/;
  // Actually, simpler:
  const simpleRegex = /<div class="signal w-full border border-\[var\(--gold,#C9A96E\)\] border-solid scroll-reveal" style="background: var\(--ink\);">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;

  if (simpleRegex.test(content)) {
    content = content.replace(simpleRegex, '');
    console.log(`Removed old banner in ${file}`);
  } else {
    console.log(`Could not find old banner in ${file}, maybe already removed or different format?`);
  }

  // Find the insertion point: immediately after the hero image wrapper div
  // In dr-ahmed.html, the hero image is usually followed by a few closing divs then the </section>
  const insertRegex = /(<div data-name="image-wrapper"[\s\S]*?<\/div>\s*<\/div>)\s*(<\/div>\s*<\/div>\s*<\/div>\s*<\/section>)/;
  
  if (insertRegex.test(content)) {
    content = content.replace(insertRegex, `$1\n          ${newBanner}\n        $2`);
    fs.writeFileSync(file, content);
    console.log(`Moved banner in ${file}`);
  } else {
    // If not found, try alternative structure
    const insertRegexAlt = /(<img [^>]*class="hero-reveal-image[^>]*>[\s\S]*?<\/div>\s*<\/div>)\s*(<\/div>\s*<\/div>\s*<\/div>\s*<\/section>)/;
    if (insertRegexAlt.test(content)) {
      content = content.replace(insertRegexAlt, `$1\n          ${newBanner}\n        $2`);
      fs.writeFileSync(file, content);
      console.log(`Moved banner in ${file} (Alt Regex)`);
    } else {
      console.log(`Could not find insertion point in ${file}`);
    }
  }
}
