// Analytics.js - Google Analytics integration for RRD Collection
// Google Analytics 4 (GA4) configuration

// Google Analytics 4 (GA4) configuration
function initGA() {
  // Replace 'G-XXXXXXXXXX' with your actual GA4 measurement ID
  const GA_MEASUREMENT_ID = 'G-2GJXXCKDX8';
  
  if (typeof gtag !== 'undefined') {
    // Page view tracking
    gtag('config', GA_MEASUREMENT_ID, {
      page_title: document.title,
      page_location: window.location.href,
      custom_map: {
        'custom_dimension_1': 'user_type',
        'custom_dimension_2': 'currency'
      }
    });
    
    // Track currency changes
    document.addEventListener('currency:changed', (e) => {
      gtag('event', 'currency_change', {
        currency: e.detail.currency,
        value: 1
      });
    });
    
    // Track cart additions
    document.addEventListener('cart:updated', () => {
      const cart = window.getCart ? window.getCart() : { items: [] };
      if (cart.items.length > 0) {
        gtag('event', 'cart_update', {
          items: cart.items.map(item => ({
            item_id: item.id,
            quantity: item.qty
          })),
          value: cart.items.reduce((total, item) => {
            const product = window.PRODUCTS?.find(p => p.id === item.id);
            return total + (product?.price || 0) * item.qty;
          }, 0)
        });
      }
    });
    
    // Track quiz completions
    window.trackQuizCompletion = function(answers) {
      gtag('event', 'quiz_completion', {
        quiz_name: 'scent_finder',
        answers: answers,
        value: 1
      });
    };
    
    // Track newsletter subscriptions
    window.trackNewsletterSignup = function(email) {
      gtag('event', 'newsletter_signup', {
        method: 'website',
        value: 1
      });
    };
    
    // Track WhatsApp clicks
    document.addEventListener('click', (e) => {
      if (e.target.href && e.target.href.includes('wa.me')) {
        gtag('event', 'whatsapp_click', {
          method: 'website',
          value: 1
        });
      }
    });
    
    console.log('Google Analytics initialized for RRD Collection');
  } else {
    console.warn('Google Analytics not loaded. Add the gtag script to your HTML head.');
  }
}

// Enhanced ecommerce tracking for product views
function trackProductView(productId) {
  if (typeof gtag !== 'undefined') {
    const product = window.PRODUCTS?.find(p => p.id === productId);
    if (product) {
      gtag('event', 'view_item', {
        currency: 'AED',
        value: product.price,
        items: [{
          item_id: product.id,
          item_name: product.name,
          item_category: product.category,
          price: product.price,
          quantity: 1
        }]
      });
    }
  }
}

// Enhanced ecommerce tracking for add to cart
function trackAddToCart(productId, quantity = 1) {
  if (typeof gtag !== 'undefined') {
    const product = window.PRODUCTS?.find(p => p.id === productId);
    if (product) {
      gtag('event', 'add_to_cart', {
        currency: 'AED',
        value: product.price * quantity,
        items: [{
          item_id: product.id,
          item_name: product.name,
          item_category: product.category,
          price: product.price,
          quantity: quantity
        }]
      });
    }
  }
}

// Enhanced ecommerce tracking for checkout
function trackCheckout(method) {
  if (typeof gtag !== 'undefined') {
    const cart = window.getCart ? window.getCart() : { items: [] };
    const total = cart.items.reduce((sum, item) => {
      const product = window.PRODUCTS?.find(p => p.id === item.id);
      return sum + (product?.price || 0) * item.qty;
    }, 0);
    
    gtag('event', 'begin_checkout', {
      currency: 'AED',
      value: total,
      items: cart.items.map(item => {
        const product = window.PRODUCTS?.find(p => p.id === item.id);
        return {
          item_id: item.id,
          item_name: product?.name || 'Unknown Product',
          item_category: product?.category || 'Unknown',
          price: product?.price || 0,
          quantity: item.qty
        };
      }),
      checkout_option: method
    });
  }
}

// Initialize analytics when DOM is loaded
document.addEventListener('DOMContentLoaded', initGA);

// Export functions for use in other scripts
window.RRDAnalytics = {
  trackProductView,
  trackAddToCart,
  trackCheckout,
  trackQuizCompletion: window.trackQuizCompletion,
  trackNewsletterSignup: window.trackNewsletterSignup
}; 