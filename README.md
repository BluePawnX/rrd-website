# RRD Collection

A premium fragrance website for RRD Collection - bold, mood-defining fragrances for those who walk into the room already unforgettable.

## 📁 Project Structure

```
rrd-collection/
├─ index.html          # Home page with brand message
├─ shop.html           # Perfume catalog with currency selector
├─ about.html          # About us page with brand story
├─ faq.html            # Frequently asked questions
├─ contact.html        # Contact form with WhatsApp integration
├─ /assets/
│  ├─ css/style.css    # Main stylesheet with perfume theme
│  ├─ js/ui.js         # UI interactions and mobile navigation
│  ├─ js/cart.js       # Shopping cart with WhatsApp checkout
│  ├─ js/data.js       # Perfume data and currency conversion
│  └─ img/
│     ├─ logo.png      # RRD Collection logo
│     ├─ hero.png      # Hero section image
│     └─ bottles/      # Perfume bottle images
└─ /meta/
   ├─ sitemap.xml      # SEO sitemap
   └─ robots.txt       # Search engine directives
```

## 🚀 Features

### Brand Identity
- **Brand Line**: "A scent isn't just a smell — it's a signature. RRD Collection curates bold, mood-defining fragrances for those who walk into the room already unforgettable."
- **Premium Design**: Elegant brown and gold color scheme reflecting luxury fragrances
- **Mobile-First**: Thumb-friendly controls and responsive design

### Pages
- **Home Page**: Hero section with brand message and feature highlights
- **Shop Perfumes**: Product catalog with filtering and currency conversion
- **About Page**: Company story, philosophy, and perfumer profiles
- **FAQ Page**: Interactive FAQ with fragrance-specific questions
- **Contact Page**: WhatsApp integration and contact form

### Functionality
- **Multi-Currency Support**: AED (default), INR, USD with real-time conversion
- **WhatsApp Checkout**: Direct WhatsApp integration for orders
- **Email Fallback**: Alternative ordering via email
- **Product Filtering**: By category (Masculine, Feminine, Unisex, Limited Edition) and price range
- **Shopping Cart**: Local storage persistence with WhatsApp checkout
- **Responsive Design**: Mobile-first approach with modern CSS Grid and Flexbox

### Technical Features
- **Vanilla JavaScript**: No external dependencies
- **Currency Conversion**: Real-time price conversion with configurable rates
- **WhatsApp Integration**: Deep linking for instant messaging
- **SEO Optimized**: Meta tags, sitemap, and semantic HTML
- **Accessibility**: ARIA labels and keyboard navigation

## 🛠️ Getting Started

1. **Open the website**: Simply open `index.html` in your web browser
2. **Local Development**: Use a local server for best experience:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

## 📱 Mobile-First Design

- **Thumb-Friendly Controls**: Large touch targets and easy navigation
- **Responsive Layout**: Adapts to all screen sizes
- **Fast Loading**: Optimized for mobile networks
- **Touch Gestures**: Swipe-friendly interactions

## 💰 Currency Support

The website supports three currencies with real-time conversion:

- **AED** (UAE Dirham) - Default currency
- **INR** (Indian Rupee) - ₹ symbol
- **USD** (US Dollar) - $ symbol

Currency conversion rates are configurable in `assets/js/data.js`.

## 📞 Checkout Process

### WhatsApp Checkout
1. Add fragrances to cart
2. Click "Order via WhatsApp" button
3. Pre-filled message opens in WhatsApp
4. Complete order through chat

### Email Fallback
1. Add fragrances to cart
2. Click "Order via Email" button
3. Opens email client with order details
4. Send email to complete order

## 🎨 Customization

### Colors
The website uses a luxury perfume theme:
```css
:root {
    --primary-color: #8B4513;    /* Saddle Brown */
    --secondary-color: #D2691E;  /* Chocolate */
    --accent-color: #25D366;     /* WhatsApp Green */
}
```

### Content
- **Fragrances**: Edit `assets/js/data.js` to modify perfume data
- **Brand Message**: Update the brand line in HTML files
- **Styling**: Modify `assets/css/style.css` for design changes

## 📊 Perfume Data Structure

Fragrances are defined in `assets/js/data.js`:
```javascript
{
    id: '1',
    name: 'Desert Rose',
    price: 299.99,
    category: 'feminine',
    image: 'assets/img/bottles/bottle1.jpg',
    description: 'A captivating blend of rose petals, oud, and sandalwood.',
    features: ['Long Lasting', 'Natural Ingredients', 'Mood Enhancing'],
    notes: ['Rose', 'Oud', 'Sandalwood', 'Amber'],
    sizes: ['50ml', '100ml'],
    inStock: true,
    rating: 4.9,
    reviews: 156
}
```

## 🔧 JavaScript Modules

### UI.js
- Mobile navigation with hamburger menu
- FAQ accordion functionality
- Form validation and notifications
- Smooth scrolling and animations

### Cart.js
- Shopping cart management with localStorage
- Currency conversion and price formatting
- WhatsApp checkout integration
- Product catalog with filtering

### Data.js
- Perfume product data
- Currency conversion rates
- Category information
- Utility functions

## 📈 SEO Features

- Semantic HTML structure
- Meta descriptions and titles
- Sitemap.xml for search engines
- Robots.txt for crawling directives
- Alt text for all images
- Open Graph tags (ready for implementation)

## 🚀 Deployment

The website is ready for deployment to any static hosting service:
- GitHub Pages
- Netlify
- Vercel
- AWS S3
- Any web server

## 📝 Brand Guidelines

### Navigation
- Home
- Shop Perfumes
- About
- FAQ
- Contact

### Brand Message
"A scent isn't just a smell — it's a signature. RRD Collection curates bold, mood-defining fragrances for those who walk into the room already unforgettable."

### Contact Information
- **Email**: info@rrdcollection.com
- **WhatsApp**: +971 50 123 4567
- **Location**: Dubai, United Arab Emirates

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly on mobile devices
5. Submit a pull request

## 📞 Support

For questions or support, please contact:
- **Email**: info@rrdcollection.com
- **WhatsApp**: +971 50 123 4567

---

**Note**: This is a static website template for RRD Collection. For production use, consider adding:
- Backend integration for dynamic content
- Payment processing integration
- User authentication and accounts
- Database for inventory management
- Analytics and tracking
- Multi-language support 