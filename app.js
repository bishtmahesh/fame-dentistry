/**
 * FAME DENTISTRY — Interactive Scripting Engine
 * Controls custom components, luxury form interactions, toast alerts, and entrance animations.
 */

document.addEventListener('DOMContentLoaded', () => {
  
  /* ==========================================================================
     1. Scroll Reveal Engine (IntersectionObserver)
     ========================================================================== */
  const revealElements = document.querySelectorAll('.scroll-reveal');
  
  revealElements.forEach(el => {
    const processNode = (node) => {
      if (node.nodeType === 3) {
        return node.textContent
          .split(" ")
          .filter(word => word.trim() !== "")
          .map(word => `<span class="word"><span class="word-inner">${word}</span></span>`)
          .join(" ");
      }
      if (node.nodeType === 1 && node.classList.contains("highlight")) {
        return `<span class="highlight">${node.textContent
          .split(" ")
          .filter(word => word.trim() !== "")
          .map(word => `<span class="word"><span class="word-inner">${word}</span></span>`)
          .join(" ")}</span>`;
      }
      return node.outerHTML;
    };
    
    // Check if the element contains any direct text nodes with actual text, or a highlight node
    let hasTextToWrap = false;
    Array.from(el.childNodes).forEach(node => {
      if ((node.nodeType === 3 && node.textContent.trim() !== "") || (node.nodeType === 1 && node.classList.contains("highlight"))) {
        hasTextToWrap = true;
      }
    });

    if (hasTextToWrap) {
      const html = Array.from(el.childNodes).map(processNode).join(" ");
      el.innerHTML = html;
      const words = el.querySelectorAll(".word-inner");
      words.forEach((word, index) => {
        word.style.transitionDelay = `${index * 0.04}s`;
      });
      el.classList.add("has-word-reveal");
    }
  });

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Reveal once
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('active'));
  }

  /* ==========================================================================
     2. Custom Dropdown Select Component (Apothecary style)
     ========================================================================== */
  const customSelectWrapper = document.getElementById('custom-select-wrapper-block');
  if (customSelectWrapper) {
    const customTrigger = document.getElementById('custom-select-trigger');
    const triggerText = customTrigger ? customTrigger.querySelector('.custom-select-trigger-text') : null;
    const customOptionsContainer = document.getElementById('custom-select-options');
    const customOptions = customOptionsContainer ? customOptionsContainer.querySelectorAll('.custom-option') : [];
    const realSelect = document.getElementById('real-select-interest');
    const fieldGroupInterest = document.getElementById('field-group-interest');
    
    if (customTrigger && triggerText && customOptions.length > 0 && realSelect && fieldGroupInterest) {
      // Toggle Options Menu
      customTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const isOpen = customSelectWrapper.classList.toggle('open');
        if (isOpen) {
          fieldGroupInterest.classList.add('focused-select');
        } else {
          fieldGroupInterest.classList.remove('focused-select');
        }
      });

      // Handle Option Selection
      customOptions.forEach(option => {
        option.addEventListener('mousedown', (e) => {
          e.preventDefault(); // Prevent blur of other elements
        });
        option.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const val = option.getAttribute('data-value');
          const text = option.textContent;
          
          // Update hidden native select
          realSelect.value = val;
          
          // Update custom trigger label
          triggerText.textContent = text;
          
          // Toggle placeholder vs. selected styling so a chosen value matches
          // the other inputs' filled colour (ink-navy), not the muted placeholder grey.
          if (val === '') {
            triggerText.style.opacity = '0.45'; // back to placeholder look
            triggerText.style.color = '';       // revert to subtle grey class
          } else {
            triggerText.style.opacity = '1';
            triggerText.style.color = '#1a2233'; // ink-navy, same as filled inputs
            // Clear error if a valid option is selected
            fieldGroupInterest.classList.remove('error');
          }
          
          // Toggle selected class among list
          customOptions.forEach(opt => opt.classList.remove('selected'));
          option.classList.add('selected');
          
          // Close dropdown
          customSelectWrapper.classList.remove('open');
          fieldGroupInterest.classList.remove('focused-select');
        });
      });

      // Close dropdown on outside click
      document.addEventListener('click', () => {
        customSelectWrapper.classList.remove('open');
        fieldGroupInterest.classList.remove('focused-select');
      });
    }
  }

  // "Refer a patient" / "For Dentists" CTAs: pre-select the dentist-referral
  // option, then let the native anchor (href="#form-container-block") do the
  // scroll — that respects the desktop zoom, unlike scrollIntoView.
  const selectDentistReferral = () => {
    const dentistOption = document.querySelector('.custom-option[data-value="dentist-referral"]');
    if (dentistOption) {
      dentistOption.click();
    }
    // No preventDefault and no scrollIntoView — the <a href="#form-container-block">
    // handles the smooth scroll natively and reliably.
  };

  ['cta-for-dentists-sticky', 'cta-for-dentists', 'footer-cta-refer'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('click', selectDentistReferral);
  });

  // Plain "Enquire" CTAs simply scroll to the form via their native anchor —
  // no JS needed (the href + CSS smooth scroll handle it under any zoom level).

  // On MOBILE only, send every form-bound CTA straight to the form fields
  // (the form container), not the section heading above it. On desktop the
  // native anchor (#form-container-block, the whole section) is left alone.
  const formAnchor = document.getElementById('enquiry-form-anchor');
  const MOBILE_MAX = 1023; // below Tailwind's lg breakpoint
  document.querySelectorAll('a[href="#form-container-block"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      if (formAnchor && window.innerWidth <= MOBILE_MAX) {
        e.preventDefault();
        formAnchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ==========================================================================
     3. Smooth Form Label Float and Validation Engine (Hims/Ro style)
     ========================================================================== */
  const form = document.getElementById('fame-enquiry-form');
  const nameInput = document.getElementById('input-name');
  const emailInput = document.getElementById('input-email');
  const phoneInput = document.getElementById('input-phone');
  const notesInput = document.getElementById('input-notes');
  
  const fieldGroupName = document.getElementById('field-group-name');
  const fieldGroupEmail = document.getElementById('field-group-email');
  const fieldGroupPhone = document.getElementById('field-group-phone');
  const fieldGroupNotes = document.getElementById('field-group-notes');
  
  // Floating inputs active states toggle
  const inputs = document.querySelectorAll('.form-input');
  inputs.forEach(input => {
    // If input is pre-filled
    if (input.value !== '') {
      input.closest('.form-field-group').classList.add('focused');
    }
    
    input.addEventListener('focus', () => {
      input.closest('.form-field-group').classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
      if (input.value === '') {
        input.closest('.form-field-group').classList.remove('focused');
      }
      // Real-time blur validation
      validateField(input);
    });
  });

  // Core field validation logic
  function validateField(input) {
    const parent = input.closest('.form-field-group');
    if (!parent) return true;
    
    if (input.id === 'input-name') {
      if (input.value.trim() === '') {
        parent.classList.add('error');
        return false;
      } else {
        parent.classList.remove('error');
        return true;
      }
    }
    
    if (input.id === 'input-email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (input.value.trim() === '' || !emailRegex.test(input.value)) {
        parent.classList.add('error');
        return false;
      } else {
        parent.classList.remove('error');
        return true;
      }
    }
    
    if (input.id === 'input-phone') {
      if (input.value.trim() === '') {
        parent.classList.add('error');
        return false;
      } else {
        parent.classList.remove('error');
        return true;
      }
    }
    
    if (input.id === 'input-notes') {
      // Optional field — never blocks submission (empty is fine).
      // Length is hard-capped at 100 via the maxlength attribute.
      parent.classList.remove('error');
      return true;
    }
    
    return true;
  }

  // Validate dropdown select
  function validateDropdown() {
    if (realSelect.value === '') {
      fieldGroupInterest.classList.add('error');
      return false;
    } else {
      fieldGroupInterest.classList.remove('error');
      return true;
    }
  }

  /* ==========================================================================
     4. Toast Success Notification System
     ========================================================================== */
  const successToast = document.getElementById('toast-success');
  const toastCloseBtn = document.getElementById('toast-close-btn');
  let toastTimer = null;
  
  function showToast() {
    // Clear any active timers
    if (toastTimer) clearTimeout(toastTimer);
    
    successToast.classList.add('show');
    
    // Auto-hide toast after 6 seconds
    toastTimer = setTimeout(() => {
      hideToast();
    }, 6000);
  }
  
  function hideToast() {
    successToast.classList.remove('show');
  }
  
  toastCloseBtn.addEventListener('click', hideToast);

  /* ==========================================================================
     5. Form Submission Event
     ========================================================================== */
  const submitBtn = document.getElementById('btn-submit-enquiry');
  const submitLabel = submitBtn ? submitBtn.querySelector('span') : null;

  // Inline error message element (created lazily, sits just above the submit button)
  function showFormError(message) {
    let errEl = document.getElementById('form-error-msg');
    if (!errEl) {
      errEl = document.createElement('p');
      errEl.id = 'form-error-msg';
      errEl.setAttribute('role', 'alert');
      errEl.className = 'font-inter text-[14px] w-full';
      errEl.style.color = '#a83c3c';
      if (submitBtn && submitBtn.parentNode) {
        submitBtn.parentNode.insertBefore(errEl, submitBtn);
      }
    }
    errEl.textContent = message;
    errEl.style.display = 'block';
  }
  function clearFormError() {
    const errEl = document.getElementById('form-error-msg');
    if (errEl) errEl.style.display = 'none';
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Trigger all validations
    const isDropdownValid = validateDropdown();
    const isNameValid = validateField(nameInput);
    const isEmailValid = validateField(emailInput);
    const isPhoneValid = validateField(phoneInput);
    const isNotesValid = validateField(notesInput);

    if (!(isDropdownValid && isNameValid && isEmailValid && isPhoneValid && isNotesValid)) {
      // Focus first error field for accessibility
      const firstError = document.querySelector('.form-field-group.error');
      if (firstError) {
        const errInput = firstError.querySelector('.form-input');
        if (errInput) {
          errInput.focus();
        } else if (firstError.id === 'field-group-interest') {
          customTrigger.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
      return;
    }

    // Valid — send to the serverless endpoint.
    clearFormError();
    const originalLabel = submitLabel ? submitLabel.textContent : '';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.6';
      submitBtn.style.cursor = 'wait';
    }
    if (submitLabel) submitLabel.textContent = 'Sending…';

    const payload = {
      interest: realSelect ? realSelect.value : '',
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      phone: phoneInput.value.trim(),
      notes: notesInput.value.trim(),
      company: (document.getElementById('input-company') || {}).value || '', // honeypot
    };

    try {
      const resp = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!resp.ok) {
        let msg = 'Something went wrong. Please try again or email hello@famedentistry.co.uk.';
        try { const data = await resp.json(); if (data && data.error) msg = data.error; } catch (_) {}
        throw new Error(msg);
      }

      // Success — reveal the in-place success overlay with the animated tick.
      const successOverlay = document.getElementById('form-success-overlay');
      if (successOverlay) {
        successOverlay.classList.remove('show');
        void successOverlay.offsetWidth; // reflow to replay CSS animations
        successOverlay.classList.add('show');
        successOverlay.setAttribute('aria-hidden', 'false');
      }
    } catch (err) {
      showFormError(err && err.message ? err.message : 'Something went wrong. Please try again.');
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.style.opacity = '';
        submitBtn.style.cursor = '';
      }
      if (submitLabel) submitLabel.textContent = originalLabel || 'Begin an enquiry';
    }
  });

  /* ==========================================================================
     6. Magnetic Cursor Buttons Attraction Engine (Stripe style)
     ========================================================================== */
  // Magnetic button animation removed per design request — buttons stay static on hover.

  /* ==========================================================================
     7. Shimmering Gold Scroll Progress Indicator (Coutts style)
     ========================================================================== */
  const progressBar = document.getElementById('scroll-progress-bar');
  
  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    if (height > 0) {
      const scrolled = (winScroll / height) * 100;
      progressBar.style.width = scrolled + '%';
    } else {
      progressBar.style.width = '0%';
    }
  });

  /* ==========================================================================
     8. Dynamic Sticky Bottom CTA Bar Auto-Hide on Scroll
     ========================================================================== */
  const stickyBar = document.getElementById('sticky-bottom-bar');
  const formBlock = document.getElementById('form-container-block');
  
  if (stickyBar && formBlock) {
    let scrollTimeout = null;
    
    const handleScroll = () => {
      // Hide the bar immediately while the user is actively scrolling (up or down).
      stickyBar.classList.add('bar-hidden');

      // Reset the "scroll stopped" timer on every scroll tick.
      if (scrollTimeout) clearTimeout(scrollTimeout);

      // Once scrolling pauses for ~180ms, bring the bar back — but only while
      // the enquiry form itself isn't already on screen.
      scrollTimeout = setTimeout(() => {
        const formRect = formBlock.getBoundingClientRect();
        const isFormVisible = formRect.top < window.innerHeight && formRect.bottom > 0;
        if (!isFormVisible) {
          stickyBar.classList.remove('bar-hidden');
        }
      }, 180);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  /* ==========================================================================
     9. Premium Animation Layer — Apple × Stripe × Editorial Luxury
     ========================================================================== */

  // 9a. Word-by-word staggered reveal — hero title + every section heading.
  (function () {
    const headings = [
      document.querySelector('[data-name="hero-layout"] h1'),
      ...document.querySelectorAll('h2.font-prata, h3.font-prata, blockquote.scroll-reveal')
    ].filter(Boolean);

    headings.forEach((heading) => {
      // Split innerHTML into HTML tags (group 1) | plain text (group 2).
      // Only wrap words inside text nodes — never touch tag attributes.
      const rawHTML = heading.innerHTML;
      const wordWrapped = rawHTML.replace(/(<[^>]+>)|([^<]+)/g, (match, tag, text) => {
        if (tag) return tag; // leave HTML tags (spans, <br>) unchanged
        if (text) return text.replace(/(\S+)/g, '<span class="hero-word">$1</span>');
        return match;
      });
      heading.innerHTML = wordWrapped;

      const words = heading.querySelectorAll('.hero-word');
      const wordObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            words.forEach((word, i) => {
              setTimeout(() => word.classList.add('visible'), i * 55);
            });
            wordObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
      wordObserver.observe(heading);
    });
  })();

  // 9a-ii. Success "Submit another enquiry" CTA — refresh the screen.
  (function () {
    const refreshBtn = document.getElementById('btn-success-refresh');
    if (!refreshBtn) return;
    refreshBtn.addEventListener('click', () => {
      window.location.reload();
    });
  })();

  // 9b. Hero image — fixed position with a slow continuous zoom in/out.
  //     The drift/parallax was removed; the zoom is handled purely in CSS
  //     (@keyframes heroZoom) so the image stays centred and never floats.

  // 9c. Eyebrow label curtain-unmask on scroll entry
  (function () {
    const eyebrows = document.querySelectorAll('[data-name="index-row"] p:first-child');
    eyebrows.forEach(el => el.classList.add('eyebrow-line-reveal'));

    if (!('IntersectionObserver' in window)) {
      eyebrows.forEach(el => el.classList.add('unmasked'));
      return;
    }

    const eyebrowObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('unmasked'), 120);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    eyebrows.forEach(el => eyebrowObserver.observe(el));
  })();

  // 9d. Gold section divider line draw-in
  (function () {
    const dividers = document.querySelectorAll('[data-name="index-row"]');
    dividers.forEach(el => el.classList.add('gold-divider-reveal'));

    if (!('IntersectionObserver' in window)) {
      dividers.forEach(el => el.classList.add('drawn'));
      return;
    }

    const dividerObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('drawn'), 80);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    dividers.forEach(el => dividerObserver.observe(el));
  })();

  // 9e. Sticky bar bounce-in on first appearance
  (function () {
    const bar = document.getElementById('sticky-bottom-bar');
    if (!bar) return;
    let bounced = false;

    const bounceObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting && !bounced) {
          bounced = true;
          bar.classList.add('bounce-in');
          bar.addEventListener('animationend', () => bar.classList.remove('bounce-in'), { once: true });
          bounceObserver.disconnect();
        }
      });
    }, { threshold: 0.5 });

    const formSection = document.getElementById('form-container-block');
    if (formSection) bounceObserver.observe(formSection);
  })();

});
