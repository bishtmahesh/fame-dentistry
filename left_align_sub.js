const fs = require('fs');

const files = ['index.html', 'about.html'];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');

  const oldStyle = 'style="color: var(--color-ink-soft); font-family: var(--font-inter); font-size: 16px; md:font-size: 18px; line-height: 1.6; max-width: 750px; margin: 24px auto 0 auto; text-align: center;"';
  const newStyle = 'style="color: var(--color-ink-soft); font-family: var(--font-inter); font-size: 16px; md:font-size: 18px; line-height: 1.6; max-width: 750px; margin: 24px 0 0 0; text-align: left;"';
  
  if (content.includes(oldStyle)) {
    content = content.replace(oldStyle, newStyle);
    fs.writeFileSync(file, content);
    console.log(`Updated alignment in ${file}`);
  } else {
    // maybe we need a regex just in case
    const styleRegex = /style="color: var\(--color-ink-soft\); font-family: var\(--font-inter\); font-size: 16px; md:font-size: 18px; line-height: 1.6; max-width: 750px; margin: 24px auto 0 auto; text-align: center;"/g;
    if (styleRegex.test(content)) {
       content = content.replace(styleRegex, newStyle);
       fs.writeFileSync(file, content);
       console.log(`Updated alignment in ${file} via regex`);
    } else {
       console.log(`Could not find the exact style string in ${file}`);
    }
  }
}
