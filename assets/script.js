// Sticky nav border on scroll
const nav = document.getElementById('nav');
if (nav) {
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();
}

// Mobile menu — side panel
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
if (toggle && links) {
  // Inject backdrop
  const backdrop = document.createElement('div');
  backdrop.className = 'nav-backdrop';
  document.body.appendChild(backdrop);

  // Inject close button (X)
  const closeBtn = document.createElement('button');
  closeBtn.className = 'nav-close';
  closeBtn.setAttribute('aria-label', 'סגירה');
  closeBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>';
  links.prepend(closeBtn);

  // Inject brand header at top of panel
  const brandHeader = document.createElement('div');
  brandHeader.className = 'nav-panel-brand';
  brandHeader.innerHTML = `
    <img src="images/mystory-logo.png" alt="" />
    <div>
      <b>בשביל המילים</b>
      <span>סמדר ויצמן · סיפורולוגית</span>
    </div>
  `;
  closeBtn.after(brandHeader);

  // Inject footer with contact info + social icons
  const footer = document.createElement('div');
  footer.className = 'nav-panel-footer';
  footer.innerHTML = `
    <div class="nav-panel-contact">
      <a href="tel:0506596019">050-659-6019</a>
      <a href="mailto:smadar@my-story.co.il">smadar@my-story.co.il</a>
    </div>
    <div class="nav-panel-social">
      <a href="https://www.facebook.com/SmadarStory" target="_blank" rel="noopener" aria-label="Facebook">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
      </a>
      <a href="https://www.youtube.com/@SmadarWeizman" target="_blank" rel="noopener" aria-label="YouTube">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
      </a>
    </div>
  `;
  links.append(footer);

  const openMenu = () => {
    links.classList.add('open');
    backdrop.classList.add('open');
  };
  const closeMenu = () => {
    links.classList.remove('open');
    backdrop.classList.remove('open');
  };
  const toggleMenu = () => {
    links.classList.contains('open') ? closeMenu() : openMenu();
  };

  toggle.addEventListener('click', toggleMenu);
  closeBtn.addEventListener('click', closeMenu);

  // Close when clicking a link (navigation)
  links.addEventListener('click', e => {
    if (e.target.tagName === 'A' || e.target.closest('a')) closeMenu();
  });

  // Close on ESC key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && links.classList.contains('open')) closeMenu();
  });
}

// FAQ accordion
document.querySelectorAll('.faq-item').forEach(item => {
  const btn = item.querySelector('button');
  const ans = item.querySelector('.faq-answer');
  if (!btn || !ans) return;
  btn.addEventListener('click', () => {
    const isOpen = item.classList.toggle('open');
    ans.style.maxHeight = isOpen ? ans.scrollHeight + 40 + 'px' : '0';
  });
});

// Reveal on scroll
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, {threshold: 0.12});
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Form (placeholder — replace with real submit handler)
function handleSubmit(e){
  e.preventDefault();
  const btn = e.target.querySelector('button');
  btn.textContent = 'נשלח · תודה!';
  btn.style.background = 'var(--btn-hover)';
  e.target.reset();
  setTimeout(() => { btn.textContent = 'שלח/י הודעה'; btn.style.background = ''; }, 4000);
}

// =========================================
// ACCESSIBILITY WIDGET
// =========================================
(() => {
  const STORAGE_KEY = 'mystory-a11y';
  const state = {};
  const FONT_SIZES = ['text-110', 'text-125', 'text-150'];

  // Tool definitions with inline SVG icons
  const tools = [
    { id:'text-110', label:'טקסט גדול', svg:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7V5h16v2"/><path d="M9 5v14"/><path d="M15 5v14"/></svg>` },
    { id:'text-125', label:'טקסט גדול יותר', svg:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7V4h12v3"/><path d="M9 4v16"/><path d="M16 14v-3h6v3"/><path d="M19 11v9"/></svg>` },
    { id:'text-150', label:'טקסט ענק', svg:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6V3h10v3"/><path d="M8 3v18"/><path d="M14 14v-3h7v3"/><path d="M17.5 11v10"/></svg>` },
    { id:'contrast', label:'ניגודיות', svg:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2v20" fill="currentColor"/><path d="M12 2a10 10 0 0 1 0 20z" fill="currentColor"/></svg>` },
    { id:'highlight-links', label:'הדגשת קישורים', svg:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>` },
    { id:'no-animations', label:'ביטול הנפשות', svg:`<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>` },
    { id:'grayscale', label:'גוון אפור', svg:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2v20"/></svg>` },
    { id:'line-spacing', label:'מרווח שורה', svg:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 5h18"/><path d="M3 12h18"/><path d="M3 19h18"/><path d="M7 9l-2-2-2 2"/><path d="M3 15l2 2 2-2"/></svg>` },
    { id:'readable-font', label:'גופן קריא', svg:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7V4h16v3"/><path d="M9 20h6"/><path d="M12 4v16"/></svg>` },
    { id:'big-cursor', label:'סמן גדול', svg:`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M5 3l14 9-7 1-3 8z"/></svg>` }
  ];

  function load(){
    try{
      Object.assign(state, JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'));
    } catch(e){}
  }
  function save(){
    try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch(e){}
  }
  function apply(){
    const html = document.documentElement;
    Array.from(html.classList).forEach(c => {
      if (c.startsWith('a11y-')) html.classList.remove(c);
    });
    Object.keys(state).forEach(id => {
      if (state[id]) html.classList.add('a11y-' + id);
    });
    document.querySelectorAll('.a11y-tool').forEach(btn => {
      btn.classList.toggle('active', !!state[btn.dataset.tool]);
    });
  }

  function build(){
    // Toggle button
    const toggle = document.createElement('button');
    toggle.className = 'a11y-toggle';
    toggle.setAttribute('aria-label', 'תפריט נגישות');
    toggle.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="3.5" r="2.2"/><path d="M20 9.5c0 .55-.45 1-1 1h-4v3l1.7 7.27c.13.54-.21 1.08-.75 1.21-.54.13-1.08-.21-1.21-.75L13 14.95l-1.74 6.28c-.13.54-.67.88-1.21.75-.54-.13-.88-.67-.75-1.21L11 13.5v-3H7c-.55 0-1-.45-1-1s.45-1 1-1h12c.55 0 1 .45 1 1z"/></svg>`;

    // Panel
    const panel = document.createElement('div');
    panel.className = 'a11y-panel';
    panel.innerHTML = `
      <div class="a11y-header">
        <h3>תפריט נגישות</h3>
        <button class="a11y-close" aria-label="סגירה">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>
      </div>
      <div class="a11y-grid">
        ${tools.map(t => `
          <button class="a11y-tool" data-tool="${t.id}" type="button">
            ${t.svg}
            <span>${t.label}</span>
          </button>
        `).join('')}
      </div>
      <button class="a11y-reset" type="button">איפוס הגדרות</button>
      <div class="a11y-footer">
        <a href="accessibility.html">הצהרת נגישות</a>
        <span aria-hidden="true">·</span>
        <a href="privacy.html">מדיניות פרטיות</a>
      </div>
    `;

    document.body.appendChild(toggle);
    document.body.appendChild(panel);

    toggle.addEventListener('click', () => panel.classList.toggle('open'));
    panel.querySelector('.a11y-close').addEventListener('click', () => panel.classList.remove('open'));

    panel.querySelectorAll('.a11y-tool').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.tool;
        state[id] = !state[id];
        // Mutually exclusive font sizes
        if (state[id] && FONT_SIZES.includes(id)) {
          FONT_SIZES.filter(f => f !== id).forEach(f => state[f] = false);
        }
        save();
        apply();
      });
    });

    panel.querySelector('.a11y-reset').addEventListener('click', () => {
      Object.keys(state).forEach(k => state[k] = false);
      save();
      apply();
    });

    // Click outside to close
    document.addEventListener('click', e => {
      if (!panel.classList.contains('open')) return;
      if (panel.contains(e.target) || toggle.contains(e.target)) return;
      panel.classList.remove('open');
    });
  }

  load();
  build();
  apply();
})();

// =========================================
// BOOKS DROPDOWN — wraps the "ספרים" nav link with a dropdown
// =========================================
(() => {
  const navLinks = document.getElementById('navLinks');
  if (!navLinks) return;

  // Find the books link
  const allLinks = Array.from(navLinks.querySelectorAll('a'));
  const booksLink = allLinks.find(a => {
    const href = a.getAttribute('href') || '';
    return href === 'books.html' || href === '../books.html';
  });
  if (!booksLink) return;

  // Detect path context (root or books/ subfolder)
  const inBooksFolder = /\/books\/[^/]+\.html$/.test(window.location.pathname);
  const dataPrefix = inBooksFolder ? '../' : '';
  const linkPrefix = inBooksFolder ? '' : 'books/';

  // Wrap link in dropdown container
  const dropdown = document.createElement('div');
  dropdown.className = 'nav-dropdown';
  booksLink.parentNode.insertBefore(dropdown, booksLink);
  booksLink.classList.add('nav-dropdown-link');

  // Move link into dropdown
  dropdown.appendChild(booksLink);

  // Add toggle button (chevron) — separate so mobile can tap it
  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'nav-dropdown-toggle';
  toggle.setAttribute('aria-label', 'הצג רשימת ספרים');
  toggle.innerHTML = `<svg class="nav-dropdown-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>`;
  dropdown.appendChild(toggle);

  // Add dropdown menu (will be populated after data loads)
  const menu = document.createElement('div');
  menu.className = 'nav-dropdown-menu';
  dropdown.appendChild(menu);

  // Toggle click → open/close dropdown
  toggle.addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();
    dropdown.classList.toggle('open');
  });

  // Click outside closes
  document.addEventListener('click', e => {
    if (!dropdown.contains(e.target)) dropdown.classList.remove('open');
  });
  // ESC key closes
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') dropdown.classList.remove('open');
  });

  // Load books data and populate
  const populateMenu = () => {
    if (!window.BOOKS_DATA) return;
    menu.innerHTML = `
      <div class="nav-dropdown-card">
        <div class="nav-dropdown-header">
          <span class="eyebrow">סיפורי חיים</span>
        </div>
        <div class="nav-dropdown-list"></div>
        <div class="nav-dropdown-footer">
          <a href="${inBooksFolder ? '../books.html' : 'books.html'}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M19 12H5"/>
              <path d="M12 19l-7-7 7-7"/>
            </svg>
            <span>לכל הספרים</span>
          </a>
        </div>
      </div>
    `;
    const list = menu.querySelector('.nav-dropdown-list');
    window.BOOKS_DATA.forEach(book => {
      const link = document.createElement('a');
      link.href = `${linkPrefix}${book.id}.html`;
      link.textContent = book.title;
      list.appendChild(link);
    });
  };

  if (window.BOOKS_DATA) {
    populateMenu();
  } else {
    const script = document.createElement('script');
    script.src = `${dataPrefix}assets/books-data.js`;
    script.onload = populateMenu;
    document.head.appendChild(script);
  }
})();

// =========================================
// COOKIE CONSENT BANNER
// =========================================
(() => {
  const KEY = 'mystory-cookies';
  if (localStorage.getItem(KEY)) return; // already responded

  const banner = document.createElement('div');
  banner.className = 'cookie-banner';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-label', 'הסכמה לשימוש בעוגיות');
  banner.innerHTML = `
    <div class="cookie-icon" aria-hidden="true">🍪</div>
    <div class="cookie-content">
      <h4>אנחנו משתמשים בעוגיות</h4>
      <p>האתר משתמש בעוגיות על מנת לשפר את חוויית הגלישה ולשמור את העדפות הנגישות שלך. <a href="privacy.html">מדיניות פרטיות</a></p>
    </div>
    <div class="cookie-actions">
      <button class="cookie-btn cookie-decline" type="button">דחייה</button>
      <button class="cookie-btn cookie-accept" type="button">אישור</button>
    </div>
  `;
  document.body.appendChild(banner);

  // Animate in after a small delay
  requestAnimationFrame(() => {
    setTimeout(() => banner.classList.add('show'), 800);
  });

  const close = (value) => {
    try{ localStorage.setItem(KEY, value); } catch(e){}
    banner.classList.remove('show');
    setTimeout(() => banner.remove(), 500);
  };

  banner.querySelector('.cookie-accept').addEventListener('click', () => close('accepted'));
  banner.querySelector('.cookie-decline').addEventListener('click', () => close('declined'));
})();
