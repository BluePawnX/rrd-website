// assets/js/data.js
// ============================================================================
// RRD Collection - Product Data & Configuration
// ============================================================================

// Currency Configuration
const CURRENCY_SYMBOLS = { AED: "AED", INR: "₹", USD: "$" };
const RATES = { AED: 1, INR: 22.6, USD: 0.27 }; // approx static conversions from AED
const DEFAULT_CURRENCY = localStorage.getItem("rrd_currency") || "AED";

// Product Catalog
const PRODUCTS = [
  { id:"bol", name:"Breath of Life",  price:149, size:"100 ml", notes:["Citrus Zest","Amberwood","Musk"], image:"assets/img/bottles/breath-of-life.png", imageWebp:"assets/img/bottles/breath-of-life.webp", featured:true, description:"A clean, invigorating signature with a confident amber‑musk trail.", category:"fresh", intensity:"medium", longevity:"8-10 hours" },
  { id:"dvs", name:"Divine Sensation",price:139, size:"100 ml", notes:["Rose","Raspberry","Vanilla"],     image:"assets/img/bottles/divine-sensation.png", imageWebp:"assets/img/bottles/divine-sensation.webp", featured:true, description:"Lush florals wrapped in gourmand warmth—made for entrances.", category:"floral", intensity:"strong", longevity:"10-12 hours" },
  { id:"mkz", name:"Maka Zaii",       price:129, size:"100 ml", notes:["Saffron","Amber","Tonka Bean"],   image:"assets/img/bottles/maka-zaii.png",      imageWebp:"assets/img/bottles/maka-zaii.webp", description:"Golden, spicy‑amber radiance with plush depth.", category:"oriental", intensity:"strong", longevity:"9-11 hours" },
  { id:"amb", name:"Amber Mist",      price:129, size:"100 ml", notes:["Amber","Cedar","Vanilla"],        image:"assets/img/bottles/amber-mist.png",        imageWebp:"assets/img/bottles/amber-mist.webp", description:"Soft amber with a creamy, elegant dry‑down.", category:"oriental", intensity:"medium", longevity:"7-9 hours" },
  { id:"msd", name:"Monsoon Desire",  price:135, size:"100 ml", notes:["Jasmine","Rain Accord","Patchouli"], image:"assets/img/bottles/monsoon-desire.png", imageWebp:"assets/img/bottles/monsoon-desire.webp", featured:true, description:"Dewy florals and a rainy sparkle—fresh romance.", category:"floral", intensity:"medium", longevity:"8-10 hours" },
  { id:"ryl", name:"Royal Arrival",   price:145, size:"100 ml", notes:["Saffron","Rose","Oud"],            image:"assets/img/bottles/royal-arrival.png",     imageWebp:"assets/img/bottles/royal-arrival.webp", description:"Regal spice and rose over an opulent base.", category:"oriental", intensity:"strong", longevity:"10-12 hours" },
  { id:"vgo", name:"Virgin Gold Oud", price:159, size:"100 ml", notes:["Oud","Labdanum","Amber"],          image:"assets/img/bottles/virgin-gold-oud.png",   imageWebp:"assets/img/bottles/virgin-gold-oud.webp", featured:true, description:"A smooth, luxurious oud with ambered gold warmth.", category:"oriental", intensity:"strong", longevity:"12-14 hours" },
  { id:"acf", name:"Acqua Di Fruity", price:119, size:"100 ml", notes:["Green Apple","Bergamot","Musk"],   image:"assets/img/bottles/acqua-di-fruity.png",   imageWebp:"assets/img/bottles/acqua-di-fruity.webp", description:"Crisp citrus and juicy fruit with a polished finish.", category:"fresh", intensity:"light", longevity:"6-8 hours" }
];

// Reviews Data
const REVIEWS = {
  bol: [{stars:5,text:"Crisp and uplifting, lasts all day"}, {stars:4,text:"Clean‑fresh with a nice amber finish"}],
  dvs: [{stars:5,text:"Date‑night perfection"}, {stars:4,text:"Gourmand but elegant"}],
  mkz: [{stars:4,text:"Warm, spicy and cozy"}],
  amb: [{stars:4,text:"Smooth amber, very wearable"}],
  msd: [{stars:5,text:"Rainy‑fresh and romantic"}],
  ryl: [{stars:5,text:"Regal oud‑rose vibe"}],
  vgo: [{stars:5,text:"Luxurious oud without harshness"}],
  acf: [{stars:4,text:"Citrus‑fruity compliment magnet"}],
};

// Product Bundles
const BUNDLES = [
  {
    id: "fresh-duo",
    name: "Fresh & Clean Duo",
    products: ["bol", "acf"],
    price: 249,
    savings: 19,
    description: "Perfect for daily wear - crisp citrus meets clean amber"
  },
  {
    id: "romance-duo", 
    name: "Romance Collection",
    products: ["dvs", "msd"],
    price: 259,
    savings: 15,
    description: "Floral romance for special occasions"
  },
  {
    id: "luxury-duo",
    name: "Luxury Oriental Duo",
    products: ["vgo", "ryl"],
    price: 289,
    savings: 15,
    description: "Opulent oud and regal rose for unforgettable moments"
  }
];

// Quiz Questions
const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "What's your preferred scent intensity?",
    options: [
      { id: "light", text: "Light & Subtle", description: "Gentle, close-to-skin fragrances" },
      { id: "medium", text: "Balanced", description: "Moderate projection, noticeable but not overwhelming" },
      { id: "strong", text: "Bold & Memorable", description: "Strong presence, makes an entrance" }
    ]
  },
  {
    id: 2,
    question: "When do you plan to wear this fragrance?",
    options: [
      { id: "daily", text: "Daily Wear", description: "Office, casual outings, everyday use" },
      { id: "evening", text: "Evening & Events", description: "Dinner dates, parties, special occasions" },
      { id: "both", text: "Versatile", description: "Works for both day and evening" }
    ]
  },
  {
    id: 3,
    question: "What's your preferred fragrance family?",
    options: [
      { id: "fresh", text: "Fresh & Clean", description: "Citrus, aquatic, clean notes" },
      { id: "floral", text: "Floral & Romantic", description: "Rose, jasmine, romantic blooms" },
      { id: "oriental", text: "Oriental & Spicy", description: "Amber, oud, warm spices" }
    ]
  }
];

// Filter Options
const CATEGORIES = [
  { id: "all", name: "All Fragrances" },
  { id: "featured", name: "Featured" },
  { id: "fresh", name: "Fresh & Clean" },
  { id: "floral", name: "Floral & Romantic" },
  { id: "oriental", name: "Oriental & Spicy" }
];

const PRICE_RANGES = [
  { id: "all", name: "All Prices" },
  { id: "100-130", name: "AED 100 - 130", min: 100, max: 130 },
  { id: "130-150", name: "AED 130 - 150", min: 130, max: 150 },
  { id: "150+", name: "AED 150+", min: 150, max: 999 }
];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

// Rating & Review Helpers
function avgRating(id) {
  const arr = REVIEWS[id] || [];
  if (!arr.length) return 0;
  return Math.round((arr.reduce((s, r) => s + r.stars, 0) / arr.length) * 10) / 10;
}

function reviewsCount(id) { 
  return (REVIEWS[id] || []).length; 
}

// Bundle Helpers
function getBundle(id) {
  return BUNDLES.find(b => b.id === id);
}

// Product Filtering
function getProductsByCategory(category) {
  if (category === 'all' || category === 'featured') {
    return category === 'featured' ? PRODUCTS.filter(p => p.featured) : PRODUCTS;
  }
  return PRODUCTS.filter(p => p.category === category);
}

function getProductsByPriceRange(rangeId) {
  if (rangeId === 'all') return PRODUCTS;
  const range = PRICE_RANGES.find(r => r.id === rangeId);
  if (!range) return PRODUCTS;
  return PRODUCTS.filter(p => p.price >= range.min && p.price <= range.max);
}

// Quiz Recommendation Engine
function getQuizRecommendation(answers) {
  const { intensity, occasion, family } = answers;
  
  let recommendations = PRODUCTS;
  
  if (family !== 'all') {
    recommendations = recommendations.filter(p => p.category === family);
  }
  
  if (intensity !== 'all') {
    recommendations = recommendations.filter(p => p.intensity === intensity);
  }
  
  if (occasion === 'daily') {
    recommendations = recommendations.filter(p => p.intensity !== 'strong');
  } else if (occasion === 'evening') {
    recommendations = recommendations.filter(p => p.intensity !== 'light');
  }
  
  return recommendations.slice(0, 3);
}

// ============================================================================
// GLOBAL EXPORTS (for backward compatibility)
// ============================================================================

// Make essential data available globally
window.PRODUCTS = PRODUCTS;
window.REVIEWS = REVIEWS;
window.BUNDLES = BUNDLES;
window.QUIZ_QUESTIONS = QUIZ_QUESTIONS;
window.CATEGORIES = CATEGORIES;
window.PRICE_RANGES = PRICE_RANGES;

// Make utility functions available globally
window.avgRating = avgRating;
window.reviewsCount = reviewsCount;
window.getBundle = getBundle;
window.getProductsByCategory = getProductsByCategory;
window.getProductsByPriceRange = getProductsByPriceRange;
window.getQuizRecommendation = getQuizRecommendation;

// Currency utilities
window.CURRENCY_SYMBOLS = CURRENCY_SYMBOLS;
window.RATES = RATES;
window.DEFAULT_CURRENCY = DEFAULT_CURRENCY;

// ============================================================================
// INITIALIZATION
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
  // Verify data loaded correctly
  if (!PRODUCTS || PRODUCTS.length === 0) {
    console.error('Products data not loaded');
    return;
  }
  
  // Log initialization info
  console.log(`RRD Collection: Loaded ${PRODUCTS.length} fragrances`);
  console.log(`Featured products: ${PRODUCTS.filter(p => p.featured).length}`);
  console.log(`Supported currencies: ${Object.keys(RATES).join(', ')}`);
  console.log(`Default currency: ${DEFAULT_CURRENCY}`);
  
  // Dispatch event to notify other scripts that data is ready
  document.dispatchEvent(new CustomEvent('data:loaded', { 
    detail: { 
      productCount: PRODUCTS.length,
      featuredCount: PRODUCTS.filter(p => p.featured).length 
    } 
  }));
}); 