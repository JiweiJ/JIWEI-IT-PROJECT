<?php
$orderId = $_GET['orderId'] ?? '';
$orders = json_decode(file_get_contents('orders.json'), true);
$cars = json_decode(file_get_contents('cars.json'), true);
$found = false;
$vin = '';

foreach ($orders as &$order) {
  if ($order['id'] === $orderId) {
    $order['status'] = 'confirmed';
    $vin = $order['vin'];
    $found = true;
    break;
  }
}
unset($order);

if ($found) {
  foreach ($cars['cars'] as &$car) {
    if ($car['vin'] === $vin) {
      $car['available'] = false;
      break;
    }
  }
  unset($car);

  file_put_contents('orders.json', json_encode($orders, JSON_PRETTY_PRINT));
  file_put_contents('cars.json', json_encode($cars, JSON_PRETTY_PRINT));

  echo "<h2>Order confirmed!</h2>";
  echo "<p>This car has been reserved and is no longer available.</p>";
  echo "<a href='index.php'>Return to Homepage</a>";
} else {
  echo "<p>Order not found.</p>";
}
?>
