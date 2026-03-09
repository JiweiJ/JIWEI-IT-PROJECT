let cart = {};

function updateCartUI() {
    let totalItems = 0;
    let totalPrice = 0;
    for (let id in cart) {
        totalItems += cart[id].quantity;
        totalPrice += cart[id].quantity * cart[id].price;
    }
    const cartInfo = document.getElementById("cart-info");
    if (cartInfo) {
        cartInfo.textContent = `${totalItems} items / $${totalPrice.toFixed(2)}`;
    }
}

function renderProducts(data) {
    const productGrid = document.querySelector('.product-grid');
    productGrid.style.gridTemplateColumns = "repeat(4, 1fr)";
    let html = "";
    if (data && Array.isArray(data.products)) {
        data.products.forEach(product => {
            const prodName = product.product_name || product.name || "Unknown Product";
            html += `
            <div class="product-item">
                <img src="${product.product_id}.png" alt="${prodName}">
                <h3>${prodName}</h3>
                <p>Price: $${product.unit_price}</p>
                <p>Quantity: ${product.unit_quantity}</p>
                <p>${parseInt(product.in_stock) < 1 ? 'out of stock' : 'In Stock: ' + product.in_stock}</p>
                <button class="add-btn" 
                    data-product-id="${product.product_id}" 
                    data-name="${prodName}"
                    data-price="${product.unit_price}" 
                    data-stock="${product.in_stock}"
                    ${parseInt(product.in_stock) < 1 ? 'disabled' : ''}>
                    Add
                </button>
            </div>
            `;
        });
        productGrid.innerHTML = html;
        bindAddButtons();
    } else {
        productGrid.innerHTML = "<p>No such product </p>";
    }
}

function bindAddButtons() {
    const addButtons = document.querySelectorAll('.add-btn');
    addButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const productId = btn.getAttribute('data-product-id');
            const name = btn.getAttribute('data-name');
            console.log("Adding product", productId, name); 
            const price = parseFloat(btn.getAttribute('data-price'));
            const stock = parseInt(btn.getAttribute('data-stock'));
            const currentQty = cart[productId] ? cart[productId].quantity : 0;
            if (currentQty < stock) {
                if (!cart[productId]) {
                    cart[productId] = { quantity: 0, price: price, stock: stock, name: name };
                }
                cart[productId].quantity++;
                updateCartUI();
                if (cart[productId].quantity >= stock) {
                    btn.disabled = true;
                }
            } else {
                btn.disabled = true;
            }
        });
    });
}
