document.addEventListener("DOMContentLoaded", () => {
    // Inject CSS for Side Cart and Checkout Modal
    const cartCss = `
        /* General */
        * { box-sizing: border-box; }
        
        /* Side Cart Styles */
        #v-cart-overlay {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0, 0, 0, 0.6); z-index: 99999;
            opacity: 0; visibility: hidden; transition: all 0.3s ease;
            backdrop-filter: blur(3px);
        }
        #v-cart-overlay.active { opacity: 1; visibility: visible; }
        
        #v-side-cart {
            position: fixed; top: 0; right: -420px; width: 420px; max-width: 100%; height: 100vh;
            background: #fff; z-index: 100000; display: flex; flex-direction: column;
            box-shadow: -5px 0 20px rgba(0,0,0,0.15); transition: right 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        #v-side-cart.active { right: 0; }
        
        .v-cart-header {
            padding: 20px 25px; display: flex; justify-content: space-between; align-items: center;
            background: #084da1; color: #fff;
        }
        .v-cart-header h3 { margin: 0; font-size: 20px; color: #fff; font-weight: 600; letter-spacing: 1px; }
        .v-cart-close { background: none; border: none; font-size: 28px; cursor: pointer; color: #fff; line-height: 1; }
        
        .v-cart-body { flex: 1; overflow-y: auto; padding: 25px; background: #fcfcfc; }
        .v-cart-item {
            display: flex; gap: 15px; margin-bottom: 20px; padding: 15px;
            background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }
        .v-cart-item img {
            width: 80px; height: 80px; object-fit: contain; border: 1px solid #eee; border-radius: 6px; padding: 5px;
        }
        .v-cart-item-details { flex: 1; display: flex; flex-direction: column; justify-content: space-between; }
        .v-cart-item-title { font-size: 15px; font-weight: 600; margin: 0 0 5px 0; color: #333; line-height: 1.4; }
        .v-cart-item-price { color: #d0021b; font-weight: 700; font-size: 16px; white-space: nowrap; }
        
        .v-cart-controls-wrapper { display: flex; justify-content: space-between; align-items: center; margin-top: 10px; gap: 10px; }
        .v-cart-qty-controls {
            display: inline-flex; align-items: center; justify-content: center; background: #fff; border: 1px solid #084da1; border-radius: 4px; padding: 0; width: max-content; height: 40px; overflow: hidden;
        }
        .v-cart-qty-controls button {
            background: transparent !important; border: none !important; width: 40px !important; height: 40px !important; cursor: pointer; font-size: 20px !important; color: #084da1 !important; font-weight: normal; border-radius: 0 !important; transition: all 0.2s !important; display: inline-flex !important; align-items: center !important; justify-content: center !important; padding: 0 !important; line-height: 1 !important; box-shadow: none !important; flex: 0 0 auto !important; margin: 0 !important;
        }
        .v-cart-qty-controls button:hover { background: #f0f8ff !important; color: #084da1 !important; border-color: transparent !important; box-shadow: none !important; }
        .v-cart-qty-controls span { width: 50px !important; height: 40px !important; text-align: center; font-size: 18px !important; font-weight: 500 !important; color: #084da1 !important; display: inline-flex !important; align-items: center !important; justify-content: center !important; flex: 0 0 auto !important; margin: 0 !important; padding: 0 !important; line-height: 1 !important; }
        .v-cart-item-remove {
            color: #888; font-size: 20px; cursor: pointer; border: none; background: none; line-height: 1;
        }
        .v-cart-item-remove:hover { color: #d0021b; }
        
        .v-cart-footer { padding: 25px; background: #fff; box-shadow: 0 -2px 10px rgba(0,0,0,0.05); }
        .v-cart-total {
            display: flex; justify-content: space-between; font-size: 16px; color: #555; margin-bottom: 20px;
        }
        .v-cart-total span:last-child { color: #d0021b; font-size: 22px; font-weight: 800; }
        
        .v-cart-checkout-btn {
            display: block; width: 100%; padding: 16px; background: #084da1; color: #fff; border: none;
            border-radius: 6px; font-size: 16px; font-weight: 700; cursor: pointer; text-align: center;
            text-transform: uppercase; transition: all 0.3s ease; letter-spacing: 1px;
        }
        .v-cart-checkout-btn:hover { background: #06397a; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(8, 77, 161, 0.3); }
        .v-cart-empty { text-align: center; color: #888; margin-top: 60px; font-size: 16px; display: flex; flex-direction: column; align-items: center; gap: 15px; }
        .v-cart-empty i { font-size: 48px; color: #ccc; }

        /* Floating Cart Icon */
        #v-floating-cart {
            position: fixed; bottom: 40px; right: 40px; width: 65px; height: 65px;
            background: #084da1; color: #fff; border-radius: 50%; display: flex;
            align-items: center; justify-content: center; font-size: 28px;
            box-shadow: 0 4px 15px rgba(8, 77, 161, 0.4); cursor: pointer; z-index: 99998;
            transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        #v-floating-cart:hover { transform: scale(1.1); }
        #v-floating-cart .v-badge {
            position: absolute; top: -2px; right: -2px; background: #d0021b; color: #fff;
            border-radius: 50%; width: 24px; height: 24px; font-size: 13px;
            display: flex; align-items: center; justify-content: center; font-weight: bold; border: 2px solid #fff;
        }

        /* Checkout Modal */
        #v-checkout-modal {
            position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%) scale(0.9);
            width: 900px; max-width: 95%; max-height: 90vh; background: #fff; z-index: 100001;
            border-radius: 12px; display: flex; flex-direction: column; overflow: hidden;
            opacity: 0; visibility: hidden; transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        }
        #v-checkout-modal.active { opacity: 1; visibility: visible; transform: translate(-50%, -50%) scale(1); }
        .v-checkout-header {
            padding: 20px 30px; background: #f8f9fa; border-bottom: 1px solid #eee;
            display: flex; justify-content: space-between; align-items: center;
        }
        .v-checkout-header h2 { margin: 0; font-size: 22px; color: #333; }
        .v-checkout-close { background: none; border: none; font-size: 28px; cursor: pointer; color: #888; }
        
        .v-checkout-body { display: flex; flex: 1; overflow: hidden; }
        .v-checkout-form { flex: 3; padding: 30px; overflow-y: auto; }
        .v-checkout-summary { flex: 2; padding: 30px; background: #fcfcfc; border-left: 1px solid #eee; overflow-y: auto; }
        
        .form-group { margin-bottom: 20px; }
        .form-group label { display: block; font-weight: 600; margin-bottom: 8px; color: #444; font-size: 14px; }
        .form-group input, .form-group textarea {
            width: 100%; padding: 12px 15px; border: 1px solid #ccc; border-radius: 6px;
            font-size: 15px; transition: border-color 0.2s; font-family: inherit;
        }
        .form-group input:focus, .form-group textarea:focus { border-color: #084da1; outline: none; box-shadow: 0 0 0 3px rgba(8,77,161,0.1); }
        
        .v-checkout-items { margin-bottom: 20px; }
        .v-checkout-item { display: flex; justify-content: space-between; font-size: 14px; margin-bottom: 10px; color: #555; }
        .v-checkout-item-name { flex: 1; padding-right: 15px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .v-checkout-item-qty { font-weight: bold; margin-right: 15px; color: #888; }
        
        .v-checkout-totals { border-top: 1px solid #ddd; padding-top: 20px; }
        .v-checkout-totals-row { display: flex; justify-content: space-between; font-size: 15px; margin-bottom: 10px; color: #555; }
        .v-checkout-totals-row.final { font-size: 18px; font-weight: 700; color: #333; margin-top: 10px; padding-top: 10px; border-top: 1px dashed #ccc; }
        .v-checkout-totals-row.final span:last-child { color: #d0021b; font-size: 24px; }
        
        .v-btn-place-order {
            width: 100%; padding: 16px; background: #d0021b; color: #fff; border: none;
            border-radius: 6px; font-size: 18px; font-weight: 700; cursor: pointer;
            margin-top: 25px; transition: background 0.2s; text-transform: uppercase;
        }
        .v-btn-place-order:hover { background: #b00015; }

        @media (max-width: 768px) {
            .v-checkout-body { flex-direction: column; overflow-y: auto; }
            .v-checkout-form, .v-checkout-summary { overflow-y: visible; }
            #v-checkout-modal { max-height: 95vh; }
        }
    `;
    const style = document.createElement('style');
    style.innerHTML = cartCss;
    document.head.appendChild(style);

    // Inject Side Cart and Checkout Modal HTML
    const cartHtml = `
        <!-- Side Cart -->
        <div id="v-cart-overlay"></div>
        <div id="v-side-cart">
            <div class="v-cart-header">
                <h3>GIỎ HÀNG CỦA BẠN</h3>
                <button class="v-cart-close">&times;</button>
            </div>
            <div class="v-cart-body" id="v-cart-items-container"></div>
            <div class="v-cart-footer">
                <div class="v-cart-total">
                    <span>TỔNG TIỀN:</span>
                    <span id="v-cart-total-price">0 ₫</span>
                </div>
                <button class="v-cart-checkout-btn" id="v-checkout-btn">THANH TOÁN NGAY</button>
            </div>
        </div>
        
        <!-- Floating Button -->
        <div id="v-floating-cart">
            🛒
            <span class="v-badge" id="v-cart-badge">0</span>
        </div>

        <!-- Checkout Modal -->
        <div id="v-checkout-modal">
            <div class="v-checkout-header">
                <h2>Thông Tin Đặt Hàng</h2>
                <button class="v-checkout-close">&times;</button>
            </div>
            <div class="v-checkout-body">
                <div class="v-checkout-form">
                    <form id="v-order-form">
                        <div class="form-group">
                            <label>Họ và tên *</label>
                            <input type="text" id="c-name" required placeholder="Nhập họ và tên">
                        </div>
                        <div class="form-group">
                            <label>Số điện thoại *</label>
                            <input type="tel" id="c-phone" required placeholder="Nhập số điện thoại">
                        </div>
                        <div class="form-group">
                            <label>Địa chỉ giao hàng *</label>
                            <input type="text" id="c-address" required placeholder="Nhập địa chỉ nhận hàng">
                        </div>
                        <div class="form-group">
                            <label>Ghi chú đơn hàng (Tùy chọn)</label>
                            <textarea id="c-note" rows="3" placeholder="Ghi chú thêm về đơn hàng..."></textarea>
                        </div>
                    </form>
                </div>
                <div class="v-checkout-summary">
                    <h3 style="margin-top:0; border-bottom: 2px solid #084da1; padding-bottom: 10px; margin-bottom: 20px;">Đơn Hàng Của Bạn</h3>
                    <div class="v-checkout-items" id="v-checkout-items-list"></div>
                    <div class="v-checkout-totals">
                        <div class="v-checkout-totals-row">
                            <span>Tạm tính:</span>
                            <span id="v-checkout-subtotal">0 ₫</span>
                        </div>
                        <div class="v-checkout-totals-row">
                            <span>Phí vận chuyển:</span>
                            <span>Miễn phí</span>
                        </div>
                        <div class="v-checkout-totals-row final">
                            <span>TỔNG CỘNG:</span>
                            <span id="v-checkout-total">0 ₫</span>
                        </div>
                        <button type="submit" form="v-order-form" class="v-btn-place-order">ĐẶT HÀNG</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', cartHtml);

    // Core Logic
    let cart = JSON.parse(localStorage.getItem('iccdalan_cart')) || [];

    const overlay = document.getElementById('v-cart-overlay');
    const sideCart = document.getElementById('v-side-cart');
    const checkoutModal = document.getElementById('v-checkout-modal');
    
    function formatPrice(priceNum) { return priceNum.toLocaleString('vi-VN') + '\u00A0₫'; }
    function parsePrice(priceStr) { if(!priceStr) return 0; return parseInt(priceStr.replace(/[^0-9]/g, '')) || 0; }

    function saveCart() {
        localStorage.setItem('iccdalan_cart', JSON.stringify(cart));
        renderCart();
    }

    function openCart() {
        overlay.classList.add('active');
        sideCart.classList.add('active');
        checkoutModal.classList.remove('active');
        renderCart();
    }

    function closeAll() {
        overlay.classList.remove('active');
        sideCart.classList.remove('active');
        checkoutModal.classList.remove('active');
    }

    function openCheckout() {
        if(cart.length === 0) return alert('Giỏ hàng trống!');
        sideCart.classList.remove('active');
        overlay.classList.add('active');
        checkoutModal.classList.add('active');
        renderCheckout();
    }

    function renderCart() {
        const container = document.getElementById('v-cart-items-container');
        container.innerHTML = '';
        let total = 0, count = 0;

        if (cart.length === 0) {
            container.innerHTML = '<div class="v-cart-empty"><span style="font-size: 40px">🛒</span><p>Chưa có sản phẩm nào trong giỏ hàng.</p></div>';
        } else {
            cart.forEach((item, index) => {
                total += item.price * item.quantity;
                count += item.quantity;
                const el = document.createElement('div');
                el.className = 'v-cart-item';
                el.innerHTML = `
                    <img src="${item.image || './wp-content/uploads/woocommerce-placeholder.png'}" alt="${item.title}">
                    <div class="v-cart-item-details">
                        <p class="v-cart-item-title">${item.title}</p>
                        <div class="v-cart-controls-wrapper">
                            <div class="v-cart-item-price">${formatPrice(item.price)}</div>
                            <div class="v-cart-qty-controls">
                                <button class="v-btn-minus" data-index="${index}">-</button>
                                <span>${item.quantity}</span>
                                <button class="v-btn-plus" data-index="${index}">+</button>
                            </div>
                        </div>
                    </div>
                    <button class="v-cart-item-remove" data-index="${index}">&times;</button>
                `;
                container.appendChild(el);
            });
        }

        document.getElementById('v-cart-total-price').textContent = formatPrice(total);
        document.getElementById('v-cart-badge').textContent = count;
    }

    function renderCheckout() {
        const list = document.getElementById('v-checkout-items-list');
        list.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            total += item.price * item.quantity;
            list.innerHTML += `
                <div class="v-checkout-item">
                    <span class="v-checkout-item-name">${item.title}</span>
                    <span class="v-checkout-item-qty">x${item.quantity}</span>
                    <span>${formatPrice(item.price * item.quantity)}</span>
                </div>
            `;
        });
        document.getElementById('v-checkout-subtotal').textContent = formatPrice(total);
        document.getElementById('v-checkout-total').textContent = formatPrice(total);
    }

    // Bind UI Events
    document.querySelector('.v-cart-close').addEventListener('click', closeAll);
    document.querySelector('.v-checkout-close').addEventListener('click', closeAll);
    overlay.addEventListener('click', closeAll);
    document.getElementById('v-floating-cart').addEventListener('click', openCart);
    document.getElementById('v-checkout-btn').addEventListener('click', openCheckout);

    // Bind Cart Item Events (Plus, Minus, Remove)
    document.getElementById('v-cart-items-container').addEventListener('click', (e) => {
        const index = e.target.getAttribute('data-index');
        if (e.target.classList.contains('v-btn-plus')) {
            cart[index].quantity += 1; saveCart();
        } else if (e.target.classList.contains('v-btn-minus')) {
            if (cart[index].quantity > 1) cart[index].quantity -= 1;
            else cart.splice(index, 1);
            saveCart();
        } else if (e.target.classList.contains('v-cart-item-remove')) {
            cart.splice(index, 1); saveCart();
        }
    });

    // Handle Order Submission
    document.getElementById('v-order-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('c-name').value;
        alert(`Cảm ơn ${name}! Đơn hàng của bạn đã được tiếp nhận thành công. Chúng tôi sẽ liên hệ với bạn sớm nhất.`);
        cart = [];
        saveCart();
        closeAll();
        document.getElementById('v-order-form').reset();
    });

    // Intercept Add to Cart form on product details page
    const addToCartForm = document.querySelector('form.cart');
    if (addToCartForm) {
        addToCartForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const titleEl = document.getElementById('product-title');
            if(!titleEl) return;

            const title = titleEl.textContent.trim();
            const priceEl = document.getElementById('product-price');
            const price = parsePrice(priceEl ? priceEl.textContent : '0');
            const imgEl = document.getElementById('product-image');
            const image = imgEl ? imgEl.getAttribute('src') : '';
            const qtyInput = document.getElementById('quantity');
            const quantity = qtyInput ? parseInt(qtyInput.value) : 1;

            const urlParams = new URLSearchParams(window.location.search);
            const id = urlParams.get('id') || title.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();

            const existing = cart.find(i => i.id === id);
            if (existing) existing.quantity += quantity;
            else cart.push({ id, title, price, image, quantity });

            saveCart();
            openCart();
        });
    }

    renderCart();
});
