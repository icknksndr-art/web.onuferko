<?php
session_start();
if (!isset($_SESSION['user_name']) || !isset($_SESSION['user_email'])) {
    header('Location: 12.php');
    exit;
}
$userName = htmlspecialchars($_SESSION['user_name']);
$userEmail = htmlspecialchars($_SESSION['user_email']);
$cookieEmail = isset($_COOKIE['user_email']) ? htmlspecialchars($_COOKIE['user_email']) : 'Нема емейл в cookie.';
?>
<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="UTF-8">
    <title>Профіль</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        .info { background: #f0f0f0; padding: 15px; margin-bottom: 20px; border-radius: 5px; }
        button { padding: 8px 16px; background: #dc3545; color: white; border: none; cursor: pointer; }
    </style>
</head>
<body>
    <h2>Профіль користувача</h2>
    <div class="info">
        <p><strong>Ім'я:</strong> <?php echo $userName; ?></p>
        <p><strong>Емейл:</strong> <?php echo $userEmail; ?></p>
        <p><strong>Cookie:</strong> <?php echo $cookieEmail; ?></p>
    </div>
    <form action="logout.php" method="post">
        <button type="submit">Вийти</button>
    </form>
</body>
</html>