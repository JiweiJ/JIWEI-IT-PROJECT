<?php
header("Content-Type: application/json");


$orderData = json_decode(file_get_contents("php://input"), true);

if (!$orderData || !isset($orderData['cart'])) {
    echo json_encode(['success' => false, 'message' => 'Invalid order data.']);
    exit;
}


$host = 'localhost';
$db   = 'assignment1';
$user = 'root';
$pass = '';
$dsn = "mysql:host=$host;dbname=$db;charset=utf8";

try {
    $pdo = new PDO($dsn, $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    
    $pdo->beginTransaction();
    
    foreach ($orderData['cart'] as $productId => $item) {
        
        $stmt = $pdo->prepare("SELECT in_stock FROM products WHERE product_id = ?");
        $stmt->execute([$productId]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if (!$row) {
            $pdo->rollBack();
            echo json_encode(['success' => false, 'message' => "Product ID {$productId} not found."]);
            exit;
        }
        $currentStock = (int)$row['in_stock'];
        
        
        if ($currentStock < $item['quantity']) {
            $pdo->rollBack();
            echo json_encode(['success' => false, 'message' => "Insufficient stock for product ID {$productId}."]);
            exit;
        }
        
        
        $newStock = $currentStock - $item['quantity'];
        
        
        $stmt = $pdo->prepare("UPDATE products SET in_stock = ? WHERE product_id = ?");
        $stmt->execute([$newStock, $productId]);
    }
    
   
    $pdo->commit();
    
    echo json_encode(['success' => true, 'message' => 'Order placed successfully.']);
} catch (PDOException $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
