# RRD Collection Website

A luxury perfume brand website built with vanilla HTML, CSS, and JavaScript. Features a modern, mobile-first design with enhanced user experience and conversion optimization.

## 🌟 Features

### Core Functionality
- **Product Catalog**: 8 luxury fragrances with detailed descriptions and notes
- **Shopping Cart**: Local storage-based cart with gift wrap options
- **Multi-Currency Support**: AED, INR, USD with real-time conversion
- **WhatsApp Integration**: Direct checkout via WhatsApp deep linking
- **Email Fallback**: Alternative checkout method for email orders

### Enhanced User Experience
- **Scent Finder Quiz**: Interactive quiz to recommend perfect fragrances
- **Product Bundles**: Curated duos with savings
- **Advanced Filters**: Category, price range, and search functionality
- **PDP Modal**: Detailed product views with reviews and ratings
- **Newsletter Capture**: Email subscription with Formspree integration
- **Floating WhatsApp Button**: Always-accessible customer support

### Technical Features
- **Responsive Design**: Mobile-first approach with touch-friendly controls
- **WebP Optimization**: Modern image format with PNG fallback
- **JSON-LD Structured Data**: SEO-optimized product markup
- **Accessibility**: ARIA labels, keyboard navigation, reduced motion support
- **Performance**: Lazy loading, optimized animations, minimal dependencies

## 🚀 Getting Started

### Prerequisites
- Modern web browser
- Local web server (optional, for development)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/rrd-website.git
   cd rrd-website
   ```

2. Open `index.html` in your browser, or run a local server:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js
   npx serve .
   
   # PHP
   php -S localhost:8000
   ```

3. Visit `http://localhost:8000` in your browser

## 📁 Project Structure

```
rrd-collection/
├── index.html              # Home page with quiz and bundles
├── shop.html               # Product catalog with filters
├── about.html              # Brand story and information
├── faq.html                # Frequently asked questions
├── contact.html            # Contact form and WhatsApp
├── privacy.html            # Privacy policy
├── terms.html              # Terms of service
├── assets/
│   ├── css/
│   │   └── style.css       # Enhanced dark theme styles
│   ├── js/
│   │   ├── data.js         # Product data and configurations
│   │   ├── ui.js           # UI helpers and interactions
│   │   ├── cart.js         # Shopping cart functionality
│   │   └── analytics.js    # Google Analytics integration
│   └── img/
│       ├── logo.png        # Brand logo
│       ├── hero.png        # Hero background image
│       └── bottles/        # Product bottle images
│           ├── breath-of-life.png
│           ├── divine-sensation.png
│           ├── maka-zaii.png
│           ├── amber-mist.png
│           ├── monsoon-desire.png
│           ├── royal-arrival.png
│           ├── virgin-gold-oud.png
│           └── acqua-di-fruity.png
└── meta/
    ├── sitemap.xml         # SEO sitemap
    └── robots.txt          # Search engine directives
```

## 🎨 Design System

### Color Palette
- **Primary**: `#c9a24a` (Gold)
- **Background**: `#0b0b0b` (Dark)
- **Surface**: `#121212` (Card background)
- **Text**: `#f5f5f3` (Light)
- **Muted**: `#b8b8b0` (Secondary text)

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)
- **Responsive**: Fluid typography with clamp()

### Components
- **Cards**: Hover effects with smooth transitions
- **Buttons**: Primary, secondary, and floating action buttons
- **Forms**: Enhanced validation with error states
- **Modals**: Accessible popups with focus management

## 🔧 Configuration

### Currency Settings
Edit `assets/js/data.js` to modify:
- Exchange rates
- Default currency
- Currency symbols

### WhatsApp Integration
Update the phone number in:
- `assets/js/cart.js` (line with `const phone='971559938295'`)
- `contact.html` (WhatsApp link)
- `index.html` (floating button)

### Analytics
1. Replace `G-XXXXXXXXXX` in `assets/js/analytics.js`
2. Add Google Analytics script to HTML head:
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   </script>
   ```

### Newsletter Integration
Replace Formspree placeholder in `assets/js/ui.js`:
```javascript
// Replace with actual Formspree endpoint
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  body: new FormData(form)
});
```

## 📱 Mobile Optimization

- **Touch-Friendly**: 44px minimum touch targets
- **Responsive Grid**: Auto-fitting product layouts
- **Mobile Navigation**: Collapsible menu system
- **Gesture Support**: Swipe-friendly cart drawer
- **Performance**: Optimized for mobile networks

## ♿ Accessibility Features

- **ARIA Labels**: Screen reader support
- **Keyboard Navigation**: Full keyboard accessibility
- **Focus Management**: Visible focus indicators
- **Reduced Motion**: Respects user preferences
- **Color Contrast**: WCAG AA compliant
- **Semantic HTML**: Proper heading structure

## 🚀 Performance Optimizations

- **Image Optimization**: WebP format with fallbacks
- **Lazy Loading**: Images load on demand
- **Minimal Dependencies**: No external frameworks
- **Efficient CSS**: CSS custom properties and modern features
- **Optimized JavaScript**: Event delegation and debouncing

## 📊 SEO Features

- **Meta Tags**: Comprehensive page descriptions
- **Structured Data**: JSON-LD for products
- **Sitemap**: XML sitemap with priorities
- **Robots.txt**: Search engine directives
- **Open Graph**: Social media optimization
- **Twitter Cards**: Twitter-specific meta tags

## 🔒 Security Features

- **Input Validation**: Client-side form validation
- **XSS Prevention**: Sanitized user inputs
- **HTTPS Ready**: Secure connection compatible
- **Content Security**: No inline scripts (configurable)

## 🌐 Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+
- **Mobile Browsers**: iOS Safari 14+, Chrome Mobile 90+
- **Fallbacks**: Graceful degradation for older browsers

## 📝 Development

### Code Style
- **HTML**: Semantic markup with accessibility
- **CSS**: BEM methodology with custom properties
- **JavaScript**: ES6+ with error handling
- **Comments**: Comprehensive inline documentation

### Testing
- **Cross-Browser**: Test in multiple browsers
- **Mobile Testing**: Responsive design validation
- **Accessibility**: Screen reader and keyboard testing
- **Performance**: Lighthouse audits

## 📈 Analytics & Tracking

### Events Tracked
- Page views and navigation
- Product interactions (view, add to cart)
- Cart updates and checkout attempts
- Quiz completions
- Newsletter signups
- WhatsApp clicks

### Custom Dimensions
- User type (new/returning)
- Currency preference
- Product categories
- Quiz responses

## 🚀 Deployment

### Static Hosting
- **Netlify**: Drag and drop deployment
- **Vercel**: Git-based deployment
- **GitHub Pages**: Free hosting for public repos
- **AWS S3**: Scalable static hosting

### Environment Variables
- Google Analytics ID
- Formspree endpoint
- WhatsApp number
- Contact email

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary to RRD Collection. All rights reserved.

## 📞 Support

For technical support or questions:
- **Email**: tech@rrd-collection.com
- **WhatsApp**: +971 55 993 8295
- **Issues**: GitHub Issues page

## 🔄 Changelog

### v2.0.0 (2025-01-26)
- ✨ Enhanced UI with Google Fonts
- ✨ Interactive scent finder quiz
- ✨ Product bundles and duos
- ✨ Advanced filtering system
- ✨ Newsletter capture
- ✨ Floating WhatsApp button
- ✨ Legal pages (Privacy/Terms)
- ✨ Analytics integration
- ✨ Enhanced accessibility
- ✨ Performance optimizations

### v1.0.0 (2025-01-26)
- 🎉 Initial release
- 🛒 Shopping cart functionality
- 💱 Multi-currency support
- 📱 Mobile-first design
- 🔍 Product search
- 📞 WhatsApp integration

---

**RRD Collection** - A scent isn't just a smell — it's a signature. 