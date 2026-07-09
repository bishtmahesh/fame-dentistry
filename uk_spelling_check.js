const fs = require('fs');

const ukSpellings = [
  { us: /\bcolor\b/g, uk: 'colour' },
  { us: /\bcolors\b/g, uk: 'colours' },
  { us: /\bspecialize\b/g, uk: 'specialise' },
  { us: /\bspecializes\b/g, uk: 'specialises' },
  { us: /\bspecializing\b/g, uk: 'specialising' },
  { us: /\bspecialized\b/g, uk: 'specialised' },
  { us: /\bcenter\b/g, uk: 'centre' },
  { us: /\bcenters\b/g, uk: 'centres' },
  { us: /\bprogram\b/g, uk: 'programme' },
  { us: /\bprograms\b/g, uk: 'programmes' },
  { us: /\bpersonalize\b/g, uk: 'personalise' },
  { us: /\bpersonalized\b/g, uk: 'personalised' },
  { us: /\bminimize\b/g, uk: 'minimise' },
  { us: /\bmaximize\b/g, uk: 'maximise' },
  { us: /\butilize\b/g, uk: 'utilise' },
  { us: /\butilizing\b/g, uk: 'utilising' },
  { us: /\bcustomized\b/g, uk: 'customised' },
  { us: /\bcustomize\b/g, uk: 'customise' }
];

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && !f.includes('backup'));

let totalReplacements = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  for (const rule of ukSpellings) {
    content = content.replace(rule.us, rule.uk);
    // Also handle title case
    const titleUs = new RegExp(rule.us.source.charAt(2).toUpperCase() + rule.us.source.slice(3), 'g');
    const titleUk = rule.uk.charAt(0).toUpperCase() + rule.uk.slice(1);
    content = content.replace(titleUs, titleUk);
  }

  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log(`Updated UK spelling in ${file}`);
    totalReplacements++;
  }
}
console.log(`Finished UK spelling pass on ${totalReplacements} files.`);
