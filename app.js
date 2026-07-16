/**
 * FAME DENTISTRY — Interactive Scripting Engine
 * Controls custom components, luxury form interactions, toast alerts, and entrance animations.
 * Safe for use on both standard and modern layout variants.
 */

document.addEventListener('DOMContentLoaded', () => {
  
  /* ==========================================================================
     1. Scroll Reveal Engine (IntersectionObserver)
     ========================================================================== */
  const revealElements = document.querySelectorAll('.scroll-reveal');
  
  if (revealElements.length > 0) {
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
  }

  /* ==========================================================================
     2. Custom Dropdown Select Component
     Handled by assets/fame-system.js (initCustomSelect) to avoid two scripts
     fighting over the same 'open' class on #custom-select-wrapper-block.
     ========================================================================== */

  // Pre-select dentist referral when dentist CTAs are clicked
  const selectDentistReferral = (e) => {
    if (e) e.preventDefault(); // Prevent default instant jump
    const dentistOption = document.querySelector('.custom-option[data-value="dentist-referral"]');
    if (dentistOption) {
      dentistOption.click();
    }
    const formSection = document.getElementById('form-container-block');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const forDentistsCta = document.getElementById('cta-for-dentists-sticky');
  const forDentistsCtaDesktop = document.getElementById('cta-for-dentists');
  const footerCtaRefer = document.getElementById('footer-cta-refer');
  
  const enquireStickyCta = document.getElementById('btn-enquire-sticky');
  const enquireDesktopCta = document.getElementById('btn-enquire');
  
  if (forDentistsCta) forDentistsCta.addEventListener('click', selectDentistReferral);
  if (forDentistsCtaDesktop) forDentistsCtaDesktop.addEventListener('click', selectDentistReferral);
  if (footerCtaRefer) footerCtaRefer.addEventListener('click', selectDentistReferral);

  const handleEnquireClick = (e) => {
    e.preventDefault();
    const formSection = document.getElementById('form-container-block');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (enquireStickyCta) enquireStickyCta.addEventListener('click', handleEnquireClick);
  if (enquireDesktopCta) enquireDesktopCta.addEventListener('click', handleEnquireClick);

  /* ==========================================================================
     3. Smooth Form Label Float and Validation Engine (Hims/Ro style)
     ========================================================================== */
  const fameForm = document.getElementById('fame-enquiry-form');
  const nameInput = document.getElementById('input-name') || document.getElementById('name');
  const emailInput = document.getElementById('input-email') || document.getElementById('email');
  
  // Floating inputs active states toggle
  const inputs = document.querySelectorAll('.form-input');
  inputs.forEach(input => {
    const parent = input.closest('.form-field-group');
    if (parent) {
      if (input.value !== '') {
        parent.classList.add('focused');
      }
      
      input.addEventListener('focus', () => {
        parent.classList.add('focused');
      });
      
      input.addEventListener('blur', () => {
        if (input.value === '') {
          parent.classList.remove('focused');
        }
        // Real-time blur validation
        validateField(input);
      });
    }
  });

  // Core field validation logic
  function validateField(input) {
    if (!input) return true;
    const parent = input.closest('.form-field-group');
    if (!parent) return true;
    
    if (input.id === 'input-name' || input.id === 'name') {
      if (input.value.trim() === '') {
        parent.classList.add('error');
        return false;
      } else {
        parent.classList.remove('error');
        return true;
      }
    }
    
    if (input.id === 'input-email' || input.id === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (input.value.trim() === '' || !emailRegex.test(input.value)) {
        parent.classList.add('error');
        return false;
      } else {
        parent.classList.remove('error');
        return true;
      }
    }
    
    return true;
  }

  // Validate dropdown select
  function validateDropdown() {
    if (!realSelect || !fieldGroupInterest) return true;
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
    if (!successToast) return;
    if (toastTimer) clearTimeout(toastTimer);
    successToast.classList.add('show');
    toastTimer = setTimeout(() => {
      hideToast();
    }, 6000);
  }
  
  function hideToast() {
    if (successToast) successToast.classList.remove('show');
  }
  
  if (toastCloseBtn) toastCloseBtn.addEventListener('click', hideToast);

  /* ==========================================================================
     5. Form Submission Event (Only for modern layouts using #fame-enquiry-form)
     ========================================================================== */
  if (fameForm) {
    fameForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const isDropdownValid = validateDropdown();
      const isNameValid = validateField(nameInput);
      const isEmailValid = validateField(emailInput);
      
      if (isDropdownValid && isNameValid && isEmailValid) {
        showToast();
        fameForm.reset();
        
        if (triggerText) {
          triggerText.textContent = 'Select one';
          triggerText.style.opacity = '0.45';
        }
        if (customOptionsContainer) {
          customOptions.forEach(opt => opt.classList.remove('selected'));
          const defaultOpt = customOptionsContainer.querySelector('[data-value=""]');
          if (defaultOpt) defaultOpt.classList.add('selected');
        }
        
        inputs.forEach(input => {
          const parent = input.closest('.form-field-group');
          if (parent) parent.classList.remove('focused');
        });
        
        console.log('Fame Dentistry: Luxury enquiry successfully submitted.');
      } else {
        const firstError = document.querySelector('.form-field-group.error');
        if (firstError) {
          const errInput = firstError.querySelector('.form-input');
          if (errInput) {
            errInput.focus();
          } else if (firstError.id === 'field-group-interest' && customTrigger) {
            customTrigger.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      }
    });
  }

  /* ==========================================================================
     6. Shimmering Gold Scroll Progress Indicator (Coutts style)
     ========================================================================== */
  const progressBar = document.getElementById('scroll-progress-bar');
  
  if (progressBar) {
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
  }

  /* ==========================================================================
     7. Dynamic Sticky Bottom CTA Bar Auto-Hide on Scroll
     ========================================================================== */
  const stickyBar = document.getElementById('sticky-bottom-bar');
  const formBlock = document.getElementById('form-container-block');
  
  if (stickyBar && formBlock) {
    let scrollTimeout = null;
    
    const handleScroll = () => {
      stickyBar.classList.add('translate-y-[120%]');
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      scrollTimeout = setTimeout(() => {
        const formRect = formBlock.getBoundingClientRect();
        const isFormVisible = formRect.top < window.innerHeight && formRect.bottom > 0;
        if (!isFormVisible) {
          stickyBar.classList.remove('translate-y-[120%]');
        }
      }, 250);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
  }

});
