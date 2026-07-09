const fs = require('fs');

const replacements = [
  {
    file: 'index.html',
    search: '<h1 class="font-prata leading-[1.2] text-[36px] md:text-[64px] text-[var(--ink,#1A2233)] tracking-[-0.5px] md:tracking-[-1px] w-full scroll-reveal order-2 mb-[24px] md:mb-0">Decidedly Different Dentistry. <br class="hidden lg:inline">In Scotland Street.</h1>',
    replace: '<h1 class="font-prata leading-[1.2] text-[36px] md:text-[64px] text-[var(--ink,#1A2233)] tracking-[-0.5px] md:tracking-[-1px] w-full scroll-reveal order-2 mb-[24px] md:mb-0">Luxury Private Dentistry.<br class="hidden lg:inline"> In Glasgow, Scotland.</h1>'
  },
  {
    file: 'index.html',
    search: '<p class="font-inter leading-[1.65] text-[16px] md:text-[18px] text-[var(--ink,#1A2233)] w-full lg:w-[580px]">A dental practice with a concierge service for the business community on Scotland Street, Glasgow. Founded by Dr Ferhan Ahmed, BDS · MFDS · MBChB.</p>',
    replace: '<p class="font-inter leading-[1.65] text-[16px] md:text-[18px] text-[var(--ink,#1A2233)] w-full lg:w-[580px]">Glasgow\'s leading private dental practice and implant clinic, featuring an exclusive concierge service for the business community on Scotland Street. Founded by specialist Dr Ferhan Ahmed.</p>'
  },
  {
    file: 'implants.html',
    search: '<h1 class="font-prata leading-[1.2] text-[36px] md:text-[64px] text-[var(--ink,#1A2233)] tracking-[-0.5px] md:tracking-[-1px] w-full scroll-reveal mb-[24px] md:mb-0">The Benchmark for<br class="hidden lg:inline"> Dental Implants.</h1>',
    replace: '<h1 class="font-prata leading-[1.2] text-[36px] md:text-[64px] text-[var(--ink,#1A2233)] tracking-[-0.5px] md:tracking-[-1px] w-full scroll-reveal mb-[24px] md:mb-0">The Benchmark for<br class="hidden lg:inline"> Dental Implants in Glasgow.</h1>'
  },
  {
    file: 'implants.html',
    search: '<p class="font-inter leading-[1.65] text-[16px] md:text-[18px] text-[var(--ink,#1A2233)] w-full lg:w-[580px]">Surgical precision meets restorative excellence. We handle the most complex implant cases that other practices turn away.</p>',
    replace: '<p class="font-inter leading-[1.65] text-[16px] md:text-[18px] text-[var(--ink,#1A2233)] w-full lg:w-[580px]">Surgical precision meets restorative excellence. As Scotland\'s leading implantology clinic, we handle the most complex dental implant and full-arch cases that other practices turn away.</p>'
  },
  {
    file: 'cosmetic.html',
    search: '<h1 class="font-prata leading-[1.2] text-[36px] md:text-[64px] text-[var(--ink,#1A2233)] tracking-[-0.5px] md:tracking-[-1px] w-full scroll-reveal mb-[24px] md:mb-0">Architects of the<br class="hidden lg:inline"> Perfect Smile.</h1>',
    replace: '<h1 class="font-prata leading-[1.2] text-[36px] md:text-[64px] text-[var(--ink,#1A2233)] tracking-[-0.5px] md:tracking-[-1px] w-full scroll-reveal mb-[24px] md:mb-0">Glasgow\'s Premier Cosmetic Dentists.</h1>'
  },
  {
    file: 'cosmetic.html',
    search: '<p class="font-inter leading-[1.65] text-[16px] md:text-[18px] text-[var(--ink,#1A2233)] w-full lg:w-[580px]">Bespoke smile design using ultra-thin porcelain veneers, alignment, and elite whitening protocols for uncompromising results.</p>',
    replace: '<p class="font-inter leading-[1.65] text-[16px] md:text-[18px] text-[var(--ink,#1A2233)] w-full lg:w-[580px]">Bespoke smile makeovers in Glasgow. We utilise ultra-thin porcelain veneers, composite bonding, and elite teeth whitening protocols for uncompromising luxury results.</p>'
  },
  {
    file: 'restorative.html',
    search: '<h1 class="font-prata leading-[1.2] text-[36px] md:text-[64px] text-[var(--ink,#1A2233)] tracking-[-0.5px] md:tracking-[-1px] w-full scroll-reveal mb-[24px] md:mb-0">Restoring Function.<br class="hidden lg:inline"> Rebuilding Confidence.</h1>',
    replace: '<h1 class="font-prata leading-[1.2] text-[36px] md:text-[64px] text-[var(--ink,#1A2233)] tracking-[-0.5px] md:tracking-[-1px] w-full scroll-reveal mb-[24px] md:mb-0">Full Mouth Rehabilitation<br class="hidden lg:inline"> in Glasgow.</h1>'
  },
  {
    file: 'restorative.html',
    search: '<p class="font-inter leading-[1.65] text-[16px] md:text-[18px] text-[var(--ink,#1A2233)] w-full lg:w-[580px]">Comprehensive full-mouth rehabilitation designed to salvage failing dentition and engineer long-lasting structural integrity.</p>',
    replace: '<p class="font-inter leading-[1.65] text-[16px] md:text-[18px] text-[var(--ink,#1A2233)] w-full lg:w-[580px]">Comprehensive restorative dentistry and full mouth rehabilitation in Scotland. We salvage failing dentition and engineer long-lasting structural integrity.</p>'
  }
];

let updatedFiles = new Set();

for (const {file, search, replace} of replacements) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes(search)) {
      content = content.replace(search, replace);
      fs.writeFileSync(file, content);
      updatedFiles.add(file);
    }
  }
}

console.log('Injected local SEO keywords into:', Array.from(updatedFiles).join(', '));
