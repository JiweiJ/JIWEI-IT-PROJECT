function initNavigationEvents() {
    document.addEventListener("click", function (e) {
        const target = e.target.closest("li");
        if (!target) return;

        const text = target.textContent.trim();

        if (text === "Home") loadHomePage();
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
}


document.addEventListener("DOMContentLoaded", initNavigationEvents);
