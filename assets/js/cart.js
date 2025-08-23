// assets/js/cart.js
const GIFT_WRAP_FEE_AED = 10;

function getCart(){
  try {
    const c = JSON.parse(localStorage.getItem('rrd_cart_v1')) || {items:[], currency: currentCurrency()};
    if(typeof c.giftWrap === 'undefined') c.giftWrap = false;
    if(typeof c.giftMessage === 'undefined') c.giftMessage = '';
    return c;
  } catch { return {items:[], currency: currentCurrency(), giftWrap:false, giftMessage:''}; }
}
function saveCart(c){ localStorage.setItem('rrd_cart_v1', JSON.stringify(c)); document.dispatchEvent(new CustomEvent('cart:updated')); }
function addToCart(id, qty=1){ const c=getCart(); const it=c.items.find(i=>i.id===id); it? it.qty=Math.min(10,it.qty+qty): c.items.push({id,qty}); saveCart(c); toast('Added to cart'); }
function removeFromCart(id){ const c=getCart(); c.items=c.items.filter(i=>i.id!==id); saveCart(c); }
function updateQty(id, qty){ const c=getCart(); const it=c.items.find(i=>i.id===id); if(it){ it.qty=Math.max(1, Math.min(10, qty)); saveCart(c);} }
const cartCount    = ()=> getCart().items.reduce((n,i)=>n+i.qty,0);
const cartTotalAED = ()=> getCart().items.reduce((s,i)=> s + (PRODUCTS.find(p=>p.id===i.id)?.price||0)*i.qty, 0) + (getCart().giftWrap ? GIFT_WRAP_FEE_AED : 0);

function renderCartDrawer(){
  const d=qs('#cart-drawer'); if(!d) return;
  const list=qs('.cart-items', d), subtotal=qs('.cart-subtotal', d), extras=qs('.cart-extras', d);
  list.innerHTML='';
  const c=getCart();
  c.items.forEach(it=>{
    const p=PRODUCTS.find(p=>p.id===it.id); if(!p) return;
    const row=document.createElement('div'); row.className='cart-row';
    row.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <div class="meta"><div class="name">${p.name}</div><div class="size">${p.size}</div>
        <div class="qty"><button class="dec">−</button><input type="number" min="1" max="10" value="${it.qty}"/><button class="inc">+</button></div>
      </div>
      <div class="price">${formatPrice(p.price)}</div>
      <button class="remove">×</button>`;
    row.querySelector('.dec').onclick=()=>updateQty(it.id, it.qty-1);
    row.querySelector('.inc').onclick=()=>updateQty(it.id, it.qty+1);
    row.querySelector('input').onchange=(e)=>updateQty(it.id, parseInt(e.target.value||'1',10));
    row.querySelector('.remove').onclick=()=>removeFromCart(it.id);
    list.appendChild(row);
  });

  // Extras (gift wrap + COD info)
  extras.innerHTML = `
    <label style="display:flex;gap:8px;align-items:center;margin:8px 0">
      <input type="checkbox" id="giftWrapChk" ${c.giftWrap?'checked':''}/> Gift‑wrap (+${formatPrice(GIFT_WRAP_FEE_AED)})
    </label>
    <textarea id="giftMsg" rows="2" placeholder="Gift message (optional)" style="width:100%;display:${c.giftWrap?'block':'none'}">${c.giftMessage||''}</textarea>
    <div class="muted" style="font-size:.9rem;margin-top:6px">COD available in select cities in India & UAE — confirm with our agent on WhatsApp.</div>
  `;
  qs('#giftWrapChk', d).onchange = (e)=>{ const cart=getCart(); cart.giftWrap = e.target.checked; saveCart(cart); renderCartDrawer(); };
  const msgEl = qs('#giftMsg', d); if(msgEl){ msgEl.oninput=(e)=>{ const cart=getCart(); cart.giftMessage = e.target.value.slice(0,180); saveCart(cart); }; }

  subtotal.textContent = formatPrice(cartTotalAED());
  qs('#cart-count')?.replaceChildren(document.createTextNode(cartCount()));
}
document.addEventListener('cart:updated', renderCartDrawer);
document.addEventListener('currency:changed', renderCartDrawer);

function toggleCart(open){ const d=qs('#cart-drawer'); if(!d) return; d.classList.toggle('open', open===undefined? !d.classList.contains('open'): !!open); if(d.classList.contains('open')) renderCartDrawer(); }

function buildOrderSummary(){
  const c=getCart();
  const lines=c.items.map(it=>{ const p=PRODUCTS.find(x=>x.id===it.id); return `${p.name} x${it.qty} — ${p.size}`; });
  const extras = [];
  if(c.giftWrap) extras.push(`Gift‑wrap: YES (+${currentCurrency()} ${convertPrice(GIFT_WRAP_FEE_AED).toFixed(2)})`);
  if(c.giftMessage) extras.push(`Gift message: ${encodeURIComponent(c.giftMessage)}`);
  extras.push('Payment: COD / Prepaid (confirm with agent)');
  return `RRD Collection Order%0AItems:%0A- ${lines.join('%0A- ')}%0A%0A${extras.join('%0A')}%0ASubtotal: ${currentCurrency()} ${convertPrice(cartTotalAED(), currentCurrency()).toFixed(2)}%0AName:%0ACity:%0ANotes:`;
}
function checkoutWhatsApp(){ if(cartCount()===0){ toast('Cart is empty'); return; } const phone='971559938295'; const text=buildOrderSummary(); window.location.href=`https://wa.me/${phone}?text=${text}`; }
function checkoutEmail(){   if(cartCount()===0){ toast('Cart is empty'); return; } const subject=encodeURIComponent('Order — RRD Collection'); const body=buildOrderSummary(); window.location.href=`mailto:sales@rrd-collection.com?subject=${subject}&body=${body}`; }

// Legacy class-based cart (for backward compatibility)
class ShoppingCart {
    constructor() {
        this.items = getCart().items;
        this.total = cartTotalAED();
        this.currentCurrency = currentCurrency();
    }

    addItem(product) {
        addToCart(product.id, 1);
    }

    removeItem(itemId) {
        removeFromCart(itemId);
    }

    increaseQuantity(itemId) {
        const item = this.items.find(item => item.id === itemId);
        if (item) {
            updateQty(itemId, item.qty + 1);
        }
    }

    decreaseQuantity(itemId) {
        const item = this.items.find(item => item.id === itemId);
        if (item && item.qty > 1) {
            updateQty(itemId, item.qty - 1);
        } else if (item && item.qty === 1) {
            removeFromCart(itemId);
        }
    }

    clearCart() {
        saveCart({items: [], currency: currentCurrency()});
        toast('Cart cleared!');
    }

    getCartItems() {
        return getCart().items;
    }

    getCartTotal() {
        return cartTotalAED();
    }

    formatPrice(price) {
        return formatPrice(price, this.currentCurrency);
    }
}

// Product catalog functionality (simplified)
class ProductCatalog {
    constructor() {
        this.products = PRODUCTS || [];
        this.filteredProducts = [...this.products];
        this.currentPage = 1;
        this.productsPerPage = 12;
        this.currentCurrency = currentCurrency();
        this.init();
    }

    init() {
        this.bindEvents();
        this.renderProducts();
    }

    bindEvents() {
        // Filter functionality
        const categoryFilter = qs('#category-filter');
        const priceFilter = qs('#price-filter');

        if (categoryFilter) {
            categoryFilter.addEventListener('change', () => this.applyFilters());
        }

        if (priceFilter) {
            priceFilter.addEventListener('change', () => this.applyFilters());
        }

        // Pagination
        const prevBtn = qs('#prev-page');
        const nextBtn = qs('#next-page');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousPage());
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextPage());
        }
    }

    applyFilters() {
        const categoryFilter = qs('#category-filter');
        const priceFilter = qs('#price-filter');

        let filtered = [...this.products];

        // Category filter
        if (categoryFilter && categoryFilter.value) {
            if (categoryFilter.value === 'featured') {
                filtered = filtered.filter(product => product.featured);
            } else {
                // For other categories, you can add specific logic
                filtered = filtered.filter(product => product.category === categoryFilter.value);
            }
        }

        // Price filter
        if (priceFilter && priceFilter.value) {
            const [min, max] = priceFilter.value.split('-').map(Number);
            filtered = filtered.filter(product => {
                const convertedPrice = convertPrice(product.price, this.currentCurrency);
                if (max) {
                    return convertedPrice >= min && convertedPrice <= max;
                } else {
                    return convertedPrice >= min;
                }
            });
        }

        this.filteredProducts = filtered;
        this.currentPage = 1;
        this.renderProducts();
    }

    renderProducts() {
        const container = qs('#products-container');
        if (!container) return;

        const startIndex = (this.currentPage - 1) * this.productsPerPage;
        const endIndex = startIndex + this.productsPerPage;
        const productsToShow = this.filteredProducts.slice(startIndex, endIndex);

        if (productsToShow.length === 0) {
            container.innerHTML = '<p class="no-products">No fragrances found matching your criteria.</p>';
            return;
        }

        const productsHTML = productsToShow.map(product => {
            const formattedPrice = formatPrice(product.price, this.currentCurrency);
            
            return `
                <div class="card">
                    <img src="${product.image}" alt="${product.name}" onerror="this.src='assets/img/placeholder.jpg'">
                    <div class="pad">
                        <h3>${product.name}</h3>
                        <div class="meta">${product.description}</div>
                        <div class="meta">Size: ${product.size}</div>
                        <div class="meta">Notes: ${product.notes.join(', ')}</div>
                        <div class="price">${formattedPrice}</div>
                        <div class="actions">
                            <button class="btn" onclick="addToCart('${product.id}')">Add to Cart</button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        container.innerHTML = productsHTML;
        this.updatePagination();
    }

    updatePagination() {
        const totalPages = Math.ceil(this.filteredProducts.length / this.productsPerPage);
        const currentPageEl = qs('#current-page');
        const totalPagesEl = qs('#total-pages');
        const prevBtn = qs('#prev-page');
        const nextBtn = qs('#next-page');

        if (currentPageEl) currentPageEl.textContent = this.currentPage;
        if (totalPagesEl) totalPagesEl.textContent = totalPages;
        if (prevBtn) prevBtn.disabled = this.currentPage === 1;
        if (nextBtn) nextBtn.disabled = this.currentPage === totalPages;
    }

    previousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.renderProducts();
        }
    }

    nextPage() {
        const totalPages = Math.ceil(this.filteredProducts.length / this.productsPerPage);
        if (this.currentPage < totalPages) {
            this.currentPage++;
            this.renderProducts();
        }
    }
}

// Initialize cart and catalog when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.cart = new ShoppingCart();
    window.productCatalog = new ProductCatalog();
    
    // Initialize cart drawer
    renderCartDrawer();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        ShoppingCart, 
        ProductCatalog,
        getCart,
        saveCart,
        addToCart,
        removeFromCart,
        updateQty,
        cartCount,
        cartTotalAED,
        renderCartDrawer,
        toggleCart,
        buildOrderSummary,
        checkoutWhatsApp,
        checkoutEmail
    };
} 