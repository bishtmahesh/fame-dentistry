const fs = require('fs');

const filesToUpdate = ['about.html', 'about_modern.html'];
for (const file of filesToUpdate) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');

  // Extract the signal banner
  const existingRegex = /<div class="signal w-full border border-\[var\(--gold,#C9A96E\)\] border-solid scroll-reveal" style="background: var\(--ink\);">[\s\S]*?(?=<section class="founders">)/;
  
  const match = content.match(existingRegex);
  if (!match) {
    console.log(`Could not find banner in ${file}`);
    continue;
  }
  
  let banner = match[0].trim();
  
  // Remove it from its current location
  content = content.replace(existingRegex, '');

  // Modify the banner to have border-t-0 and remove scroll-reveal since it attaches directly to the hero
  banner = banner.replace('border-solid scroll-reveal', 'border-t-0 border-solid');
  
  // Find the end of the image wrapper div
  // It looks like:
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // </section>
  // <section class="founders-intro">
  
  // Let's use a reliable anchor. In about.html, the hero section ends with:
  //               <img alt="..." class="hero-reveal-image w-full h-full object-cover" style="object-position: top center;" src="assets/our-story-hero.webp">
  //             </div>
  //           </div>
  //         </div>
  const insertRegex = /(<div data-name="image-wrapper"[\s\S]*?<\/div>\s*<\/div>)\s*(<\/div>\s*<\/div>\s*<\/div>\s*<\/section>)/;
  
  if (insertRegex.test(content)) {
    content = content.replace(insertRegex, `$1\n          ${banner}\n        $2`);
    fs.writeFileSync(file, content);
    console.log(`Moved banner in ${file}`);
  } else {
    console.log(`Could not find insertion point in ${file}`);
  }
}
