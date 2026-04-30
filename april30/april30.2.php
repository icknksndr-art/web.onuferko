<?php
$message = '';
$login = $password = $confirm = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $login = trim($_POST['login'] ?? '');
    $password = $_POST['password'] ?? '';
    $confirm = $_POST['confirm_password'] ?? '';
    $loginValid = ctype_alnum($login) && strlen($login) > 0;
    $passwordsMatch = ($password === $confirm);
    $loginLengthOk = filter_var(strlen($login), FILTER_VALIDATE_INT, ['options' => ['min_range' => 3, 'max_range' => 20]]);
    $passwordLengthOk = filter_var(strlen($password), FILTER_VALIDATE_INT, ['options' => ['min_range' => 6]]);
    if (!$loginValid) {
        $message = "Login must contain only letters and numbers (no special characters).";
    } elseif (!$loginLengthOk) {
        $message = "Login must be between 3 and 20 characters.";
    } elseif (!$passwordLengthOk) {
        $message = "Password must be at least 6 characters long.";
    } elseif (!$passwordsMatch) {
        $message = "Passwords do not match.";
    } else {
        $message = "Registration successful! Welcome, " . htmlspecialchars($login) . ".";
        $login = $password = $confirm = '';
    }
}
?>
<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="UTF-8">
    <title>Реєстр користувача</title>
    <style>
        .error { color: red; }
        .success { color: green; }
    </style>
</head>
<body>
    <h2>Реєстраційна форма</h2>
    <form method="post">
        <label>Реєстрація (виключно числами та букваим):</label><br>
        <input type="text" name="login" value="<?php echo htmlspecialchars($login); ?>" required><br><br>
        <label>Password (min 6 characters):</label><br>
        <input type="password" name="password" required><br><br>
        <label>Підтвердити пароль:</label><br>
        <input type="password" name="confirm_password" required><br><br>
        <input type="submit" value="Register">
    </form>
    <?php if ($message): ?>
        <div class="<?php echo strpos($message, 'successful') !== false ? 'success' : 'error'; ?>">
            <?php echo htmlspecialchars($message); ?>
        </div>
    <?php endif; ?>
</body>
</html>