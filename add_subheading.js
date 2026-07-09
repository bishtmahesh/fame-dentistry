const fs = require('fs');

const subtext = `Dual-qualified specialists leading from the front, setting a new standard for complex dental care. We combine decades of clinical expertise with a philosophy that places your long-term wellbeing above all else. Every treatment plan is uniquely crafted and personally overseen by our leading surgeons.`;
const pTag = `<p class="founders__sub scroll-reveal delay-100" style="color: var(--color-ink-soft); font-family: var(--font-inter); font-size: 16px; md:font-size: 18px; line-height: 1.6; max-width: 750px; margin: 24px auto 0 auto; text-align: center;">${subtext}</p>`;

const files = ['index.html', 'index_modern.html', 'about.html', 'about_modern.html'];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // Replace existing founders__sub if it exists
  const existingSub = /<p class="founders__sub"[^>]*>.*?<\/p>/;
  if (existingSub.test(content)) {
    content = content.replace(existingSub, pTag);
    changed = true;
  } else {
    // If it doesn't exist, inject it right after the title
    const titleRegex = /(<h2 class="founders__title"[^>]*>The people behind (?:every )?<em>.*?<\/h2>|The people behind <em>every<\/em> procedure.<\/h2>|<h2 class="display text-reveal founders-profiles__title"[^>]*>.*?<\/h2>)/;
    if (titleRegex.test(content)) {
      content = content.replace(titleRegex, `$1\n    ${pTag}`);
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
}
