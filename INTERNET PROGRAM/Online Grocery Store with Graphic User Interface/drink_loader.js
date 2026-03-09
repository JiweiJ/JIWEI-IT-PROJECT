
document.addEventListener("click", function (e) {
    const target = e.target.closest("li"); 
    if (!target) return;

    const text = target.textContent.trim();

    
    if (text === "Drink") loadDrinkProducts();
    if (text === "Freeze") loadFreezeProducts();
    if (text === "Fresh") loadFreshProducts();
    if (text === "Pet") loadPetProducts();
    if (text === "Household") loadHouseholdProducts();

    
    switch (text) {
        case "Soft Drink": loadSoftDrinkProducts(); break;
        case "water": loadWaterProducts(); break;
        case "Dairy": loadDairyProducts(); break;
        case "Alcohol": loadAlcoholProducts(); break;

        case "Fast Food": loadFastFoodProducts(); break;
        case "Meat": loadFreezeMeatProducts(); break;
        case "Fruits and Vegetables": loadFruitsAndVegetablesProducts(); break;
        case "Ice Cream": loadIceCreamProducts(); break;

        case "Vegetable": loadFreshVegetableProducts(); break;
        case "Seafood": loadFreshSeafoodProducts(); break;
        case "Fruits": loadFreshFruitsProducts(); break;
        case "spice": case "Spice": loadFreshSpiceProducts(); break;

        case "Dog": loadDogProducts(); break;
        case "Cat": loadCatProducts(); break;
        case "Others": loadOthersProducts(); break;

        case "Kitchen": loadKitchenProducts(); break;
        case "Bathroom": loadBathroomProducts(); break;
        case "Electrical Equipment": loadElectricalEquipmentProducts(); break;
    }
});



function loadDrinkProducts() {
    fetch('get_products.php?category=drink')
        .then(response => response.json())
        .then(data => {
            renderProducts(data);
        })
        .catch(error => {
            console.error(" Drink wrong：", error);
        });
}


function loadSoftDrinkProducts() {
    fetch('get_products.php?category=softdrink')
        .then(response => response.json())
        .then(data => {
            renderProducts(data);
        })
        .catch(error => {
            console.error("Soft Drink wrong：", error);
        });
}


function loadWaterProducts() {
    fetch('get_products.php?category=water')
        .then(response => response.json())
        .then(data => {
            renderProducts(data);
        })
        .catch(error => {
            console.error("water wrong：", error);
        });
}


function loadDairyProducts() {
    fetch('get_products.php?category=dairy')
        .then(response => response.json())
        .then(data => {
            renderProducts(data);
        })
        .catch(error => {
            console.error("Dairy wrong：", error);
        });
}


function loadAlcoholProducts() {
    fetch('get_products.php?category=alcohol')
        .then(response => response.json())
        .then(data => {
            renderProducts(data);
        })
        .catch(error => {
            console.error("Alcohol wrong：", error);
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
        productGrid.innerHTML = "<p>No such produict </p>";
    }
}
