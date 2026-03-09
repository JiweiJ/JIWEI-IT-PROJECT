<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $vin = $_POST['vin'] ?? '';
  $carsData = json_decode(file_get_contents('cars.json'), true);
  $carAvailable = false;

  foreach ($carsData['cars'] as $c) {
    if ($c['vin'] === $vin && $c['available']) {
      $carAvailable = true;
      break;
    }
  }

  if (!$carAvailable) {
    echo "<h2>This car has just been reserved by someone else.</h2>";
    echo "<p>Please <a href='index.php'>go back</a> and choose another available vehicle.</p>";
    exit;
  }
  
  $order = [
    'vin' => $_POST['vin'],
    'name' => $_POST['name'],
    'phone' => $_POST['phone'],
    'email' => $_POST['email'],
    'license' => $_POST['license'],
    'start' => $_POST['start'],
    'days' => $_POST['days'],
    'status' => 'pending',
    'id' => 'order_' . time()
  ];

  $ordersFile = 'orders.json';
  $orders = [];

  if (file_exists($ordersFile)) {
    $orders = json_decode(file_get_contents($ordersFile), true);
  }

  $orders[] = $order;
  file_put_contents($ordersFile, json_encode($orders, JSON_PRETTY_PRINT));

  $orderId = $order['id'];
  echo "<h2>Reservation Submitted</h2>";
  echo "<p>Your order is <strong>pending</strong>.</p>";
  echo "<p><a href='confirm.php?orderId=$orderId'>Click here to confirm your order</a></p>";
  exit;
}


$vin = $_GET['vin'] ?? '';

if (!$vin) {
  echo "<h2>No vehicle selected.</h2>";
  echo "<p>Please <a href='index.php'>go back</a> and choose a car to reserve.</p>";
  exit;
}

$json = file_get_contents('cars.json');
$data = json_decode($json, true);
$car = null;

foreach ($data['cars'] as $c) {
  if ($c['vin'] === $vin) {
    $car = $c;
    break;
  }
}
if (!$car) {
  echo "<p>Car not found.</p>";
  exit;
}

if (!$car['available']) {
    ?>
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Car Not Available</title>
    <link rel="stylesheet" href="style.css">
    <style>
      .reservation-container {
        max-width: 700px;
        margin: 40px auto;
        padding: 20px;
        font-family: sans-serif;
      }
      .reservation-header {
        display: flex;
        gap: 20px;
        align-items: center;
      }
      .reservation-header img {
        width: 200px;
        height: auto;
        object-fit: contain;
        background: #f9f9f9;
        border-radius: 6px;
      }
    </style>
  </head>
  <body>
  <div class="reservation-container">
    <div class="reservation-header">
      <img src="<?= $car['image'] ?>" alt="<?= $car['carModel'] ?>">
      <div>
        <h2><?= $car['brand'] . " " . $car['carModel'] ?> (<?= $car['carType'] ?>)</h2>
        <p><?= $car['description'] ?></p>
        <p><strong>Year:</strong> <?= $car['yearOfManufacture'] ?> | 
           <strong>Fuel:</strong> <?= $car['fuelType'] ?></p>
        <p><strong>Status:</strong> ❌ Not Available</p>
      </div>
    </div>
    <p style="margin-top: 30px; font-size: 18px; color: red;">
      This car is no longer available for reservation.
    </p>
    <a href="index.php">
      <button style="margin-top: 10px;">Choose another car</button>
    </a>
  </div>
  </body>
  </html>
  <?php
  exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Reservation</title>
  <link rel="stylesheet" href="style.css" />
  <style>
    .reservation-container {
      max-width: 700px;
      margin: 40px auto;
      padding: 20px;
      border-radius: 8px;
      background: #fff;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      font-family: sans-serif;
    }
    .reservation-header {
      display: flex;
      gap: 20px;
      align-items: center;
      margin-bottom: 20px;
    }
    .reservation-header img {
      width: 200px;
      height: auto;
      border-radius: 6px;
      object-fit: contain;
      background: #f9f9f9;
    }
    .reservation-details {
      flex: 1;
    }
    form label {
      display: block;
      margin: 10px 0 5px;
    }
    form input {
      width: 100%;
      padding: 8px;
      margin-bottom: 10px;
      box-sizing: border-box;
    }
    form button {
      margin-right: 10px;
      padding: 8px 16px;
      background-color: #007BFF;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    form button[type="button"]:last-child {
      background-color: #888;
    }
  </style>
  <script>
    function updateTotal() {
      const days = parseInt(document.getElementById("days").value || 0);
      const pricePerDay = <?= $car['pricePerDay'] ?>;
      document.getElementById("total").innerText = "$" + (days * pricePerDay);
      const data = {
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        license: document.getElementById("license").value,
        start: document.getElementById("start").value,
        days: days
      };
      localStorage.setItem("form_<?= $vin ?>", JSON.stringify(data));
    }

    function cancelForm() {
      localStorage.removeItem("form_<?= $vin ?>");
      window.location.href = "index.php";
    }

    window.onload = function() {
      const saved = JSON.parse(localStorage.getItem("form_<?= $vin ?>") || "null");
      if (saved) {
        document.getElementById("name").value = saved.name;
        document.getElementById("phone").value = saved.phone;
        document.getElementById("email").value = saved.email;
        document.getElementById("license").value = saved.license;
        document.getElementById("start").value = saved.start;
        document.getElementById("days").value = saved.days;
        updateTotal();
      }
    };
  </script>
</head>

<body>
<header style="text-align: center; margin-top: 20px;">
  <a href="index.php">
    <img src="images/logo.png" alt="Car Rental Logo" style="height: 50px;">
  </a>
</header>

<div class="reservation-container">
  <div class="reservation-header">
    <img src="<?= $car['image'] ?>" alt="<?= $car['carModel'] ?>">
    <div class="reservation-details">
      <h2>Reserve: <?= $car['brand'] . " " . $car['carModel'] ?> (<?= $car['carType'] ?>)</h2>
      <p><?= $car['description'] ?></p>
      <p><strong>Year:</strong> <?= $car['yearOfManufacture'] ?> | <strong>Fuel:</strong> <?= $car['fuelType'] ?></p>
      <p><strong>Price Per Day:</strong> $<?= $car['pricePerDay'] ?></p>
    </div>
  </div>

  <form method="POST" action="reservation.php?vin=<?= $vin ?>">
    <input type="hidden" name="vin" value="<?= $vin ?>">
  
    <label>Name:</label>
    <input type="text" id="name" name="name" onchange="updateTotal()" required>
    <span id="nameFeedback" class="feedback"></span>

    <label>Phone:</label>
    <input type="tel" id="phone" name="phone" onchange="updateTotal()" required>
    <span id="phoneFeedback" class="feedback"></span>

    <label>Email:</label>
    <input type="email" id="email" name="email" onchange="updateTotal()" required>
    <span id="emailFeedback" class="feedback"></span>

    <label>Driver's License:</label>
    <input type="text" id="license" name="license" onchange="updateTotal()" required>
    <span id="licenseFeedback" class="feedback"></span>

    <label>Start Date:</label>
    <input type="date" id="start" name="start" onchange="updateTotal()" required>
    <span id="startFeedback" class="feedback"></span>

    <label>Rental Days:</label>
    <input type="number" id="days" name="days" min="1" onchange="updateTotal()" required>
    <span id="daysFeedback" class="feedback"></span>

    <p><strong>Estimated Total: <span id="total">$0</span></strong></p>

    <button type="submit" id="submitBtn" disabled>Submit</button>
    <button type="button" onclick="cancelForm()">Cancel</button>
  </form>
</div>
<script src="script.js"></script>

</body>
</html>
