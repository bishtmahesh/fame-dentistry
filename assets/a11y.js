/* Accessibility helpers (WCAG 2.1 AA): menu/dropdown state, keyboard support, decorative icons */
(function () {
  'use strict';

  // Mobile menu: keep aria-expanded / label in sync, close on Escape
  var btn = document.getElementById('mobile-menu-btn');
  var menu = document.getElementById('mobile-menu-dropdown');
  if (btn && menu) {
    var sync = function () {
      var open = menu.classList.contains('menu-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    new MutationObserver(sync).observe(menu, { attributes: true, attributeFilter: ['class'] });
    sync();
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('menu-open')) {
        menu.classList.remove('menu-open');
        btn.focus();
      }
    });
  }

  // Decorative SVG icons are hidden from assistive tech unless they carry their own name
  document.querySelectorAll('svg:not([aria-label]):not([aria-labelledby]):not([role])').forEach(function (svg) {
    if (!svg.querySelector('title')) {
      svg.setAttribute('aria-hidden', 'true');
      svg.setAttribute('focusable', 'false');
    }
  });

  // Custom select (enquiry form): full keyboard support + aria-expanded
  document.querySelectorAll('.custom-select-wrapper').forEach(function (wrap) {
    var trigger = wrap.querySelector('#custom-select-trigger');
    var list = wrap.querySelector('#custom-select-options');
    if (!trigger || !list) return;
    var options = Array.prototype.slice.call(list.querySelectorAll('.custom-option'));
    var isOpen = function () { return !list.classList.contains('hidden'); };
    var syncExpanded = function () {
      trigger.setAttribute('aria-expanded', isOpen() ? 'true' : 'false');
      options.forEach(function (o) {
        o.setAttribute('aria-selected', o.classList.contains('selected') ? 'true' : 'false');
      });
    };
    new MutationObserver(syncExpanded).observe(list, { attributes: true, attributeFilter: ['class'] });
    options.forEach(function (o) {
      new MutationObserver(syncExpanded).observe(o, { attributes: true, attributeFilter: ['class'] });
    });
    syncExpanded();

    var focusOption = function (i) {
      i = Math.max(0, Math.min(options.length - 1, i));
      options[i].focus();
    };
    var close = function () {
      if (isOpen()) trigger.click();
      trigger.focus();
    };
    trigger.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        if (!isOpen()) trigger.click();
        var sel = options.findIndex(function (o) { return o.classList.contains('selected'); });
        focusOption(sel < 0 ? 0 : sel);
      } else if (e.key === 'Escape' && isOpen()) {
        e.preventDefault();
        close();
      }
    });
    options.forEach(function (o, i) {
      o.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowDown') { e.preventDefault(); focusOption(i + 1); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); focusOption(i - 1); }
        else if (e.key === 'Home') { e.preventDefault(); focusOption(0); }
        else if (e.key === 'End') { e.preventDefault(); focusOption(options.length - 1); }
        else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); o.click(); trigger.focus(); }
        else if (e.key === 'Escape') { e.preventDefault(); close(); }
        else if (e.key === 'Tab') { if (isOpen()) trigger.click(); }
      });
    });
  });
})();
