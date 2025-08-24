// assets/js/ui.js
// ============================================================================
// RRD Collection - UI Utilities & Components
// ============================================================================

// Quick DOM Selectors
const qs  = (s, sc=document) => sc.querySelector(s);
const qsa = (s, sc=document) => Array.from(sc.querySelectorAll(s));

// ============================================================================
// CURRENCY MANAGEMENT
// ============================================================================

function setCurrency(cur) {
  localStorage.setItem("rrd_currency", cur);
  document.dispatchEvent(new CustomEvent("currency:changed", { detail: { currency: cur } }));
}

function currentCurrency() { 
  return localStorage.getItem("rrd_currency") || DEFAULT_CURRENCY || "AED"; 
}

const convertPrice = (aed, to=currentCurrency()) => (aed / RATES.AED) * (RATES[to] || 1);
const formatPrice  = (aed, cur=currentCurrency()) => `${CURRENCY_SYMBOLS[cur]} ${convertPrice(aed, cur).toFixed(2)}`;

// ============================================================================
// NOTIFICATIONS & FEEDBACK
// ============================================================================

function toast(msg, type = 'info') {
  try {
    let t = qs('#toast');
    if (!t) { 
      t = Object.assign(document.createElement('div'), { id: 'toast' }); 
      t.setAttribute('role', 'status'); 
      t.setAttribute('aria-live', 'polite'); 
      document.body.appendChild(t); 
    }
    t.textContent = msg; 
    t.className = `show ${type}`; 
    setTimeout(() => t.className = '', 3000);
  } catch (error) {
    console.error('Error showing toast:', error);
    alert(msg); // Fallback
  }
}

// ============================================================================
// STAR RATING SYSTEM
// ============================================================================

function renderStars(r) {
  const full = Math.floor(r), half = r - full >= .5;
  let out = '★'.repeat(full);
  if (half) out += '☆'; // simple half placeholder; keep typography minimal
  out = out.padEnd(5, '☆');
  return `<span aria-label="${r} out of 5 stars" title="${r}/5">${out}</span>`;
}

// ============================================================================
// MODAL SYSTEM
// ============================================================================

let __activeModal = null, __lastFocused = null;

function openModal(id) {
  const m = qs(id);
  if (!m) return;
  __lastFocused = document.activeElement;
  m.classList.add('open');
  m.setAttribute('aria-hidden', 'false');
  __activeModal = m;
  const focusables = qsa('a,button,input,textarea,select,[tabindex]:not([tabindex="-1"])', m);
  (focusables[0] || m).focus();
}

function closeModal(id) {
  const m = typeof id === 'string' ? qs(id) : __activeModal;
  if (!m) return;
  m.classList.remove('open');
  m.setAttribute('aria-hidden', 'true');
  __activeModal = null;
  (__lastFocused || document.body).focus();
}

// Modal event listeners
document.addEventListener('keydown', (e) => { 
  if (e.key === 'Escape' && __activeModal) closeModal(__activeModal); 
});

document.addEventListener('click', (e) => { 
  if (__activeModal && e.target.classList.contains('modal-backdrop')) closeModal(__activeModal); 
});

// ============================================================================
// FORM VALIDATION
// ============================================================================

function validateForm(form) {
  const inputs = form.querySelectorAll('input[required], textarea[required]');
  let isValid = true;
  
  inputs.forEach(input => {
    const errorEl = input.parentNode.querySelector('.error-message') || 
                   input.parentNode.insertBefore(
                     document.createElement('div'), 
                     input.nextSibling
                   );
    
    errorEl.className = 'error-message';
    
    if (!input.value.trim()) {
      showFieldError(input, 'This field is required');
      isValid = false;
    } else if (input.type === 'email' && !isValidEmail(input.value)) {
      showFieldError(input, 'Please enter a valid email address');
      isValid = false;
    } else {
      clearFieldError(input);
    }
  });
  
  return isValid;
}

function showFieldError(input, message) {
  input.classList.add('error');
  const errorEl = input.parentNode.querySelector('.error-message');
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.classList.add('show');
  }
}

function clearFieldError(input) {
  input.classList.remove('error');
  const errorEl = input.parentNode.querySelector('.error-message');
  if (errorEl) {
    errorEl.classList.remove('show');
  }
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ============================================================================
// QUIZ SYSTEM
// ============================================================================

let quizAnswers = {};
let currentQuizStep = 1;

function initQuiz() {
  const quizContainer = qs('.quiz');
  if (!quizContainer) return;
  
  showQuizStep(1);
  bindQuizEvents();
}

function showQuizStep(step) {
  currentQuizStep = step;
  const steps = qsa('.quiz-step');
  steps.forEach((s, i) => {
    s.classList.toggle('active', i + 1 === step);
  });
  
  // Update progress bar
  updateQuizProgress(step);
  
  // Update progress text
  const progressText = qs('.progress-text');
  if (progressText) {
    progressText.textContent = `Step ${step} of ${QUIZ_QUESTIONS.length}`;
  }
  
  const question = QUIZ_QUESTIONS[step - 1];
  if (question) {
    // Update step header
    const stepHeader = qs('.quiz-step.active .step-header h3');
    if (stepHeader) {
      stepHeader.textContent = question.question;
    }
    
    // Update step description if it exists
    const stepDesc = qs('.quiz-step.active .step-description');
    if (stepDesc && question.description) {
      stepDesc.textContent = question.description;
    }
    
    renderQuizOptions(question.options);
  }
}

function updateQuizProgress(step) {
  const progressFill = qs('.progress-fill');
  if (progressFill) {
    const percentage = (step / QUIZ_QUESTIONS.length) * 100;
    progressFill.style.width = `${percentage}%`;
  }
}

function renderQuizOptions(options) {
  const container = qs('.quiz-options');
  if (!container) return;
  
  container.innerHTML = options.map(option => `
    <div class="quiz-option" data-value="${option.id}">
      <h4>${option.text}</h4>
      <p>${option.description}</p>
    </div>
  `).join('');
  
  // Bind click events
  qsa('.quiz-option').forEach(option => {
    option.addEventListener('click', () => selectQuizOption(option.dataset.value));
  });
}

function selectQuizOption(value) {
  const question = QUIZ_QUESTIONS[currentQuizStep - 1];
  if (!question) return;
  
  // Store answer
  quizAnswers[question.options.find(o => o.id === value).id] = value;
  
  // Visual feedback
  qsa('.quiz-option').forEach(opt => opt.classList.remove('selected'));
  qs(`[data-value="${value}"]`).classList.add('selected');
  
  // Auto-advance after short delay
  setTimeout(() => {
    if (currentQuizStep < QUIZ_QUESTIONS.length) {
      showQuizStep(currentQuizStep + 1);
    } else {
      showQuizResults();
    }
  }, 800);
}

function showQuizResults() {
  const recommendations = getQuizRecommendation(quizAnswers);
  const container = qs('.quiz');
  if (!container) return;
  
  container.innerHTML = `
    <div class="quiz-step active">
      <h3>Your Perfect Match</h3>
      <p>Based on your preferences, here are our top recommendations:</p>
      <div class="grid">
        ${recommendations.map(p => `
          <div class="card">
            <picture>
              <source type="image/webp" srcset="${p.imageWebp}">
              <img src="${p.image}" alt="${p.name} bottle">
            </picture>
            <div class="pad">
              <h3>${p.name}</h3>
              <div class="meta">${p.notes.slice(0,3).join(' • ')}</div>
              <div class="meta">${renderStars(avgRating(p.id))} <span class="muted">(${reviewsCount(p.id)})</span></div>
              <div class="price">${formatPrice(p.price)}</div>
              <div class="actions">
                <button class="btn" onclick="addToCart('${p.id}')">Add to cart</button>
                <button class="btn secondary" onclick="openPDP('${p.id}')">Details</button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
      <div class="quiz-nav">
        <button class="btn secondary" onclick="resetQuiz()">Take Quiz Again</button>
        <a href="shop.html" class="btn">Shop All Fragrances</a>
      </div>
    </div>
  `;
}

function resetQuiz() {
  quizAnswers = {};
  currentQuizStep = 1;
  initQuiz();
}

function bindQuizEvents() {
  const prevBtn = qs('.quiz-nav .prev');
  const nextBtn = qs('.quiz-nav .next');
  
  if (prevBtn) prevBtn.addEventListener('click', () => {
    if (currentQuizStep > 1) showQuizStep(currentQuizStep - 1);
  });
  
  if (nextBtn) nextBtn.addEventListener('click', () => {
    if (currentQuizStep < QUIZ_QUESTIONS.length) showQuizStep(currentQuizStep + 1);
  });
}

// ============================================================================
// NEWSLETTER SYSTEM
// ============================================================================

function initNewsletter() {
  const form = qs('.newsletter form');
  if (!form) return;
  
  form.addEventListener('submit', handleNewsletterSubmit);
}

async function handleNewsletterSubmit(e) {
  e.preventDefault();
  
  if (!validateForm(e.target)) return;
  
  const email = e.target.querySelector('input[type="email"]').value;
  const submitBtn = e.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  
  try {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner"></span> Subscribing...';
    
    // Use actual Formspree endpoint
    const response = await fetch('https://formspree.io/f/mblarryg', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        source: 'RRD Collection Website',
        timestamp: new Date().toISOString()
      })
    });
    
    if (response.ok) {
      toast('Thank you for subscribing!', 'success');
      e.target.reset();
      
      // Track newsletter signup
      if (window.trackNewsletterSignup) {
        window.trackNewsletterSignup(email);
      }
    } else {
      throw new Error('Subscription failed');
    }
    
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    toast('Subscription failed. Please try again.', 'error');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  }
}

// ============================================================================
// SEARCH & FILTERING
// ============================================================================

function initSearchAndFilters() {
  const searchInput = qs('#search');
  const categoryFilter = qs('#category-filter');
  const priceFilter = qs('#price-filter');
  
  if (searchInput) {
    searchInput.addEventListener('input', debounce(handleSearch, 300));
  }
  
  if (categoryFilter) {
    categoryFilter.addEventListener('change', handleFilters);
  }
  
  if (priceFilter) {
    priceFilter.addEventListener('change', handleFilters);
  }
}

function handleSearch(e) {
  const query = e.target.value.toLowerCase();
  const products = qsa('.card');
  
  products.forEach(product => {
    const name = product.querySelector('h3')?.textContent.toLowerCase() || '';
    const notes = product.querySelector('.meta')?.textContent.toLowerCase() || '';
    const isVisible = name.includes(query) || notes.includes(query);
    
    product.style.display = isVisible ? 'flex' : 'none';
  });
}

function handleFilters() {
  const categoryFilter = qs('#category-filter');
  const priceFilter = qs('#price-filter');
  
  if (!categoryFilter || !priceFilter) return;
  
  const category = categoryFilter.value;
  const priceRange = priceFilter.value;
  
  let filteredProducts = PRODUCTS;
  
  if (category !== 'all') {
    filteredProducts = getProductsByCategory(category);
  }
  
  if (priceRange !== 'all') {
    filteredProducts = filteredProducts.filter(p => 
      getProductsByPriceRange(priceRange).some(fp => fp.id === p.id)
    );
  }
  
  renderFilteredProducts(filteredProducts);
}

function renderFilteredProducts(products) {
  const grid = qs('#shopGrid') || qs('.grid');
  if (!grid) return;
  
  grid.innerHTML = products.map(p => `
    <article class="card" id="${p.id}">
      <picture>
        <source type="image/webp" srcset="${p.imageWebp}">
        <img src="${p.image}" alt="${p.name} bottle">
      </picture>
      <div class="pad">
        <h3>${p.name}</h3>
        <div class="meta">${p.notes.slice(0,3).join(' • ')}</div>
        <div class="meta">${renderStars(avgRating(p.id))} <span class="muted">(${reviewsCount(p.id)})</span></div>
        <div class="price">${formatPrice(p.price)}</div>
        <div class="actions">
          <button class="btn" onclick="addToCart('${p.id}')">Add to cart</button>
          <button class="btn secondary" onclick="openPDP('${p.id}')">Details</button>
        </div>
      </div>
    </article>
  `).join('');
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function addBundleToCart(bundleId) {
  const bundle = getBundle(bundleId);
  if (!bundle) return;
  
  bundle.products.forEach(productId => {
    addToCart(productId, 1);
  });
  
  toast(`Added ${bundle.name} to cart!`, 'success');
}

// ============================================================================
// MOBILE NAVIGATION
// ============================================================================

function toggleMobileNav() {
  const nav = qs('#main-nav');
  const toggle = qs('.mobile-nav-toggle');
  
  if (!nav || !toggle) return;
  
  const isOpen = nav.classList.contains('open');
  
  if (isOpen) {
    nav.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  } else {
    nav.classList.add('open');
    toggle.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
  }
}

// Close mobile nav when clicking outside
document.addEventListener('click', (e) => {
  const nav = qs('#main-nav');
  const toggle = qs('.mobile-nav-toggle');
  
  if (nav && nav.classList.contains('open') && 
      !nav.contains(e.target) && 
      !toggle.contains(e.target)) {
    nav.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }
});

// ============================================================================
// INITIALIZATION
// ============================================================================

function initUI() {
  initQuiz();
  initNewsletter();
  initSearchAndFilters();
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initUI);

// ============================================================================
// GLOBAL EXPORTS (for backward compatibility)
// ============================================================================

window.UI = {
  qs,
  qsa,
  setCurrency,
  currentCurrency,
  convertPrice,
  formatPrice,
  toast,
  renderStars,
  openModal,
  closeModal,
  validateForm,
  showFieldError,
  clearFieldError,
  isValidEmail,
  initQuiz,
  showQuizStep,
  renderQuizOptions,
  selectQuizOption,
  showQuizResults,
  resetQuiz,
  bindQuizEvents,
  initNewsletter,
  handleNewsletterSubmit,
  initSearchAndFilters,
  handleSearch,
  handleFilters,
  renderFilteredProducts,
  debounce,
  addBundleToCart,
  toggleMobileNav,
  initUI
}; 