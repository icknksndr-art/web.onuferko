//1
let num = 1;
let txt = "Бу";
let bul = true;
console.log(num, typeof num);
console.log(txt, typeof txt);
console.log(bul, typeof bul);
num = 4;
txt = "Бай";
bul = false;
console.log(num, typeof num);
console.log(txt, typeof txt);
console.log(bul, typeof bul);
let txt2 = String(num);
console.log("Число тепер текст:", txt2, typeof txt2);
let num2 = String(num);
console.log("Число тепер текст:", txt2, typeof txt2);
console.log("1+'1'=", 1+"1");
let stu = {
    name: "Саша",
    age: 17,
    grade: 11
};
console.log(stu);
console.log(JSON.stringify(stu));
//2
let num1 = Number(prompt("Введіть перше число:"));
let num2 = Number(prompt("Введіть друге число:"));
let num3 = Number(prompt("Введіть третє число:"));
let mid = (num1 + num2 + num3) / 3;
console.log("Середнє арифметичне:", mid);
console.log("\nОперації з числами");
console.log("Модуль числа 1:", Math.abs(num1));
console.log("Округлення в більшу сторону числа 2:", Math.ceil(num2));
console.log("Округлення в меншу сторону числа 3:", Math.floor(num3));
console.log("Число1 в степені число2:", Math.pow(num1, num2));
console.log("\nПеревірка ділення");
console.log("Число1 ділиться на 5 без залишку?", num1 % 5 === 0);
console.log("Число2 ділиться на 7 без залишку?", num2 % 7 === 0);
console.log("Середнє ділиться на 3 без залишку?", mid % 3 === 0);
console.log("\nПеревірка трикутника");
if (num1 + num2 > num3 && num1 + num3 > num2 && num2 + num3 > num1) {
  console.log("Трикутник з такими сторонами ІСНУЄ");
} else {
  console.log("Трикутник з такими сторонами НЕ ІСНУЄ");
}
//3
let a = Number(prompt("Введіть перше число:"));
let b = Number(prompt("Введіть друге число:"));
let c = Number(prompt("Введіть третє число:"));
let big = Math.max(a, b, c);
let lil = Math.min(a, b, c);
console.log("Найбільше число:", big);
console.log("Найменше число:", lil);
console.log("\nПеревірка на парність");
let duo = (a % 2 === 0) || (b % 2 === 0) || (c % 2 === 0);
console.log("Чи є хоча б одне парне число?", duo);
if (a % 2 === 0) console.log(a + " - парне");
if (b % 2 === 0) console.log(b + " - парне");
if (c % 2 === 0) console.log(c + " - парне");
console.log("\nСкладна умова");
let hard = (a > b) && (b < c);
console.log("a > b і b < c?", hard);
console.log("\nПеревірка чи число просте");
function easy(num) {
  if (num <= 1) return false;
  for (let i = 2; i < num; i++) {
    if (num % i === 0) return false;
  }
  return true;
}
console.log(a + " просте?", easy(a));
console.log(b + " просте?", easy(b));
console.log(c + " просте?", easy(c));
//4
let name = prompt("Введіть ваше ім'я:");
let year = Number(prompt("Введіть ваш рік народження:"));
let city = prompt("Введіть ваше місто:");
let now = 2026;
let age = now - year;
console.log("Ім'я:", name);
console.log("Вік:", age, "років");
console.log("Місто:", city);
console.log("\nВікова група");
if (age < 6) {
  console.log("Ви маленька дитина");
} else if (age >= 6 && age <= 12) {
  console.log("Ви дитина");
} else if (age >= 13 && age <= 17) {
  console.log("Ви підліток");
} else if (age >= 18 && age <= 59) {
  console.log("Ви доросла людина");
} else {
  console.log("Ви літня людина");
}
console.log("\nПеревірка міста");
city = city.toLowerCase();
if (city === "київ" || city === "kyiv") {
  console.log("Так, це столиця України!");
} else if (city === "париж" || city === "paris") {
  console.log("Так, це столиця Франції!");
} else if (city === "лондон" || city === "london") {
  console.log("Так, це столиця Великобританії!");
} else if (city === "вашингтон" || city === "washington") {
  console.log("Так, це столиця США!");
} else {
  console.log("Це місто не є столицею у моєму списку");
}
console.log("\nВся інформація про користувача");
console.log("Ім'я:", name);
console.log("Вік:", age);
console.log("Місто:", city);
console.log("Рік народження:", year);