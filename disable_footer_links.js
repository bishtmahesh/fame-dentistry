const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'index.html', 'about.html', 'implants.html', 'cosmetic.html',
  'restorative.html', 'pre-surgical.html', 'concierge.html',
  'for-dentists.html', 'insights.html', 'contact.html',
  'nps-methodology.html', 'press.html', 'privacy-policy.html', 'terms-conditions.html'
];

filesToUpdate.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Find the footer block
    const footerRegex = /<footer[^>]*>[\s\S]*?<\/footer>/g;
    
    content = content.replace(footerRegex, (footerMatch) => {
      // Inside the footer block, find all <a> tags and add inline styles and change href
      // Also handle cases where style attribute already exists
      return footerMatch.replace(/<a\s+([^>]*?)href="([^"]*)"([^>]*?)>/g, (aMatch, beforeHref, hrefValue, afterHref) => {
        // If it already has style, append to it, otherwise add style attribute
        let newBefore = beforeHref;
        let newAfter = afterHref;
        const disableStyle = 'pointer-events: none; cursor: default;';
        
        if (aMatch.includes('style="')) {
          newAfter = afterHref.replace(/style="/, `style="${disableStyle} `);
        } else {
          newAfter = `${afterHref} style="${disableStyle}"`;
        }
        
        return `<a ${newBefore}href="javascript:void(0)"${newAfter}>`;
      });
    });

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Disabled footer links in ${file}`);
  } else {
    console.log(`File not found: ${file}`);
  }
});
