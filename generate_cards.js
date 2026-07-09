const fs = require('fs');
let html = fs.readFileSync('insights.html', 'utf8');

const baseCards = {
  'Concierge': '<article class="scroll-reveal icard" data-category="Concierge"><div class="icard__img"><img src="assets/insight-1.webp" alt="Editorial Photo" loading="lazy" style="width:100%;height:100%;object-fit:cover;"></div><div class="icard__body"><div class="icard__tag">Concierge</div><h3 class="icard__title">What Does Concierge Dentistry Actually Mean?</h3><p class="icard__exc">A clear explanation of what separates a concierge practice from a standard private one — beyond the marketing language.</p><a href="#" class="icard__read">Read article →</a></div></article>',
  
  'Clinical': '<article class="scroll-reveal icard" data-category="Clinical"><div class="icard__img"><img src="assets/insight-2.webp" alt="Editorial Photo" loading="lazy" style="width:100%;height:100%;object-fit:cover;"></div><div class="icard__body"><div class="icard__tag">Clinical</div><h3 class="icard__title">Why We Carry Out Pre-Surgical Optimisation Before Every Implant</h3><p class="icard__exc">The specific workup tests that most dental practices don\'t carry out — and why they matter for complex implant cases.</p><a href="#" class="icard__read">Read article →</a></div></article>',
  
  'Implants': '<article class="scroll-reveal icard" data-category="Implants"><div class="icard__img"><img src="assets/insight-3.webp" alt="Editorial Photo" loading="lazy" style="width:100%;height:100%;object-fit:cover;"></div><div class="icard__body"><div class="icard__tag">Implants</div><h3 class="icard__title">Dental Implant Tourism: The Hidden Costs of Going Abroad</h3><p class="icard__exc">The cost of revision surgery after overseas implant failure often exceeds the original saving. A clinical perspective on what goes wrong and why.</p><a href="#" class="icard__read">Read article →</a></div></article>',
  
  'Cosmetic': '<article class="scroll-reveal icard" data-category="Cosmetic"><div class="icard__img"><img src="assets/insight-4.webp" alt="Editorial Photo" loading="lazy" style="width:100%;height:100%;object-fit:cover;"></div><div class="icard__body"><div class="icard__tag">Cosmetic</div><h3 class="icard__title">Why We Always Assess Before We Treat</h3><p class="icard__exc">Veneers over an untreated bite issue will fail. A whitening course that ignores erosion will cause harm. The case for a clinical-first approach to cosmetics.</p><a href="#" class="icard__read">Read article →</a></div></article>',
  
  'For Dentists': '<article class="scroll-reveal icard" data-category="For Dentists"><div class="icard__img"><img src="assets/insight-5.webp" alt="Editorial Photo" loading="lazy" style="width:100%;height:100%;object-fit:cover;"></div><div class="icard__body"><div class="icard__tag">For Dentists</div><h3 class="icard__title">How to Refer a Complex Implant Case Without Losing Your Patient</h3><p class="icard__exc">The protocol that 200+ referring dentists across Scotland rely on — and the three questions you should ask any specialist before sending a referral.</p><a href="#" class="icard__read">Read article →</a></div></article>'
};

// We want a mix of cards for 'All'. 
let newGridHtml = '';
let count = 0;
['Concierge', 'Clinical', 'Implants', 'Cosmetic', 'For Dentists'].forEach(cat => {
  for(let i=0; i<3; i++) {
    let card = baseCards[cat];
    // Add border styles based on position so grid looks good
    // Actually, css grid should handle borders! Wait, the original css used inline styles for border-top and border-right.
    // It\'s better to just output raw cards and let the JS filter script apply the borders correctly.
    newGridHtml += card + '\\n';
  }
});

// We need to replace the contents of <div class="insights__grid">
let regex = /(<div class=\"insights__grid\">)[\s\S]*?(<\/div>\s*<\/div>\s*<\/section>)/;
html = html.replace(regex, `$1\n${newGridHtml}\n$2`);

fs.writeFileSync('insights.html', html);
