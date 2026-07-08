// Scale the fixed 1440px design to fit the viewport (like Figma "fit to screen").
// Only active on desktop screens (>= 1024px) to retain the luxury lookbook fit-to-screen zoom.
// For smaller screens (< 1024px), standard fluid responsive media queries stack the elements comfortably.
(function () {
  var page = document.getElementById('page');
  if (!page) return;
  
  function fitToViewport() {
    var width = window.innerWidth;
    if (width >= 1024) {
      var scale = Math.min(1, width / 1440);
      page.style.width = '1440px';
      
      if ('zoom' in document.documentElement.style) {
        page.style.zoom = scale;
        page.style.transform = '';
        page.style.transformOrigin = '';
        page.style.marginBottom = '';
      } else {
        page.style.transform = 'scale(' + scale + ')';
        page.style.transformOrigin = 'top center';
        page.style.marginBottom = -page.offsetHeight * (1 - scale) + 'px';
      }
    } else {
      // Reset zoom and scale on tablet/mobile screens to allow fluid vertical stacking
      page.style.zoom = '';
      page.style.transform = '';
      page.style.transformOrigin = '';
      page.style.marginBottom = '';
      page.style.width = '100%';
    }
  }
  fitToViewport();
  window.addEventListener('resize', fitToViewport, { passive: true });
})();

// Auto-grow the notes textarea so text is never cropped and no scrollbar appears.
(function () {
  var notes = document.getElementById('input-notes');
  if (!notes) return;
  function grow() {
    notes.style.height = 'auto';
    notes.style.height = notes.scrollHeight + 'px';
  }
  notes.addEventListener('input', grow);
  window.addEventListener('load', grow);
})();

// Scroll logic for Glassmorphism header and scroll reveal animations
(function () {
  var header = document.getElementById('site-header');
  var goldClass = 'border-[var(--color--gold,#c9a96e)]';
  var lastY = window.scrollY;
  
  // Initialize scroll reveals
  var reveals = document.querySelectorAll('.scroll-reveal');
  
  function onScroll() {
    var y = window.scrollY;
    
    // Dynamic Glassmorphism toggle
    if (header) {
      if (y > 20) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }
      
      var scrollingUp = y < lastY;
      // Show the gold line only while scrolling up (and not at the very top)
      if (scrollingUp && y > 10) {
        header.classList.remove('border-transparent');
        header.classList.add(goldClass);
      } else {
        header.classList.remove(goldClass);
        header.classList.add('border-transparent');
      }
    }
    
    // Scroll reveals
    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 80;
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      }
    }
    
    lastY = y;
  }
  
  window.addEventListener('scroll', onScroll, { passive: true });
  // Initial check for reveals on page load
  onScroll();
})();
