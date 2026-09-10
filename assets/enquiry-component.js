// Shared global enquiry component. Edit this file once — every page that
// includes it (via <div class="contact-wrap" data-enquiry-component></div>
// + <script src="assets/enquiry-component.js"></script>) updates automatically.
// Not used on for-dentists.html (separate referral form) or book-request.html
// (separate postal-request form) — those keep their own dedicated markup.
(function () {
  var HTML = [
    '<div class="scroll-reveal contact-img">',
    '  <img src="assets/fame-exterior-now-open.webp" alt="FAME Dentistry practice entrance, Glasgow" onerror="this.style.background=\'#2a3447\'">',
    '  <div class="contact-img__overlay">',
    '    <h2 class="contact-img__heading">Accepting New Patients</h2>',
    '    <p class="contact-img__sub">Share a few details below. You\'ll hear back from a real person. Never an automated reply.</p>',
    '    <div style="margin-top:20px;padding:16px 18px;background:rgba(26,34,51,0.8);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);border-radius:4px;border:1px solid rgba(248,246,242,0.18);">',
    '      <p style="font-family:\'Inter\',sans-serif;font-size:11px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:#C9A96E;margin-bottom:12px;">Visit &amp; Contact</p>',
    '      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px 20px;">',
    '        <a href="https://maps.google.com/?q=373+Scotland+St,+Glasgow+G5+8QB" target="_blank" rel="noopener noreferrer" style="display:flex;align-items:center;gap:8px;font-family:\'Inter\',sans-serif;font-size:13px;line-height:1.4;color:rgba(248,246,242,0.9);text-decoration:none;white-space:nowrap;">',
    '          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>',
    '          <span>373 Scotland St, Kinning Park, Glasgow G5 8QB</span>',
    '        </a>',
    '        <a href="tel:+441414877770" style="display:flex;align-items:center;gap:8px;font-family:\'Inter\',sans-serif;font-size:13px;color:rgba(248,246,242,0.9);text-decoration:none;white-space:nowrap;">',
    '          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>',
    '          +44 141 487 7770',
    '        </a>',
    '      </div>',
    '      <div style="margin-top:12px;padding-top:12px;border-top:1px solid rgba(248,246,242,0.18);font-family:\'Inter\',sans-serif;font-size:12px;line-height:1.7;color:rgba(248,246,242,0.9);">',
    '        <span style="display:block">Mon, Wed &amp; Thu: 8:30 am–6 pm</span>',
    '        <span style="display:block">Tuesday: 8:30 am–7 pm</span>',
    '        <span style="display:block">Friday: 8:30 am–5 pm</span>',
    '        <span style="display:block">Sat &amp; Sun: Closed</span>',
    '      </div>',
    '    </div>',
    '  </div>',
    '</div>',
    '<div class="scroll-reveal delay-200 contact-form-panel">',
    '  <div class="contact-form-panel__eyebrow typewriter">Enquiry form</div>',
    '  <h2 class="contact-form-panel__title">Begin Your Enquiry</h2>',
    '  <p class="contact-form-panel__sub">A real person reads every enquiry before responding. Usually within two hours during business hours.</p>',
    '  <form class="form" id="enquiry-form">',
    '    <div class="form__field form-field-group" id="field-group-interest">',
    '      <label class="form__label" for="enquiry-type">What brings you to FAME? <span style="font-weight:400;text-transform:none;letter-spacing:0">(select one)</span></label>',
    '      <div class="custom-select-wrapper w-full relative" id="custom-select-wrapper-block">',
    '        <div class="border-b border-[#C9A96E] border-solid flex items-center justify-between pb-[12px] pt-[10px] w-full cursor-pointer" id="custom-select-trigger">',
    '          <span class="custom-select-trigger-text font-inter text-[16px] md:text-[18px] text-[#1A2233] whitespace-nowrap">Select one</span>',
    '          <svg class="custom-select-arrow block w-[16px] h-[16px] transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>',
    '        </div>',
    '        <div class="custom-options absolute top-[100%] left-0 right-0 bg-[#F8F6F2] border border-[#C9A96E] z-50 py-2 mt-0 hidden" id="custom-select-options">',
    '          <div class="custom-option px-5 py-[14px] font-inter text-[14px] md:text-[16px] text-[#1A2233] hover:text-[#C9A96E] hover:bg-transparent cursor-pointer transition-colors selected" data-value="">Select one</div>',
    '          <div class="custom-option px-5 py-[14px] font-inter text-[14px] md:text-[16px] text-[#1A2233] hover:text-[#C9A96E] hover:bg-transparent cursor-pointer transition-colors" data-value="General Dentistry">General Dentistry</div>',
    '          <div class="custom-option px-5 py-[14px] font-inter text-[14px] md:text-[16px] text-[#1A2233] hover:text-[#C9A96E] hover:bg-transparent cursor-pointer transition-colors" data-value="Dental Implants">Dental Implants</div>',
    '          <div class="custom-option px-5 py-[14px] font-inter text-[14px] md:text-[16px] text-[#1A2233] hover:text-[#C9A96E] hover:bg-transparent cursor-pointer transition-colors" data-value="Cosmetic Dentistry">Cosmetic Dentistry</div>',
    '          <div class="custom-option px-5 py-[14px] font-inter text-[14px] md:text-[16px] text-[#1A2233] hover:text-[#C9A96E] hover:bg-transparent cursor-pointer transition-colors" data-value="Treatment Under Sedation">Treatment Under Sedation</div>',
    '          <div class="custom-option px-5 py-[14px] font-inter text-[14px] md:text-[16px] text-[#1A2233] hover:text-[#C9A96E] hover:bg-transparent cursor-pointer transition-colors" data-value="Hygiene">Hygiene</div>',
    '          <div class="custom-option px-5 py-[14px] font-inter text-[14px] md:text-[16px] text-[#1A2233] hover:text-[#C9A96E] hover:bg-transparent cursor-pointer transition-colors" data-value="Other / Custom Enquiry">Other / Custom Enquiry</div>',
    '        </div>',
    '      </div>',
    '      <select class="form__input form__select" id="enquiry-type" name="enquiry_type" required style="display:none">',
    '        <option value="">Select one</option>',
    '        <option value="General Dentistry">General Dentistry</option>',
    '        <option value="Dental Implants">Dental Implants</option>',
    '        <option value="Cosmetic Dentistry">Cosmetic Dentistry</option>',
    '        <option value="Treatment Under Sedation">Treatment Under Sedation</option>',
    '        <option value="Hygiene">Hygiene</option>',
    '        <option value="Other / Custom Enquiry">Other / Custom Enquiry</option>',
    '      </select>',
    '    </div>',
    '    <div class="form__field">',
    '      <label class="form__label" for="name">Your name</label>',
    '      <input class="form__input" type="text" id="name" name="name" placeholder="Full name" required>',
    '    </div>',
    '    <div class="form__row">',
    '      <div class="form__field">',
    '        <label class="form__label" for="email">Email address</label>',
    '        <input class="form__input" type="email" id="email" name="email" placeholder="your@email.com" required>',
    '      </div>',
    '      <div class="form__field">',
    '        <label class="form__label" for="phone">Phone number</label>',
    '        <input class="form__input" type="tel" id="phone" name="phone" placeholder="+44 7xxx xxxxxx" required>',
    '      </div>',
    '    </div>',
    '    <div class="form__field">',
    '      <label class="form__label" for="message">Anything else?</label>',
    '      <textarea class="form__input form__textarea" id="message" name="message" placeholder="Tell us about your situation: the more context, the better we can prepare…" required></textarea>',
    '    </div>',
    '    <label style="display:flex;align-items:flex-start;gap:10px;margin-bottom:2px;cursor:pointer;">',
    '      <input type="checkbox" checked required style="margin-top:3px;width:16px;height:16px;accent-color:var(--color-gold);flex-shrink:0;cursor:pointer;">',
    '      <span class="form__note" style="margin:0;">By submitting you agree to FAME Dentistry contacting you by phone and email. Your data is handled per our <a href="privacy-policy.html" style="color: inherit; text-decoration: underline;">Privacy Policy</a>. We never share your details.</span>',
    '    </label>',
    '    <button type="submit" class="form__submit">Begin an enquiry →</button>',
    '  </form>',
    '  <div class="success-panel" id="success-panel">',
    '    <span class="success-panel__mark">✓</span>',
    '    <h2 class="success-panel__title">Enquiry Registered</h2>',
    '    <p class="success-panel__body">Thank you. You\'ll hear back from a real person shortly, never an automated reply.<br><br><em style="font-family:var(--font-serif);font-size:17px;color:var(--color-stone)">FAME Dentistry, Glasgow</em></p>',
    '    <button class="success-panel__reset" onclick="resetForm()">Submit another enquiry</button>',
    '  </div>',
    '</div>'
  ].join('\n');

  document.querySelectorAll('.contact-wrap[data-enquiry-component]').forEach(function (el) {
    el.innerHTML = HTML;
  });

  var form = document.getElementById('enquiry-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      this.style.display = 'none';
      document.getElementById('success-panel').style.display = 'block';
    });
  }
})();

function resetForm() {
  document.getElementById('enquiry-form').reset();
  document.getElementById('enquiry-form').style.display = 'flex';
  document.getElementById('success-panel').style.display = 'none';
}
