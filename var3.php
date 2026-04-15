<?php
//Скільки платим
$price1 = 150;
$price2 = 200;
$price3 = 180;
$total = $price1 + $price2 + $price3;
echo "<p>Загальна вартість: $total грн</p>";

//Фільми
$movies = ["Щось там номер 1", "І щось ще номер 2", "Прям аж номер 3", "Можливо навіть номер 4", "І вже номер 5"];
foreach ($movies as $movie) {
    echo "<p>$movie</p>";
}

//Логінчик користувача
$user = [
    "login" => "olha123",
    "password" => "secret",
    "email" => "oilolya@gmail.com"
];
echo "<p>Логін: " . $user['login'] . "</p>";
echo "<p>Email: " . $ user['email'] . "</p>";

//Знижка якщо аж 500 грн
if ($total > 500) {
    $discount = $total * 0.10;
    $final = $total - $discount;
    echo "<p>Знижка 10%: -$discount грн. Підсумок: $final грн</p>";
} else {
    echo "<p>Знижка не застосовується. Підсумок: $total грн</p>";
}

//Перевіряємо логін і пароль
$input_login = "ulya67";
$input_password = "password";
if ($input_login == $user['login'] && $input_password == $user['password']) {
    echo "<p>Авторизація успішна!</p>";
} else {
    echo "<p>Невірний логін або пароль</p>";
}
?>