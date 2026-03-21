//1
let age = Number(prompt('Введіть свій вік'));
if (age < 18) {
    alert('Виходьте звідси, недоростки');
} else if (age >= 18 && age <= 65) {
    alert('Ласкаво прошу!');
} else {
    alert('Не помріть тут, по можливості');
}
//2
let n = Number(prompt('Введіть число'));
for (let i = 2; i <= n; i++) {
    if (i % 2 === 0) {
        console.log(i);
    }
}
//3
let num = Number(prompt('Введіть число:'));
let factorial = 1;
let i = 1;
while (i <= num) {
    factorial = factorial * i;
    i++;
}
console.log(factorial);
//4
let a = Number(prompt('Перше число:'));
let b = Number(prompt('Друге число:'));
let op = prompt('Дія (+, -, *, /):');
let result;
switch (op) {
    case '+': result = a + b; break;
    case '-': result = a - b; break;
    case '*': result = a * b; break;
    case '/': result = b !== 0 ? a / b : 'Помилка'; break;
    default: result = 'Не прийнятно';
}
alert(result);
//5
let secret = Math.floor(Math.random() * 100) +1;
let guess;
do {
    guess = Number(prompt('Вгадайте (1-100):'));
    if (guess < secret)
        alert('Завелике');
    else if (guess > secret)
        alert('Замаленьке');
    else (guess = secret)
    alert('Вгадали! Ай ви розумашки');
} while (guess !== secret);
//додаткове
let x = Number(prompt('Перше число:'));
let y = Number(prompt('Друге число:'));
let a1 = x, b1 = y;
while (b1 !== 0) {
    let temp = b1;
    b1 = a1 % b1;
    a1 = temp;
}
console.log('НСД: ' + a1);