CREATE DATABASE assignment1;
USE assignment1;

-- ----------------------------
-- Table structure for products
-- ----------------------------
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `product_id` int(10) unsigned DEFAULT NULL,
  `product_name` varchar(50) DEFAULT NULL,
  `unit_price` float(8,2) DEFAULT NULL,
  `unit_quantity` varchar(15) DEFAULT NULL,
  `in_stock` int(10) unsigned DEFAULT NULL
);

-- ----------------------------
-- Records of products
-- ----------------------------
INSERT INTO `products` VALUES (1, 'Whiting Filets Light Batter', 40.00, '1KG', 99);
INSERT INTO `products` VALUES (2, 'Frozen Fish Crumbed', 11.00, '1KG', 678);
INSERT INTO `products` VALUES (3, 'Pizza Meatlowers Bbq', 8.50, '500G', 786);
INSERT INTO `products` VALUES (4, 'Ristorante Pizza Pepperoni', 6.50, '310G', 67);
INSERT INTO `products` VALUES (5, 'Potato Chips French Fries', 7.00, '750G', 213);
INSERT INTO `products` VALUES (6, 'Raw Prawn Meat', 10.00, '300G', 678);
INSERT INTO `products` VALUES (7, 'Frozen Blueberries', 6.20, '500G', 867);
INSERT INTO `products` VALUES (8, 'Australian Grown Garden Peas', 4.90, '825G', 687);
INSERT INTO `products` VALUES (9, 'Classic Vanilla Tub', 12.00, '1L', 12333);
INSERT INTO `products` VALUES (10, 'Classic Frozen Dessert Sticks', 12.00, '6 pack', 213123);
INSERT INTO `products` VALUES (11, 'Chicken Thigh Cutlets', 7.50, '1KG', 6546);
INSERT INTO `products` VALUES (12, 'Whole Chicken', 36.45, '2.7KG', 546);
INSERT INTO `products` VALUES (13, 'Beef Eye Fillet', 23.50, '320G', 654);
INSERT INTO `products` VALUES (14, 'Broccoli', 1.49, '1EA', 654);
INSERT INTO `products` VALUES (15, 'Potato White', 4.50, '1KG', 678);
INSERT INTO `products` VALUES (16, 'Prawns Uncooked Tiger Large', 19.00, '1KG', 687);
INSERT INTO `products` VALUES (17, 'Apple Royal Gala', 0.86, '1EA', 786);
INSERT INTO `products` VALUES (18, 'Garlic Head', 0.88, '1EA', 768);
INSERT INTO `products` VALUES (20, 'Spring Onion', 2.80, '1EA', 786);
INSERT INTO `products` VALUES (21, 'Ginger', 29.00, '1KG', 876);
INSERT INTO `products` VALUES (22, 'Coca-Cola Zero Sugar', 41.25, '9 pack', 2);
INSERT INTO `products` VALUES (23, 'Coconut Water', 2.85, '1.25L', 354);
INSERT INTO `products` VALUES (24, 'Pure Still Water', 3.20, '1L', 354);
INSERT INTO `products` VALUES (26, 'Full Cream Milk', 6.90, '2L', 78);
INSERT INTO `products` VALUES (27, 'Chocolate Milk', 6.50, '2L', 356);
INSERT INTO `products` VALUES (28, 'Japanese Whisky', 89.00, '500ML', 87);
INSERT INTO `products` VALUES (29, 'Corona Extra Beer', 89.90, '24 pack', 65);
INSERT INTO `products` VALUES (30, 'Fresh Dog Food Lamb & Veges', 6.00, '1KG', 122);
INSERT INTO `products` VALUES (32, 'Tofu Cat Litter', 21.50, '4KG', 546);
INSERT INTO `products` VALUES (33, 'Parrot & Wildbird Seed Mix', 2.70, '400G', 45);
INSERT INTO `products` VALUES (34, 'Rabbit & Guinea Pig Pasture Hay', 5.25, '2KG', 456);
INSERT INTO `products` VALUES (35, 'Non-Stick Coating Frypan', 10.00, '1EA', 78);
INSERT INTO `products` VALUES (36, 'Canister Square Toilet Brush', 16.00, '1EA', 32);
INSERT INTO `products` VALUES (37, 'Face Washer', 11.90, '1EA', 2332);
INSERT INTO `products` VALUES (38, 'Hand-Held Car Vacuum', 12.00, '1EA', 200);
INSERT INTO `products` VALUES (39, 'Hand-Held Car Vacuum Deluxe', 12.00, '1EA', 200);
INSERT INTO `products` VALUES (40, 'Premium Car Vacuum System', 47.99, '1EA', 200);