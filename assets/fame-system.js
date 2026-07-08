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

// Text and Typewriter setup
(function () {
  // Setup word-by-word text reveal
  document.querySelectorAll('.text-reveal').forEach(function(el) {
    var words = el.textContent.trim().split(/\s+/);
    el.textContent = '';
    words.forEach(function(word, i) {
      var outer = document.createElement('span');
      outer.className = 'word';
      var inner = document.createElement('span');
      inner.className = 'word-inner';
      inner.textContent = word + ' ';
      inner.style.transitionDelay = (i * 0.03) + 's';
      outer.appendChild(inner);
      el.appendChild(outer);
      // Add a trailing space node outside the word-inner to allow standard text wrapping
      el.appendChild(document.createTextNode(' '));
    });
  });

  // Setup character-by-character typewriter
  document.querySelectorAll('.typewriter').forEach(function(el) {
    var text = el.textContent.trim();
    el.textContent = '';
    for (var i = 0; i < text.length; i++) {
      var span = document.createElement('span');
      span.textContent = text[i];
      span.className = 'char';
      span.style.transitionDelay = (i * 0.04) + 's';
      el.appendChild(span);
    }
  });
  // Setup counters
  document.querySelectorAll('.counter').forEach(function(el) {
    var target = parseInt(el.textContent.replace(/[^0-9]/g, ''), 10);
    if (!isNaN(target)) {
      el.dataset.target = target;
      el.dataset.suffix = el.textContent.replace(/[0-9]/g, '');
      el.textContent = '0' + el.dataset.suffix;
    }
  });
})();

// Scroll logic for Glassmorphism header and scroll animations
(function () {
  var header = document.getElementById('site-header');
  var goldClass = 'border-[var(--color--gold,#c9a96e)]';
  var lastY = window.scrollY;
  
  // Use modern IntersectionObserver for all animations
  var observerOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0
  };
  
  var observer = new IntersectionObserver(function(entries, obs) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        
        // Counter animation logic
        if (entry.target.classList.contains('counter') && entry.target.dataset.target) {
           var target = parseInt(entry.target.dataset.target, 10);
           var suffix = entry.target.dataset.suffix || '';
           var current = 0;
           var duration = 1500;
           var stepTime = Math.max(duration / target, 20); // cap framerate
           var step = Math.max(Math.ceil(target / (duration / stepTime)), 1);
           var timer = setInterval(function() {
             current += step;
             if (current >= target) {
               current = target;
               clearInterval(timer);
             }
             entry.target.textContent = current + suffix;
           }, stepTime);
        }
        
        obs.unobserve(entry.target); // Play once
      }
    });
  }, observerOptions);

  // Elements to observe
  var animElements = document.querySelectorAll('.scroll-reveal, .typewriter, .text-reveal, .reveal-scale, .counter');
  animElements.forEach(function(el) {
    observer.observe(el);
  });
  
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
    
    lastY = y;
  }
  
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

