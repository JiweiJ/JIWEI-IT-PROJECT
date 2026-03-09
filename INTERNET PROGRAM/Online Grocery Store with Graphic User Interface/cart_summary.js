
function displayCartSummary() {
    const main = document.querySelector('main');
    let html = `<div class="cart-summary">`;

    if (Object.keys(cart).length === 0) {
        html += `<p>Your cart is empty.</p>`;
    } else {
        html += `
        <table class="cart-table">
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
        `;
        for (let id in cart) {
            let item = cart[id];
            let total = item.quantity * item.price;
            html += `
            <tr data-product-id="${id}">
                <td>
    <img src="${id}.png" alt="${item.name}" style="width:60px;height:60px;object-fit:cover;margin-right:10px">

    <span>${item.name}</span>
</td>

                <td>
                    <button class="decrease-btn">-</button>
                    <span class="item-quantity">${item.quantity}</span>
                    <button class="increase-btn" ${item.quantity >= item.stock ? 'disabled' : ''}>+</button>
                </td>
                <td>$${item.price.toFixed(2)}</td>
                <td>$${total.toFixed(2)}</td>
                <td><button class="remove-btn">Remove</button></td>
            </tr>
            `;
        }
        html += `</tbody></table>`;
    }

    html += `
        <div class="cart-actions" style="text-align:center; margin-top: 20px;">
            <button id="checkout-btn">Check Out</button>
         
            <button id="clear-btn">Clear Cart</button>
        </div>
    </div>`;

    main.innerHTML = html;
    bindCartSummaryEvents();
    updateCartUI();

    const checkoutBtn = document.getElementById("checkout-btn");
if (checkoutBtn) {
    if (Object.keys(cart).length === 0) {
        checkoutBtn.disabled = true;
        checkoutBtn.style.opacity = 0.5;
        checkoutBtn.title = "Your cart is empty.";
    } else {
        checkoutBtn.disabled = false;
        checkoutBtn.style.opacity = 1;
        checkoutBtn.removeAttribute("title");
    }
}


setTimeout(() => {
    document.querySelectorAll('.remove-btn').forEach(btn => btn.click());

    const toast = document.createElement('div');
    toast.textContent = "🕒 Cart cleared automatically by clicking all Remove buttons.";
    Object.assign(toast.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        background: '#222',
        color: '#fff',
        padding: '10px 20px',
        borderRadius: '5px',
        zIndex: 10000,
        opacity: 0.95
    });
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
}, 1200000);
updateCheckoutButtonState();

}

function updateCheckoutButtonState() {
    const checkoutBtn = document.getElementById("checkout-btn");
    if (checkoutBtn) {
        if (Object.keys(cart).length === 0) {
            checkoutBtn.disabled = true;
            checkoutBtn.style.opacity = 0.5;
            checkoutBtn.title = "Your cart is empty.";
            checkoutBtn.style.cursor = 'not-allowed';
        } else {
            checkoutBtn.disabled = false;
            checkoutBtn.style.opacity = 1;
            checkoutBtn.removeAttribute("title");
            checkoutBtn.style.cursor = 'pointer';
        }
    }
}

function bindCartSummaryEvents() {
   
    document.querySelectorAll('.increase-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.closest('tr').getAttribute('data-product-id');
            if (cart[id].quantity < cart[id].stock) {
                cart[id].quantity++;
                updateCartSummaryUI();
            }
        });
    });

   
    document.querySelectorAll('.decrease-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.closest('tr').getAttribute('data-product-id');
            if (cart[id].quantity > 1) {
                cart[id].quantity--;
            } else {
                delete cart[id];
            }
            updateCartSummaryUI();
        });
    });

   
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.closest('tr').getAttribute('data-product-id');
            delete cart[id];
            updateCartSummaryUI();
        });
    });

   
    document.getElementById("checkout-btn")?.addEventListener("click", () => {
        displayShippingForm();
    });





    document.getElementById("clear-btn")?.addEventListener("click", () => {
        if (confirm("Are you sure you want to clear the cart?")) {
            cart = {};
            updateCartUI();
            displayCartSummary();
        }
    });
}


function updateCartSummaryUI() {
    const tbody = document.querySelector('.cart-summary .cart-table tbody');
    let html = "";
    for (let id in cart) {
        const item = cart[id];
        let total = item.quantity * item.price;
        html += `
        <tr data-product-id="${id}">
           <td>
    <img src="${id}.png" alt="${item.name}" style="width:60px;height:60px;object-fit:cover;margin-right:10px">

    <span>${item.name}</span>
</td>

            <td>
                <button class="decrease-btn">-</button>
                <span class="item-quantity">${item.quantity}</span>
                <button class="increase-btn" ${item.quantity >= item.stock ? 'disabled' : ''}>+</button>
            </td>
            <td>$${item.price.toFixed(2)}</td>
            <td>$${total.toFixed(2)}</td>
            <td><button class="remove-btn">Remove</button></td>
        </tr>`;
    }
    tbody.innerHTML = html;
    bindCartSummaryEvents();
    updateCartUI();
    updateCheckoutButtonState();
}


document.addEventListener("DOMContentLoaded", function () {
    const cartIcon = document.querySelector('.user-cart span:first-child');
    if (cartIcon) {
        cartIcon.style.cursor = "pointer";
        cartIcon.addEventListener('click', function () {
            displayCartSummary();
        });
    }
});
initNavigationEvents(); 
