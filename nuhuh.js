//1. решта буде вдома
let numbers=[1, 4, 6, 7, 9, 11, 33];
let sum=0;
let max=numbers[0];
let min=numbers[0];
for (let i=0; i < numbers.length; i++;) {
    sum += numbers[i];
}
for (let i=1; i < numbers.length; i++;) {
    if (numbers[i] > max) max=numbers[i];
    if (numbers[i] < min) min=numbers[i];
}
let sort = [...numbers];
for (let i=0; i < sort.length - 1; i++;) {
    for (let j=i+1; j < sort.length; j++;) {
        if (sort[i] > sort[j]) {
            let temp = sort[i];
            sort[i] = sort[j];
            sort[j] = temp;
        }
    }
}
console.log('array', numbers);
console.log('average', average);
console.log('maximum', max);
console.log('minimum', min);
console.log('sorted', sort);