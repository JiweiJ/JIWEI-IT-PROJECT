document.addEventListener("DOMContentLoaded", function() {
    
    const productGrid = document.querySelector('.product-grid');
    const homeContent = productGrid.innerHTML;

    
    function loadHomePage() {
        const main = document.querySelector('main');
        const html = `
            <div class="product-grid">
                <div class="product-item"><img src="Freeze.png" alt="Freeze"><h3>Freeze</h3></div>
                <div class="product-item"><img src="Drink.png" alt="Drink"><h3>Drink</h3></div>
                <div class="product-item"><img src="Fresh.png" alt="Fresh"><h3>Fresh</h3></div>
                <div class="product-item"><img src="Pet.png" alt="Pet"><h3>Pet</h3></div>
                <div class="product-item household"><img src="Household.png" alt="Household"><h3>Household</h3></div>
            </div>
        `;
        main.innerHTML = html;
        bindHomeImages();  
    }
    

   
    const logo = document.querySelector('.logo img');
    if (logo) {
        logo.style.cursor = "pointer"; 
        logo.addEventListener("click", function(e) {
            e.stopPropagation();
            loadHomePage();
        });
    }
    
    const homeNav = document.querySelector('nav > ul > li:first-child');
    if (homeNav) {
        homeNav.style.cursor = "pointer";
        homeNav.addEventListener("click", function(e) {
            e.stopPropagation();
            loadHomePage();
        });
    }

   
    function bindHomeImages() {
        const productItems = document.querySelectorAll('.product-grid .product-item');
        productItems.forEach(function(item) {
            const img = item.querySelector('img');
            if (img) {
                
                const alt = img.getAttribute('alt').toLowerCase();
                
                img.replaceWith(img.cloneNode(true));
                const newImg = item.querySelector('img');
                switch (alt) {
                    case "freeze":
                        newImg.style.cursor = "pointer";
                        newImg.addEventListener("click", function() {
                            loadFreezeProducts();
                        });
                        break;
                    case "drink":
                        newImg.style.cursor = "pointer";
                        newImg.addEventListener("click", function() {
                            loadDrinkProducts();
                        });
                        break;
                    case "fresh":
                        newImg.style.cursor = "pointer";
                        newImg.addEventListener("click", function() {
                            loadFreshProducts();
                        });
                        break;
                    case "pet":
                        newImg.style.cursor = "pointer";
                        newImg.addEventListener("click", function() {
                            loadPetProducts();
                        });
                        break;
                    case "household":
                        newImg.style.cursor = "pointer";
                        newImg.addEventListener("click", function() {
                            loadHouseholdProducts();
                        });
                        break;
                }
            }
        });
    }
    
    
    bindHomeImages();
});

window.loadHomePage = loadHomePage;
window.loadFreezeProducts = loadFreezeProducts;
window.loadDrinkProducts = loadDrinkProducts;
window.loadFreshProducts = loadFreshProducts;
window.loadPetProducts = loadPetProducts;
window.loadHouseholdProducts = loadHouseholdProducts;
