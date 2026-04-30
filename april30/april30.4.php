<?php
$orderSummary = '';
$name = $email = $quantity = '';
$productPrices = [
    'Ноутбук' => 80000,
    'Телефон' => 50000,
    'Навушники' => 5000,
    'Клавіатура' => 3000
];
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim(htmlspecialchars($_POST['name'] ?? ''));
    $email = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
    $product = $_POST['product'] ?? '';
    $quantityRaw = filter_var($_POST['quantity'] ?? 0, FILTER_VALIDATE_INT, ['options' => ['min_range' => 1, 'max_range' => 100]]);
    $errors = [];
        if (empty($name)) {
//о тепер знаю що в лапках можна використовувати апостроф
        $errors[] = "Ім'я обов'язкове.";
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Дійсна пошта обов'язкова.";
    }
    if (!array_key_exists($product, $productPrices)) {
        $errors[] = "Будь ласка, оберіть дійсний продукт.";
    }
    if ($quantityRaw === false) {
        $errors[] = "Кількість має бути від 1 до 100.";
    } else {
        $quantity = $quantityRaw;
    }
    if (empty($errors)) {
        $price = $productPrices[$product];
        $total = $price * $quantity;
        $orderSummary = "<strong>Order Summary</strong><br>
                         Name: " . htmlspecialchars($name) . "<br>
                         Email: " . htmlspecialchars($email) . "<br>
                         Product: " . htmlspecialchars($product) . "<br>
                         Quantity: $quantity<br>
                         Total: $$total";
        $name = $email = $quantity = '';
    } else {
        $orderSummary = '<span style="color:red;">' . implode('<br>', $errors) . '</span>';
    }
}
?>
<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="UTF-8">
    <title>Форма замовлення</title>
</head>
<body>
    <h2>Ваше замовлення</h2>
    <form method="post">
        <label>Повне ім'я:</label><br>
        <input type="text" name="name" value="<?php echo htmlspecialchars($name); ?>" required><br><br>
        <label>Емейл:</label><br>
        <input type="email" name="email" value="<?php echo htmlspecialchars($email); ?>" required><br><br>
        <label>Товар:</label><br>
        <select name="product" required>
            <option value="">-- Обрати --</option>
            <?php foreach ($productPrices as $prod => $price): ?>
                <option value="<?php echo $prod; ?>"><?php echo $prod; ?> - $<?php echo $price; ?></option>
            <?php endforeach; ?>
        </select><br><br>
        <label>Кількість (1‑100):</label><br>
        <input type="number" name="quantity" min="1" max="100" value="<?php echo htmlspecialchars($quantity); ?>" required><br><br>
        <input type="submit" value="Calculate Order">
    </form>
    <div style="margin-top: 20px; border-top: 1px solid #ccc; padding-top: 10px;">
        <?php echo $orderSummary; ?>
    </div>
</body>
</html>