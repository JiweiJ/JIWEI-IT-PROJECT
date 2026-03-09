<?php
header("Content-Type: application/json");


$category = isset($_GET['category']) ? $_GET['category'] : '';
$search = isset($_GET['search']) ? trim($_GET['search']) : '';


$host = 'localhost';
$db   = 'assignment1';
$user = 'root';     
$pass = '';         

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
    exit;
}


if ($search !== '') {
    $query = "SELECT product_id, product_name, unit_price, unit_quantity, in_stock 
              FROM products 
              WHERE product_name LIKE :search";
    $stmt = $pdo->prepare($query);
    $stmt->execute(['search' => '%' . $search . '%']);
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(['products' => $products]);
    exit;
}


if ($category === 'freeze') {
    $query = "SELECT product_id, product_name, unit_price, unit_quantity, in_stock FROM products WHERE product_id BETWEEN 1 AND 10";
} elseif ($category === 'fastfood') {
    $query = "SELECT product_id, product_name, unit_price, unit_quantity, in_stock FROM products WHERE product_id IN (1,2,3,4,5)";
} elseif ($category === 'meat') {
    $query = "SELECT product_id, product_name, unit_price, unit_quantity, in_stock FROM products WHERE product_id = 6";
} elseif ($category === 'fruitsandvegetables') {
    $query = "SELECT product_id, product_name, unit_price, unit_quantity, in_stock FROM products WHERE product_id IN (7,8)";
} elseif ($category === 'icecream') {
    $query = "SELECT product_id, product_name, unit_price, unit_quantity, in_stock FROM products WHERE product_id IN (9,10)";
} elseif ($category === 'fresh') {
    $query = "SELECT product_id, product_name, unit_price, unit_quantity, in_stock FROM products WHERE product_id IN (11,12,13,14,15,16,17,18,20,21)";
} elseif ($category === 'freshmeat') {
    $query = "SELECT product_id, product_name, unit_price, unit_quantity, in_stock FROM products WHERE product_id IN (11,12,13)";
} elseif ($category === 'freshvegetable') {
    $query = "SELECT product_id, product_name, unit_price, unit_quantity, in_stock FROM products WHERE product_id IN (14,15)";
} elseif ($category === 'freshseafood') {
    $query = "SELECT product_id, product_name, unit_price, unit_quantity, in_stock FROM products WHERE product_id = 16";
} elseif ($category === 'freshfruits') {
    $query = "SELECT product_id, product_name, unit_price, unit_quantity, in_stock FROM products WHERE product_id = 17";
} elseif ($category === 'freshspice') {
    $query = "SELECT product_id, product_name, unit_price, unit_quantity, in_stock FROM products WHERE product_id IN (18,20,21)";
} elseif ($category === 'drink') {
    $query = "SELECT product_id, product_name, unit_price, unit_quantity, in_stock FROM products WHERE product_id IN (22,23,24,26,27,28,29)";
} elseif ($category === 'softdrink') {
    $query = "SELECT product_id, product_name, unit_price, unit_quantity, in_stock FROM products WHERE product_id = 22";
} elseif ($category === 'water') {
    $query = "SELECT product_id, product_name, unit_price, unit_quantity, in_stock FROM products WHERE product_id IN (23,24)";
} elseif ($category === 'dairy') {
    $query = "SELECT product_id, product_name, unit_price, unit_quantity, in_stock FROM products WHERE product_id IN (26,27)";
} elseif ($category === 'alcohol') {
    $query = "SELECT product_id, product_name, unit_price, unit_quantity, in_stock FROM products WHERE product_id IN (28,29)";
} elseif ($category === 'pet') {
    $query = "SELECT product_id, product_name, unit_price, unit_quantity, in_stock FROM products WHERE product_id IN (30,32,33,34)";
} elseif ($category === 'dog') {
    $query = "SELECT product_id, product_name, unit_price, unit_quantity, in_stock FROM products WHERE product_id = 30";
} elseif ($category === 'cat') {
    $query = "SELECT product_id, product_name, unit_price, unit_quantity, in_stock FROM products WHERE product_id = 32";
} elseif ($category === 'others') {
    $query = "SELECT product_id, product_name, unit_price, unit_quantity, in_stock FROM products WHERE product_id IN (33,34)";
} elseif ($category === 'household') {
    $query = "SELECT product_id, product_name, unit_price, unit_quantity, in_stock FROM products WHERE product_id IN (35,36,37,38)";
} elseif ($category === 'kitchen') {
    $query = "SELECT product_id, product_name, unit_price, unit_quantity, in_stock FROM products WHERE product_id = 35";
} elseif ($category === 'bathroom') {
    $query = "SELECT product_id, product_name, unit_price, unit_quantity, in_stock FROM products WHERE product_id IN (36,37)";
} elseif ($category === 'electricalequipment') {
    $query = "SELECT product_id, product_name, unit_price, unit_quantity, in_stock FROM products WHERE product_id = 38";
} else {
    
    $query = "SELECT product_id, product_name, unit_price, unit_quantity, in_stock FROM products";
}

$stmt = $pdo->prepare($query);
$stmt->execute();
$products = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode(['products' => $products]);
?>
