const fs = require('fs');

const oldText = "Setting the standard for complex dental care in Scotland. We combine decades of specialist expertise with a philosophy that places your long-term results above all else.";
const newText = "Twenty years of dedicated specialist practice, culminating in a new benchmark for private dentistry. Trusted by our professional peers and cherished by our patients.";

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && !f.includes('backup'));

let count = 0;
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes(oldText)) {
    content = content.replace(new RegExp(oldText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newText);
    fs.writeFileSync(file, content);
    console.log(`Updated text in ${file}`);
    count++;
  }
}
console.log(`Updated ${count} files.`);
