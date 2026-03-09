
function displayShippingForm() {
    const main = document.querySelector('main');
    main.innerHTML = `
    <div class="shipping-form-container" style="width:80%; max-width:600px; margin:40px auto; padding:20px; background:#f9f9f9; box-shadow:0 0 10px rgba(0,0,0,0.1); border-radius:4px;">
        <h2>Delivery Address</h2>
        <form id="shipping-form">
            <label for="firstName">First Name:</label><br>
            <input type="text" id="firstName" name="firstName" required style="width:100%; padding:8px; margin-bottom:10px;"><br>
            
            <label for="lastName">Last Name:</label><br>
            <input type="text" id="lastName" name="lastName" required style="width:100%; padding:8px; margin-bottom:10px;"><br>
            
            <label for="address">Address:</label><br>
            <input type="text" id="address" name="address" required style="width:100%; padding:8px; margin-bottom:10px;"><br>
            
            <label for="phone">Phone Number:</label><br>
            <input type="text" id="phone" name="phone" required style="width:100%; padding:8px; margin-bottom:10px;"><br>
            
            <label for="email">Email:</label><br>
            <input type="email" id="email" name="email" required style="width:100%; padding:8px; margin-bottom:20px;"><br>
            
            <div class="shipping-buttons" style="text-align:center;">
                <button type="button" id="back-shipping-btn" style="padding:8px 16px; margin-right:10px;">Back</button>
                <button type="button" id="done-shipping-btn" style="padding:8px 16px;">Done</button>
            </div>
        </form>
    </div>
    `;

    document.getElementById("back-shipping-btn").addEventListener("click", function () {
        displayCartSummary();
    });

    document.getElementById("done-shipping-btn").addEventListener("click", function () {
        submitShippingForm();
    });
}


function submitShippingForm() {
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const address = document.getElementById("address").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
        alert("Please enter a valid 10-digit Australian phone number.");
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    const orderData = {
        shipping: { firstName, lastName, address, phone, email },
        cart
    };

    fetch('place_order.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
    })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                displayConfirmationPage(firstName, lastName, address, phone, email);
            } else {
                alert("Error placing order: " + result.message);
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Order submission failed.");
        });
}


function displayConfirmationPage(firstName, lastName, address, phone, email) {
    const main = document.querySelector("main");
    let total = 0;

    let html = `
    <div class="cart-summary">
        <h2 style="text-align:center;">✅ Order Confirmation</h2>
        <h3>🛒 Products</h3>
        <table class="cart-table">
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Image</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Subtotal</th>
                </tr>
            </thead>
            <tbody>`;

    for (let id in cart) {
        const item = cart[id];
        const subtotal = item.quantity * item.price;
        total += subtotal;

        html += `
        <tr>
            <td>${item.name}</td>
            <td><img src="${id}.png" alt="${item.name}" style="width:60px;height:60px;"></td>
            <td>${item.quantity}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>$${subtotal.toFixed(2)}</td>
        </tr>`;
    }

    html += `</tbody></table>
        <h3>📦 Shipping Information</h3>
        <ul>
            <li><strong>Name:</strong> ${firstName} ${lastName}</li>
            <li><strong>Address:</strong> ${address}</li>
            <li><strong>Phone:</strong> ${phone}</li>
            <li><strong>Email:</strong> ${email}</li>
        </ul>
        <h3>💰 Total: $${total.toFixed(2)}</h3>

        <div style="text-align:center; margin-top:20px;">
            <span style="color:green; font-size:24px;">✔️</span>
            <p style="font-weight:bold; color:green; font-size:16px;">
                We have sent a receipt to your email.
            </p>
        </div>

        <div style="text-align:center; margin-top: 20px;">
            <button onclick="goHome()">Return to Home</button>
        </div>
    </div>`;

    main.innerHTML = html;
    cart = {};
    updateCartUI();
}

function goHome() {
    if (typeof loadHomePage === 'function') {
        loadHomePage(); 
    } else {
        location.reload(); 
    }
}
