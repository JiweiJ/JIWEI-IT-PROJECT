

document.addEventListener("DOMContentLoaded", function() {
    
    const navItems = document.querySelectorAll('nav > ul > li');
    navItems.forEach(function(li) {
        if (li.textContent.trim().startsWith("Fresh")) {
            li.addEventListener("click", function(e) {
                if (e.target === li) {
                    e.stopPropagation();
                    loadFreshProducts();
                }
            });
        }
    });

    
    const dropdownItems = document.querySelectorAll('nav .dropdown-menu li');
    dropdownItems.forEach(function(item) {
        const text = item.textContent.trim();
        switch(text) {
            case "Meat":
    item.addEventListener("click", function(e) {
        e.stopPropagation();
        loadFreshMeatProducts();
    });
    break;
            case "Vegetable":
                item.addEventListener("click", function(e) {
                    e.stopPropagation();
                    loadFreshVegetableProducts();
                });
                break;
            case "Seafood":
                item.addEventListener("click", function(e) {
                    e.stopPropagation();
                    loadFreshSeafoodProducts();
                });
                break;
            case "Fruits":
                item.addEventListener("click", function(e) {
                    e.stopPropagation();
                    loadFreshFruitsProducts();
                });
                break;
            case "spice":
            case "Spice":
                item.addEventListener("click", function(e) {
                    e.stopPropagation();
                    loadFreshSpiceProducts();
                });
                break;
        }
    });
});


function loadFreshProducts() {
    fetch('get_products.php?category=fresh')
        .then(response => response.json())
        .then(data => {
            renderProducts(data);
        })
        .catch(error => {
            console.error("Fresh wrong：", error);
        });
}


function loadFreshMeatProducts() {
    fetch('get_products.php?category=freshmeat')  

        .then(response => response.json())
        .then(data => {
            renderProducts(data);
        })
        .catch(error => {
            console.error("Fresh Meat wrong：", error);
        });
}


function loadFreshVegetableProducts() {
    fetch('get_products.php?category=freshvegetable')
        .then(response => response.json())
        .then(data => {
            renderProducts(data);
        })
        .catch(error => {
            console.error("Fresh Vegetable wrong：", error);
        });
}


function loadFreshSeafoodProducts() {
    fetch('get_products.php?category=freshseafood')
        .then(response => response.json())
        .then(data => {
            renderProducts(data);
        })
        .catch(error => {
            console.error("Fresh Seafood wrong：", error);
        });
}


function loadFreshFruitsProducts() {
    fetch('get_products.php?category=freshfruits')
        .then(response => response.json())
        .then(data => {
            renderProducts(data);
        })
        .catch(error => {
            console.error("Fresh Fruits wrong", error);
        });
}


function loadFreshSpiceProducts() {
    fetch('get_products.php?category=freshspice')
        .then(response => response.json())
        .then(data => {
            renderProducts(data);
        })
        .catch(error => {
            console.error("Fresh spice wrong：", error);
        });
}


function renderProducts(data) {
    const productGrid = document.querySelector('.product-grid');
    productGrid.style.gridTemplateColumns = "repeat(4, 1fr)";
    let html = "";
    if (data && Array.isArray(data.products)) {
        data.products.forEach(product => {
            html += `
            <div class="product-item">
                <img src="${product.product_id}.png" alt="${product.product_name}">
                <h3>${product.product_name}</h3>
                <p>Price: $${product.unit_price}</p>
                <p>Quantity: ${product.unit_quantity}</p>
                <p>${parseInt(product.in_stock) < 1 ? 'out of stock' : 'In Stock: ' + product.in_stock}</p>
                <button class="add-btn" 
                    data-product-id="${product.product_id}" 
                    data-name="${product.product_name}"
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
