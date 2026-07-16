/**
 * FAME DENTISTRY — Interactive Scripting Engine
 * Controls custom components, luxury form interactions, toast alerts, and entrance animations.
 */

document.addEventListener('DOMContentLoaded', () => {
  
  /* ==========================================================================
     1. Scroll Reveal Engine (IntersectionObserver)
     ========================================================================== */
  const revealElements = document.querySelectorAll('.scroll-reveal');
  
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
  const customTrigger = document.getElementById('custom-select-trigger');
  const triggerText = customTrigger.querySelector('.custom-select-trigger-text');
  const customOptionsContainer = document.getElementById('custom-select-options');
  const customOptions = customOptionsContainer.querySelectorAll('.custom-option');
  const realSelect = document.getElementById('real-select-interest');
  const fieldGroupInterest = document.getElementById('field-group-interest');
  
  // Toggle Options Menu
  customTrigger.addEventListener('click', (e) => {
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
    option.addEventListener('click', (e) => {
      e.stopPropagation();
      const val = option.getAttribute('data-value');
      const text = option.textContent;
      
      // Update hidden native select
      realSelect.value = val;
      
      // Update custom trigger label
      triggerText.textContent = text;
      
      // Toggle placeholder styling opacity
      if (val === '') {
        triggerText.style.opacity = '0.45'; // keep original placeholder opacity
      } else {
        triggerText.style.opacity = '1';
        // Clear error if selected valid option
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

  /* ==========================================================================
     3. Smooth Form Label Float and Validation Engine (Hims/Ro style)
     ========================================================================== */
  const form = document.getElementById('fame-enquiry-form');
  const nameInput = document.getElementById('input-name');
  const emailInput = document.getElementById('input-email');
  
  const fieldGroupName = document.getElementById('field-group-name');
  const fieldGroupEmail = document.getElementById('field-group-email');
  
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
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Trigger all validations
    const isDropdownValid = validateDropdown();
    const isNameValid = validateField(nameInput);
    const isEmailValid = validateField(emailInput);
    
    if (isDropdownValid && isNameValid && isEmailValid) {
      // Form values are valid! Show Toast success
      showToast();
      
      // Reset form fields
      form.reset();
      
      // Reset custom select trigger display
      triggerText.textContent = 'Select one';
      triggerText.style.opacity = '0.45';
      customOptions.forEach(opt => opt.classList.remove('selected'));
      customOptionsContainer.querySelector('[data-value=""]').classList.add('selected');
      
      // Reset focused class on inputs
      inputs.forEach(input => {
        input.closest('.form-field-group').classList.remove('focused');
      });
      
      console.log('Fame Dentistry: Luxury enquiry successfully submitted.');
    } else {
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
    }
  });

  /* ==========================================================================
     6. Magnetic Cursor Buttons Attraction Engine (Stripe style)
     ========================================================================== */
  const magneticButtons = document.querySelectorAll('.btn-navy, .btn-outline');
  
  magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Pull button 35% towards cursor coordinates
      btn.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
      // Snap back smoothly using CSS transition
      btn.style.transform = '';
    });
  });

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

});
