const fs = require('fs');
let html = fs.readFileSync('insights.html', 'utf8');

// Update buttons with data-filter
html = html.replace('<button class="filter-btn filter-btn--active">All</button>', '<button class="filter-btn filter-btn--active" data-filter="all">All</button>');
html = html.replace('<button class="filter-btn">Implants</button>', '<button class="filter-btn" data-filter="Implants">Implants</button>');
html = html.replace('<button class="filter-btn">Cosmetic</button>', '<button class="filter-btn" data-filter="Cosmetic">Cosmetic</button>');
html = html.replace('<button class="filter-btn">Concierge</button>', '<button class="filter-btn" data-filter="Concierge">Concierge</button>');
html = html.replace('<button class="filter-btn">Clinical</button>', '<button class="filter-btn" data-filter="Clinical">Clinical</button>');
html = html.replace('<button class="filter-btn">For Dentists</button>', '<button class="filter-btn" data-filter="For Dentists">For Dentists</button>');

// Add data-category to each article manually to be safe
html = html.replace('<article class="scroll-reveal delay-100 icard">', '<article class="scroll-reveal delay-100 icard" data-category="Concierge">');
html = html.replace('<article class="scroll-reveal delay-200 icard">', '<article class="scroll-reveal delay-200 icard" data-category="Clinical">');
html = html.replace('<article class="scroll-reveal delay-300 icard" style="border-right:none">', '<article class="scroll-reveal delay-300 icard" data-category="Implants" style="border-right:none">');
html = html.replace('<article class="scroll-reveal delay-400 icard" style="border-top:1px solid var(--rule)">', '<article class="scroll-reveal delay-400 icard" data-category="Cosmetic" style="border-top:1px solid var(--rule)">');
// Wait, there are two delay-500 articles
html = html.replace('<div class="icard__tag">For Dentists</div>', '<div class="icard__tag">For Dentists</div><!--MARK1-->');
html = html.replace('<div class="icard__tag">Clinical</div>\\n          <h3 class="icard__title">What an NPS', '<div class="icard__tag">Clinical</div><!--MARK2-->\\n          <h3 class="icard__title">What an NPS');

let parts = html.split('<article class="scroll-reveal delay-500 icard" style="border-top:1px solid var(--rule)">');
if (parts.length === 3) {
  html = parts[0] + 
    '<article class="scroll-reveal delay-500 icard" data-category="For Dentists" style="border-top:1px solid var(--rule)">' + 
    parts[1] + 
    '<article class="scroll-reveal delay-500 icard" data-category="Clinical" style="border-top:1px solid var(--rule)">' + 
    parts[2];
}

// Add the JS for filtering
const filterScript = `
<script>
document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.icard');
  const grid = document.querySelector('.insights__grid');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('filter-btn--active'));
      btn.classList.add('filter-btn--active');

      const filter = btn.getAttribute('data-filter');

      // Animate out
      cards.forEach(card => {
        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        card.style.opacity = '0';
        card.style.transform = 'translateY(10px)';
      });

      setTimeout(() => {
        let visibleCount = 0;
        cards.forEach(card => {
          if (filter === 'all' || card.getAttribute('data-category') === filter) {
            card.style.display = 'flex'; // or whatever the default display is, usually flex for icard
            
            // Fix borders for grid layout based on visible position
            card.style.borderTop = visibleCount >= 3 ? '1px solid var(--rule)' : 'none';
            card.style.borderRight = (visibleCount % 3 === 2) ? 'none' : '1px solid var(--rule)';
            
            visibleCount++;
          } else {
            card.style.display = 'none';
          }
        });

        // Reflow grid
        setTimeout(() => {
          cards.forEach(card => {
            if (card.style.display !== 'none') {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }
          });
        }, 50);
      }, 300);
    });
  });
});
</script>
`;

if (!html.includes('const filterBtns')) {
  html = html.replace('</body></html>', filterScript + '\\n</body></html>');
}

fs.writeFileSync('insights.html', html);
console.log("updated");
