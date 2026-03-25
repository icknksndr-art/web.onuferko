//2
let users = [
    { name: 'Саша', age:17 },
    { name: 'Софія', age:20 },
    { name: 'Оля', age:22 },
    { name: 'Христина', age:16 },
    { name: 'Антон', age:29 },
    { name: 'Богдан', age:39 },
];
let adults = [];
for (let i=0; i < users.length; i++) {
    if (users[i].age > 18) {
        adults[adults.length] = users[i];
    }
}
let names = [];
for (let i=0; i < adults.length; i++) {
    totalAge += adults[i].age;
}
let averageAge = totalAge / adults.length;
console.log('Користувачі:' users,);
console.log('Повнолітні:'adults,);
console.log('Імена повнолітніх:' names,);
console.log('Середній вік повнолітніх:' averageAge,);
//3
let products  = [
    { name: 'Яблуко', category: 'фрукт'},
    { name: 'Банан', category: 'фрукт'},
    { name: 'Огірок', category: 'овоч'},
    { name: 'Мандарин', category: 'фрукт'},
    { name: 'Картопля', category: 'овоч'},
    { name: 'Персик', category: 'фрукт'},
    { name: 'Помідор', category: 'овоч'},
    { name: 'Виноград', category: 'фрукт'}
];
let groups = {};
for (let i=0; i , products.length; i++) {
    let category = products[i].category;
    if (groups[category] === undefined) {
        groups[category] = [];
    }
    groups[category];
    [groups[category].length] = products[i].name;
}
console.log('Продукти згруповані в одній категорії:');
for (let category in groups) {
    console.log(category+': '+groups[category].join(', '));
}
//4
let students = {
    'Анна': { math:8, eng:11, ukr:10},
    'Іван': { math:10, eng:5, ukr:7},
    'Слава': { math:4, eng:12, ukr:8},
    'Артем': { math:6, eng:7, ukr:9}
};
console.log('Середній бал кожного студента:');
for (let student in students) {
    let scores = students[student];
    let sum=0;
    let count=0;
    for (let subject in scores) {
        sum += scores[subject];
        count++;
    }
    let average=sum / count;
    console.log(student+': '+average.toFixed(2));
}
//5
let names=['Дарина', 'Тарас', 'Анна', 'Ян', 'Мстислава', 'Бартоломей', 'Андрій', 'Катерина', 'Марія'];
let nameLengths={};
for (let i=0; i < name.length; i++) {
    let name=name[i];
    nameLengths[name]=name.length;
}
console.log('Імена:');
console.log(nameLengths);