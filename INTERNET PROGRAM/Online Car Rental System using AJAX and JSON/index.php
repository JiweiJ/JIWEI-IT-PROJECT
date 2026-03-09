<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Car Rental</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
<div id="last-reserve-btn-container">
  <button id="lastReserveBtn">Reservation</button>
</div>


<header>
	
  <div class="topbar">
    <a href="index.php">
    <img src="images/logo.png" alt="Logo" class="logo" />
  </a>

    <h1>Car Rental</h1>
  </div>

  <div class="search-area">
	<div class="search-wrapper">
  <input type="text" id="searchInput" placeholder="Search by keyword..." autocomplete="off" />
  <div class="suggestion-box" id="suggestions"></div>
  
</div>

    <select id="filterType">
      <option value="">All Types</option>
      <option value="Sedan">Sedan</option>
      <option value="SUV">SUV</option>
      <option value="MPV">MPV</option>
      <option value="Coupe">Coupe</option>
      <option value="Pickup">Pickup</option>
      <option value="ORV">ORV</option>
    </select>
    <select id="filterBrand">
      <option value="">All Brands</option>
      <option value="Toyota">Toyota</option>
      <option value="Honda">Honda</option>
      <option value="Tesla">Tesla</option>
      <option value="MINI">MINI</option>
      <option value="Ford">Ford</option>
      <option value="Mercedes-Benz">Mercedes-Benz</option>
      <option value="Jeep">Jeep</option>
    </select>
    <button id="searchBtn">Search</button>
    <div class="suggestion-box" id="suggestions"></div>
  </div>
</header>



  <main>
    <div id="carGrid" class="grid"></div>
  </main>

  <script src="script.js"></script>
</body>
</html>
