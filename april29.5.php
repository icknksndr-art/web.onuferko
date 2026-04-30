<?php
function required($value) {
    return !empty(trim($value));
}
function isValidEmail($value) {
    return filter_var($value, FILTER_VALIDATE_EMAIL) !== false;
}
function minLength($value, $min) {
    return strlen(trim($value)) >= $min;
}
function validateForm($data, $rules) {
    $errors = [];
    foreach ($rules as $field => $fieldRules) {
        $value = $data[$field] ?? '';
        foreach ($fieldRules as $rule) {
            $ruleName = $rule[0];
            $params = array_slice($rule, 1);
            if (!$ruleName($value, ...$params)) {
                $errors[$field] = getErrorMessage($ruleName, $field, $params);
                break;
            }
        }
    }
    return $errors;
}
function getErrorMessage($rule, $field, $params) {
    $fieldName = ucfirst($field);
    if ($rule === 'required') return "$fieldName обов.язкове.";
    if ($rule === 'isValidEmail') return "Емейл не прийнятний.";
    if ($rule === 'minLength') return "$fieldName має мати хоча б {$params[0]} символів.";
    return "Invalid field.";
}
$errors = [];
$old = [];
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = $_POST;
    $rules = [
        'name' => [['required'], ['minLength', 2]],
        'email' => [['required'], ['isValidEmail']],
        'password' => [['required'], ['minLength', 6]]
    ];
    $errors = validateForm($data, $rules);
    $old = $data;
    if (empty($errors)) {
        echo "<div style='color:green;'>Успішно надіслано!</div>";
    }
}
?>
<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="UTF-8">
    <title>Валідейшн машина</title>
    <style>
        .error { color: red; font-size: 0.8em; margin-top: 6px; }
        input { margin: 5px 0; padding: 8px; width: 250px; }
        button { padding: 8px 16px; }
        .container { margin: 20px; }
    </style>
</head>
<body>
<div class="container">
    <h2>Реєстраційна форма</h2>
    <form method="POST" action="">
        <div>
            <label>Ім'я:</label>
            <input type="text" name="name" value="<?= htmlspecialchars($old['name'] ?? '') ?>">
            <?php if (isset($errors['name'])): ?>
                <div class="error"><?= $errors['name'] ?></div>
            <?php endif; ?>
        </div>
        <div>
            <label>Email:</label>
            <input type="email" name="email" value="<?= htmlspecialchars($old['email'] ?? '') ?>">
            <?php if (isset($errors['email'])): ?>
                <div class="error"><?= $errors['email'] ?></div>
            <?php endif; ?>
        </div>
        <div>
            <label>Пароль:</label>
            <input type="password" name="password">
            <?php if (isset($errors['password'])): ?>
                <div class="error"><?= $errors['password'] ?></div>
            <?php endif; ?>
        </div>
        <button type="submit">Реєстр</button>
    </form>
</div>
</body>
//моментами пишу англ мовою там де треба укр бо повторюю все з англ туторіалів
</html>
