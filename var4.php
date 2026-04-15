<?php
//Мін і макс
$num1 = 25;
$num2 = 42;
if ($num1 > $num2) {
    echo "<p>Максимум: $num1, мінімум: $num2</p>";
} else {
    echo "<p>Максимум: $num2, мінімум: $num1</p>";
}

//Середнє
$numbers = [10, 20, 30, 40, 50];
$average = array_sum($numbers) / count($numbers);
echo "<p>Середнє арифметичне: $average</p>";

//Судяги державники і ні
$students = [
    "Ліна Костенко" => 85,
    "Тарас Шевченко" => 74,
    "Сюсюра і Франко" => 92
];
foreach ($students as $name => $score) {
    if ($score > 80) {
        echo "<p>$name - $score балів</p>";
    }
}

//Кратність 3 або 5
$num = 12;
if ($num % 3 == 0 && $num % 5 == 0) {
    echo "<p>$num ділиться на 3 і на 5</p>";
} elseif ($num % 3 == 0) {
    echo "<p>$num ділиться на 3</p>";
} elseif ($num % 5 == 0) {
    echo "<p>$num ділиться на 5</p>";
} else {
    echo "<p>$num не ділиться ні на 3, ні на 5</p>";
}

//Множимо 7
echo "<p>Таблиця множення для 7:</p>";
for ($i = 1; $i <= 10; $i++) {
    echo "<p>7 x $i = " . (7 * $i) . "</p>";
}
?>