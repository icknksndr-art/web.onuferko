<?php
session_start();
if (isset($_SESSION['user_name'])) {
    header('Location: profile.php');
    exit;
}
$message = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim(htmlspecialchars($_POST['name'] ?? ''));
    $email = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
    $password = $_POST['password'] ?? '';
    if (empty($name) || empty($email) || empty($password)) {
        $message = 'Треба заповнити всі поля.';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $message = 'Прошу введіть дійсний емейл адресу.';
    } elseif (strlen($password) < 4) {
        $message = 'Пароль має бути більше 4 символів.';
    } else {
        $_SESSION['user_name'] = $name;
        $_SESSION['user_email'] = $email;
        setcookie('user_email', $email, time() + (7 * 24 * 60 * 60), '/');
        header('Location: profile.php');
        exit;
    }
}
?>
<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="UTF-8">
    <title>Реєстр</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        .error { color: red; }
        input { margin: 5px 0; padding: 8px; width: 250px; }
        button { padding: 8px 16px; }
    </style>
</head>
<body>
    <h2>Форма реєстрації</h2>
    <?php if ($message): ?>
        <div class="error"><?php echo htmlspecialchars($message); ?></div>
    <?php endif; ?>
    <form method="post">
        <div>
            <label>Ім'я:</label><br>
            <input type="text" name="name" required>
        </div>
        <div>
            <label>Емейл:</label><br>
            <input type="email" name="email" required>
        </div>
        <div>
            <label>Пароль (мінімум 4 символи):</label><br>
            <input type="password" name="password" required>
        </div>
        <button type="submit">Реєстр</button>
    </form>
</body>
</html>