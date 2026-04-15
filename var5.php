<?php
//Ім.я і вік
$first_name = "Яна";
$last_name = "Зеленька";
$year_of_birth = 2000;
$current_year = date("2026");
$age = $current_year - $year_of_birth;
echo "<p>Повне ім'я: $first_name $last_name, вік: $age років</p>";

//Країни
$countries = ["Україна", "Польща", "Фінляндія", "Канада"];
echo "<ol>";
foreach ($countries as $country) {
    echo "<li>$country</li>";
}
echo "</ol>";

//Велике село
$cities = [
    "Київ" => 2800000,
    "Львів" => 720000,
    "Одеса" => 1015000,
    "Харків" => 1430000
];
foreach ($cities as $city => $population) {
    if ($population > 1000000) {
        echo "<p>$city - населення " . number_format($population) . "</p>";
    }
}

//Парне чи непарне
$number = 8;
echo ($number % 2 == 0) ? "<p>$number - парне</p>" : "<p>$number - непарне</p>";

//Високосний рік
$year = $current_year;
if ($year % 4 == 0) {
    echo "<p>$year - високосний рік</p>";
} else {
    echo "<p>$year - не високосний рік</p>";
}
?>