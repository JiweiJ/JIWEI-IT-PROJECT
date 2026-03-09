

document.addEventListener("click", function (e) {
    const target = e.target.closest("li[data-category]");
    if (!target) return;

    const category = target.getAttribute("data-category");

    switch (category) {
        case "freeze": loadFreezeProducts(); break;
        case "fastfood": loadFastFoodProducts(); break;
        case "meat": loadFreezeMeatProducts(); break;
        case "fruitsandvegetables": loadFruitsAndVegetablesProducts(); break;
        case "icecream": loadIceCreamProducts(); break;

        case "drink": loadDrinkProducts(); break;
        case "softdrink": loadSoftDrinkProducts(); break;
        case "water": loadWaterProducts(); break;
        case "dairy": loadDairyProducts(); break;
        case "alcohol": loadAlcoholProducts(); break;

        case "fresh": loadFreshProducts(); break;
        case "vegetable": loadFreshVegetableProducts(); break;
        case "seafood": loadFreshSeafoodProducts(); break;
        case "fruits": loadFreshFruitsProducts(); break;
        case "spice": loadFreshSpiceProducts(); break;

        case "pet": loadPetProducts(); break;
        case "dog": loadDogProducts(); break;
        case "cat": loadCatProducts(); break;
        case "others": loadOthersProducts(); break;

        case "household": loadHouseholdProducts(); break;
        case "kitchen": loadKitchenProducts(); break;
        case "bathroom": loadBathroomProducts(); break;
        case "electricalequipment": loadElectricalEquipmentProducts(); break;
    }
});

function loadFreezeProducts() {
    fetch('get_products.php?category=freeze')
        .then(response => response.json())
        .then(data => {
            renderProducts(data);
        })
        .catch(error => {
            console.error("Freeze wrong：", error);
        });
}

function loadFastFoodProducts() {
    fetch('get_products.php?category=fastfood')
        .then(response => response.json())
        .then(data => {
            renderProducts(data);
        })
        .catch(error => {
            console.error("Fast Food wrong：", error);
        });
}

function loadFreezeMeatProducts() {
    fetch('get_products.php?category=meat')
        .then(response => response.json())
        .then(data => {
            renderProducts(data);
        })
        .catch(error => {
            console.error("Meat wrong：", error);
        });
}

function loadFruitsAndVegetablesProducts() {
    fetch('get_products.php?category=fruitsandvegetables')
        .then(response => response.json())
        .then(data => {
            renderProducts(data);
        })
        .catch(error => {
            console.error("Fruits and Vegetables wrong：", error);
        });
}

function loadIceCreamProducts() {
    fetch('get_products.php?category=icecream')
        .then(response => response.json())
        .then(data => {
            renderProducts(data);
        })
        .catch(error => {
            console.error("Ice Cream wrong：", error);
        });
}
