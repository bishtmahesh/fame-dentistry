const fs = require('fs');

const metaUpdates = {
  'index.html': {
    title: 'FAME Dentistry | Luxury Private Dentist & Implants in Glasgow',
    desc: 'Experience decidedly different dentistry at FAME Dentistry, Glasgow. Dr Ferhan Ahmed offers luxury private dental care, implants, and concierge services in Scotland.'
  },
  'implants.html': {
    title: 'Dental Implants Glasgow | Specialist Implantology | FAME Dentistry',
    desc: 'Restore your smile with premium dental implants in Glasgow. FAME Dentistry offers specialist implantology and full-arch restorative solutions in Scotland.'
  },
  'cosmetic.html': {
    title: 'Cosmetic Dentist Glasgow | Premium Smile Makeovers | FAME Dentistry',
    desc: 'Transform your smile with Glasgow\'s leading luxury cosmetic dentists. Discover bespoke porcelain veneers, composite bonding, and premium smile makeovers.'
  },
  'restorative.html': {
    title: 'Restorative Dentistry Glasgow | Full Mouth Rehabilitation',
    desc: 'Advanced restorative dentistry in Glasgow. FAME Dentistry provides expert full mouth rehabilitation, bespoke crowns, and bridges for long-lasting health in Scotland.'
  },
  'pre-surgical.html': {
    title: 'Pre-Surgical Orthodontics Glasgow | FAME Dentistry',
    desc: 'Expert pre-surgical orthodontics and clear aligner therapy in Glasgow, laying the premium foundation for complex restorative and specialist implant procedures.'
  },
  'concierge.html': {
    title: 'Dental Concierge Services Glasgow | FAME Dentistry',
    desc: 'Exclusive dental concierge services for the Glasgow business community. Experience unparalleled luxury and convenience with your private dental care at FAME Dentistry.'
  },
  'for-dentists.html': {
    title: 'Dental Referrals Glasgow | Specialist Care Scotland | FAME Dentistry',
    desc: 'Refer your patients to FAME Dentistry in Glasgow for specialist implantology and complex restorative treatments. A trusted partner for dental professionals in Scotland.'
  }
};

for (const [filename, meta] of Object.entries(metaUpdates)) {
  if (fs.existsSync(filename)) {
    let content = fs.readFileSync(filename, 'utf8');
    
    // Replace title
    content = content.replace(/<title>.*?<\/title>/s, `<title>${meta.title}</title>`);
    
    // Replace description
    content = content.replace(/<meta name="description" content="[^"]*">/s, `<meta name="description" content="${meta.desc}">`);

    fs.writeFileSync(filename, content);
    console.log(`Updated meta tags in ${filename}`);
  }
}
