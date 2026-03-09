<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Home Page with Dropdown Menus & Household Product</title>
    <style>
        
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
        }
        
        header {
            background-color: #f2f2f2;
            display: flex;
            align-items: center;
            padding: 10px 20px;
        }
        .search-container {
            flex: 1;
        }
        .search-container input[type="text"] {
            width: 100%;
            padding: 8px;
            box-sizing: border-box;
        }
        .logo {
            margin: 0 20px;
        }
        .logo img {
            height: 50px;
            width: auto;
            transition: transform 0.3s ease;
        }
        .logo img:hover {
            transform: scale(1.1);
        }
        .user-cart {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .user-cart span {
            cursor: pointer;
            transition: transform 0.3s ease;
        }
        .user-cart span:hover {
            transform: scale(1.1);
        }
        .cart-summary {
            width: 100%;               
            max-width: 1400px;         
            margin: 40px auto;        
            padding: 20px;
            background-color: #f9f9f9; 
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            border-radius: 4px;
         }
         .cart-summary {
  width: 80%;
  max-width: 800px;         
  margin: 40px auto;        
  padding: 20px;
  background-color: #f9f9f9;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  border-radius: 4px;
}


.cart-summary .cart-table {
  margin: 0 auto;       
  width: 100%;          
  border-collapse: collapse; 
}


.cart-summary th, .cart-summary td {
  text-align: center;
  padding: 10px;
  font-size: 16px;  
}


.cart-summary thead tr {
  background-color: #e6e6e6;
}


.cart-summary .cart-table,
.cart-summary .cart-table th,
.cart-summary .cart-table td {
  border: 1px solid #ccc;
}


       
        nav {
            background-color: #e6e6e6;
            padding: 10px 20px;
        }
        nav ul {
            margin: 0;
            padding: 0;
            list-style: none;
            display: flex;
            gap: 20px;
            justify-content: center;
        }
        nav li {
            position: relative;
            cursor: pointer;
            transition: color 0.3s ease, transform 0.3s ease;
        }
        nav li:hover {
            color: #007BFF;
            transform: scale(1.1);
        }
        
        .dropdown-menu {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            background: #fff;
            padding: 10px 0;
            box-shadow: 0 2px 8px rgba(0,0,0,0.15);
            min-width: 150px;
            z-index: 1000;
        }
        .dropdown-menu li {
            padding: 8px 20px;
            white-space: nowrap;
            transition: background-color 0.3s ease;
        }
        .dropdown-menu li:hover {
            background-color: #f2f2f2;
        }
        
        nav li:hover .dropdown-menu {
            display: block;
        }
        
        .product-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            padding: 20px;
            box-sizing: border-box;
            max-width: 1200px; 
            margin: 0 auto;
        }

        .product-item {
            border: 1px solid #ccc;
            padding: 10px;
            text-align: center;
            background-color: #fff;
        }
        .product-item img {
            width: 200px;
            height: 200px;
            object-fit: cover;
            margin-bottom: 10px;
            transition: transform 0.3s ease;
        }
        .product-item img:hover {
            transform: scale(1.05);
        }
        .product-item h3 {
            font-size: 16px;
            margin: 5px 0;
        }
        
        .product-item.household {
            grid-column: 1 / -1;
        }
    </style>
</head>
<body>

    
    <header>
    <div class="search-container">
    <input type="text" id="search-input" placeholder="Search for Anything">
    <button id="search-btn">Search</button>
</div>


        <div class="logo">
            <img src="logo_final.png" alt="Normal Market Logo">
        </div>
        <div class="user-cart">
            <span>🛒</span>
            <span id="cart-info">0 items / $0.00</span>
            <span>👤</span>
        </div>
    </header>

    
    <nav>
        <ul>
            <li>Home</li>
            <li data-category="freeze">
    Freeze
    <ul class="dropdown-menu">
        <li data-category="fastfood">Fast Food</li>
        <li data-category="meat">Meat</li>
        <li data-category="fruitsandvegetables">Fruits and Vegetables</li>
        <li data-category="icecream">Ice Cream</li>
                </ul>
             </li>
             <li data-category="fresh">
    Fresh
    <ul class="dropdown-menu">
        <li data-category="freshmeat">Meat</li>
        <li data-category="freshvegetable">Vegetable</li>
        <li data-category="freshseafood">Seafood</li>
        <li data-category="freshfruits">Fruits</li>
        <li data-category="freshspice">Spice</li>
    </ul>
</li>
<li data-category="drink">
    Drink
    <ul class="dropdown-menu">
        <li>Soft Drink</li>
        <li>water</li>
        <li>Dairy</li>
        <li>Alcohol</li>
    </ul>
</li>
<li data-category="pet">
    Pet
    <ul class="dropdown-menu">
        <li>Dog</li>
        <li>Cat</li>
        <li>Others</li>
    </ul>
</li>
<li data-category="household">
    Household
    <ul class="dropdown-menu">
        <li>Kitchen</li>
        <li>Bathroom</li>
        <li>Electrical Equipment</li>
    </ul>
</li>

        </ul>
    </nav>

    
    <main>
        <div class="product-grid">
            
            <div class="product-item">
                <img src="Freeze.png" alt="Freeze">
                <h3>Freeze</h3>
            </div>
            <div class="product-item">
                <img src="Drink.png" alt="Drink">
                <h3>Drink</h3>
            </div>
            
            <div class="product-item">
                <img src="Fresh.png" alt="Fresh">
                <h3>Fresh</h3>
            </div>
            <div class="product-item">
                <img src="Pet.png" alt="Pet">
                <h3>Pet</h3>
            </div>
            
            <div class="product-item household">
                <img src="Household.png" alt="Household">
                <h3>Household</h3>
            </div>
        </div>
    </main>

<script src="freeze_loader.js"></script>
<script src="fresh_loader.js"></script>
<script src="drink_loader.js"></script>
<script src="pet_loader.js"></script>
<script src="household_loader.js"></script>
<script src="home_loader.js"></script>
<script src="shopping_cart.js"></script>
<script src="cart_summary.js"></script>
<script src="shipping.js"></script>
<script src="search.js"></script>
<script src="nav_loader.js"></script>

</body>
</html>

