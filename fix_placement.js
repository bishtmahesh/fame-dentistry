const fs = require('fs');

const files = ['about.html', 'dr-ahmed.html', 'dr-bashir.html'];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');

  // We need to move the <div class="signal..."> block inside the previous </div>.
  // The structure currently is:
  //         </div> <!-- closes data-name="image-wrapper" -->
  //       </div> <!-- closes w-full flex flex-col order-2 md:order-4 -->
  //       <div class="signal w-full border ...">...</div>
  //       </div> <!-- closes something else -->

  // Let's use string manipulation to find the signal block, remove it, and re-insert it properly.
  
  const signalStart = '<div class="signal w-full border border-[var(--gold,#C9A96E)] border-t-0 border-solid"';
  const signalIndex = content.indexOf(signalStart);
  
  if (signalIndex !== -1) {
    // Find the end of the signal block
    // We know it ends with:
    //     </div>
    //   </div>
    // </div>
    const signalEndStr = '</div>\n</div>\n        </div>'; 
    // Actually, let's just use regex to grab the entire signal block.
    const signalRegex = /<div class="signal w-full border border-\[var\(--gold,#C9A96E\)\] border-t-0 border-solid"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;
    
    const match = content.match(signalRegex);
    if (match) {
      const bannerHTML = match[0];
      
      // Remove it from its current bad location
      content = content.replace(signalRegex, '');
      
      // Now find where it SHOULD go: immediately after <div data-name="image-wrapper"...>...</div></div>
      // Wait, let's just find the image-wrapper block and inject it right before the closing </div> of its parent.
      
      // The hero image wrapper looks like this:
      // <div data-name="image-wrapper" class="border border-[var(--gold,#C9A96E)] border-solid h-[300px] sm:h-[420px] md:h-[590px] w-full scroll-reveal delay-400 mb-0">
      //   <div class="overflow-hidden pointer-events-none h-full w-full">
      //     <img ...>
      //   </div>
      // </div>
      // </div> <- THIS IS THE PARENT DIV WE WANT TO BE INSIDE
      
      // Let's match the image-wrapper and its closing tags
      const targetRegex = /(<div data-name="image-wrapper"[\s\S]*?<\/div>\s*<\/div>\s*)(<\/div>)/;
      
      if (targetRegex.test(content)) {
         content = content.replace(targetRegex, `$1${bannerHTML}\n$2`);
         fs.writeFileSync(file, content);
         console.log(`Fixed banner placement in ${file}`);
      } else {
         // Maybe the alt structure?
         const altRegex = /(<div data-name="image-wrapper"[\s\S]*?<\/div>\s*<\/div>)\s*(<\/div>)/;
         if (altRegex.test(content)) {
            content = content.replace(altRegex, `$1\n${bannerHTML}\n$2`);
            fs.writeFileSync(file, content);
            console.log(`Fixed banner placement in ${file} (Alt)`);
         }
      }
    }
  }
}
