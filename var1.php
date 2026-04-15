<?php
//Змінні
$name = "Олена";
$age = 22;
$is_student = true;
echo "<p>Мене звати $name, мені $age роки, " . ($is_student ? "я студентка" : "я не студент") . ".</p>";

// Сума чисел
$numbers = [1, 2, 3, 4, 5];
$sum = array_sum($numbers);
echo "<p>Сума чисел від 1 до 5: $sum</p>";

//Список
$user = [
    "name" => "Олена",
    "email" => "olena@gmail.com",
    "phone" => "+3806767676767"
];
echo "<ul>";
foreach ($user as $key => $value) {
    echo "<li><b>$key:</b> $value</li>";
}
echo "</ul>";

//Вік
if ($age > 18) {
    echo "<p>Вік більше 18 р.</p>";
} else {
    echo "<p>Вік менше або дорівнює 18 р.</p>";
}

//Оцінка (мінімум 6 будь ласка)
$grade = 85;
echo "<p>Оцінка $grade: ";
if ($grade >= 90 && $grade <= 100) echo "Відмінно";
elseif ($grade >= 70) echo "Добре";
elseif ($grade >= 50) echo "Задовільно";
else echo "Незадовільно";
echo "</p>";
?>