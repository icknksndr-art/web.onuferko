<?php
$host = 'localhost';
$user = 'root';
$password = '';
$database = 'shop';
$conn = new mysqli($host, $user, $password, $database);
if ($conn->connect_error) {
    die("З.ЄДНАННЯ НЕУСПІШНЕ: " . $conn->connect_error);
}
$conn->set_charset("utf8");
$sql = "
CREATE TABLE IF NOT EXISTS products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    price DECIMAL(10,2),
    quantity INT
);
CREATE TABLE IF NOT EXISTS orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT,
    customer_name VARCHAR(50),
    order_date DATE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS reviews (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT,
    review_text TEXT,
    rating INT,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
);
CREATE TABLE IF NOT EXISTS inventory_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT,
    change_date DATE,
    change_amount INT,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
);
";
if ($conn->multi_query($sql)) {
    do {} while ($conn->next_result()); 
}
$conn->query("DELETE FROM inventory_logs");
$conn->query("DELETE FROM reviews");
$conn->query("DELETE FROM orders");
$conn->query("DELETE FROM products");
$products = [
    ['Ноутбук', 'Electronics', 750.00, 10],
    ['Мишка', 'Electronics', 25.50, 50],
    ['Зошит', 'Stationery', 2.30, 200],
    ['Ручка', 'Stationery', 1.20, 500],
    ['Настільна лампа', 'Furniture', 45.00, 15]
];
foreach ($products as $p) {
    $stmt = $conn->prepare("INSERT INTO products (product_name, category, price, quantity) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssdi", $p[0], $p[1], $p[2], $p[3]);
    $stmt->execute();
    $stmt->close();
}
$customers = ['Володимир Зеленський', 'Марк Маркчук', 'Джон Порк', 'Джон Доу', 'Джон Джонченко'];
$product_ids = [];
$res = $conn->query("SELECT id FROM products");
while ($row = $res->fetch_assoc()) {
    $product_ids[] = $row['id'];
}
for ($i = 0; $i < count($product_ids); $i++) {
    $order_date = date('Y-m-d', strtotime("-" . ($i+1) . " days"));
    $stmt = $conn->prepare("INSERT INTO orders (product_id, customer_name, order_date) VALUES (?, ?, ?)");
    $stmt->bind_param("iss", $product_ids[$i], $customers[$i % count($customers)], $order_date);
    $stmt->execute();
    $stmt->close();
}
$reviews = [
    ['Купив 7 мишок. Дуже смачні', 5],
    ['Так дешево... Я думав мене заскамлять (ноут через пару місяців згорів)', 4],
    ['Я думав що мишки реально їстівні', 3]
];
for ($i = 0; $i < 3 && $i < count($product_ids); $i++) {
    $stmt = $conn->prepare("INSERT INTO reviews (product_id, review_text, rating) VALUES (?, ?, ?)");
    $stmt->bind_param("isi", $product_ids[$i], $reviews[$i][0], $reviews[$i][1]);
    $stmt->execute();
    $stmt->close();
}
for ($i = 0; $i < count($product_ids); $i++) {
    $change_amount = -5 + ($i % 3); 
    $change_date = date('Y-m-d');
    $stmt = $conn->prepare("INSERT INTO inventory_logs (product_id, change_date, change_amount) VALUES (?, ?, ?)");
    $stmt->bind_param("isi", $product_ids[$i], $change_date, $change_amount);
    $stmt->execute();
    $stmt->close();
}
$conn->query("UPDATE products SET price = 800.00 WHERE product_name = 'Ноутбук'");
$conn->query("UPDATE orders SET order_date = CURDATE() WHERE id = 1");
Delete one product (e.g., id = 2)
$deleted_id = 2;
$conn->query("DELETE FROM products WHERE id = $deleted_id");
$order_check = $conn->query("SELECT * FROM orders WHERE product_id = $deleted_id");
$orders_gone = ($order_check->num_rows == 0);
$review_check = $conn->query("SELECT * FROM reviews WHERE product_id IS NULL");
$log_check = $conn->query("SELECT * FROM inventory_logs WHERE product_id IS NULL");
$all_products = $conn->query("SELECT * FROM products");
$electronics = $conn->query("SELECT * FROM products WHERE category = 'Electronics'");
$sorted_by_price = $conn->query("SELECT * FROM products ORDER BY price ASC");
$stationery_sorted_by_qty = $conn->query("SELECT * FROM products WHERE category = 'Stationery' ORDER BY quantity ASC");
?>
<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="UTF-8">
    <title>SМагаз</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        table { border-collapse: collapse; width: 80%; margin-bottom: 20px; }
        th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        h2 { color: #333; }
        .success { color: green; }
        .warning { color: orange; }
    </style>
</head>
<body>
<h1>База даниих магаза</h1>
<h2>Веріфікація видалення</h2>
<p>Продукт з id = <?php echo $deleted_id; ?> видалено.</p>
<p>Замовлення з цим продуктом: <?php echo $orders_gone ? "Зникли (ON DELETE CASCADE)" : "Ще є"; ?></p>
<p>Відгуки з NULL product_id: <?php echo $review_check->num_rows; ?> (залишилися через ON DELETE SET NULL)</p>
<p>Інвентар з NULL product_id: <?php echo $log_check->num_rows; ?> (залишилися через ON DELETE SET NULL)</p
<h2>Всі товари</h2>
<table>
    <tr><th>ID</th><th>Назва</th><th>Категорія</th><th>Ціна</th><th>Кількість</th></tr>
    <?php while($row = $all_products->fetch_assoc()): ?>
    <tr>
        <td><?= $row['id'] ?></td>
        <td><?= htmlspecialchars($row['product_name']) ?></td>
        <td><?= htmlspecialchars($row['category']) ?></td>
        <td><?= $row['price'] ?></td>
        <td><?= $row['quantity'] ?></td>
    </tr>
    <?php endwhile; ?>
</table>
<h2>Продукти в 'Electronics'</h2> //мені ліньки категорії перекласти 
<table>
    <tr><th>ID</th><th>Назва</th><th>Ціна</th><th>Кількість</th></tr>
    <?php while($row = $electronics->fetch_assoc()): ?>
    <tr>
        <td><?= $row['id'] ?></td>
        <td><?= htmlspecialchars($row['product_name']) ?></td>
        <td><?= $row['price'] ?></td>
        <td><?= $row['quantity'] ?></td>
    </tr>
    <?php endwhile; ?>
</table>
<h2>Всі продукти відсортовані за ціною</h2>
<table>
    <tr><th>ID</th><th>Назва</th><th>Категорія</th><th>Ціна</th><th>Кількість</th></tr>
    <?php while($row = $sorted_by_price->fetch_assoc()): ?>
    <tr>
        <td><?= $row['id'] ?></td>
        <td><?= htmlspecialchars($row['product_name']) ?></td>
        <td><?= htmlspecialchars($row['category']) ?></td>
        <td><?= $row['price'] ?></td>
        <td><?= $row['quantity'] ?></td>
    </tr>
    <?php endwhile; ?>
</table>
<h2>Продукти сортовані за кількістю</h2>
<table>
    <tr><th>ID</th><th>Назва</th><th>Ціна</th><th>Кількість</th></tr>
    <?php while($row = $stationery_sorted_by_qty->fetch_assoc()): ?>
    <tr>
        <td><?= $row['id'] ?></td>
        <td><?= htmlspecialchars($row['product_name']) ?></td>
        <td><?= $row['price'] ?></td>
        <td><?= $row['quantity'] ?></td>
    </tr>
    <?php endwhile; ?>
</table>
<?php
$conn->close();
?>
</body>
</html>