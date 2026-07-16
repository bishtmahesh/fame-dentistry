const fs = require('fs');

const svgStar = `<svg class="mb-3 mx-auto w-8 h-8 text-[#C9A96E]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 12px; margin-left: auto; margin-right: auto; width: 32px; height: 32px; color: #C9A96E;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;
const svgUsers = `<svg class="mb-3 mx-auto w-8 h-8 text-[#C9A96E]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 12px; margin-left: auto; margin-right: auto; width: 32px; height: 32px; color: #C9A96E;"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`;
const svgAward = `<svg class="mb-3 mx-auto w-8 h-8 text-[#C9A96E]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 12px; margin-left: auto; margin-right: auto; width: 32px; height: 32px; color: #C9A96E;"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>`;

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && !f.includes('backup'));

let count = 0;
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // Add Star
  const targetStar = `<div class="signal__stat">\n      <div class="signal__num counter">9.4`;
  const targetStarAlt = `<div class="signal__stat">\n                <div class="signal__num counter">9.4`;
  if (content.includes(targetStar)) { content = content.replace(targetStar, `<div class="signal__stat">\n${svgStar}\n      <div class="signal__num counter">9.4`); changed = true; }
  else if (content.includes(targetStarAlt)) { content = content.replace(targetStarAlt, `<div class="signal__stat">\n${svgStar}\n                <div class="signal__num counter">9.4`); changed = true; }

  // Add Users
  const targetUsers = `<div class="signal__stat">\n      <div class="signal__num counter">200`;
  const targetUsersAlt = `<div class="signal__stat">\n                <div class="signal__num counter">200`;
  if (content.includes(targetUsers)) { content = content.replace(targetUsers, `<div class="signal__stat">\n${svgUsers}\n      <div class="signal__num counter">200`); changed = true; }
  else if (content.includes(targetUsersAlt)) { content = content.replace(targetUsersAlt, `<div class="signal__stat">\n${svgUsers}\n                <div class="signal__num counter">200`); changed = true; }

  // Add Award
  const targetAward = `<div class="signal__stat">\n      <div class="signal__num counter">20`;
  const targetAwardAlt = `<div class="signal__stat">\n                <div class="signal__num counter">20`;
  if (content.includes(targetAward)) { content = content.replace(targetAward, `<div class="signal__stat">\n${svgAward}\n      <div class="signal__num counter">20`); changed = true; }
  else if (content.includes(targetAwardAlt)) { content = content.replace(targetAwardAlt, `<div class="signal__stat">\n${svgAward}\n                <div class="signal__num counter">20`); changed = true; }

  // Reduce padding explicitly on about.html and other simple signal bars
  // In about.html: style="background: var(--ink);" -> style="background: var(--ink); padding-top: 16px; padding-bottom: 16px;" (if not already there)
  // Actually, modifying the CSS is much cleaner.

  if (changed) {
    fs.writeFileSync(file, content);
    count++;
  }
}
console.log(`Added icons to ${count} files.`);

// Modify CSS padding
let css = fs.readFileSync('assets/fame-design-system.css', 'utf8');
css = css.replace(/padding:clamp\(40px, 5vw, 80px\) var\(--px-section\);/g, 'padding:clamp(24px, 4vw, 40px) var(--px-section);');
fs.writeFileSync('assets/fame-design-system.css', css);
console.log('Reduced padding in CSS.');
