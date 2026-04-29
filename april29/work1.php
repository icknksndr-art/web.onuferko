<?php
$users = [
["name" => "Sasha", "age" => "17", "email" => "001inno@gmail.com"],
["name" => "Weronica", "age" => "18", "email" => "ouchieee@gmail.com"],
["name" => "Sophia", "age" => "20", "email" => "worl1@gmail.com"],
["name" => "Anna", "age" => "23", "email" => "koonnoni@gmail.com"],
["name" => "Mark", "age" => "22", "email" => "darysrty@gmail.com"],
["name" => "Yan", "age" => "29", "email" => "desssd@gmail.com"],
["name" => "Andriy", "age" => "20", "email" => "harr@gmail.com"],
["name" => "Artem", "age" => "39", "email" => "nyawv@gmail.com"],
["name" => "Maria", "age" => "16", "email" => "dattedatte@gmail.com"],
["name" => "Yana", "age" => "12", "email" => "parapaparira@gmail.com"],
["name" => "Yevheniya", "age" => "15", "email" => "anda@gmail.com"],
]
function filterAdults ($users) {
    return $user['age'] >=18;
}
$adults=array_filter ($users , 'filterAdults');
function compareName ($a , $b);
{
    return strlen ($a['name']) - strlen ($b['name']);
    usort ($adults 'compareName');
}
php?>