document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search-input");
    const searchBtn = document.getElementById("search-btn");

    if (!searchInput || !searchBtn) {
        console.warn("Search input or button not found.");
        return;
    }

    
    searchInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            e.preventDefault();
            const query = searchInput.value.trim();
            if (query !== "") {
                searchProducts(query);
            }
        }
    });

    
    searchBtn.addEventListener("click", function () {
        const query = searchInput.value.trim();
        if (query !== "") {
            searchProducts(query);
        }
    });
});


function searchProducts(query) {
    fetch('get_products.php?search=' + encodeURIComponent(query))
        .then(response => response.json())
        .then(data => {
            renderProducts(data);
        })
        .catch(error => {
            console.error("wrong：", error);
        });
}
